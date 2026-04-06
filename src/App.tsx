import { useWindowStore } from './store/windowStore'
import BootScreen from './components/BootScreen'
import Desktop from './components/Desktop'
import MenuBar from './components/MenuBar'
import Dock from './components/Dock'
import WindowManager from './components/WindowManager'

export default function App() {
  const booted = useWindowStore((s) => s.booted)

  return (
    <>
      <style>{`
        .small-screen-msg { display: none; }
        .desktop-ui { display: block; }
        @media (max-width: 767px), (max-height: 499px) {
          .small-screen-msg { display: flex; }
          .desktop-ui { display: none; }
        }
      `}</style>

      {/* Small screen message — shown when width < 768px OR height < 500px */}
      <div className="small-screen-msg fixed inset-0 z-[99999] flex-col items-center justify-center px-8 text-center"
        style={{ background: 'linear-gradient(135deg, #2b1055 0%, #1a0a2e 100%)' }}
      >
        <div className="text-5xl mb-6">🖥️</div>
        <h1 className="text-white text-xl font-semibold mb-3">Bob's Portfolio</h1>
        <p className="text-white/70 text-sm leading-relaxed max-w-xs">
          This site is best experienced in a larger window. If you're on mobile, please visit on a desktop computer. Otherwise, try resizing your browser window.
        </p>
      </div>

      {/* Desktop UI */}
      <div className="desktop-ui relative w-screen h-screen overflow-hidden">
        <Desktop />
        <MenuBar />
        {booted && <WindowManager />}
        <Dock />
      </div>
      {!booted && <BootScreen />}
    </>
  )
}
