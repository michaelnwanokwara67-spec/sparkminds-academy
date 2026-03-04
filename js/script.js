let score = 0;
let totalQuestions = 5;
let currentQuestion = 0;
let correctAnswer = "";

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const progressEl = document.getElementById("progress");

function generateQuestion() {
    if (currentQuestion >= totalQuestions) {
        questionEl.textContent = "🎉 Lesson Complete!";
        optionsEl.innerHTML = "";
        feedbackEl.textContent = "You earned " + score + " stars!";
        return;
    }

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    correctAnswer = letters[Math.floor(Math.random() * letters.length)];
    questionEl.textContent = "Click the letter: " + correctAnswer;

    optionsEl.innerHTML = "";

    for (let i = 0; i < 4; i++) {
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        const btn = document.createElement("button");
        btn.textContent = randomLetter;
        btn.className = "card";
        btn.onclick = () => checkAnswer(randomLetter);
        optionsEl.appendChild(btn);
    }
}

function checkAnswer(selected) {
    if (selected === correctAnswer) {
        score++;
        feedbackEl.textContent = "🎉 Correct!";
    } else {
        feedbackEl.textContent = "❌ Try again!";
    }

    currentQuestion++;
    scoreEl.textContent = "⭐ Stars: " + score;
    progressEl.style.width = (currentQuestion / totalQuestions) * 100 + "%";

    setTimeout(generateQuestion, 1000);
}

generateQuestion();