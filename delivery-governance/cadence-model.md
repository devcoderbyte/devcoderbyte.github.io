---
layout: page
title: Governance Cadence Model
permalink: /delivery-governance/cadence-model/
description: "Four-layer delivery governance cadence — daily through monthly, each with defined purpose, time limit, and audience."
---

# Governance Cadence Model

Four layers, each with a defined purpose, a fixed time limit, and a specific audience.

> If the client has to ask "what's the status?" — governance has already failed.

---

## Layer 1 — Daily (Automated, No Meeting)

**What:** Automated Splunk/Jira digest delivered to the delivery team each morning.

**Contains:** Overnight anomalies, SLA clock status for open P1/P2 tickets, tickets approaching breach, build/deployment status.

**Time cost:** Zero — fully automated. **Why no meeting:** A 15-minute standup to read ticket counts is pure toil.

---

## Layer 2 — Weekly (30 Minutes, Client-Facing)

**Format:**
- RAG status per stream — one line each, no elaboration unless amber/red
- Open risks — named, with mitigation status
- One decision needed from the client — always exactly one
- Actions from last week — closed or carried with reason

**Hard rule:** 30 minutes maximum.

---

## Layer 3 — Fortnightly (45 Minutes, Executive)

**Format:**
- Executive dashboard shared 24 hours in advance (AI-drafted, human-reviewed)
- SLO compliance trend — 3-month rolling view
- Milestone progress against roadmap
- One strategic topic

---

## Layer 4 — Monthly (60 Minutes, Retrospective + Roadmap)

**Format:**
- Retrospective — what worked, what didn't, what changes
- Roadmap review — how priorities adapt to business changes
- KPI trend review — are we measuring the right things?
- Forward look — next 30/60/90 day focus

---

## Summary

| Cadence | Audience | Format | Time |
|---|---|---|---|
| Daily | Delivery team | Automated digest | 0 min |
| Weekly | Client ops | Structured sync | 30 min |
| Fortnightly | Client leadership | KPI dashboard | 45 min |
| Monthly | All stakeholders | Retro + roadmap | 60 min |

Total client-facing meeting time per month: **~3.5 hours.**
