# KPI Library

> A comprehensive reference library of Key Performance Indicators (KPIs) for AI and automation initiatives in healthcare, organized by value domain.

---

## How to Use This Library

1. **Select your value domain(s)** from the six domains in the Value Framework
2. **Identify relevant KPI categories** within those domains
3. **Choose 1–3 primary KPIs** that best represent the initiative's expected outcomes
4. **Add 1–3 secondary KPIs** to capture adjacent value or early leading indicators
5. **Document baseline and target** for each selected KPI before launch

Each KPI includes: definition, measurement type, data source guidance, calculation method, and typical benchmark range where available.

---

## Domain 1: Quality & Speed

### Category 1.1 — Clinical Quality & Safety

| KPI | Definition | Type | Calculation | Data Source |
|---|---|---|---|---|
| **Diagnostic Error Rate** | % of diagnoses later found to be incorrect or incomplete | Quantitative | (Amended/corrected diagnoses ÷ total diagnoses) × 100 | EHR, quality audit |
| **Guideline Adherence Rate** | % of care encounters following applicable clinical guidelines | Quantitative | (Compliant encounters ÷ total applicable encounters) × 100 | EHR, clinical protocols |
| **Serious Safety Event Rate** | Number of preventable serious safety events per 1,000 patient days | Quantitative | Events ÷ patient days × 1,000 | Safety reporting system |
| **Near-Miss Detection Rate** | % of potential safety events caught before reaching the patient | Quantitative | (Caught near-misses ÷ total near-miss events identified) × 100 | Safety reporting, AI alert log |
| **Sepsis Early Detection Rate** | % of sepsis cases flagged by AI within defined early window | Quantitative | (Early flagged cases ÷ total sepsis cases) × 100 | EHR, AI alert log |
| **Care Variation Index** | Degree of unexplained variation from expected care path | Qualitative/Quant | Calculated by analytics team; scored 1–5 | Clinical analytics |

### Category 1.2 — Process Throughput & Cycle Time

| KPI | Definition | Type | Calculation | Data Source |
|---|---|---|---|---|
| **Average Cycle Time** | Average time from process start to completion (e.g., order to result) | Quantitative | Mean elapsed time across sampled transactions | Workflow system, EHR |
| **Time-to-Decision** | Average time from data availability to clinical or operational decision | Quantitative | Mean elapsed time from trigger to action | Workflow system |
| **Queue Wait Time** | Average time cases spend waiting before being actioned | Quantitative | Mean time in queue across sampled periods | Queue management system |
| **Process Throughput Rate** | Number of transactions or cases processed per unit time | Quantitative | Count of completions ÷ time period | Workflow system |
| **Rework Rate** | % of transactions requiring correction, reprocessing, or exception handling | Quantitative | (Reworked items ÷ total items) × 100 | Workflow system, QA log |
| **First-Time Right Rate** | % of transactions completed correctly on first attempt | Quantitative | (First-pass completions ÷ total completions) × 100 | Workflow system |

### Category 1.3 — Documentation Quality

| KPI | Definition | Type | Calculation | Data Source |
|---|---|---|---|---|
| **Documentation Completeness Score** | % of required fields populated in clinical documentation | Quantitative | (Populated fields ÷ required fields) × 100 | EHR |
| **Coding Specificity Rate** | % of diagnoses coded to highest available specificity level | Quantitative | (Highest-specificity codes ÷ total codes) × 100 | EHR, coding system |
| **Documentation Accuracy Rate** | % of clinical notes reviewed and found accurate by QA | Quantitative | (Accurate notes ÷ reviewed notes) × 100 | QA review |
| **Query Rate** | # of coding queries per 100 encounters | Quantitative | Queries ÷ encounters × 100 | Coding system |

---

## Domain 2: Cost Savings

### Category 2.1 — Labor Efficiency

