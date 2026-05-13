"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, animate, useMotionValue } from 'framer-motion';
import styles from './Preloader.module.css';

// Animated counter that reads from a motion value
const LoadingCounter = ({ value }: { value: any }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    return value.on("change", (latest: number) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [value]);

  return (
    <span className={styles.counterValue}>
      {String(displayValue).padStart(3, '0')}
    </span>
  );
};

/*
  Phase sequence:
  1. loading  – "DAUR" text fades in, progress bar counts up
  2. split    – "DA" slides left, "UR" slides right, logo scales up from center
  3. flyout   – Logo flies to navbar position, text fades, underline fades
  4. exit     – White background fades out to reveal hero, then call onComplete
*/

const Preloader: React.FC<{ onComplete: () => void, onLogoArrived?: () => void }> = ({ onComplete, onLogoArrived }) => {
  const [phase, setPhase] = useState<'loading' | 'split' | 'flyout' | 'exit'>('loading');
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const progress = useMotionValue(0);
  const logoRef = useRef<HTMLImageElement>(null);
  const animationStarted = useRef(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (animationStarted.current) return;
    animationStarted.current = true;

    const controls = animate(progress, 100, {
      duration: 2.4,
      ease: [0.76, 0, 0.24, 1],
      onComplete: () => {
        // Phase 2: Split text, reveal logo
        setTimeout(() => setPhase('split'), 200);
        // Phase 3: Fly logo to navbar
        setTimeout(() => setPhase('flyout'), 2000);
        // Logo Arrives at navbar position
        setTimeout(() => onLogoArrived?.(), 3200);
        // Phase 4: Fade out background
        setTimeout(() => setPhase('exit'), 3200);
        // Done: remove from DOM
        setTimeout(() => {
          onComplete();
          setVisible(false);
        }, 4600);
      }
    });

    return () => controls.stop();
  }, [onComplete, progress]);

  if (!visible) return null;

  // Navbar dimensions differ between mobile and desktop
  const navbarHeight = isMobile ? 70 : 80;
  const navbarLogoSize = isMobile ? 35 : 45;
  const navbarLogoTop = (navbarHeight - navbarLogoSize) / 2;

  return (
    <div
      className={styles.overlay}
      style={{
        pointerEvents: phase === 'exit' ? 'none' : 'auto',
      }}
    >
      {/* White background that fades out in exit phase */}
      <motion.div
        className={styles.bg}
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'exit' ? 0 : 1 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Subtle grain texture overlay */}
      <motion.div
        className={styles.grain}
        animate={{ opacity: phase === 'exit' ? 0 : 1 }}
        transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Top line accent */}
      <motion.div
        className={styles.topLine}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: phase === 'loading' ? 1 : 0 }}
        transition={{ duration: 2.4, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Center: DAUR Text splitting to reveal Logo */}
      <div className={styles.centerStage}>
        <div className={styles.wordRow}>
          {/* "DA" text */}
          <motion.span
            className={styles.letter}
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity:
                phase === 'loading' ? 1 :
                  phase === 'split' ? 1 :
                    0,
              y: 0,
              x:
                phase === 'loading' ? 0 :
                  phase === 'split' ? (isMobile ? '-8vw' : '-6vw') :
                    (isMobile ? '-8vw' : '-6vw'),
            }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            DA
          </motion.span>

          {/* Logo image – scales up from center, then flies to navbar */}
          <motion.img
            ref={logoRef}
            src="/images/hero/logo.png"
            alt="DAUR Logo"
            className={styles.centerLogo}
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{
              opacity:
                phase === 'loading' ? 0 :
                  phase === 'split' ? 1 :
                    phase === 'flyout' ? 1 : 0,
              scale:
                phase === 'loading' ? 0 :
                  phase === 'split' ? 1 :
                    phase === 'flyout' || phase === 'exit' ? (isMobile ? 0.28 : 0.32) : (isMobile ? 0.28 : 0.32),
              y:
                phase === 'flyout' || phase === 'exit' ? `calc(-50vh + ${navbarLogoTop + navbarLogoSize / 2}px)` : 0,
              x: 0,
            }}
            transition={{
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1], // Very smooth expo-out, no bounce
            }}
          />

          {/* "UR" text */}
          <motion.span
            className={styles.letter}
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity:
                phase === 'loading' ? 1 :
                  phase === 'split' ? 1 :
                    0,
              y: 0,
              x:
                phase === 'loading' ? 0 :
                  phase === 'split' ? (isMobile ? '8vw' : '6vw') :
                    (isMobile ? '8vw' : '6vw'),
            }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            UR
          </motion.span>
        </div>

        {/* Underline accent */}
        <motion.div
          className={styles.underline}
          initial={{ scaleX: 0 }}
          animate={{
            scaleX:
              phase === 'split' ? 1 : 0,
          }}
          transition={{
            duration: 1.0,
            delay: phase === 'split' ? 0.3 : 0,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </div>

      {/* Bottom bar: progress + counter */}
      <div className={styles.bottomBar}>
        <motion.div
          className={styles.progressTrack}
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === 'loading' ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className={styles.progressFill}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.4, ease: [0.76, 0, 0.24, 1] }}
          />
        </motion.div>

        <motion.div
          className={styles.counterContainer}
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === 'loading' ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <LoadingCounter value={progress} />
        </motion.div>
      </div>

      {/* Subtle corner text */}
      <motion.div
        className={styles.cornerText}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'loading' ? 0.3 : 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        EST. 2025
      </motion.div>
    </div>
  );
};

export default Preloader;
