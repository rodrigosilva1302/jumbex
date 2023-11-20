function verificarTecla(event) {
    if (event.keyCode === 13) { // Verifica se a tecla pressionada é o Enter (código 13)
        pesquisaGoogle();
    }
}

function pesquisaGoogle() {
    var pesquisa = document.querySelector('.search-bar').value;
    window.location.href = "https://www.google.com.br/search?q=" + encodeURIComponent(pesquisa);
}

// Arquivo service-worker.js

// Define os arquivos a serem armazenados em cache
const arquivosEmCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/jbx.png',
  // Adicione aqui todos os recursos estáticos que deseja armazenar em cache
];

// Evento de instalação do Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('cache-v1').then(cache => {
      return cache.addAll(arquivosEmCache);
    })
  );
});

// Evento para interceptar as requisições e buscar nos caches
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Verifica se o navegador suporta Service Worker
if ('serviceWorker' in navigator) {
  // Adiciona um evento de carregamento para registrar o Service Worker
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registrado com sucesso!', registration);
      })
      .catch(error => {
        console.error('Falha ao registrar o Service Worker:', error);
      });
  });
}