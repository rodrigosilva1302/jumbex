// scriptmail.js

function enviarEmail(dadosJumbo, nome, sobrenome, whatsapp) {
    const sendGridAPIKey = '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'; // Sua chave de API SendGrid
    const url = 'https://api.sendgrid.com/v3/mail/send';

    const conteudoEmail = `
        Dados da página Jumbo:
        - Detalhes: ${JSON.stringify(dadosJumbo)}

        Dados do Formulário:
        - Nome: ${nome}
        - Sobrenome: ${sobrenome}
        - WhatsApp: ${whatsapp}
    `;

    const emailData = {
        personalizations: [
            {
                to: [{ email: 'jumbex.jumboexpress@gmail.com' }], // Seu endereço de email como destinatário
                subject: 'Dados da Compra - Jumbo Express' // Assunto do email
            }
        ],
        from: { email: 'jumbex.jumboexpress@gmail.com' }, // Seu endereço de email como remetente
        content: [
            {
                type: 'text/plain',
                value: conteudoEmail // Conteúdo do email
            }
        ]
    };

    fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sendGridAPIKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
    })
    .then(response => {
        if (response.ok) {
            console.log('Email enviado com sucesso!');
        } else {
            console.error('Erro ao enviar o email:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

// Chamada para enviar o email
// Certifique-se de ter os dados adequados de jumbo.html e finalizar.html para passar como parâmetros
// Supondo que você tenha esses dados disponíveis na variável dadosJumbo, nome, sobrenome e whatsapp
enviarEmail(dadosJumbo, nome, sobrenome, whatsapp);
