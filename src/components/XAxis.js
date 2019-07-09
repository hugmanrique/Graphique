import React from 'react';
import PropTypes from 'prop-types';

import Line from './Line';
import { createTicks, getTextOffset } from './ticks';
import { defaultAxisStroke, defaultAxisStrokeWidth } from '../colors';
import useGraphique from '../context';

function XAxis({ ticks, stroke, strokeWidth }) {
  const { viewport, getCanvasPoint, isInCanvas } = useGraphique();

  const {
    x: [minX, maxX]
  } = viewport;

  const getAxisPoint = value => getCanvasPoint(value, 0);

  const from = getAxisPoint(minX);
  const to = getAxisPoint(maxX);

  if (!isInCanvas(from) && !isInCanvas(to)) {
    // Axis is not in viewport
    return null;
  }

  const calcOffset = value => [
    getTextOffset(value, ticks.label),
    ticks.label.offset
  ];

  return (
    <>
      <Line from={from} to={to} stroke={stroke} strokeWidth={strokeWidth} />
      {createTicks({
        getAxisPoint,
        calcOffset,
        direction: 1,
        minValue: minX,
        maxValue: maxX,
        ticks
      })}
    </>
  );
}

XAxis.propTypes = {
  ticks: PropTypes.object,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number
};

XAxis.defaultProps = {
  ticks: {
    delta: 0,
    label: {
      fontSize: 20,
      offset: 24
    }
  },
  stroke: defaultAxisStroke,
  strokeWidth: defaultAxisStrokeWidth
};

export default XAxis;
