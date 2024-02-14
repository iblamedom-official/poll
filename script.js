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

const quizData = [
    { question: "What is 2+2?", answers: ["4", "22", "3", "8"] },
    { question: "Capital of France?", answers: ["Paris", "London", "Berlin", "Madrid"] },
    { question: "Best programming language?", answers: ["JavaScript", "Python", "Ruby", "C++"] }
];



document.addEventListener('DOMContentLoaded', () => {
    startQuiz();
});

let currentQuestionIndex = 0;
function populateQuiz() {
    if (currentQuestionIndex < quizData.length) {
        const currentQuestion = quizData[currentQuestionIndex];
        document.getElementById('question').textContent = currentQuestion.question;
        const answersUl = document.getElementById('answers');
        answersUl.innerHTML = ''; // Clear previous answers
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
    const questionKey = `question${currentQuestionIndex + 1}`;
    const answerKey = `answer${answerIndex + 1}`;
    const answerRef = ref(database, `quiz/${questionKey}/${answerKey}`);
    onValue(answerRef, (snapshot) => {
        const currentCount = snapshot.val() || 0;
        set(answerRef, currentCount + 1);
    }, {
        onlyOnce: true
    });
    setTimeout(() => showResults(questionKey), 500); // Add a short delay before showing results
}
function showResults(questionKey) {
    const questionRef = ref(database, `quiz/${questionKey}`);
    onValue(questionRef, (snapshot) => {
        const data = snapshot.val();
        let total = 0;
        Object.values(data).forEach(num => total += num);
        document.getElementById('answers').childNodes.forEach((li, index) => {
            const count = data[`answer${index + 1}`] || 0;
            const percentage = ((count / total) * 100).toFixed(2);
            if (!li.querySelector('.percentage-bar')) {
                const percBar = document.createElement('div');
                percBar.className = 'percentage-bar';
                percBar.style.width = '0%';
                li.appendChild(percBar);
            }
            setTimeout(() => {
                li.querySelector('.percentage-bar').style.width = `${percentage}%`;
                li.querySelector('.percentage-bar').textContent = `${percentage}%`;
            }, 100);
        });
        document.getElementById('nextQuestion').style.display = 'block';
    }, {
        onlyOnce: true
    });
}


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


function showResults(questionKey) {
    const questionRef = ref(database, `quiz/${questionKey}`);
    onValue(questionRef, (snapshot) => {
        const data = snapshot.val();
        let total = 0;
        Object.values(data).forEach(num => total += num);
        document.getElementById('answers').childNodes.forEach((li, index) => {
            const count = data[`answer${index + 1}`] || 0;
            const percentage = ((count / total) * 100).toFixed(2);
            if (!li.querySelector('.percentage-bar')) {
                const percBar = document.createElement('div');
                percBar.className = 'percentage-bar';
                percBar.style.width = '0%';
                li.appendChild(percBar);
            }
            setTimeout(() => {
                li.querySelector('.percentage-bar').style.width = `${percentage}%`;
                li.querySelector('.percentage-bar').textContent = `${percentage}%`;
            }, 100);
        });
        document.getElementById('nextQuestion').style.display = 'block';
    }, {
        onlyOnce: true
    });
}
document.getElementById('nextQuestion').addEventListener('click', () => {
    currentQuestionIndex++;
    populateQuiz();
    document.getElementById('nextQuestion').style.display = 'none'; // Hide until next selection
});
document.addEventListener('DOMContentLoaded', populateQuiz);
