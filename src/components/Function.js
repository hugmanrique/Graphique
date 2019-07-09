import React from 'react';
import PropTypes from 'prop-types';

import Polyline from './Polyline';
import useGraphique from '../context';
import useColor from '../colors';

function Function({ fn, domain, pointCount, stroke, ...props }) {
  const { getCanvasPoint, viewport } = useGraphique();
  const color = useColor();

  const [minX, maxX] = domain ? domain : viewport.x;
  const xDelta = (maxX - minX) / (pointCount - 1);

  // Memoizing this array won't have any effects as we depend on all the props
  const points = [];

  for (let i = 0; i < pointCount; i++) {
    const x = minX + xDelta * i;
    const y = fn(x);

    const point = getCanvasPoint(x, y);

    points.push(point[0], point[1]);
  }

  // Grab a color from the default environment
  if (!stroke) {
    // eslint-disable-next-line no-param-reassign
    stroke = color;
  }

  return <Polyline {...props} stroke={stroke} points={points} />;
}

Function.propTypes = {
  fn: PropTypes.func.isRequired,
  domain: PropTypes.arrayOf(PropTypes.number),
  stroke: PropTypes.string,
  pointCount: PropTypes.number
};

Function.defaultProps = {
  domain: null,
  fill: 'transparent',
  stroke: undefined,
  strokeWidth: 3,
  pointCount: 300
};

export default Function;
