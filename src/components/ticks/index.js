import React from 'react';

import Tick from './Tick';

export function createTicks({
  getAxisPoint,
  calcOffset,
  direction,
  minValue,
  maxValue,
  ticks
}) {
  if (!ticks) {
    return [];
  }

  const { label: labelProps, ...tickProps } = ticks;
  let { delta } = ticks;

  if (delta <= 0) {
    delta = getIdealDelta(minValue, maxValue);
  }

  let value = minValue - (minValue % delta);
  const elements = [];

  do {
    value += delta;

    if (value === 0) {
      // Don't draw ticks close to the origin
      continue;
    }

    // Create tick
    const point = getAxisPoint(value);
    let tick;

    if (!labelProps) {
      // Don't display labels
      tick = (
        <Tick key={value} {...tickProps} point={point} direction={direction} />
      );
    } else {
      const labelValue = value.toString();
      const offset = calcOffset(labelValue);

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

function getTextWidth(text, labelProps) {
  const { fontSize = 16 } = labelProps;

  return (text.length * fontSize) / 2; // assumes fontSize in px
}

export const getTextOffset = (text, labelProps) =>
  -getTextWidth(text, labelProps) / 2;

function getIdealDelta(minValue, maxValue) {
  const delta = maxValue - minValue;
  const log = Math.log10(delta);
  let floorLog = Math.floor(log);
  const logDiff = log - floorLog;

  if (logDiff > 0.9) {
    floorLog++;
  }

  if (logDiff < 0.1) {
    return 10 ** floorLog / 5;
  } else {
    return Math.round(delta / 4);
  }
}
