/**
 * PORTFOLIO MAIN JS
 * Kapil Chauhan - Personal Portfolio
 * Vanilla JS, no frameworks
 */

/* ===================================
   SECURITY HELPERS
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

// Only allow safe URL protocols — blocks javascript:, data:, vbscript: etc.
function safeUrl(url) {
  if (!url || typeof url !== 'string') return '#';
  const trimmed = url.trim().toLowerCase();
  if (trimmed.startsWith('javascript:') || trimmed.startsWith('data:') || trimmed.startsWith('vbscript:')) return '#';
  return url.trim();
}

/* ===================================
   GLOBAL STATE
=================================== */
let portfolioData = null;
let typingInterval = null;
let particlesAnimId = null;

/* ===================================
   INIT
=================================== */
document.addEventListener('DOMContentLoaded', () => {
  fetchPortfolioData();
  initScrollToTop();
  initNavbar();
  initHamburger();
  initContactForm();
  initKeyboardShortcut();
});

/* ===================================
   DATA FETCH
=================================== */
async function fetchPortfolioData() {
  try {
    const res = await fetch('data.json?v=' + Date.now());
    if (!res.ok) throw new Error('Failed to fetch data.json');
    portfolioData = await res.json();
    renderAll();
  } catch (err) {
    console.error('Portfolio data error:', err);
    showToast('Failed to load portfolio data. Please refresh.', 'error');
    hideLoader();
  }
}

function renderAll() {
  renderHero();
  renderAbout();
  renderSkills();
  renderExperience();
  renderEducation();
  renderCertifications();
  renderProjects();
  renderHobbies();
  renderContact();
  renderFooter();
  initRevealAnimations();
  initParticles();
  hideLoader();
}

/* ===================================
   LOADER
=================================== */
function hideLoader() {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.classList.add('hidden');
  }
}

/* ===================================
   HERO SECTION
=================================== */
function renderHero() {
  const { personal } = portfolioData;

  document.getElementById('hero-name').textContent = personal.name;
  document.getElementById('hero-description').textContent = personal.about.substring(0, 180) + '...';

  const resumeBtn = document.getElementById('resume-btn');
  if (personal.resumeUrl && personal.resumeUrl !== '#') {
    resumeBtn.href = personal.resumeUrl;
    resumeBtn.setAttribute('download', '');
  } else {
    resumeBtn.style.opacity = '0.6';
    resumeBtn.title = 'Resume coming soon';
  }

  // Social icons
  const socialContainer = document.getElementById('hero-social');
  const socials = [
    { icon: 'fab fa-github', url: personal.github, label: 'GitHub' },
    { icon: 'fab fa-linkedin', url: personal.linkedin, label: 'LinkedIn' },
    { icon: 'fas fa-code', url: personal.leetcode, label: 'LeetCode' },
    { icon: 'fas fa-envelope', url: `mailto:${personal.email}`, label: 'Email' }
  ];

  socialContainer.innerHTML = socials.filter(s => s.url).map(s => `
    <a href="${safeUrl(s.url)}" target="${s.url.startsWith('mailto') ? '_self' : '_blank'}"
       rel="noopener noreferrer" class="social-link" aria-label="${esc(s.label)}" title="${esc(s.label)}">
      <i class="${esc(s.icon)}"></i>
    </a>
  `).join('');

  // Start typing effect
  const roles = personal.roles || [personal.title];
  startTypingEffect(roles, 'typing-text');

  // Set page title
  document.title = `${personal.name} | ${personal.title}`;
}

/* ===================================
   TYPING EFFECT
=================================== */
function startTypingEffect(texts, elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 80;
  const deleteSpeed = 45;
  const pauseTime = 2200;

  function type() {
    const currentText = texts[textIndex];
    if (isDeleting) {
      el.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentText.length) {
      delay = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      delay = 400;
    }

    typingInterval = setTimeout(type, delay);
  }

  if (typingInterval) clearTimeout(typingInterval);
  type();
}

