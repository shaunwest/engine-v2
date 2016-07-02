import { clone } from './util/obj.js';
import { map } from './util/func.js';
import { prop, Action, loop } from './util/model.js';
import { update as counterUpdate } from './counter';
import { update as moverUpdate } from './mover';

const model = {
  counter: 0,
  sprites: [
    { x: 0, y: 1 },
    { x: 2, y: 5 }
  ]
};

const counterAction = Action('counter', 'increment', model);

const update = (msg, model) => {
  switch (msg.value) {
    case 'counter':
      return Action('mover', 'right', prop(model, 'counter', counterUpdate(msg.next, model.counter)));
    case 'mover':
      return Action('done', prop(model, 'sprites', moverUpdate(msg.next, model.sprites)));
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
  //console.log(action.model.counter, action.model.sprites[0].x);
  const newAction = update(action.msg, action.model);
  return newAction;
}, counterAction);
