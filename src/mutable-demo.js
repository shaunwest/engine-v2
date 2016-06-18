import { clone } from './util/obj.js';
import { map } from './util/func.js';
import { prop, Action, loop, Msg } from './util/model.js';

const model = {
  foo: 'xxx',
  list: [
    { x: 0, y: 1 },
    { x: 2, y: 5 }
  ]
};

// TODO reverse this
const fooAction = Action(Msg('doFoo', 'doBar'), model);

const update = (msg, model) => {
  switch (msg.pop()) {
    case 'doFoo':
      const update2Action = update2(msg, model);
      return Action(update2Action.msg, prop(model, 'foo', update2Action.model));
    case 'doList':
      return Action(Msg('show'), prop(model, 'list', map(doList, model.list)));
    case 'show':
      return Action(Msg('done'), model);
    default:
      return null;
  }
}


const update2 = (msg, model) => {
  switch (msg.pop()) {
    case 'doBar':
      return Action(Msg('doList'), 'bar');
    case 'doBaz':
      return Action(Msg('doList'), prop(model, 'foo', 'baz'));
    default:
      return null;
  }
}

const doList = value => {
  if (value.x === 0) {
    return prop(value, 'x', 2);
  }
  return value;
}

loop((action, frameCount) => {
  console.log(action.model.foo, action.model.list[0]);
  const newAction = update(action.msg, action.model);
  return newAction;
}, fooAction);
