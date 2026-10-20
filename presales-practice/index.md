---
layout: page
title: Presales & Growth
permalink: /presales-practice/
description: "How I win and shape work: a five-question bid gate, an AI-assisted RFQ workflow, an outcome-first SOW structure, and the case behind a 25% bid conversion lift."
---

<p class="lede">How delivery turns into the next piece of work: a five-question gate before any bid is written, an AI-assisted RFQ workflow, and an SOW structure that prevents scope creep. The worked example at the end is the case behind a 25% lift in bid conversion.</p>

<nav class="toc" aria-label="On this page"><div class="toc-label">On this page</div>
<ol>
  <li><a href="#bid-strategy">Bid strategy: five questions first</a></li>
  <li><a href="#rfq">AI-assisted RFQ workflow</a></li>
  <li><a href="#sow">SOW design</a></li>
  <li><a href="#bid-conversion">Worked example: 25% bid conversion lift</a></li>
</ol></nav>

## Bid strategy: five questions first {#bid-strategy}

Five questions I answer before writing a single word. This framework drove a 25% improvement in conversion rate across global proposals over 12 months.

---

### Why Most Bids Lose Before They're Read

Most RFQ responses lead with the vendor. Company overview. Awards. Global presence.

The client doesn't care. They have a problem. They want to know if you understand it and whether you can fix it. **The bids that win lead with the client.**

---

### The Five Questions

#### 1. What is the client's real problem?
Not what's in the RFQ. The RFQ describes symptoms. The real problem is what's keeping the client's leadership up at night.

**Output:** One sentence. "The client's real problem is ___."

#### 2. What does winning look like for them?
Define their success metric before defining our solution.

**Output:** "They will know this worked when ___."

#### 3. Where are we uniquely credible?
Lead with domain proof, not capability lists. Two proof points maximum. Specific, relevant, quantified.

#### 4. What are the top 3 risks — and our answers?
Name risks before the client does. **Format:** Risk → Likelihood → Our mitigation → Why this works.

#### 5. What's the one thing they'll remember?
Every winning bid has a single memorable hook. It appears in the executive summary and echoes at the close.

**Output:** One sentence. If you can't say it in one sentence, it's not a hook — it's a feature list.

---

### The Sequence

1. Answer all five questions **before** opening a document
2. Write the executive summary **first** — hook, problem, win condition
3. Build the rest of the proposal to support the executive summary
4. Review: does every section answer "so what?" from the client's perspective?
5. Final check: read only the first and last paragraph — does the story hold?

## AI-assisted RFQ workflow {#rfq}

End-to-end workflow from RFQ receipt to submission-ready draft. Elapsed time went from days to hours.

---

### The Six Stages

| Stage | Action | LLM role | Time |
|---|---|---|---|
| 1. Intake | Read RFQ, tag all requirements | Extract and categorise requirements, flag ambiguities | 30 min |
| 2. Discovery | Map to delivery capability | Gap analysis between RFQ requirements and our strengths | 45 min |
| 3. Drafting | Write executive summary + scope | First draft from structured prompt | 60 min |
| 4. Pricing | Build cost model | Sense-check assumptions, flag scope risks | 60 min |
| 5. Review | Internal review pass | Tone, clarity, and risk language refinement | 45 min |
| 6. Submission | Final format and submit | Proofread, executive summary tightening | 30 min |

---

### Stage 3 Prompt

```
You are a senior presales consultant. Given:
- Client domain: [vertical]
- Core pain (from discovery): [verbatim notes]
- Their success metric: [defined in strategy session]
- Our strongest proof point: [specific, quantified]
- Top risk we are addressing: [named risk + mitigation]

Draft a 350-word executive summary.
Structure: Pain → Understanding → Solution → Proof → Confidence.
First paragraph must be about the client's problem, not our company.
Flag any claim needing supporting data as [VERIFY].
```

---

### What I Still Do Manually

- Pricing decisions and commercial structure
- Client-specific proof point selection
- Final risk register review
- Executive summary sign-off before submission

**The rule:** anything requiring knowledge of the client relationship, competitive context, or commercial constraints stays with me. Everything structural and linguistic — the LLM drafts first.

## SOW design {#sow}

The structure I use for enterprise AMS, SRE, and DevOps engagements. Every section answers "what does the client get?" before "what do we do?"

---

### 1. Executive Summary
Lead with the client's pain, not our capability. The first paragraph should make the client feel understood — not sold to.

**Include:** Client's core challenge → what success looks like → why we're uniquely positioned.
**Avoid:** Company backgrounds, award histories, generic "global leader" language.

---

### 2. Scope Definition
Explicit exclusions are as important as inclusions. Every scope dispute post-signature comes from something assumed rather than stated.

**Include:** In-scope workstreams, out-of-scope items (explicitly named), assumptions, client dependencies.

---

### 3. Delivery Model
Clients buy confidence. Show what Monday morning looks like — who does what, how issues escalate, how communication flows.

**Include:** Team structure, support tiers, tooling requirements, onboarding timeline.

---

### 4. SLA & KPI Framework

