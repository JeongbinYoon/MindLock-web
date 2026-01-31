'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Container from '../ui/Container';
import Button from '../ui/Button';
import ThemeToggle from '../ui/ThemeToggle';
import LanguageToggle from '../ui/LanguageToggle';
import styles from './Header.module.css';
import { useLanguage } from '../providers/LanguageProvider';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
      <Container>
        <div className={styles.inner}>
          <Link href="/" className={styles.logo}>
            <img 
              src="/assets/mindlock-logo.png" 
              alt="MindLock Logo" 
              style={{ height: '32px', width: 'auto' }} 
            />
            <span>MindLock</span>
          </Link>
          
          <nav className={styles.nav}>
            <Link href="#features" className={styles.navLink}>
              {t.header.features}
            </Link>
            <Link href="#how-it-works" className={styles.navLink}>
              {t.header.usage}
            </Link>
            <Link href="https://github.com/Start-to-finish-project/MindLock" target="_blank" className={styles.navLink}>
              {t.header.github}
            </Link>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <LanguageToggle />
            <ThemeToggle />
            <Button 
              variant="primary" 
              href="https://chromewebstore.google.com/detail/cphbbenehbebinbaljljfchnganfadjl?utm_source=item-share-cb"
              target="_blank"
              style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
            >
              {t.header.addToChrome}
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
