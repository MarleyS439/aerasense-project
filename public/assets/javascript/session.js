// Função para validar a sessão do usuário pelo e-mail
function validarSessao() {
  // E-mail registrado na sessão
  var email = sessionStorage.EMAIL_USUARIO;

  // Validação se não é null ou undefined
  if (email == null || email == undefined) {
    // Chama a função de redirecionar caso seja inválido
    redirecionar("../login.html");
  }
}
