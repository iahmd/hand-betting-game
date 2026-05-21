import { baseTiles } from '../data/tileSet'
import { shuffle } from './shuffle'

const COPIES_PER_TILE = 4

export function createDeck() {
  const deck = []

  baseTiles.forEach((tile) => {
    for (let copy = 1; copy <= COPIES_PER_TILE; copy += 1) {
      deck.push({
        ...tile,
        id: `${tile.key}-${copy}-${makeId()}`,
      })
    }
  })

  return shuffle(deck)
}

export function createSpecialTileValues() {
  return baseTiles.reduce((values, tile) => {
    if (tile.type === 'special') {
      values[tile.key] = 5
    }

    return values
  }, {})
}

function makeId() {
  if (crypto?.randomUUID) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random()}`
}