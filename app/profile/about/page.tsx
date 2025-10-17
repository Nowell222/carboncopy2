"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function AboutHelpPage() {
  const router = useRouter()

  const faqItems = [
    {
      question: "How does Carbon Copy calculate emissions?",
      answer:
        "We use internationally recognized emission factors from the IPCC and EPA. Each mode of transport has a specific CO₂ emission rate per kilometer traveled.",
    },
    {
      question: "Can I sync multiple smartwatches?",
      answer:
        "Currently, you can connect one smartwatch at a time. We're working on multi-device support for future updates.",
    },
    {
      question: "How accurate is the carbon footprint tracking?",
      answer:
        "Our calculations are based on average emission factors and provide estimates within 5-10% accuracy. Actual emissions may vary based on specific vehicle models and conditions.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes! We use industry-standard encryption and never share your personal data with third parties without your consent.",
    },
  ]

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header */}
      <header className="bg-cream border-b-2 border-olive/20 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 bg-olive rounded-full flex items-center justify-center hover:bg-olive-dark transition-colors"
            >
              <svg className="w-6 h-6 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-brown">About & Help</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6 max-w-4xl mx-auto">
        <div className="space-y-6">
          {/* About Carbon Copy */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-olive/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-olive rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-cream" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-brown">Carbon Copy</h2>
                <p className="text-sm text-brown-light">Version 1.0.0</p>
              </div>
            </div>

            <p className="text-brown-light leading-relaxed mb-4">
              Carbon Copy helps you track, reduce, and offset your travel carbon footprint. Our mission is to make
              sustainable travel accessible and rewarding for everyone.
            </p>

            <div className="bg-sage/20 rounded-2xl p-4">
              <p className="text-sm text-brown">
                <strong>Track.</strong> Monitor your carbon emissions from every journey.
                <br />
                <strong>Reduce.</strong> Get personalized tips to lower your footprint.
                <br />
                <strong>Travel Green.</strong> Make every trip more sustainable.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-olive/10">
            <h2 className="text-xl font-bold text-brown mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <details key={index} className="group border-b border-olive/10 pb-4 last:border-0">
                  <summary className="font-semibold text-brown cursor-pointer list-none flex items-center justify-between">
                    <span>{item.question}</span>
                    <svg
                      className="w-5 h-5 text-olive transition-transform group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="text-sm text-brown-light mt-3 leading-relaxed">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-olive/10">
            <h2 className="text-xl font-bold text-brown mb-4">Need More Help?</h2>
            <p className="text-sm text-brown-light mb-6">
              Can't find what you're looking for? Our support team is here to help!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={() => (window.location.href = "mailto:support@carboncopy.app")}
                className="bg-olive hover:bg-olive-dark text-cream rounded-full"
              >
                Email Support
              </Button>
              <Button
                onClick={() => alert("Opening live chat...")}
                variant="outline"
                className="border-olive text-olive hover:bg-olive hover:text-cream rounded-full"
              >
                Live Chat
              </Button>
            </div>
          </div>

          {/* Legal Links */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-olive/10">
            <h2 className="text-xl font-bold text-brown mb-4">Legal</h2>

            <div className="space-y-3">
              <button
                onClick={() => alert("Opening Terms of Service...")}
                className="w-full text-left text-olive hover:text-olive-dark font-semibold underline"
              >
                Terms of Service
              </button>
              <button
                onClick={() => alert("Opening Privacy Policy...")}
                className="w-full text-left text-olive hover:text-olive-dark font-semibold underline"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => alert("Opening Cookie Policy...")}
                className="w-full text-left text-olive hover:text-olive-dark font-semibold underline"
              >
                Cookie Policy
              </button>
              <button
                onClick={() => alert("Opening Licenses...")}
                className="w-full text-left text-olive hover:text-olive-dark font-semibold underline"
              >
                Open Source Licenses
              </button>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-cream-dark rounded-2xl p-6 border-2 border-olive/10 text-center">
            <p className="text-sm font-semibold text-brown mb-4">Follow Us</p>
            <div className="flex justify-center gap-4">
              <button className="w-12 h-12 bg-olive rounded-full flex items-center justify-center hover:bg-olive-dark transition-colors">
                <svg className="w-6 h-6 text-cream" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button className="w-12 h-12 bg-olive rounded-full flex items-center justify-center hover:bg-olive-dark transition-colors">
                <svg className="w-6 h-6 text-cream" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </button>
              <button className="w-12 h-12 bg-olive rounded-full flex items-center justify-center hover:bg-olive-dark transition-colors">
                <svg className="w-6 h-6 text-cream" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
