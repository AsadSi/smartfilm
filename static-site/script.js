/*
 * Everything that moves on the site, in plain JavaScript — no framework and no
 * build step. Each block is one part of the page and first checks that the
 * part is there, so this one file serves the front page, the privacy policy
 * and the 404.
 */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ------------------------------------------------------------------
     LANGUAGE

     The Danish text is the page itself. The English sits next to it in
     data-en attributes (data-en-html where the text has markup in it, and
     data-en-aria-label and friends for attributes), and switching copies one
     over the other. The words below are the few that change while the page
     is running, so they are not in the HTML.
     ------------------------------------------------------------------ */
  var WORDS = {
    da: {
      close: 'Luk', menu: 'Menu',
      hold: 'Hold nede', holding: 'Bliv ved…', lit: 'Tændt',
      mat: 'Strøm fra · ruden er privat', klar: 'Strøm til · ruden er klar',
      subject: 'Forespørgsel fra smartfilmdanmark.dk'
    },
    en: {
      close: 'Close', menu: 'Menu',
      hold: 'Hold down', holding: 'Keep holding…', lit: 'Lit',
      mat: 'Power off · the glass is private', klar: 'Power on · the glass is clear',
      subject: 'Enquiry from smartfilmdanmark.dk'
    }
  };
  var ATTRS = ['aria-label', 'placeholder', 'alt', 'title', 'lang'];
  var onLang = []; // parts that redraw their own words after a switch

  function lang() { return root.lang === 'en' ? 'en' : 'da'; }
  function word(key) { return WORDS[lang()][key]; }

  function setLang(to) {
    var en = to === 'en';
    document.querySelectorAll('[data-en]').forEach(function (el) {
      if (!el.hasAttribute('data-da')) el.setAttribute('data-da', el.textContent);
      el.textContent = el.getAttribute(en ? 'data-en' : 'data-da');
    });
    document.querySelectorAll('[data-en-html]').forEach(function (el) {
      if (!el.hasAttribute('data-da-html')) el.setAttribute('data-da-html', el.innerHTML);
      el.innerHTML = el.getAttribute(en ? 'data-en-html' : 'data-da-html');
    });
    ATTRS.forEach(function (at) {
      document.querySelectorAll('[data-en-' + at + ']').forEach(function (el) {
        if (!el.hasAttribute('data-da-' + at)) el.setAttribute('data-da-' + at, el.getAttribute(at) || '');
        el.setAttribute(at, el.getAttribute((en ? 'data-en-' : 'data-da-') + at));
      });
    });
    root.lang = to;
    onLang.forEach(function (fn) { fn(); });
  }

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var to = lang() === 'en' ? 'da' : 'en';
      setLang(to);
      try { localStorage.setItem('sf-lang', to); } catch (e) { /* private mode: works for this visit */ }
    });
  });

  /* The copyright year, kept current in both languages. */
  function year() {
    document.querySelectorAll('.ftr-bot span').forEach(function (span) {
      span.childNodes.forEach(function (n) {
        if (n.nodeType === 3) n.nodeValue = n.nodeValue.replace(/© \d{4}/, '© ' + new Date().getFullYear());
      });
    });
  }
  onLang.push(year);

  /* ------------------------------------------------------------------
     REVEAL — sections rise into place the first time they scroll in.
     ------------------------------------------------------------------ */
  document.querySelectorAll('[data-reveal]').forEach(function (el) {
    if (!('IntersectionObserver' in window)) { el.classList.add('in', 'done'); return; }
    var io = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      el.classList.add('in');
      setTimeout(function () { el.classList.add('done'); }, 1200);
      io.disconnect();
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    io.observe(el);
  });

  /* ------------------------------------------------------------------
     HEADER — solid once the page scrolls, the current section marked in
     the menu, in-page links that scroll without a #fragment, and the
     phone menu.
     ------------------------------------------------------------------ */
  var hdr = document.querySelector('.hdr');
  var menuBtn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    var target = a && document.getElementById(a.getAttribute('href').slice(1));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView();
    target.focus({ preventScroll: true });
  });

  if (hdr && menuBtn && menu) {
    var open = false;
    var links = [].map.call(document.querySelectorAll('.hdr .nav a'), function (a) { return a.getAttribute('href'); });

    var setOpen = function (v) {
      open = v;
      menu.hidden = !v;
      menuBtn.setAttribute('aria-expanded', String(v));
      menuBtn.textContent = v ? word('close') : word('menu');
      hdr.classList.toggle('solid', open || window.scrollY > 40);
    };
    menuBtn.addEventListener('click', function () { setOpen(!open); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    window.addEventListener('keydown', function (e) { if (open && e.key === 'Escape') setOpen(false); });
    onLang.push(function () { menuBtn.textContent = open ? word('close') : word('menu'); });

    /* The section whose top has most recently passed under the header; none
       once the form is reached, because there the button is where you are. */
    var mark = function () {
      var line = window.scrollY + hdr.offsetHeight + 150;
      var best = null, bestTop = -1;
      links.forEach(function (href) {
        var el = document.querySelector(href);
        if (el && el.offsetTop <= line && el.offsetTop > bestTop) { bestTop = el.offsetTop; best = href; }
      });
      var cta = document.getElementById('tilbud');
      if (cta && cta.offsetTop <= line) best = null;
      document.querySelectorAll('.hdr .nav a').forEach(function (a) {
        if (a.getAttribute('href') === best) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    };

    var queued = false;
    var onScroll = function () {
      hdr.classList.toggle('solid', open || window.scrollY > 40);
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () { queued = false; mark(); });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', mark);
  }

  /* ------------------------------------------------------------------
     HERO VIDEO — plays everywhere except with reduced motion or Save-Data,
     where the still carries the hero.
     ------------------------------------------------------------------ */
  var video = document.querySelector('.stage video');
  if (video) {
    var stage = video.closest('.stage');
    var saveData = navigator.connection && navigator.connection.saveData === true;
    var applyVideo = function () {
      if (saveData || reduced.matches) {
        video.removeAttribute('src');
        stage.classList.remove('video-ready');
        return;
      }
      if (!video.getAttribute('src')) {
        video.src = 'assets/hero-scrub.mp4';
        var playing = video.play();
        if (playing) playing.catch(function () { /* autoplay refused: the poster stays */ });
      }
    };
    video.addEventListener('playing', function () { stage.classList.add('video-ready'); });
    applyVideo();
    reduced.addEventListener('change', applyVideo);
  }

  /* ------------------------------------------------------------------
     PHONE HEADLINE — the words arrive frosted and settle clear.
     ------------------------------------------------------------------ */
  var blur = document.querySelector('.blur-text');
  if (blur) {
    var seen = false;
    var play = function () {
      blur.querySelectorAll('span').forEach(function (s, i) {
        var t = '.8s cubic-bezier(.23,1,.32,1) ' + (0.3 + i * 0.09) + 's';
        s.style.transition = 'opacity ' + t + ', filter ' + t + ', transform ' + t;
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            s.style.opacity = '1';
            s.style.filter = 'blur(0px)';
            s.style.transform = 'none';
          });
        });
      });
    };
    new IntersectionObserver(function (entries, io) {
      if (!entries[0].isIntersecting) return;
      seen = true;
      play();
      io.disconnect();
    }, { threshold: 0.1 }).observe(blur);
    onLang.push(function () { if (seen) play(); });
  }

  /* ------------------------------------------------------------------
     FIGURES — count up from nothing the first time they are seen. Only
     figures of 10 or more are marked to count.
     ------------------------------------------------------------------ */
  document.querySelectorAll('b').forEach(function (b) {
    if (!b.querySelector('[data-count]')) return;
    var state = 'waiting';
    var num = function () { return b.querySelector('[data-count]'); };
    // A language switch puts back the other language's copy of the figure,
    // so it is set again to wherever the count has got to.
    var sync = function () {
      var el = num();
      if (!el) return;
      if (state === 'waiting') el.textContent = '0';
      if (state === 'done') el.textContent = el.getAttribute('data-count');
    };
    sync();
    onLang.push(sync);

    new IntersectionObserver(function (entries, io) {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      state = 'running';
      var start = performance.now();
      var step = function (now) {
        var el = num();
        if (!el) { state = 'done'; return; }
        var to = Number(el.getAttribute('data-count'));
        var t = reduced.matches ? 1 : Math.min(1, (now - start) / 2200);
        el.textContent = String(Math.round(to * (1 - Math.pow(1 - t, 4))));
        if (t < 1) requestAnimationFrame(step);
        else state = 'done';
      };
      requestAnimationFrame(step);
    }).observe(b);
  });

  /* ------------------------------------------------------------------
     STEPS — the coloured thread draws itself across the three steps.
     ------------------------------------------------------------------ */
  var thread = document.querySelector('.thread');
  var threadLine = thread && thread.querySelector('line');
  if (threadLine) {
    var draw = function () {
      var r = thread.getBoundingClientRect();
      var p = Math.min(1, Math.max(0, (window.innerHeight * 0.85 - r.top) / (r.height * 0.6)));
      threadLine.style.strokeDashoffset = String(Math.round(1000 * (1 - p)));
    };
    var drawQueued = false;
    window.addEventListener('scroll', function () {
      if (drawQueued) return;
      drawQueued = true;
      requestAnimationFrame(function () { drawQueued = false; draw(); });
    }, { passive: true });
    window.addEventListener('resize', draw);
    draw();
  }

  /* ------------------------------------------------------------------
     HOLD TO LIGHT — one 0-to-1 value in the --lit variable; the stylesheet
     does the rest. Releasing eases back rather than snapping.
     ------------------------------------------------------------------ */
  var holdBtn = document.querySelector('.hold-btn');
  if (holdBtn) {
    var litEls = document.querySelectorAll('[data-lit]');
    var holdLabel = holdBtn.querySelector('span:not(.fill)');
    var level = 0, holding = false, raf = 0, last = 0;

    var paint = function () {
      var v = level.toFixed(3);
      litEls.forEach(function (el) { el.style.setProperty('--lit', v); });
      holdLabel.textContent = level >= 1 ? word('lit') : holding ? word('holding') : word('hold');
    };
    var tick = function (now) {
      var dt = Math.min(100, now - (last || now));
      last = now;
      level = Math.min(1, Math.max(0, level + (holding ? 0.00085 : -0.0014) * dt));
      paint();
      if (holding ? level < 1 : level > 0) raf = requestAnimationFrame(tick);
    };
    var setHolding = function (h) {
      if (h === holding) return;
      holding = h;
      last = 0;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
      paint();
    };

    holdBtn.addEventListener('pointerdown', function (e) { e.preventDefault(); setHolding(true); });
    // Released anywhere, not just on the button, or the film would stay on.
    window.addEventListener('pointerup', function () { setHolding(false); });
    window.addEventListener('pointercancel', function () { setHolding(false); });
    holdBtn.addEventListener('keydown', function (e) {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setHolding(true); }
    });
    holdBtn.addEventListener('keyup', function (e) {
      if (e.key === ' ' || e.key === 'Enter') setHolding(false);
    });
    holdBtn.addEventListener('blur', function () { setHolding(false); });
    onLang.push(paint);
  }

  /* ------------------------------------------------------------------
     CLEAR OR MATTE — the switch frosts the panes.
     ------------------------------------------------------------------ */
  var sw = document.querySelector('.sw');
  var klar = document.getElementById('klar');
  if (sw && klar) {
    var readout = klar.querySelector('.readout');
    var renderSwitch = function () {
      var mat = sw.getAttribute('aria-pressed') === 'true';
      klar.setAttribute('data-mat', String(mat));
      if (readout) readout.textContent = word(mat ? 'mat' : 'klar');
    };
    sw.addEventListener('click', function () {
      sw.setAttribute('aria-pressed', String(sw.getAttribute('aria-pressed') !== 'true'));
      renderSwitch();
    });
    onLang.push(renderSwitch);
  }

  /* ------------------------------------------------------------------
     THE FORM — checks name and email, then opens the reader's own mail
     program with the message filled in. Nothing is sent to a server.
     ------------------------------------------------------------------ */
  var form = document.querySelector('#tilbud form');
  if (form) {
    var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    var summary = form.querySelector('.summary');
    var sent = document.querySelector('#tilbud .sent');
    var mailLink = document.querySelector('a[href^="mailto:"]');
    var to = mailLink ? mailLink.getAttribute('href').slice(7) : '';
    var bad = [];

    var get = function (id) { var el = form.elements.namedItem(id); return el ? el.value : ''; };
    // The label's own text, without the required-field star.
    var labelOf = function (id) {
      var l = form.querySelector('label[for="f-' + id + '"]');
      return l ? l.childNodes[0].textContent.trim() : id;
    };
    var renderSummary = function () {
      var list = summary.querySelector('ul');
      list.innerHTML = '';
      bad.forEach(function (id) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#f-' + id;
        a.textContent = labelOf(id);
        li.appendChild(a);
        list.appendChild(li);
      });
      summary.classList.toggle('show', bad.length > 0);
    };

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      bad = ['name', 'email'].filter(function (id) {
        return id === 'email' ? !EMAIL.test(get('email').trim()) : get(id).trim().length < 2;
      });
      form.querySelectorAll('.field').forEach(function (f) { f.classList.remove('bad'); });
      bad.forEach(function (id) { form.querySelector('#f-' + id).closest('.field').classList.add('bad'); });
      renderSummary();
      if (bad.length) { summary.focus(); return; }

      var body = [
        labelOf('name') + ': ' + get('name'),
        labelOf('company') + ': ' + get('company'),
        labelOf('email') + ': ' + get('email'),
        labelOf('phone') + ': ' + get('phone'),
        labelOf('size') + ': ' + get('size'),
        '',
        get('message')
      ].join('\n');

      window.location.assign(
        'mailto:' + to + '?subject=' + encodeURIComponent(word('subject')) + '&body=' + encodeURIComponent(body)
      );
      if (sent) sent.classList.add('show');
      form.remove();
    });
    onLang.push(renderSummary);
  }

  /* ------------------------------------------------------------------
     START — the English, if that was the reader's choice last time, then
     the page fades in (the stylesheet holds it at 0 until then).
     ------------------------------------------------------------------ */
  if (lang() === 'en') setLang('en');
  else year();
  document.body.classList.add('lit');
})();
