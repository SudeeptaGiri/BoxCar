
export function initializeMenu(): void {
    const menuOpen = document.getElementById("menu-open") as HTMLButtonElement;
    const menuClose = document.getElementById("menu-close") as HTMLButtonElement;
    const menu = document.getElementById("menu") as HTMLDivElement;
  
    menuOpen.addEventListener("click", () => {
      menu.classList.remove("hidden");
      menu.classList.add("flex");
    });
  
    menuClose.addEventListener("click", () => {
      menu.classList.remove("flex");
      menu.classList.add("hidden");
    });
  }