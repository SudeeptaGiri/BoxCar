const menuOpen = document.getElementById("menu-open");
const menuClose = document.getElementById("menu-close");
const menu = document.getElementById("menu");

menuOpen.addEventListener("click", () => {
  menu.classList.remove("hidden");
  menu.classList.add("flex");
});

menuClose.addEventListener("click", () => {
  menu.classList.remove("flex");
  menu.classList.add("hidden");
});
