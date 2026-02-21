import { quoteDisplay } from "./dom.js";
export function renderQuote(text) {
    if (!quoteDisplay)
        return;
    quoteDisplay.innerHTML = "";
    text.split("").forEach(character => {
        const span = document.createElement("span");
        span.textContent = character;
        span.dataset.wasIncorrect = "false";
        if (quoteDisplay) {
            quoteDisplay.appendChild(span);
        }
    });
}
//# sourceMappingURL=quote.js.map