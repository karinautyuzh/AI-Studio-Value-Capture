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
  { id: 'overview',    label: 'Executive Overview',      icon: <LayoutDashboard size={17} /> },
  { id: 'scoring',     label: 'Value Scoring',            icon: <Star size={17} /> },
  { id: 'kpi',         label: 'KPI Framework',            icon: <BarChart2 size={17} /> },
  { id: 'calculator',  label: 'Value Calculator',         icon: <Calculator size={17} /> },
  { id: 'pipeline',    label: 'Pipeline Summary',         icon: <GitBranch size={17} /> },
  { id: 'roadmap',     label: 'Roadmap',                  icon: <Map size={17} /> },
  { id: 'readiness',   label: 'Measurement Readiness',    icon: <CheckSquare size={17} /> },
  { id: 'assumptions', label: 'Assumptions & Open Items', icon: <HelpCircle size={17} /> },
];

interface SidebarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-full w-60 bg-tfs-charcoal flex flex-col z-10">
      {/* Platform header */}
      <div className="bg-primary px-4 pt-5 pb-4 flex-shrink-0">
        <div className="text-[10px] font-semibold uppercase tracking-widest text-red-300 mb-0.5">
          Accenture AI Studio
        </div>
        <div className="text-lg font-bold text-white leading-tight">Value Capture</div>

        <div className="border-t border-red-400/40 my-3" />

        <div className="text-[10px] font-semibold uppercase tracking-widest text-red-300 mb-1">
          Featured Use Case
        </div>
        <div className="text-sm font-bold text-white leading-snug">ICF Assistant</div>
        <div className="text-xs text-red-200 mt-0.5">Thermo Fisher Scientific</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              'w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors relative border-l-4',
              activeTab === item.id
                ? 'bg-white/10 text-white border-primary'
                : 'text-gray-400 hover:bg-white/5 hover:text-white border-transparent'
            )}
          >
            <span className={cn('flex-shrink-0', activeTab === item.id ? 'text-red-300' : 'text-gray-500')}>
              {item.icon}
            </span>
            <span className="leading-tight text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-white/10 flex-shrink-0">
        <div className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-0.5">
          Portfolio-Ready Framework
        </div>
        <div className="text-xs text-gray-500">Value Realization 2026</div>
      </div>
    </aside>
  );
}
