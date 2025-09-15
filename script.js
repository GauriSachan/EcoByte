// Green Coin simulation
let coins = localStorage.getItem("greenCoins") || 0;

function addCoins(amount) {
  coins = parseInt(coins) + amount;
  localStorage.setItem("greenCoins", coins);
  alert("🎉 You earned " + amount + " Green Coins! Total: " + coins);
}

// Fake ML defect detection
function simulateDefectCheck() {
  const fileInput = document.getElementById("uploadFile");
  if (!fileInput.value) {
    alert("Please upload a video first.");
    return;
  }
  // Randomly approve/reject
  const pass = Math.random() > 0.3;
  if (pass) {
    addCoins(10);
    alert("✅ Product verified! You can upload.");
  } else {
    alert("❌ Defect detected. Cannot upload.");
  }
}
