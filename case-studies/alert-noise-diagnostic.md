---
layout: page
title: "Case Study 06 — 80,000 → 5,000: An Alert Noise Diagnostic"
permalink: /case-studies/alert-noise-diagnostic/
description: "Diagnostic memo: how a middleware operations team on a large telecom account cut Splunk alerts from about 80,000 to 5,000 a month by getting dev-team sign-off on every alert."
---

<div style="background:linear-gradient(135deg,rgba(13,148,136,.08) 0%,rgba(37,99,235,.06) 100%);border:1px solid #0d948840;border-radius:12px;padding:1.5rem;margin-bottom:2rem;display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;text-align:center">
  <div><div style="font-family:var(--font-display);font-size:clamp(1.25rem,5vw,2rem);font-weight:600;color:#0d9488;white-space:nowrap">~80,000</div><div style="font-size:12px;color:#64748b;margin-top:4px">Alerts a month, before</div></div>
  <div><div style="font-family:var(--font-display);font-size:clamp(1.25rem,5vw,2rem);font-weight:600;color:#0d9488;white-space:nowrap">~5,000</div><div style="font-size:12px;color:#64748b;margin-top:4px">Alerts a month, after</div></div>
  <div><div style="font-family:var(--font-display);font-size:clamp(1.25rem,5vw,2rem);font-weight:600;color:#0d9488;white-space:nowrap">~94%</div><div style="font-size:12px;color:#64748b;margin-top:4px">Less alert noise</div></div>
</div>

# Case Study 06 — 80,000 → 5,000: An Alert Noise Diagnostic

**Subject:** Alert noise in middleware operations<br>
**Prepared by:** Rajendra Birudaraju<br>
**Context:** Offshore middleware operations team on a large telecom account
{: .case-meta}

---

## 1. Situation

Our middleware operations team was receiving roughly 80,000 application and infrastructure alerts a month in Splunk. With that much volume, the alerts that mattered were buried in ones that didn't, and the team couldn't tell them apart quickly.

---

## 2. Diagnostic Findings

- **We received the alerts, but didn't own them.** As middleware operations, we were on the receiving end. The checks behind each alert belonged to the development teams who built the services.
- **Nobody could say which alerts were still needed.** For any given alert, the open question was whether its check on a metric, a response time or a 4xx/5xx error rate was still required, or whether a recent release had replaced it with a new one.
- **Only the dev teams could answer that.** Deleting alerts on our own judgment would have risked switching off a check that still mattered.

---

## 3. Root Cause

Not a platform problem, an ownership problem. The people who saw the alerts couldn't retire them, and the people who could retire them didn't see them. With no process connecting the two, alerts kept piling up.

---

## 4. Remediation

- **Every alert went to its owning dev team for sign-off.** One question per alert: is this check still needed, or has a newer release replaced it?
- **We drove the process.** Our team ran the review, pushed the dev teams for quick assessments, and kept it moving.
- **We executed the decisions.** Once a dev team signed off, we removed or kept the alert. What remained were the alerts that mattered at the middleware level.

---

## 5. Outcome

| Area | Before | After |
|---|---|---|
| Alerts received per month | ~80,000 | ~5,000 |
| Alert noise | — | Cut by about 94% |
| Who decided | No clear owner | Owning dev team signed off on every alert |
| Our role | Receiving alerts | Driving the review and executing decisions |

---

## Related Work on the Same Account

On the same account I led the offshore side of moving 200+ microservices from Pivotal Cloud Foundry to Kubernetes. That story is in [Case Study 05](/case-studies/pcf-to-kubernetes-migration/).
