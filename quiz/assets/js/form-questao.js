import perguntas from
  '../dados/perguntas.json' assert { type: 'json'};

//Variáveis
// let tempoRestante = 60; // Tempo em segundos (ajuste conforme necessário)
// let cronometroInterval;
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
let materiaSelecionada = sessionStorage.getItem('materia-selecionada'); //
let nivel = 'A';
let pontuacao = 0;
let qtdePulos = 0;
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

//Definição de Eventos
btnConfirmar.addEventListener('click', () => validarResposta());
btnPular.addEventListener('click', () => pular());
btnParar.addEventListener('click', () => parar());

//Definição de Funções
function validarResposta() {
  let resp = retornarRespostaSelecionada();

  console.log('Resposta Selecionada:', resp);

  if (resp == null) {
    alert('Selecione uma resposta antes de confirmar!!!');
    return; // Retorna imediatamente se nenhuma resposta foi selecionada
  }

  if (resp.value == perguntasDisponiveis[index].CERTA) {
    alert('Parabéns... Você Acertou!!!');
    pontuacao++;

    if (pontuacao == 20) {
      alert('Parabéns... VOCÊ GANHOU!!!');
      window.location.href = "../../index.html"
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

    alert(`Que Pena... Você Errou \nResposta Correta: ${respostaCorreta}`);
    qtdeErros++;

    if (qtdeErros == 3) {
      alert('Fim de Jogo!!!');
      window.location.href = "../../index.html"
    }
  }

  resp.checked = false;

  atualizarDadosPartida();
  sortear();
}



function pular() {
  qtdePulos++;
  if (qtdePulos == 3) {
    btnPular.disabled = true;
  }

  let resp = retornarRespostaSelecionada();
  if (resp != null) {
    resp.checked = false;
  }

  atualizarDadosPartida();
  sortear();
}

function atualizarDadosPartida() {
  // tempoRestante = 60;
  spanNivel.innerText = `Nível: ${nivel}`;
  spanPontuacao.innerText = `Pontos: ${pontuacao}`;
  spanPulos.innerText = `Pulos: ${qtdePulos}`;
  spanErros.innerText = `Erros: ${qtdeErros}`;
}
//   function iniciarCronometro() {
//     cronometroInterval = setInterval(function() {
//         if (tempoRestante <= 0) {
//           let resp = retornarRespostaSelecionada();
//             // Tempo esgotado, faça algo (por exemplo, chame a função de validação)
//             clearInterval(cronometroInterval);
//             if (resp == null){
//               if(qtdePulos>2){
//                 alert('Fim de Jogo!!!');
//                 window.location.href = "../../index.html"
//               }else{
//                 alert("O Tempo Acabou!!!")
//                 pular();
//               }
//             }else{validarResposta()}
//         } else {
//             // Atualize o cronômetro e exiba-o no elemento HTML
//             const minutos = Math.floor(tempoRestante / 60);
//             const segundos = tempoRestante % 60;
//             const cronometroElement = document.getElementById('cronometro');
//             cronometroElement.textContent = `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
//             tempoRestante--;
//         }
//     }, 1000); // Atualize a cada segundo
// }

function sortear() {
  // Pare o cronômetro se estiver ativo
  // clearInterval(cronometroInterval);

  // Inicie o cronômetro para a nova pergunta
  // iniciarCronometro();

  perguntasDisponiveis = perguntas.filter(pergunta => {
    return pergunta.MATERIA == materiaSelecionada &&
      pergunta.NIVEL == nivel &&
      pergunta.JA_FOI == 'N';
  });

  // for (let index = 0; index < perguntas.length; index++) {
  //   if (perguntas[index].MATERIA == materiaSelecionada) {
  //     perguntasDisponiveis.push(perguntas[index]);
  //   }
  // }

  index = Math.floor(Math.random() * perguntasDisponiveis.length);

  for (let idx = 0; idx < perguntas.length; idx++) {
    if (perguntas[idx].PERGUNTA == perguntasDisponiveis[index].PERGUNTA) {
      perguntas[idx].JA_FOI = 'S';
      break;
    }
  }

  //Movendo os dados do array de posição(index) 0 para a tela
  h3Pergunta.innerText = perguntasDisponiveis[index].PERGUNTA;
  labelResposta01.innerText = perguntasDisponiveis[index].RESP1;
  labelResposta02.innerText = perguntasDisponiveis[index].RESP2;
  labelResposta03.innerText = perguntasDisponiveis[index].RESP3;
  labelResposta04.innerText = perguntasDisponiveis[index].RESP4;
}

function parar() {
  alert('Que pena, você desistiu!!!');
  window.location.href = "../../index.html"
}

function retornarRespostaSelecionada() {
  let resposta = document.querySelector('input[name="resposta"]:checked');
  return resposta;
}

atualizarDadosPartida();
sortear();

//Math.random: É uma função matemática do JavaScript Math.(alguma coisa).
//Math.random * 2: O random  tem limite de até 2, o (*) nesse caso significa limitar o random
// Math.floor: Serve para arredondar um número(ele sempre arredondará para baixo por exemplo:11.971094701967502 ele arredonda para 11)




