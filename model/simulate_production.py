"""Simulate 3 months of production after the pilot, with drift the model was NOT told about.
Writes production_tickets.csv and production_runs.csv. Usage: python3 simulate_production.py OUT_DIR"""
import sys, numpy as np, pandas as pd
import importlib.util
OUT = sys.argv[1]
spec = importlib.util.spec_from_file_location('g', __file__.replace('simulate_production.py', 'generate_synthetic.py'))
src = open(spec.origin).read().split('# --- tickets')[0]          # reuse the hidden truth only
g = {}; exec(src.replace("OUT = sys.argv[1]", "OUT = '/dev/null'").replace("os.makedirs(OUT, exist_ok=True)", ""), g)
rng = np.random.default_rng(777)
DRIFT = dict(attempt=0.93, err=1.35, review=1.15, tokens=1.10, catch=0.85)   # hidden from the model
TRUTH = {'access_request': (0.80, 0.03, 2.5, 6000, 700), 'alert_triage': (0.65, 0.08, 6.0, 18000, 1500),
         'std_change': (0.45, 0.12, 14.0, 25000, 2500), 'data_fix': (0.55, 0.09, 9.0, 15000, 1800)}
tk, runs = [], []
for mi in range(12, 15):
    for t, p in g['TYPES'].items():
        n = rng.poisson(p['vol'] * (1 + g['GROWTH']) ** mi)
        for _ in range(n):
            eff = float(rng.lognormal(np.log(p['med']), p['sig']))
            if rng.random() < p['reopen']: eff *= 1 + g['REWORK_FRACTION'] * rng.uniform(0.6, 1.4)
            agent = t in TRUTH and rng.random() < TRUTH[t][0] * DRIFT['attempt']
            human_h = eff
            if agent:
                a, e, rv, ti, to = TRUTH[t]
                wrong = rng.random() < e * DRIFT['err']; caught = wrong and rng.random() < DRIFT['catch']
                tin = rng.lognormal(np.log(ti * DRIFT['tokens']), 0.45); tout = rng.lognormal(np.log(to * DRIFT['tokens']), 0.5)
                runs.append(dict(month=mi, category=t, review_minutes=float(rng.lognormal(np.log(rv * DRIFT['review']), 0.5)),
                                 token_cost_usd=tin / 1e6 * 4 + tout / 1e6 * 20, human_redo=int(caught), escaped_to_client=int(wrong and not caught)))
                human_h = eff if caught else 0.0
            tk.append(dict(month=mi, category=t, human_effort_hours=round(human_h, 3), handled_by_agent=int(agent)))
pd.DataFrame(tk).to_csv(f'{OUT}/production_tickets.csv', index=False)
pd.DataFrame(runs).to_csv(f'{OUT}/production_runs.csv', index=False)
print('production: tickets', len(tk), 'agent runs', len(runs))
