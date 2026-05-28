import { TabId } from './Sidebar';

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

export default function TopBar({ activeTab }: TopBarProps) {
  return (
    <header className="bg-white border-b border-tfs-gray px-6 py-3 flex items-center justify-between flex-shrink-0">
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
    </header>
  );
}
