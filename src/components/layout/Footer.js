'use client';

import Link from 'next/link';
import Container from '../ui/Container';
import styles from './Footer.module.css';
import { useLanguage } from '../providers/LanguageProvider';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.inner}>
          <p className={styles.copy}>
            &copy; {new Date().getFullYear()} MindLock. {t.footer.rights}
          </p>
          <div className={styles.links}>
            <Link href="https://github.com/Start-to-finish-project/MindLock" target="_blank" className={styles.link}>
              GitHub
            </Link>
            <Link href="#" className={styles.link}>
              {t.footer.privacy}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
