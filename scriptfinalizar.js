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

    // Expressão regular para verificar se contém apenas letras
    const regexLetras = /^[a-zA-ZÀ-ú\s]+$/;

    // Verificar se todos os campos estão preenchidos
    if (nome.trim() === '' || sobrenome.trim() === '' || whatsapp.trim() === '') {
        alert('Por favor, preencha todos os campos.');
    } else if (!regexLetras.test(nome) || !regexLetras.test(sobrenome)) { // Verificar se nome e sobrenome contêm apenas letras
        alert('Por favor, insira apenas letras nos campos de nome e sobrenome.');
    } else {
        // Verificar se o número de telefone (WhatsApp) tem 11 dígitos
        const telefoneNumerico = whatsapp.replace(/\D/g, '');
        if (telefoneNumerico.length !== 11) {
            alert('O número de telefone (WhatsApp) deve conter 11 dígitos.');
        } else {
            // Se todos os campos estiverem preenchidos corretamente, exibir a mensagem de confirmação para o usuário
            const confirmacao = confirm(`Por favor, confirme suas informações:\n\nNome: ${nome}\nSobrenome: ${sobrenome}\nWhatsApp: ${whatsapp}\n\nAs informações estão corretas?`);
  
            if (confirmacao) {
                // Se o usuário confirmar, pode prosseguir com o envio dos dados para a API ou outras ações necessárias
                enviarDados(); // Substitua esta chamada de função pelo seu código de envio de dados
            } else {
                // Se o usuário cancelar, você pode realizar alguma ação ou simplesmente não fazer nada
            }
        }
    }
}
const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Configure a API Key da SendGrid
const apiKey = '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';
sgMail.setApiKey(apiKey);

// Endpoint para receber dados do formulário e página jumbo.htm
app.post('/enviar-email', (req, res) => {
    const nome = req.body.nome;
    const sobrenome = req.body.sobrenome;
    const whatsapp = req.body.whatsapp;

    // Extraia os parâmetros da URL da página jumbo.htm
    const itens = req.body.itens; // Você precisa definir como os itens serão enviados para este endpoint

    // Configure o corpo do e-mail com os dados recebidos
    const emailBody = `
        Detalhes da Compra:
        Nome: ${nome}
        Sobrenome: ${sobrenome}
        WhatsApp: ${whatsapp}
        Itens Selecionados: ${itens}
    `;

    // Configure as informações do e-mail
    const msg = {
        to: 'seuemail@example.com', // Substitua pelo seu e-mail
        from: 'remetente@example.com', // Substitua pelo e-mail remetente
        subject: 'Detalhes da Compra',
        text: emailBody,
    };

    // Envie o e-mail usando a SendGrid
    sgMail.send(msg)
        .then(() => {
            console.log('E-mail enviado com sucesso');
            res.status(200).send('E-mail enviado com sucesso');
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Erro ao enviar o e-mail');
        });
});

// Inicie o servidor na porta desejada
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});

