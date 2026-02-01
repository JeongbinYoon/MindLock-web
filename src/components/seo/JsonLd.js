export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "MindLock",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "Chrome, Whale, Edge, Whale, Brave",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "MindLock은 강력한 웹사이트 차단 및 뽀모도로 타이머 기능을 제공하는 크롬 확장 프로그램입니다. MindLock is a powerful website blocker and Pomodoro timer extension for Chrome.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "ratingCount": "10" 
    },
    "featureList": [
      "Website Blocker (웹사이트 차단)",
      "Pomodoro Timer (뽀모도로 타이머)",
      "Focus Mode (집중 모드)",
      "Productivity Analytics (생산성 분석)"
    ],
    "author": {
      "@type": "Organization",
      "name": "MindLock Team",
      "url": "https://mindlock.today"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
