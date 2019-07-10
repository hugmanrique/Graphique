import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import Polyline from '../primitives/Polyline';

import { useGraphique } from '../context';
import { useColor } from '../colors';

/**
 * Stores the computed function points in `this.points` as [x, y, x2, y2, ...],
 * and the function `f` in `this.f`.
 */
const FunctionContext = React.createContext();

export const useFunction = () => useContext(FunctionContext);

function Function({
  f,
  domain,
  pointCount,
  stroke: passedStroke,
  strokeWidth,
  children,
  ...props
}) {
  const { getCanvasPoint, viewport, height } = useGraphique();

  // *Always* get a color from the hook
  let stroke = useColor();

  if (passedStroke) {
    // Override stroke if prop was defined
    stroke = passedStroke;
  }

  const [minX, maxX] = domain ? domain : viewport.x;
  const {
    y: [minY, maxY]
  } = viewport;
  const safeZone = strokeWidth * 2; // Safe margin OOB
  const xDelta = (maxX - minX) / (pointCount - 1);

  // Compute function points
  const points = useMemo(() => {
    const computed = [];

    for (let i = 0; i < pointCount; i++) {
      const x = minX + xDelta * i;
      let y = f(x);

      if (isNaN(y)) {
        // TODO Split into multiple polylines
        continue;
      }

      const point = getCanvasPoint(x, y);

      // Clamp y values outside of view to reduce polyline length
      if (y < minY) {
        point[1] = height + safeZone;
      }

      if (y > maxY) {
        point[1] = -safeZone;
      }

      computed.push(point[0], point[1]);
    }

    return computed;

    // Don't depend on Graphique context function
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [f, height, maxY, minX, minY, pointCount, safeZone, xDelta]);

  const contextValue = { points, f };

  return (
    <>
      <Polyline
        {...props}
        stroke={stroke}
        strokeWidth={strokeWidth}
        points={points}
      />
      <FunctionContext.Provider value={contextValue}>
        {children}
      </FunctionContext.Provider>
    </>
  );
}

Function.propTypes = {
  f: PropTypes.func.isRequired,
  domain: PropTypes.arrayOf(PropTypes.number),
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  pointCount: PropTypes.number
};

Function.defaultProps = {
  domain: undefined,
  stroke: undefined,
  strokeWidth: 3,
  fill: 'transparent',
  pointCount: 300
};

export default React.memo(Function);
