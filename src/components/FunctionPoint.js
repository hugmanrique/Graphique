import React from 'react';
import PropTypes from 'prop-types';

import Text from '../primitives/Text';

import { useGraphique } from '../context';
import { useFunction } from './Function';
import { addOffset, pointType } from '../points';

function FunctionPoint({ x, labelOffset }) {
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
      <Text point={textPoint}>{value}</Text>
    </>
  );
}

FunctionPoint.propTypes = {
  x: PropTypes.number.isRequired,
  labelOffset: pointType
};

FunctionPoint.defaultProps = {
  labelOffset: [0, 0]
};

export default React.memo(FunctionPoint);
