const forms = document.querySelectorAll('.formLista');
const listaItensSelecionados = document.getElementById('itensSelecionadosTodasFormas');
const totalValorSpan = document.getElementById('totalValor');
const totalPesoSpan = document.getElementById('totalPeso');

forms.forEach(form => {
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    let selectedCheckboxes = [];

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                if (selectedCheckboxes.length < 2) {
                    selectedCheckboxes.push(this);
                } else {
                    this.checked = false;
                }
            } else {
                const index = selectedCheckboxes.indexOf(this);
                if (index > -1) {
                    selectedCheckboxes.splice(index, 1);
                }
            }
            mostrarSelecionados();
        });
    });
});

function mostrarSelecionados() {
    let selectedItems = [];
    let totalValor = 0.00;
    let totalPeso = 0.00;

    forms.forEach(form => {
        const selectedCheckboxes = Array.from(form.querySelectorAll('input[type="checkbox"]:checked'));
        selectedItems = selectedItems.concat(selectedCheckboxes.map(checkbox => checkbox.value));
        totalValor += selectedCheckboxes.reduce((acc, checkbox) => acc + parseFloat(checkbox.getAttribute('data-valor')), 0);
        totalPeso += selectedCheckboxes.reduce((acc, checkbox) => acc + parseFloat(checkbox.getAttribute('data-peso')), 0);
    });

    const countedItems = selectedItems.reduce((acc, item) => {
        if (!acc[item]) {
            acc[item] = 1;
        } else {
            acc[item] += 1;
        }
        return acc;
    }, {});

    listaItensSelecionados.innerHTML = '';

    for (const item in countedItems) {
        if (Object.hasOwnProperty.call(countedItems, item)) {
            const li = document.createElement('li');
            li.textContent = `${countedItems[item]}-${item}`;
            listaItensSelecionados.appendChild(li);
        }
    }

    totalValorSpan.textContent = totalValor.toFixed(2);
    totalPesoSpan.textContent = totalPeso.toFixed(2);
}

// Chamada inicial para exibir itens selecionados ao carregar a página
mostrarSelecionados();

function mostrarItensSelecionados() {
  // Obter o conteúdo da div
  var conteudo = document.getElementById("itensSelecionadosTodasFormas").innerHTML;

  // Abrir uma janela com o conteúdo
  var novaJanela = window.open("", "janela-itens-selecionados", "width=320,height=480,top=100,left=100,scrollbars='yes'");

  // Limpar o conteúdo da janela
  novaJanela.document.body.innerHTML = "";

  // Escrever o conteúdo novo
  novaJanela.document.write(conteudo);

  // Aumentar o tamanho da fonte
  novaJanela.document.body.style.fontSize = "35px";
}


// Ajuste para permitir apenas um creme dental selecionado
forms.forEach(form => {
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    let selectedCheckboxes = [];

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                if (this.value.includes('CremeDental')) {
                    // Desmarcar outros itens da mesma categoria (creme dental)
                    checkboxes.forEach(otherCheckbox => {
                        if (otherCheckbox !== this && otherCheckbox.value.includes('CremeDental')) {
                            otherCheckbox.checked = false;
                        }
                    });
                }
                if (selectedCheckboxes.length < 2) {
                    selectedCheckboxes.push(this);
                } else {
                    this.checked = false;
                }
            } else {
                const index = selectedCheckboxes.indexOf(this);
                if (index > -1) {
                    selectedCheckboxes.splice(index, 1);
                }
            }
            mostrarSelecionados();
        });
    });
});

window.addEventListener('beforeunload', function (event) {
  // Cancela o evento padrão de saída da página
  event.preventDefault();
  // Mensagem de confirmação personalizada
  event.returnValue = 'JUMBEX:Tem certeza que deseja sair da compra do Jumbo? Sua lista pode não ser salva.';
});


// Função para enviar a lista selecionada para o WhatsApp
function enviarListaParaWhatsApp() {
  const itensSelecionados = document.querySelectorAll('input[name="form1_item"]:checked');
  let mensagem = 'Itens selecionados:\n';

  // Verifica se existem itens selecionados
  if (itensSelecionados.length > 0) {
    itensSelecionados.forEach((item, index) => {
      const valor = item.getAttribute('data-valor');
      const nomeItem = item.value;
      mensagem += `${index + 1}. ${nomeItem} - Valor: R$${valor}\n`;
    });

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Token': '09709eafa233d3c4901d67369988875bcfa9b497f8a964997163e6d0f4a2b13ef68dcb2d1f4cca97'
      },
      body: JSON.stringify({ "phone": "+5512982820090", "message": mensagem })
    };

    fetch('https://api.wzap.chat/v1/messages', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  } else {
    console.log('Nenhum item selecionado.');
  }
}

// Adiciona um evento de clique ao botão "Finalizar Compra" para chamar a função de enviar a lista para o WhatsApp
document.getElementById('finalizar').addEventListener('click', enviarListaParaWhatsApp);
