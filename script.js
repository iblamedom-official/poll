import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDOL95NQ2Qct1_Dww8AtkbVaJyDbp0XBJk",
    authDomain: "dynamic-quiz-9e1f2.firebaseapp.com",
    projectId: "dynamic-quiz-9e1f2",
    storageBucket: "dynamic-quiz-9e1f2.appspot.com",
    messagingSenderId: "639613986688",
    appId: "1:639613986688:web:770c27e02ed09f3a324365",
    measurementId: "G-2L5TD4EJV8"
};

initializeApp(firebaseConfig);
const database = getDatabase();

const quizData = [
    { question: "What is 2+2?", answers: ["4", "22", "3", "8"] },
    { question: "Capital of France?", answers: ["Paris", "London", "Berlin", "Madrid"] },
    { question: "Best programming language?", answers: ["JavaScript", "Python", "Ruby", "C++"] }
];
let currentQuestionIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    populateQuiz();
    startTimer();
});

function populateQuiz() {
    if (currentQuestionIndex < quizData.length) {
        const currentQuestion = quizData[currentQuestionIndex];
        document.getElementById('question').textContent = currentQuestion.question;
        const answersUl = document.getElementById('answers');
        answersUl.innerHTML = '';
        currentQuestion.answers.forEach((answer, index) => {
            const li = document.createElement('li');
            li.textContent = answer;
            li.onclick = () => selectAnswer(index);
            answersUl.appendChild(li);
        });
    } else {
        document.querySelector('.quiz-container').innerHTML = '<h2>Quiz Completed!</h2>';
    }
}

function selectAnswer(answerIndex) {
    // Intentionally simplified: Increment response count in Firebase
}

function showResults(questionKey) {
    // Fetch results from Firebase and animate percentage bars
}

function startTimer() {
    let timeLeft = 10;
    const timerEl = document.getElementById('timer');
    const countdown = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(countdown);
            timerEl.textContent = "Time's up!";
            setTimeout(() => showResults(`question${currentQuestionIndex + 1}`), 3000); // Show results with a delay
        }
    }, 1000);
}
