---
layout: page
title: How I Lead Teams
permalink: /delivery-governance/team-leadership/
description: "How I grew an offshore team from 10 to 60+: growth conversations, wellbeing check-ins, onboarding freshers, ranked automation backlogs, and a DevOps upskilling programme that replaced two planned hires."
---

I grew an offshore team from 10 to 60+ engineers over two years. These are the habits that keep a team that size healthy, growing and trusted by the client.

---

## People

- **Their careers matter as much as mine.** I take each engineer's career progression as seriously as my own, and at times put it ahead of mine. That starts with identifying talent early and then nurturing it.
- **Monthly growth conversations.** Every month I pick the top 3–5 engineers in each area and talk with them about where they want to grow next.
- **Regular wellbeing check-ins.** Health, work-life balance, whether the work is technically satisfying, and how the team is getting on with each other.
- **Freshers get a defined path.** New joiners get a clear ramp-up plan. When one isn't working out, for example slow to acknowledge or hard to reach, I talk to them directly and help them fix it before it becomes a performance problem.
- **One team, no comparisons.** I don't compare people across areas or regions. If someone is overloaded, we rebalance the work or add a person.

---

## Running the Work

- **Documentation is owned, not optional.** Someone owns the documentation for each area, and progress is visible.
- **An automation backlog, ranked.** Leads list what could be automated, we rank it by criticality, and we add scripting capacity when the list justifies it.
- **Nothing left hanging.** Every email or chat with an open item on our side gets a response.

---

## The Client Side

- **A direct line in each area.** Each lead builds a working relationship with their onsite counterpart and the client manager for that area, instead of routing everything through one person.

---

## Developing engineers: the DevOps upskilling programme {#upskilling}

Growing people is easier to claim than to show, so here is one programme in full. It was Case Study 03.

**Domain:** Team capability · DevOps transformation · Leadership<br>
**Timeline:** One quarter design and delivery, ongoing<br>
**Role:** Senior Technical Lead — platform design, curriculum, delivery
{: .case-meta}

---

### The Situation

A high-volume API platform needed full DevOps capability across the team. Half the team were AppOps engineers — excellent at monitoring and incident response, but without CI/CD, pipeline automation, and infrastructure-as-code skills needed for modern DevOps practice.

Leadership's default position was to hire two DevOps engineers. My position was that we didn't have a headcount problem — we had a knowledge distribution problem. The same capability existed in the team; it just wasn't evenly spread.

I had four weeks to prove that before the hiring decision was made.

---

### The Design Decision That Changed Everything

My first instinct was a training course. Six modules, weekly sessions, assessments at the end. Standard L&D thinking.

I built the outline, reviewed it with one of the AppOps engineers, and asked him: "Would you actually use this?" His answer was honest: "Probably not after the first two weeks. It feels like school."

**The judgment call:** Throw out the course structure. Design the learning to be useful, not educational. Every module needed to produce something the team actually needed — not a certificate, not a grade, a working artefact.

This changed everything about the design. Modules were built around real problems the team was experiencing, not a textbook DevOps curriculum. The first module wasn't "Introduction to CI/CD" — it was "Fix this broken Jenkins pipeline." The second wasn't "Understanding Kubernetes" — it was "Deploy this service to PCF without breaking the existing one."

---

### What I Built

**Capability gap mapping:** Assessed each engineer individually against a 12-skill DevOps framework. Not a group assessment — individual, private, honest. People will tell you what they don't know if you make it safe to say so.

**Module design principles:**
- Every module solves a real problem the team has right now
- Every module produces a working artefact (not a completed quiz)
- Peer teaching: engineer who completes a module presents it to the team in 20 minutes

**The peer teaching decision was the most important one.** I didn't mandate it — I offered it. The first engineer who presented did it because he was proud of what he'd built. After that, everyone wanted to present. Teaching accelerated mastery faster than any module content.

---

### The Unexpected Outcome

During Module 4 (microservices version tracking), one engineer built an internal tool to automate a process the team was doing manually every morning. He built it as a module exercise. It was good enough to ship.

We reviewed it, tested it, and deployed it to production during the training program. That was the version-tracking tool from the PCF migration ([Case Study 05](/case-studies/pcf-to-kubernetes-migration/)). It cut debugging time by about 35% — not a training outcome, a delivery outcome that emerged from designing the learning to solve real problems.

**I didn't plan for this.** But it happened because the module design principle — produce something useful, not something assessed — created the conditions for it.

---

### The Outcome

| Metric | Outcome |
|---|---|
| Engineers converted AppOps → full DevOps | Full team coverage within one quarter |
| External hiring required | Zero — leadership dropped the hire |
| Training budget required | Zero — built on existing Confluence and tooling |
| Debugging time reduction | About 35%, from the version-tracking tool built during training (same tool as Case Study 05) |
| Cultural change | Engineers started voluntarily sharing skills — peer teaching became normal |

---

### What I'd Do Differently

Map individual gaps privately from day one. I started with a group assessment and got socially desirable answers — nobody wants to admit gaps in front of peers. The individual conversations I had later were far more honest and produced a much better module sequence. Privacy first, group learning second.

---

### The Broader Lesson

When you design learning to produce useful things rather than to produce learned people, you get both. The engineers became more capable *and* built things the team needed. That's not a coincidence — it's what happens when the incentive (build something real) aligns with the outcome (get better at building things).
