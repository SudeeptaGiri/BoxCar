// Type definitions
interface Car {
  name: string;
  image: string;
  description: string;
  mileage: string;
  fuel_type: string;
  transmission: string;
  price: string;
}

interface CarListItem {
  name: string;
  price: string;
  element: HTMLElement;
}

interface CarData {
  make: string;
  model: string;
}

// Global Variables
let carArray: CarListItem[] = [];

// Popup Function
function showPopup(cards: NodeListOf<Element>): void {
  const popup = document.getElementById("popup") as HTMLDivElement;
  const closePopup = document.getElementById("closePopup") as HTMLButtonElement;

  // Elements inside popup
  const popupImage = document.getElementById("popupImage") as HTMLImageElement;
  const popupTitle = document.getElementById("popupTitle") as HTMLElement;
  const popupDesc = document.getElementById("popupDesc") as HTMLElement;
  const popupMiles = document.getElementById("popupMiles") as HTMLElement;
  const popupFuel = document.getElementById("popupFuel") as HTMLElement;
  const popupTransmission = document.getElementById("popupTransmission") as HTMLElement;
  const popupPrice = document.getElementById("popupPrice") as HTMLElement;

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const imageSrc = (card.querySelector("figure img") as HTMLImageElement).src;
      const title = (card.querySelector("header h1") as HTMLElement).innerText;
      const desc = (card.querySelector("header p") as HTMLElement).innerText;
      const carDetails = card.querySelectorAll("main section span");
      const miles = carDetails[0].textContent || '';
      const fuel = carDetails[1].textContent || '';
      const transmission = carDetails[2].textContent || '';
      const price = (card.querySelector("footer p") as HTMLElement).innerText;

      popupImage.src = imageSrc;
      popupTitle.innerText = title;
      popupDesc.innerText = desc;
      popupMiles.innerText = miles;
      popupFuel.innerText = fuel;
      popupTransmission.innerText = transmission;
      popupPrice.innerText = price;

      popup.classList.remove("hidden");
      popup.classList.add("flex");
    });
  });

  closePopup.addEventListener("click", () => {
    popup.classList.add("hidden");
    popup.classList.remove("flex");
  });

  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.add("hidden");
      popup.classList.remove("flex");
    }
  });
}

// Responsive Menu
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

// Carousel
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

// Tab Switching
const listItems = document.querySelectorAll("ul li");

listItems.forEach((item) => {
  item.addEventListener("click", function (this: HTMLElement) {
    listItems.forEach((li) =>
      li.classList.remove("underline", "underline-offset-8")
    );
    this.classList.add("underline", "underline-offset-8");
  });
});

// Car Types Tab Switching
const carTypes = document.querySelectorAll(".car-type");
const topSellingCarName = document.getElementById("top-selling-car-name") as HTMLElement;

carTypes.forEach((item) => {
  item.addEventListener("click", function (this: HTMLElement) {
    carTypes.forEach((btn) => {
      btn.classList.remove("bg-black", "text-white");
    });

    topSellingCarName.innerText = this.innerText;
    this.classList.add("bg-black", "text-white");
  });
});

