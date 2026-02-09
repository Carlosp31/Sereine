const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-image");
const closeBtn = document.querySelector(".close-modal");

document.querySelectorAll(".product-card img").forEach(img => {
    img.addEventListener("click", () => {
        modalImg.src = img.src;
        modal.classList.remove("hidden");
    });
});

closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.add("hidden");
    }
});
