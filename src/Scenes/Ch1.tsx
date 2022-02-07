import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three"
import { AmbientLight, SpotLight } from "three";
import { initStats, initTrackballControls } from "../util";
import * as dat from 'dat.gui';
import Shape from "../Shape";

export default function Ch1() {
    //     const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // position and point the camera to the center of the scene
    camera.position.set(-30, 40, 30)
    camera.lookAt(0, 0, 0);

    const stats = initStats(0);
    // const renderer = new THREE.WebGLRenderer();
    // renderer.setClearColor(new THREE.Color(0x000000));
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.shadowMap.enabled = true;
    // initialize the trackball controls and the clock which is needed
    // const trackballControls = initTrackballControls(camera, renderer);
    const clock = new THREE.Clock();

    const cube = useRef<THREE.Mesh>(null!);
    const sphere = useRef<THREE.Mesh>(null!);
    let step = 0;
    const controls = {
        rotationSpeed: 0.02,
        bouncingSpeed: 0.03
    }
    const gui = new dat.GUI()
    gui.add(controls, 'rotationSpeed', 0, 0.5);
    gui.add(controls, 'bouncingSpeed', 0, 0.5);

    // useFrame(() => {
    //     // update the stats and the controls
    //     trackballControls.update(clock.getDelta());
    //     stats.update();
    //     cube.current.rotation.x += controls.rotationSpeed;
    //     cube.current.rotation.y += controls.rotationSpeed;
    //     cube.current.rotation.z += controls.rotationSpeed;
    //     console.log(cube.current.position)
    //     step += controls.bouncingSpeed;
    //     sphere.current.position.x = 20 + (10 * (Math.cos(step)));
    //     sphere.current.position.y = 2 + (10 * Math.abs(Math.sin(step)));
    // })
    useEffect(() => {
        const resize = () => {

        }
    })
    const points = [[0, 0, 0], [2, 2, 0], [2, -2, 0]]
    return (
        <Canvas
            camera={camera}
            shadows={true}
        >
            <color attach="background" args={["black"]} />
            <ambientLight color={"0x353535"} />
            <spotLight
                color={"0xffffff"}
                position={new THREE.Vector3(-10, 20, -5)}
                castShadow={true}
            />
            {/* <primitive object={new THREE.AxesHelper(10)} /> */}
            {/* <Shape points={points} /> */}
            <mesh
                receiveShadow={true}
                position={new THREE.Vector3(15, 0, 0)}
                rotation={new THREE.Euler(-0.5 * Math.PI, 0, 0)}
            >
                <planeGeometry args={[60, 20, 2, 1]} />
                <meshLambertMaterial color={"silver"} />
            </mesh>
            <Cube controls={controls} />
            <Sphere controls={controls} step={step} />
            {/* <mesh
                ref={cube}
                castShadow={true}
                position={new THREE.Vector3(-4, 3, 0)}
            >
                <boxGeometry args={[4, 4, 4]} />
                <meshLambertMaterial color={"0xff0000"} />
            </mesh>
            <mesh
                ref={sphere}
                castShadow={true}
                position={new THREE.Vector3(20, 0, 2)}
            >
                <sphereGeometry args={[4, 20, 20]} />
                <meshLambertMaterial color={"0x7777ff"} />
            </mesh> */}
        </Canvas>
    )
}

const Cube = ({ controls }) => {
    const cube = useRef<THREE.Mesh>(null!);
    useFrame(() => {
        cube.current.rotation.x += controls.rotationSpeed;
        cube.current.rotation.y += controls.rotationSpeed;
        cube.current.rotation.z += controls.rotationSpeed;
    })
    return (
        <mesh
            ref={cube}
            castShadow={true}
            position={new THREE.Vector3(-4, 3, 0)}
        >
            <boxGeometry args={[4, 4, 4]} />
            <meshLambertMaterial color={new THREE.Color(0xff0000)} />
        </mesh>
    )
}

const Sphere = ({ step, controls }) => {
    const sphere = useRef<THREE.Mesh>(null!);
    useFrame(() => {
        // update the stats and the controls
        step += controls.bouncingSpeed;
        sphere.current.position.x = 20 + (10 * (Math.cos(step)));
        sphere.current.position.y = 2 + (10 * Math.abs(Math.sin(step)));
    })
    return (
        <mesh
            ref={sphere}
            castShadow={true}
            position={new THREE.Vector3(20, 0, 2)}
        >
            <sphereGeometry args={[4, 20, 20]} />
            <meshLambertMaterial color={new THREE.Color(0x7777ff)} />
        </mesh>
    )
}