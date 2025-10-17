"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BottomNav } from "@/components/bottom-nav"
import { MenuDrawer } from "@/components/menu-drawer"
import Link from "next/link"
import { Sparkles, TrendingDown, Lightbulb, BarChart3, Leaf } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const quickQuestions = [
  {
    icon: TrendingDown,
    text: "How can I reduce my carbon footprint?",
    response:
      "Great question! Here are some effective ways to reduce your carbon footprint:\n\n1. Use public transportation, bike, or walk for short trips\n2. Carpool when possible\n3. Choose electric or hybrid vehicles\n4. Plan your routes efficiently to minimize distance\n5. Combine multiple errands into one trip\n\nBased on your current data, switching just 2 car trips per week to cycling could reduce your monthly emissions by 30%!",
  },
  {
    icon: BarChart3,
    text: "What's my current emission status?",
    response:
      "Your Current Status:\n\n📊 Total Emissions: 8.32 kg CO₂ (2025)\n📅 This Month: 6.16 kg CO₂\n📆 Last Month: 2.16 kg CO₂\n🚗 Total Trips: 4 trips\n\n🎉 Great news! You're emitting less than 25% of what the average commuter contributes monthly. Your sustainable travel choices are making a real difference!",
  },
  {
    icon: Lightbulb,
    text: "Show me eco-friendly travel tips",
    response:
      "Eco-Friendly Travel Tips:\n\n🚴 Cycling & Walking: Zero emissions for trips under 5km\n🚌 Public Transport: Buses emit 50% less CO₂ per person than cars\n🚆 Trains: The most eco-friendly option for long distances\n🚗 Carpooling: Share rides to cut emissions by up to 75%\n⚡ Electric Vehicles: 60% lower emissions than gas vehicles\n\n💡 Pro Tip: Planning your route in advance can reduce fuel consumption by 15%!",
  },
  {
    icon: Leaf,
    text: "How do I compare to average commuters?",
    response:
      "Comparison to Average Commuters:\n\n✅ Your Monthly Average: 4.16 kg CO₂\n📊 Average Commuter: 16-20 kg CO₂\n🌟 You're performing: 75% BETTER!\n\n🏆 Your Achievements:\n• Using sustainable transport modes\n• Keeping trip distances minimal\n• Actively tracking and reducing emissions\n\nKeep up the excellent work! You're a sustainability champion! 🌱",
  },
  {
    icon: Sparkles,
    text: "What are the best sustainable transport modes?",
    response:
      "Best Sustainable Transport Modes (Ranked):\n\n1. 🚶 Walking/Cycling: 0 kg CO₂/km\n   Perfect for: < 5km trips\n\n2. 🚆 Electric Train: 0.04 kg CO₂/km\n   Perfect for: Long distances\n\n3. 🚌 Bus: 0.05 kg CO₂/km\n   Perfect for: Urban commuting\n\n4. 🚗 Electric Car: 0.05 kg CO₂/km\n   Perfect for: Flexible travel\n\n5. 🚙 Hybrid Car: 0.08 kg CO₂/km\n   Perfect for: Mixed driving\n\nFor comparison, a gas car emits ~0.12 kg CO₂/km!",
  },
]

export default function SageAIPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm SAGE, your Sustainable Action Guide for the Environment. I can help you understand your carbon footprint, suggest eco-friendly travel alternatives, and answer questions about sustainable living. How can I assist you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showQuickQuestions, setShowQuickQuestions] = useState(true)

  const handleQuickQuestion = (question: (typeof quickQuestions)[0]) => {
    setShowQuickQuestions(false)

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: question.text,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: question.response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    setShowQuickQuestions(false)

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your travel patterns, I recommend using public transportation or cycling for trips under 5km. This could reduce your monthly emissions by up to 40%!",
        "Great question! Walking and cycling produce zero emissions. For longer distances, trains are typically the most eco-friendly option, followed by buses.",
        "Your current carbon footprint is below average! Keep up the good work. Consider carpooling or using electric vehicles for even better results.",
        "I can help you plan a more sustainable route. Would you like me to suggest eco-friendly alternatives for your regular commute?",
        "Did you know? Reducing your car usage by just 2 days per week can save approximately 1,500 kg of CO₂ annually!",
      ]

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-background border-b-2 border-olive/20 px-4 sm:px-6 py-4 sticky top-0 z-30">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 bg-olive rounded-full flex items-center justify-center hover:bg-olive-dark transition-colors flex-shrink-0"
            >
              <svg className="w-6 h-6 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl font-bold text-brown">SAGE AI</h1>
              <p className="text-xs text-brown-light">Sustainable Action Guide</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/profile"
              className="w-10 h-10 bg-sage rounded-full flex items-center justify-center hover:bg-sage-dark transition-colors flex-shrink-0"
            >
              <svg className="w-6 h-6 text-brown" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
            </Link>
            <MenuDrawer />
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <main className="px-4 py-6 max-w-4xl mx-auto">
        <div className="space-y-4 mb-32">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-3xl px-4 sm:px-6 py-4 ${
                  message.role === "user"
                    ? "bg-olive text-cream"
                    : "bg-white border-2 border-olive/10 text-brown shadow-md"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-sage rounded-full flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-olive" />
                    </div>
                    <span className="text-xs font-semibold text-olive">SAGE AI</span>
                  </div>
                )}
                <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                <p className={`text-xs mt-2 ${message.role === "user" ? "text-cream/70" : "text-brown-light"}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
              <div className="max-w-[85%] sm:max-w-[80%] bg-white border-2 border-olive/10 rounded-3xl px-4 sm:px-6 py-4 shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-sage rounded-full flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-olive" />
                  </div>
                  <span className="text-xs font-semibold text-olive">SAGE AI</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-olive rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-olive rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-olive rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          {showQuickQuestions && messages.length === 1 && (
            <div className="space-y-3 animate-in slide-in-from-bottom-2 duration-300">
              <p className="text-sm font-semibold text-brown text-center mb-4">Quick Questions:</p>
              {quickQuestions.map((question, index) => {
                const Icon = question.icon
                return (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full bg-white hover:bg-sage/10 border-2 border-olive/10 hover:border-olive/30 rounded-2xl p-4 text-left transition-all shadow-sm hover:shadow-md group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-sage rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-olive group-hover:text-cream transition-colors">
                        <Icon className="w-5 h-5 text-olive group-hover:text-cream" />
                      </div>
                      <p className="text-sm font-medium text-brown flex-1">{question.text}</p>
                      <svg
                        className="w-5 h-5 text-olive opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </main>

      {/* Input Area */}
      <div className="fixed bottom-20 left-0 right-0 bg-background border-t-2 border-olive/20 px-4 py-4 z-30">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto">
          <div className="flex gap-2 sm:gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask SAGE about sustainable travel..."
              className="flex-1 bg-white border-2 border-olive/20 rounded-full px-4 sm:px-6 py-3 text-sm sm:text-base text-brown placeholder:text-brown-light focus:outline-none focus:border-olive transition-colors"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-12 h-12 bg-olive hover:bg-olive-dark disabled:bg-olive/50 text-cream rounded-full flex items-center justify-center transition-colors flex-shrink-0"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
