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
 if ($metodo === 'POST') {

     $dados = json_decode(file_get_contents('php://input'), true);
     if (!$dados || empty($dados['nome'])) {
         http_response_code(400);
          echo json_encode(['erro' => 'Informe pelo menos o nome do projeto']);
       exit;
     }
     $sql = 'INSERT INTO projetos (nome, descricao, tecnologias, link_github, ano, status)
             VALUES (?, ?, ?, ?, ?, ?)';
     $stmt = $pdo->prepare($sql);
     $stmt->execute([
         $dados['nome'],
         $dados['descricao']   ?? '',
         $dados['tecnologias'] ?? '',
         $dados['link_github'] ?? '',
         $dados['ano']         ?? date('Y'),
         'publicado',
     ]);
     http_response_code(201);
     echo json_encode(['id' => (int) $pdo->lastInsertId()]);
     exit;
 }
 
 if ($metodo === 'PUT') {
     // PUT altera: precisa do id na URL (qual) E do corpo (o que gravar).
     if ($id <= 0) {
         http_response_code(400);
         echo json_encode(['erro' => 'PUT exige o id na URL: ?id=NN']);
         exit;
     }
     $dados = json_decode(file_get_contents('php://input'), true);
     if (!$dados || empty($dados['nome'])) {
         http_response_code(400);

              echo json_encode(['erro' => 'Informe pelo menos o nome do projeto']);
       exit;
   }
  $sql = 'UPDATE projetos SET nome = ?, descricao = ?, tecnologias = ?, link_github = ?, ano = ? WHERE id =?';
  $stmt = $pdo->prepare($sql);
  $stmt->execute([
       $dados['nome'],
       $dados['descricao'] ?? '',
       $dados['tecnologias'] ?? '',
       $dados['link_github'] ?? '',
       $dados['ano']         ?? date('Y'),
      $id,
   ]);
  echo json_encode(['mensagem' => 'Projeto atualizado']);  // 200 e o padrao
   exit;
 }
 
 if ($metodo === 'DELETE') {
   // DELETE apaga: so precisa do id. Nao ha corpo.
   if ($id <= 0) {
       http_response_code(400);
       echo json_encode(['erro' => 'DELETE exige o id na URL: ?id=NN']);
     exit;
   }
   // 🧩 LACUNA 1 - escreva as duas linhas que apagam o projeto:
   //   o prepare de 'DELETE FROM projetos WHERE id = ?' e o execute com [$id].
   //   Modelo pronto: o prepare/execute do UPDATE, no bloco logo acima.

if ($stmt->rowCount() === 0) {
      http_response_code(404);
      echo json_encode(['erro' => 'Projeto nao encontrado']);
       exit;
   }
   http_response_code(204);  // apagado, sem corpo para devolver
 exit;
 }

 http_response_code(405);
 echo json_encode(['erro' => 'Metodo nao permitido']);
         ?>