import { createTimer, getInitialTimerState } from './timer.js';

const _objectPool = [];

export const getObject = () => {
  return _objectPool.pop() || {};
}

export const loop = (update, action) => {
  const timerState = getInitialTimerState();
  const timer = createTimer(timerState);

  timer(frameCount => {
    action = update(action, frameCount);
    return !action;
  });
  
  return timerState;
}

export const Msg = (...args) => args.reverse();

export const Action = (msg, model) => {
  const obj = getObject();
  obj['msg'] = msg; //Array.isArray(msg) ? msg : [msg]; // pool
  obj['model'] = model;
  return obj;
}

export const modify = (obj, key, value) => {
  const newObj = poolClone(obj);
  newObj[key] = value;
  return newObj;
}

export const prop = (obj, key, value) => {
  obj[key] = value;
  return obj;
}

export const poolClone = obj => {
  const newObj = getObject();
  _objectPool.push(obj);
  return Object.assign(newObj, obj);
}
