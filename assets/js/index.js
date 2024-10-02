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
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Por favor, insira seu nome antes de iniciar o jogo.",
      showConfirmButton: true,
      timer: 3500,
      confirmButtonText: '👍'
  });
  }
});
