var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function fetchBlogPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("../public/data/blogs.json");
            const data = yield response.json();
            const blogPosts = document.getElementById("blog-post");
            data.forEach((item) => {
                const blogSection = document.createElement("section");
                blogSection.className = "group";
                blogSection.innerHTML = `
        <figure class="overflow-hidden rounded-2xl hover:opacity-80">
          <img src="${item.image}" alt="blog-image" />
        </figure>
        <article>
          <p class="py-1.5">
            <span class="text-sm leading-6">${item.author}</span> &middot;
            <span class="text-sm leading-6">${item.date}</span>
          </p>
          <p class="text-xl leading-7 hover:underline">
            ${item.text}
          </p>
        </article>
      `;
                blogPosts.appendChild(blogSection);
            });
        }
        catch (error) {
            console.error("Error fetching blog posts:", error);
        }
    });
}
