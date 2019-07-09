import React from 'react';
import PropTypes from 'prop-types';

function Text({ point, children, ...props }) {
  return (
    <text {...props} x={point[0]} y={point[1]}>
      {children}
    </text>
  );
}

Text.propTypes = {
  point: PropTypes.arrayOf(PropTypes.number).isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default Text;
