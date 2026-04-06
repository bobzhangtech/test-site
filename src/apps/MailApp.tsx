import { SOCIAL_LINKS, OWNER_NAME } from '../data/portfolio'

export default function MailApp() {
  const email = SOCIAL_LINKS.find((l) => l.name === 'Email')?.url.replace('mailto:', '') ?? 'hello@example.com'

  return (
    <div className="flex flex-col h-full text-[13px]">
      {/* Mail toolbar */}
      <div
        className="flex items-center h-[36px] px-3 border-b border-[#c8c8c8] gap-3 shrink-0"
        style={{ background: 'linear-gradient(180deg, #f2f2f2 0%, #e6e6e6 100%)' }}
      >
        <span className="text-[11px] text-[#666] cursor-default">📨 New Message</span>
      </div>

      {/* Compose area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header fields */}
        <div className="border-b border-[#e0e0e0] bg-[#fafafa]">
          <div className="flex items-center px-4 py-1.5 border-b border-[#eee]">
            <span className="text-[12px] text-[#888] w-14">To:</span>
            <span className="text-[12px] text-[#333]">{OWNER_NAME}</span>
          </div>
          <div className="flex items-center px-4 py-1.5 border-b border-[#eee]">
            <span className="text-[12px] text-[#888] w-14">From:</span>
            <span className="text-[12px] text-[#999]">visitor@portfolio.dev</span>
          </div>
          <div className="flex items-center px-4 py-1.5">
            <span className="text-[12px] text-[#888] w-14">Subject:</span>
            <span className="text-[12px] text-[#333]">Let's connect!</span>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-md">
            <p className="text-[13px] text-[#333] leading-relaxed mb-6">
              Want to get in touch? Here's how you can reach me:
            </p>

            <div className="space-y-3 mb-6">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target={link.url.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2.5 rounded bg-[#f5f5f5] hover:bg-[#eef] transition-colors no-underline cursor-default"
                >
                  <span className="text-[20px]">
                    {link.icon === 'github' ? '🐙' : link.icon === 'linkedin' ? '💼' : '📧'}
                  </span>
                  <div>
                    <div className="text-[13px] text-[#333] font-medium">{link.name}</div>
                    <div className="text-[11px] text-[#888]">
                      {link.url.replace('mailto:', '')}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded text-[12px] text-white no-underline cursor-default"
              style={{
                background: 'linear-gradient(180deg, #5ba5f7 0%, #3b82f6 100%)',
                boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
              }}
            >
              ✉️ Send Email
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
