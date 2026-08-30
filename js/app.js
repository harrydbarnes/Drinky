/* ============================================================
   DRINKY – Application Logic
   ============================================================ */

(function () {
  'use strict';

  // ─── Task Library ───────────────────────────────────────────
  // Each task: { text, type ('read'|'secret'), difficulty[], adventure[], category, drinks }
  // Public-friendly by default: no strangers, private data, or risky movement required.
  const TASK_LIBRARY = [
    // ── EASY / MILD ──
    { text: "Take 1 sip of your drink or water, then give a one-word toast to the group.", type: "read", difficulty: ["easy"], adventure: ["mild"], category: "drink", drinks: 1 },
    { text: "Give a genuine compliment to someone in your group.", type: "read", difficulty: ["easy"], adventure: ["mild"], category: "social", drinks: 0 },
    { text: "Spot a colour worn by three people in your group and call it out.", type: "read", difficulty: ["easy"], adventure: ["mild"], category: "group", drinks: 0 },
    { text: "Tell the group your current mood using one emoji, then explain it in one sentence.", type: "read", difficulty: ["easy"], adventure: ["mild"], category: "truth", drinks: 0 },
    { text: "Name 3 pizza toppings in 5 seconds. If you miss, take 1 sip.", type: "read", difficulty: ["easy"], adventure: ["mild"], category: "category", drinks: 1 },
    { text: "Without anyone noticing, give a thumbs-up to someone in your group and see if they spot it within 2 rounds.", type: "secret", difficulty: ["easy"], adventure: ["mild"], category: "secret", drinks: 0 },
    { text: "Take a group photo with a silly pose, only if everyone agrees; otherwise do the pose without a photo.", type: "read", difficulty: ["easy"], adventure: ["mild"], category: "social", drinks: 0 },
    { text: "If you have a pet, share its funniest habit; otherwise invent a pet name for tonight.", type: "read", difficulty: ["easy"], adventure: ["mild"], category: "group", drinks: 0 },
    { text: "Tell the group your go-to karaoke song and sing one line if you feel like it.", type: "read", difficulty: ["easy"], adventure: ["mild"], category: "truth", drinks: 0 },
    { text: "Pick the most colourful outfit in your group; that player chooses the next group emoji.", type: "read", difficulty: ["easy"], adventure: ["mild"], category: "social", drinks: 0 },
    { text: "Name a country beginning with 'B' in 5 seconds. If you miss, take 1 sip.", type: "read", difficulty: ["easy"], adventure: ["mild"], category: "category", drinks: 1 },
    { text: "Without anyone noticing, wave to someone in your group and see if they wave back.", type: "secret", difficulty: ["easy"], adventure: ["mild"], category: "secret", drinks: 0 },

    // ── EASY / SPICY ──
    { text: "Tell the group a harmless nickname you have had, or invent one for tonight.", type: "read", difficulty: ["easy"], adventure: ["spicy"], category: "truth", drinks: 0 },
    { text: "If you have ever taken a wrong turn on a night out, take 1 sip.", type: "read", difficulty: ["easy"], adventure: ["spicy"], category: "group", drinks: 1 },
    { text: "Give the player on your right a friendly wave or secret handshake, only if they are happy to join in, then take 1 sip.", type: "read", difficulty: ["easy"], adventure: ["spicy"], category: "dare", drinks: 1 },
    { text: "Without anyone noticing, compliment someone's shoes before the next round.", type: "secret", difficulty: ["easy"], adventure: ["spicy"], category: "secret", drinks: 0 },
    { text: "Name 3 cities you would visit tomorrow in 5 seconds. If you miss, take 2 sips.", type: "read", difficulty: ["easy"], adventure: ["spicy"], category: "category", drinks: 2 },

    // ── EASY / WILD ──
    { text: "Do your best celebrity impression as if they are narrating the place you are in. If nobody guesses, take 2 sips.", type: "read", difficulty: ["easy"], adventure: ["wild"], category: "dare", drinks: 2 },
    { text: "Tell the group a funny, harmless excuse you have used, or invent one.", type: "read", difficulty: ["easy"], adventure: ["wild"], category: "truth", drinks: 0 },
    { text: "Without anyone noticing, change your pose when nobody is looking and see who notices before the next round.", type: "secret", difficulty: ["easy"], adventure: ["wild"], category: "secret", drinks: 0 },

    // ── MEDIUM / MILD ──
    { text: "Choose a visible object as the group's mascot, give it a name, and take 1 sip.", type: "read", difficulty: ["medium"], adventure: ["mild"], category: "drink", drinks: 1 },
    { text: "Play rock-paper-scissors with another player, then take 1 sip and congratulate the winner.", type: "read", difficulty: ["medium"], adventure: ["mild"], category: "group", drinks: 1 },
    { text: "Tell a dad joke. If nobody laughs, take 2 sips.", type: "read", difficulty: ["medium"], adventure: ["mild"], category: "dare", drinks: 2 },
    { text: "Name 5 types of cheese in 10 seconds — fail and drink!", type: "read", difficulty: ["medium"], adventure: ["mild"], category: "category", drinks: 2 },
    { text: "Vote for the player most likely to lead a spontaneous adventure; they choose the next group pose.", type: "read", difficulty: ["medium"], adventure: ["mild"], category: "social", drinks: 0 },
    { text: "Without anyone noticing, start a quiet coordinated wave within 2 rounds.", type: "secret", difficulty: ["medium"], adventure: ["mild"], category: "secret", drinks: 0 },
    { text: "Choose a visible landmark or object and give it a dramatic 10-second tour. Take 2 sips.", type: "read", difficulty: ["medium"], adventure: ["mild"], category: "group", drinks: 2 },
    { text: "Name 5 Marvel characters in 10 seconds — fail and drink!", type: "read", difficulty: ["medium"], adventure: ["mild"], category: "category", drinks: 2 },
    { text: "Swap a harmless accessory, such as a hat, scarf, or sunglasses, with a willing player for one round; otherwise invent a matching pose.", type: "read", difficulty: ["medium"], adventure: ["mild"], category: "dare", drinks: 0 },
    { text: "Take 1 sip while holding eye contact with the player across from you, if comfortable; otherwise hold a dramatic pose.", type: "read", difficulty: ["medium"], adventure: ["mild"], category: "group", drinks: 1 },
    { text: "Without anyone noticing, touch your nose 3 times before the next round.", type: "secret", difficulty: ["medium"], adventure: ["mild"], category: "secret", drinks: 0 },

    // ── MEDIUM / SPICY ──
    { text: "Describe the last photo you took without showing it; keep it non-private and let the group guess what it is.", type: "read", difficulty: ["medium"], adventure: ["spicy"], category: "truth", drinks: 0 },
    { text: "If you have ever explored a new town or neighbourhood, take up to 3 sips or choose water.", type: "read", difficulty: ["medium"], adventure: ["spicy"], category: "drink", drinks: 3 },
    { text: "Hold a statue pose for 10 seconds in a clear, safe spot, or take 2 sips.", type: "read", difficulty: ["medium"], adventure: ["spicy"], category: "dare", drinks: 2 },
    { text: "Without anyone noticing, get someone to say the word 'drink'.", type: "secret", difficulty: ["medium"], adventure: ["spicy"], category: "secret", drinks: 0 },
    { text: "Name 5 things you would pack for a weekend adventure in 10 seconds. If you miss, take 3 sips.", type: "read", difficulty: ["medium"], adventure: ["spicy"], category: "category", drinks: 3 },
    { text: "If you have ever made friends while out, take 2 sips.", type: "read", difficulty: ["medium"], adventure: ["spicy"], category: "group", drinks: 2 },
    { text: "Describe your ideal last-minute day trip in 15 seconds.", type: "read", difficulty: ["medium"], adventure: ["spicy"], category: "truth", drinks: 0 },
    { text: "Make up a haiku about the person to your right — or drink!", type: "read", difficulty: ["medium"], adventure: ["spicy"], category: "dare", drinks: 2 },

    // ── MEDIUM / WILD ──
    { text: "Take a group photo with an interesting background, only with everyone's consent and without including strangers.", type: "read", difficulty: ["medium"], adventure: ["wild"], category: "dare", drinks: 0 },
    { text: "Without anyone noticing, narrate the next 30 seconds like a nature documentary.", type: "secret", difficulty: ["medium"], adventure: ["wild"], category: "secret", drinks: 0 },
    { text: "Perform 10 seconds of a song, beatbox, or rhythm. You may choose up to 3 sips instead.", type: "read", difficulty: ["medium"], adventure: ["wild"], category: "dare", drinks: 3 },
    { text: "Share a harmless random fact about yourself that the group would not guess.", type: "read", difficulty: ["medium"], adventure: ["wild"], category: "truth", drinks: 0 },
    { text: "If you have been on an unplanned adventure this year, take 2 sips.", type: "read", difficulty: ["medium"], adventure: ["wild"], category: "group", drinks: 2 },

    // ── HARD / MILD ──
    { text: "Take 3 sips or water, then give a visible landmark a heroic name.", type: "read", difficulty: ["hard"], adventure: ["mild"], category: "drink", drinks: 3 },
    { text: "Name 7 cities in 15 seconds. Take 1 sip for each missing answer, maximum 3.", type: "read", difficulty: ["hard"], adventure: ["mild"], category: "category", drinks: 3 },
    { text: "Don't smile for the next 2 minutes — if you do, take 3 sips.", type: "read", difficulty: ["hard"], adventure: ["mild"], category: "dare", drinks: 3 },
    { text: "Without anyone noticing, get two willing players to high-five before the next round.", type: "secret", difficulty: ["hard"], adventure: ["mild"], category: "secret", drinks: 0 },
    { text: "Speak in only questions for the next round. Break it? 2 sips.", type: "read", difficulty: ["hard"], adventure: ["mild"], category: "dare", drinks: 2 },
    { text: "Hold a silent statue pose for 20 seconds. If you move, take 2 sips.", type: "read", difficulty: ["hard"], adventure: ["mild"], category: "group", drinks: 2 },
    { text: "Name 5 songs by the same artist in 10 seconds — fail and drink 3!", type: "read", difficulty: ["hard"], adventure: ["mild"], category: "category", drinks: 3 },

    // ── HARD / SPICY ──
    { text: "Take up to 3 sips or choose water, then give a one-line toast to tonight's adventure.", type: "read", difficulty: ["hard"], adventure: ["spicy"], category: "drink", drinks: 3 },
    { text: "Tell the group about a funny wrong turn or travel mishap; make one up if you prefer.", type: "read", difficulty: ["hard"], adventure: ["spicy"], category: "truth", drinks: 0 },
    { text: "Without anyone noticing, get someone to use the word 'legendary' without asking them to say it.", type: "secret", difficulty: ["hard"], adventure: ["spicy"], category: "secret", drinks: 0 },
    { text: "Send a 5-second voice note to a friend saying 'Cheers from us', only if you want to; otherwise perform the greeting to the group.", type: "read", difficulty: ["hard"], adventure: ["spicy"], category: "dare", drinks: 0 },
    { text: "Vote for the player most likely to discover a hidden gem; they choose the next group pose.", type: "read", difficulty: ["hard"], adventure: ["spicy"], category: "group", drinks: 0 },
    { text: "Dance for 15 seconds, mime it, or take up to 3 sips.", type: "read", difficulty: ["hard"], adventure: ["spicy"], category: "dare", drinks: 3 },
    { text: "Name 5 landmarks you would like to visit in 10 seconds. If you miss, take 3 sips.", type: "read", difficulty: ["hard"], adventure: ["spicy"], category: "category", drinks: 3 },
    { text: "Without anyone noticing, propose a toast that includes the word 'legendary'.", type: "secret", difficulty: ["hard"], adventure: ["spicy"], category: "secret", drinks: 0 },

    // ── HARD / WILD ──
    { text: "Take a group photo with a landmark or interesting background, only with consent and no strangers in frame.", type: "read", difficulty: ["hard"], adventure: ["wild"], category: "dare", drinks: 0 },
    { text: "Show the group a favourite non-private photo from today, or describe it instead.", type: "read", difficulty: ["hard"], adventure: ["wild"], category: "truth", drinks: 0 },
    { text: "Without anyone noticing, get someone to notice a safe, visible landmark without pointing directly at it.", type: "secret", difficulty: ["hard"], adventure: ["wild"], category: "secret", drinks: 0 },
    { text: "Swap a hat, sunglasses, or other harmless accessory with a willing player for one round; otherwise invent a matching pose.", type: "read", difficulty: ["hard"], adventure: ["wild"], category: "dare", drinks: 0 },
    { text: "Do a 10-second animal mime; if the group cannot guess it, take 2 sips.", type: "read", difficulty: ["hard"], adventure: ["wild"], category: "group", drinks: 2 },

    // ── EXTREME / MILD ──
    { text: "Take up to 3 sips or choose water, then give a 20-second walking-tour narration from where you are standing.", type: "read", difficulty: ["extreme"], adventure: ["mild"], category: "drink", drinks: 3 },
    { text: "Name 10 places or landmarks in 20 seconds. Take 1 sip per miss, maximum 3.", type: "read", difficulty: ["extreme"], adventure: ["mild"], category: "category", drinks: 3 },
    { text: "Avoid one common word chosen by the group for the next 3 rounds; each slip is 1 sip.", type: "read", difficulty: ["extreme"], adventure: ["mild"], category: "dare", drinks: 1 },
    { text: "Without anyone noticing, get everyone to point at the same safe, visible object without saying its name.", type: "secret", difficulty: ["extreme"], adventure: ["mild"], category: "secret", drinks: 0 },

    // ── EXTREME / SPICY ──
    { text: "Take up to 3 sips or choose water, then give the group a harmless 10-second challenge.", type: "read", difficulty: ["extreme"], adventure: ["spicy"], category: "drink", drinks: 3 },
    { text: "Share an unusual but non-private skill or fact; if you have none, invent a stage name.", type: "read", difficulty: ["extreme"], adventure: ["spicy"], category: "truth", drinks: 0 },
    { text: "Without anyone noticing, make someone laugh using only a mime.", type: "secret", difficulty: ["extreme"], adventure: ["spicy"], category: "secret", drinks: 0 },
    { text: "Hold a dramatic pose for up to 20 seconds in a clear, safe spot; if you stop early, take 3 sips.", type: "read", difficulty: ["extreme"], adventure: ["spicy"], category: "group", drinks: 3 },
    { text: "Imitate another player until someone guesses who; if nobody guesses in 30 seconds, take up to 3 sips.", type: "read", difficulty: ["extreme"], adventure: ["spicy"], category: "dare", drinks: 3 },
    { text: "Name 7 things you might see on an adventure in 15 seconds. If you miss, take up to 3 sips.", type: "read", difficulty: ["extreme"], adventure: ["spicy"], category: "category", drinks: 3 },

    // ── EXTREME / WILD ──
    { text: "Lead a 30-second group scene inspired by something you can see; keep it quiet and stay in place.", type: "read", difficulty: ["extreme"], adventure: ["wild"], category: "dare", drinks: 0 },
    { text: "Tell a funny, public-safe story; if you prefer, invent one and sell it as true for 20 seconds.", type: "read", difficulty: ["extreme"], adventure: ["wild"], category: "truth", drinks: 0 },
    { text: "Without anyone noticing, make up a harmless rule using a visible object and get everyone to follow it for one round.", type: "secret", difficulty: ["extreme"], adventure: ["wild"], category: "secret", drinks: 0 },
    { text: "Film a 10-second silent movie trailer with willing players; do not include strangers.", type: "read", difficulty: ["extreme"], adventure: ["wild"], category: "dare", drinks: 0 },
    { text: "Create a group pose around a safe visible landmark, then take 3 sips to celebrate.", type: "read", difficulty: ["extreme"], adventure: ["wild"], category: "group", drinks: 3 },

    // ── Additional filler tasks across tiers ──
    { text: "Follow-the-leader: each person adds one movement; first to forget takes 1 sip.", type: "read", difficulty: ["medium","hard"], adventure: ["mild","spicy"], category: "group", drinks: 1 },
    { text: "Categories: Name a thing you might pack for an adventure; first to fail takes 1 sip.", type: "read", difficulty: ["easy","medium"], adventure: ["mild"], category: "category", drinks: 1 },
    { text: "Categories: Name a place you would like to explore; first to fail takes 1 sip.", type: "read", difficulty: ["easy","medium"], adventure: ["mild"], category: "category", drinks: 1 },
    { text: "Categories: Name a film with a memorable journey; first to fail takes 2 sips.", type: "read", difficulty: ["medium","hard"], adventure: ["mild","spicy"], category: "category", drinks: 2 },
    { text: "Categories: Name a food you would pack for a day out; first to fail takes 1 sip.", type: "read", difficulty: ["easy","medium"], adventure: ["mild","spicy"], category: "category", drinks: 1 },
    { text: "Create a harmless rule for the next round that keeps paths clear and does not involve strangers. If you break your own rule, take 2 sips.", type: "read", difficulty: ["medium","hard"], adventure: ["spicy","wild"], category: "social", drinks: 2 },
    { text: "If you have visited somewhere new this year, take 2 sips.", type: "read", difficulty: ["easy","medium"], adventure: ["spicy"], category: "group", drinks: 2 },
    { text: "Take 1 sip, then choose a fun pose for everyone.", type: "read", difficulty: ["easy","medium"], adventure: ["mild"], category: "group", drinks: 1 },
    { text: "Take 1 sip, then choose a nearby object as the next round's mascot.", type: "read", difficulty: ["easy","medium"], adventure: ["mild"], category: "group", drinks: 1 },
    { text: "Vote for the best storyteller; take 1 sip and ask them for a 10-second adventure story.", type: "read", difficulty: ["medium","hard"], adventure: ["spicy"], category: "social", drinks: 1 },
    { text: "Staring contest with the player to your left, if comfortable; loser takes 2 sips.", type: "read", difficulty: ["easy","medium"], adventure: ["mild","spicy"], category: "dare", drinks: 2 },
    { text: "Without anyone noticing, mention the word 'adventure' naturally before the next round.", type: "secret", difficulty: ["easy","medium"], adventure: ["mild","spicy"], category: "secret", drinks: 0 },
    { text: "Without anyone noticing, get someone else to point at a visible landmark without directly asking.", type: "secret", difficulty: ["medium","hard"], adventure: ["mild","spicy"], category: "secret", drinks: 0 },
    { text: "Without anyone noticing, make another player laugh within 2 rounds.", type: "secret", difficulty: ["easy","medium"], adventure: ["mild"], category: "secret", drinks: 0 },
    { text: "Without anyone noticing, say 'absolutely' in every sentence for the next round.", type: "secret", difficulty: ["medium","hard"], adventure: ["spicy","wild"], category: "secret", drinks: 0 },
    { text: "Without anyone noticing, get the group to choose between two nearby, safe options for the next pose without revealing you prompted it.", type: "secret", difficulty: ["hard","extreme"], adventure: ["spicy","wild"], category: "secret", drinks: 0 },
    { text: "Play best-of-three rock-paper-scissors with another player; if you lose, take 3 sips.", type: "read", difficulty: ["hard","extreme"], adventure: ["spicy","wild"], category: "dare", drinks: 3 },
    { text: "If you have visited another town or city this year, take 1 sip.", type: "read", difficulty: ["easy","medium"], adventure: ["mild"], category: "group", drinks: 1 },
    { text: "Speak like a museum guide for the next round; if you break character, take 2 sips.", type: "read", difficulty: ["medium","hard"], adventure: ["mild","spicy"], category: "dare", drinks: 2 },
    { text: "Take 1 sip, then give a genuine thank-you to someone who helped organise tonight.", type: "read", difficulty: ["easy","medium"], adventure: ["mild"], category: "group", drinks: 1 },
    { text: "Do your best robot dance for 10 seconds, or take 2 sips.", type: "read", difficulty: ["medium"], adventure: ["spicy","wild"], category: "dare", drinks: 2 },
    { text: "Tell the group about your favourite day out; take 1 sip for the recommendation.", type: "read", difficulty: ["medium","hard"], adventure: ["spicy"], category: "truth", drinks: 1 },
    { text: "Everyone takes a sip of their drink or water and says 'cheers'.", type: "read", difficulty: ["easy","medium","hard","extreme"], adventure: ["mild","spicy","wild"], category: "drink", drinks: 1 },
    { text: "Take 1 sip for each vowel in your first name, maximum 3.", type: "read", difficulty: ["easy","medium"], adventure: ["mild","spicy"], category: "drink", drinks: 3 },
    { text: "Choose a player to co-lead a 10-second adventure pose; both take 1 sip.", type: "read", difficulty: ["easy","medium","hard"], adventure: ["mild","spicy"], category: "social", drinks: 1 },
    { text: "Rhyme time: say a word and go around; first to fail takes 2 sips.", type: "read", difficulty: ["medium","hard"], adventure: ["mild","spicy"], category: "category", drinks: 2 },
    { text: "Secret signal: touch your thumb to your palm whenever you want; last to notice takes 2 sips.", type: "read", difficulty: ["medium","hard"], adventure: ["mild"], category: "social", drinks: 2 },
    { text: "Never have I ever taken an unplanned trip; everyone who has done it takes 1 sip.", type: "read", difficulty: ["easy","medium","hard"], adventure: ["spicy","wild"], category: "truth", drinks: 1 },
    { text: "Two truths and a lie about places you have visited or want to visit; wrong guessers take 1 sip.", type: "read", difficulty: ["medium","hard"], adventure: ["spicy","wild"], category: "truth", drinks: 1 },
    { text: "Tongue twister: 'She sells sea shells by the seashore.' If you stumble, take 2 sips.", type: "read", difficulty: ["medium","hard"], adventure: ["mild","spicy"], category: "dare", drinks: 2 },
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
