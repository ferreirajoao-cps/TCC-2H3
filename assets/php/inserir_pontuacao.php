<?php
// Conexão com o banco de dados (substitua pelas suas informações de conexão)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pointskinectquiz";

// Crie uma conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifique a conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Receba os dados do jogador e da pontuação do cliente
$data = json_decode(file_get_contents("php://input"), true);
$nomeJogador = $data['nomeJogador'];
$pontuacao = $data['pontos'];

echo "Nome do jogador: " . $nomeJogador . "\n";
echo "Pontuação: " . $pontuacao . "\n";


// Inserir os dados no banco de dados
$sql = "INSERT INTO jogadores (nome, pontuacao) VALUES ('$nomeJogador', $pontuacao)";

if ($conn->query($sql) === TRUE) {
    echo "Dados inseridos com sucesso.";
} else {
    echo "Erro ao inserir dados: " . $conn->error;
}

// Feche a conexão com o banco de dados
$conn->close();
?>
