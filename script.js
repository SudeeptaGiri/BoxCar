// Global Variable carArray
let carArray = [];
function showPopup(cards) {
  //car pop-up
  const popup = document.getElementById("popup");
  const closePopup = document.getElementById("closePopup");
  // console.log("cards", cards);

  // Elements inside popup
  const popupImage = document.getElementById("popupImage");
  const popupTitle = document.getElementById("popupTitle");
  const popupDesc = document.getElementById("popupDesc");
  const popupMiles = document.getElementById("popupMiles");
  const popupFuel = document.getElementById("popupFuel");
  const popupTransmission = document.getElementById("popupTransmission");
  const popupPrice = document.getElementById("popupPrice");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const imageSrc = card.querySelector("figure img").src;
      const title = card.querySelector("header h1").innerText;
      const desc = card.querySelector("header p").innerText;
      const miles = card.querySelectorAll("main section span")[0].innerText;
      const fuel = card.querySelectorAll("main section span")[1].innerText;
      const transmission =
        card.querySelectorAll("main section span")[2].innerText;
      const price = card.querySelector("footer p").innerText;

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
//  Resposnive Menu
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

// carousel
const images = [
  "./assets/image-1.jpg",
  "./assets/image-2.jpg",
  "./assets/image-3.jpg",
  "./assets/image-4.jpg",
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
  // console.log("backgroundImage changed",header.style.backgroundImage, index)
}, 5000);

//Tab switching
const listItems = document.querySelectorAll("ul li");

