// Navbar
var navbar = document.getElementById("navbar");

// Logo SVG
var logo = document.getElementById("path");

// Botão de login
var login = document.getElementById("login");

// Links
var links = ["inicio", "produtos", "quem-somos", "trabalhe-conosco", "contato"];

// Troca de idioma
var linguagem = document.getElementById("select_language");

// Quantidade de pixeis que deve chamar a função de navbarDinamica
var tamanhoScroll = 20;

window.addEventListener("scroll", function navbarDinamica() {
  var scroller = window.scrollY;
  if (scroller > tamanhoScroll) {
    navbar.style.width = "90%";
    navbar.style.backgroundColor = "var(--color-white)";
    navbar.style.borderRadius = "20px";
    navbar.style.marginTop = "15px";
    navbar.style.boxShadow = "2px 2px 5px rgba(0, 0, 0, 0.3)";
    logo.style.fill = "var(--color-very-dark-blue)";
    linguagem.style.backgroundColor = "var(--color-white)";
    linguagem.style.color = "var(--color-very-dark-blue)";
    login.style.border = "1px solid var(--color-very-dark-blue)";
    login.style.borderRadius = "16px";

    // Percorre a lista de links e aplica cor escura
    for (var i = 0; i < links.length; i++) {
      var linkAtual = links[i];
      document.getElementById(linkAtual).style.color =
        "var(--color-very-dark-blue)";
    }
  } else {
    navbar.style.width = "100%";
    navbar.style.backgroundColor = "var(--color-very-dark-blue)";
    navbar.style.borderRadius = "0px";
    navbar.style.boxShadow = "none";
    navbar.style.marginTop = "0px";
    logo.style.fill = "var(--color-white)";
    linguagem.style.backgroundColor = "var(--color-very-dark-blue)";
    linguagem.style.color = "var(--color-white)";
    login.style.border = "none";

    // Percorre a lista de links e aplica cor clara
    for (var i = 0; i < links.length; i++) {
      var linkAtual = links[i];
      document.getElementById(linkAtual).style.color = "var(--color-white)";
    }
  }
});
