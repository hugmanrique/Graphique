import React, { useContext, useRef, useState } from 'react';

// Courtesy of TailwindCSS (https://tailwindcss.com/docs/customizing-colors#default-color-palette)
export const defaultPalette = [
  '#F56565',
  '#4299E1',
  '#48BB78',
  '#9F7AEA',
  '#ED8936',
  '#2B6CB0',
  '#ED64A6',
  '#975A16'
];

export const ColorContext = React.createContext();

export function useColorState(palette) {
  const colorIndex = useRef(0);
  const [state] = useState({ colorIndex, palette });

  return state;
}

export function useColor() {
  const { colorIndex, palette } = useContext(ColorContext);

  const currentIndex = colorIndex.current;
  const color = palette[currentIndex];

  // Increment color index
  colorIndex.current = (currentIndex + 1) % palette.length;

  return color;
}
