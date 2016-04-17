LEXICON
=======

gameImage
---------
Returns the raw frame sequences as arrays

    // Image, Int, Int, Object -> gameImage
    const gameImage = createGameImage(tileSheet, width, height, frameSetConfig);

    // String, Int -> Canvas
    gameImage('cycle', 0);    // returns first frame in cycle
    gameImage('default', 1);  // returns second frame in default

gameImageSetConfig
------------------

    {
      "marioGameImage": {
        "description": "mario game image",
        "src": "mario-spritesheet.png",
        "width": 32,
        "height": 32,
        "frameSet": {
          "default": { "x": 0, "y": 0, "xRange": 3 }
        }
      },
      "brickGameImage": {
        "description": "brick game image",
        "src": "smb-tilesheet.png",
        "width": 16,
        "height": 16,
        "frameSet": {
          "default": { "x": 0, "y": 0 },
          "cycle": { "xRange": 3, "x": 16, "y": 0 }
        }
      }
    }

gameImageSet
------------

    const gameImageSet = createGameImageSet(gameImageSetConfig);

    // String, String, Int -> gameImage
    const gameImage = gameImageSet('brick', 'default', 0);  // the first frame of the default frames for 'brick' gameIamge
    const gameImageSetConfig = gameImageSet();              // full gameImageSetConfig

gameAnimation
-------------
Returns the current frame of a gameImage

    // gameImage, Int, Int, Int -> gameAnimation
    const gameAnimation = createWaitCycleAnimation(gameImage, animationFps, every, targetGameFps);

    // Int -> Canvas
    const frame = gameAnimation(frameCount);

gameAnimationSetConfig
----------------------

    {
      "brickAnimation": {
        "description": "brick animation",
        "gameImage": "brick",
        "type": "waitThenCycle",
        "frameSet": {
          "cycle": { "fps": 8, "every": 60 }
        }
      },
      "questionAnimation": {
        "description": "question animation",
        "gameImage": "question",
        "type": "basic",
        "frameSet": {
          "default": { "fps": 8 }
        }
      }
    }

gameAnimationSet
----------------
Returns a frame table for the given gameAnimationSet/gameImageSet combination

    // gameAnimationSetConfig, gameImageSet -> gameAnimationSet
    const gameAnimationSet = createGameAnimationSet(gameAnimationSetConfig, gameImageSet);

    // Int -> [String] 
    const frameTable = createFrameTable(gameAnimationSet);

    // Int -> {Canvas}
    const currentFrames = frameTable(frameCount);

tileSetConfig
-------------
A maping of animations to indexes

    [
      "brickAnimation",
      "blockAnimation"
    ]

fixedLayout2dConfig
-------------------
Row length represents the width of the layout. Height is implied.

    {
      data: [0, 1, 2, 0, 1, 2],
      rowLength: 3,
      tileSet: 'fooTileSet'
    }

fixedLayout2d
-------------
NOTE: layouts must be mutable for performance reasons

    // [Int], Int, [String] -> fixedLayout2d
    const fixedLayout2d = createFixedLayout2d(layout, rowLength, tileSetConfig);

    // Int, Int -> *
    const cell = fixedLayout2d(0, 1); // returns value from tileSetConfig that corresponds to row 0, column 1

renderFixed2d
---------------------
Draws a tile onto a portion of the main rendering canvas.

    const currentFrames = frameTable(frameCount);

    // Canvas -> renderFixed2d
    const renderFixed2d = createFixed2dRenderer(canvas);

    // Int, Int, Int, [String] -> undefined
    renderFixed2d(frameId, x, y, currentFrames);

spriteSetConfig
---------------
    {
      {
        "description": "mario sprite",
        "gameImage": "marioGameImage",
        "spawn": {
          "x": 100,
          "y": 150
        },
        "ai": {
          "type": "basic" 
        },
        "bounds": {
          "left": "5",
          "top": "10",
          "right": "5",
          "bottom": 0
        },
        "physics": {
          "maxVelocity": 10,
          "acceleration": 5
        }
      }
    }

freeLayout2dConfig
------------------

{
  data: [{ id: 0, x: 10, y: 10}, { id: 1, x: 50, y: 75 }],
  spriteSet: 'foobarSprites'
}

freeLayout2d
-------------
NOTE: layouts must be mutable for performance reasons

    // [Object], Int -> freeLayout2d
    const freeLayout2d = createFreeLayout2d(layout, cellSize);

    // Int, Int -> [Object]
    const sprites = freeLayout2d(0, 1);

renderFree2d
------------

Draws a tile onto a portion of the main rendering canvas.

    const currentFrames = frameTable(frameCount);

    // Canvas -> renderFixed2d
    const renderFixed2d = createFixed2dRenderer(canvas);

    // Canvas, Int, Int, [String] -> undefined
    renderFixed2d(frameId, x, y, currentFrames);

