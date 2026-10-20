# AI ROI calculator: Advanced model

Task-level, uncertainty-aware pricing model behind the **Advanced** mode of `/tools/ai-roi-calculator/`.
The model itself is `tools/ai-roi-model.js` (one file, used by both the website and these tests).

## Data it needs (sanitised exports)

| Export | Fields |
|---|---|
| `tickets.csv` | `ticket_id`, `category` (task type), `priority` (P1–P4), `opened_at`, `resolved_at`, `effort_hours`, `assignee_level` (junior/senior), `reopened` (0/1), `sla_breached` (0/1) |
| `timesheets.csv` | `month`, `level`, `headcount`, `paid_hours`, `ticket_hours`, `other_hours`, `overtime_hours` |
| `pnl_monthly.csv` | `month`, `revenue`, `service_credits`, `staff_cost`, `overtime_cost`, `tools_overhead`, `other_cost`, `delivery_cost`, `gross_profit` |
| `rate_card.csv` | `level`, `monthly_cost`, `monthly_bill_rate`, `paid_hours` |
| `contract.json` | `pricing_model`, `monthly_fee`, `term_months`, `sla_resolution_hours` by priority, `sla_target_pct`, `service_credits` tiers, `overtime_multiplier` |
| `incident_costs.csv` | `ticket_id`, `priority`, `remediation_cost`, `client_credit` |
| `ai_pilot_runs.csv` | `ticket_id`, `category`, `run_at`, `tokens_in`, `tokens_out`, `token_cost_usd`, `eval_passed`, `guardrail_blocked`, `review_minutes`, `human_redo`, `escaped_to_client` |
| `ai_pilot_meta.json` | `model`, token prices, `platform_fee_month`, `eval_runs_month`, `guardrail_overhead_pct`, `pilot_months` |

No names, no client identifiers, no free text are needed.

## Pipeline

```
generate_synthetic.py  → raw exports (demo only; replace with real exports)
fit.py                 → calibration.json (aggregates + private monthly history)
publish.js             → tools/ai-roi-calibration.js (aggregates only: no tickets, no monthly P&L)
forecast.js            → forecasts/*.json  (pre-registered, fingerprinted with SHA-256)
score_forecast.py      → scores a forecast against actuals
```

Run everything: `model/run_all.sh` (synthetic) or `model/run_all.sh /path/to/real/exports`.

## Proofs

1. **Backtest:** AI off, real monthly volumes and headcount in; model must reproduce ticket hours, revenue, delivery cost and 12-month profit within 5%.
2. **Reference cases:** `tests/reference_cases.xlsx` works three cases with live spreadsheet formulas; LibreOffice recalculates them and they must match the model within $1. `tests/invariants.test.js` checks rules that must always hold on 300 random scenarios.
3. **Pre-registered forecast:** `forecasts/2026-q4-production-forecast.json` was written before the production data existed. `2026-q4-production-score.json` scores it.

The current calibration is **synthetic**. Proof 3 on synthetic data shows the scoring works, not that the model is right about a real account.
