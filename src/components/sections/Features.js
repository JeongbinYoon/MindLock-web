import Container from '../ui/Container';
import styles from './Features.module.css';
import { Shield, Zap, Clock,  BarChart3, MousePointerClick, Moon } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: "강력한 차단",
    desc: "SNS, 쇼핑, 뉴스 등 집중을 방해하는 사이트를 완벽하게 차단합니다. 우회 걱정 없이 몰입하세요."
  },
  {
    icon: Clock,
    title: "타이머 & 스톱워치",
    desc: "뽀모도로 타이머로 집중 시간을 관리하거나, 스톱워치로 순수 공부 시간을 측정해보세요."
  },
  {
    icon: BarChart3,
    title: "통계 대시보드",
    desc: "일간 집중 시간과 차단 시도 횟수를 시각적으로 확인하고 성장을 기록하세요."
  },
  {
    icon: Zap,
    title: "초경량 퍼포먼스",
    desc: "브라우저 속도에 영향을 주지 않는 최적화된 설계로 가볍고 빠릅니다."
  },
  {
    icon: MousePointerClick,
    title: "간편한 설정",
    desc: "복잡한 절차 없이 클릭 몇 번으로 차단 목록을 관리하고 바로 집중 모드를 시작하세요."
  },
  {
    icon: Moon,
    title: "다크 모드",
    desc: "눈의 피로를 줄여주는 다크 모드를 완벽하게 지원합니다. 밤늦은 작업도 편안하게."
  }
];

export default function Features() {
  return (
    <section id="features" className={styles.features}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>왜 MindLock인가요?</h2>
          <p className={styles.subtitle}>
            단순한 차단기 그 이상입니다. 당신의 디지털 웰빙과 생산성을 위한 모든 도구를 제공합니다.
          </p>
        </div>
        
        <div className={styles.grid}>
          {features.map((feature, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.iconWrapper}>
                <feature.icon size={24} strokeWidth={2} />
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDesc}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
