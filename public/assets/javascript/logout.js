function Checkout() {

  fetch('usuarios/checkout', {

    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({

      idAcesso: sessionStorage.ID_ACESSO

    }),

  })
    .then(function (resposta) {

      console.log(resposta)

      if (resposta.ok) {

        console.log('Registro de logout');

      }

    })

}

// Função para fazer o logout do usuário
function logout() {

  fetch('/../usuarios/checkout', {

    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({

      idAcesso: sessionStorage.ID_ACESSO

    }),

  })
    .then(function (resposta) {

      console.log('aaaaaaaaaaaaaa' + JSON.stringify(resposta))

      console.log('Registro de logout');
      sessionStorage.clear();
      redirecionar("../login.html");


    })

}
