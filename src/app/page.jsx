'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { usePomodoroStore } from '@/store/pomodoroStore'
import Timer from '@/components/Timer'
import Login from '@/components/Login'

export default function Home() {
  const user = useAuthStore((state) => state.user)
  const loading = useAuthStore((state) => state.loading)
  const initAuth = useAuthStore((state) => state.initAuth)
  const loadTodaySessions = usePomodoroStore((state) => state.loadTodaySessions)

  useEffect(() => {
    initAuth()
  }, [initAuth])

  useEffect(() => {
    if (user) {
      loadTodaySessions(user.id)
    }
  }, [user, loadTodaySessions])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    )
  }

  return user ? <Timer /> : <Login />
}
