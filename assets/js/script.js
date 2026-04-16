/* =============================================================
   Healthcare AI Intake + Prioritization & Value Framework
   Site Scripts v1.0
   ============================================================= */

/* -----------------------------------------------------------
   GLOBAL: Framework component tab switching
   Called via onclick="showTab(...)" in component HTML
   ----------------------------------------------------------- */
function showTab(id) {
  var order = ['intake','score','kpis','pipeline'];
  document.querySelectorAll('.tab-bar .tab').forEach(function(t, i) {
    t.classList.toggle('active', order[i] === id);
  });
  document.querySelectorAll('.pane').forEach(function(p) {
    p.classList.toggle('active', p.id === 'pane-' + id);
  });
}

/* -----------------------------------------------------------
   GLOBAL: Value scoring calculator
   Called via oninput="updateScore()" on sliders
   ----------------------------------------------------------- */
function updateScore() {
  var vals  = [0,1,2,3,4,5,6].map(function(i) {
    var el = document.getElementById('s' + i);
    return el ? (parseInt(el.value) || 3) : 3;
  });
  var fvals = [0,1,2].map(function(i) {
    var el = document.getElementById('sf' + i);
    return el ? (parseInt(el.value) || 3) : 3;
  });

  vals.forEach(function(v, i) {
    var el = document.getElementById('sv' + i);
    if (el) el.textContent = v;
  });
  fvals.forEach(function(v, i) {
    var el = document.getElementById('sfv' + i);
    if (el) el.textContent = v;
  });

  var rawScore    = vals.reduce(function(a, b) { return a + b; }, 0);
  var maxRaw      = 35;
  var feasibility = (fvals[0] + (6 - fvals[1]) + (6 - fvals[2])) / 15;
  var score       = Math.round((rawScore / maxRaw) * 80 + feasibility * 20);

  var numEl = document.getElementById('score-num');
  var barEl = document.getElementById('score-bar');
  var lblEl = document.getElementById('priority-label');
  var subEl = document.getElementById('priority-sub');
  var cirEl = document.getElementById('score-circle');

  if (numEl) numEl.textContent = score;
  if (barEl) barEl.style.width = score + '%';

  var label, sub, bg, col;
  if (score >= 75) {
    label = 'High priority — flagship / accelerate';
    sub   = 'Strong value + feasibility signal. Advance to active roadmap.';
    bg    = '#EAF3DE'; col = '#27500A';
    if (barEl) barEl.style.background = '#639922';
  } else if (score >= 50) {
    label = 'Medium priority — validate';
    sub   = 'Score in the 50–74 range — validate feasibility before committing resources.';
    bg    = '#FAEEDA'; col = '#633806';
    if (barEl) barEl.style.background = '#BA7517';
  } else {
    label = 'Low priority — deprioritize or revisit';
    sub   = 'Below threshold. Revisit when data availability or scope improves.';
    bg    = '#FAECE7'; col = '#712B13';
    if (barEl) barEl.style.background = '#D85A30';
  }
  if (lblEl) lblEl.textContent = label;
  if (subEl) subEl.textContent = sub;
  if (cirEl) cirEl.style.background = bg;
  if (numEl) numEl.style.color = col;
}

