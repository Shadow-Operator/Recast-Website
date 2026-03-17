import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const DiceDot = ({ position }: { position: [number, number, number] }) => (
  <mesh position={position}>
    <sphereGeometry args={[0.08, 16, 16]} />
    <meshStandardMaterial color="#1a1a2e" />
  </mesh>
);

const DiceFace = ({ face, offset }: { face: number; offset: [number, number, number] }) => {
  const dots: Record<number, [number, number, number][]> = {
    1: [[0, 0, 0]],
    2: [[-0.2, 0.2, 0], [0.2, -0.2, 0]],
    3: [[-0.2, 0.2, 0], [0, 0, 0], [0.2, -0.2, 0]],
    4: [[-0.2, 0.2, 0], [0.2, 0.2, 0], [-0.2, -0.2, 0], [0.2, -0.2, 0]],
    5: [[-0.2, 0.2, 0], [0.2, 0.2, 0], [0, 0, 0], [-0.2, -0.2, 0], [0.2, -0.2, 0]],
    6: [[-0.2, 0.2, 0], [0.2, 0.2, 0], [-0.2, 0, 0], [0.2, 0, 0], [-0.2, -0.2, 0], [0.2, -0.2, 0]],
  };

  // Rotate dots to align with the face normal
  const rotations: Record<string, [number, number, number]> = {
    "0,0,0.51": [0, 0, 0],         // front (face towards camera)
    "0,0,-0.51": [0, Math.PI, 0],   // back
    "0.51,0,0": [0, Math.PI / 2, 0], // right
    "-0.51,0,0": [0, -Math.PI / 2, 0], // left
    "0,0.51,0": [-Math.PI / 2, 0, 0],  // top
    "0,-0.51,0": [Math.PI / 2, 0, 0],  // bottom
  };

  const key = offset.join(",");
  const rot = rotations[key] || [0, 0, 0];

  return (
    <group position={offset} rotation={rot}>
      {(dots[face] || []).map((pos, i) => (
        <DiceDot key={i} position={pos} />
      ))}
    </group>
  );
};

const Dice = ({ scrollProgress }: { scrollProgress: { current: number } }) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (meshRef.current) {
      const p = scrollProgress.current;
      // Spin the dice as scroll progresses
      meshRef.current.rotation.x = p * Math.PI * 4;
      meshRef.current.rotation.y = p * Math.PI * 3;
      meshRef.current.rotation.z = p * Math.PI * 2;
      // Scale up as it comes into view
      const scale = 0.5 + p * 0.5;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={meshRef}>
      <RoundedBox args={[1, 1, 1]} radius={0.1} smoothness={4}>
        <meshStandardMaterial color="hsl(199, 89%, 58%)" />
      </RoundedBox>
      {/* 6 faces */}
      <DiceFace face={1} offset={[0, 0, 0.51]} />
      <DiceFace face={6} offset={[0, 0, -0.51]} />
      <DiceFace face={3} offset={[0.51, 0, 0]} />
      <DiceFace face={4} offset={[-0.51, 0, 0]} />
      <DiceFace face={5} offset={[0, 0.51, 0]} />
      <DiceFace face={2} offset={[0, -0.51, 0]} />
    </group>
  );
};

const RollingDice = ({ scrollProgress }: { scrollProgress: { current: number } }) => {
  return (
    <div className="w-32 h-32 md:w-48 md:h-48 mx-auto">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-3, -3, 2]} intensity={0.5} color="hsl(199, 89%, 58%)" />
        <Dice scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};

export default RollingDice;
