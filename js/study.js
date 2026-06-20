// Study — Browse all questions with answers

const Study = {
  initialized: false,
  currentFilter: 'all',
  searchQuery: '',

  init() {
    if (this.initialized) return;
    this.initialized = true;
    this.render();
  },

  render() {
    const page = document.getElementById('page-study');

    let categoryOptions = '<option value="all">All Categories</option>';
    CATEGORIES.forEach(cat => {
      const count = QUESTIONS.filter(q => q.category === cat).length;
      categoryOptions += `<option value="${cat}" ${this.currentFilter === cat ? 'selected' : ''}>${cat} (${count})</option>`;
    });

    const filtered = this.getFiltered();

    let questionsHtml = '';
    filtered.forEach((q, idx) => {
      const letters = ['A', 'B', 'C', 'D'];
      
      let imageHtml = '';
      if (q.image) {
        imageHtml = `<div class="study-image">${q.image}</div>`;
      }

      let answersHtml = '';
      q.options.forEach((opt, i) => {
        const isCorrect = i === q.correctAnswer;
        answersHtml += `<div class="study-answer ${isCorrect ? 'correct' : ''}">${letters[i]}. ${opt}${isCorrect ? ' ✓' : ''}</div>`;
      });

      questionsHtml += `
        <div class="study-card" id="study-card-${idx}">
          <div class="study-card-header" onclick="Study.toggleCard(${idx})">
            <span class="study-q-num">${idx + 1}.</span>
            <span class="study-q-text">${q.question}</span>
            <span class="study-toggle">▾</span>
          </div>
          <div class="study-card-body">
            <span class="badge badge-category mb-8" style="display:inline-block">${q.category}</span>
            ${imageHtml}
            <div class="study-answer-label">Answers</div>
            ${answersHtml}
            <div class="study-explanation">${q.explanation}</div>
          </div>
        </div>`;
    });

    if (filtered.length === 0) {
      questionsHtml = `<div class="no-data"><div class="no-data-icon">🔍</div>No questions found matching your search.</div>`;
    }

    page.innerHTML = `
      <h1 class="page-title">Study Mode</h1>
      <p class="page-subtitle">Browse all questions — click to reveal answers</p>
      <div class="study-controls">
        <select class="form-select" id="study-filter" onchange="Study.filterChanged()">
          ${categoryOptions}
        </select>
        <input class="form-input" type="text" id="study-search" placeholder="Search questions..." 
               value="${this.searchQuery}" oninput="Study.searchChanged()">
      </div>
      <div class="flex justify-between items-center mb-8">
        <span class="study-count">Showing ${filtered.length} of ${QUESTIONS.length} questions</span>
        <button class="btn btn-secondary btn-sm" onclick="Study.expandAll()">Expand All</button>
      </div>
      <div id="study-list">${questionsHtml}</div>
    `;
  },

  getFiltered() {
    let filtered = [...QUESTIONS];
    
    if (this.currentFilter !== 'all') {
      filtered = filtered.filter(q => q.category === this.currentFilter);
    }

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(q => 
        q.question.toLowerCase().includes(query) ||
        q.options.some(o => o.toLowerCase().includes(query)) ||
        q.explanation.toLowerCase().includes(query) ||
        q.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  },

  filterChanged() {
    this.currentFilter = document.getElementById('study-filter').value;
    this.initialized = false;
    this.init();
  },

  searchChanged() {
    this.searchQuery = document.getElementById('study-search').value;
    // Debounce
    clearTimeout(this._searchTimeout);
    this._searchTimeout = setTimeout(() => {
      this.initialized = false;
      this.init();
    }, 250);
  },

  toggleCard(idx) {
    const card = document.getElementById('study-card-' + idx);
    if (card) card.classList.toggle('open');
  },

  expandAll() {
    const cards = document.querySelectorAll('.study-card');
    const allOpen = Array.from(cards).every(c => c.classList.contains('open'));
    cards.forEach(c => {
      if (allOpen) {
        c.classList.remove('open');
      } else {
        c.classList.add('open');
      }
    });
  }
};
