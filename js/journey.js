/* ══════════════════════════════════════════════════════════════════
   RAM JI TRADERS — journey.js
   Scroll-driven canvas animation:
   Factory (India) → Truck → Crane → Ship → Ocean → Port (Germany)
   ──────────────────────────────────────────────────────────────────
   YOUR LOGO: drop a file at  assets/logo.png  and it will appear
   on the hero container automatically (see drawContainer()).
   ══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var track = document.getElementById('journeyTrack');
  var canvas = document.getElementById('journeyCanvas');
  if (!track || !canvas) return;
  var ctx = canvas.getContext('2d');

  /* ── helpers ─────────────────────────────────────────── */
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function ss(t) { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); }
  function io(t) { t = clamp(t, 0, 1); return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
  function seg(p, a, b) { return clamp((p - a) / (b - a), 0, 1); }
  function key1(p, k) { /* [[p, v], ...] smooth */
    if (p <= k[0][0]) return k[0][1];
    for (var i = 0; i < k.length - 1; i++) {
      var a = k[i], b = k[i + 1];
      if (p <= b[0]) return lerp(a[1], b[1], ss((p - a[0]) / (b[0] - a[0])));
    }
    return k[k.length - 1][1];
  }
  function camKey(p, k) { /* [[p, subjectX, screenFrac], ...] */
    if (p <= k[0][0]) return [k[0][1], k[0][2]];
    for (var i = 0; i < k.length - 1; i++) {
      var a = k[i], b = k[i + 1];
      if (p <= b[0]) { var t = ss((p - a[0]) / (b[0] - a[0])); return [lerp(a[1], b[1], t), lerp(a[2], b[2], t)]; }
    }
    var l = k[k.length - 1]; return [l[1], l[2]];
  }
  function hexA(h) { return [parseInt(h.substr(1, 2), 16), parseInt(h.substr(3, 2), 16), parseInt(h.substr(5, 2), 16)]; }
  function mix(c1, c2, t) {
    var a = hexA(c1), b = hexA(c2);
    return 'rgb(' + Math.round(lerp(a[0], b[0], t)) + ',' + Math.round(lerp(a[1], b[1], t)) + ',' + Math.round(lerp(a[2], b[2], t)) + ')';
  }
  function skyAt(p, arr) {
    if (p <= arr[0][0]) return [arr[0][1], arr[0][2]];
    for (var i = 0; i < arr.length - 1; i++) {
      var a = arr[i], b = arr[i + 1];
      if (p <= b[0]) { var t = (p - a[0]) / (b[0] - a[0]); return [mix(a[1], b[1], t), mix(a[2], b[2], t)]; }
    }
    var l = arr[arr.length - 1]; return [l[1], l[2]];
  }
  function rrect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  /* ── world constants ─────────────────────────────────── */
  var REF_H = 900, GROUND = 640, WATER = 648;
  var PIER1 = 1880, LAND2 = 5200, WORLD_R = 6950;
  var SHIP_LEN = 1350, SHIP_BERTH = 2150, SHIP_FINAL = 3760;

  var SKY = [
    [0.00, '#060a16', '#101a33'],
    [0.18, '#0a1226', '#1a2a4a'],
    [0.50, '#0e1f42', '#2a4a72'],
    [0.80, '#15234c', '#3c3a63'],
    [1.00, '#1b2350', '#7a4f35']
  ];
  var SUN = [
    [0.00, '#e9b96a'], [0.50, '#f6ead0'], [1.00, '#f09a52']
  ];
  var TRUCK_X = [
    [0, -700], [0.10, -700], [0.165, 600], [0.24, 600],
    [0.42, 1180], [0.545, 1180], [0.62, -700], [1, -700]
  ];
  var CAM = [
    [0, 430, 0.50], [0.10, 430, 0.50], [0.16, 830, 0.50], [0.20, 830, 0.50],
    [0.40, 1400, 0.47], [0.46, 1750, 0.50], [0.52, 2150, 0.50],
    [0.60, 3000, 0.46], [0.80, 4450, 0.45], [0.87, 5300, 0.50], [1, 5300, 0.50]
  ];
  var TROL1 = [
    [0.42, 1900], [0.435, 1440], [0.47, 1440], [0.50, 2480],
    [0.55, 1700], [1, 1700]
  ];
  var TROL2 = [
    [0.79, 5050], [0.83, 4090], [0.86, 4090], [0.895, 5520],
    [0.93, 5520], [0.97, 5050], [1, 5050]
  ];

  /* ── logo (drop assets/logo.png — appears on the container) ── */
  var logoImg = null, logoTried = false;
  (function () {
    var img = new Image();
    img.onload = function () { logoImg = img; needsDraw = true; };
    img.src = 'assets/logo.png';
    logoTried = true;
  })();

  /* ── canvas sizing ───────────────────────────────────── */
  var W = 0, H = 0, DPR = Math.min(window.devicePixelRatio || 1, 2), S = 1, VW = 1600;
  var stars = [];
  function resize() {
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * DPR; canvas.height = H * DPR;
    S = H / REF_H; VW = W / S;
    stars = [];
    for (var i = 0; i < 70; i++) stars.push({ x: Math.random(), y: Math.random() * 0.55, r: Math.random() * 1.5 + 0.4, p: Math.random() * 7 });
    needsDraw = true;
  }
  window.addEventListener('resize', resize);
  resize();

  /* ── progress tracking ───────────────────────────────── */
  var progress = 0, targetP = 0, needsDraw = true;
  function measure() {
    var r = track.getBoundingClientRect();
    var total = r.height - window.innerHeight;
    targetP = clamp(-r.top / total, 0, 1);
  }
  window.addEventListener('scroll', measure, { passive: true });
  window.addEventListener('resize', measure);
  measure();

  /* ── scene state ─────────────────────────────────────── */
  function stateAt(p) {
    var truckX = key1(p, TRUCK_X);
    var shipX = lerp(SHIP_BERTH, SHIP_FINAL, io(seg(p, 0.55, 0.80)));
    var bob = Math.sin(p * 90) * 1.2 + seg(p, 0.55, 0.72) * Math.sin(p * 160) * 1.4;

    var cx, cy, carry = 0, crane = 0;
    if (p < 0.18)          { cx = 740; cy = GROUND - 96; }
    else if (p < 0.24)     { var t = io(seg(p, 0.18, 0.24)); cx = lerp(740, 860, t); cy = lerp(GROUND - 96, GROUND - 146, t) - Math.sin(t * Math.PI) * 26; }
    else if (p < 0.44)     { cx = truckX + 260; cy = GROUND - 146; }
    else if (p < 0.47)     { cx = 1440; cy = lerp(GROUND - 146, 250, io(seg(p, 0.44, 0.47))); carry = 1; crane = 1; }
    else if (p < 0.50)     { cx = lerp(1440, 2480, io(seg(p, 0.47, 0.50))); cy = 250; carry = 1; crane = 1; }
    else if (p < 0.53)     { cx = 2480; cy = lerp(250, 460, io(seg(p, 0.50, 0.53))); carry = 1; crane = 1; }
    else if (p < 0.83)     { cx = shipX + 330; cy = 460 + bob; }
    else if (p < 0.86)     { cx = 4090; cy = lerp(460 + bob, 260, io(seg(p, 0.83, 0.86))); carry = 1; crane = 2; }
    else if (p < 0.895)    { cx = lerp(4090, 5520, io(seg(p, 0.86, 0.895))); cy = 260; carry = 1; crane = 2; }
    else if (p < 0.93)     { cx = 5520; cy = lerp(260, GROUND - 146, io(seg(p, 0.895, 0.93))); carry = 1; crane = 2; }
    else                   { cx = 5520; cy = GROUND - 146; }

    return {
      truckX: truckX, shipX: shipX, bob: bob, flip: p >= 0.545,
      cx: cx, cy: cy, carry: carry, crane: crane,
      trol1: key1(p, TROL1), trol2: key1(p, TROL2),
      foam: seg(p, 0.56, 0.60) * (1 - seg(p, 0.78, 0.82))
    };
  }

  /* ── drawing: shared parts ───────────────────────────── */
  function drawWheel(wx, wy, r, refX) {
    ctx.fillStyle = '#05080f';
    ctx.beginPath(); ctx.arc(wx, wy, r, 0, 7); ctx.fill();
    ctx.strokeStyle = '#26314b'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(wx, wy, r - 3, 0, 7); ctx.stroke();
    ctx.fillStyle = '#39466a';
    ctx.beginPath(); ctx.arc(wx, wy, 5, 0, 7); ctx.fill();
    ctx.strokeStyle = 'rgba(140,160,200,.5)'; ctx.lineWidth = 2;
    var a = refX / r;
    for (var i = 0; i < 3; i++) {
      var t = a + i * Math.PI * 2 / 3;
      ctx.beginPath(); ctx.moveTo(wx, wy);
      ctx.lineTo(wx + Math.cos(t) * (r - 5), wy + Math.sin(t) * (r - 5)); ctx.stroke();
    }
  }

  function drawTruck(fx, cabColor, refX, flip) {
    ctx.save();
    if (flip) { ctx.translate(2 * (fx + 195), 0); ctx.scale(-1, 1); }  // turn cab around → drives OFF forwards
    var gy = GROUND, bedY = gy - 50, trailX = fx + 130;
    ctx.fillStyle = '#0b101d'; ctx.fillRect(fx + 4, gy - 14, 372, 10);       // chassis
    ctx.fillStyle = '#1a2438'; ctx.fillRect(trailX, bedY, 262, 14);          // trailer bed
    ctx.fillStyle = '#141d30'; ctx.fillRect(trailX, gy - 36, 262, 4);
    ctx.fillStyle = cabColor;                                                // cab
    rrect(fx, gy - 118, 112, 104, 10); ctx.fill();
    ctx.fillStyle = 'rgba(190,210,235,.28)';                                 // windshield
    ctx.beginPath();
    ctx.moveTo(fx + 10, gy - 112); ctx.lineTo(fx + 66, gy - 112);
    ctx.lineTo(fx + 82, gy - 86); ctx.lineTo(fx + 10, gy - 86);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#0e1524'; ctx.fillRect(fx - 2, gy - 56, 10, 42);        // grille
    ctx.fillStyle = '#e8c87a'; ctx.fillRect(fx - 4, gy - 48, 6, 10);         // headlight
    ctx.fillStyle = '#0d1424'; rrect(fx + 116, gy - 40, 16, 26, 4); ctx.fill();
    drawWheel(fx + 34, gy - 20, 20, refX);
    drawWheel(fx + 92, gy - 20, 20, refX);
    drawWheel(trailX + 52, gy - 20, 20, refX);
    drawWheel(trailX + 210, gy - 20, 20, refX);
    ctx.restore();
  }

  function drawContainer(cx, topY, w, h, color, hero) {
    var x = cx - w / 2;
    ctx.fillStyle = color; ctx.fillRect(x, topY, w, h);
    ctx.strokeStyle = 'rgba(0,0,0,.45)'; ctx.lineWidth = 3;
    ctx.strokeRect(x + 1.5, topY + 1.5, w - 3, h - 3);
    ctx.strokeStyle = 'rgba(0,0,0,.26)'; ctx.lineWidth = 2;
    for (var i = 1; i < w / 16; i++) {
      var lx = x + i * 16;
      ctx.beginPath(); ctx.moveTo(lx, topY + 4); ctx.lineTo(lx, topY + h - 4); ctx.stroke();
    }
    ctx.fillStyle = 'rgba(0,0,0,.5)';
    [[x + 3, topY + 3], [x + w - 11, topY + 3], [x + 3, topY + h - 11], [x + w - 11, topY + h - 11]]
      .forEach(function (c) { ctx.fillRect(c[0], c[1], 8, 8); });

    if (hero) {
      /* ═══ LOGO SPACE ═══ your brand rides the container (assets/logo.png) */
      var pw = w * 0.64, ph = h * 0.60, px = cx - pw / 2, py = topY + h / 2 - ph / 2;
      ctx.fillStyle = '#efe6d2';
      rrect(px, py, pw, ph, 6); ctx.fill();
      if (logoImg) {
        var ir = logoImg.width / logoImg.height, pr = pw / ph, dw, dh;
        if (ir > pr) { dw = pw * 0.9; dh = dw / ir; } else { dh = ph * 0.84; dw = dh * ir; }
        ctx.drawImage(logoImg, cx - dw / 2, topY + h / 2 - dh / 2, dw, dh);
      } else {
        ctx.strokeStyle = 'rgba(20,26,40,.65)';
        ctx.setLineDash([5, 4]); ctx.lineWidth = 1.6;
        rrect(px + 4, py + 4, pw - 8, ph - 8, 4); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#28324a';
        ctx.font = '700 ' + Math.max(10, h * 0.15) + 'px Inter, sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('YOUR LOGO', cx, topY + h / 2);
      }
    }
  }

  function drawCraneBack(legsX, beamX0, beamX1, beamY) {
    ctx.fillStyle = '#0f1626';
    legsX.forEach(function (lx) { ctx.fillRect(lx, beamY, 36, GROUND - beamY); });
    ctx.strokeStyle = 'rgba(212,169,78,.16)'; ctx.lineWidth = 2;
    ctx.beginPath();
    for (var i = 0; i < legsX.length - 1; i++) {
      ctx.moveTo(legsX[i], GROUND); ctx.lineTo(legsX[i + 1] + 36, beamY + 30);
      ctx.moveTo(legsX[i + 1] + 36, GROUND); ctx.lineTo(legsX[i], beamY + 30);
    }
    ctx.stroke();
    ctx.fillStyle = '#131d33'; ctx.fillRect(beamX0, beamY, beamX1 - beamX0, 26);
    ctx.fillStyle = 'rgba(212,169,78,.25)'; ctx.fillRect(beamX0, beamY, beamX1 - beamX0, 3);
    /* A-frame */
    var apexX = (legsX[0] + legsX[legsX.length - 1] + 36) / 2;
    ctx.strokeStyle = '#1c2740'; ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(legsX[0] + 18, beamY); ctx.lineTo(apexX, beamY - 90);
    ctx.lineTo(legsX[legsX.length - 1] + 18, beamY); ctx.stroke();
    ctx.strokeStyle = 'rgba(212,169,78,.3)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(apexX, beamY - 90); ctx.lineTo(beamX1 - 60, beamY + 4); ctx.stroke();
  }

  function drawCraneTop(trolley, beamY) {
    ctx.fillStyle = '#d4a94e';
    ctx.fillRect(trolley - 26, beamY + 4, 52, 16);
    ctx.fillStyle = '#8a6a2e';
    ctx.fillRect(trolley - 8, beamY + 20, 16, 8);
  }

  function drawHookLine(trolley, beamY, cx, topY) {
    ctx.strokeStyle = 'rgba(212,169,78,.65)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(trolley, beamY + 28); ctx.lineTo(cx, topY); ctx.stroke();
    ctx.fillStyle = '#8a6a2e'; ctx.fillRect(cx - 18, topY - 8, 36, 8);
  }

  function drawShip(s, bob, p, foam) {
    var top = 556 + bob;
    /* hull */
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(s + 6, top);
    ctx.lineTo(s + SHIP_LEN - 70, top);
    ctx.quadraticCurveTo(s + SHIP_LEN + 10, top + 8, s + SHIP_LEN + 34, top + 66);
    ctx.lineTo(s + SHIP_LEN - 24, 706);
    ctx.lineTo(s + 60, 702);
    ctx.quadraticCurveTo(s + 6, 690, s - 4, top + 60);
    ctx.closePath();
    ctx.fillStyle = '#131c30'; ctx.fill();
    ctx.strokeStyle = '#0a0f1d'; ctx.lineWidth = 3; ctx.stroke();
    /* gold boot stripe at waterline */
    ctx.save(); ctx.clip();
    ctx.fillStyle = 'rgba(212,169,78,.85)';
    ctx.fillRect(s - 10, 644 + bob, SHIP_LEN + 70, 6);
    ctx.restore();
    ctx.restore();

    /* deck container stacks */
    var cols = ['#324560', '#4a3b33', '#2f4a3f', '#51442f', '#3c3a55'];
    var i, x;
    for (i = 0; i < 5; i++) {
      x = s + 480 + i * 148;
      drawContainer(x + 70, top - 58, 140, 54, cols[i], false);
    }
    for (i = 0; i < 4; i++) {
      x = s + 480 + i * 148;
      drawContainer(x + 70, top - 112, 140, 54, cols[(i + 2) % 5], false);
    }

    /* superstructure (stern castle) */
    ctx.fillStyle = '#0e1626';
    ctx.fillRect(s + 40, top - 186, 150, 186);
    ctx.strokeStyle = '#1f2b47'; ctx.lineWidth = 3;
    ctx.strokeRect(s + 40, top - 186, 150, 186);
    ctx.fillStyle = 'rgba(232,200,122,.55)';
    for (i = 0; i < 3; i++) ctx.fillRect(s + 58 + i * 42, top - 160, 26, 7);
    ctx.fillStyle = 'rgba(232,200,122,.35)';
    for (i = 0; i < 3; i++) ctx.fillRect(s + 58 + i * 42, top - 138, 26, 7);
    /* mast + pennant */
    ctx.strokeStyle = '#1f2b47'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(s + 115, top - 186); ctx.lineTo(s + 115, top - 236); ctx.stroke();
    ctx.fillStyle = '#d4a94e';
    ctx.beginPath();
    ctx.moveTo(s + 115, top - 236);
    ctx.lineTo(s + 115 + 26 + Math.sin(p * 40) * 4, top - 228);
    ctx.lineTo(s + 115, top - 220);
    ctx.closePath(); ctx.fill();

    /* hull name */
    ctx.fillStyle = 'rgba(232,200,122,.75)';
    ctx.font = '600 21px "Playfair Display", Georgia, serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    ctx.fillText('M V   R A M   J I', s + SHIP_LEN - 280, top + 44);

    /* bow foam while sailing */
    if (foam > 0.01) {
      var wb = s + SHIP_LEN + 30;
      ctx.strokeStyle = 'rgba(240,246,255,' + (0.5 * foam) + ')';
      ctx.lineWidth = 4;
      for (i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(wb - i * 4, 654, (18 + i * 16 + Math.sin(p * 50 + i) * 6) * foam, 0.3, Math.PI - 0.6);
        ctx.stroke();
      }
      ctx.strokeStyle = 'rgba(240,246,255,' + (0.22 * foam) + ')';
      ctx.beginPath();
      ctx.moveTo(s - 8, 656); ctx.lineTo(s - 150 * foam, 662 + Math.sin(p * 44) * 4); ctx.stroke();
    }
  }

  function drawWater(p, camX, front) {
    var x0 = camX - 80, x1 = camX + VW + 80, x, y;
    ctx.beginPath();
    if (!front) {
      y = WATER + 3;
      ctx.moveTo(Math.max(x0, PIER1), 1000);
      ctx.lineTo(Math.max(x0, PIER1), y);
      for (x = Math.max(x0, PIER1); x <= Math.min(x1, LAND2); x += 18) {
        ctx.lineTo(x, y + Math.sin(x * 0.02 + p * 40) * 3.5);
      }
      ctx.lineTo(Math.min(x1, LAND2), 1000);
      ctx.closePath();
      ctx.fillStyle = '#0c1626'; ctx.fill();
    } else {
      y = WATER + 9;
      ctx.moveTo(Math.max(x0, PIER1), 1000);
      ctx.lineTo(Math.max(x0, PIER1), y);
      for (x = Math.max(x0, PIER1); x <= Math.min(x1, LAND2); x += 14) {
        ctx.lineTo(x, y + Math.sin(x * 0.016 - p * 57) * 4.5);
      }
      ctx.lineTo(Math.min(x1, LAND2), 1000);
      ctx.closePath();
      var g = ctx.createLinearGradient(0, y - 6, 0, 780);
      g.addColorStop(0, 'rgba(14,26,48,.92)');
      g.addColorStop(1, 'rgba(8,13,26,.98)');
      ctx.fillStyle = g; ctx.fill();
    }
  }

  /* ── full render ─────────────────────────────────────── */
  function render(p) {
    var st = stateAt(p);
    var ck = camKey(p, CAM);
    var camX = clamp(ck[0] - VW * ck[1], -320, WORLD_R - VW + 320);

    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.clearRect(0, 0, W, H);

    /* sky */
    var sky = skyAt(p, SKY);
    var g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, sky[0]);
    g.addColorStop(1, sky[1]);
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

    /* stars (fade after dawn) */
    var starA = (1 - seg(p, 0.03, 0.13)) * 0.85;
    if (starA > 0.01) {
      for (var i = 0; i < stars.length; i++) {
        var stt = stars[i];
        ctx.fillStyle = 'rgba(240,240,255,' + (starA * (0.4 + 0.6 * Math.abs(Math.sin(stt.p + p * 8)))) + ')';
        ctx.fillRect(stt.x * W, stt.y * H, stt.r, stt.r);
      }
    }

    /* sun (screen space) */
    var sunP = Math.min(1, p * 1.05);
    var sx = W * lerp(0.16, 0.84, p);
    var sy = H * (0.62 - 0.46 * Math.sin(Math.PI * sunP));
    var sc = p < 0.5 ? mix(SUN[0][1], SUN[1][1], p / 0.5) : mix(SUN[1][1], SUN[2][1], (p - 0.5) / 0.5);
    var gr = ctx.createRadialGradient(sx, sy, 0, sx, sy, 200);
    gr.addColorStop(0, sc.replace('rgb', 'rgba').replace(')', ',.30)'));
    gr.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gr;
    ctx.fillRect(sx - 200, sy - 200, 400, 400);
    ctx.fillStyle = sc;
    ctx.beginPath(); ctx.arc(sx, sy, 42, 0, 7); ctx.fill();

    /* world space */
    ctx.save();
    ctx.scale(S, S);
    ctx.translate(-camX, 0);

    /* clouds (parallax 0.18) */
    ctx.fillStyle = 'rgba(201,212,234,.05)';
    [300, 1200, 2700, 4300, 5800].forEach(function (wx, i2) {
      var dx = wx + camX * 0.18;
      ctx.beginPath();
      ctx.ellipse(dx, 130 + (i2 % 3) * 44, 130, 15, 0, 0, 7);
      ctx.fill();
    });

    /* distant silhouettes (parallax 0.5) */
    ctx.fillStyle = '#0b1224';
    for (var wx2 = -1200; wx2 < 7600; wx2 += 620) {
      var ddx = wx2 + camX * 0.5;
      if ((wx2 / 620) % 2 === 0) {
        ctx.fillRect(ddx, 430, 14, 210);
        ctx.fillRect(ddx + 100, 430, 14, 210);
        ctx.fillRect(ddx - 34, 414, 196, 16);
      } else {
        ctx.fillRect(ddx, 480, 100, 160);
        ctx.fillRect(ddx + 118, 446, 58, 194);
      }
    }

    /* land masses */
    ctx.fillStyle = '#0c1322';
    ctx.fillRect(-900, GROUND, PIER1 + 900, 1000 - GROUND);
    ctx.fillRect(LAND2, GROUND, WORLD_R - LAND2, 1000 - GROUND);
    ctx.fillStyle = '#1d2946';
    ctx.fillRect(-900, GROUND, PIER1 + 900, 6);
    ctx.fillRect(LAND2, GROUND, WORLD_R - LAND2, 6);

    /* road dashes */
    ctx.fillStyle = 'rgba(232,200,122,.07)';
    for (var dx2 = -800; dx2 < PIER1 - 60; dx2 += 66) ctx.fillRect(dx2, 666, 30, 3);

    /* ghost nation labels */
    ctx.fillStyle = 'rgba(232,236,255,.045)';
    ctx.font = '800 140px Inter, sans-serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    ctx.fillText('INDIA', 150, 850);
    ctx.fillText('EUROPE', 5310, 850);

    /* ═─ FACTORY (India) ─ */
    ctx.fillStyle = '#0f1728';
    ctx.fillRect(90, GROUND - 250, 470, 250);
    ctx.strokeStyle = '#232f4d'; ctx.lineWidth = 3;
    ctx.strokeRect(90, GROUND - 250, 470, 250);
    ctx.fillStyle = '#131e35';
    ctx.fillRect(90, GROUND - 262, 470, 14);                     // parapet
    ctx.fillStyle = '#0f1728';                                    // chimney
    ctx.fillRect(500, GROUND - 330, 36, 330);
    ctx.strokeRect(500, GROUND - 330, 36, 330);
    /* smoke (scroll-driven) */
    for (i = 0; i < 3; i++) {
      var rise = (p * 420 + i * 80) % 220;
      ctx.fillStyle = 'rgba(170,180,204,' + (0.10 * (1 - rise / 220)) + ')';
      ctx.beginPath();
      ctx.arc(518 + Math.sin(p * 30 + i * 2) * 14 - rise * 0.25, GROUND - 340 - rise, 9 + rise * 0.05, 0, 7);
      ctx.fill();
    }
    /* lit windows */
    for (i = 0; i < 6; i++) {
      ctx.fillStyle = 'rgba(232,200,122,' + (0.15 + 0.05 * Math.sin(p * 20 + i * 2.1)) + ')';
      ctx.fillRect(112 + i * 62, GROUND - 208, 30, 26);
    }
    /* door */
    ctx.fillStyle = '#070c16';
    ctx.fillRect(300, GROUND - 110, 100, 110);
    ctx.strokeStyle = 'rgba(212,169,78,.3)'; ctx.lineWidth = 2;
    ctx.strokeRect(300, GROUND - 110, 100, 110);
    /* factory sign — it is a PARTNER factory, not ours */
    ctx.fillStyle = 'rgba(212,169,78,.85)';
    ctx.font = '700 26px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('P A R T N E R   F A C T O R Y', 325, GROUND - 176);
    ctx.fillStyle = 'rgba(232,236,255,.4)';
    ctx.font = '500 11px Inter, sans-serif';
    ctx.fillText('RAM JI TRADERS · GLOBAL SOURCING PARTNER', 325, GROUND - 156);
    /* Indian flag */
    ctx.strokeStyle = '#2a3550'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(60, GROUND); ctx.lineTo(60, GROUND - 276); ctx.stroke();
    var fy = GROUND - 272;
    ctx.fillStyle = '#d88b3a'; ctx.fillRect(62, fy, 56, 12);
    ctx.fillStyle = '#dcdcdc'; ctx.fillRect(62, fy + 12, 56, 12);
    ctx.fillStyle = '#3f7a4a'; ctx.fillRect(62, fy + 24, 56, 12);
    ctx.fillStyle = '#2a3f8f'; ctx.beginPath(); ctx.arc(90, fy + 18, 4, 0, 7); ctx.fill();

    /* static containers by factory */
    drawContainer(950, GROUND - 58, 140, 54, '#324560', false);
    drawContainer(950, GROUND - 112, 140, 54, '#4a3b33', false);

    /* ═─ GERMAN PORT (destination) ─ */
    /* skyline */
    ctx.fillStyle = '#0c1322';
    ctx.fillRect(6060, 460, 120, 180);
    ctx.fillRect(6210, 420, 70, 220);
    ctx.fillRect(6160, 300, 4, 250);                              // TV mast
    ctx.beginPath(); ctx.arc(6162, 320, 24, 0, 7); ctx.fill();
    /* port yard stacks */
    drawContainer(5850, GROUND - 58, 140, 54, 'rgba(50,69,96,.9)', false);
    drawContainer(5850, GROUND - 112, 140, 54, 'rgba(60,58,85,.9)', false);
    drawContainer(6010, GROUND - 58, 140, 54, 'rgba(47,74,63,.9)', false);
    /* EU flag (blue, circle of 12 gold stars) */
    ctx.strokeStyle = '#2a3550'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(5700, GROUND); ctx.lineTo(5700, GROUND - 258); ctx.stroke();
    var efx = 5702, efy = GROUND - 254, efw = 56, efh = 38;
    ctx.fillStyle = '#1f3a93'; ctx.fillRect(efx, efy, efw, efh);
    ctx.fillStyle = '#f2c14e';
    for (var ei = 0; ei < 12; ei++) {
      var ea = ei * Math.PI / 6 - Math.PI / 2;
      var ex = efx + efw / 2 + Math.cos(ea) * 11, ey = efy + efh / 2 + Math.sin(ea) * 11;
      ctx.beginPath();
      for (var ek = 0; ek < 10; ek++) {
        var er = ek % 2 ? 1.1 : 2.7, eaa = -Math.PI / 2 + ek * Math.PI / 5;
        if (ek) ctx.lineTo(ex + Math.cos(eaa) * er, ey + Math.sin(eaa) * er);
        else ctx.moveTo(ex + Math.cos(eaa) * er, ey + Math.sin(eaa) * er);
      }
      ctx.closePath(); ctx.fill();
    }
    /* pier-edge lamp */
    ctx.strokeStyle = '#2a3550'; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(5236, GROUND); ctx.lineTo(5236, GROUND - 150); ctx.stroke();
    ctx.fillStyle = 'rgba(232,200,122,.85)';
    ctx.beginPath(); ctx.arc(5236, GROUND - 156, 6, 0, 7); ctx.fill();
    ctx.fillStyle = 'rgba(232,200,122,.12)';
    ctx.beginPath(); ctx.arc(5236, GROUND - 156, 22, 0, 7); ctx.fill();

    /* ═─ cranes (structure behind) ─ */
    drawCraneBack([1620, 2060], 1560, 2560, 240);
    drawCraneBack([5220, 5440], 4020, 5600, 240);

    /* ═─ water (back layer) ─ */
    drawWater(p, camX, false);

    /* ═─ ship ─ */
    drawShip(st.shipX, st.bob, p, st.foam);

    /* ═─ water (front layer masks hull bottom) ─ */
    drawWater(p, camX, true);

    /* ═─ trucks ─ */
    drawTruck(st.truckX, '#1b2b45', st.truckX, st.flip); // export truck (turns & drives off forwards)
    drawTruck(5260, '#233148', 5260, false);              // EU delivery truck (parked)

    /* ═─ hero container ─ */
    drawContainer(st.cx, st.cy, 200, 96, '#22365c', true);

    /* ═─ crane trolleys + hook lines ─ */
    if (st.carry && st.crane === 1) drawHookLine(st.trol1, 240, st.cx, st.cy);
    if (st.carry && st.crane === 2) drawHookLine(st.trol2, 240, st.cx, st.cy);
    drawCraneTop(st.trol1, 240);
    drawCraneTop(st.trol2, 240);

    /* ═─ birds over the ocean ─ */
    if (p > 0.56 && p < 0.84) {
      var ba = Math.sin(seg(p, 0.56, 0.84) * Math.PI);
      ctx.strokeStyle = 'rgba(220,228,244,' + (0.5 * ba) + ')';
      ctx.lineWidth = 2.5;
      for (i = 0; i < 3; i++) {
        var bx = camX + VW * (0.25 + i * 0.17);
        var by = 165 + i * 28 + Math.sin(p * 40 + i * 2) * 12;
        ctx.beginPath();
        ctx.moveTo(bx - 12, by);
        ctx.quadraticCurveTo(bx - 4, by - 8, bx, by);
        ctx.quadraticCurveTo(bx + 4, by - 8, bx + 12, by);
        ctx.stroke();
      }
    }

    ctx.restore();

    /* vignette */
    var vg = ctx.createRadialGradient(W / 2, H * 0.46, Math.min(W, H) * 0.3, W / 2, H * 0.5, Math.max(W, H) * 0.78);
    vg.addColorStop(0, 'rgba(4,6,12,0)');
    vg.addColorStop(1, 'rgba(4,6,12,.52)');
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, W, H);
  }

  /* ── UI overlays (DOM) ───────────────────────────────── */
  var ui = {
    bar: document.getElementById('journeyBar'),
    cap: document.getElementById('jCaption'),
    bl: document.getElementById('jBadgeL'),
    br: document.getElementById('jBadgeR'),
    txl: document.getElementById('jTextL'),
    txr: document.getElementById('jTextR'),
    icl: document.getElementById('jIcoL'),
    icr: document.getElementById('jIcoR'),
    fin: document.getElementById('jFinal'),
    hint: document.getElementById('jHint'),
    chapters: document.querySelectorAll('#jChapters .jc')
  };

  var I = function (inner) { return '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d4a94e" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + inner + '</svg>'; };
  var ICO = {
    shield: I('<path d="M12 3l7 3v5c0 4.4-3 8.2-7 9-4-.8-7-4.6-7-9V6l7-3z"/><path d="M9 12l2 2 4-4.5"/>'),
    tag: I('<path d="M4 4h7l9 9-7 7-9-9V4z"/><circle cx="8.5" cy="8.5" r="1.4"/>'),
    rule: I('<path d="M3 9h18v6H3z"/><path d="M7 9v3M11 9v3M15 9v3"/>'),
    truck: I('<path d="M2 6h11v10H2z"/><path d="M13 9h5l4 4v3h-9"/><circle cx="6" cy="18.5" r="1.6"/><circle cx="17" cy="18.5" r="1.6"/>'),
    file: I('<path d="M7 3h7l4 4v14H7V3z"/><path d="M14 3v4h4"/><path d="M10 12h5M10 16h5"/>'),
    anchor: I('<circle cx="12" cy="5" r="2.5"/><path d="M12 8v12M5 13c0 5 3 8 7 8s7-3 7-8M5 13h3M16 13h3"/>'),
    clock: I('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>'),
    globe: I('<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.8 2.6 2.8 15.4 0 18M12 3c-2.8 2.6-2.8 15.4 0 18"/>'),
    flag: I('<path d="M5 21V4"/><path d="M5 5h12l-3 4 3 4H5"/>')
  };

  /* ── bilingual scene copy (switches live on 'langchange') ── */
  var LANG = 'en';
  try { LANG = localStorage.getItem('rjt-lang') || 'en'; } catch (e) {}

  var CAPTIONS = {
    en: ['01 · Origin — Partner Factory, India',
         '02 · Inland Haulage — Loaded & Rolling to Port',
         '03 · Port of Loading — Nhava Sheva, India',
         '04 · Ocean Freight — India → Europe',
         '05 · Arrival — European Port of Entry',
         'India → Europe · Door to Dock'],
    de: ['01 · Ursprung — Partnerwerk, Indien',
         '02 · Landtransport — Beladen & unterwegs zum Hafen',
         '03 · Ladehafen — Nhava Sheva, Indien',
         '04 · Seefracht — Indien → Europa',
         '05 · Ankunft — Europäischer Einfuhrhafen',
         'Indien → Europa · Von der Tür bis zum Dock']
  };
  var BL = {
    en: ['ISO & BIS-Certified Partners', 'MOQ from 10,000 Units', 'Full Export Docs · COO · BL · CI · PL', 'FCL & LCL Sea Freight', '2 Years On the Ground in Germany', ''],
    de: ['ISO- & BIS-zertifizierte Partner', 'Abnahme ab 10.000 Stk.', 'Alle Exportpapiere · COO · B/L · CI · PL', 'Seefracht als FCL & LCL', '2 Jahre vor Ort in Deutschland', '']
  };
  var BR = {
    en: ['Global Sourcing Partner', 'Custom Sizes & Branding', 'Port Handling — Export Cleared', '7–14 Day Dispatch Lead Time', 'European Business Mindset', ''],
    de: ['Globaler Sourcing-Partner', 'Sondermaße & Eigenmarke', 'Hafenabfertigung — Export abgewickelt', '7–14 Tage Versandzeit', 'Europäische Geschäftsdenkweise', '']
  };
  var IL = [ICO.shield, ICO.rule, ICO.file, ICO.ship || ICO.anchor, ICO.globe, ''];
  var IR = [ICO.tag, ICO.truck, ICO.anchor, ICO.clock, ICO.flag, ''];
  IL[3] = ICO.anchor;

  window.addEventListener('langchange', function (e) {
    LANG = e.detail || 'en';
    curScene = -1; needsDraw = true; updateUI(progress);
  });

  function sceneOf(p) {
    if (p < 0.16) return 0;
    if (p < 0.44) return 1;
    if (p < 0.56) return 2;
    if (p < 0.81) return 3;
    if (p < 0.93) return 4;
    return 5;
  }

  var curScene = -1;
  function updateUI(p) {
    if (ui.bar) ui.bar.style.width = (p * 100).toFixed(2) + '%';
    var s = sceneOf(p);
    if (s !== curScene) {
      curScene = s;
      var caps = CAPTIONS[LANG] || CAPTIONS.en;
      var bl = BL[LANG] || BL.en, br = BR[LANG] || BR.en;
      if (ui.cap) { ui.cap.textContent = caps[s]; ui.cap.classList.add('on'); }
      if (ui.txl) {
        if (bl[s]) {
          ui.txl.textContent = bl[s]; ui.icl.innerHTML = IL[s];
          ui.txr.textContent = br[s]; ui.icr.innerHTML = IR[s];
          ui.bl.classList.add('on'); ui.br.classList.add('on');
        } else {
          ui.bl.classList.remove('on'); ui.br.classList.remove('on');
        }
      }
      ui.chapters.forEach(function (c, i) { c.classList.toggle('on', i === Math.min(s, 4)); });
    }
    if (ui.fin) ui.fin.classList.toggle('on', p > 0.935);
    if (ui.hint) ui.hint.classList.toggle('off', p > 0.035);
  }

  /* ── main loop ───────────────────────────────────────── */
  function frame() {
    var d = targetP - progress;
    if (Math.abs(d) > 0.0004) { progress += d * 0.14; needsDraw = true; }
    if (needsDraw) { render(progress); updateUI(progress); needsDraw = false; }
    requestAnimationFrame(frame);
  }
  render(0); updateUI(0);
  requestAnimationFrame(frame);
})();
