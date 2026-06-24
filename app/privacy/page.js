export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <header className="bg-black/50 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Privacy Policy
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 text-gray-300">
        <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-white mb-3">Information We Collect</h2>
            <p>
              Airdrop Hunter collects minimal information to provide our service. We use analytics tools to understand
              how visitors use our site, including:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Pages visited and time spent on site</li>
              <li>Browser type and device information</li>
              <li>Referring websites</li>
              <li>General geographic location (country/city level)</li>
            </ul>
            <p className="mt-3">
              We do NOT collect personally identifiable information unless you voluntarily provide it
              (e.g., through contact forms).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">Cookies and Tracking</h2>
            <p>
              Our website uses cookies and similar technologies for:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Analytics (Google Analytics, if enabled)</li>
              <li>Advertising (Google AdSense, if enabled)</li>
              <li>Improving user experience</li>
            </ul>
            <p className="mt-3">
              You can control cookies through your browser settings. Note that disabling cookies may affect
              site functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Google AdSense</strong>: For displaying advertisements</li>
              <li><strong>Vercel</strong>: For website hosting</li>
              <li><strong>Exchange Referral Programs</strong>: Binance, OKX, Bybit (affiliate links)</li>
            </ul>
            <p className="mt-3">
              These services have their own privacy policies. We are not responsible for their practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">Affiliate Disclosure</h2>
            <p>
              Airdrop Hunter participates in affiliate programs with cryptocurrency exchanges. When you click on
              affiliate links and create an account, we may earn a commission at no extra cost to you. This helps
              us maintain and improve our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">Data Security</h2>
            <p>
              We implement reasonable security measures to protect information. However, no method of transmission
              over the internet is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">Children's Privacy</h2>
            <p>
              Our service is not intended for users under 18 years old. We do not knowingly collect information
              from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. Changes will be posted on this page with an
              updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">Contact Us</h2>
            <p>
              If you have questions about this privacy policy, please contact us through our contact page.
            </p>
          </section>

          <p className="text-sm text-gray-400 mt-8">
            Last updated: June 24, 2026
          </p>
        </div>
      </main>
    </div>
  );
}
