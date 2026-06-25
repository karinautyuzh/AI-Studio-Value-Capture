import { useState } from 'react';
import AppShell from './components/layout/AppShell';
import { TabId } from './components/layout/Sidebar';
import ExecutiveOverview from './components/overview/ExecutiveOverview';
import ValueScoring from './components/scoring/ValueScoring';
import KPIFramework from './components/kpi/KPIFramework';
import ValueCalculator from './components/calculator/ValueCalculator';
import PipelineSummary from './components/pipeline/PipelineSummary';
import Roadmap from './components/roadmap/Roadmap';
import MeasurementReadiness from './components/readiness/MeasurementReadiness';
import AssumptionsLog from './components/assumptions/AssumptionsLog';
import { pipelineData } from './data/pipeline';
import { roadmapPhases } from './data/roadmap';
import { DashboardProvider } from './context/DashboardContext';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <ExecutiveOverview />;
      case 'scoring': return <ValueScoring />;
      case 'kpi': return <KPIFramework />;
      case 'calculator': return <ValueCalculator />;
      case 'pipeline': return <PipelineSummary pipeline={pipelineData} />;
      case 'roadmap': return <Roadmap phases={roadmapPhases} />;
      case 'readiness': return <MeasurementReadiness />;
      case 'assumptions': return <AssumptionsLog />;
      default: return null;
    }
  };

  return (
    <DashboardProvider>
      <AppShell activeTab={activeTab} onTabChange={setActiveTab}>
        {renderContent()}
      </AppShell>
    </DashboardProvider>
  );
}
