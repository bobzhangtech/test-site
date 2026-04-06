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
Hi, I'm Bob, welcome to my personal portfolio! I'm a programmer and software developer currently studying Computer Engineering at Queen's University.

I enjoy building projects that solve real problems, from interactive web experiences to CLI tools powered by AI. I work with Python, Java, and modern web technologies, and I'm always picking up new skills along the way.

I'm also self-employed, taking on software projects independently. Whether it's a full-stack web app or a data-driven command-line tool, I love turning ideas into working software.

Feel free to explore around!
`

export const PROJECTS: Project[] = [
  {
    id: 'project-1',
    name: "Bob's Personal Portfolio OS",
    description: 'This very portfolio! A Mac OS X 10.7 Lion-themed interactive desktop experience built with React, TypeScript, and Tailwind CSS. The reason I designed my portfolio to resemble Mac OS X Lion is because it was the first operating system I ever used. Back in Christmas of 2011, my mother bought me an iMac, my first personal computer, which ran this OS. That experience sparked my lifelong passion for computers, programming, and technology, and set me on the path to software development. So in honor of my first computer, I decided to take this creative and unique route for my personal portfolio!',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Framer Motion'],
    category: 'web',
    githubUrl: 'https://github.com/bobzhangtech/personal-portfolio',
    liveUrl: '#',
  },
  {
    id: 'project-2',
    name: 'Stock Market Investment Assistant',
    description: 'A CLI program that analyzes individual stock, ETF, or cryptocurrency ticker symbols using real-time financial data from Yahoo Finance via the yfinance Python library, then auto-runs a local AI model for inference to intelligently analyze the data and output investment advice.',
    techStack: ['Python', 'yfinance', 'Local AI inference'],
    category: 'cli',
    githubUrl: 'https://github.com/bobzhangtech/stock-market-investment-assistant',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/bobzhangtech', icon: 'github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/bob', icon: 'linkedin' },
  { name: 'Email', url: 'mailto:bob@example.com', icon: 'email' },
]

export const RESUME_CONTENT = {
  name: 'Bob Zhang',
  title: 'Programmer & Software Developer',
  sections: [
    {
      heading: 'Experience',
      items: [
        {
          title: 'Self-Employed Programmer',
          subtitle: 'Freelance — Present',
          description: 'Building software projects independently, from full-stack web applications to AI-powered CLI tools.',
        },
      ],
    },
    {
      heading: 'Education',
      items: [
        {
          title: 'BASc Computer Engineering',
          subtitle: "Queen's University — 2026–2030",
          description: 'Bachelor of Applied Science in Computer Engineering.',
        },
      ],
    },
    {
      heading: 'Skills',
      items: [
        {
          title: 'Languages',
          subtitle: '',
          description: 'Python, Java, JavaScript, HTML, CSS',
        },
        {
          title: 'Tools',
          subtitle: '',
          description: 'Git',
        },
      ],
    },
  ],
}
