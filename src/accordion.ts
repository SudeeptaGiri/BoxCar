// Accordion functionality

export function initializeAccordion(): void {
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