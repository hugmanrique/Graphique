import React from 'react';
import PropTypes from 'prop-types';

function Line({ from, to, ...props }) {
  return <line {...props} x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} />;
}

Line.propTypes = {
  from: PropTypes.arrayOf(PropTypes.number).isRequired,
  to: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default Line;
