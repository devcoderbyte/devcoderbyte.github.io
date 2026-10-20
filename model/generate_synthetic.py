"""Generate a synthetic managed-service account: 12 months of raw exports.

Everything here is invented. The "truth" parameters live only in this file;
fit.py never reads them, it only sees the CSV/JSON exports, the same way it
would see a real client's sanitised data.

Usage: python3 generate_synthetic.py OUT_DIR
"""
import json, sys, os
import numpy as np
import pandas as pd

rng = np.random.default_rng(20261019)
OUT = sys.argv[1]
os.makedirs(OUT, exist_ok=True)

MONTHS = pd.period_range('2025-10', '2026-09', freq='M')
# --- hidden truth -----------------------------------------------------------
TYPES = {
  # type: priority, base volume/month, median handle h, sigma, reopen p, junior share
  'access_request': dict(pri='P4', vol=300, med=0.30, sig=0.45, reopen=0.03, junior=0.95),
  'alert_triage':   dict(pri='P3', vol=260, med=0.45, sig=0.50, reopen=0.05, junior=0.90),
  'std_change':     dict(pri='P4', vol=105, med=1.40, sig=0.45, reopen=0.06, junior=0.75),
  'data_fix':       dict(pri='P3', vol=135, med=0.90, sig=0.50, reopen=0.08, junior=0.80),
  'report_request': dict(pri='P4', vol=50,  med=1.80, sig=0.40, reopen=0.04, junior=0.70),
  'p3_incident':    dict(pri='P3', vol=68,  med=2.80, sig=0.55, reopen=0.10, junior=0.45),
  'p2_incident':    dict(pri='P2', vol=16,  med=5.50, sig=0.50, reopen=0.12, junior=0.15),
  'p1_incident':    dict(pri='P1', vol=2,   med=10.0, sig=0.45, reopen=0.10, junior=0.0),
  'problem_rca':    dict(pri='P3', vol=7,   med=9.0,  sig=0.40, reopen=0.0,  junior=0.10),
}
SLA_H = {'P1': 2, 'P2': 4, 'P3': 24, 'P4': 48}           # resolution targets (hours)
WAIT = {'P1': 0.7, 'P2': 1.6, 'P3': 6.5, 'P4': 14.0}      # median queue + elapsed (hours)
REWORK_FRACTION = 0.45                                     # extra effort when reopened
GROWTH = 0.012                                             # monthly volume growth
SEASON = np.array([1.00, 1.03, 0.92, 0.97, 1.02, 1.05, 1.00, 0.98, 1.04, 1.06, 0.96, 1.01])
COST = {'junior': 3200, 'senior': 5200}                    # loaded cost / month
BILL = {'junior': 4300, 'senior': 7400}                    # for T&M reference only
FEE = 56000
OVERHEAD = 1200                                            # tools, licences
PAID_HOURS = 160
HEADCOUNT = [(6, 4)] * 6 + [(5, 4)] + [(6, 4)] * 5         # (junior, senior) by month
OVERTIME_RATE = 1.5

# --- tickets ----------------------------------------------------------------
rows, tid = [], 100000
for mi, m in enumerate(MONTHS):
    start = m.start_time
    days = m.days_in_month
    for t, p in TYPES.items():
        lam = p['vol'] * (1 + GROWTH) ** mi * SEASON[mi]
        n = rng.poisson(lam)
        for _ in range(n):
            tid += 1
            opened = start + pd.Timedelta(seconds=int(rng.uniform(0, days * 86400)))
            effort = float(np.round(rng.lognormal(np.log(p['med']), p['sig']), 2))
            reopened = rng.random() < p['reopen']
            if reopened:
                effort = round(effort * (1 + REWORK_FRACTION * rng.uniform(0.6, 1.4)), 2)
            elapsed = rng.lognormal(np.log(WAIT[p['pri']]), 0.65) + effort
            resolved = opened + pd.Timedelta(hours=float(elapsed))
            level = 'junior' if rng.random() < p['junior'] else 'senior'
            rows.append(dict(ticket_id=f'T{tid}', category=t, priority=p['pri'],
                             opened_at=opened.isoformat(), resolved_at=resolved.isoformat(),
                             effort_hours=effort, assignee_level=level,
                             reopened=int(reopened),
                             sla_breached=int(elapsed > SLA_H[p['pri']])))
tickets = pd.DataFrame(rows)
tickets.to_csv(f'{OUT}/tickets.csv', index=False)

