const choices = ["rock", "paper", "scissors"];
let playerScore = 0;
let computerScore = 0;

const playerScoreEl = document.getElementById("playerScore");
const computerScoreEl = document.getElementById("computerScore");
const playerChoiceEl = document.getElementById("playerChoice");
const computerChoiceEl = document.getElementById("computerChoice");
const resultEl = document.getElementById("result");
const historyEl = document.getElementById("history");

function playGame(playerChoice) {
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    playerChoiceEl.textContent = "⏳";
    computerChoiceEl.textContent = "⏳";
    resultEl.textContent = "Thinking...";

    setTimeout(() => {
        playerChoiceEl.textContent = getIcon(playerChoice);
        computerChoiceEl.textContent = getIcon(computerChoice);

        let result = getWinner(playerChoice, computerChoice);
        resultEl.textContent = result.text;
        resultEl.className = result.class;

        if (result.class === "win") playerScore++;
        if (result.class === "lose") computerScore++;

        playerScoreEl.textContent = playerScore;
        computerScoreEl.textContent = computerScore;

        addToHistory(playerChoice, computerChoice, result.text);

        if (playerScore === 5 || computerScore === 5) {
            resultEl.textContent = playerScore === 5 ? "🏆 You won the match!" : "💀 You lost the match!";
            disableButtons();
        }
    }, 800);
}

function getWinner(player, computer) {
    if (player === computer) return { text: "It's a tie!", class: "tie" };
    if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        return { text: "You win!", class: "win" };
    }
    return { text: "You lose!", class: "lose" };
}

function getIcon(choice) {
    if (choice === "rock") return "👊";
    if (choice === "paper") return "🖐";
    return "✌";
}

function addToHistory(player, computer, result) {
    const li = document.createElement("li");
    li.textContent = `You: ${player} | Computer: ${computer} → ${result}`;
    historyEl.prepend(li);
}

function disableButtons() {
    document.querySelectorAll(".choices button").forEach(btn => btn.disabled = true);
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreEl.textContent = 0;
    computerScoreEl.textContent = 0;
    resultEl.textContent = "Make your move!";
    playerChoiceEl.textContent = "❔";
    computerChoiceEl.textContent = "❔";
    historyEl.innerHTML = "";
    document.querySelectorAll(".choices button").forEach(btn => btn.disabled = false);
}
