const minNum = 1;
const maxNum = 100;
let answer = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
let attempts = 0;
let gameOver = false;

const guessInput = document.getElementById("guess-input");
const submitBtn = document.getElementById("submit-btn");
const feedback = document.getElementById("feedback");
const attemptsDisplay = document.getElementById("attempts");
const resetBtn = document.getElementById("reset-btn");
const historyList = document.getElementById("history-list");

let history = JSON.parse(localStorage.getItem("guessGameHistory")) || [];

renderHistory();

submitBtn.addEventListener("click", () => {
    if (gameOver) return;

    const guess = Number(guessInput.value);

    if (isNaN(guess)) {
        feedback.textContent = "❌ Please enter a valid number.";
        feedback.style.color = "red";
        return;
    }
    if (guess < minNum || guess > maxNum) {
        feedback.textContent = `⚠️ Please enter a number between ${minNum} and ${maxNum}.`;
        feedback.style.color = "orange";
        return;
    }

    attempts++;
    attemptsDisplay.textContent = attempts;

    if (guess < answer) {
        feedback.textContent = "📉 Too low!";
        feedback.style.color = "blue";
    } else if (guess > answer) {
        feedback.textContent = "📈 Too high!";
        feedback.style.color = "blue";
    } else {
        feedback.textContent = `✅ Correct! The answer was ${answer}.`;
        feedback.style.color = "green";
        gameOver = true;
        resetBtn.style.display = "block";

        history.push({
            answer,
            attempts,
            date: new Date().toLocaleString()
        });
        localStorage.setItem("guessGameHistory", JSON.stringify(history));
        renderHistory();
    }

    guessInput.value = "";
    guessInput.focus();
});

resetBtn.addEventListener("click", () => {
    answer = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    attempts = 0;
    gameOver = false;
    attemptsDisplay.textContent = "0";
    feedback.textContent = "";
    resetBtn.style.display = "none";
    guessInput.value = "";
    guessInput.focus();
});

function renderHistory() {
    historyList.innerHTML = "";
    history.slice(-5).reverse().forEach(game => {
        const li = document.createElement("li");
        li.textContent = `${game.date} - Answer: ${game.answer}, Attempts: ${game.attempts}`;
        historyList.appendChild(li);
    });
}
