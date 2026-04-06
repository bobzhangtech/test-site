import { useState, useRef, useCallback, useEffect } from 'react'
import { useWindowStore, type AppId } from '../store/windowStore'

interface DockItem {
  appId: AppId
  label: string
  icon: string
}

const DOCK_ITEMS: DockItem[] = [
  { appId: 'finder', label: 'Finder', icon: '📁' },
  { appId: 'safari', label: 'Safari', icon: '🧭' },
  { appId: 'textedit', label: 'TextEdit', icon: '📝' },
  { appId: 'preview', label: 'Preview', icon: '📄' },
  { appId: 'terminal', label: 'Terminal', icon: '🖥️' },
]

const BASE_SIZE = 48
const MAX_SCALE = 1.5
const MAGNIFICATION_RANGE = 150

function getScale(mouseX: number | null, index: number): number {
  if (mouseX === null) return 1
  const iconCenter = index * (BASE_SIZE + 8) + BASE_SIZE / 2 + 12
  const distance = Math.abs(mouseX - iconCenter)
  if (distance > MAGNIFICATION_RANGE) return 1
  return 1 + (MAX_SCALE - 1) * (1 - distance / MAGNIFICATION_RANGE)
}

export default function Dock() {
  const openWindow = useWindowStore((s) => s.openWindow)
  const windows = useWindowStore((s) => s.windows)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const dockRef = useRef<HTMLDivElement>(null)
  const iconEls = useRef<(HTMLDivElement | null)[]>([])
  const rafId = useRef<number>(0)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dockRef.current) return
    const rect = dockRef.current.getBoundingClientRect()
    const mx = e.clientX - rect.left

    cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(() => {
      for (let i = 0; i < DOCK_ITEMS.length; i++) {
        const el = iconEls.current[i]
        if (!el) continue
        const scale = getScale(mx, i)
        el.style.transform = `scale(${scale})`
      }
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null)
    cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(() => {
      for (let i = 0; i < DOCK_ITEMS.length; i++) {
        const el = iconEls.current[i]
        if (!el) continue
        el.style.transform = 'scale(1)'
      }
    })
  }, [])

  useEffect(() => {
    return () => cancelAnimationFrame(rafId.current)
  }, [])

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-[8999]">
      {/* Dock container */}
      <div
        ref={dockRef}
        className="flex items-end gap-2 px-3 pb-1 pt-1 rounded-2xl"
        style={{
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {DOCK_ITEMS.map((item, index) => {
          const isOpen = windows.some((w) => w.appId === item.appId && w.isOpen)
          const isHovered = hoveredIndex === index

          return (
            <div
              key={item.appId}
              className="relative flex flex-col items-center cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onClick={() => openWindow(item.appId)}
            >
              {/* Tooltip */}
              {isHovered && (
                <div
                  className="absolute bottom-full left-1/2 -translate-x-1/2 pointer-events-none z-10"
                  style={{ marginBottom: '16px' }}
                >
                  <div className="bg-[rgba(30,30,30,0.85)] text-white text-[11px] px-2.5 py-1 rounded-md whitespace-nowrap backdrop-blur-sm">
                    {item.label}
                  </div>
                </div>
              )}
              <div
                ref={(el) => { iconEls.current[index] = el }}
                className="flex items-center justify-center select-none"
                style={{
                  width: BASE_SIZE,
                  height: BASE_SIZE,
                  fontSize: BASE_SIZE * 0.7,
                  transformOrigin: 'bottom center',
                  willChange: 'transform',
                }}
              >
                {item.icon}
              </div>
              {/* Open indicator dot */}
              <div
                className={`w-1 h-1 rounded-full mb-0.5 ${isOpen ? 'bg-white/80' : 'bg-transparent'}`}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
