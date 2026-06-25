import { RotateCcw } from 'lucide-react';
import { CalculatorInputs, IcfSegment, PhasingQuarter } from '../../types';
import {
  calcCountryHoursSavedPerDoc,
  calcCountryAnnualHoursSaved,
  calcSiteHoursSavedPerDoc,
  calcSiteAnnualHoursSaved,
  calcTotalAnnualHoursSaved,
  calcQETotalBaseline,
  calcQEBaselineCost,
  calcQEsAvoided,
  calcQEDollarValue,
  calcTotalHardValue,
  calcEndToEndDaysSaved,
  calcAnnualDaysSaved,
  calcSegmentBaselineHours,
  calcSegmentRealizedPct,
  calcSegmentProjectedSavings,
  calcTotalSegmentedSavings,
} from '../../lib/calculations';
import { getPeriodMultiplier, getPeriodLabel } from '../../lib/periodCalculations';
import { useDashboard } from '../../context/DashboardContext';
import { formatNumber, formatCurrency } from '../../lib/utils';

function InputRow({
  label,
  value,
  onChange,
  unit,
  min = 0,
  max,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-tfs-gray last:border-0">
      <label className="text-sm text-gray-600 flex-1">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-24 border border-tfs-gray rounded px-2 py-1 text-sm text-right focus:outline-none focus:ring-1 focus:ring-primary"
        />
        {unit && <span className="text-xs text-gray-400 w-16">{unit}</span>}
      </div>
    </div>
  );
}

function ResultRow({ label, value, formula }: { label: string; value: string; formula: string }) {
  return (
    <div className="py-2 border-b border-tfs-gray last:border-0">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-tfs-charcoal">{label}</span>
        <span className="text-sm font-bold text-primary">{value}</span>
      </div>
      <div className="text-xs text-gray-400 mt-0.5 font-mono">{formula}</div>
    </div>
  );
}

const SEGMENT_CATEGORY_STYLES: Record<string, string> = {
  'country-main':       'bg-red-50',
  'country-additional': 'bg-amber-50',
  'country-amendment':  'bg-orange-50',
  'site-initial':       'bg-teal-50',
  'site-amendment':     'bg-blue-50',
};

