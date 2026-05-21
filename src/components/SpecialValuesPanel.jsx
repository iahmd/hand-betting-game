import '../styles/SpecialValuesPanel.css'

const specialTiles = [
  ['dragon-red', '🀄', 'Red Dragon'],
  ['dragon-green', '發', 'Green Dragon'],
  ['dragon-white', '□', 'White Dragon'],
  ['wind-east', '東', 'East Wind'],
  ['wind-south', '南', 'South Wind'],
  ['wind-west', '西', 'West Wind'],
  ['wind-north', '北', 'North Wind'],
]

function SpecialValuesPanel({ values }) {
  return (
    <section className="special-values-panel">
      <h2>
        Tile Values <span>(Dynamic)</span>
      </h2>

      <div className="special-values-grid">
        {specialTiles.map(([key, symbol, label]) => (
          <article className="special-value-card" key={key}>
            <span className="special-symbol">{symbol}</span>

            <div>
              <p>{label}</p>
              <strong>{values[key]}</strong>
            </div>
          </article>
        ))}
      </div>

      <p className="special-note">
        Note: Non-number tiles increase by 1 when part of a winning hand, decrease by 1 when part of a losing hand.
      </p>
    </section>
  )
}

export default SpecialValuesPanel