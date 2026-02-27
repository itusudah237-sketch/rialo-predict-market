document.getElementById("predictBtn").addEventListener("click", function() {
  let harga = document.getElementById("hargaInput").value;

  if (harga === "" || harga === null) {
    alert("Masukkan harga dulu!");
    return;
  }

  harga = parseFloat(harga);

  if (isNaN(harga)) {
    alert("Harga harus berupa angka!");
    return;
  }

  let hasil;
  let emoji;

  if (harga > 100) {
    hasil = "Market kemungkinan TURUN";
    emoji = "📉";
  } else {
    hasil = "Market kemungkinan NAIK";
    emoji = "📈";
  }

  // Tampilkan hasil
  const resultContainer = document.getElementById("resultContainer");
  const resultText = document.getElementById("resultText");
  resultText.textContent = hasil + " " + emoji;
  resultContainer.classList.remove("hidden");

  // Simpan ke history
  addToHistory(harga, hasil, emoji);

  // Clear input
  document.getElementById("hargaInput").value = "";
});

function addToHistory(harga, hasil, emoji) {
  const historyList = document.getElementById("historyList");
  const li = document.createElement("li");
  const timestamp = new Date().toLocaleTimeString("id-ID");
  li.textContent = `Rp ${harga.toLocaleString("id-ID")} - ${hasil} ${emoji} (${timestamp})`;
  historyList.insertBefore(li, historyList.firstChild);

  // Simpan ke localStorage
  saveToLocalStorage(harga, hasil, emoji, timestamp);
}

function saveToLocalStorage(harga, hasil, emoji, timestamp) {
  let history = JSON.parse(localStorage.getItem("predictionHistory")) || [];
  history.push({
    harga: harga,
    hasil: hasil,
    emoji: emoji,
    timestamp: timestamp
  });
  localStorage.setItem("predictionHistory", JSON.stringify(history));
}

function loadHistory() {
  let history = JSON.parse(localStorage.getItem("predictionHistory")) || [];
  const historyList = document.getElementById("historyList");
  
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `Rp ${item.harga.toLocaleString("id-ID")} - ${item.hasil} ${item.emoji} (${item.timestamp})`;
    historyList.appendChild(li);
  });
}

// Load history saat page load
window.addEventListener("load", loadHistory);

// Allow enter key to predict
document.getElementById("hargaInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    document.getElementById("predictBtn").click();
  }
});