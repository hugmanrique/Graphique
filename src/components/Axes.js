import React from 'react';

import XAxis from './XAxis';
import YAxis from './YAxis';

function Axes(props) {
  return (
    <>
      <XAxis {...props} />
      <YAxis {...props} />
    </>
  );
}

export default React.memo(Axes);
