---
layout: page
title: Defect Containment Model
permalink: /sre-observability/defect-containment/
---

# Defect Containment Model

Three-layer containment approach built on a simple principle: a defect found in production costs 10x more than one found in development. The goal is to stop defects at the earliest possible layer.

---

## Layer 1 — Shift Left (Sprint Planning)

Defect prevention starts before a line of code is written.

**Acceptance criteria review:** Every user story reviewed for testability before sprint begins. If the acceptance criteria can't be verified, the story doesn't enter the sprint.

**Definition of Done:** Enforced, not aspirational. Includes: unit tests written, code reviewed, integration tests passing, documentation updated. No exceptions for "we'll catch it in QA."

**Risk flagging:** Any story touching a high-complexity or high-dependency area flagged in planning. Engineering lead reviews before development starts.

---

## Layer 2 — Automated Gates (CI/CD Pipeline)

Nothing reaches staging without passing automated gates.

**Unit test gate:** Build fails if unit test coverage drops below threshold. Engineers can't bypass — the pipeline enforces it.

**Integration test suite:** Runs on every PR merge to main. Covers all critical user journeys and API contracts. Failures block deployment.

**Static analysis:** Code quality and security scanning on every commit. High-severity findings block merge.

**Performance baseline:** Key API response times checked against baseline on every build. Regression detected before it reaches the client.

---

## Layer 3 — AI-Assisted Pre-Production Detection

The layer that catches what automated tests miss.

**Splunk AI anomaly detection:** Configured on pre-production environment to flag behaviour deviations from production baseline. Catches configuration drift, memory leaks, and latency anomalies before go-live.

**Synthetic monitoring:** Simulated user journeys run against staging every 15 minutes. Any failure triggers immediate investigation before production deployment.

**Release readiness checklist:** Every deployment reviewed against a 12-point checklist — rollback plan, monitoring configured, stakeholders notified, off-peak window confirmed.

---

## Measurement

**Defect escape rate:** Defects found in production as a percentage of total defects found. Target: below 10%. Tracked monthly.

**Defect detection layer:** Where each defect was found — Layer 1, 2, or 3. Trend toward earlier detection = the model is working.

**Mean time to detect:** How long between a defect being introduced and being caught. Shorter is better. AI-assisted monitoring drives this down continuously.

---

## Outcome

Running this model across enterprise engagements: production incidents became rare events rather than weekly occurrences. Client-visible failures dropped significantly. CSAT 9+ sustained for 18+ consecutive months — defect containment is one of the key reasons.
