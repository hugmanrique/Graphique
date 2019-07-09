import React from 'react';
import PropTypes from 'prop-types';

function getRawPointsProp(points) {
  if (Array.isArray(points)) {
    // [x, y, x2, y2, ...]
    return points.join(' ');
  } else {
    // {x: y, x2: y2}
    return (
      Object.entries(points)
        // Convert entry to `x y` string
        .map(entry => `${entry[0]} ${entry[1]}`)
        .join(' ')
    );
  }
}

function Polyline({ points, ...props }) {
  const rawPoints = getRawPointsProp(points);

  return <polyline {...props} points={rawPoints} />;
}

Polyline.propTypes = {
  points: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
};

export default Polyline;
