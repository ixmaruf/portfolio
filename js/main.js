/* ============================================================
   MARUF HASAN — v3 interactions
   mode switch (full content swap) · typer · reveals · counters
   contact form (Web3Forms w/ honest fallback) · menu · spy
   No dependencies. Respects reduced motion. Content is visible
   without JS; animations only enhance.
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var root = document.documentElement;
  var main = $('main');

  /* ---------------- MODE SWITCH (full swap) ---------------- */
  var ROLES = {
    dev: '// developer — web apps · ai workflows · pwa',
    web3: '// web3 — communities · content · growth'
  };
  var MODE_NAMES = { dev: 'developer', web3: 'web3' };

  function currentMode() {
    try {
      var m = localStorage.getItem('mh-mode');
      return (m === 'dev' || m === 'web3') ? m : 'dev';
    } catch (e) { return 'dev'; }
  }

  function paintMode(mode) {
    root.setAttribute('data-mode', mode);
    $$('[data-setmode]').forEach(function (b) {
      b.classList.toggle('on', b.getAttribute('data-setmode') === mode);
    });
    var role = $('#roleLine');
    if (role) role.textContent = ROLES[mode];
    var tt = $('#termTitle');
    if (tt) tt.textContent = mode === 'web3' ? 'maruf@chain: ~/ledger' : 'maruf@web: ~/whoami';
    var name = $('#modeName');
    if (name) name.textContent = MODE_NAMES[mode];
  }

  function setMode(mode, instant) {
    if (mode !== 'dev' && mode !== 'web3') mode = 'dev';
    try { localStorage.setItem('mh-mode', mode); } catch (e) {}
    closeMenu();
    if (instant || reduceMotion || !main) { paintMode(mode); return; }
    main.classList.add('swap');
    setTimeout(function () {
      paintMode(mode);
      requestAnimationFrame(function () { main.classList.remove('swap'); });
    }, 200);
  }

  $$('[data-setmode]').forEach(function (b) {
    b.addEventListener('click', function () { setMode(b.getAttribute('data-setmode')); });
  });

  /* ---------------- TERMINAL TYPER ---------------- */
  var SCRIPTS = {
    dev: ['$ whoami', 'maruf_hasan — developer', '$ cat ./focus.txt', 'web apps · ai workflows · pwa', '$ ./ship --prod', '> deployed · tested · done'],
    web3: ['$ whoami', 'maruf_hasan — community builder', '$ cat ./record.txt', '170K+ members · 500+ tutorials', '$ ./grow --community', '> engagement: healthy']
  };
  var typer = $('#typer');
  function runTyper() {
    if (!typer) return;
    function script() {
      return SCRIPTS[root.getAttribute('data-mode')] || SCRIPTS.dev;
    }
    if (reduceMotion) { typer.textContent = script().join('\n'); return; }
    var li = 0, ci = 0, out = '';
    function tick() {
      var lines = script();
      if (li >= lines.length) {
        setTimeout(function () { li = 0; ci = 0; out = ''; tick(); }, 4600);
        return;
      }
      var line = lines[li];
      ci++;
      var done = out + line.slice(0, ci);
      typer.textContent = done;
      if (ci >= line.length) {
        li++; ci = 0; out = done + '\n';
        setTimeout(tick, li % 2 === 0 ? 700 : 380);
      } else {
        setTimeout(tick, line.charAt(0) === '$' ? 48 : 24);
      }
    }
    new MutationObserver(function () { li = 0; ci = 0; out = ''; })
      .observe(root, { attributes: true, attributeFilter: ['data-mode'] });
    tick();
  }

  /* ---------------- SCROLL REVEALS (JS-owned start state) ---------------- */
  function initReveals() {
    var els = $$('.rv');
    if (!els.length) return;
    root.classList.add('js-anim');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('on'); });
      return;
    }
    els.forEach(function (el) { el.classList.add('pre'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.remove('pre');
          en.target.classList.add('on');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -24px 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- COUNTERS (stable historical numbers only) ---------------- */
  function initCounters() {
    var nums = $$('[data-count]');
    if (!nums.length) return;
    function finish(el) { el.textContent = el.getAttribute('data-count'); }
    if (reduceMotion || !('IntersectionObserver' in window)) { nums.forEach(finish); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        var el = en.target;
        var target = parseFloat(el.getAttribute('data-count'));
        var t0 = performance.now(), dur = 1400;
        (function step(now) {
          var p = Math.min((now - t0) / dur, 1);
          var e = 1 - Math.pow(1 - p, 4);
          el.textContent = String(Math.floor(target * e));
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

  /* ---------------- CONTACT FORM ----------------
     Web3Forms when a key is configured; otherwise opens the
     visitor's mail app with a prefilled message. Never fakes success.
     Free key: https://web3forms.com (verify email, paste below). */
  var W3F_KEY = 'REPLACE_WITH_YOUR_KEY';
  var msgForm = $('#msgForm'), fStatus = $('#fStatus'), fSend = $('#fSend');
  if (msgForm) msgForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = $('#fName').value.trim();
    var email = $('#fEmail').value.trim();
    var topic = $('#fTopic').value;
    var message = $('#fMsg').value.trim();
    var hp = msgForm.querySelector('.hp');
    if (hp && hp.value) return;
    function say(t, ok) {
      if (!fStatus) return;
      fStatus.textContent = t;
      fStatus.classList.toggle('err', !ok);
    }
    if (name.length < 2) { say('> please add your name', false); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { say('> that email looks off — check it', false); return; }
    if (message.length < 10) { say('> message too short (10+ chars)', false); return; }
    if (W3F_KEY.indexOf('REPLACE') === 0) {
      var s = encodeURIComponent('[portfolio:' + topic + '] from ' + name);
      var b = encodeURIComponent(message + '\n\n— ' + name + ' <' + email + '>');
      window.location.href = 'mailto:marufhasan8009@gmail.com?subject=' + s + '&body=' + b;
      say('> opening your mail app to send...', true);
      return;
    }
    if (fSend) fSend.disabled = true;
    say('> sending...', true);
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: W3F_KEY, name: name, email: email,
        subject: '[portfolio:' + topic + '] ' + name,
        message: message, from_name: 'marufix.xyz', replyto: email
      })
    }).then(function (r) { return r.json(); }).then(function (d) {
      if (d && d.success) { msgForm.reset(); say('> sent. i reply within 24h.', true); }
      else { say('> send failed — dm me on x instead', false); }
    }).catch(function () { say('> network error — dm me on x instead', false); })
    .then(function () { if (fSend) fSend.disabled = false; });
  });

  /* ---------------- FOOTER YEAR ---------------- */
  var yr = $('#yr');
  if (yr) yr.textContent = String(new Date().getFullYear());

  /* ---------------- INIT ---------------- */
  paintMode(currentMode());
  runTyper();
  initReveals();
  initCounters();
  onScroll();
})();
