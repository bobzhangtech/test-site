import { SOCIAL_LINKS } from '../data/portfolio'

const BOOKMARKS = [
  { name: 'GitHub', url: SOCIAL_LINKS.find((l) => l.name === 'GitHub')?.url ?? '#', icon: '🐙' },
  { name: 'LinkedIn', url: SOCIAL_LINKS.find((l) => l.name === 'LinkedIn')?.url ?? '#', icon: '💼' },
  { name: 'X', url: SOCIAL_LINKS.find((l) => l.name === 'X')?.url ?? '#', icon: '𝕏' },
]

export default function SafariApp() {
  return (
    <div className="flex flex-col h-full text-[13px]">
      {/* URL bar */}
      <div
        className="flex items-center h-[36px] px-3 border-b border-[#c8c8c8] gap-2 shrink-0"
        style={{ background: 'linear-gradient(180deg, #f2f2f2 0%, #e6e6e6 100%)' }}
      >
        <div className="flex items-center gap-1.5">
          <span className="text-[14px] text-[#999] cursor-default">◀</span>
          <span className="text-[14px] text-[#999] cursor-default">▶</span>
        </div>
        <div className="flex-1 h-[22px] rounded bg-white border border-[#c8c8c8] px-2 flex items-center">
          <span className="text-[12px] text-[#999] truncate">bobzhang.dev/links</span>
        </div>
      </div>

      {/* Bookmarks bar */}
      <div
        className="flex items-center h-[28px] px-3 border-b border-[#c8c8c8] gap-4 shrink-0"
        style={{ background: '#f8f8f8' }}
      >
        {BOOKMARKS.map((b) => (
          <a
            key={b.name}
            href={b.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-[#555] hover:text-[#3b82f6] no-underline cursor-default"
          >
            {b.icon} {b.name}
          </a>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6" style={{ background: '#fafafa' }}>
        <div className="max-w-lg mx-auto">
          <h2 className="text-[18px] font-medium text-[#222] mb-1 text-center">Links & Profiles</h2>
          <p className="text-[12px] text-[#888] mb-6 text-center">Find me around the web</p>

          <div className="grid gap-3">
            {BOOKMARKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[#e0e0e0] hover:border-[#3b82f6] hover:shadow-sm transition-all no-underline cursor-default"
              >
                <span className="text-[28px] w-[28px] h-[28px] flex items-center justify-center">{link.icon}</span>
                <div>
                  <div className="text-[14px] font-medium text-[#333]">{link.name}</div>
                  <div className="text-[11px] text-[#999]">{link.url}</div>
                </div>
                <span className="ml-auto text-[14px] text-[#ccc]">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
