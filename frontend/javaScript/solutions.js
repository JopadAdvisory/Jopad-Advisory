/* JOPAD Solutions — vanilla JS */
(function () {

  let SOLUTIONS = [
    { slug: 'licensing-market-entry', index: '01', title: 'Licensing & Market Entry', shortTitle: 'Licensing',
      summary: 'Structured licensing support, market entry planning, submissions, and launch readiness for regulated operations.',
      status: 'expanding' },
    { slug: 'regulatory-compliance-systems', index: '02', title: 'Regulatory Compliance Systems', shortTitle: 'Compliance',
      summary: 'Compliance structures, reporting discipline, control frameworks, and practical oversight support for ongoing operations.',
      status: 'expanding' },
    { slug: 'governance-risk-controls', index: '03', title: 'Governance, Risk & Controls', shortTitle: 'Governance',
      summary: 'Decision frameworks, governance structures, risk visibility, and defensible internal control support.',
      status: 'expanding' },
    { slug: 'commercial-structuring-contracts', index: '04', title: 'Commercial Structuring & Contracts', shortTitle: 'Contracts',
      summary: 'Contract strategy, transaction support, commercial alignment, and practical risk allocation for business growth.',
      status: 'expanding' },
    { slug: 'regulator-engagement-investigations', index: '05', title: 'Regulator Engagement & Investigations', shortTitle: 'Investigations',
      summary: 'Clear regulatory responses, inspection readiness, issue management, and disciplined support under scrutiny.',
      status: 'available' },
    { slug: 'data-protection-digital-trust', index: '06', title: 'Data Protection & Digital Trust', shortTitle: 'Data Protection',
      summary: 'Privacy governance, digital risk support, vendor controls, and defensible data protection frameworks.',
      status: 'expanding' }
  ];

  let TIMELINE = [
    { label: 'Consultation', detail: 'Initial briefing, objectives, and scope alignment.' },
    { label: 'Scoping', detail: 'Defined instructions, jurisdictions, and lawful basis.' },
    { label: 'Investigation', detail: 'On-ground inquiry and record retrieval.' },
    { label: 'Verification', detail: 'Corroboration against source and cross-reference.' },
    { label: 'Reporting', detail: 'Structured written findings with source references.' },
    { label: 'Client Delivery', detail: 'Secure handover and follow-up advisory.' }
  ];

  let WHY = [
    { title: 'Regulatory expertise', body: '35+ years across gaming, financial services, and public governance — regulatory nuance is instinctive, not researched.' },
    { title: 'Practical legal insight', body: 'Advice is calibrated to timing, exposure, and stakeholder expectations — not academic exercise.' },
    { title: 'Confidential handling', body: 'Engagements are managed with restraint. Information is protected, movement is deliberate, and disclosure is controlled.' },
    { title: 'Nationwide capability', body: 'Retrieval, verification, and on-ground coordination across Nigerian jurisdictions, executed with local discipline.' },
    { title: 'Structured reporting', body: 'Deliverables are written for boards, counsel, and regulators — clear, sourced, and defensible under review.' },
    { title: 'Professional judgment', body: 'Every recommendation reflects considered assessment of legal reality, business objectives, and risk posture.' }
  ];

  let FAQS = [
    { q: 'How does an engagement begin?', a: 'A short scoping conversation defines objectives, jurisdictions, and instructions. A written engagement letter follows, setting out scope, timelines, deliverables, and fees.' },
    { q: 'Are verification services available nationwide in Nigeria?', a: 'Yes. Verification and retrieval are coordinated across Nigerian jurisdictions through established on-ground protocols, with structured reporting from the firm.' },
    { q: 'How are findings delivered?', a: 'Every engagement concludes with a written report referencing sources, records retrieved, and observations. Where instructed, an advisory memo interprets implications.' },
    { q: 'Is client information kept confidential?', a: 'Yes. Engagements are handled with disciplined confidentiality. Access is restricted to the engagement team and disclosure is controlled by written instruction.' },
    { q: "Does JOPAD represent clients in court?", a: "The firm's focus is advisory, verification, and regulator engagement. Where litigation representation is required, the firm coordinates with instructed counsel." },
    { q: 'Which categories are currently fully developed?', a: 'Regulator Engagement & Investigations is currently fully developed. The remaining practice areas are actively being expanded and are available for scoping conversations on request.' }
  ];

  let INV_PROBLEMS = [
    'Uncertainty about the status, history, or authenticity of court proceedings.',
    'Difficulty retrieving official records from regulators or government agencies.',
    'Exposure to decisions made on incomplete or unverified information.',
    'Cross-jurisdictional matters requiring coordinated, on-ground verification.',
    'Regulatory correspondence, inspections, or enquiries requiring disciplined response.'
  ];

  let INV_AUDIENCES = [
    'Financial institutions and lenders conducting due diligence.',
    'Corporate legal and compliance teams.',
    'International counsel with matters in Nigerian jurisdictions.',
    'Investors, acquirers, and transaction advisors.',
    'Boards responding to regulatory correspondence or investigations.'
  ];

  let INV_INDUSTRIES = [
    { name: 'Financial Services', icon: iconLandmark() },
    { name: 'Legal & Advisory', icon: iconScale() },
    { name: 'Corporate & M&A', icon: iconBuilding() },
    { name: 'Insurance & Risk', icon: iconShield() },
    { name: 'Public Sector', icon: iconGavel() },
    { name: 'Regulated Industries', icon: iconFileSearch() }
  ];

  let SERVICES = [
    {
      title: 'Court Case File Verification',
      number: 'Service 01',
      purpose: 'Assist clients who require inspection, verification, retrieval, and reporting on court case files located anywhere in Nigeria.',
      overview: 'Court records are the primary evidentiary source for litigation history, judgment status, encumbrances, and disputes. Where accuracy matters — due diligence, transaction closing, enforcement, or defensive strategy — verified case file information is essential.',
      who: [
        'Lenders and banks confirming litigation history for credit or enforcement decisions.',
        'Acquirers and investors performing legal due diligence.',
        'External counsel requiring verified filings from distant jurisdictions.',
        'Corporate legal teams tracking active or historical proceedings.'
      ],
      process: [
        'Instruction scoping and objective definition.',
        'Identification of relevant court(s) and registry protocols.',
        'On-ground inspection and retrieval of certified records.',
        'Cross-checking against filings, orders, and judgment history.',
        'Structured written report with source references.'
      ],
      deliverables: [
        'Certified True Copies where obtainable.',
        'Structured verification report with findings and observations.',
        'Timeline of relevant proceedings and status.',
        'Advisory memo on implications where instructed.'
      ]
    },
    {
      title: 'Regulatory Records Verification',
      number: 'Service 02',
      purpose: 'Assist clients requiring lawful retrieval, verification, and reporting on records maintained by government agencies and regulators.',
      overview: 'Regulatory records — corporate filings, licensing status, sanctions history, and agency communications — inform trust, transaction certainty, and compliance decisions. Verified extracts from the source of record are treated with disciplined chain-of-custody.',
      who: [
        'Financial institutions performing KYC or enhanced due diligence.',
        'Legal advisors validating counterparties in commercial transactions.',
        'Investors verifying regulatory standing prior to funding.',
        'Compliance teams reconciling record discrepancies.'
      ],
      process: [
        'Engagement briefing and lawful basis confirmation.',
        'Mapping of the applicable regulator or agency.',
        'Formal request, retrieval, and authentication of records.',
        'Verification against corroborating sources.',
        'Structured reporting with supporting extracts.'
      ],
      deliverables: [
        'Certified extracts or agency-issued confirmations.',
        'Written verification report with findings.',
        'Discrepancy analysis, where applicable.',
        'Advisory notes on regulatory implications.'
      ]
    }
  ];

  /* Icons (inline SVG strings) */
  function svg(paths) {
    return '<svg class="solutions-page__inv-industry-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths + '</svg>';
  }

  function iconLandmark() {
    return svg('<line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/>');
  }

  function iconScale() {
    return svg('<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>');
  }

  function iconBuilding() {
    return svg('<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>');
  }

  function iconShield() {
    return svg('<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>');
  }

  function iconGavel() {
    return svg('<path d="m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/>');
  }
  
  function iconFileSearch() {
    return svg('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><circle cx="11.5" cy="14.5" r="2.5"/><line x1="13.3" y1="16.3" x2="15" y2="18"/>');
  }

  /* ---------------- Render ---------------- */
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}

  function renderDirectory() {
    let host = document.getElementById('directoryList');
    let html = '';

    SOLUTIONS.forEach(function (s) {
      html += '<li class="solutions-page__directory-item ">' +
        '<a class="solutions-page__directory-link" href="#' + s.slug + '">' +
          '<span class="solutions-page__directory-index">' + s.index + '</span>' +
          '<span>' +
            '<span class="solutions-page__directory-titleline">' +
              '<span class="solutions-page__directory-title">' + s.title + '</span>' +
              (s.status === 'expanding' ? '<span class="solutions-page__badge">Expanding</span>' : '') +
            '</span>' +
            '<span class="solutions-page__directory-summary">' + s.summary + '</span>' +
          '</span>' +
          '<span class="solutions-page__directory-arrow" aria-hidden="true">↗</span>' +
        '</a>' +
      '</li>';
    });

    host.innerHTML = html;
  }

  function placeholderCategory(cat) {
    return '<section id="' + cat.slug + '" class="solutions-page__category ">' +
      '<div class="solutions-page__container solutions-page__section-inner container">' +
        '<div class="solutions-page__cat-grid">' +
          '<div class="solutions-page__cat-head">' +
            '<div class="solutions-page__eyebrow"><span class="solutions-page__eyebrow-index">' + cat.index + '</span><span class="solutions-page__eyebrow-rule"></span><span>Practice Area</span></div>' +
            '<h2 class="solutions-page__cat-title">' + cat.title + '</h2>' +
          '</div>' +
          '<div class="solutions-page__cat-body">' +
            '<p class="solutions-page__cat-summary">' + cat.summary + '</p>' +
            '<div class="solutions-page__placeholder">' +
              '<div class="solutions-page__placeholder-label">In Development</div>' +
              '<p class="solutions-page__placeholder-title">Detailed service offerings for this practice area are currently being expanded.</p>' +
              '<p class="solutions-page__placeholder-text">Engagements are already available on request. For scoping conversations, structured proposals, or bespoke advisory, contact the firm directly.</p>' +
              '<a href="index.html#contact" class="solutions-page__placeholder-link">Request a scoping discussion <span aria-hidden="true">→</span></a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>';
  }

  function serviceCard(s, i) {
    let whoItems = s.who.map(function (w) {
      return '<li class="solutions-page__service-list-item"><span class="solutions-page__service-list-item-rule"></span><span>' + w + '</span></li>';
    }).join('');
    let processItems = s.process.map(function (step, k) {
      return '<li class="solutions-page__service-process-item"><span class="solutions-page__service-process-num">0' + (k + 1) + '</span><span class="solutions-page__service-process-text">' + esc(step) + '</span></li>';
    }).join('');
    let delItems = s.deliverables.map(function (d) {
      return '<li class="solutions-page__service-list-item"><span class="solutions-page__service-list-item-rule"></span><span>' + d + '</span></li>';
    }).join('');

    return '<article class="solutions-page__service">' +
      '<div class="solutions-page__service-head">' +
        '<div>' +
          '<div class="solutions-page__service-number">' + s.number + '</div>' +
          '<h3 class="solutions-page__service-title">' + s.title + '</h3>' +
        '</div>' +
        '<span class="solutions-page__service-index">0' + (i + 1) + ' / 02</span>' +
      '</div>' +
      '<div class="solutions-page__service-body">' +
        '<div>' +
          '<div class="solutions-page__service-label">Purpose</div>' +
          '<p class="solutions-page__service-para">' + s.purpose + '</p>' +
          '<div class="solutions-page__service-label">Overview</div>' +
          '<p class="solutions-page__service-para solutions-page__service-para--muted">' + s.overview + '</p>' +
          '<div class="solutions-page__service-label">Who needs this service</div>' +
          '<ul class="solutions-page__service-list">' + whoItems + '</ul>' +
        '</div>' +
        '<div>' +
          '<div class="solutions-page__service-label">Our process</div>' +
          '<ol class="solutions-page__service-process">' + processItems + '</ol>' +
          '<div class="solutions-page__service-label deliverables">Deliverables</div>' +
          '<ul class="solutions-page__service-list solutions-page__service-list--ink">' + delItems + '</ul>' +
          '<a href="index.html#contact" class="solutions-page__service-cta">Request this service <span aria-hidden="true">→</span></a>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  function investigationsSection(cat) {
    let problems = INV_PROBLEMS.map(function (p) {
      return '<li class="solutions-page__inv-item"><span class="solutions-page__inv-item-rule"></span><span class="solutions-page__inv-item-text">' + p + '</span></li>';
    }).join('');
    let audiences = INV_AUDIENCES.map(function (a) {
      return '<li class="solutions-page__inv-item solutions-page__inv-item--ink"><span class="solutions-page__inv-item-rule"></span><span class="solutions-page__inv-item-text">' + a + '</span></li>';
    }).join('');
    let industries = INV_INDUSTRIES.map(function (i) {
      return '<div class="solutions-page__inv-industry">' + i.icon + '<div class="solutions-page__inv-industry-name">' + i.name + '</div></div>';
    }).join('');
    let services = SERVICES.map(function (s, i) { return serviceCard(s, i); }).join('');

    return '<section id="' + cat.slug + '" class="solutions-page__category">' +
      '<div class="solutions-page__container solutions-page__section-inner container">' +
        '<div class="solutions-page__inv-header">' +
          '<div class="solutions-page__inv-header-left">' +
            '<div class="solutions-page__eyebrow"><span class="solutions-page__eyebrow-index">' + cat.index + '</span><span class="solutions-page__eyebrow-rule"></span><span>Practice Area — Fully Developed</span></div>' +
            '<h2 class="solutions-page__heading">Regulator Engagement &amp; Investigations</h2>' +
          '</div>' +
          '<div class="solutions-page__inv-header-right">' +
            '<p class="solutions-page__inv-lead">Clear regulatory responses, inspection readiness, issue management, and disciplined support under scrutiny. Verification-led work built to withstand review by regulators, counterparties, and courts.</p>' +
            '<p class="solutions-page__inv-sub">Every engagement follows a defined method: careful scoping, lawful retrieval, corroboration against source, and structured reporting suitable for decision-making at board, counsel, and regulator level.</p>' +
          '</div>' +
        '</div>' +
        '<div class="solutions-page__inv-split">' +
          '<div>' +
            '<div class="solutions-page__eyebrow"><span class="solutions-page__eyebrow-accent">Problems this solution solves</span></div>' +
            '<ul class="solutions-page__inv-list">' + problems + '</ul>' +
          '</div>' +
          '<div>' +
            '<div class="solutions-page__eyebrow"><span class="solutions-page__eyebrow-accent">Designed for</span></div>' +
            '<ul class="solutions-page__inv-list">' + audiences + '</ul>' +
          '</div>' +
        '</div>' +
        '<div class="solutions-page__inv-industries">' +
          '<div class="solutions-page__eyebrow"><span>Industries served</span></div>' +
          '<div class="solutions-page__inv-industries-grid">' + industries + '</div>' +
        '</div>' +
        '<div class="solutions-page__inv-services">' +
          '<div class="solutions-page__inv-services-head"><div>' +
            '<div class="solutions-page__eyebrow"><span class="solutions-page__eyebrow-accent">Services</span></div>' +
            '<h3 class="solutions-page__inv-services-title">Two disciplined verification services.</h3>' +
          '</div></div>' +
          '<div class="solutions-page__inv-services-grid">' + services + '</div>' +
        '</div>' +
      '</div>' +
    '</section>';
  }

  function renderCategories() {
    let host = document.getElementById('categorySections');
    let html = '';
    SOLUTIONS.forEach(function (cat) {
      html += cat.slug === 'regulator-engagement-investigations'
        ? investigationsSection(cat)
        : placeholderCategory(cat);
    });
    host.innerHTML = html;
  }

  function renderTimeline() {
    let host = document.getElementById('timelineList');
    host.innerHTML = TIMELINE.map(function (step, i) {
      return '<li class="solutions-page__timeline-step">' +
        '<div class="solutions-page__timeline-step-top">' +
          '<span class="solutions-page__timeline-step-num">0' + (i + 1) + '</span>' +
          '<span class="solutions-page__timeline-step-rule"></span>' +
        '</div>' +
        '<div class="solutions-page__timeline-step-title">' + step.label + '</div>' +
        '<p class="solutions-page__timeline-step-text">' + step.detail + '</p>' +
      '</li>';
    }).join('');
  }

  function renderWhy() {
    let host = document.getElementById('whyList');
    host.innerHTML = WHY.map(function (v, i) {
      return '<div class="solutions-page__why-item">' +
        '<div class="solutions-page__why-head">' +
          '<span class="solutions-page__why-num">0' + (i + 1) + '</span>' +
          '<dt class="solutions-page__why-title">' + v.title + '</dt>' +
        '</div>' +
        '<dd class="solutions-page__why-text">' + v.body + '</dd>' +
      '</div>';
    }).join('');
  }

  function renderFaq() {
    let host = document.getElementById('faqList');
    host.innerHTML = FAQS.map(function (f, i) {
      return '<li class="solutions-page__faq-item' + (i === 0 ? ' solutions-page__faq-item--open' : '') + '" data-index="' + i + '">' +
        '<button type="button" class="solutions-page__faq-trigger">' +
          '<span class="solutions-page__faq-q">' + f.q + '</span>' +
          '<span class="solutions-page__faq-icon" aria-hidden="true">' + (i === 0 ? '−' : '+') + '</span>' +
        '</button>' +
        '<div class="solutions-page__faq-panel"><div class="solutions-page__faq-panel-inner">' +
          '<p class="solutions-page__faq-a">' + f.a + '</p>' +
        '</div></div>' +
      '</li>';
    }).join('');
  }

  /* ---------------- Behaviors ---------------- */
  function initFaq() {
    let list = document.getElementById('faqList');
    list.addEventListener('click', function (e) {
      let trigger = e.target.closest('.solutions-page__faq-trigger');
      if (!trigger) return;
      let item = trigger.closest('.solutions-page__faq-item');
      let wasOpen = item.classList.contains('solutions-page__faq-item--open');
      list.querySelectorAll('.solutions-page__faq-item').forEach(function (el) {
        el.classList.remove('solutions-page__faq-item--open');
        let ic = el.querySelector('.solutions-page__faq-icon');
        if (ic) ic.textContent = '+';
      });
      if (!wasOpen) {
        item.classList.add('solutions-page__faq-item--open');
        let ic = item.querySelector('.solutions-page__faq-icon');
        if (ic) ic.textContent = '−';
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderDirectory();
    renderCategories();
    renderTimeline();
    renderWhy();
    renderFaq();
    initFaq();
  });
})();
