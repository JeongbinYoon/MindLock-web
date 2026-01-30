import Container from '../ui/Container';
import Button from '../ui/Button';
import PlaceholderImage from '../ui/PlaceholderImage';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.content}>
            <h1 className={styles.title}>
              집중력을 되찾고<br />
              시간을 지배하세요.
            </h1>
            <p className={styles.description}>
              MindLock은 불필요한 웹사랑트를 차단하고 목표에 집중할 수 있도록 돕는 미니멀한 크롬 확장 프로그램입니다. 복잡한 설정 없이 바로 시작하세요.
            </p>
            <div className={styles.actions}>
              <Button 
                href="https://chromewebstore.google.com/detail/cphbbenehbebinbaljljfchnganfadjl?utm_source=item-share-cb" 
                target="_blank"
              >
                Chrome에 무료 추가
              </Button>
              <Button variant="outline" href="#how-it-works">
                사용 방법 보기
              </Button>
            </div>
          </div>
          
          <div className={styles.imageWrapper}>
            <img 
              src="/assets/썸네일 큰 사이즈.png" 
              alt="MindLock Dashboard" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover' 
              }} 
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
