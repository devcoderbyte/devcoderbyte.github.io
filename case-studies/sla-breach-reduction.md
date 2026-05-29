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

The client's confidence was eroding. CSAT had dipped from a consistent 9+ to below 8.5. The account was genuinely at risk.

---

## What I Tried First — and Why It Didn't Work

My instinct was to add more alerting rules. More coverage, more signals. I spent the first week doing exactly that — and it made things worse. Alert volume went up, true positive rate stayed flat, and the team started ignoring notifications even faster.

That was the diagnostic I needed. **The problem wasn't insufficient alerting — it was that nobody trusted the alerts.** Alert fatigue had made the entire system invisible. Adding more rules to a system nobody believed in was the wrong lever entirely.

---

## The Actual Problem

Splunk was generating hundreds of alerts daily. Only three categories were consistently actionable — the rest were noise. But nobody had ever done the categorisation work, so engineers treated every alert with the same low-urgency response.

The root cause: no one had designed the alerting system with the right thresholds, the right escalation paths, or the right anomaly detection logic. It had grown organically over two years with no intentional design behind it.

---

## The Approach

**The judgment call that mattered most:** Rather than trying to fix all the alerts, I made the decision to suppress everything except the three proven signal categories — cold turkey. The team pushed back hard. "What if we miss something?" was the objection.

My answer: "We're already missing everything. A team that ignores all alerts misses 100% of real incidents. A team that trusts three categories will catch 80% of them." We agreed to a two-week trial. The trial became permanent.

**Week 1–2: Audit**
- Mapped every SLA breach from the previous quarter: root cause, detection lag, resolution time
- Categorised all 200+ alert types by 90-day true positive rate
- Found three categories with >70% true positive rate — everything else was below 20%

**Week 3–4: Redesign**
- Rebuilt Splunk alerting around the three signal categories — all others suppressed or routed to a low-priority digest reviewed weekly, not in real time
- Implemented Splunk AI anomaly detection on tier-1 metrics — system flags statistical deviations before they cross human-defined thresholds
- Documented runbooks for the top five toil tasks the on-call team performed manually every day

**Month 2: Automation layer**
- Jira automation for ticket classification and SLA clock management — no more manual start/stop
- AI-assisted triage for incoming P3/P4 tickets — auto-suggested runbook, auto-assigned owner based on category
- Weekly breach review cadence: every breach reviewed for pattern, runbook updated or Jira automation added

**Month 3: Stabilisation and measurement**
- Monitored breach rate weekly, iterated thresholds based on false positive data
- Handed governance to the delivery team with documented process and clear dashboard ownership
- Three engineers had become genuine owners of the alerting system — a cultural shift that mattered as much as the tooling

---

## The Outcome

| Metric | Before | After | Change |
|---|---|---|---|
| SLA breach rate | Baseline | -20% | ↓ 20% |
| Alert true positive rate | ~15% average | ~72% average | ↑ significantly |
| Mean time to detect | Reactive (client-reported) | Proactive (system-detected) | Structural shift |
| On-call toil tasks | 5 manual daily | 2 remaining | ↓ 60% |
| CSAT | Below 8.5 | Recovered to 9+ | Sustained 18+ months |

---

## What Made the Difference

The technical changes were necessary but not sufficient. The actual turning point was the **weekly breach review cadence** — making every breach a learning event rather than a blame event.

Before the cadence, a breach happened and everyone moved on. After it, every breach produced either a new runbook, a new automation rule, or an engineering backlog item. The system got smarter every week because we built the process that made it get smarter.

Engineers started treating the alerting system as something they owned and improved — not something that happened to them. That ownership shift was worth more than any individual technical fix.

---

## What I'd Do Differently

Start the alert suppression decision in week one, not week three. I lost two weeks trying to add signal to a system that needed subtraction. The counter-intuitive move — reducing alert coverage to increase alert trust — was available from day one. I needed the evidence of my failed first attempt to convince myself (and the team) to do it.