document.addEventListener('DOMContentLoaded', function () {

  /* -----------------------------------------------------------
     1. MOBILE NAV TOGGLE
     ----------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.navbar')) navLinks.classList.remove('open');
    });
  }

  /* -----------------------------------------------------------
     2. ACTIVE NAV LINK
     ----------------------------------------------------------- */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  /* -----------------------------------------------------------
     3. TABS
     ----------------------------------------------------------- */
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const wrap = this.closest('.tabs-wrap');
      if (!wrap) return;
      wrap.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      wrap.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      const panel = document.getElementById(this.dataset.tab);
      if (panel) panel.classList.add('active');
    });
  });

  /* -----------------------------------------------------------
     4. ACCORDION
     ----------------------------------------------------------- */
  document.querySelectorAll('.acc-trigger').forEach(trigger => {
    trigger.addEventListener('click', function () {
      const body  = this.nextElementSibling;
      const isOpen = this.classList.contains('open');
      // close siblings in same accordion
      const acc = this.closest('.accordion');
      if (acc) {
        acc.querySelectorAll('.acc-trigger').forEach(t => {
          t.classList.remove('open');
          if (t.nextElementSibling) t.nextElementSibling.classList.remove('open');
        });
      }
      if (!isOpen) {
        this.classList.add('open');
        if (body) body.classList.add('open');
      }
    });
  });

  /* -----------------------------------------------------------
     5. INTERACTIVE SCORE CALCULATOR
     ----------------------------------------------------------- */
  const calcSliders  = document.querySelectorAll('.calc-slider');
  const scoreDisplay = document.getElementById('compositeScore');
  const tierDisplay  = document.getElementById('tierResult');
  const tierAction   = document.getElementById('tierAction');

  const weights = {
    'dim-alignment':   0.25,
    'dim-value':       0.30,
    'dim-feasibility': 0.20,
    'dim-risk':        0.15,
    'dim-urgency':     0.10
  };

  const tiers = [
    { min: 75, label: 'Tier 1 — Approve: Priority',  action: 'Proceed to initiation immediately. Assign PM and set charter timeline.',       color: '#059669' },
    { min: 55, label: 'Tier 2 — Approve: Pipeline',  action: 'Queue for next available capacity. Hold in prioritized backlog.',               color: '#2563EB' },
    { min: 40, label: 'Tier 3 — Defer',               action: 'Revisit in 90 days. Return to sponsor with conditions for advancement.',        color: '#D97706' },
    { min: 0,  label: 'Tier 4 — Decline',             action: 'Not recommended at this time. Notify sponsor with written rationale.',          color: '#DC2626' }
  ];

  function calcComposite() {
    let score = 0;
    calcSliders.forEach(s => {
      const w = weights[s.id] || 0;
      score += (parseInt(s.value) || 0) * w;
    });
    return Math.round(score);
  }

  function getTier(score) {
    return tiers.find(t => score >= t.min) || tiers[tiers.length - 1];
  }

  function updateCalc() {
    if (!scoreDisplay) return;

    // Update individual value displays
    calcSliders.forEach(s => {
      const display = document.getElementById(s.id + '-val');
      if (display) display.textContent = s.value;
    });

    const score = calcComposite();
    scoreDisplay.textContent = score;

    const tier = getTier(score);
    if (tierDisplay) {
      tierDisplay.textContent = tier.label;
      tierDisplay.style.color = tier.color;
    }
    if (tierAction) tierAction.textContent = tier.action;

    // Update score ring gradient
    const ring = document.getElementById('scoreRing');
    if (ring) {
      ring.style.background = `conic-gradient(${tier.color} ${score}%, #E2E8F0 0%)`;
    }
  }

  calcSliders.forEach(s => s.addEventListener('input', updateCalc));
  if (calcSliders.length) updateCalc();

  /* -----------------------------------------------------------
     6. ANIMATE WEIGHT BARS ON SCROLL
     ----------------------------------------------------------- */
  const fills = document.querySelectorAll('.w-bar-fill[data-w]');

  if ('IntersectionObserver' in window && fills.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.w;
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    fills.forEach(f => { f.style.width = '0%'; obs.observe(f); });
  } else {
    fills.forEach(f => { f.style.width = f.dataset.w; });
  }

  /* -----------------------------------------------------------
     7. SMOOTH SCROLL
     ----------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* -----------------------------------------------------------
     8. COPY-TO-CLIPBOARD
     ----------------------------------------------------------- */
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', function () {
      const el = document.getElementById(this.dataset.copy);
      if (!el) return;
      navigator.clipboard.writeText(el.innerText).then(() => {
        const orig = this.textContent;
        this.textContent = '✓ Copied';
        this.style.background = '#059669';
        setTimeout(() => { this.textContent = orig; this.style.background = ''; }, 2000);
      }).catch(() => {
        // Fallback for older browsers
        const range = document.createRange();
        range.selectNode(el);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        const orig = this.textContent;
        this.textContent = '✓ Copied';
        setTimeout(() => { this.textContent = orig; }, 2000);
      });
    });
  });

  /* -----------------------------------------------------------
     9. KPI SEARCH FILTER
     ----------------------------------------------------------- */
  const kpiSearch = document.getElementById('kpiSearch');
  if (kpiSearch) {
    kpiSearch.addEventListener('input', function () {
      const q = this.value.toLowerCase().trim();
      document.querySelectorAll('.kpi-row').forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
      // Show count
      const counter = document.getElementById('kpiCount');
      if (counter) {
        const visible = document.querySelectorAll('.kpi-row:not([style*="none"])').length;
        counter.textContent = q ? `${visible} result${visible !== 1 ? 's' : ''}` : '';
      }
    });
  }

  /* -----------------------------------------------------------
     10. RESET CALCULATOR
     ----------------------------------------------------------- */
  const resetBtn = document.getElementById('calcReset');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      calcSliders.forEach(s => { s.value = 50; });
      updateCalc();
    });
  }

  /* -----------------------------------------------------------
     11. FRAMEWORK COMPONENT — hash-based tab init + score init
     ----------------------------------------------------------- */
  var hash = window.location.hash.replace('#', '');
  if (['intake','score','kpis','pipeline'].indexOf(hash) !== -1) {
    showTab(hash);
  } else if (document.querySelector('.fw')) {
    showTab('intake');
  }
  if (document.getElementById('s0')) {
    updateScore();
  }

});
