import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { IcfSegment, PhasingQuarter, CalculatorInputs, KPI, ScoringCategory, ReportingConfig } from '../types';
import { defaultIcfSegments } from '../data/icfSegments';
import { defaultPhasingModel } from '../data/phasingModel';
import { defaultKPIs } from '../data/kpis';
import { defaultScoringCategories } from '../data/scoring';

const STORAGE_KEY = 'icf-dashboard-state-v1';

export interface DashboardState {
  reportingConfig: ReportingConfig;
  calculatorInputs: CalculatorInputs;
  icfSegments: IcfSegment[];
  phasingModel: PhasingQuarter[];
  kpis: KPI[];
  scoringCategories: ScoringCategory[];
}

const DEFAULT_STATE: DashboardState = {
  reportingConfig: {
    mode: 'quarterly',
    year: 2026,
    monthlyStart: '2026-07',
    monthlyEnd: '2026-09',
    quarter: 'Q3',
    customStart: '2026-07-01',
    customEnd: '2026-09-30',
  },
  calculatorInputs: {
    countryBaseline: 12, countryTargetReduction: 50, countryAnnualVolume: 120,
    siteBaseline: 6, siteTargetReduction: 50, siteAnnualVolume: 300,
    hourlyRate: 125,
    qeCriticalCount: 0, qeCriticalCost: 2894,
    qeMajorCount: 11, qeMajorCost: 1820,
    qeMinorCount: 12, qeMinorCost: 894,
    qeTargetReduction: 20,
    endToEndBaseline: 30, endToEndTargetReduction: 25, annualStudyVolume: 40,
  },
  icfSegments: defaultIcfSegments,
  phasingModel: defaultPhasingModel,
  kpis: defaultKPIs,
  scoringCategories: defaultScoringCategories,
};

function loadState(): DashboardState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const saved = JSON.parse(raw);
    return {
      ...DEFAULT_STATE,
      ...saved,
      reportingConfig: { ...DEFAULT_STATE.reportingConfig, ...(saved.reportingConfig ?? {}) },
      calculatorInputs: { ...DEFAULT_STATE.calculatorInputs, ...(saved.calculatorInputs ?? {}) },
    };
  } catch { return DEFAULT_STATE; }
}

function saveState(s: DashboardState) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch { /* ignore */ }
}

export interface DashboardContextValue {
  state: DashboardState;
  updateReportingConfig: (cfg: Partial<ReportingConfig>) => void;
  updateCalculatorInputs: (inp: Partial<CalculatorInputs>) => void;
  updateSegments: (segs: IcfSegment[]) => void;
  updatePhasingModel: (model: PhasingQuarter[]) => void;
  updateKpis: (kpis: KPI[]) => void;
  updateScoringCategories: (cats: ScoringCategory[]) => void;
  resetToDefaults: () => void;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DashboardState>(loadState);

  const set = useCallback((partial: Partial<DashboardState>) => {
    setState(prev => {
      const next = { ...prev, ...partial };
      saveState(next);
      return next;
    });
  }, []);

  const ctx: DashboardContextValue = {
    state,
    updateReportingConfig: cfg => set({ reportingConfig: { ...state.reportingConfig, ...cfg } }),
    updateCalculatorInputs: inp => set({ calculatorInputs: { ...state.calculatorInputs, ...inp } }),
    updateSegments: segs => set({ icfSegments: segs }),
    updatePhasingModel: model => set({ phasingModel: model }),
    updateKpis: kpis => set({ kpis }),
    updateScoringCategories: cats => set({ scoringCategories: cats }),
    resetToDefaults: () => { localStorage.removeItem(STORAGE_KEY); setState(DEFAULT_STATE); },
  };

  return <DashboardContext.Provider value={ctx}>{children}</DashboardContext.Provider>;
}

export function useDashboard(): DashboardContextValue {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error('useDashboard must be inside DashboardProvider');
  return ctx;
}
