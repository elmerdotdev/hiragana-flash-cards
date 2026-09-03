const fallbackData = {
  sets: [
    {
      id: 'vowels',
      label: 'Vowels',
      items: [
        { symbol: 'あ', romaji: 'a' },
        { symbol: 'い', romaji: 'i' },
        { symbol: 'う', romaji: 'u' },
        { symbol: 'え', romaji: 'e' },
        { symbol: 'お', romaji: 'o' },
      ],
    },
    {
      id: 'k',
      label: 'K set',
      items: [
        { symbol: 'か', romaji: 'ka' },
        { symbol: 'き', romaji: 'ki' },
        { symbol: 'く', romaji: 'ku' },
        { symbol: 'け', romaji: 'ke' },
        { symbol: 'こ', romaji: 'ko' },
      ],
    },
    {
      id: 's',
      label: 'S set',
      items: [
        { symbol: 'さ', romaji: 'sa' },
        { symbol: 'し', romaji: 'shi' },
        { symbol: 'す', romaji: 'su' },
        { symbol: 'せ', romaji: 'se' },
        { symbol: 'そ', romaji: 'so' },
      ],
    },
    {
      id: 't',
      label: 'T set',
      items: [
        { symbol: 'た', romaji: 'ta' },
        { symbol: 'ち', romaji: 'chi' },
        { symbol: 'つ', romaji: 'tsu' },
        { symbol: 'て', romaji: 'te' },
        { symbol: 'と', romaji: 'to' },
      ],
    },
    {
      id: 'n',
      label: 'N set',
      items: [
        { symbol: 'な', romaji: 'na' },
        { symbol: 'に', romaji: 'ni' },
        { symbol: 'ぬ', romaji: 'nu' },
        { symbol: 'ね', romaji: 'ne' },
        { symbol: 'の', romaji: 'no' },
      ],
    },
    {
      id: 'h',
      label: 'H set',
      items: [
        { symbol: 'は', romaji: 'ha' },
        { symbol: 'ひ', romaji: 'hi' },
        { symbol: 'ふ', romaji: 'fu' },
        { symbol: 'へ', romaji: 'he' },
        { symbol: 'ほ', romaji: 'ho' },
      ],
    },
    {
      id: 'm',
      label: 'M set',
      items: [
        { symbol: 'ま', romaji: 'ma' },
        { symbol: 'み', romaji: 'mi' },
        { symbol: 'む', romaji: 'mu' },
        { symbol: 'め', romaji: 'me' },
        { symbol: 'も', romaji: 'mo' },
      ],
    },
    {
      id: 'y',
      label: 'Y set',
      items: [
        { symbol: 'や', romaji: 'ya' },
        { symbol: 'ゆ', romaji: 'yu' },
        { symbol: 'よ', romaji: 'yo' },
      ],
    },
    {
      id: 'r',
      label: 'R set',
      items: [
        { symbol: 'ら', romaji: 'ra' },
        { symbol: 'り', romaji: 'ri' },
        { symbol: 'る', romaji: 'ru' },
        { symbol: 'れ', romaji: 're' },
        { symbol: 'ろ', romaji: 'ro' },
      ],
    },
    {
      id: 'w',
      label: 'W set',
      items: [
        { symbol: 'わ', romaji: 'wa' },
        { symbol: 'を', romaji: 'wo' },
        { symbol: 'ん', romaji: 'n' },
      ],
    },
    {
      id: 'dakuten',
      label: 'Dakuten',
      items: [
        { symbol: 'が', romaji: 'ga' },
        { symbol: 'ぎ', romaji: 'gi' },
        { symbol: 'ぐ', romaji: 'gu' },
        { symbol: 'げ', romaji: 'ge' },
        { symbol: 'ご', romaji: 'go' },
        { symbol: 'ざ', romaji: 'za' },
        { symbol: 'じ', romaji: 'ji' },
        { symbol: 'ず', romaji: 'zu' },
        { symbol: 'ぜ', romaji: 'ze' },
        { symbol: 'ぞ', romaji: 'zo' },
        { symbol: 'だ', romaji: 'da' },
        { symbol: 'ぢ', romaji: 'ji' },
        { symbol: 'づ', romaji: 'zu' },
        { symbol: 'で', romaji: 'de' },
        { symbol: 'ど', romaji: 'do' },
        { symbol: 'ば', romaji: 'ba' },
        { symbol: 'び', romaji: 'bi' },
        { symbol: 'ぶ', romaji: 'bu' },
        { symbol: 'べ', romaji: 'be' },
        { symbol: 'ぼ', romaji: 'bo' },
      ],
    },
    {
      id: 'handakuten',
      label: 'Handakuten',
      items: [
        { symbol: 'ぱ', romaji: 'pa' },
        { symbol: 'ぴ', romaji: 'pi' },
        { symbol: 'ぷ', romaji: 'pu' },
        { symbol: 'ぺ', romaji: 'pe' },
        { symbol: 'ぽ', romaji: 'po' },
      ],
    },
  ],
};

