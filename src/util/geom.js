import { getObject, releaseObject } from './pool.js';

// Create a point (x, y)
export const point = (x = 0, y = 0) => {
  const obj = getObject();
  obj.x = x;
  obj.y = y;
  return obj;
}

// Create a rectangle (x, y, width, height)
export const rect = (x = 0, y = 0, width = 100, height = 100) => {
  const obj = getObject();
  obj.x = x;
  obj.y;
  obj.width;
  obj.height;
  return obj;
}

// Get distance between two points (always unsigned)
export const dist = (point1, point2) => {
  const obj = getObject();
  obj.x = Math.abs(point1.x - point2.x);
  obj.y = Math.abs(point1.y - point2.y);
  return obj;
}

// Get displacement between two points (signed)
export const disp = (point1, point2) => {
  const obj = getObject();
  obj.x = point1.x - point2.x;
  obj.y = point1.y - point2.y;
  return obj;
}

// Get a new point from a rectangle
export const pointFromRect = rect => {
  const obj = getObject();
  obj.x = rect.x;
  obj.y = rect.y;
  return obj;
};

// Check if a distance is equal to or larger than provided x & y
export const isMinDist = (dist, x, y) =>
  (dist.x >= x && dist.y >= y);

// Check if a rectangle is equal to or larger than provided w & h
export const rectHasMinSize = (rect, width, height) =>
  (Math.abs(rect.width) >= width && Math.abs(rect.height) >= height);

// Check if point falls within bounds of rectangle
export const rectContainsPoint = (point, rect) =>
  (point.x >= rect.x && point.x < rect.x + rect.width && 
    point.y >= rect.y && point.y < rect.y + rect.height);

// Needs work
const line = (point1, point2) => {
  const distance = dist(point1, point2);
  let points;

  if (distance.x === distance.y) {
    let y = point1.y;
    points = range(point1.x, point2.x, (x) => {
      return {x: x, y: y++};
    });
  }
  else if (distance.x < distance.y) {
    const xStep = (distance.x / distance.y);
    let x = point1.x;
    points = range(point1.y, point2.y, (y) => {
      return {x: (Math.sign(point2.x - point1.x) >= 0) ? Math.floor(x += xStep) : Math.ceil(x -= xStep), y};
    });
  } 
  else {
    const yStep = (distance.y / distance.x);
    let y = point1.y;
    points = range(point1.x, point2.x, (x) => {
      return {x, y: (Math.sign(point2.y - point1.y) >= 0) ? Math.floor(y += yStep) : Math.ceil(y -= yStep)};
    });
  }
  
  return points;
}
