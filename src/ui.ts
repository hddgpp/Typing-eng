import quotes from "./data.js";
import { 
  title, 
  refreshBtn, 
  quoteInput, 
  restartBtn, 
  resultModal, 
  main 
} from "./dom";

import { renderQuote } from "./quote";

let isIntro = true;

function updateRefreshButton() {
  if (!refreshBtn) return;

  if (isIntro) {
    refreshBtn.innerHTML = `
      <span class="start-text">Press here to start →</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
        <path d="M187.2 100.9L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"/>
      </svg>
    `;
  } else {
    refreshBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
        <path d="M129.9 292.5C143.2 199.5 223.3 128 320 128..."/>
      </svg>
    `;
  }
}

function startNewTest() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  renderQuote(randomQuote);

  if (quoteInput) quoteInput.textContent = "";

  isIntro = false;
  updateRefreshButton();
}

function setupUI() {

  if (title) {
    title.addEventListener("click", () => location.reload());
  }

  if (refreshBtn) {
    refreshBtn.addEventListener("click", startNewTest);
  }

  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      if (!resultModal || !main || !quoteInput) return;

      resultModal.classList.add("hidden");

      main.style.filter = "none";
      main.style.pointerEvents = "auto";

      quoteInput.setAttribute("contenteditable", "true");

      startNewTest();
    });
  }

  updateRefreshButton();
}

export { setupUI };