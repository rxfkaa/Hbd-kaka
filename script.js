/* ═══════════════════════════════════════════════════════════════
   A LITTLE BIRTHDAY STORY — script.js v6 (Deluxe Animations Engine)
   Sparkle Trails · Fireworks Canvas · Petal Physics · 3D Tilt Card
   ═══════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════════
   ✦  BIRTHDAY CONFIGURATION
════════════════════════════════════════════════════════════════ */
const birthdayConfig = {
  name:     "Kakak",
  age:      22,
  birthday: "22 November 2026",

  /* 3 Foto Personal */
  photos: [
    { src: "foto 1.jpeg", caption: "senyum manisnya kakak ✨" },
    { src: "foto 2.jpeg", caption: "momen bahagia yang abadi 🌸" },
    { src: "foto 3.jpeg", caption: "tetap jadi dirimu yang cantik 🤍" }
  ],

  letter: `selamat ulang tahun ya, kaka 🤍

gakerasa ya kaka, sekarang udah nambah umur lagi. semoga di umur yang baru ini banyak banget hal baik yang dateng ke kaka, banyak kebahagiaan, banyak hal-hal yang bikin kaka seneng, dan semoga hari-harinya juga jauh lebih baik dari sebelumnya.

aku cuma mau bilang makasi ya kaka, udah jadi kaka yang selalu ada. mungkin aku jarang ngomong langsung, tapi aku seneng banget bisa punya kaka di hidup aku. hal-hal kecil yang kaka lakuin, perhatian-perhatian kecil, atau apapun itu — mungkin kadang keliatan sepele, tapi sebenernya berarti banget.

semoga di umur kaka yang baru ini, kaka jangan lupa buat bahagiin diri sendiri juga ya. jangan terlalu keras sama diri sendiri, jangan ngerasa harus selalu kuat sendirian, dan jangan lupa istirahat kalo emang udah cape.

semoga semua yang kaka pengenin, yang kaka usahain, yang kaka doain selama ini pelan-pelan bisa tercapai. kalaupun belum sekarang, semoga dikasih waktu yang paling baik buat semuanya.

semoga kaka selalu dikelilingi orang-orang baik yang tulus, yang sayang sama kaka, yang bisa bikin kaka ngerasa dihargai dan disayangi.

dan semoga di umur yang baru ini, kaka lebih banyak ketemu sama hal-hal yang bikin kaka senyum daripada hal-hal yang bikin kaka nangis.

pokoknya selamat ulang tahun ya kaka 🤍
semoga semuanya yang baik-baik dateng ke kaka, semoga semuanya dipermudah, semoga sehat terus, bahagia terus, dan semoga kaka selalu punya alasan buat senyum setiap harinya.

aamiin 🤍`,

  wishes: [
    "semoga kaka selalu sehat ya 🤍",
    "semoga semua urusan kaka dipermudah.",
    "semoga apa yang kaka perjuangin selama ini pelan-pelan bisa tercapai.",
    "semoga kalaupun ada hari yang berat, kaka selalu dikasih kekuatan buat lewatinnya.",
    "semoga kaka selalu dikelilingi orang-orang yang tulus dan sayang sama kaka.",
    "semoga kedepannya banyak banget kebahagiaan yang dateng ke kaka.",
    "dan semoga di umur yang baru ini, kaka bisa lebih sering ngerasain 'ternyata hidup aku seindah ini ya' 🤍",
  ],
};

/* ── DOM SELECTORS & UTILITIES ──────────────────────────────── */
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const lerp  = (a, b, t) => a + (b - a) * t;

/* ── SCENE MANAGER ──────────────────────────────────────────── */
let currentScene = 's-intro';
const overlay = $('#sceneOverlay');

async function goToScene(id, dur = 850) {
  overlay.style.transition = `opacity ${dur * 0.42}ms cubic-bezier(0.77, 0, 0.175, 1)`;
  overlay.style.opacity = '1';
  overlay.style.pointerEvents = 'all';

  await sleep(dur * 0.42);

  $$('.scene.active').forEach(el => el.classList.remove('active'));
  const next = $('#' + id);
  if (next) next.classList.add('active');
  currentScene = id;

  await sleep(60);
  overlay.style.transition = `opacity ${dur * 0.65}ms cubic-bezier(0.25, 1, 0.5, 1)`;
  overlay.style.opacity = '0';
  overlay.style.pointerEvents = 'none';

  await sleep(dur * 0.65);
  onSceneEnter(id);
}

