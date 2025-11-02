export default function manifest() {
  return {
    name: 'PWA',
    short_name: 'PWA',
    description: 'NextJS 16 Starter Kit',
    start_url: '/',
    id: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ]
  }
}