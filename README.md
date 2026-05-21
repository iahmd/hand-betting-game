# Hand Betting Game

A Mahjong tile betting game built for a technical assessment.

## Live Demo

https://iahmd.github.io/hand-betting-game/

## Screenshots

| Landing Page | Gameplay |
|---|---|
| <img width="420" alt="Landing Page" src="https://github.com/user-attachments/assets/c0d7efa0-6ec5-4b43-9231-3379f2f9b663" /> | <img width="420" alt="Gameplay" src="https://github.com/user-attachments/assets/397f444e-7215-4f8a-9972-2c05265b81c2" /> |

## Overview

| Features | Tech Stack | Setup |
|---|---|---|
| New game<br>Top 5 leaderboard<br>Bet Higher / Lower<br>Mahjong tile display<br>Current hand total<br>Previous hand history<br>Dynamic Dragon/Wind values<br>Draw pile + discard pile count<br>Game over summary | React<br>Vite<br>JavaScript<br>CSS<br>GitHub Pages | `npm install`<br>`npm run dev`<br>`npm run build`<br>`npm run deploy` |

## Game Rules

| Area | Rule |
|---|---|
| Goal | Predict if the next hand total will be higher or lower |
| Number tiles | Value equals the face value |
| Dragon/Wind tiles | Start at value 5 |
| Winning hand | Special tiles in the hand increase by 1 |
| Losing hand | Special tiles in the hand decrease by 1 |
| Reshuffle | When draw pile is low, fresh deck + discard pile are shuffled |
| Game over | Any special tile reaches 0 or 10 |
| Game over | Draw pile runs out for the 3rd time |

## Project Structure

```txt
hand-betting-game/
  public/
  src/
    components/
      GameGuideModal.jsx
      GameOver.jsx
      GamePage.jsx
      GameToolbar.jsx
      Hand.jsx
      HistoryPanel.jsx
      LandingPage.jsx
      Leaderboard.jsx
      SpecialValuesPanel.jsx
      Tile.jsx
    data/
      tileSet.js
    game/
      createDeck.js
      gameReducer.js
      leaderboard.js
      scoring.js
      shuffle.js
    styles/
      GameGuideModal.css
      GameOver.css
      GamePage.css
      GameToolbar.css
      Hand.css
      HistoryPanel.css
      LandingPage.css
      Leaderboard.css
      SpecialValuesPanel.css
      Tile.css
    App.jsx
    main.jsx
```

## Architecture

| Area | Location |
|---|---|
| UI components | `src/components` |
| Game logic | `src/game` |
| Tile data | `src/data` |
| Styles | `src/styles` |

Game logic is separated from UI so the project is easy to extend.

## AI Usage

AI was used for planning, debugging, and review support. Final code and implementation decisions were reviewed and customized manually.