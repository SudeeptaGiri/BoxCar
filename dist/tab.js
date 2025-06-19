// Tab switching functionality
export function initializeTabs() {
    const listItems = document.querySelectorAll("ul li");
    listItems.forEach((item) => {
        item.addEventListener("click", function () {
            listItems.forEach((li) => li.classList.remove("underline", "underline-offset-8"));
            this.classList.add("underline", "underline-offset-8");
        });
    });
    // Car Types Tab Switching
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
}
