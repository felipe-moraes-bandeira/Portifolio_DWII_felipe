<?php
// Liga a exibição de erros na tela (para depuração)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Permissões do CORS e tipo de resposta (JSON)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// 1. Caminho corrigido para puxar o arquivo de conexão
require_once __DIR__ . '/../conexao.php';

try {
    // 2. Faltava esta linha! Ela quem cria a variável $pdo
    $pdo = conectar();

    // Busca de projeto único por ID
    if (isset($_GET['id'])) {
        $id = $_GET['id'];

        $sql = "SELECT id, nome, descricao, tecnologias, link_github, ano
                FROM projetos
                WHERE id = :id AND status = 'publicado'";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        // PDO::FETCH_ASSOC garante que venha um JSON limpo
        $projeto = $stmt->fetch(PDO::FETCH_ASSOC); 

        if (!$projeto) {
            http_response_code(404);
            echo json_encode([
                "error" => "Projeto não encontrado"
            ]);
            exit;
        }

        echo json_encode($projeto);
        exit;
    }

    // Busca de todos os projetos publicados
    $sql = "SELECT id, nome, descricao, tecnologias, link_github, ano
            FROM projetos
            WHERE status = 'publicado'
            ORDER BY ano DESC, id DESC";

    $projetos = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($projetos);

} catch (Exception $e) {
    http_response_code(500);

    echo json_encode([
        "error" => "Erro interno no servidor",
        "details" => $e->getMessage()
    ]);
}
?>