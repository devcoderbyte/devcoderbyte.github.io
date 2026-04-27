---
layout: page
title: Governance Cadence Model
permalink: /delivery-governance/cadence-model/
---

# Governance Cadence Model

The four-layer cadence I run across all enterprise engagements. Each layer has a defined purpose, a fixed time limit, and a specific audience. No layer bleeds into another.

---

## The Core Principle

> If the client has to ask "what's the status?" — governance has already failed.

The goal is proactive visibility, not reactive reporting. Every layer of this cadence is designed to surface information before it becomes a question.

---

## Layer 1 — Daily (Automated, No Meeting)

**What:** Automated Splunk/Jira digest delivered to the delivery team each morning.

**Contains:**
- Overnight anomalies flagged by Splunk AI
- SLA clock status for all open P1/P2 tickets
- Any tickets approaching breach threshold
- Build/deployment status from overnight runs

**Who sees it:** Delivery team only. Not the client.

**Time cost:** Zero — fully automated. Engineers act on exceptions, ignore the rest.

**Why no meeting:** A 15-minute standup to read out ticket counts is pure toil. The digest replaces it. Standups are reserved for decisions, not status.

---

## Layer 2 — Weekly (30 Minutes, Client-Facing)

**What:** Ops sync with the client delivery team.

**Format:**
- RAG status per stream — one line each, no elaboration unless amber/red
- Open risks — named, with mitigation status
- One decision needed from the client — always exactly one
- Actions from last week — closed or carried with reason

**Who attends:** Delivery lead + client ops counterpart. No engineers unless a specific technical decision is needed.

**Hard rule:** 30 minutes maximum. If it runs over, something is wrong with the format — not the attendee list.

**Output:** Action log updated in Confluence within 2 hours of the call.

---

## Layer 3 — Fortnightly (45 Minutes, Executive)

**What:** KPI review with client leadership.

**Format:**
- Executive dashboard shared 24 hours in advance (AI-drafted, human-reviewed)
- SLO compliance trend — 3-month rolling view
- Milestone progress against roadmap
- One strategic topic — risk, roadmap change, or investment decision

**Who attends:** TPM + client programme sponsor. Optional: engineering lead if technical context needed.

**Output:** Decision log. Every exec meeting should produce at least one documented decision or direction.

---

## Layer 4 — Monthly (60 Minutes, Retrospective + Roadmap)

**What:** Full retrospective and roadmap alignment session.

**Format:**
- Delivery retrospective — what worked, what didn't, what changes next month
- Roadmap review — what changed in the business, how priorities adapt
- KPI trend review — are we measuring the right things?
- Forward look — next 30/60/90 day focus

**Who attends:** Full delivery team + client stakeholders.

**Output:** Updated roadmap, updated KPI framework if needed, retrospective action items with owners.

---

## What This Looks Like in Practice

| Cadence | Audience | Format | Time |
|---|---|---|---|
| Daily | Delivery team | Automated digest | 0 min |
| Weekly | Client ops | Structured sync | 30 min |
| Fortnightly | Client leadership | KPI dashboard review | 45 min |
| Monthly | All stakeholders | Retro + roadmap | 60 min |

Total client-facing meeting time per month: **~3.5 hours.**
That's it. Everything else is async, automated, or documented.
