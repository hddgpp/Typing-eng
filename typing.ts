import quotes from './data.js';

const title = document.querySelector<HTMLElement>('#title') 
const quoteDisplay = document.querySelector<HTMLElement>('#quoteDisplay') 
const refreshBtn = document.querySelector<HTMLElement>('#refreshBtn') 
const quoteInput = document.querySelector<HTMLElement>('#quoteInput') 
const timer = document.querySelector<HTMLElement>('#timer') 
const main = document.querySelector<HTMLElement>('#main') 

const resultModal = document.querySelector<HTMLElement>('#resultModal') 
const resultTime = document.querySelector<HTMLElement>('#resultTime') 
const resultTotalChars = document.querySelector<HTMLElement>('#resultTotalChars') 
const resultCorrectChars = document.querySelector<HTMLElement>('#resultCorrectChars') 
const resultWrongChars = document.querySelector<HTMLElement>('#resultWrongChars') 
const resultCorrectedChars = document.querySelector<HTMLElement>('#resultCorrectedChars') 
const resultWpm = document.querySelector<HTMLElement>('#resultWpm') 
const resultAccuracy = document.querySelector<HTMLElement>('#resultAccuracy') 
const resultConsistency = document.querySelector<HTMLElement>('#resultConsistency') 
const resultScore = document.querySelector<HTMLElement>('#resultScore') 
const restartBtn = document.querySelector<HTMLElement>('#restartBtn') 

let isIntro = true;

if (title) {
  title.addEventListener('click', () => {
    location.reload();
  });
}

