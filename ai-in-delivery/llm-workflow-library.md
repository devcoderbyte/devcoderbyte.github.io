---
layout: page
title: LLM Workflow Library
permalink: /ai-in-delivery/llm-workflow-library/
description: "Four production LLM workflows for enterprise delivery — RFQ drafting, executive status reporting, incident RCA, and sprint retrospective analysis. Includes iterations, failure modes, and what I changed."
---

# LLM Workflow Library

Four workflows I run in production across enterprise delivery. Each includes the prompt, the context, the outcome metric — and critically, **what failed first and what I changed**.

The version 1 prompt for every workflow was wrong. What's documented here is version 3 or 4, after real use revealed what the first version got wrong.

---

## Workflow 01 — RFQ First-Draft Generator

**Problem:** Enterprise RFQ responses were taking 3 days. Too slow, too inconsistent across authors.

**Current prompt (v4):**
```
You are a senior presales consultant who has read the RFQ carefully.

Client context:
- Domain: [vertical]
- Core pain (verbatim from discovery call notes): [paste]
- Their success metric in 12 months: [defined in strategy session]
- Our strongest proof point for this client: [specific, quantified]
- The top risk we are proactively addressing: [named risk + our mitigation]

Draft a 350-word executive summary.
Structure: Pain → Understanding → Solution → Proof → Confidence.
First paragraph must be about the client's problem, not our company.
Flag any claim that needs a supporting data point as [VERIFY].
Do not include our company background in the first three paragraphs.
```

**What v1 got wrong:**
The first version had no structure instruction. The LLM produced well-written prose that still led with our capabilities rather than the client's problem. I had given it the right inputs but no constraint on sequence — it defaulted to the same structure our team had been using for years, which was the pattern I was trying to break.

Adding `First paragraph must be about the client's problem, not our company` as an explicit constraint fixed 80% of the issue immediately.

**Where it still fails:**
When the discovery call notes are thin or vague, the output is generic. Garbage in, garbage out applies more strictly to LLMs than to human writers because LLMs will confidently hallucinate specificity if you don't give them real specifics. I now require a minimum of three verbatim quotes from the client before running this workflow.

**Outcome:** RFQ turnaround from 3 days to 4–6 hours. Bid conversion improved 25% over 12 months.

---

## Workflow 02 — Weekly Executive Status Report

**Problem:** Friday status reports were taking 2+ hours — pulling from Jira, Splunk, and memory. Inconsistent format, variable quality.

**Current prompt (v3):**
```
You are a TPM writing a weekly executive status report.
Audience: C-suite client stakeholders. They are time-poor and outcome-focused.

Input data this week:
- Tickets closed: [list with resolution times]
- SLA status per stream: [green/amber/red with one-line rationale]
- Incidents: [count, severity, current status]
- Risks: [open items with mitigation status]
- Last week's commitments: [what I said I'd do]

Output format (strict):
1. Overall RAG: [colour] — [one sentence why]
2. Delivered this week: [3 bullet points max, outcome-first]
3. Open risks: [named risks with mitigation status, not general concerns]
4. Next week focus: [2-3 specific commitments]
5. Decisions needed from client: [explicit asks only — if none, say "None this week"]

Tone: Confident. Direct. No hedging language. No jargon.
Total length: Under 200 words.
```

**What v1 got wrong:**
No length constraint. The first version produced 600-word reports with full narrative context per section. Technically accurate, practically useless for C-suite. Adding `Under 200 words` and `3 bullet points max` forced prioritisation that made the output genuinely executive-ready.

**What v2 got wrong:**
Section 5 didn't exist. The LLM would include asks embedded in the risk section — easy to miss. Making "Decisions needed from client" its own explicit section, with the instruction to say "None this week" if there were none, forced clarity that changed how clients received the report.

**Where it still fails:**
When I'm under pressure and feed it incomplete data — a half-filled SLA column, missing incident counts — it fills gaps with plausible-sounding estimates. I now do a 5-minute data completeness check before running the prompt. Incomplete input is worse than no LLM at all.

**Outcome:** 2+ hours saved weekly. Report quality became consistent regardless of how turbulent the week was.

---

## Workflow 03 — Incident RCA Summariser

