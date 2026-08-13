---
layout: page
title: "Case Study 04 — Running a Game Server Like Production"
permalink: /case-studies/game-server-sre-experiment/
description: "Case study: What a self-hosted game server chaos test revealed about health-check depth and restart policies — SRE discipline applied outside enterprise delivery."
---

<div style="background:linear-gradient(135deg,rgba(13,148,136,.08) 0%,rgba(37,99,235,.06) 100%);border:1px solid #0d948840;border-radius:12px;padding:1.5rem;margin-bottom:2rem;display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;text-align:center">
  <div><div style="font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;color:#0d9488">10x</div><div style="font-size:12px;color:#64748b;margin-top:4px">Gap between shallow and true MTTR</div></div>
  <div><div style="font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;color:#0d9488">3s → 32s</div><div style="font-size:12px;color:#64748b;margin-top:4px">Reported vs. real recovery time</div></div>
  <div><div style="font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;color:#0d9488">0</div><div style="font-size:12px;color:#64748b;margin-top:4px">Production incidents — this was deliberate</div></div>
</div>

# Case Study 04 — Running a Game Server Like Production

**Domain:** Personal project · SRE · Chaos Engineering
**Timeline:** One weekend
**Role:** Sole builder — provisioning through postmortem

---

## The Situation

I've spent 12+ years building SRE discipline inside enterprise delivery — SLOs, incident command, observability, all in service of client platforms I didn't choose and can't fully show. I wanted a project I fully owned, end to end, that would prove the discipline itself — not the account — is what transfers.

I picked a domain I actually care about outside of work: I've been a gamer since childhood, and live-service game infrastructure has the same hard problem enterprise SRE does — staying up when it matters, recovering fast when it doesn't. So I built a self-hosted Valheim dedicated server, wired it with the same observability stack I'd put behind a production account, and ran a real chaos test against it.

---

## What I Tried First — and Why It Didn't Work

My first health check was the obvious one: poll the game server's supervisor endpoint after a simulated failure, and call it recovered the moment that endpoint responds. Fast, simple, green light in 3 seconds.

That number was technically true and practically useless. The supervisor process responding doesn't mean the game world has finished loading — it means the container's process manager is alive. I'd built a shallow check and mistaken it for a real one.

---

## The Actual Problem

Two separate issues surfaced once I actually ran the chaos test, not just designed it on paper.

**First:** I'd configured the container with `restart: unless-stopped`, assuming that covered recovery. It doesn't — Docker's restart policies only trigger on *crashes*, a process dying on its own. A deliberate kill (simulating an operator or orchestrator-triggered failure) is treated as intentional, so the policy correctly does *not* auto-restart it. My "self-healing" setup had a real gap: recovering from anything other than a spontaneous crash needed an explicit remediation step.

**Second, and more interesting:** even after I added that remediation step, my chaos-test script reported recovery in 3 seconds — because it was checking process liveness, not service readiness. The real signal — "Game server connected" in the server's own log — didn't appear until 32 seconds after the kill. A 10x gap between "the process responded" and "a player could actually get in."

---

## The Approach

**The judgment call that mattered most:** deciding which signal counts as "recovered" at all. The fast number was flattering and it was wrong. I rebuilt the health check to parse the server's actual running state instead of trusting a 200 response from a supervisor endpoint, and I rewrote the chaos-test script to explicitly trigger remediation rather than assume a restart policy would cover it.

- Provisioned the server with Terraform (DigitalOcean, region chosen for latency)
- Configured the host with Ansible — hardening, Docker, deployment
- Built the observability stack: Prometheus, a custom exporter, Grafana, all auto-provisioned on container start
- Set an explicit SLO: 99.5% availability, sub-200ms join latency, 90% tick-rate floor — and treated tick-rate and join-latency as first-class, not just uptime, because a laggy-but-up server is functionally down for players
- Ran a real chaos test: killed the process, measured recovery against both the shallow check and the real one, and let the gap between them become the finding

---

## The Outcome

| Metric | Shallow check | Real check |
|---|---|---|
| Recovery signal | Supervisor HTTP 200 | "Game server connected" in server log |
| MTTR | 3s | 32s |
| What it actually proved | Process manager alive | Service usable by a player |

The restart-policy gap and the health-check depth gap were both things I would have designed around in an enterprise context without a second thought — they're standard SRE pitfalls. Finding them myself, on infrastructure I built and broke on purpose, was the point.

---

## What I'd Do Differently

I'd build the deep health check in from the start instead of retrofitting it after noticing the shallow one lied to me. I'd also test the restart-policy assumption before the chaos test, not during it — that's a config review question, not a live-fire discovery. And a few of the dashboard metrics (tick rate, join latency, player count) are currently synthetic placeholders rather than real measurements; wiring those up properly is the natural next iteration.

---

*Repo: [github.com/devcoderbyte/game-server-sre](https://github.com/devcoderbyte/game-server-sre)*