# --- timesheets & P&L ----------------------------------------------------------
tickets['month'] = pd.to_datetime(tickets.opened_at).dt.to_period('M')
ts_rows, pl_rows = [], []
for mi, m in enumerate(MONTHS):
    nj, ns = HEADCOUNT[mi]
    tm = tickets[tickets.month == m]
    hrs = tm.groupby('assignee_level').effort_hours.sum()
    for lvl, n in (('junior', nj), ('senior', ns)):
        ticket_h = float(hrs.get(lvl, 0.0))
        paid = n * PAID_HOURS
        # non-ticket time: meetings, docs, on-call, training (~30% of paid)
        other = paid * rng.uniform(0.27, 0.33)
        overtime = max(0.0, ticket_h + other - paid)
        ts_rows.append(dict(month=str(m), level=lvl, headcount=n, paid_hours=paid,
                            ticket_hours=round(ticket_h, 1), other_hours=round(other, 1),
                            overtime_hours=round(overtime, 1)))
    ts = [r for r in ts_rows if r['month'] == str(m)]
    staff = sum(COST[r['level']] * r['headcount'] for r in ts)
    ot_cost = sum(COST[r['level']] / PAID_HOURS * OVERTIME_RATE * r['overtime_hours'] for r in ts)
    met = 1 - tm.sla_breached.mean()
    credit = FEE * (0.10 if met < 0.90 else 0.05 if met < 0.95 else 0.0)
    misc = rng.normal(0, 350)                                   # unexplained noise
    revenue = FEE - credit
    cost = staff + ot_cost + OVERHEAD + misc
    pl_rows.append(dict(month=str(m), revenue=round(revenue, 2), service_credits=round(credit, 2),
                        staff_cost=round(staff, 2), overtime_cost=round(ot_cost, 2),
                        tools_overhead=OVERHEAD, other_cost=round(misc, 2),
                        delivery_cost=round(cost, 2), gross_profit=round(revenue - cost, 2)))
pd.DataFrame(ts_rows).to_csv(f'{OUT}/timesheets.csv', index=False)
pd.DataFrame(pl_rows).to_csv(f'{OUT}/pnl_monthly.csv', index=False)
pd.DataFrame([dict(level=k, monthly_cost=COST[k], monthly_bill_rate=BILL[k], paid_hours=PAID_HOURS)
              for k in COST]).to_csv(f'{OUT}/rate_card.csv', index=False)

json.dump(dict(pricing_model='fixed_monthly_fee', monthly_fee=FEE, term_months=36,
               renewal='annual price review', sla_resolution_hours=SLA_H,
               sla_target_pct=95,
               service_credits=[dict(below_pct=95, credit_pct_of_fee=5), dict(below_pct=90, credit_pct_of_fee=10)],
               overtime_multiplier=OVERTIME_RATE),
          open(f'{OUT}/contract.json', 'w'), indent=2)

# --- incident costs ------------------------------------------------------------
inc = tickets[tickets.category.isin(['p1_incident', 'p2_incident', 'p3_incident'])].sample(60, random_state=7)
cost_by = {'P1': (9000, 0.5), 'P2': (2500, 0.6), 'P3': (450, 0.7)}
inc_rows = []
for _, r in inc.iterrows():
    mu, s = cost_by[r.priority]
    inc_rows.append(dict(ticket_id=r.ticket_id, priority=r.priority,
                         remediation_cost=round(float(rng.lognormal(np.log(mu), s)), 0),
                         client_credit=round(float(rng.lognormal(np.log(mu * 0.4), s)) if r.sla_breached else 0.0, 0)))
pd.DataFrame(inc_rows).to_csv(f'{OUT}/incident_costs.csv', index=False)

# --- AI pilot (Jul-Sep 2026) on four task types -------------------------------
PILOT_TRUTH = {
  # type: attempt share, error rate, review min median, tokens in/out medians
  'access_request': dict(attempt=0.80, err=0.03, rev=2.5, tin=6000,  tout=700),
  'alert_triage':   dict(attempt=0.65, err=0.08, rev=6.0, tin=18000, tout=1500),
  'std_change':     dict(attempt=0.45, err=0.12, rev=14.0, tin=25000, tout=2500),
  'data_fix':       dict(attempt=0.55, err=0.09, rev=9.0, tin=15000, tout=1800),
}
CATCH = {'evals_guardrails_review': 0.88}
PRICE_IN, PRICE_OUT = 4.0, 20.0   # $/MTok
pilot = tickets[(tickets.month >= pd.Period('2026-07', 'M')) & tickets.category.isin(PILOT_TRUTH)]
pr = []
for _, r in pilot.iterrows():
    t = PILOT_TRUTH[r.category]
    if rng.random() >= t['attempt']:
        continue
    tin = int(rng.lognormal(np.log(t['tin']), 0.45)); tout = int(rng.lognormal(np.log(t['tout']), 0.5))
    wrong = rng.random() < t['err']
    caught = wrong and rng.random() < CATCH['evals_guardrails_review']
    pr.append(dict(ticket_id=r.ticket_id, category=r.category, run_at=r.opened_at,
                   tokens_in=tin, tokens_out=tout,
                   token_cost_usd=round(tin / 1e6 * PRICE_IN + tout / 1e6 * PRICE_OUT, 4),
                   eval_passed=int(not caught), guardrail_blocked=int(caught and rng.random() < 0.3),
                   review_minutes=round(float(rng.lognormal(np.log(t['rev']), 0.5)), 1),
                   human_redo=int(caught), escaped_to_client=int(wrong and not caught)))
pd.DataFrame(pr).to_csv(f'{OUT}/ai_pilot_runs.csv', index=False)
json.dump(dict(model='claude-opus-5-5', price_in_per_mtok=PRICE_IN, price_out_per_mtok=PRICE_OUT,
               platform_fee_month=600, eval_runs_month=400, guardrail_overhead_pct=15,
               pilot_months=['2026-07', '2026-08', '2026-09']),
          open(f'{OUT}/ai_pilot_meta.json', 'w'), indent=2)
print('wrote', OUT, len(tickets), 'tickets,', len(pr), 'pilot runs')
