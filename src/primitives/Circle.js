import React from 'react';
import PropTypes from 'prop-types';

import { pointType } from '../points';

function Circle({ point, radius, ...props }) {
  return <circle {...props} cx={point[0]} cy={point[1]} r={radius} />;
}

Circle.propTypes = {
  point: pointType.isRequired,
  radius: PropTypes.number.isRequired
};

export default React.memo(Circle);
