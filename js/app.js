const keyboard = document.querySelector(".keyboard");
const display = document.querySelector(".display");
const counter = document.querySelector(".counter");
const hangman = document.querySelector(".gallows-image");
const modalWindow = document.querySelector(".modal-window");
const playAgain = modalWindow.querySelector("button");
let secretWord;
let wrongLetter;
let correctLetters;
const maxTry = 6;

const newGame = () => {
  correctLetters = [];
  wrongLetter = 0;
  hangman.src = "images/hangman-0.svg";
  counter.innerText = `${wrongLetter} / ${maxTry}`;
  display.innerHTML = secretWord.split("").map(() => `<li class="letter"></li>`).join("");
  keyboard.querySelectorAll("button").forEach(el => el.disabled = false);
  modalWindow.classList.remove("visible");
}

const getSecretWord = () => {
    const { word, hint } = words[Math.floor(Math.random() * words.length)];
    secretWord = word;
    document.querySelector(".clue").innerText = hint;
    newGame();
}

const gameOver = (win) => {
  const modalText = win ? `You guessed the word: ` : `The secret word was :`;
  modalWindow.querySelector("h3").innerText = `${win ? `Good job!` : `Better luck next time!`}`
  modalWindow.querySelector("p").innerHTML = `${modalText} ${secretWord}`;
    setTimeout(() => {
    modalWindow.classList.add("visible")
  }, 300);
}

const startGame = (button, clicked) => {
  if(secretWord.includes(clicked)) {
    [...secretWord].forEach((letter, index) => {
        if(letter === clicked){
            correctLetters.push(letter);
            display.querySelectorAll("li")[index].innerText = letter;
            display.querySelectorAll("li")[index].classList.add("guess");
        }
    })
  } else {
    wrongLetter += 1;
  }
  button.disabled = true;
  counter.innerText = `${wrongLetter} / ${maxTry}`;
  hangman.src = `images/hangman-${wrongLetter}.svg`;

  if(wrongLetter === maxTry) return gameOver(false);
  if(correctLetters.length === secretWord.length) return gameOver(true);
}

for (let i = 97; i <= 122; i += 1){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboard.appendChild(button);
    button.addEventListener("click", e => startGame(e.target, String.fromCharCode(i)))
}

getSecretWord();
playAgain.addEventListener("click", getSecretWord);