"use client";

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'motion/react';
import styles from './catalogue.module.css';

interface ProgressBarProps {
  activeIndex: number;
  duration: number; // in milliseconds
  isPaused: boolean;
}

export default function ProgressBar({ activeIndex, duration, isPaused }: ProgressBarProps) {
  const controls = useAnimation();

  useEffect(() => {
    if (isPaused) {
      controls.stop();
    } else {
      // Start or resume animation
      controls.start({
        width: "100%",
        transition: {
          duration: duration / 1000,
          ease: "linear",
        }
      });
    }
  }, [isPaused, controls, duration, activeIndex]);

  useEffect(() => {
    // Reset on index change
    controls.set({ width: "0%" });
    if (!isPaused) {
      controls.start({
        width: "100%",
        transition: {
          duration: duration / 1000,
          ease: "linear",
        }
      });
    }
  }, [activeIndex, controls, duration, isPaused]);

  return (
    <div className={styles.progressContainer}>
      <motion.div
        className={styles.progressFill}
        initial={{ width: "0%" }}
        animate={controls}
      />
    </div>
  );
}
