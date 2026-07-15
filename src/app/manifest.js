export default function manifest() {
  return {
    name: 'FocusAI - Study Smarter',
    short_name: 'FocusAI',
    description: 'Pomodoro timer with AI coaching for African students',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
