import { create } from 'zustand'

export type AppId = 'finder' | 'safari' | 'textedit' | 'preview' | 'terminal'

export interface WindowState {
  id: string
  appId: AppId
  title: string
  isOpen: boolean
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
  position: { x: number; y: number }
  size: { width: number; height: number }
  defaultSize: { width: number; height: number }
  defaultPosition: { x: number; y: number }
}

const APP_DEFAULTS: Record<AppId, { title: string; width: number; height: number }> = {
  finder: { title: 'Finder — Projects', width: 780, height: 500 },
  safari: { title: 'Safari — Links', width: 800, height: 550 },
  textedit: { title: 'About Me — TextEdit', width: 600, height: 450 },
  preview: { title: 'Resume — Preview', width: 650, height: 550 },
  terminal: { title: 'Terminal', width: 600, height: 400 },
}

function getDefaultPosition(appId: AppId): { x: number; y: number } {
  const defaults = APP_DEFAULTS[appId]
  const menuBarHeight = 25
  const dockHeight = 70
  const usableHeight = window.innerHeight - menuBarHeight - dockHeight
  const x = Math.max(0, (window.innerWidth - defaults.width) / 2)
  const y = Math.max(0, menuBarHeight + (usableHeight - defaults.height) / 2)
  return { x, y }
}

interface WindowStore {
  windows: WindowState[]
  maxZIndex: number
  activeWindowId: string | null
  booted: boolean
  setBoot: (booted: boolean) => void
  openWindow: (appId: AppId) => void
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  toggleMaximize: (id: string) => void
  focusWindow: (id: string) => void
  updatePosition: (id: string, pos: { x: number; y: number }) => void
  updateSize: (id: string, size: { width: number; height: number }) => void
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  maxZIndex: 10,
  activeWindowId: null,
  booted: false,

  setBoot: (booted) => set({ booted }),

  openWindow: (appId) => {
    const { windows, maxZIndex } = get()
    const existing = windows.find((w) => w.appId === appId)

    if (existing) {
      if (existing.isMinimized) {
        set({
          windows: windows.map((w) =>
            w.id === existing.id
              ? { ...w, isMinimized: false, isOpen: true, zIndex: maxZIndex + 1 }
              : w
          ),
          maxZIndex: maxZIndex + 1,
          activeWindowId: existing.id,
        })
      } else {
        // Focus existing window
        set({
          windows: windows.map((w) =>
            w.id === existing.id ? { ...w, zIndex: maxZIndex + 1 } : w
          ),
          maxZIndex: maxZIndex + 1,
          activeWindowId: existing.id,
        })
      }
      return
    }

    const defaults = APP_DEFAULTS[appId]
    const pos = getDefaultPosition(appId)
    const newWindow: WindowState = {
      id: `${appId}-${Date.now()}`,
      appId,
      title: defaults.title,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: maxZIndex + 1,
      position: pos,
      size: { width: defaults.width, height: defaults.height },
      defaultSize: { width: defaults.width, height: defaults.height },
      defaultPosition: pos,
    }

    set({
      windows: [...windows, newWindow],
      maxZIndex: maxZIndex + 1,
      activeWindowId: newWindow.id,
    })
  },

  closeWindow: (id) => {
    const { windows } = get()
    const remaining = windows.filter((w) => w.id !== id)
    const topWindow = remaining
      .filter((w) => w.isOpen && !w.isMinimized)
      .sort((a, b) => b.zIndex - a.zIndex)[0]
    set({
      windows: remaining,
      activeWindowId: topWindow?.id ?? null,
    })
  },

  minimizeWindow: (id) => {
    const { windows } = get()
    const remaining = windows.map((w) =>
      w.id === id ? { ...w, isMinimized: true } : w
    )
    const topWindow = remaining
      .filter((w) => w.isOpen && !w.isMinimized)
      .sort((a, b) => b.zIndex - a.zIndex)[0]
    set({
      windows: remaining,
      activeWindowId: topWindow?.id ?? null,
    })
  },

  toggleMaximize: (id) => {
    const { windows } = get()
    set({
      windows: windows.map((w) => {
        if (w.id !== id) return w
        if (w.isMaximized) {
          return {
            ...w,
            isMaximized: false,
            position: w.defaultPosition,
            size: w.defaultSize,
          }
        }
        return {
          ...w,
          isMaximized: true,
          position: { x: 0, y: 0 },
          size: {
            width: window.innerWidth,
            height: window.innerHeight - 25,
          },
        }
      }),
    })
  },

  focusWindow: (id) => {
    const { windows, maxZIndex } = get()
    set({
      windows: windows.map((w) =>
        w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w
      ),
      maxZIndex: maxZIndex + 1,
      activeWindowId: id,
    })
  },

  updatePosition: (id, pos) => {
    const { windows } = get()
    set({
      windows: windows.map((w) =>
        w.id === id ? { ...w, position: pos } : w
      ),
    })
  },

  updateSize: (id, size) => {
    const { windows } = get()
    set({
      windows: windows.map((w) =>
        w.id === id ? { ...w, size } : w
      ),
    })
  },
}))
