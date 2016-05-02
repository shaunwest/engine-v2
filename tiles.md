Tiles
=====

tileMap
-------
A mapping of indexes to gameAnimations

    [
      "brickAnimation",
      "blockAnimation"
    ]

tileSet
-------
Row length represents the width of the layout. Height is implied.

    {
      grid: [0, 1, 2, 0, 1, 2],
      rowLength: 3,
      tileMap: 'fooTileMap'
    }

sliceRange
----------

    const tileClipRange = { x: 0, y: 0, width: 2, height: 2 };
    const clippedTiles = sliceRange(tileSet, tileClipRange);
