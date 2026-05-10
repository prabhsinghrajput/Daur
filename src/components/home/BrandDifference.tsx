import React from 'react';
import Image from 'next/image';
import styles from './BrandDifference.module.css';

const BrandDifference = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.bgText}>DAUR</div>
        <div className={styles.header}>
          <span className={styles.label}>PERFORMANCE REDEFINED.</span>
          <h2 className={styles.title}>ACTIVE: The Difference</h2>
        </div>

        <div className={styles.content}>
          <div className={styles.leftSide}>
            <div className={styles.modelWrapper}>
              <Image 
                src="/images/active/active1.png" 
                alt="Model showcasing DAUR ACTIVE collection" 
                fill
                className={styles.modelImage}
              />
              
              {/* Connection Lines and Detail Points */}
              <div className={`${styles.point} ${styles.pointTop}`} />
              <div className={`${styles.line} ${styles.lineTop}`} />
              
              <div className={`${styles.point} ${styles.pointBag}`} />
              <div className={`${styles.line} ${styles.lineBag}`} />
              
              <div className={`${styles.point} ${styles.pointBottom}`} />
              <div className={`${styles.line} ${styles.lineBottom}`} />
            </div>
          </div>

          <div className={styles.rightSide}>
            <div className={styles.detailItem}>
              <div className={styles.textureWrapper}>
                <div className={styles.textureBadge}>Shell</div>
                <Image 
                  src="/images/active/active2.png" 
                  alt="Technical shell fabric detail" 
                  width={150}
                  height={150}
                  className={styles.textureImage}
                />
              </div>
              <div className={styles.detailText}>
                <h3>High-Performance Shell</h3>
                <p>Engineered with water-resistant matte polymers and a structural honeycomb weave. Designed for maximum protection without compromising on breathability.</p>
              </div>
            </div>

            <div className={styles.detailItem}>
              <div className={styles.textureWrapper}>
                <div className={styles.textureBadge}>Mesh</div>
                <Image 
                  src="/images/active/active3.png" 
                  alt="Cooling mesh detail" 
                  width={150}
                  height={150}
                  className={styles.textureImage}
                />
              </div>
              <div className={styles.detailText}>
                <h3>Advanced Cooling Mesh</h3>
                <p>Featuring a variable-density weave that targets high-heat zones. Moisture-wicking technology ensures you stay dry during peak athletic performance.</p>
              </div>
            </div>

            <div className={styles.detailItem}>
              <div className={styles.textureWrapper}>
                <div className={styles.textureBadge}>Knit</div>
                <Image 
                  src="/images/active/active4.png" 
                  alt="Compression knit detail" 
                  width={150}
                  height={150}
                  className={styles.textureImage}
                />
              </div>
              <div className={styles.detailText}>
                <h3>Architectural Compression</h3>
                <p>A seamless, high-recovery knit that provides strategic muscle support. Anatomical ribbing adapts to your body's movement for a zero-friction experience.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default BrandDifference;
