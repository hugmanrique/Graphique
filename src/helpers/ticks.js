import React from 'react';

import Tick from '../components/Tick';

function getIdealDelta(minValue, maxValue) {
  const delta = maxValue - minValue;

  const log = Math.log10(delta);
  let flooredLog = Math.floor(log);

  let logDiff = log - flooredLog;

  if (logDiff > 0.5) {
    logDiff = 0.5 - logDiff;
    flooredLog++;
  }

  const total = 10 ** flooredLog;

  if (logDiff <= 0.1) {
    return total / 10;
  } else if (logDiff <= 0.2) {
    return total / 5;
  } else if (logDiff <= 0.333) {
    return total / 3;
  }

  return total / 2;
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

  const { label: labelProps, delta: passedDelta, ...tickProps } = ticks;
  let delta = passedDelta;

  if (delta <= 0) {
    // Calculate ideal tick delta if not set
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
