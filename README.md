# Hand Betting Game

A web-based Mahjong tile betting game built for a technical assessment.

---

## Features

- Mahjong tile based betting gameplay
- Bet Higher / Bet Lower system
- Dynamic Dragon and Wind tile values
- Draw pile and discard pile tracking
- Automatic reshuffling system
- Top 5 leaderboard
- Game history tracking
- Final score and game over summary
- Responsive and polished UI

---

## Tech Stack

- React
- Vite
- JavaScript
- CSS

---

## Setup Instructions

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build production version:

```bash
npm run build
```

---

## Game Rules

- Predict whether the next hand total will be higher or lower.
- Number tiles use their face value.
- Dragon and Wind tiles start with value 5.
- Winning a round increases special tile values by 1.
- Losing a round decreases special tile values by 1.
- Game ends when:
  - Any special tile reaches 0 or 10
  - Draw pile runs out for the 3rd time

---

## Project Structure

```txt
src/
  components/   Reusable UI components
  data/         Mahjong tile data
  game/         Core game logic and reducer
  styles/       Component CSS files
```

---

## Architecture

The game logic is separated from UI components to keep the project scalable and easy to extend with future features.

---

## AI Usage

AI tools were used for planning, debugging assistance, and code review support. Final implementation and project customization were manually reviewed and adjusted.