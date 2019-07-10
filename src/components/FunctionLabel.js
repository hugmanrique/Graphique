import React from 'react';
import PropTypes from 'prop-types';

import Text from '../primitives/Text';
import { useGraphique } from '../context';
import { useFunction } from './Function';
import { addOffset, pointType } from '../points';

function FunctionLabel({ x, offset, children, ...props }) {
  const { getCanvasPoint, isInCanvas } = useGraphique();
  const { f } = useFunction();

  const y = f(x);
  const point = getCanvasPoint(x, y);

  if (!isInCanvas(point)) {
    // Function value is OOB
    return null;
  }

  const textPoint = addOffset(point, offset);

  return (
    <Text {...props} point={textPoint}>
      {children}
    </Text>
  );
}

FunctionLabel.propTypes = {
  x: PropTypes.number.isRequired,
  offset: pointType
};

FunctionLabel.defaultProps = {
  offset: [5, -10],
  fontSize: 20
};

export default React.memo(FunctionLabel);
