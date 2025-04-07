export function initializePopularMakesCarousel(): void {
    const popularMakes = document.getElementById("popular-makes") as HTMLDivElement;
    const leftScroll = document.getElementById("left-scroll") as HTMLButtonElement;
    const rightScroll = document.getElementById("right-scroll") as HTMLButtonElement;
  
    let scrollAmount = 0;
    const scrollMax = popularMakes.scrollWidth;
  
    leftScroll.addEventListener("click", () => {
      if (scrollAmount <= 0) {
        scrollAmount = 0;
        return;
      }
      popularMakes.scrollTo({
        top: 0,
        left: (scrollAmount -= 280),
        behavior: "smooth",
      });
    });
  
    rightScroll.addEventListener("click", () => {
      if (scrollAmount >= scrollMax) {
        scrollAmount = scrollMax;
        return;
      }
      popularMakes.scrollTo({
        top: 0,
        left: (scrollAmount += 280),
        behavior: "smooth",
      });
    });
  }