var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class ChatBot {
    constructor() {
        this.chatBox = document.getElementById("chats");
        this.chatBtn = document.getElementById("chat-btn");
        this.closeBtn = document.getElementById("close-btn");
        this.chatMessages = document.getElementById("chat-messages");
        this.chatForm = document.getElementById("chat-form");
        this.chatInput = document.getElementById("input");
        this.API_KEY = "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";
        this.initializeEventListeners();
    }
    initializeEventListeners() {
        this.chatBtn.addEventListener("click", () => this.toggleChatVisibility(true));
        this.closeBtn.addEventListener("click", () => this.toggleChatVisibility(false));
        this.chatForm.addEventListener("submit", (e) => this.handleChat(e));
    }
    toggleChatVisibility(show) {
        if (show) {
            this.chatBox.classList.remove("hidden");
            this.chatBtn.classList.add("hidden");
            this.closeBtn.classList.remove("hidden");
        }
        else {
            this.chatBox.classList.add("hidden");
            this.chatBtn.classList.remove("hidden");
            this.closeBtn.classList.add("hidden");
        }
    }
    createChatMessage(message, sender) {
        const msg = document.createElement("p");
        msg.classList.add(sender === "user" ? "user" : "bot");
        msg.innerText = message;
        this.chatMessages.appendChild(msg);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    generateResponse(messageElement) {
        return __awaiter(this, void 0, void 0, function* () {
            const API_URL = "https://openrouter.ai/api/v1/chat/completions";
            const userMessage = this.chatInput.value.trim();
            try {
                const response = yield fetch(API_URL, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${this.API_KEY}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        model: "google/gemma-3-27b-it:free",
                        messages: [
                            {
                                role: "system",
                                content: "You are a car assistant chatbot. Always respond with short bullet-point answers, occasionally using emojis. Only answer car-related questions and website navigation help.",
                            },
                            { role: "user", content: userMessage },
                        ],
                    }),
                });
                if (!response.ok)
                    throw new Error("Network error");
                const data = yield response.json();
                messageElement.innerText = data.choices[0].message.content;
            }
            catch (error) {
                messageElement.innerText = "Oops! Something went wrong. Please try again!";
            }
        });
    }
    handleChat(event) {
        event.preventDefault();
        const userMessage = this.chatInput.value.trim();
        if (!userMessage)
            return;
        // Add user message
        this.createChatMessage(userMessage, "user");
        // Add bot "thinking..." message
        const botMessage = document.createElement("p");
        botMessage.classList.add("bot", "bg-gray-200", "p-2", "rounded-xl", "self-start");
        botMessage.innerText = "Thinking...";
        this.chatMessages.appendChild(botMessage);
        // Generate bot response
        this.generateResponse(botMessage);
        // Clear input field
        this.chatInput.value = "";
    }
}
