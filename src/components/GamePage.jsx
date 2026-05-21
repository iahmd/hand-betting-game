import { useEffect, useReducer, useState } from 'react'
import {
  ArrowDown,
  ArrowUp,
  Archive,
  CheckCircle2,
  Clock3,
  LogOut,
  Maximize,
  Menu,
  PackageCheck,
  RotateCcw,
  Trophy,
  XCircle,
} from 'lucide-react'

import GameOver from './GameOver'
import GameGuideModal from './GameGuideModal'
import Hand from './Hand'
import HistoryPanel from './HistoryPanel'
import SpecialValuesPanel from './SpecialValuesPanel'
import { createInitialGame, gameReducer } from '../game/gameReducer'
import { saveScore } from '../game/leaderboard'
import '../styles/GamePage.css'

function GamePage({ playerName, onExitGame }) {
  const [game, dispatch] = useReducer(gameReducer, null, createInitialGame)
  const [guideType, setGuideType] = useState(null)

  const lastRound = game.history[0]
  const lastBetLabel = lastRound?.bet === 'higher' ? 'Higher' : 'Lower'
  const scoreText = lastRound?.didWin ? '+1 score' : 'No score'

  useEffect(() => {
    if (game.status === 'game-over') {
      saveScore(playerName, game.score)
    }
  }, [game.status, game.score, playerName])

  function placeBet(bet) {
    dispatch({ type: 'BET', bet })
  }

  function restartGame() {
    dispatch({ type: 'RESTART' })
  }

  function openFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.()
      return
    }

    document.exitFullscreen?.()
  }

  if (game.status === 'game-over') {
    return (
      <main className="game-page centered-page">
        <GameOver
          score={game.score}
          reason={game.gameOverReason}
          onRestart={restartGame}
          onExit={onExitGame}
        />
      </main>
    )
  }

  return (
    <main className="game-page">
      <div className="game-shell">
        <header className="game-header">
          <div className="brand-row">
            <div className="app-logo">🀄</div>

            <div>
              <p className="page-kicker">Technical Assessment</p>
              <h1>Hand Betting Game</h1>
            </div>
          </div>

          <div className="header-actions">
            <button className="exit-button" type="button" onClick={onExitGame}>
              <LogOut size={18} />
              Exit Game
            </button>

            <button
              className="menu-button"
              type="button"
              aria-label="Open game guide"
              onClick={() => setGuideType('rules')}
            >
              <Menu size={26} />
            </button>
          </div>
        </header>

        <section className="game-status-bar">
          <article className="status-item">
            <span className="status-icon">
              <Trophy size={24} />
            </span>

            <div>
              <span>Score</span>
              <strong>{game.score}</strong>
            </div>
          </article>

          <article className="status-item">
            <span className="status-icon">
              <Clock3 size={24} />
            </span>

            <div>
              <span>Round</span>
              <strong>{game.round}</strong>
            </div>
          </article>

          <article className="status-item">
            <span className="status-icon">
              <PackageCheck size={24} />
            </span>

            <div>
              <span>Draw Pile</span>
              <strong>{game.drawPile.length}</strong>
            </div>
          </article>

          <article className="status-item">
            <span className="status-icon">
              <Archive size={24} />
            </span>

            <div>
              <span>Discard Pile</span>
              <strong>{game.discardPile.length}</strong>
            </div>
          </article>

          <article className="status-item">
            <span className="status-icon">
              <PackageCheck size={24} />
            </span>

            <div>
              <span>Tiles Left</span>
              <strong>{game.drawPile.length + game.discardPile.length}</strong>
            </div>
          </article>

          <div className="status-actions">
            <button type="button" onClick={restartGame}>
              <RotateCcw size={22} />
              Restart
            </button>

            <button type="button" onClick={openFullscreen}>
              <Maximize size={22} />
              Fullscreen
            </button>
          </div>
        </section>

        <section className="game-layout">
          <div className="main-card">
            <div className="round-heading">
              <div>
                <p>Current Hand</p>
                <span>Total Value</span>
                <h2>{game.currentTotal}</h2>
              </div>
            </div>

            {lastRound && (
              <div className={`result-banner ${lastRound.didWin ? 'result-good' : 'result-bad'}`}>
                <div className="result-left">
                  <div className="result-icon">
                    {lastRound.didWin ? <CheckCircle2 size={26} /> : <XCircle size={26} />}
                  </div>

                  <div>
                    <strong>
                      {lastRound.didWin ? 'Correct Prediction' : 'Wrong Prediction'}
                    </strong>

                    <p>
                      You chose <b>{lastBetLabel}</b>. Previous hand was{' '}
                      <b>{lastRound.previousTotal}</b> and the new hand is{' '}
                      <b>{lastRound.nextTotal}</b>.
                    </p>
                  </div>
                </div>

                <div className="result-summary">
                  <span>{lastRound.previousTotal}</span>
                  <b>→</b>
                  <span>{lastRound.nextTotal}</span>
                  <em>{scoreText}</em>
                </div>
              </div>
            )}

            <Hand hand={game.currentHand} specialTileValues={game.specialTileValues} />

            <div className="bet-card">
              <div>
                <h3>Predict the next hand total</h3>
                <p>
                  {lastRound
                    ? `Current total is ${game.currentTotal}. Choose if the next hand will be higher or lower.`
                    : 'Click Higher or Lower to predict the next hand total.'}
                </p>
              </div>

              <div className="bet-actions">
                <button
                  className="bet-button higher"
                  type="button"
                  onClick={() => placeBet('higher')}
                >
                  <ArrowUp size={24} />
                  Bet Higher
                </button>

                <button
                  className="bet-button lower"
                  type="button"
                  onClick={() => placeBet('lower')}
                >
                  <ArrowDown size={24} />
                  Bet Lower
                </button>
              </div>
            </div>
          </div>

          <HistoryPanel history={game.history} specialTileValues={game.specialTileValues} />
        </section>

        <SpecialValuesPanel values={game.specialTileValues} />

        <section className="rules-strip">
          <article>
            <div className="rules-icon">i</div>
            <div>
              <h3>Game Over Conditions</h3>
              <p>Any single tile value reaches 0 or 10.</p>
              <p>Draw pile runs out of tiles for the 3rd time.</p>
            </div>
          </article>

          <article>
            <div className="rules-icon">?</div>
            <div>
              <h3>How to Play</h3>
              <p>Bet Higher if you think the next hand total will go up.</p>
              <p>Bet Lower if you think the next hand total will go down.</p>
            </div>
          </article>

          <article>
            <div className="rules-icon">↻</div>
            <div>
              <h3>Reshuffle Rule</h3>
              <p>When draw pile is empty, discard pile is combined with a fresh deck and shuffled.</p>
            </div>
          </article>
        </section>
      </div>

      <GameGuideModal type={guideType} onClose={() => setGuideType(null)} />
    </main>
  )
}

export default GamePage