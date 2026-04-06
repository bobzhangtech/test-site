import { useCallback, type ReactNode } from 'react'
import { Rnd } from 'react-rnd'
import { motion } from 'framer-motion'
import TrafficLights from './TrafficLights'
import { useWindowStore, type WindowState } from '../store/windowStore'

interface WindowProps {
  windowState: WindowState
  children: ReactNode
}

export default function Window({ windowState, children }: WindowProps) {
  const { id, title, isMaximized, zIndex, position, size } = windowState
  const closeWindow = useWindowStore((s) => s.closeWindow)
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow)
  const toggleMaximize = useWindowStore((s) => s.toggleMaximize)
  const focusWindow = useWindowStore((s) => s.focusWindow)
  const updatePosition = useWindowStore((s) => s.updatePosition)
  const updateSize = useWindowStore((s) => s.updateSize)
  const activeWindowId = useWindowStore((s) => s.activeWindowId)

  const isActive = activeWindowId === id

  const handleMouseDown = useCallback(() => {
    focusWindow(id)
  }, [id, focusWindow])

  return (
    <Rnd
      position={position}
      size={size}
      onDragStart={handleMouseDown}
      onDragStop={(_e, d) => updatePosition(id, { x: d.x, y: d.y })}
      onResizeStop={(_e, _dir, ref, _delta, pos) => {
        updateSize(id, { width: ref.offsetWidth, height: ref.offsetHeight })
        updatePosition(id, pos)
      }}
      dragHandleClassName="window-drag-handle"
      minWidth={300}
      minHeight={200}
      bounds="parent"
      style={{ zIndex, position: 'absolute', pointerEvents: 'auto' }}
      disableDragging={isMaximized}
      enableResizing={!isMaximized ? {
        top: false,
        topLeft: false,
        topRight: false,
        bottom: true,
        bottomLeft: true,
        bottomRight: true,
        left: true,
        right: true,
      } : false}
    >
      <motion.div
        className="flex flex-col w-full h-full rounded-md overflow-hidden"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        onMouseDown={handleMouseDown}
        style={{
          boxShadow: isActive
            ? '0 10px 30px rgba(0,0,0,0.35), 0 0 1px rgba(0,0,0,0.2)'
            : '0 5px 15px rgba(0,0,0,0.2), 0 0 1px rgba(0,0,0,0.15)',
        }}
      >
        {/* Title bar */}
        <div
          className="window-drag-handle flex items-center h-[22px] shrink-0 relative cursor-default"
          style={{
            background: isActive
              ? 'linear-gradient(180deg, #e8e8e8 0%, #d0d0d0 100%)'
              : 'linear-gradient(180deg, #f4f4f4 0%, #e8e8e8 100%)',
            borderBottom: '1px solid #b0b0b0',
          }}
          onDoubleClick={() => toggleMaximize(id)}
        >
          <TrafficLights
            onClose={() => closeWindow(id)}
            onMinimize={() => minimizeWindow(id)}
            onMaximize={() => toggleMaximize(id)}
          />
          <span
            className="absolute left-1/2 -translate-x-1/2 text-[13px] font-medium truncate max-w-[60%] text-center"
            style={{
              color: isActive ? '#333' : '#999',
            }}
          >
            {title}
          </span>
        </div>

        {/* Window content */}
        <div className="flex-1 overflow-auto bg-white">
          {children}
        </div>
      </motion.div>
    </Rnd>
  )
}
