import PropTypes from 'prop-types';

export const pointType = PropTypes.arrayOf(PropTypes.number);
export const rangeType = PropTypes.arrayOf(PropTypes.number);

export const clonePoint = point => [point[0], point[1]];

export const addOffset = (origin, offset) => [
  origin[0] + offset[0],
  origin[1] + offset[1]
];

export const directionType = PropTypes.oneOf([0, 1]);

export function getDirectionIndex(from, to) {
  if (from[0] === to[0]) {
    // Vertical
    return 1;
  }

  if (from[1] === to[1]) {
    // Horizontal
    return 0;
  }

  throw new Error(
    'Non-parallel to axis directions does not have a direction index'
  );
}

export const getOrthogonalIndex = directionIndex =>
  Math.abs(directionIndex - 1);
