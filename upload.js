// File Upload Drag & Drop Effect
const dropArea = document.getElementById("dropArea");
const uploadFile = document.getElementById("uploadFile");

dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.style.background = "#e0f2f1";
  dropArea.style.borderColor = "#2e7d32";
});

dropArea.addEventListener("dragleave", () => {
  dropArea.style.background = "#f9fff9";
  dropArea.style.borderColor = "#66bb6a";
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadFile.files = e.dataTransfer.files;
  dropArea.querySelector("label").innerText = `Uploaded: ${uploadFile.files[0].name}`;
});

// Simulate AI Defect Check
function simulateDefectCheck() {
  const progressBar = document.getElementById("progressBar");
  const resultsCard = document.getElementById("resultsCard");
  const analysisText = document.getElementById("analysisText");

  if (!uploadFile.files.length) {
    alert("Please upload a file first!");
    return;
  }

  let progress = 0;
  resultsCard.style.display = "block";

  const interval = setInterval(() => {
    progress += 10;
    progressBar.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(interval);
      analysisText.innerText = "Analysis Complete ✅\nDevice shows minor repairable defects.";
      generateChart();
    }
  }, 400);
}

// Generate Random AI Chart
function generateChart() {
  const ctx = document.getElementById("analysisChart").getContext("2d");
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Repairable", "Scrap", "Working"],
      datasets: [{
        data: [50, 20, 30],
        backgroundColor: ["#66bb6a", "#ef5350", "#ffee58"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" }
      }
    }
  });
}
