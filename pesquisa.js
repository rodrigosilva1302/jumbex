function verificarTecla(event) {
    if (event.keyCode === 13) { // Verifica se a tecla pressionada é o Enter (código 13)
        pesquisaGoogle();
    }
}

function pesquisaGoogle() {
    var pesquisa = document.querySelector('.search-bar').value;
    window.location.href = "https://www.google.com.br/search?q=" + encodeURIComponent(pesquisa);
}

function adicionarTelaInicial() {
  if (document.querySelector('[rel="manifest"]')) {
    // Se o manifest.json estiver configurado, usa-se o método `prompt` para sugerir a adição à tela inicial.
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault(); // Previne o prompt padrão
      const promptEvent = event;
      // Exibe um prompt personalizado
      promptEvent.prompt();
      promptEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Usuário aceitou adicionar à tela inicial');
        } else {
          console.log('Usuário rejeitou adicionar à tela inicial');
        }
      });
    });
  } else {
    // Caso não haja um manifest.json, fornece instruções para adicionar manualmente.
    alert('Para adicionar manualmente, acesse as configurações do seu navegador e procure a opção "Adicionar à Tela Inicial"');
  }
}