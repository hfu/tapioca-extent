const fs = require('fs')

// tile number to lng/lat
const ttl = (zxy) => {
  const n = Math.PI - 2 * Math.PI * zxy[2] / Math.pow(2, zxy[0])
  return [
    zxy[1] / Math.pow(2, zxy[0]) * 360 - 180,
    (180 / Math.PI * Math.atan(
      0.5 * (Math.exp(n) - Math.exp(-n))))
  ]
}

const [west, north] = ttl([6, 22, 24])
const [east, south] = ttl([6, 43, 40])

const f = {
  type: 'Feature',
  geometry: {
    type: 'LineString',
    coordinates: [
      [west, south],
      [east, south],
      [east, north],
      [west, north],
      [west, south]
    ]
  },
  properties: {}
}

fs.writeFileSync('extent.geojson', JSON.stringify(f, null, 2))
