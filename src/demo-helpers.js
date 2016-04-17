
/*
export const removeChildren = node => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

export const getRenderer = container => {
  let frameCount = 0;
  return fn => setInterval(() => {
    removeChildren(container);
    container.appendChild(fn(frameCount++));
  }, 32);
}
*/

export const getElementById = (id) => document.getElementById(id);
export const render = (to, from) => to.getContext('2d').drawImage(from, 0, 0);
export const write = (to, from) => to.innerHTML = from;
