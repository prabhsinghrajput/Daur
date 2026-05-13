"use client";

import React from "react";
import styles from "./LatestDrops.module.css";

export default function LatestDrops() {
  return (
    <section className={styles.bannerSection}>
      <div className={styles.bannerContainer}>
        <img
          src="/images/latest-drop/LD1.jpg"
          alt="Latest Drop Banner"
          className={styles.bannerImage}
        />
        <div className={styles.bannerOverlay}>
          <h2 className={styles.bannerTitle}>Latest Drops</h2>
        </div>
      </div>
    </section>
  );
}