function updateRefreshButton() {
  if (isIntro) {
    if(refreshBtn) {
      refreshBtn.innerHTML = `
      <span class="start-text">Press here to start →</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"/></svg>
    `;
    }
  } else {
    if(refreshBtn) {
      refreshBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
        <path d="M129.9 292.5C143.2 199.5 223.3 128 320 128C373 128 421 149.5 455.8 184.2C456 184.4 456.2 184.6 456.4 184.8L464 192L416.1 192C398.4 192 384.1 206.3 384.1 224C384.1 241.7 398.4 256 416.1 256L544.1 256C561.8 256 576.1 241.7 576.1 224L576.1 96C576.1 78.3 561.8 64 544.1 64C526.4 64 512.1 78.3 512.1 96L512.1 149.4L500.8 138.7C454.5 92.6 390.5 64 320 64C191 64 84.3 159.4 66.6 283.5C64.1 301 76.2 317.2 93.7 319.7C111.2 322.2 127.4 310 129.9 292.6zM573.4 356.5C575.9 339 563.7 322.8 546.3 320.3C528.9 317.8 512.6 330 510.1 347.4C496.8 440.4 416.7 511.9 320 511.9C267 511.9 219 490.4 184.2 455.7C184 455.5 183.8 455.3 183.6 455.1L176 447.9L223.9 447.9C241.6 447.9 255.9 433.6 255.9 415.9C255.9 398.2 241.6 383.9 223.9 383.9L96 384C87.5 384 79.3 387.4 73.3 393.5C67.3 399.6 63.9 407.7 64 416.3L65 543.3C65.1 561 79.6 575.2 97.3 575C115 574.8 129.2 560.4 129 542.7L128.6 491.2L139.3 501.3C185.6 547.4 249.5 576 320 576C449 576 555.7 480.6 573.4 356.5z"/>
      </svg>
    `;
    }
  }
}


function characterSplit(text: string) {
  text.split('').forEach(character => {
    const span = document.createElement('span');
    span.textContent = character;
    if(quoteDisplay) {
      quoteDisplay.appendChild(span);
    }
    span.dataset.wasIncorrect = "false";
  });
}

let startTime: Date;
let timerInterval: number;
let timerStarted = false;

function startTimer() {
  if (!timer) return;
  timer.textContent = '0';
  startTime = new Date();

  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    if (!timer || !startTime) return;
    timer.textContent = Math.floor((new Date().getTime() - startTime.getTime()) / 1000).toString();
  }, 1000);
}

if(refreshBtn) {
  refreshBtn.addEventListener('click', function () {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  if(quoteDisplay) {
    quoteDisplay.innerHTML = '';
  }
  characterSplit(randomQuote);

  if(quoteInput) {
    quoteInput.textContent = '';
  }

  clearInterval(timerInterval);
  if(timer) {
    timer.textContent = '0';
  }
  timerStarted = false;

  isIntro = false;

  updateRefreshButton();
});
}

function resulteScrean() {
  if (!isIntro) {

    if(main) {
      main.style.filter = "blur(5px)";
      main.style.pointerEvents = "none";
    }
    if(quoteInput) {
      quoteInput.blur();
      quoteInput.setAttribute("contenteditable", "false");
    }

    if(!quoteDisplay || !timer) return;

    const totalTime = parseInt(timer.textContent);
    const totalChars = quoteDisplay.querySelectorAll('span').length;

    const correctChars = quoteDisplay.querySelectorAll('.correct').length;
    const correctedChars = quoteDisplay.querySelectorAll('.corrected').length;
    const wrongChars = quoteDisplay.querySelectorAll('.incorrect').length;

    const totalCorrectIncludingFixed = correctChars + correctedChars;


    const minutes = totalTime / 60;

    const wpm = minutes > 0 
      ? Math.round((correctChars / 5) / minutes)
      : 0;

    const accuracy = Math.round((correctChars / totalChars) * 100);

    const consistency = Math.max(
      0,
      Math.round(accuracy - (correctedChars / totalChars) * 100)
    );

    const score = Math.min(
      100,
      Math.round(
        (wpm / 80 * 40) +
        (accuracy * 0.4) +
        (consistency * 0.2)
      )
    );

   if(!resultTime || !resultWpm || !resultAccuracy || !resultConsistency || !resultScore || !resultTotalChars ||
     !resultCorrectChars || !resultWrongChars || !resultCorrectedChars || !resultModal) return;


    resultTime.textContent = totalTime.toString();
    resultWpm.textContent = wpm.toString();
    resultAccuracy.textContent = accuracy + "%";
    resultConsistency.textContent = consistency + "%";
    resultScore.textContent = score.toString();
    resultTotalChars.textContent = totalChars.toString();
    resultCorrectChars.textContent = totalCorrectIncludingFixed.toString();
    resultWrongChars.textContent = wrongChars.toString();
    resultCorrectedChars.textContent = correctedChars.toString();


    resultModal.classList.remove('hidden');
  }
}

if(restartBtn) {
  restartBtn.addEventListener('click', () => {
    if(!resultModal ||! main || !quoteInput || !refreshBtn) return;
  resultModal.classList.add('hidden');

  main.style.filter = "none";
  main.style.pointerEvents = "auto";

  quoteInput.setAttribute("contenteditable", "true");

  refreshBtn.click();
});
}


if(quoteInput) {
  quoteInput.addEventListener('input', function () {

  // Remove hidden line breaks from contenteditable
  const inputText = quoteInput.textContent.replace(/\n/g, '');
  const arrayValue = inputText.split('');
  if(!quoteDisplay) return;
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
    return;
  }

  if (character === characterSpan.textContent) {

    if (characterSpan.dataset.wasIncorrect === "true") {
      characterSpan.classList.remove('incorrect');
      characterSpan.classList.add('corrected');
    } else {
      characterSpan.classList.add('correct');
      characterSpan.classList.remove('incorrect');
    }

  } else {
    characterSpan.classList.add('incorrect');
    characterSpan.classList.remove('correct', 'corrected');
    characterSpan.dataset.wasIncorrect = "true";
  }
});



  if (inputText.length === arrayQuote.length) {
    clearInterval(timerInterval);
    timerStarted = false;
    resulteScrean()
  } 
    
});
}

updateRefreshButton();