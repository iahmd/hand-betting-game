const characterSymbols = ['🀇', '🀈', '🀉', '🀊', '🀋', '🀌', '🀍', '🀎', '🀏']
const bambooSymbols = ['🀐', '🀑', '🀒', '🀓', '🀔', '🀕', '🀖', '🀗', '🀘']
const dotsSymbols = ['🀙', '🀚', '🀛', '🀜', '🀝', '🀞', '🀟', '🀠', '🀡']

export const baseTiles = [
  ...createNumberTiles('characters', 'Characters', characterSymbols),
  ...createNumberTiles('bamboo', 'Bamboo', bambooSymbols),
  ...createNumberTiles('dots', 'Dots', dotsSymbols),

  {
    key: 'dragon-red',
    name: 'Red Dragon',
    type: 'special',
    family: 'dragon',
    symbol: '🀄',
  },
  {
    key: 'dragon-green',
    name: 'Green Dragon',
    type: 'special',
    family: 'dragon',
    symbol: '🀅',
  },
  {
    key: 'dragon-white',
    name: 'White Dragon',
    type: 'special',
    family: 'dragon',
    symbol: '🀆',
  },

  {
    key: 'wind-east',
    name: 'East Wind',
    type: 'special',
    family: 'wind',
    symbol: '🀀',
  },
  {
    key: 'wind-south',
    name: 'South Wind',
    type: 'special',
    family: 'wind',
    symbol: '🀁',
  },
  {
    key: 'wind-west',
    name: 'West Wind',
    type: 'special',
    family: 'wind',
    symbol: '🀂',
  },
  {
    key: 'wind-north',
    name: 'North Wind',
    type: 'special',
    family: 'wind',
    symbol: '🀃',
  },
]

function createNumberTiles(family, label, symbols) {
  return symbols.map((symbol, index) => {
    const value = index + 1

    return {
      key: `${family}-${value}`,
      name: `${label} ${value}`,
      type: 'number',
      family,
      symbol,
      faceValue: value,
    }
  })
}