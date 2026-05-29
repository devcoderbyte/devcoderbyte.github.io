---
layout: page
title: SLO/SLI Integration Framework
permalink: /sre-observability/slo-sli-framework/
description: "SLO/SLI framework designed as a client trust tool — collaborative definition, error budget model, and monthly review cadence from production use."
---

# SLO/SLI Integration Framework

How I design SLO programs as client trust tools — not DevOps metrics. This is not a textbook framework. It's what I actually run, including the parts that were awkward to implement and the client conversations that shaped it.

---

## Where Most SLO Programs Go Wrong

The standard approach: engineering team picks metrics they can measure, sets targets based on what they think they can achieve, and reports them to the client monthly.

The client nods, doesn't understand most of it, and the whole exercise becomes a compliance activity that nobody values.

I learned this the hard way. The first SLO report I sent to a client was six pages of API latency percentiles and error rates. The client's response was: "This is great. What does it mean for us?"

That question is the entire problem. **If the client has to ask what it means for them, you built the wrong SLOs.**

---

## The Core Reframe

SLIs must be defined as client-observable outcomes — things the client's customers experience, not things the engineering team measures.

| Inside-out (what we can measure) | Outside-in (what the client experiences) |
|---|---|
| API response time p95 < 200ms | Payment confirmation appears within 3 seconds |
| Error rate < 0.1% | Payment success rate > 99.5% |
| Service availability > 99.9% | Dealer financing portal loads within 4 seconds |
| Database query time < 50ms | Report generation completes within 30 seconds |

The left column is meaningful to engineers. The right column is meaningful to the client's CEO when they're on a call with their own customers.

---

## Phase 1 — Collaborative SLI Definition

This is a workshop, not a document review. I run it with both the technical team and at least one business stakeholder from the client side.

**The three questions I ask:**

"What does your customer experience when the platform is working perfectly?" — This gets you the user journey, which is where SLIs should live.

"What's the first thing your team notices when something is wrong?" — This tells you what's already being monitored informally, which is usually a better starting point than building from scratch.

"What would a 1% degradation in [specific outcome] cost you in revenue or customer trust?" — This question always sharpens the conversation. When you attach money to a metric, people suddenly care about the threshold.

**The output:** 3–5 SLIs, defined in client language, signed off by both engineering and the business stakeholder. The joint sign-off matters — it makes SLOs a shared accountability framework, not a vendor self-assessment.

---

## Phase 2 — Error Budget Model

For each SLI, I define the error budget and then build the burn rate thresholds:

| Element | Definition |
|---|---|
| SLO target | Threshold below which we take action (e.g., 99.5% payment success rate) |
| Measurement window | Rolling 28 days — avoids gaming around calendar boundaries |
| Error budget | 100% − SLO target = allowable failure rate (0.5% in this case) |
| Burn rate | How fast we're consuming the budget vs. the expected pace |

**Burn rate thresholds I use:**

- **Normal (< 1x):** Budget consuming at expected pace. Feature work proceeds normally.
- **Elevated (> 2x):** Budget consuming twice as fast as expected. On-call investigation triggered. Client informed proactively.
- **Critical (> 5x):** Budget will be exhausted in under a week at current rate. All non-critical changes paused. Engineering sprint initiated.
- **Exhausted:** SLO breached. Feature work stops. Reliability sprint. Client call same day.

**The conversation that changed how I communicate this:**

A client asked me once: "Why does it matter that we're burning budget fast? We haven't missed an SLO yet."

My answer: "If you're driving and your fuel gauge drops from full to half in 10 miles, you pull over — even though you haven't run out of fuel yet. The burn rate tells you what's going to happen, not what's happening now. At 5x burn rate, we have days, not weeks, to fix this before the client experience degrades."

They got it immediately. I now use that analogy in every SLO introduction.

---

## Phase 3 — Dashboard Integration

Two views, deliberately separate:

**Ops dashboard (internal, real-time):** Current burn rate, remaining budget, active alerts, open incidents. Engineers see this. It's dense and technical.

**Executive dashboard (client-facing, weekly):** SLO compliance percentage, 3-month trend, error budget status (green/amber/red), one-line summary. Client stakeholders see this. It fits on one slide.

The discipline of maintaining two separate views forced me to be honest about what each audience actually needs. Showing the client the ops dashboard is like handing someone a car engine diagnostic when they asked if the car is roadworthy.

---

## Phase 4 — Monthly SLO Review

The review is a conversation, not a report walkthrough. I send the executive dashboard 24 hours in advance and start the call with one question:

"Before we go through the data — is there anything about how the platform performed this month that surprised you, positively or negatively?"

This surfaces the real issues. Often the client has noticed something that doesn't appear in our metrics — a workflow that felt slow, a report that seemed off. Starting with their perception before the data stops the monthly review from becoming a ritual and keeps it diagnostic.

Four questions guide the rest of the session:
1. Did we meet SLO targets? (Data, not narrative)
2. Where did error budget burn faster than expected, and what did we learn?
3. Are the SLIs still measuring what matters — have any business priorities shifted?
4. What's the reliability engineering priority for next month?

---

## What This Looks Like in Practice

After running this framework across enterprise engagements for 18+ months:

- Clients stopped asking "what does this mean for us?" — because the SLIs are already defined in their language
- Error budget exhaustion events, when they happened, became collaborative engineering decisions rather than blame conversations — because the framework was co-designed
- CSAT held at 9+ through the entire period — partly because of the reliability improvements, partly because the monthly review cadence meant the client never felt surprised
- One client asked if they could include the SLO framework in their own vendor presentations to their board as an example of mature delivery governance. That felt like the right kind of validation.
