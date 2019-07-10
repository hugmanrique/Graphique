import React from 'react';

import { pointType } from '../points';

function Text({ point, children, ...props }) {
  return (
    <text {...props} x={point[0]} y={point[1]}>
      {children}
    </text>
  );
}

Text.propTypes = {
  point: pointType.isRequired
};

export default React.memo(Text);
