---
layout: page
title: "Case Study 03 — DevOps Upskilling Platform"
permalink: /case-studies/devops-upskilling/
description: "Case study: How an internal DevOps upskilling platform converted AppOps engineers into full DevOps contributors with zero hiring budget."
---

<div style="background:linear-gradient(135deg,rgba(217,119,6,.08) 0%,rgba(37,99,235,.06) 100%);border:1px solid #d9770640;border-radius:12px;padding:1.5rem;margin-bottom:2rem;display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;text-align:center">
  <div><div style="font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;color:#d97706">-35%</div><div style="font-size:12px;color:#64748b;margin-top:4px">Debugging time reduction</div></div>
  <div><div style="font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;color:#d97706">Zero</div><div style="font-size:12px;color:#64748b;margin-top:4px">External hires needed</div></div>
  <div><div style="font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;color:#d97706">1 tool</div><div style="font-size:12px;color:#64748b;margin-top:4px">Shipped to production during training</div></div>
</div>

# Case Study 03 — DevOps Upskilling Platform

**Domain:** Team capability · DevOps transformation · Leadership
**Timeline:** One quarter design and delivery, ongoing
**Role:** Senior Technical Lead — platform design, curriculum, delivery

---

## The Situation

A high-volume API platform needed full DevOps capability across the team. Half the team were AppOps engineers — excellent at monitoring and incident response, but without CI/CD, pipeline automation, and infrastructure-as-code skills needed for modern DevOps practice.

Leadership's default position was to hire two DevOps engineers. My position was that we didn't have a headcount problem — we had a knowledge distribution problem. The same capability existed in the team; it just wasn't evenly spread.

I had four weeks to prove that before the hiring decision was made.

---

## The Design Decision That Changed Everything

My first instinct was a training course. Six modules, weekly sessions, assessments at the end. Standard L&D thinking.

I built the outline, reviewed it with one of the AppOps engineers, and asked him: "Would you actually use this?" His answer was honest: "Probably not after the first two weeks. It feels like school."

**The judgment call:** Throw out the course structure. Design the learning to be useful, not educational. Every module needed to produce something the team actually needed — not a certificate, not a grade, a working artefact.

This changed everything about the design. Modules were built around real problems the team was experiencing, not a textbook DevOps curriculum. The first module wasn't "Introduction to CI/CD" — it was "Fix this broken Jenkins pipeline." The second wasn't "Understanding Kubernetes" — it was "Deploy this service to PCF without breaking the existing one."

---

## What I Built

**Capability gap mapping:** Assessed each engineer individually against a 12-skill DevOps framework. Not a group assessment — individual, private, honest. People will tell you what they don't know if you make it safe to say so.

**Module design principles:**
- Every module solves a real problem the team has right now
- Every module produces a working artefact (not a completed quiz)
- Peer teaching: engineer who completes a module presents it to the team in 20 minutes

**The peer teaching decision was the most important one.** I didn't mandate it — I offered it. The first engineer who presented did it because he was proud of what he'd built. After that, everyone wanted to present. Teaching accelerated mastery faster than any module content.

---

## The Unexpected Outcome

During Module 4 (microservices version tracking), one engineer built an internal tool to automate a process the team was doing manually every morning. He built it as a module exercise. It was good enough to ship.

We reviewed it, tested it, and deployed it to production during the training program. That tool reduced debugging time by 35% — not a training outcome, a delivery outcome that emerged from designing the learning to solve real problems.

**I didn't plan for this.** But it happened because the module design principle — produce something useful, not something assessed — created the conditions for it.

---

## The Outcome

| Metric | Outcome |
|---|---|
| Engineers converted AppOps → full DevOps | Full team coverage within one quarter |
| External hiring required | Zero — leadership dropped the hire |
| Training budget required | Zero — built on existing Confluence and tooling |
| Debugging time reduction | 35% from the tool built during training |
| Cultural change | Engineers started voluntarily sharing skills — peer teaching became normal |

---

## What I'd Do Differently

Map individual gaps privately from day one. I started with a group assessment and got socially desirable answers — nobody wants to admit gaps in front of peers. The individual conversations I had later were far more honest and produced a much better module sequence. Privacy first, group learning second.

---

## The Broader Lesson

When you design learning to produce useful things rather than to produce learned people, you get both. The engineers became more capable *and* built things the team needed. That's not a coincidence — it's what happens when the incentive (build something real) aligns with the outcome (get better at building things).
