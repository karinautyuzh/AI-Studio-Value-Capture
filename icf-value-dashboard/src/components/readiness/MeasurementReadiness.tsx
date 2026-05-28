import React from 'react';
import { CheckCircle2, AlertCircle, Circle, Clock } from 'lucide-react';
import { ReadinessItem } from '../../types';
import { cn } from '../../lib/utils';

const defaultReadiness: ReadinessItem[] = [
  {
    id: 'r-1',
    name: 'Timestamp Feasibility (End-to-End)',
    status: 'partial',
    owner: 'Product Engineering',
    dependency: 'ICF Assistant platform configuration',
    notes: 'Draft-to-country timestamps in progress. Stage-level and site timestamps Q2 2026.',
    readinessContribution: 15,
    category: 'Data Infrastructure',
  },
  {
    id: 'r-2',
    name: 'Quarterly ICF Throughput Reporting',
    status: 'partial',
    owner: 'Product Manager',
    dependency: 'Reporting mechanism design and build',
    notes: 'Being scoped. Required for KPI 6 adoption measurement.',
    readinessContribution: 12,
    category: 'Reporting',
  },
  {
    id: 'r-3',
    name: 'Review Cycle Count (Automated)',
    status: 'not-ready',
    owner: 'Product Engineering',
    dependency: 'Feature scoping and build',
    notes: 'Not yet in roadmap. Required for quality and rework measurement.',
    readinessContribution: 10,
    category: 'Data Infrastructure',
  },
  {
    id: 'r-4',
    name: 'Sponsor-Level Reporting Views',
    status: 'future',
    owner: 'Engineering Lead',
    dependency: 'Architecture decision + Q4 2026 build',
    notes: 'Future state. Feasibility to be confirmed before Q4 2026 planning.',
    readinessContribution: 8,
    category: 'Architecture',
  },
  {
    id: 'r-5',
    name: 'TFS Baseline Data (Cycle Time + QE)',
    status: 'not-ready',
    owner: 'Maria / TFS Study Ops + Quality',
    dependency: 'Maria confirmation + TFS quality data access',
    notes: 'Critical path for KPI 3 and KPI 4. Must be confirmed by Q3 2026.',
    readinessContribution: 20,
    category: 'Baseline Data',
  },
  {
    id: 'r-6',
    name: 'Data Quality Confidence',
    status: 'partial',
    owner: 'Product Manager',
    dependency: 'Timestamp validation and pilot data review',
    notes: 'Pilot data being collected. Confidence level will increase as timestamp capture matures.',
    readinessContribution: 15,
    category: 'Data Quality',
  },
  {
    id: 'r-7',
    name: 'ICF Type Identification & Segmentation',
    status: 'partial',
    owner: 'Product Manager',
    dependency: 'Scope definition and tagging in platform',
    notes: 'Needed for KPI 6 segmentation by ICF type. Partially scoped.',
    readinessContribution: 10,
    category: 'Scope',
  },
  {
    id: 'r-8',
    name: 'Volume Metrics (Country + Site)',
    status: 'partial',
    owner: 'ICF PM / Program Manager',
    dependency: 'TFS volume data + ICF Assistant utilization reporting',
    notes: 'Country volume (~120/yr) confirmed. Site volume (~300/yr) estimated. Needs validation.',
    readinessContribution: 10,
    category: 'Volume Data',
  },
];

const statusConfig: Record<ReadinessItem['status'], { icon: React.ReactNode; badge: string; label: string }> = {
  ready: {
    icon: <CheckCircle2 size={16} className="text-tfs-teal" />,
    badge: 'bg-teal-50 text-tfs-teal border-teal-200',
    label: 'Ready',
  },
  partial: {
    icon: <AlertCircle size={16} className="text-amber-500" />,
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    label: 'Partial',
  },
  'not-ready': {
    icon: <Circle size={16} className="text-red-400" />,
    badge: 'bg-red-50 text-primary border-red-200',
    label: 'Not Ready',
  },
  future: {
    icon: <Clock size={16} className="text-purple-500" />,
    badge: 'bg-purple-50 text-purple-600 border-purple-200',
    label: 'Future State',
  },
};

export default function MeasurementReadiness() {
  const items = defaultReadiness;

  const totalContribution = items.reduce((s, i) => {
    if (i.status === 'ready') return s + i.readinessContribution;
    if (i.status === 'partial') return s + i.readinessContribution * 0.5;
    return s;
  }, 0);

  const maxContribution = items.reduce((s, i) => s + i.readinessContribution, 0);
  const readinessScore = Math.round((totalContribution / maxContribution) * 100);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="section-title">Measurement Readiness</h2>
          <p className="section-subtitle">Data infrastructure and tracking readiness for the full KPI framework</p>
        </div>
        <div className="card px-5 py-3 flex items-center gap-4">
          <div>
            <div className="text-xs text-gray-400 uppercase tracking-wide">Overall Readiness</div>
            <div className="text-2xl font-bold text-primary">{readinessScore}%</div>
          </div>
          <div className="w-24 h-2 bg-tfs-gray rounded-full">
            <div
              className="h-2 bg-primary rounded-full"
              style={{ width: `${readinessScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-4 gap-3">
        {(['ready', 'partial', 'not-ready', 'future'] as const).map((s) => {
          const count = items.filter((i) => i.status === s).length;
          const sc = statusConfig[s];
          return (
            <div key={s} className={cn('card p-4 border', sc.badge.includes('teal') ? 'border-teal-200' : sc.badge.includes('amber') ? 'border-amber-200' : sc.badge.includes('red') ? 'border-red-200' : 'border-purple-200')}>
              <div className="flex items-center gap-2 mb-1">
                {sc.icon}
                <span className="text-xs font-semibold text-gray-500">{sc.label}</span>
              </div>
              <div className="text-2xl font-bold text-tfs-charcoal">{count}</div>
            </div>
          );
        })}
      </div>

      {/* Readiness items */}
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-tfs-offwhite border-b border-tfs-gray">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Item</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Owner</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Category</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Dependency</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Contribution</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => {
              const sc = statusConfig[item.status];
              return (
                <tr key={item.id} className={cn('border-b border-tfs-gray/50', i % 2 === 0 ? 'bg-white' : 'bg-tfs-offwhite/40')}>
                  <td className="px-4 py-3">
                    <div className="font-medium text-tfs-charcoal text-sm">{item.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{item.notes}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn('status-pill border flex items-center gap-1 w-fit', sc.badge)}>
                      {sc.icon}
                      {sc.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">{item.owner}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded bg-tfs-offwhite border border-tfs-gray text-xs text-gray-500">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">{item.dependency}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-xs font-semibold text-gray-600">{item.readinessContribution}%</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Note */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-xs text-amber-800 leading-relaxed">
          <strong>Note:</strong> Readiness score is calculated as: (Ready items × 100% contribution) + (Partial items × 50% contribution),
          divided by total possible contribution. Items marked <em>Future State</em> are excluded from current readiness calculation.
        </p>
      </div>
    </div>
  );
}
