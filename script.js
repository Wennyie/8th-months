/* ===== EDIT ME: names, texts, music ===== */
const CONFIG = {
  nick: 'My Sayang',            // shown on the cake banner
  music: 'music.mp3',           // optional: put your song in this folder
  hug: 'Sending you the biggest virtual hug, my Sayang! (づ๑•ᴗ•๑)づ♡',
  letter: `Happy 8th Monthsary, My Sayang! ♡

Thank you for being part of my life for these eight beautiful months. Thank you for the smiles, the memories, the little moments, and all the ways you make my world feel more special.

I know we're not perfect, and we may still have a lot to learn about each other, but I want you to know that what we have means so much to me. I want to keep making memories with you, supporting your dreams, laughing with you, and being there for you through the good days and the difficult ones.

If I could choose again, I'd still choose you.

Here's to eight months of us, and hopefully many, many more.

I love you so much, my Sayang. Always remember that you are special to me. ♡

Forever your person,
Your Love ♡`
};
// Titles + messages. Each one is drawn by the matching scene in SCENES below (same order).
const MEMORIES = [
  { t: 'The Day It Started', m: `Meeting you was one of the sweetest things that ever happened to me. I didn't know then how special you would become to my heart, but now I can't imagine my days without you.` },
  { t: 'Your Beautiful Smile', m: `Your smile has this little magic that makes my bad days feel lighter. Even when everything feels difficult, the thought of you can make me smile again.` },
  { t: 'The Little Things', m: `It's not always about grand surprises or expensive gifts. It's the little moments with you, our conversations, our laughter, and the simplest things that become my favorite memories.` },
  { t: `Even When We're Apart`, m: `Even when I can't be beside you, you are still close to my heart. I wish I could hug you whenever I miss you, but until then, please remember that someone is always thinking about you.` },
  { t: 'You Feel Like Home', m: `With you, I can be myself. I don't have to be perfect, and I don't have to pretend. Thank you for being someone who makes my heart feel safe, understood, and loved.` },
  { t: 'Eight Months of Us', m: `Happy 8th monthsary, my Sayang! Eight months of memories, laughter, learning, and love. We've had our own little moments and challenges, but I'm grateful that we continue to share this journey together.` },
  { t: 'Still Choosing You', m: `If I could make one wish for us, it would be to keep growing together, to understand each other better, and to keep choosing each other even on the difficult days. This is only another chapter of our story, Sayang. I hope there are many more months and beautiful memories waiting for us.` }
];

/* ===== Helpers ===== */
const $ = (s) => document.querySelector(s), rnd = (a, b) => Math.random() * (b - a) + a;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
function fh(parent, ch, cls, css) { // spawn a short-lived element (skipped for reduced motion)
  if (reduce) return;
  const e = document.createElement('span');
  e.className = cls; e.textContent = ch; Object.assign(e.style, css);
  parent.appendChild(e);
  e.addEventListener('animationend', () => e.remove());
  setTimeout(() => e.remove(), 20000);
}
const fx = $('#fx');
setInterval(() => fx.childElementCount < 10 && fh(fx, '♥', 'fh', { left: rnd(3, 97) + '%', fontSize: rnd(10, 18) + 'px', '--d': rnd(12, 20) + 's', '--dx': rnd(-30, 30) + 'px' }), 2800);
const burst = (n = 22) => { for (let i = 0; i < n; i++) setTimeout(() =>
  fh(fx, Math.random() < .7 ? '♥' : '✦', 'fh', { left: rnd(5, 95) + '%', fontSize: rnd(14, 26) + 'px', '--d': rnd(2, 4) + 's', '--dx': rnd(-40, 40) + 'px' }), i * 60); };

