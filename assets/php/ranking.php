<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/ranking.css ">
    <link rel="shortcut icon" href="../images/geral/logo.png" type="image/x-icon">
    <title>Kinect - Quiz</title>
</head>
<body>
    <div class="container">
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

// Consulta SQL para obter os top 10 jogadores com mais pontos
$sql = "SELECT nome, pontuacao FROM jogadores ORDER BY pontuacao DESC LIMIT 10";
$result = $conn->query($sql);

// Exibir os top 10 jogadores
if ($result->num_rows > 0) {
    echo '<img src="../images/geral/king.png" alt="" class="crown"><h1>Ranking</h1>';
    echo "<table>";
    echo '<tr><th><img src="../images/geral/trophy.png" alt="" class="trophy">Posição</th><th><img src="../images/geral/user.png" alt="" class="user">Jogador</th><th><img src="../images/geral/coin.png" alt="" class="coin">Pontuação</th></tr>';
    $posicao = 1;
    while($row = $result->fetch_assoc()) {
        echo "<tr><td>".$posicao."</td><td>".$row["nome"]."</td><td>".$row["pontuacao"]."</td></tr>";
        $posicao++;
    }
    echo "</table>";
} else {
    echo "Não há jogadores com pontuações registradas.";
}

// Feche a conexão com o banco de dados
$conn->close();
?>

</div>
<br>
<a class="btn" href="../../index.html">
<img class="backicon" src="../images/geral/back.png" alt="">
Voltar
</a> 
</body>
</html>

