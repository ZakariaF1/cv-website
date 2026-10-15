/** Shared / foundation skills. Main stack + specialized tools live on Experience & Projects. */
export const skillCategories = [
  {
    name: 'Frontend',
    accent: 'var(--accent)',
    skills: [
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'HTML5', icon: 'html5' },
      { name: 'SCSS', icon: 'sass' },
      { name: 'RxJS', icon: 'rxjs' },
      { name: 'Figma', icon: 'figma' },
      { name: 'Miro', icon: 'miro', simple: true },
    ],
  },
  {
    name: 'Backend',
    accent: 'var(--accent2)',
    skills: [
      { name: 'REST APIs', icon: 'api', mdi: true },
      { name: 'ASP.NET Core', icon: 'dotnetcore' },
      { name: 'LINQ', icon: 'dotnetcore' },
      { name: 'Redis', icon: 'redis' },
    ],
  },
  {
    name: 'Cloud & DevOps',
    accent: 'var(--accent3)',
    skills: [
      { name: 'GitHub Actions', icon: 'github' },
      { name: 'Vercel', icon: 'vercel' },
      { name: 'Docker', icon: 'docker' },
    ],
  },
  {
    name: 'Tooling & AI',
    accent: '#7b8fd4',
    skills: [
      { name: 'Git / GitHub', icon: 'git' },
      { name: 'GitLab', icon: 'gitlab' },
      { name: 'GitHub Copilot', icon: 'github' },
      { name: 'Claude Code', icon: 'claude', simple: true },
      { name: 'Cursor', icon: 'cursor', simple: true },
      { name: 'JWT & Auth', icon: 'jsonwebtokens', simple: true },
    ],
  },
]

export const certifications = [
  {
    title: 'Software Architect',
    org: 'Skillab',
    year: '2026',
    logo: '/skillab-logo.avif',
    desc: '16-lesson program led by Adrian Popescu, covering architectural patterns, DDD, microservices, service communication, data stores, AWS, Docker, CI/CD, quality-attribute tactics, security, and architecture evaluation (ATAM).',
    id: 'ef943bc322a48a2a41e29a6911b532da',
    link: 'https://lms.skillab.ro/certificate/ef943bc322a48a2a41e29a6911b532da',
  },
  {
    title: 'UX/UI Design',
    org: 'IT School',
    year: '2025',
    logo: '/it-school-logo.avif',
    desc: 'User-centered design, design thinking, wireframing, prototyping, and accessibility using Figma & Miro.',
    id: 'ITSGO0625UI2701',
    link: 'https://itschool.ro/',
  },
  {
    title: 'Microsoft Azure Fundamentals AZ-900',
    org: 'Pearson VUE',
    year: '2022',
    logo: '/azure-fundamentals-logo.avif',
    desc: 'Cloud concepts, Azure services, security, compliance, and pricing fundamentals.',
    id: '1210-9259',
    link: 'https://www.credly.com/badges/e94c150f-e73f-4b52-9842-d4f31a09c81e?source=linked_in_profile',
  },
  {
    title: 'Oracle Java SE Programmer Certificate',
    org: 'Link Academy',
    year: '2018',
    logo: '/link-academy-logo.avif',
    desc: 'Java SE fundamentals, OOP principles, and computer programming standards.',
    link: 'https://enrollment.link-academy.com/',
  },
]

export const languages = [
  { name: 'English', level: 'Proficient', flag: 'https://flagcdn.com/gb.svg' },
  { name: 'Romanian', level: 'Native', flag: 'https://flagcdn.com/ro.svg' },
  { name: 'Arabic', level: 'Native', flag: 'https://flagcdn.com/sa.svg' },
  { name: 'German', level: 'Elementary', flag: 'https://flagcdn.com/de.svg' },
]
