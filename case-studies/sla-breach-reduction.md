---
description: "Case study: How AI-assisted observability and workflow redesign reduced SLA breaches by 20% in 90 days for a high-volume telecom platform."
layout: page
title: "Case Study 01 — 20% SLA Breach Reduction"
permalink: /case-studies/sla-breach-reduction/
---

<div style="background:linear-gradient(135deg,rgba(13,148,136,.08) 0%,rgba(37,99,235,.06) 100%);border:1px solid var(--border2);border-radius:12px;padding:1.5rem;margin-bottom:2rem;display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;text-align:center">
  <div><div style="font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;color:var(--accent2)">-20%</div><div style="font-size:12px;color:var(--muted);margin-top:4px">SLA breach reduction</div></div>
  <div><div style="font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;color:var(--accent2)">90 days</div><div style="font-size:12px;color:var(--muted);margin-top:4px">Time to stable outcome</div></div>
  <div><div style="font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;color:var(--accent2)">9+</div><div style="font-size:12px;color:var(--muted);margin-top:4px">CSAT sustained</div></div>
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
| Mean time to detect | Reactive | Proactive | Shifted from client-reported to system-detected |
| On-call toil tasks | 5 manual daily | 2 remaining | ↓ 60% |
| CSAT | Dipped | Recovered to 9+ | Sustained 18+ months |

---

## What Made the Difference

The technical changes were necessary but not sufficient. The actual turning point was the **weekly breach review cadence** — making every breach a learning event rather than a blame event. Engineers started treating the alerting system as something they owned and improved, not something that happened to them.

---
layout: page
title: "Case Study 02 — 25% Bid Conversion Lift"
permalink: /case-studies/bid-conversion-lift/
---

<div style="background:linear-gradient(135deg,rgba(13,148,136,.08) 0%,rgba(37,99,235,.06) 100%);border:1px solid var(--border2);border-radius:12px;padding:1.5rem;margin-bottom:2rem;display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;text-align:center">
  <div><div style="font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;color:var(--accent2)">-20%</div><div style="font-size:12px;color:var(--muted);margin-top:4px">SLA breach reduction</div></div>
  <div><div style="font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;color:var(--accent2)">90 days</div><div style="font-size:12px;color:var(--muted);margin-top:4px">Time to stable outcome</div></div>
  <div><div style="font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;color:var(--accent2)">9+</div><div style="font-size:12px;color:var(--muted);margin-top:4px">CSAT sustained</div></div>
</div>

# Case Study 02 — 25% Bid Conversion Lift

**Domain:** Presales · AI workflows · Solution design  
**Timeline:** 12 months  
**Role:** Presales Lead — bid strategy, SOW negotiation, RFQ execution

---

## The Situation

Our global bid conversion rate was inconsistent. Some proposals won comfortably. Others lost to competitors we knew we outperformed on delivery. The gap was in the proposal — not the capability.

Proposals were taking 3 days to draft, were written differently by different authors, and led with our company background rather than the client's problem.

---

## Root Cause Analysis

After reviewing 12 months of won and lost bids, three patterns emerged:

1. **Lost bids led with us.** First paragraphs described our company, our awards, our global presence. Clients had already read five proposals that started the same way.

2. **Won bids led with the client's problem.** The first paragraph made the client feel understood — not sold to.

3. **Lost bids had no hook.** Nothing memorable. The evaluator couldn't summarise why we were different in one sentence.

---

## The Approach

**Framework change:** Introduced the [Bid Strategy Methodology](/presales-practice/bid-strategy-methodology/) — five questions answered before writing begins. This changed the sequence: strategy first, writing second.

**Process change:** Introduced the [AI-Assisted RFQ Workflow](/presales-practice/rfq-workflow/) — LLM for first draft, human for judgment and proof points. Cut drafting time from 3 days to 4–6 hours.

**Review standard:** Every proposal reviewed against a checklist — client-centricity, specificity, risk transparency, hook clarity. No proposal submitted without passing the review.

---

## The Outcome

| Metric | Before | After |
|---|---|---|
| Global bid conversion rate | Baseline | +25% improvement |
| Average RFQ turnaround time | 3 days | 4–6 hours |
| Proposal consistency | Variable | Standardised framework |
| Win narrative clarity | Inconsistent | Hook-first, every proposal |

---

## Key Learning

The AI tooling saved time. The strategy framework won bids. Both were necessary — the speed unlocked capacity for more bids, the framework made each bid better. Neither alone would have moved the number.

---
layout: page
title: "Case Study 03 — DevOps Upskilling Platform"
permalink: /case-studies/devops-upskilling/
---

<div style="background:linear-gradient(135deg,rgba(13,148,136,.08) 0%,rgba(37,99,235,.06) 100%);border:1px solid var(--border2);border-radius:12px;padding:1.5rem;margin-bottom:2rem;display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;text-align:center">
  <div><div style="font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;color:var(--accent2)">-20%</div><div style="font-size:12px;color:var(--muted);margin-top:4px">SLA breach reduction</div></div>
  <div><div style="font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;color:var(--accent2)">90 days</div><div style="font-size:12px;color:var(--muted);margin-top:4px">Time to stable outcome</div></div>
  <div><div style="font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;color:var(--accent2)">9+</div><div style="font-size:12px;color:var(--muted);margin-top:4px">CSAT sustained</div></div>
</div>

# Case Study 03 — DevOps Upskilling Platform

**Domain:** Team capability · DevOps transformation · Leadership  
**Timeline:** One quarter design and delivery, ongoing  
**Role:** Senior Technical Lead — platform design, curriculum, delivery

---

## The Situation

A high-volume API platform needed full DevOps capability across the team. The problem: half the team were AppOps engineers — experienced in monitoring and incident response, but without the CI/CD, pipeline, and automation skills needed for modern DevOps practice.

Options considered: external hiring (expensive, slow), outsource (knowledge stays outside the team), or upskill internally.

---

## The Approach

**Capability gap mapping:** Assessed each engineer against a DevOps competency framework — 12 skills across CI/CD, infrastructure as code, observability, incident response, and automation. Identified specific gaps per person, not a blanket skills deficiency.

**Curriculum design:** Built a modular upskilling platform in Confluence — not a training course, a reference library with hands-on exercises using real platform tools (Splunk, Jenkins, PCF, Kubernetes). Each module had a practical exercise using the team's actual infrastructure.

**Learning in production:** Engineers applied new skills to real tickets and releases under light supervision — not in a sandbox. Learning velocity accelerated significantly when stakes were real.

**Peer teaching:** Engineers who completed a module presented it to the team in a 20-minute session. Teaching accelerated their own mastery and built team confidence in the learning approach.

---

## The Outcome

| Metric | Outcome |
|---|---|
| Engineers converted from AppOps to full DevOps | Full team coverage achieved |
| External hiring required | Zero |
| Training budget required | Zero — built on internal tooling |
| Debugging time reduction | 35% (internal tooling built during upskilling) |
| Platform built during the program | Microservices version tracking tool — now in production |

---

## What Made the Difference

**Learning in production** was the key design decision. Sandbox exercises teach concepts. Real tickets teach judgment. The moment the team started treating the upskilling platform as a reference they reached for during actual work — not a course they completed — the velocity accelerated.

The microservices tracking tool was built as a learning exercise. It shipped to production because it was built on real infrastructure solving a real problem. That outcome wasn't planned — it emerged from designing the learning to be useful, not just educational.
