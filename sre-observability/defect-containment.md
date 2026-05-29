---
layout: page
title: Defect Containment Model
permalink: /sre-observability/defect-containment/
description: "Three-layer defect containment — shift-left, automated CI/CD gates, and AI-assisted pre-prod detection."
---

# Defect Containment Model

Three-layer containment built on one principle: a defect found in production costs 10x more than one found in development.

---

## Layer 1 — Shift Left (Sprint Planning)

- **Acceptance criteria review:** Every user story reviewed for testability before sprint begins
- **Definition of Done:** Enforced — unit tests written, code reviewed, integration tests passing
- **Risk flagging:** High-complexity stories flagged in planning for engineering lead review before development starts

---

## Layer 2 — Automated Gates (CI/CD Pipeline)

- **Unit test gate:** Build fails if coverage drops below threshold — no exceptions
- **Integration test suite:** Runs on every PR merge — covers all critical user journeys and API contracts
- **Static analysis:** Code quality and security scanning on every commit
- **Performance baseline:** Key API response times checked against baseline every build

---

## Layer 3 — AI-Assisted Pre-Production Detection

- **Splunk AI anomaly detection:** Flags statistical deviations from production baseline in pre-prod before go-live
- **Synthetic monitoring:** Simulated user journeys run every 15 minutes against staging
- **Release readiness checklist:** 12-point checklist before every deployment — rollback plan, monitoring configured, stakeholders notified

---

## Measurement

| Metric | Target |
|---|---|
| Defect escape rate | Below 10% |
| Detection layer trend | Earlier over time |
| Mean time to detect | Continuously decreasing |

---

## Outcome

Running this model across enterprise engagements: production incidents became rare events. Client-visible failures dropped significantly. CSAT 9+ sustained for 18+ consecutive months.
