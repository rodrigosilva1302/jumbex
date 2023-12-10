// Função para obter parâmetros da URL
function obterParametroDaURL(nomeParametro) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nomeParametro);
}

// Função para exibir os detalhes da compra na página finalizar.html
function exibirDetalhesCompra() {
    // Obter os parâmetros da URL
    const itens = JSON.parse(obterParametroDaURL('itens'));
    const totalValor = parseFloat(obterParametroDaURL('totalValor')).toFixed(2); // Limitar para duas casas decimais
    const totalPeso = parseFloat(obterParametroDaURL('totalPeso')).toFixed(2); // Limitar para duas casas decimais

    // Exibir os detalhes na página finalizar.html conforme necessário
    const detalhesCompra = document.getElementById('detalhesCompra');
    if (detalhesCompra) {
        // Exemplo de exibição dos detalhes na página finalizar.html
        detalhesCompra.innerHTML = `
            <h3>- Detalhes da Compra -</h3>
            <p><strong><u>Itens Selecionados:</u></strong></p>
            <ul>
                ${itens.map(item => `<li>${item.descricao} - Valor: R$ ${item.valor.toFixed(2)}, Peso: ${item.peso.toFixed(2)} Kg</li>`).join('')}
            </ul>
            <br><p><strong>-Valor Total:</strong> R$ ${totalValor}</p>
            <p><strong>-Peso Total:</strong> ${totalPeso} Kg</p></br>
        `;
    }
}

// Chamar a função para exibir os detalhes da compra quando a página finalizar.html for carregada
window.onload = function() {
    exibirDetalhesCompra();
};

