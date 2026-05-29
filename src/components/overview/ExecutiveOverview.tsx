import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Clock, ShieldAlert, TrendingUp, CheckCircle2, AlertCircle, Circle, Zap, MessageSquare, FlaskConical } from 'lucide-react';
import { KPI, CalculatorInputs } from '../../types';
import {
  calcTotalAnnualHoursSaved,
  calcCountryAnnualHoursSaved,
  calcSiteAnnualHoursSaved,
  calcTotalHardValue,
} from '../../lib/calculations';
import { formatNumber, formatCurrency } from '../../lib/utils';
import { pipelineData } from '../../data/pipeline';

interface ExecutiveOverviewProps {
  kpis: KPI[];
  calculatorInputs: CalculatorInputs;
}

const problemCards = [
  {
    icon: <Clock size={20} className="text-primary" />,
    label: 'Time',
    headline: '18+ hours per ICF',
    body: 'Country and site ICF adaptations require 6–12 hours each of manual effort per document — scaling linearly with study volume and creating a direct headcount constraint.',
    bg: 'bg-red-50',
    border: 'border-red-200',
  },
  {
    icon: <ShieldAlert size={20} className="text-amber-600" />,
    label: 'Risk',
    headline: 'Manual = compliance exposure',
    body: 'Version control gaps, inconsistent plain-language QC, and manual query tracking create quality events and regulatory risk that compound at scale.',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
  {
    icon: <TrendingUp size={20} className="text-tfs-teal" />,
    label: 'Scale',
    headline: 'Growth blocked by headcount',
    body: 'Without automation, ICF throughput is linearly constrained by team capacity. Sponsor growth and FSP expansion require eliminating this dependency.',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
  },
];

const kpiStatusConfig: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
  'tracking-live':      { color: 'text-tfs-teal',  icon: <CheckCircle2 size={13} className="text-tfs-teal" />,  label: 'Tracking Live' },
  'on-track':           { color: 'text-tfs-teal',  icon: <CheckCircle2 size={13} className="text-tfs-teal" />,  label: 'On Track' },
  'baseline-confirmed': { color: 'text-tfs-blue',  icon: <CheckCircle2 size={13} className="text-tfs-blue" />,  label: 'Baseline Confirmed' },
  'at-risk':            { color: 'text-amber-600', icon: <AlertCircle  size={13} className="text-amber-600" />, label: 'At Risk' },
  'tbd':                { color: 'text-gray-400',  icon: <Circle       size={13} className="text-gray-300" />,  label: 'TBD' },
};

