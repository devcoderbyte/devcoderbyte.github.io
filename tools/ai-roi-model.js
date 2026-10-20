/* Task-level, uncertainty-aware AI delivery model.
 * Used by the Advanced mode of /tools/ai-roi-calculator/ and by the tests in /model.
 * Pure functions only: no DOM access, so Node and the browser run the same code.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.AIModel = factory();
})(this, function () {
  'use strict';

  // ---------- helpers ----------
  function rngFrom(seed) { // mulberry32: small, fast, reproducible
    var a = seed >>> 0;
    return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  }
  function tri(u, lo, mode, hi) { // inverse CDF of a triangular distribution
    if (hi <= lo) return mode;
    var c = (mode - lo) / (hi - lo);
    return u < c ? lo + Math.sqrt(u * (hi - lo) * (mode - lo)) : hi - Math.sqrt((1 - u) * (hi - lo) * (hi - mode));
  }
  function pctl(sorted, p) { var i = (sorted.length - 1) * p, lo = Math.floor(i), hi = Math.ceil(i);
    return sorted[lo] + (sorted[hi] - sorted[lo]) * (i - lo); }
  function normCdf(z) { var t = 1 / (1 + 0.2316419 * Math.abs(z)), d = 0.3989423 * Math.exp(-z * z / 2);
    var p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; }
  function ceilHalf(x) { return Math.ceil(x * 2 - 1e-9) / 2; }

  // ---------- one month ----------
  // p: point inputs (see pointInputs). t: month index from contract start. ai: true for the AI scenario.
  function month(cal, p, t, ai, override) {
    var T = cal.types, cap = cal.capacity, out = { hours: { junior: 0, senior: 0 }, agentTickets: 0, errors: 0, caught: 0, escaped: 0,
      reviewHours: 0, tokenCost: 0, breaches: 0, tickets: 0 };
    var r = !ai ? 0 : p.rampMonths <= 1 ? 1 : Math.min(1, 0.2 + 0.8 * t / (p.rampMonths - 1));
    for (var k in T) {
      var ty = T[k], v = override && override.volumes ? override.volumes[k][t] : ty.volume_month.last3 * Math.pow(1 + p.growth, t);
      var h = ty.handle_hours.mean * p.handleMult, reworkF = 1 + ty.reopen_rate * ty.rework_extra;
      var a = ai && p.auto[k] ? p.auto[k] * r : 0;
      var A = v * a, wrong = A * (ai ? p.err[k] || 0 : 0), caught = wrong * p.catchRate, esc = wrong - caught;
      // escaped errors are costed from incident records (remediation + credits), so no extra hours here
      var work = v * (1 - a) * h * reworkF + caught * h;
      var review = A * (ai ? p.review[k] || 0 : 0) / 60;
      out.hours.junior += work * ty.junior_share_hours + review * (1 - p.seniorReviewShare);
      out.hours.senior += work * (1 - ty.junior_share_hours) + review * p.seniorReviewShare;
      out.agentTickets += A; out.errors += wrong; out.caught += caught; out.escaped += esc; out.reviewHours += review;
      out.tokenCost += A * (ai ? p.token[k] || 0 : 0);
      out.breaches += (v - A + caught) * ty.sla_breach_rate + esc * p.escapeBreach;
      out.tickets += v;
    }
    var staff = 0, overtime = 0; out.fte = {};
    ['junior', 'senior'].forEach(function (l) {
      var c = cap[l], perFte = c.paid_hours * (1 - c.other_share), need = out.hours[l] / perFte;
      var n = override && override.headcount ? override.headcount[l][t] : Math.max(l === 'senior' ? p.minSeniors : 0, ceilHalf(need * (1 + p.buffer)));
      out.fte[l] = n;
      staff += n * c.monthly_cost;
      // expected overtime: non-ticket time varies month to month, and overtime only bites in the busy months
      var sdO = c.other_share_sd || 0, ot = 0, W = [0.0111, 0.0757, 0.2438, 0.3388, 0.2438, 0.0757, 0.0111], Z = [-3, -2, -1, 0, 1, 2, 3];
      for (var j = 0; j < 7; j++) ot += W[j] * Math.max(0, out.hours[l] + (c.other_share + Z[j] * sdO) * c.paid_hours * n - c.paid_hours * n);
      overtime += ot * c.monthly_cost / c.paid_hours * cal.contract.overtime_multiplier;
    });
    var used = ai && out.agentTickets > 0;
    var years = Math.floor(t / 12);
    var fee = cal.contract.monthly_fee * (used ? (1 - p.discount) * Math.pow(1 - p.erosionAI, years) : Math.pow(1 - p.erosionBase, years));
    // expected service credits: breach rate is noisy month to month (fitted sd)
    var br = out.breaches / Math.max(1, out.tickets), sd = cal.sla.breach_rate_sd, credits = 0;
    cal.contract.service_credits.forEach(function (tier, i, arr) {
      var next = arr[i + 1], pBelow = 1 - normCdf(((1 - tier.below_pct / 100) - br) / sd);
      var pNext = next ? 1 - normCdf(((1 - next.below_pct / 100) - br) / sd) : 0;
      credits += fee * tier.credit_pct_of_fee / 100 * (pBelow - pNext);
    });
    var aiCost = used ? out.tokenCost * (1 + p.guardOverhead) + p.platformFee + p.evalRuns : 0;
    var escCost = out.escaped * p.escCost;
    out.breachRate = br; out.revenue = fee - credits; out.credits = credits; out.staff = staff; out.overtime = overtime;
    out.aiCost = aiCost; out.escCost = escCost; out.overhead = cal.overhead_month;
    var other = cal.other_cost ? cal.other_cost.mean : 0;
    out.cost = staff + overtime + cal.overhead_month + other + aiCost + escCost;
    out.profit = out.revenue - out.cost;
    return out;
  }

  // ---------- full contract ----------
  function project(cal, p, ai) {
    var months = [], npv = ai && anyAuto(p) ? -p.setup : 0, total = npv;
    for (var t = 0; t < p.term; t++) {
      var m = month(cal, p, t, ai); months.push(m);
      npv += m.profit / Math.pow(1 + p.discountRate, (t + 1) / 12); total += m.profit;
    }
    return { months: months, npv: npv, total: total, steady: months[Math.min(p.term - 1, 12)] };
  }
  function anyAuto(p) { for (var k in p.auto) if (p.auto[k] > 0) return true; return false; }

  // ---------- inputs ----------
  // Uncertain inputs: [low, likely, high]. Fitted ones come from calibration; the rest are labelled assumptions.
  function uncertain(cal, enabled) {
    var U = { fitted: {}, assumed: {
      autoTransfer: { r: [0.7, 0.9, 1.0], label: 'Pilot → production: automation reached', unit: '×' },
      errTransfer: { r: [0.9, 1.25, 1.8], label: 'Pilot → production: error rate', unit: '×' },
      reviewTransfer: { r: [0.8, 1.0, 1.4], label: 'Pilot → production: review time', unit: '×' },
      tokenTransfer: { r: [0.8, 1.0, 1.5], label: 'Token cost drift (prices, longer prompts)', unit: '×' },
      escapeBreach: { r: [0.2, 0.5, 0.9], label: 'Escaped errors that breach an SLA', unit: 'share' },
      growth: { r: [0, 0.005, 0.017], label: 'Ticket volume growth per month', unit: 'rate' },
      handleMult: { r: [0.95, 1.0, 1.05], label: 'Human handle time vs history', unit: '×' },
      erosionAI: { r: [0.03, 0.08, 0.15], label: 'Renewal price cut, AI-led (client claws back savings)', unit: 'rate' },
      erosionBase: { r: [0, 0.03, 0.05], label: 'Renewal price cut, today\'s model', unit: 'rate' }
    } };
    var ai = cal.ai.types;
    U.fitted.catchRate = { r: cal.ai.catch_rate, label: 'Errors caught by evals + guardrails + review', unit: 'share' };
    var e = cal.escaped_error_cost; U.fitted.escCost = { r: [e.p10, e.median, e.p90], label: 'Cost per escaped error', unit: '$' };
    (enabled || []).forEach(function (k) {
      if (!ai[k]) return;
      U.fitted['auto:' + k] = { r: ai[k].automation_rate, label: k + ': automation rate', unit: 'share', type: k };
      U.fitted['err:' + k] = { r: ai[k].error_rate, label: k + ': error rate', unit: 'share', type: k };
      U.fitted['review:' + k] = { r: ai[k].review_minutes_mean, label: k + ': review minutes', unit: 'min', type: k };
      U.fitted['token:' + k] = { r: ai[k].token_cost_mean, label: k + ': token $ per run', unit: '$', type: k };
    });
    return U;
  }
  // Build point inputs from a pick function (likely values, a draw, or a tornado swing).
  function pointInputs(cal, dec, U, pick) {
    var g = function (key) { var src = U.assumed[key] || U.fitted[key]; return pick(key, src.r); };
    var p = { auto: {}, err: {}, review: {}, token: {} };
    ['growth', 'handleMult', 'erosionAI', 'erosionBase', 'escapeBreach', 'catchRate', 'escCost'].forEach(function (k) { p[k] = g(k); });
    var at = g('autoTransfer'), et = g('errTransfer'), rt = g('reviewTransfer'), tt = g('tokenTransfer');
    (dec.enabled || []).forEach(function (k) {
      if (!U.fitted['auto:' + k]) return;
      p.auto[k] = Math.min(1, g('auto:' + k) * at);
      p.err[k] = Math.min(1, g('err:' + k) * et);
      p.review[k] = g('review:' + k) * rt;
      p.token[k] = g('token:' + k) * tt;
    });
    p.guardOverhead = cal.ai.guardrail_overhead_pct / 100; p.platformFee = cal.ai.platform_fee_month; p.evalRuns = cal.ai.eval_runs_month;
    p.discount = dec.discount; p.rampMonths = dec.rampMonths; p.term = dec.term; p.discountRate = dec.discountRate; p.setup = dec.setup;
    p.seniorReviewShare = dec.seniorReviewShare; p.buffer = dec.buffer || 0; p.minSeniors = dec.minSeniors == null ? 1 : dec.minSeniors;
    return p;
  }
  var likely = function (k, r) { return r[1]; };

  function evaluate(cal, dec, pick) {
    var U = uncertain(cal, dec.enabled), p = pointInputs(cal, dec, U, pick || likely);
    var base = project(cal, p, false), ai = project(cal, p, true);
    return { p: p, base: base, ai: ai, delta: ai.npv - base.npv };
  }

  // ---------- Monte Carlo ----------
  function monteCarlo(cal, dec, n, seed) {
    var U = uncertain(cal, dec.enabled), rnd = rngFrom(seed || 42), keys = Object.keys(U.assumed).concat(Object.keys(U.fitted));
    var d = [], sAI = [], sBase = [];
    for (var i = 0; i < n; i++) {
      var u = {}; keys.forEach(function (k) { u[k] = rnd(); });
      var p = pointInputs(cal, dec, U, function (k, r) { return tri(u[k], r[0], r[1], r[2]); });
      var b = project(cal, p, false), a = project(cal, p, true);
      d.push(a.npv - b.npv); sAI.push(a.steady.profit); sBase.push(b.steady.profit);
    }
    var sd = d.slice().sort(function (x, y) { return x - y; }), sa = sAI.slice().sort(function (x, y) { return x - y; }), sb = sBase.slice().sort(function (x, y) { return x - y; });
    var win = d.filter(function (x) { return x > 0; }).length / n;
    return { n: n, delta: d, p10: pctl(sd, 0.1), p50: pctl(sd, 0.5), p90: pctl(sd, 0.9), probBeat: win,
      steadyAI: [pctl(sa, 0.1), pctl(sa, 0.5), pctl(sa, 0.9)], steadyBase: [pctl(sb, 0.1), pctl(sb, 0.5), pctl(sb, 0.9)] };
  }

  // ---------- tornado ----------
  function tornado(cal, dec) {
    var U = uncertain(cal, dec.enabled), base = evaluate(cal, dec).delta, rows = [];
    var groups = {};
    Object.keys(U.assumed).forEach(function (k) { groups[k] = { label: U.assumed[k].label, keys: [k] }; });
    groups.catchRate = { label: U.fitted.catchRate.label + ' (fitted)', keys: ['catchRate'] };
    groups.escCost = { label: U.fitted.escCost.label + ' (fitted)', keys: ['escCost'] };
    ['auto', 'err', 'review', 'token'].forEach(function (f) {
      var ks = Object.keys(U.fitted).filter(function (k) { return k.indexOf(f + ':') === 0; });
      if (ks.length) groups['fit_' + f] = { label: { auto: 'Automation rates', err: 'Error rates', review: 'Review minutes', token: 'Token cost per run' }[f] + ' (fitted, all task types)', keys: ks };
    });
    Object.keys(groups).forEach(function (gk) {
      var G = groups[gk], at = function (end) {
        return evaluate(cal, dec, function (k, r) { return G.keys.indexOf(k) >= 0 ? r[end] : r[1]; }).delta;
      };
      var lo = at(0), hi = at(2);
      rows.push({ key: gk, label: G.label, low: lo, high: hi, swing: Math.abs(hi - lo) });
    });
    rows.sort(function (a, b) { return b.swing - a.swing; });
    return { base: base, rows: rows };
  }

  // ---------- backtest: AI off, actual drivers ----------
  function backtest(cal) {
    var H = cal.history, n = cal.months.length, U = uncertain(cal, []);
    var p = pointInputs(cal, { enabled: [], discount: 0, rampMonths: 1, term: n, discountRate: 0, setup: 0, seniorReviewShare: 0.6 }, U, likely);
    p.growth = 0; p.handleMult = 1; p.erosionBase = 0;
    var rows = [];
    for (var t = 0; t < n; t++) {
      var m = month(cal, p, t, false, { volumes: H.volume_by_month, headcount: H.headcount_by_month });
      var a = H.pnl[t];
      rows.push({ month: cal.months[t], hours: m.hours.junior + m.hours.senior, hoursActual: H.ticket_hours_by_month[t],
        revenue: m.revenue, revenueActual: a.revenue, cost: m.cost, costActual: a.delivery_cost, profit: m.profit, profitActual: a.gross_profit });
    }
    var mape = function (f, g) { return rows.reduce(function (s, r) { return s + Math.abs(r[f] - r[g]) / Math.abs(r[g]); }, 0) / n; };
    var sum = function (f) { return rows.reduce(function (s, r) { return s + r[f]; }, 0); };
    return { rows: rows, mapeHours: mape('hours', 'hoursActual'), mapeRevenue: mape('revenue', 'revenueActual'), mapeCost: mape('cost', 'costActual'),
      totalProfit: sum('profit'), totalProfitActual: sum('profitActual'),
      totalProfitErr: Math.abs(sum('profit') - sum('profitActual')) / Math.abs(sum('profitActual')),
      maxMonthlyCostErr: Math.max.apply(null, rows.map(function (r) { return Math.abs(r.cost - r.costActual) / r.costActual; })) };
  }

  return { month: month, project: project, uncertain: uncertain, pointInputs: pointInputs, evaluate: evaluate,
    monteCarlo: monteCarlo, tornado: tornado, backtest: backtest, tri: tri, rngFrom: rngFrom };
});
