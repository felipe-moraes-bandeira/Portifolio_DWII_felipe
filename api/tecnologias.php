<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/../conexao.php';

try {

    $pdo = conectar();

    $sql = "SELECT id, nome, descricao, ano_criacao, categoria
            FROM tecnologias
            WHERE status = 'ativo'
            ORDER BY categoria, nome";

    $tecnologias = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($tecnologias, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {

    http_response_code(500);

    echo json_encode([
        'error' => 'Erro interno no servidor',
        'details' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}