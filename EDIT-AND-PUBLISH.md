# Ram ji Traders — Website Guide (Edit & Publish)

Plain HTML/CSS/JS — no frameworks, no build tools. Any text editor works.
Recommended: **VS Code** (free, code.visualstudio.com).
Editing trick: open the whole folder in VS Code, then use
**Edit → Find in Files (Ctrl+Shift+F)** to search & replace across all files at once.

```
ramjitraders-site/
├── index.html                      ← homepage (hero, journey animation, products, about)
├── contact.html                    ← quote / contact form page
├── Ramji-Traders-Product-Brochure.pdf ← the catalogue (download buttons point here)
├── css/style.css                   ← ALL styling (colors, fonts, spacing)
├── js/i18n.js                      ← ALL TEXT in English + German  ⭐ most important file
├── js/main.js                      ← nav, counters, particles, form logic
├── js/journey.js                   ← the truck→ship scroll animation
└── assets/
    ├── logo.png                    ← your logo (header, footer, container in animation)
    ├── logo-tile.png               ← browser tab icon (favicon)
    └── products/
        ├── bitumen/  (5 photos)    ← bitumen-hero / -single / -flake / -macro / -application .jpg
        └── epdm/     (3 photos)    ← epdm-group / -single / -screws .jpg
```

---

## ✏️ PART 1 — EDITING THINGS LATER

### ⭐ Rule #1: text lives in TWO places (because the site is bilingual)

Every visible text exists **both** in `index.html` / `contact.html` (as the default)
**and** in `js/i18n.js` (English block at the top = `'en'`, German block below = `'de'`).

**When you change a sentence, change it in both places:**
1. In the HTML file (between the tags), and
2. In `js/i18n.js` — find the same text with Ctrl+Shift+F, edit the English line
   AND its German equivalent below it.

> If you change only the HTML, the German/English switcher will overwrite your
> change with the old text from i18n.js. That's the #1 trap.

### ➕ Adding a NEW PRODUCT

1. **Photos:** make a folder `assets/products/newproduct/` and put 1–5 JPGs in it.
2. **Card:** in `index.html` find the marker
   `<!-- ▼▼▼ PRODUCT CARD 1 — BITUMEN ... -->`.
   Copy one **whole** `<article class="product-card"> … </article>` block
   (from `<article` to `</article>`), paste it after the EPDM card
   (before `<!-- ▲▲▲ END PRODUCT CARD 2 -->`), and edit:
   - the `<img src="…">` paths → your new photo files,
   - the heading, description, spec `<li>` lines, and the `href="contact.html?product=…"`.
3. **Translations:** the copied text has `data-i18n="pb.…"` keys. Give your new keys
   fresh names (e.g. `pn.h3`, `pn.desc` …) and add their English + German text in
   `js/i18n.js`. (Simplest: copy the `pb.`/`pe.` key blocks as a template.)
4. **Brochure:** the PDF is made from `build_brochure.py` (kept outside the site
   folder). Updating it needs Python — or just ask Arena / your developer.
   Then replace `Ramji-Traders-Product-Brochure.pdf` — the buttons pick it up
   automatically (same filename).

### 🏅 Adding CERTIFICATES

When you have real certificates to show (ISO, BIS, test reports):
1. Scan/export each as a small JPG or PDF, put them in a new folder `assets/certs/`.
2. In `index.html`, paste this block right **before** `<!-- ══════════ ABOUT ══════════ -->`:

```html
<!-- ══════════ CERTIFICATES ══════════ -->
<section class="section" id="certificates">
  <div class="container">
    <p class="kicker reveal">Certificates & Standards</p>
    <h2 class="reveal" data-delay="0.1">Certified Quality.</h2>
    <div class="certs-row reveal" data-delay="0.2">
      <a class="cert-card" href="assets/certs/iso.pdf" target="_blank">
        <img src="assets/certs/iso.jpg" alt="ISO certificate">
        <span>ISO 9001 — Partner Production</span>
      </a>
      <!-- copy this <a class="cert-card">…</a> block for each certificate -->
    </div>
  </div>
</section>
```

3. Add the styling once at the end of `css/style.css`:

```css
/* ── Certificates ── */
.certs-row{display:flex;gap:22px;flex-wrap:wrap;margin-top:34px}
.cert-card{flex:1 1 200px;max-width:260px;background:rgba(255,255,255,.04);
  border:1px solid rgba(212,169,78,.30);border-radius:14px;padding:14px;
  text-align:center;text-decoration:none;color:var(--ink);transition:transform .3s}
.cert-card:hover{transform:translateY(-4px)}
.cert-card img{width:100%;height:150px;object-fit:contain;border-radius:8px}
.cert-card span{display:block;margin-top:10px;font-size:13px;color:var(--gold2)}
```

> ⚠️ Only display certificates you actually hold (or your partner factories hold,
> with their written permission). German buyers verify these.

### 🖼️ Changing PHOTOS (easiest way)

Keep the **exact same filename** and overwrite the file:
- Logo → replace `assets/logo.png` (PNG with transparent background looks best).
- A product shot → replace e.g. `assets/products/epdm/epdm-single.jpg`.
No code edits needed at all. (If you use a new filename instead, update the
matching `<img src="…">` line in `index.html`.)