*Illustrative template values. Each engagement sets its own targets; the actual targets on the account in [Case Study 01](/case-studies/sla-breach-reduction/) were P1 2h, P2 4h, P3 24h, P4 48h resolution.*

| Metric | Target | Measurement | Review |
|---|---|---|---|
| P1 response | < 15 minutes | Jira timestamp | Weekly |
| P2 resolution | < 4 hours | Jira timestamp | Weekly |
| SLA compliance | > 95% | Splunk dashboard | Monthly |
| CSAT | > 8.5 | Client survey | Quarterly |

**Principle:** Client-defined outcomes, not vendor-defined SLAs.

---

### 5. Governance Model
- **Daily:** Automated digest — no meeting
- **Weekly:** 30-minute ops sync — RAG status, risks, one decision needed
- **Fortnightly:** Executive dashboard review
- **Monthly:** Retrospective and roadmap alignment

---

### 6. Commercial Structure
T&M with outcome milestones creates trust and flexibility. Fixed-price creates adversarial relationships when scope evolves — and scope always evolves.

**Include:** Rate structure, milestone payments, change request process, exit clauses.

---

### 7. Risk Register
Name risks before the client does. A named risk with a mitigation plan builds more trust than a proposal that pretends risks don't exist.

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Delayed client environment access | Medium | High | Dependency in scope; milestone resets if triggered |
| Scope expansion post-signature | High | Medium | Change request process defined in Section 6 |
| Key personnel change | Low | High | Knowledge documentation from day 1 |

## Worked example: 25% bid conversion lift {#bid-conversion}

This was Case Study 02.

**Domain:** Presales · AI workflows · Solution design<br>
**Timeline:** 12 months<br>
**Role:** Presales Lead — bid strategy, SOW negotiation, RFQ execution
{: .case-meta}

---

### The Situation

Our global bid conversion rate was inconsistent — some proposals won comfortably, others lost to competitors we knew we outperformed on actual delivery. The gap was in the proposal, not the capability.

I asked for 30 minutes with five recently lost bids and five recently won ones. That 30-minute read changed how I approached every proposal we submitted after it.

---

### What the Lost Bids Had in Common

Every lost bid started the same way. Company overview. Year founded. Number of employees. Global offices. Awards.

I timed it once — the average lost bid didn't mention the client's actual business problem until paragraph four. By then, the evaluator had already mentally moved on.

The won bids were structurally different. The first sentence of every winning proposal was about the client. Their pain, their context, their language. Our company background, if it appeared at all, was in an appendix.

That was the insight. Not a methodology. Not a framework. Just: **we were writing about ourselves when we should have been writing about them.**

---

### What I Tried That Didn't Work

My first attempt was a writing guide. Two pages of principles — "lead with the client", "avoid jargon", "use outcome-first language." I sent it to the team before the next RFQ.

The next RFQ came back almost identical to what we'd submitted before. Nobody followed the guide under deadline pressure. A document you read once and then forget is not a process.

**The judgment call:** Stop trying to improve the writing. Change the sequence. Make it structurally impossible to start writing before answering five specific questions about the client. The questions became the process — not guidance to apply, but gates to pass.

---

### The Approach

**Framework change:** Five questions, mandatory, answered before any document is opened:
1. What is the client's real problem — not the one in the RFQ, the one behind it?
2. What does winning look like for them in 12 months?
3. Where are we uniquely credible — two proof points maximum, specific and quantified?
4. What are the top three risks — and what's our answer to each?
5. What's the one thing they'll remember — the hook that appears first and echoes last?

No proposal entered drafting without all five answered and reviewed.

**Process change:** LLM-assisted drafting using the five-question output as the prompt context. First draft in under an hour, one structured review pass, submit. This cut the iteration cycle from days to hours — which freed capacity to submit more bids and spend more time on the ones that mattered.

**Review standard:** Every proposal reviewed against a four-point checklist before submission: client-centricity score, specificity (no generic claims), risk transparency, hook clarity. One person on the team became the reviewer — consistency mattered more than who reviewed.

---

### The Outcome

| Metric | Before | After |
|---|---|---|
| Global bid conversion rate | Baseline | +25% over 12 months |
| Average RFQ turnaround | Days | Hours |
| Proposal consistency | Variable by author | Standardised structure |
| Hook clarity (internal rating) | 3/10 average | 8/10 average |

---

### Key Learning

**The AI tooling saved time. The sequence change won bids.** If I'd introduced the LLM drafting without the five-question gate, we'd have produced bad proposals faster. Speed amplifies whatever process it's attached to — good or bad.

The other learning: a writing guide doesn't change behaviour under pressure. A mandatory gate does. If you want a team to do something differently, don't tell them how — change what they have to produce before they can move to the next step.

---

### What I'd Do Differently

Introduce the five-question gate three months earlier. I spent the first quarter trying to coach the writing. The gate took one meeting to introduce and stuck immediately because it was a process change, not a culture change. Process is faster than culture.

> Every winning bid has a single memorable hook. Define it in the first paragraph and echo it at the close.
