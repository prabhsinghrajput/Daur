"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Preloader.module.css';

const Preloader: React.FC<{ onComplete: () => void, onLogoArrived?: () => void }> = ({ onComplete, onLogoArrived }) => {
  const [phase, setPhase] = useState<'zoom' | 'hold' | 'flyout' | 'exit'>('zoom');
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const zoomDuration = 2400;
    const holdDuration = zoomDuration + 400;
    const flyoutDuration = holdDuration + 600;
    const exitDuration = flyoutDuration + 800;
    const completeDuration = exitDuration + 600;

    const holdTimer = setTimeout(() => setPhase('hold'), holdDuration);
    const flyoutTimer = setTimeout(() => setPhase('flyout'), flyoutDuration);
    const exitTimer = setTimeout(() => {
      onLogoArrived?.();
      setPhase('exit');
    }, exitDuration);
    const completeTimer = setTimeout(() => {
      onLogoArrived?.();
      onComplete();
      setVisible(false);
    }, completeDuration);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(flyoutTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, onLogoArrived]);

  if (!visible) return null;

  const navbarHeight = isMobile ? 70 : 80;
  const navbarLogoSize = isMobile ? 35 : 45;
  const navbarLogoTop = (navbarHeight - navbarLogoSize) / 2;

  const smoothEase = [0.25, 0.46, 0.45, 0.94];
  const smoothOut = [0.16, 1, 0.3, 1];

  return (
    <div
      className={styles.overlay}
      style={{
        pointerEvents: phase === 'exit' ? 'none' : 'auto',
      }}
    >
      <motion.div
        className={styles.bg}
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'exit' ? 0 : 1 }}
        transition={{ duration: 1.0, ease: smoothEase }}
      />

      <motion.div
        className={styles.logoContainer}
        initial={{ 
          opacity: 0,
          scale: 0.02,
          y: 0,
          filter: 'blur(30px) brightness(1.2)',
        }}
        animate={{
          opacity: phase === 'zoom' || phase === 'hold' ? 1 : phase === 'flyout' ? 1 : 0,
          scale: phase === 'zoom' ? 1.4 : phase === 'hold' ? 1.4 : phase === 'flyout' ? (isMobile ? 0.25 : 0.28) : (isMobile ? 0.25 : 0.28),
          y: phase === 'flyout' || phase === 'exit' ? `calc(-50vh + ${navbarLogoTop + navbarLogoSize / 2}px)` : 0,
          filter: phase === 'zoom' ? 'blur(0px) brightness(1)' : phase === 'hold' ? 'blur(0px) brightness(1)' : 'blur(0px) brightness(1)',
        }}
        transition={{
          duration: phase === 'zoom' ? 2.4 : phase === 'flyout' ? 1.0 : 0.8,
          ease: phase === 'zoom' ? smoothEase : smoothOut,
        }}
      >
        <img
          src="/images/hero/logo.png"
          alt="DAUR Logo"
          className={styles.logo}
        />
      </motion.div>

      {phase === 'zoom' && (
        <>
          <motion.div
            className={styles.ring}
            initial={{ scale: 0, opacity: 0.4, borderWidth: '3px' }}
            animate={{ scale: 4, opacity: 0, borderWidth: '1px' }}
            transition={{ duration: 2.4, ease: smoothEase }}
          />
          <motion.div
            className={`${styles.ring} ${styles.ringDelay}`}
            initial={{ scale: 0, opacity: 0.3, borderWidth: '2px' }}
            animate={{ scale: 3, opacity: 0, borderWidth: '0.5px' }}
            transition={{ duration: 2.0, delay: 0.3, ease: smoothEase }}
          />
        </>
      )}
    </div>
  );
};

export default Preloader;
