import { useState } from 'react'
import { Play, Trophy } from 'lucide-react'
import Leaderboard from './Leaderboard'
import '../styles/LandingPage.css'

function LandingPage({ onStartGame }) {
  const [playerName, setPlayerName] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const name = playerName.trim()
    onStartGame(name || 'Guest')
  }

  return (
    <main className="page landing-page">
      <section className="landing-shell">
        <div className="hero-panel">
          <div className="landing-logo">
            <Trophy size={30} />
          </div>

          <p className="eyebrow">Technical Assessment</p>
          <h1>Hand Betting Game</h1>

          <p className="hero-text">
            Predict whether the next Mahjong hand total will be higher or lower.
            Build your score before a special tile reaches its limit.
          </p>

          <form className="player-form" onSubmit={handleSubmit}>
            <label htmlFor="playerName">Player name</label>

            <div className="form-row">
              <input
                id="playerName"
                value={playerName}
                onChange={(event) => setPlayerName(event.target.value)}
                placeholder="Enter your name"
                autoComplete="off"
              />

              <button className="primary-button" type="submit">
                <Play size={18} />
                Start Game
              </button>
            </div>
          </form>
        </div>

        <Leaderboard />
      </section>
    </main>
  )
}

export default LandingPage