import { TabId } from './Sidebar';
import { ReportingConfig } from '../../types';

const tabLabels: Record<TabId, string> = {
  overview:    'Executive Overview',
  scoring:     'Value Scoring',
  kpi:         'KPI Framework',
  calculator:  'Value Calculator',
  pipeline:    'Pipeline Summary',
  roadmap:     'Roadmap',
  readiness:   'Measurement Readiness',
  assumptions: 'Assumptions & Open Items',
};

interface TopBarProps {
  activeTab: TabId;
  reportingConfig: ReportingConfig;
  onReportingChange: (cfg: ReportingConfig) => void;
}

const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'] as const;

export default function TopBar({ activeTab, reportingConfig, onReportingChange }: TopBarProps) {
  const { mode, monthlyStart, monthlyEnd, quarter } = reportingConfig;

  return (
    <header className="bg-white border-b border-tfs-gray px-6 py-0 flex-shrink-0">
      {/* Row 1 — title + chips */}
      <div className="flex items-center justify-between py-3 border-b border-tfs-gray/60">
        <div>
          <h1 className="text-base font-semibold text-tfs-charcoal">{tabLabels[activeTab]}</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            AI Studio Value Capture · ICF Assistant Use Case · Thermo Fisher Scientific
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-tfs-offwhite border border-tfs-gray text-xs font-medium text-tfs-charcoal">
            Q1 2026 — MVP Phase
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-semibold text-primary">
            ● Live
          </span>
        </div>
      </div>

      {/* Row 2 — reporting period controls */}
      <div className="flex items-center gap-4 py-2">
        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Reporting Period</span>

        {/* Mode toggle */}
        <div className="flex rounded overflow-hidden border border-tfs-gray text-xs">
          {(['monthly', 'quarterly'] as const).map((m) => (
            <button
              key={m}
              onClick={() => onReportingChange({ ...reportingConfig, mode: m })}
              className={`px-3 py-1 font-medium capitalize transition-colors ${
                mode === m
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-500 hover:bg-tfs-offwhite'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {mode === 'monthly' ? (
          <div className="flex items-center gap-2 text-xs">
            <input
              type="month"
              value={monthlyStart}
              min="2026-01"
              max="2026-12"
              onChange={(e) => onReportingChange({ ...reportingConfig, monthlyStart: e.target.value })}
              className="border border-tfs-gray rounded px-2 py-0.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <span className="text-gray-400">→</span>
            <input
              type="month"
              value={monthlyEnd}
              min="2026-01"
              max="2026-12"
              onChange={(e) => onReportingChange({ ...reportingConfig, monthlyEnd: e.target.value })}
              className="border border-tfs-gray rounded px-2 py-0.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        ) : (
          <div className="flex rounded overflow-hidden border border-tfs-gray text-xs">
            {QUARTERS.map((q) => (
              <button
                key={q}
                onClick={() => onReportingChange({ ...reportingConfig, quarter: q })}
                className={`px-3 py-1 font-medium transition-colors ${
                  quarter === q
                    ? 'bg-tfs-blue text-white'
                    : 'bg-white text-gray-500 hover:bg-tfs-offwhite'
                }`}
              >
                {q} 2026
              </button>
            ))}
          </div>
        )}

        <span className="ml-auto text-[10px] text-gray-300 italic">
          Reporting period controls are placeholders for future timestamp-based reporting from ICF Assistant and TFS source systems
        </span>
      </div>
    </header>
  );
}
