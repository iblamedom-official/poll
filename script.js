/ Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

// Your web app's Firebase configuration
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
const analytics = getAnalytics(app);

let currentQuestionIndex = 0;
const quizData = [
    { question: "What is 2+2?", answers: ["4", "22", "3", "8"] },
    // Add more questions here
];

function populateQuiz() {
    if (currentQuestionIndex >= quizData.length) {
        document.querySelector('.quiz-container').innerHTML = '<h2>Quiz Completed!</h2>';
        return;
    }
    const currentQuestion = quizData[currentQuestionIndex];
    document.getElementById('question').innerText = currentQuestion.question;
    const answersUl = document.getElementById('answers');
    answersUl.innerHTML = '';
    currentQuestion.answers.forEach((answer, index) => {
        const li = document.createElement('li');
        li.innerText = answer;
        li.addEventListener('click', () => selectAnswer(index));
        answersUl.appendChild(li);
    });
}

function selectAnswer(answerIndex) {
    // Record answer and show next question button
    document.getElementById('nextQuestion').style.display = 'block';
    animateResults(); // Simulate and animate results
}

function animateResults() {
    const answersUl = document.getElementById('answers');
    answersUl.childNodes.forEach((li) => {
        const percentageDiv = document.createElement('div');
        percentageDiv.className = 'percentage';
        li.appendChild(percentageDiv);
        // Mock percentage for demonstration
        const percentage = Math.floor(Math.random() * 100);
        percentageDiv.style.setProperty('--width', `${percentage}%`);
        percentageDiv.setAttribute('data-percentage', `${percentage}%`);
    });
    // Prevent further clicks
    answersUl.childNodes.forEach((li) => li.style.pointerEvents = 'none');
}

document.getElementById('nextQuestion').addEventListener('click', () => {
    currentQuestionIndex++;
    populateQuiz();
    document.getElementById('nextQuestion').style.display = 'none'; // Hide button until next selection
});

document.addEventListener('DOMContentLoaded', populateQuiz);