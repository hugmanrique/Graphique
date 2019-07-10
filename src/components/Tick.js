import React from 'react';
import PropTypes from 'prop-types';

import Line from '../primitives/Line';
import Text from '../primitives/Text';

import { clonePoint, addOffset, pointType, directionType } from '../points';
import { axisDefaultProps } from '../helpers/axes';

function Tick({ point, direction, length, label, ...lineProps }) {
  const midLength = length / 2;

  const start = clonePoint(point);
  start[direction] -= midLength;

  const end = clonePoint(point);
  end[direction] += midLength;

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
      <Line {...lineProps} from={start} to={end} />
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
  })
};

Tick.defaultProps = {
  ...axisDefaultProps,
  length: 12,
  label: null
};

export default React.memo(Tick);