| KPI | Definition | Type | Calculation | Data Source |
|---|---|---|---|---|
| **FTE Hours Avoided** | Hours of manual work eliminated by automation per period | Quantitative | (Pre-AI volume × pre-AI unit time) - (Post-AI volume × post-AI unit time) | Time study, workflow system |
| **Cost Per Transaction** | Fully-loaded cost to complete one transaction or encounter | Quantitative | Total cost ÷ transaction volume | Finance, HR |
| **Labor Cost as % of Revenue** | Staff cost as a proportion of net revenue | Quantitative | Total labor cost ÷ net revenue × 100 | Finance |
| **Overtime Hours Rate** | Overtime hours as % of total hours worked | Quantitative | OT hours ÷ total hours × 100 | Payroll |
| **Productivity Index** | Output per FTE relative to baseline | Quantitative | (Current output/FTE) ÷ (Baseline output/FTE) | Finance, workforce analytics |

### Category 2.2 — Avoidable Costs

| KPI | Definition | Type | Calculation | Data Source |
|---|---|---|---|---|
| **Avoidable Readmission Rate** | % of readmissions identified as potentially preventable | Quantitative | (Avoidable readmissions ÷ total admissions) × 100 | EHR, utilization management |
| **Avoidable Readmission Cost** | Dollar value of avoidable readmissions per period | Quantitative | Avoidable readmissions × avg cost per readmission | Finance, utilization management |
| **Duplicate Order Rate** | % of orders identified as duplicate or unnecessary | Quantitative | (Duplicate orders ÷ total orders) × 100 | EHR, order management |
| **Penalty Avoidance** | $ value of regulatory or payer penalties avoided | Quantitative | Estimated penalty exposure × reduction rate | Compliance, finance |
| **Vendor/Contract Savings** | Cost savings from AI-enabled contract or vendor optimization | Quantitative | Prior spend - current spend (normalized for volume) | Finance, procurement |

### Category 2.3 — Supply Chain

| KPI | Definition | Type | Calculation | Data Source |
|---|---|---|---|---|
| **Inventory Carrying Cost** | Cost of holding inventory on hand | Quantitative | Average inventory value × carrying cost rate | Supply chain, finance |
| **Stockout Rate** | % of orders where item was not available when needed | Quantitative | (Stockout events ÷ total order events) × 100 | Supply chain system |
| **Purchase Price Variance** | Difference between actual and standard purchase price | Quantitative | (Actual price - standard price) × volume | Procurement system |
| **Supply Expense Per Case** | Supply cost per adjusted patient case | Quantitative | Total supply cost ÷ adjusted cases | Finance, supply chain |

---

## Domain 3: Patient Experience

### Category 3.1 — Satisfaction & Sentiment

| KPI | Definition | Type | Calculation | Data Source |
|---|---|---|---|---|
| **CAHPS Composite Score** | CMS-standard patient experience survey composite | Quantitative | Calculated per CAHPS methodology | Survey platform |
| **Press Ganey Overall Score** | Overall satisfaction score from Press Ganey survey | Quantitative | Mean survey response (0–100 scale) | Press Ganey |
| **Net Promoter Score (NPS)** | Likelihood of patient to recommend the organization | Quantitative | % Promoters - % Detractors | Survey platform |
| **Patient Complaint Rate** | # of formal patient complaints per 1,000 encounters | Quantitative | Complaints ÷ encounters × 1,000 | Patient relations |
| **Patient Sentiment Score** | AI-analyzed sentiment from patient feedback and messages | Quantitative/Qual | Sentiment model output (0–100 scale) | Feedback platform, AI tool |

### Category 3.2 — Access & Scheduling

| KPI | Definition | Type | Calculation | Data Source |
|---|---|---|---|---|
| **Third Next Available Appointment** | Days until the third next available appointment (standard access metric) | Quantitative | Days from current date to 3rd available slot | Scheduling system |
| **No-Show Rate** | % of scheduled appointments where patient did not attend | Quantitative | (No-shows ÷ total scheduled) × 100 | Scheduling system |
| **Appointment Fill Rate** | % of available appointment slots that are filled | Quantitative | (Filled slots ÷ total slots) × 100 | Scheduling system |
| **After-Hours Contact Resolution Rate** | % of after-hours patient contacts resolved without ED visit | Quantitative | (Resolved contacts ÷ total after-hours contacts) × 100 | Call center, triage system |
| **Door-to-Provider Time** | Time from patient arrival to first provider contact in ED/urgent care | Quantitative | Mean elapsed time | EHR, ED tracking system |

