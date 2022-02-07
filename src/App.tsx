import React from 'react';
import { Canvas } from '@react-three/fiber'
import Box from './Box'
import Shape, { Rectangle, RectangleFractal } from './Shape';
import * as THREE from 'three';
import FractalScene from './Scenes/Fractals';
import Ch1 from './Scenes/Ch1';



function App() {
  return (
    <>
      <div style={{ height: '90%' }}>
        <Ch1 />
      </div>
      <button />
    </>
  );
}

export default App;
