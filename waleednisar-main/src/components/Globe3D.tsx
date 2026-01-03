import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Animated globe with wireframe effect
const GlobeCore = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = state.clock.elapsedTime * 0.12;
      wireframeRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group>
        {/* Inner glow sphere */}
        <mesh ref={glowRef} scale={1.8}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color="#3b82f6"
            transparent
            opacity={0.05}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Main distorted sphere */}
        <mesh ref={meshRef} scale={1.5}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color="#3b82f6"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Wireframe overlay */}
        <mesh ref={wireframeRef} scale={1.52}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshBasicMaterial
            color="#60a5fa"
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Outer ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]} scale={2}>
          <torusGeometry args={[1, 0.01, 16, 100]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.5} />
        </mesh>

        {/* Second ring at angle */}
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]} scale={2.2}>
          <torusGeometry args={[1, 0.008, 16, 100]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} />
        </mesh>
      </group>
    </Float>
  );
};

// Floating particles around the globe
const GlobeParticles = () => {
  const count = 80; // Reduced for performance
  const particlesRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Create a spherical distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 3 + Math.random() * 2;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Blue to purple gradient
      const t = Math.random();
      colors[i * 3] = 0.23 + t * 0.43;
      colors[i * 3 + 1] = 0.51 - t * 0.18;
      colors[i * 3 + 2] = 0.96 - t * 0.03;
    }
    
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

// Orbiting dots
const OrbitingDots = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 2.5;
        const y = Math.sin(angle) * 2.5;
        return (
          <mesh key={i} position={[x, y, 0]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color={i % 2 === 0 ? "#3b82f6" : "#a855f7"} />
          </mesh>
        );
      })}
    </group>
  );
};

// Connection lines between random points
const ConnectionLines = () => {
  const linesRef = useRef<THREE.Group>(null);
  
  const lines = useMemo(() => {
    const lineData = [];
    for (let i = 0; i < 6; i++) {
      const theta1 = Math.random() * Math.PI * 2;
      const phi1 = Math.acos(2 * Math.random() - 1);
      const theta2 = Math.random() * Math.PI * 2;
      const phi2 = Math.acos(2 * Math.random() - 1);
      const radius = 1.55;
      
      lineData.push({
        start: new THREE.Vector3(
          radius * Math.sin(phi1) * Math.cos(theta1),
          radius * Math.sin(phi1) * Math.sin(theta1),
          radius * Math.cos(phi1)
        ),
        end: new THREE.Vector3(
          radius * Math.sin(phi2) * Math.cos(theta2),
          radius * Math.sin(phi2) * Math.sin(theta2),
          radius * Math.cos(phi2)
        ),
      });
    }
    return lineData;
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={linesRef}>
      {lines.map((line, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                line.start.x, line.start.y, line.start.z,
                line.end.x, line.end.y, line.end.z,
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#60a5fa" transparent opacity={0.4} />
        </line>
      ))}
    </group>
  );
};

const Globe3D = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`absolute ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
        <spotLight
          position={[5, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          color="#60a5fa"
        />
        
        <GlobeCore />
        <GlobeParticles />
        <OrbitingDots />
        <ConnectionLines />
      </Canvas>
    </div>
  );
};

export default Globe3D;
