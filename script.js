let isMuted = false; // To keep track of the mute state
const audioElement = new Audio('lofi.mp3'); // Path to your lofi.mp4 file

audioElement.loop = true; // Make the music loop indefinitely

// Start the music when the page loads
window.onload = function() {
  audioElement.play().catch((error) => {
    console.log('Error with audio play:', error);
  });
}

// Function to toggle mute state
function toggleMute() {
  isMuted = !isMuted;
  if (isMuted) {
    audioElement.muted = true;
    document.getElementById('mute-btn').textContent = 'Unmute';
  } else {
    audioElement.muted = false;
    document.getElementById('mute-btn').textContent = 'Mute';
  }
}

// Mute button event listener
document.getElementById('mute-btn').addEventListener('click', toggleMute);

// Clock Update Function
function updateClock() {
  const clock = document.getElementById("clock");
  const date = document.getElementById("date");
  const greeting = document.getElementById("greeting");
  const now = new Date();

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const isAm = hours < 12;

  const formattedDate = now.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const timeFormat = localStorage.getItem("timeFormat") || "24";
  if (timeFormat === "12") hours = hours % 12 || 12;

  clock.textContent = `${hours}:${minutes}:${seconds}`;
  date.textContent = formattedDate;

  greeting.textContent = hours < 12 ? "Good Morning!" : "Good Evening!";
}

// Theme Change Function
function changeTheme(theme) {
  document.body.className = theme;
  localStorage.setItem("theme", theme);
}

document.getElementById("light-theme").addEventListener("click", () => changeTheme("light"));
document.getElementById("dark-theme").addEventListener("click", () => changeTheme("dark"));
document.getElementById("neon-theme").addEventListener("click", () => changeTheme("neon"));

document.getElementById("toggle-format").addEventListener("click", () => {
  const currentFormat = localStorage.getItem("timeFormat") || "24";
  const newFormat = currentFormat === "24" ? "12" : "24";
  localStorage.setItem("timeFormat", newFormat);
});

document.getElementById("font-selector").addEventListener("change", (e) => {
  document.body.style.fontFamily = e.target.value;
});

setInterval(updateClock, 1000);
updateClock();