/* ===================================
   PARTICLES CANVAS
=================================== */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 16000), 80);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 120;

        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(108, 99, 255, ${opacity})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    // Draw dots
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(108, 99, 255, ${p.alpha})`;
      ctx.fill();
    });
  }

  function updateParticles() {
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
      if (p.y < -10) p.y = canvas.height + 10;
      if (p.y > canvas.height + 10) p.y = -10;
    });
  }

  function animate() {
    updateParticles();
    drawParticles();
    animationId = requestAnimationFrame(animate);
  }

  const resizeObserver = new ResizeObserver(() => {
    resize();
    createParticles();
  });
  resizeObserver.observe(canvas.parentElement);

  resize();
  createParticles();
  animate();
}

/* ===================================
   ABOUT SECTION
=================================== */
function renderAbout() {
  const { personal, achievements } = portfolioData;

  document.getElementById('about-text').textContent = personal.about;

  // Info grid
  const infoEl = document.getElementById('about-info');
  const infoItems = [
    { icon: 'fas fa-map-marker-alt', label: 'Location', value: 'Noida, India', link: null },
    { icon: 'fas fa-envelope', label: 'Email', value: personal.email, link: `mailto:${personal.email}` },
    { icon: 'fab fa-linkedin', label: 'LinkedIn', value: 'kapilchauhan', link: personal.linkedin },
    { icon: 'fas fa-phone', label: 'Phone', value: personal.phone, link: `tel:${personal.phone}` }
  ];

  infoEl.innerHTML = infoItems.map(item => `
    <div class="info-item">
      <i class="${item.icon}"></i>
      ${item.link
        ? `<a href="${item.link}" target="${item.link.startsWith('http') ? '_blank' : '_self'}" rel="noopener">${item.value}</a>`
        : `<span>${item.value}</span>`}
    </div>
  `).join('');

  // Achievement badges
  const achEl = document.getElementById('about-achievements');
  achEl.innerHTML = achievements.map(a => `
    <span class="achievement-badge">
      <i class="fas fa-trophy"></i> ${a.title}
    </span>
  `).join('');

  // Stats
  const statsEl = document.getElementById('about-stats');
  const stats = portfolioData.stats || [];

  statsEl.innerHTML = stats.map(s => `
    <div class="stat-card">
      <div class="stat-number">${s.number}</div>
      <div class="stat-label">${s.label}</div>
    </div>
  `).join('');

  // Avatar
  if (personal.avatar) {
    const avatarEl = document.getElementById('avatar-display');
    avatarEl.innerHTML = `<img src="${safeUrl(personal.avatar)}" alt="${esc(personal.name)}" />`;
  }
}

/* ===================================
   SKILLS SECTION
=================================== */
function renderSkills() {
  const { skills } = portfolioData;
  const container = document.getElementById('skills-grid');

  container.innerHTML = skills.map((category, idx) => `
    <div class="skill-category reveal" style="transition-delay: ${idx * 0.08}s">
      <div class="skill-category-title">${category.category}</div>
      <div class="skill-tags">
        ${category.items.map(skill => `
          <span class="skill-tag" title="Proficiency: ${skill.level}%">${skill.name}</span>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/* ===================================
   EXPERIENCE TIMELINE
=================================== */
function renderExperience() {
  const { experience } = portfolioData;
  const container = document.getElementById('timeline');

  container.innerHTML = experience.map((exp, idx) => {
    const isCurrent = exp.endDate === null;
    return `
      <div class="timeline-item reveal" style="transition-delay: ${idx * 0.15}s">
        <div class="timeline-dot-wrapper">
          <div class="timeline-dot"></div>
        </div>
        <div class="timeline-content">
          <div class="timeline-card">
            <div class="timeline-period">
              <i class="fas fa-calendar-alt"></i>
              ${exp.period}
              ${isCurrent ? '<span class="current-badge">Current</span>' : ''}
            </div>
            <div class="timeline-role">${exp.role}</div>
            <div class="timeline-company">
              <i class="fas fa-building"></i> ${exp.company}
            </div>
            <div class="timeline-location">
              <i class="fas fa-map-marker-alt"></i> ${exp.location}
            </div>
            <div class="timeline-description">${exp.description}</div>
            <div class="timeline-points">
              ${exp.points.map(pt => `<div class="timeline-point">${pt}</div>`).join('')}
            </div>
            <div class="timeline-tech">
              ${exp.techStack.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
            </div>
          </div>
        </div>
        <div class="timeline-empty"></div>
      </div>
    `;
  }).join('');
}

/* ===================================
   EDUCATION SECTION
=================================== */
function renderEducation() {
  const { education } = portfolioData;
  const container = document.getElementById('education-grid');

  container.innerHTML = education.map((edu, idx) => `
    <div class="education-card reveal" style="transition-delay: ${idx * 0.1}s">
      <div class="edu-icon">
        <i class="fas fa-graduation-cap"></i>
      </div>
      <div class="edu-content">
        <div class="edu-institution">${edu.institution}</div>
        <div class="edu-degree">${edu.degree} in ${edu.field}</div>
        <div class="edu-grade">${edu.grade}</div>
        <div class="edu-meta">
          <div class="edu-meta-item">
            <i class="fas fa-calendar"></i>
            <span>${edu.period}</span>
          </div>
          <div class="edu-meta-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>${edu.location}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

/* ===================================
   CERTIFICATIONS SECTION
=================================== */
function renderCertifications() {
  const { certifications } = portfolioData;
  const container = document.getElementById('certifications-grid');
  if (!container || !certifications || !certifications.length) return;

  container.innerHTML = certifications.map((cert, idx) => {
    const issueDate = new Date(cert.date);
    const issueDateStr = issueDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const hasExpiry = cert.expiryDate && cert.expiryDate.trim();
    const expiryDate = hasExpiry ? new Date(cert.expiryDate) : null;
    const isExpired = expiryDate && expiryDate < new Date();
    const expiryStr = expiryDate
      ? expiryDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      : 'No Expiry';

    return `
      <div class="cert-card reveal" style="transition-delay: ${idx * 0.1}s">
        <div class="cert-icon">
          <i class="${cert.issuerIcon || 'fas fa-certificate'}"></i>
        </div>
        <div class="cert-body">
          <div class="cert-name">${cert.name}</div>
          <div class="cert-issuer"><i class="fas fa-building"></i> ${cert.issuer}</div>
          ${cert.description ? `<div class="cert-description">${cert.description}</div>` : ''}
          <div class="cert-meta">
            <span class="cert-date"><i class="fas fa-calendar-check"></i> Issued ${issueDateStr}</span>
            <span class="cert-expiry ${isExpired ? 'expired' : ''}">
              <i class="fas fa-${isExpired ? 'exclamation-circle' : 'shield-alt'}"></i>
              ${isExpired ? 'Expired ' : ''}${expiryStr}
            </span>
          </div>
          ${cert.credentialId ? `<div class="cert-id"><i class="fas fa-fingerprint"></i> ID: ${cert.credentialId}</div>` : ''}
          ${cert.credentialUrl ? `<a href="${safeUrl(cert.credentialUrl)}" class="cert-link" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt"></i> Verify Credential</a>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

/* ===================================
   PROJECTS SECTION
=================================== */
function renderProjects() {
  const { projects } = portfolioData;

  // Sort by date (newest first)
  const sorted = [...projects].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Build filter tags
  const allTechs = new Set();
  sorted.forEach(p => p.techStack.forEach(t => allTechs.add(t)));
  const topTechs = [...allTechs].slice(0, 8);

  const filterContainer = document.getElementById('projects-filter');
  filterContainer.innerHTML = `
    <button class="filter-btn active" data-filter="all">All Projects</button>
    ${topTechs.map(tech => `
      <button class="filter-btn" data-filter="${tech}">${tech}</button>
    `).join('')}
  `;

  filterContainer.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterProjects(btn.dataset.filter);
  });

  // Render cards
  const grid = document.getElementById('projects-grid');
  grid.innerHTML = sorted.map((proj, idx) => {
    const date = new Date(proj.date);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    return `
      <div class="project-card reveal" data-tech="${proj.techStack.join(',')}" style="transition-delay: ${idx * 0.1}s">
        <div class="project-header">
          <div class="project-title-area">
            ${proj.featured ? '<span class="featured-badge"><i class="fas fa-star"></i> Featured</span>' : ''}
            <div class="project-name">${proj.name}</div>
          </div>
          <div class="project-date">${dateStr}</div>
        </div>
        <div class="project-description">${proj.description}</div>
        <div class="project-tech">
          ${proj.techStack.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
        </div>
        <div class="project-links">
          ${proj.github ? `<a href="${safeUrl(proj.github)}" class="project-link" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i> Code</a>` : ''}
          ${proj.demo ? `<a href="${safeUrl(proj.demo)}" class="project-link" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt"></i> Demo</a>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function filterProjects(filter) {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    if (filter === 'all') {
      card.classList.remove('hidden-filter');
    } else {
      const techs = card.dataset.tech.split(',');
      if (techs.includes(filter)) {
        card.classList.remove('hidden-filter');
      } else {
        card.classList.add('hidden-filter');
      }
    }
  });
}

/* ===================================
   HOBBIES SECTION
=================================== */
function renderHobbies() {
  const { hobbies } = portfolioData;
  const container = document.getElementById('hobbies-grid');

  container.innerHTML = hobbies.map((h, idx) => `
    <div class="hobby-card reveal" style="transition-delay: ${idx * 0.1}s">
      <div class="hobby-icon">
        <i class="${h.icon}"></i>
      </div>
      <div class="hobby-name">${h.name}</div>
      <div class="hobby-description">${h.description}</div>
    </div>
  `).join('');
}

/* ===================================
   CONTACT SECTION
=================================== */
function renderContact() {
  const { personal } = portfolioData;
  const container = document.getElementById('contact-info');

  const contactItems = [
    { icon: 'fas fa-envelope', label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
    { icon: 'fas fa-phone', label: 'Phone', value: personal.phone, href: `tel:${personal.phone}` },
    { icon: 'fab fa-linkedin', label: 'LinkedIn', value: 'linkedin.com/in/kapilchauhan', href: personal.linkedin },
    { icon: 'fab fa-github', label: 'GitHub', value: 'github.com/kapilchauhan99', href: personal.github }
  ];

  container.innerHTML = `
    <div class="contact-info-title">Let's Build Something <span class="gradient-text">Together</span></div>
    <div class="contact-info-subtitle">
      I'm open to new opportunities, collaborations, and interesting conversations.
      Whether it's a project idea, a question, or just a hello — feel free to reach out!
    </div>
    <div class="contact-items">
      ${contactItems.map(item => `
        <a href="${safeUrl(item.href)}" class="contact-item" target="${item.href.startsWith('http') ? '_blank' : '_self'}" rel="noopener noreferrer">
          <div class="contact-item-icon"><i class="${esc(item.icon)}"></i></div>
          <div class="contact-item-info">
            <div class="contact-item-label">${esc(item.label)}</div>
            <div class="contact-item-value">${esc(item.value)}</div>
          </div>
          <i class="fas fa-arrow-right" style="color: var(--text-muted); font-size: 0.75rem;"></i>
        </a>
      `).join('')}
    </div>
  `;
}

/* ===================================
   FOOTER
=================================== */
function renderFooter() {
  const { personal } = portfolioData;
  const year = new Date().getFullYear();

  document.getElementById('footer-copy').textContent =
    `© ${year} ${personal.name}. All rights reserved.`;

  const socials = [
    { icon: 'fab fa-github', url: personal.github, label: 'GitHub' },
    { icon: 'fab fa-linkedin', url: personal.linkedin, label: 'LinkedIn' },
    { icon: 'fas fa-code', url: personal.leetcode, label: 'LeetCode' },
    { icon: 'fas fa-envelope', url: `mailto:${personal.email}`, label: 'Email' }
  ];

  document.getElementById('footer-social').innerHTML = socials.filter(s => s.url).map(s => `
    <a href="${safeUrl(s.url)}" target="${s.url.startsWith('mailto') ? '_self' : '_blank'}"
       rel="noopener noreferrer" class="social-link" aria-label="${esc(s.label)}" title="${esc(s.label)}">
      <i class="${esc(s.icon)}"></i>
    </a>
  `).join('');
}

/* ===================================
   SCROLL REVEAL (IntersectionObserver)
=================================== */
function initRevealAnimations() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .skill-category, .timeline-item, .education-card, .project-card, .hobby-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealEls.forEach(el => observer.observe(el));
}

/* ===================================
   SCROLL TO TOP
=================================== */
function initScrollToTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ===================================
   NAVBAR
=================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = [];

  window.addEventListener('scroll', () => {
    // Scrolled class
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlight
    highlightActiveNav(navLinks, sections);
  }, { passive: true });

  // Smooth scroll on nav click
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          // Close mobile menu
          document.getElementById('nav-links').classList.remove('open');
          document.getElementById('hamburger').classList.remove('active');
          document.getElementById('hamburger').setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
}

function highlightActiveNav(navLinks, sections) {
  let current = '';
  const scrollY = window.scrollY;

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href.startsWith('#')) return;
    const section = document.querySelector(href);
    if (!section) return;

    const top = section.offsetTop - 100;
    const bottom = top + section.offsetHeight;

    if (scrollY >= top && scrollY < bottom) {
      current = href;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === current) {
      link.classList.add('active');
    }
  });
}

/* ===================================
   HAMBURGER MENU
=================================== */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen.toString());
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ===================================
   CONTACT FORM
=================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.querySelector('#contact-name').value.trim();
    const email = form.querySelector('#contact-email').value.trim();
    const message = form.querySelector('#contact-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    // Since this is a static site, open mailto as fallback
    const subject = form.querySelector('#contact-subject').value.trim() || 'Portfolio Contact';
    const mailtoLink = `mailto:kapilchn7@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.open(mailtoLink, '_self');
    showToast('Opening your email client...', 'info');
    form.reset();
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ===================================
   TOAST NOTIFICATIONS
=================================== */
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = { success: 'fas fa-check-circle', error: 'fas fa-times-circle', info: 'fas fa-info-circle' };

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
  }, 4000);
}

/* ===================================
   SECRET KEYBOARD SHORTCUT (Ctrl+Shift+A => admin.html)
=================================== */
function initKeyboardShortcut() {
  document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
      e.preventDefault();
      window.location.href = 'admin.html';
    }
  });
}
