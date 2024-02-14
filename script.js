import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDOL95NQ2Qct1_Dww8AtkbVaJyDbp0XBJk",
    authDomain: "dynamic-quiz-9e1f2.firebaseapp.com",
    projectId: "dynamic-quiz-9e1f2",
    storageBucket: "dynamic-quiz-9e1f2.appspot.com",
    messagingSenderId: "639613986688",
    appId: "1:639613986688:web:770c27e02ed09f3a324365",
    measurementId: "G-2L5TD4EJV8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', () => {
    startQuiz();
});

function startQuiz() {
    // Placeholder for starting the quiz logic
    startTimer();
}

function startTimer() {
    let timeLeft = 10;
    const timerEl = document.getElementById('timer');
    timerEl.textContent = `Time left: ${timeLeft}s`;

    const countdown = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            timerEl.textContent = "Time's up!";
            // After 3 seconds delay, show results
            setTimeout(showResults, 3000);
        }
    }, 1000);
}

function showResults() {
    // Logic to fetch and display the results with animation
}
