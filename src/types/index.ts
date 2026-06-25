export type IcfSegmentCategory = 'country-main' | 'country-additional' | 'country-amendment' | 'site-initial' | 'site-amendment';

export interface IcfSegment {
  id: string;
  name: string;
  category: IcfSegmentCategory;
  icfsPerYear: number;
  casHoursPerIcf: number;
  potentialAiImpactPct: number;
  adoptionPct: number;
}

export interface PhasingQuarter {
  id: string;
  label: string;
  potentialAiImpactPct: number;
  adoptionPct: number;
  totalRealizedPct: number;
}

export interface AssumptionsConfig {
  valueAssumptionsStatus: 'assumed' | 'estimated' | 'partially-validated' | 'confirmed';
  baselineValidationStatus: 'assumed' | 'estimated' | 'partially-validated' | 'confirmed';
  dataMaturityStatus: 'assumed' | 'estimated' | 'partially-validated' | 'confirmed';
  assumptionConfidenceScore: number;
  dataMaturityScore: number;
}

export type KPIStatus = 'tbd' | 'baseline-confirmed' | 'tracking-live' | 'at-risk' | 'on-track';
export type PhaseStatus = 'complete' | 'in-progress' | 'upcoming' | 'future';

export interface KPI {
  id: string;
  number: number;
  title: string;
  definition: string;
  baseline: number | null;
  baselineUnit: string;
  baselineLabel: string;
  target: number | null;
  targetUnit: string;
  targetLabel: string;
  currentActual: number | null;
  status: KPIStatus;
  formula: string;
  owner: string;
  dataSource: string;
  projectedImpact: string;
  actualImpact: string | null;
  measurableFrom: string;
  notes: string;
}

export interface RoadmapPhase {
  id: string;
  name: string;
  timing: string;
  status: PhaseStatus;
  targetDate: string;
  capabilities: string[];
  kpisUnlocked: string[];
  valueMilestone: string;
  dependencies: string[];
  completedCapabilities: string[];
}

export interface PipelinePhase {
  id: string;
  phase: string;
  quarter: string;
  capabilitiesPlanned: string[];
  capabilitiesCompleted: string[];
  projectedHoursSaved: number;
  actualHoursSaved: number | null;
  kpisMeasurable: string[];
  risks: string[];
  status: PhaseStatus;
}

export interface ScoringCategory {
  id: string;
  name: string;
  projectedScore: number;
  actualScore: number;
  weight: number;
  description: string;
  drivers: string[];
}

export interface ReadinessItem {
  id: string;
  name: string;
  status: 'ready' | 'partial' | 'not-ready' | 'future';
  owner: string;
  dependency: string;
  notes: string;
  readinessContribution: number;
  category: string;
}

export interface AssumptionItem {
  id: string;
  question: string;
  category: string;
  status: 'open' | 'confirmed' | 'in-progress' | 'blocked';
  owner: string;
  impact: 'high' | 'medium' | 'low';
  notes: string;
  targetDate: string;
}

export type ReportingMode = 'monthly' | 'quarterly' | 'custom';

export interface ReportingConfig {
  mode: ReportingMode;
  year: number;           // 2026 | 2027 | 2028
  monthlyStart: string;   // YYYY-MM
  monthlyEnd: string;     // YYYY-MM
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  customStart: string;    // YYYY-MM-DD
  customEnd: string;      // YYYY-MM-DD
}

export interface CalculatorInputs {
  countryBaseline: number;
  countryTargetReduction: number;
  countryAnnualVolume: number;
  siteBaseline: number;
  siteTargetReduction: number;
  siteAnnualVolume: number;
  hourlyRate: number;
  // Severity-based QE model (ICF adaptation/customization QEs only — version-correction excluded)
  qeCriticalCount: number;
  qeCriticalCost: number;
  qeMajorCount: number;
  qeMajorCost: number;
  qeMinorCount: number;
  qeMinorCost: number;
  qeTargetReduction: number;
  endToEndBaseline: number;
  endToEndTargetReduction: number;
  annualStudyVolume: number;
}
