import Link from 'next/link';
import Container from '../ui/Container';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.inner}>
          <p className={styles.copy}>
            &copy; {new Date().getFullYear()} MindLock. All rights reserved.
          </p>
          <div className={styles.links}>
            <Link href="https://github.com/Start-to-finish-project/MindLock" target="_blank" className={styles.link}>
              GitHub
            </Link>
            <Link href="#" className={styles.link}>
              Privacy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
