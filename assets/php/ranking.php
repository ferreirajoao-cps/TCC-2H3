<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/ranking.css">
    <link rel="shortcut icon" href="../images/geral/logo.png" type="image/x-icon">
    <title>MateMax</title>
</head>
<body>
    <div class="container">
        <h1>Selecione uma Matéria para Filtrar o Ranking</h1>
        <form action="ranking.php" method="GET">
            <div class="form-group">
                <label for="materiaSelect">Matéria:</label>
                <select class="form-control" id="materiaSelect" name="materia" onchange="this.form.submit()">
                    <option value="A" <?= isset($_GET['materia']) && $_GET['materia'] === 'A' ? 'selected' : '' ?>>Adição</option>
                    <option value="S" <?= isset($_GET['materia']) && $_GET['materia'] === 'S' ? 'selected' : '' ?>>Subtração</option>
                    <option value="M" <?= isset($_GET['materia']) && $_GET['materia'] === 'M' ? 'selected' : '' ?>>Multiplicação</option>
                    <option value="D" <?= isset($_GET['materia']) && $_GET['materia'] === 'D' ? 'selected' : '' ?>>Divisão</option>
                </select>
            </div>
        </form>

        <?php
        // Conexão com o banco de dados
        // $servername = "sql204.infinityfree.com";
        // $username = "if0_37323049";
        // $password = "SC9Ln7M36S";
        // $dbname = "if0_37323049_matemax";
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "if0_37323049_matemax";

        // Crie uma conexão
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Verifique a conexão
        if ($conn->connect_error) {
            die("Falha na conexão: " . $conn->connect_error);
        }

        // Capturar o filtro da matéria
        $materia = isset($_GET['materia']) ? $_GET['materia'] : 'A'; // Padrão é 'A'

        // Preparar a consulta SQL para obter o ranking filtrado por matéria
        $stmt = $conn->prepare("
            SELECT j.nome, p.pontuacao 
            FROM jogador j
            JOIN pontuacao p ON j.id_J = p.id_J
            JOIN operacao o ON p.id_op = o.id_op
            WHERE o.materia = ?
            ORDER BY p.pontuacao DESC
            LIMIT 10
        ");
        $stmt->bind_param("s", $materia); // "s" significa string
        $stmt->execute();
        $result = $stmt->get_result();

        // Exibir o ranking
        if ($result->num_rows > 0) {
            echo '<img src="../images/geral/king.png" alt="" class="crown"><h2>Ranking - Matéria: ' . $materia . '</h2>';
            echo "<table class='table'>";
            echo '<tr><th><img src="../images/geral/trophy.png" alt="" class="trophy">Posição</th><th><img src="../images/geral/user.png" alt="" class="user">Jogador</th><th><img src="../images/geral/coin.png" alt="" class="coin">Pontuação</th></tr>';
            $posicao = 1;
            while ($row = $result->fetch_assoc()) {
                echo "<tr><td>" . $posicao . "</td><td>" . $row["nome"] . "</td><td>" . $row["pontuacao"] . "</td></tr>";
                $posicao++;
            }
            echo "</table>";
        } else {
            echo "Não há jogadores com pontuações registradas para esta matéria.";
        }

        // Feche a conexão com o banco de dados
        $stmt->close();
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