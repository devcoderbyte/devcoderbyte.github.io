# Delivery Pulse — Rajendra Birudaraju

> Enterprise delivery, minus the toil — AI-native frameworks from the frontlines

This is my professional portfolio site, built on GitHub Pages with Jekyll. It documents the frameworks I've designed, the AI workflows I've built, and the delivery systems I've run in production across 10+ years of enterprise program management.

**Live site:** [rajendrab.github.io/delivery-pulse](https://rajendrab.github.io/delivery-pulse)

---

## Structure

```
delivery-pulse/
├── index.md                          # Homepage
├── _config.yml                       # Jekyll config
├── ai-in-delivery/
│   ├── index.md                      # Section overview
│   ├── llm-workflow-library.md       # 4 production LLM workflows
│   ├── ai-adoption-framework.md      # Explorer → Practitioner → Champion
│   └── toil-elimination-playbook.md  # Audit-first toil reduction
├── presales-practice/
│   ├── index.md
│   ├── sow-design-framework.md       # 7-section SOW structure
│   ├── bid-strategy-methodology.md   # 5-question bid framework
│   └── rfq-workflow.md               # AI-assisted RFQ process
├── sre-observability/
│   ├── index.md
│   ├── slo-sli-framework.md          # Client-first SLO design
│   └── dashboard-design.md           # 5 dashboard principles
├── delivery-governance/
│   ├── index.md
│   ├── cadence-model.md              # 4-layer governance cadence
│   ├── cmmi-workflow.md              # CMMI L5 ticket workflow
│   └── escalation-framework.md      # Escalation decision tree
└── case-studies/
    ├── index.md
    ├── sla-breach-reduction.md       # 20% SLA breach reduction
    ├── bid-conversion-lift.md        # 25% bid conversion lift
    └── devops-upskilling.md          # DevOps capability platform
```

---

## How to Run Locally

```bash
gem install jekyll bundler
bundle init
bundle add jekyll minima jekyll-feed jekyll-seo-tag
bundle exec jekyll serve
```

Open [http://localhost:4000/delivery-pulse](http://localhost:4000/delivery-pulse)

---

## How to Deploy

1. Push to GitHub repo named `yourusername.github.io` or any repo name
2. Go to repo Settings → Pages → Source: Deploy from branch → main
3. Site goes live at `https://yourusername.github.io/repo-name`
4. Optional: add custom domain in Pages settings → point your domain's CNAME to `yourusername.github.io`

---

## Contact

**Rajendra Birudaraju**  
Technical Program Manager & Presales Lead  
Hyderabad, India  
[linkedin.com/in/rajendrabirudaraju](https://linkedin.com/in/rajendrabirudaraju)  
birudarajurajendra@gmail.com
