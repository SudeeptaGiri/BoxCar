// Blog posts functionality
import { BlogPost } from './types.js';

export async function fetchBlogPosts(): Promise<void> {
  try {
    const response:Response = await fetch("../public/data/blogs.json");
    const data: BlogPost[] = await response.json();
    const blogPosts = document.getElementById("blog-post") as HTMLDivElement;

    data.forEach((item: BlogPost) => {
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
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }
}