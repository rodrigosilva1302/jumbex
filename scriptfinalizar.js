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

// Função para enviar os dados do formulário para a API do SendGrid
        async function enviarEmail(event) {
            event.preventDefault(); // Evita o comportamento padrão do formulário de recarregar a página

            const nome = document.getElementById('nome').value;
            const sobrenome = document.getElementById('sobrenome').value;
            const whatsapp = document.getElementById('whatsapp').value;

            // Dados a serem enviados para a API do SendGrid
            const data = {
                personalizations: [
                    {
                        to: [
                            {
                                email: 'jumbex.jumboexpress@gmail.com' // Substitua pelo seu endereço de e-mail
                            }
                        ],
                        subject: 'Novo cadastro de cliente'
                    }
                ],
                from: {
                    email: 'jumbex.jumboexpress@gmail.com' // Substitua pelo seu endereço de e-mail
                },
                content: [
                    {
                        type: 'text/plain',
                        value: `Nome: ${nome}\nSobrenome: ${sobrenome}\nWhatsApp: ${whatsapp}`
                    }
                ]
            };

            try {
                const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer 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',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert('E-mail enviado com sucesso!');
                } else {
                    alert('Ocorreu um erro ao enviar o e-mail.');
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Ocorreu um erro ao enviar o e-mail. Verifique o console para mais detalhes.');
            }
        }


