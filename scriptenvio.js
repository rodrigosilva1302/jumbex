
        // Sua função para obter parâmetros da URL
        function obterParametroDaURL(nomeParametro) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(nomeParametro);
        }

        // Função para preencher os campos ocultos do formulário com os dados recuperados
        function preencherCamposOcultos() {
            const detalhesCompra = obterParametroDaURL('detalhesCompra');
            const nome = obterParametroDaURL('nome');
            const sobrenome = obterParametroDaURL('sobrenome');
            const whatsapp = obterParametroDaURL('whatsapp');

            // Preencher os campos ocultos com os dados recuperados
            document.getElementById('detalhesCompraInput').value = detalhesCompra || '';
            document.getElementById('nomeInput').value = nome || '';
            document.getElementById('sobrenomeInput').value = sobrenome || '';
            document.getElementById('whatsappInput').value = whatsapp || '';
        }

        // Chamar a função para preencher os campos ocultos ao carregar a página
        window.addEventListener('DOMContentLoaded', preencherCamposOcultos);
