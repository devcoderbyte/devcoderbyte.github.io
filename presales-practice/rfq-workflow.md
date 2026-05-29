---
layout: page
title: AI-Assisted RFQ Workflow
permalink: /presales-practice/rfq-workflow/
description: "AI-assisted RFQ workflow from receipt to submission-ready draft in 4-6 hours."
---

# AI-Assisted RFQ Workflow

End-to-end workflow from RFQ receipt to submission-ready draft. Current elapsed time: 4–6 hours. Previous: 3-day cycle.

---

## The Six Stages

| Stage | Action | LLM role | Time |
|---|---|---|---|
| 1. Intake | Read RFQ, tag all requirements | Extract and categorise requirements, flag ambiguities | 30 min |
| 2. Discovery | Map to delivery capability | Gap analysis between RFQ requirements and our strengths | 45 min |
| 3. Drafting | Write executive summary + scope | First draft from structured prompt | 60 min |
| 4. Pricing | Build cost model | Sense-check assumptions, flag scope risks | 60 min |
| 5. Review | Internal review pass | Tone, clarity, and risk language refinement | 45 min |
| 6. Submission | Final format and submit | Proofread, executive summary tightening | 30 min |

---

## Stage 3 Prompt

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

## What I Still Do Manually

- Pricing decisions and commercial structure
- Client-specific proof point selection
- Final risk register review
- Executive summary sign-off before submission

**The rule:** anything requiring knowledge of the client relationship, competitive context, or commercial constraints stays with me. Everything structural and linguistic — the LLM drafts first.
