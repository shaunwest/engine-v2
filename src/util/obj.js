import { getObject } from './pool.js'; 

// Shallow clone an object
export const clone = obj => Object.assign({}, obj);

//export const clone = obj => Object.assign(getObject(), obj); 

// Deep clone an object or array
export const deepClone = entity => {
  if (Array.isArray(entity)) {
    const result = [];
    for (let i = 0; i < result.length; i++) {
      result[i] = deepClone(entity[i]);
    }
    return result;
  } else if (typeof entity == 'object') {
    const result = {};
    for (const key in entity) {
      if (entity.hasOwnProperty(key)) {
        result[key] = deepClone(entity[key]); 
      }
    }
    return result;
  } else {
    return entity;
  }
}

// Shallow merge two objects, returning a new object
export const merge = (toObj, fromObj) => Object.assign({}, toObj, fromObj);

// Clear an object's properties (or array's values)
export const clear = (obj) => {
  if (!obj) return null;
  if (Array.isArray(obj)) {
    obj.length = 0;
  }
  else {  
    for(const prop in obj) delete obj[prop];
  }
  return obj;
}

// Fill an array with values returned by fn
export const initArray = (len, fn) => {
  const arr = [];
  for(let i = 0; i < len; i++) {
    arr[i] = fn(i);
  }
  return arr;
};
