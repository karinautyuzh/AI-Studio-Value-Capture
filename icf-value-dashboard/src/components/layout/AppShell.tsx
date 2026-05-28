import React from 'react';
import Sidebar, { TabId } from './Sidebar';
import TopBar from './TopBar';

interface AppShellProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  children: React.ReactNode;
}

export default function AppShell({ activeTab, onTabChange, children }: AppShellProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-tfs-offwhite">
      <Sidebar activeTab={activeTab} onTabChange={onTabChange} />
      <div className="flex flex-col flex-1 ml-60 overflow-hidden">
        <TopBar activeTab={activeTab} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
