import React from 'react';
import PropTypes from 'prop-types';

import Polyline from './Polyline';
import useGraphique from '../context';
import useColor from '../colors';

function Function({ fn, domain, pointCount, stroke, strokeWidth, ...props }) {
  const { getCanvasPoint, viewport, height } = useGraphique();
  const color = useColor();

  const [minX, maxX] = domain ? domain : viewport.x;
  const {
    y: [minY, maxY]
  } = viewport;
  const safeZone = strokeWidth * 2;
  const xDelta = (maxX - minX) / (pointCount - 1);

  // Memoizing this array won't have any effects as we depend on all the props
  const points = [];

  for (let i = 0; i < pointCount; i++) {
    const x = minX + xDelta * i;
    let y = fn(x);

    const point = getCanvasPoint(x, y);

    // Clamp y values outside of canvas to reduce polyline length

    if (y < minY) {
      point[1] = height + safeZone;
    }

    if (y > maxY) {
      point[1] = -safeZone;
    }

    points.push(point[0], point[1]);
  }

  // Grab a color from the default environment
  if (!stroke) {
    // eslint-disable-next-line no-param-reassign
    stroke = color;
  }

  return (
    <Polyline
      {...props}
      stroke={stroke}
      strokeWidth={strokeWidth}
      points={points}
    />
  );
}

Function.propTypes = {
  fn: PropTypes.func.isRequired,
  domain: PropTypes.arrayOf(PropTypes.number),
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
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
