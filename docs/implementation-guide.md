# Implementation Guide

> How to adopt, configure, and deploy the Intake + Prioritization & Value Framework in your organization.

---

## Overview

This guide walks through the practical steps required to stand up this framework in a healthcare organization. It covers the sequencing, customization decisions, stakeholder engagement, and change management needed for a successful launch.

The framework can be implemented in stages. Most organizations reach a steady-state operating model within **90–120 days**.

---

## Implementation Principles

- **Start with what you have** — Do not wait for perfect data, perfect governance, or a perfect process. Launch with 80% and iterate.
- **Pilot before scaling** — Run the process with 3–5 real use cases before opening broadly to the organization.
- **Earn trust through transparency** — Publish scoring criteria, weights, and decisions. Stakeholders who lose a prioritization decision are more likely to accept it if the process is fair and visible.
- **Measure the framework itself** — Track submission volume, cycle time, and decision quality. Improve based on evidence.

---

## Implementation Phases

### Phase 0 — Foundation (Weeks 1–2)

**Goal:** Secure executive commitment and identify the core team.

| Activity | Owner | Output |
|---|---|---|
| Secure executive sponsor for the framework itself | CEO/CSO | Named executive champion |
| Identify framework lead (typically Innovation or PMO) | CEO/CSO | Named framework lead |
| Identify Governance Committee members | Framework lead | Confirmed committee roster |
| Review and customize this framework | Framework lead + committee | Customized framework documents |
| Identify pilot use cases (3–5 existing or pending submissions) | Framework lead | Pilot use case list |

**Key decision:** Who chairs the Governance Committee and what authority do they have?

---

### Phase 1 — Configuration (Weeks 2–4)

**Goal:** Customize the framework to fit your organization and stand up the operating infrastructure.

#### 1.1 Customize the Scoring Model

Review the default dimension weights and rubrics in [Scoring Model](scoring-model.md). Decide:

- [ ] Are the default weights appropriate for your current strategic context?
- [ ] Do the rubric descriptions match your organization's terminology?
- [ ] Are there organization-specific strategic priorities to embed in the alignment dimension?
- [ ] Are there any automatic disqualifiers to add?

Document any weight changes and have the Governance Committee formally approve them.

#### 1.2 Customize the Intake Form

Review the [Intake Form Template](../templates/intake-form-template.md). Decide:

- [ ] Are all required fields appropriate?
- [ ] Are there organization-specific fields to add (e.g., service line, business unit, system code)?
- [ ] What is the preferred submission channel? (Email, SharePoint form, intake portal, etc.)
- [ ] Who receives notifications when a new submission arrives?

#### 1.3 Configure Governance Meeting Cadence

- [ ] Schedule recurring monthly Governance Committee meetings
- [ ] Schedule recurring quarterly portfolio review meetings
- [ ] Identify the Operating Committee members and schedule weekly PMO meetings
- [ ] Define communication templates for sponsor notifications (approvals, deferrals, declines)

#### 1.4 Set Up KPI Tracking Infrastructure

- [ ] Confirm the analytics tool or dashboard platform to be used (Power BI, Tableau, Excel, etc.)
- [ ] Identify the data owners for each KPI category
- [ ] Configure baseline measurement process for pilot use cases

---

### Phase 2 — Pilot (Weeks 4–8)

**Goal:** Run 3–5 use cases through the full process end-to-end to validate the framework and calibrate the committee.

#### 2.1 Select Pilot Use Cases

Choose pilots that:
- Span at least 3 different value domains
- Include at least one "easy yes," one "likely defer," and one genuinely contested case
- Have engaged sponsors willing to participate in the pilot

#### 2.2 Run the Pilot Intake Process

1. Have sponsors complete the intake form
2. Operating Committee performs screening
3. Full evaluation committee scores each case independently
4. Calibration session: compare scores, discuss outliers, align on rubric interpretation
5. Governance Committee makes decisions (with commentary on the process, not just the cases)

#### 2.3 Document Pilot Learnings

After the pilot cycle, capture:
- What worked well?
- What was unclear or inconsistent?
- What took longer than expected?
- What would we change before broader rollout?

Update framework documents based on pilot learnings before launching broadly.

---

### Phase 3 — Launch (Weeks 8–12)

**Goal:** Open the process to the full organization and establish steady-state operations.

#### 3.1 Stakeholder Communication

Communicate the framework to the organization before opening submissions:

| Audience | Communication | Channel |
|---|---|---|
| Executive leadership | Framework overview, governance commitments | Leadership meeting |
| Service line and department leaders | How to submit, what to expect, timeline | Department meeting or webinar |
| Innovation champions and early adopters | How to write a strong submission | Workshop or office hours |
| IT and data teams | Data readiness expectations, assessment process | Working session |
| Clinical leadership | Clinical safety review process, clinical KPI definitions | CMO communication |

