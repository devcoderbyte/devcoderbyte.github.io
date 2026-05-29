---
layout: page
title: Toil Elimination Playbook
permalink: /ai-in-delivery/toil-elimination-playbook/
description: "Audit-first methodology for identifying and eliminating operational toil in enterprise delivery teams."
---

# Toil Elimination Playbook

The audit-first methodology I use to systematically identify, prioritise, and eliminate operational toil across delivery teams.

---

## What Counts as Toil

Toil is manual, repetitive work that scales linearly with the size of the service and produces no lasting value.

**Signs you have a toil problem:**
- Engineers doing the same thing every Monday morning
- Status reports assembled by hand from multiple sources
- Tickets that get resolved the same way every time, with no runbook
- Alerts that fire, get acknowledged, get resolved — without any system change

---

## Phase 1 — The Toil Audit (Week 1–2)

Log every manual task for two consecutive sprints:

| Task | Frequency | Time per occurrence | Runbook fix? | Automation fix? |
|---|---|---|---|---|
| Pull weekly Jira report | Weekly | 45 min | Yes | Yes |
| Write exec status update | Weekly | 2 hrs | Partially | Yes (LLM) |
| Triage incoming P3 tickets | Daily | 30 min | Yes | Yes (Jira AI) |

---

## Phase 2 — Prioritisation Matrix

```
                HIGH FREQUENCY
                      |
    [Document first]  |  [Automate immediately]
                      |
LOW COGNITIVE --------+-------- HIGH COGNITIVE
LOAD                  |                    LOAD
                      |
    [Accept / defer]  |  [AI-assist first]
                      |
                LOW FREQUENCY
```

---

## Phase 3 — Implementation Sequence

1. **Runbooks** for high-frequency, low-cognitive toil — convert tribal knowledge to documented process
2. **Jira and alerting automation** for repetitive routing and classification
3. **LLM-assisted workflows** for high-cognitive, predictably structured tasks
4. **Splunk AI** for proactive observability — alert before humans notice

---

## Results from Production

- **35% reduction** in debugging time through internal tooling
- **20% reduction** in SLA breaches through Splunk AI anomaly detection
- **2+ hours saved weekly** per delivery lead through LLM-assisted reporting
- **18% productivity improvement** over two quarters

---

> If a human is doing the same thing more than twice a week and no judgment is required, a machine should be doing it. If judgment is required but the structure is predictable, an LLM should be drafting it and a human reviewing it.