### Category 3.3 — Communication & Engagement

| KPI | Definition | Type | Calculation | Data Source |
|---|---|---|---|---|
| **Patient Portal Enrollment Rate** | % of patients enrolled in patient portal | Quantitative | (Enrolled patients ÷ total active patients) × 100 | Portal system |
| **Patient Portal Engagement Rate** | % of enrolled patients actively using portal features | Quantitative | (Active users ÷ enrolled users) × 100 | Portal system |
| **Message Response Time** | Average time to respond to patient portal messages | Quantitative | Mean elapsed response time | Portal system |
| **Care Plan Adherence Rate** | % of patients following prescribed care plan actions | Quantitative | (Adherent patients ÷ total care plan patients) × 100 | EHR, patient outreach |
| **Outreach Opt-Out Rate** | % of patients opting out of AI-driven communications | Quantitative | (Opt-outs ÷ total enrolled) × 100 | Communication platform |

---

## Domain 4: Revenue Uplift

### Category 4.1 — Coding & Capture

| KPI | Definition | Type | Calculation | Data Source |
|---|---|---|---|---|
| **Case Mix Index (CMI)** | Average relative weight of all cases billed; indicator of coding accuracy | Quantitative | Sum of DRG weights ÷ total cases | Finance, coding system |
| **HCC Capture Rate** | % of clinically indicated HCC codes documented and coded | Quantitative | (Captured HCCs ÷ expected HCCs) × 100 | EHR, coding system |
| **Revenue per Encounter** | Net revenue per patient encounter | Quantitative | Net revenue ÷ total encounters | Finance |
| **Charge Capture Rate** | % of billable services successfully charged | Quantitative | (Charges submitted ÷ estimated chargeable services) × 100 | Billing system |
| **Undercoding Rate** | % of encounters where AI identified missed or downgraded codes | Quantitative | (Undercode flags ÷ total reviews) × 100 | AI coding tool |

### Category 4.2 — Denial & Prior Authorization

| KPI | Definition | Type | Calculation | Data Source |
|---|---|---|---|---|
| **Claim Denial Rate** | % of submitted claims denied on first pass | Quantitative | (Denied claims ÷ total submitted) × 100 | Revenue cycle system |
| **First-Pass Acceptance Rate** | % of claims accepted without rejection or denial | Quantitative | (Accepted claims ÷ total submitted) × 100 | Revenue cycle system |
| **Denial Reversal Rate** | % of denied claims successfully appealed and recovered | Quantitative | (Reversed denials ÷ total denied) × 100 | Revenue cycle system |
| **Days in Accounts Receivable (AR)** | Average days from service to payment | Quantitative | (Total AR ÷ average daily revenue) | Finance, revenue cycle |
| **Prior Auth Approval Rate** | % of prior authorization requests approved on first submission | Quantitative | (Approved ÷ total submitted) × 100 | Auth management system |
| **Prior Auth Cycle Time** | Average days from PA submission to decision | Quantitative | Mean days from submission to decision | Auth management system |

### Category 4.3 — Capacity & Throughput

| KPI | Definition | Type | Calculation | Data Source |
|---|---|---|---|---|
| **OR Utilization Rate** | % of scheduled OR time actually used for cases | Quantitative | (Actual OR time ÷ scheduled OR time) × 100 | OR scheduling system |
| **Bed Occupancy Rate** | % of licensed beds occupied on average | Quantitative | (Patient days ÷ available bed days) × 100 | Bed management system |
| **Discharge Before Noon Rate** | % of inpatient discharges occurring before 12:00 PM | Quantitative | (Discharges before noon ÷ total discharges) × 100 | EHR |
| **Length of Stay Variance** | Actual LOS vs. expected LOS by DRG | Quantitative | Actual LOS - Geometric mean LOS | Finance, EHR |
| **Scheduling Utilization Rate** | % of appointment slots filled (ambulatory) | Quantitative | (Filled slots ÷ available slots) × 100 | Scheduling system |

