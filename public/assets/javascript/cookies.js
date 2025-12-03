var banner = document.getElementById("banner");
function exibirBannerCookies() {
  banner.style.display = "flex";
}

setTimeout(exibirBannerCookies, 3000);

// Função para esconder o banner de cookies
function esconderBannerCookies() {
  banner.style.display = "none";
}
