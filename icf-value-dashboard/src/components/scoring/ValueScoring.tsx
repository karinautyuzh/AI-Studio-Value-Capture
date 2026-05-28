import React, { useState } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { ScoringCategory } from '../../types';
import { calcWeightedValueScore } from '../../lib/calculations';
import { cn } from '../../lib/utils';

interface ValueScoringProps {
  categories: ScoringCategory[];
  onCategoriesChange: (cats: ScoringCategory[]) => void;
}

export default function ValueScoring({ categories, onCategoriesChange }: ValueScoringProps) {
  const [editingWeights, setEditingWeights] = useState(false);
  const [localWeights, setLocalWeights] = useState<Record<string, number>>(
    Object.fromEntries(categories.map((c) => [c.id, c.weight]))
  );

  const { projected, actual } = calcWeightedValueScore(categories);
  const gap = projected - actual;

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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="section-title">Value Scoring</h2>
          <p className="section-subtitle">Weighted composite score across 5 value dimensions</p>
        </div>
        <button
          onClick={() => (editingWeights ? saveWeights() : setEditingWeights(true))}
          className={editingWeights ? 'btn-primary' : 'btn-secondary'}
        >
          {editingWeights ? 'Save Weights' : 'Edit Weights'}
        </button>
      </div>

      {/* Score summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card p-5 text-center">
          <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Projected Score</div>
          <div className="text-4xl font-bold text-primary">{projected}</div>
          <div className="text-xs text-gray-400 mt-1">/ 100</div>
        </div>
        <div className="card p-5 text-center">
          <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Actual Score</div>
          <div className="text-4xl font-bold text-tfs-charcoal">{actual}</div>
          <div className="text-xs text-gray-400 mt-1">/ 100</div>
        </div>
        <div className="card p-5 text-center">
          <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Realization Gap</div>
          <div className="text-4xl font-bold text-amber-500">{gap}</div>
          <div className="text-xs text-gray-400 mt-1">points to close</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* Radar chart */}
        <div className="card p-5">
          <h3 className="font-semibold text-tfs-charcoal mb-4">Projected vs Actual — Radar</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
              <PolarGrid stroke="#E8E8E4" />
              <PolarAngleAxis dataKey="category" tick={{ fontSize: 11, fill: '#666' }} />
              <Radar
                name="Projected"
                dataKey="Projected"
                stroke="#BE0000"
                fill="#BE0000"
                fillOpacity={0.15}
                strokeWidth={2}
              />
              <Radar
                name="Actual"
                dataKey="Actual"
                stroke="#00857C"
                fill="#00857C"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Category table */}
        <div className="card overflow-hidden">
          <div className="px-5 py-4 border-b border-tfs-gray">
            <h3 className="font-semibold text-tfs-charcoal">Category Breakdown</h3>
          </div>
          <div className="divide-y divide-tfs-gray">
            {categories.map((cat) => (
              <div key={cat.id} className="px-5 py-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-medium text-sm text-tfs-charcoal">{cat.name}</span>
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
                        <span className="text-xs text-gray-400">{cat.weight}% weight</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{cat.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-xs text-gray-400">Proj / Act</div>
                    <div className="text-sm font-bold">
                      <span className="text-primary">{cat.projectedScore}</span>
                      <span className="text-gray-300 mx-1">/</span>
                      <span className="text-tfs-teal">{cat.actualScore}</span>
                    </div>
                  </div>
                </div>

                {/* Progress bars */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 w-14">Projected</span>
                    <div className="flex-1 bg-tfs-gray rounded-full h-1.5">
                      <div
                        className="bg-primary h-1.5 rounded-full"
                        style={{ width: `${cat.projectedScore}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-primary w-6">{cat.projectedScore}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 w-14">Actual</span>
                    <div className="flex-1 bg-tfs-gray rounded-full h-1.5">
                      <div
                        className="bg-tfs-teal h-1.5 rounded-full"
                        style={{ width: `${cat.actualScore}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-tfs-teal w-6">{cat.actualScore}</span>
                  </div>
                </div>

                {/* Drivers */}
                <div className="mt-2 flex flex-wrap gap-1">
                  {cat.drivers.map((d) => (
                    <span key={d} className="px-2 py-0.5 bg-tfs-offwhite border border-tfs-gray rounded text-xs text-gray-500">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {editingWeights && (
            <div className="px-5 py-3 bg-amber-50 border-t border-amber-200 text-xs text-amber-700">
              Weights must sum to 100. Current sum:{' '}
              <strong>{Object.values(localWeights).reduce((s, v) => s + v, 0)}</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
