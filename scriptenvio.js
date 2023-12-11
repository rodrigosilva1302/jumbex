// Função para obter parâmetros da URL
function obterParametroDaURL(nomeParametro) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nomeParametro);
}


function exibirDetalhesEnvio() {
    // Recuperar os parâmetros da URL
    const nome = obterParametroDaURL('nome');
    const sobrenome = obterParametroDaURL('sobrenome');
    const whatsapp = obterParametroDaURL('whatsapp');

    // Exibir os detalhes na página envio.html conforme necessário
    const detalhesEnvio = document.getElementById('detalhesEnvio');
    if (detalhesEnvio) {
        detalhesEnvio.innerHTML = `
            <h2>Detalhes do Envio</h2>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Sobrenome:</strong> ${sobrenome}</p>
            <p><strong>WhatsApp:</strong> ${whatsapp}</p>
            <!-- Você pode processar ou utilizar essas informações conforme necessário -->
        `;
    }

    // Preencher os campos ocultos do formulário com os dados recuperados
    document.getElementById('nomeInput').value = nome;
    document.getElementById('sobrenomeInput').value = sobrenome;
    document.getElementById('whatsappInput').value = whatsapp;
}
