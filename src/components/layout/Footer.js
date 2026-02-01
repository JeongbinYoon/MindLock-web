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
            <Link href="https://github.com/JeongbinYoon/MindLock" target="_blank" className={styles.link}>
              GitHub
            </Link>
            <Link href="https://lumbar-manuscript-cd7.notion.site/MindLock-Privacy-Policy-2f14769d3c40809b80b9fa82362c7ea1" target="_blank" className={styles.link}>
              {t.footer.privacy}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
