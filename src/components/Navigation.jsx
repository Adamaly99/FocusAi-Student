'use client'

import { useAuthStore } from '../store/authStore'

export default function Navigation({ activeView, setActiveView }) {
  const user = useAuthStore((state) => state.user)
  const signOut = useAuthStore((state) => state.signOut)

  return (
    <nav className="bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            FocusAI
          </span>
        </div>

        <div className="flex items-center gap-1 bg-white/5 rounded-full p-1">
          <button
            onClick={() => setActiveView('timer')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
              activeView === 'timer'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Timer
          </button>
          <button
            onClick={() => setActiveView('stats')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
              activeView === 'stats'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Stats
          </button>
          <button
            onClick={() => setActiveView('coach')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
              activeView === 'coach'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            AI Coach
          </button>
        </div>

        <button
          onClick={signOut}
          className="text-gray-400 hover:text-red-400 text-sm font-semibold transition"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}
