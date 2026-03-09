/**
 * Learn German - localStorage Persistence Layer
 */

const STORAGE_KEY = 'learnGerman_progress';
const STORAGE_VERSION = 1;

function getDefaultProgress() {
  return {
    version: STORAGE_VERSION,
    currentLevel: 1,
    completedLevels: [],
    wordStats: {},
    quizHistory: {}
  };
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultProgress();
    const data = JSON.parse(raw);
    if (data.version !== STORAGE_VERSION) return getDefaultProgress();
    return data;
  } catch {
    return getDefaultProgress();
  }
}

function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Storage full or unavailable
  }
}

function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
  return getDefaultProgress();
}

function updateWordStat(progress, wordKey, correct) {
  if (!progress.wordStats[wordKey]) {
    progress.wordStats[wordKey] = {
      timesCorrect: 0,
      timesWrong: 0,
      lastSeen: 0
    };
  }
  const stat = progress.wordStats[wordKey];
  if (correct) {
    stat.timesCorrect++;
  } else {
    stat.timesWrong++;
  }
  stat.lastSeen = Date.now();
  saveProgress(progress);
}

function completeLevel(progress, levelId, score, total) {
  if (!progress.completedLevels.includes(levelId)) {
    progress.completedLevels.push(levelId);
  }
  progress.quizHistory[levelId] = {
    score,
    total,
    completedAt: Date.now()
  };
  if (levelId < LEVELS.length) {
    progress.currentLevel = Math.max(progress.currentLevel, levelId + 1);
  }
  saveProgress(progress);
}

function getReviewWords(progress, currentLevelId, count) {
  const pool = [];
  for (const level of LEVELS) {
    if (level.id >= currentLevelId) break;
    if (!progress.completedLevels.includes(level.id)) continue;
    for (const word of level.words) {
      const key = word.de;
      const stat = progress.wordStats[key] || { timesCorrect: 0, timesWrong: 0, lastSeen: 0 };
      pool.push({ ...word, ...stat, _key: key });
    }
  }
  // Weakest first (fewest correct), then oldest seen
  pool.sort((a, b) => {
    const scoreDiff = (a.timesCorrect - a.timesWrong) - (b.timesCorrect - b.timesWrong);
    if (scoreDiff !== 0) return scoreDiff;
    return a.lastSeen - b.lastSeen;
  });
  return pool.slice(0, count);
}
