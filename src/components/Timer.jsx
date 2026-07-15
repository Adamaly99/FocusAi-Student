'use client'

import { useState, useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { usePomodoroStore } from '../store/pomodoroStore'
export default function Timer() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  
  const user = useAuthStore((state) => state.user)
  const addSession = usePomodoroStore((state) => state.addSession)
  const todaySessions = usePomodoroStore((state) => state.todaySessions)

  useEffect(() => {
    let interval = null

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false)
            playNotification()
            if (user) {
              addSession(user.id, 25)
              setMinutes(25)
              setSeconds(0)
            }
          } else {
            setMinutes((m) => m - 1)
            setSeconds(59)
          }
        } else {
          setSeconds((s) => s - 1)
        }
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isActive, minutes, seconds, user, addSession])

  const playNotification = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = 800
      oscillator.type = 'sine'

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    } catch (e) {
      console.log('Audio not available')
    }
  }

  const handleStart = () => setIsActive(!isActive)
  const handleReset = () => {
    setIsActive(false)
    setMinutes(25)
    setSeconds(0)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Focus Mode
        </h2>

        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-12 mb-8 text-center">
          <div className="text-7xl font-bold text-white font-mono tracking-tight">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={handleStart}
            className="flex-1 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold py-3 px-4 rounded-lg transition transform"
          >
            {isActive ? '⏸ Pause' : '▶ Start'}
          </button>
          <button
            onClick={handleReset}
            className="flex-1 bg-gray-400 hover:bg-gray-500 active:scale-95 text-white font-bold py-3 px-4 rounded-lg transition transform"
          >
            🔄 Reset
          </button>
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Today: <span className="font-bold text-lg text-blue-600">{todaySessions.length}</span> sessions
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            {todaySessions.reduce((sum, s) => sum + (s.duration || 0), 0)} minutes
          </p>
        </div>
      </div>
    </div>
  )
}
