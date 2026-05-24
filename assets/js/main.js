/* ============================================================
   EXPERIENCE CALCULATOR  — start date: Nov 2023
============================================================ */
function calcExperience() {
  const start = new Date(2023, 10, 1); // Nov 2023
  const now   = new Date();
  const years = (now - start) / (1000 * 60 * 60 * 24 * 365.25);
  return `${Math.round(years * 10) / 10}+`;
}

/* ============================================================
   PORTFOLIO DATA — edit this object to update your content
============================================================ */
const DATA = {
  personal: {
    name:      "Kapil Chauhan",
    title:     "Software Engineer",
    tagline:   "Founding Software Engineer @ BlueFetch Robotics",
    roles:     ["Software Engineer", "Backend & AI Developer", "Problem Solver"],
    email:     "kapilchn7@gmail.com",
    phone:     "+91 78348 20637",
    linkedin:  "https://linkedin.com/in/kapilchauhan200",
    github:    "https://github.com/Kapil-chn7",
    leetcode:  "https://leetcode.com/u/kapilchn7/",
    twitter:   "https://x.com/ninjacoder404",
    avatar:    "",
    location:  "Noida, India",
    summary: `Founding Software Engineer at BlueFetch Robotics. Backend engineer — I build distributed, scalable systems with ${calcExperience()} years in microservices, Kafka, and cloud-native architecture. Decent on the frontend too.`,
    about: `Software Engineer with ${calcExperience()} years of experience in scalable backend systems, microservices, and cloud-native applications. Currently building real-time robot telemetry infrastructure at BlueFetch Robotics. Previously at TCS, delivering enterprise microservices serving millions of users. Passionate about clean architecture, performance engineering, and the intersection of software with robotics and AI.`,
    resumeUrl: "https://drive.google.com/file/d/1vib9QCTDI9triA2hh5XKRlkjHmfJnx39/view?usp=drive_link"
  },

  stats: [
    { number: calcExperience(), label: "Years of experience"  },
    { number: "500+", label: "DSA problems solved"   },
    { number: "13+",  label: "Microservices shipped" },
    { number: "4",    label: "Projects completed"    }
  ],

  achievements: [
    "500+ DSA Problems Solved",
    "13+ Microservices Delivered",
    "99% Automated Test Coverage",
    "40% API Performance Improvement",
    "15L+ Donations Processed"
  ],

  skills: [
    { category: "Languages",    items: ["Java", "C/C++", "TypeScript", "JavaScript", "Python", "SQL"] },
    { category: "Frameworks",   items: ["Spring Boot", "Node.js", "Express.js", "React.js", "Next.js", "Angular", "Kafka"] },
    { category: "Cloud & DevOps", items: ["AWS", "Docker", "Kubernetes", "Prometheus", "Grafana"] },
    { category: "Databases",    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "DynamoDB", "Amazon Aurora", "TimescaleDB"] },
    { category: "AI / Tools",   items: ["RAG", "LLMs", "Pinecone", "JUnit", "Git", "JIRA", "WebGL", "Unity"] }
  ],

  experience: [
    {
      company:  "BlueFetch Robotics",
      role:     "Founding Software Engineer",
      period:   "Jan 2026 — Present",
      current:  true,
      location: "Noida, India",
      desc:     "Early engineer at a robotics startup. I work across the full stack — backend services, frontend, and a browser-based robot simulator.",
      points: [
        "Built a Kafka telemetry pipeline handling 10+ sensor streams per device at under 50ms end-to-end",
        "Designed Spring Boot microservices with TimescaleDB storing 5M+ data points daily for robot health monitoring",
        "Set up Prometheus and Grafana dashboards that cut incident response time by 45%",
        "Led frontend work on the robot control interface in Next.js and TypeScript",
        "Built an interactive robot simulator in the browser using WebGL, Unity, and C#",
        "Running infra on Docker, Kubernetes, and AWS with 99.9% uptime"
      ],
      tech: ["Java", "Spring Boot", "Kafka", "TimescaleDB", "Next.js", "TypeScript", "WebGL", "Unity", "Docker", "Kubernetes", "AWS", "Prometheus", "Grafana"]
    },
    {
      company:  "Tata Consultancy Services",
      role:     "Software Developer (Digital Wing)",
      period:   "Nov 2023 — Dec 2025",
      current:  false,
      location: "Noida, India",
      desc:     "Worked on Japan Airlines' domestic post-booking platform. Lots of distributed systems work, performance tuning, and a RAG chatbot POC on the side.",
      points: [
        "Delivered 13+ Spring Boot microservices for PNR and Amadeus integrations serving 30M+ passengers a year",
        "Built a BFF layer with DynamoDB-backed state logging on AWS for long-running seat-processing operations",
        "Wrote a rule engine that runs 1,000+ rules in under 3 minutes with 99% test coverage using JUnit",
        "Cut API latency by 60ms and improved throughput 40% through Redis caching and SQL query optimization",
        "Trimmed JAR size by 30% and improved Lambda cold-start by 95ms through library and pipeline cleanup",
        "Built an Angular chatbot POC using LLMs and RAG — used for internal and client demos"
      ],
      tech: ["Java", "Spring Boot", "DynamoDB", "Redis", "AWS Lambda", "Docker", "Angular", "TypeScript", "RAG", "LLMs", "JUnit"]
    },
    {
      company:  "Neonflake",
      role:     "Full-Stack Developer Intern",
      period:   "Sep 2022 — Mar 2023",
      current:  false,
      location: "Hyderabad, India",
      desc:     "Interned at an early-stage startup and built their donation platform end-to-end.",
      points: [
        "Built kp.foundation from scratch with Node.js and React.js — scaled to 100+ users and processed Rs. 15L+ in donations",
        "Designed a granular RBAC system and custom CMS that cut content management overhead by 50%",
        "Handled responsive UI, Cloudinary media integration, Leaflet maps, and deployment on Heroku"
      ],
      tech: ["Node.js", "React.js", "MongoDB", "Cloudinary", "Heroku"]
    }
  ],

  education: [
    {
      institution: "Guru Gobind Singh Indraprastha University",
      degree:      "Bachelor of Technology",
      field:       "Information Technology",
      period:      "Aug 2019 — Aug 2023",
      location:    "Delhi, India",
      grade:       "8.4 CGPA"
    },
    {
      institution: "",
      degree:      "Class XII",
      field:       "PCM + Computer Science",
      period:      "",
      location:    "",
      grade:       "84.3%"
    },
    {
      institution: "",
      degree:      "Class X",
      field:       "",
      period:      "",
      location:    "",
      grade:       "9.4 CGPA"
    }
  ],

  certifications: [
    {
      name:    "AWS Certified Developer — Associate",
      issuer:  "Amazon Web Services",
      icon:    "fab fa-aws",
      desc:    "Validates expertise in developing and maintaining AWS-based applications."
    },
    {
      name:    "Docker Fundamentals",
      issuer:  "Docker Inc.",
      icon:    "fab fa-docker",
      desc:    "Proficiency in containerization, Docker images, and container orchestration."
    },
    {
      name:    "Java SE Programming",
      issuer:  "Oracle",
      icon:    "fas fa-coffee",
      desc:    "Core Java concepts, OOP principles, and enterprise Java development."
    }
  ],

  awards: [
    { cat: 'technical', icon: 'fas fa-rocket',     title: 'NASA Space Apps — Galactic Problem Solver',      org: 'NASA · Pune, India · Oct 2020',  label: 'Global',    desc: 'Awarded in special appreciation for efforts to address challenges on earth and in space.',       url: 'https://drive.google.com/drive/u/0/folders/1dIy-niDefNDR8L1PAgsLZCE-BK3-cssh' },
    { cat: 'technical', icon: 'fas fa-code',        title: 'Innovate India Coding Championship — Semi Finalist', org: 'Coding Ninjas · July 2022', label: 'National',  desc: 'Certificate of Appreciation for active participation in IICC Round-2.',                       url: 'https://drive.google.com/drive/u/0/folders/1dIy-niDefNDR8L1PAgsLZCE-BK3-cssh' },
    { cat: 'technical', icon: 'fas fa-terminal',    title: 'Accio Wars Coding Contest — Rank 911 / 11,000+',  org: 'AccioJob · July 2022',          label: 'Contest',   desc: 'Secured rank 911 out of 11,000+ participants.',                                             url: 'https://drive.google.com/drive/u/0/folders/1dIy-niDefNDR8L1PAgsLZCE-BK3-cssh' },
    { cat: 'company',   icon: 'fas fa-gem',         title: 'Special Initiative Award — TCS Gems',            org: 'TCS · April 2025',              label: 'TCS Award', desc: 'Outstanding contribution to the organisation. Awarded by Milind Lakkad, EVP & Global Head HR.', url: 'https://drive.google.com/drive/u/0/folders/1dIy-niDefNDR8L1PAgsLZCE-BK3-cssh' },
    { cat: 'company',   icon: 'fas fa-star',        title: 'Star Team Award — TCS Gems',                     org: 'TCS · October 2025',            label: 'TCS Award', desc: 'Outstanding contribution to the organisation. Awarded by Sudeep Kunnumal, VP & Global Head HR.', url: 'https://drive.google.com/file/d/1z3Nb-0-n2Dj_eWBHXqJaerbKZm7FFzHq/view?usp=sharing' },
    { cat: 'other',     icon: 'fas fa-chess-king',  title: 'Chess Tournament Winner — JDC Chennai',          org: 'TCS · JDC Chennai · 2025',      label: '1st Place', desc: 'Awarded for outstanding contribution and commitment. Signed by Milind Karve, JDC Head.',       url: 'https://drive.google.com/file/d/1QjVLvMtd9_o19OdQh679ePlVY4j6LPBU/view?usp=sharing' }
  ],

  cp: {
    note: '500+ DSA problems solved across LeetCode, GFG, CodeChef, Codeforces, and more.',
    url:  'https://linktr.ee/ninjacoder404'
  },

  chess: [
    { label: 'FIDE Certificate', url: 'https://drive.google.com/file/d/1ytppxYe4W5N5lRhFYGIJplTpCi8ZShHj/view?usp=sharing' },
    { label: 'World Chess',      url: 'https://worldchess.com/profile/69975' },
    { label: 'Chess.com',        url: 'https://www.chess.com/member/kapilchn' },
    { label: 'Lichess',          url: 'https://lichess.org/@/gangMemberGM' }
  ],

  projects: [
    {
      name:      "BlueFetch Cloud — Robot Simulator",
      desc:      "A browser-based simulator I built at BlueFetch to demo the robot before hardware was ready. You can drive an industrial cleaning robot live via a wireless RC interface — no install, just a browser tab.",
      features:  [
        { icon: "fas fa-cube",          label: "3D robot rendering",    note: "Real-time in the browser via WebGL"   },
        { icon: "fas fa-gamepad",       label: "RC controller",         note: "Wireless control interface"           },
        { icon: "fas fa-industry",      label: "Industrial robot",      note: "Cleaning robot model"                 },
        { icon: "fas fa-code",          label: "Unity + C#",            note: "Game engine powering the sim"         },
        { icon: "fas fa-globe",         label: "Browser-native",        note: "No install, runs anywhere"            },
        { icon: "fas fa-rocket",        label: "Vercel deploy",         note: "Live and publicly accessible"         }
      ],
      tech:      ["Next.js", "TypeScript", "WebGL", "Unity", "C#", "Vercel"],
      date:      "2026-03",
      featured:  true,
      highlight: true,
      github:    "",
      demo:      "https://blue-fetch-robot-simulator-ezxqhw74k-blue-fetch.vercel.app/"
    },
    {
      name:      "Unstatic.dev",
      desc:      "The backend layer for static sites. One form tag is all it takes — no server, no SDK, no config. Built this because static sites shouldn't need a backend just to handle a contact form.",
      features:  [
        { icon: "fas fa-bolt",        label: "Instant endpoints",   note: "Form backend in seconds"              },
        { icon: "fas fa-shield-alt",  label: "Bot protection",      note: "Honeypot + permanent IP ban"          },
        { icon: "fas fa-tachometer-alt", label: "Rate limiting",    note: "Per-IP, configurable windows"         },
        { icon: "fas fa-envelope",    label: "Gmail digest",        note: "Delivered at 9 AM & 6 PM"             },
        { icon: "fab fa-telegram",    label: "Telegram alerts",     note: "Instant notification per submission"  },
        { icon: "fas fa-database",    label: "Postgres storage",    note: "Every submission saved, never lost"   }
      ],
      tech:      ["Node.js", "Express.js", "PostgreSQL", "Redis", "Docker", "Nginx", "OpenResty"],
      date:      "2026-05",
      featured:  true,
      highlight: true,
      github:    "",
      demo:      "https://unstatic.dev"
    },
    {
      name:      "SquareSense — Chess Board Coordinates",
      desc:      "Built this for myself — I kept mixing up squares during analysis. It's a tiny Chrome extension (22KB) that puts a1–h8 coordinates right on the board, wherever you're playing.",
      features:  [
        { icon: "fas fa-chess-board",   label: "Coordinate overlay",    note: "a1–h8 on any chessboard"             },
        { icon: "fas fa-magic",         label: "Auto-detection",        note: "Chess.com and Lichess out of the box" },
        { icon: "fas fa-hand-pointer",  label: "Manual selection",      note: "Works on any other chess site"        },
        { icon: "fas fa-sliders-h",     label: "Adjustable",            note: "Size, color, and transparency"        },
        { icon: "fas fa-feather",       label: "22KB total",            note: "Lightweight, no bloat"                },
        { icon: "fas fa-eye-slash",     label: "Visual only",           note: "No engine, no automation"             }
      ],
      tech:      ["Chrome Extension", "JavaScript", "HTML", "CSS"],
      date:      "2025-06",
      featured:  true,
      highlight: true,
      github:   "",
      demo:     "https://chromewebstore.google.com/detail/squaresense-%E2%80%93-chess-board/pkcienlnlefnfdpdkjclomgjlekdokgd"
    },
  ]
};

