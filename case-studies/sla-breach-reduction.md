---
layout: page
title: "Case Study 01 — Taking Over an Account: SLAs, Alerts and CSAT 8.5 → 10"
permalink: /case-studies/sla-breach-reduction/
description: "Case study: Taking over application support from an incumbent vendor on an automotive finance platform. Making SLAs measurable in Zendesk, raising alert accuracy from 15% to 75%, and lifting CSAT from 8.5 to 10."
---

<div style="background:linear-gradient(135deg,rgba(13,148,136,.08) 0%,rgba(37,99,235,.06) 100%);border:1px solid #0d948840;border-radius:12px;padding:1.5rem;margin-bottom:2rem;display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;text-align:center">
  <div><div style="font-family:var(--font-display);font-size:clamp(1.25rem,5vw,2rem);font-weight:600;color:#0d9488;white-space:nowrap">15→75%</div><div style="font-size:12px;color:#64748b;margin-top:4px">Alert accuracy</div></div>
  <div><div style="font-family:var(--font-display);font-size:clamp(1.25rem,5vw,2rem);font-weight:600;color:#0d9488;white-space:nowrap">8.5→10</div><div style="font-size:12px;color:#64748b;margin-top:4px">Client CSAT</div></div>
  <div><div style="font-family:var(--font-display);font-size:clamp(1.25rem,5vw,2rem);font-weight:600;color:#0d9488;white-space:nowrap">CMMI L3</div><div style="font-size:12px;color:#64748b;margin-top:4px">SLA tracking used as an audit control</div></div>
</div>

# Case Study 01 — Taking Over an Account: SLAs, Alerts and CSAT 8.5 → 10

**Domain:** Automotive finance · Application support · SRE<br>
**Context:** Took over support from the incumbent vendor in September 2023, starting with a 10-person team. The account reached $2.1M a year by September 2024 and is $3M+ today<br>
**Role:** Offshore owner; counterpart to the onsite delivery directors
{: .case-meta}

---

## The Situation

We took over application support for a large automotive finance platform from the incumbent vendor. Two things were missing.

**SLAs couldn't be measured.** Tickets lived in Jira with no SLA tracking. Nobody could say how many tickets had breached, at which priority, or why.

**Alerts weren't trusted.** Only about 15% of alerts pointed to a real problem, so the team had learned to treat them as noise.

Client CSAT was 8.5.

---

## Making SLAs Measurable

We moved support from Jira to Zendesk and used its built-in SLA calculations. I led the Zendesk implementation. For each priority we defined the SLA formula, the target, and what counts as a breach: resolution within 2 hours for P1, 4 hours for P2, 24 hours for P3 and 48 hours for P4. Other vendors on the account had their own contractual SLAs, so each got its own SLA policy in Zendesk. Once ticketing moved over, SLAs were being met.

That gave the client and us the same numbers to look at, every week, per priority. It also became one of our controls for the CMMI Level 3 audit, and the audit went well ([how the audit ran](#cmmi-audit)).

---

## Making Alerts Trustworthy

We brought in Temperstack as a service offering. We gave it read-only access to the client's AWS accounts. It scanned every service, proposed the alerts each one needed, and generated runbooks for fixing them using AI.

**Pilot first, on the most visible platform.** We started with the Smart Finance platform, the highest-visibility application on the account. Once it worked there, we rolled it out to the in-house common API and API management teams. Each new batch started from what the pilot had already proven, which made the next rollout easier.

---

## The CMMI Level 3 Audit {#cmmi-audit}

I championed our CMMI Level 3 readiness for the third-line (L3) support ticket workflows across 10+ enterprise applications, and I was the subject-matter expert for the Zendesk set-up that became one of the audit's controls.

### Process definition

**Ticket classification taxonomy:** Every incoming ticket mapped to: Incident, Problem, Change, Service Request, Enhancement, or Query.

**Custom SLAs per vendor:** Other vendors on the account had their own contractual SLAs. Instead of forcing one standard on everyone, I set up a separate SLA policy in Zendesk for each vendor.

### AI-assisted triage

- **Auto-classification:** Incoming ticket text analysed, category suggested with confidence score
- **Runbook matching:** Suggested runbook surfaced automatically based on ticket keywords
- **Duplicate detection:** Similar open tickets flagged before engineer starts work
- **Breach prediction:** Ticket flagged when burn rate suggests SLA breach risk

### Continuous improvement loop

**Weekly breach review:** Every SLA breach produces one of: runbook update, automation rule, or engineering backlog item.

**Monthly pattern analysis:** Top 3 recurring issues become engineering priority items — not ops workarounds.

**Consolidating repeat tickets:** About 60% of tickets had the same resolution type. We grouped them and handled the responses together, within the resolution SLA, instead of working each one from scratch.

**Scripted data fixes:** Sync issues between systems sometimes left customers seeing the wrong data. We wrote database scripts with placeholders, so engineers could correct the affected records as needed and customers always saw the right data.

**Runbooks you can talk to:** Runbooks started as manual documents. We fed them to Amazon Q, so any engineer, including freshers and new joiners, could learn on their own by asking it questions.

### In the room

Process documents only go so far. An auditor wants to see that the workflow on paper is the one the team actually runs.

**What the auditor checked:**

- Clear ownership defined for every step
- Problem management workflow
- Knowledge base articles linked to tickets
- Root cause analysis using the 5 Whys
- Risk register
- Business continuity plan for our team during natural calamities
- SLA breach register
- Custom SLAs for each vendor

**I led the walkthrough in the room.** With the auditor sitting in front of me, I took them through how a ticket moves from intake to closure, where each approval happens, who gives it, and how the SLA clock is enforced.

**Questions answered on the spot,** so the auditor understood how the controls worked in practice.

The audit went well.

Afterwards, a senior manager on the client side wrote a note of appreciation for the leadership shown through the whole initiative. (Available on request; not reproduced because it is the client's internal correspondence.)

---

## The Outcome

| Area | Before | After |
|---|---|---|
| SLA tracking | None (Jira) | Per priority, built into Zendesk |
| Alert accuracy | ~15% | ~75% |
| Runbooks | — | AI-generated runbook for each alert |
| CMMI Level 3 audit | — | Zendesk SLA set-up used as a control; audit went well |
| Ticket categories with runbooks | 0% | 85% |
| Engineer onboarding | — | Faster: new engineers learn from runbooks through Amazon Q |
| Client CSAT | 8.5 | 9, then 10 |
