/* ══════════════════════════════════════════════════════════════════
   RAM JI TRADERS — i18n.js
   EN ⇄ DE language switch. Translates every tagged element, the
   form placeholders, the page title AND the journey captions
   (via the 'langchange' event that journey.js listens to).
   Choice persists in localStorage.
   ══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var D = {
    /* ────────────────────── ENGLISH (default) ────────────────────── */
    en: {
      'nav.journey': 'The Journey', 'nav.products': 'Products', 'nav.why': 'Why Us',
      'nav.about': 'About', 'nav.quote': 'Request a Quote',
      'hero.kicker': 'Ram ji Traders — Global Sourcing Partner · India → Europe',
      'hero.title': 'Industrial Washers,<br><em class="gold-i">Sealed for a Lifetime.</em>',
      'hero.sub': 'Bitumen & EPDM washers from India’s leading manufacturers — our current specialization, delivered to Europe by a partner who spent two years on the ground in Germany learning how European business works. The same quality assurance and hassle-free procurement will carry every product category we add next.',
      'hero.cta2': 'Watch the Journey ↓',
      'chip.bitumen': 'Bitumen Washers', 'chip.epdm': 'EPDM Washers', 'chip.partner': 'Global Sourcing Partner', 'chip.expand': 'More Categories Coming',
      'ui.scroll': 'SCROLL',
      'btn.brochure': 'Download Catalogue (PDF)',
      'bs.h': 'Take the Full Catalogue With You',
      'bs.p': 'All specs, size charts, packaging details and our direct contacts — one clean 7-page PDF, ready to share with your purchasing team.',
      'as.cat': 'Product Catalogue',
      'as.catp': 'All specs & sizes in one 7-page PDF — easy to forward to your purchasing team.',
      'tick.1': 'Bitumen Washers', 'tick.2': 'EPDM Washers', 'tick.3': 'ISO & BIS-Certified Partners',
      'tick.4': 'Global Sourcing Partner', 'tick.5': '2 Years on the Ground in Germany',
      'tick.6': 'India → Europe', 'tick.7': '25–30 Yr Service Life', 'tick.8': 'Hassle-Free Procurement, Every Category',
      'j.kicker': '01 — The Journey',
      'j.title': 'From Our Partner Factories<br>to a <em class="gold-i">European Harbour.</em>',
      'j.note': 'Scroll down — your scroll drives the truck, the crane and the ship.',
      'ch.1': 'Origin', 'ch.2': 'Haulage', 'ch.3': 'Loading', 'ch.4': 'Ocean', 'ch.5': 'Arrival',
      'j.hint': 'Keep scrolling to move ↓',
      'jf.kicker': 'All From One Hand',
      'jf.title': 'Sealed in India.<br><em class="gold-i">Delivered across Europe.</em>',
      'jf.sub': 'One sourcing partner — from India’s production lines to your warehouse door.',
      'jf.btn1': 'Start Your Order', 'jf.btn2': 'See the Products ↓',
      'p.kicker': '02 — The Products',
      'p.title': 'Two Products Today.<br><em class="gold-i">A Growing Catalogue.</em>',
      'p.note': 'Bitumen and EPDM washers are where we started — rigorously vetted, quality-assured and ready to ship today. As we qualify more of India’s leading manufacturers, further product categories will join this catalogue, each held to the same standard.',
      'pb.tag': 'Self-Sealing · Waterproof', 'pb.h3': 'Bitumen Washers',
      'pb.desc': 'A bituminous sealing compound bonded to a galvanised steel or aluminium disc. On fastening, the compound compresses into every micro-gap — a permanent, maintenance-free watertight seal at every point.',
      'pb.s1': 'Galvanised steel / aluminium base', 'pb.s2': 'Reflective Flake series — UV & weather resistant',
      'pb.s3': 'Sizes M5–M20 · OD 15–50 mm · 1.5–5 mm', 'pb.s4': 'Metal roofing, cladding & solar mounting',
      'pb.s5': 'Zero maintenance — seals for life',
      'pb.link': 'Request Bitumen Quote →',
      'pb.thumbcap': 'Hex-nut assembly · Reflective Flake · Uniform coat · Roofing detail',
      'pe.tag': 'UV · Ozone · Chemical Resistant', 'pe.h3': 'EPDM Washers',
      'pe.desc': 'High-performance synthetic rubber engineered for extreme service. It holds its seal thermal-cycle after thermal-cycle — where neoprene and natural rubber crack, EPDM endures. The global long-life standard.',
      'pe.s1': 'Service range −40 °C to +120 °C', 'pe.s2': '25–30 year service life',
      'pe.s3': 'Roofing, HVAC, automotive & marine', 'pe.s4': 'Sizes M5–M20 · custom compounding',
      'pe.link': 'Request EPDM Quote →',
      'pe.thumbcap': 'Bonded washer close-up · On self-drilling roofing screws',
      'st.1': 'Lower cost vs EU suppliers', 'st.2': 'EPDM washer service life',
      'st.3': 'Minimum order units from', 'st.4': 'In Germany — EU business mindset',
      'w.kicker': '03 — Why Ram ji Traders',
      'w.title': 'A Partner That Thinks<br>Like a <em class="gold-i">European Buyer.</em>',
      'w1t': 'Source-Direct Pricing', 'w1p': 'Established high-volume Indian manufacturers, one accountable export partner, no stacked margins — typically 25–40% below European quotes.',
      'w2t': 'ISO & BIS-Certified Partners', 'w2p': 'We source only from proven manufacturers with documented, batch-tested quality control — certificates and test reports ship with your order.',
      'w3t': 'European Business Mindset', 'w3p': 'Two years living and working in Germany taught us the standard: precise specs, honest timelines, written confirmations — no surprises.',
      'w4t': 'Custom Sizes & Branding', 'w4p': 'Diameters, thicknesses, compounds and private-label packaging arranged with our manufacturing partners — your brand, their craft.',
      'w5t': 'Complete Export Documentation', 'w5p': 'COO, Bill of Lading, Commercial Invoice and Packing List handled end-to-end. Your customs broker receives a complete, clean file.',
      'w6t': 'Dedicated Export Manager', 'w6p': 'One point of contact from inquiry to delivery — same person, fast answers, proactive updates in your time zone.',
      'w7t': 'A Growing Catalogue', 'w7p': 'Washers are where we started, not where we stop. As we qualify new manufacturing partners across categories, every addition passes the same quality assurance and hassle-free procurement standard you see here today.',
      'a.kicker': '04 — About',
      'a.big': 'Trust is not claimed.<br>It is <em class="gold-i">sealed into every shipment</em> — washer by washer, container by container.',
      'a.chip1': 'Reliability', 'a.chip2': 'Transparency', 'a.chip3': 'Long-Term Partnership',
      'a.p1': 'Ram ji Traders is a global sourcing and quality-assurance partner based in India. We currently work with the country’s established bitumen and EPDM washer manufacturers — producers with proven market strength at home — and connect their products with buyers worldwide, with new product categories joining our catalogue as we qualify further manufacturing partners.',
      'a.p2': 'Our edge is cultural: after two years living and doing business in Germany, we work the way European procurement expects — clear specifications, firm quotations, punctual dispatch and complete, trustworthy documentation. That same standard will apply to every product line we add.',
      'a.dt1': 'Products', 'a.dd1': 'Bitumen & EPDM Washers — more soon',
      'a.dt2': 'Model', 'a.dd2': 'Global Sourcing & Export',
      'a.dt3': 'Focus Markets', 'a.dd3': 'Europe & Worldwide',
      'a.dt4': 'Certification', 'a.dd4': 'ISO & BIS (Partner Factories)',
      'c.title': 'Let’s seal your<br><em class="gold-i">next project.</em>',
      'c.p': 'Request a quotation or a sample set — we reply within 24 hours.',
      'c.btn': 'Contact Us',
      'f.brand': 'Global sourcing and quality-assurance partner for India’s manufacturing base — currently specializing in bitumen and EPDM washers, with new product categories joining our catalogue over time.',
      'f.contact': 'Contact', 'f.explore': 'Explore', 'f.base': 'India · Export Worldwide',
      'f.rights': 'All rights reserved.', 'f.madein': 'Bitumen & EPDM Washers Today · Made in India',
      /* contact page */
      'ph.kicker': 'Contact',
      'ph.title': 'Let’s Talk <em class="gold-i">Sourcing.</em>',
      'ph.sub': 'Quotes, samples, technical specifications or a joint sourcing plan — we reply within 24 hours.',
      'fm.name': 'Full Name *', 'fm.company': 'Company', 'fm.country': 'Country',
      'fm.email': 'Business Email *', 'fm.phone': 'Phone / WhatsApp', 'fm.product': 'Product Interest *',
      'fm.qty': 'Estimated Quantity', 'fm.msg': 'Your Requirements *',
      'fm.btn': 'Send Inquiry',
      'fm.opt0': 'Select a product', 'fm.opt1': 'Bitumen Washers', 'fm.opt2': 'EPDM Washers',
      'fm.opt3': 'Both — Bitumen & EPDM', 'fm.opt4': 'Custom Specification', 'fm.opt5': 'Something Else / Future Product Inquiry',
      'fm.phcountry': 'e.g. Germany', 'fm.phqty': 'e.g. 50,000 pcs / month',
      'fm.phmsg': 'Sizes, materials, packaging, target price, delivery port — anything that helps us quote precisely.',
      'fm.note': 'Submitting sends your inquiry straight to our inbox <a href="mailto:export@ramjitraders.com">export@ramjitraders.com</a> — no email app or account needed.',
      'fm.success': '✓ Thank you — your inquiry has been sent to our team. We reply within 24 hours. Prefer direct email? <a href="mailto:export@ramjitraders.com">export@ramjitraders.com</a>',
      'fm.err': '⚠️ Auto-send failed (network issue). Please email us directly at <a href="mailto:export@ramjitraders.com">export@ramjitraders.com</a> — we reply within 24 hours.',
      'as.direct': 'Direct Contact', 'as.email': 'Email',
      'as.em1': 'Orders & Quotes', 'as.em2': 'General Inquiries',
      'as.in': 'India · Phone / WhatsApp', 'as.de': 'Germany · Phone / WhatsApp',
      'as.resp': 'Response Time', 'as.respv': 'Within 24 hours',
      'as.markets': 'Markets', 'as.marketsv': 'Europe · Worldwide',
      'st.h': 'What Happens Next',
      'st1': '<b>Send this form.</b> Tell us sizes, volumes and destination.',
      'st2': '<b>Get specs + pricing.</b> Full quotation within 24 hours.',
      'st3': '<b>Approve samples.</b> Test quality, then we ship.',
      'cert.tag': 'ISO & BIS-Certified Partners · Sourced in India · 2 Yrs in Germany'
    },
    /* ────────────────────── DEUTSCH ────────────────────── */
    de: {
      'nav.journey': 'Die Reise', 'nav.products': 'Produkte', 'nav.why': 'Warum wir',
      'nav.about': 'Über uns', 'nav.quote': 'Angebot anfordern',
      'hero.kicker': 'Ram ji Traders — Globaler Sourcing-Partner · Indien → Europa',
      'hero.title': 'Industrielle Dichtscheiben,<br><em class="gold-i">auf Lebenszeit versiegelt.</em>',
      'hero.sub': 'Bitumen- und EPDM-Scheiben von Indiens führenden Herstellern — unser aktueller Schwerpunkt, geliefert nach Europa von einem Partner, der zwei Jahre vor Ort in Deutschland die europäische Geschäftskultur kennengelernt hat. Dieselbe Qualitätssicherung und der gleiche unkomplizierte Beschaffungsprozess gelten für jede Produktkategorie, die wir als Nächstes hinzufügen.',
      'hero.cta2': 'Reise ansehen ↓',
      'chip.bitumen': 'Bitumenscheiben', 'chip.epdm': 'EPDM-Scheiben', 'chip.partner': 'Globaler Sourcing-Partner', 'chip.expand': 'Weitere Kategorien folgen',
      'ui.scroll': 'SCROLLEN',
      'btn.brochure': 'Katalog herunterladen (PDF)',
      'bs.h': 'Der komplette Katalog zum Mitnehmen',
      'bs.p': 'Alle Spezifikationen, Größentabellen, Verpackungsdetails und unsere direkten Kontakte — ein übersichtliches 7-seitiges PDF für Ihren Einkauf.',
      'as.cat': 'Produktkatalog',
      'as.catp': 'Alle technischen Daten & Größen in einem 7-seitigen PDF — ideal zum Weiterleiten an Ihren Einkauf.',
      'tick.1': 'Bitumenscheiben', 'tick.2': 'EPDM-Scheiben', 'tick.3': 'ISO- & BIS-zertifizierte Partner',
      'tick.4': 'Globaler Sourcing-Partner', 'tick.5': '2 Jahre vor Ort in Deutschland',
      'tick.6': 'Indien → Europa', 'tick.7': '25–30 Jahre Lebensdauer', 'tick.8': 'Unkomplizierte Beschaffung, jede Kategorie',
      'j.kicker': '01 — Die Reise',
      'j.title': 'Von unseren Partnerwerken<br>bis zu einem <em class="gold-i">europäischen Hafen.</em>',
      'j.note': 'Scrollen Sie — Ihr Scrollen steuert Lkw, Kran und Schiff.',
      'ch.1': 'Ursprung', 'ch.2': 'Transport', 'ch.3': 'Verladung', 'ch.4': 'Ozean', 'ch.5': 'Ankunft',
      'j.hint': 'Zum Bewegen weiter scrollen ↓',
      'jf.kicker': 'Alles aus einer Hand',
      'jf.title': 'Versiegelt in Indien.<br><em class="gold-i">Geliefert in ganz Europa.</em>',
      'jf.sub': 'Ein Sourcing-Partner — von Indiens Produktionslinien bis vor Ihre Lagertür.',
      'jf.btn1': 'Anfrage starten', 'jf.btn2': 'Produkte ansehen ↓',
      'p.kicker': '02 — Die Produkte',
      'p.title': 'Zwei Produkte heute.<br><em class="gold-i">Ein wachsender Katalog.</em>',
      'p.note': 'Bitumen- und EPDM-Scheiben waren unser Anfang — sorgfältig geprüft, qualitätsgesichert und ab sofort lieferbar. Sobald wir weitere führende indische Hersteller qualifizieren, ergänzen zusätzliche Produktkategorien diesen Katalog — jede nach demselben Standard für Qualitätssicherung und unkomplizierte Beschaffung.',
      'pb.tag': 'Selbstdichtend · Wasserdicht', 'pb.h3': 'Bitumenscheiben',
      'pb.desc': 'Eine bituminöse Dichtmasse, verbunden mit einer Scheibe aus verzinktem Stahl oder Aluminium. Beim Verschrauben presst sich die Masse in jeden Mikrospalt — eine dauerhafte, wartungsfreie, wasserdichte Verbindung an jedem Punkt.',
      'pb.s1': 'Träger aus verzinktem Stahl / Aluminium', 'pb.s2': 'Reflective-Flake-Serie — UV- & witterungsbeständig',
      'pb.s3': 'Größen M5–M20 · AD 15–50 mm · 1,5–5 mm', 'pb.s4': 'Blechdächer, Fassaden & Solarmontage',
      'pb.s5': 'Wartungsfrei — dichtet ein Leben lang',
      'pb.link': 'Bitumen-Angebot anfordern →',
      'pb.thumbcap': 'Sechskantmutter-Montage · Reflective Flake · Gleichmäßige Beschichtung · Dachdetail',
      'pe.tag': 'UV- · Ozon- & Chemikalienbeständig', 'pe.h3': 'EPDM-Scheiben',
      'pe.desc': 'Hochleistungs-Synthesekautschuk für extremste Bedingungen. Hält seine Dichtung Temperaturwechsel für Temperaturwechsel — wo Neopren und Naturkautschuk reißen, hält EPDM stand. Der weltweite Standard für lange Lebensdauer.',
      'pe.s1': 'Einsatzbereich −40 °C bis +120 °C', 'pe.s2': '25–30 Jahre Lebensdauer',
      'pe.s3': 'Dach, Lüftung/Klima, Automotive & Marine', 'pe.s4': 'Größen M5–M20 · kundenspezifische Mischungen',
      'pe.link': 'EPDM-Angebot anfordern →',
      'pe.thumbcap': 'Bonded-Scheibe im Detail · Auf selbstbohrenden Dachschrauben',
      'st.1': 'Günstiger als EU-Anbieter', 'st.2': 'Lebensdauer von EPDM-Scheiben',
      'st.3': 'Mindestbestellmenge ab', 'st.4': 'In Deutschland — EU-Geschäftsverständnis',
      'w.kicker': '03 — Warum Ram ji Traders',
      'w.title': 'Ein Partner, der denkt<br>wie ein <em class="gold-i">europäischer Einkäufer.</em>',
      'w1t': 'Preise nah an der Quelle', 'w1p': 'Etablierte indische Großhersteller, ein verantwortlicher Exportpartner, keine doppelten Margen — typischerweise 25–40 % unter europäischen Angeboten.',
      'w2t': 'ISO- & BIS-zertifizierte Partner', 'w2p': 'Wir beziehen ausschließlich von bewährten Herstellern mit dokumentierter, chargengeprüfter Qualitätskontrolle — Zertifikate und Prüfberichte liegen jeder Lieferung bei.',
      'w3t': 'Europäische Geschäftsdenkweise', 'w3p': 'Zwei Jahre Leben und Arbeiten in Deutschland haben uns den Standard gelehrt: präzise Spezifikationen, ehrliche Zeitpläne, schriftliche Bestätigungen — keine Überraschungen.',
      'w4t': 'Sondermaße & Eigenmarke', 'w4p': 'Durchmesser, Stärken, Materialien und Private-Label-Verpackung — abgestimmt mit unseren Fertigungspartnern. Ihre Marke, ihr Handwerk.',
      'w5t': 'Lückenlose Exportdokumente', 'w5p': 'COO, Bill of Lading, Handelsrechnung und Packliste — komplett abgewickelt. Ihr Zollagent erhält eine saubere, vollständige Akte.',
      'w6t': 'Fester Export-Ansprechpartner', 'w6p': 'Ein Ansprechpartner von der Anfrage bis zur Lieferung — dieselbe Person, schnelle Antworten, aktive Updates in Ihrer Zeitzone.',
      'w7t': 'Ein wachsender Katalog', 'w7p': 'Dichtscheiben sind unser Anfang, nicht unser Ende. Während wir neue Fertigungspartner in weiteren Kategorien qualifizieren, durchläuft jede Erweiterung dieselbe Qualitätssicherung und denselben unkomplizierten Beschaffungsstandard, den Sie heute hier sehen.',
      'a.kicker': '04 — Über uns',
      'a.big': 'Vertrauen behauptet man nicht.<br>Es wird <em class="gold-i">in jede Sendung versiegelt</em> — Scheibe für Scheibe, Container für Container.',
      'a.chip1': 'Zuverlässigkeit', 'a.chip2': 'Transparenz', 'a.chip3': 'Langfristige Partnerschaft',
      'a.p1': 'Ram ji Traders ist ein globaler Sourcing- und Qualitätssicherungspartner mit Sitz in Indien. Aktuell arbeiten wir mit den etablierten Bitumen- und EPDM-Scheiben-Herstellern des Landes — Produzenten mit bewährter Marktstärke im Inland — und verbinden ihre Produkte mit Käufern weltweit. Weitere Produktkategorien ergänzen unseren Katalog, sobald wir zusätzliche Fertigungspartner qualifizieren.',
      'a.p2': 'Unser Vorteil ist kulturell: Nach zwei Jahren Leben und Arbeiten in Deutschland arbeiten wir so, wie es europäische Einkäufer erwarten — klare Spezifikationen, verbindliche Angebote, pünktlicher Versand und vollständige, verlässliche Dokumentation. Derselbe Standard gilt für jede Produktlinie, die wir hinzufügen.',
      'a.dt1': 'Produkte', 'a.dd1': 'Bitumen- & EPDM-Scheiben — bald mehr',
      'a.dt2': 'Modell', 'a.dd2': 'Globales Sourcing & Export',
      'a.dt3': 'Fokusmärkte', 'a.dd3': 'Europa & weltweit',
      'a.dt4': 'Zertifizierung', 'a.dd4': 'ISO & BIS (Partnerwerke)',
      'c.title': 'Versiegeln wir Ihr<br><em class="gold-i">nächstes Projekt.</em>',
      'c.p': 'Fordern Sie ein Angebot oder ein Musterset an — wir antworten innerhalb von 24 Stunden.',
      'c.btn': 'Kontakt',
      'f.brand': 'Globaler Sourcing- und Qualitätssicherungspartner für Indiens Fertigungsbasis — aktuell spezialisiert auf Bitumen- und EPDM-Scheiben, mit weiteren Produktkategorien, die im Laufe der Zeit hinzukommen.',
      'f.contact': 'Kontakt', 'f.explore': 'Entdecken', 'f.base': 'Indien · Export weltweit',
      'f.rights': 'Alle Rechte vorbehalten.', 'f.madein': 'Bitumen- & EPDM-Scheiben heute · Made in India',
      /* contact page */
      'ph.kicker': 'Kontakt',
      'ph.title': 'Sprechen wir über <em class="gold-i">Sourcing.</em>',
      'ph.sub': 'Angebote, Muster, technische Spezifikationen oder ein gemeinsamer Sourcing-Plan — wir antworten innerhalb von 24 Stunden.',
      'fm.name': 'Vollständiger Name *', 'fm.company': 'Firma', 'fm.country': 'Land',
      'fm.email': 'Geschäftliche E-Mail *', 'fm.phone': 'Telefon / WhatsApp', 'fm.product': 'Produktinteresse *',
      'fm.qty': 'Geschätzte Menge', 'fm.msg': 'Ihre Anforderungen *',
      'fm.btn': 'Anfrage senden',
      'fm.opt0': 'Produkt auswählen', 'fm.opt1': 'Bitumenscheiben', 'fm.opt2': 'EPDM-Scheiben',
      'fm.opt3': 'Beides — Bitumen & EPDM', 'fm.opt4': 'Kundenspezifisch', 'fm.opt5': 'Etwas anderes / zukünftige Produktanfrage',
      'fm.phcountry': 'z. B. Deutschland', 'fm.phqty': 'z. B. 50.000 Stk. / Monat',
      'fm.phmsg': 'Maße, Materialien, Verpackung, Zielpreis, Lieferhafen — alles, was uns hilft, präzise anzubieten.',
      'fm.note': 'Absenden sendet Ihre Anfrage direkt an unser Postfach <a href="mailto:export@ramjitraders.com">export@ramjitraders.com</a> — kein E-Mail-Programm oder Konto erforderlich.',
      'fm.success': '✓ Vielen Dank — Ihre Anfrage wurde an unser Team gesendet. Wir antworten innerhalb von 24 Stunden. Lieber direkt per E-Mail? <a href="mailto:export@ramjitraders.com">export@ramjitraders.com</a>',
      'fm.err': '⚠️ Senden fehlgeschlagen (Netzwerkproblem). Bitte schreiben Sie uns direkt an <a href="mailto:export@ramjitraders.com">export@ramjitraders.com</a> — wir antworten innerhalb von 24 Stunden.',
      'as.direct': 'Direkter Kontakt', 'as.email': 'E-Mail',
      'as.em1': 'Bestellungen & Angebote', 'as.em2': 'Allgemeine Anfragen',
      'as.in': 'Indien · Telefon / WhatsApp', 'as.de': 'Deutschland · Telefon / WhatsApp',
      'as.resp': 'Antwortzeit', 'as.respv': 'Innerhalb von 24 Stunden',
      'as.markets': 'Märkte', 'as.marketsv': 'Europa · weltweit',
      'st.h': 'Wie geht es weiter',
      'st1': '<b>Formular senden.</b> Nennen Sie uns Maße, Mengen und Ziel.',
      'st2': '<b>Spezifikationen + Preise erhalten.</b> Vollständiges Angebot innerhalb von 24 Stunden.',
      'st3': '<b>Muster freigeben.</b> Qualität prüfen, dann liefern wir.',
      'cert.tag': 'ISO- & BIS-zertifizierte Partner · Indische Herstellung · 2 Jahre in Deutschland'
    }
  };

  var TITLES = {
    en: {
      home: 'Ram ji Traders — Global Sourcing Partner for Industrial Components | India → Europe',
      contact: 'Contact — Ram ji Traders | Request a Quote'
    },
    de: {
      home: 'Ram ji Traders — Globaler Sourcing-Partner für Industriekomponenten | Indien → Europa',
      contact: 'Kontakt — Ram ji Traders | Angebot anfordern'
    }
  };

  function apply(lang) {
    if (!D[lang]) lang = 'en';
    var dict = D[lang];
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (dict[k] !== undefined) el.textContent = dict[k];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-html');
      if (dict[k] !== undefined) el.innerHTML = dict[k];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-ph');
      if (dict[k] !== undefined) el.setAttribute('placeholder', dict[k]);
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-alt');
      if (dict[k] !== undefined) el.setAttribute('alt', dict[k]);
    });
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.classList.toggle('on', b.getAttribute('data-lang') === lang);
    });
    document.documentElement.lang = lang;
    var page = /contact/i.test(location.pathname) ? 'contact' : 'home';
    document.title = TITLES[lang][page];
    try { localStorage.setItem('rjt-lang', lang); } catch (e) {}
    window.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
  }

  document.querySelectorAll('.lang-btn').forEach(function (b) {
    b.addEventListener('click', function () { apply(b.getAttribute('data-lang')); });
  });

  var saved = 'en';
  try { saved = localStorage.getItem('rjt-lang') || 'en'; } catch (e) {}
  apply(saved);
})();
