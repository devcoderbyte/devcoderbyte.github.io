---
description: "Four production LLM workflows for enterprise delivery — RFQ drafting, executive status reporting, incident RCA, and sprint retrospective analysis. Real prompts, real outcomes."
layout: page
title: LLM Workflow Library
permalink: /ai-in-delivery/llm-workflow-library/
---

# LLM Workflow Library

Four production workflows I run across enterprise delivery. Each is structured as: **Context → Prompt → Output → Outcome metric.**

Client names and commercially sensitive data removed. The logic is fully replicable.

---

## Workflow 01 — RFQ First-Draft Generator

**Problem:** Enterprise RFQ responses were taking 3 days of iteration. Too slow for competitive bids, too inconsistent across authors.

**Context fed to LLM:**
- Client domain and vertical
- Pain points extracted from discovery call notes
- Budget signals and scope indicators
- Our delivery strengths and relevant proof points

**Prompt pattern:**
```
You are a senior presales consultant. Given the following client context:
- Domain: [automotive / telecom / fintech]
- Pain: [verbatim from discovery call notes]
- Budget signal: [range]
- Our strengths: SRE, DevOps, AMS, AI-augmented delivery

Draft a SOW executive summary and scope section.
Use outcome-first language throughout.
Flag any scope risks as [RISK: reason].
Keep to 400 words.
```

**What I do with the output:** One structured review pass — tighten numbers, validate scope boundaries, add client-specific proof points. Done.

**Outcome:** RFQ turnaround dropped from 3 days to under 4 hours. Bid conversion improved 25% over 12 months.

---

## Workflow 02 — Weekly Executive Status Report

**Problem:** Friday status reports were taking 2+ hours per week — pulling from Jira, Splunk, and memory. Inconsistent format, variable quality.

**Context fed to LLM:**
- Jira weekly ticket summary (exported)
- Splunk anomaly log extract
- Open risk register items
- Last week's RAG status for comparison

**Prompt pattern:**
```
You are a TPM writing an executive status report for a C-suite audience.

Input data:
- Tickets closed this week: [list]
- SLA status: [green / amber / red per stream]
- Incidents: [count + severity]
- Risks: [open items]

Output a 200-word status report with:
- Overall RAG status with one-line rationale
- Key wins this week (max 3)
- Open risks with mitigation status
- Focus for next week

Tone: confident, concise, no jargon.
```

**Outcome:** 2+ hours saved weekly. Report quality became consistent regardless of how turbulent the week was. CSAT 9+ sustained across 18 months.

---

## Workflow 03 — Incident RCA Summariser

**Problem:** Post-mortem write-ups after P1s were taking 3+ hours — time the team didn't have during high-pressure recovery windows.

**Context fed to LLM:**
- Splunk log extract (relevant window)
- Incident timeline (from Jira or ServiceNow)
- Resolution steps taken by the team

**Prompt pattern:**
```
Analyse this incident timeline and log extract.

Produce a client-ready RCA document with:
1. Incident summary (2 sentences max)
2. Root cause (specific, technical but readable by non-engineers)
3. Contributing factors (max 3)
4. Resolution steps taken (chronological)
5. Preventive actions with owners and target dates

Tone: factual, accountable, forward-looking. No blame language.
```

**Outcome:** RCA turnaround reduced by ~70%. Client receives structured post-mortem within hours of resolution, not days. Trust maintained through transparency.

---

## Workflow 04 — Sprint Retrospective Insight Extractor

**Problem:** Retro notes were messy, multi-lingual, and rarely turned into real action items. Good conversations, poor follow-through.

**Context fed to LLM:**
- Raw retro notes (copy-pasted from Miro / Confluence)
- Previous sprint's action item status

**Prompt pattern:**
```
You are a delivery coach reviewing sprint retrospective notes.

Input: [paste raw notes]

Extract and structure:
1. Top 3 recurring friction themes (with evidence from the notes)
2. Quick wins — fixable within next sprint
3. Systemic issues — need roadmap item or process change
4. Suggested action items with suggested owners

Format as a clean table.
Language: team-friendly, not corporate.
```

**Outcome:** Action item follow-through improved significantly. Team reported retros felt more useful. Delivery productivity improved 18% over two quarters.

---

## Key Principle

The prompt is not the product. The **workflow around the prompt** is — what data you feed in, what you verify in the output, and how you integrate it into existing processes. That's what makes the difference between a useful tool and a party trick.