const scoreKey = 'hiraganaFlashCardsScore';
const bestScoreKey = 'hiraganaFlashCardsBestScore';
const settingsKey = 'hiraganaFlashCardsSettings';
const soundEnabledKey = 'hiraganaFlashCardsSoundEnabled';

const elements = {
  form: document.querySelector('#settings-form'),
  startButton: document.querySelector('#start-button'),
  setOptions: document.querySelector('#set-options'),
  quizArea: document.querySelector('#quiz-area'),
  symbolText: document.querySelector('#symbol-text'),
  choices: document.querySelector('#choices'),
  answerForm: document.querySelector('#answer-form'),
  answerInput: document.querySelector('#answer-input'),
  answerSubmitButton: document.querySelector('#answer-submit-button'),
  answerResult: document.querySelector('#answer-result'),
  toggleAllButton: document.querySelector('#toggle-all-button'),
  nextButton: document.querySelector('#next-button'),
  changeSettingsButton: document.querySelector('#change-settings-button'),
  resetScoreButton: document.querySelector('#reset-score-button'),
  soundToggleButton: document.querySelector('#sound-toggle-button'),
  scoreText: document.querySelector('#score-text'),
  accuracyText: document.querySelector('#accuracy-text'),
  bestScoreText: document.querySelector('#best-score-text'),
  symbolsList: document.querySelector('#symbols-list'),
};

const state = {
  data: fallbackData,
  activeItems: [],
  shuffledQueue: [],
  queueIndex: 0,
  currentAnswer: '',
  answered: false,
  sounds: {
    correct: new Audio('audio/correct.mp3'),
    incorrect: new Audio('audio/incorrect.mp3'),
  },
  soundEnabled: loadSoundEnabled(),
  cardType: 'choices',
  score: loadScore(),
  bestScore: loadBestScore(),
};

const desktopQuery = window.matchMedia('(min-width: 768px)');

init();

async function init() {
  state.data = await loadData();
  renderSetOptions();
  renderSymbolsPanel();
  restoreSettings();
  state.bestScore = Math.max(state.bestScore, state.score.correct);
  saveBestScore();
  renderScore();
  renderSoundToggle();
  bindEvents();
  updateStartButtonState();
}

async function loadData() {
  try {
    const response = await fetch('hiragana.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Unable to load hiragana.json');
    return await response.json();
  } catch {
    return fallbackData;
  }
}

