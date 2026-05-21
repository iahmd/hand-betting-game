import { ArrowDown, ArrowUp, Clock3 } from 'lucide-react'
import Tile from './Tile'
import '../styles/HistoryPanel.css'

function HistoryPanel({ history, specialTileValues }) {
  return (
    <aside className="history-panel">
      <div className="history-title">
        <div className="history-heading">
          <Clock3 size={26} />
          <h2>History</h2>
        </div>

        <span>{history.length}</span>
      </div>

      {history.length === 0 ? (
        <p className="empty-state">Each completed bet will appear here.</p>
      ) : (
        <div className="history-list">
          {history.map((round, index) => {
            const isHigher = round.bet === 'higher'
            const roundNumber = history.length - index

            return (
              <article className="history-item" key={round.id}>
                <div className="history-item-top">
                  <strong>Round {roundNumber}</strong>
                  <span>Total: {round.nextTotal}</span>
                </div>

                <div className="mini-tiles">
                  {round.nextHand.map((tile) => (
                    <Tile
                      key={tile.id}
                      tile={tile}
                      specialTileValues={specialTileValues}
                      small
                    />
                  ))}
                </div>

                <div className={`bet-pill ${isHigher ? 'bet-up' : 'bet-down'}`}>
                  {isHigher ? <ArrowUp size={15} /> : <ArrowDown size={15} />}
                  {isHigher ? 'Higher' : 'Lower'}
                </div>
              </article>
            )
          })}
        </div>
      )}
    </aside>
  )
}

export default HistoryPanel