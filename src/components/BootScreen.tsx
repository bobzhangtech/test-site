import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWindowStore } from '../store/windowStore'

export default function BootScreen() {
  const setBoot = useWindowStore((s) => s.setBoot)
  const [progress, setProgress] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const duration = 2500
    const interval = 30
    const step = 100 / (duration / interval)
    const timer = setInterval(() => {
      setProgress((p) => {
        const next = p + step + Math.random() * 2
        if (next >= 100) {
          clearInterval(timer)
          setFading(true)
          setTimeout(() => setBoot(true), 600)
          return 100
        }
        return next
      })
    }, interval)
    return () => clearInterval(timer)
  }, [setBoot])

  return (
    <AnimatePresence>
      {!fading ? (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1a1a1a]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Apple Logo */}
          <svg
            width="64"
            height="78"
            viewBox="0 0 814 1000"
            fill="white"
            style={{ marginBottom: '72px' }}
          >
            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57.8-155.5-127.4c-58.3-81.5-105.9-207.5-105.9-327.4 0-192.8 125.5-295.1 248.7-295.1 65.5 0 120.1 43.1 161.3 43.1 39.2 0 100.2-45.8 174-45.8 28.1 0 129 2.6 195.5 99.1zm-282.4-187.6c30.7-36.5 52.4-87.2 52.4-137.9 0-7.1-.6-14.2-1.9-20C503.5 2.6 449.5 33.9 416.1 75.5c-26.8 32-53.7 82.7-53.7 134.1 0 7.8.7 15.5 1.3 18.1 2.2.3 5.8.6 9.3.6 48.4 0 101.4-29.4 132.7-74z" />
          </svg>

          {/* Progress Bar */}
          <div className="w-48 h-1.5 bg-[#444] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#1a1a1a]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </AnimatePresence>
  )
}
