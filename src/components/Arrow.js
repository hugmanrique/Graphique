import React from 'react';
import PropTypes from 'prop-types';

import Marker from '../primitives/Marker';
import Line from '../primitives/Line';

import { useGraphique } from '../context';
import { pointType } from '../points';
import { focusColor } from '../colors';

const ARROW_SIZE = 10;
const ARROW_OFFSET = [ARROW_SIZE - 2, 3];

const generateMarkerId = (from, to) =>
  `${from[0]}-${from[1]}-${to[0]}-${to[1]}`;

function Arrow({ from, to, markerSize, stroke, ...props }) {
  const { getCanvasPoint } = useGraphique();

  const fromPoint = getCanvasPoint(from);
  const toPoint = getCanvasPoint(to);

  // No risk of XSS, the id gets passed as a prop
  const markerId = generateMarkerId(from, to);
  const markerViewbox = [ARROW_SIZE, ARROW_SIZE];

  return (
    <>
      <Marker
        id={markerId}
        width={ARROW_SIZE * markerSize}
        height={ARROW_SIZE * markerSize}
        offset={ARROW_OFFSET}
        viewbox={markerViewbox}
      >
        <path d="M0,0 L0,6 L9,3 z" fill={stroke} />
      </Marker>
      <Line
        {...props}
        from={fromPoint}
        to={toPoint}
        stroke={stroke}
        markerEnd={`url(#${markerId})`}
      />
    </>
  );
}

Arrow.propTypes = {
  from: pointType.isRequired,
  to: pointType.isRequired,
  markerSize: PropTypes.number,
  stroke: PropTypes.string
};

Arrow.defaultProps = {
  markerSize: 0.8,
  stroke: focusColor,
  strokeWidth: 2
};

export default React.memo(Arrow);