function onSceneEnter(id) {
  ({
    's-date':      enterDate,
    's-chapter':   enterChapter,
    's-letter':    enterLetter,
    's-memories':  enterMemories,
    's-wishes':    enterWishes,
    's-stars':     enterStars,
    's-cake':      enterCake,
    's-surprise':  enterSurprise,
    's-final':     enterFinal,
  })[id]?.();
}

/* ═══════════════════════════════════════════════════════════════
   1. MOUSE CURSOR GLOW TRAIL & INTERACTIVE SPARKLES
═══════════════════════════════════════════════════════════════ */
const cursorGlow = $('#cursorGlow');
let lastSparkleTime = 0;

window.addEventListener('pointermove', e => {
  if (cursorGlow) {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top  = e.clientY + 'px';
  }

  // Throttle sparkle creation on move
  const now = performance.now();
  if (now - lastSparkleTime > 45) {
    createSparkle(e.clientX, e.clientY);
    lastSparkleTime = now;
  }
});

function createSparkle(x, y) {
  const sp = document.createElement('div');
  const size = Math.random() * 5 + 3;
  sp.style.cssText = `
    position: fixed;
    left: ${x + (Math.random() - 0.5) * 20}px;
    top: ${y + (Math.random() - 0.5) * 20}px;
    width: ${size}px;
    height: ${size}px;
    background: radial-gradient(circle, #fff 0%, #caa468 70%, transparent 100%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9991;
    transform: scale(1);
    opacity: 0.9;
    transition: transform 0.6s ease-out, opacity 0.6s ease-out;
  `;
  document.body.appendChild(sp);

  requestAnimationFrame(() => {
    sp.style.transform = `translate(${(Math.random() - 0.5) * 35}px, ${Math.random() * 25 + 10}px) scale(0)`;
    sp.style.opacity = '0';
  });

  setTimeout(() => sp.remove(), 600);
}

