// Based on http://www.realtimerendering.com/resources/GraphicsGems/gemsii/xlines.c

// Is it possible to make this more perf!?!?

const DONT_INTERSECT = 0;
const DO_INTERSECT = 1;
const COLLINEAR = 2;

const sameSigns = (a, b) => (a ^ b) >= 0;

// a1, a2, b1, b2, c1, c2  Coefficients of line eqns.
// r1, r2, r3, r4;         'Sign'
// denom, offset, num;     Intermediate values

export const linesIntersect = (line1, line2) => {
  // Compute a1, b1, c1, where line joining points 1 and 2
  // is "a1 x  +  b1 y  +  c1  =  0".
  const a1 = line1.y2 - line1.y1;
  const b1 = line1.x1 - line1.x2;
  const c1 = line1.x2 * line1.y1 - line1.x1 * line1.y2;

  const r3 = a1 * line2.x1 + b1 * line2.y1 + c1;
  const r4 = a1 * line2.x2 + b1 * line2.y2 + c1;

  // Check signs of r3 and r4.  If both point 3 and point 4 lie on
  // same side of line 1, the line segments do not intersect.
  if (r3 !== 0 && r4 !== 0 && sameSigns(r3, r4))
    return DONT_INTERSECT;

  // Compute a2, b2, c2 */
  const a2 = line2.y2 - line2.y1;
  const b2 = line2.x1 - line2.x2;
  const c2 = line2.x2 * line2.y1 - line2.x1 * line2.y2;

  // Compute r1 and r2
  const r1 = a2 * line1.x1 + b2 * line1.y1 + c2;
  const r2 = a2 * line1.x2 + b2 * line1.y2 + c2;

  // Check signs of r1 and r2.  If both point 1 and point 2 lie
  // on same side of second line segment, the line segments do
  // not intersect.
  if (r1 !== 0 && r2 !== 0 && sameSigns(r1, r2))
    return DONT_INTERSECT;

  // Line segments intersect: compute intersection point. 
  const denom = a1 * b2 - a2 * b1;
  if (denom === 0)
      return COLLINEAR;

  const offset = denom < 0 ? -denom / 2 : denom / 2;

  // The denom/2 is to get rounding instead of truncating.  It
  // is added or subtracted to the numerator, depending upon the
  // sign of the numerator.
  const numX = b1 * c2 - b2 * c1;
  const x = (numX < 0 ? numX - offset : numX + offset) / denom;

  const numY = a2 * c1 - a1 * c2;
  const y = (numY < 0 ? numY - offset : numY + offset) / denom;

  return DO_INTERSECT;
} 
