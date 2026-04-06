import { useEffect, useState } from 'react'
import { useWindowStore } from '../store/windowStore'

export default function MenuBar() {
  const activeWindowId = useWindowStore((s) => s.activeWindowId)
  const windows = useWindowStore((s) => s.windows)
  const [time, setTime] = useState(new Date())

  // Clock — update every second so minute changes are instant
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const activeWindow = windows.find((w) => w.id === activeWindowId)
  const appName = activeWindow ? activeWindow.title.split('—')[0].trim() : 'Finder'

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

  const formattedDate = time.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })


  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9000] flex items-center justify-between h-[25px] px-4 text-[13px]"
      style={{
        background: 'rgba(232, 232, 232, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.15)',
        color: '#333',
        fontFamily: '"Lucida Grande", "Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
      {/* Left side */}
      <div className="flex items-center gap-4">
        <span className="text-[16px] font-bold opacity-80 cursor-default"></span>
        <span className="font-semibold cursor-default">{appName}</span>
        <span className="opacity-70 cursor-default">File</span>
        <span className="opacity-70 cursor-default">Edit</span>
        <span className="opacity-70 cursor-default">View</span>
        <span className="opacity-70 cursor-default">Window</span>
        <span className="opacity-70 cursor-default">Help</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 text-[12px]">
        {/* Wi-Fi */}
        <span className="opacity-70 cursor-default">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
          </svg>
        </span>
        {/* Battery */}
        <span className="opacity-70 cursor-default flex items-center gap-1">
          <svg width="20" height="12" viewBox="0 0 25 12" fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="1" y="1" width="20" height="10" rx="2" />
            <rect x="2.5" y="2.5" width="17" height="7" rx="1" fill="currentColor" opacity="0.5" />
            <rect x="22" y="3.5" width="2" height="5" rx="0.5" fill="currentColor" />
          </svg>
        </span>
        {/* Date & Time */}
        <span className="cursor-default">{formattedDate} {formattedTime}</span>
      </div>
    </div>
  )
}
