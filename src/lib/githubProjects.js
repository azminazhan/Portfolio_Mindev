import { githubProjectsConfig } from '../config/projects';

const apiBase = `https://api.github.com/repos/${githubProjectsConfig.owner}/${githubProjectsConfig.repo}`;

const headers = (token) => ({
  Accept: 'application/vnd.github+json',
  Authorization: `Bearer ${token}`,
  'X-GitHub-Api-Version': '2022-11-28',
});

const toBase64 = (value) => {
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary);
};

const bytesToBase64 = (buffer) => {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  const chunkSize = 0x8000;
  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }
  return btoa(binary);
};

const fromBase64 = (value) => {
  const binary = atob(value.replace(/\n/g, ''));
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
};

const readError = async (response) => {
  const payload = await response.json().catch(() => ({}));
  return payload.message || `GitHub request failed (${response.status})`;
};

export async function verifyGithubToken(token) {
  const response = await fetch('https://api.github.com/user', { headers: headers(token) });
  if (!response.ok) throw new Error(await readError(response));
  return response.json();
}

export async function loadGithubProjects(token) {
  const query = new URLSearchParams({ ref: githubProjectsConfig.branch });
  const response = await fetch(`${apiBase}/contents/${githubProjectsConfig.path}?${query}`, {
    headers: headers(token),
    cache: 'no-store',
  });
  if (!response.ok) throw new Error(await readError(response));
  const payload = await response.json();
  return { projects: JSON.parse(fromBase64(payload.content)), sha: payload.sha };
}

export async function saveGithubProjects(token, projects, sha) {
  const response = await fetch(`${apiBase}/contents/${githubProjectsConfig.path}`, {
    method: 'PUT',
    headers: { ...headers(token), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: 'Update portfolio projects from admin',
      content: toBase64(`${JSON.stringify(projects, null, 2)}\n`),
      sha,
      branch: githubProjectsConfig.branch,
    }),
  });
  if (!response.ok) throw new Error(await readError(response));
  return response.json();
}

export async function uploadProjectImage(token, file, projectId) {
  if (file.size > 5 * 1024 * 1024) throw new Error('Please choose an image smaller than 5 MB.');
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]+/g, '-');
  const safeProject = projectId.replace(/[^a-z0-9-]+/gi, '-').toLowerCase();
  const path = `public/project-images/${safeProject}-${Date.now()}-${safeName}`;
  const response = await fetch(`${apiBase}/contents/${path}`, {
    method: 'PUT',
    headers: { ...headers(token), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: `Upload project image for ${projectId}`,
      content: bytesToBase64(await file.arrayBuffer()),
      branch: githubProjectsConfig.branch,
    }),
  });
  if (!response.ok) throw new Error(await readError(response));
  const rawPath = path.replace(/^public\//, '');
  return `https://raw.githubusercontent.com/${githubProjectsConfig.owner}/${githubProjectsConfig.repo}/refs/heads/${githubProjectsConfig.branch}/public/${rawPath}`;
}
