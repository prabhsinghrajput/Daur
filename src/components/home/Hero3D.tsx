"use client";

import { Canvas } from "@react-three/fiber";
import { Text3D, Center } from "@react-three/drei";
import { Suspense } from "react";

function DaurText() {
  return (
    <Center>
      <Text3D
        font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
        size={2.2}
        height={0.5}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.03}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        DAUR
        <meshStandardMaterial
          color="#000000"
          roughness={0.35}
          metalness={0.05}
        />
      </Text3D>
    </Center>
  );
}

export default function Hero3D() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 5 }}>
      <Canvas
        camera={{ fov: 35, position: [0, 0, 10] }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[-5, 8, 5]} intensity={1.5} />
        <directionalLight position={[5, -3, 3]} intensity={0.3} />
        <Suspense fallback={null}>
          <DaurText />
        </Suspense>
      </Canvas>
    </div>
  );
}
