function displayProducts(data) {
    const products = data.produtos;  
    const productsDiv = document.getElementById('productsList');
    productsDiv.innerHTML = ''; 

    const list = document.createElement('ul');
    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.id} - ${product.nome} - ${product.preco} - ${product.quantidade}`;
        list.appendChild(listItem);
    });

    productsDiv.appendChild(list);
}

function getAll() {
    fetch('/backend/produtos.php', {
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
        displayProducts(data);
    })
    .catch(error => alert('Erro na requisição: ' + error));
}


getAll();