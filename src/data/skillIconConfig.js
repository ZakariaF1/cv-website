/** External icon CDN bases and invert list for skill chips. */
export const skillIconConfig = {
  simpleIconsBase: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons',
  /** Devicon path template: `${deviconBase}/${icon}/${icon}-original.svg` */
  deviconBase: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons',
  darkIcons: ['github', 'vercel', 'amazonwebservices'],
}

export const darkIcons = new Set(skillIconConfig.darkIcons)

export function simpleIconUrl(icon) {
  return `${skillIconConfig.simpleIconsBase}/${icon}.svg`
}

export function deviconUrl(icon, variant = 'original') {
  return `${skillIconConfig.deviconBase}/${icon}/${icon}-${variant}.svg`
}
