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
        <div className={styles.grid}>
          {/* Card 1 */}
          <motion.div className={styles.card} variants={itemVariants}>
            <div className={styles.imageWrapper}>
              <Image
                src="/images/editorial/editorial1.jpg"
                alt="Editorial Showcase 1"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={styles.image}
                priority
              />
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div className={styles.card} variants={itemVariants}>
            <div className={styles.imageWrapper}>
              <Image
                src="/images/editorial/editorial2.jpg"
                alt="Editorial Showcase 2"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={styles.image}
              />
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div className={styles.card} variants={itemVariants}>
            <div className={styles.imageWrapper}>
              <Image
                src="/images/editorial/editorial3.jpg"
                alt="Editorial Showcase 3"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={styles.image}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default WorkoutShowcase;
