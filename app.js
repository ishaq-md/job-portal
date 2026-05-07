// Core Application Engine & State Manager for CareerForge

// Global Application State (linked to localStorage for persistence)
let appState = {
  user: null,           // Logged in user info: { name, email }
  appliedJobs: [],      // Array of job IDs applied
  solvedDSA: [],        // Array of DSA problem IDs completed
  quizProgress: {},     // Key-value store of { quiz_id: score }
  activeView: 'dashboard'
};

// Initialize State on Launch
function initAppState() {
  const savedState = localStorage.getItem('careerforge_state');
  if (savedState) {
    appState = { ...appState, ...JSON.parse(savedState) };
  } else {
    saveState();
  }
  
  const savedUser = localStorage.getItem('careerforge_user');
  if (savedUser) {
    appState.user = JSON.parse(savedUser);
  }
  updateSidebarUser();
}

function saveState() {
  localStorage.setItem('careerforge_state', JSON.stringify(appState));
}

// Sidebar Profile state and click actions
function updateSidebarUser() {
  const avatar = document.getElementById('user-profile-avatar');
  const name = document.getElementById('user-profile-name');
  const status = document.getElementById('user-profile-status');
  const mobileAvatar = document.getElementById('mobile-avatar');
  if (!avatar || !name || !status) return;

  if (appState.user) {
    const initials = appState.user.name.charAt(0).toUpperCase();
    avatar.innerText = initials;
    avatar.style.background = 'var(--primary-gradient)';
    avatar.style.color = '#fff';
    name.innerText = appState.user.name;
    status.innerHTML = `<span style="color: #10b981;">● Active</span> (Log Out)`;
    
    if (mobileAvatar) {
      mobileAvatar.innerText = initials;
      mobileAvatar.style.background = 'var(--primary-gradient)';
      mobileAvatar.style.color = '#fff';
    }
  } else {
    avatar.innerText = '?';
    avatar.style.background = 'rgba(255, 255, 255, 0.05)';
    avatar.style.color = 'var(--text-secondary)';
    name.innerText = 'Guest User';
    status.innerText = 'Click to Sign In';
    
    if (mobileAvatar) {
      mobileAvatar.innerText = '?';
      mobileAvatar.style.background = 'rgba(255, 255, 255, 0.05)';
      mobileAvatar.style.color = 'var(--text-secondary)';
    }
  }
}

// Mobile sidebar drawer toggler
function toggleMobileSidebar() {
  const navbar = document.querySelector('aside.navbar');
  const icon = document.getElementById('menu-toggle-icon');
  if (!navbar || !icon) return;
  
  navbar.classList.toggle('mobile-active');
  if (navbar.classList.contains('mobile-active')) {
    icon.className = 'bx bx-x';
  } else {
    icon.className = 'bx bx-menu';
  }
}

function handleUserProfileClick() {
  if (appState.user) {
    // Log out action
    appState.user = null;
    localStorage.removeItem('careerforge_user');
    updateSidebarUser();
    switchView(appState.activeView);
    
    document.getElementById('success-modal-title').innerText = "Logged Out Successfully";
    document.getElementById('success-modal-body').innerText = "You have been signed out of your session. Feel free to log in again anytime!";
    document.getElementById('success-modal').style.display = 'flex';
  } else {
    openAuthModal('login');
  }
}

// Auth modal state controls
let currentAuthTab = 'login';

function openAuthModal(tab = 'login') {
  toggleAuthTab(tab);
  document.getElementById('auth-modal').style.display = 'flex';
}

function toggleAuthTab(tab) {
  currentAuthTab = tab;
  const loginBtn = document.getElementById('auth-tab-login');
  const signupBtn = document.getElementById('auth-tab-signup');
  const nameGroup = document.getElementById('auth-name-group');
  const title = document.getElementById('auth-modal-title');
  const subtitle = document.getElementById('auth-modal-subtitle');
  const submitBtn = document.getElementById('auth-submit-btn');
  if (!loginBtn || !signupBtn || !nameGroup || !title || !subtitle || !submitBtn) return;

  if (tab === 'login') {
    loginBtn.style.color = 'var(--primary)';
    loginBtn.style.borderBottom = '2px solid var(--primary)';
    signupBtn.style.color = 'var(--text-muted)';
    signupBtn.style.borderBottom = 'none';
    nameGroup.style.display = 'none';
    title.innerText = 'Sign In';
    subtitle.innerText = 'Welcome back! Access your profile & track progress.';
    submitBtn.innerText = 'Log In';
  } else {
    signupBtn.style.color = 'var(--primary)';
    signupBtn.style.borderBottom = '2px solid var(--primary)';
    loginBtn.style.color = 'var(--text-muted)';
    loginBtn.style.borderBottom = 'none';
    nameGroup.style.display = 'block';
    title.innerText = 'Create Account';
    subtitle.innerText = 'Join today to solve sheets and apply for jobs.';
    submitBtn.innerText = 'Sign Up';
  }
}

function handleAuthSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('auth-email').value;
  const password = document.getElementById('auth-password').value;
  const name = document.getElementById('auth-name').value || 'User';

  if (currentAuthTab === 'signup') {
    appState.user = { name, email };
    localStorage.setItem('careerforge_user', JSON.stringify(appState.user));
    closeModal('auth-modal');
    updateSidebarUser();
    switchView(appState.activeView);

    document.getElementById('success-modal-title').innerText = "Account Created!";
    document.getElementById('success-modal-body').innerText = `Welcome, ${name}! Your profile is fully ready and tracked on the dashboard.`;
    document.getElementById('success-modal').style.display = 'flex';
  } else {
    const userDisplayName = email.split('@')[0];
    const capitalized = userDisplayName.charAt(0).toUpperCase() + userDisplayName.slice(1);
    appState.user = { name: capitalized, email };
    localStorage.setItem('careerforge_user', JSON.stringify(appState.user));
    closeModal('auth-modal');
    updateSidebarUser();
    switchView(appState.activeView);

    document.getElementById('success-modal-title').innerText = "Logged In Successfully!";
    document.getElementById('success-modal-body').innerText = `Welcome back, ${capitalized}! Your personalized progress has been loaded.`;
    document.getElementById('success-modal').style.display = 'flex';
  }
}

