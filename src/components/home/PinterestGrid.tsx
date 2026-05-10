import Image from 'next/image';
import styles from './PinterestGrid.module.css';

const PinterestGrid = () => {
  const items = [
    { id: 1, image: '/images/editorial/editorial5.jpg', size: 'medium', title: 'Parisian Pulse', description: 'High-fashion street aesthetics captured in the heart of Paris.' },
    { id: 2, image: '/images/editorial/editorial1.jpg', size: 'large', title: 'Nippon Noir', description: 'Intricate crane embroidery inspired by traditional Japanese motifs.' },
    { id: 3, image: '/images/editorial/editorial2.jpg', size: 'medium', title: 'Urban Craft', description: 'Modern silhouettes blended with artisanal hand-stitched textures.' },
    { id: 4, image: '/images/editorial/editorial3.jpg', size: 'medium', title: 'Nature\'s Bloom', description: 'Botanical embroidery meeting premium technical utility wear.' },
    { id: 5, image: '/images/editorial/editorial4.jpg', size: 'medium', title: 'Continental Shift', description: 'Reimagining classical tapestries through a modern fashion lens.' },
    { id: 6, image: '/images/editorial/editorial5.jpg', size: 'large', title: 'Artisanal Fusion', description: 'Exploring the intersection of contemporary techwear and classical art.' },



  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.scrollWrapper}>
          {items.map((item) => (
            <div
              key={item.id}
              className={`${styles.card} ${styles[item.size]}`}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={item.image}
                  alt={item.title || 'Collection Item'}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.image}
                />

                {/* Bottom Overlay for Featured Item */}
                {item.title && (
                  <div className={styles.bottomOverlay}>
                    <div className={styles.textGroup}>
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                      <p className={styles.cardDesc}>{item.description}</p>
                    </div>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PinterestGrid;
