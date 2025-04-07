// Header carousel component
export function initializeCarousel() {
    const images = [
        "../public/assets/image-1.jpg",
        "../public/assets/image-2.jpg",
        "../public/assets/image-3.jpg",
        "../public/assets/image-4.jpg",
    ];
    const headings = [
        "Fast, Simple and Easy",
        "Quick, Smooth, and Effortless",
        "Rapid, Clear, and Hassle-Free",
        "Instant, Intuitive, and Seamless",
    ];
    const subheadings = [
        "Shop Online. Pickup Today. It's Fast, Simple and Easy. Learn More.",
        "Order Now. Pickup Today. It's Quick, Smooth, and Convenient. Learn More.",
        "Buy Online. Get It Today. Fast, Easy, and Hassle-Free. Learn More.",
        "Shop Now. Collect Today. Simple, Instant, and Seamless. Learn More.",
    ];
    let index = 0;
    setInterval(() => {
        const header = document.getElementById("top");
        const heading = document.getElementById("header-heading");
        const subheading = document.getElementById("header-para");
        header.style.backgroundImage = `url(${images[index]})`;
        heading.innerText = headings[index];
        subheading.innerText = subheadings[index];
        index = (index + 1) % images.length;
    }, 5000);
}
export function initializePopularMakesCarousel() {
    const popularMakes = document.getElementById("popular-makes");
    const leftScroll = document.getElementById("left-scroll");
    const rightScroll = document.getElementById("right-scroll");
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
