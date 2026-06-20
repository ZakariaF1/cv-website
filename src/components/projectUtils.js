export function buildMediaItems(project) {
  return [
    ...(project.video ? [{ type: 'video', src: project.video }] : []),
    ...(project.screenshots || []).map(src => ({ type: 'img', src })),
  ]
}