// Fetch Cars and Create Cards
fetch("../public/data/cars.json")
  .then((response) => response.json())
  .then((data: Car[]) => {
    const topSellingCars = document.getElementById("top-selling-cars") as HTMLDivElement;
    
    carArray = data.map((car) => {
      const article = document.createElement("article");
      article.className =
        "border border-gray-300 rounded-2xl flex flex-col gap-2 overflow-hidden hover:shadow-2xl group car-cards";

      const figure = document.createElement("figure");
      figure.className = "overflow-hidden relative";

      const imgCar = document.createElement("img");
      imgCar.src = car.image;
      imgCar.alt = car.name;
      imgCar.className =
        "h-full transition-transform duration-300 group-hover:scale-110";

      const imgBookmark = document.createElement("img");
      imgBookmark.src = "../public/assets/bookmark.png";
      imgBookmark.alt = "bookmark-icon";
      imgBookmark.className = "absolute top-5 right-4 h-9 w-9";

      figure.appendChild(imgCar);
      figure.appendChild(imgBookmark);

      const header = document.createElement("header");
      header.className =
        "flex flex-col gap-2 mx-6 border-b border-gray-300 py-3";

      const title = document.createElement("h1");
      title.className =
        "font-medium leading-5 group-hover:underline hover:cursor-pointer group-hover:underline-offset-3";
      title.textContent = car.name;

      const description = document.createElement("p");
      description.className = "text-sm leading-3.5";
      description.textContent = car.description;

      header.appendChild(title);
      header.appendChild(description);

      const main = document.createElement("main");
      main.className =
        "flex justify-between mx-6 border-b border-gray-300 py-3";

      const info = [
        { src: "../public/assets/miles.png", alt: "miles-svg", text: car.mileage },
        {
          src: "../public/assets/kilometer.png",
          alt: "petrol-svg",
          text: car.fuel_type,
        },
        {
          src: "../public/assets/automatic.png",
          alt: "automatic-svg",
          text: car.transmission,
        },
      ];

      info.forEach(({ src, alt, text }) => {
        const section = document.createElement("section");
        section.className = "flex flex-col justify-center items-center gap-1";

        const img = document.createElement("img");
        img.src = src;
        img.alt = alt;
        img.className = "h-5 w-5 object-contain";

        const span = document.createElement("span");
        span.textContent = text;

        section.appendChild(img);
        section.appendChild(span);
        main.appendChild(section);
      });

      const footer = document.createElement("footer");
      footer.className = "flex justify-between mx-6 py-3";

      const price = document.createElement("p");
      price.className = "font-bold text-lg leading-7.5";
      price.textContent = car.price;

      const details = document.createElement("p");
      details.className =
        "font-dm-sans font-normal leading-6.5 text-[#405FF2] hover:cursor-pointer";
      details.innerHTML = "View Details &#8599;";

      footer.appendChild(price);
      footer.appendChild(details);

      article.appendChild(figure);
      article.appendChild(header);
      article.appendChild(main);
      article.appendChild(footer);
      topSellingCars.appendChild(article);

      return { name: car.name, price: car.price, element: article };
    });
  })
  .then(() => {
    const cards = document.querySelectorAll(".car-cards");
    showPopup(cards);
  })
  .catch((error) => console.error("Error loading JSON data:", error));

// Dynamic Search Filter
const makeDropdown = document.getElementById("any-makes") as HTMLSelectElement;
const modelDropdown = document.getElementById("any-models") as HTMLSelectElement;

const carData: CarData[] = [
  { make: "Toyota", model: "Camry" },
  { make: "Toyota", model: "Corolla Altis" },
  { make: "Ford", model: "Explorer" },
  { make: "Ford", model: "Transit" },
  { make: "Audi", model: "A6" },
  { make: "Mercedes", model: "C-Class" },
  { make: "Mercedes", model: "GLC" },
  { make: "Volkswagen", model: "T-Cross" },
];

function populateDropdowns(): void {
  const makes = [...new Set(carData.map((car) => car.make))];
  makes.forEach((make) => {
    const option = document.createElement("option");
    option.value = make;
    option.textContent = make;
    makeDropdown.appendChild(option);
  });

  resetModels();
}

function updateModelOptions(selectedMake: string): void {
  modelDropdown.innerHTML = "<option>Any Models</option>";
  const filteredModels = carData.filter((car) => car.make === selectedMake);
  filteredModels.forEach((car) => {
    const option = document.createElement("option");
    option.value = car.model;
    option.textContent = car.model;
    modelDropdown.appendChild(option);
  });
}

function updateMakeOptions(selectedModel: string): void {
  makeDropdown.innerHTML = "<option>Any Makes</option>";
  const filteredMakes = carData.filter((car) => car.model === selectedModel);
  filteredMakes.forEach((car) => {
    const option = document.createElement("option");
    option.value = car.make;
    option.textContent = car.make;
    makeDropdown.appendChild(option);
  });
}

makeDropdown.addEventListener("change", function () {
  const selectedMake = this.value;
  if (selectedMake !== "Any Makes") {
    updateModelOptions(selectedMake);
  } else {
    resetModels();
  }
});

modelDropdown.addEventListener("change", function () {
  const selectedModel = this.value;
  if (selectedModel !== "Any Models") {
    updateMakeOptions(selectedModel);
  } else {
    resetMakes();
  }
});

function resetModels(): void {
  modelDropdown.innerHTML = "<option>Any Models</option>";
  carData.forEach((car) => {
    const option = document.createElement("option");
    option.value = car.model;
    option.textContent = car.model;
    modelDropdown.appendChild(option);
  });
}

function resetMakes(): void {
  makeDropdown.innerHTML = "<option>Any Makes</option>";
  const makes = [...new Set(carData.map((car) => car.make))];
  makes.forEach((make) => {
    const option = document.createElement("option");
    option.value = make;
    option.textContent = make;
    makeDropdown.appendChild(option);
  });
}

populateDropdowns();

