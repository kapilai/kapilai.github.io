/**
 * PORTFOLIO ADMIN JS
 * Kapil Chauhan - Portfolio CMS
 * Vanilla JS, no frameworks
 */

/* ===================================
   STATE
=================================== */
const STATE = {
  pat: null,
  data: null,
  draftTimer: null,
  githubConfig: {
    owner: '',
    repo: '',
    branch: 'main',
    filePath: 'data.json'
  },
  currentSection: 'personal',
  isDirty: false
};

const GITHUB_API = 'https://api.github.com';

/* ===================================
   INIT
=================================== */
document.addEventListener('DOMContentLoaded', () => {
  loadGithubConfig();

  STATE.pat = sessionStorage.getItem('admin_pat');

  if (STATE.pat) {
    validatePatAndShowApp();
  } else {
    showLoginScreen();
  }

  initLoginForm();
  initSidebar();
  initTopbarActions();
  initModal();
  startDraftAutoSave();
});

/* ===================================
   GITHUB CONFIG
=================================== */
function loadGithubConfig() {
  const stored = localStorage.getItem('github_config');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      STATE.githubConfig = { ...STATE.githubConfig, ...parsed };
    } catch (e) {}
  }
}

function saveGithubConfig() {
  localStorage.setItem('github_config', JSON.stringify(STATE.githubConfig));
}

/* ===================================
   AUTH
=================================== */
function showLoginScreen() {
  document.getElementById('login-screen').classList.remove('hidden');
  document.getElementById('admin-app').classList.add('hidden');
}

function showAdminApp() {
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('admin-app').classList.remove('hidden');
}

function initLoginForm() {
  const form = document.getElementById('login-form');
  const toggleBtn = document.getElementById('toggle-pat');
  const patInput = document.getElementById('pat-input');

  toggleBtn.addEventListener('click', () => {
    const type = patInput.type === 'password' ? 'text' : 'password';
    patInput.type = type;
    toggleBtn.querySelector('i').className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const pat = patInput.value.trim();
    if (!pat) {
      showLoginError('Please enter your GitHub Personal Access Token.');
      return;
    }
    await attemptLogin(pat);
  });
}

async function attemptLogin(pat) {
  const btn = document.getElementById('login-btn');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying...';
  btn.disabled = true;
  hideLoginError();

  try {
    const res = await fetch(`${GITHUB_API}/user`, {
      headers: { Authorization: `token ${pat}` }
    });

    if (res.status === 401) {
      showLoginError('Invalid token. Please check your PAT and try again.');
      return;
    }

    if (!res.ok) {
      showLoginError(`GitHub API error: ${res.status}. Please try again.`);
      return;
    }

    const user = await res.json();
    STATE.pat = pat;
    sessionStorage.setItem('admin_pat', pat);

    showToast(`Welcome, ${user.name || user.login}!`, 'success');
    showAdminApp();
    renderSection('personal');

    // Try to load live data
    await loadFromGitHub(true);

  } catch (err) {
    showLoginError('Network error. Please check your connection.');
  } finally {
    btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
    btn.disabled = false;
  }
}

async function validatePatAndShowApp() {
  try {
    const res = await fetch(`${GITHUB_API}/user`, {
      headers: { Authorization: `token ${STATE.pat}` }
    });

    if (!res.ok) {
      sessionStorage.removeItem('admin_pat');
      STATE.pat = null;
      showLoginScreen();
      return;
    }

    showAdminApp();

    // Try loading from draft first
    const draft = localStorage.getItem('portfolio_draft');
    if (draft) {
      try {
        STATE.data = JSON.parse(draft);
        showToast('Loaded from local draft.', 'info');
        renderSection(STATE.currentSection);
        setDraftIndicator(true);
      } catch (e) {}
    }

    if (!STATE.data) {
      await loadFromGitHub(true);
    }

  } catch (err) {
    showLoginScreen();
  }
}

function logout() {
  sessionStorage.removeItem('admin_pat');
  STATE.pat = null;
  STATE.data = null;
  showLoginScreen();
  showToast('Logged out successfully.', 'info');
}

function showLoginError(msg) {
  const el = document.getElementById('login-error');
  el.textContent = msg;
  el.classList.remove('hidden');
}

function hideLoginError() {
  document.getElementById('login-error').classList.add('hidden');
}

/* ===================================
   TOPBAR ACTIONS
=================================== */
function initTopbarActions() {
  document.getElementById('logout-btn').addEventListener('click', () => {
    confirmDialog('Are you sure you want to log out?', logout);
  });

  document.getElementById('load-github-btn').addEventListener('click', async () => {
    await loadFromGitHub(false);
  });

  document.getElementById('save-draft-btn').addEventListener('click', () => {
    saveDraft();
    showToast('Draft saved to local storage.', 'success');
  });

  document.getElementById('publish-btn').addEventListener('click', () => {
    publishToGitHub();
  });

  document.getElementById('rollback-btn').addEventListener('click', () => {
    openRollbackModal();
  });
}

/* ===================================
   SIDEBAR
=================================== */
function initSidebar() {
  const sidebarItems = document.querySelectorAll('.sidebar-item[data-section]');
  const toggleBtn = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('admin-sidebar');
  const main = document.getElementById('admin-main');

  sidebarItems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      sidebarItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      STATE.currentSection = item.dataset.section;
      renderSection(item.dataset.section);

      // On mobile, close sidebar after selection
      if (window.innerWidth <= 900) {
        sidebar.classList.remove('open');
      }
    });
  });

  toggleBtn.addEventListener('click', () => {
    if (window.innerWidth <= 900) {
      sidebar.classList.toggle('open');
    } else {
      sidebar.classList.toggle('collapsed');
      main.classList.toggle('expanded');
    }
  });
}

/* ===================================
   SECTION RENDERER
=================================== */
function renderSection(name) {
  const container = document.getElementById('section-container');

  if (!STATE.data) {
    container.innerHTML = `
      <div class="editor-placeholder">
        <i class="fas fa-cloud-download-alt"></i>
        <p>No data loaded. Click <strong>Load from GitHub</strong> to fetch your content.</p>
      </div>
    `;
    return;
  }

  switch (name) {
    case 'personal':    container.innerHTML = renderPersonalEditor(); break;
    case 'skills':      container.innerHTML = renderSkillsEditor(); break;
    case 'experience':  container.innerHTML = renderExperienceEditor(); break;
    case 'education':   container.innerHTML = renderEducationEditor(); break;
    case 'projects':    container.innerHTML = renderProjectsEditor(); break;
    case 'hobbies':     container.innerHTML = renderHobbiesEditor(); break;
    case 'achievements':    container.innerHTML = renderAchievementsEditor(); break;
    case 'certifications':  container.innerHTML = renderCertificationsEditor(); break;
    case 'settings':        container.innerHTML = renderSettingsEditor(); break;
    default:
      container.innerHTML = '<div class="editor-placeholder"><p>Section not found.</p></div>';
  }

  // Re-attach dynamic events after rendering
  attachDynamicEvents(container);
}

