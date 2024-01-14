const keyboard = document.querySelector(".keyboard");
const display = document.querySelector(".display");
const counter = document.querySelector(".counter");
const hangman = document.querySelector(".gallows-image");
let secretWord;
let wrongLetter = 0;
const maxTry = 6;

const getSecretWord = () => {
    const { word, hint } = words[Math.floor(Math.random() * words.length)];
    secretWord = word;
    document.querySelector(".inner-text").innerText = hint;
    display.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");
}

const startGame = (button, clicked) => {
  if(secretWord.includes(clicked)) {
    [...secretWord].forEach((letter, index) => {
        if(letter === clicked){
            display.querySelectorAll("li")[index].innerText = letter;
            display.querySelectorAll("li")[index].classList.add("guess");
        }
    })
  } else {
    wrongLetter += 1;
  }
  counter.innerText = `${wrongLetter} / ${maxTry}`;
  hangman.src = `images/hangman-${wrongLetter}.svg`;
}

for (let i = 97; i <= 122; i += 1){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboard.appendChild(button);
    button.addEventListener("click", e => startGame(e.target, String.fromCharCode(i)))
}

getSecretWord();