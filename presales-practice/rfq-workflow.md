---
description: "AI-assisted RFQ workflow from receipt to submission-ready draft in 4-6 hours. Step-by-step with LLM role at each stage."
layout: page
title: AI-Assisted RFQ Workflow
permalink: /presales-practice/rfq-workflow/
---

# AI-Assisted RFQ Workflow

End-to-end workflow from RFQ receipt to submission-ready draft. Current elapsed time: 4–6 hours. Previous: 3-day cycle.

---

## The Six Stages

| Stage | Action | LLM role | Elapsed time |
|---|---|---|---|
| 1. Intake | Read RFQ, tag all requirements | Extract and categorise requirements, flag ambiguities | 30 min |
| 2. Discovery | Map to our delivery capability | Gap analysis between RFQ requirements and our strengths | 45 min |
| 3. Drafting | Write executive summary + scope | First draft from structured prompt (see below) | 60 min |
| 4. Pricing | Build cost model | Sense-check assumptions, flag scope risks | 60 min |
| 5. Review | Internal review pass | Tone, clarity, and risk language refinement | 45 min |
| 6. Submission | Final format and submit | Proofread, executive summary tightening | 30 min |

---

## Stage 3 Prompt — Executive Summary Draft

```
You are a senior presales consultant. Given:
- Client domain: [vertical]
- Core pain (from discovery): [verbatim notes]
- Their success metric: [defined in strategy session]
- Our strongest proof point: [specific, quantified]
- Top risk we're addressing: [named risk + mitigation]

Draft a 350-word executive summary for an RFQ response.
Structure: Pain → Understanding → Solution → Proof → Confidence.
Outcome-first language throughout.
No company background in the first three paragraphs.
Flag any claims that need a supporting data point as [VERIFY].
```

---

## Stage 5 Prompt — Review Pass

```
Review this RFQ response section for:
1. Client-centricity: does every paragraph answer "so what?" from the client's view?
2. Specificity: are there any generic claims that should be replaced with proof points?
3. Risk language: are risks named proactively with clear mitigations?
4. Tone: confident without being arrogant, specific without being jargon-heavy
5. Hook: is the single memorable point clear and echoed at the close?

Return: specific line edits with rationale, not general feedback.
```

---

## What I Still Do Manually

The LLM accelerates drafting — it doesn't replace judgment. I still own:

- Pricing decisions and commercial structure
- Client-specific proof point selection
- Final risk register review
- Executive summary sign-off before submission

The rule: anything that requires knowing the client relationship, the competitive context, or the commercial constraints stays with me. Everything structural and linguistic — the LLM drafts first.
