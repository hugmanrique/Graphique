import PropTypes from 'prop-types';

import { secondaryColor } from '../colors';

export const axisPropTypes = {
  ticks: PropTypes.object,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number
};

// Note: ticks also have these default props
export const axisDefaultProps = {
  stroke: secondaryColor,
  strokeWidth: 2
};

function getTextWidth(text, labelProps) {
  const { fontSize = 16 } = labelProps;

  // Assumes fontSize in px
  return (text.length * fontSize) / 2;
}

export function getTextOffset(text, labelProps) {
  return -getTextWidth(text, labelProps) / 2;
}
