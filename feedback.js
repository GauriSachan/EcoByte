// Rating Stars
const stars = document.querySelectorAll(".rating-stars span");
const ratingInput = document.getElementById("rating");

stars.forEach(star => {
  star.addEventListener("click", () => {
    stars.forEach(s => s.classList.remove("active"));
    star.classList.add("active");
    ratingInput.value = star.dataset.value;
  });
});

// Popup
const form = document.getElementById("feedbackForm");
const popup = document.getElementById("thankYouPopup");
const closePopup = document.getElementById("closePopup");

form.addEventListener("submit", e => {
  e.preventDefault();
  popup.style.display = "flex";
  form.reset();
  stars.forEach(s => s.classList.remove("active"));
  ratingInput.value = "";

  // Leaf confetti effect
  createLeafConfetti();
});

closePopup.addEventListener("click", () => {
  popup.style.display = "none";
});

// Quotes Carousel
const quotes = document.querySelectorAll(".quote");
let currentQuote = 0;
setInterval(() => {
  quotes[currentQuote].classList.remove("active");
  currentQuote = (currentQuote + 1) % quotes.length;
  quotes[currentQuote].classList.add("active");
}, 4000);

// Leaf Confetti
function createLeafConfetti() {
  for (let i = 0; i < 20; i++) {
    const leaf = document.createElement("div");
    leaf.classList.add("leaf");
    leaf.innerHTML = "🍃";
    document.body.appendChild(leaf);

    leaf.style.left = Math.random() * window.innerWidth + "px";
    leaf.style.animationDuration = (2 + Math.random() * 3) + "s";
    leaf.style.fontSize = (16 + Math.random() * 24) + "px";

    setTimeout(() => leaf.remove(), 4000);
  }
}
