import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { GraphiqueContext } from '../context';
import { viewportType, defaultViewport } from '../viewport';
import { ColorContext, useColorContext, getColorPalette } from '../colors';

function Graphique({ width, height, viewport, colorPalette, children }) {
  const [context] = useState({ viewport, width, height });
  const colorContext = useColorContext(colorPalette || getColorPalette());

  return (
    <svg
      height={height}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <GraphiqueContext.Provider value={context}>
        <ColorContext.Provider value={colorContext}>
          {children}
        </ColorContext.Provider>
      </GraphiqueContext.Provider>
    </svg>
  );
}

Graphique.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  viewport: viewportType,
  colorPalette: PropTypes.arrayOf(PropTypes.string)
};

Graphique.defaultProps = {
  width: 800,
  height: 600,
  viewport: defaultViewport,
  colorPalette: null
};

export default Graphique;
