import React from 'react';
import { Canvas } from '@react-three/fiber'
import Shape, { Rectangle, RectangleFractal } from '../Shape';
import * as THREE from 'three';



function FractalScene() {
    const points = [[0, 0, 0], [2, 2, 0], [2, -2, 0]]
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    camera.position.set(-30, 40, 30);
    camera.lookAt(0, 0, 0);
    return (
        <Canvas
            camera={camera}
        >
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {/* <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} /> */}
            {/* <Shape points={points} /> */}
            {/* <Rectangle x={0} y={0} z={0} size={2} /> */}
            <primitive object={new THREE.AxesHelper(10)} />
            <RectangleFractal x={0} y={0} z={-20} size={20} cutoff={1} />
        </Canvas>
    );
}

export default FractalScene;
