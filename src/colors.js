import React, { useContext, useState } from 'react';

// Courtesy of TailwindCSS (https://tailwindcss.com/docs/customizing-colors#default-color-palette)
const colorPalettes = [
  ['#F56565', '#4299E1', '#48BB78', '#9F7AEA'],
  ['#ED8936', '#2B6CB0', '#ED64A6', '#975A16']
];

export const defaultAxisStroke = '#CBD5E0';
export const defaultAxisStrokeWidth = 2;

// Global palette counter
let current = 0;

export function getColorPalette() {
  const env = colorPalettes[current++];

  if (current === colorPalettes.length) {
    current = 0;
  }

  return env;
}

export const ColorContext = React.createContext();

/**
 * Hook used by parent containers to update a global counter
 * between children.
 */
export function useColorContext(palette) {
  let colorIndex = 0;

  const getCurrentIndex = () => colorIndex;
  const setCurrentIndex = newColorIndex => (colorIndex = newColorIndex);

  const [context] = useState({
    palette,
    getCurrentIndex,
    setCurrentIndex
  });

  return context;
}

/**
 * Hook used by children to grab a color corresponding to the
 * current global counter, which gets incremented.
 */
export default function useColor() {
  const { palette, getCurrentIndex, setCurrentIndex } = useContext(
    ColorContext
  );
  const currentIndex = getCurrentIndex();

  const color = palette[currentIndex];

  setCurrentIndex((currentIndex + 1) % palette.length);

  return color;
}
