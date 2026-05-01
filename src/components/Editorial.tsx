import styles from '../app/home.module.css';

export default function Editorial() {
  return (
    <section className={styles.editorial}>
      <div className={styles.editorialImageWrapper}>
        <img
          src="https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Editorial Campaign"
          className={styles.editorialBg}
        />
      </div>
      <div className={styles.editorialContent}>
        <h2 className={styles.editorialTitle}>A Study in Form and Shadow</h2>
        <p className={styles.editorialText}>
          Our latest editorial explores the intersection of brutalist architecture
          and soft drapery. Each piece is designed to exist as a modern sculpture,
          challenging the boundaries of wearable art.
        </p>
        <button className={styles.btn}>View Campaign</button>
      </div>
    </section>
  );
}