export default function ExecutiveOverview({ kpis, calculatorInputs }: ExecutiveOverviewProps) {
  const [icfsInScope, setIcfsInScope] = useState(420);

  const totalProjected  = calcTotalAnnualHoursSaved(calculatorInputs);
  const countryProjected = calcCountryAnnualHoursSaved(calculatorInputs);
  const siteProjected   = calcSiteAnnualHoursSaved(calculatorInputs);
  const totalHardValue  = calcTotalHardValue(calculatorInputs);
  const trackingLive    = kpis.filter((k) => k.status === 'tracking-live').length;
  const readinessScore  = Math.round((trackingLive / kpis.length) * 100);

  const pipelineTotal = pipelineData.reduce((s, p) => s + p.projectedHoursSaved, 0);

  const chartData = pipelineData.map((p) => ({
    quarter: p.quarter.replace(' 2026', ''),
    projected: p.projectedHoursSaved,
    actual: p.actualHoursSaved ?? 0,
  }));

  return (
    <div className="space-y-6">

      {/* ── Hero banner ── */}
      <div className="rounded-xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #BE0000 0%, #7a0000 100%)' }}>
        <div className="px-6 pt-5 pb-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 text-white text-xs font-semibold">
              <Zap size={10} /> AI Studio Value Capture
            </span>
            <span className="text-red-300 text-xs">·</span>
            <span className="text-red-200 text-xs font-medium">ICF Assistant — Featured Use Case</span>
          </div>
          <div className="grid grid-cols-4 gap-4 pb-5">
            <div>
              <div className="text-red-200 text-[10px] uppercase tracking-widest font-semibold mb-1">Projected Hrs / yr</div>
              <div className="text-3xl font-bold text-white">{formatNumber(totalProjected)}</div>
              <div className="text-red-300 text-xs mt-1">Country + Site combined</div>
            </div>
            <div>
              <div className="text-red-200 text-[10px] uppercase tracking-widest font-semibold mb-1">Projected Hard Value</div>
              <div className="text-3xl font-bold text-white">{formatCurrency(totalHardValue)}</div>
              <div className="text-red-300 text-xs mt-1">Hours saved + QE avoided</div>
            </div>
            <div>
              <div className="text-red-200 text-[10px] uppercase tracking-widest font-semibold mb-1">2026 Pipeline Total</div>
              <div className="text-3xl font-bold text-white">{formatNumber(pipelineTotal)}</div>
              <div className="text-red-300 text-xs mt-1">Projected hours across Q1–Q4</div>
            </div>
            <div>
              <div className="text-red-200 text-[10px] uppercase tracking-widest font-semibold mb-1">KPI Readiness</div>
              <div className="text-3xl font-bold text-white">{readinessScore}%</div>
              <div className="text-red-300 text-xs mt-1">{trackingLive} of {kpis.length} KPIs tracking live</div>
            </div>
          </div>
        </div>
        {/* Bottom strip */}
        <div className="bg-black/20 px-6 py-2.5 flex items-center gap-6 text-xs text-red-200">
          <span>Thermo Fisher Scientific</span>
          <span className="text-red-400">·</span>
          <span>Accenture AI Studio</span>
          <span className="text-red-400">·</span>
          <span>2026 Value Realization</span>
          <span className="text-red-400">·</span>
          <span className="ml-auto font-semibold text-white">Portfolio-Ready Framework</span>
        </div>
      </div>

      {/* ── Business problem ── */}
      <div>
        <h2 className="section-title">The Business Problem</h2>
        <div className="grid grid-cols-3 gap-4">
          {problemCards.map((card) => (
            <div key={card.label} className={`card p-5 border ${card.border} ${card.bg}`}>
              <div className="flex items-center gap-2 mb-3">
                {card.icon}
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{card.label}</span>
              </div>
              <div className="text-sm font-bold text-tfs-charcoal mb-2">{card.headline}</div>
              <p className="text-xs text-gray-600 leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stats + Pipeline chart ── */}
      <div className="grid grid-cols-2 gap-5">
        {/* Stat cards */}
        <div>
          <h2 className="section-title">Value Realization Snapshot</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="card p-4">
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Country Hours / yr</div>
              <div className="text-2xl font-bold text-tfs-charcoal">{formatNumber(countryProjected)}</div>
              <div className="text-xs text-gray-400 mt-1">@ 12 hrs/doc × 120 docs</div>
            </div>
            <div className="card p-4">
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Site Hours / yr</div>
              <div className="text-2xl font-bold text-tfs-charcoal">{formatNumber(siteProjected)}</div>
              <div className="text-xs text-gray-400 mt-1">@ 6 hrs/doc × 300 docs</div>
            </div>
            <div className="card p-4">
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">QE Reduction Target</div>
              <div className="text-2xl font-bold text-amber-500">20%</div>
              <div className="text-xs text-gray-400 mt-1">Baseline TBD — Q3 2026</div>
            </div>
            <div className="card p-4">
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Adoption (KPI 6)</div>
              <div className="text-2xl font-bold text-tfs-teal">Pilot</div>
              <div className="text-xs text-gray-400 mt-1">Target: 100% eligible ICFs</div>
            </div>
            <div className="card p-4 col-span-2">
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Documents in Scope (editable)</div>
              <div className="flex items-baseline gap-2">
                <input
                  type="number"
                  value={icfsInScope}
                  onChange={(e) => setIcfsInScope(Number(e.target.value))}
                  className="w-28 text-2xl font-bold text-tfs-blue bg-transparent border-b-2 border-tfs-blue focus:outline-none"
                />
                <span className="text-sm text-gray-400">docs / yr</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">Country + Site eligible ICFs — edit to model different scope</div>
            </div>
          </div>
        </div>

        {/* Pipeline bar chart */}
        <div>
          <h2 className="section-title">2026 Value Pipeline — Projected Hours Saved</h2>
          <div className="card p-5 h-[calc(100%-2rem)]">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={chartData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8E8E4" vertical={false} />
                <XAxis dataKey="quarter" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={36} />
                <Tooltip
                  formatter={(v: unknown) => [`${formatNumber(Number(v))} hrs`, undefined]}
                  contentStyle={{ fontSize: 12, borderRadius: 6, border: '1px solid #E8E8E4' }}
                />
                <Bar dataKey="projected" name="Projected" fill="#BE0000" radius={[4, 4, 0, 0]} opacity={0.9} />
                <Bar dataKey="actual"    name="Actual"    fill="#00857C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-5 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm bg-primary inline-block" /> Projected</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm bg-tfs-teal inline-block" /> Actual</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Emerging Value Levers ── */}
      <div>
        <h2 className="section-title">Emerging Value Levers</h2>
        <p className="section-subtitle mb-3">Additional value dimensions being tracked — baseline data pending</p>
        <div className="grid grid-cols-2 gap-4">
          {/* Query Reduction */}
          <div className="card border-l-4 border-l-primary p-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-red-50 flex-shrink-0">
                <MessageSquare size={18} className="text-primary" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mb-0.5">KPI 7 · Placeholder</div>
                <h3 className="font-semibold text-tfs-charcoal text-sm">ICF PM Query Reduction</h3>
              </div>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed mb-3">
              Reduction in query cycles per ICF adaptation. Fewer queries accelerates country/site ICF approval and study startup timelines. Query management workflow enablement targeted Q2–Q3 2026.
            </p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-tfs-offwhite rounded p-2.5">
                <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">Baseline</div>
                <div className="text-sm font-bold text-gray-400">No data yet</div>
              </div>
              <div className="bg-tfs-offwhite rounded p-2.5">
                <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">Target</div>
                <div className="text-sm font-bold text-gray-400">TBD</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-gray-400">
              <Circle size={10} className="text-gray-300" />
              <span>Measurable from: Q2–Q3 2026 · Data source: Query management workflow (pending go-live)</span>
            </div>
            <div className="mt-2 text-[10px] text-amber-700 bg-amber-50 border border-amber-200 rounded px-2.5 py-1.5">
              ⚠ Do not overstate — baseline not yet established. Value will be quantified once query management workflow is live.
            </div>
          </div>

          {/* AI Accuracy */}
          <div className="card border-l-4 border-l-tfs-blue p-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-blue-50 flex-shrink-0">
                <FlaskConical size={18} className="text-tfs-blue" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mb-0.5">Measurement Model In Definition</div>
                <h3 className="font-semibold text-tfs-charcoal text-sm">AI Accuracy & Document Quality</h3>
              </div>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed mb-3">
              Tracking AI output quality and document accuracy across ICF adaptations. Measurement approach is still being defined — placeholder metrics identified below.
            </p>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { label: 'First-Pass Acceptance', value: 'TBD' },
                { label: 'Human Correction Rate', value: 'TBD' },
                { label: 'Compliance Completeness', value: 'TBD' },
              ].map((m) => (
                <div key={m.label} className="bg-tfs-offwhite rounded p-2">
                  <div className="text-[10px] text-gray-400 leading-tight mb-0.5">{m.label}</div>
                  <div className="text-sm font-bold text-gray-300">{m.value}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-[10px] text-gray-400">
              <Circle size={10} className="text-gray-300" />
              <span>Measurable from: Q2–Q3 2026 · Measurement model in definition</span>
            </div>
            <div className="mt-2 text-[10px] text-blue-700 bg-blue-50 border border-blue-200 rounded px-2.5 py-1.5">
              Accuracy measurement approach is still being defined. Additional metrics: AI accuracy score, review comments/doc, rework rate.
            </div>
          </div>
        </div>
      </div>

      {/* ── KPI status table ── */}
      <div>
        <h2 className="section-title">KPI Status at a Glance</h2>
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-tfs-offwhite border-b border-tfs-gray">
                {['#', 'KPI', 'Status', 'Measurable From', 'Projected Impact'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {kpis.map((kpi, i) => {
                const cfg = kpiStatusConfig[kpi.status] ?? kpiStatusConfig['tbd'];
                return (
                  <tr key={kpi.id} className={`border-b border-tfs-gray/50 ${i % 2 === 0 ? 'bg-white' : 'bg-tfs-offwhite/40'}`}>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold">
                        {kpi.number}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-tfs-charcoal text-sm">{kpi.title}</td>
                    <td className="px-4 py-3">
                      <span className={`flex items-center gap-1.5 text-xs font-medium ${cfg.color}`}>
                        {cfg.icon} {cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{kpi.measurableFrom}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{kpi.projectedImpact}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
