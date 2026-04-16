/* ============================================================
   AI Framework — Central Data Store v2.0
   ============================================================ */
'use strict';

const LEVER_IDS    = ['quality','productivity','cost','revenue','risk'];
const LEVER_LABELS = {
  quality:      'Quality & speed',
  productivity: 'Productivity savings (soft)',
  cost:         'Cost savings (hard)',
  revenue:      'Revenue uplift',
  risk:         'Risk resiliency'
};
const LEVER_WEIGHTS = { quality:0.25, productivity:0.20, cost:0.20, revenue:0.20, risk:0.15 };
const LEVER_BADGE_CLASS = { quality:'d-qual', productivity:'d-prod', cost:'d-cost', revenue:'d-rev', risk:'d-risk' };

const KPI_TAGS = [
  { id:'cycle-time',           label:'Cycle time per task' },
  { id:'review-cycles',        label:'Review cycle count' },
  { id:'qa-acceptance',        label:'First-pass QA rate' },
  { id:'error-rate',           label:'Error / defect rate' },
  { id:'setup-time',           label:'Setup time reduction' },
  { id:'authoring-hours',      label:'Authoring hours saved' },
  { id:'ftes-saved',           label:'FTE cost per document' },
  { id:'rework-cost',          label:'Rework cost avoidance' },
  { id:'throughput',           label:'Study / task throughput' },
  { id:'audit-findings',       label:'Audit finding rate' },
  { id:'findings-resolution',  label:'45-day findings resolution' },
  { id:'data-integrity',       label:'Data integrity incident rate' },
  { id:'adoption-rate',        label:'AI tool adoption rate' },
  { id:'sponsor-nps',          label:'Sponsor satisfaction / NPS' },
  { id:'startup-time',         label:'Study startup time' }
];

const PRIORITY_TIERS = [
  { min:75, label:'Flagship / Accelerate', badge:'Flagship',     color:'#27500A', bg:'#EAF3DE',
    action:'Strong value + feasibility. Advance to active roadmap immediately.' },
  { min:50, label:'Validate',              badge:'Validate',     color:'#633806', bg:'#FAEEDA',
    action:'Good signal. Validate feasibility and data access before committing resources.' },
  { min:25, label:'Revisit',               badge:'Revisit',      color:'#D97706', bg:'#FFF9E6',
    action:'Weak case currently. Revisit when scope, data, or strategic alignment improves.' },
  { min:0,  label:'Deprioritize',          badge:'Deprioritize', color:'#712B13', bg:'#FAECE7',
    action:'Insufficient value or feasibility case. Decline and document rationale.' }
];

const BU_OPTIONS = ['ASD','CRA','ICF','SDTM','Other'];
const AI_TYPES   = [
  'Generative AI – document drafting',
  'Generative AI – summarization',
  'Workflow automation',
  'QA / validation',
  'Data extraction / structuring',
  'Decision support'
];
const STATUS_OPTIONS = ['Active','Evaluating','Intake','Hold'];

