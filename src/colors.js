import React, { useContext } from 'react';

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

export const secondaryColor = '#CBD5E0';
export const focusColor = '#718096';

export const ColorContext = React.createContext();

export function useColorData(palette) {
  // Mutable object which only persists for the current render.
  const colorIndex = {
    current: 0
  };

  return {
    colorIndex,
    palette
  };
}

export function useColor() {
  const { colorIndex, palette } = useContext(ColorContext);

  const currentIndex = colorIndex.current;
  const color = palette[currentIndex];

  // Increment color index
  const nextIndex = (currentIndex + 1) % palette.length;
  colorIndex.current = nextIndex; // Manually mutate state to avoid rerender

  return color;
}
