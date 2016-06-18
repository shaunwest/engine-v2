
// arrays are mutable, sort of
const makeArray = arr => ({
  get: index => arr[index],
  find: fn => {
    for (let i = 0; i < arr.length; i++) {
      if (fn(arr[i])) {
        return arr[i];
      }
    }
  }
});

const makeResultObject = obj => {
  const usedKeys = [];
  return {
    get: key => obj[key],
    set: function (key, value) {

    },
    add: function (key, value) {
      if (usedKeys.includes(key)) {
        throw 'KEY ERRRORR!!!';
      }
      obj[key] = value;
      usedKeys.push(key);
      return this;
    }
  };
};

const make = entity => {
  if (Array.isArray(entity)) {
    const result = [];

    for (let i = 0; i < entity.length; i++) {
      result[i] = make(entity[i]);
    }

    return makeArray(result);
  } else if (typeof entity == 'object') {
    const result = {};

    for (const key in entity) {
      if (entity.hasOwnProperty(key)) {
        result[key] = make(entity[key]);
      }
    }

    return makeResultObject(result);
  } else {
    //return entity;
    return makeResultObject({});
  }
}

export default (obj) => {
  return make(obj);
}
