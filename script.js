// Select DOM elements
const text = document.getElementById("textToConvert");
const convertBtn = document.getElementById("convertBtn");
const speechToTextBtn = document.getElementById("speechToTextBtn");
const error = document.querySelector(".error-para");

// Text-to-Speech Code (same as your original)
convertBtn.addEventListener("click", function () {
  const speechSynth = window.speechSynthesis;
  const enteredText = text.value;

  if (!speechSynth.speaking && !enteredText.trim().length) {
    error.textContent = `Nothing to Convert! Enter text in the text area.`;
    return;
  }

  if (!speechSynth.speaking && enteredText.trim().length) {
    error.textContent = "";
    const newUtter = new SpeechSynthesisUtterance(enteredText);
    speechSynth.speak(newUtter);
    convertBtn.textContent = "Sound is Playing...";
  }

  // Reset the button text after 5 seconds
  setTimeout(() => {
    convertBtn.textContent = "Play Converted Sound";
  }, 5000);
});

// Speech-to-Text (Voice Recognition) Code
// Check browser support
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!window.SpeechRecognition) {
  // If the browser doesn't support SpeechRecognition
  alert("Speech Recognition not supported in this browser. Please use Chrome or Edge.");
} else {
  // Create a new instance of SpeechRecognition
  const recognition = new window.SpeechRecognition();

  // This makes recognition continuous (keeps listening until we stop)
  recognition.continuous = false; 
  // Set language (adjust as needed)
  recognition.lang = "en-US"; 

  // On result (when recognition hears something)
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    text.value = transcript; // Put recognized text into textarea
  };

  // On error
  recognition.onerror = (event) => {
    console.error("Speech recognition error detected: " + event.error);
    error.textContent = "Error recognizing speech. Please try again.";
  };

  // On end (when recognition stops), you can restart if continuous is set to true
  recognition.onend = () => {
    // recognition.start(); // Uncomment if you want it to keep listening
    speechToTextBtn.textContent = "Start Recording";
  };

  // Toggle listening on button click
  speechToTextBtn.addEventListener("click", () => {
    // If already listening, stop
    if (speechToTextBtn.textContent === "Stop Recording") {
      recognition.stop();
      speechToTextBtn.textContent = "Start Recording";
    } else {
      // Start recognition
      error.textContent = "";
      recognition.start();
      speechToTextBtn.textContent = "Stop Recording";
    }
  });
}