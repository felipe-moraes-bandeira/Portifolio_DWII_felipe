<?php

// api/projetos.php
// CRUD de projetos: listar, criar, alterar e apagar

ini_set('display_errors', 1);
error_reporting(E_ALL);

// CORS
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Tratamento de exceções
set_exception_handler(function ($e) {

    http_response_code(500);

    echo json_encode([
        'erro' => 'Falha no servidor: ' . $e->getMessage()
    ]);

    exit;
});

// Requisição OPTIONS do CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {

    http_response_code(204);

    exit;
}

// Conexão com o banco
require_once __DIR__ . '/../conexao.php';

$pdo = conectar();

// Método HTTP
$metodo = $_SERVER['REQUEST_METHOD'];

// ID da URL
$id = isset($_GET['id']) ? (int) $_GET['id'] : 0;




if ($metodo === 'GET') {

    // Buscar um projeto específico
    if ($id > 0) {

        $sql = "SELECT id, nome, descricao, tecnologias, link_github, ano
                FROM projetos
                WHERE id = :id
                AND status = 'publicado'";

        $stmt = $pdo->prepare($sql);

        $stmt->execute([
            ':id' => $id
        ]);

        $projeto = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$projeto) {

            http_response_code(404);

            echo json_encode([
                'erro' => 'Projeto não encontrado'
            ]);

            exit;
        }

        echo json_encode($projeto, JSON_UNESCAPED_UNICODE);

        exit;
    }


    // Listar todos os projetos
    $sql = "SELECT id, nome, descricao, tecnologias, link_github, ano
            FROM projetos
            WHERE status = 'publicado'
            ORDER BY ano DESC, id DESC";

    $stmt = $pdo->query($sql);

    $projetos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(
        $projetos,
        JSON_UNESCAPED_UNICODE
    );

    exit;
}




if ($metodo === 'POST') {

    // Recebe JSON enviado pelo Angular
    $dados = json_decode(
        file_get_contents('php://input'),
        true
    );

    // Verifica se recebeu os dados
    if (!$dados || empty($dados['nome'])) {

        http_response_code(400);

        echo json_encode([
            'erro' => 'Informe pelo menos o nome do projeto'
        ]);

        exit;
    }

    $sql = "INSERT INTO projetos
            (nome, descricao, tecnologias, link_github, ano, status)
            VALUES (?, ?, ?, ?, ?, ?)";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([

        $dados['nome'],

        $dados['descricao'] ?? '',

        $dados['tecnologias'] ?? '',

        $dados['link_github'] ?? '',

        $dados['ano'] ?? date('Y'),

        'publicado'
    ]);

    http_response_code(201);

    echo json_encode([
        'id' => (int) $pdo->lastInsertId(),
        'mensagem' => 'Projeto criado com sucesso'
    ]);

    exit;
}



if ($metodo === 'PUT') {

    // PUT precisa receber o ID
    if ($id <= 0) {

        http_response_code(400);

        echo json_encode([
            'erro' => 'PUT exige o id na URL: ?id=N'
        ]);

        exit;
    }

    // Recebe JSON
    $dados = json_decode(
        file_get_contents('php://input'),
        true
    );

    if (!$dados || empty($dados['nome'])) {

        http_response_code(400);

        echo json_encode([
            'erro' => 'Informe pelo menos o nome do projeto'
        ]);

        exit;
    }

    $sql = "UPDATE projetos
            SET nome = ?,
                descricao = ?,
                tecnologias = ?,
                link_github = ?,
                ano = ?
            WHERE id = ?
            AND status = 'publicado'";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([

        $dados['nome'],

        $dados['descricao'] ?? '',

        $dados['tecnologias'] ?? '',

        $dados['link_github'] ?? '',

        $dados['ano'] ?? date('Y'),

        $id
    ]);

    echo json_encode([
        'mensagem' => 'Projeto atualizado com sucesso'
    ]);

    exit;
}




if ($metodo === 'DELETE') {

    if ($id <= 0) {

        http_response_code(400);

        echo json_encode([
            'erro' => 'DELETE exige o id na URL: ?id=N'
        ]);

        exit;
    }

    $sql = "DELETE FROM projetos
            WHERE id = :id";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ':id' => $id
    ]);

    echo json_encode([
        'mensagem' => 'Projeto apagado com sucesso'
    ]);

    exit;
}



http_response_code(405);

echo json_encode([
    'erro' => 'Método não permitido'
]);

exit;