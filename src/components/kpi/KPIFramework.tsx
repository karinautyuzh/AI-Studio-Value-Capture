import React, { useState } from 'react';
import { KPI, KPIStatus } from '../../types';
import KPICard from './KPICard';

interface KPIFrameworkProps {
  kpis: KPI[];
  onKpisChange: (kpis: KPI[]) => void;
}

const statusOptions: { value: KPIStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All KPIs' },
  { value: 'tracking-live', label: 'Tracking Live' },
  { value: 'tbd', label: 'TBD' },
  { value: 'baseline-confirmed', label: 'Baseline Confirmed' },
  { value: 'on-track', label: 'On Track' },
  { value: 'at-risk', label: 'At Risk' },
];

export default function KPIFramework({ kpis, onKpisChange }: KPIFrameworkProps) {
  const [statusFilter, setStatusFilter] = useState<KPIStatus | 'all'>('all');

  const filtered = statusFilter === 'all' ? kpis : kpis.filter((k) => k.status === statusFilter);

  const handleUpdate = (updated: KPI) => {
    onKpisChange(kpis.map((k) => (k.id === updated.id ? updated : k)));
  };

  return (
    <div className="space-y-4">
      {/* Header + filter */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="section-title">KPI Framework</h2>
          <p className="section-subtitle">6 KPIs across time savings, quality, adoption, and user experience</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Filter:</span>
          <div className="flex gap-1 flex-wrap">
            {statusOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setStatusFilter(opt.value)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  statusFilter === opt.value
                    ? 'bg-primary text-white'
                    : 'bg-white border border-tfs-gray text-gray-500 hover:border-primary hover:text-primary'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stat bar */}
      <div className="flex gap-4 text-sm">
        {(['tracking-live', 'tbd', 'baseline-confirmed', 'on-track', 'at-risk'] as KPIStatus[]).map((s) => {
          const count = kpis.filter((k) => k.status === s).length;
          if (count === 0) return null;
          return (
            <span key={s} className="text-gray-500">
              <span className="font-semibold text-tfs-charcoal">{count}</span>{' '}
              {s.replace(/-/g, ' ')}
            </span>
          );
        })}
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4">
        {filtered.map((kpi) => (
          <KPICard key={kpi.id} kpi={kpi} onUpdate={handleUpdate} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card p-8 text-center text-gray-400 text-sm">
          No KPIs match the selected filter.
        </div>
      )}
    </div>
  );
}
