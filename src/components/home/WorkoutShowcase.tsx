import Image from 'next/image';
import styles from './WorkoutShowcase.module.css';
import { motion, Variants } from 'framer-motion';

const WorkoutShowcase = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
    }
  };

  return (
    <section className={styles.section}>
      <motion.div
        className={styles.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Header Section */}
        <div className={styles.headerRow}>
          <div>
            <span className={styles.categoryLabel}>CATEGORY</span>
            <h2 className={styles.mainTitle}>Explore Popular Categories</h2>
          </div>
          <button className={styles.exploreButton}>Explore All Category</button>
        </div>

        {/* Image Grid */}
        <div className={styles.grid}>
          {/* Card 1 */}
          <motion.div className={`${styles.card} ${styles.cardGreen}`} variants={itemVariants}>
            <div className={styles.bgBox} />

            <motion.div className={styles.imageWrapper}>
              <Image
                src="/images/active/active1.png"
                alt="Active T-Shirt"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={styles.image}
                priority
              />
            </motion.div>
            <h3 className={styles.cardTitle}>DAUR Active</h3>
            <button className={styles.shopButton}>Shop Now</button>
          </motion.div>

          {/* Card 2 */}
          <motion.div className={`${styles.card} ${styles.cardGrey}`} variants={itemVariants}>
            <div className={styles.bgBox} />

            <motion.div className={styles.imageWrapper}>
              <Image
                src="/images/labs/lab1.png"
                alt="Lab Series T-Shirt"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={styles.image}
              />
            </motion.div>
            <h3 className={styles.cardTitle}>DAUR Labs</h3>
            <button className={styles.shopButton}>Shop Now</button>
          </motion.div>

          {/* Card 3 */}
          <motion.div className={`${styles.card} ${styles.cardPink}`} variants={itemVariants}>
            <div className={styles.bgBox} />

            <motion.div className={styles.imageWrapper}>
              <Image
                src="/images/products/Purple.png"
                alt="Purple Edition T-Shirt"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={styles.image}
              />
            </motion.div>
            <h3 className={styles.cardTitle}>DAUR Collection</h3>
            <button className={styles.shopButton}>Shop Now</button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default WorkoutShowcase;
