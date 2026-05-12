import React from 'react';
import Image from 'next/image';
import styles from './EditorialShowcase.module.css';
import { motion, Variants } from 'framer-motion';

const EditorialShowcase = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.25, 1, 0.5, 1] },
    },
  };

  const imageHover: Variants = {
    hover: { scale: 1.03, transition: { duration: 1, ease: [0.25, 1, 0.5, 1] } },
  };

  const floatingVariants: Variants = {
    animate: {
      y: [0, -12, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
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
        {/* Extreme Subtle Background Watermark */}
        <motion.div 
          className={styles.bgText}
          variants={{
            hidden: { opacity: 0, scale: 0.9, x: '-50%', y: '-50%' },
            visible: { 
              opacity: 0.02, 
              scale: 1, 
              x: '-50%', 
              y: '-50%',
              transition: { duration: 2, ease: "easeOut" } 
            }
          }}
        >
          DAUR
        </motion.div>

        <div className={styles.editorialGrid}>
          {/* Main Feature - Left Column */}
          <motion.div className={styles.mainFeature} variants={itemVariants}>
            <div className={styles.index}>I</div>
            <motion.div className={styles.mainImageWrapper} whileHover="hover">
              <motion.div variants={imageHover} className={styles.fullSize}>
                <Image
                  src="/images/editorial/editorial1.jpg"
                  alt="Editorial Feature 1"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={styles.image}
                  priority
                />
              </motion.div>
            </motion.div>
            <div className={styles.featureMeta}>
              <h3 className={styles.metaTitle}>THE SILHOUETTE</h3>
              <p className={styles.metaDesc}>Performance-driven gear for the modern nomad.</p>
            </div>
          </motion.div>

          {/* Center Column - Hero Editorial */}
          <motion.div className={styles.centerFeature} variants={itemVariants}>
            <div className={styles.editorialTitle}>
              <span className={styles.titleLabel}>NEW SEASON COLLECTION</span>
              <h2 className={styles.titleMain}>ESSENTIALS</h2>
            </div>
            <motion.div className={styles.centerImageWrapper} whileHover="hover">
              <motion.div variants={imageHover} className={styles.fullSize}>
                <Image
                  src="/images/editorial/editorial2.jpg"
                  alt="Editorial Feature 2"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={styles.image}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Secondary Narrative */}
          <motion.div className={styles.sideColumn} variants={itemVariants}>
            <div>
              <div className={styles.index}>II</div>
              <div className={styles.sideDescription}>
                <p>Stay warm, stay fit. Our winter workout wear blends high-tech insulation with seamless flexibility, engineered for peak performance.</p>
              </div>
            </div>
            
            <motion.div className={styles.sideImageWrapper} whileHover="hover">
              <motion.div variants={imageHover} className={styles.fullSize}>
                <Image
                  src="/images/editorial/editorial3.jpg"
                  alt="Editorial Feature 3"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={styles.image}
                />
              </motion.div>
            </motion.div>
            
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default EditorialShowcase;
