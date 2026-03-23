import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function ParticleField({ count = 2000, mouse }) {
    const points = useRef()

    const particlePositions = useMemo(() => {
        const positions = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20
        }
        return positions
    }, [count])

    useFrame((state) => {
        if (!points.current) return

        const time = state.clock.getElapsedTime()
        points.current.rotation.x = time * 0.02
        points.current.rotation.y = time * 0.03

        // Mouse interaction
        if (mouse.current) {
            points.current.rotation.x += mouse.current.y * 0.0005
            points.current.rotation.y += mouse.current.x * 0.0005
        }
    })

    return (
        <Points ref={points} positions={particlePositions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#00d4ff"
                size={0.02}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    )
}

function FloatingMesh({ mouse }) {
    const meshRef = useRef()

    useFrame((state) => {
        if (!meshRef.current) return

        const time = state.clock.getElapsedTime()
        meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.2
        meshRef.current.rotation.y = time * 0.1
        meshRef.current.position.y = Math.sin(time * 0.5) * 0.2

        // Mouse influence
        if (mouse.current) {
            meshRef.current.rotation.x += mouse.current.y * 0.0002
            meshRef.current.rotation.y += mouse.current.x * 0.0002
        }
    })

    return (
        <mesh ref={meshRef} position={[0, 0, -2]}>
            <icosahedronGeometry args={[1.5, 1]} />
            <meshBasicMaterial
                color="#7b2cbf"
                wireframe
                transparent
                opacity={0.3}
            />
        </mesh>
    )
}

function Scene({ mouse }) {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7b2cbf" />
            <ParticleField mouse={mouse} />
            <FloatingMesh mouse={mouse} />
        </>
    )
}

export default function HeroCanvas({ mouse }) {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 60 }}
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
            >
                <Scene mouse={mouse} />
            </Canvas>
        </div>
    )
}
