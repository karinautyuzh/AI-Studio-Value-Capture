# Scoring Model

> A weighted, multi-dimensional scoring model for prioritizing AI and automation use cases in healthcare.

---

## Overview

The Scoring Model converts qualitative and quantitative assessment across five dimensions into a single composite score (0–100). The score is used by the Governance Committee to compare initiatives and make prioritization decisions.

The model is designed to be:
- **Transparent** — weights and rubrics are published and applied consistently
- **Balanced** — no single dimension dominates; all perspectives are weighted
- **Adjustable** — weights may be calibrated to reflect organizational priorities
- **Defensible** — scoring decisions are documented and traceable

---

## Scoring Dimensions and Weights

| Dimension | Weight | What It Measures |
|---|---|---|
| **1. Strategic Alignment** | 25% | How well the initiative supports organizational strategy and executive priorities |
| **2. Value Potential** | 30% | Expected magnitude and breadth of value across the six value domains |
| **3. Feasibility & Readiness** | 20% | Technical, operational, and organizational readiness to execute |
| **4. Risk** | 15% | Complexity, regulatory exposure, dependency risk, and downside potential |
| **5. Urgency** | 10% | Time sensitivity, competitive pressure, and regulatory/compliance deadlines |

**Total: 100%**

---

## Composite Score Calculation

```
Composite Score = (Strategic Alignment × 0.25) + (Value Potential × 0.30)
               + (Feasibility × 0.20) + (Risk Score × 0.15) + (Urgency × 0.10)
```

Each dimension is scored on a **0–100 scale**, using the rubrics below. Scores from multiple evaluators are averaged before weighting.

---

## Dimension 1: Strategic Alignment (Weight: 25%)

Assesses how directly and strongly the initiative supports the organization's stated strategic priorities.

| Score | Label | Description |
|---|---|---|
| **90–100** | Exemplary | Directly named in a current strategic priority or board-level initiative; aligns with 3+ strategic goals |
| **75–89** | Strong | Clearly supports a stated strategic priority; sponsor is a strategic pillar owner |
| **55–74** | Moderate | Supports organizational direction but not explicitly named in strategy; VP-level alignment |
| **30–54** | Weak | Tangential connection to strategy; primarily a department-level improvement |
| **0–29** | Misaligned | Does not support current organizational strategy; may conflict with strategic direction |

**Guiding Questions:**
- Is this initiative referenced in the current strategic plan?
- Which executive strategic goal does this directly advance?
- Which organizational value or mission commitment does this reinforce?
- Has leadership publicly committed to solving this problem?

---

## Dimension 2: Value Potential (Weight: 30%)

Assesses the expected magnitude, breadth, and durability of value across the six value domains.

### 2a. Value Magnitude

| Score | Label | Description |
|---|---|---|
| **90–100** | Transformational | Tier 1: > $10M annual value or organization-wide quality/experience shift |
| **75–89** | Significant | Tier 2: $2M–$10M annual value or major department-level improvement |
| **55–74** | Moderate | Tier 3: $500K–$2M annual value or measurable team-level improvement |
| **30–54** | Limited | Tier 4: < $500K annual value or enabling capability |
| **0–29** | Minimal | Unclear or negligible expected value |

### 2b. Value Breadth Bonus

Add 5 points per additional value domain impacted (beyond the primary domain), up to a maximum of +15 points, capped at 100.

| Number of Domains Impacted | Breadth Bonus |
|---|---|
| 1 domain | +0 |
| 2 domains | +5 |
| 3 domains | +10 |
| 4+ domains | +15 |

### 2c. Value Confidence Adjustment

| Confidence Level | Adjustment |
|---|---|
| **High** — Benchmarks or prior pilots confirm value estimate | +0 (no adjustment) |
| **Medium** — Logical hypothesis; similar cases exist in market | −5 |
| **Low** — Theoretical; limited comparables | −15 |

**Guiding Questions:**
- What is the estimated annual dollar impact (cost savings + revenue gain)?
- How many patients, staff, or encounters are affected?
- How durable is the value — is it a one-time or recurring benefit?
- What is the evidence base for the value estimate?

---

## Dimension 3: Feasibility & Readiness (Weight: 20%)

Assesses the organization's readiness to execute the initiative successfully.

### 3a. Data Readiness

| Score | Label | Description |
|---|---|---|
| **90–100** | Ready | Required data exists, is accessible, is clean, and has been confirmed by IT |
| **70–89** | Mostly Ready | Data exists but requires some preparation; access is confirmed |
| **50–69** | Partially Ready | Significant data prep or new data capture required; access uncertain |
| **20–49** | Limited | Major data gaps; new data infrastructure likely needed |
| **0–19** | Not Ready | Critical data does not exist or is inaccessible |

### 3b. Technical Feasibility

| Score | Label | Description |
|---|---|---|
| **90–100** | Proven | Technology is mature, vendor is selected, similar implementation is live |
| **70–89** | Established | Technology is commercially available and implemented in comparable organizations |
| **50–69** | Emerging | Technology exists but is less proven in healthcare; limited reference cases |
| **20–49** | Experimental | Technology is early-stage; limited real-world validation |
| **0–19** | Unproven | Technology does not yet exist or is purely theoretical |

### 3c. Operational Readiness

