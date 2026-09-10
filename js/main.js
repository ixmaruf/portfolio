/* ============================================================
   MARUF HASAN — v2 interactions
   mode switch · terminal typer · reveals · counters · filters
   No dependencies. No network calls. Respects reduced motion.
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------------- MODE SWITCH ---------------- */
  var ROLES = {
    dev: '// developer — javascript · ai workflows · shipped web tools',
    web3: '// web3 builder — 170K+ community · 500+ tutorials · x growth'
  };
  var MODE_NAMES = { dev: 'developer', web3: 'web3' };

  function currentMode() {
    try { return localStorage.getItem('mh-mode') || 'dev'; } catch (e) { return 'dev'; }
  }

  function setMode(mode, save) {
    if (mode !== 'dev' && mode !== 'web3') mode = 'dev';
    document.body.setAttribute('data-mode', mode);
    if (save !== false) { try { localStorage.setItem('mh-mode', mode); } catch (e) {} }
    $$('[data-setmode]').forEach(function (b) {
      var on = b.getAttribute('data-setmode') === mode;
      b.classList.toggle('on', on);
    });
    var role = $('#roleLine');
    if (role) role.textContent = ROLES[mode];
    var name = $('#modeName');
    if (name) name.textContent = MODE_NAMES[mode];
    applyFilter(mode, true);
    closeMenu();
  }

  $$('[data-setmode]').forEach(function (b) {
    b.addEventListener('click', function () { setMode(b.getAttribute('data-setmode')); });
  });

  /* ---------------- PROJECT FILTER ---------------- */
  var activeFilter = 'dev';
  function applyFilter(f, fromMode) {
    activeFilter = f;
    $$('[data-filter]').forEach(function (b) {
      b.classList.toggle('on', b.getAttribute('data-filter') === f);
    });
    $$('.p[data-cat]').forEach(function (card) {
      var show = (f === 'all') || (card.getAttribute('data-cat') === f);
      card.classList.toggle('hide', !show);
    });
    if (!fromMode) { try { sessionStorage.setItem('mh-filter', f); } catch (e) {} }
  }
  $$('[data-filter]').forEach(function (b) {
    b.addEventListener('click', function () { applyFilter(b.getAttribute('data-filter'), false); });
  });

  /* ---------------- TERMINAL TYPER ---------------- */
  var SCRIPTS = {
    dev: ['$ whoami', 'maruf_hasan — developer', '$ cat ./focus.txt', 'js · ai agent workflows · shipped web tools', '$ ./ship --prod', '> deployed · zero console errors'],
    web3: ['$ whoami', 'maruf_hasan — community builder', '$ cat ./record.txt', '170K+ members · 500+ tutorials · 5 yrs', '$ ./grow --community', '> engagement: healthy']
  };
  var typer = $('#typer');
  function runTyper() {
    if (!typer) return;
    if (reduceMotion) {
      typer.textContent = SCRIPTS[currentMode()].join('\n');
      return;
    }
    var lines, li = 0, ci = 0, out = '';
    function script() { return SCRIPTS[document.body.getAttribute('data-mode')] || SCRIPTS.dev; }
    function tick() {
      lines = script();
      if (li >= lines.length) {
        setTimeout(function () { li = 0; ci = 0; out = ''; tick(); }, 4200);
        return;
      }
      var line = lines[li];
      ci++;
      var done = out + line.slice(0, ci);
      typer.textContent = done;
      if (ci >= line.length) {
        li++; ci = 0; out = done + '\n';
        setTimeout(tick, li % 2 === 0 ? 650 : 350);
      } else {
        setTimeout(tick, line.charAt(0) === '$' ? 45 : 22);
      }
    }
    // restart cleanly whenever mode flips
    new MutationObserver(function () { li = 0; ci = 0; out = ''; }).observe(document.body, { attributes: true, attributeFilter: ['data-mode'] });
    tick();
  }

  /* ---------------- SCROLL REVEALS ---------------- */
  function initReveals() {
    var els = $$('.rv');
    if (!els.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('on'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('on'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- COUNTERS ---------------- */
  function initCounters() {
    var nums = $$('[data-count]');
    if (!nums.length) return;
    function finish(el) {
      var dec = parseInt(el.getAttribute('data-dec') || '0', 10);
      var target = parseFloat(el.getAttribute('data-count'));
      el.textContent = dec ? target.toFixed(dec) : String(Math.round(target));
    }
    if (reduceMotion || !('IntersectionObserver' in window)) { nums.forEach(finish); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        var el = en.target;
        var dec = parseInt(el.getAttribute('data-dec') || '0', 10);
        var target = parseFloat(el.getAttribute('data-count'));
        var t0 = performance.now(), dur = 1400;
        (function step(now) {
          var p = Math.min((now - t0) / dur, 1);
          var e = 1 - Math.pow(1 - p, 4);
          var v = target * e;
          el.textContent = dec ? v.toFixed(dec) : String(Math.floor(v));
          if (p < 1) requestAnimationFrame(step); else finish(el);
        })(t0);
      });
    }, { threshold: 0.5 });
    nums.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- MOBILE MENU ---------------- */
  var menuBtn = $('#menuBtn'), mnav = $('#mnav');
  function closeMenu() {
    if (!mnav || mnav.hidden) return;
    mnav.hidden = true;
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  if (menuBtn && mnav) {
    menuBtn.addEventListener('click', function () {
      var open = mnav.hidden;
      mnav.hidden = !open;
      menuBtn.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    $$('a', mnav).forEach(function (a) { a.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  /* ---------------- SCROLLSPY + TOTOP ---------------- */
  var spyLinks = $$('.nav a[href^="#"]');
  var spySecs = spyLinks.map(function (a) { return $(a.getAttribute('href')); }).filter(Boolean);
  var toTop = $('#toTop');
  var ticking = false;
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (toTop) toTop.classList.toggle('show', y > 600);
    if (spySecs.length) {
      var pos = y + 140, cur = spySecs[0];
      spySecs.forEach(function (s) { if (s.offsetTop <= pos) cur = s; });
      spyLinks.forEach(function (a) {
        a.classList.toggle('act', a.getAttribute('href') === '#' + cur.id);
      });
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  if (toTop) toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  /* ---------------- DISCORD COPY ---------------- */
  var dcBtn = $('#dcBtn');
  if (dcBtn) dcBtn.addEventListener('click', function () {
    var msg = $('#dcMsg'), go = $('#dcGo');
    function done() { if (msg) msg.textContent = 'copied: maruf_ix'; if (go) go.textContent = 'done'; }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText('maruf_ix').then(done, done);
    } else { done(); }
  });

  /* ---------------- FOOTER YEAR ---------------- */
  var yr = $('#yr');
  if (yr) yr.textContent = String(new Date().getFullYear());

  /* ---------------- INIT ---------------- */
  setMode(currentMode(), false);
  try {
    var f = sessionStorage.getItem('mh-filter');
    if (f === 'all' || f === 'dev' || f === 'web3') applyFilter(f, false);
  } catch (e) {}
  runTyper();
  initReveals();
  initCounters();
  onScroll();
})();
