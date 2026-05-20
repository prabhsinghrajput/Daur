import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import styles from './SummerEssentials.module.css';

export default function SummerEssentials() {
  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const mainCardVariantsLeft: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 } 
    }
  };

  const mainCardVariantsRight: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 } 
    }
  };

  const subCardVariantsLeft: Variants = {
    hidden: { opacity: 0, x: -35, y: "-50%", scale: 0.98 },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: "-50%",
      scale: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 } 
    }
  };

  const subCardVariantsRight: Variants = {
    hidden: { opacity: 0, x: 35, y: "-50%", scale: 0.98 },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: "-50%",
      scale: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 } 
    }
  };

  return (
    <section className={styles.section}>
      {/* Men's Summer Essentials */}
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={titleVariants}
        >
          <h2 className={styles.title}>Men's Summer Essentials</h2>
        </motion.div>

        <div className={styles.contentRow}>
          <div className={styles.layoutWrapper}>
            {/* Main large image on the right */}
            <motion.div 
              className={styles.mainCardRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={mainCardVariantsRight}
            >
              <div className={styles.imageInner}>
                <Image 
                  src="/images/summer/men_main.png" 
                  alt="Men's Summer Essentials Collection" 
                  fill 
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  className={styles.image}
                  priority
                />
              </div>
            </motion.div>

            {/* Overlapping smaller image on the left */}
            <motion.div 
              className={styles.subCardMen}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={subCardVariantsLeft}
              whileHover="hover"
            >
              <Link href="/collections/men" className={styles.linkWrapper}>
                <div className={styles.subImageInner}>
                  <Image 
                    src="/images/summer/men_sub.png" 
                    alt="Men's Collection Preview" 
                    fill 
                    sizes="(max-width: 1024px) 50vw, 30vw"
                    className={styles.image}
                  />
                  <div className={styles.overlay}>
                    <motion.span 
                      className={styles.overlayText}
                      variants={{
                        hover: { scale: 1.08, letterSpacing: '0.25em' }
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      MEN
                    </motion.span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Women's Summer Essentials */}
      <div className={`${styles.container} ${styles.womenSection}`}>
        <motion.div 
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={titleVariants}
        >
          <h2 className={styles.title}>Women's Summer Essentials</h2>
        </motion.div>

        <div className={styles.contentRow}>
          <div className={styles.layoutWrapper}>
            {/* Main large image on the left */}
            <motion.div 
              className={styles.mainCardLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={mainCardVariantsLeft}
            >
              <div className={styles.imageInner}>
                <Image 
                  src="/images/summer/women_main.png" 
                  alt="Women's Summer Essentials Collection" 
                  fill 
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  className={styles.image}
                />
              </div>
            </motion.div>

            {/* Overlapping smaller image on the right */}
            <motion.div 
              className={styles.subCardWomen}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={subCardVariantsRight}
              whileHover="hover"
            >
              <Link href="/collections/women" className={styles.linkWrapper}>
                <div className={styles.subImageInner}>
                  <Image 
                    src="/images/summer/women_sub.png" 
                    alt="Women's Collection Preview" 
                    fill 
                    sizes="(max-width: 1024px) 50vw, 30vw"
                    className={styles.image}
                  />
                  <div className={styles.overlay}>
                    <motion.span 
                      className={styles.overlayText}
                      variants={{
                        hover: { scale: 1.08, letterSpacing: '0.25em' }
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      WOMEN
                    </motion.span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
