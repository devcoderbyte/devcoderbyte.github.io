---
layout: page
title: "Case Study 05 — 200+ Microservices, PCF to Kubernetes"
permalink: /case-studies/pcf-to-kubernetes-migration/
description: "Case study: Leading the offshore delivery of a 200+ microservice migration from Pivotal Cloud Foundry to Kubernetes (TKE) for a telecom supply-chain platform, across 4 development verticals in 12 months."
---

<div style="background:linear-gradient(135deg,rgba(13,148,136,.08) 0%,rgba(37,99,235,.06) 100%);border:1px solid #0d948840;border-radius:12px;padding:1.5rem;margin-bottom:2rem;display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;text-align:center">
  <div><div style="font-family:var(--font-display);font-size:2rem;font-weight:600;color:#0d9488">200+</div><div style="font-size:12px;color:#64748b;margin-top:4px">Microservices migrated</div></div>
  <div><div style="font-family:var(--font-display);font-size:2rem;font-weight:600;color:#0d9488">12 mo</div><div style="font-size:12px;color:#64748b;margin-top:4px">Onboarding to PCF decommission</div></div>
  <div><div style="font-family:var(--font-display);font-size:2rem;font-weight:600;color:#0d9488">35%</div><div style="font-size:12px;color:#64748b;margin-top:4px">Less debugging time (version-tracking tool)</div></div>
</div>

# Case Study 05 — 200+ Microservices, PCF to Kubernetes

**Domain:** Telecom · Supply chain · Cloud migration · DevOps<br>
**Timeline:** 12 months<br>
**Role:** Senior Technical Lead (acting TPM): offshore delivery owner, working with 4 onshore development verticals
{: .case-meta}

---

## The Situation

I took over the offshore team on a large telecom account during a leadership handover; the outgoing lead helped with the transition before moving on. The first big thing I was asked to deliver was cloud modernization: move the supply-chain platform's microservices off Pivotal Cloud Foundry (PCF) and onto Kubernetes (TKE).

There were more than 200 services, owned by four different onshore development verticals. Each vertical had its own release schedule and its own idea of what "done" looked like. My team owned the offshore side of the migration, which meant onboarding each service, moving it, proving it was stable, and only then retiring the PCF version.

Once the project was confirmed, we onboarded five engineers by mid-March, each with a defined ramp-up path so they could contribute to migrations quickly.

---

## What Had to Change Under the Hood

PCF hides a lot from developers: you push code and the platform handles the rest. Kubernetes doesn't. So most of the work was rebuilding what PCF used to do for free, as standard building blocks every service could reuse:

- **Containers.** Every service was packaged as a Docker image instead of a PCF buildpack push.
- **GitOps deployments.** Deployment configs moved from Bitbucket into GitOps-managed GitLab, so the repo became the record of what was running. Rollback meant reverting a commit, not a manual redeploy.
- **Secrets.** Credentials moved into HashiCorp Vault instead of living in platform environment variables.
- **Availability during maintenance.** Pod disruption budgets were set so node drains and upgrades couldn't take out every replica of a service at once.
- **Traffic.** Services were integrated with the client's in-house API gateway (MEG), so consumers didn't have to change how they called them.
- **Compliance.** Every supply-chain vertical was in SOX scope. Access was limited to the engineers assigned to each piece of work, so each of them had to be able to answer for it in an audit.
- **Data layer.** Services sat on PostgreSQL, MySQL and Redis. Schema and query performance were checked in design reviews before cutover, not after.

---

## How Each Service Moved

Every service went through the same lifecycle. With 200+ services, a repeatable sequence mattered more than any single clever fix.

1. **Onboard:** agree scope and the cutover window with the owning vertical.
2. **Migrate:** containerise it, set up the GitOps config, move secrets to Vault, route it through the gateway.
3. **Validate:** UAT and test scenarios with the vertical, then cutover under release management.
4. **Run in parallel:** keep the PCF version alive until the TKE version was proven stable.
5. **Decommission:** retire the PCF service only after that sign-off.

The last step is the one teams often skip. Leaving old PCF services running "just in case" keeps the cost and the confusion. Decommissioning was part of the definition of done.

---

## Problems Along the Way

During the migration, many services ran on PCF and TKE at the same time, at different versions. Working out what was actually deployed where became a real drag on debugging. The team built an internal version-tracking tool to answer that question in one place. It cut debugging time by about 35% and was later adopted as the standard across the organisation.

The same period doubled as the team's DevOps upskilling. Application-operations engineers learned Kubernetes and GitOps by migrating real services, not in a sandbox. That story is in [Case Study 03](/case-studies/devops-upskilling/).

---

## The Outcome

| Area | Outcome |
|---|---|
| Services migrated | 200+ microservices, PCF → TKE |
| Duration | 12 months, across 4 onshore development verticals |
| Legacy platform | PCF services decommissioned once validated on TKE |
| Deployment model | GitOps on GitLab (was Bitbucket); secrets in HashiCorp Vault |
| Debugging | ~35% less debugging time from the version-tracking tool |
| Compliance | Access management and SOX controls maintained; evidence provided for external audit |

---

## My Part vs. the Team's

I owned the offshore delivery plan, sequencing with the four verticals, release and cutover coordination, and status and risk reporting to client leadership. The engineers on my team did the containerisation, pipelines and configuration work. My job was to make sure 200 services moved in a predictable way without breaking the supply chain they ran.

---

## What I'd Do Differently

Lock the decommission criteria with every vertical on day one, and build the version-tracking tool in month one instead of when the pain showed up.

---

## Related Work on the Same Account

On the same account I also worked on a multi-site disaster-recovery design with automated failover across data centres, and on consolidating internal, third-party and B2B API traffic from on-prem and SaaS gateways onto one enterprise gateway.
