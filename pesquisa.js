function verificarTecla(event) {
    if (event.keyCode === 13) { // Verifica se a tecla pressionada é o Enter (código 13)
        pesquisaGoogle();
    }
}

function pesquisaGoogle() {
    var pesquisa = document.querySelector('.search-bar').value;
    window.location.href = "https://www.google.com.br/search?q=" + encodeURIComponent(pesquisa);
}



function instalar() {
  // Verifica se o navegador suporta o evento beforeinstallprompt
  if ('beforeinstallprompt' in window) {
    // Mostra o prompt para instalação
    window.beforeinstallprompt().prompt();

    // Aguarde a resposta do usuário
    window.beforeinstallprompt().userChoice.then(function(choiceResult) {
      if (choiceResult.outcome === 'accepted') {
        console.log('O usuário instalou o aplicativo');
      } else {
        console.log('O usuário rejeitou a instalação');
      }
    });
  }
}

// Anexe o ouvinte de evento de clique ao link
document.querySelector('.install-link').addEventListener('click', instalar);
