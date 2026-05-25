import React from 'react';
import styles from './BenefitsBar.module.css';

const benefits = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: 'Free Shipping',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: 'Exclusive Design',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M21 8V21H3V8" />
        <path d="M1 3H23V8H1V3Z" />
        <path d="M10 12H14" />
      </svg>
    ),
    title: 'Premium Packaging',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Highest Quality',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  }
];

export default function BenefitsBar() {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        {benefits.map((benefit, index) => (
          <div key={index} className={styles.benefitItem}>
            <div className={styles.iconWrapper}>
              {benefit.icon}
            </div>
            <h3 className={styles.title}>{benefit.title}</h3>
            <p className={styles.description}>{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
