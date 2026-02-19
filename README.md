# TypeSwift – Typing Engine (Foundation Build)

> The first step toward building **TypeSwift** — a modern, competitive typing platform focused on performance, precision, and clean UX.

🌐 **Live Demo:**
👉 [https://hddgpp.github.io/Typing-eng/](https://hddgpp.github.io/Typing-eng/)

---

## 📖 Overview

This project is the foundational typing engine that powers the future **TypeSwift** platform.

It implements:

* Real-time character comparison
* Persistent correction tracking
* Accurate typing metrics (WPM, Accuracy, Consistency)
* A weighted performance scoring system
* Result modal with restart flow
* Clean UI with state-driven behavior

This version focuses on building a **robust engine architecture** before expanding into full product features.

<img width="1919" height="880" alt="image" src="https://github.com/user-attachments/assets/4f044230-7ff3-432b-bf6f-4c254b1acd0a" />


---

## 🎯 Purpose

This project serves as:

* The core typing logic prototype for TypeSwift
* A deep dive into DOM state management
* A practice project for building real-time interactive applications
* A performance-focused UI system using vanilla JavaScript

It was intentionally built without frameworks to fully understand:

* Event-driven architecture
* State control
* Character-level diffing
* Performance metric calculations

---

## 🧠 Core Features

### 1️ Character-Level Typing Engine

Each quote is split into individual `<span>` elements.

```js
function characterSplit(text) {
  text.split('').forEach(character => {
    const span = document.createElement('span');
    span.textContent = character;
    quoteDisplay.appendChild(span);
    span.dataset.wasIncorrect = "false";
  });
}
```
This allows:

* Per-character validation
* Independent state tracking
* Persistent correction detection

Each character remembers whether it was ever incorrect using `dataset.wasIncorrect`.

---

### 2️ Persistent Correction Tracking

When a character is mistyped:

* It becomes `.incorrect`
* Its dataset flag becomes `"true"`

If later corrected:

* It becomes `.corrected`
* It keeps its mistake history

This prevents visual state resets and allows tracking **consistency**.

---

### 3️ Timer System

The timer starts only when the user types the first character:

```js
if (!timerStarted && inputText.length === 1) {
  startTimer();
}
```

It uses `setInterval` and calculates total time in seconds.

The test ends when:

```js
inputText.length === arrayQuote.length
```

This ensures completion is based on input length.

---

### 4️ Metrics Calculation

When the test ends, the result modal calculates:

<img width="1919" height="871" alt="image" src="https://github.com/user-attachments/assets/7ae755bb-2210-41d5-b74f-434d43e12451" />


#### 🕒 Time

Total seconds from timer.

#### ⚡ WPM (Words Per Minute)

Standard formula:

```
WPM = (correct characters / 5) / minutes
```

Why divide by 5?
Because typing standards define 1 word = 5 characters.

---

#### 🎯 Accuracy

```
Accuracy = (correct characters / total characters) * 100
```

Correct characters include:

* `.correct`
* `.corrected`

---

#### 📉 Consistency

Consistency penalizes corrected mistakes:

```
consistency = accuracy - (correctedChars / totalChars) * 100
```

This rewards clean typing over fixing errors.

---

#### 🏆 Overall Score (Out of 100)

Weighted formula:

```js
score = Math.round(
  (wpm / 80 * 40) +
  (accuracy * 0.4) +
  (consistency * 0.2)
);
```

Breakdown:

* 40% Speed
* 40% Accuracy
* 20% Consistency

Speed is normalized against 80 WPM as a high-performance baseline.

This creates a balanced performance metric.

---

### 5️ Result Modal System

When finished:

* Main content is blurred
* Pointer events are disabled
* Input is locked
* Result modal appears centered

Restart restores state cleanly:

```js
restartBtn.addEventListener('click', () => {
  resultModal.classList.add('hidden');
  main.style.filter = "none";
  main.style.pointerEvents = "auto";
  quoteInput.setAttribute("contenteditable", "true");
  refreshBtn.click();
});
```

This ensures:

* Full state reset
* Clean user experience
* No ghost timers or residual state

---

<img width="1919" height="883" alt="image" src="https://github.com/user-attachments/assets/fda7030b-d641-4acb-9ca5-58b185d8e579" />


## 🎨 UI & Design

Design goals:

* Minimal
* Dark modern interface
* Performance-focused
* Clear feedback states

Color System:

* Blue → Timer
* Red → Incorrect
* Yellow → Corrected
* White → Correct

Fonts:

* Inter Tight (UI)
* JetBrains Mono (Typing Area)

---

## 🛠 Tech Stack

* HTML5
* CSS3
* Vanilla JavaScript (ES Modules)

No frameworks used intentionally.

---

## 🏗 Architecture Decisions

Why Vanilla JS?

To deeply understand:

* DOM manipulation
* Real-time event systems
* State-driven rendering
* UI control without abstractions

Why character-based comparison instead of string diff?

It enables:

* Visual per-letter feedback
* Accurate correction tracking
* Consistency calculation
* Future cursor highlighting support

---

## 🔮 Next Step: TypeScript Migration

This project will soon be rewritten in **TypeScript**.

Planned improvements:

* Strong typing for engine state
* Typed metric models
* Interface-driven architecture
* Modular engine separation
* Better scalability for future game modes

The goal is to evolve this engine into the full **TypeSwift** platform.

---

## 📚 What I Learned

* Real-time state management
* UI locking & modal layering
* Performance metric modeling
* Handling contenteditable safely
* Preventing state leakage between runs
* Designing weighted scoring systems

---

## 🏁 Status

✅ Typing engine complete
✅ Result system implemented
✅ Scoring system functional
✅ Restart loop stable
🔜 TypeScript migration
🔜 Full TypeSwift expansion

---

## 📌 Author

Built as part of my journey toward becoming a full-stack engineer.
This project represents the first foundational layer of a larger platform.