/* ===================================
   PERSONAL EDITOR
=================================== */
function renderPersonalEditor() {
  const p = STATE.data.personal;
  return `
    <div class="section-editor">
      <div class="editor-header">
        <div class="editor-title"><i class="fas fa-user"></i> Personal Info</div>
      </div>
      <form id="personal-form" onsubmit="return false;">
        <div class="form-row">
          <div class="admin-form-group">
            <label>Full Name</label>
            <input type="text" name="name" value="${esc(p.name)}" placeholder="Your Name" />
          </div>
          <div class="admin-form-group">
            <label>Title / Position</label>
            <input type="text" name="title" value="${esc(p.title)}" placeholder="Software Engineer" />
          </div>
        </div>
        <div class="admin-form-group">
          <label>Tagline (short)</label>
          <input type="text" name="tagline" value="${esc(p.tagline)}" placeholder="Founding Software Engineer @ ..." />
        </div>
        <div class="admin-form-group">
          <label>Roles (typing effect, one per line)</label>
          <textarea name="roles" rows="4" placeholder="Software Engineer\nBackend Developer\n...">${(p.roles || []).join('\n')}</textarea>
          <div class="form-hint">Each line becomes a role in the typing animation.</div>
        </div>
        <div class="admin-form-group">
          <label>About / Bio</label>
          <textarea name="about" rows="6" placeholder="Write your about text...">${esc(p.about)}</textarea>
        </div>
        <div class="form-row">
          <div class="admin-form-group">
            <label>Email</label>
            <input type="email" name="email" value="${esc(p.email)}" placeholder="you@example.com" />
          </div>
          <div class="admin-form-group">
            <label>Phone</label>
            <input type="text" name="phone" value="${esc(p.phone)}" placeholder="+91-..." />
          </div>
        </div>
        <div class="form-row">
          <div class="admin-form-group">
            <label>LinkedIn URL</label>
            <input type="url" name="linkedin" value="${esc(p.linkedin)}" placeholder="https://linkedin.com/in/..." />
          </div>
          <div class="admin-form-group">
            <label>GitHub URL</label>
            <input type="url" name="github" value="${esc(p.github)}" placeholder="https://github.com/..." />
          </div>
        </div>
        <div class="form-row">
          <div class="admin-form-group">
            <label>LeetCode URL</label>
            <input type="url" name="leetcode" value="${esc(p.leetcode)}" placeholder="https://leetcode.com/..." />
          </div>
          <div class="admin-form-group">
            <label>Resume URL</label>
            <input type="url" name="resumeUrl" value="${esc(p.resumeUrl || '')}" placeholder="https://..." />
          </div>
        </div>
        <div class="admin-form-group">
          <label>Avatar / Profile Image URL</label>
          <input type="url" name="avatar" value="${esc(p.avatar || '')}" placeholder="https://example.com/photo.jpg" />
          <div class="form-hint">Leave blank to show initials/icon placeholder.</div>
        </div>
        <button type="button" class="admin-btn btn-primary" onclick="savePersonal()">
          <i class="fas fa-save"></i> Save Personal Info
        </button>
      </form>
    </div>
  `;
}

function savePersonal() {
  const form = document.getElementById('personal-form');
  if (!form) return;
  const fd = new FormData(form);
  const rolesRaw = (fd.get('roles') || '').trim().split('\n').map(r => r.trim()).filter(Boolean);

  STATE.data.personal = {
    ...STATE.data.personal,
    name: fd.get('name'),
    title: fd.get('title'),
    tagline: fd.get('tagline'),
    roles: rolesRaw,
    about: fd.get('about'),
    email: fd.get('email'),
    phone: fd.get('phone'),
    linkedin: fd.get('linkedin'),
    github: fd.get('github'),
    leetcode: fd.get('leetcode'),
    resumeUrl: fd.get('resumeUrl'),
    avatar: fd.get('avatar')
  };

  markDirty();
  showToast('Personal info saved to draft.', 'success');
}

/* ===================================
   SKILLS EDITOR
=================================== */
function renderSkillsEditor() {
  const skills = STATE.data.skills;
  return `
    <div class="section-editor">
      <div class="editor-header">
        <div class="editor-title"><i class="fas fa-code"></i> Skills</div>
        <button class="admin-btn btn-sm btn-primary" onclick="addSkillCategory()">
          <i class="fas fa-plus"></i> Add Category
        </button>
      </div>
      <div id="skills-cards" class="data-cards">
        ${skills.map((cat, ci) => renderSkillCategoryCard(cat, ci)).join('')}
      </div>
      <button class="btn-add-card" onclick="addSkillCategory()">
        <i class="fas fa-plus-circle"></i> Add Skill Category
      </button>
    </div>
  `;
}

function renderSkillCategoryCard(cat, ci) {
  return `
    <div class="data-card expanded" id="skill-cat-${ci}">
      <div class="data-card-header" onclick="toggleCard('skill-cat-${ci}')">
        <div class="data-card-title">
          <span class="card-label">${ci + 1}</span>
          ${esc(cat.category)}
        </div>
        <div class="data-card-controls">
          <button class="btn-remove-item" onclick="event.stopPropagation(); removeSkillCategory(${ci})" title="Remove category">
            <i class="fas fa-trash"></i>
          </button>
          <i class="fas fa-chevron-down data-card-collapse-icon"></i>
        </div>
      </div>
      <div class="data-card-body">
        <div class="admin-form-group">
          <label>Category Name</label>
          <input type="text" id="skill-cat-name-${ci}" value="${esc(cat.category)}" placeholder="e.g. Backend" />
        </div>
        <label style="font-size:0.78rem; font-weight:600; color:var(--text-secondary); letter-spacing:0.06em; text-transform:uppercase; display:block; margin-bottom:10px;">Skills</label>
        <div id="skill-items-${ci}">
          ${cat.items.map((item, si) => renderSkillItemRow(ci, si, item)).join('')}
        </div>
        <button class="btn-add-item" onclick="addSkillItem(${ci})">
          <i class="fas fa-plus"></i> Add Skill
        </button>
      </div>
    </div>
  `;
}

