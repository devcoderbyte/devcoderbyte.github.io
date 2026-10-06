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
    <div class="domain-desc">Three-layer containment: shift-left in sprint planning, automated gates in CI/CD, AI-assisted anomaly detection in pre-prod.</div>
    <div class="domain-arrow">Explore →</div>
  </a>
</div>

<div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:1.25rem;margin:1.5rem 0">
  <div style="font-size:11px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;font-family:'JetBrains Mono',monospace;margin-bottom:.5rem">From production · T-Mobile</div>
  <p style="margin:0"><strong>Splunk alert noise cleanup, ~80,000 alerts.</strong> We reviewed roughly 80,000 application and infrastructure alerts, filtered out the noise, and kept only the alerts that mattered at the middleware level.</p>
  <!-- TODO (Rajendra): add how many alerts you kept, what "mattered at middleware level" meant (e.g. queue depth, connection pools, gateway errors), how you decided what to cut, and what changed afterwards (pages per on-call shift, MTTD). -->
</div>

> Good observability is invisible when it's working. The moment a client asks "what's the status?" — observability has already failed.
