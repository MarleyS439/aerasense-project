// Função para fazer o logout do usuário
function logout() {
  sessionStorage.clear();
  redirecionar("../login.html");
}
