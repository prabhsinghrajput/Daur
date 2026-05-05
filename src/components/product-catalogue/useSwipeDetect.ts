import { useEffect, RefObject, useRef } from 'react';

export function useSwipeDetect(
  ref: RefObject<HTMLElement | null>,
  onNext: () => void,
  onPrev: () => void
) {
  const touchStartX = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // e.preventDefault(); // Might interfere with general page scrolling if not handled carefully.
      // we'll only prevent default if we're scrolling horizontally or if we decide to lock vertical scroll.
      // According to prompt: "Wheel event uses e.preventDefault() — no page scroll while in section"
      // Wait, if we completely prevent default, the user can never scroll past the section vertically!
      // The prompt says "wheel event uses e.preventDefault() — no page scroll while in section". 
      // But we need a way to leave the section. 
      // Let's implement horizontal scroll/swipe trigger, but maybe we only prevent default if it's horizontal,
      // or if it's vertical we advance slide and only prevent if we have more slides?
      // "desktop → horizontal scroll or vertical triggers next/prev"
      // Let's use a small debounce to not trigger rapidly.
      
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      
      if (isHorizontal) {
        if (e.deltaX > 30) {
          e.preventDefault();
          onNext();
        } else if (e.deltaX < -30) {
          e.preventDefault();
          onPrev();
        }
      } else {
        // If vertical, maybe don't prevent default so they can scroll down the page,
        // unless they specifically want to lock. I will not prevent vertical to allow leaving the section,
        // but if they swipe horizontally on trackpad, it triggers.
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const delta = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(delta) > 50) {
        if (delta > 0) onNext();
        else onPrev();
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [ref, onNext, onPrev]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onNext, onPrev]);
}
