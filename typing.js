import quotes from './data.js';

const quoteDisplay = document.querySelector('#quoteDisplay');
const refreshBtn = document.querySelector('#refreshBtn');
const quoteInput = document.querySelector('#quoteInput');
const timer = document.querySelector('#timer');
const main = document.querySelector('#main')
let isIntro = true;

function updateRefreshButton() {
  if (isIntro) {
    refreshBtn.innerHTML = `
      <span class="start-text">Press here to start →</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
        <path d="M129.9 292.5C143.2 199.5 223.3 128 320 128C373 128 421 149.5 455.8 184.2C456 184.4 456.2 184.6 456.4 184.8L464 192L416.1 192C398.4 192 384.1 206.3 384.1 224C384.1 241.7 398.4 256 416.1 256L544.1 256C561.8 256 576.1 241.7 576.1 224L576.1 96C576.1 78.3 561.8 64 544.1 64C526.4 64 512.1 78.3 512.1 96L512.1 149.4L500.8 138.7C454.5 92.6 390.5 64 320 64C191 64 84.3 159.4 66.6 283.5C64.1 301 76.2 317.2 93.7 319.7C111.2 322.2 127.4 310 129.9 292.6zM573.4 356.5C575.9 339 563.7 322.8 546.3 320.3C528.9 317.8 512.6 330 510.1 347.4C496.8 440.4 416.7 511.9 320 511.9C267 511.9 219 490.4 184.2 455.7C184 455.5 183.8 455.3 183.6 455.1L176 447.9L223.9 447.9C241.6 447.9 255.9 433.6 255.9 415.9C255.9 398.2 241.6 383.9 223.9 383.9L96 384C87.5 384 79.3 387.4 73.3 393.5C67.3 399.6 63.9 407.7 64 416.3L65 543.3C65.1 561 79.6 575.2 97.3 575C115 574.8 129.2 560.4 129 542.7L128.6 491.2L139.3 501.3C185.6 547.4 249.5 576 320 576C449 576 555.7 480.6 573.4 356.5z"/>
      </svg>
    `;
  } else {
    refreshBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
        <path d="M129.9 292.5C143.2 199.5 223.3 128 320 128C373 128 421 149.5 455.8 184.2C456 184.4 456.2 184.6 456.4 184.8L464 192L416.1 192C398.4 192 384.1 206.3 384.1 224C384.1 241.7 398.4 256 416.1 256L544.1 256C561.8 256 576.1 241.7 576.1 224L576.1 96C576.1 78.3 561.8 64 544.1 64C526.4 64 512.1 78.3 512.1 96L512.1 149.4L500.8 138.7C454.5 92.6 390.5 64 320 64C191 64 84.3 159.4 66.6 283.5C64.1 301 76.2 317.2 93.7 319.7C111.2 322.2 127.4 310 129.9 292.6zM573.4 356.5C575.9 339 563.7 322.8 546.3 320.3C528.9 317.8 512.6 330 510.1 347.4C496.8 440.4 416.7 511.9 320 511.9C267 511.9 219 490.4 184.2 455.7C184 455.5 183.8 455.3 183.6 455.1L176 447.9L223.9 447.9C241.6 447.9 255.9 433.6 255.9 415.9C255.9 398.2 241.6 383.9 223.9 383.9L96 384C87.5 384 79.3 387.4 73.3 393.5C67.3 399.6 63.9 407.7 64 416.3L65 543.3C65.1 561 79.6 575.2 97.3 575C115 574.8 129.2 560.4 129 542.7L128.6 491.2L139.3 501.3C185.6 547.4 249.5 576 320 576C449 576 555.7 480.6 573.4 356.5z"/>
      </svg>
    `;
  }
}


function characterSplit(text) {
  text.split('').forEach(character => {
    const span = document.createElement('span');
    span.textContent = character;
    quoteDisplay.appendChild(span);
  });
}

let startTime;
let timerInterval;
let timerStarted = false;

function startTimer() {
  timer.textContent = 0;
  startTime = new Date();

  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    timer.textContent = Math.floor((new Date() - startTime) / 1000);
  }, 1000);
}

refreshBtn.addEventListener('click', function () {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  quoteDisplay.innerHTML = '';
  characterSplit(randomQuote);

  quoteInput.textContent = '';

  clearInterval(timerInterval);
  timer.textContent = 0;
  timerStarted = false;

  isIntro = false;

  updateRefreshButton();
});

function resulteScrean() {
    if (!isIntro) {
        main.style.filter = "blur(5px)"
    }
}

quoteInput.addEventListener('input', function () {

  // Remove hidden line breaks from contenteditable
  const inputText = quoteInput.textContent.replace(/\n/g, '');
  const arrayValue = inputText.split('');
  const arrayQuote = quoteDisplay.querySelectorAll('span');

  if (!timerStarted && inputText.length === 1) {
    startTimer();
    timerStarted = true;
  }

  let correct = true;

  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];

    if (character == null) {
      characterSpan.classList.remove('correct', 'incorrect', 'corrected');
      correct = false;
    } 
    else if (character === characterSpan.textContent) {

      if (characterSpan.dataset.wasIncorrect === "true") {
        characterSpan.classList.remove('incorrect');
        characterSpan.classList.add('corrected');
      } else {
        characterSpan.classList.add('correct');
        characterSpan.classList.remove('incorrect');
      }

    } 
    else {
      characterSpan.classList.add('incorrect');
      characterSpan.classList.remove('correct', 'corrected');
      characterSpan.dataset.wasIncorrect = "true";
      correct = false;
    }
  });

  if (correct && quoteDisplay.textContent.trim() !== 'This is your typing quote right here.'  && inputText.length >= arrayQuote.length) {
    clearInterval(timerInterval);
    timerStarted = false;
    resulteScrean()
  } 
    
});

updateRefreshButton();