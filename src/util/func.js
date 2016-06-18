
export const forEach = (collection, fn) => {
  if (!collection || typeof collection != 'object') return;
  if (!Array.isArray(collection)) {
    const keys = Object.keys(collection); // TODO: no good, need to use pooling
    for (const key of keys) {
      if (collection.hasOwnProperty(key)) {
        fn(collection[key], key);
      }
    }
  } else {
    for (let i = 0; i < collection.length; i++) {
      fn(collection[i], i);
    }
  }
}

export const map = (fn, collection) => {
  const results = [];

  for (let i = 0; i < collection.length; i++) {
    results.push(fn(collection[i], i));
  }

  return results;
}

export const flatMap = (fn, collection) => {
  const results = [];

  for (let i = 0; i < collection.length; i++) {
    const result = fn(collection[i], i);

    for (let j = 0; j < result.length; j++) {
      results.push(result[j]);
    }
  }

  return results;
}

export const filter = (fn, collection) => {
  const results = [];

  for (let i = 0; i < collection.length; i++) {
    if (fn(collection[i], i)) {
      results.push(collection[i]);
    }
  }

  return results;
}

export const switchCase = (val, ...args) => {
  for (let i = 0; i < args.length; i+=2) {
    if (val === args[i]) {
      args[i+1]();
    }
  } 
}

export const sequence = (collection, ...fns) => {
  for (let fn of fns) {
    collection = fn(collection);
  }
  return collection;
}

export const range = (start, end, handler) => {
  const result = [];
  if (start <= end) {
    for (let i = start; i <= end; i++) {
      result.push(handler(i));
    }
  } else {
    for (let i = start; i >= end; i--) {
      result.push(handler(i));
    }
  }
  
  return result;
}

// Promise-based asynchronous reduce
export const asyncReduce = (collection, mapFn, acc) => {
  const keys = Object.keys(collection);
  let count = keys.length;

  return new Promise(resolve => 
    keys.map(key =>
      mapFn(acc, collection[key], key, (newAcc) => {
        acc = newAcc;
        if (--count === 0) {
          resolve(acc);
        }
      })));
}
