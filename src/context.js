import React, { useContext, useMemo } from 'react';

export const GraphiqueContext = React.createContext();

export function useGraphiqueData({ width, height, viewport }) {
  // Memoize to avoid excessive function redefinition
  const data = useMemo(() => {
    const {
      x: [minX, maxX],
      y: [minY, maxY]
    } = viewport;

    // Declare helper functions
    function getCanvasX(x) {
      const xPercent = (x - minX) / (maxX - minX);

      return xPercent * width;
    }

    function getCanvasY(y) {
      const yPercent = (y - minY) / (maxY - minY);

      return height - yPercent * height;
    }

    function getCanvasPoint(x, y) {
      if (Array.isArray(x)) {
        return getCanvasPoint(x[0], x[1]);
      }

      // x is a point of the form [x, y]
      return [getCanvasX(x), getCanvasY(y)];
    }

    function isInCanvas(canvasX, canvasY) {
      if (Array.isArray(canvasX)) {
        // canvasX is a point of the form [x, y]
        return isInCanvas(canvasX[0], canvasX[1]);
      }

      return (
        canvasX >= 0 && canvasX < width && canvasY >= 0 && canvasY < height
      );
    }

    return {
      // Actual state
      width,
      height,
      viewport,
      // Helper functions
      getCanvasX,
      getCanvasY,
      getCanvasPoint,
      isInCanvas
    };
  }, [width, height, viewport]);

  return data;
}

export function useGraphique() {
  return useContext(GraphiqueContext);
}
