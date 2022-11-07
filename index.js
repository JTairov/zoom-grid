

function zoomTile( n, w, h ) {
  let tiles = []
  let columns = Math.ceil( Math.sqrt( n ) )
  let width = w / columns
  let rows = Math.ceil(n / columns)
  let height = h / Math.ceil( Math.sqrt( n ) )
  let tilesInTheFirstRow = n % columns
  if(tilesInTheFirstRow == 0) {
    tilesInTheFirstRow = columns
  }

  let xMultiplier = 0
  let yMultiplier = 0
  for ( let i = 0; i < n; i++ ) {
    let tile = {}
    tile.width = width
    tile.height = height


    if ( i < tilesInTheFirstRow ) {
      tile.x = (w - tilesInTheFirstRow * width) / 2 + width * i
    } else {
      tile.x = xMultiplier * width
      xMultiplier++
    }

    tile.y = (h - height * rows) / 2 + height * yMultiplier

    if (i == tilesInTheFirstRow - 1) {
      yMultiplier++
    } else if (xMultiplier == columns) {
      yMultiplier++
    }

    if ( xMultiplier == columns ) {
      xMultiplier = 0
    }

    tiles.push( tile )
  }
  return tiles

}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('container')

  let w = document.documentElement.clientWidth
  let h = document.documentElement.clientHeight
  let numOfTiles = prompt('Enter a num of tiles to render', 5)

  let zoomGrid = zoomTile(numOfTiles, w, h)
  for (let i = 0; i < zoomGrid.length; i++) {
    let tile = document.createElement('div')
    tile.classList.add('zoom-tile')
    tile.innerHTML = `${i + 1}`
    tile.style.top = `${zoomGrid[i].y}px`
    tile.style.left = `${zoomGrid[i].x}px`
    tile.style.width = `${zoomGrid[i].width}px`
    tile.style.height = `${zoomGrid[i].height}px`

    container.append(tile)
  }
})


