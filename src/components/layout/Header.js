'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Container from '../ui/Container';
import Button from '../ui/Button';
import ThemeToggle from '../ui/ThemeToggle';
import styles from './Header.module.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

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
              src="/assets/마인드락 로고.png" 
              alt="MindLock Logo" 
              style={{ height: '32px', width: 'auto' }} 
            />
            <span>MindLock</span>
          </Link>
          
          <nav className={styles.nav}>
            <Link href="#features" className={styles.navLink}>
              주요 기능
            </Link>
            <Link href="#how-it-works" className={styles.navLink}>
              사용 방법
            </Link>
            <Link href="https://github.com/Start-to-finish-project/MindLock" target="_blank" className={styles.navLink}>
              GitHub
            </Link>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <ThemeToggle />
            <Button 
              variant="primary" 
              href="https://chromewebstore.google.com/detail/cphbbenehbebinbaljljfchnganfadjl?utm_source=item-share-cb"
              target="_blank"
              style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
            >
              Chrome에 추가
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
