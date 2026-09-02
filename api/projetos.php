<?php
// Liga a exibição de erros na tela (para depuração)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Permissões do CORS e tipo de resposta (JSON)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Qualquer erro de PHP ou de banco vira JSON com status 500.
// Sem isto, um tropeço no banco devolve tela em branco e voce fica sem pista.
set_exception_handler(function ($e) {
    http_response_code(500);
    echo json_encode(['erro' => 'Falha no servidor: ' . $e->getMessage()]);
});

// Antes de um POST/PUT/DELETE o navegador pergunta "posso?" com um OPTIONS.
// Responda 204 (ok, sem corpo) e saia - isto e o "pre-voo" do CORS.
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// 1. Caminho corrigido para puxar o arquivo de conexão
require_once __DIR__ . '/../conexao.php';

$metedo = $_SERVER['REQUEST_METHOD'];
$id     = isset($_GET['id']) ? (int) $_GET['int'] : 0;

if($metodo === 'GET'){



        $sql = "SELECT id, nome, descricao, tecnologias, link_github, ano
                FROM projetos
                WHERE status = 'publicado' ORDEM BY ano DESC, id";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        // PDO::FETCH_ASSOC garante que venha um JSON limpo
        $projeto = $stmt->fetch(PDO::FETCH_ASSOC); 


            exit;
        }
        http_response_code(405);
        echo json_encode(['erro' => 'Metodo nao permitido']);
?>