<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
header("Content-Type: application/json");

// Permitir solicitudes preflight (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Incluir el archivo de conexión de la base de datos
include "conexion.php";

$pdo = new conn();



$metodo = $_SERVER['REQUEST_METHOD'];

//print_r($metodo);
$data = json_decode(file_get_contents("php://input"), true);

switch ($metodo) {
    case 'GET':
  // Consultar en la base de datos      
try {
    $consulta = $pdo->prepare("SELECT * FROM producto ORDER BY ID_producto");
    $consulta->execute();

    $resultados = $consulta->fetchAll(); // Devuelve todos los registros
    echo json_encode($resultados);
// Mensaje que sale en pantalla según sea el caso
} catch (PDOException $e) {
    echo json_encode(["error al encontrar productos" => $e->getMessage()]);
}
        break;

    case 'POST':
        // Obtener el cuerpo JSON enviado
$data = json_decode(file_get_contents("php://input"), true);

  // Validar que se reciban los datos necesarios
if (!$data) {
    echo json_encode(["error" => "❌ JSON inválido o no se envió ningún dato."]);
    exit;
}
// Consultar en la base de datos
try {
    $sql = "INSERT INTO producto (nombre, stock, precio, descripcion, fecha)
            VALUES (:nombre, :stock, :precio, :descripcion, :fecha)";
// $stmt para prevenir inyecciones SQL y trabajar de forma más segura con consultas.
    $stmt = $pdo->prepare($sql); 
    $stmt->execute([ 
        ':nombre' => $data['nombre'],
        ':stock' => $data['stock'],
        ':precio' => $data['precio'],
        ':descripcion' => $data['descripcion'],
        ':fecha' => $data['fecha']
    ]);
    //  Muestra un mensaje de éxito
    echo json_encode(["mensaje" => "✅ Producto agregado"]);
// Si hubo un error al agregar, se muestra aquí
} catch (PDOException $e) {
    echo json_encode(["error al agregar el producto" => $e->getMessage()]);
}
        break;    

    case 'PUT':
         // Validar que se reciban los datos necesarios
    if (!$data || !isset($data['ID_producto'])) {
        echo json_encode(["error" => "❌ JSON inválido o falta el ID"]);
        exit;
    }
    // Consultar en la base de datos
    try {
        $sql = "UPDATE producto SET nombre = :nombre, stock = :stock, precio = :precio, descripcion = :descripcion, fecha = :fecha 
                WHERE ID_producto = :ID_producto";
        // Ejecutar la consulta
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':nombre' => $data['nombre'],
            ':stock' => $data['stock'],
            ':precio' => $data['precio'],
            ':descripcion' => $data['descripcion'],
            ':fecha' => $data['fecha'],
            ':ID_producto' => $data['ID_producto']
        ]);
        //  Muestra un mensaje de éxito
        echo json_encode(["mensaje" => "✅ Producto actualizado correctamente"]);
    } catch (PDOException $e) {
        // Si hubo un error al actulizar, se muestra aquí
        echo json_encode(["error al actualizar el producto" => $e->getMessage()]);
    }
        break;

    case 'DELETE':
         // Verificar si llegaron datos en el cuerpo del JSON y si se incluyó el ID del producto
    if (!$data || !isset($data['ID_producto'])) {
        // Si no hay datos o falta el ID, muestra un mensaje de error y sale
        echo json_encode(["error" => "❌ JSON inválido o falta el ID del producto"]);
        exit;
    }

    try {
        //  Se crea la consulta SQL para eliminar el producto por su ID
        $sql = "DELETE FROM producto WHERE ID_producto = :ID_producto";

        // Se prepara la consulta para evitar inyecciones SQL
        $stmt = $pdo->prepare($sql);

        // Ejecutar la consulta enviando el ID del producto que se quiere eliminar
        $stmt->execute([
            ':ID_producto' => $data['ID_producto']
        ]);

        //  Muestra un mensaje de éxito
        echo json_encode(["mensaje" => "✅ Producto eliminado correctamente"]);
    } catch (PDOException $e) {
        // Si hubo un error al eliminar, se muestra aquí
        echo json_encode(["error al eliminar el producto" => $e->getMessage()]);
    }
        break;
    
    default:
        echo "Método no soportado";
        break;
}

?>