// ----- DEFAULT USE CASE DATA -----
const DEFAULT_USE_CASES = [
  {
    id:'bioa-report', name:'BioA AI-Augmented Report Writing',
    businessUnit:'ASD', aiType:'Generative AI – document drafting', regulatory:'GxP-regulated', status:'Active',
    problemStatement:'Scientists spend significant time manually drafting BioA analytical and study reports, leading to inconsistency, reformatting cycles, and delayed turnaround.',
    proposedSolution:'AI synthesizes structured data and prior report patterns into high-quality draft narratives, reducing authoring effort while remaining GxP-compliant.',
    estimatedUsers:'11–50', dataAvailability:'Readily available', complexity:'Medium (1–3 months)', sponsor:'VP, Analytical Sciences',
    valueLevers:['quality','productivity','cost','revenue'],
    kpiTags:['cycle-time','review-cycles','authoring-hours','throughput','ftes-saved'],
    homeKPI:'Cycle time per report · Error rate at QA intake',
    kvqs:[
      'Where in the current BioA reporting process do scientists spend the most non-value-added time (e.g., drafting, reformatting, copy-paste)?',
      'How much report cycle time is driven by initial drafting vs. downstream review and rework?',
      'What quality issues (inconsistency, missing sections, formatting errors) create rework or client dissatisfaction today?',
      'How would faster, more consistent draft reports change BioA throughput or capacity constraints?'
    ],
    scores:{ quality:5, productivity:4, cost:3, revenue:4, risk:5 },
    feasibility:{ dataReadiness:5, techComplexity:2, regulatoryRisk:2 },
    productivityAssumption:{ hourlyRate:75, hoursPerTask:4, tasksPerYear:300 },
    compositeScore:85,
    projections:{ hoursSaved:1200, usersAffected:15, cycleTimePct:40, costSavings:180000, productivitySavings:90000 },
    actuals:     { hoursSaved:980,  usersAffected:12, cycleTimePct:35, costSavings:145000, productivitySavings:72000 }
  },
  {
    id:'cls-automation', name:'Connexion CLS Automation in GCL',
    businessUnit:'ASD', aiType:'Workflow automation', regulatory:'GxP-regulated', status:'Active',
    problemStatement:'Manual CLS configuration in Connexion LIMS is error-prone, time-consuming, and inconsistent across studies.',
    proposedSolution:'AI automates CLS setup and configuration, reducing manual errors and accelerating setup time.',
    estimatedUsers:'11–50', dataAvailability:'Readily available', complexity:'Medium (1–3 months)', sponsor:'Director, Global Central Labs',
    valueLevers:['quality','productivity','risk','cost'],
    kpiTags:['setup-time','error-rate','data-integrity','throughput'],
    homeKPI:'CLS setup time reduction · Data integrity incident rate',
    kvqs:[
      'How long does CLS setup take today, and what portion is repetitive or rules-based?',
      'Where do CLS errors most commonly originate, and what is the downstream impact (rework, delays, quality risk)?',
      'How does CLS setup speed affect study start timelines or lab throughput?',
      'What is the operational and compliance risk of inconsistent CLS configurations across studies?',
      'How do we measure success: speed, error reduction, or both?'
    ],
    scores:{ quality:5, productivity:4, cost:4, revenue:3, risk:4 },
    feasibility:{ dataReadiness:4, techComplexity:3, regulatoryRisk:3 },
    productivityAssumption:{ hourlyRate:65, hoursPerTask:2, tasksPerYear:400 },
    compositeScore:78,
    projections:{ hoursSaved:800, usersAffected:20, cycleTimePct:60, costSavings:120000, productivitySavings:60000 },
    actuals:     { hoursSaved:650, usersAffected:18, cycleTimePct:50, costSavings:95000,  productivitySavings:48000 }
  },
  {
    id:'cra-qa', name:'Post-Entry CRA QA',
    businessUnit:'CRA', aiType:'QA / validation', regulatory:'GxP-regulated', status:'Evaluating',
    problemStatement:'Post-entry QA is largely manual, catching issues late and consuming high-value QA capacity on low-judgment checks.',
    proposedSolution:'AI performs automated post-entry checks to identify missing fields, inconsistencies, and rule violations before formal QA review.',
    estimatedUsers:'11–50', dataAvailability:'Readily available', complexity:'Medium (1–3 months)', sponsor:'Head of CRA Quality',
    valueLevers:['quality','risk','productivity','cost'],
    kpiTags:['qa-acceptance','error-rate','findings-resolution','audit-findings','rework-cost'],
    homeKPI:'First-pass QA acceptance rate · 45-day findings resolution',
    kvqs:[
      'What percentage of QA findings today are basic completeness or consistency issues?',
      'How much QA capacity is spent on low-judgment checks versus expert review?',
      'How does earlier issue detection affect the 45-day findings resolution requirement?',
      'Where do delayed or missed QA issues create compliance or audit risk?'
    ],
    scores:{ quality:5, productivity:4, cost:3, revenue:2, risk:5 },
    feasibility:{ dataReadiness:5, techComplexity:2, regulatoryRisk:3 },
    productivityAssumption:{ hourlyRate:70, hoursPerTask:1, tasksPerYear:600 },
    compositeScore:76,
    projections:{ hoursSaved:600, usersAffected:30, cycleTimePct:50, costSavings:90000, productivitySavings:45000 },
    actuals:     { hoursSaved:null, usersAffected:null, cycleTimePct:null, costSavings:null, productivitySavings:null }
  },
  {
    id:'cra-prewriting', name:'Pre-writing CRA Assistant',
    businessUnit:'CRA', aiType:'Generative AI – document drafting', regulatory:'GxP-regulated', status:'Evaluating',
    problemStatement:'CRAs spend significant time drafting findings, deviations, and CAPAs from scratch, leading to inconsistency and high review cycle counts.',
    proposedSolution:'GenAI assistant pre-drafts CRA text using standardized language, historical patterns, and structured inputs.',
    estimatedUsers:'51–200', dataAvailability:'Partial – needs work', complexity:'High (3–6 months)', sponsor:'CRA Operations Lead',
    valueLevers:['quality','productivity','risk'],
    kpiTags:['review-cycles','authoring-hours','qa-acceptance','adoption-rate'],
    homeKPI:'Review cycle count · Authoring burden score (pre/post)',
    kvqs:[
      'Which CRA writing tasks are most time-consuming and least differentiated?',
      'How often does poor initial drafting drive review cycles or re-submission?',
      'How does improved consistency help with inspection readiness or sponsor confidence?'
    ],
    scores:{ quality:4, productivity:5, cost:3, revenue:2, risk:4 },
    feasibility:{ dataReadiness:4, techComplexity:3, regulatoryRisk:3 },
    productivityAssumption:{ hourlyRate:70, hoursPerTask:3, tasksPerYear:300 },
    compositeScore:71,
    projections:{ hoursSaved:900, usersAffected:45, cycleTimePct:30, costSavings:60000, productivitySavings:75000 },
    actuals:     { hoursSaved:null, usersAffected:null, cycleTimePct:null, costSavings:null, productivitySavings:null }
  },
  {
    id:'findings-summary', name:'Findings & Deviations Summary',
    businessUnit:'CRA', aiType:'Generative AI – summarization', regulatory:'GxP-regulated', status:'Hold',
    problemStatement:'Systemic issues across studies are identified too late because findings data is siloed and difficult to aggregate manually.',
    proposedSolution:'AI summarizes open and aging findings across studies, highlighting trends and priority actions.',
    estimatedUsers:'11–50', dataAvailability:'Partial – needs work', complexity:'Medium (1–3 months)', sponsor:'Study Operations Director',
    valueLevers:['quality','risk','productivity'],
    kpiTags:['findings-resolution','audit-findings','throughput'],
    homeKPI:'Portfolio-level risk identification speed · Systemic issue detection',
    kvqs:[
      'How often are systemic issues identified too late?',
      'How would clearer summaries improve decision-making at study or portfolio level?'
    ],
    scores:{ quality:3, productivity:3, cost:2, revenue:2, risk:5 },
    feasibility:{ dataReadiness:4, techComplexity:2, regulatoryRisk:3 },
    productivityAssumption:{ hourlyRate:65, hoursPerTask:2, tasksPerYear:200 },
    compositeScore:61,
    projections:{ hoursSaved:400, usersAffected:25, cycleTimePct:40, costSavings:40000, productivitySavings:35000 },
    actuals:     { hoursSaved:null, usersAffected:null, cycleTimePct:null, costSavings:null, productivitySavings:null }
  },
  {
    id:'icf-drafting', name:'ICF Drafting App',
    businessUnit:'ICF', aiType:'Generative AI – document drafting', regulatory:'GxP-regulated', status:'Intake',
    problemStatement:'Country-adapted ICF drafting is time-consuming and error-prone due to manual template selection and regulatory language choices.',
    proposedSolution:'GenAI application generates country-adapted draft ICF documents in Word with Track Changes using protocol metadata and regulatory precedents.',
    estimatedUsers:'11–50', dataAvailability:'Partial – needs work', complexity:'High (3–6 months)', sponsor:'Head of Regulatory Affairs',
    valueLevers:['quality','productivity','cost','risk'],
    kpiTags:['cycle-time','startup-time','rework-cost','authoring-hours'],
    homeKPI:'Study startup time · ICF drafting time per country',
    kvqs:[
      'How much time is currently spent drafting and re-drafting ICFs across countries?',
      'Where do handoffs between legal, clinical, and regulatory teams cause rework?',
      'What risks arise from incorrect template or regulatory language selection?',
      'How does faster ICF drafting affect study startup timelines?'
    ],
    scores:{ quality:4, productivity:4, cost:3, revenue:3, risk:3 },
    feasibility:{ dataReadiness:4, techComplexity:3, regulatoryRisk:3 },
    productivityAssumption:{ hourlyRate:80, hoursPerTask:6, tasksPerYear:150 },
    compositeScore:69,
    projections:{ hoursSaved:700, usersAffected:20, cycleTimePct:50, costSavings:80000, productivitySavings:55000 },
    actuals:     { hoursSaved:null, usersAffected:null, cycleTimePct:null, costSavings:null, productivitySavings:null }
  }
];

