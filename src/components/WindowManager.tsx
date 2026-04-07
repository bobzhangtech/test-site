import { useWindowStore } from '../store/windowStore'
import Window from './Window'
import FinderApp from '../apps/FinderApp'
import SafariApp from '../apps/SafariApp'
import TextEditApp from '../apps/TextEditApp'
import PreviewApp from '../apps/PreviewApp'
import TerminalApp from '../apps/TerminalApp'

const APP_COMPONENTS: Record<string, React.ComponentType<{ windowId?: string }>> = {
  finder: FinderApp,
  safari: SafariApp,
  textedit: TextEditApp,
  preview: PreviewApp,
  terminal: TerminalApp,
}

export default function WindowManager() {
  const windows = useWindowStore((s) => s.windows)

  return (
    <div className="absolute inset-0 top-[25px] z-[100] pointer-events-none">
      {windows.map((w) => {
        const AppComponent = APP_COMPONENTS[w.appId]
        return (
          <Window key={w.id} windowState={w}>
            <AppComponent windowId={w.id} />
          </Window>
        )
      })}
    </div>
  )
}
