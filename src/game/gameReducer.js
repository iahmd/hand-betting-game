import { createDeck, createSpecialTileValues } from './createDeck'
import { shuffle } from './shuffle'
import {
  getHandTotal,
  getCriticalSpecialTile,
  updateSpecialValues,
} from './scoring'

const HAND_SIZE = 5
const MAX_RESHUFFLES = 3
const HISTORY_LIMIT = 8

export function createInitialGame() {
  const deck = createDeck()
  const specialTileValues = createSpecialTileValues()
  const { hand, drawPile } = drawHand(deck)

  return {
    status: 'playing',
    score: 0,
    round: 1,
    currentHand: hand,
    currentTotal: getHandTotal(hand, specialTileValues),
    drawPile,
    discardPile: [],
    history: [],
    specialTileValues,
    reshuffleCount: 0,
    gameOverReason: '',
    message: 'Place your first bet.',
  }
}

export function gameReducer(state, action) {
  if (action.type === 'BET') {
    return playBet(state, action.bet)
  }

  if (action.type === 'RESTART') {
    return createInitialGame()
  }

  return state
}

function playBet(state, bet) {
  if (state.status !== 'playing') {
    return state
  }

  const deckState = getReadyDrawPile(state)
  const { hand: nextHand, drawPile } = drawHand(deckState.drawPile)

  const nextTotal = getHandTotal(nextHand, state.specialTileValues)
  const didWin = checkBetResult(bet, state.currentTotal, nextTotal)

  const nextSpecialValues = updateSpecialValues(
    nextHand,
    state.specialTileValues,
    didWin,
  )

  const criticalTile = getCriticalSpecialTile(nextSpecialValues)
  const hitRefreshLimit = deckState.reshuffleCount >= MAX_RESHUFFLES
  const isGameOver = Boolean(criticalTile) || hitRefreshLimit

  const historyEntry = {
    id: makeId(),
    round: state.round,
    previousHand: state.currentHand,
    previousTotal: state.currentTotal,
    nextHand,
    nextTotal,
    bet,
    didWin,
  }

  return {
    ...state,
    status: isGameOver ? 'game-over' : 'playing',
    score: didWin ? state.score + 1 : state.score,
    round: state.round + 1,
    currentHand: nextHand,
    currentTotal: nextTotal,
    drawPile,
    discardPile: [...deckState.discardPile, ...state.currentHand],
    history: [historyEntry, ...state.history].slice(0, HISTORY_LIMIT),
    specialTileValues: nextSpecialValues,
    reshuffleCount: deckState.reshuffleCount,
    gameOverReason: getGameOverReason(criticalTile, hitRefreshLimit),
    message: didWin
      ? 'Correct bet. Special tiles in this hand increased.'
      : 'Wrong bet. Special tiles in this hand decreased.',
  }
}

function checkBetResult(bet, currentTotal, nextTotal) {
  if (bet === 'higher') {
    return nextTotal > currentTotal
  }

  if (bet === 'lower') {
    return nextTotal < currentTotal
  }

  return false
}

function drawHand(drawPile) {
  return {
    hand: drawPile.slice(0, HAND_SIZE),
    drawPile: drawPile.slice(HAND_SIZE),
  }
}

function getReadyDrawPile(state) {
  if (state.drawPile.length >= HAND_SIZE) {
    return {
      drawPile: state.drawPile,
      discardPile: state.discardPile,
      reshuffleCount: state.reshuffleCount,
    }
  }

  return {
    drawPile: shuffle([...createDeck(), ...state.discardPile]),
    discardPile: [],
    reshuffleCount: state.reshuffleCount + 1,
  }
}

function getGameOverReason(criticalTile, hitRefreshLimit) {
  if (criticalTile) {
    return `${criticalTile.label} reached ${criticalTile.value}.`
  }

  if (hitRefreshLimit) {
    return 'The draw pile ran out for the 3rd time.'
  }

  return ''
}

function makeId() {
  if (crypto?.randomUUID) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random()}`
}