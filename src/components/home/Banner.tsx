import React from 'react';
import styles from './Banner.module.css';

interface BannerProps {
  imageSrc: string;
  altText?: string;
  height?: string;
}

export default function Banner({ imageSrc, altText = 'Promotional Banner', height = '60vh' }: BannerProps) {
  return (
    <section className={styles.container} style={{ height }}>
      <img src={imageSrc} alt={altText} className={styles.image} />
      <div className={styles.overlay}></div>
    </section>
  );
}
