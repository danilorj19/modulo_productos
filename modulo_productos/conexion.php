<?php

class conn extends PDO {

private $server = "localhost";
private $user = "root";
private $password = "";
private $database = "inventariodb";

public function __construct() {

    try {
        parent::__construct("mysql:host={$this->server};dbname={$this->database}", $this->user, $this->password);
        $this->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    } catch (PDOexception $e) {
        echo "Connection failed: " . $e->getMessage();
        exit;
    }

}

}

?>