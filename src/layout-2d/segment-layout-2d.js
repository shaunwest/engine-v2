
/*
const initSegments = (len) => {
  const arr = [];
  for(let i = 0; i < len; i++) {
    arr[i] = new Map();
  }
  return arr;
}
*/

/*
export const createFreeLayout2d(layout, spriteSetConfig) => {
  return spriteId => {}
}
*/

export const addEntity = (segments, index, entity) => {
  if (!segments[index]) segments[index] = [];
  segments[index].push(entity);
}

// for adding entities back in after they've moved. Also need a func to pop an entity out.
export const addEntity2 = (segments, entity) => {
  const index = (Math.floor(entity.y / segments.segmentSize) * segments.rowLength) + Math.floor(entity.x / segments.segmentSize);

  if (!segments[index]) segments[index] = [];
  segments[index].push(entity);
}

export const initSegments = (layout, rowLength, segmentSize) => { 
  const data = {};

  for (const entity of layout) {
    addEntity(
      data,
      (Math.floor(entity.y / segmentSize) * rowLength) + Math.floor(entity.x / segmentSize),
      entity
    );
  }

  return { data, rowLength, segmentSize };
}

export const getSegment = (segments, col, row) =>
  segments.data[(row * segments.rowLength) + col];


export const mergeSegments = (segments, range) => {
  const result = [];
  const maxCol = range.x + range.width;
  const maxRow = range.y + range.height;

  for (let col = range.x; col < maxCol; col++) {
    for (let row = range.y; row < maxRow; row++) {
      const segment = getSegment(segments, col, row);
      for (const entity of segment) {
        result.push(entity);
      }
    }
  }

  return result;
}
