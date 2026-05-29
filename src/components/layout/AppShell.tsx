import React from 'react';
import Sidebar, { TabId } from './Sidebar';
import TopBar from './TopBar';
import { ReportingConfig } from '../../types';

interface AppShellProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  children: React.ReactNode;
  reportingConfig: ReportingConfig;
  onReportingChange: (cfg: ReportingConfig) => void;
}

export default function AppShell({ activeTab, onTabChange, children, reportingConfig, onReportingChange }: AppShellProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-tfs-offwhite">
      <Sidebar activeTab={activeTab} onTabChange={onTabChange} />
      <div className="flex flex-col flex-1 ml-60 overflow-hidden">
        <TopBar activeTab={activeTab} reportingConfig={reportingConfig} onReportingChange={onReportingChange} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
