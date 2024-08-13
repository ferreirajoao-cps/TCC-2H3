// /**
//  * Import function triggers from their respective submodules:
//  *
//  * const {onCall} = require("firebase-functions/v2/https");
//  * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
//  *
//  * See a full list of supported triggers at https://firebase.google.com/docs/functions
//  */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started

// // exports.helloWorld = onRequest((request, response) => {
// //   logger.info("Hello logs!", {structuredData: true});
// //   response.send("Hello from Firebase!");
// // });const functions = require('firebase-functions');
const mysql = require('mysql');

// Configuração da conexão com o banco de dados
const dbConfig = {
    host: "sql5.freesqldatabase.com",
    user: "sql5725745",
    password: "5b8LG3q7ND",
    database: "sql5725745"
};

// Função para obter o ranking
exports.getRanking = functions.https.onRequest((req, res) => {
    const connection = mysql.createConnection(dbConfig);

    connection.connect(err => {
        if (err) {
            console.error('Erro ao conectar ao banco de dados:', err);
            res.status(500).send('Erro ao conectar ao banco de dados');
            return;
        }

        connection.query("SELECT nome, pontuacao FROM jogadores ORDER BY pontuacao DESC LIMIT 10", (error, results) => {
            if (error) {
                console.error('Erro ao realizar a consulta:', error);
                res.status(500).send('Erro ao realizar a consulta');
                return;
            }

            res.status(200).json(results);
            connection.end();
        });
    });
});
function loadRanking() {
    fetch('https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/getRanking')
        .then(response => response.json())
        .then(data => {
            let rankingTable = '<table>';
            rankingTable += '<tr><th>Posição</th><th>Jogador</th><th>Pontuação</th></tr>';
            data.forEach((player, index) => {
                rankingTable += `<tr><td>${index + 1}</td><td>${player.nome}</td><td>${player.pontuacao}</td></tr>`;
            });
            rankingTable += '</table>';
            document.getElementById('ranking').innerHTML = rankingTable;
        })
        .catch(error => console.error('Error loading ranking:', error));
}
