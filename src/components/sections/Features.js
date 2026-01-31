import Container from '../ui/Container';
import styles from './Features.module.css';
import { Shield, Zap, Clock,  BarChart3, MessageSquare, Moon } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: "빈틈없는 웹사이트 차단",
    desc: "SNS, 쇼핑몰 등 방해 사이트를 칼같이 차단합니다. 서브도메인까지 한 번에 관리하여 완벽한 격리 환경을 만듭니다."
  },
  {
    icon: Clock,
    title: "스마트 타이머 & 스톱워치",
    desc: "분 단위의 정밀한 설정부터 스톱워치 모드까지. 짧은 집중부터 딥워크(Deep Work)까지 자유롭게 설정하세요."
  },
  {
    icon: BarChart3,
    title: "직관적인 대시보드 & 성장 통계",
    desc: "오늘의 몰입 시간과 딴짓 패턴을 분석하고, GitHub 스타일의 잔디 그래프로 성장의 발자취를 시각화하세요."
  },
  {
    icon: Zap,
    title: "오버타임(Overtime) 시스템",
    desc: "타이머가 끝나도 몰입이 최고조라면? 흐름을 끊지 않고 '초과 집중 시간'을 기록하여 성취감을 극대화합니다."
  },
  {
    icon: MessageSquare,
    title: "포기 방지 도발 메시지",
    desc: "의지가 흔들려 타이머를 끄려 할 때, 위트 있고 날카로운 문구가 당신의 초심을 다시 깨워줍니다."
  },
  {
    icon: Moon,
    title: "편리한 언어 설정 & 다크 모드",
    desc: "한국어/영어의 완벽한 다국어 지원과 눈이 편안한 다크 모드로 언제 어디서나 최적의 환경을 제공합니다."
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
