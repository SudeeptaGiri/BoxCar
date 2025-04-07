// Form validation functionality
export function initializeSignupForm(): void {
  const signupForm = document.getElementById("signup-form") as HTMLFormElement;
  const closePopupButtons = document.querySelectorAll('.closePopup') as NodeListOf<HTMLElement>;
 
  signupForm.addEventListener("submit", function (event: Event) {
    event.preventDefault();
 
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const emailValue = emailInput.value.trim();
 
    if (emailValue) {
      document.getElementById("popup-message")!.textContent = "Thank you for signing up with: " + emailValue;
      showPopup();
    }
  });

  function showPopup(): void {
    const popup = document.getElementById('custom-popup') as HTMLElement;
    popup.classList.remove('hidden');
    popup.classList.add('flex');
  }
  
  function closePopup(): void {
    const popup = document.getElementById('custom-popup') as HTMLElement;
    popup.classList.add('hidden');
    popup.classList.remove('flex');
  }
  
  // Add event listeners to all close buttons
  closePopupButtons.forEach(button => {
    button.addEventListener("click", closePopup);
  });
}