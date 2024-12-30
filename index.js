let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

function loadVoices() {
  voices = window.speechSynthesis.getVoices();

  if (!voices.length) {
    console.error("No voices available. Retry after a delay or check system settings.");
    return;
  }

  voiceSelect.innerHTML = "";
  voices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });

  // Set default voice
  speech.voice = voices[0];
}

if (typeof window.speechSynthesis.onvoiceschanged !== "undefined") {
  window.speechSynthesis.onvoiceschanged = loadVoices;
} else {
  // Safari fallback: Load voices manually with a delay
  setTimeout(loadVoices, 500);
}

voiceSelect.addEventListener("change", () => {
  const selectedIndex = parseInt(voiceSelect.value);
  if (voices[selectedIndex]) {
    speech.voice = voices[selectedIndex];
    console.log(`Voice changed to: ${voices[selectedIndex].name}`);
  } else {
    console.error("Selected voice is not valid.");
  }
});

document.querySelector("button").addEventListener("click", () => {
  const text = document.querySelector("textarea").value.trim();
  if (!text) {
    alert("Please enter text to speak.");
    return;
  }

  speech.text = text;
  window.speechSynthesis.speak(speech);
});
