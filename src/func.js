
export const forEach = (collection, fn) => {
  if (!collection || typeof collection != 'object') return;
  if (!Array.isArray(collection)) {
    const keys = Object.keys(collection); // TODO: use pooling
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