/* ============================================================
   HELPERS
============================================================ */
function esc(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}
function safeUrl(u) {
  if (!u) return '#';
  const t = u.trim().toLowerCase();
  if (['javascript:','data:','vbscript:'].some(p => t.startsWith(p))) return '#';
  return u.trim();
}
function fmtDate(ym) {
  const [y, m] = ym.split('-');
  return m ? new Date(+y, +m - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : y;
}

/* ============================================================
   BOOT
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // inject dynamic experience into ticker (both copies for seamless loop)
  document.querySelectorAll('.ticker-exp').forEach(el => el.textContent = calcExperience());

  renderHero();
  renderAbout();
  renderSkills();
  renderExperience();
  renderEducation();
  renderProjects();
  renderAchievements();
  renderContact();
  renderFooter();
  initReveal();
  initNav();
  initHamburger();
  initScrollTop();
  initContactForm();
  initKeyShortcut();
});

/* ============================================================
   HERO
============================================================ */
function renderHero() {
  const p = DATA.personal;
  document.title = `${p.name} — ${p.title}`;

  const avatarWrap = document.getElementById('hero-avatar-wrap');
  if (p.avatar) {
    avatarWrap.innerHTML = `<img src="${safeUrl(p.avatar)}" alt="${esc(p.name)}" class="hero-avatar" />`;
  } else {
    avatarWrap.style.display = 'none';
  }

  document.getElementById('hero-name').textContent    = p.name;
  document.getElementById('hero-tagline').textContent = p.tagline;
  document.getElementById('hero-desc').textContent    = p.summary;

  document.getElementById('hero-actions').innerHTML = `
    <a href="#experience" class="btn-solid"><i class="fas fa-arrow-down"></i> View Experience</a>
    ${p.resumeUrl
      ? `<a href="${safeUrl(p.resumeUrl)}" target="_blank" rel="noopener noreferrer" class="btn-outline"><i class="fas fa-file-alt"></i> Resume</a>`
      : ''}`;

  const socials = [
    { icon: 'fab fa-github',    url: p.github,            label: 'GitHub'   },
    { icon: 'fab fa-linkedin',  url: p.linkedin,           label: 'LinkedIn' },
    { icon: 'fab fa-x-twitter', url: p.twitter,            label: 'X'        },
    { icon: 'fas fa-code',      url: p.leetcode,           label: 'LeetCode' },
    { icon: 'fas fa-envelope',  url: `mailto:${p.email}`,  label: 'Email'    }
  ];

  document.getElementById('hero-socials').innerHTML = socials
    .filter(s => s.url)
    .map(s => `
      <a href="${safeUrl(s.url)}"
         target="${s.url.startsWith('mailto') ? '_self' : '_blank'}"
         rel="noopener noreferrer" class="social-pill" aria-label="${esc(s.label)}">
        <i class="${esc(s.icon)}"></i> ${esc(s.label)}
      </a>`)
    .join('');
}

/* ============================================================
   ABOUT
============================================================ */
function renderAbout() {
  const p = DATA.personal;

  document.getElementById('about-bio').textContent = p.about;

  document.getElementById('about-meta').innerHTML = [
    { key: 'Location', val: p.location },
    { key: 'Email',    val: p.email,    href: `mailto:${p.email}` },
    { key: 'Phone',    val: p.phone,    href: `tel:${p.phone}` },
    { key: 'LinkedIn', val: 'Profile',  href: p.linkedin },
    { key: 'GitHub',   val: 'Profile',  href: p.github }
  ].map(r => `
    <div class="meta-row">
      <span class="meta-key">${esc(r.key)}</span>
      <span class="meta-val">
        ${r.href
          ? `<a href="${safeUrl(r.href)}" target="${r.href.startsWith('http') ? '_blank' : '_self'}" rel="noopener">${esc(r.val)}</a>`
          : esc(r.val)}
      </span>
    </div>`).join('');

  document.getElementById('about-chips').innerHTML = DATA.achievements
    .map(a => `<span class="chip">${esc(a)}</span>`)
    .join('');

  document.getElementById('about-stats').innerHTML = DATA.stats
    .map(s => `
      <div class="stat-row">
        <div class="stat-num">${esc(s.number)}</div>
        <div class="stat-lbl">${esc(s.label)}</div>
      </div>`)
    .join('');
}

/* ============================================================
   SKILLS
============================================================ */
function renderSkills() {
  document.getElementById('skills-table').innerHTML = DATA.skills
    .map(cat => `
      <div class="skill-row">
        <span class="skill-cat">${esc(cat.category)}</span>
        <div class="skill-items">
          ${cat.items.map(s => `<span class="tag">${esc(s)}</span>`).join('')}
        </div>
      </div>`)
    .join('');
}

/* ============================================================
   EXPERIENCE
============================================================ */
function renderExperience() {
  document.getElementById('exp-list').innerHTML = DATA.experience
    .map(e => `
      <div class="exp-item">
        <div class="exp-top">
          <div class="exp-left">
            <div class="exp-company">${esc(e.company)}</div>
            <div class="exp-role">${esc(e.role)}</div>
            ${e.location ? `<div class="exp-loc">${esc(e.location)}</div>` : ''}
          </div>
          <div class="exp-right">
            <div class="exp-period">${esc(e.period)}</div>
            ${e.current ? `<div class="exp-badge">Current</div>` : ''}
          </div>
        </div>
        ${e.desc ? `<p class="exp-desc">${esc(e.desc)}</p>` : ''}
        ${e.points.length ? `
          <ul class="exp-points">
            ${e.points.map(pt => `<li class="exp-point">${esc(pt)}</li>`).join('')}
          </ul>` : ''}
        <div class="exp-tech">
          ${e.tech.map(t => `<span class="tag">${esc(t)}</span>`).join('')}
        </div>
      </div>`)
    .join('');
}

/* ============================================================
   EDUCATION
============================================================ */
function renderEducation() {
  document.getElementById('edu-list').innerHTML = DATA.education
    .map(e => `
      <div class="edu-item">
        <div>
          ${e.institution ? `<div class="edu-inst">${esc(e.institution)}</div>` : ''}
          <div class="edu-deg">${esc(e.degree)}${e.field ? ' — ' + esc(e.field) : ''}</div>
          ${e.location ? `<div class="edu-detail">${esc(e.location)}</div>` : ''}
          ${e.grade     ? `<div class="edu-grade">${esc(e.grade)}</div>` : ''}
        </div>
        ${e.period ? `<div class="edu-period">${esc(e.period)}</div>` : ''}
      </div>`)
    .join('');
}

/* ============================================================
   PROJECTS
============================================================ */
function renderProjects() {
  const sorted = [...DATA.projects].sort((a, b) => b.date.localeCompare(a.date));
  const techs  = [...new Set(sorted.flatMap(p => p.tech))].slice(0, 8);

  const filterEl = document.getElementById('proj-filter');
  filterEl.innerHTML =
    `<button class="filter-btn active" data-f="all">All</button>` +
    techs.map(t => `<button class="filter-btn" data-f="${esc(t)}">${esc(t)}</button>`).join('');

  filterEl.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    filterEl.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.proj-card').forEach(c => {
      const show = btn.dataset.f === 'all' || c.dataset.tech.split(',').includes(btn.dataset.f);
      c.classList.toggle('hidden-filter', !show);
    });
  });

  document.getElementById('proj-grid').innerHTML = sorted
    .map((proj, i) => {
      const isHighlight = proj.highlight;
      const demoIcon    = proj.demo?.includes('chromewebstore') ? 'fab fa-chrome' : 'fas fa-external-link-alt';
      const demoLabel   = proj.demo?.includes('chromewebstore') ? 'Extension' : 'Live';

      const featuresHtml = isHighlight && proj.features ? `
        <div class="proj-features">
          ${proj.features.map(f => `
            <div class="proj-feature">
              <i class="${esc(f.icon)}"></i>
              <div>
                <div class="pf-label">${esc(f.label)}</div>
                <div class="pf-note">${esc(f.note)}</div>
              </div>
            </div>`).join('')}
        </div>` : '';

      return `
        <div class="proj-card${isHighlight ? ' proj-highlight' : ''}" data-tech="${proj.tech.join(',')}" style="transition-delay:${i * 0.06}s">
          ${i === 0 ? `<div class="proj-starburst"><span>New</span></div>` : ''}
          ${proj.featured ? `<div class="proj-featured">${isHighlight ? '⚡ Active Project' : 'Featured'}</div>` : ''}
          <div class="proj-name">${esc(proj.name)}</div>
          <div class="proj-desc">${esc(proj.desc)}</div>
          ${featuresHtml}
          <div class="proj-tech">${proj.tech.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
          <div class="proj-meta">
            <span class="proj-date">${esc(fmtDate(proj.date))}</span>
            <div class="proj-links">
              ${proj.github ? `<a href="${safeUrl(proj.github)}" target="_blank" rel="noopener" class="proj-link"><i class="fab fa-github"></i> Code</a>` : ''}
              ${proj.demo   ? `<a href="${safeUrl(proj.demo)}" target="_blank" rel="noopener" class="proj-link"><i class="${demoIcon}"></i> ${demoLabel}</a>` : ''}
            </div>
          </div>
        </div>`;
    })
    .join('');

  // trigger reveal
  setTimeout(() => {
    document.querySelectorAll('.proj-card').forEach(c => c.classList.add('visible'));
  }, 100);
}

