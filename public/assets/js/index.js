// Recupere a referência ao botão "Iniciar Jogo" e ao campo de entrada de texto
const btnIniciarJogo = document.getElementById('btnplay'); // Use o ID correto "btnplay"
const inputNomeJogador = document.getElementById('nickinsert');

// Adicione um ouvinte de evento de clique ao botão "Iniciar Jogo" uma única vez
btnIniciarJogo.addEventListener('click', () => {
  const nomeJogador = inputNomeJogador.value.trim(); // Obtém o nome e remove espaços em branco

  if (nomeJogador) {
    // Armazene o nome do jogador na sessão local (local storage)
    localStorage.setItem('nomeJogador', nomeJogador);

    // O nome foi inserido, você pode fazer algo com ele, como iniciar o jogo ou redirecionar para a próxima tela do jogo.
    window.location.href = "./assets/html/materias.html";
    // Aqui você pode iniciar o jogo ou redirecionar para a próxima tela do jogo.
  } else {
    alert('Por favor, insira seu nome antes de iniciar o jogo.');
  }
});

function enviarPontuacao(nomeJogador, pontos) {
  fetch('matemax.free.nf/inserir_pontuacao.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          nomeJogador: nomeJogador,
          pontos: pontos
      })
  })
  .then(response => response.text())
  .then(data => {
      console.log(data);
      // Você pode fazer algo após enviar a pontuação, como redirecionar para o ranking
  })
  .catch(error => {
      console.error('Erro:', error);
  });
}
