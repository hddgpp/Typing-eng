import { quoteDisplay } from "./dom";

export function renderQuote(text: string) {
  if (!quoteDisplay) return;

  quoteDisplay.innerHTML = "";

  text.split("").forEach(character => {
    const span = document.createElement("span");
    span.textContent = character;
    span.dataset.wasIncorrect = "false";
    if(quoteDisplay) {
        quoteDisplay.appendChild(span);
    }
  });
}