// ----- SCORING ENGINE -----
function computeComposite(scores, feasibility) {
  var raw = 0;
  LEVER_IDS.forEach(function(id) { raw += (scores[id] || 1) * (LEVER_WEIGHTS[id] || 0); });
  var feas = ( (feasibility.dataReadiness || 3) + (6-(feasibility.techComplexity||3)) + (6-(feasibility.regulatoryRisk||3)) ) / 15;
  return Math.min(100, Math.round(raw * 16 + feas * 20));
}

function getTier(score) {
  return PRIORITY_TIERS.find(function(t){ return score >= t.min; }) || PRIORITY_TIERS[PRIORITY_TIERS.length-1];
}

function getInterpretation(score, uc) {
  var highLevers = LEVER_IDS.filter(function(id){ return (uc.scores[id]||1) >= 4; });
  var highNames  = highLevers.map(function(id){ return LEVER_LABELS[id]; }).join(' and ');
  var feas = uc.feasibility;
  var lowFeas = feas.dataReadiness < 3 || feas.techComplexity > 3 || feas.regulatoryRisk > 3;

  if (score >= 75) {
    if (lowFeas) return 'This use case shows strong value potential' + (highNames ? ' across ' + highNames : '') + '. Feasibility constraints exist — address data readiness before scaling. Move into active prioritization with a defined readiness plan.';
    return 'This use case demonstrates high value potential with good feasibility' + (highNames ? '. Strongest signals in ' + highNames : '') + '. Advance to the active roadmap immediately.';
  }
  if (score >= 50) {
    if (lowFeas) return 'This use case has a reasonable value case but feasibility gaps — particularly data readiness or regulatory complexity — create delivery risk. Resolve these before committing significant resources.';
    return 'This use case shows moderate value potential' + (highNames ? '. Primary value is in ' + highNames : '') + '. Validate assumptions and confirm data availability before proceeding to build.';
  }
  if (score >= 25) return 'This use case currently shows limited near-term value or faces meaningful feasibility barriers. Revisit when data availability improves or when the business case can be more precisely quantified.';
  return 'This use case shows insufficient value relative to effort and risk at this time. Deprioritize unless core assumptions around value lever strength or feasibility change significantly.';
}

function calcProductivityValue(assumption) {
  return (assumption.hourlyRate || 0) * (assumption.hoursPerTask || 0) * (assumption.tasksPerYear || 0);
}

// ----- STORAGE LAYER -----
var STORAGE_KEY = 'ai_framework_uc_v2';

function loadUseCases() {
  try { var r = localStorage.getItem(STORAGE_KEY); if (r) return JSON.parse(r); } catch(e) {}
  return JSON.parse(JSON.stringify(DEFAULT_USE_CASES));
}
function saveUseCases(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch(e) {}
}
function resetUseCases() { localStorage.removeItem(STORAGE_KEY); location.reload(); }

// ----- HELPERS -----
function fmt$(n) { if (n==null||n==='') return '—'; return '$'+Number(n).toLocaleString(); }
function fmtN(n) { if (n==null||n==='') return '—'; return Number(n).toLocaleString(); }
function fmtPct(n) { if (n==null||n==='') return '—'; return n+'%'; }

// Initialise live state
var USE_CASES = loadUseCases();
USE_CASES.forEach(function(uc){ uc.compositeScore = computeComposite(uc.scores, uc.feasibility); });
