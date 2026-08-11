import React, { useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowUp, Check, Copy, Eye, EyeOff, Github, ImagePlus, LoaderCircle, LogOut, Plus, Save, Trash2 } from 'lucide-react';
import { githubProjectsConfig } from '../config/projects';
import { loadGithubProjects, saveGithubProjects, uploadProjectImage, verifyGithubToken } from '../lib/githubProjects';

const blankProject = () => ({
  id: `project-${Date.now()}`,
  title: 'New Project',
  category: 'Web Development',
  role: '',
  challenge: '',
  solution: '',
  outcome: '',
  description: [],
  details: '',
  tech: [],
  color: 'from-green-400 to-teal-500',
  images: [],
  liveDemo: '',
  visible: true,
});

const Field = ({ label, multiline = false, hint, ...props }) => (
  <label className="admin-field">
    <span>{label}</span>
    {multiline ? <textarea rows="4" {...props} /> : <input {...props} />}
    {hint && <small>{hint}</small>}
  </label>
);

export default function AdminPage() {
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [sha, setSha] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [busy, setBusy] = useState(false);
  const selectedIndex = projects.findIndex((project) => project.id === selectedId);
  const selected = projects[selectedIndex];

  const run = async (action) => {
    setBusy(true);
    setStatus({ type: '', message: '' });
    try { await action(); } catch (error) { setStatus({ type: 'error', message: error.message }); }
    finally { setBusy(false); }
  };

  const connect = () => run(async () => {
    const account = await verifyGithubToken(token.trim());
    const data = await loadGithubProjects(token.trim());
    setUser(account);
    setProjects(data.projects);
    setSha(data.sha);
    setSelectedId(data.projects[0]?.id || '');
    setStatus({ type: 'success', message: `Connected as ${account.login}.` });
  });

  const update = (key, value) => setProjects((current) => current.map((project) => project.id === selectedId ? { ...project, [key]: value } : project));

  const save = () => run(async () => {
    const result = await saveGithubProjects(token, projects, sha);
    setSha(result.content.sha);
    setStatus({ type: 'success', message: 'Published to GitHub. The portfolio will show the update after refresh.' });
  });

  const add = () => {
    const project = blankProject();
    setProjects((current) => [...current, project]);
    setSelectedId(project.id);
  };

  const duplicate = () => {
    const project = { ...selected, id: `${selected.id}-copy-${Date.now()}`, title: `${selected.title} Copy`, images: [...selected.images], tech: [...selected.tech], description: [...selected.description] };
    setProjects((current) => [...current, project]);
    setSelectedId(project.id);
  };

  const remove = () => {
    if (!window.confirm(`Delete “${selected.title}”? The deletion is not published until you save.`)) return;
    const next = projects.filter((project) => project.id !== selectedId);
    setProjects(next);
    setSelectedId(next[Math.max(0, selectedIndex - 1)]?.id || '');
  };

  const move = (offset) => {
    const destination = selectedIndex + offset;
    if (destination < 0 || destination >= projects.length) return;
    const next = [...projects];
    [next[selectedIndex], next[destination]] = [next[destination], next[selectedIndex]];
    setProjects(next);
  };

  const upload = (file) => run(async () => {
    const url = await uploadProjectImage(token, file, selected.id);
    update('images', [...selected.images, url]);
    setStatus({ type: 'success', message: 'Image uploaded. Save projects to attach it to this project.' });
  });

  if (!user) return (
    <main className="admin-shell admin-login">
      <section className="admin-login-card">
        <div className="admin-mark"><Github size={26} /></div>
        <p className="admin-eyebrow">Mindev portfolio</p>
        <h1>Project admin</h1>
        <p className="admin-muted">Connect GitHub to update your public projects without editing code.</p>
        <Field label="Fine-grained GitHub token" type="password" value={token} onChange={(event) => setToken(event.target.value)} placeholder="github_pat_…" hint="Required permission: Contents — Read and write, for Portfolio_Mindev only." />
        {status.message && <div className={`admin-alert ${status.type}`}>{status.message}</div>}
        <button className="admin-primary" onClick={connect} disabled={!token.trim() || busy}>{busy ? <LoaderCircle className="spin" size={18} /> : <Github size={18} />} Connect GitHub</button>
        <a className="admin-help" href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noreferrer">Create a fine-grained token</a>
        <a className="admin-back" href="../"><ArrowLeft size={16} /> Back to portfolio</a>
      </section>
    </main>
  );

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <div><p className="admin-eyebrow">Mindev portfolio</p><h1>Projects</h1></div>
        <div className="admin-header-actions">
          <span className="admin-account">@{user.login}</span>
          <a className="admin-secondary" href="../" target="_blank"><Eye size={17} /> View site</a>
          <button className="admin-secondary" onClick={() => { setUser(null); setToken(''); }}><LogOut size={17} /> Disconnect</button>
          <button className="admin-primary" onClick={save} disabled={busy}>{busy ? <LoaderCircle className="spin" size={18} /> : <Save size={18} />} Publish changes</button>
        </div>
      </header>

      {status.message && <div className={`admin-alert admin-global ${status.type}`}>{status.type === 'success' && <Check size={17} />}{status.message}</div>}

      <div className="admin-layout">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-title"><span>{projects.length} projects</span><button onClick={add} aria-label="Add project"><Plus size={18} /></button></div>
          <div className="admin-project-list">
            {projects.map((project, index) => (
              <button key={project.id} onClick={() => setSelectedId(project.id)} className={project.id === selectedId ? 'active' : ''}>
                <span className="admin-project-number">{String(index + 1).padStart(2, '0')}</span>
                <span><strong>{project.title}</strong><small>{project.category}</small></span>
                {project.visible === false && <EyeOff size={15} />}
              </button>
            ))}
          </div>
          <button className="admin-add" onClick={add}><Plus size={17} /> Add project</button>
        </aside>

        {selected && <section className="admin-editor">
          <div className="admin-editor-toolbar">
            <div><p className="admin-eyebrow">Editing</p><h2>{selected.title}</h2></div>
            <div>
              <button onClick={() => move(-1)} disabled={selectedIndex === 0} title="Move up"><ArrowUp size={17} /></button>
              <button onClick={() => move(1)} disabled={selectedIndex === projects.length - 1} title="Move down"><ArrowDown size={17} /></button>
              <button onClick={duplicate} title="Duplicate"><Copy size={17} /></button>
              <button onClick={remove} className="danger" title="Delete"><Trash2 size={17} /></button>
            </div>
          </div>

          <div className="admin-visibility">
            <div><strong>Show on portfolio</strong><span>Hidden projects remain saved but are not shown publicly.</span></div>
            <button className={selected.visible !== false ? 'on' : ''} onClick={() => update('visible', selected.visible === false)} aria-label="Toggle project visibility"><span /></button>
          </div>

          <div className="admin-form-grid">
            <Field label="Project title" value={selected.title} onChange={(event) => update('title', event.target.value)} />
            <Field label="Category" value={selected.category} onChange={(event) => update('category', event.target.value)} />
            <Field label="Your role" value={selected.role} onChange={(event) => update('role', event.target.value)} />
            <Field label="Live demo URL" type="url" value={selected.liveDemo} onChange={(event) => update('liveDemo', event.target.value)} placeholder="https://" />
            <Field label="Card summary" multiline value={selected.details} onChange={(event) => update('details', event.target.value)} />
            <Field label="Challenge" multiline value={selected.challenge} onChange={(event) => update('challenge', event.target.value)} />
            <Field label="Solution" multiline value={selected.solution} onChange={(event) => update('solution', event.target.value)} />
            <Field label="Outcome" multiline value={selected.outcome} onChange={(event) => update('outcome', event.target.value)} />
            <Field label="Technology tags" multiline value={selected.tech.join('\n')} onChange={(event) => update('tech', event.target.value.split('\n').map((item) => item.trim()).filter(Boolean))} hint="One technology per line." />
            <Field label="Key highlights" multiline value={selected.description.join('\n')} onChange={(event) => update('description', event.target.value.split('\n').map((item) => item.trim()).filter(Boolean))} hint="One highlight per line." />
          </div>

          <div className="admin-images">
            <div><p className="admin-eyebrow">Gallery</p><h3>Project images</h3><p className="admin-muted">Upload an image or add an image URL/file name on a new line.</p></div>
            <label className="admin-upload"><ImagePlus size={20} /> Upload image<input type="file" accept="image/*" hidden onChange={(event) => event.target.files[0] && upload(event.target.files[0])} /></label>
            <textarea rows="6" value={selected.images.join('\n')} onChange={(event) => update('images', event.target.value.split('\n').map((item) => item.trim()).filter(Boolean))} placeholder="https://example.com/screenshot.png" />
          </div>
        </section>}
      </div>

      <footer className="admin-footer">Editing {githubProjectsConfig.owner}/{githubProjectsConfig.repo} · {githubProjectsConfig.branch}</footer>
    </main>
  );
}
