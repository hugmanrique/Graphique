import React from 'react';
import PropTypes from 'prop-types';

import Circle from '../primitives/Circle';
import Text from '../primitives/Text';

import { useGraphique } from '../context';
import { useFunction } from './Function';
import { addOffset, pointType } from '../points';
import { focusColor } from '../colors';

function FunctionPoint({
  x,
  labelOffset,
  pointRadius,
  pointColor,
  ...textProps
}) {
  const { getCanvasPoint, isInCanvas } = useGraphique();
  const { f } = useFunction();

  const y = f(x);
  const point = getCanvasPoint(x, y);

  if (!isInCanvas(point)) {
    // Function value is OOB
    return null;
  }

  const textPoint = addOffset(point, labelOffset);
  const value = `(${x}, ${y})`;

  return (
    <>
      <Circle point={point} radius={pointRadius} fill={pointColor} />
      <Text {...textProps} point={textPoint}>
        {value}
      </Text>
    </>
  );
}

FunctionPoint.propTypes = {
  x: PropTypes.number.isRequired,
  pointRadius: PropTypes.number,
  pointColor: PropTypes.string,
  labelOffset: pointType
};

FunctionPoint.defaultProps = {
  labelOffset: [5, -10],
  pointRadius: 4,
  pointColor: focusColor,
  fontSize: 20
};

export default React.memo(FunctionPoint);
