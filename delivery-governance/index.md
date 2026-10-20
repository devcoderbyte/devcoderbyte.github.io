---
layout: page
title: Operating Model
permalink: /delivery-governance/
description: "How I take over an account and run delivery: the client's problem list, an action tracker, measurable SLAs, a four-layer review cadence and an escalation format."
---

<p class="lede">How I take over an account and then run it: what I do in the first weeks, the review cadence that keeps a client from ever asking "what's the status?", and how I escalate. [Case Study 01](/case-studies/sla-breach-reduction/) shows it applied to one account.</p>

<nav class="toc" aria-label="On this page"><div class="toc-label">On this page</div>
<ol>
  <li><a href="#takeover">Taking over an account</a></li>
  <li><a href="#cadence">Review cadence</a></li>
  <li><a href="#escalation">Escalation</a></li>
  <li><a href="#team">The team behind it</a></li>
</ol></nav>

## Taking over an account {#takeover}

I've taken over accounts from an incumbent vendor and through a leadership handover. Each time the client is watching closely to see whether things get better or worse. This is the sequence I follow.

---

### 1. Start with the Client's Problem List

Before changing anything, I sit down with the business owner and my client counterpart and build their problem list with them, in their words. Not what we think is wrong, but what is hurting them.

Typical items on that first list: slow response and resolution times, SLAs nobody can measure, and reports that don't show what leadership actually needs to see.

---

### 2. Track Every Action Item

Every problem on the list becomes an action item with an owner and a date, in one tracker the client can see.

The tracker turns "we'll look into it" into something the client can hold us to.

---

### 3. Make Performance Measurable

You can't improve what you can't see, and neither can the client.

- **SLAs tracked automatically.** On one account, tickets were in Jira with no SLA tracking. We moved ticketing to Zendesk, where SLA clocks and breaches are calculated automatically for each priority. ([Case Study 01](/case-studies/sla-breach-reduction/))
- **Response and resolution times brought down,** with targets per priority that both sides agree on.
- **Dashboards for the business metrics that matter to the client.** On an automotive finance account that meant loan volumetrics alongside ticket volumetrics, so delivery and the business looked at the same picture.

---

### 4. Review Bi-weekly First, Then Monthly

Early on, the client is still deciding whether to trust the new process and the people running it. So I start with **bi-weekly performance reviews**: SLA performance, ticket and business volumetrics, and progress on every action item.

Once the numbers are stable and the client is confident, the review moves to a **monthly cadence**.

---

### 5. Shift Left

With the basics measured and reviewed, the work moves from fixing tickets to preventing them.

- **Shift-left activities:** find the most repeated issues and fix them at the source, or hand the fix to the right team with evidence.
- **Automation:** group repeat tickets with the same resolution type, and script routine data fixes so engineers don't repeat manual work.
- **Self-serve knowledge:** runbooks that new engineers can learn from on their own.

---

### Alongside All of This: The Team

- Build a working relationship with each onsite counterpart and client manager, not just one escalation contact.
- Give new engineers a defined ramp-up path.
- Own the documentation and show its progress.

More on how I run the team: [How I lead teams](/delivery-governance/team-leadership/). The same sequence, told as one account: [Case Study 01](/case-studies/sla-breach-reduction/).

## Review cadence {#cadence}

Four layers, each with a defined purpose, a fixed time limit, and a specific audience.

> If the client has to ask "what's the status?" — governance has already failed.

---

### Layer 1 — Daily (Automated, No Meeting)

**What:** Automated Splunk/Jira digest delivered to the delivery team each morning.

**Contains:** Overnight anomalies, SLA clock status for open P1/P2 tickets, tickets approaching breach, build/deployment status.

**Time cost:** Zero — fully automated. **Why no meeting:** A 15-minute standup to read ticket counts is pure toil.

---

### Layer 2 — Weekly (30 Minutes, Client-Facing)

**Format:**
- RAG status per stream — one line each, no elaboration unless amber/red
- Open risks — named, with mitigation status
- One decision needed from the client — always exactly one
- Actions from last week — closed or carried with reason

**Hard rule:** 30 minutes maximum.

---

### Layer 3 — Fortnightly (45 Minutes, Executive)

**Format:**
- Executive dashboard shared 24 hours in advance (AI-drafted, human-reviewed)
- SLO compliance trend — 3-month rolling view
- Milestone progress against roadmap
- One strategic topic

---

### Layer 4 — Monthly (60 Minutes, Retrospective + Roadmap)

**Format:**
- Retrospective — what worked, what didn't, what changes
- Roadmap review — how priorities adapt to business changes
- KPI trend review — are we measuring the right things?
- Forward look — next 30/60/90 day focus

---

### Summary

| Cadence | Audience | Format | Time |
|---|---|---|---|
| Daily | Delivery team | Automated digest | 0 min |
| Weekly | Client ops | Structured sync | 30 min |
| Fortnightly | Client leadership | KPI dashboard | 45 min |
| Monthly | All stakeholders | Retro + roadmap | 60 min |

Total client-facing meeting time per month by design: **about 3.5 hours.**

## Escalation {#escalation}

> Never escalate a problem. Always escalate a situation with a recommended response.

---

### When to Escalate

**Escalate immediately when:**
- A P1 incident is unresolved at the 2-hour mark
- A client stakeholder raises a concern not in the current risk register
- A delivery milestone will be missed and the client doesn't know yet
- A vendor has failed a committed dependency that impacts the client

**Do not escalate when:**
- You have enough information and authority to resolve it yourself
- The issue is on track to resolve within SLA without intervention
- You're escalating to avoid ownership — escalation is not delegation

---

### The One-Page Format

Every escalation follows this structure. No exceptions:

- **Situation:** What happened, when, current status. Two sentences maximum.
- **Impact:** Client impact — SLA, revenue, relationship. Be specific.
- **Root cause:** What caused it. If unknown, say when you'll know.
- **Options:** Two or three response paths with pros and cons.
- **Recommendation:** Which option and why.
- **What I need:** One clear ask.

---

### Escalation Paths

| Scenario | First escalation | If unresolved |
|---|---|---|
| P1 unresolved at 2hrs | Delivery Manager | CTO / VP Engineering at 4hrs |
| Client relationship risk | Account Manager + DM | Executive sponsor at 48hrs |
| Vendor failure | Vendor escalation contact | Legal/commercial if repeated |
| Scope dispute | PMO + Account Manager | Contract review |

---

### Client Escalation Rules

1. **Never surprise** — call before the formal update
2. **Lead with what you're doing**, not what went wrong
3. **Give them one thing** to decide or approve
4. **Follow up in writing** within 2 hours of any verbal escalation
5. **Send a "closed" note** after resolution — clients remember how you close things

## The team behind it {#team}

None of this works without a team that is growing and trusted by the client. How I run that side: [How I lead teams](/delivery-governance/team-leadership/).

> Governance is invisible when it's working. A client who asks "what's the status?" is a client whose trust is eroding.
