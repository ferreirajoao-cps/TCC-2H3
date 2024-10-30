<?php
// Configuração da conexão com o banco de dados
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

// Configurar a conexão para utilizar utf8mb4 (caso você mude o charset no banco de dados)
$conn->set_charset("utf8mb4");

// Receber os dados do jogador, pontuação e matéria do cliente
$data = json_decode(file_get_contents("php://input"), true);
$nomeJogador = $data['nomeJogador'] ?? null;
$pontuacao = $data['pontos'] ?? null;
$materia = $data['materia'] ?? null;  // A matéria será algo como 'A', 'S', 'M' ou 'D'

// Validar se os dados essenciais foram recebidos
if (!$nomeJogador || !$pontuacao || !$materia) {
    die("Erro: Dados insuficientes fornecidos.");
}

// Verificar se o jogador já existe
$stmt = $conn->prepare("SELECT id_J FROM jogador WHERE nome = ?");
$stmt->bind_param("s", $nomeJogador);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Se o jogador já existe, obtenha o id_J
    $row = $result->fetch_assoc();
    $id_J = $row['id_J'];
} else {
    // Se o jogador não existe, insira o jogador na tabela "jogador"
    $stmtInsereJogador = $conn->prepare("INSERT INTO jogador (nome) VALUES (?)");
    $stmtInsereJogador->bind_param("s", $nomeJogador);
    if ($stmtInsereJogador->execute()) {
        // Obtenha o id_J do novo jogador
        $id_J = $stmtInsereJogador->insert_id;
    } else {
        die("Erro ao inserir o jogador: " . $conn->error);
    }
}

// Verificar se a matéria existe e obter o id_op (deve estar previamente inserida na tabela "operacao")
$stmtMateria = $conn->prepare("SELECT id_op FROM operacao WHERE materia = ?");
$stmtMateria->bind_param("s", $materia);
$stmtMateria->execute();
$resultMateria = $stmtMateria->get_result();

if ($resultMateria->num_rows > 0) {
    // Se a matéria existe, obtenha o id_op
    $rowMateria = $resultMateria->fetch_assoc();
    $id_op = $rowMateria['id_op'];
} else {
    die("Erro: Matéria não encontrada.");
}

// Inserir a pontuação do jogador na tabela "pontuacao"
$stmtPontuacao = $conn->prepare("INSERT INTO pontuacao (id_J, id_op, pontuacao) VALUES (?, ?, ?)");
$stmtPontuacao->bind_param("iii", $id_J, $id_op, $pontuacao);

if ($stmtPontuacao->execute()) {
    echo "Pontuação inserida com sucesso.";
} else {
    echo "Erro ao inserir pontuação: " . $conn->error;
}

// Fechar a conexão com o banco de dados
$conn->close();
?>