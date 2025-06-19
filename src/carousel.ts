// Header carousel component

export function initializeCarousel(): void {
    const images: string[] = [
      "../public/assets/image-1.jpg",
      "../public/assets/image-2.jpg",
      "../public/assets/image-3.jpg",
      "../public/assets/image-4.jpg",
    ];
  
    const headings: string[] = [
      "Fast, Simple and Easy",
      "Quick, Smooth, and Effortless",
      "Rapid, Clear, and Hassle-Free",
      "Instant, Intuitive, and Seamless",
    ];
  
    const subheadings: string[] = [
      "Shop Online. Pickup Today. It's Fast, Simple and Easy. Learn More.",
      "Order Now. Pickup Today. It's Quick, Smooth, and Convenient. Learn More.",
      "Buy Online. Get It Today. Fast, Easy, and Hassle-Free. Learn More.",
      "Shop Now. Collect Today. Simple, Instant, and Seamless. Learn More.",
    ];
  
    let index = 0;
    setInterval(() => {
      const header = document.getElementById("top") as HTMLDivElement;
      const heading = document.getElementById("header-heading") as HTMLElement;
      const subheading = document.getElementById("header-para") as HTMLElement;
      
      header.style.backgroundImage = `url(${images[index]})`;
      heading.innerText = headings[index];
      subheading.innerText = subheadings[index];
      index = (index + 1) % images.length;
    }, 5000);
  }
  
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