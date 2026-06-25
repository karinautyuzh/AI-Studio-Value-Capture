import { TabId } from './Sidebar';
import { useDashboard } from '../../context/DashboardContext';

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
}

const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'] as const;
const YEARS = [2026, 2027, 2028] as const;

export default function TopBar({ activeTab }: TopBarProps) {
  const { state, updateReportingConfig } = useDashboard();
  const { mode, monthlyStart, monthlyEnd, quarter, year, customStart, customEnd } = state.reportingConfig;

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
      <div className="flex items-center gap-4 py-2 flex-wrap">
        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Reporting Period</span>

        {/* Mode toggle */}
        <div className="flex rounded overflow-hidden border border-tfs-gray text-xs">
          {(['monthly', 'quarterly', 'custom'] as const).map((m) => (
            <button
              key={m}
              onClick={() => updateReportingConfig({ mode: m })}
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

        {mode === 'monthly' && (
          <div className="flex items-center gap-2 text-xs">
            <input
              type="month"
              value={monthlyStart}
              onChange={(e) => updateReportingConfig({ monthlyStart: e.target.value })}
              className="border border-tfs-gray rounded px-2 py-0.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <span className="text-gray-400">→</span>
            <input
              type="month"
              value={monthlyEnd}
              onChange={(e) => updateReportingConfig({ monthlyEnd: e.target.value })}
              className="border border-tfs-gray rounded px-2 py-0.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        )}

        {mode === 'quarterly' && (
          <>
            <div className="flex rounded overflow-hidden border border-tfs-gray text-xs">
              {QUARTERS.map((q) => (
                <button
                  key={q}
                  onClick={() => updateReportingConfig({ quarter: q })}
                  className={`px-3 py-1 font-medium transition-colors ${
                    quarter === q
                      ? 'bg-tfs-blue text-white'
                      : 'bg-white text-gray-500 hover:bg-tfs-offwhite'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
            <div className="flex rounded overflow-hidden border border-tfs-gray text-xs">
              {YEARS.map((yr) => (
                <button
                  key={yr}
                  onClick={() => updateReportingConfig({ year: yr })}
                  className={`px-3 py-1 font-medium transition-colors ${
                    year === yr
                      ? 'bg-tfs-charcoal text-white'
                      : 'bg-white text-gray-500 hover:bg-tfs-offwhite'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          </>
        )}

        {mode === 'custom' && (
          <div className="flex items-center gap-2 text-xs">
            <input
              type="date"
              value={customStart}
              onChange={(e) => updateReportingConfig({ customStart: e.target.value })}
              className="border border-tfs-gray rounded px-2 py-0.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <span className="text-gray-400">to</span>
            <input
              type="date"
              value={customEnd}
              onChange={(e) => updateReportingConfig({ customEnd: e.target.value })}
              className="border border-tfs-gray rounded px-2 py-0.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        )}

        <span className="ml-auto text-[10px] text-gray-300 italic max-w-md text-right">
          Reporting period selections adjust calculations using annual baseline values, selected-period duration, and quarterly phasing assumptions. Until live timestamp reporting is connected, period values are modeled from baseline assumptions.
        </span>
      </div>
    </header>
  );
}
