import './globals.css'

export const metadata = {
  title: 'Airdrop Hunter - Latest Crypto Airdrops 2026',
  description: 'Discover and track the latest crypto airdrops. Detailed guides, official links, and step-by-step tutorials for maximizing airdrop rewards.',
  keywords: 'crypto airdrop, free crypto, token airdrop, DeFi airdrop, LayerZero, zkSync, Starknet, Linea',
  authors: [{ name: 'Airdrop Hunter Team' }],
  openGraph: {
    title: 'Airdrop Hunter - Latest Crypto Airdrops 2026',
    description: 'Find the best crypto airdrops with step-by-step guides',
    url: 'https://airdrop-hunter-sooty.vercel.app',
    siteName: 'Airdrop Hunter',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Airdrop Hunter - Latest Crypto Airdrops',
    description: 'Discover and track the latest crypto airdrops',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="googlec976bd09cd5fa4cf" />
        {/* Google AdSense - 待审核通过后取消注释并填入你的发布商ID */}
        {/* <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        ></script> */}
      </head>
      <body>{children}</body>
    </html>
  )
}
