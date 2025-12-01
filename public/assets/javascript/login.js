// Input de e-mail
var emailInput = document.getElementById("input_email");

// Input de senha
var senhaInput = document.getElementById("input_senha");

// Status
var statusMessage = document.getElementById("status");

// Contador de tentativas de login
var quantidadeTentativas = 0;

// Função para validar as credenciais
function validarCredenciais() {
  // E-mail
  var email = emailInput.value.trim().toLowerCase();

  // Senha
  var senha = senhaInput.value;

  // Elemento para as mensagens
  var mensagem = document.getElementById("mensagem");

  // Validação para as informações
  if (email == "") {
    mensagem.innerHTML = `Campo de e-mail não pode estar vazio!`;
    emailInput.style.border = "2px solid var(--color-danger)";
  } else if (senha == "") {
    mensagem.innerHTML = `Campo de senha não pode estar vazia!`;
    emailInput.style.border = "1px solid var(--color-very-dark-blue)";
    senhaInput.style.border = "2px solid var(--color-danger)";
  } else if (
    !email.includes("@") ||
    !email.includes(".com") ||
    email.includes(" ")
  ) {
    emailInput.style.border = "2px solid var(--color-danger)";
    senhaInput.style.border = "1px solid var(--color-very-dark-blue)";
    mensagem.innerHTML = `Formato de e-mail inválido`;
  } else {
    emailInput.style.border = "1px solid var(--color-very-dark-blue)";
    senhaInput.style.border = "1px solid var(--color-very-dark-blue)";

    // Caso a função de login dê erro, aumenta a quantidade de tentativas
    if (!login(email, senha)) {
      quantidadeTentativas++;
    }

    // Valida a quantidade de tentativas
    if (quantidadeTentativas >= 3) {
      mensagem.innerHTML = `Muitas tentativas. Tente novamente mais tarde`;
      setTimeout(() => {
        quantidadeTentativas = 0;
        mensagem.innerHTML = "";
      }, 20000);
    }
  }
}

// Função para executar o login
function login(email, senha) {
  fetch("/usuarios/autenticar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      senha: senha,
    }),
  })
    .then(function (resposta) {
      // Valida se no corpo da resposta, possui item OK (HTTP 200)
      if (resposta.ok) {
        resposta.json().then((json) => {
          // Armazena no sessionStorage, um item de nome EMAIL_USUARIO o item email do JSON de resposta
          sessionStorage.EMAIL_USUARIO = JSON.stringify(json[0].email);
          sessionStorage.ID_USUARIO = JSON.stringify(json[0].id);
          sessionStorage.ID_EMPRESA = JSON.stringify(json[0].idEmpresa);

          CriarLog();

          // Restaura as bordas dos inputs ao formato original
          emailInput.style.border = "1px solid var(--color-very-dark-blue)";
          senhaInput.style.border = "1px solid var(--color-very-dark-blue)";

          // Limpa as mensagens anteriores
          mensagem.innerHTML = "";

          // Mensagem de carregando exibida em 800ms
          setTimeout(() => {
            statusMessage.innerHTML = `
            <img src="assets/icons/loading.gif" />
            <span>Carregando...</span>
          `;
          }, 800);

          // Mensagem de Usuário autenticado exibida em 2s
          setTimeout(() => {
            statusMessage.innerHTML = `
              <img src="assets/icons/success.svg" />
              <span>Usuário autenticado com sucesso</span>
          `;
          }, 2000);

          // Mensagem de redirecionar exibida em 3s
          setTimeout(() => {
            statusMessage.innerHTML = `
              <span>Redirecionando ...</span>
          `;
          }, 3000);

          // Chama a função redirecionar, após 2.5 segundos
          setTimeout(() => {
            redirecionar("dashboard/dashboard.html");
          }, 4000);

          return true;
        });
      }
    })
    .catch(function (erro) {
      console.log("Ocorreu um erro: ", erro);
    });

  return false;
}

function CriarLog() {



  fetch('usuarios/criarLog', {

    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({

      idUsuario: sessionStorage.ID_USUARIO,
      idEmpresa: sessionStorage.ID_EMPRESA

    }),

  }).then(function (resposta) {
    console.log(resposta)
    resposta.json().then((json) => {
      sessionStorage.ID_ACESSO = JSON.stringify(json.id);
      console.log(JSON.stringify(json))
    });

  })

}

// function Checkout() {

//   fetch('usuarios/checkout', {

//     method: 'POST',
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({

//       idAcesso: sessionStorage.ID_ACESSO

//     }),

//   })
//     .then(function (resposta) {

//       console.log(resposta)

//       if (resposta.ok) {

//         console.log(`
//         I'm gonna fight 'em off
//         A seven nation army couldn't hold me back
//         They're gonna rip it off
//         Takin' their time right behind my back
//         And I'm talkin' to myself at night
//         Because I can't forget
//         Back and forth through my mind
//         Behind a cigarette
//         And the message comin' from my eyes
//         Says, "Leave it alone"
//         Don't wanna hear about it
//         Every single one's got a story to tell
//         Everyone knows about it
//         From the Queen of England to the Hounds of Hell
//         And if I catch it comin' back my way
//         I'm gonna serve it to you
//         And that ain't what you want to hear
//         But that's what I'll do
//         And the feelin' comin' from my bones
//         Says, "Find a home"
//         I'm goin' to Wichita
//         Far from this opera forevermore
//         I'm gonna work the straw
//         Make the sweat drip out of every pore
//         And I'm bleedin', and I'm bleedin', and I'm bleedin'
//         Right before the Lord
//         All the words are gonna bleed from me
//         And I will think no more
//         And the stains comin' from my blood
//         Tell me, "Go back home"
  
//         `);

//       }

//     })

// }