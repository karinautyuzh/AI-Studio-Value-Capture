import React from 'react';
import { CheckCircle2, Circle, Clock, Sparkles, ChevronRight } from 'lucide-react';
import { RoadmapPhase, PhaseStatus } from '../../types';
import { cn } from '../../lib/utils';

interface RoadmapProps {
  phases: RoadmapPhase[];
}

const phaseConfig: Record<PhaseStatus, { badge: string; dot: string; border: string; bg: string }> = {
  complete: {
    badge: 'bg-teal-50 text-tfs-teal border-teal-200',
    dot: 'bg-tfs-teal',
    border: 'border-tfs-teal',
    bg: 'bg-white',
  },
  'in-progress': {
    badge: 'bg-blue-50 text-tfs-blue border-blue-200',
    dot: 'bg-tfs-blue ring-4 ring-blue-100',
    border: 'border-tfs-blue',
    bg: 'bg-white',
  },
  upcoming: {
    badge: 'bg-gray-100 text-gray-500 border-gray-200',
    dot: 'bg-gray-300',
    border: 'border-tfs-gray',
    bg: 'bg-white',
  },
  future: {
    badge: 'bg-purple-50 text-purple-600 border-purple-200',
    dot: 'bg-purple-400',
    border: 'border-purple-200',
    bg: 'bg-purple-50/30',
  },
};

const phaseStatusLabels: Record<PhaseStatus, string> = {
  complete: 'Complete',
  'in-progress': 'In Progress',
  upcoming: 'Upcoming',
  future: 'North Star',
};

const phaseIcons: Record<PhaseStatus, React.ReactNode> = {
  complete: <CheckCircle2 size={14} />,
  'in-progress': <Clock size={14} />,
  upcoming: <Circle size={14} />,
  future: <Sparkles size={14} />,
};

export default function Roadmap({ phases }: RoadmapProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="section-title">Capability Roadmap</h2>
        <p className="section-subtitle">5-phase ICF automation journey — Q1 2026 through North Star</p>
      </div>

      {/* Timeline connector */}
      <div className="flex items-center gap-2 mb-2 px-2">
        {phases.map((phase, i) => {
          const cfg = phaseConfig[phase.status];
          return (
            <React.Fragment key={phase.id}>
              <div className="flex flex-col items-center">
                <div className={cn('w-3 h-3 rounded-full flex-shrink-0', cfg.dot)} />
                <div className="text-xs text-gray-400 mt-1 text-center whitespace-nowrap">{phase.timing}</div>
              </div>
              {i < phases.length - 1 && (
                <div className="flex-1 h-0.5 bg-tfs-gray" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Phase cards */}
      <div className="grid grid-cols-1 gap-4">
        {phases.map((phase) => {
          const cfg = phaseConfig[phase.status];
          return (
            <div key={phase.id} className={cn('card border-l-4 overflow-hidden', cfg.border, cfg.bg)}>
              <div className="p-5">
                {/* Header row */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn('status-pill border flex items-center gap-1', cfg.badge)}>
                        {phaseIcons[phase.status]}
                        {phaseStatusLabels[phase.status]}
                      </span>
                      <span className="text-xs text-gray-400">{phase.targetDate}</span>
                    </div>
                    <h3 className="text-base font-bold text-tfs-charcoal">{phase.name}</h3>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-5">
                  {/* Capabilities */}
                  <div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Capabilities</div>
                    <div className="space-y-1.5">
                      {phase.capabilities.map((cap) => {
                        const done = phase.completedCapabilities.includes(cap);
                        return (
                          <div key={cap} className="flex items-start gap-1.5 text-xs">
                            {done ? (
                              <CheckCircle2 size={12} className="text-tfs-teal flex-shrink-0 mt-0.5" />
                            ) : (
                              <Circle size={12} className="text-gray-300 flex-shrink-0 mt-0.5" />
                            )}
                            <span className={done ? 'text-tfs-charcoal' : 'text-gray-500'}>{cap}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* KPIs unlocked + Value milestone */}
                  <div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">KPIs Unlocked</div>
                    <div className="space-y-1 mb-4">
                      {phase.kpisUnlocked.map((k) => (
                        <div key={k} className="flex items-center gap-1.5 text-xs">
                          <ChevronRight size={11} className="text-primary flex-shrink-0" />
                          <span className="text-gray-600">{k}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Value Milestone</div>
                    <p className="text-xs text-gray-600 leading-relaxed">{phase.valueMilestone}</p>
                  </div>

                  {/* Dependencies */}
                  <div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Dependencies</div>
                    <div className="space-y-1.5">
                      {phase.dependencies.map((dep) => (
                        <div key={dep} className="flex items-start gap-1.5 text-xs">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-1" />
                          <span className="text-gray-500">{dep}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
