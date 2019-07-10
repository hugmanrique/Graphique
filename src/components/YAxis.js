import React from 'react';

import Line from '../primitives/Line';
import { useGraphique } from '../context';

import {
  getTextOffset,
  axisPropTypes,
  axisDefaultProps
} from '../helpers/axes';
import { createTicks } from '../helpers/ticks';

function YAxis({ ticks, ...lineProps }) {
  const { viewport, getCanvasPoint, isInCanvas } = useGraphique();
  const {
    y: [minY, maxY]
  } = viewport;

  const getAxisPoint = y => getCanvasPoint(0, y);

  const from = getAxisPoint(minY);
  const to = getAxisPoint(maxY);

  if (!isInCanvas(from) && !isInCanvas(to)) {
    // Axis is not in viewport
    return null;
  }

  const calcLabelOffset = value => [
    getTextOffset(value, ticks.label) - ticks.label.offset * 4,
    ticks.label.offset
  ];

  return (
    <>
      <Line {...lineProps} from={from} to={to} />
      {createTicks({
        getAxisPoint,
        direction: 0,
        minValue: minY,
        maxValue: maxY,
        ticks,
        calcLabelOffset
      })}
    </>
  );
}

YAxis.propTypes = axisPropTypes;

YAxis.defaultProps = {
  ...axisDefaultProps,
  ticks: {
    delta: 0,
    label: {
      fontSize: 20,
      offset: 5
    }
  }
};

export default React.memo(YAxis);
