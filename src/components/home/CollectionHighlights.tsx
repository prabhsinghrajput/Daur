"use client";

import React from "react";
import Link from "next/link";
import styles from "./CollectionHighlights.module.css";

export default function CollectionHighlights() {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        {/* Left: Large Image */}
        <div className={styles.leftImageSection}>
          <img 
            src="/images/editorial/editorial_left.png" 
            alt="New Collection Featured" 
            className={styles.largeImage}
          />
        </div>

        {/* Center: Content */}
        <div className={styles.centerContent}>
          <div className={styles.textGroup}>
            <h2 className={styles.title}>NEW</h2>
            <h2 className={styles.title}>COLLECTION</h2>
            <p className={styles.description}>
              What should we know about this product? How is it made, how much does it cost, what color and size is it? Better descriptions result in more sales.
            </p>
            <Link href="/collections" className={styles.shopButton}>
              Shop
            </Link>
          </div>
        </div>

        {/* Right: Arched Image */}
        <div className={styles.rightImageSection}>
          <div className={styles.archWrapper}>
            <img 
              src="/images/editorial/editorial_right_arch.png" 
              alt="New Collection Secondary" 
              className={styles.archImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
