// Video popup functionality

export function initializeVideoPopup(): void {
    const videoPopup = document.getElementById("video-popup") as HTMLDivElement;
    const closeVideo = document.getElementById("close-video") as HTMLButtonElement;
    const banerImage = document.getElementById("baner-image") as HTMLImageElement;
    const video = document.getElementById("video") as HTMLVideoElement;
  
    banerImage.addEventListener("click", () => {
      video.src = "../public/assets/car-video.mp4";
      videoPopup.classList.remove("hidden");
      videoPopup.classList.add("flex");
    });
  
    closeVideo.addEventListener("click", () => {
      video.src = "";
      videoPopup.classList.add("hidden");
      videoPopup.classList.remove("flex");
    });
  
    videoPopup.addEventListener("click", (e) => {
      if (e.target === videoPopup) {
        video.src = "";
        videoPopup.classList.add("hidden");
        videoPopup.classList.remove("flex");
      }
    });
  }