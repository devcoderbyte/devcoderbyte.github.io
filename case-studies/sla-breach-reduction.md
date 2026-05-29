---
layout: page
title: "Case Study 01 — 20% SLA Breach Reduction"
permalink: /case-studies/sla-breach-reduction/
description: "Case study: How AI-assisted observability and workflow redesign reduced SLA breaches by 20% in 90 days for a high-volume telecom platform."
---

<div style="background:linear-gradient(135deg,rgba(13,148,136,.08) 0%,rgba(37,99,235,.06) 100%);border:1px solid #0d948840;border-radius:12px;padding:1.5rem;margin-bottom:2rem;display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;text-align:center">
  <div><div style="font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;color:#0d9488">-20%</div><div style="font-size:12px;color:#64748b;margin-top:4px">SLA breach reduction</div></div>
  <div><div style="font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;color:#0d9488">90 days</div><div style="font-size:12px;color:#64748b;margin-top:4px">Time to stable outcome</div></div>
  <div><div style="font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;color:#0d9488">9+</div><div style="font-size:12px;color:#64748b;margin-top:4px">CSAT sustained</div></div>
</div>

# Case Study 01 — 20% SLA Breach Reduction

**Domain:** Telecom · SRE · AI-assisted Observability
**Timeline:** 90 days from audit to stable outcome
**Role:** Technical Program Manager — full delivery accountability

---

## The Situation

A high-volume telecom platform was experiencing SLA breaches at an increasing rate. The team was reactive — finding out about issues when clients raised tickets, not before. Splunk was deployed but underutilised: dashboards existed, but nobody was acting on signals before they became incidents.

The client's confidence was eroding. CSAT had dipped. The account was at risk.

---

## The Problem Beneath the Problem

The team wasn't missing data. They were missing **signal from noise.** Splunk was generating hundreds of alerts daily. Alert fatigue had set in — engineers were dismissing notifications without reading them because most were false positives.

The real problem: no one had designed the alerting system with the right thresholds, the right escalation paths, or the right anomaly detection logic. It was all manual and reactive.

---

## The Approach

**Week 1–2: Audit**
- Mapped every SLA breach from the previous quarter: root cause, detection lag, resolution time
- Categorised alerts by true positive rate: most were noise, three categories were signal
- Identified the top five toil tasks the on-call team performed manually every day

**Week 3–4: Redesign**
- Rebuilt Splunk alerting rules around the three signal categories — all others suppressed or routed to low-priority queue
- Implemented Splunk AI anomaly detection on tier-1 metrics — system flags deviations before human threshold breaches
- Documented runbooks for the top five toil tasks — eliminating manual triage for known issue patterns

**Month 2: Automation layer**
- Jira automation for ticket classification and SLA clock management
- AI-assisted triage for incoming P3/P4 tickets — auto-suggested runbook, auto-assigned owner
- Weekly breach review cadence: every breach reviewed for pattern, runbook updated or new automation created

**Month 3: Stabilisation and measurement**
- Monitored breach rate weekly
- Iterated alerting thresholds based on false positive data
- Handed governance to the delivery team with documented process and dashboard ownership

---

## The Outcome

| Metric | Before | After | Change |
|---|---|---|---|
| SLA breach rate | Baseline | -20% | ↓ 20% |
| Alert true positive rate | Low | High | Significantly improved |
| Mean time to detect | Reactive | Proactive | Client-reported → system-detected |
| On-call toil tasks | 5 manual daily | 2 remaining | ↓ 60% |
| CSAT | Dipped | Recovered to 9+ | Sustained 18+ months |

---

## What Made the Difference

The technical changes were necessary but not sufficient. The actual turning point was the **weekly breach review cadence** — making every breach a learning event rather than a blame event. Engineers started treating the alerting system as something they owned and improved, not something that happened to them.