function renderSkillItemRow(ci, si, item) {
  return `
    <div class="skill-item-row" id="skill-item-${ci}-${si}">
      <input type="text" id="skill-name-${ci}-${si}" value="${esc(item.name)}" placeholder="Skill name" />
      <div class="skill-level-wrapper">
        <input type="range" id="skill-level-${ci}-${si}" min="0" max="100" value="${item.level}"
          oninput="document.getElementById('skill-level-val-${ci}-${si}').textContent = this.value + '%'" />
        <span class="skill-level-value" id="skill-level-val-${ci}-${si}">${item.level}%</span>
      </div>
      <button class="btn-remove-item" onclick="removeSkillItem(${ci}, ${si})" title="Remove">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;
}

function addSkillCategory() {
  STATE.data.skills.push({ category: 'New Category', items: [] });
  markDirty();
  renderSection('skills');
}

function removeSkillCategory(ci) {
  confirmDialog(`Remove skill category "${STATE.data.skills[ci].category}"?`, () => {
    STATE.data.skills.splice(ci, 1);
    markDirty();
    renderSection('skills');
  });
}

function addSkillItem(ci) {
  STATE.data.skills[ci].items.push({ name: '', level: 70 });
  markDirty();
  renderSection('skills');
  setTimeout(() => {
    const lastIdx = STATE.data.skills[ci].items.length - 1;
    const el = document.getElementById(`skill-name-${ci}-${lastIdx}`);
    if (el) el.focus();
  }, 50);
}

function removeSkillItem(ci, si) {
  STATE.data.skills[ci].items.splice(si, 1);
  markDirty();
  renderSection('skills');
}

function collectSkillsData() {
  STATE.data.skills.forEach((cat, ci) => {
    const catNameEl = document.getElementById(`skill-cat-name-${ci}`);
    if (catNameEl) cat.category = catNameEl.value.trim() || cat.category;

    cat.items.forEach((item, si) => {
      const nameEl = document.getElementById(`skill-name-${ci}-${si}`);
      const levelEl = document.getElementById(`skill-level-${ci}-${si}`);
      if (nameEl) item.name = nameEl.value.trim();
      if (levelEl) item.level = parseInt(levelEl.value);
    });
    cat.items = cat.items.filter(i => i.name);
  });
}

/* ===================================
   EXPERIENCE EDITOR
=================================== */
function renderExperienceEditor() {
  const exp = STATE.data.experience;
  return `
    <div class="section-editor">
      <div class="editor-header">
        <div class="editor-title"><i class="fas fa-briefcase"></i> Experience</div>
        <button class="admin-btn btn-sm btn-primary" onclick="addExperience()">
          <i class="fas fa-plus"></i> Add Entry
        </button>
      </div>
      <div id="exp-cards" class="data-cards">
        ${exp.map((e, i) => renderExpCard(e, i)).join('')}
      </div>
      <button class="btn-add-card" onclick="addExperience()">
        <i class="fas fa-plus-circle"></i> Add Experience
      </button>
    </div>
  `;
}

function renderExpCard(e, i) {
  return `
    <div class="data-card expanded" id="exp-card-${i}">
      <div class="data-card-header" onclick="toggleCard('exp-card-${i}')">
        <div class="data-card-title">
          <span class="card-label">${i + 1}</span>
          ${esc(e.role)} @ ${esc(e.company)}
        </div>
        <div class="data-card-controls">
          <button class="btn-remove-item" onclick="event.stopPropagation(); removeExperience(${i})" title="Remove">
            <i class="fas fa-trash"></i>
          </button>
          <i class="fas fa-chevron-down data-card-collapse-icon"></i>
        </div>
      </div>
      <div class="data-card-body">
        <div class="form-row">
          <div class="admin-form-group">
            <label>Role / Title</label>
            <input type="text" id="exp-role-${i}" value="${esc(e.role)}" placeholder="Software Engineer" />
          </div>
          <div class="admin-form-group">
            <label>Company</label>
            <input type="text" id="exp-company-${i}" value="${esc(e.company)}" placeholder="Company Name" />
          </div>
        </div>
        <div class="form-row">
          <div class="admin-form-group">
            <label>Period (display text)</label>
            <input type="text" id="exp-period-${i}" value="${esc(e.period)}" placeholder="Jan 2024 – Present" />
          </div>
          <div class="admin-form-group">
            <label>Location</label>
            <input type="text" id="exp-location-${i}" value="${esc(e.location)}" placeholder="City, Country" />
          </div>
        </div>
        <div class="form-row">
          <div class="admin-form-group">
            <label>Start Date</label>
            <input type="date" id="exp-start-${i}" value="${e.startDate || ''}" />
          </div>
          <div class="admin-form-group">
            <label>End Date (leave blank if current)</label>
            <input type="date" id="exp-end-${i}" value="${e.endDate || ''}" />
          </div>
        </div>
        <div class="admin-form-group">
          <label>Short Description</label>
          <textarea id="exp-desc-${i}" rows="2" placeholder="One-line summary...">${esc(e.description)}</textarea>
        </div>
        <div class="admin-form-group">
          <label>Bullet Points</label>
          <div id="exp-points-${i}" class="dynamic-list">
            ${e.points.map((pt, pi) => `
              <div class="dynamic-list-item" id="exp-pt-${i}-${pi}">
                <input type="text" value="${esc(pt)}" placeholder="Achievement or responsibility..." id="exp-pt-val-${i}-${pi}" />
                <button class="btn-remove-item" onclick="removeExpPoint(${i}, ${pi})"><i class="fas fa-times"></i></button>
              </div>
            `).join('')}
          </div>
          <button class="btn-add-item" onclick="addExpPoint(${i})"><i class="fas fa-plus"></i> Add Point</button>
        </div>
        <div class="admin-form-group">
          <label>Tech Stack (comma-separated)</label>
          <input type="text" id="exp-tech-${i}" value="${esc(e.techStack.join(', '))}" placeholder="Java, Spring Boot, Kafka" />
        </div>
      </div>
    </div>
  `;
}

function addExperience() {
  STATE.data.experience.push({
    id: `exp-${Date.now()}`,
    company: 'New Company',
    role: 'Software Engineer',
    period: '',
    startDate: '',
    endDate: '',
    location: '',
    description: '',
    points: [],
    techStack: []
  });
  markDirty();
  renderSection('experience');
}

function removeExperience(i) {
  confirmDialog(`Remove experience at "${STATE.data.experience[i].company}"?`, () => {
    STATE.data.experience.splice(i, 1);
    markDirty();
    renderSection('experience');
  });
}

function addExpPoint(i) {
  STATE.data.experience[i].points.push('');
  markDirty();
  renderSection('experience');
  setTimeout(() => {
    const lastIdx = STATE.data.experience[i].points.length - 1;
    const el = document.getElementById(`exp-pt-val-${i}-${lastIdx}`);
    if (el) el.focus();
  }, 50);
}

function removeExpPoint(expIdx, ptIdx) {
  STATE.data.experience[expIdx].points.splice(ptIdx, 1);
  markDirty();
  renderSection('experience');
}

function collectExperienceData() {
  STATE.data.experience.forEach((exp, i) => {
    const get = id => { const el = document.getElementById(id); return el ? el.value.trim() : ''; };
    exp.role = get(`exp-role-${i}`) || exp.role;
    exp.company = get(`exp-company-${i}`) || exp.company;
    exp.period = get(`exp-period-${i}`);
    exp.location = get(`exp-location-${i}`);
    exp.startDate = get(`exp-start-${i}`) || null;
    exp.endDate = get(`exp-end-${i}`) || null;
    exp.description = get(`exp-desc-${i}`);

    const tech = get(`exp-tech-${i}`);
    exp.techStack = tech ? tech.split(',').map(t => t.trim()).filter(Boolean) : exp.techStack;

    exp.points = exp.points.map((_, pi) => {
      const el = document.getElementById(`exp-pt-val-${i}-${pi}`);
      return el ? el.value.trim() : '';
    }).filter(Boolean);
  });
}

/* ===================================
   EDUCATION EDITOR
=================================== */
function renderEducationEditor() {
  const edu = STATE.data.education;
  return `
    <div class="section-editor">
      <div class="editor-header">
        <div class="editor-title"><i class="fas fa-graduation-cap"></i> Education</div>
        <button class="admin-btn btn-sm btn-primary" onclick="addEducation()">
          <i class="fas fa-plus"></i> Add Entry
        </button>
      </div>
      <div id="edu-cards" class="data-cards">
        ${edu.map((e, i) => renderEduCard(e, i)).join('')}
      </div>
      <button class="btn-add-card" onclick="addEducation()">
        <i class="fas fa-plus-circle"></i> Add Education
      </button>
    </div>
  `;
}

function renderEduCard(e, i) {
  return `
    <div class="data-card expanded" id="edu-card-${i}">
      <div class="data-card-header" onclick="toggleCard('edu-card-${i}')">
        <div class="data-card-title">
          <span class="card-label">${i + 1}</span>
          ${esc(e.degree)} – ${esc(e.institution)}
        </div>
        <div class="data-card-controls">
          <button class="btn-remove-item" onclick="event.stopPropagation(); removeEducation(${i})" title="Remove">
            <i class="fas fa-trash"></i>
          </button>
          <i class="fas fa-chevron-down data-card-collapse-icon"></i>
        </div>
      </div>
      <div class="data-card-body">
        <div class="admin-form-group">
          <label>Institution</label>
          <input type="text" id="edu-inst-${i}" value="${esc(e.institution)}" placeholder="University Name" />
        </div>
        <div class="form-row">
          <div class="admin-form-group">
            <label>Degree</label>
            <input type="text" id="edu-degree-${i}" value="${esc(e.degree)}" placeholder="Bachelor of Technology" />
          </div>
          <div class="admin-form-group">
            <label>Field of Study</label>
            <input type="text" id="edu-field-${i}" value="${esc(e.field)}" placeholder="Information Technology" />
          </div>
        </div>
        <div class="form-row">
          <div class="admin-form-group">
            <label>Grade / CGPA</label>
            <input type="text" id="edu-grade-${i}" value="${esc(e.grade)}" placeholder="8.4 / 10 CGPA" />
          </div>
          <div class="admin-form-group">
            <label>Location</label>
            <input type="text" id="edu-location-${i}" value="${esc(e.location)}" placeholder="City, Country" />
          </div>
        </div>
        <div class="form-row">
          <div class="admin-form-group">
            <label>Period (display text)</label>
            <input type="text" id="edu-period-${i}" value="${esc(e.period)}" placeholder="Aug 2019 – Aug 2023" />
          </div>
        </div>
        <div class="form-row">
          <div class="admin-form-group">
            <label>Start Date</label>
            <input type="date" id="edu-start-${i}" value="${e.startDate || ''}" />
          </div>
          <div class="admin-form-group">
            <label>End Date</label>
            <input type="date" id="edu-end-${i}" value="${e.endDate || ''}" />
          </div>
        </div>
      </div>
    </div>
  `;
}

function addEducation() {
  STATE.data.education.push({
    id: `edu-${Date.now()}`,
    institution: 'University Name',
    degree: 'Bachelor of Technology',
    field: 'Computer Science',
    grade: '',
    period: '',
    startDate: '',
    endDate: '',
    location: ''
  });
  markDirty();
  renderSection('education');
}

function removeEducation(i) {
  confirmDialog(`Remove education entry for "${STATE.data.education[i].institution}"?`, () => {
    STATE.data.education.splice(i, 1);
    markDirty();
    renderSection('education');
  });
}

function collectEducationData() {
  STATE.data.education.forEach((edu, i) => {
    const get = id => { const el = document.getElementById(id); return el ? el.value.trim() : ''; };
    edu.institution = get(`edu-inst-${i}`) || edu.institution;
    edu.degree = get(`edu-degree-${i}`) || edu.degree;
    edu.field = get(`edu-field-${i}`);
    edu.grade = get(`edu-grade-${i}`);
    edu.location = get(`edu-location-${i}`);
    edu.period = get(`edu-period-${i}`);
    edu.startDate = get(`edu-start-${i}`) || null;
    edu.endDate = get(`edu-end-${i}`) || null;
  });
}

/* ===================================
   PROJECTS EDITOR
=================================== */
function renderProjectsEditor() {
  const projects = STATE.data.projects;
  return `
    <div class="section-editor">
      <div class="editor-header">
        <div class="editor-title"><i class="fas fa-rocket"></i> Projects</div>
        <button class="admin-btn btn-sm btn-primary" onclick="addProject()">
          <i class="fas fa-plus"></i> Add Project
        </button>
      </div>
      <div id="proj-cards" class="data-cards">
        ${projects.map((p, i) => renderProjectCard(p, i)).join('')}
      </div>
      <button class="btn-add-card" onclick="addProject()">
        <i class="fas fa-plus-circle"></i> Add Project
      </button>
    </div>
  `;
}

function renderProjectCard(p, i) {
  return `
    <div class="data-card expanded" id="proj-card-${i}">
      <div class="data-card-header" onclick="toggleCard('proj-card-${i}')">
        <div class="data-card-title">
          <span class="card-label">${i + 1}</span>
          ${esc(p.name)}
        </div>
        <div class="data-card-controls">
          <button class="btn-remove-item" onclick="event.stopPropagation(); removeProject(${i})" title="Remove">
            <i class="fas fa-trash"></i>
          </button>
          <i class="fas fa-chevron-down data-card-collapse-icon"></i>
        </div>
      </div>
      <div class="data-card-body">
        <div class="form-row">
          <div class="admin-form-group">
            <label>Project Name</label>
            <input type="text" id="proj-name-${i}" value="${esc(p.name)}" placeholder="Project Name" />
          </div>
          <div class="admin-form-group">
            <label>Date</label>
            <input type="date" id="proj-date-${i}" value="${p.date || ''}" />
          </div>
        </div>
        <div class="admin-form-group">
          <label>Description</label>
          <textarea id="proj-desc-${i}" rows="3" placeholder="Describe what this project does...">${esc(p.description)}</textarea>
        </div>
        <div class="admin-form-group">
          <label>Tech Stack (comma-separated)</label>
          <input type="text" id="proj-tech-${i}" value="${esc(p.techStack.join(', '))}" placeholder="Java, Spring Boot, React" />
        </div>
        <div class="form-row">
          <div class="admin-form-group">
            <label>GitHub URL</label>
            <input type="url" id="proj-github-${i}" value="${esc(p.github || '')}" placeholder="https://github.com/..." />
          </div>
          <div class="admin-form-group">
            <label>Demo URL</label>
            <input type="url" id="proj-demo-${i}" value="${esc(p.demo || '')}" placeholder="https://..." />
          </div>
        </div>
        <div class="admin-form-group">
          <label>
            <input type="checkbox" id="proj-featured-${i}" ${p.featured ? 'checked' : ''} />
            &nbsp; Mark as Featured
          </label>
        </div>
      </div>
    </div>
  `;
}

function addProject() {
  STATE.data.projects.push({
    id: `proj-${Date.now()}`,
    name: 'New Project',
    description: '',
    techStack: [],
    date: new Date().toISOString().split('T')[0],
    github: '',
    demo: '',
    featured: false
  });
  markDirty();
  renderSection('projects');
}

function removeProject(i) {
  confirmDialog(`Remove project "${STATE.data.projects[i].name}"?`, () => {
    STATE.data.projects.splice(i, 1);
    markDirty();
    renderSection('projects');
  });
}

function collectProjectsData() {
  STATE.data.projects.forEach((proj, i) => {
    const get = id => { const el = document.getElementById(id); return el ? el.value.trim() : ''; };
    proj.name = get(`proj-name-${i}`) || proj.name;
    proj.date = get(`proj-date-${i}`) || proj.date;
    proj.description = get(`proj-desc-${i}`);
    proj.github = get(`proj-github-${i}`);
    proj.demo = get(`proj-demo-${i}`);
    const tech = get(`proj-tech-${i}`);
    proj.techStack = tech ? tech.split(',').map(t => t.trim()).filter(Boolean) : proj.techStack;
    const featuredEl = document.getElementById(`proj-featured-${i}`);
    proj.featured = featuredEl ? featuredEl.checked : proj.featured;
  });
}

/* ===================================
   HOBBIES EDITOR
=================================== */
function renderHobbiesEditor() {
  const hobbies = STATE.data.hobbies;
  return `
    <div class="section-editor">
      <div class="editor-header">
        <div class="editor-title"><i class="fas fa-heart"></i> Hobbies</div>
        <button class="admin-btn btn-sm btn-primary" onclick="addHobby()">
          <i class="fas fa-plus"></i> Add Hobby
        </button>
      </div>
      <div id="hobby-cards" class="data-cards">
        ${hobbies.map((h, i) => renderHobbyCard(h, i)).join('')}
      </div>
      <button class="btn-add-card" onclick="addHobby()">
        <i class="fas fa-plus-circle"></i> Add Hobby
      </button>
    </div>
  `;
}

function renderHobbyCard(h, i) {
  return `
    <div class="data-card expanded" id="hobby-card-${i}">
      <div class="data-card-header" onclick="toggleCard('hobby-card-${i}')">
        <div class="data-card-title">
          <span class="card-label">${i + 1}</span>
          ${esc(h.name)}
        </div>
        <div class="data-card-controls">
          <button class="btn-remove-item" onclick="event.stopPropagation(); removeHobby(${i})" title="Remove">
            <i class="fas fa-trash"></i>
          </button>
          <i class="fas fa-chevron-down data-card-collapse-icon"></i>
        </div>
      </div>
      <div class="data-card-body">
        <div class="form-row">
          <div class="admin-form-group">
            <label>Name</label>
            <input type="text" id="hobby-name-${i}" value="${esc(h.name)}" placeholder="Hobby Name" />
          </div>
          <div class="admin-form-group">
            <label>Icon (Font Awesome class)</label>
            <input type="text" id="hobby-icon-${i}" value="${esc(h.icon)}" placeholder="fas fa-code" />
            <div class="form-hint">e.g. fas fa-code, fab fa-github, fas fa-robot</div>
          </div>
        </div>
        <div class="admin-form-group">
          <label>Description</label>
          <textarea id="hobby-desc-${i}" rows="2">${esc(h.description)}</textarea>
        </div>
      </div>
    </div>
  `;
}

function addHobby() {
  STATE.data.hobbies.push({ name: 'New Hobby', icon: 'fas fa-star', description: '' });
  markDirty();
  renderSection('hobbies');
}

function removeHobby(i) {
  confirmDialog(`Remove hobby "${STATE.data.hobbies[i].name}"?`, () => {
    STATE.data.hobbies.splice(i, 1);
    markDirty();
    renderSection('hobbies');
  });
}

function collectHobbiesData() {
  STATE.data.hobbies.forEach((h, i) => {
    const get = id => { const el = document.getElementById(id); return el ? el.value.trim() : ''; };
    h.name = get(`hobby-name-${i}`) || h.name;
    h.icon = get(`hobby-icon-${i}`) || h.icon;
    h.description = get(`hobby-desc-${i}`);
  });
}

/* ===================================
   ACHIEVEMENTS EDITOR
=================================== */
function renderAchievementsEditor() {
  const ach = STATE.data.achievements;
  return `
    <div class="section-editor">
      <div class="editor-header">
        <div class="editor-title"><i class="fas fa-trophy"></i> Achievements</div>
        <button class="admin-btn btn-sm btn-primary" onclick="addAchievement()">
          <i class="fas fa-plus"></i> Add Achievement
        </button>
      </div>
      <div id="ach-cards" class="data-cards">
        ${ach.map((a, i) => renderAchievementCard(a, i)).join('')}
      </div>
      <button class="btn-add-card" onclick="addAchievement()">
        <i class="fas fa-plus-circle"></i> Add Achievement
      </button>
    </div>
  `;
}

function renderAchievementCard(a, i) {
  return `
    <div class="data-card expanded" id="ach-card-${i}">
      <div class="data-card-header" onclick="toggleCard('ach-card-${i}')">
        <div class="data-card-title">
          <span class="card-label">${i + 1}</span>
          ${esc(a.title)}
        </div>
        <div class="data-card-controls">
          <button class="btn-remove-item" onclick="event.stopPropagation(); removeAchievement(${i})" title="Remove">
            <i class="fas fa-trash"></i>
          </button>
          <i class="fas fa-chevron-down data-card-collapse-icon"></i>
        </div>
      </div>
      <div class="data-card-body">
        <div class="admin-form-group">
          <label>Title</label>
          <input type="text" id="ach-title-${i}" value="${esc(a.title)}" placeholder="Achievement title" />
        </div>
        <div class="admin-form-group">
          <label>Description</label>
          <textarea id="ach-desc-${i}" rows="2">${esc(a.description)}</textarea>
        </div>
      </div>
    </div>
  `;
}

function addAchievement() {
  STATE.data.achievements.push({ title: 'New Achievement', description: '' });
  markDirty();
  renderSection('achievements');
}

function removeAchievement(i) {
  confirmDialog(`Remove achievement "${STATE.data.achievements[i].title}"?`, () => {
    STATE.data.achievements.splice(i, 1);
    markDirty();
    renderSection('achievements');
  });
}

function collectAchievementsData() {
  STATE.data.achievements.forEach((a, i) => {
    const get = id => { const el = document.getElementById(id); return el ? el.value.trim() : ''; };
    a.title = get(`ach-title-${i}`) || a.title;
    a.description = get(`ach-desc-${i}`);
  });
}

/* ===================================
   CERTIFICATIONS EDITOR
=================================== */
function renderCertificationsEditor() {
  const certs = STATE.data.certifications || [];
  return `
    <div class="section-editor">
      <div class="editor-header">
        <div class="editor-title"><i class="fas fa-certificate"></i> Certifications</div>
        <button class="admin-btn btn-sm btn-primary" onclick="addCertification()">
          <i class="fas fa-plus"></i> Add Entry
        </button>
      </div>
      <div id="cert-cards" class="data-cards">
        ${certs.map((c, i) => renderCertCard(c, i)).join('')}
      </div>
      <button class="btn-add-card" onclick="addCertification()">
        <i class="fas fa-plus-circle"></i> Add Certification
      </button>
    </div>
  `;
}

function renderCertCard(c, i) {
  return `
    <div class="data-card expanded" id="cert-card-${i}">
      <div class="data-card-header" onclick="toggleCard('cert-card-${i}')">
        <div class="data-card-title">
          <span class="card-label">${i + 1}</span>
          ${esc(c.name)}
        </div>
        <div class="data-card-controls">
          <button class="btn-remove-item" onclick="event.stopPropagation(); removeCertification(${i})" title="Remove">
            <i class="fas fa-trash"></i>
          </button>
          <i class="fas fa-chevron-down data-card-collapse-icon"></i>
        </div>
      </div>
      <div class="data-card-body">
        <div class="admin-form-group">
          <label>Certificate Name</label>
          <input type="text" id="cert-name-${i}" value="${esc(c.name)}" placeholder="AWS Certified Developer" />
        </div>
        <div class="form-row">
          <div class="admin-form-group">
            <label>Issuing Organization</label>
            <input type="text" id="cert-issuer-${i}" value="${esc(c.issuer)}" placeholder="Amazon Web Services" />
          </div>
          <div class="admin-form-group">
            <label>Issuer Icon (Font Awesome class)</label>
            <input type="text" id="cert-icon-${i}" value="${esc(c.issuerIcon || 'fas fa-certificate')}" placeholder="fab fa-aws" />
          </div>
        </div>
        <div class="form-row">
          <div class="admin-form-group">
            <label>Issue Date</label>
            <input type="date" id="cert-date-${i}" value="${c.date || ''}" />
          </div>
          <div class="admin-form-group">
            <label>Expiry Date (leave blank if no expiry)</label>
            <input type="date" id="cert-expiry-${i}" value="${c.expiryDate || ''}" />
          </div>
        </div>
        <div class="form-row">
          <div class="admin-form-group">
            <label>Credential ID</label>
            <input type="text" id="cert-credid-${i}" value="${esc(c.credentialId || '')}" placeholder="Optional credential ID" />
          </div>
          <div class="admin-form-group">
            <label>Credential URL (verify link)</label>
            <input type="url" id="cert-credurl-${i}" value="${esc(c.credentialUrl || '')}" placeholder="https://..." />
          </div>
        </div>
        <div class="admin-form-group">
          <label>Description</label>
          <textarea id="cert-desc-${i}" rows="2" placeholder="Brief description of what this certification validates...">${esc(c.description || '')}</textarea>
        </div>
      </div>
    </div>
  `;
}

function addCertification() {
  if (!STATE.data.certifications) STATE.data.certifications = [];
  STATE.data.certifications.push({
    id: 'cert-' + Date.now(),
    name: 'New Certification',
    issuer: '',
    issuerIcon: 'fas fa-certificate',
    date: new Date().toISOString().split('T')[0],
    expiryDate: '',
    credentialId: '',
    credentialUrl: '',
    description: ''
  });
  markDirty();
  renderSection('certifications');
}

function removeCertification(i) {
  confirmDialog(`Remove certification "${STATE.data.certifications[i].name}"?`, () => {
    STATE.data.certifications.splice(i, 1);
    markDirty();
    renderSection('certifications');
  });
}

function collectCertificationsData() {
  if (!STATE.data.certifications) return;
  STATE.data.certifications.forEach((c, i) => {
    const get = id => { const el = document.getElementById(id); return el ? el.value.trim() : ''; };
    c.name         = get(`cert-name-${i}`)    || c.name;
    c.issuer       = get(`cert-issuer-${i}`);
    c.issuerIcon   = get(`cert-icon-${i}`)    || 'fas fa-certificate';
    c.date         = get(`cert-date-${i}`);
    c.expiryDate   = get(`cert-expiry-${i}`);
    c.credentialId = get(`cert-credid-${i}`);
    c.credentialUrl= get(`cert-credurl-${i}`);
    c.description  = get(`cert-desc-${i}`);
  });
}

/* ===================================
   SETTINGS EDITOR
=================================== */
function renderSettingsEditor() {
  const cfg = STATE.githubConfig;
  return `
    <div class="section-editor">
      <div class="editor-header">
        <div class="editor-title"><i class="fas fa-cog"></i> GitHub Configuration</div>
      </div>
      <div class="settings-card">
        <div class="settings-card-title"><i class="fab fa-github"></i> Repository Settings</div>
        <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:20px;">
          These settings tell the CMS where to publish your data.json file.
        </p>
        <div class="form-row">
          <div class="admin-form-group">
            <label>GitHub Username / Owner</label>
            <input type="text" id="cfg-owner" value="${esc(cfg.owner)}" placeholder="kapilchauhan99" />
          </div>
          <div class="admin-form-group">
            <label>Repository Name</label>
            <input type="text" id="cfg-repo" value="${esc(cfg.repo)}" placeholder="kapilchauhan99.github.io" />
          </div>
        </div>
        <div class="form-row">
          <div class="admin-form-group">
            <label>Branch</label>
            <input type="text" id="cfg-branch" value="${esc(cfg.branch)}" placeholder="main" />
          </div>
          <div class="admin-form-group">
            <label>File Path</label>
            <input type="text" id="cfg-path" value="${esc(cfg.filePath)}" placeholder="data.json" />
          </div>
        </div>
        <button class="admin-btn btn-primary" onclick="saveSettingsConfig()">
          <i class="fas fa-save"></i> Save Configuration
        </button>
      </div>
      <div class="settings-card">
        <div class="settings-card-title"><i class="fas fa-shield-alt"></i> Session</div>
        <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:16px;">
          Your GitHub PAT is stored only in sessionStorage and is cleared when you close the browser tab.
        </p>
        <button class="admin-btn btn-danger" onclick="logout()">
          <i class="fas fa-sign-out-alt"></i> Logout &amp; Clear Session
        </button>
      </div>
    </div>
  `;
}

function saveSettingsConfig() {
  STATE.githubConfig.owner  = (document.getElementById('cfg-owner')  || {}).value?.trim() || STATE.githubConfig.owner;
  STATE.githubConfig.repo   = (document.getElementById('cfg-repo')   || {}).value?.trim() || STATE.githubConfig.repo;
  STATE.githubConfig.branch = (document.getElementById('cfg-branch') || {}).value?.trim() || STATE.githubConfig.branch;
  STATE.githubConfig.filePath = (document.getElementById('cfg-path') || {}).value?.trim() || STATE.githubConfig.filePath;
  saveGithubConfig();
  showToast('GitHub configuration saved!', 'success');
}

/* ===================================
   CARD COLLAPSE TOGGLE
=================================== */
function toggleCard(id) {
  const card = document.getElementById(id);
  if (card) card.classList.toggle('expanded');
}

/* ===================================
   DYNAMIC EVENTS (re-attached after renders)
=================================== */
function attachDynamicEvents(container) {
  // Mark data as dirty on any input change
  container.querySelectorAll('input, textarea, select').forEach(el => {
    el.addEventListener('input', () => markDirty());
    el.addEventListener('change', () => markDirty());
  });
}

/* ===================================
   DATA COLLECTION (before publish/save)
=================================== */
function collectAllData() {
  if (!STATE.data) return;

  // Personal – always save via savePersonal button, but also collect here
  const personalForm = document.getElementById('personal-form');
  if (personalForm) savePersonal();

  collectSkillsData();
  collectExperienceData();
  collectEducationData();
  collectProjectsData();
  collectHobbiesData();
  collectAchievementsData();
  collectCertificationsData();

  // Update meta timestamp
  STATE.data.meta.lastUpdated = new Date().toISOString().split('T')[0];
}

/* ===================================
   DRAFT MANAGEMENT
=================================== */
function saveDraft() {
  collectAllData();
  if (!STATE.data) return;
  localStorage.setItem('portfolio_draft', JSON.stringify(STATE.data));
  setDraftIndicator(false);
}

function markDirty() {
  STATE.isDirty = true;
  setDraftIndicator(true);
}

function setDraftIndicator(dirty) {
  const ind = document.getElementById('draft-indicator');
  const status = document.getElementById('draft-status');
  if (!ind || !status) return;
  if (dirty) {
    ind.classList.add('dirty');
    status.textContent = 'Unsaved changes';
  } else {
    ind.classList.remove('dirty');
    status.textContent = 'Saved';
  }
}

function startDraftAutoSave() {
  if (STATE.draftTimer) clearInterval(STATE.draftTimer);
  STATE.draftTimer = setInterval(() => {
    if (STATE.isDirty && STATE.data) {
      saveDraft();
      STATE.isDirty = false;
    }
  }, 30000);
}

/* ===================================
   GITHUB API
=================================== */
function getHeaders() {
  return {
    Authorization: `token ${STATE.pat}`,
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github.v3+json'
  };
}

async function getFileInfo(path) {
  const { owner, repo, branch } = STATE.githubConfig;
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
  const res = await fetch(url, { headers: getHeaders() });
  if (!res.ok) throw new Error(`Failed to get file info: ${res.status} ${await res.text()}`);
  return res.json();
}

async function getCommitHistory(path) {
  const { owner, repo, branch } = STATE.githubConfig;
  const url = `${GITHUB_API}/repos/${owner}/${repo}/commits?path=${path}&sha=${branch}&per_page=10`;
  const res = await fetch(url, { headers: getHeaders() });
  if (!res.ok) throw new Error(`Failed to get commit history: ${res.status}`);
  return res.json();
}

async function getFileAtCommit(commitSha, path) {
  const { owner, repo } = STATE.githubConfig;
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}?ref=${commitSha}`;
  const res = await fetch(url, { headers: getHeaders() });
  if (!res.ok) throw new Error(`Failed to get file at commit: ${res.status}`);
  const info = await res.json();
  const content = atob(info.content.replace(/\n/g, ''));
  return JSON.parse(content);
}

