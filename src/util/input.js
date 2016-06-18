import { point } from './geom.js';

export const getInitialInputState = (config = {}) =>
  Object.assign({
    isActive: false,
    isPressed: false,
    initialPressPosition: point(0, 0),
    lastPosition: point(0, 0),
    position: point(0, 0),
    keysPressed: []    
  }, config);

const getElementLocation = element => {
  const bounds = element.getBoundingClientRect();
  return {
    x: Math.floor(bounds.left),
    y: Math.floor(bounds.top)
  };
}

const getInputLocation = (clientX, clientY, element) => {
  const elementLocation = getElementLocation(element);
  return point(clientX - elementLocation.x, clientY - elementLocation.y);
}

export const createInput = (inputState, targetElement) => {
  // Press
  targetElement.addEventListener('mousedown', event => {
    inputState.isActive = true;
    inputState.position = inputState.initialPressPosition = getInputLocation(event.clientX, event.clientY, targetElement);
    inputState.isPressed = true;
  });

  // Release
  targetElement.addEventListener('mouseup', event => {
    inputState.isActive = true;
    inputState.position = getInputLocation(event.clientX, event.clientY, targetElement);
    inputState.isPressed = false;
  });

  // Out
  targetElement.addEventListener('mouseout', event => {
    inputState.isActive = false; 
    inputState.position = getInputLocation(event.clientX, event.clientY, targetElement);
    //inputState.isPressed = false;
  });

  // Drag & Hover
  targetElement.addEventListener('mousemove', event => {
    const mouseLocation = getInputLocation(event.clientX, event.clientY, targetElement);
    inputState.isActive = true;
    inputState.lastPosition = (inputState.position || mouseLocation);
    inputState.position = mouseLocation;
  });

  // Key down
  document.addEventListener('keydown', event => {
    inputState.keysPressed[event.keyCode] = true;
  });

  // Key up
  document.addEventListener('keyup', event => {
    inputState.keysPressed[event.keyCode] = false;
  });

  return () => inputState;
}
