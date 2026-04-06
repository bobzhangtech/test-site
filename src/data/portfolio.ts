export interface Project {
  id: string
  name: string
  description: string
  techStack: string[]
  category: 'web' | 'cli' | 'library' | 'other'
  githubUrl?: string
  liveUrl?: string
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

// ==============================================
// CUSTOMIZE YOUR PORTFOLIO CONTENT BELOW
// ==============================================

export const OWNER_NAME = 'Bob'

export const ABOUT_ME = `
Hi, I'm Bob — a software developer and engineer passionate about building elegant, performant applications.

I love working across the full stack, from crafting pixel-perfect user interfaces to designing robust backend systems. My toolkit spans modern web technologies, and I'm always exploring new tools and paradigms.

When I'm not coding, you'll find me tinkering with side projects, contributing to open source, or diving into the latest in tech.

Welcome to my portfolio — feel free to explore around!
`

export const PROJECTS: Project[] = [
  {
    id: 'project-1',
    name: 'Portfolio OS',
    description: 'This very portfolio! A Mac OS X Lion-themed interactive desktop experience built with React, TypeScript, and Tailwind CSS.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Framer Motion'],
    category: 'web',
    githubUrl: 'https://github.com/bob',
    liveUrl: '#',
  },
  {
    id: 'project-2',
    name: 'Project Two',
    description: 'A brief description of your second project. Replace this with your actual project details.',
    techStack: ['Node.js', 'Express', 'PostgreSQL'],
    category: 'web',
    githubUrl: 'https://github.com/bob',
  },
  {
    id: 'project-3',
    name: 'Project Three',
    description: 'A brief description of your third project. Replace this with your actual project details.',
    techStack: ['Python', 'FastAPI', 'Docker'],
    category: 'cli',
    githubUrl: 'https://github.com/bob',
  },
  {
    id: 'project-4',
    name: 'Project Four',
    description: 'A brief description of your fourth project. Replace this with your actual project details.',
    techStack: ['React Native', 'Firebase'],
    category: 'other',
    githubUrl: 'https://github.com/bob',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/bob', icon: 'github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/bob', icon: 'linkedin' },
  { name: 'Email', url: 'mailto:bob@example.com', icon: 'email' },
]

export const RESUME_CONTENT = {
  name: 'Bob',
  title: 'Software Developer & Engineer',
  sections: [
    {
      heading: 'Experience',
      items: [
        {
          title: 'Software Engineer',
          subtitle: 'Company Name — 2023–Present',
          description: 'Replace with your actual experience.',
        },
      ],
    },
    {
      heading: 'Education',
      items: [
        {
          title: 'B.S. Computer Science',
          subtitle: 'University Name — 2019–2023',
          description: 'Replace with your actual education.',
        },
      ],
    },
    {
      heading: 'Skills',
      items: [
        {
          title: 'Languages & Frameworks',
          subtitle: '',
          description: 'TypeScript, JavaScript, Python, React, Node.js, SQL, HTML/CSS',
        },
        {
          title: 'Tools & Platforms',
          subtitle: '',
          description: 'Git, Docker, AWS, Linux, CI/CD, PostgreSQL, MongoDB',
        },
      ],
    },
  ],
}
