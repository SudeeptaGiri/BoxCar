// Accordion functionality
export function initializeAccordion() {
    const accordionButtons = document.querySelectorAll(".toggle-faq");
    accordionButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const answerId = this.getAttribute("aria-controls");
            if (!answerId)
                return;
            const answer = document.getElementById(answerId);
            const isExpanded = this.getAttribute("aria-expanded") === "true";
            this.setAttribute("aria-expanded", (!isExpanded).toString());
            answer.hidden = isExpanded;
            const span = this.querySelector("span");
            span.classList.toggle("rotate-180");
        });
    });
}