/* ============================================================
   ACHIEVEMENTS
============================================================ */
function renderAchievements() {
  const cats = [
    { key: 'technical', label: 'Technical & Coding' },
    { key: 'company',   label: 'Company Awards'     },
    { key: 'other',     label: 'Other'               }
  ];

  function awardRows(list) {
    return list.map(a => `
      <div class="award-row">
        <div class="award-icon"><i class="${esc(a.icon)}"></i></div>
        <div class="award-body">
          <div class="award-meta">
            <span class="award-title">${esc(a.title)}</span>
            <span class="award-label">${esc(a.label)}</span>
          </div>
          <div class="award-org">${esc(a.org)}</div>
          <p class="award-desc">${esc(a.desc)}</p>
          ${a.url ? `<a href="${safeUrl(a.url)}" target="_blank" rel="noopener noreferrer" class="award-link"><i class="fas fa-external-link-alt"></i> View Certificate</a>` : ''}
        </div>
      </div>`).join('');
  }

  document.getElementById('awards-list').innerHTML = cats
    .map(cat => {
      const list = DATA.awards.filter(a => a.cat === cat.key);
      if (!list.length) return '';
      return `
        <div class="award-category">
          <p class="award-cat-label">${esc(cat.label)}</p>
          <div class="awards-list">${awardRows(list)}</div>
        </div>`;
    }).join('');

  document.getElementById('ach-extras').innerHTML = `
    <div class="ach-extra-block">
      <p class="ach-extra-title"><i class="fas fa-code-branch"></i> Competitive Programming</p>
      <p class="ach-extra-note">${esc(DATA.cp.note)}</p>
      <div class="ach-btn-row">
        <a href="${safeUrl(DATA.cp.url)}" target="_blank" rel="noopener noreferrer" class="ach-btn">
          <i class="fas fa-external-link-alt"></i> View All Profiles
        </a>
      </div>
    </div>
    <div class="ach-extra-block">
      <p class="ach-extra-title"><i class="fas fa-chess"></i> Chess — Arena FIDE Master (AFM) · 2300+</p>
      <p class="ach-extra-note">Official FIDE title · 2300+ on Chess.com Rapid &amp; Blitz</p>
      <div class="ach-btn-row">
        ${DATA.chess.map(c => `
          <a href="${safeUrl(c.url)}" target="_blank" rel="noopener noreferrer" class="ach-btn">
            ${esc(c.label)}
          </a>`).join('')}
      </div>
    </div>`;
}