### 📞 Changing PHONE or EMAIL

Current values (note: TWO different addresses exist, on purpose):
- **Visible/public email:** `export@ramjitraders.com` — shown on the site
  (index.html, contact.html, js/i18n.js). It *forwards* to Gmail.
- **Backend inbox:** `export.ramjitraders@gmail.com` — appears ONLY in
  `js/main.js` (the FormSubmit endpoint) and receives everything.
  ⚠️ Never change the one in js/main.js unless you re-do FormSubmit activation.
- India: `+91 98217 16462`, Germany: `+49 176 37094937` — in index.html and
  contact.html. Remember there are **two forms** of each number:
  the readable one (`+91 98217 16462`) and the link one (`href="tel:+919821716462"`
  — digits only, no spaces). Update both.

### 🎨 Changing colors / fonts

`css/style.css` top of file:
```css
:root{
  --bg:#070b15;        /* page background       */
  --gold:#d4a94e;      /* main gold accent      */
  --gold2:#e8c87a;     /* light gold (headings) */
  --ink:#ece7da;       /* main text color       */
}
```
Change these 4 values and the whole site re-brands instantly.

### 👀 Preview your edits

In the project folder run `python3 -m http.server 8000`, then open
http://localhost:8000. After every edit hard-refresh with **Ctrl+Shift+R**
(the `?v=4` numbers on css/js files already protect returning visitors —
if you edit css/js, raise them to `?v=5`).

---

## 🚀 PART 2 — PUBLISHING

### Option A — Netlify Drop (EASIEST — 5 minutes, free)
1. Go to **app.netlify.com/drop**
2. Drag the whole `ramjitraders-site` folder onto the page
3. Done — you get a live URL like `ramjitraders.netlify.app`
4. Free account: rename it + add your own domain + free HTTPS

### Option B — Vercel (also free)
1. **vercel.com** → sign up → "Add New → Project"
2. Upload the folder (or connect GitHub) → live instantly on a `.vercel.app` URL

### Option C — GitHub Pages (free, full control)
1. Free account at **github.com**
2. New repository → name it exactly `<yourname>.github.io` (public)
3. Upload ALL site files (index.html at the repo ROOT)
4. Live in 1–2 minutes at `https://<yourname>.github.io`
5. **SSL is FREE & automatic** (Let's Encrypt). Custom domain: Settings → Pages →
   enter domain → wait for DNS ✓ → tick **"Enforce HTTPS"**.
6. DNS at your registrar: 4 × `A` records →
   `185.199.108.153` / `109.153` / `110.153` / `111.153`, plus optional
   `CNAME` www → `<yourname>.github.io`

### Option D — Classic hosting (Hostinger / GoDaddy / cPanel)
Buy hosting + domain → cPanel File Manager → `public_html/` → upload all files → live.

---

## 💸 CHEAPEST DOMAIN (verified August 2026)

| Registrar | 1st year (.com) | Renewal | Honest verdict |
|---|---|---|---|
| **Porkbun** | ~$8–11 flat | same (~$9–11) | ✅ cheapest honest price, free WHOIS privacy, no tricks |
| **Cloudflare Registrar** | ~$9–10.50 | same (at-cost, zero markup) | ✅ cheapest long-term, very transparent |
| **Namecheap** | ~$6.79 (promos lower) | ~$14 | ⚠️ cheap year 1, renewal jumps |
| **IONOS** | $1 promo | ~$12–20 | ⚠️ $1 bait, auto-renews at regular price |
| **GoDaddy** | ₹99–199 / $3 promos | ₹900+ / $22+ | ❌ highest renewals in the industry |

⚠️ Every "$1 first year" offer renews at the REGULAR price — always check the
renewal column, that's the real cost.
**.com** carries the most trust with international buyers.
**Best-value play: .com at Porkbun or Cloudflare (~$9–10/yr flat) + free GitHub
Pages hosting → total website cost ≈ $10 per YEAR. That's it.**

---

## 📬 Contact form — how inquiries reach you (already set up ✅)

The form sends **directly from the website** via the free service **FormSubmit** —
no email app needed on the visitor's side. Every inquiry lands in
**export.ramjitraders@gmail.com** as a normal email (unlimited, free, with a
honeypot anti-spam field).

**One-time activation (IMPORTANT):** the very first submission makes FormSubmit
email an "Activate" link to export.ramjitraders@gmail.com — click it **once**
and all future inquiries are delivered. Until then nothing is delivered.

If you ever change the receiving email address:
1. In `js/main.js`, replace `https://formsubmit.co/ajax/export.ramjitraders@gmail.com`
   with `https://formsubmit.co/ajax/YOUR-NEW-EMAIL`
2. Change the visible addresses too (`index.html`, `contact.html`, `js/i18n.js` —
   Find in Files: `export.ramjitraders`)
3. Do one test submission from the site → click the new activation email.

---

## 📱 Final check
After publishing, open the site on your phone, and ask a friend in Germany
to open it too. The journey animation is scroll-based and works on mobile.
