"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    {
      href: "/dashboard",
      icon: "home",
      label: "Home",
    },
    {
      href: "/calculator",
      icon: "calculator",
      label: "Calculator",
    },
    {
      href: "/history",
      icon: "history",
      label: "Travel",
    },
    {
      href: "/sage-ai",
      icon: "sage",
      label: "SAGE AI",
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-olive border-t-4 border-olive-dark shadow-lg z-40">
      <div className="max-w-lg mx-auto px-4 py-3">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 transition-all ${
                  isActive ? "scale-110" : "opacity-70 hover:opacity-100"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    isActive ? "bg-sage scale-110" : "bg-olive-light"
                  }`}
                >
                  {item.icon === "home" && (
                    <svg className="w-6 h-6 text-brown" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    </svg>
                  )}
                  {item.icon === "calculator" && (
                    <svg className="w-6 h-6 text-brown" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5.97 4.06L14.09 6l1.41 1.41L16.91 6l1.06 1.06-1.41 1.41 1.41 1.41-1.06 1.06-1.41-1.4-1.41 1.41-1.06-1.06 1.41-1.41-1.41-1.42zm-6.78 6.78L7.31 15l1.41-1.41L7.31 12l1.41-1.41L10.13 12l1.41-1.41 1.06 1.06-1.41 1.41 1.41 1.41-1.06 1.06-1.41-1.41-1.42 1.41zM19 19H5v-2h14v2z" />
                    </svg>
                  )}
                  {item.icon === "history" && (
                    <svg className="w-6 h-6 text-brown" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
                    </svg>
                  )}
                  {item.icon === "sage" && (
                    <svg className="w-6 h-6 text-brown" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 12H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1zm0-3H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1zm0-3H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1z" />
                    </svg>
                  )}
                </div>
                <span className={`text-xs font-medium ${isActive ? "text-brown" : "text-brown-light"}`}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
