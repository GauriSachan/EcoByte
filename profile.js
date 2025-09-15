const coinBalance = document.getElementById("coinBalance");
const coinStat = document.getElementById("coinStat");
const rankProgress = document.getElementById("rankProgress");
const coinHistory = document.getElementById("coinHistory");
const userRank = document.getElementById("userRank");
const badgePro = document.getElementById("badgePro");
const badgeLegend = document.getElementById("badgeLegend");

let coins = 35;

// Refresh / Collect Rewards
function checkCoins() {
  let earned = Math.floor(Math.random() * 20 + 5);
  coins += earned;

  coinBalance.textContent = `💰 Green Coins: ${coins}`;
  coinStat.textContent = coins;

  updateRank();
  updateProgress();

  const row = document.createElement("tr");
  const date = new Date().toISOString().split("T")[0];
  row.innerHTML = `<td>${date}</td><td>Eco Activity</td><td>+${earned}</td>`;
  coinHistory.appendChild(row);
}

// Update Rank based on coins
function updateRank() {
  if (coins >= 200) {
    userRank.textContent = "🌍 Rank: Planet Guardian";
    badgeLegend.classList.remove("locked");
    badgeLegend.classList.add("unlocked");
  } else if (coins >= 100) {
    userRank.textContent = "♻ Rank: Recycler Pro";
    badgePro.classList.remove("locked");
    badgePro.classList.add("unlocked");
  } else {
    userRank.textContent = "🌱 Rank: Eco Starter";
  }
}

// Update Progress Bar
function updateProgress() {
  let progress = Math.min(coins % 100, 100);
  rankProgress.style.width = progress + "%";
}

// Edit Profile (demo)
function editProfile() {
  const newName = prompt("Enter new username:", "Eco Hero");
  if (newName) document.getElementById("username").textContent = newName;
}

// Avatar Upload
document.getElementById("avatarUpload").addEventListener("change", function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      document.getElementById("avatar").src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// History Search
document.getElementById("searchHistory").addEventListener("keyup", function() {
  let filter = this.value.toLowerCase();
  let rows = coinHistory.getElementsByTagName("tr");
  for (let row of rows) {
    let activity = row.cells[1].textContent.toLowerCase();
    row.style.display = activity.includes(filter) ? "" : "none";
  }
});

// Initialize
updateRank();
updateProgress();
