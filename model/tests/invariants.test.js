// Rules that must always hold, checked on 300 random scenarios. Run: node model/tests/invariants.test.js CALIBRATION_JSON
const M = require('../../tools/ai-roi-model.js');
const cal = require(require('path').resolve(process.argv[2]));
const TYPES = Object.keys(cal.ai.types);
const rnd = M.rngFrom(99);
let pass = 0, fail = 0;
const ok = (cond, msg) => { if (cond) pass++; else { fail++; if (fail <= 10) console.log('FAIL:', msg); } };
const randDec = () => ({ enabled: TYPES.filter(() => rnd() < 0.7), discount: rnd() * 0.3, rampMonths: 1 + Math.floor(rnd() * 12),
  term: 12 + Math.floor(rnd() * 36), discountRate: rnd() * 0.15, setup: rnd() * 50000, seniorReviewShare: rnd() });
const draw = () => { const u = {}; return (k, r) => { if (!(k in u)) u[k] = rnd(); return M.tri(u[k], r[0], r[1], r[2]); }; };
const run = (dec, pick, tweak) => { const U = M.uncertain(cal, dec.enabled), p = M.pointInputs(cal, dec, U, pick); if (tweak) tweak(p);
  return { base: M.project(cal, p, false), ai: M.project(cal, p, true) }; };

for (let i = 0; i < 300; i++) {
  const dec = randDec(), pick = draw();
  // 1. zero agents = today, exactly
  const z = run(Object.assign({}, dec, { enabled: [] }), pick);
  ok(Math.abs(z.ai.npv - z.base.npv) < 1e-6, 'no automation must equal today #' + i);
  const z2 = run(dec, pick, p => { for (const k in p.auto) p.auto[k] = 0; });
  ok(Math.abs(z2.ai.npv - z2.base.npv) < 1e-6, 'automation rate 0 must equal today #' + i);
  if (!dec.enabled.length) continue;
  const b = run(dec, pick);
  // 2. things that can only cost money never raise AI profit
  const worse = {
    'higher error rate': p => { for (const k in p.err) p.err[k] = Math.min(1, p.err[k] * 1.5 + 0.01); },
    'more review minutes': p => { for (const k in p.review) p.review[k] *= 1.5; },
    'higher token cost': p => { for (const k in p.token) p.token[k] *= 2; },
    'higher escaped-error cost': p => { p.escCost *= 2; },
    'bigger discount': p => { p.discount = Math.min(1, p.discount + 0.05); },
    'bigger AI renewal cut': p => { p.erosionAI = Math.min(1, p.erosionAI + 0.05); },
    'more escapes breaching SLA': p => { p.escapeBreach = Math.min(1, p.escapeBreach + 0.2); },
  };
  for (const [name, f] of Object.entries(worse)) {
    const w = run(dec, pick, f);
    ok(w.ai.npv <= b.ai.npv + 1e-6, name + ' raised AI NPV #' + i);
    w.ai.months.forEach((m, t) => ok(m.profit <= b.ai.months[t].profit + 1e-6, name + ' raised profit in month ' + t + ' #' + i));
  }
  // 3. sanity bounds
  b.ai.months.forEach(m => { ok(m.credits >= -1e-9 && m.credits <= 0.10 * cal.contract.monthly_fee + 1e-6, 'credits out of range');
    ok(m.fte.senior >= 1 || m.agentTickets === 0, 'agents need at least one senior'); ok(isFinite(m.profit), 'profit not finite'); });
}
// 4. Monte Carlo is reproducible
const d = { enabled: TYPES, discount: 0.1, rampMonths: 6, term: 36, discountRate: 0.1, setup: 23000, seniorReviewShare: 0.6 };
const a1 = M.monteCarlo(cal, d, 300, 5), a2 = M.monteCarlo(cal, d, 300, 5);
ok(a1.p50 === a2.p50 && a1.probBeat === a2.probBeat, 'Monte Carlo not reproducible with the same seed');
ok(a1.p10 <= a1.p50 && a1.p50 <= a1.p90, 'percentiles out of order');
console.log(`invariants: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
