import fs from 'fs';
import jsdom from 'jsdom-global';
import { assert } from 'chai';
import { createGameImage, createGameImageFromConfig, 
  createGameImageSet, setTestMode } from '../src/game-image/game-image.js';

const getImage = path => {
  const png = fs.readFileSync(path);
  const image = new Image();
  image.src = png;
  return image;
}

describe('gameImage', () => {
  const image = getImage(__dirname + "/../build/assets/smb-tiles.png");
  const conf = {
    "brick": {
      "description": "Brick Game Image",
      "src": {
        "url": "/assets/smb-tiles.png",
        "image": image
      },
      "width": 16,
      "height": 16,
      "frameSet": {
        "default": { "x": 0, "y": 0 },
        "cycle": { "xRange": 3, "x": 16, "y": 0 }
      }
    },
    "question": {
      "description": "Question",
      "src": {
        "url": "/assets/smb-tiles.png",
        "image": image
      },
      "width": 16,
      "height": 16,
      "frameSet": {
        "default": { "xRange": 4, "x": 0, "y": 16 }
      }
    } 
  }

  setTestMode(true); 

  describe('createGameImage', () => {
    let gameImage, frame;

    before(() => {
      const brick = conf.brick;
      gameImage = createGameImage(brick.src.image, brick.width, brick.height, brick.frameSet);
      frame = gameImage('cycle', 1);
    });

    it('should return a gameImage', () => {
      assert.isDefined(gameImage, 'No value returned');
      assert.isFunction(gameImage, 'Not a function');
    });

    it('should return a frame as a canvas', () => {
      assert.isDefined(frame, 'No value returned');
      assert.instanceOf(frame, HTMLCanvasElement, 'Not a canvas');
    });
  });

  describe('createGameImageFromConfig', () => {
    let gameImage, frame;

    before(() => {
      gameImage = createGameImageFromConfig(conf.question);
      frame = gameImage('default', 0);
    });

    it('should return a gameImage', () => {
      assert.isDefined(gameImage, 'No value returned');
      assert.isFunction(gameImage, 'Not a function');
    });

    it('should return a frame as a canvas', () => {
      assert.isDefined(frame, 'No value returned');
      assert.instanceOf(frame, HTMLCanvasElement, 'Not a canvas');
    });
  });

  describe('createGameImageSet', () => {
    let gameImageSet, gameImage;

    before(() => {
      gameImageSet = createGameImageSet(conf);
      gameImage = gameImageSet('brick');
    });

    it('should return a gameImageSet', () => {
      assert.isDefined(gameImageSet, 'No value returned');
      assert.isFunction(gameImageSet, 'Not a function');
    });

    it('should return a gameImage', () => {
      assert.isDefined(gameImage, 'No value returned');
      assert.isFunction(gameImage, 'Not a function');
    });
  });
});
