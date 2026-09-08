<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

// CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Responde ao preflight do navegador
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once __DIR__ . '/../conexao.php';

try {

    // Conecta ao banco
    $pdo = conectar();

    // Busca as tecnologias ativas
    $sql = "
        SELECT 
            id,
            nome,
            descricao,
            ano_criacao,
            categoria
        FROM tecnologias
        WHERE status = 'ativo'
        ORDER BY categoria ASC, nome ASC
    ";

    $stmt = $pdo->query($sql);

    $tecnologias = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Retorna JSON
    echo json_encode(
        $tecnologias,
        JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT
    );

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        'erro' => 'Erro ao acessar o banco de dados.',
        'detalhes' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {

    http_response_code(500);

    echo json_encode([
        'erro' => 'Erro interno no servidor.',
        'detalhes' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}

exit;