import React from 'react';

import Graphique, { Function, Axes, Arrow } from '@hugmanrique/graphique';

const a = 0.5;
const b = 3;

function weierstrass(x) {
  let value = 0;

  for (let i = 0; i < 100; i++) {
    value += a ** i * Math.cos(b ** i * Math.PI * x);
  }

  return value;
}

function App() {
  return (
    <div className="App">
      <p>Plots</p>
      <Graphique viewport={{ x: [-5, 5], y: [-50, 50] }}>
        <Axes />
        <Function fn={x => x * x} className="x2" />
        <Function fn={x => x * x * x} className="x3" />
        <Function fn={x => x * x * x * x} className="x4" />
        <Function fn={x => x * x * x * x * x} className="x5" />
      </Graphique>
      <Graphique viewport={{ x: [-5, 5], y: [-3, 3] }}>
        <Axes />
        <Function
          fn={x => Math.sin(1 / x)}
          pointCount={10000}
          className="sin-1"
        />
        <Function fn={x => Math.sin(2 / x) / 2 - 1} />
        <Function fn={x => Math.sin(5 / x) + 2} />
        <Function fn={x => Math.cos(1 / x) - 3} pointCount={10000} />
      </Graphique>
      <Graphique viewport={{ x: [-2, 2], y: [-2, 2] }}>
        <Axes />
        <Function fn={weierstrass} pointCount={3000} />
      </Graphique>
      <Graphique viewport={{ x: [-0.5, 9], y: [-5, 81] }}>
        <Axes />
        <Function fn={x => x * x} domain={[0, 9]} />
        <Arrow from={[5, 0]} to={[5, 25]} />
      </Graphique>
    </div>
  );
}

export default App;
