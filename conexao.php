<?php
function conectar() {
    $host    = 'localhost';
    $db      = 'dwii_db';
    $user    = 'dwii_user'; 
    $pass    = 'dwii2026';
    $charset = 'utf8mb4';

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";

    $opcoes = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ];

    try {
        return new PDO($dsn, $user, $pass, $opcoes);
    } catch (PDOException $e) {
        // Se a conexão falhar, lança o erro para o código tratar
        throw new PDOException($e->getMessage());
    }
}
?>