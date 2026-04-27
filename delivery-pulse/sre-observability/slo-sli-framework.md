---
layout: page
title: SLO/SLI Integration Framework
permalink: /sre-observability/slo-sli-framework/
---

# SLO/SLI Integration Framework

How I design SLO programs as client trust tools — not internal DevOps metrics. Every element of this framework is oriented toward what the client can observe, not what the engineering team monitors.

---

## The Core Reframe

Most SLO programs are designed inside-out: engineering picks metrics that are technically meaningful, sets targets, and reports them.

The problem: clients don't care about p95 API latency. They care about whether their customers can complete a payment.

The reframe: **define SLIs as client-observable outcomes.**

| Inside-out (skip this) | Outside-in (use this) |
|---|---|
| API response time p95 < 200ms | Payment success rate > 99.5% |
| Error rate < 0.1% | Order confirmation delivery < 5 seconds |
| CPU utilisation < 70% | Dashboard load time < 3 seconds |

---

## Phase 1 — Collaborative SLI Definition

Run a joint session with the client to define SLIs. Ask:

1. "What does your customer experience when the platform is working perfectly?"
2. "What's the first thing your team notices when something is wrong?"
3. "What would a 1% degradation in [outcome] cost you in revenue or customer trust?"

Output: 3–5 SLIs, all expressed in language the client uses naturally. Sign off in the SOW — this makes SLOs a shared accountability framework, not a vendor self-assessment.

---

## Phase 2 — SLO Threshold Setting

For each SLI, define:

| Element | Definition |
|---|---|
| SLO target | The threshold below which we take action (e.g., 99.5% payment success) |
| Measurement window | Rolling 28 days — avoids gaming around calendar boundaries |
| Error budget | 100% − SLO target = allowable failure rate |
| Error budget burn rate | How fast we're consuming the budget — triggers action thresholds |

**Error budget burn rate thresholds:**

- **> 2x burn rate** → Page on-call, investigate immediately
- **> 5x burn rate** → Incident declared, all hands
- **Budget exhausted** → Engineering sprint dedicated to reliability, feature work paused

---

## Phase 3 — Dashboard Integration

Error budget tracking goes into the weekly ops dashboard and the monthly executive dashboard. Two different views:

**Ops view:** Current burn rate, remaining budget, active alerts. For the delivery team.

**Executive view:** SLO compliance percentage, trend over 3 months, error budget status (green/amber/red). For the client's leadership.

---

## Phase 4 — Monthly SLO Review

Every month, review with the client:

1. Did we meet SLO targets? (Data, not narrative)
2. Where did error budget burn faster than expected? (Root cause, not excuse)
3. Are the SLIs still measuring what matters? (Outcomes evolve — SLIs should too)
4. What's the engineering priority for next month to protect the budget?

---

## Outcome

Running this framework across enterprise engagements:

- CSAT 9+ sustained for 18+ consecutive months
- Clients cite SLO reviews as one of the highest-value governance touchpoints
- Error budget model shifted engineering priorities from feature velocity to reliability investment — with client buy-in, not resistance
---
layout: page
title: Dashboard Design Principles
permalink: /sre-observability/dashboard-design/
---

# Dashboard Design Principles

Five principles I apply when designing Splunk and Grafana dashboards across enterprise engagements. The goal is always the same: the right information for the right audience with zero interpretation required.

---

## Principle 1 — Audience First, Metrics Second

Before choosing a single metric, define who will look at this dashboard and what decision they need to make from it.

| Audience | Decision they're making | Dashboard design implication |
|---|---|---|
| On-call engineer | Is this a real incident? How urgent? | Raw metrics, timestamps, log links |
| Delivery lead | Is delivery on track? What needs my attention? | RAG status, trend, open items |
| Client executive | Are we getting what we paid for? | SLO compliance, CSAT trend, milestone status |

Three different audiences = three different dashboards. Never design one dashboard to serve all three.

---

## Principle 2 — Signal Over Noise

Every metric on a dashboard must answer: "What action does this trigger?"

If the answer is "none — it's just interesting," remove it. Dashboard fatigue is real. When everything is visible, nothing is prioritised.

**Test:** Cover the dashboard and ask the team "what are the five things you check first every morning?" Those five things should be on the dashboard. Everything else is a drill-down.

---

## Principle 3 — Trend Beats Snapshot

A single number tells you where you are. A trend tells you where you're going.

Every KPI should show the current value AND the 28-day trend. A CSAT of 8.9 looks fine. A CSAT of 8.9 that was 9.3 four weeks ago is a signal.

---

## Principle 4 — Anomaly Detection Over Manual Monitoring

If a human is looking at a dashboard to spot problems, the dashboard has failed. The dashboard should spot the problem and surface it — the human should only need to act.

Splunk AI anomaly detection rules for every tier-1 metric. Alert before the client notices. Always.

---

## Principle 5 — One Click to Context

Every metric on the dashboard should be one click from the supporting data. If a delivery lead sees a red SLA metric, they should be able to click through to the specific tickets in breach — not open a separate Jira tab and search.

Dashboard → drill-down → raw data. Three levels, no more.
