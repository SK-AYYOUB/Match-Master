# 🧠 Match Master

**Match Master** is a fast, fun, and competitive card-matching memory game built using HTML, CSS, and JavaScript. Designed for both solo players and two-player mode, the game challenges memory, reflexes, and strategic thinking.

---

## 🎮 Gameplay Overview

In **Match Master**, players flip over two cards at a time to find matching pairs. Points are awarded for correct matches and deducted for incorrect ones, with a bonus system to reward consecutive successes.

You can play in:
- 🎮 **Single Player Mode** – test your memory and aim for the highest score.
- 👥 **Two Player Mode** – take turns and compete for the best score.

---

## 🧠 Scoring Rules

- ✅ Match two cards → **+2 points**
- ❌ Mismatch → **−1 point**

The player with the highest score at the end of the game wins!

---

## 🏆 Best Score System

The game stores the best score across all games using `localStorage`. After each game, the winner is compared with the stored best score. If the new score is higher, it updates the record and displays:

- 🥇 Best Player Name
- 🧮 Best Score Points

---

## ⚙️ Features

- 🌟 Dynamic card generation and shuffle on every game start
- 🔁 Full restart functionality
- 👤 Custom player name support
- 🧩 Animated card flip with matching logic
- 📊 Real-time scoring
- 🧼 Clean and responsive UI
- 💾 Persistent best score using browser storage

---

## 🧑‍💻 About the Creator

This game was created by **Zakarya Ayyoub Souiki** as a way to:
- Practice advanced JavaScript concepts like event handling and DOM manipulation
- Understand browser storage via `localStorage`
- Build an interactive, user-friendly game from scratch