import Image from 'next/image';
import styles from './EditorialShowcase.module.css';

const EditorialShowcase = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Large Background Text */}
        <div className={styles.bgText}>DAUR</div>

        <div className={styles.grid}>
          {/* Column 1 */}
          <div className={styles.column}>
            <div className={styles.imageWrapper}>
              <Image
                src="/Updated Men’s Fashion & Outfit Trends.jpg"
                alt="Editorial Look 1"
                fill
                className={styles.image}
              />
            </div>
            <p className={styles.caption}>
              Performance-driven gear for men—built for summer heat and winter cold.
            </p>
          </div>

          {/* Column 2 (Center) */}
          <div className={styles.column}>
            <div className={`${styles.imageWrapper} ${styles.centerImage}`}>
              <Image
                src="/download (6).jpg"
                alt="Editorial Look 2"
                fill
                className={styles.image}
              />
            </div>
          </div>

          {/* Column 3 */}
          <div className={styles.column}>
            <p className={`${styles.caption} ${styles.topCaption}`}>
              Stay warm, stay fit. Our winter workout wear blends insulation with flexibility to keep you going in the toughest conditions.
            </p>
            <div className={styles.imageWrapper}>
              <Image
                src="/if you want to have it dm me 😘.jpg"
                alt="Editorial Look 3"
                fill
                className={styles.image}
              />
            </div>
          </div>




        </div>
      </div>
    </section>
  );
};

export default EditorialShowcase;
