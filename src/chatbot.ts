// AI Chat functionality
import { ChatMessage } from './types.js';

export class ChatBot {
  private chatBox: HTMLDivElement;
  private chatBtn: HTMLButtonElement;
  private closeBtn: HTMLButtonElement;
  private chatMessages: HTMLDivElement;
  private chatForm: HTMLFormElement;
  private chatInput: HTMLInputElement;
  private API_KEY: string;

  constructor() {
    this.chatBox = document.getElementById("chats") as HTMLDivElement;
    this.chatBtn = document.getElementById("chat-btn") as HTMLButtonElement;
    this.closeBtn = document.getElementById("close-btn") as HTMLButtonElement;
    this.chatMessages = document.getElementById("chat-messages") as HTMLDivElement;
    this.chatForm = document.getElementById("chat-form") as HTMLFormElement;
    this.chatInput = document.getElementById("input") as HTMLInputElement;
    this.API_KEY = "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";

    this.initializeEventListeners();
  }

  private initializeEventListeners(): void {
    this.chatBtn.addEventListener("click", () => this.toggleChatVisibility(true));
    this.closeBtn.addEventListener("click", () => this.toggleChatVisibility(false));
    this.chatForm.addEventListener("submit", (e) => this.handleChat(e));
  }

  private toggleChatVisibility(show: boolean): void {
    if (show) {
      this.chatBox.classList.remove("hidden");
      this.chatBtn.classList.add("hidden");
      this.closeBtn.classList.remove("hidden");
    } else {
      this.chatBox.classList.add("hidden");
      this.chatBtn.classList.remove("hidden");
      this.closeBtn.classList.add("hidden");
    }
  }

  private createChatMessage(message: string, sender: 'user' | 'bot'): void {
    const msg = document.createElement("p");
    msg.classList.add(sender === "user" ? "user" : "bot");
    msg.innerText = message;
    this.chatMessages.appendChild(msg);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }

  private async generateResponse(messageElement: HTMLParagraphElement): Promise<void> {
    const API_URL = "https://openrouter.ai/api/v1/chat/completions";
    const userMessage = this.chatInput.value.trim();

    try {
      const response: Response = await fetch(API_URL, {
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
              content:
                "You are a car assistant chatbot. Always respond with short bullet-point answers, occasionally using emojis. Only answer car-related questions and website navigation help.",
            },
            { role: "user", content: userMessage },
          ],
        }),
      });

      if (!response.ok) throw new Error("Network error");

      const data = await response.json();
      messageElement.innerText = data.choices[0].message.content;
    } catch (error) {
      messageElement.innerText = "Oops! Something went wrong. Please try again!";
    }
  }

  private handleChat(event: Event): void {
    event.preventDefault();

    const userMessage = this.chatInput.value.trim();
    if (!userMessage) return;

    // Add user message
    this.createChatMessage(userMessage, "user");

    // Add bot "thinking..." message
    const botMessage = document.createElement("p");
    botMessage.classList.add(
      "bot",
      "bg-gray-200",
      "p-2",
      "rounded-xl",
      "self-start"
    );
    botMessage.innerText = "Thinking...";
    this.chatMessages.appendChild(botMessage);

    // Generate bot response
    this.generateResponse(botMessage);

    // Clear input field
    this.chatInput.value = "";
  }
}