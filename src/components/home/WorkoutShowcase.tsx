import Image from 'next/image';
import styles from './WorkoutShowcase.module.css';

const WorkoutShowcase = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header Row */}
        <div className={styles.headerRow}>
          <div className={styles.headerLeft}>
            <span className={styles.label}>OUR TOP PICKS</span>
            <h2 className={styles.title}>
              TOP WORKOUT GEAR FOR<br />PEAK PERFORMANCE!
            </h2>
          </div>
          <div className={styles.headerRight}>
            <p className={styles.description}>
              Discover the best of our collection, designed to power your workouts all year round
            </p>
          </div>
        </div>

        {/* Image Grid */}
        <div className={styles.grid}>
          {/* Card 1 */}
          <div className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image 
                src="/Men's outfit videos 《Casual Black Sweaters 》.jpg" 
                alt="Workout Gear 1" 
                fill
                className={styles.image}
              />
              <div className={styles.overlay}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardLabel}>01/WINTER _2025</span>
                </div>
                <h3 className={styles.cardTitle}>
                  TOP WORKOUT GEAR FOR<br />PEAK<br /><span className={styles.accent}>PERFORMANCE!</span>
                </h3>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image 
                src="/download (7).jpg" 
                alt="Workout Gear 2" 
                fill
                className={styles.image}
              />
              <div className={styles.overlay}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardLabel}>02/SUMMER _2025</span>
                </div>
                <h3 className={styles.cardTitle}>
                  LATEST STYLES AND INNOVATIONS IN WORKOUT GEAR.
                </h3>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WorkoutShowcase;
