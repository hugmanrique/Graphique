import React from 'react';

import XAxis from './XAxis';
import YAxis from './YAxis';

export default function Axes(props) {
  return (
    <>
      <XAxis {...props} />
      <YAxis {...props} />
    </>
  );
}
