import { ChatBot } from "./chatbot.js";
import { initializePWA } from "./pwa.js";
import { initializeAccordion } from "./accordion.js";
import { fetchBlogPosts } from "./blogs.js";
import { initializeCarousel } from "./carousel.js";
import { initializeCommentSection } from "./comments.js";
import { initializeSignupForm } from "./form.js";
import { initializeMenu } from "./menu.js";
import { initializePopularMakesCarousel } from "./popularMakes.js";
import { initializeVideoPopup } from "./videoPopup.js";
import { initializeSearch } from "./search.js";
import { initializeTabs } from "./tab.js";
import { fetchPopularMakes, fetchCars } from "./carUtil.js";
// Initialize All Functionalities
function initializeWebsite() {
    initializePopularMakesCarousel();
    initializeCarousel();
    initializeCommentSection();
    initializeTabs();
    initializeMenu();
    initializeSearch();
    initializeVideoPopup();
    fetchBlogPosts();
    initializeSignupForm();
    initializeAccordion();
    new ChatBot();
    initializePWA();
    fetchPopularMakes();
    fetchCars();
}
document.addEventListener('DOMContentLoaded', initializeWebsite);
