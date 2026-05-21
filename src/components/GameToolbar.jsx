import { HelpCircle, Info, Maximize, RotateCcw } from 'lucide-react'
import '../styles/GameToolbar.css'

function GameToolbar({ onRestart, onOpenGuide }) {
  function openFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      return
    }

    document.exitFullscreen()
  }

  return (
    <nav className="game-toolbar">
      <button type="button" onClick={() => onOpenGuide('rules')}>
        <Info size={22} />
        Rules
      </button>

      <button type="button" onClick={() => onOpenGuide('how-to-play')}>
        <HelpCircle size={22} />
        How to Play
      </button>

      <button type="button" onClick={openFullScreen}>
        <Maximize size={22} />
        Full Screen
      </button>

      <button type="button" onClick={onRestart}>
        <RotateCcw size={22} />
        Restart
      </button>
    </nav>
  )
}

export default GameToolbar