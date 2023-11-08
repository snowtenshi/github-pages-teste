function getProd() {
    const productId = document.getElementById("getProdId").value;

    fetch('/backend/produtos.php?id=' + productId, {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Não autorizado');
            } else {
                throw new Error('Sem rede ou não conseguiu localizar o recurso');
            }
        }
        return response.json();
    })
    .then(data => {
        if (!data.status){
            alert('Produto não encontrado')
            document.getElementById("nomeprod").value = ''; 
            document.getElementById('precoprod').value = '';
            document.getElementById('quantidadeprod').value = '';
        } else {
            document.getElementById("nomeprod").value = data.produto.nome;
            document.getElementById('precoprod').value = data.produto.preco;
            document.getElementById('quantidadeprod').value = data.produto.quantidade; 
        } 
       
    })
    .catch(error => alert('Erro na requisição: ' + error));
}