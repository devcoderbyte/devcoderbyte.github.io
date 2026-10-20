"""Score a pre-registered forecast against actuals. Usage: python3 score_forecast.py FORECAST_JSON DATA_DIR"""
import json, sys, hashlib, pandas as pd
F = json.load(open(sys.argv[1])); D = sys.argv[2]
print('forecast sha256', hashlib.sha256(open(sys.argv[1], 'rb').read()).hexdigest()[:16], '| created', F['created_at'])
t = pd.read_csv(f'{D}/production_tickets.csv'); r = pd.read_csv(f'{D}/production_runs.csv')
act = dict(agent_tickets=len(r), errors_caught=int(r.human_redo.sum()), escaped_errors=int(r.escaped_to_client.sum()),
           review_hours=r.review_minutes.sum() / 60, token_cost_usd=r.token_cost_usd.sum(), human_ticket_hours=t.human_effort_hours.sum())
inside = 0
print(f"{'metric':20} {'P10':>9} {'P50':>9} {'P90':>9} {'actual':>9}  {'P50 error':>9}  in 80% band?")
for k, f in F['forecast'].items():
    a = act[k]; ok = bool(f["p10"] <= a <= f["p90"]); inside += ok
    print(f"{k:20} {f['p10']:9.1f} {f['p50']:9.1f} {f['p90']:9.1f} {a:9.1f}  {(a - f['p50']) / f['p50'] * 100:8.1f}%  {'yes' if ok else 'NO'}")
print(f'{inside} of {len(F["forecast"])} actuals inside the 80% band (expect about {0.8 * len(F["forecast"]):.0f} if calibrated)')
if len(sys.argv) > 3:
    json.dump(dict(created_at=F['created_at'], rows=[dict(metric=k, p10=f['p10'], p50=f['p50'], p90=f['p90'], actual=round(float(act[k]), 1))
                   for k, f in F['forecast'].items()], inside=int(inside), total=len(F['forecast'])), open(sys.argv[3], 'w'), indent=1)
