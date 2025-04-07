// Form validation functionality
export function initializeSignupForm() {
    const signupForm = document.getElementById("signup-form");
    const closePopupButtons = document.querySelectorAll('.closePopup');
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const emailInput = document.getElementById("email");
        const emailValue = emailInput.value.trim();
        if (emailValue) {
            document.getElementById("popup-message").textContent = "Thank you for signing up with: " + emailValue;
            showPopup();
        }
    });
    function showPopup() {
        const popup = document.getElementById('custom-popup');
        popup.classList.remove('hidden');
        popup.classList.add('flex');
    }
    function closePopup() {
        const popup = document.getElementById('custom-popup');
        popup.classList.add('hidden');
        popup.classList.remove('flex');
    }
    // Add event listeners to all close buttons
    closePopupButtons.forEach(button => {
        button.addEventListener("click", closePopup);
    });
}