listItems.forEach((item) => {
  item.addEventListener("click", function () {
    listItems.forEach((li) =>
      li.classList.remove("underline", "underline-offset-8")
    );
    this.classList.add("underline", "underline-offset-8");
  });
});
// Tab Switching for car types
const carTypes = document.querySelectorAll(".car-type");
const topSellingCarName = document.getElementById("top-selling-car-name");
carTypes.forEach((item) => {
  item.addEventListener("click", function () {
    carTypes.forEach((btn) => {
      btn.classList.remove("bg-black", "text-white");
    });

    topSellingCarName.innerText = this.innerText;
    this.classList.add("bg-black", "text-white");
  });
});
// Cards
fetch("./data/cars.json")
  .then((response) => response.json())
  .then((data) => {
    const topSellingCars = document.getElementById("top-selling-cars");
    console.log(data);
    carArray = data.map((car) => {
      // Store carArray properly
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
      imgBookmark.src = "./assets/bookmark.png";
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
        { src: "./assets/miles.png", alt: "miles-svg", text: car.mileage },
        {
          src: "./assets/kilometer.png",
          alt: "petrol-svg",
          text: car.fuel_type,
        },
        {
          src: "./assets/automatic.png",
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
    console.log("car cards");
    const cards = document.querySelectorAll(".car-cards");
    console.log(cards);
    showPopup(cards);
  })
  .catch((error) => console.error("Error loading JSON data:", error));
// Dynamic search filter
const makeDropdown = document.getElementById("any-makes");
const modelDropdown = document.getElementById("any-models");

const carData = [
  { make: "Toyota", model: "Camry" },
  { make: "Toyota", model: "Corolla Altis" },
  { make: "Ford", model: "Explorer" },
  { make: "Ford", model: "Transit" },
  { make: "Audi", model: "A6" },
  { make: "Mercedes", model: "C-Class" },
  { make: "Mercedes", model: "GLC" },
  { make: "Volkswagen", model: "T-Cross" },
];

function populateDropdowns() {
  const makes = [...new Set(carData.map((car) => car.make))];
  makes.forEach((make) => {
    const option = document.createElement("option");
    option.value = make;
    option.textContent = make;
    makeDropdown.appendChild(option);
  });

  resetModels();
}

function updateModelOptions(selectedMake) {
  modelDropdown.innerHTML = "<option>Any Models</option>";
  const filteredModels = carData.filter((car) => car.make === selectedMake);
  filteredModels.forEach((car) => {
    const option = document.createElement("option");
    option.value = car.model;
    option.textContent = car.model;
    modelDropdown.appendChild(option);
  });
}

function updateMakeOptions(selectedModel) {
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

function resetModels() {
  modelDropdown.innerHTML = "<option>Any Models</option>";
  carData.forEach((car) => {
    const option = document.createElement("option");
    option.value = car.model;
    option.textContent = car.model;
    modelDropdown.appendChild(option);
  });
}

function resetMakes() {
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

// Add search Functionality

document.getElementById("search-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const anyMakes = document.getElementById("any-makes").value;
  const anyModels = document.getElementById("any-models").value;
  const anyPrices = document.getElementById("any-prices").value;
  function checkPriceRange(price, selectedPrice) {
    const numericPrice = parseInt(price.replace(/\D/g, "")); // Convert "$40,000" to 40000

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
  const filteredCars = (item) => {
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
//Popular  Makes
const popularMakes = document.getElementById("popular-makes");
const leftScroll = document.getElementById("left-scroll");
const rightScroll = document.getElementById("right-scroll");
fetch("./data/cars.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((item) => {
      popularMakes.innerHTML += `
        <article
          class="bg-[#161c30] rounded-2xl flex flex-col gap-2 overflow-hidden hover:shadow-2xl group min-w-3xs"
        >
          <figure class="overflow-hidden relative">
            <img
              src=${item.image}
              alt="tCross-image"
              class="h-full transition-transform duration-300 group-hover:scale-110 grpu"
            />
            <img
              src="./assets/bookmark.png"
              alt="bookmark-icon"
              class="absolute top-5 right-4 h-9 w-9"
            />
          </figure>
          <header
            class="flex flex-col gap-2 mx-6 border-b border-gray-300 py-3"
          >
            <h1
              class="font-medium leading-5 group-hover:underline hover:cursor-pointer group-hover:underline-offset-3"
            >
              ${item.name}
            </h1>
            <p class="text-sm leading-3.5">
              ${item.description}
            </p>
          </header>
          <main class="flex justify-between mx-6 border-b border-gray-300 py-3">
            <section class="flex flex-col justify-center items-center gap-1">
              <img
                src="./assets/miles-white.png"
                alt="miles-svg"
                class="h-5 w-5 object-contain"
              />
              <span>${item.mileage}</span>
            </section>
            <section class="flex flex-col justify-center items-center gap-1">
              <img
                src="./assets/kilometer-white.png"
                alt="petrol-svg"
                class="h-5 w-5 object-contain"
              />
              <span>${item.fuel_type}</span>
            </section>
            <section class="flex flex-col justify-center items-center gap-1">
              <img
                src="./assets/automatic-white.png"
                alt="automatic-svg"
                class="h-5 w-5 object-contain"
              /><span>${item.transmission}</span>
            </section>
          </main>
          <footer class="flex justify-between mx-6 py-3">
            <p class="font-bold text-lg leading-7.5">${item.price}</p>
            <p
              class="font-dm-sans font-normal leading-6.5 text-white hover:cursor-pointer"
            >
              View Details &#8599;
            </p>
          </footer>
        </article>
      `;
    });
  })
  .then(() => {
    const cards = document.querySelectorAll("#popular-makes article");
    showPopup(cards);
  })
  .catch((error) => console.error("Error loading JSON data:", error));
let scrollAmount = 0;
let scrollMax = popularMakes.scrollWidth;
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

//Comments
const names = ["Ali TUFAN", "John Doe", "Emma Smith"];
const professions = ["Designer", "Software Engineer", "Marketing Specialist"];
const comments = [
  "I'd suggest Macklin Motors Nissan Glasgow South to a friend because I had great service from my salesman Patrick and all of the team.",
  "The experience was seamless, and the staff was very professional. Highly recommend!Excellent customer service! The team was very helpful and made the process easy.",
  "Had a wonderful experience. The team was knowledgeable and friendly throughout.Great service and attention to detail. Will definitely come back again!",
];
const name = document.getElementById("name");
const profession = document.getElementById("profession");
const comment = document.getElementById("comment");
const profilePhotos = document.querySelectorAll(".profile-photo img");
// console.log("profilr",profilePhotos);
const nextComment = document.getElementById("next-comment");
const prevComment = document.getElementById("previous-comment");

let commentIndex = 0;
nextComment.addEventListener("click", () => {
  profilePhotos[commentIndex].classList.remove(
    "border-2",
    "border-blue-400",
    "p-0.5",
    "w-12",
    "h-12"
  );
  profilePhotos[commentIndex].classList.add("w-10", "h-10");
  commentIndex = (commentIndex + 1) % 3;
  name.innerText = names[commentIndex];
  profession.innerText = professions[commentIndex];
  comment.innerText = comments[commentIndex];
  profilePhotos[commentIndex].classList.remove("w-10", "h-10");
  profilePhotos[commentIndex].classList.add(
    "border-2",
    "border-blue-400",
    "p-0.5",
    "w-12",
    "h-12"
  );
});
prevComment.addEventListener("click", () => {
  profilePhotos[commentIndex].classList.remove(
    "border-2",
    "border-blue-400",
    "p-0.5",
    "w-12",
    "h-12"
  );
  profilePhotos[commentIndex].classList.add("w-10", "h-10");
  commentIndex = (commentIndex - 1) % 3;
  if (commentIndex < 0) commentIndex = 2;
  name.innerText = names[commentIndex];
  profession.innerText = professions[commentIndex];
  comment.innerText = comments[commentIndex];
  profilePhotos[commentIndex].classList.remove("w-10", "h-10");
  profilePhotos[commentIndex].classList.add(
    "border-2",
    "border-blue-400",
    "p-0.5",
    "w-12",
    "h-12"
  );
});

// Add video to baner Image
const videoPopup = document.getElementById("video-popup");
const closeVideo = document.getElementById("close-video");
const banerImage = document.getElementById("baner-image");
banerImage.addEventListener("click", () => {
  const video = document.getElementById("video");
  video.src = "./assets/car-video.mp4";
  videoPopup.classList.remove("hidden");
  videoPopup.classList.add("flex");
});
closeVideo.addEventListener("click", () => {
  video.src = "";
  videoPopup.classList.add("hidden");
  videoPopup.classList.remove("flex");
});
videoPopup.addEventListener("click", (e) => {
  if (e.target === popup) {
    video.src = "";
    videoPopup.classList.add("hidden");
    videoPopup.classList.remove("flex");
  }
});

// Blog-posts
const blogPosts = document.getElementById("blog-post");
fetch("./data/blogs.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((item) => {
      blogPosts.innerHTML += `
        <section class="group">
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
        </section>
      `;
    });
  });

// Input validation
document
  .getElementById("signup-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const emailInput = document.getElementById("email").value.trim();
    alert("Thank you for signing up with: " + emailInput);
  });

// Accoridan
document.querySelectorAll(".toggle-faq").forEach((button) => {
  button.addEventListener("click", function () {
    const answer = document.getElementById(this.getAttribute("aria-controls"));
    const isExpanded = this.getAttribute("aria-expanded") === "true";

    this.setAttribute("aria-expanded", !isExpanded);
    answer.hidden = isExpanded;
    this.querySelector("span").classList.toggle("rotate-180");
  });
});

// AI Chart Integration
const chatBtn = document.getElementById("chat-btn");
const closeBtn = document.getElementById("close-btn");
const chatBox = document.getElementById("chats");
const chatMessages = document.getElementById("chat-messages");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("input");
const sendChatBtn = document.getElementById("submit");

let userMessage;
const API_KEY =
  "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";
const SITE_URL = "https://creativelayers.net/themes/boxcar-html/index-3.html"; // Replace with your actual site URL
const SITE_NAME = "BOXCAR"; // Replace with your site name

// Function to toggle chatbot visibility
chatBtn.addEventListener("click", () => {
  chatBox.classList.remove("hidden");
  chatBtn.classList.add("hidden");
  closeBtn.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
  chatBox.classList.add("hidden");
  chatBtn.classList.remove("hidden");
  closeBtn.classList.add("hidden");
});

// Function to create chat message elements
const createChatMessage = (message, sender) => {
  console.log("From create Mesaage", message, sender);
  const msg = document.createElement("p");
  msg.classList.add(sender === "user" ? "user" : "bot");
  msg.innerText = message;
  chatMessages.appendChild(msg);
};

// Function to call OpenRouter API and get a response
const generateResponse = (messageElement) => {
  const API_URL = "https://openrouter.ai/api/v1/chat/completions";

  fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
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
        { role: "user", content: ` ${userMessage}` },
      ],
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Network error");
      return res.json();
    })
    .then((data) => {
      console.log("Inside Gen Response ", data);
      messageElement.innerText = data.choices[0].message.content;
    })
    .catch(() => {
      messageElement.innerText =
        "Oops! Something went wrong. Please try again!";
    })
    .finally(() => (chatMessages.scrollTop = chatMessages.scrollHeight));
};

// Function to handle user chat input
const handleChat = (event) => {
  event.preventDefault();

  userMessage = chatInput.value.trim();
  if (!userMessage) return;

  // Add user message
  createChatMessage(userMessage, "user");

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
  chatMessages.appendChild(botMessage);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Generate bot response
  generateResponse(botMessage);

  // Clear input field
  chatInput.value = "";
};

// Event listener for sending chat messages
chatForm.addEventListener("submit", handleChat);

PWA;
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(() => console.log("Service Worker Registered"))
    .catch((error) =>
      console.log("Service Worker Registration Failed:", error)
    );
}
