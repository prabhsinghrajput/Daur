import React from 'react';
import Image from 'next/image';
import styles from './FashionShowcase.module.css';

const FashionShowcase = () => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.videoBadge}>
          <svg className={styles.circularText} viewBox="0 0 100 100">
            <path
              id="circlePath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="transparent"
            />
            <text fontSize="8" fontWeight="500">
              <textPath xlinkHref="#circlePath">
                Learn about us through this video • Learn about us through this video •
              </textPath>
            </text>
          </svg>
          <div className={styles.playButton}>
            <svg width="12" height="14" viewBox="0 0 12 14">
              <path d="M11.5 6.13397C12.1667 6.51887 12.1667 7.48113 11.5 7.86603L1.75 13.4952C1.08333 13.8801 0.25 13.399 0.25 12.6292L0.250001 1.37083C0.250001 0.601034 1.08333 0.119909 1.75 0.504809L11.5 6.13397Z" />
            </svg>
          </div>
        </div>

        <h2 className={styles.title}>
          Elevate Your Style With<br />Bold Fashion
        </h2>

        <div className={styles.avatars}>
          <div className={styles.avatarGroup}>
            <div className={styles.avatar} style={{ backgroundImage: 'url(/images/fashion/orange.png)' }}></div>
            <div className={styles.avatar} style={{ backgroundImage: 'url(/images/fashion/green.png)' }}></div>
            <div className={styles.avatar} style={{ backgroundImage: 'url(/images/fashion/yellow.png)' }}></div>
          </div>
          <button className={styles.addButton}>+</button>
        </div>
      </div>

      <div className={styles.grid}>
        {/* Column 1 */}
        <div className={styles.col1}>
          <div className={`${styles.card} ${styles.largeCard}`}>
            <Image src="/images/fashion/orange.png" alt="Orange Fashion" layout="fill" className={styles.image} />
          </div>
          <div className={`${styles.card} ${styles.smallCard}`}>
            <Image src="/images/fashion/boy.png" alt="Boy in Suit" layout="fill" className={styles.image} />
          </div>
        </div>

        {/* Column 2 */}
        <div className={styles.col2}>
          <div className={`${styles.card} ${styles.mediumCard}`}>
            <Image src="/images/fashion/green.png" alt="Green Coat" layout="fill" className={styles.image} />
          </div>
        </div>

        <div className={styles.col3}>
          <div className={`${styles.card} ${styles.centerCard}`}>
            <Image src="/images/fashion/yellow.png" alt="Yellow Hat" layout="fill" className={styles.image} />
          </div>
          <a href="#" className={styles.exploreButton}>
            Explore Collections
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Column 4 */}
        <div className={styles.col4}>
          <div className={`${styles.card} ${styles.mediumCard}`}>
            <Image src="/images/fashion/white.png" alt="White Puffer" layout="fill" className={styles.image} />
          </div>
        </div>

        {/* Column 5 */}
        <div className={styles.col5}>
          <div className={`${styles.card} ${styles.largeCard}`}>
            <Image src="/images/fashion/red.png" alt="Red Sunglasses" layout="fill" className={styles.image} />
          </div>
          <div className={`${styles.card} ${styles.smallCard}`}>
            <Image src="/images/fashion/teal.png" alt="Teal Suit" layout="fill" className={styles.image} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FashionShowcase;
