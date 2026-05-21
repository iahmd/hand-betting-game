import { X } from 'lucide-react'
import '../styles/GameGuideModal.css'

function GameGuideModal({ type, onClose }) {
  if (!type) {
    return null
  }

  const isRules = type === 'rules'

  return (
    <div className="modal-backdrop">
      <section className="guide-modal">
        <button className="modal-close" type="button" onClick={onClose}>
          <X size={20} />
        </button>

        <p className="modal-label">{isRules ? 'Game Rules' : 'How to Play'}</p>

        <h2>{isRules ? 'Hand Betting Rules' : 'How the Game Works'}</h2>

        {isRules ? (
          <div className="modal-content">
            <p>Number tiles use their face value.</p>
            <p>Dragon and Wind tiles start at value 5.</p>
            <p>Special tiles increase by 1 when they appear in a winning hand.</p>
            <p>Special tiles decrease by 1 when they appear in a losing hand.</p>
            <p>The game ends when any special tile reaches 0 or 10.</p>
            <p>The game also ends when the draw pile is refreshed for the 3rd time.</p>
          </div>
        ) : (
          <div className="modal-content">
            <p>Look at the current hand total.</p>
            <p>Choose Bet Higher if you think the next hand total will be higher.</p>
            <p>Choose Bet Lower if you think the next hand total will be lower.</p>
            <p>After each bet, the next hand becomes the current hand.</p>
            <p>Your round history and score update after every bet.</p>
          </div>
        )}
      </section>
    </div>
  )
}

export default GameGuideModal