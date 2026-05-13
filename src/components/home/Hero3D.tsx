"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Hero3DProps {
  scrollProgress: number;
  isLoading?: boolean;
}

export default function Hero3D({ scrollProgress, isLoading = false }: Hero3DProps) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Responsive parallax values
  const yOffset = isMobile ? 20 : 100;
  const scale = 1 + scrollProgress * 0.1;
  const opacity = 1 - scrollProgress * 1.5;
  const y = yOffset + (scrollProgress * (isMobile ? 20 : 50));

  if (!mounted) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 10,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
      }}
    >
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: yOffset + 20 }}
            animate={{ opacity: 1, scale: 1, y: yOffset }}
            exit={{ opacity: 0, scale: 0.9, y: yOffset + 20 }}
            transition={{
              duration: 1.0,
              ease: [0.16, 1, 0.3, 1]
            }}
            style={{
              width: isMobile ? "90%" : "100%",
              maxWidth: isMobile ? "400px" : "1000px",
              height: isMobile ? "60%" : "100%",
              position: "relative",
              scale: scale,
              opacity: opacity,
              y: y,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              src="/images/hero/DaurHero2.png"
              alt="DAUR"
              fill
              priority
              style={{
                objectFit: "contain",
                filter: isMobile 
                  ? "drop-shadow(0 10px 30px rgba(0,0,0,0.25))" 
                  : "drop-shadow(0 20px 50px rgba(0,0,0,0.3))"
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
