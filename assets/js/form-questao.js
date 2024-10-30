// Carregando o arquivo JSON usando Fetch API
let perguntas = [];
fetch('../dados/perguntas.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar o JSON');
        }
        return response.json();
    })
    .then(data => {
        perguntas = data;
        // Inicializar a partida após carregar as perguntas
        atualizarDadosPartida();
        sortear();
    })
    .catch(error => console.error('Erro ao carregar o JSON:', error));


// Variáveis


let h3Pergunta = document.getElementById('h3Pergunta');
let labelResposta01 = document.getElementById('labelResposta01');
let labelResposta02 = document.getElementById('labelResposta02');
let labelResposta03 = document.getElementById('labelResposta03');
let labelResposta04 = document.getElementById('labelResposta04');
let btnConfirmar = document.getElementById('btnConfirmar');
let btnPular = document.getElementById('btnPular');
let btnParar = document.getElementById('btnParar');
let spanNivel = document.getElementById('spanNivel');
let spanPontuacao = document.getElementById('spanPontuacao');
let spanPulos = document.getElementById('spanPulos');
let spanErros = document.getElementById('spanErros');
let materiaSelecionada = sessionStorage.getItem('materia-selecionada');
let nivel = 'A';
let pontuacao = 0;
let qtdePulos = 3;
let qtdeErros = 0;
let perguntasDisponiveis = [];
let index;

document.addEventListener("DOMContentLoaded", function () {
    var respostas = document.querySelectorAll('.resp1, .resp2, .resp3, .resp4');
    respostas.forEach(function (resposta) {
        resposta.addEventListener('click', function () {
            var radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
        });
    });
});

// Definição de Eventos
btnConfirmar.addEventListener('click', () => validarResposta());
btnPular.addEventListener('click', () => pular());
btnParar.addEventListener('click', () => parar());

// Definição de Funções
function validarResposta() {
    let resp = retornarRespostaSelecionada();

    console.log('Resposta Selecionada:', resp);

    if (resp == null) {
        Swal.fire({
            position: "center",
            title: 'Error!',
            text: 'Selecione uma resposta antes de confirmar!!!',
            icon: 'error',
            confirmButtonText: '👍'
        });
        return; // Retorna imediatamente se nenhuma resposta foi selecionada
    }

    if (resp.value == perguntasDisponiveis[index].CERTA) {
        const audio = document.getElementById('audioSucesso');
        audio.play();
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Parabéns, você acertou!!!",
            showConfirmButton: true,
            confirmButtonText: '👍'
        });
        
        pontuacao++;

        if (pontuacao == 20) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "🎉🎉Parabéns, você ganhou 🎉🎉",
                showConfirmButton: true,
                confirmButtonText: '👍'
            });
            inserirNoRanking();
            enviarpontuacao();
            window.location.href = "../../index.html";
        } else {
            nivel = pontuacao <= 4 ? 'A' :
                pontuacao <= 9 ? 'B' :
                    pontuacao <= 14 ? 'C' :
                        'D';
        }
    } else {
        let respostaCorreta =
            perguntasDisponiveis[index].CERTA == 1 ? perguntasDisponiveis[index].RESP1 :
                perguntasDisponiveis[index].CERTA == 2 ? perguntasDisponiveis[index].RESP2 :
                    perguntasDisponiveis[index].CERTA == 3 ? perguntasDisponiveis[index].RESP3 :
                        perguntasDisponiveis[index].RESP4;

                        const audio = document.getElementById('audioFalha');
        audio.play();
        Swal.fire({
            position: "center",
            title: 'Que Pena...',
            text: `Você Errou! Resposta Correta: ${respostaCorreta}`,
            icon: 'error',
            confirmButtonText: 'OK'
        });

        qtdeErros++;

        if (qtdeErros == 3) {
            Swal.fire({
                position: "center",
                title: 'Fim de Jogo!',
                text: 'Você cometeu 3 erros.',
                icon: 'error',
                confirmButtonText: 'OK'
            }).then(() => {
                enviarpontuacao();
                window.location.href = "../../index.html";
            });
        }
    }

    resp.checked = false;

    atualizarDadosPartida();
    sortear();
}

function parar() {
    const audio = document.getElementById('audioParar');
        audio.play();
    Swal.fire({
        position: "center",
        title: 'Você decidiu parar!',
        text: 'Que pena, você desistiu!',
        icon: 'info',
        confirmButtonText: 'Voltar ao início'
    }).then(() => {
        enviarpontuacao();
        window.location.href = "../../index.html";
    });
}

function retornarRespostaSelecionada() {
    let resposta = document.querySelector('input[name="resposta"]:checked');
    return resposta;
}

function enviarpontuacao() {
    const nomeJogador = localStorage.getItem('nomeJogador'); // Substitua pelo nome do jogador
    const pontos = pontuacao; // Substitua pela pontuação do jogador

    fetch('../php/inserir_pontuacao.php', {
        method: 'POST',
        body: JSON.stringify({ nomeJogador, pontos }), // Alterado de 'pontuacao' para 'pontos'
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.text())
        .then(data => {
            console.log(data); // Deve imprimir a resposta do servidor (sucesso ou erro)
        })
        .catch(error => {
            console.error('Erro ao enviar os dados para o servidor:', error);
        });
}
function atualizarDadosPartida() {

    spanNivel.innerText = `Nível: ${nivel}`;
    spanPontuacao.innerText = `Pontos: ${pontuacao}`;
    spanPulos.innerText = `Pulos: ${qtdePulos}`;
    spanErros.innerText = `Erros: ${qtdeErros}`;
}
function pular() {
    const audio = document.getElementById('audioPular');
        audio.play();
    qtdePulos--;
    if (qtdePulos == 0) {
        btnPular.disabled = true;
    }
    
    let resp = retornarRespostaSelecionada();
    if (resp != null) {
        resp.checked = false;
    }

    atualizarDadosPartida();
    sortear();    
}
function sortear() {


    perguntasDisponiveis = perguntas.filter(pergunta => {
        return pergunta.MATERIA == materiaSelecionada &&
            pergunta.NIVEL == nivel &&
            pergunta.JA_FOI == 'N';
    });

    index = Math.floor(Math.random() * perguntasDisponiveis.length);

    for (let idx = 0; idx < perguntas.length; idx++) {
        if (perguntas[idx].PERGUNTA == perguntasDisponiveis[index].PERGUNTA) {
            perguntas[idx].JA_FOI = 'S';
            break;
        }
    }

    h3Pergunta.innerText = perguntasDisponiveis[index].PERGUNTA;
    labelResposta01.innerText = perguntasDisponiveis[index].RESP1;
    labelResposta02.innerText = perguntasDisponiveis[index].RESP2;
    labelResposta03.innerText = perguntasDisponiveis[index].RESP3;
    labelResposta04.innerText = perguntasDisponiveis[index].RESP4;    
}