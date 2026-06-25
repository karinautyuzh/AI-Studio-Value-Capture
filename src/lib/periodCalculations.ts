import { ReportingConfig, PhasingQuarter } from '../types';

export function getPhasingPctForQuarter(q: string, year: number, model: PhasingQuarter[]): number {
  const label = `${q} ${year}`;
  return model.find(p => p.label === label)?.totalRealizedPct ?? 35;
}

function daysBetween(start: string, end: string): number {
  return Math.max(1, Math.round((new Date(end).getTime() - new Date(start).getTime()) / 86400000) + 1);
}

export function getPeriodMultiplier(config: ReportingConfig): number {
  if (config.mode === 'monthly') return 1 / 12;
  if (config.mode === 'quarterly') return 1 / 4;
  return daysBetween(config.customStart, config.customEnd) / 365;
}

export function getEffectivePhasingPct(config: ReportingConfig, model: PhasingQuarter[]): number {
  if (config.mode === 'quarterly') {
    return getPhasingPctForQuarter(config.quarter, config.year, model);
  }
  if (config.mode === 'monthly') {
    const month = parseInt(config.monthlyStart.split('-')[1], 10);
    const year = parseInt(config.monthlyStart.split('-')[0], 10);
    const q = month <= 3 ? 'Q1' : month <= 6 ? 'Q2' : month <= 9 ? 'Q3' : 'Q4';
    return getPhasingPctForQuarter(q, year, model);
  }
  return 35;
}

export function getPeriodLabel(config: ReportingConfig): string {
  if (config.mode === 'monthly') return `${config.monthlyStart} – ${config.monthlyEnd}`;
  if (config.mode === 'quarterly') return `${config.quarter} ${config.year}`;
  return `${config.customStart} – ${config.customEnd}`;
}

export function annualToPeriod(annual: number, config: ReportingConfig): number {
  return annual * getPeriodMultiplier(config);
}
