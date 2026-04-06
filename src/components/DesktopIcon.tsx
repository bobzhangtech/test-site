import { useCallback } from 'react'
import { useWindowStore, type AppId } from '../store/windowStore'

interface DesktopIconProps {
  appId: AppId
  label: string
  icon: string
  isSelected: boolean
  onSelect: () => void
}

export default function DesktopIcon({ appId, label, icon, isSelected, onSelect }: DesktopIconProps) {
  const openWindow = useWindowStore((s) => s.openWindow)

  const handleDoubleClick = useCallback(() => {
    openWindow(appId)
  }, [appId, openWindow])

  return (
    <div
      className="flex flex-col items-center justify-start gap-1 w-[80px] cursor-default p-1"
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
      onDoubleClick={handleDoubleClick}
    >
      <div className="text-[48px] leading-none select-none drop-shadow-lg">
        {icon}
      </div>
      <span
        className={`
          text-[11px] leading-tight text-center px-1 py-0.5 rounded max-w-full truncate
          ${isSelected
            ? 'bg-[#3b82f6] text-white'
            : 'text-white'
          }
        `}
        style={{
          textShadow: isSelected ? 'none' : '0 1px 3px rgba(0,0,0,0.8)',
        }}
      >
        {label}
      </span>
    </div>
  )
}
