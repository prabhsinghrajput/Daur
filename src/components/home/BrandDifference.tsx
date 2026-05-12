import React from 'react';
import Image from 'next/image';
import styles from './BrandDifference.module.css';
import { motion, Variants } from 'framer-motion';

const BrandDifference = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const pointVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  const lineVariants: Variants = {
    hidden: { scaleX: 0, opacity: 0, originX: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.8, delay: 0.2, ease: "easeInOut" }
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
        <motion.div
          className={styles.bgText}
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 0.05, scale: 1, transition: { duration: 1.5 } }
          }}
        >
        </motion.div>

        <div className={styles.header}>
          <motion.span
            className={styles.label}
            variants={itemVariants}
          >
            PERFORMANCE REDEFINED.
          </motion.span>
          <motion.h2
            className={styles.title}
            variants={itemVariants}
          >
            ACTIVE: The Difference
          </motion.h2>
        </div>

        <div className={styles.content}>
          <div className={styles.leftSide}>
            <div className={styles.modelWrapper}>
              <Image
                src="/images/brand-difference/main.png"
                alt="Model showcasing DAUR ACTIVE collection"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={styles.modelImage}
              />

              {/* Connection Lines and Detail Points */}
              <motion.div className={`${styles.point} ${styles.pointTop}`} variants={pointVariants} />
              <motion.div className={`${styles.line} ${styles.lineTop}`} variants={lineVariants} />

              <motion.div className={`${styles.point} ${styles.pointBag}`} variants={pointVariants} />
              <motion.div className={`${styles.line} ${styles.lineBag}`} variants={lineVariants} />

              <motion.div className={`${styles.point} ${styles.pointBottom}`} variants={pointVariants} />
              <motion.div className={`${styles.line} ${styles.lineBottom}`} variants={lineVariants} />
            </div>
          </div>

          <div className={styles.rightSide}>
            {[
              {
                badge: 'Shell',
                img: '/images/brand-difference/1.png',
                title: 'High-Performance Shell',
                desc: 'Engineered with water-resistant matte polymers and a structural honeycomb weave. Designed for maximum protection without compromising on breathability.'
              },
              {
                badge: 'Mesh',
                img: '/images/brand-difference/2.png',
                title: 'Advanced Cooling Mesh',
                desc: 'Featuring a variable-density weave that targets high-heat zones. Moisture-wicking technology ensures you stay dry during peak athletic performance.'
              },
              {
                badge: 'Knit',
                img: '/images/brand-difference/3.png',
                title: 'Architectural Compression',
                desc: 'A seamless, high-recovery knit that provides strategic muscle support. Anatomical ribbing adapts to your body\'s movement for a zero-friction experience.'
              }
            ].map((item, idx) => (
              <motion.div key={idx} className={styles.detailItem} variants={itemVariants}>
                <motion.div
                  className={styles.textureWrapper}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.textureBadge}>{item.badge}</div>
                  <Image
                    src={item.img}
                    alt={`${item.title} detail`}
                    width={150}
                    height={150}
                    className={styles.textureImage}
                  />
                </motion.div>
                <div className={styles.detailText}>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </motion.div>
    </section>
  );
};

export default BrandDifference;
