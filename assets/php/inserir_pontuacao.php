<?php
// Conexão com o banco de dados (substitua pelas suas informações de conexão)
$servername = "sql204.infinityfree.com";
$username = "if0_37323049";
$password = "SC9Ln7M36S";
$dbname = "if0_37323049_matemax";

// Crie uma conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifique a conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Receba os dados do jogador, pontuação e matéria do cliente
$data = json_decode(file_get_contents("php://input"), true);
$nomeJogador = $data['nomeJogador'];
$pontuacao = $data['pontos'];
$materia = $data['materia']; // A matéria será algo como 'A', 'S', 'M' ou 'D'

echo "Nome do jogador: " . $nomeJogador . "\n";
echo "Pontuação: " . $pontuacao . "\n";
echo "Matéria: " . $materia . "\n";

// Verifique se o jogador já existe
$sqlBuscaJogador = "SELECT id_J FROM jogador WHERE nome = '$nomeJogador'";
$result = $conn->query($sqlBuscaJogador);

if ($result->num_rows > 0) {
    // Se o jogador já existe, obtenha o id_J
    $row = $result->fetch_assoc();
    $id_J = $row['id_J'];
} else {
    // Se o jogador não existe, insira o jogador na tabela "jogador"
    $sqlInsereJogador = "INSERT INTO jogador (nome) VALUES ('$nomeJogador')";
    if ($conn->query($sqlInsereJogador) === TRUE) {
        // Obtenha o id_J do novo jogador
        $id_J = $conn->insert_id;
    } else {
        die("Erro ao inserir o jogador: " . $conn->error);
    }
}

// Verifique se a matéria existe e obtenha o id_op (deve estar previamente inserida na tabela "operacao")
$sqlBuscaMateria = "SELECT id_op FROM operacao WHERE materia = '$materia'";
$resultMateria = $conn->query($sqlBuscaMateria);

if ($resultMateria->num_rows > 0) {
    // Se a matéria existe, obtenha o id_op
    $rowMateria = $resultMateria->fetch_assoc();
    $id_op = $rowMateria['id_op'];
} else {
    die("Erro: Matéria não encontrada.");
}

// Inserir a pontuação do jogador na tabela "pontuacao"
$sqlInserePontuacao = "INSERT INTO pontuacao (id_J, id_op, pontuacao) VALUES ($id_J, $id_op, $pontuacao)";
if ($conn->query($sqlInserePontuacao) === TRUE) {
    echo "Pontuação inserida com sucesso.";
} else {
    echo "Erro ao inserir pontuação: " . $conn->error;
}

// Feche a conexão com o banco de dados
$conn->close();
?>
