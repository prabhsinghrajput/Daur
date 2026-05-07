"use client";

import React, { useRef } from 'react';
import { animate } from 'animejs';
import styles from './catalogue.module.css';
import ProgressBar from './ProgressBar';

interface NavigationControlsProps {
  onPrev: () => void;
  onNext: () => void;
  activeIndex: number;
  totalSlides: number;
  autoAdvanceMs: number;
  isPaused: boolean;
}

export default function NavigationControls({
  onPrev,
  onNext,
  activeIndex,
  totalSlides,
  autoAdvanceMs,
  isPaused
}: NavigationControlsProps) {
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const handleHover = (el: HTMLElement | null, xOffset: number) => {
    if (el) {
      animate(el, {
        translateX: xOffset,
        duration: 300,
        easing: 'easeOutExpo'
      });
    }
  };

  const handleLeave = (el: HTMLElement | null) => {
    if (el) {
      animate(el, {
        translateX: 0,
        duration: 300,
        easing: 'easeOutExpo'
      });
    }
  };

  return (
    <>
      <div className={styles.counter}>
        {String(activeIndex + 1).padStart(2, '0')}
        <span className={styles.counterTotal}> / {String(totalSlides).padStart(2, '0')}</span>
      </div>

      <div className={styles.progressRow}>
        <button
          ref={prevBtnRef}
          className={styles.navBtn}
          onClick={onPrev}
          onMouseEnter={() => handleHover(prevBtnRef.current, -4)}
          onMouseLeave={() => handleLeave(prevBtnRef.current)}
        >
          ← PREV
        </button>

        <ProgressBar 
          activeIndex={activeIndex} 
          duration={autoAdvanceMs} 
          isPaused={isPaused} 
        />

        <button
          ref={nextBtnRef}
          className={styles.navBtn}
          onClick={onNext}
          onMouseEnter={() => handleHover(nextBtnRef.current, 4)}
          onMouseLeave={() => handleLeave(nextBtnRef.current)}
        >
          NEXT →
        </button>
      </div>
    </>
  );
}
