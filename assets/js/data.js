/* ============================================================
   AI Framework — Central Data Store v3.0
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

const BU_OPTIONS = ['CRA','BioA','CLS','ICF','Other'];
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
    id:'cra-findings-dashboard', name:'CRA Findings & Deviations Dashboard',
    businessUnit:'CRA', aiType:'Decision support', regulatory:'GxP-regulated', status:'Active',
    problemStatement:'Findings and deviations data is fragmented across systems, making it difficult for CRAs and study teams to surface systemic issues, monitor aging items, or prioritize resolution across the portfolio.',
    proposedSolution:'An AI-powered dashboard aggregates findings, deviations, and CAPAs across all active studies, surfacing trends, aging items, and risk signals — enabling proactive management rather than reactive firefighting.',
    estimatedUsers:'11–50', dataAvailability:'Readily available', complexity:'Medium (1–3 months)', sponsor:'Head of Clinical Operations',
    valueLevers:['quality','productivity','risk'],
    kpiTags:['findings-resolution','audit-findings','throughput','qa-acceptance'],
    homeKPI:'45-day findings resolution rate · Systemic issue detection speed',
    kvqs:[
      'What percentage of findings exceed the 45-day resolution window today, and where does delay originate?',
      'How much time do study managers spend manually aggregating findings data for status reviews?',
      'How often are systemic cross-study issues identified too late to prevent escalation?',
      'How would a unified findings view change prioritization decisions at the portfolio level?'
    ],
    scores:{ quality:5, productivity:4, cost:3, revenue:3, risk:5 },
    feasibility:{ dataReadiness:4, techComplexity:3, regulatoryRisk:3 },
    productivityAssumption:{ hourlyRate:70, hoursPerTask:3, tasksPerYear:350 },
    compositeScore:77,
    projections:{ hoursSaved:1050, usersAffected:30, cycleTimePct:45, costSavings:110000, productivitySavings:73500 },
    actuals:     { hoursSaved:870,  usersAffected:26, cycleTimePct:38, costSavings:88000, productivitySavings:59000 }
  },
  {
    id:'bioa-report-compilation', name:'BioA Manual Study Report Compilation',
    businessUnit:'BioA', aiType:'Generative AI – document drafting', regulatory:'GxP-regulated', status:'Evaluating',
    problemStatement:'Bioanalytical scientists spend significant time manually compiling assay data, QC results, and narrative sections into study reports — creating inconsistency across authors and delaying sponsor deliverables.',
    proposedSolution:'AI synthesizes structured assay data, QC summaries, and historical report patterns into high-quality draft narratives, reducing authoring effort and improving report consistency while remaining GxP-compliant.',
    estimatedUsers:'11–50', dataAvailability:'Readily available', complexity:'Medium (1–3 months)', sponsor:'VP, Bioanalytical Sciences',
    valueLevers:['quality','productivity','cost','revenue'],
    kpiTags:['cycle-time','review-cycles','authoring-hours','throughput','ftes-saved'],
    homeKPI:'Cycle time per report · First-pass QA acceptance rate',
    kvqs:[
      'Where in the BioA reporting process do scientists spend the most non-value-added time — drafting, reformatting, or copy-paste?',
      'How much of report cycle time is driven by initial authoring versus downstream review and rework?',
      'What quality issues (missing sections, inconsistent formatting) create sponsor dissatisfaction or re-submission today?',
      'How would faster, more consistent draft reports affect BioA throughput or capacity constraints?'
    ],
    scores:{ quality:5, productivity:4, cost:3, revenue:3, risk:4 },
    feasibility:{ dataReadiness:5, techComplexity:2, regulatoryRisk:2 },
    productivityAssumption:{ hourlyRate:75, hoursPerTask:4, tasksPerYear:300 },
    compositeScore:79,
    projections:{ hoursSaved:1200, usersAffected:18, cycleTimePct:40, costSavings:160000, productivitySavings:90000 },
    actuals:     { hoursSaved:null, usersAffected:null, cycleTimePct:null, costSavings:null, productivitySavings:null }
  },
  {
    id:'cls-protocol-translation', name:'CLS Manual Protocol-to-Lab Spec Translation',
    businessUnit:'CLS', aiType:'Workflow automation', regulatory:'GxP-regulated', status:'Evaluating',
    problemStatement:'Central Lab Services teams manually translate study protocols into lab specification documents — a repetitive, error-prone process that slows study startup and introduces configuration inconsistencies across sites.',
    proposedSolution:'AI extracts structured lab requirements from protocol documents and auto-populates lab specification templates, reducing manual effort, accelerating setup time, and flagging ambiguities for human review.',
    estimatedUsers:'11–50', dataAvailability:'Readily available', complexity:'Medium (1–3 months)', sponsor:'Director, Central Lab Services',
    valueLevers:['quality','productivity','cost','risk'],
    kpiTags:['setup-time','error-rate','data-integrity','startup-time','rework-cost'],
    homeKPI:'Lab spec setup time · Configuration error rate per study',
    kvqs:[
      'How much time does protocol-to-lab-spec translation currently take per study, and what portion is purely rules-based?',
      'Where do configuration errors most commonly originate, and what is the downstream impact on timelines or quality?',
      'How does lab spec setup speed affect overall study startup milestones?',
      'What is the compliance risk of inconsistent lab configurations across sites and studies?'
    ],
    scores:{ quality:5, productivity:4, cost:4, revenue:3, risk:4 },
    feasibility:{ dataReadiness:4, techComplexity:3, regulatoryRisk:3 },
    productivityAssumption:{ hourlyRate:65, hoursPerTask:3, tasksPerYear:400 },
    compositeScore:78,
    projections:{ hoursSaved:1200, usersAffected:22, cycleTimePct:55, costSavings:130000, productivitySavings:78000 },
    actuals:     { hoursSaved:null, usersAffected:null, cycleTimePct:null, costSavings:null, productivitySavings:null }
  },
  {
    id:'icf-country-workflow', name:'ICF Master to Country to Site Workflow',
    businessUnit:'ICF', aiType:'Generative AI – document drafting', regulatory:'GxP-regulated', status:'Intake',
    problemStatement:'Adapting master ICFs for individual countries and sites requires multiple handoffs between legal, clinical, and regulatory teams — driving rework, version confusion, and delays in study startup timelines.',
    proposedSolution:'AI automates the ICF adaptation workflow from master template through country-specific and site-level versions, applying regulatory language rules and flagging deviations for human review before submission.',
    estimatedUsers:'11–50', dataAvailability:'Partial – needs work', complexity:'High (3–6 months)', sponsor:'Head of Regulatory Affairs',
    valueLevers:['quality','productivity','cost','risk'],
    kpiTags:['cycle-time','startup-time','rework-cost','authoring-hours','review-cycles'],
    homeKPI:'Study startup time · ICF adaptation cycle time per country',
    kvqs:[
      'How much time is currently spent adapting the master ICF for each country and site across a typical study?',
      'Where do handoffs between legal, clinical, and regulatory teams introduce the most delay or rework?',
      'What risks arise from incorrect regulatory language or template selection during country adaptation?',
      'How does faster ICF adaptation affect study startup milestones and sponsor satisfaction?'
    ],
    scores:{ quality:4, productivity:4, cost:3, revenue:3, risk:4 },
    feasibility:{ dataReadiness:3, techComplexity:3, regulatoryRisk:3 },
    productivityAssumption:{ hourlyRate:80, hoursPerTask:6, tasksPerYear:150 },
    compositeScore:70,
    projections:{ hoursSaved:900, usersAffected:20, cycleTimePct:45, costSavings:95000, productivitySavings:72000 },
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
var STORAGE_KEY = 'ai_framework_uc_v3';

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
