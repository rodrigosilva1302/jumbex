function verificarTecla(event) {
    if (event.keyCode === 13) { // Verifica se a tecla pressionada é o Enter (código 13)
        pesquisaGoogle();
    }
}

function pesquisaGoogle() {
    var pesquisa = document.querySelector('.search-bar').value;
    window.location.href = "https://www.google.com.br/search?q=" + encodeURIComponent(pesquisa);
}





let deferredPrompt;

window.addEventListener('beforeinstallprompt', function(event) {
  // Evita que o prompt seja mostrado automaticamente
  event.preventDefault();
  // Salva o evento para ser usado mais tarde
  deferredPrompt = event;

if ('beforeinstallprompt' in window) {
  // O navegador suporta o evento
} else {
  // O navegador não suporta o evento
}

  // Habilita o botão para instalar o aplicativo
  document.getElementById('install-btn').style.display = 'block';
});

function instalar() {
  if (deferredPrompt) {
    // Mostra o prompt para instalação
    deferredPrompt.prompt();

    // Aguarde a resposta do usuário
    deferredPrompt.userChoice.then(function(choiceResult) {
      if (choiceResult.outcome === 'accepted') {
        console.log('O usuário instalou o aplicativo');
      } else {
        console.log('O usuário rejeitou a instalação');
      }
      deferredPrompt = null;
    });
  }
}

document.getElementById('install-btn').addEventListener('click', instalar);

