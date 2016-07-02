import { map } from './util/func';
import { delta } from './util/model';

export const update = (msg, model) => {
  switch (msg.value) {
    case 'right':
      return map(listItem => delta(listItem, 'x', 1), model);
    case 'left':
      return map(listItem => delta(listItem, 'x', -1), model);
  }
}
