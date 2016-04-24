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
    const gameImage = gameImageSet('brick');    // returns the 'brick' gameIamge
    const gameImageSetConfig = gameImageSet();  // full gameImageSetConfig

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
TODO: rename ot tileMapconfig?

A mapping of indexes to gameAnimations

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

range2d
-------
Simply iterates over a given 2d space. Used to render a subsection of a layout.

    const viewport = { x: 0, y: 0, width: 10, height: 10 };
    range2d(viewport, (col, row) => render2d(image, col * 16, row * 16));

render2d
--------
Draws an image onto a portion of the main rendering canvas.

    // Canvas -> render2d
    const render2d = create2dRenderer(canvas);

    // Canvas, Int, Int -> undefined
    render2d(frame, x, y);

spriteSetConfig
---------------
A mapping of indexes to gameImage and other config data

    {
      "mario": {
        "description": "mario sprite",
        "gameImage": "mario",
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

spriteLayout2dConfig
--------------------

    {
      data: [{ id: 0, x: 10, y: 10}, { id: 1, x: 50, y: 75 }],
      spriteSet: 'foobarSprites'
    }

spriteClassSet
--------------
TODO: actually, maybe game image set should be entirely decoupled here, so that
logic and rendering (game image stuff) are not connected...

    const spriteSet = createSpriteSet(spriteSetConfig, gameImageSet);
    const sprite = spriteSet('mario');

spriteLayout2d
--------------
A collection of sprite instances
Would this get passed into createSegments?

    const spriteLayout2d = createSpriteLayout2d(layout, spriteSetConfig);
    const sprite = spriteLayout2d(0);
    const sprites = spriteLayout2d(viewport);

segments
--------
A collection of entities divided into equal segments

    // [Object], Int, Int -> [Map] 
    const segments = createSegments(layout, rowLength, segmentSize);

    // [Map], Int, Int -> [Object]
    const sprites = getSegment(segments, col, row); // returns a segment with all sprites it contains
