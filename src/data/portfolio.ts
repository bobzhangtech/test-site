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
Hi, I'm Bob Zhang, welcome to my personal portfolio! I'm a programmer and software developer currently studying Computer Engineering at Queen's University.

I enjoy building projects that solve real problems, and my ultimate goal in life is to create a software or hardware solution that benefits humanity. I work with Python, Java, and modern web technologies, and I'm always picking up new skills along the way.

I'm also currently self-employed, coming up with and building software solutions in hopes of making them profitable in order to sustain myself and my dreams, and I aspire to found my own tech startup in the near future. Whether it's a full-stack web app or a software-as-a-service, I love turning ideas into working software.

Feel free to explore around!
`

export const PROJECTS: Project[] = [
  {
    id: 'project-1',
    name: "Bob's Personal Portfolio OS",
    description: 'This very portfolio! A Mac OS X 10.7 Lion-themed interactive desktop experience built with React, TypeScript, and Tailwind CSS. The reason I designed my portfolio to resemble Mac OS X Lion is because it was the first operating system I ever used. Back in Christmas of 2011, my mother bought me an iMac, my first personal computer, which ran this OS. That experience sparked my lifelong passion for computers, programming, and technology, and set me on the path to software development. So in honor of my first computer, I decided to take this creative and unique route for my personal portfolio!',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Framer Motion'],
    category: 'web',
    githubUrl: 'https://www.github.com/bobzhangtech/personal-portfolio',
  },
  {
    id: 'project-2',
    name: 'Stock Market Investment Assistant',
    description: 'A CLI program that analyzes individual stock, ETF, or cryptocurrency ticker symbols using real-time financial data from Yahoo Finance via the yfinance Python library, then auto-runs a local AI model for inference to intelligently analyze the data and output investment advice.',
    techStack: ['Python', 'yfinance', 'Local AI Inference'],
    category: 'cli',
    githubUrl: 'https://www.github.com/bobzhangtech/stock-market-investment-assistant',
  },
  {
    id: 'project-3',
    name: 'Canada Computers Price Tracker',
    description: 'A price tracking tool for the Canadian PC hardware retailer Canada Computers. Enter product URLs at startup, and it automatically scrapes each product page every 4–8 hours, detects price increases and decreases, and stores price history in a local SQLite database.',
    techStack: ['Python', 'SQLite', 'Web Scraping'],
    category: 'cli',
    githubUrl: 'https://www.github.com/bobzhangtech/canada-computers-price-tracker',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'GitHub', url: 'https://www.github.com/bobzhangtech', icon: 'github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/bobzhangtech', icon: 'linkedin' },
  { name: 'X', url: 'https://www.x.com/bobzhangtech', icon: 'x' },
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
          description: 'Python, Java, HTML, CSS, JavaScript',
        },
        {
          title: 'Tools',
          subtitle: '',
          description: 'Git, Linux, Local AI LLM Inference',
        },
      ],
    },
  ],
}
