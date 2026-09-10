/* ============================================================
   MARUF HASAN — v4 interactions
   mode switch (full swap) · typer · reveals · counters
   hanko stamp · brush draw · contact form · menu · spy
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

  /* form topics follow the mode: dev never offers web3 community
     and web3 never offers dev work */
  var TOPICS = {
    dev: [['work', 'dev work'], ['promo', 'x promotion / collab'], ['other', 'something else']],
    web3: [['promo', 'x promotion / collab'], ['web3', 'web3 community'], ['other', 'something else']]
  };
  function applyTopics(mode) {
    var sel = $('#fTopic');
    if (!sel) return;
    var cur = sel.value;
    sel.innerHTML = '';
    TOPICS[mode].forEach(function (t) {
      var o = document.createElement('option');
      o.value = t[0];
      o.textContent = t[1];
      sel.appendChild(o);
    });
    var ok = TOPICS[mode].some(function (t) { return t[0] === cur; });
    sel.value = ok ? cur : TOPICS[mode][0][0];
  }

  function modeFromUrl() {
    try {
      var q = new URLSearchParams(location.search).get('m');
      if (q === 'dev' || q === 'web3') return q;
      if (/^\/web3\/?$/.test(location.pathname)) return 'web3';
      if (/^\/dev\/?$/.test(location.pathname)) return 'dev';
    } catch (e) {}
    return null;
  }
  function currentMode() {
    var u = modeFromUrl();
    if (u) return u;
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
    if (tt) tt.textContent = 'maruf@web: ~/whoami';
    var name = $('#modeName');
    if (name) name.textContent = MODE_NAMES[mode];
    applyTopics(mode);
  }

  function setMode(mode, instant) {
    if (mode !== 'dev' && mode !== 'web3') mode = 'dev';
    try { localStorage.setItem('mh-mode', mode); } catch (e) {}
    try { history.replaceState(null, '', '/' + mode); } catch (e2) {}
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

  /* ---------------- TERMINAL TYPER (dev mode) ---------------- */
  var SCRIPT = ['$ whoami', 'maruf_hasan — developer', '$ cat ./focus.txt', 'web apps · ai workflows · pwa', '$ ./ship --prod', '> deployed · tested · done'];
  var typer = $('#typer');
  function runTyper() {
    if (!typer) return;
    if (reduceMotion) { typer.textContent = SCRIPT.join('\n'); return; }
    var li = 0, ci = 0, out = '';
    function tick() {
      if (li >= SCRIPT.length) {
        setTimeout(function () { li = 0; ci = 0; out = ''; tick(); }, 4600);
        return;
      }
      var line = SCRIPT[li];
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

  /* ---------------- HANKO STAMPS ---------------- */
  function initStamp() {
    var seals = $$('.hanko');
    if (!seals.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      seals.forEach(function (s) { s.classList.add('stamped'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('stamped'); io.unobserve(en.target); }
      });
    }, { threshold: 0.7 });
    seals.forEach(function (s) { io.observe(s); });
  }

  /* ---------------- BRUSH STROKE DRAW ---------------- */
  function initBrush() {
    var paths = $$('.draw');
    if (!paths.length || reduceMotion || !('IntersectionObserver' in window)) return;
    paths.forEach(function (p) {
      try {
        var len = p.getTotalLength();
        p.style.strokeDasharray = String(len);
        p.style.strokeDashoffset = String(len);
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (!en.isIntersecting) return;
            io.disconnect();
            p.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(.16,1,.3,1)';
            p.style.strokeDashoffset = '0';
          });
        }, { threshold: 0.4 });
        io.observe(p);
      } catch (e) {}
    });
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

  function fallbackCopy(text) {
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'absolute';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    } catch (e) {}
  }

  /* ---------------- CONTACT FORM ----------------
     Web3Forms when a key is configured; otherwise shows the composed
     message with one-tap send/copy buttons. Never fakes success.
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
      var s = '[portfolio:' + topic + '] from ' + name;
      var b = message + '\n\n— ' + name + ' <' + email + '>';
      var fb = $('#fFallback'), prev = $('#fPrev'), mb = $('#fMailBtn'), cb = $('#fCopyBtn');
      if (fb && prev && mb) {
        prev.textContent = 'to: marufhasan8009@gmail.com\nsubject: ' + s + '\n\n' + b;
        mb.href = 'mailto:marufhasan8009@gmail.com?subject=' + encodeURIComponent(s) + '&body=' + encodeURIComponent(b);
        fb.hidden = false;
        say('> tap below — takes 5 seconds, nothing is stuck', true);
        if (cb) cb.onclick = function () {
          var done = function () { say('> copied — paste it anywhere to reach me', true); };
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(prev.textContent).then(done, function () { fallbackCopy(prev.textContent); done(); });
          } else { fallbackCopy(prev.textContent); done(); }
        };
        try { fb.scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' }); } catch (e2) {}
      } else {
        window.location.href = 'mailto:marufhasan8009@gmail.com?subject=' + encodeURIComponent(s) + '&body=' + encodeURIComponent(b);
        say('> opening your mail app to send...', true);
      }
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
      if (d && d.success) {
        msgForm.reset();
        var fb2 = $('#fFallback');
        if (fb2) fb2.hidden = true;
        say('> sent. i reply within 24h.', true);
      }
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
  initStamp();
  initBrush();
  initCounters();
  onScroll();
})();
