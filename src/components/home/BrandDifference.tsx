import React from 'react';
import Image from 'next/image';
import styles from './BrandDifference.module.css';

const BrandDifference = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>WHY CHOOSE US.</span>
          <h2 className={styles.title}>DAUR: The Difference</h2>
        </div>

        <div className={styles.content}>
          <div className={styles.leftSide}>
            <div className={styles.modelWrapper}>
              <Image 
                src="/images/brand-difference/model.png" 
                alt="Model showcasing DAUR collection" 
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
                <div className={styles.textureBadge}>Top Wear</div>
                <Image 
                  src="/images/brand-difference/topwear.png" 
                  alt="Top wear fabric detail" 
                  width={150}
                  height={150}
                  className={styles.textureImage}
                />
              </div>
              <div className={styles.detailText}>
                <h3>Premium Fabric Comfort</h3>
                <p>Our topwear is crafted from carefully selected fabrics that feel soft, breathable, and comfortable throughout the day. Designed to combine elegance with everyday wearability.</p>
              </div>
            </div>

            <div className={styles.detailItem}>
              <div className={styles.textureWrapper}>
                <div className={styles.textureBadge}>Bag</div>
                <Image 
                  src="/images/brand-difference/bag.png" 
                  alt="Bag leather detail" 
                  width={150}
                  height={150}
                  className={styles.textureImage}
                />
              </div>
              <div className={styles.detailText}>
                <h3>Premium Bag Essentials</h3>
                <p>Our bags are crafted from high-quality materials that are durable and built for everyday use. Designed to combine functionality with modern elegance.</p>
              </div>
            </div>

            <div className={styles.detailItem}>
              <div className={styles.textureWrapper}>
                <div className={styles.textureBadge}>Bottoms</div>
                <Image 
                  src="/images/brand-difference/bottoms.png" 
                  alt="Bottoms fabric detail" 
                  width={150}
                  height={150}
                  className={styles.textureImage}
                />
              </div>
              <div className={styles.detailText}>
                <h3>Tailored Fit & Versatile Bottoms</h3>
                <p>Our bottoms are designed with refined cuts and balanced silhouettes, offering a flattering fit that adapts easily to both casual and elevated looks.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandDifference;
