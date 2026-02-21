import { timer } from "./dom";

let startTime: Date;
let timerInterval: number;

export function startTimer() {
  if (!timer) return;

  timer.textContent = "0";
  startTime = new Date();

  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    if (!timer || !startTime) return;

    timer.textContent = Math.floor(
      (new Date().getTime() - startTime.getTime()) / 1000
    ).toString();
  }, 1000);
}

export function stopTimer() {
  clearInterval(timerInterval);
}

export function getTotalTime(): number {
  if (!timer) return 0;
  return parseInt(timer.textContent || "0");
}