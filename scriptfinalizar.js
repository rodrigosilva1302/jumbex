// Função para obter parâmetros da URL
function obterParametroDaURL(nomeParametro) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nomeParametro);
}

// Função para exibir os detalhes da compra na página finalizar.html
function exibirDetalhesCompra() {
    // Obter os parâmetros da URL
    const itens = JSON.parse(obterParametroDaURL('itens'));
    const totalValor = obterParametroDaURL('totalValor');
    const totalPeso = parseFloat(obterParametroDaURL('totalPeso')).toFixed(2); // Limitando para duas casas decimais

    // Exibir os detalhes na página finalizar.html conforme necessário
    const detalhesCompra = document.getElementById('detalhesCompra');
    if (detalhesCompra) {
        // Exemplo de exibição dos detalhes na página finalizar.html
        detalhesCompra.innerHTML = `
            <h3>- Detalhes da Compra -</h3>
            <p><strong><u>Itens Selecionados:</u></strong></p>
            <ul>
                ${itens.map(item => `<li>${item.descricao} - Valor: R$ ${item.valor.toFixed(2)}, Peso: ${item.peso} Kg</li>`).join('')}
            </ul>
            <p><strong>-Total de Valor:</strong> R$ ${totalValor}</p>
            <p><strong>-Total de Peso:</strong> ${totalPeso} Kg</p>
        `;
    }
}

// Chamar a função para exibir os detalhes da compra quando a página finalizar.html for carregada
window.onload = function() {
    exibirDetalhesCompra();
};


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
    const confirmacao = window.confirm("JUMBEX: Tem certeza que deseja cancelar esta compra?");

    // Verificar se o usuário confirmou a ação
    if (confirmacao) {
        // Se o usuário confirmar, fechar a página
        window.close();
    } else {
        // Se o usuário cancelar, não fazer nada
        // Ou você pode adicionar outra lógica aqui, se necessário
    }
}
