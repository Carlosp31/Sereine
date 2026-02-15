const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalPrice = document.getElementById("modal-price");
const modalInfo = document.getElementById("modal-info");
const modalVariants = document.getElementById("modal-variants");

document.querySelectorAll(".product-card img").forEach(img => {
    img.addEventListener("click", () => {
        modalImg.src = img.src;
        modalTitle.textContent = img.dataset.title;
        modalPrice.textContent = img.dataset.price;

        if (img.dataset.type === "camiseta") {
            modalVariants.style.display = "block";
        } else {
            modalVariants.style.display = "none";
        }

        modal.classList.remove("hidden");
    });
});

document.querySelector(".close-modal").onclick = () => {
    modal.classList.add("hidden");
};