// Global SPA View Router
function switchView(viewName, params = null) {
  appState.activeView = viewName;
  saveState();

  // Auto-close mobile sidebar drawer on navigation
  const navbar = document.querySelector('aside.navbar');
  if (navbar && navbar.classList.contains('mobile-active')) {
    navbar.classList.remove('mobile-active');
    const toggleIcon = document.getElementById('menu-toggle-icon');
    if (toggleIcon) toggleIcon.className = 'bx bx-menu';
  }

  // Update navigation items in sidebar
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.classList.remove('active');
    const label = item.querySelector('span').innerText.toLowerCase();
    if (viewName === 'dashboard' && label === 'dashboard') item.classList.add('active');
    else if (viewName === 'jobs' && label === 'job portal') item.classList.add('active');
    else if (viewName === 'prep' && label === 'prep center') item.classList.add('active');
    else if (viewName === 'dsa' && label === 'dsa sheets') item.classList.add('active');
    else if (viewName === 'companies' && label === 'company process') item.classList.add('active');
  });

  const contentArea = document.getElementById('app-content');
  contentArea.innerHTML = ''; // Clear current content

  switch (viewName) {
    case 'dashboard':
      renderDashboard(contentArea);
      break;
    case 'jobs':
      renderJobPortal(contentArea);
      break;
    case 'prep':
      renderPrepCenter(contentArea, params);
      break;
    case 'dsa':
      renderDSASheets(contentArea, params);
      break;
    case 'companies':
      renderCompanyProcess(contentArea, params);
      break;
    default:
      renderDashboard(contentArea);
  }
  
  // Smoothly scroll back to top of content
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// 1. DASHBOARD VIEW RENDERER
// ==========================================
function renderDashboard(container) {
  // Calculations
  const appliedCount = appState.appliedJobs.length;
  const dsaCount = appState.solvedDSA.length;
  const totalDSAProblems = DSA_SHEET_DATA.reduce((acc, curr) => acc + curr.problems.length, 0);
  const dsaPercentage = totalDSAProblems > 0 ? Math.round((dsaCount / totalDSAProblems) * 100) : 0;
  
  const quizzesCompleted = Object.keys(appState.quizProgress).length;
  const totalQuizzes = Object.values(PREPARATION_DATA).reduce((acc, items) => acc + items.length, 0);
  const prepPercentage = totalQuizzes > 0 ? Math.round((quizzesCompleted / totalQuizzes) * 100) : 0;

  let recentJobsHTML = '';
  JOBS_DATA.slice(0, 3).forEach(job => {
    const isApplied = appState.appliedJobs.includes(job.id);
    recentJobsHTML += `
      <div class="mini-job-card">
        <div class="job-logo-wrapper">
          <img src="${job.logo}" alt="${job.company} Logo">
          <div class="job-meta">
            <h4>${job.title}</h4>
            <p>${job.company} • ${job.location}</p>
          </div>
        </div>
        <div>
          ${isApplied 
            ? `<span class="difficulty-badge easy"><i class="bx bx-check-double"></i> Applied</span>`
            : `<button class="btn btn-secondary btn-sm dsa-action-btn" onclick="openApplyModal('${job.id}')">Apply</button>`
          }
        </div>
      </div>
    `;
  });

  const displayName = appState.user ? appState.user.name : "Guest";
  container.innerHTML = `
    <div class="view-header">
      <div class="view-title">
        <h2>Welcome back, ${displayName}!</h2>
        <p>Your centralized tracker for career building and interview success.</p>
      </div>
    </div>

    <!-- Dynamic Guest Callout Banner -->
    ${!appState.user ? `
    <div class="glass-card" style="display: flex; justify-content: space-between; align-items: center; padding: 1.5rem; background: linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(99, 102, 241, 0.08)); border: 1px dashed var(--primary); margin-bottom: 2rem; border-radius: 16px; animation: modalScaleUp 0.4s ease-out;">
      <div style="max-width: 70%;">
        <h4 style="font-size: 1.1rem; color: var(--primary); font-family: 'Outfit', sans-serif; margin-bottom: 0.25rem;">Unlock Personalised Tracking!</h4>
        <p style="color: var(--text-secondary); font-size: 0.85rem; margin: 0; line-height: 1.4;">Sign up or log in to customize your profile, track applied jobs, and keep your interview prep progress synced across devices.</p>
      </div>
      <div style="display: flex; gap: 0.75rem;">
        <button class="btn btn-secondary btn-sm dsa-action-btn" onclick="openAuthModal('login')" style="padding: 0.5rem 1rem;">Log In</button>
        <button class="btn btn-primary btn-sm dsa-action-btn" onclick="openAuthModal('signup')" style="padding: 0.5rem 1rem;">Sign Up</button>
      </div>
    </div>
    ` : ''}

    <!-- Stats Panel -->
    <div class="stats-grid">
      <div class="glass-card stat-card">
        <div class="stat-icon primary">
          <i class="bx bxs-briefcase"></i>
        </div>
        <div class="stat-info">
          <h3>${appliedCount}</h3>
          <p>Applied Jobs</p>
        </div>
      </div>
      <div class="glass-card stat-card">
        <div class="stat-icon secondary">
          <i class="bx bx-code-block"></i>
        </div>
        <div class="stat-info">
          <h3>${dsaCount}/${totalDSAProblems}</h3>
          <p>DSA Solved (${dsaPercentage}%)</p>
        </div>
      </div>
      <div class="glass-card stat-card">
        <div class="stat-icon amber">
          <i class="bx bxs-book-open"></i>
        </div>
        <div class="stat-info">
          <h3>${quizzesCompleted}/${totalQuizzes}</h3>
          <p>Quizzes Passed (${prepPercentage}%)</p>
        </div>
      </div>
    </div>

    <!-- Main Hero Banner -->
    <div class="hero-banner">
      <div class="hero-content">
        <div class="hero-badge">NEW UPDATES</div>
        <h2>Supercharge your <br><span>Interview Readiness</span></h2>
        <p>Solve high-frequency coding sheets, review core subjects notes, test your logics, and apply directly to top openings.</p>
        <button class="btn btn-primary" onclick="switchView('dsa')">
          <i class="bx bx-play-circle"></i> Start Dedicated DSA Prep
        </button>
      </div>
      <div class="hero-graphic">
        <i class="bx bxs-pie-chart-alt-2" style="font-size: 10rem; color: rgba(99, 102, 241, 0.4); filter: drop-shadow(0 0 30px var(--primary));"></i>
      </div>
    </div>

    <!-- Dual Layout Section -->
    <div class="dash-sections">
      <div>
        <div class="dash-list-header">
          <h3>Recent Job Postings</h3>
          <a href="#" class="view-all-link" onclick="switchView('jobs')">View All</a>
        </div>
        <div class="mini-jobs-list">
          ${recentJobsHTML}
        </div>
      </div>
      
      <div>
        <div class="dash-list-header">
          <h3>Target Companies</h3>
          <a href="#" class="view-all-link" onclick="switchView('companies')">View All</a>
        </div>
        <div class="trending-companies">
          <div class="company-pill" onclick="switchView('companies', 'comp-google')">
            <div class="comp-meta">
              <img src="https://cdn-icons-png.flaticon.com/512/300/300221.png" alt="Google">
              <h4>Google</h4>
            </div>
            <span class="comp-score">6.5+ CGPA</span>
          </div>
          <div class="company-pill" onclick="switchView('companies', 'comp-microsoft')">
            <div class="comp-meta">
              <img src="https://cdn-icons-png.flaticon.com/512/732/732221.png" alt="Microsoft">
              <h4>Microsoft</h4>
            </div>
            <span class="comp-score">7.0+ CGPA</span>
          </div>
          <div class="company-pill" onclick="switchView('companies', 'comp-amazon')">
            <div class="comp-meta">
              <img src="https://cdn-icons-png.flaticon.com/512/5968/5968269.png" alt="Amazon">
              <h4>Amazon</h4>
            </div>
            <span class="comp-score">6.0+ CGPA</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ==========================================
// 2. JOB PORTAL VIEW RENDERER
// ==========================================
let currentSearchQuery = "";
let currentFilterType = "All";

function renderJobPortal(container) {
  container.innerHTML = `
    <div class="view-header">
      <div class="view-title">
        <h2>Job Openings</h2>
        <p>Discover roles customized to your engineering discipline.</p>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="search-filter-bar">
      <div class="search-input-wrapper">
        <i class="bx bx-search"></i>
        <input type="text" id="jobs-search-field" class="search-field" placeholder="Search by title, skills, or company..." value="${currentSearchQuery}" oninput="handleJobSearch(this.value)">
      </div>
      <select id="jobs-filter-select" class="filter-select" onchange="handleJobFilter(this.value)">
        <option value="All" ${currentFilterType === 'All' ? 'selected' : ''}>All Types</option>
        <option value="Full-time" ${currentFilterType === 'Full-time' ? 'selected' : ''}>Full-time</option>
        <option value="Internship" ${currentFilterType === 'Internship' ? 'selected' : ''}>Internship</option>
        <option value="Remote" ${currentFilterType === 'Remote' ? 'selected' : ''}>Remote Only</option>
      </select>
    </div>

    <div class="jobs-grid" id="jobs-cards-container">
      <!-- Loaded dynamically -->
    </div>
  `;
  filterAndRenderJobs();
}

function handleJobSearch(query) {
  currentSearchQuery = query.toLowerCase();
  filterAndRenderJobs();
}

function handleJobFilter(value) {
  currentFilterType = value;
  filterAndRenderJobs();
}

function filterAndRenderJobs() {
  const container = document.getElementById('jobs-cards-container');
  if (!container) return;

  const filtered = JOBS_DATA.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(currentSearchQuery) || 
                          job.company.toLowerCase().includes(currentSearchQuery) || 
                          job.skills.some(skill => skill.toLowerCase().includes(currentSearchQuery));
    
    let matchesFilter = true;
    if (currentFilterType === 'Full-time') matchesFilter = job.type === 'Full-time';
    else if (currentFilterType === 'Internship') matchesFilter = job.type === 'Internship';
    else if (currentFilterType === 'Remote') matchesFilter = job.location.toLowerCase().includes('remote');

    return matchesSearch && matchesFilter;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="glass-card" style="grid-column: 1 / -1; text-align: center; padding: 4rem;">
        <i class="bx bx-info-circle" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
        <h4>No Jobs Found</h4>
        <p style="color: var(--text-secondary);">Try adjusting your search criteria or filters.</p>
      </div>
    `;
    return;
  }

  let cardsHTML = '';
  filtered.forEach(job => {
    const isApplied = appState.appliedJobs.includes(job.id);
    const skillsHTML = job.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
    
    cardsHTML += `
      <div class="glass-card main-job-card">
        <div class="job-card-header">
          <img src="${job.logo}" alt="${job.company} Logo">
          <span class="job-badge-type">${job.type}</span>
        </div>
        <div class="job-card-body">
          <h3>${job.title}</h3>
          <div class="company-name">${job.company}</div>
          
          <div class="job-features">
            <span><i class="bx bx-map"></i> ${job.location}</span>
            <span><i class="bx bx-briefcase-alt"></i> ${job.experience}</span>
          </div>

          <p style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.5; margin-bottom: 1.25rem;">
            ${job.description.substring(0, 120)}...
          </p>

          <div class="job-skills">
            ${skillsHTML}
          </div>
        </div>

        <div class="job-card-footer">
          <div class="job-salary-info">
            <p>EST. SALARY</p>
            <h4>${job.salary.split(' ')[0]}</h4>
          </div>
          <div>
            ${isApplied 
              ? `<button class="btn btn-secondary btn-sm dsa-action-btn" style="cursor: default;" disabled><i class="bx bx-check-double"></i> Applied</button>`
              : `<button class="btn btn-primary btn-sm dsa-action-btn" onclick="openApplyModal('${job.id}')">Apply Now</button>`
            }
          </div>
        </div>
      </div>
    `;
  });
  container.innerHTML = cardsHTML;
}