---

## Domain 5: Workforce Experience

### Category 5.1 — Administrative Burden

| KPI | Definition | Type | Calculation | Data Source |
|---|---|---|---|---|
| **Documentation Time Per Encounter** | Average minutes spent on clinical documentation per visit | Quantitative | Total documentation minutes ÷ encounters | EHR audit log, time study |
| **After-Hours Documentation Rate** | % of documentation completed outside scheduled hours | Quantitative | (After-hours notes ÷ total notes) × 100 | EHR audit log |
| **In-Basket Message Volume** | Average in-basket messages per provider per day | Quantitative | Total messages ÷ providers ÷ days | EHR inbox analytics |
| **Administrative Task Time Ratio** | % of shift time spent on administrative vs. clinical tasks | Quantitative | Admin task time ÷ total shift time × 100 | Time study, workflow tool |
| **Copy-Forward Usage Rate** | % of clinical notes using copy-forward without meaningful edits | Quantitative | (Copy-forward notes ÷ total notes) × 100 | EHR audit log |

### Category 5.2 — Staff Satisfaction & Retention

| KPI | Definition | Type | Calculation | Data Source |
|---|---|---|---|---|
| **Employee Engagement Score** | Overall staff engagement from annual or pulse surveys | Quantitative | Mean survey response (0–100 scale) | HR survey platform |
| **Clinician Net Promoter Score (cNPS)** | Likelihood of clinician to recommend the organization as a place to work | Quantitative | % Promoters - % Detractors | HR survey platform |
| **Voluntary Turnover Rate** | % of staff who voluntarily resigned in a period | Quantitative | (Voluntary separations ÷ average headcount) × 100 | HR system |
| **Time-to-Fill Vacancy** | Average days from position open to acceptance | Quantitative | Mean days from posting to offer acceptance | HR system |
| **Burnout Risk Index** | Proportion of staff scoring in high-burnout range on validated scale | Quantitative/Qual | % of respondents in high-risk category | Burnout assessment tool |
| **Workforce AI Adoption Rate** | % of eligible staff actively using AI tool | Quantitative | (Active users ÷ eligible users) × 100 | AI tool analytics |

### Category 5.3 — Training & Competency

| KPI | Definition | Type | Calculation | Data Source |
|---|---|---|---|---|
| **AI Training Completion Rate** | % of staff completing required AI tool training | Quantitative | (Completions ÷ assigned staff) × 100 | LMS |
| **Time-to-Proficiency** | Average days from training start to competency certification | Quantitative | Mean days from training start to competency sign-off | LMS, HR |
| **Training Satisfaction Score** | Staff satisfaction with AI training experience | Quantitative | Mean response on training survey (0–5 scale) | LMS, HR survey |

---

## Domain 6: Risk & Resiliency

### Category 6.1 — Regulatory & Compliance

| KPI | Definition | Type | Calculation | Data Source |
|---|---|---|---|---|
| **Compliance Exception Rate** | # of compliance exceptions identified per audit cycle | Quantitative | Exceptions ÷ total items reviewed × 100 | Compliance audit system |
| **Audit Finding Rate** | # of significant audit findings per review period | Quantitative | Count of findings per period | Internal/external audit |
| **Regulatory Submission Timeliness** | % of required regulatory submissions filed on time | Quantitative | (On-time submissions ÷ total required) × 100 | Compliance tracking |
| **Policy Adherence Rate** | % of reviewed interactions compliant with policy | Quantitative | (Compliant ÷ reviewed) × 100 | Compliance system |
| **AI Model Compliance Score** | Degree to which AI models meet regulatory and ethical standards | Qualitative | Scored assessment by compliance/legal/IT | Model governance review |

