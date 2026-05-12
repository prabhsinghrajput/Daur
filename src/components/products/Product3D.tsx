"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF, Center, Stage, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";

interface ModelProps {
  modelPath: string;
}

function Model({ modelPath }: ModelProps) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={2.5} />;
}

export default function Product3D({ modelPath, fallbackImage }: { modelPath: string, fallbackImage?: string }) {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Canvas
        gl={{ 
          antialias: true, 
          alpha: true, 
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false
        }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={35} />
        <Suspense fallback={null}>
          <Stage environment="studio" intensity={0.5} shadows={false}>
            <Center>
              <Model modelPath={modelPath} />
            </Center>
          </Stage>
        </Suspense>
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}
