import React from 'react';
import PropTypes from 'prop-types';

import Line from './Line';
import { createTicks, getTextOffset } from './ticks';
import { defaultAxisStroke, defaultAxisStrokeWidth } from '../colors';
import useGraphique from '../context';

function YAxis({ ticks, stroke, strokeWidth }) {
  const { viewport, getCanvasPoint, isInCanvas } = useGraphique();

  const {
    y: [minY, maxY]
  } = viewport;

  const getAxisPoint = value => getCanvasPoint(0, value);

  const from = getAxisPoint(minY);
  const to = getAxisPoint(maxY);

  if (!isInCanvas(from) && !isInCanvas(to)) {
    // Axis is not in viewport
    return null;
  }

  const calcOffset = value => [
    getTextOffset(value, ticks.label) - ticks.label.offset * 4,
    ticks.label.offset
  ];

  return (
    <>
      <Line from={from} to={to} stroke={stroke} strokeWidth={strokeWidth} />
      {createTicks({
        getAxisPoint,
        calcOffset,
        direction: 0,
        minValue: minY,
        maxValue: maxY,
        ticks
      })}
    </>
  );
}

YAxis.propTypes = {
  ticks: PropTypes.object,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number
};

YAxis.defaultProps = {
  ticks: {
    delta: 0,
    label: {
      fontSize: 20,
      offset: 5
    }
  },
  stroke: defaultAxisStroke,
  strokeWidth: defaultAxisStrokeWidth
};

export default YAxis;
