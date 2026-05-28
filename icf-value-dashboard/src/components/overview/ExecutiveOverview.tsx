import React, { useState } from 'react';
import { Clock, ShieldAlert, TrendingUp, CheckCircle2, AlertCircle, Circle } from 'lucide-react';
import { KPI, CalculatorInputs } from '../../types';
import {
  calcTotalAnnualHoursSaved,
  calcCountryAnnualHoursSaved,
  calcSiteAnnualHoursSaved,
} from '../../lib/calculations';
import { formatNumber } from '../../lib/utils';

interface ExecutiveOverviewProps {
  kpis: KPI[];
  calculatorInputs: CalculatorInputs;
}

const problemCards = [
  {
    icon: <Clock size={22} className="text-primary" />,
    title: 'Time',
    headline: '18+ hours per ICF',
    body: 'Country and site ICF adaptations require 6–12 hours each of manual effort from Medical Writers and ICF PMs — a process that scales linearly with study volume.',
    bg: 'bg-red-50',
    border: 'border-red-200',
  },
  {
    icon: <ShieldAlert size={22} className="text-amber-600" />,
    title: 'Risk',
    headline: 'Manual = compliance exposure',
    body: 'Version control gaps, inconsistent language, and missed country-specific requirements create quality events and regulatory risk that are difficult to track systematically.',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
  {
    icon: <TrendingUp size={22} className="text-tfs-teal" />,
    title: 'Scale',
    headline: 'Growth blocked by headcount',
    body: 'Without automation, ICF throughput is constrained by team capacity. Sponsor growth and FSP expansion require removing this linear dependency.',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
  },
];

const kpiStatusColors: Record<string, string> = {
  'tracking-live': 'text-tfs-teal',
  'on-track': 'text-tfs-teal',
  'baseline-confirmed': 'text-tfs-blue',
  'at-risk': 'text-amber-600',
  tbd: 'text-gray-400',
};

const kpiStatusIcons: Record<string, React.ReactNode> = {
  'tracking-live': <CheckCircle2 size={14} className="text-tfs-teal" />,
  'on-track': <CheckCircle2 size={14} className="text-tfs-teal" />,
  'baseline-confirmed': <CheckCircle2 size={14} className="text-tfs-blue" />,
  'at-risk': <AlertCircle size={14} className="text-amber-600" />,
  tbd: <Circle size={14} className="text-gray-300" />,
};

export default function ExecutiveOverview({ kpis, calculatorInputs }: ExecutiveOverviewProps) {
  const [icfsInScope, setIcfsInScope] = useState(420);

  const totalProjected = calcTotalAnnualHoursSaved(calculatorInputs);
  const countryProjected = calcCountryAnnualHoursSaved(calculatorInputs);
  const siteProjected = calcSiteAnnualHoursSaved(calculatorInputs);
  const trackingLive = kpis.filter((k) => k.status === 'tracking-live').length;
  const readinessScore = Math.round((trackingLive / kpis.length) * 100);

  return (
    <div className="space-y-6">
      {/* Framing paragraph */}
      <div className="card p-5">
        <p className="text-sm text-gray-600 leading-relaxed max-w-4xl">
          The <span className="font-semibold text-tfs-charcoal">ICF Assistant Value Framework</span> tracks
          the realized and projected impact of AI-assisted ICF lifecycle automation at Thermo Fisher Scientific.
          This dashboard provides executive visibility into KPI progress, value realization milestones, open
          measurement assumptions, and the capability roadmap — enabling data-driven decisions at each
          quarterly review.
        </p>
      </div>

      {/* Problem cards */}
      <div>
        <h2 className="section-title">The Business Problem</h2>
        <div className="grid grid-cols-3 gap-4">
          {problemCards.map((card) => (
            <div key={card.title} className={`card p-5 border ${card.border} ${card.bg}`}>
              <div className="flex items-center gap-2 mb-3">
                {card.icon}
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{card.title}</span>
              </div>
              <div className="text-base font-bold text-tfs-charcoal mb-2">{card.headline}</div>
              <p className="text-sm text-gray-600 leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary stats */}
      <div>
        <h2 className="section-title">Value Realization Snapshot</h2>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="card p-5">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
              Projected Annual Hours Saved
            </div>
            <div className="text-3xl font-bold text-tfs-charcoal">
              {formatNumber(totalProjected)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Country: {formatNumber(countryProjected)} hrs + Site: {formatNumber(siteProjected)} hrs
            </div>
          </div>
          <div className="card p-5">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
              Actual Hours Saved (YTD)
            </div>
            <div className="text-3xl font-bold text-gray-300">TBD</div>
            <div className="text-xs text-gray-400 mt-1">Pending timestamp validation</div>
          </div>
          <div className="card p-5">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
              QE Reduction Target
            </div>
            <div className="text-3xl font-bold text-amber-500">20%</div>
            <div className="text-xs text-gray-500 mt-1">Baseline TBD — Q3 2026</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="card p-5">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
              Adoption Rate (KPI 6)
            </div>
            <div className="text-3xl font-bold text-tfs-teal">Pilot</div>
            <div className="text-xs text-gray-500 mt-1">Tracking live — full ramp target 100%</div>
          </div>
          <div className="card p-5">
            <div className="flex items-center justify-between mb-1">
              <div className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                ICFs in Scope (editable)
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <input
                type="number"
                value={icfsInScope}
                onChange={(e) => setIcfsInScope(Number(e.target.value))}
                className="w-28 text-3xl font-bold text-tfs-blue bg-transparent border-b-2 border-tfs-blue focus:outline-none"
              />
              <span className="text-sm text-gray-400">docs/yr</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Country + Site eligible ICFs</div>
          </div>
          <div className="card p-5">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
              KPI Measurement Readiness
            </div>
            <div className="text-3xl font-bold text-primary">{readinessScore}%</div>
            <div className="text-xs text-gray-500 mt-1">
              {trackingLive} of {kpis.length} KPIs tracking live
            </div>
          </div>
        </div>
      </div>

      {/* KPI status overview */}
      <div>
        <h2 className="section-title">KPI Status at a Glance</h2>
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-tfs-offwhite border-b border-tfs-gray">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide w-8">#</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">KPI</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Measurable From</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Projected Impact</th>
              </tr>
            </thead>
            <tbody>
              {kpis.map((kpi, i) => (
                <tr key={kpi.id} className={i % 2 === 0 ? 'bg-white' : 'bg-tfs-offwhite/50'}>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold">
                      {kpi.number}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-tfs-charcoal">{kpi.title}</td>
                  <td className="px-4 py-3">
                    <span className={`flex items-center gap-1.5 ${kpiStatusColors[kpi.status]}`}>
                      {kpiStatusIcons[kpi.status]}
                      <span className="text-xs font-medium capitalize">{kpi.status.replace(/-/g, ' ')}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{kpi.measurableFrom}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{kpi.projectedImpact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
