import { Home, RotateCcw, Trophy } from 'lucide-react'
import '../styles/GameOver.css'

function GameOver({ score, reason, onRestart, onExit }) {
  return (
    <section className="game-over-card">
      <div className="game-over-icon">
        <Trophy size={34} />
      </div>

      <p className="eyebrow">Session complete</p>
      <h1>Game Over</h1>

      <p className="final-score">
        Final score <strong>{score}</strong>
      </p>

      {reason && <p className="game-over-note">Reason: {reason}</p>}

      <div className="game-over-actions">
        <button className="primary-button" type="button" onClick={onRestart}>
          <RotateCcw size={18} />
          Play Again
        </button>

        <button className="secondary-button" type="button" onClick={onExit}>
          <Home size={18} />
          Back Home
        </button>
      </div>
    </section>
  )
}

export default GameOver