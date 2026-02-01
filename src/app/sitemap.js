export default function sitemap() {
  return [
    {
      url: 'https://mindlock.today',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // 추가 페이지가 있다면 여기에 객체 형태로 추가
    // {
    //   url: 'https://mindlock.today/about',
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ]
}
