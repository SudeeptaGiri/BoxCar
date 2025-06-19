import { carArray } from './carUtil.js';
export function initializeSearch() {
    var _a;
    const makeDropdown = document.getElementById("any-makes");
    const modelDropdown = document.getElementById("any-models");
    const noCarFound = document.getElementById("noCarFound");
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
    populateDropdowns();
    makeDropdown.addEventListener("change", function () {
        const selectedMake = this.value;
        if (selectedMake !== "Any Makes") {
            updateModelOptions(selectedMake);
        }
        else {
            resetModels();
        }
    });
    modelDropdown.addEventListener("change", function () {
        const selectedModel = this.value;
        if (selectedModel !== "Any Models") {
            updateMakeOptions(selectedModel);
        }
        else {
            resetMakes();
        }
    });
    let count = 0;
    (_a = document.getElementById("search-form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (e) {
        e.preventDefault();
        const anyMakes = document.getElementById("any-makes").value;
        const anyModels = document.getElementById("any-models").value;
        const anyPrices = document.getElementById("any-prices").value;
        const filteredCars = (item) => {
            return ((anyMakes === "Any Makes" ||
                item.name.toLowerCase().includes(anyMakes.toLowerCase())) &&
                (anyModels === "Any Models" ||
                    item.name.toLowerCase().includes(anyModels.toLowerCase())) &&
                (anyPrices === "Any Prices" || checkPriceRange(item.price, anyPrices)));
        };
        carArray.forEach((car) => {
            const isVisible = filteredCars(car);
            car.element.classList.toggle("hidden", !isVisible);
            if (isVisible) {
                count++;
            }
        });
        if (count === 0) {
            noCarFound.classList.remove("hidden");
            noCarFound.classList.add("flex");
        }
        else {
            count = 0;
            noCarFound.classList.remove("flex");
            noCarFound.classList.add("hidden");
        }
    });
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
    function checkPriceRange(price, selectedPrice) {
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
}
