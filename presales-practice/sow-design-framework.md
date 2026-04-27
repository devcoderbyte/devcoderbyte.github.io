---
description: "Seven-section SOW framework for enterprise AMS and SRE engagements. Outcome-first language, explicit exclusions, governance model."
layout: page
title: SOW Design Framework
permalink: /presales-practice/sow-design-framework/
---

# SOW Design Framework

The structure I use for enterprise AMS, SRE, and DevOps engagements. Every section answers "what does the client get?" before "what do we do?"

Client names removed. Framework is production-tested across $2.1M+ in annual engagements.

---

## The Seven-Section Structure

### 1. Executive Summary
**Purpose:** Win the room before they read the rest.

**Principle:** Lead with the client's pain, not our capability. The first paragraph should make the client feel understood — not sold to.

**What to include:**
- One sentence on the client's core challenge
- One sentence on what success looks like for them
- One sentence on why we are uniquely positioned to deliver it

**What to avoid:** Company backgrounds, award histories, generic "we are a global leader" language. That goes in an appendix if at all.

---

### 2. Scope Definition
**Purpose:** Protect both parties.

**Principle:** Explicit exclusions are as important as inclusions. Every scope dispute post-signature comes from something that was assumed rather than stated.

**What to include:**
- In-scope: specific workstreams, applications, environments
- Out-of-scope: explicitly named — not "other items not mentioned above"
- Assumptions: what must be true for the scope to hold
- Dependencies: what the client must provide and when

---

### 3. Delivery Model
**Purpose:** Show how it works operationally.

**Principle:** Clients buy confidence. A well-structured delivery model tells them what Monday morning looks like — who does what, how issues escalate, how communication flows.

**What to include:**
- Team structure (onsite / offshore split if applicable)
- Support tiers (L1 / L2 / L3 or equivalent)
- Tooling and access requirements
- Onboarding timeline

---

### 4. SLA & KPI Framework
**Purpose:** Define what success is measured by.

**Principle:** Client-defined outcomes, not vendor-defined SLAs. Build this section collaboratively with the client where possible — shared ownership of the success metrics prevents disputes later.

**Standard framework:**

| Metric | Target | Measurement method | Review cadence |
|---|---|---|---|
| P1 response time | < 15 minutes | Jira timestamp | Weekly |
| P2 resolution time | < 4 hours | Jira timestamp | Weekly |
| SLA compliance | > 95% | Splunk dashboard | Monthly |
| CSAT | > 8.5 | Client survey | Quarterly |

---

### 5. Governance Model
**Purpose:** Prevent surprises.

**Principle:** Governance is invisible when it's working. The moment a client has to ask "what's the status?" — governance has already failed.

**Standard cadence:**
- Daily: automated status digest (Splunk / Jira) — no meeting
- Weekly: 30-minute ops sync — RAG status, open risks, one decision needed
- Fortnightly: executive dashboard review — KPIs, trend, roadmap
- Monthly: retrospective and roadmap alignment

---

### 6. Commercial Structure
**Purpose:** Make the money conversation clean.

**Principle:** T&M with outcome milestones creates trust and flexibility. Pure fixed-price creates adversarial relationships when scope evolves (and scope always evolves).

**What to include:**
- Rate structure and billing cycle
- Milestone payments if applicable
- Change request process — how out-of-scope is handled, not just that it exists
- Exit clauses — both parties should know how to end the engagement cleanly

---

### 7. Risk Register
**Purpose:** Name risks before the client does.

**Principle:** A named risk with a mitigation plan builds more trust than a proposal that pretends risks don't exist. Clients have seen enough failed programs to know that risk-free proposals are fantasy.

**Format:**

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Delayed client environment access | Medium | High | Dependency logged in scope; milestone timeline resets if triggered |
| Scope expansion post-signature | High | Medium | Change request process defined in Section 6 |
| Key personnel change | Low | High | Knowledge documentation standard from day 1 |
