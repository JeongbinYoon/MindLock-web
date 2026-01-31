import Container from '../ui/Container';
import Button from '../ui/Button';
import styles from './Hero.module.css';
import DistractionShield from './DistractionShield';

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Dark Abstract Background */}
      <div className={styles.backgroundWrapper}>
      </div>

      <Container>
        <div className={styles.inner}>
          {/* Left: Text Content */}
          <div className={styles.content}>
            {/* Logo/Brand Area */}
            <div className={styles.logoWrapper}>
              {/* Note: If logo image is dark, might need brightness filter in CSS. 
                  Added brightness(0) invert(1) in CSS for logoIcon just in case. */}
              <img 
                src="/assets/마인드락 로고.png" 
                alt="MindLock Logo" 
                className={styles.logoIcon}
              />
              <span className={styles.logoText}>MindLock</span>
            </div>

            <h1 className={styles.title}>
              오직 나에게 집중하는 시간,<br />
              <span className={styles.highlight}>MindLock</span>
            </h1>
            
            <p className={styles.description}>
              자꾸만 유튜브, SNS로 손이 가시나요? 생산성을 저해하는 웹사이트를 완벽하게 차단하고 집중 시간을 관리하세요. 
              복잡한 설정 없이, 클릭 한 번으로 나만의 몰입 시스템을 완성하세요.
            </p>
            
            <div className={styles.actions}>
              <Button 
                href="https://chromewebstore.google.com/detail/cphbbenehbebinbaljljfchnganfadjl?utm_source=item-share-cb" 
                target="_blank"
                style={{ 
                  backgroundColor: 'white', 
                  color: 'black', 
                  fontSize: '1.125rem', 
                  padding: '1rem 2rem',
                  border: 'none',
                  fontWeight: 'bold'
                }}
              >
                Chrome에 무료 추가
              </Button>
              <Button 
                href="#how-it-works"
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)', 
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.2)',
                  fontSize: '1.125rem', 
                  padding: '1rem 2rem'
                }}
              >
                기능 살펴보기
              </Button>
            </div>
          </div>

          {/* Right: Large Logo */}
          <div className={styles.imageArea}>
            <DistractionShield />
            <img 
              src="/assets/마인드락 로고.png" 
              alt="MindLock Logo Large" 
              className={styles.logoLg}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
