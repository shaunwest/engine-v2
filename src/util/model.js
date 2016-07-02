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

export const Msg = (value, next) => ({
  value,
  next: typeof next !== 'undefined' ? Msg(next) : { value: '', next: '' } 
});

export const Action = (msg, nextOrModel, model) => {
  const obj = getObject();

  if (typeof nextOrModel === 'string') {
    obj['msg'] = Msg(msg, nextOrModel);
    obj['model'] = model;
  } else {
    obj['msg'] = Msg(msg);
    obj['model'] = nextOrModel;
  }

  return obj;
}

export const PropAction = (model, key, resultAction) => {
  return Action(resultAction.msg.value, prop(model, key, resultAction.model));
}

export const SubPropAction = (model, key, subKey, resultAction) => {
  return Action(resultAction.msg.value, subProp(model, key, subKey, resultAction.model));
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

export const subProp = (obj, key, subKey, value) => {
  obj[key][subKey] = value;
  return obj;
}

export const delta = (obj, key, amount) => {
  obj[key] += amount;
  return obj;
}

export const poolClone = obj => {
  const newObj = getObject();
  _objectPool.push(obj);
  return Object.assign(newObj, obj);
}
