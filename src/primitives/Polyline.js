import React from 'react';
import PropTypes from 'prop-types';

import { pointType } from '../points';

function getRawPoints(points) {
  if (!Array.isArray(points)) {
    // {x: y, x2: y2}
    return getRawPoints(
      Object.entries(points).map(point => `${point[0]} ${point[1]}`)
    );
  }

  // [x, y, x2, y2, ...]
  return points.join(' ');
}

function Polyline({ points, ...props }) {
  const rawPoints = getRawPoints(points);

  return <polyline {...props} points={rawPoints} />;
}

Polyline.propTypes = {
  points: PropTypes.oneOfType([PropTypes.arrayOf(pointType), PropTypes.object])
    .isRequired
};

export default React.memo(Polyline);
