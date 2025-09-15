const coinBalance = document.getElementById("coinBalance");
const coinStat = document.getElementById("coinStat");
const rankProgress = document.getElementById("rankProgress");
const coinHistory = document.getElementById("coinHistory");

let coins = 35; // demo coins

function checkCoins() {
  // simulate coin increase
  coins += Math.floor(Math.random() * 10 + 1);
  coinBalance.textContent = `💰 Green Coins: ${coins}`;
  coinStat.textContent = coins;

  // update rank progress
  const progress = Math.min((coins % 100), 100);
  rankProgress.style.width = progress + "%";

  // add entry in history
  const row = document.createElement("tr");
  const date = new Date().toISOString().split("T")[0];
  row.innerHTML = `<td>${date}</td><td>Eco Activity</td><td>+${coins % 10}</td>`;
  coinHistory.appendChild(row);
}
