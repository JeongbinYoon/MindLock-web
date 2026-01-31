'use client';

import { CheckCircle2 } from 'lucide-react';
import styles from './PopupShowcase.module.css';

export default function PopupShowcase() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Left: Content */}
        <div className={styles.content}>
          <span className={styles.label}>Extension Popup</span>
          <h2 className={styles.title}>
            복잡한 설정 없이,<br />
            <span style={{ color: '#818cf8' }}>단 1초 만에 몰입 시작</span>
          </h2>
          <p className={styles.description}>
            브라우저 상단 아이콘을 클릭하기만 하세요. 직관적인 UI로 방해 차단부터 타이머 설정까지, 모든 기능을 즉시 제어할 수 있습니다.
          </p>

          <div className={styles.featureList}>
            {[
              "원클릭 즉시 차단 (On/Off)",
              "현재 집중 상태 실시간 확인",
              "오버타임(Overtime) 자동 기록",
              "가볍고 빠른 실행 속도"
            ].map((item, idx) => (
              <div key={idx} className={styles.featureItem}>
                <CheckCircle2 size={20} color="#818cf8" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Tilted Mockup */}
        <div className={styles.imageWrapper}>
          <div className={styles.mockup}>
            {/* Using the generated artifact image. In a real scenario, this would be a real screenshot */}
            <img 
              src="/assets/popup_mockup.png" 
              alt="MindLock Extension Popup Interface" 
              className={styles.mockupImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
