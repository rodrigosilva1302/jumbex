
        // Sua função para obter parâmetros da URL
        function obterParametroDaURL(nomeParametro) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(nomeParametro);
        }

        // Função para preencher os campos ocultos do formulário com os dados recuperados
        function preencherCamposOcultos() {
            const totalPeso = obterParametroDaURL('totalPeso');
            const totalValor = obterParametroDaURL('totalValor');
            const itens = obterParametroDaURL('itens');
            const nome = obterParametroDaURL('nome');
            const sobrenome = obterParametroDaURL('sobrenome');
            const whatsapp = obterParametroDaURL('whatsapp');

            // Preencher os campos ocultos com os dados recuperados
            document.getElementById('totalPesoInput').value = totalPeso || '';
            document.getElementById('totalValorInput').value = totalValor || '';
            document.getElementById('itensInput').value = itens || '';
            document.getElementById('nomeInput').value = nome || '';
            document.getElementById('sobrenomeInput').value = sobrenome || '';
            document.getElementById('whatsappInput').value = whatsapp || '';
        }

        // Chamar a função para preencher os campos ocultos ao carregar a página
        window.addEventListener('DOMContentLoaded', preencherCamposOcultos);
