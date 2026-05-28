import { useState } from 'react';
import { ChevronDown, ChevronUp, Edit2, Check } from 'lucide-react';
import { KPI, KPIStatus } from '../../types';
import { cn } from '../../lib/utils';

interface KPICardProps {
  kpi: KPI;
  onUpdate: (updated: KPI) => void;
}

const statusConfig: Record<KPIStatus, { label: string; bg: string; text: string; border: string }> = {
  'tracking-live': { label: 'Tracking Live', bg: 'bg-teal-50', text: 'text-tfs-teal', border: 'border-teal-200' },
  'on-track': { label: 'On Track', bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  'baseline-confirmed': { label: 'Baseline Confirmed', bg: 'bg-blue-50', text: 'text-tfs-blue', border: 'border-blue-200' },
  'at-risk': { label: 'At Risk', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  tbd: { label: 'TBD', bg: 'bg-gray-100', text: 'text-gray-500', border: 'border-gray-200' },
};

export default function KPICard({ kpi, onUpdate }: KPICardProps) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editActual, setEditActual] = useState(kpi.currentActual?.toString() ?? '');
  const [editStatus, setEditStatus] = useState<KPIStatus>(kpi.status);

  const sc = statusConfig[kpi.status];

  const saveEdit = () => {
    onUpdate({
      ...kpi,
      currentActual: editActual !== '' ? Number(editActual) : null,
      status: editStatus,
    });
    setEditing(false);
  };

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-start gap-3">
        <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold">
          {kpi.number}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-tfs-charcoal text-sm leading-tight">{kpi.title}</h3>
            <span className={cn('status-pill flex-shrink-0 border', sc.bg, sc.text, sc.border)}>
              {sc.label}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">{kpi.definition}</p>
        </div>
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-3 divide-x divide-tfs-gray border-t border-tfs-gray">
        <div className="px-4 py-3">
          <div className="text-xs text-gray-400 mb-0.5">Baseline</div>
          <div className="font-semibold text-tfs-charcoal text-sm">
            {kpi.baseline !== null ? `${kpi.baseline} ${kpi.baselineUnit}` : 'TBD'}
          </div>
        </div>
        <div className="px-4 py-3">
          <div className="text-xs text-gray-400 mb-0.5">Target</div>
          <div className="font-semibold text-primary text-sm">
            {kpi.target !== null ? `${kpi.target}${kpi.targetUnit}` : 'TBD'}
          </div>
        </div>
        <div className="px-4 py-3">
          <div className="text-xs text-gray-400 mb-0.5">Current Actual</div>
          {editing ? (
            <input
              type="number"
              value={editActual}
              onChange={(e) => setEditActual(e.target.value)}
              placeholder="Enter value"
              className="w-full border border-tfs-gray rounded px-2 py-0.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          ) : (
            <div className="font-semibold text-tfs-blue text-sm">
              {kpi.currentActual !== null ? kpi.currentActual : '—'}
            </div>
          )}
        </div>
      </div>

      {/* Action bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-tfs-offwhite border-t border-tfs-gray">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Owner: <span className="text-gray-600">{kpi.owner}</span></span>
        </div>
        <div className="flex items-center gap-2">
          {editing ? (
            <>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value as KPIStatus)}
                className="text-xs border border-tfs-gray rounded px-2 py-1 focus:outline-none"
              >
                <option value="tbd">TBD</option>
                <option value="baseline-confirmed">Baseline Confirmed</option>
                <option value="tracking-live">Tracking Live</option>
                <option value="on-track">On Track</option>
                <option value="at-risk">At Risk</option>
              </select>
              <button onClick={saveEdit} className="flex items-center gap-1 text-xs text-tfs-teal font-medium">
                <Check size={14} /> Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-primary font-medium"
            >
              <Edit2 size={12} /> Edit
            </button>
          )}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-tfs-charcoal font-medium"
          >
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {expanded ? 'Less' : 'Details'}
          </button>
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="px-4 pb-4 pt-3 space-y-3 border-t border-tfs-gray">
          <div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Formula</div>
            <pre className="text-xs text-gray-600 bg-tfs-offwhite rounded p-2 whitespace-pre-wrap font-mono">{kpi.formula}</pre>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Data Source</div>
              <p className="text-xs text-gray-600">{kpi.dataSource}</p>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Measurable From</div>
              <p className="text-xs text-gray-600">{kpi.measurableFrom}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Projected Impact</div>
              <p className="text-xs text-gray-600">{kpi.projectedImpact}</p>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Actual Impact</div>
              <p className="text-xs text-gray-600">{kpi.actualImpact ?? '—'}</p>
            </div>
          </div>
          {kpi.notes && (
            <div className="bg-amber-50 border border-amber-200 rounded p-3">
              <div className="text-xs font-semibold text-amber-700 mb-1">Notes</div>
              <p className="text-xs text-amber-800">{kpi.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
