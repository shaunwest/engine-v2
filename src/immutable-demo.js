import { clone } from './util/obj.js';
import { map } from './util/func.js';
import { modify, action, loop } from './util/model.js';

const model = {
  foo: 'bar',
  list: [
    { x: 0, y: 1 },
    { x: 2, y: 5 }
  ]
};

const fooAction = action('doFoo', model);

const update = (id, model) => {
  switch (id) {
    case 'doFoo':
      return action('doList', modify(model, 'foo', 'baz'));
    case 'doList':
      return action('show', modify(model, 'list', map(doList, model.list)));
    case 'show':
      return action('done', clone(model));
    default:
      return null;
  }
}

const doList = value => {
  if (value.x === 0) {
    return modify(value, 'x', 2);
  }
  return clone(value);
}

loop((action, frameCount) => {
  const newAction = update(action.id, action.model);
  console.log(newAction);
  return newAction;
}, fooAction);
