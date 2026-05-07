import { useState, useRef, useEffect, useCallback } from 'react';

export function useAutoAdvance(duration: number, onAdvance: () => void) {
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      onAdvance();
    }, duration);
  }, [duration, onAdvance]);

  const pauseTimer = useCallback(() => {
    setIsPaused(true);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const resumeTimer = useCallback(() => {
    setIsPaused(false);
    startTimer();
  }, [startTimer]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isPaused) startTimer();
  }, [isPaused, startTimer]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  return { isPaused, pauseTimer, resumeTimer, resetTimer };
}