function bindEvents() {
  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    startQuiz();
  });

  elements.form.addEventListener('change', updateStartButtonState);

  elements.nextButton.addEventListener('click', showNextCard);

  elements.answerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    handleInputAnswer();
  });

  elements.toggleAllButton.addEventListener('click', toggleAllSets);

  elements.changeSettingsButton.addEventListener('click', () => {
    if (!desktopQuery.matches) elements.quizArea.hidden = true;
    elements.form.hidden = false;
    elements.form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  elements.resetScoreButton.addEventListener('click', () => {
    state.score = { correct: 0, attempts: 0 };
    saveScore();
    renderScore();
  });

  elements.soundToggleButton.addEventListener('click', () => {
    state.soundEnabled = !state.soundEnabled;
    saveSoundEnabled();
    renderSoundToggle();
  });

  document.addEventListener('keydown', (event) => {
    if (
      event.key === 'Enter' &&
      state.answered &&
      !elements.quizArea.hidden &&
      event.target !== elements.nextButton
    ) {
      event.preventDefault();
      showNextCard();
    }
  });

  desktopQuery.addEventListener('change', syncResponsivePanels);
}

function syncResponsivePanels() {
  if (desktopQuery.matches) {
    elements.form.hidden = false;
  }
}

function renderSetOptions() {
  elements.setOptions.innerHTML = '';

  state.data.sets.forEach((set) => {
    const label = document.createElement('label');
    label.className = 'check-tile';
    label.innerHTML = `
      <input type="checkbox" name="sets" value="${set.id}">
      <span>${set.label}</span>
    `;
    elements.setOptions.append(label);
  });
}

function renderSymbolsPanel() {
  elements.symbolsList.innerHTML = '';

  state.data.sets.forEach((set) => {
    const section = document.createElement('section');
    section.className = 'symbol-set';

    const heading = document.createElement('h3');
    heading.textContent = set.label;

    const grid = document.createElement('div');
    grid.className = 'symbol-grid';

    set.items.forEach((item) => {
      const tile = document.createElement('div');
      tile.className = 'symbol-tile';

      const symbol = document.createElement('span');
      symbol.className = 'symbol-glyph';
      symbol.textContent = item.symbol;

      const romaji = document.createElement('span');
      romaji.className = 'symbol-romaji';
      romaji.textContent = item.romaji;

      tile.append(symbol, romaji);
      grid.append(tile);
    });

    section.append(heading, grid);
    elements.symbolsList.append(section);
  });
}

function toggleAllSets() {
  const setInputs = Array.from(document.querySelectorAll("input[name='sets']"));
  const shouldCheck = setInputs.some((input) => !input.checked);
  setInputs.forEach((input) => {
    input.checked = shouldCheck;
  });
  updateStartButtonState();
}

function updateStartButtonState() {
  const selectedItems = getSelectedItems();
  const cardSize = getSelectedCardSize();
  elements.startButton.disabled = !cardSize || selectedItems.length < cardSize;
}

function restoreSettings() {
  const saved = JSON.parse(localStorage.getItem(settingsKey) || 'null');
  if (!saved) return;

  if (Array.isArray(saved.sets)) {
    document.querySelectorAll("input[name='sets']").forEach((input) => {
      input.checked = saved.sets.includes(input.value);
    });
  }

  const cardSize = document.querySelector(
    `input[name='card-size'][value='${saved.cardSize}']`,
  );
  if (cardSize) cardSize.checked = true;

  const cardType = document.querySelector(
    `input[name='card-type'][value='${saved.type}']`,
  );
  if (cardType) cardType.checked = true;
}

function startQuiz() {
  const cardSize = getSelectedCardSize();
  const selectedSets = getSelectedSetIds();
  const cardType = getSelectedCardType();
  state.activeItems = getSelectedItems();

  if (!cardSize || state.activeItems.length < cardSize) {
    updateStartButtonState();
    return;
  }

  // New: Shuffle all active items once when the quiz starts
  state.shuffledQueue = shuffle([...state.activeItems]);
  state.queueIndex = 0;

  state.cardType = cardType;
  localStorage.setItem(
    settingsKey,
    JSON.stringify({ sets: selectedSets, cardSize, type: cardType }),
  );
  elements.form.hidden = desktopQuery.matches ? false : true;
  elements.quizArea.hidden = false;
  showNextCard();
}

function showNextCard() {
  const cardSize = getSelectedCardSize();

  // If we don't have enough items left in the queue, re-shuffle a fresh batch
  if (state.queueIndex + cardSize > state.shuffledQueue.length) {
    state.shuffledQueue = shuffle([...state.activeItems]);
    state.queueIndex = 0;
  }

  // Grab the next chunk from our fixed sequence
  const cardItems = state.shuffledQueue.slice(
    state.queueIndex,
    state.queueIndex + cardSize,
  );
  state.queueIndex += cardSize;

  state.currentAnswer = cardItems.map((item) => item.romaji).join(' ');
  state.answered = false;

  elements.symbolText.textContent = cardItems
    .map((item) => item.symbol)
    .join('');
  elements.nextButton.disabled = true;
  renderAnswerMode(cardItems, cardSize);
}

function renderAnswerMode(cardItems, cardSize) {
  const isInput = state.cardType === 'input';
  elements.choices.hidden = isInput;
  elements.answerForm.hidden = !isInput;
  elements.answerResult.textContent = '';
  elements.answerResult.hidden = true;
  elements.answerInput.classList.remove('correct', 'incorrect');

  if (isInput) {
    elements.answerInput.value = '';
    elements.answerInput.disabled = false;
    elements.answerSubmitButton.disabled = false;
    elements.answerInput.focus();
    return;
  }

  renderChoices(cardItems, cardSize);
}

function renderChoices(cardItems, cardSize) {
  const correct = cardItems.map((item) => item.romaji).join(' ');
  const choices = new Set([correct]);
  let attempts = 0;

  while (choices.size < 4 && attempts < 120) {
    const distractor = pickMany(state.activeItems, cardSize)
      .map((item) => item.romaji)
      .join(' ');
    choices.add(distractor);
    attempts += 1;
  }

  elements.choices.innerHTML = '';
  shuffle(Array.from(choices)).forEach((choice) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'choice-button';
    button.textContent = choice;
    button.addEventListener('click', () => handleChoice(button, choice));
    elements.choices.append(button);
  });
}

