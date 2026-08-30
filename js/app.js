/* ============================================================
   DRINKY – Application Logic
   ============================================================ */

(function () {
  'use strict';

  // ─── Task Library ───────────────────────────────────────────
  // Each task: { text, type ('read'|'secret'), difficulty[], adventure[], category, drinks }
  const TASK_LIBRARY = [
    // ── EASY / MILD ──
    { text: "Take 1 sip of your drink!", type: "read", difficulty: ["easy"], adventure: ["mild"], category: "drink", drinks: 1 },
    { text: "Give a compliment to the player on your left.", type: "read", difficulty: ["easy"], adventure: ["mild"], category: "social", drinks: 0 },
    { text: "Everyone who is wearing jeans, take a sip!", type: "read", difficulty: ["easy"], adventure: ["mild"], category: "group", drinks: 1 },
    { text: "Tell the group your most-used emoji.", type: "read", difficulty: ["easy"], adventure: ["mild"], category: "truth", drinks: 0 },
    { text: "Name 3 pizza toppings in 5 seconds — fail and drink!", type: "read", difficulty: ["easy"], adventure: ["mild"], category: "category", drinks: 1 },
    { text: "Without anyone noticing, give a thumbs up to someone within 2 rounds.", type: "secret", difficulty: ["easy"], adventure: ["mild"], category: "secret", drinks: 0 },
    { text: "Take a selfie with the person across from you.", type: "read", difficulty: ["easy"], adventure: ["mild"], category: "social", drinks: 0 },
    { text: "Everyone who has a pet, take a sip!", type: "read", difficulty: ["easy"], adventure: ["mild"], category: "group", drinks: 1 },
    { text: "Tell the group your go-to karaoke song.", type: "read", difficulty: ["easy"], adventure: ["mild"], category: "truth", drinks: 0 },
    { text: "Point to the best-dressed person here. They drink!", type: "read", difficulty: ["easy"], adventure: ["mild"], category: "social", drinks: 1 },
    { text: "Name a country that starts with the letter 'B' — last person to answer drinks!", type: "read", difficulty: ["easy"], adventure: ["mild"], category: "category", drinks: 1 },
    { text: "Without anyone noticing, yawn and see if someone copies you.", type: "secret", difficulty: ["easy"], adventure: ["mild"], category: "secret", drinks: 0 },

    // ── EASY / SPICY ──
    { text: "Tell the group about your most embarrassing childhood nickname.", type: "read", difficulty: ["easy"], adventure: ["spicy"], category: "truth", drinks: 0 },
    { text: "Everyone who has texted an ex in the last month — drink!", type: "read", difficulty: ["easy"], adventure: ["spicy"], category: "group", drinks: 2 },
    { text: "Wink at the person to your right. Take 1 sip.", type: "read", difficulty: ["easy"], adventure: ["spicy"], category: "dare", drinks: 1 },
    { text: "Without anyone noticing, compliment someone's shoes before the next round.", type: "secret", difficulty: ["easy"], adventure: ["spicy"], category: "secret", drinks: 0 },
    { text: "Name 3 dating apps in 5 seconds — fail and take 2 sips!", type: "read", difficulty: ["easy"], adventure: ["spicy"], category: "category", drinks: 2 },

    // ── EASY / WILD ──
    { text: "Do your best celebrity impression. Group votes — if bad, drink twice!", type: "read", difficulty: ["easy"], adventure: ["wild"], category: "dare", drinks: 2 },
    { text: "Tell the group the last lie you told.", type: "read", difficulty: ["easy"], adventure: ["wild"], category: "truth", drinks: 0 },
    { text: "Without anyone noticing, switch seats with someone before the next round.", type: "secret", difficulty: ["easy"], adventure: ["wild"], category: "secret", drinks: 0 },

    // ── MEDIUM / MILD ──
    { text: "Take 2 sips of your drink!", type: "read", difficulty: ["medium"], adventure: ["mild"], category: "drink", drinks: 2 },
    { text: "Everyone playing rock-paper-scissors — losers drink!", type: "read", difficulty: ["medium"], adventure: ["mild"], category: "group", drinks: 1 },
    { text: "Tell a dad joke. If nobody laughs, take 2 sips.", type: "read", difficulty: ["medium"], adventure: ["mild"], category: "dare", drinks: 2 },
    { text: "Name 5 types of cheese in 10 seconds — fail and drink!", type: "read", difficulty: ["medium"], adventure: ["mild"], category: "category", drinks: 2 },
    { text: "Vote: who is most likely to become famous? That person drinks.", type: "read", difficulty: ["medium"], adventure: ["mild"], category: "social", drinks: 2 },
    { text: "Without anyone noticing, start a slow clap within 2 rounds.", type: "secret", difficulty: ["medium"], adventure: ["mild"], category: "secret", drinks: 0 },
    { text: "The tallest person in the room takes 2 sips.", type: "read", difficulty: ["medium"], adventure: ["mild"], category: "group", drinks: 2 },
    { text: "Name 5 Marvel characters in 10 seconds — fail and drink!", type: "read", difficulty: ["medium"], adventure: ["mild"], category: "category", drinks: 2 },
    { text: "Swap drinks with the person to your left for one round.", type: "read", difficulty: ["medium"], adventure: ["mild"], category: "dare", drinks: 0 },
    { text: "Everyone take a sip while maintaining eye contact with the person across!", type: "read", difficulty: ["medium"], adventure: ["mild"], category: "group", drinks: 1 },
    { text: "Without anyone noticing, touch your nose 3 times before the next round.", type: "secret", difficulty: ["medium"], adventure: ["mild"], category: "secret", drinks: 0 },

    // ── MEDIUM / SPICY ──
    { text: "Read aloud the last text message you sent.", type: "read", difficulty: ["medium"], adventure: ["spicy"], category: "truth", drinks: 0 },
    { text: "Take 3 sips if you've ever been kicked out of a bar.", type: "read", difficulty: ["medium"], adventure: ["spicy"], category: "drink", drinks: 3 },
    { text: "Do 10 pushups or take 3 sips.", type: "read", difficulty: ["medium"], adventure: ["spicy"], category: "dare", drinks: 3 },
    { text: "Without anyone noticing, get someone to say the word 'drink'.", type: "secret", difficulty: ["medium"], adventure: ["spicy"], category: "secret", drinks: 0 },
    { text: "Name 5 cocktails in 10 seconds — fail and take 3 sips!", type: "read", difficulty: ["medium"], adventure: ["spicy"], category: "category", drinks: 3 },
    { text: "Everyone who has ghosted someone — take 2 sips!", type: "read", difficulty: ["medium"], adventure: ["spicy"], category: "group", drinks: 2 },
    { text: "Show the group your screen time from this week.", type: "read", difficulty: ["medium"], adventure: ["spicy"], category: "truth", drinks: 0 },
    { text: "Make up a haiku about the person to your right — or drink!", type: "read", difficulty: ["medium"], adventure: ["spicy"], category: "dare", drinks: 2 },

    // ── MEDIUM / WILD ──
    { text: "Let the group go through your camera roll for 30 seconds.", type: "read", difficulty: ["medium"], adventure: ["wild"], category: "dare", drinks: 0 },
    { text: "Without anyone noticing, start speaking in an accent for the rest of the round.", type: "secret", difficulty: ["medium"], adventure: ["wild"], category: "secret", drinks: 0 },
    { text: "Serenade the person across from you — or take 3 sips!", type: "read", difficulty: ["medium"], adventure: ["wild"], category: "dare", drinks: 3 },
    { text: "Reveal your most recent search history item — or finish your drink.", type: "read", difficulty: ["medium"], adventure: ["wild"], category: "truth", drinks: 5 },
    { text: "Everyone who has cried at a movie this year — drink!", type: "read", difficulty: ["medium"], adventure: ["wild"], category: "group", drinks: 2 },

    // ── HARD / MILD ──
    { text: "Take 3 sips of your drink!", type: "read", difficulty: ["hard"], adventure: ["mild"], category: "drink", drinks: 3 },
    { text: "Name 7 capital cities in 15 seconds — each miss = 1 sip!", type: "read", difficulty: ["hard"], adventure: ["mild"], category: "category", drinks: 3 },
    { text: "Don't smile for the next 2 minutes — if you do, take 3 sips.", type: "read", difficulty: ["hard"], adventure: ["mild"], category: "dare", drinks: 3 },
    { text: "Without anyone noticing, get two people to high five before the next round.", type: "secret", difficulty: ["hard"], adventure: ["mild"], category: "secret", drinks: 0 },
    { text: "Speak in only questions for the next round. Break it? 2 sips.", type: "read", difficulty: ["hard"], adventure: ["mild"], category: "dare", drinks: 2 },
    { text: "Everyone takes a sip — first person to make a noise drinks again!", type: "read", difficulty: ["hard"], adventure: ["mild"], category: "group", drinks: 2 },
    { text: "Name 5 songs by the same artist in 10 seconds — fail and drink 3!", type: "read", difficulty: ["hard"], adventure: ["mild"], category: "category", drinks: 3 },

    // ── HARD / SPICY ──
    { text: "Finish half your drink!", type: "read", difficulty: ["hard"], adventure: ["spicy"], category: "drink", drinks: 4 },
    { text: "Tell the group your biggest regret. Others drink in sympathy.", type: "read", difficulty: ["hard"], adventure: ["spicy"], category: "truth", drinks: 1 },
    { text: "Without anyone noticing, convince someone to switch to a different drink.", type: "secret", difficulty: ["hard"], adventure: ["spicy"], category: "secret", drinks: 0 },
    { text: "Call the 5th contact in your phone on speaker for 10 seconds.", type: "read", difficulty: ["hard"], adventure: ["spicy"], category: "dare", drinks: 0 },
    { text: "Everyone closes eyes. Point to who you think is the wildest. They drink 3!", type: "read", difficulty: ["hard"], adventure: ["spicy"], category: "group", drinks: 3 },
    { text: "Dance for 15 seconds with no music — or take 4 sips.", type: "read", difficulty: ["hard"], adventure: ["spicy"], category: "dare", drinks: 4 },
    { text: "Name 5 types of shots in 10 seconds — fail and take 3 sips!", type: "read", difficulty: ["hard"], adventure: ["spicy"], category: "category", drinks: 3 },
    { text: "Without anyone noticing, propose a toast that includes the word 'legendary'.", type: "secret", difficulty: ["hard"], adventure: ["spicy"], category: "secret", drinks: 0 },

    // ── HARD / WILD ──
    { text: "Let the group post a story on your social media.", type: "read", difficulty: ["hard"], adventure: ["wild"], category: "dare", drinks: 0 },
    { text: "Reveal the last person you stalked on social media. Drink 3.", type: "read", difficulty: ["hard"], adventure: ["wild"], category: "truth", drinks: 3 },
    { text: "Without anyone noticing, steal someone's phone and hide it for 1 round.", type: "secret", difficulty: ["hard"], adventure: ["wild"], category: "secret", drinks: 0 },
    { text: "Swap an article of clothing with someone for the rest of the game.", type: "read", difficulty: ["hard"], adventure: ["wild"], category: "dare", drinks: 0 },
    { text: "Everyone does their best animal impression — worst one finishes their drink!", type: "read", difficulty: ["hard"], adventure: ["wild"], category: "group", drinks: 5 },

    // ── EXTREME / MILD ──
    { text: "Finish your drink!", type: "read", difficulty: ["extreme"], adventure: ["mild"], category: "drink", drinks: 6 },
    { text: "Name 10 countries in 15 seconds — each miss = 2 sips!", type: "read", difficulty: ["extreme"], adventure: ["mild"], category: "category", drinks: 4 },
    { text: "No using the letter 'S' for the next 3 rounds — each slip = 2 sips.", type: "read", difficulty: ["extreme"], adventure: ["mild"], category: "dare", drinks: 2 },
    { text: "Without anyone noticing, get everyone to stand up at least once before the next round.", type: "secret", difficulty: ["extreme"], adventure: ["mild"], category: "secret", drinks: 0 },

    // ── EXTREME / SPICY ──
    { text: "Take 5 sips AND give the person to your right a dare.", type: "read", difficulty: ["extreme"], adventure: ["spicy"], category: "drink", drinks: 5 },
    { text: "Read the last 3 DMs you received aloud.", type: "read", difficulty: ["extreme"], adventure: ["spicy"], category: "truth", drinks: 0 },
    { text: "Without anyone noticing, get someone to admit a secret.", type: "secret", difficulty: ["extreme"], adventure: ["spicy"], category: "secret", drinks: 0 },
    { text: "Whoever can hold a plank the longest doesn't drink. Everyone else: 4 sips.", type: "read", difficulty: ["extreme"], adventure: ["spicy"], category: "group", drinks: 4 },
    { text: "Imitate another player until someone guesses who. Fail? Finish your drink.", type: "read", difficulty: ["extreme"], adventure: ["spicy"], category: "dare", drinks: 6 },
    { text: "Name 7 types of beer in 15 seconds — fail and finish your drink!", type: "read", difficulty: ["extreme"], adventure: ["spicy"], category: "category", drinks: 6 },

    // ── EXTREME / WILD ──
    { text: "Finish your drink AND do a dare chosen by the group.", type: "read", difficulty: ["extreme"], adventure: ["wild"], category: "dare", drinks: 6 },
    { text: "Tell your most embarrassing story. If you refuse — 2× finish your drink.", type: "read", difficulty: ["extreme"], adventure: ["wild"], category: "truth", drinks: 6 },
    { text: "Without anyone noticing, make up a fake rule that everyone follows for 1 round.", type: "secret", difficulty: ["extreme"], adventure: ["wild"], category: "secret", drinks: 0 },
    { text: "Prank call someone and keep a straight face for 30 seconds.", type: "read", difficulty: ["extreme"], adventure: ["wild"], category: "dare", drinks: 0 },
    { text: "Everyone links arms and drinks at the same time — last to finish takes 3 more!", type: "read", difficulty: ["extreme"], adventure: ["wild"], category: "group", drinks: 4 },

    // ── Additional filler tasks across tiers ──
    { text: "Waterfall! Everyone starts drinking — you can only stop when the person before you stops.", type: "read", difficulty: ["medium","hard"], adventure: ["mild","spicy"], category: "group", drinks: 3 },
    { text: "Categories: Name a type of candy — first to fail drinks!", type: "read", difficulty: ["easy","medium"], adventure: ["mild"], category: "category", drinks: 1 },
    { text: "Categories: Name a type of dog breed — first to fail drinks!", type: "read", difficulty: ["easy","medium"], adventure: ["mild"], category: "category", drinks: 1 },
    { text: "Categories: Name a movie franchise — first to fail drinks 2!", type: "read", difficulty: ["medium","hard"], adventure: ["mild","spicy"], category: "category", drinks: 2 },
    { text: "Categories: Name a type of pasta — first to fail drinks!", type: "read", difficulty: ["easy","medium"], adventure: ["mild","spicy"], category: "category", drinks: 1 },
    { text: "Make a rule! Anyone who breaks it drinks 2 sips.", type: "read", difficulty: ["medium","hard"], adventure: ["spicy","wild"], category: "social", drinks: 0 },
    { text: "Everyone who is single, take 2 sips!", type: "read", difficulty: ["easy","medium"], adventure: ["spicy"], category: "group", drinks: 2 },
    { text: "The youngest player takes 2 sips.", type: "read", difficulty: ["easy","medium"], adventure: ["mild"], category: "group", drinks: 2 },
    { text: "The oldest player takes 2 sips.", type: "read", difficulty: ["easy","medium"], adventure: ["mild"], category: "group", drinks: 2 },
    { text: "Vote: who here is the worst liar? They take 3 sips.", type: "read", difficulty: ["medium","hard"], adventure: ["spicy"], category: "social", drinks: 3 },
    { text: "Staring contest with the player to your left — loser drinks 2!", type: "read", difficulty: ["easy","medium"], adventure: ["mild","spicy"], category: "dare", drinks: 2 },
    { text: "Without anyone noticing, mention the word 'banana' in conversation before the next round.", type: "secret", difficulty: ["easy","medium"], adventure: ["mild","spicy"], category: "secret", drinks: 0 },
    { text: "Without anyone noticing, get someone else to touch their face.", type: "secret", difficulty: ["medium","hard"], adventure: ["mild","spicy"], category: "secret", drinks: 0 },
    { text: "Without anyone noticing, make another player laugh within 2 rounds.", type: "secret", difficulty: ["easy","medium"], adventure: ["mild"], category: "secret", drinks: 0 },
    { text: "Without anyone noticing, say 'absolutely' in every sentence for the next round.", type: "secret", difficulty: ["medium","hard"], adventure: ["spicy","wild"], category: "secret", drinks: 0 },
    { text: "Without anyone noticing, get the group to change topics.", type: "secret", difficulty: ["hard","extreme"], adventure: ["spicy","wild"], category: "secret", drinks: 0 },
    { text: "Arm wrestle the person to your right — loser drinks 3!", type: "read", difficulty: ["hard","extreme"], adventure: ["spicy","wild"], category: "dare", drinks: 3 },
    { text: "Everyone who has been to another continent, take a sip!", type: "read", difficulty: ["easy","medium"], adventure: ["mild"], category: "group", drinks: 1 },
    { text: "Speak in a whisper for the next round — break it and drink 2.", type: "read", difficulty: ["medium","hard"], adventure: ["mild","spicy"], category: "dare", drinks: 2 },
    { text: "Everyone who drove here, you're the hero. Everyone else drinks!", type: "read", difficulty: ["easy","medium"], adventure: ["mild"], category: "group", drinks: 1 },
    { text: "Do your best robot dance for 10 seconds — or drink 2.", type: "read", difficulty: ["medium"], adventure: ["spicy","wild"], category: "dare", drinks: 2 },
    { text: "Tell the group about your worst date. Drink 1 for sympathy.", type: "read", difficulty: ["medium","hard"], adventure: ["spicy"], category: "truth", drinks: 1 },
    { text: "Everyone takes a sip. No reason. Cheers! 🍻", type: "read", difficulty: ["easy","medium","hard","extreme"], adventure: ["mild","spicy","wild"], category: "drink", drinks: 1 },
    { text: "Take a sip for every vowel in your first name!", type: "read", difficulty: ["easy","medium"], adventure: ["mild","spicy"], category: "drink", drinks: 2 },
    { text: "Pick someone: they take 2 sips!", type: "read", difficulty: ["easy","medium","hard"], adventure: ["mild","spicy"], category: "social", drinks: 2 },
    { text: "Rhyme time! Say a word — go around, first to fail drinks 2.", type: "read", difficulty: ["medium","hard"], adventure: ["mild","spicy"], category: "category", drinks: 2 },
    { text: "Thumb master! Put your thumb on the table whenever you want — last to notice drinks!", type: "read", difficulty: ["medium","hard"], adventure: ["mild"], category: "social", drinks: 2 },
    { text: "Never have I ever... say something. Everyone who has done it drinks!", type: "read", difficulty: ["easy","medium","hard"], adventure: ["spicy","wild"], category: "truth", drinks: 2 },
    { text: "Two truths and a lie — group guesses. Wrong guessers drink!", type: "read", difficulty: ["medium","hard"], adventure: ["spicy","wild"], category: "truth", drinks: 2 },
    { text: "Tongue twister: 'She sells sea shells on the sea shore.' Fail? Drink 2!", type: "read", difficulty: ["medium","hard"], adventure: ["mild","spicy"], category: "dare", drinks: 2 },
  ];

  // ─── Celebration Emojis ──────────────────────────────────────
  const EMOJIS = ['🍻', '🎉', '🥳', '🍺', '🔥', '✨', '💃', '🕺', '🎊', '🍹', '🥂', '🤩', '🌟', '🎯', '🏆', '💥'];

  // ─── State ───────────────────────────────────────────────────
  const STATE_VERSION = 2;
  const VALID_DIFFICULTIES = ['easy', 'medium', 'hard', 'extreme'];
  const VALID_ADVENTURES = ['mild', 'spicy', 'wild'];
  const GAME_PHASES = ['pass', 'task', 'summary'];

  let state = {
    stateVersion: STATE_VERSION,
    players: [],            // { id, name, passcode, drinks, tasks: [{ text, type, status, category }] }
    settings: { difficulty: 'easy', adventure: 'mild' },
    currentPlayerIndex: 0,
    round: 1,
    gameStarted: false,
    phase: 'pass',
    currentTask: null,
    taskRevealed: false,
    usedTaskIndices: [],
    lastTaskIndex: null,
  };

  // ─── DOM References ─────────────────────────────────────────
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const dom = {
    screens: {
      setup: $('#screen-setup'),
      game: $('#screen-game'),
      taskhub: $('#screen-taskhub'),
      leaderboard: $('#screen-leaderboard'),
    },
    setup: {
      nameInput: $('#player-name'),
      passcodeInput: $('#player-passcode'),
      message: $('#setup-message'),
      addBtn: $('#btn-add-player'),
      playerList: $('#player-list'),
      startBtn: $('#btn-start-game'),
      difficultyPills: $('#difficulty-pills'),
      adventurePills: $('#adventure-pills'),
    },
    game: {
      passPhase: $('#game-pass'),
      taskPhase: $('#game-task'),
      roundPhase: $('#game-round-summary'),
      passPlayerName: $('#pass-player-name'),
      imPlayerBtn: $('#btn-im-player'),
      taskCard: $('#task-card'),
      taskBadge: $('#task-badge'),
      taskText: $('#task-text'),
      taskMeta: $('#task-meta'),
      taskActions: $('#task-actions'),
      doneBtn: $('#btn-done'),
      skipBtn: $('#btn-skip'),
      roundSummaryText: $('#round-summary-text'),
      nextRoundBtn: $('#btn-next-round'),
    },
    taskhub: {
      loginSection: $('#taskhub-login'),
      passcodeInput: $('#taskhub-passcode'),
      loginBtn: $('#btn-taskhub-login'),
      message: $('#taskhub-message'),
      content: $('#taskhub-content'),
      playerName: $('#taskhub-player-name'),
      pendingList: $('#taskhub-pending-list'),
      doneList: $('#taskhub-done-list'),
      pendingEmpty: $('#pending-empty'),
      doneEmpty: $('#done-empty'),
      logoutBtn: $('#btn-taskhub-logout'),
    },
    leaderboard: {
      list: $('#leaderboard-list'),
    },
    nav: {
      bar: $('#bottom-nav'),
      buttons: $$('.nav-btn'),
    },
    emojiContainer: $('#emoji-container'),
    confettiContainer: $('#confetti-container'),
  };

  // ─── LocalStorage ───────────────────────────────────────────
  const STORAGE_KEY = 'drinky_state';

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Could not save game state:', e.message);
    }
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;

      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return false;

      state = normaliseState(parsed);
      saveState();
      return true;
    } catch (e) {
      console.warn('Could not restore game state:', e.message);
    }
    return false;
  }

  function createPlayerId() {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
    return 'player-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
  }

  function normaliseTaskRecord(task) {
    if (!task || typeof task !== 'object' || typeof task.text !== 'string') return null;

    return {
      taskIndex: Number.isInteger(task.taskIndex) ? task.taskIndex : null,
      text: task.text.slice(0, 500),
      type: task.type === 'secret' ? 'secret' : 'read',
      status: ['pending', 'done', 'skipped'].includes(task.status) ? task.status : 'done',
      category: typeof task.category === 'string' ? task.category : 'other',
      drinks: Number.isFinite(task.drinks) ? Math.max(0, Math.floor(task.drinks)) : 0,
      round: Number.isInteger(task.round) ? Math.max(1, task.round) : null,
    };
  }

  function normalisePlayer(player) {
    if (!player || typeof player !== 'object') return null;

    const name = typeof player.name === 'string' ? player.name.trim().slice(0, 20) : '';
    const passcode = typeof player.passcode === 'string' ? player.passcode.trim() : '';
    if (!name || !/^\d{3}$/.test(passcode)) return null;

    return {
      id: typeof player.id === 'string' && player.id ? player.id : createPlayerId(),
      name,
      passcode,
      drinks: Number.isFinite(player.drinks) ? Math.max(0, Math.floor(player.drinks)) : 0,
      tasks: Array.isArray(player.tasks) ? player.tasks.map(normaliseTaskRecord).filter(Boolean) : [],
    };
  }

  function normaliseCurrentTask(task) {
    if (!task || typeof task !== 'object' || !Number.isInteger(task._idx)) return null;

    const source = TASK_LIBRARY[task._idx];
    if (!source || task.text !== source.text) return null;
    return { ...source, _idx: task._idx };
  }

  function normaliseState(candidate) {
    const rawPlayers = Array.isArray(candidate.players) ? candidate.players : [];
    const players = rawPlayers.map(normalisePlayer).filter(Boolean);
    const rawSettings = candidate.settings && typeof candidate.settings === 'object' ? candidate.settings : {};
    const difficulty = VALID_DIFFICULTIES.includes(rawSettings.difficulty) ? rawSettings.difficulty : 'easy';
    const adventure = VALID_ADVENTURES.includes(rawSettings.adventure) ? rawSettings.adventure : 'mild';

    let phase = GAME_PHASES.includes(candidate.phase) ? candidate.phase : 'pass';
    const gameStarted = candidate.gameStarted === true && players.length >= 2;
    let currentPlayerIndex = Number.isInteger(candidate.currentPlayerIndex) ? candidate.currentPlayerIndex : 0;
    currentPlayerIndex = Math.max(0, Math.min(Math.max(0, players.length - 1), currentPlayerIndex));

    const usedTaskIndices = Array.isArray(candidate.usedTaskIndices)
      ? [...new Set(candidate.usedTaskIndices.filter(Number.isInteger).filter(index => index >= 0 && index < TASK_LIBRARY.length))]
      : [];
    const lastTaskIndex = Number.isInteger(candidate.lastTaskIndex) &&
      candidate.lastTaskIndex >= 0 &&
      candidate.lastTaskIndex < TASK_LIBRARY.length
      ? candidate.lastTaskIndex
      : null;

    let currentTask = normaliseCurrentTask(candidate.currentTask);
    let taskRevealed = candidate.taskRevealed === true;

    if (!gameStarted) {
      phase = 'pass';
      currentPlayerIndex = 0;
      currentTask = null;
      taskRevealed = false;
    } else if (phase === 'task' && !currentTask) {
      phase = 'pass';
      taskRevealed = false;
    } else if (phase !== 'task') {
      currentTask = null;
      taskRevealed = false;
    }

    if (phase === 'summary') currentPlayerIndex = 0;

    return {
      stateVersion: STATE_VERSION,
      players,
      settings: { difficulty, adventure },
      currentPlayerIndex,
      round: Number.isInteger(candidate.round) ? Math.max(1, candidate.round) : 1,
      gameStarted,
      phase,
      currentTask,
      taskRevealed,
      usedTaskIndices,
      lastTaskIndex,
    };
  }

  // ─── Effects ─────────────────────────────────────────────────
  function reducedMotionEnabled() {
    return typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function spawnFloatingEmojis(count = 12) {
    if (reducedMotionEnabled() || !dom.emojiContainer) return;

    const container = dom.emojiContainer;
    for (let i = 0; i < Math.min(count, 24); i++) {
      const el = document.createElement('span');
      el.className = 'floating-emoji';
      el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      el.style.left = Math.random() * 100 + '%';
      el.style.bottom = '-40px';
      el.style.fontSize = (1.5 + Math.random() * 1.5) + 'rem';
      el.style.animationDelay = (Math.random() * 0.5) + 's';
      el.style.animationDuration = (2 + Math.random() * 1.5) + 's';
      container.appendChild(el);
      setTimeout(() => el.remove(), 4000);
    }
  }

  function spawnConfetti(count = 40) {
    if (reducedMotionEnabled() || !dom.confettiContainer) return;

    const container = dom.confettiContainer;
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#00d2d3', '#54a0ff', '#1dd1a1', '#5f27cd'];
    for (let i = 0; i < Math.min(count, 50); i++) {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      el.style.left = Math.random() * 100 + '%';
      el.style.top = '-10px';
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
      el.style.width = (6 + Math.random() * 8) + 'px';
      el.style.height = (6 + Math.random() * 8) + 'px';
      el.style.animationDelay = (Math.random() * 0.8) + 's';
      el.style.animationDuration = (2 + Math.random() * 2) + 's';
      container.appendChild(el);
      setTimeout(() => el.remove(), 5000);
    }
  }

  function addRipple(btn, e) {
    if (reducedMotionEnabled() || !btn || !e) return;

    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }

  document.addEventListener('click', (e) => {
    const btn = e.target && e.target.closest ? e.target.closest('.btn') : null;
    if (btn) addRipple(btn, e);
  });

  // ─── Navigation ─────────────────────────────────────────────
  function showScreen(screenId) {
    Object.values(dom.screens).forEach(s => s.classList.remove('active'));
    const target = dom.screens[screenId] || document.getElementById(screenId);
    if (target) target.classList.add('active');

    dom.nav.buttons.forEach(b => {
      b.classList.toggle('active', b.dataset.screen === screenId || b.dataset.screen === 'screen-' + screenId);
    });
  }

  dom.nav.buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const screenId = btn.dataset.screen;
      showScreen(screenId.replace('screen-', ''));
      if (screenId === 'screen-leaderboard') renderLeaderboard();
      if (screenId === 'screen-game' && state.gameStarted) renderGamePhase();
    });
  });

  // ─── Setup Screen Logic ─────────────────────────────────────
  const AVATAR_COLORS = 8;

  function renderPlayerList() {
    dom.setup.playerList.innerHTML = '';
    state.players.forEach((p, i) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="player-info">
          <div class="player-avatar avatar-${i % AVATAR_COLORS}">${p.name.charAt(0).toUpperCase()}</div>
          <span class="player-name">${escapeHtml(p.name)}</span>
        </div>
        <button class="btn-remove" data-index="${i}" aria-label="Remove ${escapeHtml(p.name)}">✕</button>
      `;
      dom.setup.playerList.appendChild(li);
    });

    dom.setup.startBtn.disabled = state.players.length < 2;

    // Bind remove buttons
    dom.setup.playerList.querySelectorAll('.btn-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        state.players.splice(parseInt(btn.dataset.index), 1);
        renderPlayerList();
        saveState();
      });
    });
  }

  function addPlayer() {
    const name = dom.setup.nameInput.value.trim();
    const passcode = dom.setup.passcodeInput.value.trim();

    setMessage(dom.setup.message, '');
    if (!name) {
      setMessage(dom.setup.message, 'Enter a player name.');
      shakeElement(dom.setup.nameInput);
      return;
    }
    if (!/^\d{3}$/.test(passcode)) {
      setMessage(dom.setup.message, 'PINs must contain exactly three digits.');
      shakeElement(dom.setup.passcodeInput);
      return;
    }
    if (state.players.some(player => player.name.toLowerCase() === name.toLowerCase())) {
      setMessage(dom.setup.message, 'Each player needs a unique name.');
      shakeElement(dom.setup.nameInput);
      return;
    }
    if (state.players.some(player => player.passcode === passcode)) {
      setMessage(dom.setup.message, 'Each player needs a unique PIN.');
      shakeElement(dom.setup.passcodeInput);
      return;
    }

    state.players.push({ id: createPlayerId(), name, passcode, drinks: 0, tasks: [] });
    dom.setup.nameInput.value = '';
    dom.setup.passcodeInput.value = '';
    dom.setup.nameInput.focus();
    renderPlayerList();
    saveState();
  }

  dom.setup.addBtn.addEventListener('click', addPlayer);
  dom.setup.nameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') dom.setup.passcodeInput.focus(); });
  dom.setup.passcodeInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') addPlayer(); });

  // Pill selectors
  function setupPills(container, settingKey) {
    container.querySelectorAll('.pill').forEach(pill => {
      pill.addEventListener('click', () => {
        container.querySelectorAll('.pill').forEach(item => {
          item.classList.remove('active');
          item.setAttribute('aria-pressed', 'false');
        });
        pill.classList.add('active');
        pill.setAttribute('aria-pressed', 'true');
        state.settings[settingKey] = pill.dataset.value;
        saveState();
      });
    });
  }

  setupPills(dom.setup.difficultyPills, 'difficulty');
  setupPills(dom.setup.adventurePills, 'adventure');

  // Start game
  dom.setup.startBtn.addEventListener('click', () => {
    if (state.players.length < 2) return;
    state.gameStarted = true;
    state.currentPlayerIndex = 0;
    state.round = 1;
    state.phase = 'pass';
    state.currentTask = null;
    state.taskRevealed = false;
    state.usedTaskIndices = [];
    state.lastTaskIndex = null;
    saveState();
    startGame();
  });

  // ─── Game Logic ─────────────────────────────────────────────
  let currentTask = null;
  let revealTimer = null;
  let completingTask = false;

  function startGame() {
    dom.nav.bar.style.display = 'flex';
    showScreen('game');
    renderGamePhase();
  }

  function getCurrentPlayer() {
    return state.players[state.currentPlayerIndex] || null;
  }

  function renderGamePhase() {
    if (!state.gameStarted) return;

    if (state.phase === 'task' && state.currentTask) {
      renderTaskPhase();
    } else if (state.phase === 'summary') {
      showRoundSummary({ celebrate: false });
    } else {
      showPassPhase();
    }
  }

  function showPassPhase() {
    clearTimeout(revealTimer);
    revealTimer = null;
    currentTask = null;
    state.currentTask = null;
    state.taskRevealed = false;
    state.phase = 'pass';

    const player = getCurrentPlayer();
    if (!player) return;

    dom.game.passPhase.style.display = 'flex';
    dom.game.taskPhase.style.display = 'none';
    dom.game.roundPhase.style.display = 'none';
    dom.game.taskCard.classList.remove('flipped');
    dom.game.taskCard.setAttribute('aria-label', 'Reveal task');
    dom.game.taskActions.style.display = 'none';
    dom.game.passPlayerName.textContent = player.name;
    dom.game.imPlayerBtn.textContent = "I'm " + player.name + "! 👋";
    saveState();
  }

  dom.game.imPlayerBtn.addEventListener('click', () => {
    showTaskPhase();
  });

  function getFilteredTasks() {
    const difficultyRanks = { easy: 0, medium: 1, hard: 2, extreme: 3 };
    const adventureRanks = { mild: 0, spicy: 1, wild: 2 };
    const selectedDifficulty = difficultyRanks[state.settings.difficulty] ?? 0;
    const selectedAdventure = adventureRanks[state.settings.adventure] ?? 0;

    return TASK_LIBRARY.map((task, idx) => ({ ...task, _idx: idx }))
      .filter(task =>
        task.difficulty.some(level => difficultyRanks[level] <= selectedDifficulty) &&
        task.adventure.some(level => adventureRanks[level] <= selectedAdventure)
      );
  }

  function pickTask() {
    const filtered = getFilteredTasks();
    if (!filtered.length) return null;

    const previousIndex = Number.isInteger(state.lastTaskIndex) ? state.lastTaskIndex : null;
    let available = filtered.filter(task => !state.usedTaskIndices.includes(task._idx));

    if (!available.length) {
      state.usedTaskIndices = [];
      available = filtered.filter(task => task._idx !== previousIndex);
      if (!available.length) available = filtered;
    }

    const task = available[Math.floor(Math.random() * available.length)];
    state.usedTaskIndices = [...new Set([...state.usedTaskIndices, task._idx])];
    state.lastTaskIndex = task._idx;
    return task;
  }

  function showTaskPhase() {
    const player = getCurrentPlayer();
    if (!player) return;

    currentTask = pickTask();
    if (!currentTask) {
      setMessage(dom.setup.message, 'No tasks match these settings. Please choose a different difficulty or adventurousness level.');
      return;
    }

    state.currentTask = currentTask;
    state.phase = 'task';
    state.taskRevealed = false;
    if (currentTask.type === 'secret') ensurePendingTask(player, currentTask);
    renderTaskPhase();
    saveState();
  }

  function renderTaskPhase() {
    const task = state.currentTask;
    if (!task) {
      showPassPhase();
      return;
    }

    currentTask = task;
    dom.game.passPhase.style.display = 'none';
    dom.game.taskPhase.style.display = 'flex';
    dom.game.roundPhase.style.display = 'none';

    dom.game.taskCard.classList.toggle('flipped', state.taskRevealed);
    dom.game.taskCard.setAttribute('aria-label', state.taskRevealed ? 'Task revealed' : 'Reveal task');

    const isSecret = task.type === 'secret';
    dom.game.taskBadge.textContent = isSecret ? '🤫 Secret Mission' : '📢 Read Aloud';
    dom.game.taskBadge.className = 'task-badge ' + (isSecret ? 'secret-mission' : 'read-aloud');
    dom.game.taskText.textContent = task.text;
    dom.game.taskMeta.textContent = task.drinks > 0
      ? '🍺 ' + task.drinks + ' sip' + (task.drinks > 1 ? 's' : '')
      : '';
    dom.game.taskActions.style.display = state.taskRevealed ? 'flex' : 'none';
  }

  function revealTask() {
    if (state.phase !== 'task' || !currentTask || state.taskRevealed) return;

    state.taskRevealed = true;
    dom.game.taskCard.classList.add('flipped');
    dom.game.taskCard.setAttribute('aria-label', 'Task revealed');
    spawnFloatingEmojis(10);
    saveState();

    clearTimeout(revealTimer);
    revealTimer = setTimeout(() => {
      if (state.phase === 'task' && state.taskRevealed) {
        dom.game.taskActions.style.display = 'flex';
      }
    }, reducedMotionEnabled() ? 0 : 600);
  }

  dom.game.taskCard.addEventListener('click', revealTask);
  dom.game.taskCard.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      revealTask();
    }
  });

  function createTaskRecord(task, status) {
    return {
      taskIndex: Number.isInteger(task._idx) ? task._idx : null,
      text: task.text,
      type: task.type === 'secret' ? 'secret' : 'read',
      status,
      category: task.category || 'other',
      drinks: Number.isFinite(task.drinks) ? Math.max(0, Math.floor(task.drinks)) : 0,
      round: state.round,
    };
  }

  function ensurePendingTask(player, task) {
    if (task.type !== 'secret') return;

    const alreadyPending = player.tasks.some(record =>
      record.status === 'pending' &&
      record.taskIndex === task._idx &&
      record.text === task.text
    );
    if (!alreadyPending) player.tasks.push(createTaskRecord(task, 'pending'));
  }

  function completeCurrentTask(status) {
    if (!['done', 'skipped'].includes(status) ||
        state.phase !== 'task' ||
        !currentTask ||
        !state.taskRevealed ||
        completingTask) {
      return false;
    }

    const player = getCurrentPlayer();
    if (!player) return false;

    completingTask = true;
    const task = currentTask;
    const pendingRecord = task.type === 'secret'
      ? player.tasks.find(record =>
          record.status === 'pending' &&
          record.taskIndex === task._idx &&
          record.text === task.text
        )
      : null;

    if (pendingRecord) {
      pendingRecord.status = status;
      pendingRecord.round = state.round;
    } else {
      player.tasks.push(createTaskRecord(task, status));
    }

    if (status === 'done' && task.drinks > 0) {
      player.drinks += task.drinks;
    }

    state.currentTask = null;
    currentTask = null;
    state.taskRevealed = false;
    advancePlayer();
    completingTask = false;
    return true;
  }

  dom.game.doneBtn.addEventListener('click', () => {
    if (!completeCurrentTask('done')) return;
    spawnConfetti(30);
    spawnFloatingEmojis(8);
  });

  dom.game.skipBtn.addEventListener('click', () => {
    completeCurrentTask('skipped');
  });

  function advancePlayer() {
    state.currentPlayerIndex++;
    if (state.currentPlayerIndex >= state.players.length) {
      state.currentPlayerIndex = 0;
      showRoundSummary();
    } else {
      showPassPhase();
    }
  }

  function showRoundSummary({ celebrate = true } = {}) {
    clearTimeout(revealTimer);
    revealTimer = null;
    currentTask = null;
    state.currentTask = null;
    state.taskRevealed = false;
    state.phase = 'summary';
    state.currentPlayerIndex = 0;

    dom.game.passPhase.style.display = 'none';
    dom.game.taskPhase.style.display = 'none';
    dom.game.roundPhase.style.display = 'flex';
    dom.game.taskCard.classList.remove('flipped');
    dom.game.taskCard.setAttribute('aria-label', 'Reveal task');
    dom.game.taskActions.style.display = 'none';

    const topDrinker = [...state.players].sort((a, b) => b.drinks - a.drinks)[0];
    if (topDrinker) {
      dom.game.roundSummaryText.textContent =
        'Round ' + state.round + ' complete! ' + topDrinker.name +
        ' is leading with ' + topDrinker.drinks + ' sip' +
        (topDrinker.drinks !== 1 ? 's' : '') + '. Keep it going!';
    } else {
      dom.game.roundSummaryText.textContent = 'Round ' + state.round + ' complete!';
    }

    if (celebrate) {
      spawnConfetti(50);
      spawnFloatingEmojis(15);
    }
    saveState();
  }

  dom.game.nextRoundBtn.addEventListener('click', () => {
    if (state.phase !== 'summary') return;
    state.round++;
    state.currentPlayerIndex = 0;
    showPassPhase();
  });

  // ─── Task Hub ────────────────────────────────────────────────
  dom.taskhub.loginBtn.addEventListener('click', taskhubLogin);
  dom.taskhub.passcodeInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') taskhubLogin(); });

  function getTaskHubTasks(player) {
    const tasks = [...player.tasks];
    const activePlayer = getCurrentPlayer();
    const activeTask = state.phase === 'task' ? state.currentTask : null;

    if (activePlayer && activePlayer.id === player.id && activeTask && activeTask.type === 'secret') {
      const hasActiveRecord = tasks.some(task =>
        task.status === 'pending' &&
        task.taskIndex === activeTask._idx &&
        task.text === activeTask.text
      );
      if (!hasActiveRecord) tasks.push(createTaskRecord(activeTask, 'pending'));
    }

    return tasks;
  }

  function taskhubLogin() {
    const pin = dom.taskhub.passcodeInput.value.trim();
    const matches = state.players.filter(player => player.passcode === pin);

    if (matches.length !== 1) {
      setMessage(
        dom.taskhub.message,
        matches.length > 1
          ? 'That PIN belongs to more than one player. The host needs to use unique PINs.'
          : 'PIN not recognised. Check the three digits and try again.'
      );
      shakeElement(dom.taskhub.passcodeInput);
      return;
    }

    const player = matches[0];
    setMessage(dom.taskhub.message, '');
    dom.taskhub.loginSection.style.display = 'none';
    dom.taskhub.content.style.display = 'block';
    dom.taskhub.playerName.textContent = player.name + "'s Tasks";

    const tasks = getTaskHubTasks(player);
    const secrets = tasks.filter(task => task.type === 'secret' && task.status !== 'done');
    const allDone = tasks.filter(task => task.status === 'done');

    renderTaskList(dom.taskhub.pendingList, secrets, '🤫');
    dom.taskhub.pendingEmpty.style.display = secrets.length === 0 ? 'block' : 'none';
    renderTaskList(dom.taskhub.doneList, allDone, '✅');
    dom.taskhub.doneEmpty.style.display = allDone.length === 0 ? 'block' : 'none';

    dom.taskhub.passcodeInput.value = '';
  }

  function renderTaskList(ul, tasks, icon) {
    ul.innerHTML = '';

    tasks.forEach(task => {
      const li = document.createElement('li');
      const taskIcon = document.createElement('span');
      taskIcon.className = 'task-icon';
      taskIcon.textContent = icon;

      const taskText = document.createElement('span');
      taskText.textContent = task.text;

      const statusIcon = document.createElement('span');
      statusIcon.className = 'task-icon';
      statusIcon.textContent = task.status === 'done' ? '✅' : task.status === 'skipped' ? '⏭️' : '⏳';

      li.append(taskIcon, taskText, statusIcon);
      ul.appendChild(li);
    });
  }

  dom.taskhub.logoutBtn.addEventListener('click', () => {
    dom.taskhub.loginSection.style.display = 'block';
    dom.taskhub.content.style.display = 'none';
    setMessage(dom.taskhub.message, '');
  });

  // ─── Leaderboard ─────────────────────────────────────────────
  function renderLeaderboard() {
    const sorted = state.players
      .map((player, index) => ({ player, index }))
      .sort((a, b) => b.player.drinks - a.player.drinks || a.index - b.index);

    dom.leaderboard.list.innerHTML = '';

    sorted.forEach(({ player }, position) => {
      const rankClass = position === 0 ? 'gold' : position === 1 ? 'silver' : position === 2 ? 'bronze' : '';
      const medal = position === 0 ? '🥇' : position === 1 ? '🥈' : position === 2 ? '🥉' : String(position + 1);

      const card = document.createElement('div');
      card.className = 'lb-card glass';

      const rank = document.createElement('div');
      rank.className = 'lb-rank ' + rankClass;
      rank.textContent = medal;

      const info = document.createElement('div');
      info.className = 'lb-info';

      const name = document.createElement('div');
      name.className = 'lb-name';
      name.textContent = player.name;

      const drinks = document.createElement('div');
      drinks.className = 'lb-drinks';
      const completedCount = player.tasks.filter(task => task.status === 'done').length;
      drinks.textContent = player.drinks + ' sip' + (player.drinks !== 1 ? 's' : '') +
        ' • ' + completedCount + ' tasks done';
      info.append(name, drinks);

      const controls = document.createElement('div');
      controls.className = 'lb-controls';

      const minus = document.createElement('button');
      minus.type = 'button';
      minus.className = 'btn-drink';
      minus.dataset.playerId = player.id;
      minus.dataset.action = 'minus';
      minus.setAttribute('aria-label', 'Remove a sip for ' + player.name);
      minus.textContent = '−';

      const count = document.createElement('span');
      count.className = 'lb-count';
      count.textContent = String(player.drinks);

      const plus = document.createElement('button');
      plus.type = 'button';
      plus.className = 'btn-drink';
      plus.dataset.playerId = player.id;
      plus.dataset.action = 'plus';
      plus.setAttribute('aria-label', 'Add a sip for ' + player.name);
      plus.textContent = '+';

      controls.append(minus, count, plus);
      card.append(rank, info, controls);
      dom.leaderboard.list.appendChild(card);
    });

    dom.leaderboard.list.querySelectorAll('.btn-drink').forEach(btn => {
      btn.addEventListener('click', () => {
        const player = state.players.find(item => item.id === btn.dataset.playerId);
        if (!player) return;

        if (btn.dataset.action === 'plus') {
          player.drinks++;
        } else {
          player.drinks = Math.max(0, player.drinks - 1);
        }
        saveState();
        renderLeaderboard();
      });
    });
  }

  // ─── Utilities ───────────────────────────────────────────────
  function setMessage(element, message) {
    if (!element) return;
    element.textContent = message;
    element.hidden = !message;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function shakeElement(el) {
    if (!el) return;
    el.classList.add('shake');
    setTimeout(() => el.classList.remove('shake'), reducedMotionEnabled() ? 0 : 400);
  }

  // ─── Init ────────────────────────────────────────────────────
  function restorePillStates() {
    [
      [dom.setup.difficultyPills, state.settings.difficulty],
      [dom.setup.adventurePills, state.settings.adventure],
    ].forEach(([container, selectedValue]) => {
      container.querySelectorAll('.pill').forEach(pill => {
        const active = pill.dataset.value === selectedValue;
        pill.classList.toggle('active', active);
        pill.setAttribute('aria-pressed', String(active));
      });
    });
  }

  function init() {
    const restored = loadState();
    renderPlayerList();
    restorePillStates();

    if (restored && state.gameStarted && state.players.length >= 2) {
      startGame();
      renderLeaderboard();
    } else {
      dom.nav.bar.style.display = 'none';
      showScreen('setup');
    }
  }

  init();
})();