/* ===== Pixel drawing ===== */
const R = (c, x, y, w, h, f) => { c.fillStyle = f; c.fillRect(x, y, w, h); };
const HEART = ['.X.X.', 'XXXXX', '.XXX.', '..X..'];
const H = (c, x, y, f, s = 1) => HEART.forEach((row, j) => [...row].forEach((ch, i) => ch === 'X' && R(c, x + i * s, y + j * s, s, s, f)));
const P = (c, x, y, body, hair) => { // little person, 8x13 px
  R(c, x + 1, y, 6, 2, hair); R(c, x, y + 1, 1, 3, hair); R(c, x + 7, y + 1, 1, 3, hair);
  R(c, x + 1, y + 2, 6, 4, '#ffd9b8');
  R(c, x + 2, y + 3, 1, 1, '#3b2a3a'); R(c, x + 5, y + 3, 1, 1, '#3b2a3a'); R(c, x + 3, y + 5, 2, 1, '#e86a8a');
  R(c, x + 1, y + 6, 6, 4, body); R(c, x + 2, y + 10, 1, 3, '#5b4a6a'); R(c, x + 5, y + 10, 1, 3, '#5b4a6a');
};
const A = (c, x, y) => P(c, x, y, '#ff7aa2', '#6b3a2a'), B = (c, x, y) => P(c, x, y, '#6aa8ff', '#2a2a3a');
const BG = (c, f) => R(c, 0, 0, 48, 36, f);
const STARS = [[3, 4], [10, 9], [40, 5], [45, 12], [6, 20], [44, 24], [16, 3]];

const SCENES = [
  (c) => { BG(c, '#ffd1dc'); R(c, 0, 28, 48, 8, '#9bd88a'); A(c, 10, 15); B(c, 30, 15); H(c, 20, 6, '#ff4f7b'); H(c, 26, 3, '#ff7aa2'); H(c, 14, 3, '#ff7aa2'); },
  (c) => { BG(c, '#fff2b8'); R(c, 14, 4, 20, 6, '#6b3a2a'); R(c, 14, 6, 20, 20, '#ffd9b8'); R(c, 19, 14, 3, 3, '#3b2a3a'); R(c, 27, 14, 3, 3, '#3b2a3a');
    R(c, 19, 20, 10, 2, '#e86a8a'); R(c, 18, 19, 1, 1, '#e86a8a'); R(c, 29, 19, 1, 1, '#e86a8a'); R(c, 16, 18, 3, 2, '#ffa6b8'); R(c, 30, 18, 3, 2, '#ffa6b8');
    H(c, 4, 8, '#ff4f7b'); H(c, 39, 6, '#ff4f7b'); H(c, 40, 22, '#ff7aa2'); H(c, 4, 24, '#ff7aa2'); R(c, 20, 26, 8, 10, '#ff7aa2'); },
  (c) => { BG(c, '#cfeeff'); R(c, 38, 3, 6, 6, '#ffe27a'); R(c, 0, 24, 48, 12, '#9bd88a'); A(c, 10, 13); B(c, 30, 13);
    for (let i = 0; i < 8; i++) R(c, 6 + i * 4, 26, 4, 6, i % 2 ? '#fff' : '#ff8aa8');
    R(c, 22, 27, 3, 3, '#e8334f'); R(c, 27, 28, 3, 3, '#e8334f'); R(c, 23, 26, 1, 1, '#3a9a4a'); R(c, 28, 27, 1, 1, '#3a9a4a'); },
  (c) => { BG(c, '#2b2a5e'); R(c, 21, 3, 6, 6, '#fff4c2'); STARS.forEach(([x, y]) => R(c, x, y, 1, 1, '#fff'));
    [3, 29].forEach((x, k) => { R(c, x - 1, 12, 18, 22, '#6b4f3a'); R(c, x, 13, 16, 20, '#3a3a7a'); (k ? B : A)(c, x + 4, 18); });
    H(c, 21, 15, '#ff7aa2'); H(c, 22, 21, '#ff7aa2'); H(c, 21, 27, '#ff7aa2'); },
  (c) => { BG(c, '#ffe6d5'); R(c, 0, 28, 48, 8, '#e0b48f'); R(c, 3, 5, 12, 12, '#7a5a4a'); R(c, 4, 6, 10, 10, '#a9d8ff');
    R(c, 37, 2, 1, 5, '#7a5a4a'); H(c, 35, 7, '#ff4f7b', 2); R(c, 10, 32, 28, 3, '#ff9fbd'); A(c, 16, 15); B(c, 24, 15); R(c, 15, 22, 18, 2, '#ffd9b8'); },
  (c) => { BG(c, '#e9d7ff'); R(c, 0, 30, 48, 6, '#bfe8b0'); A(c, 14, 17); B(c, 26, 17); R(c, 22, 25, 4, 1, '#ffd9b8');
    for (let i = 0; i < 8; i++) H(c, Math.round(3 + i * 5.5), 4 + (i % 2) * 4, '#ff6f9c'); },
  (c) => { BG(c, '#1d1b4b'); H(c, 28, 2, '#fff4c2', 3); STARS.forEach(([x, y]) => x < 27 && R(c, x, y, 1, 1, '#fff')); R(c, 0, 30, 48, 6, '#2d5a3d');
    R(c, 35, 22, 10, 8, '#f4d6a0'); R(c, 34, 19, 12, 3, '#e8534f'); R(c, 39, 25, 3, 5, '#8a5a3a'); A(c, 4, 17); B(c, 14, 17); R(c, 12, 24, 2, 1, '#ffd9b8'); }
];
const draw = (i, cv) => { cv.width = 48; cv.height = 36; SCENES[i](cv.getContext('2d')); };

