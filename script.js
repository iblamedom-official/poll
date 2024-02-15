import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Firebase configuration
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

// Quiz Data and State
let currentQuestionIndex = 0;
let quizData = [];

// Function to start the quiz
function startQuiz() {
    fetchQuizData();
}

// Function to fetch quiz data
function fetchQuizData() {
    const quizRef = ref(database, 'quizData');
    onValue(quizRef, (snapshot) => {
        quizData = snapshot.val();
        populateQuiz();
    }, {
        onlyOnce: true
    });
}



function populateQuiz() {
    // Check if quizData is loaded and not null
    if (quizData && currentQuestionIndex < quizData.length) {
        const currentQuestion = quizData[currentQuestionIndex];
        if (currentQuestion && currentQuestion.answers && currentQuestion.answers.length > 0) {
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
            console.error('Quiz data is malformed or missing answers.');
        }
    } else {
        console.error('Quiz data is not loaded or index is out of bounds.');
    }
}






// Function to populate the quiz question and answers
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
        startTimer(); // Start or restart the timer for the new question
    } else {
        document.querySelector('.quiz-container').innerHTML = '<h2>Quiz Completed!</h2>';
    }
}

// Function to handle answer selection
function selectAnswer(answerIndex) {
    // Placeholder for answer selection logic. This is where you might update Firebase with the selected answer.
    setTimeout(() => showResults(`question${currentQuestionIndex}`), 500); // Simulate a delay before showing results
}

// Function to show results after all participants have voted or time is up
function showResults(questionKey) {
    // Placeholder for showing results. This would involve fetching the answer counts from Firebase, calculating percentages, and animating the bars.
}

// Function to start or reset the timer
function startTimer() {
    let timeLeft = 10; // Timer set for 10 seconds
    const timerEl = document.getElementById('timer');
    timerEl.textContent = `Time left: ${timeLeft}s`;

    const countdown = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            timerEl.textContent = "Time's up!";
            // Show results after a 3-second delay
            setTimeout(() => showResults(`question${currentQuestionIndex}`), 3000);
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', startQuiz);
