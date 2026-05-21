const STORAGE_KEY = 'hand-betting-leaderboard'

export function getLeaderboard() {
  const savedScores = localStorage.getItem(STORAGE_KEY)

  if (!savedScores) {
    return []
  }

  try {
    return JSON.parse(savedScores)
  } catch {
    return []
  }
}

export function saveScore(playerName, score) {
  const entry = {
    playerName: playerName || 'Guest',
    score,
    date: new Date().toLocaleDateString(),
  }

  const nextScores = [...getLeaderboard(), entry]
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextScores))

  return nextScores
}