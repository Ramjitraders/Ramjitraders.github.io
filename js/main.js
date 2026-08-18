/* ══════════════════════════════════════════
   RAM JI TRADERS — main.js
   nav · reveals · counters · hero particles · form
   ══════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Nav shrink on scroll ── */
  var nav = document.getElementById('siteNav');
  function onScroll() { if (nav) nav.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile menu ── */
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('mobileMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.classList.toggle('x', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        toggle.classList.remove('x');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Reveal on scroll ── */
  var rio = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); rio.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(function (el) {
    if (el.dataset.delay) el.style.transitionDelay = el.dataset.delay + 's';
    rio.observe(el);
  });

  /* ── Animated counters ── */
  var cio = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { runCount(e.target); cio.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(function (el) { cio.observe(el); });
  function runCount(el) {
    var target = +el.dataset.count, dur = 1300, t0 = null;
    function f(ts) {
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(f);
    }
    requestAnimationFrame(f);
  }

  /* ── Footer year ── */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ── Hero particles (drifting gold dust) ── */
  var cv = document.getElementById('heroParticles');
  if (cv) {
    var cx = cv.getContext('2d'), ps = [], W = 0, H = 0;
    var DPR = Math.min(window.devicePixelRatio || 1, 2);
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function rs() {
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = W * DPR; cv.height = H * DPR;
      cx.setTransform(DPR, 0, 0, DPR, 0, 0);
      init();
    }
    function init() {
      ps = [];
      var n = Math.min(90, Math.floor(W / 14));
      for (var i = 0; i < n; i++) {
        ps.push({
          x: Math.random() * W, y: Math.random() * H,
          r: Math.random() * 1.7 + 0.5,
          a: Math.random() * 0.4 + 0.12,
          sx: -(Math.random() * 0.12 + 0.04),
          sy: -(Math.random() * 0.2 + 0.06),
          tw: Math.random() * 6
        });
      }
    }
    window.addEventListener('resize', rs);
    rs();
    (function tick() {
      cx.clearRect(0, 0, W, H);
      for (var i = 0; i < ps.length; i++) {
        var p = ps[i];
        p.x += p.sx; p.y += p.sy; p.tw += 0.02;
        if (p.x < -10) p.x = W + 10;
        if (p.y < -10) p.y = H + 10;
        var a = p.a * (0.6 + 0.4 * Math.sin(p.tw));
        cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 7);
        cx.fillStyle = 'rgba(232,200,122,' + a + ')';
        cx.fill();
      }
      if (!reduced) requestAnimationFrame(tick);
    })();
  }

  /* ── Contact form → direct send via FormSubmit (lands in export.ramjitraders@gmail.com) ── */
  var form = document.getElementById('quoteForm');
  if (form) {
    // pre-select product from ?product=bitumen|epdm|both
    var qp = new URLSearchParams(window.location.search).get('product');
    if (qp) {
      var map = { bitumen: 'Bitumen Washers', epdm: 'EPDM Washers', both: 'Both — Bitumen & EPDM' };
      var sel = document.getElementById('product');
      if (map[qp] && sel) sel.value = map[qp];
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      ['name', 'email', 'product', 'message'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el && !el.value.trim()) { el.classList.add('err'); ok = false; }
        else if (el) { el.classList.remove('err'); }
      });
      if (!ok) return;

      var btn = form.querySelector('button[type="submit"]');
      var btnTxt = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = '···'; }

      var f = new FormData(form);
      var data = {
        _subject: 'Quote Request — ' + f.get('product') + ' — ' + (f.get('company') || f.get('name')),
        _template: 'table',
        _captcha: 'false',
        _honey: '',
        _replyto: f.get('email'),
        Name: f.get('name'),
        Company: f.get('company') || '—',
        Country: f.get('country') || '—',
        email: f.get('email'),
        'Phone / WhatsApp': f.get('phone') || '—',
        Product: f.get('product'),
        'Estimated Quantity': f.get('quantity') || '—',
        Message: f.get('message')
      };

      fetch('https://formsubmit.co/ajax/export.ramjitraders@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      }).then(function (r) {
        return r.json().then(function (d) {
          // FormSubmit answers HTTP 200 even when it spam-flags a message — check the real answer:
          if (!r.ok || String(d.success) !== 'true') throw new Error((d && d.message) || 'send failed');
          var note = document.getElementById('formNote');
          if (note) note.classList.add('show');
          form.reset();
          if (btn) { btn.disabled = false; btn.textContent = btnTxt; }
        });
      }).catch(function () {
        var err = document.getElementById('formError');
        if (err) err.classList.add('show');
        if (btn) { btn.disabled = false; btn.textContent = btnTxt; }
      });
    });
  }

  /* ── Dynamic bulletproof email injector (prevents scraper/obfuscation corruption) ── */
  function injectEmails() {
    document.querySelectorAll('[data-email-user]').forEach(function (el) {
      var u = el.getAttribute('data-email-user');
      var d = el.getAttribute('data-email-domain') || 'ramjitraders.com';
      var tag = el.getAttribute('data-email-tag');
      var email = u + '@' + d;
      el.setAttribute('href', 'mailto:' + email);
      if (el.classList.contains('email-auto-text') || !el.textContent.trim()) {
        el.innerHTML = email + (tag ? ' <i class="f-tag">' + tag + '</i>' : '');
      }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectEmails);
  } else {
    injectEmails();
  }

})();
