import { getTileValue } from '../game/scoring'
import '../styles/Tile.css'

function Tile({ tile, specialTileValues, small = false }) {
  const value = getTileValue(tile, specialTileValues)

  return (
    <article className={`tile ${small ? 'tile-small' : ''} tile-${tile.family}`}>
      <span className="tile-symbol">{tile.symbol}</span>

      {!small && (
        <>
          <strong>{tile.name}</strong>
          <small>Value: {value}</small>
        </>
      )}
    </article>
  )
}

export default Tile