export default function ValueCalculator() {
  const { state, updateCalculatorInputs, updateSegments, updatePhasingModel, resetToDefaults } = useDashboard();
  const inputs = state.calculatorInputs;
  const icfSegments = state.icfSegments;
  const phasingModel = state.phasingModel;
  const periodMult = getPeriodMultiplier(state.reportingConfig);
  const periodLabel = getPeriodLabel(state.reportingConfig);

  const onSegmentsChange = (segs: IcfSegment[]) => updateSegments(segs);
  const onPhasingChange = (model: PhasingQuarter[]) => updatePhasingModel(model);

  const set = (key: keyof CalculatorInputs, val: number) =>
    updateCalculatorInputs({ [key]: val });

  const countryPerDoc = calcCountryHoursSavedPerDoc(inputs);
  const countryAnnual = calcCountryAnnualHoursSaved(inputs);
  const sitePerDoc = calcSiteHoursSavedPerDoc(inputs);
  const siteAnnual = calcSiteAnnualHoursSaved(inputs);
  const totalHours = calcTotalAnnualHoursSaved(inputs);
  const qeTotal = calcQETotalBaseline(inputs);
  const qeBaselineCost = calcQEBaselineCost(inputs);
  const qesAvoided = calcQEsAvoided(inputs);
  const qeDollars = calcQEDollarValue(inputs);
  const totalHard = calcTotalHardValue(inputs);
  const e2eDaysSaved = calcEndToEndDaysSaved(inputs);
  const annualDays = calcAnnualDaysSaved(inputs);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="section-title">Value Calculator</h2>
          <p className="section-subtitle">Adjust assumptions to model projected impact. All outputs recalculate live.</p>
        </div>
        <button
          onClick={() => { if (window.confirm('Reset all dashboard assumptions to defaults? This cannot be undone.')) resetToDefaults(); }}
          className="flex items-center gap-2 btn-secondary"
        >
          <RotateCcw size={14} /> Reset to Defaults
        </button>
      </div>

      <p className="text-xs text-gray-400">
        All dashboard assumptions are editable and synced across sections. Annual outputs below; period values shown for {periodLabel}.
      </p>

      {/* ICF Workload Segmentation */}
      <div className="card p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-tfs-charcoal">ICF Workload Segmentation</h3>
            <p className="text-xs text-gray-400 mt-0.5">Edit volume, hrs/ICF, and adoption assumptions per segment. Savings auto-calculate.</p>
          </div>
          <span className="text-[10px] px-2 py-1 rounded bg-amber-50 border border-amber-200 text-amber-700 font-semibold whitespace-nowrap">Directional — subject to TFS validation</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-tfs-offwhite border-b border-tfs-gray">
                <th className="text-left px-3 py-2 font-semibold text-gray-500">Segment</th>
                <th className="text-right px-3 py-2 font-semibold text-gray-500">ICFs / yr</th>
                <th className="text-right px-3 py-2 font-semibold text-gray-500">Hrs / ICF</th>
                <th className="text-right px-3 py-2 font-semibold text-gray-500">Baseline Hrs</th>
                <th className="text-right px-3 py-2 font-semibold text-gray-500">AI Impact %</th>
                <th className="text-right px-3 py-2 font-semibold text-gray-500">Adoption %</th>
                <th className="text-right px-3 py-2 font-semibold text-gray-500">Realized %</th>
                <th className="text-right px-3 py-2 font-semibold text-gray-500">Projected Savings</th>
              </tr>
            </thead>
            <tbody>
              {icfSegments.map((seg, idx) => {
                const baselineHrs = calcSegmentBaselineHours(seg);
                const realizedPct = calcSegmentRealizedPct(seg);
                const savings = calcSegmentProjectedSavings(seg);
                const rowBg = SEGMENT_CATEGORY_STYLES[seg.category] ?? '';
                const updateSeg = (partial: Partial<IcfSegment>) =>
                  onSegmentsChange(icfSegments.map((s, i) => i === idx ? { ...s, ...partial } : s));
                return (
                  <tr key={seg.id} className={`border-b border-tfs-gray/50 ${rowBg}`}>
                    <td className="px-3 py-2 font-medium text-tfs-charcoal">{seg.name}</td>
                    <td className="px-3 py-2 text-right">
                      <input type="number" min={0} value={seg.icfsPerYear}
                        onChange={(e) => updateSeg({ icfsPerYear: Number(e.target.value) })}
                        className="w-20 border border-tfs-gray rounded px-1.5 py-0.5 text-xs text-right focus:outline-none focus:ring-1 focus:ring-primary bg-white/80" />
                    </td>
                    <td className="px-3 py-2 text-right">
                      <input type="number" min={0} step={0.1} value={seg.casHoursPerIcf}
                        onChange={(e) => updateSeg({ casHoursPerIcf: Number(e.target.value) })}
                        className="w-16 border border-tfs-gray rounded px-1.5 py-0.5 text-xs text-right focus:outline-none focus:ring-1 focus:ring-primary bg-white/80" />
                    </td>
                    <td className="px-3 py-2 text-right font-medium text-tfs-charcoal">{formatNumber(baselineHrs)}</td>
                    <td className="px-3 py-2 text-right">
                      <input type="number" min={0} max={100} value={seg.potentialAiImpactPct}
                        onChange={(e) => updateSeg({ potentialAiImpactPct: Number(e.target.value) })}
                        className="w-14 border border-tfs-gray rounded px-1.5 py-0.5 text-xs text-right focus:outline-none focus:ring-1 focus:ring-primary bg-white/80" />
                    </td>
                    <td className="px-3 py-2 text-right">
                      <input type="number" min={0} max={100} value={seg.adoptionPct}
                        onChange={(e) => updateSeg({ adoptionPct: Number(e.target.value) })}
                        className="w-14 border border-tfs-gray rounded px-1.5 py-0.5 text-xs text-right focus:outline-none focus:ring-1 focus:ring-primary bg-white/80" />
                    </td>
                    <td className="px-3 py-2 text-right text-tfs-blue font-semibold">{formatNumber(realizedPct, 1)}%</td>
                    <td className="px-3 py-2 text-right font-bold text-tfs-teal">{formatNumber(savings)} hrs</td>
                  </tr>
                );
              })}
              {/* Totals row */}
              <tr className="bg-tfs-offwhite border-t-2 border-tfs-gray font-bold">
                <td className="px-3 py-2 text-tfs-charcoal">Total</td>
                <td className="px-3 py-2 text-right text-tfs-charcoal">{formatNumber(icfSegments.reduce((s, seg) => s + seg.icfsPerYear, 0))}</td>
                <td className="px-3 py-2" />
                <td className="px-3 py-2 text-right text-tfs-charcoal">{formatNumber(icfSegments.reduce((s, seg) => s + calcSegmentBaselineHours(seg), 0))}</td>
                <td className="px-3 py-2" />
                <td className="px-3 py-2" />
                <td className="px-3 py-2" />
                <td className="px-3 py-2 text-right text-tfs-teal">{formatNumber(calcTotalSegmentedSavings(icfSegments))} hrs</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Phased Impact Model */}
      <div className="card p-5">
        <div className="mb-3">
          <h3 className="font-semibold text-tfs-charcoal">Phased Impact Model</h3>
          <p className="text-xs text-gray-400 mt-0.5">Total Realized Impact = Potential AI Impact % × Adoption / Phasing % — edit adoption ramp per quarter</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-tfs-offwhite border-b border-tfs-gray">
                <th className="text-left px-3 py-2 font-semibold text-gray-500">Quarter</th>
                <th className="text-right px-3 py-2 font-semibold text-gray-500">Potential AI Impact %</th>
                <th className="text-right px-3 py-2 font-semibold text-gray-500">Adoption / Phasing %</th>
                <th className="text-right px-3 py-2 font-semibold text-gray-500">Total Realized %</th>
              </tr>
            </thead>
            <tbody>
              {phasingModel.map((q, idx) => {
                const realized = (q.potentialAiImpactPct * q.adoptionPct) / 100;
                const updateQ = (partial: Partial<PhasingQuarter>) =>
                  onPhasingChange(phasingModel.map((p, i) => i === idx ? { ...p, ...partial } : p));
                return (
                  <tr key={q.id} className={`border-b border-tfs-gray/50 ${idx % 2 === 0 ? 'bg-white' : 'bg-tfs-offwhite/40'}`}>
                    <td className="px-3 py-2 font-medium text-tfs-charcoal">{q.label}</td>
                    <td className="px-3 py-2 text-right">
                      <input type="number" min={0} max={100} value={q.potentialAiImpactPct}
                        onChange={(e) => updateQ({ potentialAiImpactPct: Number(e.target.value) })}
                        className="w-16 border border-tfs-gray rounded px-1.5 py-0.5 text-xs text-right focus:outline-none focus:ring-1 focus:ring-primary" />
                    </td>
                    <td className="px-3 py-2 text-right">
                      <input type="number" min={0} max={100} value={q.adoptionPct}
                        onChange={(e) => updateQ({ adoptionPct: Number(e.target.value) })}
                        className="w-16 border border-tfs-gray rounded px-1.5 py-0.5 text-xs text-right focus:outline-none focus:ring-1 focus:ring-primary" />
                    </td>
                    <td className="px-3 py-2 text-right font-bold text-tfs-teal">{formatNumber(realized, 1)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* Country ICF */}
        <div className="card p-5">
          <h3 className="font-semibold text-tfs-charcoal mb-1">Country ICF Adaptation (KPI 1)</h3>
          <p className="text-xs text-gray-400 mb-4">Inputs</p>
          <InputRow label="Baseline hours per document" value={inputs.countryBaseline} onChange={(v) => set('countryBaseline', v)} unit="hrs/doc" />
          <InputRow label="Target reduction" value={inputs.countryTargetReduction} onChange={(v) => set('countryTargetReduction', v)} unit="%" max={100} />
          <InputRow label="Annual document volume" value={inputs.countryAnnualVolume} onChange={(v) => set('countryAnnualVolume', v)} unit="docs/yr" />
          <p className="text-xs text-gray-400 mt-4 mb-2">Outputs</p>
          <ResultRow
            label="Hours saved per document"
            value={`${formatNumber(countryPerDoc, 1)} hrs`}
            formula={`${inputs.countryBaseline} × ${inputs.countryTargetReduction}% = ${formatNumber(countryPerDoc, 1)} hrs`}
          />
          <ResultRow
            label="Annual hours saved"
            value={`${formatNumber(countryAnnual)} hrs/yr`}
            formula={`${formatNumber(countryPerDoc, 1)} hrs × ${inputs.countryAnnualVolume} docs = ${formatNumber(countryAnnual)} hrs`}
          />
          <p className="text-xs text-tfs-blue mt-1">Period ({periodLabel}): {formatNumber(countryAnnual * periodMult)} hrs</p>
        </div>

        {/* Site ICF */}
        <div className="card p-5">
          <h3 className="font-semibold text-tfs-charcoal mb-1">Site ICF Adaptation (KPI 2)</h3>
          <p className="text-xs text-gray-400 mb-4">Inputs — measurable Q2 2026</p>
          <InputRow label="Baseline hours per document" value={inputs.siteBaseline} onChange={(v) => set('siteBaseline', v)} unit="hrs/doc" />
          <InputRow label="Target reduction" value={inputs.siteTargetReduction} onChange={(v) => set('siteTargetReduction', v)} unit="%" max={100} />
          <InputRow label="Annual document volume" value={inputs.siteAnnualVolume} onChange={(v) => set('siteAnnualVolume', v)} unit="docs/yr" />
          <p className="text-xs text-gray-400 mt-4 mb-2">Outputs</p>
          <ResultRow
            label="Hours saved per document"
            value={`${formatNumber(sitePerDoc, 1)} hrs`}
            formula={`${inputs.siteBaseline} × ${inputs.siteTargetReduction}% = ${formatNumber(sitePerDoc, 1)} hrs`}
          />
          <ResultRow
            label="Annual hours saved"
            value={`${formatNumber(siteAnnual)} hrs/yr`}
            formula={`${formatNumber(sitePerDoc, 1)} hrs × ${inputs.siteAnnualVolume} docs = ${formatNumber(siteAnnual)} hrs`}
          />
        </div>

        {/* QE Reduction — severity-based model */}
        <div className="card p-5 col-span-2">
          <div className="flex items-start justify-between mb-1">
            <div>
              <h3 className="font-semibold text-tfs-charcoal">Quality Event Reduction (KPI 4)</h3>
              <p className="text-xs text-gray-400 mt-0.5">Severity-based cost model · Baseline period: Jun 2025–Jun 2026 · ICF adaptation/customization QEs only — version-correction excluded</p>
            </div>
            <span className="text-[10px] px-2 py-1 rounded bg-amber-50 border border-amber-200 text-amber-700 font-semibold whitespace-nowrap">Measurable Q3 2026</span>
          </div>

          <div className="grid grid-cols-2 gap-5 mt-4">
            {/* Left: baseline profile + reduction target */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Baseline QE Profile (editable)</p>

              {/* Severity table */}
              <div className="rounded-lg overflow-hidden border border-tfs-gray mb-3">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-tfs-offwhite border-b border-tfs-gray">
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">Severity</th>
                      <th className="text-center px-3 py-2 text-xs font-semibold text-gray-500">Count</th>
                      <th className="text-right px-3 py-2 text-xs font-semibold text-gray-500">Cost / Event</th>
                      <th className="text-right px-3 py-2 text-xs font-semibold text-gray-500">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Critical */}
                    <tr className="border-b border-tfs-gray/50 bg-red-50/40">
                      <td className="px-3 py-2">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                          <span className="text-xs font-semibold text-primary">Critical</span>
                        </span>
                      </td>
                      <td className="px-3 py-2 text-center">
                        <input type="number" min={0} value={inputs.qeCriticalCount}
                          onChange={(e) => set('qeCriticalCount', Number(e.target.value))}
                          className="w-14 border border-tfs-gray rounded px-1.5 py-0.5 text-xs text-center focus:outline-none focus:ring-1 focus:ring-primary" />
                      </td>
                      <td className="px-3 py-2 text-right">
                        <input type="number" min={0} value={inputs.qeCriticalCost}
                          onChange={(e) => set('qeCriticalCost', Number(e.target.value))}
                          className="w-20 border border-tfs-gray rounded px-1.5 py-0.5 text-xs text-right focus:outline-none focus:ring-1 focus:ring-primary" />
                      </td>
                      <td className="px-3 py-2 text-right text-xs font-semibold text-primary">
                        {formatCurrency(inputs.qeCriticalCount * inputs.qeCriticalCost)}
                      </td>
                    </tr>
                    {/* Major */}
                    <tr className="border-b border-tfs-gray/50 bg-amber-50/30">
                      <td className="px-3 py-2">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                          <span className="text-xs font-semibold text-amber-700">Major</span>
                        </span>
                      </td>
                      <td className="px-3 py-2 text-center">
                        <input type="number" min={0} value={inputs.qeMajorCount}
                          onChange={(e) => set('qeMajorCount', Number(e.target.value))}
                          className="w-14 border border-tfs-gray rounded px-1.5 py-0.5 text-xs text-center focus:outline-none focus:ring-1 focus:ring-primary" />
                      </td>
                      <td className="px-3 py-2 text-right">
                        <input type="number" min={0} value={inputs.qeMajorCost}
                          onChange={(e) => set('qeMajorCost', Number(e.target.value))}
                          className="w-20 border border-tfs-gray rounded px-1.5 py-0.5 text-xs text-right focus:outline-none focus:ring-1 focus:ring-primary" />
                      </td>
                      <td className="px-3 py-2 text-right text-xs font-semibold text-amber-700">
                        {formatCurrency(inputs.qeMajorCount * inputs.qeMajorCost)}
                      </td>
                    </tr>
                    {/* Minor */}
                    <tr className="bg-white">
                      <td className="px-3 py-2">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-gray-400 inline-block" />
                          <span className="text-xs font-semibold text-gray-600">Minor</span>
                        </span>
                      </td>
                      <td className="px-3 py-2 text-center">
                        <input type="number" min={0} value={inputs.qeMinorCount}
                          onChange={(e) => set('qeMinorCount', Number(e.target.value))}
                          className="w-14 border border-tfs-gray rounded px-1.5 py-0.5 text-xs text-center focus:outline-none focus:ring-1 focus:ring-primary" />
                      </td>
                      <td className="px-3 py-2 text-right">
                        <input type="number" min={0} value={inputs.qeMinorCost}
                          onChange={(e) => set('qeMinorCost', Number(e.target.value))}
                          className="w-20 border border-tfs-gray rounded px-1.5 py-0.5 text-xs text-right focus:outline-none focus:ring-1 focus:ring-primary" />
                      </td>
                      <td className="px-3 py-2 text-right text-xs font-semibold text-gray-600">
                        {formatCurrency(inputs.qeMinorCount * inputs.qeMinorCost)}
                      </td>
                    </tr>
                    {/* Total row */}
                    <tr className="bg-tfs-offwhite border-t border-tfs-gray">
                      <td className="px-3 py-2 text-xs font-bold text-tfs-charcoal">Total Baseline</td>
                      <td className="px-3 py-2 text-center text-xs font-bold text-tfs-charcoal">{qeTotal}</td>
                      <td className="px-3 py-2" />
                      <td className="px-3 py-2 text-right text-sm font-bold text-primary">{formatCurrency(qeBaselineCost)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="border border-tfs-gray rounded-lg p-3 bg-tfs-offwhite">
                <InputRow label="QE reduction target" value={inputs.qeTargetReduction}
                  onChange={(v) => set('qeTargetReduction', v)} unit="%" max={100} />
              </div>
            </div>

            {/* Right: outputs */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Projected Savings</p>
              <div className="space-y-3">
                <div className="card p-4 border-l-4 border-l-primary">
                  <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">Total Baseline QE Cost</div>
                  <div className="text-2xl font-bold text-tfs-charcoal">{formatCurrency(qeBaselineCost)}</div>
                  <div className="text-xs text-gray-400 mt-0.5 font-mono">
                    ({inputs.qeCriticalCount}×{formatCurrency(inputs.qeCriticalCost)}) + ({inputs.qeMajorCount}×{formatCurrency(inputs.qeMajorCost)}) + ({inputs.qeMinorCount}×{formatCurrency(inputs.qeMinorCost)})
                  </div>
                </div>
                <div className="card p-4 border-l-4 border-l-tfs-teal">
                  <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">Projected Annual Savings</div>
                  <div className="text-2xl font-bold text-tfs-teal">{formatCurrency(qeDollars)}</div>
                  <div className="text-xs text-gray-400 mt-0.5 font-mono">
                    {formatCurrency(qeBaselineCost)} × {inputs.qeTargetReduction}% reduction
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="card p-4">
                    <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">Events Avoided</div>
                    <div className="text-xl font-bold text-tfs-charcoal">{formatNumber(qesAvoided, 1)}</div>
                    <div className="text-xs text-gray-400 mt-0.5">QEs / yr</div>
                  </div>
                  <div className="card p-4">
                    <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">Reporting Period</div>
                    <div className="text-sm font-bold text-tfs-charcoal leading-tight">Jun 2025–<br/>Jun 2026</div>
                    <div className="text-xs text-gray-400 mt-0.5">Baseline window</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* End-to-End */}
        <div className="card p-5 col-span-1">
          <h3 className="font-semibold text-tfs-charcoal mb-1">End-to-End Cycle Time (KPI 3)</h3>
          <p className="text-xs text-gray-400 mb-4">Inputs — measurable Q3 2026 (TFS baseline TBD)</p>
          <InputRow label="Baseline cycle days per study" value={inputs.endToEndBaseline} onChange={(v) => set('endToEndBaseline', v)} unit="days" />
          <InputRow label="Target reduction" value={inputs.endToEndTargetReduction} onChange={(v) => set('endToEndTargetReduction', v)} unit="%" max={100} />
          <InputRow label="Annual study volume" value={inputs.annualStudyVolume} onChange={(v) => set('annualStudyVolume', v)} unit="studies/yr" />
          <p className="text-xs text-gray-400 mt-4 mb-2">Outputs</p>
          <ResultRow
            label="Days saved per study"
            value={`${formatNumber(e2eDaysSaved, 1)} days`}
            formula={`${inputs.endToEndBaseline} × ${inputs.endToEndTargetReduction}% = ${formatNumber(e2eDaysSaved, 1)} days`}
          />
          <ResultRow
            label="Annual days saved"
            value={`${formatNumber(annualDays)} days/yr`}
            formula={`${formatNumber(e2eDaysSaved, 1)} days × ${inputs.annualStudyVolume} studies`}
          />
        </div>

        {/* Hourly rate assumption */}
        <div className="card p-5 col-span-1">
          <h3 className="font-semibold text-tfs-charcoal mb-1">Hourly Rate Assumption</h3>
          <p className="text-xs text-gray-400 mb-4">Used across all hours-based value calculations</p>
          <InputRow label="Fully-loaded hourly rate" value={inputs.hourlyRate} onChange={(v) => set('hourlyRate', v)} unit="$/hr" />
          <p className="text-xs text-gray-400 mt-4 mb-2">Output</p>
          <ResultRow
            label="Hours value (Country + Site)"
            value={formatCurrency(totalHours * inputs.hourlyRate)}
            formula={`${formatNumber(totalHours)} hrs × $${inputs.hourlyRate}/hr`}
          />
        </div>
      </div>

      {/* Total hard value summary */}
      <div className="card p-6 border-2 border-primary/20 bg-red-50">
        <h3 className="font-bold text-tfs-charcoal text-base mb-4">Total Hard Value Summary</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Annual Hours Saved</div>
            <div className="text-2xl font-bold text-tfs-charcoal">{formatNumber(totalHours)}</div>
            <div className="text-xs text-gray-400 mt-0.5">hours per year</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Hours Dollar Value</div>
            <div className="text-2xl font-bold text-tfs-charcoal">{formatCurrency(totalHours * inputs.hourlyRate)}</div>
            <div className="text-xs text-gray-400 mt-0.5">at ${inputs.hourlyRate}/hr fully loaded</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Hard Value (Hours + QE)</div>
            <div className="text-2xl font-bold text-primary">{formatCurrency(totalHard)}</div>
            <div className="text-xs text-gray-400 mt-0.5">hours value + QE avoided</div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-red-200">
          <p className="text-xs text-gray-500">
            Formula: Total Hard Value = (Total Annual Hours Saved × Hourly Rate) + QE Dollar Value Avoided
          </p>
          <p className="text-xs font-mono text-gray-500 mt-0.5">
            = ({formatNumber(totalHours)} hrs × ${inputs.hourlyRate}/hr) + {formatCurrency(qeDollars)} QE savings = {formatCurrency(totalHard)}
          </p>
        </div>
      </div>
    </div>
  );
}
