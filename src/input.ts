import { quoteInput, quoteDisplay } from "./dom";
import { startTimer, stopTimer } from "./timer";
import { showResults } from "./results";

let timerStarted = false;

export function setupTyping() {
  if (!quoteInput) return;

  quoteInput.addEventListener("input", () => {
    if (!quoteInput) return;
    const inputText = quoteInput.textContent?.replace(/\n/g, "") || "";
    const arrayValue = inputText.split("");

    if (!quoteDisplay) return;
    const arrayQuote = quoteDisplay.querySelectorAll("span");

    if (!timerStarted && inputText.length === 1) {
      startTimer();
      timerStarted = true;
    }

    arrayQuote.forEach((characterSpan, index) => {
      const character = arrayValue[index];

      if (character == null) {
        characterSpan.classList.remove("correct", "incorrect", "corrected");
        return;
      }

      if (character === characterSpan.textContent) {
        if (characterSpan.dataset.wasIncorrect === "true") {
          characterSpan.classList.remove("incorrect");
          characterSpan.classList.add("corrected");
        } else {
          characterSpan.classList.add("correct");
          characterSpan.classList.remove("incorrect");
        }
      } else {
        characterSpan.classList.add("incorrect");
        characterSpan.classList.remove("correct", "corrected");
        characterSpan.dataset.wasIncorrect = "true";
      }
    });

    if (inputText.length === arrayQuote.length) {
      stopTimer();
      timerStarted = false;
      showResults();
    }
  });
}