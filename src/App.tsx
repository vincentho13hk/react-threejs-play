import React from 'react';
import { Canvas } from '@react-three/fiber'
import Box from './Box'
import Shape, { Rectangle } from './Shape';



function App() {
  const points = [[0, 0, 0], [2, 2, 0], [-2, 2, 0]]
  return (
    <div>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {/* <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} /> */}
        <Shape points={points} />
        {/* <Rectangle x={0} y={0} z={0} size={2} /> */}
      </Canvas>
    </div>
  );
}

export default App;
