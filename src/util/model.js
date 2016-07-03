import { createTimer, getInitialTimerState } from './timer.js';

export const loop = (update, msg) => {
  const timerState = getInitialTimerState();
  const timer = createTimer(timerState);

  timer(frameCount => {
    msg = update(msg, frameCount);
    return !msg;
  });
  
  return timerState;
}

export const EmptyMsg = {
  value: undefined, next: undefined
};

export const Msg = value => {
  const msg = { value };
  return next => {
    msg.next = next || EmptyMsg;
    return msg;
  }
}

export const prop = (obj, key, value) => {
  obj[key] = value;
  return obj;
}

export const subProp = (obj, key, subKey, value) => {
  obj[key][subKey] = value;
  return obj;
}

export const delta = (obj, key, amount) => {
  obj[key] += amount;
  return obj;
}
