---
layout: page
title: Dashboard Design Principles
permalink: /sre-observability/dashboard-design/
---

# Dashboard Design Principles

Five principles I apply when designing Splunk and Grafana dashboards across enterprise engagements. The goal is always the same: the right information for the right audience with zero interpretation required.

---

## Principle 1 — Audience First, Metrics Second

Before choosing a single metric, define who will look at this dashboard and what decision they need to make from it.

| Audience | Decision they're making | Design implication |
|---|---|---|
| On-call engineer | Is this a real incident? How urgent? | Raw metrics, timestamps, log links |
| Delivery lead | Is delivery on track? What needs my attention? | RAG status, trend, open items |
| Client executive | Are we getting what we paid for? | SLO compliance, CSAT trend, milestones |

Three audiences = three dashboards. Never design one dashboard to serve all three.

---

## Principle 2 — Signal Over Noise

Every metric on a dashboard must answer: **"What action does this trigger?"**

If the answer is "none — it's just interesting," remove it. Dashboard fatigue is real. When everything is visible, nothing is prioritised.

**Test:** Cover the dashboard and ask the team "what are the five things you check first every morning?" Those five things should be on the dashboard. Everything else is a drill-down.

---

## Principle 3 — Trend Beats Snapshot

A single number tells you where you are. A trend tells you where you're going.

Every KPI should show the current value AND the 28-day trend. A CSAT of 8.9 looks fine. A CSAT of 8.9 that was 9.3 four weeks ago is a signal that needs a conversation.

---

## Principle 4 — Anomaly Detection Over Manual Monitoring

If a human is looking at a dashboard to spot problems, the dashboard has failed. The dashboard should spot the problem and surface it — the human should only need to act.

Splunk AI anomaly detection rules configured for every tier-1 metric. Alert before the client notices. Always.

---

## Principle 5 — One Click to Context

Every metric on the dashboard should be one click from the supporting data. If a delivery lead sees a red SLA metric, they should click through to the specific tickets in breach — not open a separate Jira tab and search.

**Dashboard → drill-down → raw data.** Three levels, no more.

---

## The Three Dashboard Templates I Use

**Operations dashboard:** Uptime, open incidents by severity, SLA clock status, overnight anomalies. Rebuilt in Splunk. Refreshes every 5 minutes.

**Delivery dashboard:** Sprint velocity, ticket burn rate, milestone status, risk register. Built in Jira dashboards. Weekly snapshot.

**Executive dashboard:** SLO compliance trend, CSAT score, portfolio milestone status, financial tracking. AI-drafted summary sent 24 hours before every exec review.
