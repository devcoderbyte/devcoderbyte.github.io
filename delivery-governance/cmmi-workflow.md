---
layout: page
title: CMMI L5 Workflow Design
permalink: /delivery-governance/cmmi-workflow/
description: "CMMI Level 5 ticket workflow design that reduced SLA breaches 20% across 10+ enterprise applications."
---

# CMMI L5 Ticket Workflow Design

How I applied CMMI Level 5 to redesign L3 ticket workflows across 10+ enterprise applications — reducing SLA breaches by 20% within 90 days.

---

## Phase 1 — Process Definition

**Ticket classification taxonomy:** Every incoming ticket mapped to: Incident, Problem, Change, Service Request, Enhancement, or Query.

**SLA by severity:**

| Priority | Response | Resolution | Escalation trigger |
|---|---|---|---|
| P1 | 15 min | 4 hours | At 2 hours |
| P2 | 1 hour | 8 hours | At 6 hours |
| P3 | 4 hours | 24 hours | At 20 hours |
| P4 | 1 day | 5 days | At 4 days |

SLA clocks enforced via Jira automation — not manual tracking.

---

## Phase 2 — AI-Assisted Triage

- **Auto-classification:** Incoming ticket text analysed, category suggested with confidence score
- **Runbook matching:** Suggested runbook surfaced automatically based on ticket keywords
- **Duplicate detection:** Similar open tickets flagged before engineer starts work
- **Breach prediction:** Ticket flagged when burn rate suggests SLA breach risk

---

## Phase 3 — Continuous Improvement Loop

**Weekly breach review:** Every SLA breach produces one of: runbook update, Jira automation rule, or engineering backlog item.

**Monthly pattern analysis:** Top 3 recurring issues become engineering priority items — not ops workarounds.

---

## Outcome

| Metric | Result |
|---|---|
| SLA breach reduction | 20% within 90 days |
| Ticket categories with runbooks | 0% → 85% |
| Engineer onboarding time | Reduced — runbooks replace tribal knowledge |