| Score | Label | Description |
|---|---|---|
| **90–100** | Ready | Sponsor is committed, team is identified, resources are available, change plan exists |
| **70–89** | Mostly Ready | Sponsor committed; team and resources need confirmation; change plan in draft |
| **50–69** | Partially Ready | Sponsor is interested; team and resources TBD; change management not planned |
| **20–49** | Developing | Informal support only; significant organizational readiness gaps |
| **0–19** | Not Ready | No sponsor, no team, no identified resources |

**Composite Feasibility Score** = Average of 3a, 3b, and 3c scores.

---

## Dimension 4: Risk (Weight: 15%)

Assesses the downside risk profile of the initiative. **Note: Higher risk = lower score.**

| Score | Label | Description |
|---|---|---|
| **90–100** | Low Risk | Standard deployment; no patient safety exposure; minimal regulatory concern; known implementation pattern |
| **70–89** | Managed Risk | Some complexity; minor regulatory touchpoints; manageable dependencies |
| **50–69** | Moderate Risk | Meaningful complexity; regulatory review required; 1–2 critical dependencies |
| **20–49** | High Risk | High complexity; significant regulatory exposure; multiple critical dependencies or unknown factors |
| **0–19** | Critical Risk | Patient safety involvement; active regulatory scrutiny; unresolved legal concerns; novel territory with no precedent |

**Risk Factors to Evaluate:**
- [ ] Patient safety involvement (direct clinical decision support)
- [ ] Regulatory or compliance exposure (FDA, CMS, state regulations)
- [ ] Data privacy risk (PHI handling, de-identification requirements)
- [ ] Vendor/technology concentration risk
- [ ] Change management complexity
- [ ] Number of critical dependencies
- [ ] AI model explainability requirements (payor, accreditor, or legal)
- [ ] Equity and bias considerations

---

## Dimension 5: Urgency (Weight: 10%)

Assesses the time sensitivity of the initiative and the cost of delay.

| Score | Label | Description |
|---|---|---|
| **90–100** | Immediate | Hard regulatory or contractual deadline within 90 days; patient safety risk requiring immediate action |
| **75–89** | High | Regulatory or competitive deadline within 6 months; risk of significant penalty or lost revenue if delayed |
| **55–74** | Moderate | Benefits increase with earlier action; competitive context warrants timely deployment |
| **30–54** | Low | Initiative is valuable but timing is flexible; no material cost of delay |
| **0–29** | Deferred | Better addressed in a future planning cycle; premature now |

---

## Scoring Summary Table

Use this table to record and calculate the composite score for each use case.

| Dimension | Weight | Raw Score (0–100) | Weighted Score |
|---|---|---|---|
| Strategic Alignment | 25% | _____ | _____ × 0.25 = _____ |
| Value Potential | 30% | _____ | _____ × 0.30 = _____ |
| Feasibility & Readiness | 20% | _____ | _____ × 0.20 = _____ |
| Risk | 15% | _____ | _____ × 0.15 = _____ |
| Urgency | 10% | _____ | _____ × 0.10 = _____ |
| **COMPOSITE SCORE** | **100%** | | **= _____** |

---

## Prioritization Tiers

| Tier | Score Range | Recommended Decision |
|---|---|---|
| **Tier 1 — Approve: Priority** | 75–100 | Proceed to initiation immediately; assign resources |
| **Tier 2 — Approve: Pipeline** | 55–74 | Queue for next available capacity; hold in prioritized backlog |
| **Tier 3 — Defer** | 40–54 | Revisit in 90 days; return to sponsor with conditions for advancement |
| **Tier 4 — Decline** | < 40 | Not recommended at this time; notify sponsor with rationale |

### Automatic Disqualifiers

Regardless of composite score, a use case should not be approved if any of the following are true:

- [ ] Active legal hold or litigation related to this area
- [ ] Unresolved patient safety risk identified by clinical review
- [ ] Regulatory prohibition or pending agency guidance that would block deployment
- [ ] No identified executive sponsor willing to commit
- [ ] Duplicate of an initiative already in flight

---

## Weight Customization Guidance

Organizations may adjust dimension weights to reflect their current strategic context. Guidelines:

- No single dimension should exceed **40% weight**
- No single dimension should be weighted below **5%**
- Weights must sum to **100%**
- Weight changes should be reviewed and approved by the Governance Committee annually

**Example Customizations:**

| Context | Suggested Weight Shift |
|---|---|
| Margin recovery program underway | Increase Value Potential weight to 35%; reduce Urgency to 5% |
| Regulatory audit or accreditation cycle | Increase Risk weight to 25%; reduce Strategic Alignment to 15% |
| Competitive differentiation priority | Increase Strategic Alignment to 35%; reduce Feasibility to 15% |
| Workforce crisis / high turnover | Increase Value Potential for Workforce domain; apply 1.25× multiplier to workforce KPIs |

---

## Evaluator Calibration

To ensure consistent scoring across evaluators:

1. **Anchor scoring sessions** — begin each evaluation cycle with one calibration case scored together as a committee
2. **Independent scoring** — evaluators score independently before discussing
3. **Convergence check** — flag any dimension where scores differ by > 20 points for discussion
4. **Majority rule** — final score is the mean of all evaluator scores; outliers may be excluded with documentation
5. **Annual recalibration** — re-anchor scoring rubrics once per year using completed case examples

---

*For the scoring worksheet, see [Prioritization Scorecard Template](../templates/prioritization-scorecard-template.md). For governance and decision authority, see [Governance](governance.md).*
