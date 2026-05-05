"use client";

import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type React from "react";

export function useCollectionHover<T extends HTMLElement = HTMLDivElement>(
  maxTilt: number = 5,
) {
  const cardRef = useRef<T>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(hover: none)").matches);
  }, []);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const rotateX = useSpring(rawX, { stiffness: 280, damping: 22, mass: 0.9 });
  const rotateY = useSpring(rawY, { stiffness: 280, damping: 22, mass: 0.9 });

  const glareGradient = useTransform(
    [glareX, glareY],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(245,207,100,0.07) 0%, transparent 55%)`,
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      if (prefersReduced || isTouchDevice || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      rawY.set(nx * maxTilt);
      rawX.set(-ny * maxTilt);
      glareX.set(((e.clientX - rect.left) / rect.width) * 100);
      glareY.set(((e.clientY - rect.top) / rect.height) * 100);
    },
    [prefersReduced, isTouchDevice, maxTilt, rawX, rawY, glareX, glareY],
  );

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return { cardRef, rotateX, rotateY, glareGradient, onMouseMove, onMouseLeave };
}