function handleChoice(button, choice) {
  if (state.answered) return;

  state.answered = true;
  const isCorrect = choice === state.currentAnswer;
  state.score.attempts += 1;
  if (isCorrect) state.score.correct += 1;
  updateBestScore();

  playAnswerSound(isCorrect);
  saveScore();
  renderScore();

  document.querySelectorAll('.choice-button').forEach((choiceButton) => {
    choiceButton.disabled = true;
    if (choiceButton.textContent === state.currentAnswer) {
      choiceButton.classList.add('correct');
    }
  });

  if (!isCorrect) button.classList.add('incorrect');
  elements.nextButton.disabled = false;
}

function handleInputAnswer() {
  if (state.answered) return;

  const answer = normalizeAnswer(elements.answerInput.value);
  if (!answer) return;

  state.answered = true;
  const isCorrect = answer === normalizeAnswer(state.currentAnswer);
  state.score.attempts += 1;
  if (isCorrect) state.score.correct += 1;
  updateBestScore();

  playAnswerSound(isCorrect);
  saveScore();
  renderScore();

  elements.answerInput.disabled = true;
  elements.answerSubmitButton.disabled = true;
  elements.answerInput.classList.add(isCorrect ? 'correct' : 'incorrect');
  elements.answerResult.textContent = `Correct answer: ${state.currentAnswer}`;
  elements.answerResult.className = `answer-result ${isCorrect ? 'correct' : 'incorrect'}`;
  elements.answerResult.hidden = false;
  elements.nextButton.disabled = false;
}

function normalizeAnswer(answer) {
  return answer.toLowerCase().replace(/\s+/g, '');
}

function playAnswerSound(isCorrect) {
  if (!state.soundEnabled) return;

  const sound = isCorrect ? state.sounds.correct : state.sounds.incorrect;
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

function loadSoundEnabled() {
  return localStorage.getItem(soundEnabledKey) !== 'false';
}

function saveSoundEnabled() {
  localStorage.setItem(soundEnabledKey, String(state.soundEnabled));
}

function renderSoundToggle() {
  elements.soundToggleButton.textContent = state.soundEnabled
    ? 'Sound On'
    : 'Sound Off';
  elements.soundToggleButton.setAttribute(
    'aria-pressed',
    String(state.soundEnabled),
  );
}

function loadScore() {
  return JSON.parse(
    localStorage.getItem(scoreKey) || '{"correct":0,"attempts":0}',
  );
}

function loadBestScore() {
  return Number(localStorage.getItem(bestScoreKey) || 0);
}

function saveScore() {
  localStorage.setItem(scoreKey, JSON.stringify(state.score));
}

function saveBestScore() {
  localStorage.setItem(bestScoreKey, String(state.bestScore));
}

function updateBestScore() {
  if (state.score.correct > state.bestScore) {
    state.bestScore = state.score.correct;
    saveBestScore();
  }
}

function renderScore() {
  const { correct, attempts } = state.score;
  const accuracy = attempts ? Math.round((correct / attempts) * 100) : 0;
  elements.scoreText.textContent = `${correct} / ${attempts}`;
  elements.accuracyText.textContent = `${accuracy}%`;
  elements.bestScoreText.textContent = state.bestScore;
}

function getSelectedItems() {
  const selectedSets = getSelectedSetIds();
  return state.data.sets
    .filter((set) => selectedSets.includes(set.id))
    .flatMap((set) => set.items);
}

function getSelectedSetIds() {
  return Array.from(
    document.querySelectorAll("input[name='sets']:checked"),
  ).map((input) => input.value);
}

function getSelectedCardSize() {
  const selectedCardSize = document.querySelector(
    "input[name='card-size']:checked",
  );
  return selectedCardSize ? Number(selectedCardSize.value) : 0;
}

function getSelectedCardType() {
  const selectedCardType = document.querySelector(
    "input[name='card-type']:checked",
  );
  return selectedCardType ? selectedCardType.value : 'choices';
}

function pickMany(items, count) {
  return shuffle([...items]).slice(0, count);
}

function shuffle(items) {
  for (let index = items.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [items[index], items[randomIndex]] = [items[randomIndex], items[index]];
  }
  return items;
}
