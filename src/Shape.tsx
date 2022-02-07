import { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
// import { useUpdate } from '@react-three/fiber'

type ShapeProps = {
    points: number[][]
    [x: string]: any;
}


export default function Shape({ points, ...props }: ShapeProps) {
    const ref = useRef<THREE.BufferGeometry>(null);
    useLayoutEffect(() => {
        let vectorPoints: THREE.Vector3[] = []
        points.forEach((point) => {
            let newVectorPoint = new THREE.Vector3(point[0], point[1], point[2])
            vectorPoints.push(newVectorPoint)
        })
        let point = points[0]
        let firstVectorPoint = new THREE.Vector3(point[0], point[1], point[2])
        vectorPoints.push(firstVectorPoint)
        console.log(vectorPoints)

        // const lineGeometry = new THREE.BufferGeometry().setFromPoints(vectorPoints)
        ref.current?.setFromPoints(vectorPoints)
    }, [points])
    // const vertices = useMemo(() => points.map(point => new Three.Vector3(...point)), [points])
    return (
        <line>
            <bufferGeometry ref={ref} />
            <lineBasicMaterial color={props.color || "hotpink"} />
        </line>
    )
}

type RectangleProps = {
    x: number
    y: number
    z: number
    size: number
    color?: string
    // points: number[][]
}

export function Rectangle({ x, y, z, size, color }: RectangleProps) {
    const leftUp = [x, y, z]
    const rightUp = [x + size, y, z]
    const rightBottom = [x + size, y - size, z]
    const leftBottom = [x, y - size, z]
    const rectanglePoints = [leftUp, rightUp, rightBottom, leftBottom]

    return (
        <Shape points={rectanglePoints} color={color} />
    )
}

export function RectangleFractal({ x, y, z, size, cutoff }: { x: number, y: number, z: number, size: number, cutoff: number }) {
    if (size <= cutoff) {
        return (
            <Rectangle x={x} y={y} z={z} size={size} />
        )
    } else {
        const SubRectangleFractal = ({ x, y, z }: { x: number, y: number, z: number }) => {
            return (
                <RectangleFractal x={x} y={y} z={z} size={size / 3} cutoff={cutoff} />
            )
        }
        return (
            <>
                <SubRectangleFractal x={x} y={y} z={z} />
                <SubRectangleFractal x={x + size / 3} y={y} z={z} />
                <SubRectangleFractal x={x + 2 * size / 3} y={y} z={z} />
                <SubRectangleFractal x={x} y={y - size / 3} z={z} />
                <SubRectangleFractal x={x + 2 * size / 3} y={y - size / 3} z={z} />
                <SubRectangleFractal x={x} y={y - 2 * size / 3} z={z} />
                <SubRectangleFractal x={x + size / 3} y={y - 2 * size / 3} z={z} />
                <SubRectangleFractal x={x + 2 * size / 3} y={y - 2 * size / 3} z={z} />
            </>
        )
    }
}