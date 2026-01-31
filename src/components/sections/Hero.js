'use client';

import Container from '../ui/Container';
import Button from '../ui/Button';
import styles from './Hero.module.css';
import DistractionShield from './DistractionShield';
import { useLanguage } from '../providers/LanguageProvider';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className={styles.hero}>
      {/* Dark Abstract Background */}
      <div className={styles.backgroundWrapper}>
      </div>

      <Container>
        <div className={styles.inner}>
          {/* Left: Text Content */}
          <div className={styles.content}>
            {/* Logo removed for cleaner design */}

            <h1 className={styles.title}>
              {t.hero.titlePrefix}<br />{t.hero.titleSuffix}
              <span className={styles.highlight}>{t.hero.brand}</span>
            </h1>
            
            <p className={styles.description}>
              {t.hero.description}
            </p>
            
            <div className={styles.actions}>
              <Button 
                href="https://chromewebstore.google.com/detail/cphbbenehbebinbaljljfchnganfadjl?utm_source=item-share-cb" 
                target="_blank"
                className={styles.primaryButton}
              >
                {t.hero.ctaPrimary}
              </Button>
              <Button 
                href="#how-it-works"
                className={styles.secondaryButton}
              >
                {t.hero.ctaSecondary}
              </Button>
            </div>
          </div>

          {/* Right: Large Logo */}
          <div className={styles.imageArea}>
            <DistractionShield />
            <img 
              src="/assets/mindlock-logo.png" 
              alt="MindLock Logo Large" 
              className={styles.logoLg}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
