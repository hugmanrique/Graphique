import PropTypes from 'prop-types';

export const viewportType = PropTypes.shape({
  x: PropTypes.arrayOf(PropTypes.number),
  y: PropTypes.arrayOf(PropTypes.number)
});

export const defaultViewport = {
  x: [-20, 20],
  y: [-20, 20]
};
