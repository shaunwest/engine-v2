
const TARGET_FPS = 60;
const MILLISEC_PER_SEC = 1000;
const ONE_SECOND = 1;

const noop = () => {};
// FIXME: check for window vs global
const requestAnimationFrame = window.requestAnimationFrame || noop;
const cancelAnimationFrame = window.cancelAnimationFrame || noop;
const getDeltaTime = (now, lastUpdateTime) => (now - (lastUpdateTime || now)) / MILLISEC_PER_SEC;

const countdown = (timerState, deltaTime) => {
  timerState.countdown -= deltaTime;
  if (timerState.countdown <= 0) {
    timerState.countdown = ONE_SECOND;
    return true;
  } else {
    return false;
  }
}

export const getInitialTimerState = () =>
  Object.assign({}, {
    fps: 60,
    fpsDeviation: 1,
    sFrameCount: 0,
    aFrameCount: 0,
    vFrameCount: 0,
    paused: false,
    lastAnimationFrameId: null,
    last: null,
    countdown: ONE_SECOND,
    callbacks: []
  });

export const cancelAll = timerState => {
  if (timerState.lastAnimationFrameId) {
    cancelAnimationFrame(timerState.lastAnimationFrameId);
  }
}

export const createTimer = timerState => {
  const tick = () => {
    const now = Date.now();
    const deltaTime = getDeltaTime(now, timerState.last);

    if (countdown(timerState, deltaTime)) {
      timerState.fps = timerState.sFrameCount;
      timerState.sFrameCount = 0;
    } else {
      timerState.sFrameCount++;
    }

    if (timerState.fps < 1) {
      timerState.fps = 1;
    }

    if (!timerState.paused) {
      for (const cb of timerState.callbacks) {
        cb(timerState.vFrameCount, timerState.fpsDeviation, timerState.aFrameCount);
      }
    }

    timerState.fpsDeviation = Math.round(TARGET_FPS / timerState.fps);   
    timerState.aFrameCount++;
    timerState.vFrameCount += timerState.fpsDeviation;
    timerState.lastAnimationFrameId = requestAnimationFrame(tick);
    timerState.last = now;
  }

  tick();

  return cb => timerState.callbacks.push(cb);
}
