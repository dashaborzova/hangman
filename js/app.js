const keyboard = document.querySelector(".keyboard");
const display = document.querySelector(".display");
const counter = document.querySelector(".counter");
const hangman = document.querySelector(".gallows-image");
const modalWindow = document.querySelector(".modal-window");
let secretWord;
let wrongLetter = 0;
let correctLetters = [];
const maxTry = 6;

const getSecretWord = () => {
    const { word, hint } = words[Math.floor(Math.random() * words.length)];
    secretWord = word;
    document.querySelector(".inner-text").innerText = hint;
    display.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");
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