/* ═══════════════════════════════════════════════════════════════
   2. DUST PARTICLES & DRIFTING SAKURA PETALS
═══════════════════════════════════════════════════════════════ */
(function initDustAndPetals() {
  const canvas = $('#dustCanvas');
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  class DustParticle {
    constructor() { this.reset(true); }
    reset(scatter) {
      this.x     = Math.random() * W;
      this.y     = scatter ? Math.random() * H : H + 10;
      this.r     = Math.random() * 1.6 + 0.35;
      this.vy    = -(Math.random() * 0.24 + 0.06);
      this.vx    = (Math.random() - 0.5) * 0.16;
      this.a     = Math.random() * 0.38 + 0.08;
      this.phase = Math.random() * Math.PI * 2;
    }
    update(t) {
      this.x += this.vx + Math.sin(t * 0.0006 + this.phase) * 0.08;
      this.y += this.vy;
      if (this.y < -12) this.reset(false);
      if (this.x < -10) this.x = W + 6;
      if (this.x > W + 10) this.x = -6;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(202, 164, 104, ${this.a})`;
      ctx.fill();
    }
  }

  class SakuraPetal {
    constructor() { this.reset(true); }
    reset(scatter) {
      this.x      = Math.random() * W;
      this.y      = scatter ? Math.random() * H : -20;
      this.size   = Math.random() * 6 + 5;
      this.vy     = Math.random() * 0.6 + 0.3;
      this.vx     = Math.random() * 0.5 - 0.2;
      this.angle  = Math.random() * Math.PI * 2;
      this.vAngle = Math.random() * 0.02 - 0.01;
      this.a      = Math.random() * 0.4 + 0.2;
    }
    update() {
      this.y += this.vy;
      this.x += this.vx + Math.sin(this.y * 0.02) * 0.4;
      this.angle += this.vAngle;
      if (this.y > H + 25) this.reset(false);
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size, this.size * 0.55, 0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(240, 173, 183, ${this.a})`;
      ctx.fill();
      ctx.restore();
    }
  }

  const dustList   = Array.from({ length: 65 }, () => new DustParticle());
  const petalsList = Array.from({ length: 18 }, () => new SakuraPetal());

  function loop(t) {
    ctx.clearRect(0, 0, W, H);
    dustList.forEach(d => { d.update(t); d.draw(); });
    petalsList.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop(0);
})();

/* ═══════════════════════════════════════════════════════════════
   3. AUDIO CONTROLLER & DYNAMIC FADER
═══════════════════════════════════════════════════════════════ */
const audio      = $('#bgAudio');
const musicCtrl  = $('#musicCtrl');
const musicBtn   = $('#musicBtn');
const musicLabel = $('#musicLabel');
let musicPlaying = false;
let musicStarted = false;
audio.volume = 0;

function startMusic() {
  if (musicStarted) return;
  musicStarted = true;
  musicCtrl.classList.remove('hidden');

  audio.play().then(() => {
    musicPlaying = true;
    fadeVolume(0, 0.45, 2600);
    musicLabel.textContent = 'playing';
    musicCtrl.classList.remove('paused');
  }).catch(e => {
    console.warn("Audio autoplay blocked by browser policy:", e);
  });
}

function fadeVolume(from, to, dur) {
  const steps = 35;
  const dt = dur / steps;
  let s = 0;
  const timer = setInterval(() => {
    s++;
    audio.volume = clamp(lerp(from, to, s / steps), 0, 1);
    if (s >= steps) clearInterval(timer);
  }, dt);
}

musicBtn.addEventListener('click', () => {
  if (musicPlaying) {
    fadeVolume(audio.volume, 0, 500);
    setTimeout(() => audio.pause(), 520);
    musicPlaying = false;
    musicLabel.textContent = 'paused';
    musicCtrl.classList.add('paused');
  } else {
    audio.play().catch(() => {});
    fadeVolume(0, 0.45, 600);
    musicPlaying = true;
    musicLabel.textContent = 'playing';
    musicCtrl.classList.remove('paused');
  }
});

/* ═══════════════════════════════════════════════════════════════
   SCENE 1 · INTRO REVEAL
═══════════════════════════════════════════════════════════════ */
(async function initIntro() {
  $('#introName').textContent = birthdayConfig.name;

  const badge = $('.intro-badge');
  const line  = $('#introLine');
  const body  = $('#introBody');
  const quote = $('#introQuote');
  const btn   = $('#btnContinue');

  await sleep(400);
  gsap.to(badge, { opacity: 1, duration: 1.4, ease: 'power2.out' });

  await sleep(800);
  line.style.width = '100%';

  await sleep(800);
  gsap.to(body, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' });

  await sleep(900);
  gsap.to(quote, { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out' });

  await sleep(1400);
  btn.classList.remove('hidden');
  gsap.from(btn, { opacity: 0, y: 16, duration: 1, ease: 'power2.out' });
})();

$('#btnContinue').addEventListener('click', () => {
  startMusic();
  goToScene('s-date', 900);
});

/* ═══════════════════════════════════════════════════════════════
   SCENE 2 · THE DATE
═══════════════════════════════════════════════════════════════ */
function enterDate() {
  const parts = birthdayConfig.birthday.split(' ');
  $('#dateNumber').textContent = parts[0] || '22';
  $('#dateMonth').textContent  = parts[1] || 'November';
  $('#dateYear').textContent   = parts[2] || '2026';

  gsap.from('.date-card', { opacity: 0, scale: 0.94, y: 35, duration: 1.4, ease: 'power3.out' });

  setTimeout(() => {
    $('#dateSub').classList.add('vis');
    setTimeout(() => goToScene('s-chapter', 900), 3200);
  }, 2200);
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 3 · CHAPTER (Smooth Counter Animation)
═══════════════════════════════════════════════════════════════ */
function enterChapter() {
  const numEl = $('#chapNum');
  numEl.textContent = '0';
  $('#chapSub').textContent = `chapter ${birthdayConfig.age} begins today.`;

  setTimeout(() => {
    counter(numEl, 0, birthdayConfig.age, 2000);
    setTimeout(() => goToScene('s-letter', 900), 4000);
  }, 700);
}

function counter(el, from, to, dur) {
  const start = performance.now();
  (function step(now) {
    const p = Math.min((now - start) / dur, 1);
    const ease = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
    el.textContent = Math.round(lerp(from, to, ease));
    if (p < 1) requestAnimationFrame(step);
  })(performance.now());
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 4 · ROYAL LETTER
═══════════════════════════════════════════════════════════════ */
let envelopeOpened = false;

function enterLetter() {
  envelopeOpened = false;

  const letterBody = $('#letterBody');
  const paras = birthdayConfig.letter.trim().split('\n\n');
  letterBody.innerHTML = paras.map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');

  $('#envWrap').classList.remove('hidden');
  $('#letterWrap').classList.add('hidden');
  $('#letterBody').classList.remove('revealed');
  $('#envelope').classList.remove('opening');

  gsap.from('#envWrap', { opacity: 0, y: 35, duration: 1.2, ease: 'power3.out' });
}

$('#envWrap').addEventListener('click', () => {
  if (envelopeOpened) return;
  envelopeOpened = true;

  const env    = $('#envelope');
  const wrap   = $('#envWrap');
  const letter = $('#letterWrap');

  env.classList.add('opening');

  setTimeout(() => {
    gsap.to(wrap, {
      opacity: 0, y: -30, duration: 0.5, ease: 'power2.in',
      onComplete: () => {
        wrap.classList.add('hidden');
        letter.classList.remove('hidden');
        gsap.from('#letterPaper', { opacity: 0, y: 50, scale: 0.94, duration: 0.9, ease: 'power3.out' });
        setTimeout(() => {
          $('#letterBody').classList.add('revealed');
        }, 500);
      }
    });
  }, 650);
});

$('#btnAfterLetter').addEventListener('click', () => goToScene('s-memories', 900));

/* ═══════════════════════════════════════════════════════════════
   SCENE 4.5 · PRECIOUS MEMORIES (Interactive 3D Tilt Cards)
═══════════════════════════════════════════════════════════════ */
function enterMemories() {
  gsap.from('.memories-header', { opacity: 0, y: 25, duration: 1.1, ease: 'power2.out' });
  gsap.from('.polaroid-card', {
    opacity: 0,
    y: 45,
    scale: 0.88,
    stagger: 0.22,
    duration: 1.3,
    ease: 'power3.out',
    delay: 0.25
  });
}

// 3D Tilt calculation on hover for cards
$$('.card-3d-tilt').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.06, 1.06, 1.06)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* Lightbox Interactivity */
const lightboxModal   = $('#lightboxModal');
const lightboxImg     = $('#lightboxImg');
const lightboxCaption = $('#lightboxCaption');
const lightboxClose   = $('#lightboxClose');
const lightboxBackdrop= $('#lightboxBackdrop');

$$('.polaroid-card').forEach(card => {
  card.addEventListener('click', () => {
    const idx = parseInt(card.dataset.index, 10);
    const photo = birthdayConfig.photos[idx];
    if (!photo) return;

    lightboxImg.src = photo.src;
    lightboxCaption.textContent = photo.caption;
    lightboxModal.classList.remove('hidden');
  });
});

function closeLightbox() {
  lightboxModal.classList.add('hidden');
}

lightboxClose?.addEventListener('click', closeLightbox);
lightboxBackdrop?.addEventListener('click', closeLightbox);

$('#btnAfterMemories').addEventListener('click', () => goToScene('s-wishes', 900));

/* ═══════════════════════════════════════════════════════════════
   SCENE 5 · WISHES
═══════════════════════════════════════════════════════════════ */
async function enterWishes() {
  const stage = $('#wishStage');
  const bar   = $('#wishProgressBar');
  stage.innerHTML = '';
  bar.style.width = '0%';

  const wishes = birthdayConfig.wishes;
  const total = wishes.length;

  for (let i = 0; i < total; i++) {
    const wish = wishes[i];
    const p = document.createElement('p');
    p.className = 'wish-line';
    p.textContent = wish;
    stage.appendChild(p);

    bar.style.width = `${((i + 1) / (total + 1)) * 100}%`;

    await sleep(350);
    gsap.to(p, { opacity: 1, duration: 1.2, ease: 'power2.out' });
    await sleep(2400);
    gsap.to(p, { opacity: 0, duration: 0.75, ease: 'power2.in' });
    await sleep(800);
  }

  bar.style.width = '100%';

  const aamiin = document.createElement('p');
  aamiin.className = 'wish-aamiin';
  aamiin.textContent = 'aamiin 🤍';
  stage.appendChild(aamiin);

  await sleep(300);
  gsap.to(aamiin, { opacity: 1, duration: 1.4, ease: 'power2.out' });
  await sleep(2700);
  gsap.to(aamiin, { opacity: 0, duration: 0.8 });
  await sleep(850);

  goToScene('s-stars', 1000);
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 6 · STARS & CONSTELLATION INTERACTION
═══════════════════════════════════════════════════════════════ */
let starCanvas, starCtx, stars = [], specialStar = null, starDone = false, starsRaf;

function enterStars() {
  starDone = false;
  starCanvas = $('#starCanvas');
  starCtx = starCanvas.getContext('2d');

  resizeStars();
  window.addEventListener('resize', resizeStars, { passive: true });

  createStars();
  drawStars();

  gsap.from('#starUI', { opacity: 0, y: 24, duration: 1.2, delay: 0.4 });

  starCanvas.addEventListener('click', onStarClick);
  starCanvas.addEventListener('touchend', e => { e.preventDefault(); onStarClick(e); }, { passive: false });
}

function resizeStars() {
  if (!starCanvas) return;
  starCanvas.width = window.innerWidth;
  starCanvas.height = window.innerHeight;
}

function createStars() {
  stars = [];
  const W = starCanvas.width, H = starCanvas.height;
  const count = Math.max(90, Math.floor((W * H) / 3400));

  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.25,
      a: Math.random() * 0.65 + 0.1,
      t: Math.random() * Math.PI * 2,
      s: Math.random() * 0.02 + 0.005,
      special: false,
    });
  }

  specialStar = {
    x: W * (0.35 + Math.random() * 0.3),
    y: H * (0.2 + Math.random() * 0.3),
    r: 3.8,
    a: 1,
    t: 0,
    s: 0.035,
    special: true,
    glow: true,
  };
  stars.push(specialStar);
}

function drawStars() {
  if (!starCanvas || !starCtx) return;
  const W = starCanvas.width, H = starCanvas.height;
  starCtx.clearRect(0, 0, W, H);

  for (const s of stars) {
    s.t += s.s;
    const a = s.special
      ? 0.75 + Math.sin(s.t) * 0.25
      : s.a * (0.6 + Math.sin(s.t) * 0.4);

    if (s.glow) {
      const g = starCtx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 9);
      g.addColorStop(0,   `rgba(245, 223, 184, ${a})`);
      g.addColorStop(0.4, `rgba(202, 164, 104, ${a * 0.55})`);
      g.addColorStop(1,   `rgba(202, 164, 104, 0)`);
      starCtx.beginPath();
      starCtx.arc(s.x, s.y, s.r * 9, 0, Math.PI * 2);
      starCtx.fillStyle = g;
      starCtx.fill();
    }

    starCtx.beginPath();
    starCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    starCtx.fillStyle = s.special ? `rgba(255, 240, 205, ${a})` : `rgba(248, 240, 233, ${a})`;
    starCtx.fill();
  }

  starsRaf = requestAnimationFrame(drawStars);
}

function getPos(e) {
  const r = starCanvas.getBoundingClientRect();
  const src = e.touches ? e.touches[0] || e.changedTouches[0] : e;
  return { x: src.clientX - r.left, y: src.clientY - r.top };
}

function onStarClick(e) {
  if (starDone) return;
  const p = getPos(e);
  const hit = stars.find(s => {
    const dx = s.x - p.x, dy = s.y - p.y;
    return Math.sqrt(dx * dx + dy * dy) < (s.special ? 28 : s.r + 14);
  });

  if (!hit) return;
  if (hit.special) {
    starDone = true;
    cancelAnimationFrame(starsRaf);
    triggerConstellation(specialStar);
  } else {
    flashWrongStar(hit);
  }
}

function flashWrongStar(s) {
  const origR = s.r, origA = s.a;
  s.r += 2.2; s.a = 1;
  setTimeout(() => { s.r = origR; s.a = origA; }, 450);

  const hint = $('#starHint');
  hint.textContent = 'coba bintang yang lain... ✨';
  gsap.to(hint, { opacity: 1, duration: 0.3 });
  setTimeout(() => gsap.to(hint, { opacity: 0.6, duration: 0.5 }), 1600);
}

function triggerConstellation(s) {
  starBurst(s).then(async () => {
    gsap.to('#starUI', { opacity: 0, duration: 0.4 });
    const granted = $('#starGranted');
    granted.classList.remove('hidden');
    setTimeout(() => granted.classList.add('show'), 80);

    await sleep(3000);
    starCanvas.removeEventListener('click', onStarClick);
    goToScene('s-cake', 1000);
  });
}

function starBurst(s) {
  return new Promise(resolve => {
    const W = starCanvas.width, H = starCanvas.height;
    let frame = 0;
    const MAX = 65;
    const pts = Array.from({ length: 32 }, (_, i) => {
      const ang = (i / 32) * Math.PI * 2;
      const spd = Math.random() * 3.8 + 1.2;
      return { x: s.x, y: s.y, vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd, r: Math.random() * 2 + 0.6, a: 1 };
    });

    (function burst() {
      starCtx.clearRect(0, 0, W, H);

      for (const st of stars) {
        const a = st.a * (1 - (frame / MAX) * 0.5);
        starCtx.beginPath();
        starCtx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        starCtx.fillStyle = `rgba(248, 240, 233, ${a})`;
        starCtx.fill();
      }

      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        p.a *= 0.94; p.vx *= 0.97; p.vy *= 0.97;
        const g = starCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3.5);
        g.addColorStop(0, `rgba(245, 223, 184, ${p.a})`);
        g.addColorStop(1, `rgba(202, 164, 104, 0)`);
        starCtx.beginPath();
        starCtx.arc(p.x, p.y, p.r * 3.5, 0, Math.PI * 2);
        starCtx.fillStyle = g;
        starCtx.fill();
      }

      const r = 85 * (frame / MAX);
      const glo = starCtx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r);
      glo.addColorStop(0, `rgba(255, 245, 215, ${0.92 * (1 - frame / MAX)})`);
      glo.addColorStop(1, `rgba(202, 164, 104, 0)`);
      starCtx.beginPath();
      starCtx.arc(s.x, s.y, r, 0, Math.PI * 2);
      starCtx.fillStyle = glo;
      starCtx.fill();

      frame++;
      frame < MAX ? requestAnimationFrame(burst) : resolve();
    })();
  });
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 7 · BIRTHDAY CAKE & SMOKE BLOW
═══════════════════════════════════════════════════════════════ */
let candleBlown = false;