// Restante do código...
document.getElementById('formularioContato').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar o comportamento padrão de enviar o formulário

    // Obter os dados do formulário
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const whatsapp = document.getElementById('whatsapp').value;

    // Aqui você pode enviar os dados para sua API ou serviço de e-mail/WhatsApp
    // Você pode usar fetch ou outros métodos para enviar os dados para sua API

    // Exemplo usando fetch para enviar os dados para sua API
    fetch('sua_url_da_api_aqui', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            sobrenome: sobrenome,
            whatsapp: whatsapp,
            // Você pode adicionar outras informações aqui obtidas da página jumbo.html
        })
    })
    .then(response => {
        if (response.ok) {
            // Se a requisição foi bem-sucedida, faça o que for necessário
            console.log('Dados enviados com sucesso!');
            // Redirecionar para outra página ou exibir uma mensagem de sucesso
        } else {
            console.error('Erro ao enviar os dados!');
            // Tratar o erro, exibir mensagem ou tomar outra ação
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});

const inputWhatsApp = document.getElementById('whatsapp');

inputWhatsApp.addEventListener('input', function(event) {
    // Remover qualquer caractere que não seja número
    const formattedNumber = event.target.value.replace(/\D/g, '');

    // Definir o máximo de caracteres para um número de telefone
    const maxLength = 11;

    // Formatar o número para o formato de telefone: (XX) XXXXX-XXXX
    if (formattedNumber.length <= 2) {
        event.target.value = formattedNumber;
    } else if (formattedNumber.length <= 7) {
        event.target.value = `(${formattedNumber.slice(0, 2)}) ${formattedNumber.slice(2)}`;
    } else if (formattedNumber.length <= maxLength) {
        event.target.value = `(${formattedNumber.slice(0, 2)}) ${formattedNumber.slice(2, 7)}-${formattedNumber.slice(7)}`;
    } else {
        event.target.value = formattedNumber.slice(0, maxLength);
    }
});

// Função para cancelar o envio dos dados
function cancelarEnvio() {
    // Exibir uma mensagem de confirmação ao usuário
    const confirmacao = window.confirm("Tem certeza que deseja cancelar esta compra?");

    // Verificar se o usuário confirmou a ação
    if (confirmacao) {
        // Se o usuário confirmar, fechar a página
        window.close();
    } else {
        // Se o usuário cancelar, não fazer nada
        // Ou você pode adicionar outra lógica aqui, se necessário
    }
}

// Função para validar os campos antes de enviar
function validarCampos() {
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const whatsapp = document.getElementById('whatsapp').value;

    // Verificar se todos os campos estão preenchidos e se o número do WhatsApp contém 11 dígitos
    if (nome.trim() === '' || sobrenome.trim() === '' || whatsapp.trim() === '') {
        alert('Por favor, preencha todos os campos.');
    } else {
        validarNumeroWhatsapp(whatsapp);
    }
}

// Função para validar o número do WhatsApp
function validarNumeroWhatsapp(whatsapp) {
    // Remover todos os caracteres que não são dígitos para verificar o comprimento do número de telefone
    const telefoneNumerico = whatsapp.replace(/\D/g, '');

    // Verificar se o campo de número de telefone (WhatsApp) tem 11 dígitos
    if (telefoneNumerico.length !== 11) {
        alert('O número de telefone (WhatsApp) deve conter 11 dígitos.');
    } else {
        // Se todos os campos estiverem preenchidos e o número do WhatsApp estiver correto, pode prosseguir com o envio do formulário
        // Aqui você pode adicionar a lógica para enviar os dados para a API ou realizar outras ações necessárias
        enviarDados(); // Substitua esta chamada de função pelo seu código de envio de dados
    }
}

// Função para enviar os dados para a API
function enviarDados() {
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const whatsapp = document.getElementById('whatsapp').value;

    // Exibir os dados preenchidos pelo usuário em um prompt de confirmação
    const confirmacao = confirm(`Por favor, verifique se os dados estão corretos:\n\nNome: ${nome}\nSobrenome: ${sobrenome}\nWhatsApp: ${whatsapp}\n\nOs dados estão corretos?`);

    // Se o usuário confirmar que os dados estão corretos, enviar para a API
    if (confirmacao) {
        // Aqui você pode adicionar o código para enviar os dados para a sua API
        // Por exemplo, usando fetch ou outro método de envio de dados
        // Substitua este comentário pela lógica de envio de dados
        console.log('Dados enviados para a API:', { nome, sobrenome, whatsapp });
    } else {
        // Se o usuário não confirmar os dados, você pode realizar alguma outra ação ou simplesmente não fazer nada
        console.log('Envio cancelado pelo usuário.');
    }
}

// Função para validar se o valor contém apenas letras
function contemApenasLetras(valor) {
    return /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/.test(valor);
}

function validarCampos() {
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const whatsapp = document.getElementById('whatsapp').value;

    // Verificar se todos os campos estão preenchidos
    if (nome.trim() === '' || sobrenome.trim() === '' || whatsapp.trim() === '') {
        alert('Por favor, preencha todos os campos.');
    } else if (!contemApenasLetras(nome) || !contemApenasLetras(sobrenome)) {
        alert('Por favor, informe seu nome e sobrenome usando apenas letras');
    } else {
        validarNumeroWhatsapp(whatsapp);
    }
}

function enviarDados() {
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const whatsapp = document.getElementById('whatsapp').value;

    const itens = JSON.parse(obterParametroDaURL('itens')); // Selecione os itens da URL anterior
    const totalValor = parseFloat(obterParametroDaURL('totalValor')).toFixed(2);
    const totalPeso = parseFloat(obterParametroDaURL('totalPeso')).toFixed(2);

    const dadosFormulario = {
        nome: nome,
        sobrenome: sobrenome,
        whatsapp: whatsapp,
        itens: itens, // Adicione os itens da compra
        totalValor: totalValor,
        totalPeso: totalPeso
        // Adicione outros dados conforme necessário
    };

    fetch('https://formsubmit.co/jumbex.jumboexpress@gmail.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosFormulario)
    })
    .then(response => {
        if (response.ok) {
            exibirMensagemSucesso();
        } else {
            exibirMensagemErro();
        }
    })
    .catch(error => {
        exibirMensagemErro();
    });
}

function exibirMensagemSucesso() {
    alert('<b>Seu pedido foi enviado para nós. Para que possa tirar suas dúvidas, entraremos em contato pelo WhatsApp. Obrigado.</b>');
    // Redirecionar para outra página ou fazer outras ações após o envio bem-sucedido
}

function exibirMensagemErro() {
    alert('Aconteceu algum problema. Tente novamente, por favor.');
    // Você pode tomar outras ações aqui em caso de erro no envio
}