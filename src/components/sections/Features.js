'use client';

import Container from '../ui/Container';
import styles from './Features.module.css';
import { Shield, Zap, Clock,  BarChart3, MessageSquare, Globe } from 'lucide-react';
import { useLanguage } from '../providers/LanguageProvider';

const featureIcons = [Shield, Clock, BarChart3, Zap, MessageSquare, Globe];

export default function Features() {
  const { t } = useLanguage();

  return (
    <section id="features" className={styles.features}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>{t.features.sectionTitle}</h2>
          <p className={styles.subtitle} style={{ whiteSpace: 'pre-line' }}>
            {t.features.sectionSubtitle}
          </p>
        </div>
        
        <div className={styles.grid}>
          {t.features.items.map((item, idx) => {
            const Icon = featureIcons[idx];
            return (
              <div key={idx} className={styles.card}>
                <div className={styles.iconWrapper}>
                  <Icon size={24} strokeWidth={2} />
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
