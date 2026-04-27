---
layout: page
title: Toil Elimination Playbook
permalink: /ai-in-delivery/toil-elimination-playbook/
---

# Toil Elimination Playbook

The audit-first methodology I use to systematically identify, prioritise, and eliminate operational toil across delivery teams. Built on SRE principles, extended with AI tooling.

---

## What Counts as Toil

Toil is manual, repetitive work that scales linearly with the size of the service and produces no lasting value. It's not just annoying — it crowds out engineering and delivery work that actually moves things forward.

**Signs you have a toil problem:**
- Engineers doing the same thing every Monday morning
- Status reports assembled by hand from multiple sources
- Tickets that get resolved the same way every time, with no runbook
- Alerts that fire, get acknowledged, and get resolved without any system change

---

## Phase 1 — The Toil Audit (Week 1–2)

Ask every team member to log every manual task they perform for two consecutive sprints. Capture:

| Task | Frequency | Time per occurrence | Could a runbook fix it? | Could automation fix it? |
|---|---|---|---|---|
| Pull weekly Jira report | Weekly | 45 min | Yes | Yes |
| Write exec status update | Weekly | 2 hrs | Partially | Yes (LLM-assisted) |
| Triage incoming P3 tickets | Daily | 30 min | Yes | Yes (Jira AI) |
| Manually check Splunk for anomalies | Daily | 20 min | No | Yes (alerting rules) |

**Output:** A ranked toil register — every task scored by time cost × frequency.

---

## Phase 2 — Prioritisation Matrix

Not all toil is equal. Use this matrix to prioritise:

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

**Automate immediately:** High frequency, low cognitive load. No judgment required. Pure execution. These are your quick wins — script it, bot it, or route it through Jira automation.

**AI-assist first:** High frequency, high cognitive load. Judgment is needed but the structure is predictable. LLMs handle the draft; humans handle the review.

**Document first:** Low frequency, low cognitive load. A runbook eliminates most of the cost. Once documented, revisit for automation.

**Accept / defer:** Low frequency, high cognitive load. Not worth the investment yet.

---

## Phase 3 — Implementation Sequence

### Step 1 — Runbooks for everything in the top-left quadrant
Before automating, document. A runbook converts tribal knowledge into repeatable process. It also reveals whether automation is actually needed or just assumed.

### Step 2 — Jira and alerting automation for top-right quadrant
Ticket auto-classification, SLA breach alerts, assignment rules, escalation triggers. These are low-risk, high-return. Implement in one sprint.

### Step 3 — LLM-assisted workflows for high-cognitive toil
Status reports, RCA write-ups, retro analysis, stakeholder communications. Use the [LLM Workflow Library](/delivery-pulse/ai-in-delivery/llm-workflow-library/) as the starting point.

### Step 4 — Splunk AI for proactive observability
Configure anomaly detection rules that alert before humans notice. Move from reactive monitoring to predictive operations.

---

## Phase 4 — Measurement

Track two metrics every sprint:

**Toil ratio:** Percentage of team hours spent on toil tasks vs. delivery tasks. Target: below 50%. Above 50% triggers a sprint dedicated to toil reduction.

**Automation coverage:** Percentage of top-10 toil tasks that now have either a runbook, an automation, or an AI-assisted workflow. Target: 80% within 90 days.

---

## Results from Production

Running this playbook across T-Mobile SRE and DevOps engagements:

- **35% reduction** in debugging time through internal tooling and automated version tracking
- **20% reduction** in SLA breaches through Splunk AI anomaly detection and automated alerting
- **2+ hours saved weekly** per delivery lead through LLM-assisted status reporting
- Engineers freed from toil shifted to higher-value platform reliability work — productivity improved 18% over two quarters

---

## The Underlying Principle

> If a human is doing the same thing more than twice a week and no judgment is required, a machine should be doing it.

> If judgment is required but the structure is predictable, an LLM should be drafting it and a human should be reviewing it.

Everything else is engineering.
