import React from 'react';
import {
  LayoutDashboard,
  Star,
  BarChart2,
  Calculator,
  GitBranch,
  Map,
  CheckSquare,
  HelpCircle,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export type TabId =
  | 'overview'
  | 'scoring'
  | 'kpi'
  | 'calculator'
  | 'pipeline'
  | 'roadmap'
  | 'readiness'
  | 'assumptions';

interface NavItem {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: 'overview', label: 'Executive Overview', icon: <LayoutDashboard size={18} /> },
  { id: 'scoring', label: 'Value Scoring', icon: <Star size={18} /> },
  { id: 'kpi', label: 'KPI Framework', icon: <BarChart2 size={18} /> },
  { id: 'calculator', label: 'Value Calculator', icon: <Calculator size={18} /> },
  { id: 'pipeline', label: 'Pipeline Summary', icon: <GitBranch size={18} /> },
  { id: 'roadmap', label: 'Roadmap', icon: <Map size={18} /> },
  { id: 'readiness', label: 'Measurement Readiness', icon: <CheckSquare size={18} /> },
  { id: 'assumptions', label: 'Assumptions & Open Items', icon: <HelpCircle size={18} /> },
];

interface SidebarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-full w-60 bg-tfs-charcoal flex flex-col z-10">
      {/* Header */}
      <div className="bg-primary px-4 py-5 flex-shrink-0">
        <div className="text-white">
          <div className="text-xs font-medium uppercase tracking-widest text-red-200 mb-1">
            Thermo Fisher Scientific
          </div>
          <div className="text-base font-bold leading-tight">ICF Assistant</div>
          <div className="text-sm font-normal text-red-100">Value Framework</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              'w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors relative',
              activeTab === item.id
                ? 'bg-white/10 text-white border-l-4 border-primary pl-3'
                : 'text-gray-400 hover:bg-white/5 hover:text-white border-l-4 border-transparent pl-3'
            )}
          >
            <span className={cn(activeTab === item.id ? 'text-red-300' : 'text-gray-500')}>
              {item.icon}
            </span>
            <span className="leading-tight">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-white/10 flex-shrink-0">
        <div className="text-xs text-gray-500">
          <div className="font-medium text-gray-400 mb-0.5">Accenture × TFS</div>
          <div>Value Realization 2026</div>
        </div>
      </div>
    </aside>
  );
}
