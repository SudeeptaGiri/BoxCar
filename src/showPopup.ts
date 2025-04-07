// Popup component for showing car details

export function showPopup(cards: NodeListOf<Element>): void {
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