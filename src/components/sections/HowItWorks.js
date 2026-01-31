'use client';

import Container from '../ui/Container';
import styles from './HowItWorks.module.css';
import { useLanguage } from '../providers/LanguageProvider';

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className={styles.section}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>{t.howItWorks.sectionTitle}</h2>
          <p className={styles.subtitle}>{t.howItWorks.sectionSubtitle}</p>
        </div>

        <div className={styles.timeline}>
          {t.howItWorks.steps.map((item, index) => (
            <div key={index} className={styles.step}>
              <div className={styles.number}>{index + 1}</div>
              <div className={styles.content}>
                <h3 className={styles.stepTitle}>{item.title}</h3>
                <p className={styles.stepDesc} style={{ whiteSpace: 'pre-line' }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
