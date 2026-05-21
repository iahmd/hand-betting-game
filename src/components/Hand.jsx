import Tile from './Tile'
import '../styles/Hand.css'

function Hand({ hand, specialTileValues }) {
  return (
    <div className="hand-grid">
      {hand.map((tile) => (
        <Tile
          key={tile.id}
          tile={tile}
          specialTileValues={specialTileValues}
        />
      ))}
    </div>
  )
}

export default Hand