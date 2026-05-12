"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera, Environment, Center } from "@react-three/drei";
import { Suspense, useRef, useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { animate } from "framer-motion";

interface LogoModelProps {
  scrollProgress: number;
}

function LogoModel({ scrollProgress }: LogoModelProps) {
  const { scene } = useGLTF("/models/3d-text-logo-final.glb");
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const [hasAnimated, setHasAnimated] = useState(false);

  // Clone scene to avoid mutating cache
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // Determine base rotation and scale
  const { fitScale, baseRotationY } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = new THREE.Vector3();
    box.getSize(size);

    // Detect orientation based on widest axis
    let rotY = 0;
    let textWidth = size.x;
    let textHeight = size.y;

    if (size.z > size.x) {
      rotY = -Math.PI / 2; // Face the camera
      textWidth = size.z;
    }

    // Increased scale to fit ~50% width or ~35% height
    const scaleByWidth = (viewport.width * 0.50) / textWidth;
    const scaleByHeight = (viewport.height * 0.35) / textHeight;
    const s = Math.min(scaleByWidth, scaleByHeight);

    return {
      fitScale: s,
      baseRotationY: rotY,
    };
  }, [clonedScene, viewport.width, viewport.height]);

  // Entry animation - only runs once on mount
  useEffect(() => {
    if (groupRef.current && !hasAnimated) {
      groupRef.current.scale.set(0, 0, 0);
      animate(0, 1, {
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          if (groupRef.current) {
            const s = latest * fitScale;
            groupRef.current.scale.set(s, s, s);
          }
        },
        onComplete: () => setHasAnimated(true)
      });
    } else if (groupRef.current && hasAnimated) {
      // If already animated, just update scale immediately on resize
      groupRef.current.scale.set(fitScale, fitScale, fitScale);
    }
  }, [fitScale, hasAnimated]);

  // Scroll rotation: slightly rotate to show "both sides" (3D look)
  // Reset to 0 degree offset for a "straight look" as per image 2
  const rotationY = baseRotationY + (0 * Math.PI / 180) + (scrollProgress * Math.PI * 0.2);

  return (
    <group ref={groupRef} rotation={[0, rotationY, 0]}>
      <Center>
        <primitive object={clonedScene} />
      </Center>
    </group>
  );
}

interface Hero3DProps {
  scrollProgress: number;
}

export default function Hero3D({ scrollProgress }: Hero3DProps) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 10, // Increased zIndex to ensure it stays on top
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false,
        }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={40} />
        <Suspense fallback={null}>
          <LogoModel scrollProgress={scrollProgress} />
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 10]} intensity={1.2} />
          <directionalLight position={[-10, 5, 5]} intensity={0.5} />
          <spotLight position={[0, 10, 0]} intensity={0.8} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
