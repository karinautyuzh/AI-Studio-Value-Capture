import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { AssumptionItem } from '../../types';
import { assumptionsData } from '../../data/assumptions';
import { cn } from '../../lib/utils';

const statusConfig: Record<AssumptionItem['status'], { icon: React.ReactNode; badge: string; label: string }> = {
  open: {
    icon: <AlertCircle size={13} />,
    badge: 'bg-red-50 text-primary border-red-200',
    label: 'Open',
  },
  'in-progress': {
    icon: <Clock size={13} />,
    badge: 'bg-blue-50 text-tfs-blue border-blue-200',
    label: 'In Progress',
  },
  confirmed: {
    icon: <CheckCircle2 size={13} />,
    badge: 'bg-teal-50 text-tfs-teal border-teal-200',
    label: 'Confirmed',
  },
  blocked: {
    icon: <XCircle size={13} />,
    badge: 'bg-gray-100 text-gray-500 border-gray-200',
    label: 'Blocked',
  },
};

const impactConfig: Record<AssumptionItem['impact'], string> = {
  high: 'bg-red-100 text-primary border-red-200',
  medium: 'bg-amber-50 text-amber-700 border-amber-200',
  low: 'bg-gray-100 text-gray-500 border-gray-200',
};

const categories = ['All', ...Array.from(new Set(assumptionsData.map((a) => a.category)))];
const statuses = ['All', 'open', 'in-progress', 'confirmed', 'blocked'] as const;

export default function AssumptionsLog() {
  const [items] = useState<AssumptionItem[]>(assumptionsData);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState<'All' | AssumptionItem['status']>('All');

  const filtered = items.filter((item) => {
    const catOk = categoryFilter === 'All' || item.category === categoryFilter;
    const statusOk = statusFilter === 'All' || item.status === statusFilter;
    return catOk && statusOk;
  });

  const openCount = items.filter((i) => i.status === 'open').length;
  const inProgressCount = items.filter((i) => i.status === 'in-progress').length;
  const highImpact = items.filter((i) => i.impact === 'high').length;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="section-title">Assumptions & Open Items</h2>
        <p className="section-subtitle">
          Track and resolve open questions that gate KPI measurement and value realization
        </p>
      </div>

      {/* Summary pills */}
      <div className="flex gap-3 flex-wrap">
        <div className="card px-4 py-2 flex items-center gap-2">
          <AlertCircle size={15} className="text-primary" />
          <span className="text-sm font-semibold text-tfs-charcoal">{openCount}</span>
          <span className="text-sm text-gray-500">Open</span>
        </div>
        <div className="card px-4 py-2 flex items-center gap-2">
          <Clock size={15} className="text-tfs-blue" />
          <span className="text-sm font-semibold text-tfs-charcoal">{inProgressCount}</span>
          <span className="text-sm text-gray-500">In Progress</span>
        </div>
        <div className="card px-4 py-2 flex items-center gap-2">
          <AlertCircle size={15} className="text-amber-600" />
          <span className="text-sm font-semibold text-tfs-charcoal">{highImpact}</span>
          <span className="text-sm text-gray-500">High Impact</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Category:</span>
          <div className="flex gap-1 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={cn(
                  'px-2.5 py-1 rounded-full text-xs font-medium transition-colors',
                  categoryFilter === cat
                    ? 'bg-primary text-white'
                    : 'bg-white border border-tfs-gray text-gray-500 hover:border-primary hover:text-primary'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Status:</span>
          <div className="flex gap-1">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={cn(
                  'px-2.5 py-1 rounded-full text-xs font-medium transition-colors capitalize',
                  statusFilter === s
                    ? 'bg-tfs-charcoal text-white'
                    : 'bg-white border border-tfs-gray text-gray-500 hover:border-tfs-charcoal hover:text-tfs-charcoal'
                )}
              >
                {s === 'All' ? 'All' : s.replace(/-/g, ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-tfs-offwhite border-b border-tfs-gray">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Question / Assumption</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Impact</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Owner</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Target</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Notes</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, i) => {
              const sc = statusConfig[item.status];
              return (
                <tr key={item.id} className={cn('border-b border-tfs-gray/50', i % 2 === 0 ? 'bg-white' : 'bg-tfs-offwhite/40')}>
                  <td className="px-4 py-3">
                    <div className="font-medium text-tfs-charcoal">{item.question}</div>
                    <span className="px-2 py-0.5 rounded bg-tfs-offwhite border border-tfs-gray text-xs text-gray-400 mt-1 inline-block">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn('status-pill border flex items-center gap-1 w-fit', sc.badge)}>
                      {sc.icon}
                      {sc.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn('status-pill border capitalize font-semibold', impactConfig[item.impact])}>
                      {item.impact}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">{item.owner}</td>
                  <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{item.targetDate}</td>
                  <td className="px-4 py-3 text-xs text-gray-500 max-w-xs">{item.notes}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="p-8 text-center text-gray-400 text-sm">
            No items match the selected filters.
          </div>
        )}
      </div>

      {/* Action note */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="text-sm font-semibold text-primary mb-1">Critical Path Actions</div>
        <ul className="text-xs text-red-800 space-y-1">
          <li>• <strong>A-5:</strong> Confirm Maria's end-to-end baseline — gates KPI 3 (Q3 2026 critical path)</li>
          <li>• <strong>A-6:</strong> Confirm QE baseline data source — gates KPI 4 measurement</li>
          <li>• <strong>A-1:</strong> Validate timestamp capture — gates all time-based KPIs (1, 2, 3)</li>
          <li>• <strong>A-7:</strong> Agree handoff scope — gates Q4 2026 milestone and Accenture → TFS transition</li>
        </ul>
      </div>
    </div>
  );
}
