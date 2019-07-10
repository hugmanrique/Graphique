import React from 'react';

import Tick from '../components/Tick';

function getIdealDelta(minValue, maxValue) {
  return 5;
}

export function createTicks({
  getAxisPoint,
  direction,
  minValue,
  maxValue,
  ticks,
  calcLabelOffset
}) {
  if (!ticks) {
    return [];
  }

  const { label: labelProps, ...tickProps } = ticks;
  let { delta } = ticks;

  if (delta <= 0) {
    delta = getIdealDelta(minValue, maxValue);
  }

  const elements = [];
  let value = minValue - (minValue % delta);

  do {
    value += delta;

    if (value === 0) {
      // Don't draw ticks near the origin
      continue;
    }

    // Create tick
    const point = getAxisPoint(value);
    let tick;

    if (!labelProps) {
      // Don't display label
      tick = (
        <Tick key={value} {...tickProps} point={point} direction={direction} />
      );
    } else {
      const labelValue = value.toString();
      const offset = calcLabelOffset(labelValue);

      tick = (
        <Tick
          key={value}
          {...tickProps}
          point={point}
          direction={direction}
          label={{ ...labelProps, value, offset }}
        />
      );
    }

    elements.push(tick);
  } while (value < maxValue - delta);

  return elements;
}