// Search Functionality
document.getElementById("search-form")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const anyMakes = (document.getElementById("any-makes") as HTMLSelectElement).value;
  const anyModels = (document.getElementById("any-models") as HTMLSelectElement).value;
  const anyPrices = (document.getElementById("any-prices") as HTMLSelectElement).value;

  function checkPriceRange(price: string, selectedPrice: string): boolean {
    const numericPrice = parseInt(price.replace(/\D/g, ""), 10); // Convert "$40,000" to 40000

    switch (selectedPrice) {
      case "Under $20,000":
        return numericPrice < 20000;
      case "$20,000 - $50,000":
        return numericPrice >= 20000 && numericPrice <= 50000;
      case "$50,000 - $100,000":
        return numericPrice > 50000 && numericPrice <= 100000;
      case "Over $100,000":
        return numericPrice > 100000;
      default:
        return true;
    }
  }

  const filteredCars = (item: CarListItem) => {
    return (
      (anyMakes === "Any Makes" ||
        item.name.toLowerCase().includes(anyMakes.toLowerCase())) &&
      (anyModels === "Any Models" ||
        item.name.toLowerCase().includes(anyModels.toLowerCase())) &&
      (anyPrices === "Any Prices" || checkPriceRange(item.price, anyPrices))
    );
  };

  carArray.forEach((car) => {
    const isVisible = filteredCars(car);
    car.element.classList.toggle("hidden", !isVisible);
  });
});

// Type Definitions
interface Comment {
  name: string;
  profession: string;
  text: string;
}

interface BlogPost {
  author: string;
  date: string;
  image: string;
  text: string;
}

// Constants and Configuration
const names: string[] = ["Ali TUFAN", "John Doe", "Emma Smith"];
const professions: string[] = ["Designer", "Software Engineer", "Marketing Specialist"];
const comments: string[] = [
  "I'd suggest Macklin Motors Nissan Glasgow South to a friend because I had great service from my salesman Patrick and all of the team.",
  "The experience was seamless, and the staff was very professional. Highly recommend!Excellent customer service! The team was very helpful and made the process easy.",
  "Had a wonderful experience. The team was knowledgeable and friendly throughout.Great service and attention to detail. Will definitely come back again!",
];

// Comment Section
function initializeCommentSection(): void {
  const name = document.getElementById("name") as HTMLElement;
  const profession = document.getElementById("profession") as HTMLElement;
  const comment = document.getElementById("comment") as HTMLElement;
  const profilePhotos = document.querySelectorAll(".profile-photo img") as NodeListOf<HTMLImageElement>;
  const nextComment = document.getElementById("next-comment") as HTMLButtonElement;
  const prevComment = document.getElementById("previous-comment") as HTMLButtonElement;

  let commentIndex = 0;

  function updateCommentDisplay(): void {
    // Remove highlight from previous photo
    profilePhotos.forEach(photo => {
      photo.classList.remove(
        "border-2", 
        "border-blue-400", 
        "p-0.5", 
        "w-12", 
        "h-12"
      );
      photo.classList.add("w-10", "h-10");
    });

    // Update comment details
    name.innerText = names[commentIndex];
    profession.innerText = professions[commentIndex];
    comment.innerText = comments[commentIndex];

    // Highlight current photo
    profilePhotos[commentIndex].classList.remove("w-10", "h-10");
    profilePhotos[commentIndex].classList.add(
      "border-2", 
      "border-blue-400", 
      "p-0.5", 
      "w-12", 
      "h-12"
    );
  }

  nextComment.addEventListener("click", () => {
    commentIndex = (commentIndex + 1) % comments.length;
    updateCommentDisplay();
  });

  prevComment.addEventListener("click", () => {
    commentIndex = (commentIndex - 1 + comments.length) % comments.length;
    updateCommentDisplay();
  });
}

// Video Popup
function initializeVideoPopup(): void {
  const videoPopup = document.getElementById("video-popup") as HTMLDivElement;
  const closeVideo = document.getElementById("close-video") as HTMLButtonElement;
  const banerImage = document.getElementById("baner-image") as HTMLImageElement;
  const video = document.getElementById("video") as HTMLVideoElement;

  banerImage.addEventListener("click", () => {
    video.src = "../public/assets/car-video.mp4";
    videoPopup.classList.remove("hidden");
    videoPopup.classList.add("flex");
  });

  closeVideo.addEventListener("click", () => {
    video.src = "";
    videoPopup.classList.add("hidden");
    videoPopup.classList.remove("flex");
  });

  videoPopup.addEventListener("click", (e) => {
    if (e.target === videoPopup) {
      video.src = "";
      videoPopup.classList.add("hidden");
      videoPopup.classList.remove("flex");
    }
  });
}

