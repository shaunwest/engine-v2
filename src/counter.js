
export const update = (msg, model) => {
  switch(msg.value) {
    case 'increment':
      return model + 1;
    case 'decrement':
      return model - 1;
  }
}
