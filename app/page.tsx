import Link from "next/link"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between p-8 pb-12">
      {/* Logo */}
      <div className="flex flex-col items-center mt-12">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 bg-olive rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-cream" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
        </div>
        <h1 className="text-5xl font-bold text-brown mb-1 text-center leading-tight">
          Carbon
          <br />
          Copy
        </h1>
        <p className="text-sm text-brown-light uppercase tracking-wider">Track. Reduce. Travel Green.</p>
      </div>

      {/* Hero Illustration */}
      <div className="flex-1 flex items-center justify-center my-8">
        <div className="relative w-72 h-72">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Earth illustration placeholder */}
            <div className="w-56 h-56 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-8 left-4 w-20 h-16 bg-green-500 rounded-full transform -rotate-12"></div>
                <div className="absolute top-16 right-8 w-16 h-20 bg-green-600 rounded-full transform rotate-45"></div>
                <div className="absolute bottom-12 left-12 w-24 h-16 bg-green-500 rounded-full transform rotate-12"></div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full opacity-80"></div>
            <div className="absolute top-8 -left-8 text-4xl">✈️</div>
            <div className="absolute -bottom-4 right-8 text-3xl">🌱</div>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div className="text-center mb-8">
        <p className="text-xl font-semibold text-brown leading-relaxed">
          Your journey to sustainable
          <br />
          travel starts here.
        </p>
      </div>

      {/* CTA Button */}
      <Link
        href="/login"
        className="w-full max-w-xs bg-olive hover:bg-olive-dark text-cream font-bold text-xl py-4 px-8 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center gap-3 group"
      >
        Get Started
        <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
      </Link>
    </div>
  )
}
