/**
 * Learn German - Main Application Logic
 * Level-based flashcard system with spaced repetition
 */

(function () {
  'use strict';

  let progress;
  let currentMode = 'map'; // map | study | quiz | results
  let studyDeck = [];
  let studyIndex = 0;
  let quizQuestions = [];
  let quizIndex = 0;
  let quizScore = 0;
  let quizAnswers = [];
  let activeLevelId = null;
  let cardFlipped = false;

  // --- Initialization ---

  function init() {
    progress = loadProgress();
    renderNavProgress();
    navigateTo('map');
    setupKeyboard();
  }

  // --- Navigation ---

  function navigateTo(mode, levelId) {
    currentMode = mode;
    if (levelId !== undefined) activeLevelId = levelId;

    const app = document.getElementById('app');
    app.innerHTML = '';

    switch (mode) {
      case 'map': renderLevelMap(app); break;
      case 'study': startStudySession(app, activeLevelId); break;
      case 'quiz': startQuiz(app, activeLevelId); break;
      case 'results': renderResults(app); break;
    }

    renderNavProgress();
    window.scrollTo(0, 0);
  }

  // --- Nav Progress ---

  function renderNavProgress() {
    const el = document.getElementById('nav-progress');
    const completed = progress.completedLevels.length;
    const total = LEVELS.length;
    const pct = Math.round((completed / total) * 100);
    el.innerHTML = `
      <span class="nav-level-text">Level ${progress.currentLevel}/${total}</span>
      <div class="nav-progress-bar">
        <div class="nav-progress-fill" style="width: ${pct}%"></div>
      </div>
    `;
  }

  // --- Level Map ---

  function renderLevelMap(container) {
    const section = document.createElement('section');
    section.id = 'level-map';
    section.setAttribute('aria-label', 'Level progression map');

    let html = '<h1 class="map-title">Your path to German A0</h1>';
    html += '<div class="level-list">';

    for (const level of LEVELS) {
      const isCompleted = progress.completedLevels.includes(level.id);
      const isCurrent = level.id === progress.currentLevel && !isCompleted;
      const isLocked = level.id > progress.currentLevel;
      const stateClass = isCompleted ? 'level-completed' : isCurrent ? 'level-current' : 'level-locked';
      const clickable = !isLocked;
      const wordCount = level.words.length;
      const config = LEVEL_CONFIG.find(c => c.id === level.id);
      const reviewCount = config.reviewCount;
      const sessionSize = wordCount + reviewCount;

      const quiz = progress.quizHistory[level.id];
      const scoreText = quiz ? `Best: ${quiz.score}/${quiz.total}` : '';

      html += `
        <div class="level-card ${stateClass}" ${clickable ? `tabindex="0" role="button" aria-label="Start level ${level.id}: ${level.title}" data-level="${level.id}"` : `aria-label="Level ${level.id}: ${level.title} (locked)"`}>
          <div class="level-icon">${isLocked ? '\u{1F512}' : isCompleted ? '\u2705' : level.icon}</div>
          <div class="level-info">
            <div class="level-header">
              <span class="level-number">Level ${level.id}</span>
              ${isCompleted ? '<span class="level-badge badge-complete">Complete</span>' : ''}
              ${isCurrent ? '<span class="level-badge badge-current">Current</span>' : ''}
            </div>
            <div class="level-title">${level.title}</div>
            <div class="level-desc">${level.description}</div>
            <div class="level-meta">
              ${wordCount} new words${reviewCount > 0 ? ` + ${reviewCount} review` : ''} &middot; ${sessionSize} cards
              ${scoreText ? ` &middot; ${scoreText}` : ''}
            </div>
          </div>
          <div class="level-arrow">${isLocked ? '' : '\u2192'}</div>
        </div>
      `;
    }

    html += '</div>';
    html += `
      <div class="map-footer">
        <button class="btn-reset" id="btn-reset-progress">Reset Progress</button>
      </div>
    `;

    section.innerHTML = html;
    container.appendChild(section);

    section.querySelectorAll('.level-card[data-level]').forEach(card => {
      const handler = () => {
        navigateTo('study', parseInt(card.dataset.level));
      };
      card.addEventListener('click', handler);
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handler();
        }
      });
    });

    document.getElementById('btn-reset-progress').addEventListener('click', () => {
      if (confirm('Reset all progress? This cannot be undone.')) {
        progress = resetProgress();
        navigateTo('map');
      }
    });
  }

  // --- Study Session ---

  function startStudySession(container, levelId) {
    const level = LEVELS.find(l => l.id === levelId);
    if (!level) return navigateTo('map');

    const config = LEVEL_CONFIG.find(c => c.id === levelId);
    const reviewWords = getReviewWords(progress, levelId, config.reviewCount);

    studyDeck = [
      ...level.words.map(w => ({ ...w, isReview: false })),
      ...reviewWords.map(w => ({ de: w.de, en: w.en, example: w.example, isReview: true }))
    ];
    shuffle(studyDeck);
    studyIndex = 0;
    cardFlipped = false;

    renderStudyCard(container, level);
  }

  function renderStudyCard(container, level) {
    if (studyIndex >= studyDeck.length) {
      renderStudyComplete(container, level);
      return;
    }

    const card = studyDeck[studyIndex];
    const total = studyDeck.length;
    const num = studyIndex + 1;

    const section = document.createElement('section');
    section.id = 'study-view';
    section.setAttribute('aria-label', 'Study session');

    section.innerHTML = `
      <div class="study-header">
        <button class="btn-back" id="btn-back-map" aria-label="Back to level map">&larr; Back</button>
        <div class="study-progress-text">${num} / ${total}</div>
      </div>
      <div class="study-progress-bar">
        <div class="study-progress-fill" style="width: ${(num / total) * 100}%"></div>
      </div>
      <div class="flashcard ${cardFlipped ? 'flipped' : ''}" id="flashcard" tabindex="0" role="button" aria-label="Flashcard. Press space to flip.">
        ${card.isReview ? '<span class="review-tag">Review</span>' : '<span class="new-tag">New</span>'}
        <div class="flashcard-front">
          <div class="flashcard-word">${card.de}</div>
          <div class="flashcard-pron">${card.pron || ''}</div>
          <div class="flashcard-hint">Tap or press Space to reveal</div>
        </div>
        <div class="flashcard-back">
          <div class="flashcard-word">${card.de}</div>
          <div class="flashcard-pron">${card.pron || ''}</div>
          <div class="flashcard-divider"></div>
          <div class="flashcard-translation">${card.en}</div>
          <div class="flashcard-example">${card.example}</div>
        </div>
      </div>
      <div class="study-actions ${cardFlipped ? 'visible' : ''}" id="study-actions" aria-live="polite">
        <button class="btn-learning" id="btn-learning">Still learning</button>
        <button class="btn-gotit" id="btn-gotit">Got it!</button>
      </div>
    `;

    container.innerHTML = '';
    container.appendChild(section);

    document.getElementById('flashcard').addEventListener('click', flipCard);
    document.getElementById('btn-back-map').addEventListener('click', () => navigateTo('map'));
    document.getElementById('btn-gotit').addEventListener('click', () => assessCard(true, container, level));
    document.getElementById('btn-learning').addEventListener('click', () => assessCard(false, container, level));
  }

  function flipCard() {
    if (cardFlipped) return;
    cardFlipped = true;
    document.getElementById('flashcard').classList.add('flipped');
    document.getElementById('study-actions').classList.add('visible');
  }

  function assessCard(correct, container, level) {
    const card = studyDeck[studyIndex];
    updateWordStat(progress, card.de, correct);
    studyIndex++;
    cardFlipped = false;
    renderStudyCard(container, level);
  }

  function renderStudyComplete(container, level) {
    container.innerHTML = `
      <section id="study-complete" aria-label="Study session complete">
        <div class="complete-card">
          <div class="complete-icon">\u{1F389}</div>
          <h2>Session Complete!</h2>
          <p>You've reviewed all ${studyDeck.length} cards for <strong>${level.title}</strong>.</p>
          <p class="complete-sub">Ready to test your knowledge?</p>
          <div class="complete-actions">
            <button class="btn-primary" id="btn-start-quiz">Start Quiz</button>
            <button class="btn-secondary" id="btn-study-again">Study Again</button>
          </div>
        </div>
      </section>
    `;

    document.getElementById('btn-start-quiz').addEventListener('click', () => navigateTo('quiz', level.id));
    document.getElementById('btn-study-again').addEventListener('click', () => navigateTo('study', level.id));
  }

  // --- Quiz Mode ---

  function startQuiz(container, levelId) {
    const level = LEVELS.find(l => l.id === levelId);
    if (!level) return navigateTo('map');

    quizQuestions = level.words.map(word => {
      const options = generateOptions(word, levelId);
      return { word, options };
    });
    shuffle(quizQuestions);
    quizIndex = 0;
    quizScore = 0;
    quizAnswers = [];

    renderQuizQuestion(container, level);
  }

  function generateOptions(correctWord, levelId) {
    const allWords = [];
    for (const level of LEVELS) {
      if (level.id > levelId) break;
      for (const w of level.words) {
        if (w.en !== correctWord.en) {
          allWords.push(w.en);
        }
      }
    }
    shuffle(allWords);
    const distractors = allWords.slice(0, 3);
    const options = [correctWord.en, ...distractors];
    shuffle(options);
    return options;
  }

  function renderQuizQuestion(container, level) {
    if (quizIndex >= quizQuestions.length) {
      const passed = quizScore >= Math.ceil(quizQuestions.length * 0.8);
      if (passed) {
        completeLevel(progress, level.id, quizScore, quizQuestions.length);
      }
      navigateTo('results');
      return;
    }

    const q = quizQuestions[quizIndex];
    const num = quizIndex + 1;
    const total = quizQuestions.length;

    const section = document.createElement('section');
    section.id = 'quiz-view';
    section.setAttribute('aria-label', 'Quiz');

    section.innerHTML = `
      <div class="quiz-header">
        <button class="btn-back" id="btn-back-study" aria-label="Back to study">&larr; Back</button>
        <div class="quiz-progress-text">${num} / ${total}</div>
        <div class="quiz-score-text">Score: ${quizScore}</div>
      </div>
      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" style="width: ${(num / total) * 100}%"></div>
      </div>
      <div class="quiz-question">
        <div class="quiz-prompt">What does this mean?</div>
        <div class="quiz-word">${q.word.de}</div>
      </div>
      <div class="quiz-options" role="radiogroup" aria-label="Answer options">
        ${q.options.map((opt, i) => `
          <button class="quiz-option" data-index="${i}" tabindex="0" role="radio" aria-checked="false">
            <span class="option-number">${i + 1}</span>
            <span class="option-text">${opt}</span>
          </button>
        `).join('')}
      </div>
      <div class="quiz-feedback" id="quiz-feedback" aria-live="assertive"></div>
    `;

    container.innerHTML = '';
    container.appendChild(section);

    document.getElementById('btn-back-study').addEventListener('click', () => navigateTo('study', level.id));

    section.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => handleQuizAnswer(btn, q, level, container));
    });
  }

  function handleQuizAnswer(btn, question, level, container) {
    if (container.querySelector('.quiz-option.selected')) return;

    const chosen = btn.querySelector('.option-text').textContent;
    const correct = question.word.en;
    const isCorrect = chosen === correct;

    btn.classList.add('selected');

    if (isCorrect) {
      btn.classList.add('correct');
      quizScore++;
    } else {
      btn.classList.add('wrong');
      container.querySelectorAll('.quiz-option').forEach(opt => {
        if (opt.querySelector('.option-text').textContent === correct) {
          opt.classList.add('correct');
        }
      });
    }

    quizAnswers.push({ word: question.word, chosen, correct, isCorrect });
    updateWordStat(progress, question.word.de, isCorrect);

    const feedback = document.getElementById('quiz-feedback');
    feedback.innerHTML = isCorrect
      ? '<span class="feedback-correct">Correct!</span>'
      : `<span class="feedback-wrong">Wrong \u2014 the answer is "${correct}"</span>`;
    feedback.classList.add('visible');

    setTimeout(() => {
      quizIndex++;
      renderQuizQuestion(container, level);
    }, 1200);
  }

  // --- Results Screen ---

  function renderResults(container) {
    const total = quizQuestions.length;
    const passed = quizScore >= Math.ceil(total * 0.8);
    const pct = Math.round((quizScore / total) * 100);
    const level = LEVELS.find(l => l.id === activeLevelId);
    const wrongAnswers = quizAnswers.filter(a => !a.isCorrect);

    const section = document.createElement('section');
    section.id = 'results-view';
    section.setAttribute('aria-label', 'Quiz results');

    let wrongHtml = '';
    if (wrongAnswers.length > 0) {
      wrongHtml = `
        <div class="wrong-list">
          <h3>Words to review:</h3>
          ${wrongAnswers.map(a => `
            <div class="wrong-item">
              <span class="wrong-de">${a.word.de}</span>
              <span class="wrong-arrow">&rarr;</span>
              <span class="wrong-en">${a.correct}</span>
              <span class="wrong-chose">(you chose: ${a.chosen})</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    section.innerHTML = `
      <div class="results-card">
        <div class="results-icon">${passed ? '\u{1F31F}' : '\u{1F4AA}'}</div>
        <h2>${passed ? 'Level Complete!' : 'Keep Practicing!'}</h2>
        <div class="results-score">
          <div class="score-big">${quizScore}/${total}</div>
          <div class="score-pct">${pct}%</div>
        </div>
        <div class="results-threshold">${passed ? 'You passed! (80% required)' : `You need 80% to pass (${Math.ceil(total * 0.8)}/${total})`}</div>
        ${wrongHtml}
        <div class="results-actions">
          ${passed && activeLevelId < LEVELS.length
            ? '<button class="btn-primary" id="btn-next-level">Next Level</button>'
            : ''}
          ${!passed
            ? '<button class="btn-primary" id="btn-retry-study">Study Again</button>'
            : ''}
          <button class="btn-secondary" id="btn-back-to-map">Back to Levels</button>
        </div>
      </div>
    `;

    container.innerHTML = '';
    container.appendChild(section);

    if (passed && activeLevelId < LEVELS.length) {
      document.getElementById('btn-next-level').addEventListener('click', () => {
        navigateTo('study', activeLevelId + 1);
      });
    }
    if (!passed) {
      document.getElementById('btn-retry-study').addEventListener('click', () => {
        navigateTo('study', activeLevelId);
      });
    }
    document.getElementById('btn-back-to-map').addEventListener('click', () => navigateTo('map'));
  }

  // --- Keyboard Support ---

  function setupKeyboard() {
    document.addEventListener('keydown', e => {
      if (currentMode === 'study') {
        if (e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault();
          if (!cardFlipped) flipCard();
        }
        if (cardFlipped) {
          if (e.key === 'ArrowRight' || e.key === '2') {
            e.preventDefault();
            document.getElementById('btn-gotit')?.click();
          }
          if (e.key === 'ArrowLeft' || e.key === '1') {
            e.preventDefault();
            document.getElementById('btn-learning')?.click();
          }
        }
      }

      if (currentMode === 'quiz') {
        const num = parseInt(e.key);
        if (num >= 1 && num <= 4) {
          e.preventDefault();
          document.querySelector(`.quiz-option[data-index="${num - 1}"]`)?.click();
        }
      }
    });
  }

  // --- Utilities ---

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // --- Boot ---

  document.addEventListener('DOMContentLoaded', init);
})();
