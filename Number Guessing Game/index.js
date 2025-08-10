const minNum = 1;
const maxNum = 100;
let answer = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;

let attempts = 0;
let running = true;


const guessInput = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");
const message = document.getElementById("message");
const attemptsText = document.getElementById("attempts");
const restartBtn = document.getElementById("restart-btn");

guessBtn.addEventListener("click", () => {
    if (!running) return;

    let guess = Number(guessInput.value);

    if (isNaN(guess)) {
        message.textContent = "Please enter a valid number!";
        message.style.color = "red";
    }
    else if (guess < minNum || guess > maxNum) {
        message.textContent = `Number must be between ${minNum} and ${maxNum}`;
        message.style.color = "red";
    }
    else {
        attempts++;
        if (guess < answer) {
            message.textContent = "Too low!";
            message.style.color = "orange";
        }
        else if (guess > answer) {
            message.textContent = "Too high!";
            message.style.color = "orange";
        }
        else {
            message.textContent = `Correct! The number was ${answer}`;
            message.style.color = "green";
            running = false;
            restartBtn.style.display = "inline-block";
        }
        attemptsText.textContent = `Attempts: ${attempts}`;
    }

    guessInput.value = "";
    guessInput.focus();
});


restartBtn.addEventListener("click", () => {
    answer = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    attempts = 0;
    running = true;
    message.textContent = "Too Low | Correct | Too High";
    message.style.color = "black";
    attemptsText.textContent = "Attempts: 0";
    restartBtn.style.display = "none";
});
