---
layout: page
title: Dashboard Design Principles
permalink: /sre-observability/dashboard-design/
description: "Five principles for designing Splunk and Grafana dashboards for different audiences in enterprise delivery."
---

# Dashboard Design Principles

Five principles I apply when designing Splunk and Grafana dashboards. The goal: the right information for the right audience with zero interpretation required.

---

## Principle 1 — Audience First, Metrics Second

| Audience | Decision they're making | Design implication |
|---|---|---|
| On-call engineer | Is this a real incident? | Raw metrics, timestamps, log links |
| Delivery lead | Is delivery on track? | RAG status, trend, open items |
| Client executive | Are we getting what we paid for? | SLO compliance, CSAT, milestones |

Three audiences = three dashboards. Never design one dashboard to serve all three.

---

## Principle 2 — Signal Over Noise

Every metric must answer: **"What action does this trigger?"**

If the answer is "none — it's just interesting," remove it.

**Test:** Ask the team "what are the five things you check first every morning?" Those five things should be on the dashboard. Everything else is a drill-down.

---

## Principle 3 — Trend Beats Snapshot

A single number tells you where you are. A trend tells you where you're going.

Every KPI should show current value AND the 28-day trend. A CSAT of 8.9 looks fine. A CSAT of 8.9 that was 9.3 four weeks ago is a signal.

---

## Principle 4 — Anomaly Detection Over Manual Monitoring

If a human is looking at a dashboard to spot problems, the dashboard has failed. The dashboard should spot the problem — the human should only need to act.

Splunk AI anomaly detection rules for every tier-1 metric. Alert before the client notices.

---

## Principle 5 — One Click to Context

Every metric should be one click from the supporting data. Dashboard → drill-down → raw data. Three levels, no more.
