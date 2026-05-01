import styles from '../app/home.module.css';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

interface FeaturedCollectionProps {
  products: Product[];
}

export default function FeaturedCollection({ products }: FeaturedCollectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionSubtitle}>Essential Selection</span>
        <h2 className={styles.sectionTitle}>Featured<br />Collection</h2>
      </div>

      <div className={styles.stitchedGrid}>
        {products.slice(0, 6).map((item) => (
          <div key={item.id} className={styles.productCard}>
            <div className={styles.productImageWrapper}>
              <img src={item.image} alt={item.name} className={styles.productImage} />
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{item.name}</h3>
              <span className={styles.productPriceRegular}>{item.price}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
