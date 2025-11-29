// Input de e-mail
var emailInput = document.getElementById("input_email");

// Input de senha
var senhaInput = document.getElementById("input_senha");

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
  if (email == "" || senha == "") {
    mensagem.innerHTML = `E-mail e Senha não podem ser vazios!`;
    emailInput.style.border = "2px solid var(--color-danger)";
    senhaInput.style.border = "2px solid var(--color-danger)";
  } else if (
    !email.includes("@") ||
    !email.includes(".com") ||
    email.includes(" ")
  ) {
    emailInput.style.border = "2px solid var(--color-danger)";
    senhaInput.style.border = "2px solid var(--color-danger)";
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
          console.log(json);
          // Armazena no sessionStorage, um item de nome EMAIL_USUARIO o item email do JSON de resposta
          sessionStorage.EMAIL_USUARIO = json.email;

          // Chama a função redirecionar, após 2.5 segundos
          setTimeout(() => {
            redirecionar("dashboard/dashboard.html");
          }, 2500);

          return true;
        });
      }
    })
    .catch(function (erro) {
      console.log("Ocorreu um erro: ", erro);
    });

  return false;
}
