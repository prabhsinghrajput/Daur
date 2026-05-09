"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF, Center, Float, Stage, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";

interface LogoModelProps {
  scrollProgress: number;
}

function LogoModel({ scrollProgress }: LogoModelProps) {
  const { scene } = useGLTF("/3d-text-logo.glb");

  // Fixed transformations
  const rotationX = 0;
  const rotationY = -Math.PI / 2; // Front view
  const positionX = 0;
  const positionY = 0; // Shifted down to add top padding

  return (
    <primitive
      object={scene}
      scale={4}
      rotation={[rotationX, rotationY, 0]}
      position={[positionX, positionY, 0]}
    />
  );




}

interface Hero3DProps {
  scrollProgress: number;
}

export default function Hero3D({ scrollProgress }: Hero3DProps) {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
      <Canvas
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={40} />
        <Suspense fallback={null}>
          <Stage environment="studio" intensity={0.5} shadows={false}>

            <Center>
              <LogoModel scrollProgress={scrollProgress} />
            </Center>
          </Stage>
        </Suspense>
      </Canvas>
    </div>
  );
}


