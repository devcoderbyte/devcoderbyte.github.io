---
layout: page
title: SLO/SLI Integration Framework
permalink: /sre-observability/slo-sli-framework/
description: "SLO/SLI framework designed as a client trust tool — collaborative definition, error budget model, and monthly review cadence."
---

# SLO/SLI Integration Framework

How I design SLO programs as client trust tools — not DevOps metrics.

---

## The Core Reframe

Most SLO programs are designed inside-out. The reframe: **define SLIs as client-observable outcomes.**

| Inside-out (skip this) | Outside-in (use this) |
|---|---|
| API response time p95 < 200ms | Payment success rate > 99.5% |
| Error rate < 0.1% | Order confirmation delivery < 5 seconds |
| CPU utilisation < 70% | Dashboard load time < 3 seconds |

---

## Phase 1 — Collaborative SLI Definition

Run a joint session with the client. Ask:
1. "What does your customer experience when the platform is working perfectly?"
2. "What's the first thing your team notices when something is wrong?"
3. "What would a 1% degradation cost you in revenue or customer trust?"

---

## Phase 2 — SLO Threshold Setting

| Element | Definition |
|---|---|
| SLO target | Threshold below which we take action (e.g., 99.5% payment success) |
| Measurement window | Rolling 28 days |
| Error budget | 100% − SLO target = allowable failure rate |
| Burn rate | How fast we're consuming the budget |

**Error budget burn rate thresholds:**
- **> 2x burn rate** → Investigate immediately
- **> 5x burn rate** → Incident declared
- **Budget exhausted** → Engineering sprint on reliability, feature work paused

---

## Phase 3 — Monthly SLO Review

1. Did we meet SLO targets? (Data, not narrative)
2. Where did error budget burn faster than expected?
3. Are the SLIs still measuring what matters?
4. What's the engineering priority for next month?

---

## Outcome

- CSAT 9+ sustained for 18+ consecutive months
- Clients cite SLO reviews as highest-value governance touchpoints
- Error budget model shifted engineering priorities toward reliability — with client buy-in
