import { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

type ShapeProps = {
    points: number[][]
    [x: string]: any;
}


export default function Shape({ points, ...props }: ShapeProps) {
    const ref = useRef<THREE.Line>(null!)
    // const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(2, 2, 0), new THREE.Vector3(-2, 2, 0)]

    useLayoutEffect(() => {
        let vectorPoints: THREE.Vector3[] = []
        points.forEach((point) => {
            let newVectorPoint = new THREE.Vector3(point[0], point[1], point[2])
            vectorPoints.push(newVectorPoint)
        })
        console.log(vectorPoints)

        // const lineGeometry = new THREE.BufferGeometry().setFromPoints(vectorPoints)
        ref.current.geometry.setFromPoints(vectorPoints)
    })
    // const vertices = useMemo(() => points.map(point => new Three.Vector3(...point)), [points])
    return (
        <mesh ref={ref}>
            {/* <bufferGeometry setFromPoints={vertices} /> */}
            <bufferGeometry />
            <lineBasicMaterial color={'#9c88ff'} />
        </mesh>
    )
}

type RectangleProps = {
    x: number
    y: number
    z: number
    size: number
    // points: number[][]
}

export function Rectangle({ x, y, z, size }: RectangleProps) {
    const leftUp = [x, y, z]
    const rightUp = [x + size, y, z]
    const rightBottom = [x + size, y - size, z]
    const leftBottom = [x, y - size, z]
    const rectanglePoints = [leftUp, rightUp, rightBottom, leftBottom]

    return (
        <Shape points={rectanglePoints} />
    )
}