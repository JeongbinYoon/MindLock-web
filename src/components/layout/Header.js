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

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
      <Container>
        <div className={styles.inner}>
          <Link 
            href="#" 
            className={styles.logo}
            onClick={(e) => { 
              e.preventDefault(); 
              window.scrollTo({ top: 0, behavior: 'smooth' }); 
            }}
          >
            <img 
              src="/assets/mindlock-logo.png" 
              alt="MindLock Logo" 
              style={{ height: '32px', width: 'auto' }} 
            />
            <span>MindLock</span>
          </Link>
          
          <nav className={styles.nav}>
            <a href="#intro" className={styles.navLink} onClick={(e) => handleNavClick(e, 'intro')}>
              {t.header.intro}
            </a>
            <a href="#simulation" className={styles.navLink} onClick={(e) => handleNavClick(e, 'simulation')}>
              {t.header.demo}
            </a>
            <a href="#features" className={styles.navLink} onClick={(e) => handleNavClick(e, 'features')}>
              {t.header.features}
            </a>
            <a href="#how-it-works" className={styles.navLink} onClick={(e) => handleNavClick(e, 'how-it-works')}>
              {t.header.usage}
            </a>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <LanguageToggle />
            <ThemeToggle />
            <Button 
              variant="primary" 
              className={styles.headerCta}
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
