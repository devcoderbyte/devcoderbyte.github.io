---
layout: page
title: CMMI L5 Workflow Design
permalink: /delivery-governance/cmmi-workflow/
---

# CMMI L5 Ticket Workflow Design

How I applied CMMI Level 5 principles to redesign L3 ticket workflows across 10+ enterprise applications — reducing SLA breaches by 20% within 90 days.

---

## The Problem

L3 tickets were being handled inconsistently. Same issue type, different resolution paths, different resolution times, different outcomes. No runbooks. No pattern analysis. Every engineer solving the same problems from scratch every time.

CMMI Level 5 is about **optimising** processes — not just defining them. The goal isn't compliance, it's continuous measurable improvement.

---

## Phase 1 — Process Definition

**Ticket classification taxonomy:** Every incoming ticket mapped to one of six categories — Incident, Problem, Change, Service Request, Enhancement, or Query. Category determines SLA clock, triage path, and escalation threshold.

**Triage decision tree:** For each category, a documented decision tree. Engineer reads the tree, not their memory. Reduces variability to near zero for known issue patterns.

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

Once the taxonomy was stable, layered Jira AI on top:

- **Auto-classification:** Incoming ticket text analysed, category suggested with confidence score
- **Runbook matching:** Suggested runbook surfaced automatically based on ticket category and keywords
- **Duplicate detection:** Similar open tickets flagged before engineer starts work
- **Breach prediction:** Ticket flagged when burn rate suggests SLA breach risk — before it happens

Engineers review AI suggestions, don't blindly follow them. Accuracy improved week-over-week as the model learned from corrections.

---

## Phase 3 — Continuous Improvement Loop

**Weekly breach review:** Every SLA breach reviewed — root cause, detection lag, resolution time. Three types of outcome:
1. Runbook updated or created
2. Jira automation rule added
3. Engineering backlog item raised for systemic fix

**Monthly pattern analysis:** Ticket trend data reviewed for recurring themes. Top 3 recurring issues each month become engineering priority items — not just ops workarounds.

**Quarterly process audit:** Full review of classification taxonomy, SLA thresholds, and triage decision trees. Adjusted based on 90 days of data.

---

## Outcome

| Metric | Result |
|---|---|
| SLA breach reduction | 20% within 90 days |
| Ticket categories with runbooks | 0% → 85% |
| Mean time to resolve (P2) | Reduced significantly |
| Repeat issues without systemic fix | Tracked and eliminated quarterly |
| Engineer onboarding time | Reduced — runbooks replace tribal knowledge |
