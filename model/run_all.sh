#!/usr/bin/env bash
# Rebuild the calibration and run every proof. Usage: model/run_all.sh [DATA_DIR]
# With no DATA_DIR, a synthetic account is generated into a temp folder (nothing raw is kept in the repo).
set -euo pipefail
cd "$(dirname "$0")/.."
DATA="${1:-$(mktemp -d)}"
if [ -z "${1:-}" ]; then python3 model/generate_synthetic.py "$DATA"; fi
python3 model/fit.py "$DATA" "$DATA/calibration.json"
echo; echo "== Backtest (AI off) =="
node -e "const M=require('./tools/ai-roi-model.js'),b=M.backtest(require('$DATA/calibration.json'));
const f=x=>(x*100).toFixed(2)+'%';console.log('hours',f(b.mapeHours),'revenue',f(b.mapeRevenue),'cost',f(b.mapeCost),'worst month cost',f(b.maxMonthlyCostErr),'12-mo profit',f(b.totalProfitErr));
process.exit([b.mapeHours,b.mapeRevenue,b.mapeCost,b.totalProfitErr].every(x=>x<=0.05)?0:1)"
echo; echo "== Invariants =="; node model/tests/invariants.test.js "$DATA/calibration.json"
echo; echo "== Reference cases (spreadsheet) =="; python3 model/tests/reference_cases.py | tail -1
echo; echo "== Pre-registered forecast score =="
if [ -f "$DATA/production_runs.csv" ] || [ -z "${1:-}" ]; then
  [ -f "$DATA/production_runs.csv" ] || python3 model/simulate_production.py "$DATA"
  python3 model/score_forecast.py model/forecasts/2026-q4-production-forecast.json "$DATA" model/forecasts/2026-q4-production-score.json | tail -1
fi
node model/publish.js "$DATA/calibration.json" model/forecasts/2026-q4-production-score.json
