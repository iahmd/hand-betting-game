import { useState } from 'react'
import LandingPage from './components/LandingPage'
import GamePage from './components/GamePage'
import './App.css'

function App() {
  const [gameSession, setGameSession] = useState(null)

  function startGame(playerName) {
    setGameSession({ playerName })
  }

  function exitGame() {
    setGameSession(null)
  }

  return (
    <>
      {!gameSession && <LandingPage onStartGame={startGame} />}
      {gameSession && (
        <GamePage playerName={gameSession.playerName} onExitGame={exitGame} />
      )}
    </>
  )
}

export default App