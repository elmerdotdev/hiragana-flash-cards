const fallbackData = {
  sets: [
    { id: "vowels", label: "Vowels", items: [{ symbol: "あ", romaji: "a" }, { symbol: "い", romaji: "i" }, { symbol: "う", romaji: "u" }, { symbol: "え", romaji: "e" }, { symbol: "お", romaji: "o" }] },
    { id: "k", label: "K set", items: [{ symbol: "か", romaji: "ka" }, { symbol: "き", romaji: "ki" }, { symbol: "く", romaji: "ku" }, { symbol: "け", romaji: "ke" }, { symbol: "こ", romaji: "ko" }] },
    { id: "s", label: "S set", items: [{ symbol: "さ", romaji: "sa" }, { symbol: "し", romaji: "shi" }, { symbol: "す", romaji: "su" }, { symbol: "せ", romaji: "se" }, { symbol: "そ", romaji: "so" }] },
    { id: "t", label: "T set", items: [{ symbol: "た", romaji: "ta" }, { symbol: "ち", romaji: "chi" }, { symbol: "つ", romaji: "tsu" }, { symbol: "て", romaji: "te" }, { symbol: "と", romaji: "to" }] },
    { id: "n", label: "N set", items: [{ symbol: "な", romaji: "na" }, { symbol: "に", romaji: "ni" }, { symbol: "ぬ", romaji: "nu" }, { symbol: "ね", romaji: "ne" }, { symbol: "の", romaji: "no" }] },
    { id: "h", label: "H set", items: [{ symbol: "は", romaji: "ha" }, { symbol: "ひ", romaji: "hi" }, { symbol: "ふ", romaji: "fu" }, { symbol: "へ", romaji: "he" }, { symbol: "ほ", romaji: "ho" }] },
    { id: "m", label: "M set", items: [{ symbol: "ま", romaji: "ma" }, { symbol: "み", romaji: "mi" }, { symbol: "む", romaji: "mu" }, { symbol: "め", romaji: "me" }, { symbol: "も", romaji: "mo" }] },
    { id: "y", label: "Y set", items: [{ symbol: "や", romaji: "ya" }, { symbol: "ゆ", romaji: "yu" }, { symbol: "よ", romaji: "yo" }] },
    { id: "r", label: "R set", items: [{ symbol: "ら", romaji: "ra" }, { symbol: "り", romaji: "ri" }, { symbol: "る", romaji: "ru" }, { symbol: "れ", romaji: "re" }, { symbol: "ろ", romaji: "ro" }] },
    { id: "w", label: "W set", items: [{ symbol: "わ", romaji: "wa" }, { symbol: "を", romaji: "wo" }, { symbol: "ん", romaji: "n" }] },
    { id: "dakuten", label: "Dakuten", items: [{ symbol: "が", romaji: "ga" }, { symbol: "ぎ", romaji: "gi" }, { symbol: "ぐ", romaji: "gu" }, { symbol: "げ", romaji: "ge" }, { symbol: "ご", romaji: "go" }, { symbol: "ざ", romaji: "za" }, { symbol: "じ", romaji: "ji" }, { symbol: "ず", romaji: "zu" }, { symbol: "ぜ", romaji: "ze" }, { symbol: "ぞ", romaji: "zo" }, { symbol: "だ", romaji: "da" }, { symbol: "ぢ", romaji: "ji" }, { symbol: "づ", romaji: "zu" }, { symbol: "で", romaji: "de" }, { symbol: "ど", romaji: "do" }, { symbol: "ば", romaji: "ba" }, { symbol: "び", romaji: "bi" }, { symbol: "ぶ", romaji: "bu" }, { symbol: "べ", romaji: "be" }, { symbol: "ぼ", romaji: "bo" }] },
    { id: "handakuten", label: "Handakuten", items: [{ symbol: "ぱ", romaji: "pa" }, { symbol: "ぴ", romaji: "pi" }, { symbol: "ぷ", romaji: "pu" }, { symbol: "ぺ", romaji: "pe" }, { symbol: "ぽ", romaji: "po" }] }
  ]
};

const scoreKey = "hiraganaFlashCardsScore";
const settingsKey = "hiraganaFlashCardsSettings";
const soundEnabledKey = "hiraganaFlashCardsSoundEnabled";

const elements = {
  form: document.querySelector("#settings-form"),
  startButton: document.querySelector("#start-button"),
  setOptions: document.querySelector("#set-options"),
  quizArea: document.querySelector("#quiz-area"),
  symbolText: document.querySelector("#symbol-text"),
  choices: document.querySelector("#choices"),
  toggleAllButton: document.querySelector("#toggle-all-button"),
  nextButton: document.querySelector("#next-button"),
  changeSettingsButton: document.querySelector("#change-settings-button"),
  resetScoreButton: document.querySelector("#reset-score-button"),
  soundToggleButton: document.querySelector("#sound-toggle-button"),
  scoreText: document.querySelector("#score-text"),
  accuracyText: document.querySelector("#accuracy-text")
};

const state = {
  data: fallbackData,
  activeItems: [],
  currentAnswer: "",
  answered: false,
  sounds: {
    correct: new Audio("audio/correct.mp3"),
    incorrect: new Audio("audio/incorrect.mp3")
  },
  soundEnabled: loadSoundEnabled(),
  score: loadScore()
};

const desktopQuery = window.matchMedia("(min-width: 768px)");

init();

async function init() {
  state.data = await loadData();
  renderSetOptions();
  restoreSettings();
  renderScore();
  renderSoundToggle();
  bindEvents();
  updateStartButtonState();
}

