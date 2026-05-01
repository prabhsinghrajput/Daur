import { RefObject } from 'react';
import styles from '../app/home.module.css';

interface HeroProps {
  trackRef: RefObject<HTMLDivElement | null>;
  scrollProgress: number;
}

export default function Hero({ trackRef, scrollProgress }: HeroProps) {
  return (
    <section className={styles.heroTrack} ref={trackRef}>
      <div className={styles.heroSticky}>
        {/* Video Background */}
        <video
          className={styles.heroVideo}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/Flow_202604301940.mp4" type="video/mp4" />
        </video>

        {/* 3D DAUR Image Text */}
        <img 
          src="/DaurHero.png" 
          alt="DAUR"
          className={styles.heroBrandImage} 
          style={{
            transform: `translate(-50%, -50%) perspective(1000px) translateX(${(scrollProgress * -20).toFixed(2)}px) rotateX(${(scrollProgress * 5).toFixed(2)}deg) rotateY(${(scrollProgress * -10).toFixed(2)}deg)`
          }}
        />
      </div>
    </section>
  );
}
