// Pre-register a forecast for a production rollout, before any production data exists.
// Run: node model/forecast.js CALIBRATION_JSON OUT_JSON
const fs = require('fs'), crypto = require('crypto'), path = require('path');
const M = require('../tools/ai-roi-model.js');
const calPath = path.resolve(process.argv[2]), cal = require(calPath);
const enabled = Object.keys(cal.ai.types), months = 3, n = 4000;
const dec = { enabled, discount: 0, rampMonths: 1, term: months, discountRate: 0, setup: 0, seniorReviewShare: 0.6 };
const U = M.uncertain(cal, enabled), rnd = M.rngFrom(2026), keys = Object.keys(U.assumed).concat(Object.keys(U.fitted));
const metrics = { agent_tickets: [], errors_caught: [], escaped_errors: [], review_hours: [], token_cost_usd: [], human_ticket_hours: [] };
for (let i = 0; i < n; i++) {
  const u = {}; keys.forEach(k => { u[k] = rnd(); });
  const p = M.pointInputs(cal, dec, U, (k, r) => M.tri(u[k], r[0], r[1], r[2]));
  const s = { agent_tickets: 0, errors_caught: 0, escaped_errors: 0, review_hours: 0, token_cost_usd: 0, human_ticket_hours: 0 };
  for (let t = 0; t < months; t++) {
    const m = M.month(cal, p, t, true);
    s.agent_tickets += m.agentTickets; s.errors_caught += m.caught; s.escaped_errors += m.escaped;
    s.review_hours += m.reviewHours; s.token_cost_usd += m.tokenCost; s.human_ticket_hours += m.hours.junior + m.hours.senior - m.reviewHours;
  }
  for (const k in s) metrics[k].push(s[k]);
}
const pct = (a, p) => { const s = a.slice().sort((x, y) => x - y), i = (s.length - 1) * p, lo = Math.floor(i); return s[lo] + (s[Math.ceil(i)] - s[lo]) * (i - lo); };
const out = { kind: 'pre-registered forecast', created_at: new Date().toISOString(),
  scope: 'Production rollout of ' + enabled.join(', ') + ' for the 3 months after the calibration period. Totals over the 3 months.',
  calibration_sha256: crypto.createHash('sha256').update(fs.readFileSync(calPath)).digest('hex'),
  model_sha256: crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname, '../tools/ai-roi-model.js'))).digest('hex'),
  simulations: n, forecast: {} };
for (const k in metrics) out.forecast[k] = { p10: +pct(metrics[k], 0.1).toFixed(1), p50: +pct(metrics[k], 0.5).toFixed(1), p90: +pct(metrics[k], 0.9).toFixed(1) };
fs.writeFileSync(process.argv[3], JSON.stringify(out, null, 1));
const sha = crypto.createHash('sha256').update(fs.readFileSync(process.argv[3])).digest('hex');
console.log('forecast written', process.argv[3], '\nsha256', sha);
for (const k in out.forecast) console.log(k.padEnd(20), JSON.stringify(out.forecast[k]));
