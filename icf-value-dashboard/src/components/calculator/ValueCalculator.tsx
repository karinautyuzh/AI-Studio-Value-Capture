import React from 'react';
import { RotateCcw } from 'lucide-react';
import { CalculatorInputs } from '../../types';
import {
  calcCountryHoursSavedPerDoc,
  calcCountryAnnualHoursSaved,
  calcSiteHoursSavedPerDoc,
  calcSiteAnnualHoursSaved,
  calcTotalAnnualHoursSaved,
  calcQEsAvoided,
  calcQEDollarValue,
  calcTotalHardValue,
  calcEndToEndDaysSaved,
  calcAnnualDaysSaved,
} from '../../lib/calculations';
import { formatNumber, formatCurrency } from '../../lib/utils';

const DEFAULT_INPUTS: CalculatorInputs = {
  countryBaseline: 12,
  countryTargetReduction: 50,
  countryAnnualVolume: 120,
  siteBaseline: 6,
  siteTargetReduction: 50,
  siteAnnualVolume: 300,
  hourlyRate: 85,
  qeBaseline: 10,
  qeTargetReduction: 20,
  costPerQE: 15000,
  endToEndBaseline: 30,
  endToEndTargetReduction: 25,
  annualStudyVolume: 40,
};

interface ValueCalculatorProps {
  inputs: CalculatorInputs;
  onInputsChange: (inputs: CalculatorInputs) => void;
}

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

export default function ValueCalculator({ inputs, onInputsChange }: ValueCalculatorProps) {
  const set = (key: keyof CalculatorInputs, val: number) =>
    onInputsChange({ ...inputs, [key]: val });

  const countryPerDoc = calcCountryHoursSavedPerDoc(inputs);
  const countryAnnual = calcCountryAnnualHoursSaved(inputs);
  const sitePerDoc = calcSiteHoursSavedPerDoc(inputs);
  const siteAnnual = calcSiteAnnualHoursSaved(inputs);
  const totalHours = calcTotalAnnualHoursSaved(inputs);
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
          onClick={() => onInputsChange(DEFAULT_INPUTS)}
          className="flex items-center gap-2 btn-secondary"
        >
          <RotateCcw size={14} /> Reset to Defaults
        </button>
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

        {/* QE Reduction */}
        <div className="card p-5">
          <h3 className="font-semibold text-tfs-charcoal mb-1">Quality Event Reduction (KPI 4)</h3>
          <p className="text-xs text-gray-400 mb-4">Inputs — measurable Q3 2026</p>
          <InputRow label="Baseline QEs per year" value={inputs.qeBaseline} onChange={(v) => set('qeBaseline', v)} unit="QEs/yr" />
          <InputRow label="Target reduction" value={inputs.qeTargetReduction} onChange={(v) => set('qeTargetReduction', v)} unit="%" max={100} />
          <InputRow label="Cost per quality event" value={inputs.costPerQE} onChange={(v) => set('costPerQE', v)} unit="$/QE" step={1000} />
          <InputRow label="Hourly fully-loaded rate" value={inputs.hourlyRate} onChange={(v) => set('hourlyRate', v)} unit="$/hr" />
          <p className="text-xs text-gray-400 mt-4 mb-2">Outputs</p>
          <ResultRow
            label="QEs avoided per year"
            value={`${formatNumber(qesAvoided, 1)} QEs`}
            formula={`${inputs.qeBaseline} × ${inputs.qeTargetReduction}% = ${formatNumber(qesAvoided, 1)}`}
          />
          <ResultRow
            label="QE dollar value avoided"
            value={formatCurrency(qeDollars)}
            formula={`${formatNumber(qesAvoided, 1)} QEs × ${formatCurrency(inputs.costPerQE)}/QE`}
          />
        </div>

        {/* End-to-End */}
        <div className="card p-5">
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
            = ({formatNumber(totalHours)} hrs × ${inputs.hourlyRate}) + {formatCurrency(qeDollars)} = {formatCurrency(totalHard)}
          </p>
        </div>
      </div>
    </div>
  );
}
