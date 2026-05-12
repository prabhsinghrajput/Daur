"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF, Center, Stage, PerspectiveCamera, Environment } from "@react-three/drei";
import { Suspense, useRef, useEffect } from "react";
import * as THREE from 'three';
import { animate } from 'framer-motion';

interface LogoModelProps {
  scrollProgress: number;
}

function LogoModel({ scrollProgress }: LogoModelProps) {
  const { scene } = useGLTF("/models/3d-text-logo.glb");
  const modelRef = useRef<THREE.Group>(null);

  // Smoothly scale up on entry with depth and rotation
  useEffect(() => {
    if (modelRef.current) {
      animate(0, 1, {
        duration: 3,
        ease: [0.19, 1, 0.22, 1], 
        onUpdate: (latest) => {
          if (modelRef.current) {
            // Scale from 0 to 25 (increased for text logo visibility)
            const s = latest * 25;
            modelRef.current.scale.set(s, s, s);
            
            // Z-Depth: Start further back and move forward
            modelRef.current.position.z = (1 - latest) * -12;
            
            // Cinematic tilt
            modelRef.current.rotation.x = (1 - latest) * 0.8;
          }
        }
      });
    }
  }, []);

  // Smoothly rotate based on scroll
  const rotationY = -Math.PI / 2 + (scrollProgress * Math.PI * 0.5);
  const rotationX = (scrollProgress * Math.PI * 0.1);

  return (
    <primitive
      ref={modelRef}
      object={scene}
      rotation={[rotationX, rotationY, 0]}
      position={[0, 0, 0]}
    />
  );
}

interface Hero3DProps {
  scrollProgress: number;
}

export default function Hero3D({ scrollProgress }: Hero3DProps) {
  return (
    <div style={{
      position: "absolute",
      top: "10vh",
      left: 0,
      width: "100%",
      height: "90vh",
      zIndex: 1,
      pointerEvents: "none"
    }}>
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
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={25} />
        <Suspense fallback={null}>
          <Stage intensity={0.8} shadows={false} environment="city">
            <Center>
              <LogoModel scrollProgress={scrollProgress} />
            </Center>
          </Stage>
          <Environment preset="city" />
          <ambientLight intensity={0.4} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        </Suspense>
      </Canvas>
    </div>
  );
}