// Global modal actions
function openApplyModal(jobId) {
  const job = JOBS_DATA.find(j => j.id === jobId);
  if (!job) return;

  document.getElementById('modal-job-id').value = jobId;
  document.getElementById('modal-job-title').innerText = `Apply for ${job.title}`;
  document.getElementById('modal-job-company').innerText = `${job.company} — ${job.location}`;
  
  document.getElementById('apply-modal').style.display = 'flex';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

function submitApplication(event) {
  event.preventDefault();
  const jobId = document.getElementById('modal-job-id').value;
  
  if (!appState.appliedJobs.includes(jobId)) {
    appState.appliedJobs.push(jobId);
    saveState();
  }

  closeModal('apply-modal');
  
  // Open Success Modal
  document.getElementById('success-modal-title').innerText = "Application Submitted!";
  document.getElementById('success-modal-body').innerText = "Congratulations! Your application has been logged successfully in our system, and the recruiter has been notified.";
  document.getElementById('success-modal').style.display = 'flex';

  // Refresh current view if we are on Job Portal
  if (appState.activeView === 'jobs') {
    filterAndRenderJobs();
  } else if (appState.activeView === 'dashboard') {
    switchView('dashboard');
  }
}

// ==========================================
// 3. PREPARATION CENTER VIEW RENDERER
// ==========================================
let currentPrepTab = "aptitude"; // "aptitude", "technical", "hr"
let currentPrepIndex = 0;

function renderPrepCenter(container, selectedItem = null) {
  if (selectedItem) {
    // If we transition into here with specific item
    currentPrepTab = selectedItem.tab;
    currentPrepIndex = selectedItem.index;
  }

  container.innerHTML = `
    <div class="view-header">
      <div class="view-title">
        <h2>Preparation Center</h2>
        <p>Comprehensive subject guides, analytical logics, and dynamic practice assessments.</p>
      </div>
    </div>

    <!-- Category selectors -->
    <div class="prep-selector-grid">
      <div class="glass-card prep-tab-btn ${currentPrepTab === 'aptitude' ? 'active' : ''}" onclick="changePrepTab('aptitude')">
        <i class="bx bx-math"></i>
        <h3>Aptitude</h3>
        <p>Quantitative & Reasoning</p>
      </div>
      <div class="glass-card prep-tab-btn ${currentPrepTab === 'technical' ? 'active' : ''}" onclick="changePrepTab('technical')">
        <i class="bx bx-server"></i>
        <h3>Technical</h3>
        <p>OS, DBMS & Networks</p>
      </div>
      <div class="glass-card prep-tab-btn ${currentPrepTab === 'hr' ? 'active' : ''}" onclick="changePrepTab('hr')">
        <i class="bx bxs-user-voice"></i>
        <h3>HR Interview</h3>
        <p>Behavioral & Star Formulas</p>
      </div>
    </div>

    <!-- Pane layout Split -->
    <div class="prep-main-content">
      <div class="prep-sidebar" id="prep-subject-list">
        <!-- Subject items loaded dynamically -->
      </div>
      
      <div class="prep-pane-layout" id="prep-panel-details">
        <!-- Details injected dynamically -->
      </div>
    </div>
  `;
  loadSubjectList();
}

function changePrepTab(tabName) {
  currentPrepTab = tabName;
  currentPrepIndex = 0;
  
  // Re-toggle active state on tabs
  const tabs = document.querySelectorAll('.prep-tab-btn');
  tabs.forEach(tab => {
    tab.classList.remove('active');
    const header = tab.querySelector('h3').innerText.toLowerCase();
    if (tabName === 'aptitude' && header.includes('aptitude')) tab.classList.add('active');
    if (tabName === 'technical' && header.includes('technical')) tab.classList.add('active');
    if (tabName === 'hr' && header.includes('hr')) tab.classList.add('active');
  });

  loadSubjectList();
}

function loadSubjectList() {
  const sidebar = document.getElementById('prep-subject-list');
  const subjects = PREPARATION_DATA[currentPrepTab] || [];
  
  let listHTML = '';
  subjects.forEach((subj, idx) => {
    listHTML += `
      <div class="prep-side-item ${idx === currentPrepIndex ? 'active' : ''}" onclick="selectSubject(${idx})">
        ${subj.title.split(': ').pop()}
      </div>
    `;
  });
  sidebar.innerHTML = listHTML;
  loadSubjectDetails();
}

function selectSubject(index) {
  currentPrepIndex = index;
  const items = document.querySelectorAll('.prep-side-item');
  items.forEach((item, idx) => {
    item.classList.remove('active');
    if (idx === index) item.classList.add('active');
  });
  loadSubjectDetails();
}

// Mini custom Markdown parser for study notes
function parseCustomNotes(markdown) {
  let html = markdown;
  // Parse subheaders
  html = html.replace(/### (.*)/g, '<h4>$1</h4>');
  // Parse bullet lists
  html = html.replace(/- \*\*(.*?)\*\*: (.*)/g, '<li><strong>$1</strong>: $2</li>');
  html = html.replace(/- (.*)/g, '<li>$1</li>');
  // Wrap list tags
  html = html.replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>');
  // Replace mathematical formulas (simple styling)
  html = html.replace(/\$\$(.*?)\$\$/g, '<div style="text-align: center; font-family: monospace; padding: 0.5rem; background: rgba(255,255,255,0.02); margin: 0.5rem 0; border-radius: 4px; color: #a5b4fc;">$1</div>');
  html = html.replace(/\$(.*?)\$/g, '<code style="font-family: monospace; color:#a5b4fc; background:rgba(255,255,255,0.05); padding: 2px 4px; border-radius: 4px;">$1</code>');
  return html;
}

function loadSubjectDetails() {
  const container = document.getElementById('prep-panel-details');
  const subjects = PREPARATION_DATA[currentPrepTab] || [];
  const subject = subjects[currentPrepIndex];

  if (!subject) {
    container.innerHTML = `<div>No content loaded.</div>`;
    return;
  }

  const parsedNotes = parseCustomNotes(subject.notes);

  let quizHTML = '';
  subject.quiz.forEach((q, qIdx) => {
    let optionsHTML = '';
    q.options.forEach((opt, oIdx) => {
      optionsHTML += `
        <label class="quiz-option" id="opt-label-${subject.id}-${qIdx}-${oIdx}">
          <input type="radio" name="quiz-${subject.id}-${qIdx}" value="${oIdx}" onchange="checkQuizAnswer('${subject.id}', ${qIdx}, ${oIdx})">
          <span>${opt}</span>
        </label>
      `;
    });

    quizHTML += `
      <div class="quiz-card" id="quiz-card-${subject.id}-${qIdx}">
        <div class="quiz-question">${qIdx + 1}. ${q.question}</div>
        <div class="quiz-options">
          ${optionsHTML}
        </div>
        <div class="quiz-explanation" id="quiz-exp-${subject.id}-${qIdx}" style="display: none;">
          <strong>Explanation:</strong> ${q.explanation}
        </div>
      </div>
    `;
  });

  container.innerHTML = `
    <!-- Study Notes Column -->
    <div class="glass-card notes-section">
      <h3>Study Notes</h3>
      ${parsedNotes}
    </div>

    <!-- Practice Quiz Column -->
    <div class="glass-card quiz-section">
      <h3><i class="bx bx-check-square"></i> Topic Assessment</h3>
      <div id="quiz-engine-container">
        ${quizHTML}
      </div>
    </div>
  `;
}

function checkQuizAnswer(subjId, qIdx, selectedOpt) {
  const subjects = PREPARATION_DATA[currentPrepTab] || [];
  const subject = subjects.find(s => s.id === subjId);
  if (!subject) return;

  const question = subject.quiz[qIdx];
  const correctOpt = question.answer;

  // Disable all inputs in this specific quiz card to prevent multiple choices
  const radios = document.getElementsByName(`quiz-${subjId}-${qIdx}`);
  radios.forEach(radio => radio.disabled = true);

  // Style the labels
  const correctLabel = document.getElementById(`opt-label-${subjId}-${qIdx}-${correctOpt}`);
  correctLabel.classList.add('correct');

  if (selectedOpt !== correctOpt) {
    const selectedLabel = document.getElementById(`opt-label-${subjId}-${qIdx}-${selectedOpt}`);
    selectedLabel.classList.add('incorrect');
  }

  // Show explanation
  const expBox = document.getElementById(`quiz-exp-${subjId}-${qIdx}`);
  expBox.style.display = 'block';

  // Record score/completion in state
  const stateKey = `${subjId}-${qIdx}`;
  appState.quizProgress[stateKey] = (selectedOpt === correctOpt) ? 1 : 0;
  saveState();
}

// ==========================================
// 4. DSA SHEETS VIEW RENDERER
// ==========================================
let activeDSAProblem = null;

function renderDSASheets(container, activeProbId = null) {
  if (activeProbId) {
    loadDSAProblemEditor(container, activeProbId);
    return;
  }

  container.innerHTML = `
    <div class="view-header">
      <div class="view-title">
        <h2>Dedicated DSA Sheet</h2>
        <p>Topic-wise curation of high-frequency interview coding challenges.</p>
      </div>
    </div>

    <div class="dsa-sheets-layout" id="dsa-topics-container">
      <!-- Loaded dynamically below -->
    </div>
  `;

  loadDSATopics();
}

function loadDSATopics() {
  const container = document.getElementById('dsa-topics-container');
  let accordionHTML = '';

  DSA_SHEET_DATA.forEach((topic, idx) => {
    let problemsHTML = '';
    let solvedCount = 0;

    topic.problems.forEach(prob => {
      const isSolved = appState.solvedDSA.includes(prob.id);
      if (isSolved) solvedCount++;

      problemsHTML += `
        <tr>
          <td style="width: 50px;">
            <input type="checkbox" id="chk-${prob.id}" ${isSolved ? 'checked' : ''} onchange="toggleProblemStatus('${prob.id}')" style="width: 18px; height: 18px; accent-color: var(--secondary);">
          </td>
          <td>
            <span style="font-weight: 500; color: #fff; cursor: pointer;" onclick="openProblem('${prob.id}')">${prob.title}</span>
          </td>
          <td>
            <span class="difficulty-badge ${prob.difficulty.toLowerCase()}">${prob.difficulty}</span>
          </td>
          <td style="text-align: right;">
            <button class="btn btn-secondary btn-sm dsa-action-btn" onclick="openProblem('${prob.id}')">
              <i class="bx bx-terminal"></i> Solve
            </button>
          </td>
        </tr>
      `;
    });

    const percent = topic.problems.length > 0 ? Math.round((solvedCount / topic.problems.length) * 100) : 0;

    accordionHTML += `
      <div class="dsa-topic-accordion" id="accordion-${topic.slug}">
        <div class="dsa-topic-header" onclick="toggleAccordion('${topic.slug}')">
          <div class="dsa-topic-title">
            <i class="bx bx-folder" style="font-size: 1.4rem; color: var(--primary);"></i>
            <h3>${topic.topic}</h3>
          </div>
          <div class="dsa-progress-wrapper">
            <div class="progress-track">
              <div class="progress-fill" style="width: ${percent}%;"></div>
            </div>
            <span class="dsa-progress-text">${solvedCount}/${topic.problems.length} Solved</span>
            <i class="bx bx-chevron-down" style="font-size: 1.2rem; margin-left: 0.5rem; transition: transform 0.3s;" id="chevron-${topic.slug}"></i>
          </div>
        </div>
        <div class="dsa-topic-content" id="content-${topic.slug}">
          <table class="dsa-problems-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Problem Title</th>
                <th>Difficulty</th>
                <th style="text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${problemsHTML}
            </tbody>
          </table>
        </div>
      </div>
    `;
  });

  container.innerHTML = accordionHTML;
}

function toggleAccordion(slug) {
  const content = document.getElementById(`content-${slug}`);
  const chevron = document.getElementById(`chevron-${slug}`);
  
  if (content.style.display === 'block') {
    content.style.display = 'none';
    chevron.style.transform = 'rotate(0deg)';
  } else {
    content.style.display = 'block';
    chevron.style.transform = 'rotate(180deg)';
  }
}

function toggleProblemStatus(probId) {
  const chk = document.getElementById(`chk-${probId}`);
  if (chk.checked) {
    if (!appState.solvedDSA.includes(probId)) {
      appState.solvedDSA.push(probId);
    }
  } else {
    appState.solvedDSA = appState.solvedDSA.filter(id => id !== probId);
  }
  saveState();
  
  // Re-render accordion bars to update percentages
  loadDSATopics();
}

function openProblem(probId) {
  const contentArea = document.getElementById('app-content');
  loadDSAProblemEditor(contentArea, probId);
}

// ==========================================
// 5. MOCK INTERACTIVE CODE EDITOR
// ==========================================
let currentLanguage = 'javascript';

function loadDSAProblemEditor(container, probId) {
  let problem = null;
  DSA_SHEET_DATA.forEach(topic => {
    const found = topic.problems.find(p => p.id === probId);
    if (found) problem = found;
  });

  if (!problem) return;
  activeDSAProblem = problem;

  const currentTemplate = problem.templates[currentLanguage] || problem.templates['javascript'] || '';

  container.innerHTML = `
    <div class="view-header">
      <div class="view-title" style="display: flex; align-items: center; gap: 1rem;">
        <button class="btn btn-secondary btn-sm" onclick="switchView('dsa')" style="padding: 0.5rem 1rem;"><i class="bx bx-arrow-back"></i> Back</button>
        <div>
          <h2>DSA Playground</h2>
          <p>${problem.title} • Solved Playground</p>
        </div>
      </div>
    </div>

    <div class="editor-split-layout">
      <!-- Problem Details Pane -->
      <div class="glass-card problem-description-panel">
        <h3>${problem.title}</h3>
        <span class="difficulty-badge ${problem.difficulty.toLowerCase()}" style="margin-bottom: 1.5rem;">${problem.difficulty}</span>
        
        <div class="problem-desc-content" style="margin-top: 1rem;">
          <p>${problem.statement}</p>
        </div>

        <div class="problem-examples">
          <h4>Examples:</h4>
          ${problem.examples.map(ex => `<div class="problem-example-block">${ex}</div>`).join('')}
        </div>
      </div>

      <!-- Live Code Editor Pane -->
      <div class="code-editor-panel">
        <div class="editor-header">
          <div class="editor-header-left">
            <div class="dot-btn red"></div>
            <div class="dot-btn yellow"></div>
            <div class="dot-btn green"></div>
            <span class="editor-title">solution.${currentLanguage === 'javascript' ? 'js' : currentLanguage === 'python' ? 'py' : 'cpp'}</span>
          </div>
          <div class="editor-actions">
            <select id="editor-lang-select" class="filter-select" style="padding: 0.35rem 1rem; font-size: 0.8rem; border-radius: 8px;" onchange="changeEditorLanguage(this.value)">
              <option value="javascript" ${currentLanguage === 'javascript' ? 'selected' : ''}>JavaScript</option>
              <option value="python" ${currentLanguage === 'python' ? 'selected' : ''}>Python</option>
              <option value="cpp" ${currentLanguage === 'cpp' ? 'selected' : ''}>C++</option>
            </select>
          </div>
        </div>

        <div class="editor-body">
          <div class="line-numbers" id="line-numbers-col">
            <!-- Line numbers generated automatically -->
          </div>
          <textarea class="code-textarea" id="editor-codebox" spellcheck="false" oninput="updateLineNumbers()">${currentTemplate}</textarea>
        </div>

        <!-- Simulated Editor Console -->
        <div class="editor-console">
          <div class="console-title">
            <i class="bx bx-terminal"></i> Console Output
          </div>
          <div class="console-output" id="console-logs-out">
            Ready to compile. Click "Run Code" or "Submit Solution".
          </div>
        </div>

        <!-- Submission Buttons Footer -->
        <div class="editor-header" style="border-top: 1px solid var(--border-color); border-bottom: none; padding: 1rem;">
          <button class="btn btn-secondary" onclick="runSimulatedCode()"><i class="bx bx-play"></i> Run Code</button>
          <button class="btn btn-primary" onclick="submitSimulatedCode()"><i class="bx bx-rocket"></i> Submit Solution</button>
        </div>
      </div>
    </div>
  `;
  updateLineNumbers();
}

function changeEditorLanguage(lang) {
  currentLanguage = lang;
  if (activeDSAProblem) {
    const editor = document.getElementById('editor-codebox');
    editor.value = activeDSAProblem.templates[lang] || '';
    updateLineNumbers();
    
    const fileLabel = document.querySelector('.editor-title');
    fileLabel.innerText = `solution.${lang === 'javascript' ? 'js' : lang === 'python' ? 'py' : 'cpp'}`;
  }
}

function updateLineNumbers() {
  const textarea = document.getElementById('editor-codebox');
  const lineCol = document.getElementById('line-numbers-col');
  if (!textarea || !lineCol) return;

  const lines = textarea.value.split('\n').length;
  let numbersHTML = '';
  for (let i = 1; i <= lines; i++) {
    numbersHTML += `${i}<br>`;
  }
  lineCol.innerHTML = numbersHTML;
}

function runSimulatedCode() {
  const consoleOut = document.getElementById('console-logs-out');
  consoleOut.innerHTML = `<span style="color: var(--text-secondary);"><i class="bx bx-loader-alt bx-spin"></i> Running test cases...</span>`;

  setTimeout(() => {
    if (activeDSAProblem) {
      const firstTC = activeDSAProblem.testCases[0];
      consoleOut.innerHTML = `
        <span style="color: #34d399;">✔ Test Case 1 Passed!</span><br>
        <span style="color: var(--text-muted);">Input:</span> ${firstTC.input}<br>
        <span style="color: var(--text-muted);">Expected:</span> ${firstTC.expected}<br>
        <span style="color: var(--text-muted);">Actual:</span> ${firstTC.expected}<br>
        <br>
        <span style="color: #10b981; font-weight: bold;">Result: SUCCESS (All localized assertions approved)</span>
      `;
    }
  }, 1000);
}

function submitSimulatedCode() {
  const consoleOut = document.getElementById('console-logs-out');
  consoleOut.innerHTML = `<span style="color: var(--text-secondary);"><i class="bx bx-loader-alt bx-spin"></i> Submitting to evaluation queue...</span>`;

  setTimeout(() => {
    if (activeDSAProblem) {
      if (!appState.solvedDSA.includes(activeDSAProblem.id)) {
        appState.solvedDSA.push(activeDSAProblem.id);
        saveState();
      }

      consoleOut.innerHTML = `
        <span style="color: #34d399; font-weight: bold;">✔ All Test Cases Passed (100% Correct)</span><br>
        <span style="color: var(--text-secondary);">Runtime: 45ms (Beats 94.2% of Javascript submissions)</span><br>
        <span style="color: var(--text-secondary);">Memory: 42.1MB (Beats 88.5% of submissions)</span>
      `;

      // Show celebration modal
      document.getElementById('success-modal-title').innerText = "Problem Solved!";
      document.getElementById('success-modal-body').innerText = `Amazing job! You have successfully solved "${activeDSAProblem.title}". This progress is tracked on your dashboard. Keep building!`;
      document.getElementById('success-modal').style.display = 'flex';
    }
  }, 1200);
}

// ==========================================
// 6. COMPANIES HIRING PROCESS
// ==========================================
let activeCompanyId = "comp-google";

function renderCompanyProcess(container, companyId = null) {
  if (companyId) {
    activeCompanyId = companyId;
  }

  const activeComp = COMPANIES_DATA.find(c => c.id === activeCompanyId) || COMPANIES_DATA[0];

  let timelineHTML = '';
  activeComp.timeline.forEach(node => {
    timelineHTML += `
      <div class="timeline-node">
        <div class="timeline-dot" style="border-color: ${activeComp.accent}; box-shadow: 0 0 10px ${activeComp.accent}"></div>
        <div class="timeline-content">
          <h4>${node.title}</h4>
          <p>${node.desc}</p>
        </div>
      </div>
    `;
  });

  let patternHTML = '';
  activeComp.examPattern.sections.forEach(sec => {
    patternHTML += `
      <div style="margin-bottom: 1.25rem;">
        <h5 style="color: var(--text-primary); font-size: 0.95rem; font-weight: 600; margin-bottom: 0.25rem;">${sec.name}</h5>
        <p style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.4;">${sec.details || sec.desc}</p>
      </div>
    `;
  });

  let syllabusHTML = '';
  activeComp.syllabus.forEach(item => {
    syllabusHTML += `
      <li style="position: relative; padding-left: 1.5rem; color: var(--text-secondary); margin-bottom: 0.5rem; font-size: 0.85rem;">
        <span style="position: absolute; left: 0; color: ${activeComp.accent}">•</span> ${item}
      </li>
    `;
  });

  let companySelectionHTML = '';
  COMPANIES_DATA.forEach(comp => {
    companySelectionHTML += `
      <div class="glass-card company-card" style="${comp.id === activeCompanyId ? `border-color: ${comp.accent}; background: rgba(255, 255, 255, 0.03);` : ''}" onclick="renderCompanyProcess(document.getElementById('app-content'), '${comp.id}')">
        <img src="${comp.logo}" alt="${comp.name}">
        <h3>${comp.name}</h3>
        <p>Hiring Insights</p>
      </div>
    `;
  });

  container.innerHTML = `
    <div class="view-header">
      <div class="view-title">
        <h2>Company Hiring Process</h2>
        <p>Exam patterns, detailed syllabus, eligibility criteria, and step-by-step interview roadmaps.</p>
      </div>
    </div>

    <!-- Grid selection of companies -->
    <div class="companies-grid">
      ${companySelectionHTML}
    </div>

    <div class="company-detail-layout">
      <!-- Interview Roadmap Timeline -->
      <div class="glass-card company-timeline-card">
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
          <img src="${activeComp.logo}" alt="${activeComp.name}" style="width: 44px; height: 44px; background: #fff; padding: 6px; border-radius: 10px;">
          <h3 style="margin-bottom: 0;">${activeComp.name} Interview Roadmap</h3>
        </div>
        <div class="timeline-flow">
          ${timelineHTML}
        </div>
      </div>

      <!-- Exam Pattern, Syllabus and Eligibility -->
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        
        <div class="glass-card">
          <h3 style="font-size: 1.25rem; margin-bottom: 1.25rem;"><i class="bx bx-award"></i> Eligibility Criteria</h3>
          <div class="eligibility-box">
            <div class="eligibility-item">
              <i class="bx bxs-graduation" style="color: ${activeComp.accent}"></i>
              <div>
                <h5>Degrees Eligible</h5>
                <p>${activeComp.eligibility.degree}</p>
              </div>
            </div>
            <div class="eligibility-item">
              <i class="bx bx-check-shield" style="color: ${activeComp.accent}"></i>
              <div>
                <h5>CGPA Cutoff</h5>
                <p>${activeComp.eligibility.cgpa}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="glass-card">
          <h3 style="font-size: 1.25rem; margin-bottom: 1.25rem;"><i class="bx bx-detail"></i> Exam Pattern</h3>
          ${patternHTML}
        </div>

        <div class="glass-card">
          <h3 style="font-size: 1.25rem; margin-bottom: 1.25rem;"><i class="bx bx-list-check"></i> Recommended Syllabus</h3>
          <ul style="list-style: none;">
            ${syllabusHTML}
          </ul>
        </div>

      </div>
    </div>
  `;
}

// Kickstart App State & Load Dashboard View on Window Launch
window.addEventListener('DOMContentLoaded', () => {
  initAppState();
  switchView('dashboard');
});
