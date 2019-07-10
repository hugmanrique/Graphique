import React from 'react';
import PropTypes from 'prop-types';

import { GraphiqueContext, useGraphiqueData } from '../context';
import { ColorContext, useColorData, defaultPalette } from '../colors';
import { viewportType, defaultViewport } from '../viewport';

function Graphique({ width, height, viewport, colorPalette, children }) {
  const data = useGraphiqueData({ width, height, viewport });
  const colorData = useColorData(colorPalette);

  return (
    <svg
      height={height}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <GraphiqueContext.Provider value={data}>
        <ColorContext.Provider value={colorData}>
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
  colorPalette: defaultPalette
};

export default React.memo(Graphique);
