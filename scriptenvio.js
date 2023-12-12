// Função para obter parâmetros da URL
function obterParametroDaURL(nomeParametro) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nomeParametro);
}

// Função para preencher os campos ocultos do formulário com os dados recuperados, incluindo a forma de pagamento
function preencherCamposOcultos(formaPagamento) {
    const detalhesCompra = obterParametroDaURL('detalhesCompra');
    const nome = obterParametroDaURL('nome');
    const sobrenome = obterParametroDaURL('sobrenome');
    const whatsapp = obterParametroDaURL('whatsapp');
    const nomeFamiliar = obterParametroDaURL('nomeFamiliar'); // Adicionar o parâmetro "nomeFamiliar"
    const unidadePrisional = obterParametroDaURL('unidadePrisional'); // Adicionar o parâmetro "unidadePrisional"

    // Preencher os campos ocultos com os dados recuperados e a forma de pagamento
    document.getElementById('detalhesCompraInput').value = detalhesCompra || '';
    document.getElementById('nomeInput').value = nome || '';
    document.getElementById('sobrenomeInput').value = sobrenome || '';
    document.getElementById('whatsappInput').value = whatsapp || '';
    document.getElementById('formaPagamentoInput').value = formaPagamento || '';
    document.getElementById('nomeFamiliarInput').value = nomeFamiliar || ''; // Adicionar valor ao campo oculto do nome do familiar
    document.getElementById('unidadePrisionalInput').value = unidadePrisional || ''; // Adicionar valor ao campo oculto da unidade prisional
}

// Adicionar um identificador para os botões de pagamento (por exemplo, pix, cartão, outras)
document.getElementById('pix').addEventListener('click', function() {
    preencherCamposOcultos('Pix');
});

document.getElementById('cartão').addEventListener('click', function() {
    preencherCamposOcultos('Cartão de Crédito');
});

document.getElementById('outras').addEventListener('click', function() {
    preencherCamposOcultos('Outras formas de pagamento');
});
