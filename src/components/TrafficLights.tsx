import { useState } from 'react'

interface TrafficLightsProps {
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
}

export default function TrafficLights({ onClose, onMinimize, onMaximize }: TrafficLightsProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative z-50 flex items-center gap-2 px-3 py-2 -my-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Close */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        className="w-[12px] h-[12px] rounded-full flex items-center justify-center border-0 p-0"
        style={{
          background: 'linear-gradient(#ff6058, #e33e32)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 0 0.5px 1px rgba(0,0,0,0.2)',
          cursor: 'default',
        }}
      >
        {hovered && (
          <svg width="6" height="6" viewBox="0 0 6 6" fill="none" stroke="#4d0000" strokeWidth="1.2" strokeLinecap="round">
            <line x1="0.5" y1="0.5" x2="5.5" y2="5.5" />
            <line x1="5.5" y1="0.5" x2="0.5" y2="5.5" />
          </svg>
        )}
      </button>

      {/* Minimize */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onMinimize()
        }}
        className="w-[12px] h-[12px] rounded-full flex items-center justify-center border-0 p-0"
        style={{
          background: 'linear-gradient(#ffc130, #e5a100)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 0 0.5px 1px rgba(0,0,0,0.2)',
          cursor: 'default',
        }}
      >
        {hovered && (
          <svg width="6" height="2" viewBox="0 0 6 2" fill="none" stroke="#995700" strokeWidth="1.2" strokeLinecap="round">
            <line x1="0.5" y1="1" x2="5.5" y2="1" />
          </svg>
        )}
      </button>

      {/* Zoom */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onMaximize()
        }}
        className="w-[12px] h-[12px] rounded-full flex items-center justify-center border-0 p-0"
        style={{
          background: 'linear-gradient(#2dcc3e, #1aaa29)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 0 0.5px 1px rgba(0,0,0,0.2)',
          cursor: 'default',
        }}
      >
        {hovered && (
          <svg width="6" height="6" viewBox="0 0 6 6" fill="none" stroke="#006500" strokeWidth="1.2" strokeLinecap="round">
            <line x1="1" y1="3" x2="5" y2="3" />
            <line x1="3" y1="1" x2="3" y2="5" />
          </svg>
        )}
      </button>
    </div>
  )
}
