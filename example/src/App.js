import React, { useState, useEffect } from 'react';

import { Graphique, Function, Axes } from '@hugmanrique/graphique';

const x2 = x => x * x;
const viewport = { x: [-5, 5], y: [-50, 50] };

function App() {
  /*const [value, setValue] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => setValue(value + 1), 1000);

    return () => clearTimeout(id);
  });*/

  return (
    <div className="App">
      <p>Plots</p>
      <Graphique viewport={viewport}>
        <Axes />
        <Function f={x2} />
      </Graphique>
    </div>
  );
}

/*const a = 0.5;
const b = 3;

function weierstrass(x) {
  let value = 0;

  for (let i = 0; i < 100; i++) {
    value += a ** i * Math.cos(b ** i * Math.PI * x);
  }

  return value;
}*/

/*
<Graphique viewport={{ x: [-5, 5], y: [-50, 50] }}>
        <Function f={x => x * x} className="x2" />
        <Function f={x => x * x * x} className="x3" />
        <Function f={x => x * x * x * x} className="x4" />
        <Function f={x => x * x * x * x * x} className="x5" />
      </Graphique>
      <Graphique viewport={{ x: [-5, 5], y: [-3, 3] }}>
        <Function
          f={x => Math.sin(1 / x)}
          pointCount={10000}
          className="sin-1"
        />
        <Function f={x => Math.sin(2 / x) / 2 - 1} />
        <Function f={x => Math.sin(5 / x) + 2} />
        <Function f={x => Math.cos(1 / x) - 3} pointCount={10000} />
      </Graphique>
      <Graphique viewport={{ x: [-2, 2], y: [-2, 2] }}>
        <Function f={weierstrass} pointCount={3000} />
      </Graphique>
      <Graphique viewport={{ x: [-0.5, 9], y: [-5, 81] }}>
        <Function f={x => x * x} domain={[0, 9]} />
      </Graphique>
*/
//<Arrow from={[5, 0]} to={[5, pos]} />

export default App;
