"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function MenuDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: "home" },
    { label: "Calculator", href: "/calculator", icon: "calculator" },
    { label: "Travel History", href: "/history", icon: "history" },
    { label: "SAGE AI Assistant", href: "/sage-ai", icon: "chat" },
    { label: "Profile", href: "/profile", icon: "profile" },
    { label: "Notifications", href: "/notifications", icon: "bell" },
    { label: "Settings", href: "/profile/account", icon: "settings" },
  ]

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-10 h-10 bg-sage rounded-full flex items-center justify-center hover:bg-sage-dark transition-colors"
      >
        <svg className="w-6 h-6 text-brown" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-cream shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b-2 border-olive/20">
            <h2 className="text-xl font-bold text-brown">Menu</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 bg-olive rounded-full flex items-center justify-center hover:bg-olive-dark transition-colors"
            >
              <svg className="w-6 h-6 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-sage/30 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-sage rounded-full flex items-center justify-center group-hover:bg-olive group-hover:scale-110 transition-all">
                      {item.icon === "home" && (
                        <svg
                          className="w-5 h-5 text-brown group-hover:text-cream"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                        </svg>
                      )}
                      {item.icon === "calculator" && (
                        <svg
                          className="w-5 h-5 text-brown group-hover:text-cream"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                        </svg>
                      )}
                      {item.icon === "history" && (
                        <svg
                          className="w-5 h-5 text-brown group-hover:text-cream"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z" />
                        </svg>
                      )}
                      {item.icon === "chat" && (
                        <svg
                          className="w-5 h-5 text-brown group-hover:text-cream"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                        </svg>
                      )}
                      {item.icon === "profile" && (
                        <svg
                          className="w-5 h-5 text-brown group-hover:text-cream"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                        </svg>
                      )}
                      {item.icon === "bell" && (
                        <svg
                          className="w-5 h-5 text-brown group-hover:text-cream"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                        </svg>
                      )}
                      {item.icon === "settings" && (
                        <svg
                          className="w-5 h-5 text-brown group-hover:text-cream"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
                        </svg>
                      )}
                    </div>
                    <span className="font-semibold text-brown">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t-2 border-olive/20">
            <button
              onClick={() => {
                setIsOpen(false)
                router.push("/")
              }}
              className="w-full bg-olive hover:bg-olive-dark text-cream font-bold py-3 rounded-full transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
