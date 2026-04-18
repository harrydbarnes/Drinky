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
  let state = {
    players: [],            // { name, passcode, drinks, tasks: [{ text, type, status, category }] }
    settings: { difficulty: 'easy', adventure: 'mild' },
    currentPlayerIndex: 0,
    round: 1,
    gameStarted: false,
    usedTaskIndices: [],
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
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) { /* quota */ }
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        state = { ...state, ...parsed };
        return true;
      }
    } catch (_) { /* corrupt */ }
    return false;
  }

  // ─── Effects ─────────────────────────────────────────────────
  function spawnFloatingEmojis(count = 12) {
    const container = dom.emojiContainer;
    for (let i = 0; i < count; i++) {
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
    const container = dom.confettiContainer;
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#00d2d3', '#54a0ff', '#1dd1a1', '#5f27cd'];
    for (let i = 0; i < count; i++) {
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

  // Attach ripple to all buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
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

    if (!name) { shakeElement(dom.setup.nameInput); return; }
    if (!/^\d{3}$/.test(passcode)) { shakeElement(dom.setup.passcodeInput); return; }
    if (state.players.some(p => p.name.toLowerCase() === name.toLowerCase())) { shakeElement(dom.setup.nameInput); return; }

    state.players.push({ name, passcode, drinks: 0, tasks: [] });
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
        container.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
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
    state.usedTaskIndices = [];
    saveState();
    startGame();
  });

  // ─── Game Logic ─────────────────────────────────────────────
  function startGame() {
    dom.nav.bar.style.display = 'flex';
    showScreen('game');
    showPassPhase();
  }

  function getCurrentPlayer() {
    return state.players[state.currentPlayerIndex];
  }

  function showPassPhase() {
    const player = getCurrentPlayer();
    dom.game.passPhase.style.display = 'flex';
    dom.game.taskPhase.style.display = 'none';
    dom.game.roundPhase.style.display = 'none';

    dom.game.passPlayerName.textContent = player.name;
    dom.game.imPlayerBtn.textContent = `I'm ${player.name}! 👋`;
  }

  dom.game.imPlayerBtn.addEventListener('click', () => {
    showTaskPhase();
  });

  let currentTask = null;

  function getFilteredTasks() {
    const diff = state.settings.difficulty;
    const adv = state.settings.adventure;

    // Adventure levels are cumulative: wild includes spicy & mild, spicy includes mild
    const adventureLevels = { mild: ['mild'], spicy: ['mild', 'spicy'], wild: ['mild', 'spicy', 'wild'] };
    const allowedAdventure = adventureLevels[adv] || ['mild'];

    // Difficulty levels are cumulative upward: hard includes easy & medium & hard
    const difficultyLevels = { easy: ['easy'], medium: ['easy', 'medium'], hard: ['easy', 'medium', 'hard'], extreme: ['easy', 'medium', 'hard', 'extreme'] };
    const allowedDifficulty = difficultyLevels[diff] || ['easy'];

    return TASK_LIBRARY.map((task, idx) => ({ ...task, _idx: idx }))
      .filter(t =>
        t.difficulty.some(d => allowedDifficulty.includes(d)) &&
        t.adventure.some(a => allowedAdventure.includes(a))
      );
  }

  function pickTask() {
    const filtered = getFilteredTasks();
    // Prefer unused tasks
    let available = filtered.filter(t => !state.usedTaskIndices.includes(t._idx));
    if (available.length === 0) {
      state.usedTaskIndices = [];
      available = filtered;
    }
    const task = available[Math.floor(Math.random() * available.length)];
    state.usedTaskIndices.push(task._idx);
    return task;
  }

  function showTaskPhase() {
    dom.game.passPhase.style.display = 'none';
    dom.game.taskPhase.style.display = 'flex';
    dom.game.roundPhase.style.display = 'none';

    currentTask = pickTask();

    // Reset card
    dom.game.taskCard.classList.remove('flipped');
    dom.game.taskActions.style.display = 'none';

    // Set task content
    const isSecret = currentTask.type === 'secret';
    dom.game.taskBadge.textContent = isSecret ? '🤫 Secret Mission' : '📢 Read Aloud';
    dom.game.taskBadge.className = 'task-badge ' + (isSecret ? 'secret-mission' : 'read-aloud');
    dom.game.taskText.textContent = currentTask.text;
    dom.game.taskMeta.textContent = currentTask.drinks > 0 ? `🍺 ${currentTask.drinks} sip${currentTask.drinks > 1 ? 's' : ''}` : '';

    saveState();
  }

  // Card flip
  dom.game.taskCard.addEventListener('click', () => {
    if (dom.game.taskCard.classList.contains('flipped')) return;
    dom.game.taskCard.classList.add('flipped');
    spawnFloatingEmojis(10);

    setTimeout(() => {
      dom.game.taskActions.style.display = 'flex';
    }, 500);
  });

  // Done
  dom.game.doneBtn.addEventListener('click', () => {
    const player = getCurrentPlayer();
    player.tasks.push({
      text: currentTask.text,
      type: currentTask.type,
      status: 'done',
      category: currentTask.category,
    });
    if (currentTask.drinks > 0) {
      player.drinks += currentTask.drinks;
    }
    spawnConfetti(30);
    spawnFloatingEmojis(8);
    advancePlayer();
  });

  // Skip
  dom.game.skipBtn.addEventListener('click', () => {
    const player = getCurrentPlayer();
    player.tasks.push({
      text: currentTask.text,
      type: currentTask.type,
      status: 'skipped',
      category: currentTask.category,
    });
    advancePlayer();
  });

  function advancePlayer() {
    state.currentPlayerIndex++;
    if (state.currentPlayerIndex >= state.players.length) {
      showRoundSummary();
    } else {
      saveState();
      showPassPhase();
    }
  }

  function showRoundSummary() {
    dom.game.passPhase.style.display = 'none';
    dom.game.taskPhase.style.display = 'none';
    dom.game.roundPhase.style.display = 'flex';

    const topDrinker = [...state.players].sort((a, b) => b.drinks - a.drinks)[0];
    dom.game.roundSummaryText.textContent = `Round ${state.round} complete! ${topDrinker.name} is leading with ${topDrinker.drinks} sip${topDrinker.drinks !== 1 ? 's' : ''}. Keep it going!`;

    spawnConfetti(50);
    spawnFloatingEmojis(15);
    saveState();
  }

  dom.game.nextRoundBtn.addEventListener('click', () => {
    state.round++;
    state.currentPlayerIndex = 0;
    saveState();
    showPassPhase();
  });

  // ─── Task Hub ────────────────────────────────────────────────
  dom.taskhub.loginBtn.addEventListener('click', taskhubLogin);
  dom.taskhub.passcodeInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') taskhubLogin(); });

  function taskhubLogin() {
    const pin = dom.taskhub.passcodeInput.value.trim();
    const player = state.players.find(p => p.passcode === pin);
    if (!player) {
      shakeElement(dom.taskhub.passcodeInput);
      return;
    }

    dom.taskhub.loginSection.style.display = 'none';
    dom.taskhub.content.style.display = 'block';
    dom.taskhub.playerName.textContent = `${player.name}'s Tasks`;

    const secretsDone = player.tasks.filter(t => t.type === 'secret' && t.status === 'done');
    const allDone = player.tasks.filter(t => t.status === 'done');

    // Show completed secret missions (to prove they were done)
    renderTaskList(dom.taskhub.pendingList, secretsDone, '🤫');
    dom.taskhub.pendingEmpty.style.display = secretsDone.length === 0 ? 'block' : 'none';

    // Show all completed tasks
    renderTaskList(dom.taskhub.doneList, allDone, '✅');
    dom.taskhub.doneEmpty.style.display = allDone.length === 0 ? 'block' : 'none';

    dom.taskhub.passcodeInput.value = '';
  }

  function renderTaskList(ul, tasks, icon) {
    ul.innerHTML = '';
    tasks.forEach(t => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="task-icon">${icon}</span><span>${escapeHtml(t.text)}</span>`;
      ul.appendChild(li);
    });
  }

  dom.taskhub.logoutBtn.addEventListener('click', () => {
    dom.taskhub.loginSection.style.display = 'block';
    dom.taskhub.content.style.display = 'none';
  });

  // ─── Leaderboard ─────────────────────────────────────────────
  function renderLeaderboard() {
    const sorted = [...state.players].sort((a, b) => b.drinks - a.drinks);
    dom.leaderboard.list.innerHTML = '';

    sorted.forEach((p, i) => {
      const rankClass = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
      const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}`;
      const card = document.createElement('div');
      card.className = 'lb-card glass';
      card.innerHTML = `
        <div class="lb-rank ${rankClass}">${medal}</div>
        <div class="lb-info">
          <div class="lb-name">${escapeHtml(p.name)}</div>
          <div class="lb-drinks">${p.drinks} sip${p.drinks !== 1 ? 's' : ''} • ${p.tasks.filter(t=>t.status==='done').length} tasks done</div>
        </div>
        <div class="lb-controls">
          <button class="btn-drink" data-player="${escapeHtml(p.name)}" data-action="minus" aria-label="Remove drink">−</button>
          <span class="lb-count">${p.drinks}</span>
          <button class="btn-drink" data-player="${escapeHtml(p.name)}" data-action="plus" aria-label="Add drink">+</button>
        </div>
      `;
      dom.leaderboard.list.appendChild(card);
    });

    // Bind drink buttons
    dom.leaderboard.list.querySelectorAll('.btn-drink').forEach(btn => {
      btn.addEventListener('click', () => {
        const playerName = btn.dataset.player;
        const player = state.players.find(p => p.name === playerName);
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
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function shakeElement(el) {
    el.classList.add('shake');
    setTimeout(() => el.classList.remove('shake'), 400);
  }

  // ─── Init ────────────────────────────────────────────────────
  function init() {
    const restored = loadState();

    if (restored && state.gameStarted && state.players.length >= 2) {
      // Restore in-progress game
      renderPlayerList();
      startGame();
      renderLeaderboard();
    } else if (restored && state.players.length > 0) {
      // Restore setup with players added
      renderPlayerList();
      // Restore pill states
      dom.setup.difficultyPills.querySelectorAll('.pill').forEach(p => {
        p.classList.toggle('active', p.dataset.value === state.settings.difficulty);
      });
      dom.setup.adventurePills.querySelectorAll('.pill').forEach(p => {
        p.classList.toggle('active', p.dataset.value === state.settings.adventure);
      });
    }
  }

  init();
})();
