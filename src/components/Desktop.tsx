import { useState, useRef, useCallback, useEffect } from 'react'
import DesktopIcon from './DesktopIcon'
import type { AppId } from '../store/windowStore'

interface DesktopItem {
  appId: AppId
  label: string
  icon: string
}

const DESKTOP_ITEMS: DesktopItem[] = [
  { appId: 'finder', label: 'Projects', icon: '📁' },
  { appId: 'safari', label: 'Links', icon: '🌐' },
  { appId: 'textedit', label: 'About Me', icon: '📝' },
  { appId: 'mail', label: 'Contact', icon: '✉️' },
  { appId: 'preview', label: 'Resume', icon: '📄' },
  { appId: 'terminal', label: 'Terminal', icon: '🖥️' },
]

interface SelectionRect {
  startX: number
  startY: number
  currentX: number
  currentY: number
}

function rectsOverlap(
  a: { left: number; top: number; right: number; bottom: number },
  b: { left: number; top: number; right: number; bottom: number },
) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top
}

export default function Desktop() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [selection, setSelection] = useState<SelectionRect | null>(null)
  const desktopRef = useRef<HTMLDivElement>(null)
  const iconRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const isDragging = useRef(false)

  const getSelectionBox = useCallback((sel: SelectionRect) => {
    const left = Math.min(sel.startX, sel.currentX)
    const top = Math.min(sel.startY, sel.currentY)
    const right = Math.max(sel.startX, sel.currentX)
    const bottom = Math.max(sel.startY, sel.currentY)
    return { left, top, right, bottom, width: right - left, height: bottom - top }
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Only start selection from the desktop background itself
    if (e.target !== desktopRef.current) return
    e.preventDefault()
    isDragging.current = false
    setSelection({
      startX: e.clientX,
      startY: e.clientY,
      currentX: e.clientX,
      currentY: e.clientY,
    })
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!selection) return
      isDragging.current = true
      setSelection((prev) =>
        prev ? { ...prev, currentX: e.clientX, currentY: e.clientY } : null
      )

      // Check which icons are inside the selection rectangle
      const box = getSelectionBox({
        ...selection,
        currentX: e.clientX,
        currentY: e.clientY,
      })
      const hits = new Set<string>()
      iconRefs.current.forEach((el, appId) => {
        const rect = el.getBoundingClientRect()
        if (rectsOverlap(box, { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom })) {
          hits.add(appId)
        }
      })
      setSelectedIds(hits)
    }

    const handleMouseUp = () => {
      if (selection && !isDragging.current) {
        // Was a click, not a drag — clear selection
        setSelectedIds(new Set())
      }
      setSelection(null)
      isDragging.current = false
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [selection, getSelectionBox])

  const selectionBox = selection && isDragging.current ? getSelectionBox(selection) : null

  return (
    <div
      ref={desktopRef}
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('${import.meta.env.BASE_URL}wallpaper.jpg')`,
        backgroundColor: '#2b1055',
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Selection rectangle */}
      {selectionBox && selectionBox.width > 3 && (
        <div
          className="fixed z-[2] pointer-events-none"
          style={{
            left: selectionBox.left,
            top: selectionBox.top,
            width: selectionBox.width,
            height: selectionBox.height,
            background: 'rgba(59, 130, 246, 0.15)',
            border: '1px solid rgba(59, 130, 246, 0.5)',
            borderRadius: '1px',
          }}
        />
      )}

      {/* Desktop icon grid */}
      <div
        className="absolute top-8 right-6 z-[1] grid gap-2"
        style={{
          gridTemplateRows: 'repeat(auto-fill, 90px)',
          gridAutoFlow: 'column',
          gridAutoColumns: '90px',
          maxHeight: 'calc(100vh - 120px)',
          direction: 'rtl',
        }}
      >
        {DESKTOP_ITEMS.map((item) => (
          <div
            key={item.appId}
            style={{ direction: 'ltr' }}
            ref={(el) => {
              if (el) iconRefs.current.set(item.appId, el)
            }}
          >
            <DesktopIcon
              appId={item.appId}
              label={item.label}
              icon={item.icon}
              isSelected={selectedIds.has(item.appId)}
              onSelect={() => setSelectedIds(new Set([item.appId]))}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