// Blog Posts
async function fetchBlogPosts(): Promise<void> {
  try {
    const response = await fetch("../public/data/blogs.json");
    const data: BlogPost[] = await response.json();
    const blogPosts = document.getElementById("blog-post") as HTMLDivElement;

    data.forEach((item) => {
      const blogSection = document.createElement("section");
      blogSection.className = "group";
      
      blogSection.innerHTML = `
        <figure class="overflow-hidden rounded-2xl hover:opacity-80">
          <img src="${item.image}" alt="blog-image" />
        </figure>
        <article>
          <p class="py-1.5">
            <span class="text-sm leading-6">${item.author}</span> &middot;
            <span class="text-sm leading-6">${item.date}</span>
          </p>
          <p class="text-xl leading-7 hover:underline">
            ${item.text}
          </p>
        </article>
      `;

      blogPosts.appendChild(blogSection);
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }
}

// Input Validation
function initializeSignupForm(): void {
  const signupForm = document.getElementById("signup-form") as HTMLFormElement;

  signupForm.addEventListener("submit", function (event: Event) {
    event.preventDefault();

    const emailInput = document.getElementById("email") as HTMLInputElement;
    const emailValue = emailInput.value.trim();

    if (emailValue) {
      alert("Thank you for signing up with: " + emailValue);
    }
  });
}

// Accordion
function initializeAccordion(): void {
  const accordionButtons = document.querySelectorAll(".toggle-faq") as NodeListOf<HTMLButtonElement>;

  accordionButtons.forEach((button) => {
    button.addEventListener("click", function (this: HTMLButtonElement) {
      const answerId = this.getAttribute("aria-controls");
      if (!answerId) return;

      const answer = document.getElementById(answerId) as HTMLElement;
      const isExpanded = this.getAttribute("aria-expanded") === "true";

      this.setAttribute("aria-expanded", (!isExpanded).toString());
      answer.hidden = isExpanded;
      
      const span = this.querySelector("span") as HTMLSpanElement;
      span.classList.toggle("rotate-180");
    });
  });
}

// AI Chat Functionality
import { API_KEY } from "./config";
interface ChatMessage {
  role: 'user' | 'system' | 'bot';
  content: string;
}

class ChatBot {
  private chatBox: HTMLDivElement;
  private chatBtn: HTMLButtonElement;
  private closeBtn: HTMLButtonElement;
  private chatMessages: HTMLDivElement;
  private chatForm: HTMLFormElement;
  private chatInput: HTMLInputElement;
  private API_KEY: string;


  constructor() {
    this.chatBox = document.getElementById("chats") as HTMLDivElement;
    this.chatBtn = document.getElementById("chat-btn") as HTMLButtonElement;
    this.closeBtn = document.getElementById("close-btn") as HTMLButtonElement;
    this.chatMessages = document.getElementById("chat-messages") as HTMLDivElement;
    this.chatForm = document.getElementById("chat-form") as HTMLFormElement;
    this.chatInput = document.getElementById("input") as HTMLInputElement;
    this.API_KEY =API_KEY;

    this.initializeEventListeners();
  }

  private initializeEventListeners(): void {
    this.chatBtn.addEventListener("click", () => this.toggleChatVisibility(true));
    this.closeBtn.addEventListener("click", () => this.toggleChatVisibility(false));
    this.chatForm.addEventListener("submit", (e) => this.handleChat(e));
  }

  private toggleChatVisibility(show: boolean): void {
    if (show) {
      this.chatBox.classList.remove("hidden");
      this.chatBtn.classList.add("hidden");
      this.closeBtn.classList.remove("hidden");
    } else {
      this.chatBox.classList.add("hidden");
      this.chatBtn.classList.remove("hidden");
      this.closeBtn.classList.add("hidden");
    }
  }

  private createChatMessage(message: string, sender: 'user' | 'bot'): void {
    const msg = document.createElement("p");
    msg.classList.add(sender === "user" ? "user" : "bot");
    msg.innerText = message;
    this.chatMessages.appendChild(msg);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }

  private async generateResponse(messageElement: HTMLParagraphElement): Promise<void> {
    const API_URL = "https://openrouter.ai/api/v1/chat/completions";
    const userMessage = this.chatInput.value.trim();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemma-3-27b-it:free",
          messages: [
            {
              role: "system",
              content:
                "You are a car assistant chatbot. Always respond with short bullet-point answers, occasionally using emojis. Only answer car-related questions and website navigation help.",
            },
            { role: "user", content: userMessage },
          ],
        }),
      });

      if (!response.ok) throw new Error("Network error");

      const data = await response.json();
      messageElement.innerText = data.choices[0].message.content;
    } catch (error) {
      messageElement.innerText = "Oops! Something went wrong. Please try again!";
    }
  }

  private handleChat(event: Event): void {
    event.preventDefault();

    const userMessage = this.chatInput.value.trim();
    if (!userMessage) return;

    // Add user message
    this.createChatMessage(userMessage, "user");

    // Add bot "thinking..." message
    const botMessage = document.createElement("p");
    botMessage.classList.add(
      "bot",
      "bg-gray-200",
      "p-2",
      "rounded-xl",
      "self-start"
    );
    botMessage.innerText = "Thinking...";
    this.chatMessages.appendChild(botMessage);

    // Generate bot response
    this.generateResponse(botMessage);

    // Clear input field
    this.chatInput.value = "";
  }
}