async function updateFile(path, content, sha, message) {
  const { owner, repo, branch } = STATE.githubConfig;
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`;
  const body = {
    message,
    content: btoa(unescape(encodeURIComponent(JSON.stringify(content, null, 2)))),
    sha,
    branch
  };
  const res = await fetch(url, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`Failed to update file: ${res.status} ${await res.text()}`);
  return res.json();
}

/* ===================================
   LOAD FROM GITHUB
=================================== */
async function loadFromGitHub(silent = false) {
  if (!STATE.pat) return;
  if (!STATE.githubConfig.owner || !STATE.githubConfig.repo) {
    if (!silent) showToast('Please configure GitHub owner and repo in Settings first.', 'warning');
    return;
  }

  showLoader('Fetching from GitHub...');
  try {
    const info = await getFileInfo(STATE.githubConfig.filePath);
    const content = atob(info.content.replace(/\n/g, ''));
    STATE.data = JSON.parse(content);

    // Update config from meta if available
    if (STATE.data.meta && STATE.data.meta.github) {
      STATE.githubConfig = { ...STATE.githubConfig, ...STATE.data.meta.github };
      saveGithubConfig();
    }

    localStorage.setItem('portfolio_draft', JSON.stringify(STATE.data));
    setDraftIndicator(false);
    renderSection(STATE.currentSection);
    if (!silent) showToast('Data loaded from GitHub successfully!', 'success');
  } catch (err) {
    console.error(err);
    if (!silent) showToast(`Failed to load from GitHub: ${err.message}`, 'error');
    // Try loading from local draft as fallback
    const draft = localStorage.getItem('portfolio_draft');
    if (draft && !STATE.data) {
      try {
        STATE.data = JSON.parse(draft);
        renderSection(STATE.currentSection);
        if (!silent) showToast('Loaded from local draft instead.', 'warning');
      } catch (e) {}
    }
  } finally {
    hideLoader();
  }
}

/* ===================================
   PUBLISH TO GITHUB
=================================== */
async function publishToGitHub() {
  if (!STATE.pat) {
    showToast('Not authenticated. Please log in.', 'error');
    return;
  }

  if (!STATE.githubConfig.owner || !STATE.githubConfig.repo) {
    showToast('GitHub owner and repo must be configured in Settings.', 'warning');
    return;
  }

  collectAllData();
  if (!STATE.data) {
    showToast('No data to publish.', 'error');
    return;
  }

  showLoader('Publishing to GitHub...');
  try {
    let sha = null;
    try {
      const info = await getFileInfo(STATE.githubConfig.filePath);
      sha = info.sha;
    } catch (e) {
      // File doesn't exist yet – that's fine for first publish
    }

    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    const message = `Update portfolio content - ${timestamp}`;

    await updateFile(STATE.githubConfig.filePath, STATE.data, sha, message);

    // Update local draft with latest
    localStorage.setItem('portfolio_draft', JSON.stringify(STATE.data));
    setDraftIndicator(false);
    STATE.isDirty = false;

    showToast('Portfolio published to GitHub successfully!', 'success');
  } catch (err) {
    console.error(err);
    showToast(`Publish failed: ${err.message}`, 'error');
  } finally {
    hideLoader();
  }
}

/* ===================================
   ROLLBACK
=================================== */
async function openRollbackModal() {
  if (!STATE.pat) { showToast('Not authenticated.', 'error'); return; }
  if (!STATE.githubConfig.owner || !STATE.githubConfig.repo) {
    showToast('Configure GitHub settings first.', 'warning');
    return;
  }

  const modal = document.getElementById('rollback-modal');
  const listEl = document.getElementById('rollback-list');
  modal.classList.remove('hidden');
  listEl.innerHTML = '<p class="text-muted"><i class="fas fa-spinner fa-spin"></i> Loading commit history...</p>';

  try {
    const commits = await getCommitHistory(STATE.githubConfig.filePath);
    if (!commits.length) {
      listEl.innerHTML = '<p class="text-muted">No commits found for this file.</p>';
      return;
    }

    listEl.innerHTML = commits.map(c => {
      const date = new Date(c.commit.author.date).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
      return `
        <div class="commit-item" onclick="restoreCommit('${c.sha}', '${esc(c.commit.message.split('\n')[0])}')">
          <span class="commit-sha">${c.sha.substring(0, 7)}</span>
          <div class="commit-info">
            <div class="commit-message">${esc(c.commit.message.split('\n')[0])}</div>
            <div class="commit-date"><i class="fas fa-clock"></i> ${date} by ${esc(c.commit.author.name)}</div>
          </div>
          <i class="fas fa-undo" style="color:var(--warning); font-size:0.85rem; flex-shrink:0;"></i>
        </div>
      `;
    }).join('');
  } catch (err) {
    listEl.innerHTML = `<p style="color:var(--danger);">Failed to load: ${err.message}</p>`;
  }
}

async function restoreCommit(sha, message) {
  closeRollbackModal();

  confirmDialog(
    `Restore version from: "${message}" (${sha.substring(0, 7)})?\n\nThis will overwrite the current live data.json.`,
    async () => {
      showLoader('Restoring previous version...');
      try {
        const oldData = await getFileAtCommit(sha, STATE.githubConfig.filePath);
        STATE.data = oldData;

        // Publish the restored version
        const fileInfo = await getFileInfo(STATE.githubConfig.filePath);
        const restoreMsg = `Rollback to ${sha.substring(0, 7)} - ${new Date().toISOString()}`;
        await updateFile(STATE.githubConfig.filePath, STATE.data, fileInfo.sha, restoreMsg);

        localStorage.setItem('portfolio_draft', JSON.stringify(STATE.data));
        setDraftIndicator(false);
        renderSection(STATE.currentSection);
        showToast('Successfully restored previous version!', 'success');
      } catch (err) {
        showToast(`Restore failed: ${err.message}`, 'error');
      } finally {
        hideLoader();
      }
    }
  );
}

/* ===================================
   MODAL MANAGEMENT
=================================== */
function initModal() {
  document.getElementById('modal-close').addEventListener('click', closeRollbackModal);
  document.getElementById('modal-overlay').addEventListener('click', closeRollbackModal);
  document.getElementById('confirm-overlay').addEventListener('click', cancelConfirm);
}

function closeRollbackModal() {
  document.getElementById('rollback-modal').classList.add('hidden');
}

let confirmCallback = null;

function confirmDialog(message, onConfirm) {
  const modal = document.getElementById('confirm-modal');
  const msgEl = document.getElementById('confirm-message');
  msgEl.textContent = message;
  confirmCallback = onConfirm;
  modal.classList.remove('hidden');

  document.getElementById('confirm-ok').onclick = () => {
    modal.classList.add('hidden');
    if (confirmCallback) confirmCallback();
    confirmCallback = null;
  };

  document.getElementById('confirm-cancel').onclick = cancelConfirm;
}

function cancelConfirm() {
  document.getElementById('confirm-modal').classList.add('hidden');
  confirmCallback = null;
}

/* ===================================
   LOADER
=================================== */
function showLoader(msg = 'Processing...') {
  const loader = document.getElementById('admin-loader');
  const msgEl = document.getElementById('loader-msg');
  if (msgEl) msgEl.textContent = msg;
  loader.classList.remove('hidden');
}

function hideLoader() {
  document.getElementById('admin-loader').classList.add('hidden');
}

/* ===================================
   TOAST NOTIFICATIONS
=================================== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-times-circle',
    warning: 'fas fa-exclamation-triangle',
    info: 'fas fa-info-circle'
  };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="${icons[type] || icons.info}"></i><span>${message}</span>`;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4500);
}

/* ===================================
   UTILITIES
=================================== */
function esc(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
