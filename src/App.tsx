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
      {/* Mobile message */}
      <div className="md:hidden fixed inset-0 z-[99999] flex flex-col items-center justify-center px-8 text-center"
        style={{ background: 'linear-gradient(135deg, #2b1055 0%, #1a0a2e 100%)' }}
      >
        <div className="text-5xl mb-6">🖥️</div>
        <h1 className="text-white text-xl font-semibold mb-3">Bob's Portfolio</h1>
        <p className="text-white/70 text-sm leading-relaxed max-w-xs">
          This site is best experienced on a desktop computer. Please visit on a larger screen to explore the full interactive experience.
        </p>
      </div>

      {/* Desktop UI */}
      <div className="relative w-screen h-screen overflow-hidden hidden md:block">
        <Desktop />
        <MenuBar />
        {booted && <WindowManager />}
        <Dock />
      </div>
      {!booted && <BootScreen />}
    </>
  )
}
