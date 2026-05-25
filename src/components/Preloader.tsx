"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './Preloader.module.css';

const Preloader: React.FC<{ onComplete: () => void, onLogoArrived?: () => void }> = ({ onComplete, onLogoArrived }) => {
  const [phase, setPhase] = useState<'zoom' | 'hold' | 'reveal' | 'exit'>('zoom');
  const [visible, setVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sound playback with autoplay and user interaction handling
  useEffect(() => {
    const audio = new Audio('/clock_sound.mp3');
    audio.loop = true;
    audioRef.current = audio;

    let isPlaying = false;

    const playAudio = () => {
      if (isPlaying) return;
      audio.play()
        .then(() => {
          isPlaying = true;
          removeInteractionListeners();
        })
        .catch((err) => {
          console.warn("Autoplay prevented or failed to play clock sound:", err);
        });
    };

    const handleInteraction = () => {
      playAudio();
    };

    const addInteractionListeners = () => {
      window.addEventListener('click', handleInteraction);
      window.addEventListener('keydown', handleInteraction);
      window.addEventListener('touchstart', handleInteraction);
    };

    const removeInteractionListeners = () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };

    // Attempt to play immediately
    playAudio();

    // Fallback if browser blocked autoplay
    if (!isPlaying) {
      addInteractionListeners();
    }

    return () => {
      removeInteractionListeners();
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Handle fading out the clock sound when the preloader phase transitions to reveal/exit
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (phase === 'reveal' || phase === 'exit') {
      let volume = 1;
      const fadeInterval = setInterval(() => {
        if (volume > 0.05) {
          volume -= 0.05;
          audio.volume = volume;
        } else {
          audio.volume = 0;
          audio.pause();
          clearInterval(fadeInterval);
        }
      }, 25); // Fade out over 500ms (20 steps of 25ms)

      return () => clearInterval(fadeInterval);
    }
  }, [phase]);

  useEffect(() => {
    const zoomDuration = 2400;
    const holdDuration = zoomDuration + 400;
    const revealDuration = holdDuration + 600;
    const exitDuration = revealDuration + 1000;

    const holdTimer = setTimeout(() => setPhase('hold'), holdDuration);
    const revealTimer = setTimeout(() => {
      onLogoArrived?.();
      setPhase('reveal');
    }, revealDuration);
    const exitTimer = setTimeout(() => {
      onComplete();
      setVisible(false);
    }, exitDuration);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(revealTimer);
      clearTimeout(exitTimer);
    };
  }, [onComplete, onLogoArrived]);

  if (!visible) return null;

  const smoothEase: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
  const sharpEase: [number, number, number, number] = [0.6, 0.01, -0.05, 0.95];

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
        animate={{ opacity: phase === 'reveal' || phase === 'exit' ? 0 : 1 }}
        transition={{ duration: 0.8, ease: smoothEase }}
      />

      <div className={styles.contentWrapper}>
        <motion.div
          className={styles.logoContainer}
          initial={{ 
            opacity: 0,
            scale: 0.02,
            filter: 'blur(30px)',
          }}
          animate={{
            opacity: phase === 'reveal' || phase === 'exit' ? 0 : 1,
            scale: phase === 'zoom' ? 1.4 : phase === 'hold' ? 1.4 : 20,
            filter: 'blur(0px)',
          }}
          transition={{
            duration: phase === 'zoom' ? 2.4 : phase === 'hold' ? 0.6 : 1.2,
            ease: phase === 'reveal' ? sharpEase : smoothEase,
          }}
        >
          <img
            src="/images/hero/logo.png"
            alt="DAUR Logo"
            className={styles.logo}
          />
          <motion.div
            className={styles.clockNeedle}
            initial={{ rotate: 0, opacity: 0 }}
            animate={{ 
              rotate: phase === 'zoom' ? 360 : 720,
              opacity: phase === 'zoom' || phase === 'hold' ? 1 : 0,
            }}
            transition={{ 
              duration: phase === 'zoom' ? 2.4 : 0.6, 
              ease: 'linear' 
            }}
          />
        </motion.div>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 15 }}
          animate={{
            opacity: phase === 'reveal' || phase === 'exit' ? 0 : 1,
            y: phase === 'reveal' || phase === 'exit' ? -15 : 0,
          }}
          transition={{
            duration: 1.0,
            delay: 0.6,
            ease: smoothEase,
          }}
        >
          Built for movement. Designed for everyday luxury.
        </motion.p>
      </div>

      <motion.div
        className={styles.reveal}
        initial={{ scale: 0 }}
        animate={{
          scale: phase === 'reveal' ? 1 : 0,
        }}
        transition={{
          duration: 1.2,
          ease: sharpEase,
        }}
      />
    </div>
  );
};

export default Preloader;
