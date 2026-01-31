import Container from '../ui/Container';
import styles from './HowItWorks.module.css';

export default function HowItWorks() {
  const steps = [
    { step: 1, title: 'Chrome에 무료 추가', desc: <>크롬 웹 스토어에서 MindLock을 무료로 설치하세요.<br />별도의 가입 없이 즉시 사용 가능합니다.</> },
    { step: 2, title: '나만의 몰입 환경 설정', desc: <>옵션 페이지에서 방해되는 사이트 목록,<br />알림음, 도발 메시지 등을 내 입맛대로 커스터마이징 하세요.</> },
    { step: 3, title: '클릭 한 번으로 몰입 시작', desc: <>타이머를 설정하고 시작 버튼을 누르세요.<br />그 즉시 나만의 몰입 시스템이 작동합니다.</> }
  ];

  return (
    <section id="how-it-works" className={styles.section}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>어떻게 사용하나요?</h2>
          <p className={styles.subtitle}>3단계로 완성하는 나만의 몰입 시스템</p>
        </div>

        <div className={styles.timeline}>
          {steps.map((item) => (
            <div key={item.step} className={styles.step}>
              <div className={styles.number}>{item.step}</div>
              <div className={styles.content}>
                <h3 className={styles.stepTitle}>{item.title}</h3>
                <p className={styles.stepDesc}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
