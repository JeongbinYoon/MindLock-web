export default function manifest() {
  return {
    name: 'MindLock - Focus & Block',
    short_name: 'MindLock',
    description: 'MindLock으로 생산성을 높이세요. 불필요한 웹사이트를 차단하고 목표에 집중하세요.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/assets/logo128.png',
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: '/assets/mindlock-logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
