import React, { useContext } from 'react';

export const GraphiqueContext = React.createContext();

export default function useGraphique() {
  const { viewport, width, height, colors } = useContext(GraphiqueContext);

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

  const getCanvasPoint = (x, y) => [getCanvasX(x), getCanvasY(y)];

  function isInCanvas(canvasX, canvasY) {
    if (Array.isArray(canvasX)) {
      // canvasX is a point of the form [x, y]
      return isInCanvas(canvasX[0], canvasX[1]);
    }

    return canvasX >= 0 && canvasX < width && canvasY >= 0 && canvasY < height;
  }

  let colorIndex = 0;

  function nextColor() {
    const color = colors[colorIndex++];

    if (colorIndex === colors.length) {
      colorIndex = 0;
    }

    return color;
  }

  return {
    // State
    viewport,
    width,
    height,
    // Helper functions
    getCanvasX,
    getCanvasY,
    getCanvasPoint,
    isInCanvas,
    nextColor
  };
}
