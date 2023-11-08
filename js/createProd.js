document.getElementById('submitButton').addEventListener('click', createProduct);
// var token = localStorage.getItem('token');
function createProduct() {
    const nomeProduto = document.getElementById('nomeprod').value;
    const precoProduto = document.getElementById('precoprod').value;
    const quantidadeProduto = document.getElementById('quantidadeprod').value;

    if (!nomeProduto && !precoProduto && !quantidadeProduto) {
        alert("Por favor, insira um nome, um preço e uma quantidade!");
        return;
    } else if (!nomeProduto && !precoProduto) {
        alert("Por favor, insira um nome e um preço!");
        return;
    } else if (!nomeProduto && !quantidadeProduto) {
        alert("Por favor, insira um nome e uma quantidade!");
        return;
    } else if (!nomeProduto) {
        alert("Por favor, insira um nome!");
        return;
    } else if (!precoProduto && !quantidadeProduto) {
        alert("Por favor, insira um preço e uma quantidade!");
        return;
    } else if (!precoProduto) {
        alert("Por favor, insira um preço!");
        return;
    } else if (!quantidadeProduto) {
        alert("Por favor, insira uma quantidade!");
        return;
    }
    
    const produto = {
        nome: nomeProduto,
        preco: precoProduto,
        quantidade: quantidadeProduto
    };

    fetch('/backend/produtos.php', { 
        method: 'POST',
        headers: {
            // 'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
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
        if(!data.status){
            alert('Produto já existe');
        }else{
            alert("Produto criado com sucesso!");
        } 
       
    })
    .catch(error => alert('Erro na requisição: ' + error));
}
