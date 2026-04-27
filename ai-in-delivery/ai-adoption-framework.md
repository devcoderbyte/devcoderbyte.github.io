---
layout: page
title: AI Adoption Framework
permalink: /ai-in-delivery/ai-adoption-framework/
---

# AI Adoption Framework

How I enable delivery teams to move from AI-curious to AI-capable — without mandates, without a dedicated training budget, and without waiting for a top-down program.

---

## The Core Problem with Most AI Adoption Programs

Most organisations measure AI adoption by **training completion**. Seats in workshops. Certificates issued. Hours logged.

None of that tells you whether anyone is actually solving business problems differently.

The bar I use: **how many team members built or automated something using AI this month?**

---

## The Three-Stage Pathway

### Stage 1 — Explorer
**Goal:** Remove fear, build familiarity.

Team members at this stage have heard about AI but don't know where it fits in their work. The job here is not to teach prompting — it's to show them their own toil through a new lens.

**Activities:**
- Toil audit: list every manual task you do more than twice a week
- One live demo using their actual work (a real status report, a real ticket)
- One assigned experiment: pick one task, try it with AI, report back

**Success signal:** They try something unprompted within 2 weeks.

---

### Stage 2 — Practitioner
**Goal:** Build consistent, repeatable workflows.

Team members at this stage have experimented but haven't systematised. They use AI occasionally, not structurally.

**Activities:**
- Document their best working prompt for their most frequent task
- Join the workflow library — contribute one prompt, use two others
- Weekly office hours: bring a workflow problem, leave with a working solution

**Success signal:** They have at least one AI workflow they run without thinking about it.

---

### Stage 3 — Champion
**Goal:** Scale others, identify use cases for engineering.

Champions are team members who've built something others use. They become the connective tissue between frontline teams and engineering.

**Activities:**
- Showcase their workflow in a team session
- Identify one use case that needs engineering support to scale
- Pair with a tech team to take a prototype to production

**Success signal:** Someone else on the team adopted their workflow. Or their prototype shipped.

---

## How I Run This in Practice

**Week 1–2:** Toil audit across the team. Map every manual, repetitive task. Stack-rank by time cost × frequency.

**Week 3–4:** Live demos using top-3 toil items. I run the session. Team members bring their actual data (sanitised). We build the workflow together.

**Month 2:** Each team member picks one workflow to own. Documented, shared, iterated.

**Month 3 onward:** Champions emerge naturally. Office hours become peer-led. I shift from facilitator to sponsor.

---

## Governance Layer

Every AI workflow goes through a quick check before it's used in client-facing contexts:

| Check | Question |
|---|---|
| Data privacy | Does this workflow process any PII or confidential client data? |
| Output review | Is there a human review step before the output is sent externally? |
| Accuracy risk | What's the blast radius if the LLM output is wrong? |
| Dependency risk | If the tool is unavailable, can we revert to manual? |

Low-risk workflows (internal drafts, summaries, retro analysis) → fast-track approval.  
Client-facing or data-heavy workflows → reviewed with legal/security before deployment.

---

## Outcome

Across engagements where I've run this framework:

- **18% improvement** in team productivity over two quarters
- Multiple team members progressed from Explorer to Champion without formal training
- Three internal workflows scaled to production tooling with engineering partnership
- AI adoption became pull-driven, not push-driven — team members asking for more, not being told to do more
