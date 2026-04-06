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
      <div className="relative w-screen h-screen overflow-hidden">
        <Desktop />
        {booted && (
          <>
            <MenuBar />
            <WindowManager />
            <Dock />
          </>
        )}
      </div>
      {!booted && <BootScreen />}
    </>
  )
}
