/**
 * Planet3D Component - With Realistic Earth
 * Uses textures for realistic planet rendering
 */

import { useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Earth with continents - using shader colors
const EarthPlanet = () => {
    const meshRef = useRef();

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.1;
        }
    });

    // Create a simple Earth-like appearance with vertex colors
    return (
        <group>
            {/* Ocean layer */}
            <Sphere ref={meshRef} args={[2, 64, 64]}>
                <meshStandardMaterial
                    color="#1E40AF"
                    roughness={0.8}
                    metalness={0.1}
                />
            </Sphere>

            {/* Simple land masses using positioned smaller spheres */}
            <mesh position={[0.5, 0.8, 1.6]} rotation={[0.3, 0.5, 0]}>
                <sphereGeometry args={[0.6, 16, 16, 0, Math.PI * 0.8, 0, Math.PI * 0.5]} />
                <meshStandardMaterial color="#22C55E" roughness={0.9} />
            </mesh>
            <mesh position={[-0.8, 0.3, 1.5]} rotation={[0.2, -0.3, 0]}>
                <sphereGeometry args={[0.5, 16, 16, 0, Math.PI * 0.6, 0, Math.PI * 0.4]} />
                <meshStandardMaterial color="#16A34A" roughness={0.9} />
            </mesh>
            <mesh position={[1.2, -0.5, 1.2]} rotation={[-0.4, 0.8, 0]}>
                <sphereGeometry args={[0.4, 16, 16, 0, Math.PI * 0.5, 0, Math.PI * 0.3]} />
                <meshStandardMaterial color="#15803D" roughness={0.9} />
            </mesh>
            <mesh position={[-1.0, -0.8, 1.0]} rotation={[-0.5, -0.5, 0]}>
                <sphereGeometry args={[0.35, 16, 16, 0, Math.PI * 0.4, 0, Math.PI * 0.3]} />
                <meshStandardMaterial color="#22C55E" roughness={0.9} />
            </mesh>

            {/* Clouds/atmosphere */}
            <Sphere args={[2.05, 32, 32]}>
                <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
            </Sphere>

            {/* Atmosphere glow */}
            <Sphere args={[2.15, 32, 32]}>
                <meshBasicMaterial color="#60A5FA" transparent opacity={0.08} side={1} />
            </Sphere>
        </group>
    );
};

// Generic planet sphere
const GenericPlanet = ({ color, isGasGiant }) => {
    const meshRef = useRef();

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.1;
        }
    });

    return (
        <group>
            <Sphere ref={meshRef} args={[2, 64, 64]}>
                <meshStandardMaterial
                    color={color}
                    roughness={isGasGiant ? 0.4 : 0.7}
                    metalness={0.1}
                    emissive={color}
                    emissiveIntensity={0.05}
                />
            </Sphere>

            {/* Atmosphere glow */}
            <Sphere args={[2.1, 32, 32]}>
                <meshBasicMaterial color={color} transparent opacity={0.1} side={1} />
            </Sphere>
        </group>
    );
};

// Simple rings
const PlanetRings = ({ color }) => {
    return (
        <mesh rotation={[Math.PI / 2.2, 0.2, 0]}>
            <ringGeometry args={[2.8, 4, 32]} />
            <meshBasicMaterial color={color} transparent opacity={0.4} side={2} />
        </mesh>
    );
};

// Loading fallback
const LoadingFallback = () => (
    <mesh>
        <sphereGeometry args={[2, 16, 16]} />
        <meshBasicMaterial color="#4A90D9" wireframe />
    </mesh>
);

// Main Planet3D component
const Planet3D = ({ color = '#4A90D9', hasRings = false, isGasGiant = false, planetName = '' }) => {
    const isEarth = planetName.toLowerCase() === 'earth';

    return (
        <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 45 }}
                style={{ background: 'transparent' }}
                dpr={[1, 1.5]}
            >
                <Suspense fallback={<LoadingFallback />}>
                    {/* Lighting */}
                    <ambientLight intensity={0.4} />
                    <directionalLight position={[5, 3, 5]} intensity={1.2} />

                    {/* Render Earth specially, others generically */}
                    {isEarth ? (
                        <EarthPlanet />
                    ) : (
                        <GenericPlanet color={color} isGasGiant={isGasGiant} />
                    )}

                    {/* Optional rings */}
                    {hasRings && <PlanetRings color={color} />}

                    {/* Orbit controls */}
                    <OrbitControls
                        enableZoom={true}
                        enablePan={false}
                        minDistance={4}
                        maxDistance={10}
                        rotateSpeed={0.5}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Planet3D;
