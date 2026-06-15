<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

require __DIR__ . '/../conexao.php';

try {

  
    if (isset($_GET['id'])) {

        $id = $_GET['id'];

        $sql = "SELECT id, nome, descricao, tecnologias, link_github, ano
                FROM projetos
                WHERE id = :id AND status = 'publicado'";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        $projeto = $stmt->fetch();

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

  
    $sql = "SELECT id, nome, descricao, tecnologias, link_github, ano
            FROM projetos
            WHERE status = 'publicado'
            ORDER BY ano DESC, id DESC";

    $projetos = $pdo->query($sql)->fetchAll();

    echo json_encode($projetos);

} catch (Exception $e) {

    http_response_code(500);

    echo json_encode([
        "error" => "Erro interno no servidor",
        "details" => $e->getMessage()
    ]);
}
?>