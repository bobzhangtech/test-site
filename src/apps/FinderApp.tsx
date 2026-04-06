import { useState } from 'react'
import { PROJECTS, type Project } from '../data/portfolio'

type View = 'grid' | 'detail'

const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web Apps' },
  { id: 'cli', label: 'CLI Tools' },
  { id: 'library', label: 'Libraries' },
  { id: 'other', label: 'Other' },
]

export default function FinderApp() {
  const [view, setView] = useState<View>('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filtered = selectedCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory)

  if (view === 'detail' && selectedProject) {
    return <ProjectDetail project={selectedProject} onBack={() => { setView('grid'); setSelectedProject(null) }} />
  }

  return (
    <div className="flex h-full text-[13px]">
      {/* Sidebar */}
      <div
        className="w-[160px] shrink-0 border-r border-[#c8c8c8] overflow-y-auto py-2"
        style={{ background: 'linear-gradient(180deg, #e8ecf0 0%, #dce0e6 100%)' }}
      >
        <div className="px-3 py-1 text-[10px] font-bold text-[#888] uppercase tracking-wider">
          Favorites
        </div>
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className={`px-3 py-1 cursor-default truncate rounded-sm mx-1 ${
              selectedCategory === cat.id
                ? 'bg-[#3b82f6] text-white'
                : 'text-[#333] hover:bg-[#d0d4da]'
            }`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.id === 'all' ? '📂' : cat.id === 'web' ? '🌐' : cat.id === 'cli' ? '⌨️' : cat.id === 'library' ? '📚' : '📦'}{' '}
            {cat.label}
          </div>
        ))}
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div
          className="flex items-center h-[32px] px-3 border-b border-[#c8c8c8] gap-2 shrink-0"
          style={{ background: 'linear-gradient(180deg, #f2f2f2 0%, #e6e6e6 100%)' }}
        >
          <span className="text-[12px] text-[#666]">{filtered.length} items</span>
        </div>

        {/* File grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-[repeat(auto-fill,100px)] gap-4">
            {filtered.map((project) => (
              <div
                key={project.id}
                className="flex flex-col items-center gap-1 p-2 rounded cursor-default hover:bg-[#e8e8e8]"
                onDoubleClick={() => {
                  setSelectedProject(project)
                  setView('detail')
                }}
              >
                <span className="text-[40px] leading-none">📁</span>
                <span className="text-[11px] text-center text-[#333] leading-tight line-clamp-2">
                  {project.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectDetail({ project, onBack }: { project: Project; onBack: () => void }) {
  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div
        className="flex items-center h-[32px] px-3 border-b border-[#c8c8c8] gap-2 shrink-0"
        style={{ background: 'linear-gradient(180deg, #f2f2f2 0%, #e6e6e6 100%)' }}
      >
        <button
          onClick={onBack}
          className="text-[12px] text-[#3b82f6] hover:underline cursor-default border-0 bg-transparent"
        >
          ← Back
        </button>
        <span className="text-[12px] text-[#666]">{project.name}</span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-lg">
          <h2 className="text-[20px] font-medium text-[#222] mb-2">{project.name}</h2>
          <p className="text-[13px] text-[#555] leading-relaxed mb-4">{project.description}</p>

          {/* Tech stack */}
          <div className="mb-4">
            <h3 className="text-[11px] font-bold text-[#888] uppercase tracking-wider mb-2">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] px-2 py-0.5 rounded-full bg-[#e8ecf0] text-[#555]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-[#3b82f6] hover:underline"
              >
                View on GitHub →
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-[#3b82f6] hover:underline"
              >
                Live Demo →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
