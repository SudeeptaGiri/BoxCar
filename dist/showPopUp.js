// Popup component for showing car details
export function showPopup(cards) {
    const popup = document.getElementById("popup");
    const closePopup = document.getElementById("closePopup");
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
            const carDetails = card.querySelectorAll("main section span");
            const miles = carDetails[0].textContent || '';
            const fuel = carDetails[1].textContent || '';
            const transmission = carDetails[2].textContent || '';
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