async function loadData() {
  try {
    const response = await fetch("hiragana.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Unable to load hiragana.json");
    return await response.json();
  } catch {
    return fallbackData;
  }
}

function bindEvents() {
  elements.form.addEventListener("submit", (event) => {
    event.preventDefault();
    startQuiz();
  });

  elements.form.addEventListener("change", updateStartButtonState);

  elements.nextButton.addEventListener("click", showNextCard);

  elements.toggleAllButton.addEventListener("click", toggleAllSets);

  elements.changeSettingsButton.addEventListener("click", () => {
    if (!desktopQuery.matches) elements.quizArea.hidden = true;
    elements.form.hidden = false;
    elements.form.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  elements.resetScoreButton.addEventListener("click", () => {
    state.score = { correct: 0, attempts: 0 };
    saveScore();
    renderScore();
  });

  elements.soundToggleButton.addEventListener("click", () => {
    state.soundEnabled = !state.soundEnabled;
    saveSoundEnabled();
    renderSoundToggle();
  });

  desktopQuery.addEventListener("change", syncResponsivePanels);
}

function syncResponsivePanels() {
  if (desktopQuery.matches) {
    elements.form.hidden = false;
  }
}

function renderSetOptions() {
  elements.setOptions.innerHTML = "";

  state.data.sets.forEach((set) => {
    const label = document.createElement("label");
    label.className = "check-tile";
    label.innerHTML = `
      <input type="checkbox" name="sets" value="${set.id}">
      <span>${set.label}</span>
    `;
    elements.setOptions.append(label);
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
  const saved = JSON.parse(localStorage.getItem(settingsKey) || "null");
  if (!saved) return;

  if (Array.isArray(saved.sets)) {
    document.querySelectorAll("input[name='sets']").forEach((input) => {
      input.checked = saved.sets.includes(input.value);
    });
  }

  const cardSize = document.querySelector(`input[name='card-size'][value='${saved.cardSize}']`);
  if (cardSize) cardSize.checked = true;
}

function startQuiz() {
  const cardSize = getSelectedCardSize();
  const selectedSets = getSelectedSetIds();
  state.activeItems = getSelectedItems();

  if (!cardSize || state.activeItems.length < cardSize) {
    updateStartButtonState();
    return;
  }

  localStorage.setItem(settingsKey, JSON.stringify({ sets: selectedSets, cardSize }));
  elements.form.hidden = desktopQuery.matches ? false : true;
  elements.quizArea.hidden = false;
  showNextCard();
}

function showNextCard() {
  const cardSize = getSelectedCardSize();
  const cardItems = pickMany(state.activeItems, cardSize);
  state.currentAnswer = cardItems.map((item) => item.romaji).join(" ");
  state.answered = false;

  elements.symbolText.textContent = cardItems.map((item) => item.symbol).join("");
  elements.nextButton.disabled = true;
  renderChoices(cardItems, cardSize);
}

function renderChoices(cardItems, cardSize) {
  const correct = cardItems.map((item) => item.romaji).join(" ");
  const choices = new Set([correct]);
  let attempts = 0;

  while (choices.size < 4 && attempts < 120) {
    const distractor = pickMany(state.activeItems, cardSize).map((item) => item.romaji).join(" ");
    choices.add(distractor);
    attempts += 1;
  }

  elements.choices.innerHTML = "";
  shuffle(Array.from(choices)).forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.textContent = choice;
    button.addEventListener("click", () => handleChoice(button, choice));
    elements.choices.append(button);
  });
}

function handleChoice(button, choice) {
  if (state.answered) return;

  state.answered = true;
  const isCorrect = choice === state.currentAnswer;
  state.score.attempts += 1;
  if (isCorrect) state.score.correct += 1;

  playAnswerSound(isCorrect);
  saveScore();
  renderScore();

  document.querySelectorAll(".choice-button").forEach((choiceButton) => {
    choiceButton.disabled = true;
    if (choiceButton.textContent === state.currentAnswer) {
      choiceButton.classList.add("correct");
    }
  });

  if (!isCorrect) button.classList.add("incorrect");
  elements.nextButton.disabled = false;
}

function playAnswerSound(isCorrect) {
  if (!state.soundEnabled) return;

  const sound = isCorrect ? state.sounds.correct : state.sounds.incorrect;
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

function loadSoundEnabled() {
  return localStorage.getItem(soundEnabledKey) !== "false";
}

function saveSoundEnabled() {
  localStorage.setItem(soundEnabledKey, String(state.soundEnabled));
}

function renderSoundToggle() {
  elements.soundToggleButton.textContent = state.soundEnabled ? "Sound On" : "Sound Off";
  elements.soundToggleButton.setAttribute("aria-pressed", String(state.soundEnabled));
}

function loadScore() {
  return JSON.parse(localStorage.getItem(scoreKey) || '{"correct":0,"attempts":0}');
}

function saveScore() {
  localStorage.setItem(scoreKey, JSON.stringify(state.score));
}

function renderScore() {
  const { correct, attempts } = state.score;
  const accuracy = attempts ? Math.round((correct / attempts) * 100) : 0;
  elements.scoreText.textContent = `${correct} / ${attempts}`;
  elements.accuracyText.textContent = `${accuracy}%`;
}

function getSelectedItems() {
  const selectedSets = getSelectedSetIds();
  return state.data.sets
    .filter((set) => selectedSets.includes(set.id))
    .flatMap((set) => set.items);
}

function getSelectedSetIds() {
  return Array.from(document.querySelectorAll("input[name='sets']:checked")).map((input) => input.value);
}

function getSelectedCardSize() {
  const selectedCardSize = document.querySelector("input[name='card-size']:checked");
  return selectedCardSize ? Number(selectedCardSize.value) : 0;
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
