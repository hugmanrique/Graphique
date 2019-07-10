import React, { useContext, useState } from 'react';

export const GraphiqueContext = React.createContext();

export function useGraphiqueState({ width, height, viewport }) {
  // Declare helper functions

  const {
    x: [minX, maxX],
    y: [minY, maxY]
  } = viewport;

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

    return canvasX >= 0 && canvasX < width && canvasY >= 0 && canvasY < height;
  }

  // Declare global state
  const [state] = useState({
    // Actual state
    width,
    height,
    viewport,
    // Helper functions
    getCanvasX,
    getCanvasY,
    getCanvasPoint,
    isInCanvas
  });

  return state;
}

export function useGraphique() {
  return useContext(GraphiqueContext);
}
