---
layout: page
title: SRE & Observability
permalink: /sre-observability/
description: "SRE and observability frameworks — SLO/SLI integration, dashboard design, and defect containment from production use."
---

<p style="color:var(--muted);font-size:15px;margin-bottom:2rem">Frameworks for designing and running observability systems, SLO/SLI programs, and defect containment models. Built on SRE principles, extended with AI-assisted tooling.</p>

<div class="domain-grid">
  <a class="domain-card" href="/sre-observability/slo-sli-framework/">
    <div class="domain-icon">🎯</div>
    <div class="domain-title">SLO/SLI Integration Framework</div>
    <div class="domain-desc">How I design SLO programs as client trust tools — with the real client conversations that shaped the approach.</div>
    <div class="domain-arrow">Explore →</div>
  </a>
  <a class="domain-card" href="/sre-observability/dashboard-design/">
    <div class="domain-icon">📊</div>
    <div class="domain-title">Dashboard Design Principles</div>
    <div class="domain-desc">Five principles for designing Splunk and Grafana dashboards for different audiences — ops teams, delivery leads, and executive stakeholders.</div>
    <div class="domain-arrow">Explore →</div>
  </a>
  <a class="domain-card" href="/sre-observability/defect-containment/">
    <div class="domain-icon">🛡️</div>
    <div class="domain-title">Defect Containment Model</div>
    <div class="domain-desc">Three-layer containment: shift-left in sprint planning, automated gates in CI/CD, synthetic monitoring and release checks in pre-prod.</div>
    <div class="domain-arrow">Explore →</div>
  </a>
</div>

<div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:1.25rem;margin:1.5rem 0">
  <div style="font-size:11px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;font-family:'JetBrains Mono',monospace;margin-bottom:.5rem">From production · T-Mobile</div>
  <p style="margin:0"><strong>Splunk alert noise cleanup: ~80,000 → ~5,000 alerts.</strong> As the middleware operations team, we couldn't delete an alert on our own judgment. Every alert went to the owning dev team for sign-off: was this check on a metric, response time or 4xx/5xx rate still needed, or had a recent release replaced it? We drove the review and pushed the dev teams for quick decisions, then executed them. About 5,000 alerts survived, a cut of around 94%.</p>
</div>

> Good observability is invisible when it's working. The moment a client asks "what's the status?" — observability has already failed.
