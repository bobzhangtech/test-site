import { RESUME_CONTENT } from '../data/portfolio'

export default function PreviewApp() {
  return (
    <div className="flex flex-col h-full text-[13px]">
      {/* Toolbar */}
      <div
        className="flex items-center justify-center h-[30px] px-3 border-b border-[#c8c8c8] shrink-0"
        style={{ background: 'linear-gradient(180deg, #f2f2f2 0%, #e6e6e6 100%)' }}
      >
        <span className="text-[11px] text-[#666]">Resume.pdf — Page 1 of 1</span>
      </div>

      {/* Document viewer */}
      <div className="flex-1 overflow-y-auto bg-[#525252] p-6 flex justify-center items-start">
        {/* Page */}
        <div
          className="bg-white shadow-lg w-full max-w-[540px]"
          style={{
            padding: '48px 48px',
            minHeight: '700px',
          }}
        >
          {/* Header */}
          <div className="text-center border-b-2 border-[#333] pb-4 mb-6">
            <h1 className="text-[24px] font-bold text-[#222] tracking-wide">
              {RESUME_CONTENT.name}
            </h1>
            <p className="text-[13px] text-[#666] mt-1">{RESUME_CONTENT.title}</p>
          </div>

          {/* Sections */}
          {RESUME_CONTENT.sections.map((section) => (
            <div key={section.heading} className="mb-5">
              <h2 className="text-[14px] font-bold text-[#222] uppercase tracking-wider border-b border-[#ddd] pb-1 mb-3">
                {section.heading}
              </h2>
              {section.items.map((item, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-[13px] font-semibold text-[#333]">
                      {item.title}
                    </h3>
                  </div>
                  {item.subtitle && (
                    <p className="text-[11px] text-[#888] italic">{item.subtitle}</p>
                  )}
                  <p className="text-[12px] text-[#555] mt-0.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
