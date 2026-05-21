const specialTileNames = {
  'dragon-red': 'Red Dragon',
  'dragon-green': 'Green Dragon',
  'dragon-white': 'White Dragon',
  'wind-east': 'East Wind',
  'wind-south': 'South Wind',
  'wind-west': 'West Wind',
  'wind-north': 'North Wind',
}

export function getTileValue(tile, specialTileValues) {
  if (tile.type === 'number') {
    return tile.faceValue
  }

  return specialTileValues[tile.key] ?? 5
}

export function getHandTotal(hand, specialTileValues) {
  return hand.reduce((total, tile) => {
    return total + getTileValue(tile, specialTileValues)
  }, 0)
}

export function updateSpecialValues(hand, specialTileValues, didWin) {
  const nextValues = { ...specialTileValues }
  const change = didWin ? 1 : -1

  hand.forEach((tile) => {
    if (tile.type !== 'special') {
      return
    }

    nextValues[tile.key] = (nextValues[tile.key] ?? 5) + change
  })

  return nextValues
}

export function getCriticalSpecialTile(specialTileValues) {
  for (const [key, value] of Object.entries(specialTileValues)) {
    if (value <= 0 || value >= 10) {
      return {
        key,
        value,
        label: specialTileNames[key],
      }
    }
  }

  return null
}