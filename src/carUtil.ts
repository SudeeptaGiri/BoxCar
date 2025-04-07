// Utility functions for car-related operations
import { Car, CarListItem } from './types.js';
import { showPopup } from './showPopup.js';

// Global car array
export let carArray: CarListItem[] = [];

export function createCarCard(car: Car): HTMLElement {
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

  return article;
}

export function createPopularMakeCard(car: Car): HTMLElement {
  const article = document.createElement("article");
  article.className =
    "bg-[#161c30] rounded-2xl flex flex-col gap-2 overflow-hidden hover:shadow-2xl group min-w-3xs";

  article.innerHTML = `
    <figure class="overflow-hidden relative">
      <img
        src="${car.image}"
        alt="${car.name}-image"
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
        ${car.name}
      </h1>
      <p class="text-sm leading-3.5">
        ${car.description}
      </p>
    </header>
    <main class="flex justify-between mx-6 border-b border-gray-300 py-3">
      <section class="flex flex-col justify-center items-center gap-1">
        <img
          src="../public/assets/miles-white.png"
          alt="miles-svg"
          class="h-5 w-5 object-contain"
        />
        <span>${car.mileage}</span>
      </section>
      <section class="flex flex-col justify-center items-center gap-1">
        <img
          src="../public/assets/kilometer-white.png"
          alt="fuel-svg"
          class="h-5 w-5 object-contain"
        />
        <span>${car.fuel_type}</span>
      </section>
      <section class="flex flex-col justify-center items-center gap-1">
        <img
          src="../public/assets/automatic-white.png"
          alt="transmission-svg"
          class="h-5 w-5 object-contain"
        />
        <span>${car.transmission}</span>
      </section>
    </main>
    <footer class="flex justify-between mx-6 py-3">
      <p class="font-bold text-lg leading-7.5">${car.price}</p>
      <p class="font-dm-sans font-normal leading-6.5 text-white hover:cursor-pointer">
        View Details &#8599;
      </p>
    </footer>
  `;
  
  return article;
}

export function fetchCars(): Promise<void> {
  const topSellingCars = document.getElementById("top-selling-cars") as HTMLDivElement;
  
  return fetch("../public/data/cars.json")
    .then((response) => response.json())
    .then((data: Car[]) => {
      carArray = data.map((car) => {
        const article = createCarCard(car);
        topSellingCars.appendChild(article);
        
        return { 
          name: car.name, 
          price: car.price, 
          element: article 
        };
      });
    })
    .then(() => {
      const cards = document.querySelectorAll(".car-cards");
      showPopup(cards);
    })
    .catch((error) => console.error("Error loading JSON data:", error));
}

export function fetchPopularMakes(): Promise<void> {
  const popularMakes = document.getElementById("popular-makes") as HTMLElement;
  
  return fetch("../public/data/cars.json")
    .then((response) => response.json())
    .then((data: Car[]) => {
      data.forEach((car) => {
        const article = createPopularMakeCard(car);
        popularMakes.appendChild(article);
      });
    })
    .then(() => {
      const cards = document.querySelectorAll<HTMLDivElement>("#popular-makes article");
      showPopup(cards);
    })
    .catch((error) => console.error("Error loading JSON data:", error));
}