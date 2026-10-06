---
layout: page
title: CMMI L5 Workflow Design
permalink: /delivery-governance/cmmi-workflow/
description: "CMMI Level 5 ticket workflow design: moving from Jira with no SLA tracking to Zendesk with per-priority SLAs, as part of CMMI L5 audit readiness."
---

# CMMI L5 Ticket Workflow Design

I championed our CMMI Level 5 readiness for L3 ticket workflows across 10+ enterprise applications. Tickets had been in Jira with no SLA tracking. We moved them to Zendesk with SLAs defined per priority, and that became one of our controls for the audit.

When the auditor sat down with us, I stepped up and walked them through the workflows and approvals myself, using the artefacts we had prepared. The audit went well.

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

SLA clocks enforced by Zendesk's built-in SLA calculations — not manual tracking.

---

## Phase 2 — AI-Assisted Triage

- **Auto-classification:** Incoming ticket text analysed, category suggested with confidence score
- **Runbook matching:** Suggested runbook surfaced automatically based on ticket keywords
- **Duplicate detection:** Similar open tickets flagged before engineer starts work
- **Breach prediction:** Ticket flagged when burn rate suggests SLA breach risk

---

## Phase 3 — Continuous Improvement Loop

**Weekly breach review:** Every SLA breach produces one of: runbook update, automation rule, or engineering backlog item.

**Monthly pattern analysis:** Top 3 recurring issues become engineering priority items — not ops workarounds.

---

## Phase 4 — The Audit

Process documents only go so far. An auditor wants to see that the workflow on paper is the one the team actually runs.

- **Artefacts ready before the auditor arrived:** the Zendesk SLA set-up per priority, the workflow definitions, and the approval trail for each step.
- **I led the walkthrough in the room.** With the auditor sitting in front of me, I took them through how a ticket moves from intake to closure, where each approval happens, who gives it, and how the SLA clock and escalations are enforced.
- **Questions answered on the spot,** so the auditor understood how the controls worked in practice.

The audit went well.

---

## Outcome

| Metric | Result |
|---|---|
| SLA tracking | None in Jira → per priority in Zendesk |
| CMMI L5 audit | Zendesk SLA set-up used as a control; audit went well |
| Ticket categories with runbooks | 0% → 85% |
| Engineer onboarding time | Reduced — runbooks replace tribal knowledge |
