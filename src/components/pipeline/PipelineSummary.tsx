import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { CheckCircle2, Circle, AlertTriangle } from 'lucide-react';
import { PipelinePhase } from '../../types';
import { formatNumber } from '../../lib/utils';

interface PipelineSummaryProps {
  pipeline: PipelinePhase[];
}

const statusBadge: Record<string, { label: string; className: string }> = {
  'in-progress': { label: 'In Progress', className: 'bg-blue-50 text-tfs-blue border-blue-200' },
  upcoming: { label: 'Upcoming', className: 'bg-gray-100 text-gray-500 border-gray-200' },
  complete: { label: 'Complete', className: 'bg-teal-50 text-tfs-teal border-teal-200' },
  future: { label: 'Future', className: 'bg-purple-50 text-purple-600 border-purple-200' },
};

const adoptionData = [
  { quarter: 'Q1 2026', adoption: 15, target: 100 },
  { quarter: 'Q2 2026', adoption: null, target: 100 },
  { quarter: 'Q3 2026', adoption: null, target: 100 },
  { quarter: 'Q4 2026', adoption: null, target: 100 },
];

export default function PipelineSummary({ pipeline }: PipelineSummaryProps) {
  const chartData = pipeline.map((p) => ({
    quarter: p.quarter,
    projected: p.projectedHoursSaved,
    actual: p.actualHoursSaved ?? 0,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="section-title">Pipeline Summary</h2>
        <p className="section-subtitle">Quarterly capability delivery and value realization tracking</p>
      </div>

      {/* Phase cards */}
      <div className="grid grid-cols-2 gap-4">
        {pipeline.map((phase) => {
          const sb = statusBadge[phase.status];
          return (
            <div key={phase.id} className="card p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-semibold text-tfs-charcoal">{phase.phase}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{phase.quarter}</div>
                </div>
                <span className={`status-pill border ${sb.className}`}>{sb.label}</span>
              </div>

              {/* Capabilities */}
              <div className="mb-3">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Capabilities</div>
                <div className="space-y-1">
                  {phase.capabilitiesPlanned.map((cap) => {
                    const done = phase.capabilitiesCompleted.includes(cap);
                    return (
                      <div key={cap} className="flex items-center gap-2 text-xs">
                        {done ? (
                          <CheckCircle2 size={13} className="text-tfs-teal flex-shrink-0" />
                        ) : (
                          <Circle size={13} className="text-gray-300 flex-shrink-0" />
                        )}
                        <span className={done ? 'text-tfs-charcoal' : 'text-gray-500'}>{cap}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* KPIs */}
              <div className="mb-3">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">KPIs Measurable</div>
                <div className="flex flex-wrap gap-1">
                  {phase.kpisMeasurable.map((k) => (
                    <span key={k} className="px-2 py-0.5 rounded-full bg-red-50 border border-red-200 text-xs text-primary font-medium">
                      {k}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-center justify-between bg-tfs-offwhite rounded p-2.5">
                <div>
                  <div className="text-xs text-gray-400">Projected hours saved</div>
                  <div className="text-base font-bold text-tfs-charcoal">{formatNumber(phase.projectedHoursSaved)}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">Actual</div>
                  <div className="text-base font-bold text-gray-300">{phase.actualHoursSaved !== null ? formatNumber(phase.actualHoursSaved) : '—'}</div>
                </div>
              </div>

              {/* Risks */}
              {phase.risks.length > 0 && (
                <div className="mt-3">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Risks</div>
                  {phase.risks.map((r) => (
                    <div key={r} className="flex items-start gap-1.5 text-xs text-amber-700 mb-1">
                      <AlertTriangle size={11} className="flex-shrink-0 mt-0.5" />
                      {r}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card p-5">
          <h3 className="font-semibold text-tfs-charcoal mb-4">Projected vs Actual Hours Saved</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E8E4" />
              <XAxis dataKey="quarter" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: unknown) => `${formatNumber(Number(v))} hrs`} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="projected" name="Projected" fill="#BE0000" radius={[3, 3, 0, 0]} />
              <Bar dataKey="actual" name="Actual" fill="#00857C" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-tfs-charcoal mb-4">Adoption Pipeline (KPI 6)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={adoptionData} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E8E4" />
              <XAxis dataKey="quarter" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} unit="%" domain={[0, 100]} />
              <Tooltip formatter={(v: unknown) => v != null ? `${v}%` : 'TBD'} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line
                dataKey="target"
                name="Target (100%)"
                stroke="#E8E8E4"
                strokeDasharray="5 5"
                dot={false}
                strokeWidth={2}
              />
              <Line
                dataKey="adoption"
                name="Actual Adoption"
                stroke="#BE0000"
                strokeWidth={2}
                dot={{ r: 4 }}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Value realization wins matrix */}
      <div className="card p-5">
        <h3 className="font-semibold text-tfs-charcoal mb-4">Value Realization Wins Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-tfs-gray">
                <th className="text-left py-2 pr-4 text-gray-400 font-semibold">Capability</th>
                <th className="text-center py-2 px-3 text-gray-400 font-semibold">Q1 2026</th>
                <th className="text-center py-2 px-3 text-gray-400 font-semibold">Q2 2026</th>
                <th className="text-center py-2 px-3 text-gray-400 font-semibold">Q3 2026</th>
                <th className="text-center py-2 px-3 text-gray-400 font-semibold">Q4 2026</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'AI-assisted ICF drafting', q: [true, true, true, true] },
                { name: 'Country ICF adaptation', q: [true, true, true, true] },
                { name: 'Site ICF adaptation', q: [false, true, true, true] },
                { name: 'Amendment automation', q: [false, true, true, true] },
                { name: 'Master ICF GPT migration', q: [false, false, true, true] },
                { name: 'QE measurement framework', q: [false, false, true, true] },
                { name: 'IRB/ethics submission', q: [false, false, false, true] },
                { name: 'Sponsor-level reporting', q: [false, false, false, true] },
              ].map((row) => (
                <tr key={row.name} className="border-b border-tfs-gray/50">
                  <td className="py-2 pr-4 text-gray-600">{row.name}</td>
                  {row.q.map((active, i) => (
                    <td key={i} className="text-center py-2 px-3">
                      {active ? (
                        <CheckCircle2 size={14} className="text-tfs-teal mx-auto" />
                      ) : (
                        <Circle size={14} className="text-gray-200 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
