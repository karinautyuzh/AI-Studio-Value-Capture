import { useState } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { calcWeightedValueScore } from '../../lib/calculations';
import { useDashboard } from '../../context/DashboardContext';

function ScoreRing({ value, color, size = 80 }: { value: number; color: string; size?: number }) {
  const r = size * 0.38;
  const circ = 2 * Math.PI * r;
  const fill = (value / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E8E8E4" strokeWidth={size * 0.09} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth={size * 0.09}
        strokeDasharray={`${fill} ${circ}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x={size / 2} y={size / 2 + 5} textAnchor="middle" fontSize={size * 0.22} fontWeight="700" fill="#2C2C2C">
        {value}
      </text>
    </svg>
  );
}

export default function ValueScoring() {
  const { state, updateScoringCategories } = useDashboard();
  const categories = state.scoringCategories;
  const onCategoriesChange = updateScoringCategories;
  const [editingWeights, setEditingWeights] = useState(false);
  const [localWeights, setLocalWeights] = useState<Record<string, number>>(
    Object.fromEntries(categories.map((c) => [c.id, c.weight]))
  );

  const { projected, actual } = calcWeightedValueScore(categories);
  const gap = projected - actual;
  const realizationPct = projected > 0 ? Math.round((actual / projected) * 100) : 0;

  const radarData = categories.map((c) => ({
    category: c.name,
    Projected: c.projectedScore,
    Actual: c.actualScore,
  }));

  const saveWeights = () => {
    const totalWeight = Object.values(localWeights).reduce((s, v) => s + v, 0);
    if (totalWeight !== 100) {
      alert(`Weights must sum to 100. Current sum: ${totalWeight}`);
      return;
    }
    onCategoriesChange(categories.map((c) => ({ ...c, weight: localWeights[c.id] })));
    setEditingWeights(false);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="section-title">Value Scoring</h2>
          <p className="section-subtitle">
            Weighted composite score across {categories.length} value dimensions — projected vs actual realization
          </p>
        </div>
        <button
          onClick={() => (editingWeights ? saveWeights() : setEditingWeights(true))}
          className={editingWeights ? 'btn-primary' : 'btn-secondary'}
        >
          {editingWeights ? 'Save Weights' : 'Edit Weights'}
        </button>
      </div>

      {/* Score summary — 4 cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="card p-5 flex flex-col items-center text-center">
          <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Projected Score</div>
          <ScoreRing value={projected} color="#BE0000" size={88} />
          <div className="text-xs text-gray-400 mt-2">/ 100 weighted</div>
        </div>
        <div className="card p-5 flex flex-col items-center text-center">
          <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Actual Score</div>
          <ScoreRing value={actual} color="#00857C" size={88} />
          <div className="text-xs text-gray-400 mt-2">/ 100 realized</div>
        </div>
        <div className="card p-5 flex flex-col items-center text-center">
          <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Realization Gap</div>
          <div className="flex items-center justify-center w-[88px] h-[88px]">
            <div>
              <div className="text-3xl font-bold text-amber-500">{gap}</div>
              <div className="text-xs text-gray-400">pts to close</div>
            </div>
          </div>
          <div className="text-xs text-gray-400 mt-2">target − actual</div>
        </div>
        <div className="card p-5 flex flex-col items-center text-center">
          <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Realization Rate</div>
          <ScoreRing value={realizationPct} color="#1A6EA8" size={88} />
          <div className="text-xs text-gray-400 mt-2">actual / projected</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* Radar chart */}
        <div className="card p-5">
          <h3 className="font-semibold text-tfs-charcoal text-sm mb-1">Projected vs Actual Radar</h3>
          <p className="text-xs text-gray-400 mb-3">Visual comparison across all value dimensions</p>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
              <PolarGrid stroke="#E8E8E4" />
              <PolarAngleAxis dataKey="category" tick={{ fontSize: 11, fill: '#6b7280' }} />
              <Radar
                name="Projected"
                dataKey="Projected"
                stroke="#BE0000"
                fill="#BE0000"
                fillOpacity={0.12}
                strokeWidth={2}
              />
              <Radar
                name="Actual"
                dataKey="Actual"
                stroke="#00857C"
                fill="#00857C"
                fillOpacity={0.18}
                strokeWidth={2}
              />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6, border: '1px solid #E8E8E4' }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Category breakdown */}
        <div className="card overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-tfs-gray">
            <h3 className="font-semibold text-tfs-charcoal text-sm">Category Breakdown</h3>
            <p className="text-xs text-gray-400 mt-0.5">Score and weight per dimension · click "Edit Weights" to adjust</p>
          </div>
          <div className="divide-y divide-tfs-gray flex-1 overflow-y-auto">
            {categories.map((cat) => (
              <div key={cat.id} className="px-5 py-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0 pr-3">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="font-semibold text-sm text-tfs-charcoal">{cat.name}</span>
                      {editingWeights ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            value={localWeights[cat.id]}
                            min={0}
                            max={100}
                            onChange={(e) =>
                              setLocalWeights((prev) => ({ ...prev, [cat.id]: Number(e.target.value) }))
                            }
                            className="w-14 border border-tfs-gray rounded px-1.5 py-0.5 text-xs text-right focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                          <span className="text-xs text-gray-400">%</span>
                        </div>
                      ) : (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-tfs-offwhite border border-tfs-gray text-gray-500">
                          {cat.weight}%
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{cat.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-[10px] text-gray-400 uppercase tracking-wide">Proj / Act</div>
                    <div className="text-sm font-bold mt-0.5">
                      <span className="text-primary">{cat.projectedScore}</span>
                      <span className="text-gray-300 mx-1">/</span>
                      <span className="text-tfs-teal">{cat.actualScore}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400 w-14 flex-shrink-0">Projected</span>
                    <div className="flex-1 bg-tfs-gray rounded-full h-1.5">
                      <div className="bg-primary h-1.5 rounded-full transition-all" style={{ width: `${cat.projectedScore}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-primary w-7 text-right">{cat.projectedScore}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400 w-14 flex-shrink-0">Actual</span>
                    <div className="flex-1 bg-tfs-gray rounded-full h-1.5">
                      <div className="bg-tfs-teal h-1.5 rounded-full transition-all" style={{ width: `${cat.actualScore}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-tfs-teal w-7 text-right">{cat.actualScore}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {cat.drivers.map((d) => (
                    <span key={d} className="px-2 py-0.5 bg-tfs-offwhite border border-tfs-gray rounded-full text-[10px] text-gray-500">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {editingWeights && (
            <div className="px-5 py-3 bg-amber-50 border-t border-amber-200 text-xs text-amber-700">
              Weights must sum to 100. Current:{' '}
              <strong>{Object.values(localWeights).reduce((s, v) => s + v, 0)}</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