/* ============================================================
   CONTACT
============================================================ */
function renderContact() {
  const p = DATA.personal;
  const links = [
    { icon: 'fas fa-envelope', label: 'Email',    val: p.email,    href: `mailto:${p.email}` },
    { icon: 'fas fa-phone',    label: 'Phone',    val: p.phone,    href: `tel:${p.phone}` },
    { icon: 'fab fa-linkedin', label: 'LinkedIn', val: 'linkedin.com/in/kapilchauhan200', href: p.linkedin },
    { icon: 'fab fa-github',   label: 'GitHub',   val: 'github.com/Kapil-chn7',          href: p.github }
  ];

  document.getElementById('contact-left').innerHTML = `
    <p class="contact-lead">Let's build something<br>great together.</p>
    <p class="contact-sub">Open to new roles, collaborations, and interesting conversations. Whether it's a project, a question, or just a hello — reach out.</p>
    <div class="contact-links">
      ${links.map(l => `
        <a href="${safeUrl(l.href)}" class="c-link"
           target="${l.href.startsWith('http') ? '_blank' : '_self'}" rel="noopener noreferrer">
          <i class="${esc(l.icon)} c-icon"></i>
          <div class="c-info">
            <div class="c-label">${esc(l.label)}</div>
            <div class="c-val">${esc(l.val)}</div>
          </div>
          <i class="fas fa-arrow-right c-arrow"></i>
        </a>`).join('')}
    </div>`;
}

