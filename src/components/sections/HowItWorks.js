import Container from '../ui/Container';

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: '6rem 0' }}>
      <Container>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '700', marginBottom: '1rem' }}>
            어떻게 사용하나요?
          </h2>
          <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
            3단계로 시작하는 초간단 사용법
          </p>
        </div>

        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          {[
            { step: 1, title: 'Chrome에 무료 추가', desc: '크롬 웹 스토어에서 MindLock을 무료로 설치하고 바로 시작하세요.' },
            { step: 2, title: '나만의 몰입 환경 설정', desc: '옵션 페이지에서 방해되는 사이트 목록, 알림음, 도발 메시지 등을 내 입맛대로 커스터마이징 하세요.' },
            { step: 3, title: '클릭 한 번으로 몰입 시작', desc: '타이머를 설정하고 시작 버튼을 누르세요. 그 즉시 나만의 몰입 시스템이 작동합니다.' }
          ].map((item) => (
            <div key={item.step} style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '3rem', height: '3rem', 
                background: '#171717', color: 'white', 
                borderRadius: '50%', display: 'flex', 
                alignItems: 'center', justifyContent: 'center',
                fontWeight: 'bold', fontSize: '1.25rem',
                margin: '0 auto 1.5rem auto'
              }}>
                {item.step}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>{item.title}</h3>
              <p style={{ color: '#6b7280' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
