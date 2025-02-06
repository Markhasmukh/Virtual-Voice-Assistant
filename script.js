let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-US"; // Change language if needed

    // Get available voices
    let voices = window.speechSynthesis.getVoices();

    // Select a male voice (voice names may vary based on your system)
    let maleVoice = voices.find(voice => voice.name.includes("Male") || voice.name.includes("David") || voice.name.includes("Matthew") || voice.name.includes("Google UK English Male"));

    // If a male voice is found, assign it
    if (maleVoice) {
        text_speak.voice = maleVoice;
    }

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    // Check if greeting has already been given
    if (!localStorage.getItem("hasWished")) {
        let day = new Date();
        let hours = day.getHours();
        if (hours >= 0 && hours < 12) {
            speak("Good Morning Sir");
        } else if (hours >= 12 && hours < 16) {
            speak("Good Afternoon Sir");
        } else {
            speak("Good Evening Sir");
        }

        // Set flag in localStorage so it does not repeat
        localStorage.setItem("hasWished", "true");
    }
}

// Call wishMe only if it's the first time
window.addEventListener("load", () => {
    wishMe();
});

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    let transcript = event.results[event.results.length - 1][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

function takeCommand(message) {
    message = message.toLowerCase();
    btn.style.display = "flex";
    voice.style.display = "none";

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello Sir, what can I help you with?");
    } else if (message.includes("who is mark")) {
        speak("I am Mark, a Virtual Assistant, created by Hasmukh Sir.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com/", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://www.google.com/", "_blank");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://www.facebook.com/", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://www.instagram.com/", "_blank");
    } else if (message.includes("open calculator")) {
        speak("Opening Calculator...");
        window.open("calculator://");
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp...");
        window.open("whatsapp://");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The time is " + time);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak("Today's date is " + date);
    } else if (message.includes("reset")) {
        // Reset greeting so it can be triggered again
        localStorage.removeItem("hasWished");
        speak("Greeting reset. Restart me to hear it again.");
    } else {
        let finalText = "This is what I found on the internet regarding " + message.replace("mark", "");
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace("mark", "")}`, "_blank");
    }
}

// // Ensure voices are loaded before speaking
// window.speechSynthesis.onvoiceschanged = () => {
//     speak("Hello, I am now speaking with a male voice.");
// };