**Problem:** Post-mortem write-ups after P1s were taking 3+ hours — time the team didn't have during high-pressure recovery windows.

**Current prompt (v3):**
```
You are a senior SRE writing a client-ready root cause analysis.
Audience: Client technical and business stakeholders.

Input:
- Incident timeline (chronological): [paste]
- Splunk log extract (relevant window): [paste]
- Resolution steps taken: [paste]
- Impact: [affected services, users, duration]

Output (strict sections):
1. Incident summary: 2 sentences. What happened, when it was resolved.
2. Root cause: Specific and technical, but readable by a non-engineer. No vague "due to increased load" causes.
3. Contributing factors: Max 3. Only factors that materially affected severity or duration.
4. Resolution steps: Chronological. Who did what and when.
5. Preventive actions: Specific actions with named owners and target dates. No generic "improve monitoring" actions.

Tone: Factual. Accountable. Forward-looking. Never blame language.
```

**What v1 got wrong:**
No constraint on root cause specificity. V1 produced root causes like "due to a configuration issue" and "caused by increased load on the database." Technically not wrong, but completely uninformative. Adding `No vague "due to increased load" causes` forced the model to dig into the actual log evidence for specificity.

**The "no generic preventive actions" constraint:**
V1 produced action items like "improve monitoring coverage" and "review deployment processes." These were useless. Adding explicit instruction to produce named owners and target dates — and to prohibit generic actions — changed the output from a document nobody acts on to one that the team actually follows.

**Where it still fails:**
When the log extract is large, the model sometimes loses the thread of the timeline. I now trim the log to the 15-minute window around the incident before pasting. Full logs confuse the model more than they help it.

**Outcome:** RCA turnaround reduced by ~70%. Clients receive structured post-mortems within hours of resolution.

---

## Workflow 04 — Sprint Retrospective Insight Extractor

**Problem:** Retro notes were messy, multi-lingual, and rarely turned into action items that were actually followed up on.

**Current prompt (v3):**
```
You are a delivery coach reviewing sprint retrospective notes.
Your goal is to help a team improve, not to document what happened.

Input: [paste raw retro notes — messy is fine]

Previous sprint action items: [paste — I want to know which ones were closed]

Output:
1. Action item follow-through: Which previous items were completed, which weren't, why (if mentioned).
2. Recurring themes: Top 3 patterns appearing across multiple team members. Include direct quotes as evidence.
3. Quick wins: Issues fixable within the next sprint. Specific, actionable, owner suggested.
4. Systemic issues: Problems that need a roadmap item or process change. Not quick fixes.
5. Suggested actions: Max 5. Each must have: what, who, when. No action without an owner.

Format: Clean table for items 3-5. Team-friendly language — not corporate, not preachy.
```

**What v1 got wrong:**
No follow-through check on previous sprint items. The team was generating action items every retro that nobody tracked. Adding the "previous sprint action items" input and making follow-through Section 1 changed the dynamic completely — suddenly the team was accountable to what they'd said they'd do, and the retro became about the gap between intention and execution.

**The recurring themes section:**
V1 produced themes without evidence. I'd share them with the team and get pushback: "That's not really a pattern, that was just me having a bad week." Adding `Include direct quotes as evidence` meant every theme had proof — the team couldn't dismiss what they'd literally said themselves.

**Where it still fails:**
When notes are in mixed English and Telugu (common in our Hyderabad team), the model sometimes misclassifies sentiment. Frustration expressed indirectly in Telugu reads as neutral in English translation. I've learned to do a quick pass for any Telugu-heavy notes before feeding them in.

**Outcome:** Action item follow-through improved significantly. Team reported retros felt more useful within three sprints of using this workflow.

---

## The Pattern Across All Four

Every workflow went through the same evolution:

1. **V1:** Correct inputs, no output constraints → plausible but generic output
2. **V2:** Added format constraints → better structure, still had edge case failures
3. **V3/V4:** Added explicit prohibitions ("no vague causes", "no generic actions") → output that actually holds up under scrutiny

The biggest learning: **telling the model what not to do is often more powerful than telling it what to do.** Negative constraints force specificity in a way that positive instructions don't.

The second learning: every workflow has a data quality dependency. The prompt is not the bottleneck — the input quality is. I now treat data preparation as a first-class step in every workflow, not an afterthought.
