
export const update = (msg, model) => {
  switch(msg.pop()) {
    case 'increment':
      return model + 1;
    case 'decrement':
      return model - 1;
  }
}