/* Cake (64x54 pixel grid) */
const CX = (i) => 16 + Math.round(i * 4.5);
function drawCake(c) {
  R(c, 10, 50, 44, 3, '#e7c9d6');
  R(c, 6, 32, 52, 18, '#ffe3ea'); R(c, 6, 32, 52, 2, '#fff'); for (let x = 8; x < 56; x += 6) R(c, x, 34, 3, 3, '#fff');
  R(c, 14, 20, 36, 12, '#ffb3c7'); R(c, 14, 20, 36, 2, '#fff'); for (let x = 16; x < 48; x += 6) R(c, x, 22, 3, 3, '#fff');
  [8, 51].forEach((x) => { R(c, x, 29, 4, 3, '#e8334f'); R(c, x + 1, 28, 2, 1, '#3a9a4a'); });
  H(c, 18, 25, '#ff6f9c'); H(c, 41, 25, '#ff6f9c'); [10, 29, 48].forEach((x) => H(c, x, 45, '#ff6f9c'));
  for (let i = 0; i < 8; i++) R(c, CX(i), 13, 2, 7, i % 2 ? '#ff9ec0' : '#fff');
}
const cake = $('#cake'), cc = $('#cc'), flames = [];
cc.width = 64; cc.height = 54; drawCake(cc.getContext('2d'));
$('#banner').textContent = CONFIG.nick.toUpperCase();
for (let i = 0; i < 8; i++) {
  const f = document.createElement('i'); f.className = 'flame';
  f.style.left = (CX(i) + 1) / 64 * 100 + '%'; f.style.top = 9 / 54 * 100 + '%';
  cake.appendChild(f); flames.push(f);
}

