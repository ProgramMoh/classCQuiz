// Quiz — Engine for practice quizzes

const Quiz = {
  state: null, // { questions, currentIndex, answers, startTime, config }
  initialized: false,

  init() {
    if (this.state && this.state.active) return; // Don't reset active quiz
    this.showSetup();
  },

  showSetup() {
    this.state = null;
    const page = document.getElementById('page-quiz');

    let categoryOptions = '<option value="all">All Categories</option>';
    CATEGORIES.forEach(cat => {
      const count = QUESTIONS.filter(q => q.category === cat).length;
      categoryOptions += `<option value="${cat}">${cat} (${count})</option>`;
    });

    page.innerHTML = `
      <h1 class="page-title">Practice Quiz</h1>
      <p class="page-subtitle">Test your knowledge of California driving rules</p>
      <div class="quiz-setup">
        <div class="card">
          <div class="form-group">
            <label class="form-label" for="quiz-count">Number of Questions</label>
            <select class="form-select" id="quiz-count">
              <option value="10">10 Questions (Quick)</option>
              <option value="20">20 Questions</option>
              <option value="30">30 Questions</option>
              <option value="46" selected>46 Questions (DMV Simulation)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" for="quiz-category">Category</label>
            <select class="form-select" id="quiz-category">
              ${categoryOptions}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">
              <span>Passing score: <strong style="color:var(--accent)">83% (DMV standard)</strong></span>
            </label>
          </div>
          <button class="btn btn-primary btn-block" onclick="Quiz.start()" id="btn-begin-quiz">Begin Quiz</button>
        </div>
      </div>
    `;
  },

  start() {
    const count = parseInt(document.getElementById('quiz-count').value);
    const category = document.getElementById('quiz-category').value;

    // Filter and shuffle questions
    let pool = category === 'all' ? [...QUESTIONS] : QUESTIONS.filter(q => q.category === category);
    
    if (pool.length === 0) {
      alert('No questions available for this category.');
      return;
    }

    // Shuffle
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    const questions = pool.slice(0, Math.min(count, pool.length));

    this.state = {
      active: true,
      questions,
      currentIndex: 0,
      answers: new Array(questions.length).fill(null),
      startTime: Date.now(),
      config: { count: questions.length, category, passingPct: 83 }
    };

    this.renderQuestion();
  },

  renderQuestion() {
    const { questions, currentIndex, answers } = this.state;
    const q = questions[currentIndex];
    const answered = answers[currentIndex] !== null;
    const page = document.getElementById('page-quiz');

    const pct = ((currentIndex + (answered ? 1 : 0)) / questions.length * 100).toFixed(0);
    const elapsed = this.getElapsed();

    let imageHtml = '';
    if (q.image) {
      imageHtml = `<div class="question-image">${q.image}</div>`;
    }

    let optionsHtml = '';
    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach((opt, i) => {
      let cls = 'option-btn';
      if (answered) {
        cls += ' disabled';
        if (i === q.correctAnswer) cls += ' correct';
        if (i === answers[currentIndex] && i !== q.correctAnswer) cls += ' incorrect';
      }
      optionsHtml += `
        <button class="${cls}" onclick="Quiz.selectAnswer(${i})" ${answered ? 'disabled' : ''} id="option-${i}">
          <span class="option-letter">${letters[i]}</span>
          <span>${opt}</span>
        </button>`;
    });

    let explanationHtml = '';
    if (answered) {
      const isCorrect = answers[currentIndex] === q.correctAnswer;
      explanationHtml = `
        <div class="explanation">
          <strong>${isCorrect ? 'Correct.' : 'Incorrect.'}</strong> ${q.explanation}
        </div>`;
    }

    const isLast = currentIndex === questions.length - 1;
    let navHtml = '<div class="quiz-nav">';
    navHtml += currentIndex > 0 
      ? `<button class="btn btn-secondary btn-sm" onclick="Quiz.prev()">← Previous</button>` 
      : '<div></div>';
    
    if (answered) {
      navHtml += isLast
        ? `<button class="btn btn-primary btn-sm" onclick="Quiz.finish()">Finish Quiz →</button>`
        : `<button class="btn btn-primary btn-sm" onclick="Quiz.next()">Next →</button>`;
    }
    navHtml += '</div>';

    page.innerHTML = `
      <div class="quiz-progress">
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
        <span class="progress-text">${currentIndex + 1} / ${questions.length}</span>
        <span class="quiz-timer">${elapsed}</span>
      </div>
      <div class="question-card">
        <div class="question-number">Question ${currentIndex + 1} · <span class="badge badge-category">${q.category}</span></div>
        <div class="question-text">${q.question}</div>
        ${imageHtml}
        <div class="options-list">${optionsHtml}</div>
        ${explanationHtml}
      </div>
      ${navHtml}
    `;
  },

  selectAnswer(index) {
    if (this.state.answers[this.state.currentIndex] !== null) return;
    this.state.answers[this.state.currentIndex] = index;
    this.renderQuestion();
  },

  next() {
    if (this.state.currentIndex < this.state.questions.length - 1) {
      this.state.currentIndex++;
      this.renderQuestion();
      window.scrollTo(0, 0);
    }
  },

  prev() {
    if (this.state.currentIndex > 0) {
      this.state.currentIndex--;
      this.renderQuestion();
      window.scrollTo(0, 0);
    }
  },

  finish() {
    const { questions, answers, startTime, config } = this.state;
    const totalTime = Date.now() - startTime;
    
    let correct = 0;
    const results = questions.map((q, i) => {
      const isCorrect = answers[i] === q.correctAnswer;
      if (isCorrect) correct++;
      return { question: q, userAnswer: answers[i], isCorrect };
    });

    const percentage = Math.round((correct / questions.length) * 100);
    const passed = percentage >= config.passingPct;

    // Save score
    App.saveScore({
      date: new Date().toISOString(),
      total: questions.length,
      correct,
      percentage,
      passed,
      category: config.category,
      timeMs: totalTime
    });

    this.state.active = false;
    this.showResults(results, correct, questions.length, percentage, passed, totalTime);
  },

  showResults(results, correct, total, percentage, passed, timeMs) {
    const page = document.getElementById('page-quiz');
    const wrong = total - correct;
    const mins = Math.floor(timeMs / 60000);
    const secs = Math.floor((timeMs % 60000) / 1000);

    // Build review HTML for wrong answers
    let reviewHtml = '';
    const wrongAnswers = results.filter(r => !r.isCorrect);
    if (wrongAnswers.length > 0) {
      reviewHtml = `<div class="review-section">
        <h3 class="review-section-title">Questions You Got Wrong (${wrongAnswers.length})</h3>`;
      
      wrongAnswers.forEach((r, idx) => {
        const letters = ['A', 'B', 'C', 'D'];
        let imageHtml = r.question.image ? `<div class="question-image">${r.question.image}</div>` : '';
        
        let optHtml = '';
        r.question.options.forEach((opt, i) => {
          let cls = 'option-btn disabled';
          if (i === r.question.correctAnswer) cls += ' correct';
          if (i === r.userAnswer && i !== r.question.correctAnswer) cls += ' incorrect';
          optHtml += `<button class="${cls}" disabled>
            <span class="option-letter">${letters[i]}</span>
            <span>${opt}</span>
          </button>`;
        });

        reviewHtml += `
          <div class="question-card">
            <div class="question-number">Question · <span class="badge badge-category">${r.question.category}</span></div>
            <div class="question-text">${r.question.question}</div>
            ${imageHtml}
            <div class="options-list">${optHtml}</div>
            <div class="explanation"><strong>Correct answer:</strong> ${r.question.explanation}</div>
          </div>`;
      });
      reviewHtml += '</div>';
    }

    page.innerHTML = `
      <div class="results-header">
        <div class="results-score ${passed ? 'pass' : 'fail'}">${percentage}%</div>
        <div style="margin:8px 0"><span class="badge ${passed ? 'badge-pass' : 'badge-fail'}">${passed ? 'PASSED' : 'FAILED'}</span></div>
        <div class="results-subtitle">${passed ? 'You would pass the DMV test.' : 'You need 83% to pass. Keep studying.'}</div>
      </div>
      <div class="results-stats">
        <div class="result-stat">
          <div class="result-stat-value" style="color:var(--green)">${correct}</div>
          <div class="result-stat-label">Correct</div>
        </div>
        <div class="result-stat">
          <div class="result-stat-value" style="color:var(--red)">${wrong}</div>
          <div class="result-stat-label">Wrong</div>
        </div>
        <div class="result-stat">
          <div class="result-stat-value">${mins}:${secs.toString().padStart(2, '0')}</div>
          <div class="result-stat-label">Time</div>
        </div>
      </div>
      <div class="results-actions">
        <button class="btn btn-primary" onclick="Quiz.showSetup()">New Quiz</button>
        <button class="btn btn-secondary" onclick="App.navigate('study')">Study Mode</button>
        <button class="btn btn-secondary" onclick="App.navigate('scores')">View Scores</button>
      </div>
      ${reviewHtml}
    `;
    window.scrollTo(0, 0);
  },

  getElapsed() {
    if (!this.state || !this.state.startTime) return '0:00';
    const ms = Date.now() - this.state.startTime;
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
};
