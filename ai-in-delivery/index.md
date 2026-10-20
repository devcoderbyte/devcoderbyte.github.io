---
layout: page
title: AI in Delivery
permalink: /ai-in-delivery/
description: "LLM workflows with their v1→v4 history, how I take a team from AI-curious to AI-capable, and an audit-first toil playbook. What worked, what failed, and what it cost."
---

<p class="lede">How I use AI in delivery, including what v1 got wrong. Four workflows with their iteration history, how I bring a team along, and the toil audit that decides what to automate first. To price AI-assisted delivery honestly, use the [AI usage & ROI calculator](/tools/ai-roi-calculator/).</p>

<nav class="toc" aria-label="On this page"><div class="toc-label">On this page</div>
<ol>
  <li><a href="#workflows">LLM workflow library</a></li>
  <li><a href="#adoption">Bringing a team along</a></li>
  <li><a href="#toil">Toil elimination</a></li>
</ol></nav>

## LLM workflow library {#workflows}

Four workflows I run in production across enterprise delivery. Each includes the prompt, the context, the outcome metric — and critically, **what failed first and what I changed**.

The version 1 prompt for every workflow was wrong. What's documented here is version 3 or 4, after real use revealed what the first version got wrong.

---

### Workflow 01 — RFQ First-Draft Generator

**Problem:** Enterprise RFQ responses were taking days. Too slow, too inconsistent across authors.

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

Adding `First paragraph must be about the client's problem, not our company` as an explicit constraint fixed most of the issue immediately.

**Where it still fails:**
When the discovery call notes are thin or vague, the output is generic. Garbage in, garbage out applies more strictly to LLMs than to human writers because LLMs will confidently hallucinate specificity if you don't give them real specifics. I now require a minimum of three verbatim quotes from the client before running this workflow.

**Outcome:** RFQ turnaround went from days to hours. Bid conversion improved 25% over 12 months.

---

### Workflow 02 — Weekly Executive Status Report

**Problem:** Friday status reports were taking about two hours — pulling from Jira, Splunk, and memory. Inconsistent format, variable quality.

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

**Outcome:** most of those two hours saved each week. Report quality became consistent regardless of how turbulent the week was.

---

### Workflow 03 — Incident RCA Summariser

**Problem:** Post-mortem write-ups after P1s were taking hours — time the team didn't have during high-pressure recovery windows.

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

**Outcome:** RCA drafts now take a fraction of the time. Clients receive structured post-mortems within hours of resolution.

---

### Workflow 04 — Sprint Retrospective Insight Extractor

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

### The Pattern Across All Four

Every workflow went through the same evolution:

1. **V1:** Correct inputs, no output constraints → plausible but generic output
2. **V2:** Added format constraints → better structure, still had edge case failures
3. **V3/V4:** Added explicit prohibitions ("no vague causes", "no generic actions") → output that actually holds up under scrutiny

The biggest learning: **telling the model what not to do is often more powerful than telling it what to do.** Negative constraints force specificity in a way that positive instructions don't.

The second learning: every workflow has a data quality dependency. The prompt is not the bottleneck — the input quality is. I now treat data preparation as a first-class step in every workflow, not an afterthought.

## Bringing a team along {#adoption}

How I enable delivery teams to move from AI-curious to AI-capable — without mandates, without a dedicated training budget, and without waiting for a top-down program.

---

### The Core Problem

Most organisations measure AI adoption by training completion. The bar I use: **how many team members built or automated something using AI this month?**

---

### The Three-Stage Pathway

#### Stage 1 — Explorer
**Goal:** Remove fear, build familiarity.

**Activities:**
- Toil audit: list every manual task performed more than twice a week
- One live demo using their actual work — not a generic use case
- One assigned experiment: pick one task, try it with AI, report back

**Success signal:** They try something unprompted within 2 weeks.

#### Stage 2 — Practitioner
**Goal:** Build consistent, repeatable workflows.

**Activities:**
- Document their best working prompt for their most frequent task
- Join the workflow library — contribute one prompt, use two others
- Weekly office hours: bring a workflow problem, leave with a working solution

**Success signal:** At least one AI workflow they run without thinking about it.

#### Stage 3 — Champion
**Goal:** Scale others, identify engineering use cases.

**Activities:**
- Showcase their workflow in a team session
- Identify one use case that needs engineering support to scale
- Pair with tech team to take a prototype to production

**Success signal:** Someone else adopted their workflow.

---

### Governance Layer

Every AI workflow before client-facing use:

| Check | Question |
|---|---|
| Data privacy | Does this process any PII or confidential client data? |
| Output review | Is there a human review step before external output? |
| Accuracy risk | What's the blast radius if the LLM output is wrong? |
| Dependency risk | Can we revert to manual if the tool is unavailable? |

---

### Outcome

- Multiple team members progressed from Explorer to Champion without formal training
- Three internal workflows scaled to production with engineering partnership
- AI adoption became pull-driven, not push-driven

## Toil elimination {#toil}

The audit-first methodology I use to systematically identify, prioritise, and eliminate operational toil across delivery teams.

---

### What Counts as Toil

Toil is manual, repetitive work that scales linearly with the size of the service and produces no lasting value.

**Signs you have a toil problem:**
- Engineers doing the same thing every Monday morning
- Status reports assembled by hand from multiple sources
- Tickets that get resolved the same way every time, with no runbook
- Alerts that fire, get acknowledged, get resolved — without any system change

---

### Phase 1 — The Toil Audit (Week 1–2)

Log every manual task for two consecutive sprints:

| Task | Frequency | Time per occurrence | Runbook fix? | Automation fix? |
|---|---|---|---|---|
| Pull weekly Jira report | Weekly | 45 min | Yes | Yes |
| Write exec status update | Weekly | 2 hrs | Partially | Yes (LLM) |
| Triage incoming P3 tickets | Daily | 30 min | Yes | Yes (Jira AI) |

---

### Phase 2 — Prioritisation Matrix

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

### Phase 3 — Implementation Sequence

1. **Runbooks** for high-frequency, low-cognitive toil — convert tribal knowledge to documented process
2. **Jira and alerting automation** for repetitive routing and classification
3. **LLM-assisted workflows** for high-cognitive, predictably structured tasks

---

### Results from Production

- **35% reduction** in debugging time through internal tooling
- **15% → 75%** alert accuracy using Temperstack scans and AI-generated runbooks
- **About two hours a week** saved per delivery lead through LLM-assisted reporting

---

> If a human is doing the same thing more than twice a week and no judgment is required, a machine should be doing it. If judgment is required but the structure is predictable, an LLM should be drafting it and a human reviewing it.

> Measuring success not by training completion — but by how many team members are actively solving business problems with AI.