#### 3.2 Open Submissions

- [ ] Publish the intake form in your preferred channel
- [ ] Post framework documentation to your intranet or repository
- [ ] Announce an intake deadline for the first full governance cycle
- [ ] Identify 2–3 internal champions to encourage high-quality submissions

#### 3.3 Communicate First Decisions

After the first full governance cycle:
- Notify all sponsors of their decisions within 3 business days
- Publish a sanitized portfolio summary to the organization
- Host an optional Q&A for sponsors with deferral or decline decisions

---

### Phase 4 — Steady State & Continuous Improvement (Ongoing)

**Goal:** Operate the framework with consistency and continue to improve it.

#### Quarterly Health Checks

Every quarter, assess the framework against these indicators:

| Indicator | Healthy | Needs Attention |
|---|---|---|
| Submission volume | Growing or stable | Declining |
| Cycle time (submission to decision) | ≤ 6 weeks | > 8 weeks |
| Evaluator consistency | Score variance ≤ 15 points avg | Score variance > 20 points avg |
| Value realization rate | ≥ 70% of commitments on track | < 60% on track |
| Sponsor satisfaction | Positive feedback on process | Recurring complaints about fairness |

#### Annual Framework Review

Once per year, conduct a full framework review:
- Revisit scoring weights for strategic alignment with current year's goals
- Update KPI library with any new metrics or retired ones
- Assess whether governance structure needs evolution
- Review and refresh rubric examples with real cases from the prior year

---

## Configuration Options

### Option A — Lightweight Implementation

For organizations early in their AI journey or with limited PMO capacity:

- Use a simplified intake form (10–12 questions)
- Score on 3 dimensions instead of 5 (Strategic Alignment, Value Potential, Feasibility)
- Bi-monthly governance decisions instead of monthly
- Manual tracking in a shared spreadsheet instead of a dashboard

### Option B — Standard Implementation

The default model described in this framework. Appropriate for organizations with:
- An active AI pipeline (5+ submissions per quarter)
- A dedicated Innovation or PMO function
- Executive commitment to portfolio management
- Analytics capability to support KPI tracking

### Option C — Enterprise Implementation

For large health systems or organizations with a mature AI program:

- Integrate intake into an existing demand management or project intake system
- Connect scoring model to a portfolio management tool (e.g., ServiceNow, Smartsheet, Jira)
- Automate KPI tracking through BI dashboards
- Add sub-committees for specific domains (clinical AI, revenue cycle AI)
- Conduct semi-annual rather than annual weight recalibration

---

## Common Implementation Pitfalls

| Pitfall | Prevention |
|---|---|
| Too many KPIs per initiative | Enforce the 3 primary KPI limit at initiation; coach sponsors on focus |
| Baseline data not captured before launch | Make baseline documentation a hard requirement for initiation approval |
| Sponsors bypassing the process | Governance Committee should decline any initiative without a completed intake |
| Evaluation committee scores too high across the board | Use calibration sessions; share benchmark scores from prior cohorts |
| Governance Committee defers everything | Set a quorum rule; require a decision (Approve/Defer/Decline) for every scored item |
| Value commitments not followed up | Automate 90-day and 12-month review scheduling at initiation |
| Framework falls out of use | Assign a dedicated framework owner; tie to executive performance goals |

---

## Integration with Other Processes

| Process | Integration Point |
|---|---|
| **Strategic Planning** | Use the intake pipeline to inform next-year initiative list; align scoring weights with annual strategy |
| **Budget Planning** | Share approved and pipeline initiatives with Finance during annual budget cycle |
| **IT Roadmap Planning** | Share data readiness assessments and technical requirements with CIO team |
| **Vendor Management** | Reference initiative pipeline when negotiating AI vendor contracts |
| **Quality Management** | Align clinical quality KPIs with existing quality reporting structures |
| **Human Resources** | Share workforce experience KPIs with CHRO for integration with engagement programs |

---

## Sample Implementation Timeline

```
Week 1–2:   Foundation — secure executive sponsor, identify team
Week 2–4:   Configuration — customize framework, set up governance
Week 4–6:   Pilot intake — collect and screen pilot use cases
Week 6–8:   Pilot evaluation — score cases, calibrate committee, make decisions
Week 8–10:  Pilot retrospective — document learnings, finalize framework
Week 10–12: Launch — communicate broadly, open submissions, run first full cycle
Week 12+:   Steady state — monthly decisions, quarterly reviews, continuous improvement
```

---

*For the full process description, see [Intake & Prioritization Framework](intake-prioritization-framework.md). For governance structures, see [Governance](governance.md).*