/* ============================================================
   FOOTER
============================================================ */
function renderFooter() {
  const p = DATA.personal;
  document.getElementById('footer-copy').textContent = `© ${new Date().getFullYear()} ${p.name}`;

  const socials = [
    { icon: 'fab fa-github',    url: p.github,           label: 'GitHub'   },
    { icon: 'fab fa-linkedin',  url: p.linkedin,          label: 'LinkedIn' },
    { icon: 'fab fa-x-twitter', url: p.twitter,           label: 'X'        },
    { icon: 'fas fa-code',      url: p.leetcode,          label: 'LeetCode' },
    { icon: 'fas fa-envelope',  url: `mailto:${p.email}`, label: 'Email'    }
  ];

  document.getElementById('footer-socials').innerHTML = socials
    .filter(s => s.url)
    .map(s => `
      <a href="${safeUrl(s.url)}"
         target="${s.url.startsWith('mailto') ? '_self' : '_blank'}"
         rel="noopener noreferrer" class="f-social" aria-label="${esc(s.label)}" title="${esc(s.label)}">
        <i class="${esc(s.icon)}"></i>
      </a>`)
    .join('');
}

/* ============================================================
   REVEAL ON SCROLL
============================================================ */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.07, rootMargin: '0px 0px -32px 0px' });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ============================================================
   NAVBAR
