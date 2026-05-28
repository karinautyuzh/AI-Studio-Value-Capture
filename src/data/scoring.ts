import { ScoringCategory } from '../types';

export const defaultScoringCategories: ScoringCategory[] = [
  {
    id: 'time-savings',
    name: 'Time Savings',
    projectedScore: 80,
    actualScore: 35,
    weight: 30,
    description: 'Reduction in country and site ICF adaptation hours',
    drivers: [
      'Country baseline confirmed at 12hrs',
      'Site baseline confirmed at 6hrs',
      'Target 50% reduction',
      'KPI 1 tracking live',
    ],
  },
  {
    id: 'quality',
    name: 'Quality Improvement',
    projectedScore: 65,
    actualScore: 15,
    weight: 25,
    description: 'QE reduction and compliance risk mitigation',
    drivers: [
      'QE baseline TBD',
      '20% reduction target set',
      'Version control improvement expected',
      'Plain-language automation in roadmap',
    ],
  },
  {
    id: 'adoption',
    name: 'Adoption',
    projectedScore: 70,
    actualScore: 25,
    weight: 20,
    description: 'Percentage of eligible ICFs processed through the Assistant',
    drivers: [
      'Pilot group onboarded',
      'KPI 6 tracking live',
      'Full ramp target: 100% eligible ICFs',
      'Sponsor-level view future state',
    ],
  },
  {
    id: 'measurement-readiness',
    name: 'Measurement Readiness',
    projectedScore: 75,
    actualScore: 40,
    weight: 15,
    description: 'Data infrastructure and reporting readiness for KPI tracking',
    drivers: [
      'Timestamp capture in progress',
      'TFS baselines TBD for KPI 3/4',
      'Reporting mechanism being scoped',
      'Stage-level timestamps Q2 2026',
    ],
  },
  {
    id: 'strategic-scalability',
    name: 'Strategic Scalability',
    projectedScore: 85,
    actualScore: 20,
    weight: 10,
    description: 'Potential for scale, sponsor growth, and SaaS/FSP revenue uplift',
    drivers: [
      'Removes linear headcount constraint',
      'Sponsor-level reporting enables growth',
      'North Star: autonomous ICF lifecycle',
      'FSP/SaaS revenue uplift potential',
    ],
  },
];
