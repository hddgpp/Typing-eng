import { main, quoteInput, quoteDisplay, resultModal, resultTime, resultWpm, resultAccuracy, resultConsistency, resultScore, resultTotalChars, resultCorrectChars, resultWrongChars, resultCorrectedChars } from "./dom.js";
import { getTotalTime } from "./timer.js";
export function showResults() {
    if (!quoteDisplay)
        return;
    const totalTime = getTotalTime();
    const totalChars = quoteDisplay.querySelectorAll("span").length;
    const correctChars = quoteDisplay.querySelectorAll(".correct").length;
    const correctedChars = quoteDisplay.querySelectorAll(".corrected").length;
    const wrongChars = quoteDisplay.querySelectorAll(".incorrect").length;
    const totalCorrectIncludingFixed = correctChars + correctedChars;
    const minutes = totalTime / 60;
    const wpm = minutes > 0 ? Math.round((correctChars / 5) / minutes) : 0;
    const accuracy = Math.round((correctChars / totalChars) * 100);
    const consistency = Math.max(0, Math.round(accuracy - (correctedChars / totalChars) * 100));
    const score = Math.min(100, Math.round((wpm / 80 * 40) +
        (accuracy * 0.4) +
        (consistency * 0.2)));
    if (!resultModal ||
        !resultTime ||
        !resultWpm ||
        !resultAccuracy ||
        !resultConsistency ||
        !resultScore ||
        !resultTotalChars ||
        !resultCorrectChars ||
        !resultWrongChars ||
        !resultCorrectedChars)
        return;
    resultTime.textContent = totalTime.toString();
    resultWpm.textContent = wpm.toString();
    resultAccuracy.textContent = accuracy + "%";
    resultConsistency.textContent = consistency + "%";
    resultScore.textContent = score.toString();
    resultTotalChars.textContent = totalChars.toString();
    resultCorrectChars.textContent = totalCorrectIncludingFixed.toString();
    resultWrongChars.textContent = wrongChars.toString();
    resultCorrectedChars.textContent = correctedChars.toString();
    if (main) {
        main.style.filter = "blur(5px)";
        main.style.pointerEvents = "none";
    }
    if (quoteInput) {
        quoteInput.setAttribute("contenteditable", "false");
    }
    resultModal.classList.remove("hidden");
}
//# sourceMappingURL=results.js.map