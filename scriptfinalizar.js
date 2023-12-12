// Função para obter parâmetros da URL
function obterParametroDaURL(nomeParametro) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nomeParametro);
}

// Função para exibir os detalhes da compra na página finalizar.html
function exibirDetalhesCompra() {
    const detalhesCompra = document.getElementById('detalhesCompra');
    if (detalhesCompra) {
        const itens = JSON.parse(obterParametroDaURL('itens'));
        const totalValor = parseFloat(obterParametroDaURL('totalValor')).toFixed(2);
        const totalPeso = parseFloat(obterParametroDaURL('totalPeso')).toFixed(2);

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


window.onload = function() {
    exibirDetalhesCompra();
};

document.getElementById('formularioContato').addEventListener('submit', function(event) {
    event.preventDefault();
    validarCampos();
});

const inputWhatsApp = document.getElementById('whatsapp');

inputWhatsApp.addEventListener('input', function(event) {
    const formattedNumber = event.target.value.replace(/\D/g, '');
    const maxLength = 11;

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

function cancelarEnvio() {
    const confirmacao = window.confirm("Tem certeza que deseja cancelar esta compra?");
    if (confirmacao) {
        window.close();
    } else {
        
    }
}

function validarCampos() {
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const whatsapp = document.getElementById('whatsapp').value;

    const regexLetras = /^[a-zA-ZÀ-ú\s]+$/;

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
                const detalhesCompra = encodeURIComponent(document.getElementById('detalhesCompra').innerHTML);
                const urlEnvio = `envio.html?nome=${encodeURIComponent(nome)}&sobrenome=${encodeURIComponent(sobrenome)}&whatsapp=${encodeURIComponent(whatsapp)}&detalhesCompra=${detalhesCompra}`;

                window.location.href = urlEnvio;
            } else {
                return;
            }
        }
    }
}
