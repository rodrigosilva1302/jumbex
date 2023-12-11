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
        
    }
}

// Função para validar os campos antes de enviar
function validarCampos() {
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const whatsapp = document.getElementById('whatsapp').value;

    // Expressão regular para verificar se contém apenas letras
    const regexLetras = /^[a-zA-ZÀ-ú\s]+$/;

    // Verificar se todos os campos estão preenchidos
    if (nome.trim() === '' || sobrenome.trim() === '' || whatsapp.trim() === '') {
        alert('Por favor, preencha todos os campos.');
    } else if (!regexLetras.test(nome) || !regexLetras.test(sobrenome)) {
        alert('Por favor, insira apenas letras nos campos de nome e sobrenome.');
    } else {
        const telefoneNumerico = whatsapp.replace(/\D/g, '');
        if (telefoneNumerico.length !== 11) {
            alert('O número de telefone (WhatsApp) deve conter 11 dígitos.');
        } else {
            const confirmacao = confirm(`Por favor, confirme suas informações:\n\nNome: ${nome}\nSobrenome: ${sobrenome}\nWhatsApp: ${whatsapp}\n\nAs informações estão corretas?`);
  
            if (confirmacao) {
                const itens = JSON.parse(obterParametroDaURL('itens'));
                const totalValor = parseFloat(obterParametroDaURL('totalValor')).toFixed(2);
                const totalPeso = parseFloat(obterParametroDaURL('totalPeso')).toFixed(2);

                // Construindo o corpo do email
                const corpoEmail = `Detalhes da Compra:\n\nItens Selecionados:\n${itens.map(item => `${item.descricao} - Valor: R$ ${item.valor.toFixed(2)}, Peso: ${item.peso.toFixed(2)} Kg`).join('\n')}\n\nValor Total: R$ ${totalValor}\nPeso Total: ${totalPeso} Kg\n\nInformações do Usuário:\nNome: ${nome}\nSobrenome: ${sobrenome}\nWhatsApp: ${whatsapp}`;

                // Enviar email com as informações
                Email.send({
                    // Configurações do email (Host, Username, Password, etc.)
                    // ...

                    To: 'jumbex.jumboexpress@gmail.com',
                    From: 'jumbex.jumboexpress@gmail.com',
                    Subject: 'Detalhes da Compra',
                    Body: corpoEmail
                }).then(
                    message => alert(message)
                );
            } else {
                return;
            }
        }
    }
}
