export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <header className="bg-black/50 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            About Airdrop Hunter
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 text-gray-300">
        <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-lg">
              Airdrop Hunter helps crypto enthusiasts discover and participate in the latest cryptocurrency airdrops.
              We provide step-by-step guides, official links, and risk assessments to help you make informed decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">What We Offer</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <div>
                  <strong className="text-white">Daily Updates</strong>
                  <p>Fresh airdrop opportunities discovered and verified daily</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <div>
                  <strong className="text-white">Detailed Tutorials</strong>
                  <p>Step-by-step guides with official links and cost estimates</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <div>
                  <strong className="text-white">Risk Warnings</strong>
                  <p>Honest assessment of potential risks for each opportunity</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <div>
                  <strong className="text-white">Official Links Only</strong>
                  <p>We always provide verified official project links</p>
                </div>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Our Team</h2>
            <p>
              We are a group of cryptocurrency enthusiasts with over 7 years of experience in the crypto space.
              Our team carefully researches and verifies each airdrop opportunity before sharing it with our community.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Disclaimer</h2>
            <div className="bg-red-500/20 border border-red-400/50 rounded-lg p-4">
              <p className="text-sm">
                <strong>⚠️ Important:</strong> Airdrop Hunter is an educational resource. We do not guarantee any returns
                or outcomes. Cryptocurrency investments carry risk. Always do your own research (DYOR) and never invest
                more than you can afford to lose. We are not financial advisors.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Affiliate Disclosure</h2>
            <p>
              Some links on our site are affiliate links to cryptocurrency exchanges. When you sign up through these links,
              we may earn a commission at no extra cost to you. This helps us maintain our service and keep it free for users.
            </p>
          </section>

          <section className="text-center pt-8">
            <p className="text-xl text-purple-300">
              Happy airdrop hunting! 🎯
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
