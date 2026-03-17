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

  const rotations: Record<string, [number, number, number]> = {
    "0,0,0.51": [0, 0, 0],
    "0,0,-0.51": [0, Math.PI, 0],
    "0.51,0,0": [0, Math.PI / 2, 0],
    "-0.51,0,0": [0, -Math.PI / 2, 0],
    "0,0.51,0": [-Math.PI / 2, 0, 0],
    "0,-0.51,0": [Math.PI / 2, 0, 0],
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

const Dice = () => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      meshRef.current.rotation.x = t * 0.5;
      meshRef.current.rotation.y = t * 0.7;
    }
  });

  return (
    <group ref={meshRef}>
      <RoundedBox args={[1, 1, 1]} radius={0.1} smoothness={4}>
        <meshStandardMaterial color="hsl(199, 89%, 58%)" />
      </RoundedBox>
      <DiceFace face={1} offset={[0, 0, 0.51]} />
      <DiceFace face={6} offset={[0, 0, -0.51]} />
      <DiceFace face={3} offset={[0.51, 0, 0]} />
      <DiceFace face={4} offset={[-0.51, 0, 0]} />
      <DiceFace face={5} offset={[0, 0.51, 0]} />
      <DiceFace face={2} offset={[0, -0.51, 0]} />
    </group>
  );
};

const RollingDice = () => {
  return (
    <div className="w-40 h-40 md:w-56 md:h-56 mx-auto">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-3, -3, 2]} intensity={0.5} color="hsl(199, 89%, 58%)" />
        <Dice />
      </Canvas>
    </div>
  );
};

export default RollingDice;
