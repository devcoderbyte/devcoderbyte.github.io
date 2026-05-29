---
layout: page
title: AI Adoption Framework
permalink: /ai-in-delivery/ai-adoption-framework/
description: "A structured framework for enabling delivery teams to adopt AI — Explorer, Practitioner, Champion pathway with governance and measurement."
---

# AI Adoption Framework

How I enable delivery teams to move from AI-curious to AI-capable — without mandates, without a dedicated training budget, and without waiting for a top-down program.

---

## The Core Problem with Most AI Adoption Programs

Most organisations measure AI adoption by **training completion**. The bar I use: **how many team members built or automated something using AI this month?**

---

## The Three-Stage Pathway

### Stage 1 — Explorer
**Goal:** Remove fear, build familiarity.

**Activities:**
- Toil audit: list every manual task you do more than twice a week
- One live demo using their actual work
- One assigned experiment: pick one task, try it with AI, report back

**Success signal:** They try something unprompted within 2 weeks.

### Stage 2 — Practitioner
**Goal:** Build consistent, repeatable workflows.

**Activities:**
- Document their best working prompt for their most frequent task
- Join the workflow library — contribute one prompt, use two others
- Weekly office hours: bring a workflow problem, leave with a working solution

**Success signal:** They have at least one AI workflow they run without thinking about it.

### Stage 3 — Champion
**Goal:** Scale others, identify use cases for engineering.

**Activities:**
- Showcase their workflow in a team session
- Identify one use case that needs engineering support to scale
- Pair with a tech team to take a prototype to production

**Success signal:** Someone else on the team adopted their workflow.

---

## Governance Layer

Every AI workflow goes through a quick check before use in client-facing contexts:

| Check | Question |
|---|---|
| Data privacy | Does this workflow process any PII or confidential client data? |
| Output review | Is there a human review step before the output is sent externally? |
| Accuracy risk | What's the blast radius if the LLM output is wrong? |
| Dependency risk | If the tool is unavailable, can we revert to manual? |

---

## Outcome

- **18% improvement** in team productivity over two quarters
- Multiple team members progressed from Explorer to Champion without formal training
- Three internal workflows scaled to production tooling with engineering partnership
- AI adoption became pull-driven, not push-driven
