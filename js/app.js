// App — Router, navigation, session management

const App = {
  currentPage: 'home',

  init() {
    this.bindNav();
    this.bindMenuToggle();
    this.updateHomeStats();

    // Route from hash
    const hash = location.hash.replace('#', '') || 'home';
    this.navigate(hash, false);

    // Listen for hash changes
    window.addEventListener('hashchange', () => {
      const h = location.hash.replace('#', '') || 'home';
      this.navigate(h, false);
    });
  },

  navigate(page, pushHash = true) {
    const validPages = ['home', 'quiz', 'study', 'tips', 'scores'];
    if (!validPages.includes(page)) page = 'home';

    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    // Show target
    const target = document.getElementById('page-' + page);
    if (target) target.classList.add('active');

    // Update nav
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.page === page);
    });

    // Close mobile menu
    document.getElementById('nav-links').classList.remove('open');

    if (pushHash) location.hash = '#' + page;
    this.currentPage = page;

    // Initialize page content
    if (page === 'quiz' && typeof Quiz !== 'undefined') Quiz.init();
    if (page === 'study' && typeof Study !== 'undefined') Study.init();
    if (page === 'tips' && typeof Tips !== 'undefined') Tips.init();
    if (page === 'scores' && typeof Scores !== 'undefined') Scores.init();
    if (page === 'home') this.updateHomeStats();

    // Scroll to top
    window.scrollTo(0, 0);
  },

  bindNav() {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.dataset.page;
        this.navigate(page);
      });
    });
  },

  bindMenuToggle() {
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav-links');
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.site-header')) {
        nav.classList.remove('open');
      }
    });
  },

  updateHomeStats() {
    document.getElementById('stat-questions').textContent = QUESTIONS.length;
    document.getElementById('stat-categories').textContent = CATEGORIES.length;

    const scores = this.getScores();
    if (scores.length > 0) {
      const best = Math.max(...scores.map(s => s.percentage));
      document.getElementById('stat-best').textContent = best + '%';
    } else {
      document.getElementById('stat-best').textContent = '—';
    }
  },

  // Session storage helpers
  saveScore(scoreData) {
    const scores = this.getScores();
    scores.push(scoreData);
    sessionStorage.setItem('dmv_scores', JSON.stringify(scores));
  },

  getScores() {
    try {
      return JSON.parse(sessionStorage.getItem('dmv_scores')) || [];
    } catch {
      return [];
    }
  },

  clearScores() {
    sessionStorage.removeItem('dmv_scores');
  }
};

// Boot
document.addEventListener('DOMContentLoaded', () => App.init());
