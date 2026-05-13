"use client";

import React from "react";
import Link from "next/link";
import styles from "./CollectionHighlights.module.css";

export default function CollectionHighlights() {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        {/* Left: Large Image */}
        <div className={styles.largeImageSection}>
          <img 
            src="/images/editorial/editorial4.jpg" 
            alt="New Collection Main" 
            className={styles.largeImage}
          />
        </div>

        {/* Right: Text and Small Image */}
        <div className={styles.contentSection}>
          <div className={styles.headerRow}>
            <div className={styles.titleGroup}>
              <h2 className={styles.subtitle}>NEW</h2>
              <h2 className={styles.title}>COLLECTIONS</h2>
            </div>
            <Link href="/collections" className={styles.seeMore}>
              <span>Explore</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          <div className={styles.mainContent}>
            <div className={styles.descriptionGroup}>
              <p className={styles.description}>
                A dialogue between form and function. Our latest narrative explores 
                the intersection of architectural silhouettes and technical resilience.
              </p>
              <p className={styles.description}>
                Crafted for the modern nomad, every piece is a testament to 
                understated luxury and progressive design.
              </p>
            </div>
            
            <div className={styles.smallImageSection}>
              <img 
                src="/images/editorial/editorial5.jpg" 
                alt="New Collection Detail" 
                className={styles.smallImage}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
