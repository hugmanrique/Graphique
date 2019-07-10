import React from 'react';

import Line from '../primitives/Line';
import { useGraphique } from '../context';

import {
  getTextOffset,
  axisPropTypes,
  axisDefaultProps
} from '../helpers/axes';
import { createTicks } from '../helpers/ticks';

function XAxis({ ticks, ...lineProps }) {
  const { viewport, getCanvasPoint, isInCanvas } = useGraphique();
  const {
    x: [minX, maxX]
  } = viewport;

  const getAxisPoint = x => getCanvasPoint(x, 0);

  const from = getAxisPoint(minX);
  const to = getAxisPoint(maxX);

  if (!isInCanvas(from) && !isInCanvas(to)) {
    // Axis is not in viewport
    return null;
  }

  const calcLabelOffset = value => [
    getTextOffset(value, ticks.label),
    ticks.label.offset
  ];

  return (
    <>
      <Line {...lineProps} from={from} to={to} />
      {createTicks({
        getAxisPoint,
        direction: 1,
        minValue: minX,
        maxValue: maxX,
        ticks,
        calcLabelOffset
      })}
    </>
  );
}

XAxis.propTypes = axisPropTypes;

XAxis.defaultProps = {
  ...axisDefaultProps,
  ticks: {
    delta: 0,
    label: {
      fontSize: 20,
      offset: 24
    }
  }
};

export default React.memo(XAxis);
