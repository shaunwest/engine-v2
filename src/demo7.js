import { getElementById } from './demo-helpers';
import { createInput, getInitialInputState } from './util/input';
import { createTimer, getInitialTimerState } from './util/timer';

const canvas = getElementById('input');
const input = createInput(getInitialInputState(), canvas);
const timer = createTimer(getInitialTimerState());

timer((frameCount, fpsDeviation) => {
  const _inputState = input();
  if (_inputState.isPressed) {
    console.log('mouse pressed');
  }

  if (_inputState.keysPressed[65]) {
    console.log(`'a' key pressed`);
  }
});
