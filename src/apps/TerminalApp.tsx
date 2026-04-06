import { useState, useRef, useEffect, useCallback } from 'react'
import { OWNER_NAME, PROJECTS, SOCIAL_LINKS, ABOUT_ME } from '../data/portfolio'

interface TerminalLine {
  type: 'input' | 'output'
  text: string
}

const HELP_TEXT = `Available commands:
  help      Show this help message
  about     About ${OWNER_NAME}
  projects  List projects
  skills    Show tech skills
  contact   Contact information
  clear     Clear terminal
  whoami    Who are you?
  ls        List desktop items
  pwd       Print working directory
  date      Show current date
  echo      Echo text back

Easter eggs? Try: sudo hire-me, cat readme.txt, neofetch`

function processCommand(cmd: string): string {
  const trimmed = cmd.trim().toLowerCase()
  const parts = trimmed.split(/\s+/)
  const command = parts[0]

  switch (command) {
    case 'help':
      return HELP_TEXT
    case 'about':
      return ABOUT_ME.trim()
    case 'projects':
      return PROJECTS.map((p) => `  📁 ${p.name} — ${p.techStack.join(', ')}`).join('\n')
    case 'skills':
      return `Languages:  TypeScript, JavaScript, Python, SQL, HTML/CSS
Frameworks: React, Node.js, Express, Next.js
Tools:      Git, Docker, AWS, Linux, CI/CD
Databases:  PostgreSQL, MongoDB, Redis`
    case 'contact':
      return SOCIAL_LINKS.map((l) => `  ${l.name}: ${l.url}`).join('\n')
    case 'clear':
      return '__CLEAR__'
    case 'whoami':
      return 'visitor — Welcome to the portfolio!'
    case 'ls':
      return 'Projects/  Links/  About Me.txt  Contact.txt  Resume.pdf  Terminal.app'
    case 'pwd':
      return `/Users/${OWNER_NAME.toLowerCase()}/Desktop`
    case 'date':
      return new Date().toString()
    case 'echo':
      return parts.slice(1).join(' ') || ''
    case 'sudo':
      if (parts.slice(1).join(' ') === 'hire-me') {
        return `🎉 ${OWNER_NAME} would love to hear from you! Send an email to get started.`
      }
      return `Password: Nice try! 😄`
    case 'cat':
      if (parts[1] === 'readme.txt' || parts[1] === 'readme') {
        return `# ${OWNER_NAME}'s Portfolio\n\nThanks for exploring! This portfolio is built with React, TypeScript, and lots of CSS magic to recreate the Mac OS X Lion experience.`
      }
      return `cat: ${parts[1] || ''}: No such file or directory`
    case 'neofetch':
      return `       .:'          visitor@bob-portfolio
   _ :'_           --------------------------
.'\`_\`-'_\`\`.        OS: Mac OS X Lion (Web Edition)
:________.-'        Shell: portfolio-sh 1.0
:_______:           Theme: Aqua/Lion
 :_______\`-;       Terminal: TerminalApp.tsx
  \`._.-._.'        CPU: Your Browser Engine
                    Memory: A few DOM nodes`
    case '':
      return ''
    default:
      return `zsh: command not found: ${command}`
  }
}

export default function TerminalApp() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', text: `Welcome to ${OWNER_NAME}'s Portfolio Terminal` },
    { type: 'output', text: 'Type "help" for available commands.\n' },
  ])
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight)
  }, [lines])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    const result = processCommand(input)

    if (result === '__CLEAR__') {
      setLines([])
      setInput('')
      return
    }

    setLines((prev) => [
      ...prev,
      { type: 'input', text: input },
      ...(result ? [{ type: 'output' as const, text: result }] : []),
    ])
    setInput('')
  }, [input])

  return (
    <div
      className="flex flex-col h-full font-mono text-[13px] cursor-text"
      style={{ background: '#1a1a2e', color: '#e0e0e0' }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal title bar accent */}
      <div className="h-[2px] shrink-0" style={{ background: 'linear-gradient(90deg, #ff6058, #ffc130, #2dcc3e)' }} />

      {/* Terminal content */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3">
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap mb-0.5">
            {line.type === 'input' ? (
              <span>
                <span className="text-[#5bef5b]">visitor</span>
                <span className="text-[#888]">@</span>
                <span className="text-[#6bb5ff]">bob-portfolio</span>
                <span className="text-[#888]"> ~ % </span>
                <span className="text-white">{line.text}</span>
              </span>
            ) : (
              <span className="text-[#ccc]">{line.text}</span>
            )}
          </div>
        ))}

        {/* Active prompt */}
        <form onSubmit={handleSubmit} className="flex">
          <span>
            <span className="text-[#5bef5b]">visitor</span>
            <span className="text-[#888]">@</span>
            <span className="text-[#6bb5ff]">bob-portfolio</span>
            <span className="text-[#888]"> ~ % </span>
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-0 outline-none text-white text-[13px] font-mono p-0"
            autoFocus
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  )
}
