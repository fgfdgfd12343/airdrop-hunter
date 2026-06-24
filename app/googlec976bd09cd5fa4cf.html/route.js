export function GET() {
  return new Response('google-site-verification: googlec976bd09cd5fa4cf.html', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}
