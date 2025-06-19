// Comments section functionality
export function initializeCommentSection() {
    const names = ["Ali TUFAN", "John Doe", "Emma Smith"];
    const professions = ["Designer", "Software Engineer", "Marketing Specialist"];
    const comments = [
        "I'd suggest Macklin Motors Nissan Glasgow South to a friend because I had great service from my salesman Patrick and all of the team.",
        "The experience was seamless, and the staff was very professional. Highly recommend!Excellent customer service! The team was very helpful and made the process easy.",
        "Had a wonderful experience. The team was knowledgeable and friendly throughout.Great service and attention to detail. Will definitely come back again!",
    ];
    const name = document.getElementById("name");
    const profession = document.getElementById("profession");
    const comment = document.getElementById("comment");
    const profilePhotos = document.querySelectorAll(".profile-photo img");
    const nextComment = document.getElementById("next-comment");
    const prevComment = document.getElementById("previous-comment");
    let commentIndex = 0;
    function updateCommentDisplay() {
        // Remove highlight from previous photo
        profilePhotos.forEach(photo => {
            photo.classList.remove("border-2", "border-blue-400", "p-0.5", "w-12", "h-12");
            photo.classList.add("w-10", "h-10");
        });
        // Update comment details
        name.innerText = names[commentIndex];
        profession.innerText = professions[commentIndex];
        comment.innerText = comments[commentIndex];
        // Highlight current photo
        profilePhotos[commentIndex].classList.remove("w-10", "h-10");
        profilePhotos[commentIndex].classList.add("border-2", "border-blue-400", "p-0.5", "w-12", "h-12");
    }
    nextComment.addEventListener("click", () => {
        commentIndex = (commentIndex + 1) % comments.length;
        updateCommentDisplay();
    });
    prevComment.addEventListener("click", () => {
        commentIndex = (commentIndex - 1 + comments.length) % comments.length;
        updateCommentDisplay();
    });
    // Initialize with first comment
    updateCommentDisplay();
}
