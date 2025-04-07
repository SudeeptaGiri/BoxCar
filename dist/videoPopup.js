// Video popup functionality
export function initializeVideoPopup() {
    const videoPopup = document.getElementById("video-popup");
    const closeVideo = document.getElementById("close-video");
    const banerImage = document.getElementById("baner-image");
    const video = document.getElementById("video");
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
