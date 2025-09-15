// Cart system
let cart = [];
let cartCount = document.getElementById("cartCount");
let cartItems = document.getElementById("cartItems");
let cartTotal = document.getElementById("cartTotal");

function addToCart(name, price) {
  cart.push({ name, price });
  cartCount.innerText = cart.length;
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, i) => {
    total += item.price;
    let li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;
    cartItems.appendChild(li);
  });
  cartTotal.textContent = `Total: ₹${total}`;
}

function toggleCart() {
  const cartModal = document.getElementById("cartModal");
  cartModal.style.display = cartModal.style.display === "flex" ? "none" : "flex";
}

function checkout() {
  alert("Thank you for your purchase! 🌿");
  cart = [];
  cartCount.innerText = 0;
  renderCart();
  toggleCart();
}

// Filters
function filterProducts() {
  const searchVal = document.getElementById("searchBar").value.toLowerCase();
  const category = document.getElementById("categoryFilter").value;
  const products = document.querySelectorAll(".product-card");

  products.forEach(p => {
    const name = p.querySelector("h3").innerText.toLowerCase();
    const cat = p.dataset.category;
    if ((category === "all" || cat === category) && name.includes(searchVal)) {
      p.style.display = "block";
    } else {
      p.style.display = "none";
    }
  });
}

// Impact Chart
window.onload = function() {
  const ctx = document.getElementById("impactChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["CO₂ Saved", "E-Waste Reduced", "Water Saved"],
      datasets: [{
        label: "Your Impact",
        data: [120, 80, 45],
        backgroundColor: ["#66bb6a", "#ffee58", "#29b6f6"]
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });
};