function enterCake() {
  candleBlown = false;
  $('#flameWrap').classList.remove('blown');
  $('.flame-aura').style.display = 'block';
  $('#flameSmoke').classList.add('hidden');
  $('#btnBlow').classList.add('hidden');
  $('#cakeAfter').classList.add('hidden');
  $('#cakeStage').classList.remove('shown');

  setTimeout(() => {
    $('#cakeStage').classList.add('shown');
    setTimeout(() => {
      const btn = $('#btnBlow');
      btn.classList.remove('hidden');
      gsap.from(btn, { opacity: 0, y: 16, duration: 0.9 });
    }, 1200);
  }, 1000);
}

$('#btnBlow').addEventListener('click', async () => {
  if (candleBlown) return;
  candleBlown = true;

  const btn   = $('#btnBlow');
  const flame = $('#flameWrap');
  const aura  = $('.flame-aura');
  const smoke = $('#flameSmoke');
  const scene = $('#s-cake');

  gsap.to(btn, { opacity: 0, y: 8, duration: 0.4, onComplete: () => btn.classList.add('hidden') });

  flame.classList.add('blown');
  aura.style.display = 'none';
  smoke.classList.remove('hidden');

  await sleep(550);

  gsap.to(scene, { backgroundColor: '#020104', duration: 1.3 });

  await sleep(1200);

  /* Golden Ambient Pulse */
  const beam = document.createElement('div');
  beam.style.cssText = `
    position:absolute; left:50%; top:50%;
    transform:translate(-50%,-50%);
    width:8px; height:8px; border-radius:50%;
    background:rgba(255,245,215,1);
    box-shadow:0 0 80px 70px rgba(245,223,184,0.18), 0 0 160px 120px rgba(202,164,104,0.1);
    z-index:4; pointer-events:none;`;
  scene.appendChild(beam);
  gsap.from(beam, { opacity: 0, scale: 0, duration: 1.5, ease: 'power3.out' });

  spawnConfetti(85);

  await sleep(800);
  const after = $('#cakeAfter');
  after.classList.remove('hidden');
  gsap.from('.cake-hbd', { opacity: 0, scale: 0.92, duration: 1.4, ease: 'power3.out' });

  await sleep(3400);
  goToScene('s-surprise', 1000);
});

