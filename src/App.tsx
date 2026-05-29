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

import { defaultKPIs } from './data/kpis';
import { roadmapPhases } from './data/roadmap';
import { pipelineData } from './data/pipeline';
import { defaultScoringCategories } from './data/scoring';
import { KPI, CalculatorInputs, ScoringCategory, ReportingConfig } from './types';

const DEFAULT_CALCULATOR_INPUTS: CalculatorInputs = {
  countryBaseline: 12,
  countryTargetReduction: 50,
  countryAnnualVolume: 120,
  siteBaseline: 6,
  siteTargetReduction: 50,
  siteAnnualVolume: 300,
  hourlyRate: 125,
  qeBaseline: 40,
  qeTargetReduction: 20,
  costPerQE: 2500,
  endToEndBaseline: 30,
  endToEndTargetReduction: 25,
  annualStudyVolume: 40,
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [kpis, setKpis] = useState<KPI[]>(defaultKPIs);
  const [calculatorInputs, setCalculatorInputs] = useState<CalculatorInputs>(DEFAULT_CALCULATOR_INPUTS);
  const [scoringCategories, setScoringCategories] = useState<ScoringCategory[]>(defaultScoringCategories);
  const [reportingConfig, setReportingConfig] = useState<ReportingConfig>({
    mode: 'quarterly',
    monthlyStart: '2026-01',
    monthlyEnd: '2026-03',
    quarter: 'Q1',
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <ExecutiveOverview
            kpis={kpis}
            calculatorInputs={calculatorInputs}
          />
        );
      case 'scoring':
        return (
          <ValueScoring
            categories={scoringCategories}
            onCategoriesChange={setScoringCategories}
          />
        );
      case 'kpi':
        return (
          <KPIFramework
            kpis={kpis}
            onKpisChange={setKpis}
          />
        );
      case 'calculator':
        return (
          <ValueCalculator
            inputs={calculatorInputs}
            onInputsChange={setCalculatorInputs}
          />
        );
      case 'pipeline':
        return <PipelineSummary pipeline={pipelineData} />;
      case 'roadmap':
        return <Roadmap phases={roadmapPhases} />;
      case 'readiness':
        return <MeasurementReadiness />;
      case 'assumptions':
        return <AssumptionsLog />;
      default:
        return null;
    }
  };

  return (
    <AppShell activeTab={activeTab} onTabChange={setActiveTab} reportingConfig={reportingConfig} onReportingChange={setReportingConfig}>
      {renderContent()}
    </AppShell>
  );
}
