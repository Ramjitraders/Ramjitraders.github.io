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
      'nav.journey': 'The Journey', 
      'nav.products': 'Products & Sourcing', 
      'nav.why': 'Why Us',
      'nav.about': 'About', 
      'nav.quote': 'Request Sourcing / Quote',
      'hero.kicker': 'Ram ji Traders — Global Sourcing Partner · India → Europe',
      'hero.title': 'What Products Are Costing You<br><em class="gold-i">Too Much in Europe?</em>',
      'hero.sub': 'We bridge your supply gaps with direct manufacturer exports from India. From specialized sealing washers (M5–M20) to custom metal stampings and on-demand components — tell us what products you need, and we source them 25–40% cheaper with strict ISO/DIN compliance.',
      'hero.cta2': 'Explore Capabilities ↓',
      'chip.bitumen': 'Bitumen Sealing Washers', 
      'chip.epdm': 'EPDM Composite Washers', 
      'chip.stampings': 'Custom Metal & Hardware',
      'chip.custom': 'On-Demand Sourcing',
      'ui.scroll': 'SCROLL',
      'btn.brochure': 'Download Catalogue (PDF)',
      'bs.h': 'Download Full Specifications',
      'bs.p': 'Download our complete technical catalogue with dimension tables, material grades, packaging details, and direct contact info.',
      'as.cat': 'Product Catalogue',
      'as.catp': 'All specs & sizes in one clean PDF — easy to forward to your purchasing team.',
      'tick.1': 'Global Sourcing Partner', 
      'tick.2': 'Bitumen & EPDM Washers',
      'tick.3': 'Custom Metal Stampings', 
      'tick.4': '25–40% Margin Advantage',
      'tick.5': 'ISO & BIS-Certified Factories', 
      'tick.6': 'On-Demand Custom Procurement',
      'tick.7': 'Direct Ocean Freight to Europe',
      'j.kicker': '01 — The Journey',
      'j.title': 'From Certified Indian Mills<br>to a <em class="gold-i">European Harbour.</em>',
      'j.note': 'Scroll down — your scroll drives the truck, the crane and the ship.',
      'ch.1': 'Origin', 'ch.2': 'Haulage', 'ch.3': 'Loading', 'ch.4': 'Ocean', 'ch.5': 'Arrival',
      'j.hint': 'Keep scrolling to move ↓',
      'jf.kicker': 'All From One Hand',
      'jf.title': 'Manufactured in India.<br><em class="gold-i">Delivered across Europe.</em>',
      'jf.sub': 'One accountable export partner — from India’s heavy production lines directly to your warehouse door.',
      'jf.btn1': 'Request Custom Sourcing', 
      'jf.btn2': 'Explore Product Lines ↓',
      'p.kicker': '02 — Sourcing Capabilities',
      'p.title': 'Core Specializations &<br><em class="gold-i">Custom Sourcing.</em>',
      'pb.tag': 'Self-Sealing · Waterproof', 
      'pb.h3': 'Bitumen Sealing Washers',
      'pb.desc': 'A bituminous sealing compound bonded to a galvanised steel or aluminium disc. On fastening, the compound compresses into every micro-gap — a permanent, maintenance-free watertight seal at every screw point.',
      'pb.s1': 'Galvanised steel / aluminium base', 
      'pb.s2': 'Reflective Flake series — UV & weather resistant',
      'pb.s3': 'Sizes M5–M20 · OD 15–50 mm · 1.5–5 mm thickness', 
      'pb.s4': 'Metal roofing, trapezoidal profiles, cladding & solar mounting',
      'pb.s5': 'Zero maintenance — seals for 25–30+ years',
      'pb.link': 'Request Bitumen Quote →',
      'pb.thumbcap': 'Hex-nut assembly · Reflective Flake · Uniform coat · Roofing detail',
      'pe.tag': 'UV · Ozone · Chemical Resistant', 
      'pe.h3': 'EPDM Composite Washers',
      'pe.desc': 'High-performance synthetic rubber bonded to stainless or galvanised backing, engineered for extreme weather service. It holds elasticity thermal-cycle after thermal-cycle without cracking.',
      'pe.s1': 'Service range −40 °C to +120 °C', 
      'pe.s2': '25–30 year service life — UV & ozone proof',
      'pe.s3': 'Metal roofing, HVAC, facade engineering & automotive', 
      'pe.s4': 'Sizes M5–M20 · Custom vulcanisation & compounding',
      'pe.s5': 'Compatible with self-drilling & wood construction screws',
      'pe.link': 'Request EPDM Quote →',
      'pe.thumbcap': 'Bonded washer close-up · On self-drilling roofing screws',
      'px.tag': 'On-Demand Sourcing · 25–40% Advantage',
      'px.h3': 'On-Demand Custom Procurement',
      'px.desc': 'Facing high prices, margin squeeze, or supplier delays in Europe? Tell us the component, DIN standard, or technical drawing you need — we audit verified Indian manufacturing plants, handle quality control, and deliver CIF to your European port.',
      'px.s1': 'Custom metal stampings, brackets & CNC machined parts',
      'px.s2': 'Specialized fasteners, screws & anchoring hardware',
      'px.s3': '25–40% cost savings compared to European domestic supply',
      'px.s4': 'Full export compliance, customs handling & sea freight by our CHA',
      'px.s5': 'Sample production & 3.1 material testing prior to bulk dispatch',
      'px.link': 'Submit Custom Sourcing RFQ →',
      'st.1': 'Cost savings vs EU suppliers', 
      'st.2': 'Component service life',
      'st.3': 'Minimum order units from', 
      'st.4': 'Certified manufacturing standards',
      'w.kicker': '03 — Why Ram ji Traders',
      'w.title': 'A Sourcing Partner That Thinks<br>Like a <em class="gold-i">European Buyer.</em>',
      'w1t': 'Source-Direct Pricing', 
      'w1p': 'Established high-volume Indian manufacturers, one accountable export partner, zero stacked broker markups — typically 25–40% below European wholesale quotes.',
      'w2t': 'ISO & DIN Compliance', 
      'w2p': 'We source only from proven manufacturers with documented, batch-tested quality control — EN 10204 3.1 certificates and test reports ship with every container.',
      'w3t': 'European Business Mindset', 
      'w3p': 'Founder on the ground in Germany. We work the way European procurement expects: precise technical specs, reliable timelines, and transparent communication.',
      'w4t': 'Free Sample Kits', 
      'w4p': 'Test the material before you commit. We provide free sample boxes for material and laboratory testing — zero obligation.',
      'w5t': 'Seamless Export Logistics', 
      'w5p': 'Direct ocean freight coordination from Nhava Sheva & Mundra to Hamburg, Rotterdam, or Antwerp. Complete export customs & shipping documentation handled end-to-end.',
      'w6t': 'Open Sourcing Portal', 
      'w6p': 'Not limited to standard catalogue items. Tell us what product or material is costing you too much in Europe — we source and export it for you.',
      'a.kicker': '04 — About',
      'a.big': 'Direct access to India’s<br><em class="gold-i">manufacturing strength.</em>',
      'a.chip1': 'Reliability', 'a.chip2': 'Transparency', 'a.chip3': 'Direct Factory Sourcing',
      'a.p1': 'Ram ji Traders is an international merchant export and global sourcing partner bridging India’s high-precision manufacturing corridors with European industry.',
      'a.p2': 'Founded by Arya, based in Germany and operating with deep local roots across India\'s industrial hubs, we eliminate trading intermediaries so European businesses get factory-direct pricing with European compliance.',
      'a.dt1': 'Core Lines', 'a.dd1': 'Washers & Custom Sourcing',
      'a.dt2': 'Model', 'a.dd2': 'Global Sourcing & Export',
      'a.dt3': 'Focus Markets', 'a.dd3': 'Europe & Worldwide',
      'a.dt4': 'Incoterms', 'a.dd4': 'FOB India / CIF Europe',
      'c.kicker': '05 — Next Step',
      'c.title': 'Have a Sourcing Requirement or<br><em class="gold-i">Need a Competitive Benchmark?</em>',
      'c.p': 'Send us your technical drawings, standard specs (DIN/ISO/EN), or sample requirements. We respond within 24 hours.',
      'c.btn': 'Submit Sourcing RFQ',
      'c.call': 'Direct Line (Germany)',
      'f.brand': 'Global sourcing partner and merchant exporter connecting India’s leading industrial manufacturers with buyers across Europe and worldwide.',
      'f.contact': 'Contact',
      'f.explore': 'Explore',
            'trust.kicker': 'Institutional Verification & Compliance',
      'trust.title': 'Government-Recognized & <em class="gold-i">Globally Verified Exporter.</em>',
      'trust.sub': 'We operate with full statutory accreditation, transparent international registrations, and verified B2B trade partnerships.',
      'trust.fieo.tag': 'Govt. Recognized',
      'trust.fieo.h': 'FIEO & MSME Registered Exporter',
      'trust.fieo.p': 'FIEO (Ministry of Commerce) & MSME (Govt. of India) Certified Exporter',
      'trust.ibp.tag': 'Official Trade Portal',
      'trust.ibp.h': 'Indian Business Portal',
      'trust.ibp.p': 'Official National B2B International Trade Marketplace (FIEO & GlobalLinker)',
      'trust.go4.tag': 'Verified B2B Member',
      'trust.go4.h': 'go4WorldBusiness',
      'trust.go4.p': 'Verified International Trade Exporter & Global Sourcing Partner',
      'trust.gl.tag': 'Digital SME Network',
      'trust.gl.h': 'GlobalLinker Certified',
      'trust.gl.p': 'Digitally Certified SME Global Trade & Supply Chain Member',
      'trust.li.tag': 'Corporate Network',
      'trust.li.h': 'LinkedIn Official',
      'trust.li.p': 'Executive Leadership, Company Updates & Verified European Network',
      'f.accred': 'Accreditations & Networks',
      'f.rights': 'All rights reserved.',
      'f.madein': 'Global Sourcing Partner · Made in India',
      'f.base': 'India · Export Worldwide',
      'cpg.kicker': 'Global Sourcing Portal · India → Europe',
      'cpg.title': 'Tell Us What You Need Sourced.<br><em class="gold-i">We Bridge Your Supply Gaps.</em>',
      'cpg.sub': 'Whether you need specialized sealing washers or custom industrial components to cut your European procurement costs by 25–40% — request a benchmark quotation or complimentary sample kit. We reply within 24 hours.',
      'fm.name': 'Full Name *', 'fm.company': 'Company *',
      'fm.country': 'Country', 'fm.phcountry': 'e.g. Germany',
      'fm.email': 'Business Email *', 'fm.phone': 'Phone / WhatsApp',
      'fm.product': 'Product / Sourcing Requirement *',
      'fm.opt0': 'Select a category',
      'opt.bitumen': 'Bitumen Sealing Washers (M5–M20)',
      'opt.epdm': 'EPDM Composite Sealing Washers',
      'opt.stampings': 'Custom Metal Stampings & Fasteners',
      'opt.other': 'Custom Sourcing / Other Product RFQ',
      'fm.qty': 'Estimated Quantity / Volume',
      'fm.msg': 'Technical Specifications, Standards & Inquiries *',
      'ph.name': 'e.g. Thomas Müller', 'ph.company': 'e.g. Müller Bau GmbH',
      'ph.email': 'e.g. t.mueller@company.de',
      'ph.qty': 'e.g. 50,000 pcs / 2,000 meters / 1 FCL',
      'ph.msg': 'Tell us your required dimensions, DIN/ISO standards, material grade, or target delivery port in Europe...',
      'fm.btn': 'Send Sourcing Request →',
      'fm.note': 'Submitting sends your inquiry straight to our inbox <a href="mailto:export@ramjitraders.com">export@ramjitraders.com</a> — no email app or account needed.',
      'fm.success': '✓ Thank you — your sourcing inquiry has been received. We will review your specifications and reply within 24 hours. Direct email: <a href="mailto:export@ramjitraders.com">export@ramjitraders.com</a>',
      'fm.err': '⚠️ Auto-send failed (network issue). Please email us directly at <a href="mailto:export@ramjitraders.com">export@ramjitraders.com</a> — we reply within 24 hours.',
      'as.direct': 'Direct Contact',
      'as.em1': 'Orders & Sourcing RFQs', 'as.em2': 'General Inquiries',
      'as.in': 'India · Phone / WhatsApp', 'as.de': 'Germany · Phone / WhatsApp',
      'as.resp': 'Response Time', 'as.respv': 'Within 24 hours',
      'as.markets': 'Delivery', 'as.marketsv': 'FOB India / CIF Europe',
      'st.h': 'What Happens Next',
      'st1': '<b>Send this form.</b> Tell us your specs, drawings, or volume.',
      'st2': '<b>Get specs + pricing.</b> Full benchmark quote within 24 hours.',
      'st3': '<b>Approve samples.</b> Free sample kits tested, then we ship.',
      'cert.tag': 'ISO & BIS-Certified Partners · Sourced in India · 2 Yrs in Germany'
    },

    /* ────────────────────── GERMAN (DE) ────────────────────── */
    de: {
      'nav.journey': 'Lieferweg', 
      'nav.products': 'Produkte & Sourcing', 
      'nav.why': 'Vorteile',
      'nav.about': 'Über uns', 
      'nav.quote': 'Sourcing / Angebot anfragen',
      'hero.kicker': 'Ram ji Traders — Globaler Beschaffungspartner · Indien → Europa',
      'hero.title': 'Welche Produkte belasten<br><em class="gold-i">Ihre Marge in Europa?</em>',
      'hero.sub': 'Wir schließen Ihre Lieferlücken durch direkten Herstellerexport aus Indien. Von spezialisierten Dichtscheiben (M5–M20) bis hin zu individuellen Metallstanzteilen und Komponenten nach Maß — nennen Sie uns Ihren Bedarf, wir beschaffen 25–40 % günstiger mit strenger DIN-/ISO-Konformität.',
      'hero.cta2': 'Kompetenzen ansehen ↓',
      'chip.bitumen': 'Bitumen-Dichtscheiben', 
      'chip.epdm': 'EPDM-Verbundscheiben', 
      'chip.stampings': 'Metallwaren & Stanzteile',
      'chip.custom': 'Individuelle Beschaffung',
      'ui.scroll': 'SCROLLEN',
      'btn.brochure': 'Katalog herunterladen (PDF)',
      'bs.h': 'Vollständige Spezifikationen',
      'bs.p': 'Laden Sie unseren kompletten technischen Katalog mit Maßtabellen, Werkstoffen, Verpackungseinheiten und Direktkontakten herunter.',
      'as.cat': 'Produktkatalog',
      'as.catp': 'Alle Maße & Spezifikationen im kompakten PDF — ideal zur Weiterleitung an Ihren Einkauf.',
      'tick.1': 'Globaler Beschaffungspartner', 
      'tick.2': 'Bitumen- & EPDM-Dichtscheiben',
      'tick.3': 'Individuelle Metallstanzteile', 
      'tick.4': '25–40 % Margenvorteil',
      'tick.5': 'ISO & BIS-zertifizierte Werke', 
      'tick.6': 'Individuelle Beschaffung nach Maß',
      'tick.7': 'Direkte Seefracht nach Europa',
      'j.kicker': '01 — Der Lieferweg',
      'j.title': 'Vom indischen Herstellerwerk<br>in den <em class="gold-i">europäischen Hafen.</em>',
      'j.note': 'Scrollen Sie nach unten — Ihre Bewegung steuert Lkw, Kran und Frachtschiff.',
      'ch.1': 'Herkunft', 'ch.2': 'Transport', 'ch.3': 'Verladung', 'ch.4': 'Seefracht', 'ch.5': 'Ankunft',
      'j.hint': 'Weiter scrollen ↓',
      'jf.kicker': 'Alles aus einer Hand',
      'jf.title': 'Gefertigt in Indien.<br><em class="gold-i">Geliefert nach ganz Europa.</em>',
      'jf.sub': 'Ein verlässlicher Partner — von den industriellen Produktionslinien in Indien bis zu Ihrem Werkstor.',
      'jf.btn1': 'Individuelle Anfrage starten', 
      'jf.btn2': 'Produktlinien ansehen ↓',
      'p.kicker': '02 — Beschaffungskompetenz',
      'p.title': 'Kernkompetenzen &<br><em class="gold-i">Individuelle Beschaffung.</em>',
      'pb.tag': 'Selbstabdichtend · Wasserdicht', 
      'pb.h3': 'Bitumen-Dichtscheiben',
      'pb.desc': 'Vulkanisierte Bitumen-Dichtmasse auf verzinktem Stahl- oder Aluminiumträger. Beim Verschrauben presst sich die Masse in jede Mikrofuge — für eine dauerhafte, wartungsfreie Abdichtung an jedem Schraubpunkt.',
      'pb.s1': 'Träger aus verzinktem Stahl oder Aluminium', 
      'pb.s2': 'Reflective-Flake-Serie — UV- & witterungsbeständig',
      'pb.s3': 'Größen M5–M20 · AD 15–50 mm · Stärken 1,5–5 mm', 
      'pb.s4': 'Metalldächer, Trapezbleche, Fassadenbau & Solarmontage',
      'pb.s5': 'Vollkommen wartungsfrei — 25–30+ Jahre Dichtwirkung',
      'pb.link': 'Bitumen-Angebot anfragen →',
      'pb.thumbcap': 'Hex-Mutter-Montage · Reflective Flake · Gleichmäßige Schicht · Dachdetail',
      'pe.tag': 'UV- · Ozon- · Chemikalienbeständig', 
      'pe.h3': 'EPDM-Verbundscheiben',
      'pe.desc': 'Hochleistungs-Synthesekautschuk auf Edelstahl- oder verzinktem Träger für anspruchsvollste Witterungseinflüsse. Behält seine Elastizität über Jahrzehnte ohne Versprödung.',
      'pe.s1': 'Temperaturbereich −40 °C bis +120 °C', 
      'pe.s2': '25–30 Jahre Lebensdauer — UV- und ozonfest',
      'pe.s3': 'Dachbau, HLK-Technik, Fassadenbau & Fahrzeugbau', 
      'pe.s4': 'Größen M5–M20 · Kundenspezifische Vulkanisation',
      'pe.s5': 'Kompatibel mit Bohrschrauben und Holzbauschrauben',
      'pe.link': 'EPDM-Angebot anfragen →',
      'pe.thumbcap': 'Verbundscheibe Nahaufnahme · Auf Bohrschrauben für Dächer',
      'px.tag': 'Individuelle Beschaffung · 25–40 % Vorteil',
      'px.h3': 'Individuelle Beschaffung nach Maß',
      'px.desc': 'Stehen Sie in Europa unter Margendruck, hohen Einkaufspreisen oder Lieferverzögerungen? Sagen Sie uns, welches Bauteil, welche DIN-Norm oder Zeichnung Sie benötigen — wir prüfen zertifizierte Herstellerwerke in Indien, sichern die Qualität und liefern CIF europäischen Hafen.',
      'px.s1': 'Individuelle Metallstanzteile, Halterungen & CNC-Präzisionsteile',
      'px.s2': 'Spezialschrauben, Verbindungstechnik & Verankerungselemente',
      'px.s3': '25–40 % Einsparpotenzial gegenüber europäischem Großhandel',
      'px.s4': 'Vollständige Exportabwicklung, Zollabwicklung & Seefracht',
      'px.s5': 'Musterfertigung & 3.1 Materialprüfung vor dem Serienversand',
      'px.link': 'Individuelle Anfrage einreichen →',
      'st.1': 'Kostenvorteil ggü. EU-Preisen', 
      'st.2': 'Bauteil-Lebensdauer',
      'st.3': 'Mindestbestellmenge ab', 
      'st.4': 'Zertifizierte Industriestandards',
      'w.kicker': '03 — Ihre Vorteile',
      'w.title': 'Ein Beschaffungspartner, der wie ein<br><em class="gold-i">europäischer Einkäufer denkt.</em>',
      'w1t': 'Preise direkt vom Hersteller', 
      'w1p': 'Etablierte indische Großserienhersteller, ein verantwortlicher Exportpartner, null Händleraufschläge — i. d. R. 25–40 % unter europäischen Großhandelspreisen.',
      'w2t': 'ISO- & DIN-Konformität', 
      'w2p': 'Wir arbeiten ausschließlich mit geprüften Werken und chargenbezogener Qualitätsprüfung — EN 10204 3.1 Zeugnisse und Prüfberichte liegen jeder Lieferung bei.',
      'w3t': 'Europäische Geschäftskultur', 
      'w3p': 'Gründer persönlich in Deutschland vor Ort. Wir arbeiten nach europäischen Standards: präzise Spezifikationen, verlässliche Fristen und transparente Kommunikation.',
      'w4t': 'Kostenfreie Musterkits', 
      'w4p': 'Prüfen Sie das Material vorab. Wir stellen Ihnen kostenfreie Musterboxen für Labor- und Baustellentests zur Verfügung — völlig unverbindlich.',
      'w5t': 'Reibungslose Exportlogistik', 
      'w5p': 'Direkte Seefrachtabwicklung von Nhava Sheva & Mundra nach Hamburg, Rotterdam oder Antwerpen inklusive kompletter Zoll- und Ausfuhrdokumentation.',
      'w6t': 'Offenes Sourcing-Portal', 
      'w6p': 'Nicht auf Katalogware beschränkt. Nennen Sie uns die Produkte oder Werkstoffe, die Sie in Europa zu teuer einkaufen — wir beschaffen direkt vom Hersteller.',
      'a.kicker': '04 — Über uns',
      'a.big': 'Direkter Zugang zu Indiens<br><em class="gold-i">stärksten Industriefertigungen.</em>',
      'a.chip1': 'Zuverlässigkeit', 'a.chip2': 'Transparenz', 'a.chip3': 'Direkte Werkbeschaffung',
      'a.p1': 'Ram ji Traders ist ein internationaler Beschaffungs- und Exportpartner, der Indiens führende Produktionskorridore direkt mit der europäischen Wirtschaft verbindet.',
      'a.p2': 'Gegründet von Arya mit persönlicher Präsenz in Deutschland und tiefen Wurzeln in den indischen Industriezentren, schließen wir Zwischenhändler aus und bieten europäische Qualität zu Herstellerpreisen.',
      'a.dt1': 'Kernbereiche', 'a.dd1': 'Dichtscheiben & Custom Sourcing',
      'a.dt2': 'Modell', 'a.dd2': 'Global Sourcing & Export',
      'a.dt3': 'Fokusmärkte', 'a.dd3': 'Europa & Weltweit',
      'a.dt4': 'Incoterms', 'a.dd4': 'FOB Indien / CIF Europa',
      'c.kicker': '05 — Nächster Schritt',
      'c.title': 'Haben Sie einen konkreten Beschaffungsbedarf oder<br><em class="gold-i">wünschen Sie ein Vergleichsangebot?</em>',
      'c.p': 'Senden Sie uns Zeichnungen, DIN/ISO-Normen oder Musteranforderungen. Wir antworten innerhalb von 24 Stunden.',
      'c.btn': 'Sourcing-Anfrage einreichen',
      'c.call': 'Direktkontakt (Deutschland)',
      'f.brand': 'Globaler Beschaffungspartner und Merchant Exporter, der zertifizierte indische Industriehersteller mit europäischen Unternehmen verbindet. Spezialisiert auf Dichtscheiben, individuelle Metallstanzteile und maßgeschneiderte Bauteilbeschaffung.',
      'f.contact': 'Kontakt',
      'f.explore': 'Navigation',
            'trust.kicker': 'Institutionelle Verifizierung & Compliance',
      'trust.title': 'Staatlich anerkannter & <em class="gold-i">global verifizierter Exporteur.</em>',
      'trust.sub': 'Wir arbeiten mit vollständiger behördlicher Akkreditierung, transparenten internationalen Registrierungen und verifizierten B2B-Handelspartnerschaften.',
      'trust.fieo.tag': 'Staatlich Anerkannt',
      'trust.fieo.h': 'FIEO & MSME Registrierter Exporteur',
      'trust.fieo.p': 'FIEO (Handelsministerium) & MSME (Regierung von Indien) zertifiziert',
      'trust.ibp.tag': 'Offizielles Handelsportal',
      'trust.ibp.h': 'Indian Business Portal',
      'trust.ibp.p': 'Offizieller nationaler B2B-Exportmarktplatz (FIEO & GlobalLinker)',
      'trust.go4.tag': 'Verifizierter B2B-Partner',
      'trust.go4.h': 'go4WorldBusiness',
      'trust.go4.p': 'Verifizierter internationaler Exporteur & globaler Beschaffungspartner',
      'trust.gl.tag': 'Digitales KMU-Netzwerk',
      'trust.gl.h': 'GlobalLinker Zertifiziert',
      'trust.gl.p': 'Digital zertifiziertes globales Handels- und Lieferketten-Netzwerk',
      'trust.li.tag': 'Unternehmensnetzwerk',
      'trust.li.h': 'Offizielles LinkedIn Profil',
      'trust.li.p': 'Unternehmensführung, Updates & verifiziertes europäisches Netzwerk',
      'f.accred': 'Akkreditierungen & Netzwerke',
      'f.rights': 'Alle Rechte vorbehalten.',
      'f.madein': 'Global Sourcing Partner · Made in India',
      'f.base': 'Indien · Export Weltweit',
      'cpg.kicker': 'Global Sourcing Portal · Indien → Europa',
      'cpg.title': 'Nennen Sie uns Ihren Beschaffungsbedarf.<br><em class="gold-i">Wir schließen Ihre Lieferlücken.</em>',
      'cpg.sub': 'Ob Dichtscheiben oder individuelle Industriekomponenten zur Senkung Ihrer Beschaffungskosten um 25–40 % — fordern Sie ein Benchmark-Angebot oder kostenfreie Muster an. Antwort innerhalb von 24 Stunden.',
      'fm.name': 'Ihr Name *', 'fm.company': 'Firmenname *',
      'fm.country': 'Land', 'fm.phcountry': 'z. B. Deutschland',
      'fm.email': 'Geschäftliche E-Mail *', 'fm.phone': 'Telefon / WhatsApp',
      'fm.product': 'Produkt / Beschaffungsbereich *',
      'fm.opt0': 'Bereich auswählen',
      'opt.bitumen': 'Bitumen-Dichtscheiben (M5–M20)',
      'opt.epdm': 'EPDM-Verbundscheiben',
      'opt.stampings': 'Metallstanzteile & Verbindungstechnik',
      'opt.other': 'Individuelle Beschaffung / Sonstige Anfrage',
      'fm.qty': 'Geschätzte Menge / Volumen',
      'fm.msg': 'Technische Daten, Normen & Anfrage *',
      'ph.name': 'z. B. Thomas Müller', 'ph.company': 'z. B. Müller Bau GmbH',
      'ph.email': 'z. B. t.mueller@unternehmen.de',
      'ph.qty': 'z. B. 50.000 Stück / 2.000 Meter / 1 FCL',
      'ph.msg': 'Nennen Sie uns Abmessungen, DIN/ISO-Normen, Werkstoff oder Zielhafen in Europa...',
      'fm.btn': 'Beschaffungsanfrage senden →',
      'fm.note': 'Ihre Anfrage wird direkt an unser Exportbüro gesendet <a href="mailto:export@ramjitraders.com">export@ramjitraders.com</a> — kein E-Mail-Programm erforderlich.',
      'fm.success': '✓ Vielen Dank — Ihre Anfrage ist eingegangen. Wir prüfen Ihre Angaben und melden uns innerhalb von 24 Stunden. Direktkontakt: <a href="mailto:export@ramjitraders.com">export@ramjitraders.com</a>',
      'fm.err': '⚠️ Übertragungsfehler. Bitte schreiben Sie uns direkt an <a href="mailto:export@ramjitraders.com">export@ramjitraders.com</a> — wir antworten innerhalb von 24 Stunden.',
      'as.direct': 'Direkter Kontakt',
      'as.em1': 'Bestellungen & Sourcing-Anfragen', 'as.em2': 'Allgemeine Anfragen',
      'as.in': 'Indien · Telefon / WhatsApp', 'as.de': 'Deutschland · Telefon / WhatsApp',
      'as.resp': 'Reaktionszeit', 'as.respv': 'Innerhalb von 24 Stunden',
      'as.markets': 'Lieferung', 'as.marketsv': 'FOB Indien / CIF Europa',
      'st.h': 'Der Ablauf',
      'st1': '<b>Anfrage senden.</b> Nennen Sie uns Maße, Zeichnung oder Menge.',
      'st2': '<b>Angebot erhalten.</b> Vollständiges Benchmark-Angebot in 24 Std.',
      'st3': '<b>Muster freigeben.</b> Kostenfreie Muster testen, dann liefern wir.',
      'cert.tag': 'ISO & BIS-zertifizierte Partner · Sourced in India · 2 Jahre in Deutschland'
    }
  };

  /* ────────────────────── PAGE TITLES ────────────────────── */
  var TITLES = {
    index: {
      en: 'Ram ji Traders — Global Sourcing Partner & Exporter | India → Europe',
      de: 'Ram ji Traders — Globaler Beschaffungspartner & Exporteur | Indien → Europa'
    },
    contact: {
      en: 'Contact & Sourcing Portal — Ram ji Traders | Request Sourcing & Quote',
      de: 'Kontakt & Sourcing-Portal — Ram ji Traders | Beschaffungsanfrage'
    }
  };

  function getPageKey() {
    var p = window.location.pathname.toLowerCase();
    if (p.indexOf('contact') !== -1) return 'contact';
    return 'index';
  }

  function setLanguage(lang) {
    if (!D[lang]) lang = 'en';
    document.documentElement.lang = lang;
    try { localStorage.setItem('rjt_lang', lang); } catch (e) {}

    var dict = D[lang];

    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var key = els[i].getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        els[i].textContent = dict[key];
      }
    }

    var htmlEls = document.querySelectorAll('[data-i18n-html]');
    for (var j = 0; j < htmlEls.length; j++) {
      var hKey = htmlEls[j].getAttribute('data-i18n-html');
      if (dict[hKey] !== undefined) {
        htmlEls[j].innerHTML = dict[hKey];
      }
    }

    var phEls = document.querySelectorAll('[data-i18n-ph]');
    for (var k = 0; k < phEls.length; k++) {
      var pKey = phEls[k].getAttribute('data-i18n-ph');
      if (dict[pKey] !== undefined) {
        phEls[k].setAttribute('placeholder', dict[pKey]);
      }
    }

    var pageKey = getPageKey();
    if (TITLES[pageKey] && TITLES[pageKey][lang]) {
      document.title = TITLES[pageKey][lang];
    }

    var btns = document.querySelectorAll('.lang-btn');
    for (var b = 0; b < btns.length; b++) {
      var bLang = btns[b].getAttribute('data-lang');
      if (bLang === lang) {
        btns[b].classList.add('on');
      } else {
        btns[b].classList.remove('on');
      }
    }

    try {
      window.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
    } catch (e) {}
  }

  document.addEventListener('DOMContentLoaded', function () {
    var saved = 'en';
    try { saved = localStorage.getItem('rjt_lang') || 'en'; } catch (e) {}
    setLanguage(saved);

    document.addEventListener('click', function (e) {
      var target = e.target;
      if (target && target.classList && target.classList.contains('lang-btn')) {
        var lang = target.getAttribute('data-lang');
        if (lang) setLanguage(lang);
      }
    });
  });

  window.RJT_I18N = { setLanguage: setLanguage };
})();