============================================================ */
function initNav() {
  const nb    = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-link[href^="#"]');

  window.addEventListener('scroll', () => {
    nb.classList.toggle('scrolled', window.scrollY > 10);
    let cur = '';
    links.forEach(l => {
      const sec = document.querySelector(l.getAttribute('href'));
      if (sec && window.scrollY >= sec.offsetTop - 100) cur = l.getAttribute('href');
    });
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === cur));
  }, { passive: true });

  links.forEach(l => {
    l.addEventListener('click', e => {
      const href = l.getAttribute('href');
      if (!href.startsWith('#')) return;
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      closeMenu();
    });
  });
}

/* ============================================================
   HAMBURGER
============================================================ */
function initHamburger() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('nav-links');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.classList.toggle('active', open);
    btn.setAttribute('aria-expanded', open);
  });

  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) closeMenu();
  });
}

function closeMenu() {
  document.getElementById('nav-links')?.classList.remove('open');
  const btn = document.getElementById('hamburger');
  btn?.classList.remove('active');
  btn?.setAttribute('aria-expanded', 'false');
}

/* ============================================================
   SCROLL TOP
============================================================ */
function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 500), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ============================================================
   CONTACT FORM
============================================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name    = form.querySelector('#cn').value.trim();
    const email   = form.querySelector('#ce').value.trim();
    const subject = form.querySelector('#cs').value.trim() || 'Portfolio Contact';
    const message = form.querySelector('#cm').value.trim();

    if (!name || !email || !message) { toast('Please fill in all required fields.', 'error'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast('Enter a valid email address.', 'error'); return; }

    window.open(
      `mailto:kapilchn7@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`,
      '_self'
    );
    toast('Opening email client…', 'info');
    form.reset();
  });
}

/* ============================================================
   TOAST
============================================================ */
function toast(msg, type = 'info') {
  let box = document.querySelector('.toast-container');
  if (!box) { box = document.createElement('div'); box.className = 'toast-container'; document.body.appendChild(box); }

  const icons = { success: 'fas fa-check-circle', error: 'fas fa-times-circle', info: 'fas fa-info-circle' };
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<i class="${icons[type]}"></i><span>${msg}</span>`;
  box.appendChild(t);

  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 350); }, 4000);
}

/* ============================================================
   SECRET SHORTCUT  Ctrl+Shift+A
============================================================ */
function initKeyShortcut() {
  document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') { e.preventDefault(); window.location.href = 'admin.html'; }
  });
}
