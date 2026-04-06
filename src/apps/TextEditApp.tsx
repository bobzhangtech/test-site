import { ABOUT_ME, OWNER_NAME } from '../data/portfolio'

export default function TextEditApp() {
  return (
    <div className="flex flex-col h-full text-[13px]">
      {/* Toolbar */}
      <div
        className="flex items-center h-[30px] px-3 border-b border-[#c8c8c8] gap-3 shrink-0"
        style={{ background: 'linear-gradient(180deg, #f2f2f2 0%, #e6e6e6 100%)' }}
      >
        <span className="text-[11px] text-[#666] cursor-default">Lucida Grande</span>
        <span className="text-[11px] text-[#666] cursor-default">|</span>
        <span className="text-[11px] font-bold text-[#666] cursor-default">B</span>
        <span className="text-[11px] italic text-[#666] cursor-default">I</span>
        <span className="text-[11px] underline text-[#666] cursor-default">U</span>
      </div>

      {/* Document area */}
      <div
        className="flex-1 overflow-y-auto"
        style={{
          background: `
            linear-gradient(transparent 95%, #e0e0e0 95%),
            linear-gradient(#fefefe 0%, #fefefe 100%)
          `,
          backgroundSize: '100% 24px',
        }}
      >
        <div className="p-8 max-w-lg mx-auto">
          <h1 className="text-[22px] font-normal text-[#222] mb-4">
            About {OWNER_NAME}
          </h1>
          {ABOUT_ME.trim().split('\n\n').map((paragraph, i) => (
            <p
              key={i}
              className="text-[13px] text-[#333] leading-[24px] mb-4"
            >
              {paragraph.trim()}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
