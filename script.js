const words = ["javascript", "html", "css", "coding", "programming"];
let selectedWord = '';
let guessedLetters = [];
let mistakes = 0;
const maxMistakes = 6;

function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    mistakes = 0;
    document.getElementById('reset-button').style.display = 'none';
    document.getElementById('message').textContent = '';
    drawWord();
    drawButtons();
    clearCanvas();
}

function drawWord() {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = selectedWord.split('').map(letter => guessedLetters.includes(letter) ? letter : '_').join(' ');
}

function drawButtons() {
    const letterButtons = document.getElementById('letter-buttons');
    letterButtons.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        const button = document.createElement('button');
        button.textContent = String.fromCharCode(i);
        button.onclick = () => guessLetter(button.textContent.toLowerCase());
        letterButtons.appendChild(button);
    }
}

function guessLetter(letter) {
    guessedLetters.push(letter);
    document.querySelectorAll('#letter-buttons button').forEach(button => {
        if (button.textContent.toLowerCase() === letter) {
            button.disabled = true;
        }
    });

    if (selectedWord.includes(letter)) {
        drawWord();
        checkWin();
    } else {
        mistakes++;
        drawHangman();
        checkLose();
    }
}

function checkWin() {
    const wordContainer = document.getElementById('word-container');
    if (!wordContainer.textContent.includes('_')) {
        document.getElementById('message').textContent = 'Você ganhou!';
        endGame();
    }
}

function checkLose() {
    if (mistakes === maxMistakes) {
        document.getElementById('message').textContent = `Você perdeu! A palavra era: ${selectedWord}`;
        endGame();
    }
}

function endGame() {
    document.getElementById('reset-button').style.display = 'block';
    document.querySelectorAll('#letter-buttons button').forEach(button => button.disabled = true);
}

function drawHangman() {
    const canvas = document.getElementById('hangman-canvas');
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;

    if (mistakes >= 1) {
        ctx.moveTo(10, 190);
        ctx.lineTo(190, 190);
    }
    if (mistakes >= 2) {
        ctx.moveTo(50, 190);
        ctx.lineTo(50, 10);
    }
    if (mistakes >= 3) {
        ctx.moveTo(50, 10);
        ctx.lineTo(120, 10);
    }
    if (mistakes >= 4) {
        ctx.moveTo(120, 10);
        ctx.lineTo(120, 40);
    }
    if (mistakes >= 5) {
        ctx.arc(120, 60, 20, 0, Math.PI * 2);
    }
    if (mistakes >= 6) {
        ctx.moveTo(120, 80);
        ctx.lineTo(120, 140);
        ctx.moveTo(120, 100);
        ctx.lineTo(90, 120);
        ctx.moveTo(120, 100);
        ctx.lineTo(150, 120);
        ctx.moveTo(120, 140);
        ctx.lineTo(90, 170);
        ctx.moveTo(120, 140);
        ctx.lineTo(150, 170);
    }
    ctx.stroke();
}

function clearCanvas() {
    const canvas = document.getElementById('hangman-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function resetGame() {
    startGame();
}

startGame();
