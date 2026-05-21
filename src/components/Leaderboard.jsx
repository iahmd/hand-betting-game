import { Trophy } from 'lucide-react'
import { getLeaderboard } from '../game/leaderboard'
import '../styles/Leaderboard.css'

function Leaderboard() {
  const scores = getLeaderboard().slice(0, 5)

  return (
    <section className="leaderboard-card">
      <div className="leaderboard-heading">
        <div className="leaderboard-icon">
          <Trophy size={24} />
        </div>

        <p className="eyebrow">Top 5 Scores</p>
        <h2>Leaderboard</h2>
      </div>

      {scores.length === 0 ? (
        <p className="empty-state">
          No scores yet. Finish a game and your result will appear here.
        </p>
      ) : (
        <ol className="score-list">
          {scores.map((item, index) => (
            <li key={`${item.playerName}-${item.score}-${item.date}-${index}`}>
              <span className="rank">#{index + 1}</span>

              <div className="score-player">
                <strong>{item.playerName || 'Guest'}</strong>
                <small>{item.date}</small>
              </div>

              <div className="score-value">
                <b>{item.score}</b>
                <small>pts</small>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}

export default Leaderboard