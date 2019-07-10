import React from 'react';

import { pointType } from '../points';

function Line({ from, to, ...props }) {
  return <line {...props} x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} />;
}

Line.propTypes = {
  from: pointType.isRequired,
  to: pointType.isRequired
};

export default React.memo(Line);