/* ===== Candle-blowing sequence ===== */
let state = 0; // 0 ready, 1 playing, 2 blown out
const story = $('#story');
function blow() {
  if (state) return; state = 1; $('#hint').hidden = true;
  cake.classList.add('bounce');
  setTimeout(() => { cake.classList.add('fast'); $('#gust').hidden = false; }, 600);
  flames.forEach((f, i) => setTimeout(() => { f.classList.add('out');
    for (let k = 0; k < 3; k++) setTimeout(() => fh(cake, '', 'sm', { left: f.style.left, top: f.style.top, '--dx': rnd(-12, 12) + 'px' }), k * 300); }, 1500 + i * 140));
  setTimeout(() => { cake.classList.remove('bounce', 'fast'); $('#gust').hidden = true; burst(); $('#wish').hidden = false; $('#again').hidden = false; state = 2; }, 2900);
  setTimeout(() => { if (!story.hidden) return; story.hidden = false; story.classList.add('in'); story.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); }, 5200);
}
cake.addEventListener('click', blow);
cake.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); blow(); } });
$('#again').addEventListener('click', () => {
  flames.forEach((f) => f.classList.remove('out')); $('#wish').hidden = $('#again').hidden = true; $('#hint').hidden = false; state = 0;
});

/* ===== Memory gallery + pop-up ===== */
const modal = $('#modal'); let cur = 0, last, timer;
MEMORIES.forEach((m, i) => {
  const b = document.createElement('button'); b.className = 'card'; b.innerHTML = '<canvas></canvas><span></span>';
  b.lastChild.textContent = m.t; draw(i, b.firstChild); b.addEventListener('click', () => openM(i, b)); $('#grid').appendChild(b);
});
function show(i) {
  cur = (i + MEMORIES.length) % MEMORIES.length; draw(cur, $('#mc'));
  $('#mt').textContent = MEMORIES[cur].t; $('#mm').textContent = MEMORIES[cur].m;
}
function openM(i, b) {
  last = b; show(i); modal.hidden = false; $('#mx').focus();
  timer = setInterval(() => fh($('#mfx'), '♥', 'fh', { left: rnd(5, 95) + '%', fontSize: rnd(12, 22) + 'px', '--d': rnd(3, 5) + 's', '--dx': rnd(-20, 20) + 'px' }), 450);
}
function closeM() { modal.hidden = true; clearInterval(timer); last && last.focus(); }
$('#mx').addEventListener('click', closeM);
$('#mp').addEventListener('click', () => show(cur - 1));
$('#mn').addEventListener('click', () => show(cur + 1));
modal.addEventListener('click', (e) => e.target === modal && closeM());
document.addEventListener('keydown', (e) => {
  if (modal.hidden) return;
  if (e.key === 'Escape') closeM(); else if (e.key === 'ArrowLeft') show(cur - 1); else if (e.key === 'ArrowRight') show(cur + 1);
});

/* ===== Story -> Message (separate screens) ===== */
const msg = $('#message'), go = (el) => el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
$('#go').addEventListener('click', () => { msg.hidden = false; msg.classList.add('in'); go(msg); });
$('#back').addEventListener('click', () => go(story));

/* ===== Envelope, letter, hug ===== */
$('#env').addEventListener('click', function () {
  if (this.classList.contains('open')) return;
  this.classList.add('open');
  setTimeout(() => {
    $('#lt').textContent = CONFIG.letter; $('#lt').hidden = false; $('#after').hidden = false; burst(16);
    $('#lt').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  }, 550);
});
$('#hugbtn').addEventListener('click', () => {
  draw(4, $('#hug')); $('#hugmsg').textContent = CONFIG.hug; $('#hugbox').hidden = false; burst(20);
  $('#hugbox').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
});

/* ===== Optional music (muted by default, never autoplays) ===== */
const mb = $('#music'); let audio = null, on = false;
mb.addEventListener('click', () => {
  if (!audio) { audio = new Audio(CONFIG.music); audio.loop = true; audio.volume = .6;
    audio.addEventListener('error', () => { on = false; audio = null; mb.title = `Add "${CONFIG.music}" to this folder`; mb.textContent = '♪'; }); }
  if (on) { audio.pause(); on = false; } else audio.play().then(() => { on = true; }).catch(() => { on = false; });
  setTimeout(() => { mb.setAttribute('aria-pressed', on); mb.textContent = on ? '❚❚' : '♪'; }, 150);
});