export const getElementById = (id) => document.getElementById(id);
export const render = (to, from) => to.getContext('2d').drawImage(from, 0, 0);
export const write = (to, from) => to.innerHTML = from;