/* ═══════════════════════════════════════════════════════════════
   SCENE 8 · SURPRISE REVEAL & DYNAMIC FIREWORKS
═══════════════════════════════════════════════════════════════ */
let fireworksRunning = false;

async function enterSurprise() {
  $('#srpWait').classList.remove('hidden');
  $('#srpTeaser').classList.add('hidden');
  $('#srpReveal').classList.add('hidden');

  await sleep(2100);
  $('#srpWait').classList.add('hidden');
  $('#srpTeaser').classList.remove('hidden');
  gsap.from('#srpTeaser', { opacity: 0, y: 15, duration: 0.8 });
}

$('#btnOpenSrp').addEventListener('click', async () => {
  $('#srpTeaser').classList.add('hidden');

  const scene = $('#s-surprise');
  const burst = document.createElement('div');
  burst.style.cssText = `
    position:absolute; left:50%; top:50%;
    transform:translate(-50%,-50%) scale(0);
    width:160vmax; height:160vmax; border-radius:50%;
    background:radial-gradient(circle, rgba(255,245,230,0.95) 0%, rgba(202,164,104,0.4) 40%, transparent 68%);
    pointer-events:none; z-index:5;`;
  scene.appendChild(burst);

  gsap.to(burst, { scale: 1, opacity: 0, duration: 1.5, ease: 'power3.out', onComplete: () => burst.remove() });

  await sleep(550);

  $('#srpTitle').textContent = `HAPPY BIRTHDAY, ${birthdayConfig.name.toUpperCase()} 🤍`;
  $('#srpReveal').classList.remove('hidden');

  // Start Canvas Fireworks Display!
  startFireworks();
  spawnConfetti(120);

  await sleep(6500);
  fireworksRunning = false;
  goToScene('s-final', 1200);
});

