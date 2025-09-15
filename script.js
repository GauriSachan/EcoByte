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
// Drag & Drop functionality
const dropArea = document.getElementById("dropArea");
const uploadInput = document.getElementById("uploadFile");
const filePreview = document.getElementById("filePreview");

dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.style.background = "#e8f5e9";
});

dropArea.addEventListener("dragleave", () => {
  dropArea.style.background = "#f9fff9";
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.style.background = "#f9fff9";
  const file = e.dataTransfer.files[0];
  if (file) showFile(file);
  uploadInput.files = e.dataTransfer.files;
});

uploadInput.addEventListener("change", () => {
  const file = uploadInput.files[0];
  if (file) showFile(file);
});

function showFile(file) {
  filePreview.innerHTML = `<strong>Selected File:</strong> ${file.name} (${Math.round(file.size/1024)} KB)`;
}

// Simulated ML Check
function simulateDefectCheck() {
  const progressContainer = document.getElementById("progressContainer");
  const progressBar = document.getElementById("progressBar");
  const resultsBox = document.getElementById("aiResults");

  progressContainer.style.display = "block";
  resultsBox.style.display = "none";
  progressBar.style.width = "0%";

  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    progressBar.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(interval);

      // Show results
      resultsBox.style.display = "block";
      document.getElementById("repairScore").innerText = "78%";
      document.getElementById("recycleScore").innerText = "92%";
      document.getElementById("ecoScore").innerText = "85/100";
    }
  }, 300);
}
