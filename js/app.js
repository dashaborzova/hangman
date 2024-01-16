const body = document.querySelector("body");
let secretWord;
let wrongLetter;
let correctLetters;
const maxTry = 6;

document.body.insertAdjacentHTML('afterbegin', '<div class="modal-window"></div>');
const modalWrapper = document.querySelector(".modal-wrapper");
document.querySelector('body div:first-of-type').insertAdjacentHTML('afterbegin', '<div class="modal-wrapper"></div>');
document.querySelector('.modal-wrapper').insertAdjacentHTML('afterbegin', '<h3 class="text">Game Over</h3>');
document.querySelector('.modal-wrapper').insertAdjacentHTML('beforeend', '<p class="inner-text">The word was : something </p>');
document.querySelector('.modal-wrapper').insertAdjacentHTML('beforeend', '<button class="play">Play again</button>');

const playAgain = document.querySelector(".play");
const modalWindow = document.querySelector(".modal-window");

modalWindow.insertAdjacentHTML('afterend', '<div class="container"></div>');
const container = document.querySelector(".container");
container.insertAdjacentHTML('afterbegin', '<div class="gallows"></div>');
const gallows = document.querySelector(".gallows");
gallows.insertAdjacentHTML('afterbegin', '<img class="gallows-image" src="./images/hangman-0.svg" alt="gallows">');
const hangman = document.querySelector(".gallows-image");
container.insertAdjacentHTML('beforeend', '<div class="quiz"></div>');
const quiz = document.querySelector(".quiz");
quiz.insertAdjacentHTML('afterbegin', '<ul class="display"></ul>');
const display = document.querySelector(".display");
display.insertAdjacentHTML('afterend', '<h3 class="hint text">Hint: </h3>');

const hint = document.querySelector(".hint");
hint.insertAdjacentHTML('beforeend', '<p class="inner-text clue">Some text</p>');
hint.insertAdjacentHTML('afterend', '<h3 class="guess text">Incorrect guesses: </h3>');
const guess = document.querySelector(".guess");
guess.insertAdjacentHTML('beforeend', '<p class="inner-text counter"> 0 / 6 </p>');
const counter = document.querySelector(".counter");
guess.insertAdjacentHTML('afterend', '<div class="keyboard"></div>');
const keyboard = document.querySelector(".keyboard");



const gameOver = (win) => {
  const modalText = win ? `You guessed the word: ` : `The secret word was :`;
  modalWindow.querySelector("h3").innerText = `${win ? `Good job!` : `Better luck next time!`}`
  modalWindow.querySelector("p").innerHTML = `${modalText} ${secretWord}`;
    setTimeout(() => {
    modalWindow.classList.add("visible")
  }, 300);
}

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
    button.addEventListener("click", e => startGame(e.target, String.fromCharCode(i)));    
};



getSecretWord();
playAgain.addEventListener("click", getSecretWord);