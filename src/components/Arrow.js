import React from 'react';
import PropTypes from 'prop-types';

import Line from './Line';

import useGraphique from '../context';
import { pointType } from '../helpers';

const MARKER_SIZE = 10;
const MARKER_OFFSET_X = MARKER_SIZE - 2;

function Arrow({ from, to, markerSize, stroke, ...props }) {
  const { getCanvasPoint } = useGraphique();

  const canvasFrom = getCanvasPoint(from);
  const canvasTo = getCanvasPoint(to);

  const markerId = `${canvasTo[0]}${canvasTo[1]}`;

  return (
    <>
      <defs>
        <marker
          id={markerId}
          markerWidth={MARKER_SIZE}
          markerHeight={MARKER_SIZE}
          refX={MARKER_OFFSET_X}
          refY={3}
          orient="auto"
          viewBox={`0 0 ${markerSize} ${markerSize}`}
        >
          <path d="M0,0 L0,6 L9,3 z" fill={stroke} />
        </marker>
      </defs>
      <Line
        {...props}
        from={canvasFrom}
        to={canvasTo}
        stroke={stroke}
        markerEnd={`url(#${markerId})`}
      />
    </>
  );
}

Arrow.propTypes = {
  from: pointType.isRequired,
  to: pointType.isRequired,
  stroke: PropTypes.string,
  markerSize: PropTypes.number
};

Arrow.defaultProps = {
  markerSize: 10,
  stroke: '#718096',
  strokeWidth: 2
};

export default Arrow;
