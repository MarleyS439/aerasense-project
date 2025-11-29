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
