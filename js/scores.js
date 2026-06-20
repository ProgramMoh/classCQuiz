// Scores — Session-based score history

const Scores = {
  initialized: false,

  init() {
    this.initialized = true;
    this.render();
  },

  render() {
    const page = document.getElementById('page-scores');
    const scores = App.getScores();

    if (scores.length === 0) {
      page.innerHTML = `
        <h1 class="page-title">Score History</h1>
        <p class="page-subtitle">Your quiz results from this session</p>
        <div class="empty-state">
          <div class="empty-state-icon">📊</div>
          <div class="empty-state-title">No quizzes taken yet</div>
          <div class="empty-state-text">Take a practice quiz and your scores will appear here.</div>
          <button class="btn btn-primary" onclick="App.navigate('quiz')">Start a Quiz</button>
        </div>
      `;
      return;
    }

    // Calculate overall stats
    const totalQuizzes = scores.length;
    const avgScore = Math.round(scores.reduce((sum, s) => sum + s.percentage, 0) / totalQuizzes);
    const passCount = scores.filter(s => s.passed).length;
    const bestScore = Math.max(...scores.map(s => s.percentage));

    let statsHtml = `
      <div class="overall-stats">
        <div class="stat-card">
          <div class="stat-value">${totalQuizzes}</div>
          <div class="stat-label">Quizzes Taken</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${avgScore}%</div>
          <div class="stat-label">Average Score</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color:var(--green)">${passCount}/${totalQuizzes}</div>
          <div class="stat-label">Passed</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color:var(--accent)">${bestScore}%</div>
          <div class="stat-label">Best Score</div>
        </div>
      </div>
    `;

    // Score items (most recent first)
    let itemsHtml = '';
    [...scores].reverse().forEach((s, idx) => {
      const date = new Date(s.date);
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
      const mins = Math.floor(s.timeMs / 60000);
      const secs = Math.floor((s.timeMs % 60000) / 1000);
      const catLabel = s.category === 'all' ? 'All Categories' : s.category;

      itemsHtml += `
        <div class="score-item">
          <div class="score-info">
            <div class="score-date">${dateStr}</div>
            <div class="score-detail">${s.correct}/${s.total} correct · ${catLabel} · ${mins}:${secs.toString().padStart(2, '0')}</div>
          </div>
          <div class="score-result">
            <div class="score-pct" style="color:${s.passed ? 'var(--green)' : 'var(--red)'}">${s.percentage}%</div>
            <span class="badge ${s.passed ? 'badge-pass' : 'badge-fail'}">${s.passed ? 'PASS' : 'FAIL'}</span>
          </div>
        </div>
      `;
    });

    page.innerHTML = `
      <h1 class="page-title">Score History</h1>
      <p class="page-subtitle">Your quiz results from this session</p>
      ${statsHtml}
      <div class="flex justify-between items-center mb-8">
        <span class="text-muted" style="font-size:0.85rem">${totalQuizzes} quiz${totalQuizzes !== 1 ? 'zes' : ''} this session</span>
        <button class="btn btn-danger btn-sm" onclick="Scores.clearAll()">Clear History</button>
      </div>
      ${itemsHtml}
    `;
  },

  clearAll() {
    if (confirm('Clear all score history from this session?')) {
      App.clearScores();
      this.render();
      App.updateHomeStats();
    }
  }
};
