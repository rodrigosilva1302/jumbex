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

    listaItensSelecionados.innerHTML = '';

    selectedItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        listaItensSelecionados.appendChild(li);
    });

    totalValorSpan.textContent = totalValor.toFixed(2);
    totalPesoSpan.textContent = totalPeso.toFixed(2);
}

// Chamada inicial para exibir itens selecionados ao carregar a página
mostrarSelecionados();
