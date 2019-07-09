import React from 'react';
import PropTypes from 'prop-types';

import Line from '../Line';
import Text from '../Text';

import { defaultAxisStroke, defaultAxisStrokeWidth } from '../../colors';
import { pointType, directionType, clonePoint, addOffset } from '../../helpers';

function Tick({ point, direction, length, label, stroke, strokeWidth }) {
  const start = clonePoint(point);
  start[direction] -= length;

  const end = clonePoint(point);
  end[direction] += length;

  let labelElem;

  if (label) {
    const { value, offset, ...labelProps } = label;
    const labelPoint = addOffset(point, offset);

    labelElem = (
      <Text {...labelProps} point={labelPoint}>
        {value}
      </Text>
    );
  }

  return (
    <>
      <Line from={start} to={end} stroke={stroke} strokeWidth={strokeWidth} />
      {labelElem}
    </>
  );
}

Tick.propTypes = {
  point: pointType.isRequired,
  direction: directionType.isRequired,
  length: PropTypes.number,
  label: PropTypes.shape({
    value: PropTypes.any.isRequired,
    offset: pointType.isRequired
  }),
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number
};

Tick.defaultProps = {
  length: 6,
  label: null,
  stroke: defaultAxisStroke,
  strokeWidth: defaultAxisStrokeWidth
};

export default Tick;
