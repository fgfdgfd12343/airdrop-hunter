export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <header className="bg-black/50 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Contact Us
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Get in Touch</h2>
            <p className="text-gray-300 mb-6">
              Have questions, suggestions, or want to report an issue? We'd love to hear from you!
            </p>
          </section>

          <div className="space-y-6">
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                📧 Email
              </h3>
              <p className="text-gray-300">
                For general inquiries: <a href="mailto:contact@airdrophunter.com" className="text-purple-400 hover:text-purple-300 underline">contact@airdrophunter.com</a>
              </p>
              <p className="text-gray-300 mt-2">
                For partnership inquiries: <a href="mailto:partnerships@airdrophunter.com" className="text-purple-400 hover:text-purple-300 underline">partnerships@airdrophunter.com</a>
              </p>
            </div>

            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                🐦 Social Media
              </h3>
              <p className="text-gray-300">
                Follow us for instant updates: <a href="https://twitter.com/airdrophunter" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline">@AirdropHunter</a>
              </p>
            </div>

            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                💬 Community
              </h3>
              <p className="text-gray-300">
                Join our Telegram channel for discussions and alerts
              </p>
            </div>

            <div className="bg-blue-500/20 border border-blue-400/50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-3">Submit an Airdrop</h3>
              <p className="text-gray-300 mb-3">
                Found an airdrop we haven't covered? Let us know!
              </p>
              <p className="text-sm text-gray-400">
                Email us at <a href="mailto:submit@airdrophunter.com" className="text-purple-400 hover:text-purple-300 underline">submit@airdrophunter.com</a> with:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-400 mt-2 space-y-1">
                <li>Project name and official website</li>
                <li>Brief description</li>
                <li>How to participate</li>
                <li>Expected airdrop date (if known)</li>
              </ul>
            </div>

            <div className="bg-red-500/20 border border-red-400/50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-3">Report an Issue</h3>
              <p className="text-gray-300">
                Spotted incorrect information or a potential scam? Report it immediately to <a href="mailto:report@airdrophunter.com" className="text-purple-400 hover:text-purple-300 underline">report@airdrophunter.com</a>
              </p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-purple-500/30 text-center text-gray-400 text-sm">
            <p>We typically respond within 24-48 hours.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
