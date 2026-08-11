export const githubProjectsConfig = {
  owner: 'azminazhan',
  repo: 'Portfolio_Mindev',
  branch: 'main',
  path: 'public/projects.json',
};

export const projectsRawUrl =
  `https://raw.githubusercontent.com/${githubProjectsConfig.owner}/${githubProjectsConfig.repo}/refs/heads/${githubProjectsConfig.branch}/${githubProjectsConfig.path}`;

export const resolveProjectImage = (image) => {
  if (!image) return '';
  if (/^(https?:|data:|blob:)/i.test(image)) return image;
  return `${import.meta.env.BASE_URL}${image.replace(/^\//, '')}`;
};
