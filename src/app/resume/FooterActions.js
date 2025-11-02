'use client';

import styles from './resume.module.css';

export default function FooterActions() {
  return (
    <div className={styles.footerActions}>
      <button 
        className={styles.printButton}
        onClick={() => window.print()}
        aria-label="Print this resume"
      >
        Print Resume
      </button>
      <a href="/" className={styles.homeLink}>
        ← Back to Home
      </a>
    </div>
  );
}
