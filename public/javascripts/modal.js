const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalPrice = document.getElementById("modal-price");
const modalVariants = document.getElementById("modal-variants");
const modalInfo = document.getElementById("modal-info"); // 👈 NUEVO

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let images = [];
let currentIndex = 0;

// 👉 abrir modal
document.querySelectorAll(".product-card img").forEach(img => {
    img.addEventListener("click", () => {

        // convertir string → array
        images = img.dataset.images.split(",").map(i => i.trim());
        currentIndex = 0;

        modalImg.src = images[currentIndex];

        // 👇 CONTROL FLECHAS
        if (images.length <= 1) {
            prevBtn.style.display = "none";
            nextBtn.style.display = "none";
        } else {
            prevBtn.style.display = "flex";
            nextBtn.style.display = "flex";
        }

        modalTitle.textContent = img.dataset.title;
        modalPrice.textContent = img.dataset.price;

        // 👇 INFO DINÁMICA
        modalInfo.textContent = img.dataset.info || "";

        // 👇 CAMISETAS vs ACCESORIOS
        if (img.dataset.type === "camiseta") {
            modalVariants.style.display = "block";
        } else {
            modalVariants.style.display = "none";
        }

        modal.classList.remove("hidden");
    });
});

// 👉 siguiente imagen
nextBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % images.length;
    modalImg.src = images[currentIndex];
};

// 👉 anterior imagen
prevBtn.onclick = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    modalImg.src = images[currentIndex];
};

// 👉 cerrar (unificado)
const closeModal = () => {
    modal.classList.add("hidden");
};

document.querySelector(".close-modal").addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// 👉 swipe móvil
let startX = 0;

modalImg.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

modalImg.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    let diff = startX - endX;

    if (diff > 50) {
        nextBtn.click(); // swipe izquierda
    } else if (diff < -50) {
        prevBtn.click(); // swipe derecha
    }
});