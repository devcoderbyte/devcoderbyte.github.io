---
layout: page
title: CMMI L5 Workflow Design
permalink: /delivery-governance/cmmi-workflow/
description: "CMMI Level 5 ticket workflow design: moving from Jira with no SLA tracking to Zendesk with per-priority SLAs, as part of CMMI L5 audit readiness."
---

# CMMI L5 Ticket Workflow Design

I championed our CMMI Level 5 readiness for L3 ticket workflows across 10+ enterprise applications. Tickets had been in Jira with no SLA tracking. We moved them to Zendesk with SLAs defined per priority, and that became one of our controls for the audit. I led the Zendesk implementation and was its subject-matter expert.

When the auditor sat down with us, I stepped up and walked them through the workflows and approvals myself, using the artefacts we had prepared. The audit went well.

---

## Phase 1 — Process Definition

**Ticket classification taxonomy:** Every incoming ticket mapped to: Incident, Problem, Change, Service Request, Enhancement, or Query.

**Resolution SLA by priority:**

| Priority | Resolution SLA |
|---|---|
| P1 | 2 hours |
| P2 | 4 hours |
| P3 | 24 hours |
| P4 | 48 hours |

SLA clocks enforced by Zendesk's built-in SLA calculations — not manual tracking. Once ticketing moved to Zendesk, these SLAs were being met.

**Custom SLAs per vendor:** Other vendors on the account had their own contractual SLAs. Instead of forcing one standard on everyone, I set up a separate SLA policy in Zendesk for each vendor.

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

**Consolidating repeat tickets:** About 60% of tickets had the same resolution type. We grouped them and handled the responses together, within the resolution SLA, instead of working each one from scratch.

**Scripted data fixes:** Sync issues between systems sometimes left customers seeing the wrong data. We wrote database scripts with placeholders, so engineers could correct the affected records as needed and customers always saw the right data.

**Runbooks you can talk to:** Runbooks started as manual documents. We fed them to Amazon Q, so any engineer, including freshers and new joiners, could learn on their own by asking it questions.

---

## Phase 4 — The Audit

Process documents only go so far. An auditor wants to see that the workflow on paper is the one the team actually runs.

**What the auditor checked:**

- Clear ownership defined for every step
- Problem management workflow
- Knowledge base articles linked to tickets
- Root cause analysis using the 5 Whys
- Risk register
- Business continuity plan for our team during natural calamities
- SLA breach register
- Custom SLAs for each vendor

**I led the walkthrough in the room.** With the auditor sitting in front of me, I took them through how a ticket moves from intake to closure, where each approval happens, who gives it, and how the SLA clock is enforced.

**Questions answered on the spot,** so the auditor understood how the controls worked in practice.

The audit went well.

---

## Outcome

| Metric | Result |
|---|---|
| SLA tracking | None in Jira → per priority in Zendesk |
| CMMI L5 audit | Zendesk SLA set-up used as a control; audit went well |
| Ticket categories with runbooks | 0% → 85% |
| Engineer onboarding time | Reduced — new engineers learn from runbooks through Amazon Q |
