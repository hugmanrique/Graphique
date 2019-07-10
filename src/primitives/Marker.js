import React from 'react';
import PropTypes from 'prop-types';

import { pointType } from '../points';

function Marker({ id, width, height, offset, viewbox, children }) {
  return (
    <defs>
      <marker
        id={id}
        markerWidth={width}
        markerHeight={height}
        refX={offset[0]}
        refY={offset[1]}
        orient="auto"
        viewBox={`0 0 ${viewbox[0]} ${viewbox[1]}`}
      >
        {children}
      </marker>
    </defs>
  );
}

Marker.propTypes = {
  id: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  offset: pointType.isRequired,
  viewbox: pointType.isRequired
};

export default React.memo(Marker);