### Category 6.2 — Patient Safety

| KPI | Definition | Type | Calculation | Data Source |
|---|---|---|---|---|
| **Serious Safety Event Rate** | Serious safety events per 1,000 patient days | Quantitative | Events ÷ patient days × 1,000 | Safety reporting |
| **Near-Miss Reporting Rate** | # of near-miss events reported per period | Quantitative | Count of near-miss reports per period | Safety reporting |
| **Medication Error Rate** | Medication errors per 1,000 medication administrations | Quantitative | Errors ÷ administrations × 1,000 | Pharmacy, safety system |
| **High-Risk Patient Identification Rate** | % of high-risk patients flagged by AI and receiving intervention | Quantitative | (Flagged + intervened ÷ total high-risk) × 100 | EHR, AI alert system |
| **Alert Fatigue Rate** | % of AI alerts dismissed without action | Quantitative | (Dismissed alerts ÷ total alerts) × 100 | AI alert log |

### Category 6.3 — Operational Resiliency

| KPI | Definition | Type | Calculation | Data Source |
|---|---|---|---|---|
| **System Uptime / Availability** | % of time AI system is available and performing as expected | Quantitative | (Uptime hours ÷ total hours) × 100 | IT monitoring |
| **Mean Time to Detect (MTTD)** | Average time from issue onset to detection | Quantitative | Mean elapsed time from incident start to detection | IT monitoring |
| **Mean Time to Resolve (MTTR)** | Average time from issue detection to resolution | Quantitative | Mean elapsed time from detection to resolution | IT monitoring |
| **Data Quality Score** | Composite score of data completeness, accuracy, and timeliness | Quantitative | Calculated from data quality dimensions (0–100) | Data governance |
| **Business Continuity Plan (BCP) Test Pass Rate** | % of BCP tests completed successfully | Quantitative | (Passed tests ÷ total tests) × 100 | IT, compliance |

### Category 6.4 — AI Model Performance & Trust

| KPI | Definition | Type | Calculation | Data Source |
|---|---|---|---|---|
| **Model Accuracy / F1 Score** | Statistical performance of the AI model | Quantitative | Standard ML metrics (precision, recall, F1) | Model monitoring |
| **Model Drift Rate** | Degree of degradation in model performance over time | Quantitative | Δ in accuracy/F1 from baseline per period | Model monitoring |
| **Bias Audit Score** | Result of periodic bias audit across demographic groups | Qualitative/Quant | Audit findings rated High/Medium/Low/None | Bias audit process |
| **Explainability Coverage** | % of AI decisions for which a human-readable explanation is available | Quantitative | (Explained decisions ÷ total decisions) × 100 | AI governance log |
| **Human Override Rate** | % of AI recommendations overridden by a human | Quantitative | (Overrides ÷ total AI recommendations) × 100 | AI system log |

---

## KPI Selection Guidance

### Choosing the Right KPIs

**Do:**
- Select KPIs that are directly influenced by the AI initiative
- Choose metrics with an existing data source and baseline
- Include at least one leading indicator (early signal) and one lagging indicator (final outcome)
- Limit primary KPIs to 3 to maintain focus

**Avoid:**
- Metrics you cannot currently measure
- Metrics that move for many reasons unrelated to the initiative
- Vanity metrics (e.g., # of AI queries run) without outcome connection
- Too many KPIs — more than 5–6 total reduces accountability

### KPI Tiers

| Tier | Purpose | Reporting Frequency |
|---|---|---|
| **Tier 1 — Primary** | The 1–2 KPIs the initiative is primarily accountable for | Monthly |
| **Tier 2 — Secondary** | Supporting metrics that indicate health of the initiative | Quarterly |
| **Tier 3 — Monitor** | Background metrics to watch for unintended effects | Quarterly or as needed |

---

*For value framework context, see [Value Framework](value-framework.md). For tracking templates, see [KPI Dashboard Template](../templates/kpi-dashboard-template.md).*
