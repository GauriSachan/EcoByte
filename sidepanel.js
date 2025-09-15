// Side panel toggle
const sidePanel = document.getElementById('sidePanel');
const overlay = document.getElementById('panelOverlay');
const openBtn = document.getElementById('openPanelBtn');
const closeBtn = document.getElementById('closePanel');
const panelCart = document.getElementById('panelCart');

// Open panel
openBtn.addEventListener('click', () => {
  sidePanel.classList.add('active');
  overlay.classList.add('active');
});

// Close panel
closeBtn.addEventListener('click', () => {
  sidePanel.classList.remove('active');
  overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
  sidePanel.classList.remove('active');
  overlay.classList.remove('active');
});

// Dynamic cart update function
function updatePanelCart(items) {
  if (!items || items.length === 0) {
    panelCart.innerHTML = '<p>No items in cart yet.</p>';
  } else {
    panelCart.innerHTML = '<ul>' + items.map(item => `<li>${item}</li>`).join('') + '</ul>';
  }
}

// Example: link with your existing addToCart()
function addToCart(itemName) {
  // Update the side panel dynamically
  let cartItems = panelCart.querySelectorAll('li');
  let currentItems = Array.from(cartItems).map(li => li.textContent);
  currentItems.push(itemName);
  updatePanelCart(currentItems);

  // Show small toast (reuse your existing cartToast)
  const cartToast = document.getElementById('cartToast');
  cartToast.textContent = `${itemName} added to cart!`;
  cartToast.classList.add('show');
  setTimeout(() => cartToast.classList.remove('show'), 2500);
}
