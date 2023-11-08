function updateUser() {
    const userId = document.getElementById("getUserId").value;
    const userName = document.getElementById("inpuNome").value;
    const userEmail = document.getElementById("inputEmail").value;
    if (!userName && !userEmail) {
        alert("Por favor, insira um nome e um email!");
        return;
    }  else if (!userName) {
        alert("Por favor, insira um nome!");
        return;
    }  else if (!userEmail) {
        alert("Por favor, insira um email!");
        return;
    }
    // Função tirada de https://www.w3resource.com/javascript/form/email-validation.php
    function validateEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true;
        }  else {
            return false;
        }
    }

    if (validateEmail(userEmail) === false) {
        alert("Por favor, insira um email válido!");
        return;
    }
    const usuarioAtualizado = {
        nome: userName,
        email: userEmail
    };

    fetch('/backend/usuarios.php?id=' + userId, { 
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioAtualizado)
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
            alert("Não pode atualizar!");
        }else{
            alert("Usuário atualizado com sucesso!");
        } 
        
    })
    .catch(error => alert('Erro na requisição: ' + error));
}