/* Canvas Fireworks System */
function startFireworks() {
  const canvas = $('#fireworksCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  fireworksRunning = true;

  const particles = [];
  const colors = ['#f5dfb8', '#caa468', '#f0adb7', '#ffffff', '#e056fd'];

  function createFirework() {
    const x = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
    const y = Math.random() * canvas.height * 0.5 + canvas.height * 0.1;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const count = 45;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const speed = Math.random() * 4 + 1.5;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color,
        size: Math.random() * 2 + 1.5
      });
    }
  }

  let lastSpawn = 0;
  function animate(now) {
    if (!fireworksRunning && particles.length === 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    ctx.fillStyle = 'rgba(7, 4, 8, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (fireworksRunning && now - lastSpawn > 600) {
      createFirework();
      lastSpawn = now;
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.04; // gravity
      p.alpha -= 0.015;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 9 · FINAL CELESTIAL SCREEN
═══════════════════════════════════════════════════════════════ */
function enterFinal() {
  $('#finalName').textContent = birthdayConfig.name;
  $('#finalDate').textContent = birthdayConfig.birthday;

  const canvas = $('#finalCanvas');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');

  window.addEventListener('resize', () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }, { passive: true });

  const finalStars = Array.from({ length: Math.max(70, Math.floor((canvas.width * canvas.height) / 4500)) }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.3,
    a: Math.random() * 0.55 + 0.1,
    t: Math.random() * Math.PI * 2,
    s: Math.random() * 0.007 + 0.003,
    vx: (Math.random() - 0.5) * 0.08,
  }));

  (function renderFinal() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of finalStars) {
      s.t += s.s; s.x += s.vx;
      if (s.x > canvas.width + 2) s.x = -2;
      if (s.x < -2) s.x = canvas.width + 2;
      const a = s.a * (0.45 + Math.sin(s.t) * 0.55);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245, 223, 184, ${a})`;
      ctx.fill();
    }
    requestAnimationFrame(renderFinal);
  })();

  setTimeout(() => {
    if (musicPlaying) fadeVolume(audio.volume, 0.15, 6000);
  }, 5000);
}

/* ═══════════════════════════════════════════════════════════════
   CONFETTI CANNON
═══════════════════════════════════════════════════════════════ */
function spawnConfetti(count) {
  const colors = [
    'rgba(202, 164, 104, 0.85)',
    'rgba(245, 223, 184, 0.85)',
    'rgba(201, 130, 141, 0.8)',
    'rgba(255, 245, 230, 0.75)',
    'rgba(222, 202, 165, 0.85)',
  ];

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const c = document.createElement('div');
      c.style.cssText = `
        position:fixed;
        left:${Math.random() * 100}%;
        top:-14px;
        width:${Math.random() * 8 + 4}px;
        height:${Math.random() * 8 + 4}px;
        border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
        background:${colors[Math.floor(Math.random() * colors.length)]};
        pointer-events:none;
        z-index:9500;
        animation:confettiFall ${Math.random() * 2.4 + 2.6}s ease forwards;`;
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 5500);
    }, i * 24);
  }
}