// PWA Service Worker Registration
function initializePWA(): void {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => console.log("Service Worker Registered"))
      .catch((error) =>
        console.log("Service Worker Registration Failed:", error)
      );
  }
}

// Initialize All Functionalities
function initializeWebsite(): void {
  // Popular Makes Carousel (from previous conversion)
  initializePopularMakesCarousel();
  
  // Comment Section
  initializeCommentSection();
  
  // Video Popup
  initializeVideoPopup();
  
  // Fetch Blog Posts
  fetchBlogPosts();
  
  // Signup Form
  initializeSignupForm();
  
  // Accordion
  initializeAccordion();
  
  // Initialize ChatBot
  new ChatBot();
  
  // PWA
  initializePWA();
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeWebsite);

// Helper function for Popular Makes Carousel (from previous conversion)
function initializePopularMakesCarousel(): void {
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
const popularMakes = document.getElementById("popular-makes") as HTMLElement;
const leftScroll = document.getElementById("left-scroll") as HTMLElement;
const rightScroll = document.getElementById("right-scroll") as HTMLElement;

fetch("../public/data/cars.json")
  .then((response) => response.json())
  .then((data: Car[]) => {
    data.forEach((item) => {
      const article = document.createElement("article");
      article.className =
        "bg-[#161c30] rounded-2xl flex flex-col gap-2 overflow-hidden hover:shadow-2xl group min-w-3xs";

      article.innerHTML = `
        <figure class="overflow-hidden relative">
          <img
            src="${item.image}"
            alt="${item.name}-image"
            class="h-full transition-transform duration-300 group-hover:scale-110"
          />
          <img
            src="./public/assets/bookmark.png"
            alt="bookmark-icon"
            class="absolute top-5 right-4 h-9 w-9"
          />
        </figure>
        <header class="flex flex-col gap-2 mx-6 border-b border-gray-300 py-3">
          <h1 class="font-medium leading-5 group-hover:underline hover:cursor-pointer group-hover:underline-offset-3">
            ${item.name}
          </h1>
          <p class="text-sm leading-3.5">
            ${item.description}
          </p>
        </header>
        <main class="flex justify-between mx-6 border-b border-gray-300 py-3">
          <section class="flex flex-col justify-center items-center gap-1">
            <img
              src="../public/assets/miles-white.png"
              alt="miles-svg"
              class="h-5 w-5 object-contain"
            />
            <span>${item.mileage}</span>
          </section>
          <section class="flex flex-col justify-center items-center gap-1">
            <img
              src="../public/assets/kilometer-white.png"
              alt="fuel-svg"
              class="h-5 w-5 object-contain"
            />
            <span>${item.fuel_type}</span>
          </section>
          <section class="flex flex-col justify-center items-center gap-1">
            <img
              src="../public/assets/automatic-white.png"
              alt="transmission-svg"
              class="h-5 w-5 object-contain"
            />
            <span>${item.transmission}</span>
          </section>
        </main>
        <footer class="flex justify-between mx-6 py-3">
          <p class="font-bold text-lg leading-7.5">$${item.price}</p>
          <p class="font-dm-sans font-normal leading-6.5 text-white hover:cursor-pointer">
            View Details &#8599;
          </p>
        </footer>
      `;
      popularMakes.appendChild(article);
    });
  })
  .then(() => {
    const cards = document.querySelectorAll<HTMLDivElement>("#popular-makes article");
    showPopup(cards);
  })
  .catch((error) => console.error("Error loading JSON data:", error));