import { clear } from './obj.js';

export const _pool = {
  objects: [],
  objectPointer: 0,
  arrays: [],
  arrayPointer: 0
};

if (global) {
  global.pool = _pool;
} else {
  window.pool = _pool;
}

const push = (arr, value) => {
  arr.push(value);
  return value;
}

const addObject = (objects, obj = {}) => push(objects, obj);
const addArray = (arrays, arr = []) => push(arrays, arr);
const getObjectFromPool = pool => clear(pool.objects[pool.objectPointer]);
const getArrayFromPool = pool => clear(pool.arrays[pool.arrayPointer]);

export const releaseAll = () => {
  _pool.arrayPointer = 0;
  _pool.objectPointer = 0;
}

export const getObject = () => {
  const obj = getObjectFromPool(_pool) || addObject(_pool.objects);
  _pool.objectPointer++;
  return obj;
}

export const getArray = () => {
  const arr = getArrayFromPool(_pool) || addArray(_pool.arrays);
  _pool.arrayPointer++;
  return arr;
}
