/* Advanced (calibrated, simulated) mode for the Team mix tab. Uses window.AIModel and window.AICAL. */
(function () {
  var M = window.AIModel, cal = window.AICAL;
  var $ = function (id) { return document.getElementById(id); };
  if (!M || !cal || !$('team-adv')) return;
  var usd = function (v) { var s = '$' + Math.round(Math.abs(v)).toLocaleString('en-US'); return v < 0 ? '−\u2060' + s : s; };
  var usdK = function (v) { var a = Math.abs(v), s = a >= 1e6 ? '$' + (a / 1e6).toFixed(2) + 'M' : a >= 1e3 ? '$' + Math.round(a / 1e3) + 'K' : '$' + Math.round(a); return v < 0 ? '−\u2060' + s : s; };
  var pc = function (x, d) { return (x * 100).toFixed(d == null ? 1 : d) + '%'; };
  var nice = function (k) { return k.replace(/_/g, ' ').replace(/^p(\d) incident/, 'P$1 incident').replace(/^problem rca$/, 'problem / RCA'); };
  var num = function (id, lo, hi) { var v = parseFloat($(id).value); if (isNaN(v)) v = lo; return Math.min(hi, Math.max(lo, v)); };

  // ---- mode switch ----
  document.querySelectorAll('#t-mode button').forEach(function (b) {
    b.addEventListener('click', function () {
      document.querySelectorAll('#t-mode button').forEach(function (x) { x.classList.toggle('active', x === b); });
      $('team-simple').classList.toggle('hidden', b.dataset.mode !== 'simple');
      $('team-adv').classList.toggle('hidden', b.dataset.mode !== 'adv');
      if (b.dataset.mode === 'adv') schedule(0);
    });
  });

  // ---- static tables ----
  var S = cal.summary;
  $('a-banner').textContent = (S.synthetic ? 'Demo data: ' : '') + 'calibrated on ' + (S.synthetic ? 'a synthetic' : 'a') + ' 12-month managed-service account, ' +
    S.tickets.toLocaleString() + ' tickets and ' + S.pilotRuns.toLocaleString() + ' AI pilot runs.' + (S.synthetic ? ' The method is real; the numbers are illustrative until it is fitted on real exports.' : '');
  var types = Object.keys(cal.types).sort(function (a, b) { return cal.types[b].volume_month.mean - cal.types[a].volume_month.mean; });
  $('a-fit').innerHTML = '<thead><tr><th>Task type</th><th class="num">Priority</th><th class="num">Tickets / mo</th><th class="num">Handle (median)</th><th class="num">Reopened</th><th class="num">Junior hours</th><th class="num">SLA breached</th></tr></thead><tbody>' +
    types.map(function (k) { var t = cal.types[k]; return '<tr><td>' + nice(k) + '</td><td class="num">' + t.priority + '</td><td class="num">' + Math.round(t.volume_month.mean) +
      '</td><td class="num">' + t.handle_hours.median.toFixed(2) + ' h</td><td class="num">' + pc(t.reopen_rate) + '</td><td class="num">' + pc(t.junior_share_hours, 0) + '</td><td class="num">' + pc(t.sla_breach_rate) + '</td></tr>'; }).join('') + '</tbody>';
  var ai = cal.ai.types, piloted = Object.keys(ai);
  var rng = function (r, f) { return '<strong>' + f(r[1]) + '</strong> <span style="color:var(--muted);font-size:12.5px">(' + f(r[0]) + '–' + f(r[2]) + ')</span>'; };
  $('a-pilot').innerHTML = '<caption style="caption-side:bottom;text-align:left;font-size:12.5px;color:var(--muted);padding-top:.4rem">Likely value, with the low–high range in brackets.</caption><thead><tr><th>Piloted task type</th><th class="num">Runs</th><th class="num">Automation</th><th class="num">Error rate</th><th class="num">Review min</th><th class="num">$ / run</th></tr></thead><tbody>' +
    piloted.map(function (k) { var a = ai[k]; return '<tr><td>' + nice(k) + '</td><td class="num">' + a.runs + '</td><td class="num">' + rng(a.automation_rate, function (x) { return pc(x, 0); }) +
      '</td><td class="num">' + rng(a.error_rate, function (x) { return pc(x, 1); }) + '</td><td class="num">' + rng(a.review_minutes_mean, function (x) { return x.toFixed(1); }) +
      '</td><td class="num">' + rng(a.token_cost_mean, function (x) { return x.toFixed(3); }) + '</td></tr>'; }).join('') +
    '<tr><td>All piloted types</td><td></td><td colspan="4" class="num">Errors caught before the client: ' + rng(cal.ai.catch_rate, function (x) { return pc(x, 0); }) + '</td></tr></tbody>';
  $('a-types').innerHTML = '<span style="color:var(--muted);font-size:12px;font-family:var(--font-mono);text-transform:uppercase;letter-spacing:.06em;width:100%">Automate these task types</span>' +
    piloted.map(function (k) { return '<label style="display:flex;gap:.4rem;align-items:center;cursor:pointer"><input type="checkbox" class="a-type" value="' + k + '" checked> ' + nice(k) + '</label>'; }).join('');

  // ---- editable assumptions ----
  var U0 = M.uncertain(cal, []), A = U0.assumed, isPct = function (u) { return u === 'rate' || u === 'share'; };
  $('a-assume').innerHTML = '<thead><tr><th>Assumption</th><th class="num">Low</th><th class="num">Likely</th><th class="num">High</th></tr></thead><tbody>' +
    Object.keys(A).map(function (k) { var a = A[k], f = function (x) { return isPct(a.unit) ? +(x * 100).toFixed(2) : x; };
      return '<tr><td>' + a.label + (isPct(a.unit) ? ' (%)' : ' (×)') + '</td>' + [0, 1, 2].map(function (i) {
        return '<td class="num"><input class="roi-input a-as" aria-label="' + a.label + ': ' + ['low', 'likely', 'high'][i] + '" data-k="' + k + '" data-i="' + i + '" type="number" step="' + (isPct(a.unit) ? '0.5' : '0.05') + '" value="' + f(a.r[i]) + '" style="width:5.5em;padding:.3rem .45rem;text-align:right"></td>'; }).join('') + '</tr>'; }).join('') + '</tbody>';

  // patch the model's assumption ranges from the table
  var origUncertain = M.uncertain;
  function readAssumptions() {
    var out = {}, bad = [];
    Object.keys(A).forEach(function (k) {
      var r = [0, 1, 2].map(function (i) { var el = document.querySelector('.a-as[data-k="' + k + '"][data-i="' + i + '"]'), v = parseFloat(el.value);
        if (isNaN(v)) v = isPct(A[k].unit) ? A[k].r[i] * 100 : A[k].r[i]; return isPct(A[k].unit) ? v / 100 : v; });
      r = r.map(function (x) { return Math.max(0, x); });
      if (isPct(A[k].unit)) r = r.map(function (x) { return Math.min(1, x); });
      var s = r.slice().sort(function (a, b) { return a - b; });
      if (s[0] !== r[0] || s[2] !== r[2]) bad.push(A[k].label);
      out[k] = s;
    });
    return { ranges: out, bad: bad };
  }
  function withAssumptions(ranges, fn) {
    M.uncertain = function (c, e) { var U = origUncertain(c, e); Object.keys(ranges).forEach(function (k) { U.assumed[k].r = ranges[k]; }); return U; };
    try { return fn(); } finally { M.uncertain = origUncertain; }
  }

  // ---- charts ----
  function hist(delta) {
    var svg = $('a-hist'), W = Math.max(300, Math.round(svg.getBoundingClientRect().width) || 640), H = 200, pad = 28, bins = 28;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    var lo = Math.min.apply(null, delta), hi = Math.max.apply(null, delta); if (hi === lo) { hi = lo + 1; }
    lo = Math.min(lo, 0); hi = Math.max(hi, 0);
    var bw = (hi - lo) / bins, c = new Array(bins).fill(0);
    delta.forEach(function (d) { c[Math.min(bins - 1, Math.floor((d - lo) / bw))]++; });
    var mx = Math.max.apply(null, c), x = function (v) { return 8 + (v - lo) / (hi - lo) * (W - 16); }, s = '';
    c.forEach(function (n, i) { var x0 = x(lo + i * bw), x1 = x(lo + (i + 1) * bw), h = n / mx * (H - pad - 14), mid = lo + (i + 0.5) * bw;
      if (n) s += '<rect x="' + (x0 + 1) + '" y="' + (H - pad - h) + '" width="' + Math.max(1, x1 - x0 - 2) + '" height="' + h + '" rx="2" fill="' + (mid < 0 ? '#dc2626' : '#0d9488') + '"><title>' + usd(lo + i * bw) + ' to ' + usd(lo + (i + 1) * bw) + ': ' + n + ' contracts</title></rect>'; });
    s += '<line class="wf-axis" x1="8" x2="' + (W - 8) + '" y1="' + (H - pad) + '" y2="' + (H - pad) + '"/>';
    s += '<line x1="' + x(0) + '" x2="' + x(0) + '" y1="6" y2="' + (H - pad) + '" stroke="var(--text)" stroke-width="1.5"/><text class="wf-txt" x="' + x(0) + '" y="' + (H - 8) + '" text-anchor="' + (x(0) > W - 40 ? 'end' : x(0) < 40 ? 'start' : 'middle') + '">today</text>';
    [lo, hi].forEach(function (v, i) { if (Math.abs(x(v) - x(0)) > 40) s += '<text class="wf-lbl" x="' + x(v) + '" y="' + (H - 8) + '" text-anchor="' + (i ? 'end' : 'start') + '">' + usdK(v) + '</text>'; });
    svg.innerHTML = s;
  }
  var SHORT = { autoTransfer: 'Automation reached in production', errTransfer: 'Error rate in production', reviewTransfer: 'Review time in production',
    tokenTransfer: 'Token cost drift', escapeBreach: 'Escapes that breach SLA', growth: 'Ticket volume growth', handleMult: 'Human handle time',
    erosionAI: 'Renewal price cut, AI-led', erosionBase: 'Renewal price cut, today', catchRate: 'Catch rate (fitted)', escCost: 'Cost per escaped error (fitted)',
    fit_auto: 'Automation rates (fitted)', fit_err: 'Error rates (fitted)', fit_review: 'Review minutes (fitted)', fit_token: 'Token cost (fitted)' };
  function tornadoChart(t) {
    var svg = $('a-tornado'), rows = t.rows.slice(0, 8), W = Math.max(300, Math.round(svg.getBoundingClientRect().width) || 640), small = W < 520;
    var lab = small ? 0 : 210, rowH = small ? 44 : 30, H = rows.length * rowH + 30;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    var vals = [t.base]; rows.forEach(function (r) { vals.push(r.low, r.high); });
    var lo = Math.min.apply(null, vals), hi = Math.max.apply(null, vals), span = (hi - lo) || 1;
    var x = function (v) { return lab + 8 + (v - lo) / span * (W - lab - 16); }, s = '';
    rows.forEach(function (r, i) {
      var y = 6 + i * rowH + (small ? 16 : 0);
      s += '<text class="wf-lbl" x="' + (small ? 8 : lab) + '" y="' + (small ? y - 4 : y + 13) + '" text-anchor="' + (small ? 'start' : 'end') + '" style="font-size:' + (small ? 11 : 11.5) + 'px">' + (SHORT[r.key] || r.label) + '</text>';
      [['low', r.low], ['high', r.high]].forEach(function (e) {
        var a = x(Math.min(t.base, e[1])), b = x(Math.max(t.base, e[1]));
        s += '<rect x="' + a + '" y="' + y + '" width="' + Math.max(1, b - a) + '" height="18" rx="2" fill="' + (e[1] < t.base ? '#dc2626' : '#0d9488') + '"><title>' + r.label + ' at its ' + e[0] + ' end: ' + usd(e[1]) + '</title></rect>';
      });
    });
    s += '<line x1="' + x(t.base) + '" x2="' + x(t.base) + '" y1="0" y2="' + (H - 22) + '" stroke="var(--text)" stroke-width="1.5"/>';
    s += '<text class="wf-txt" x="' + x(t.base) + '" y="' + (H - 6) + '" text-anchor="middle">likely ' + usdK(t.base) + '</text>';
    svg.innerHTML = s;
    var top = rows[0];
    $('a-tornado-note').textContent = 'Each bar shows NPV vs today when one input moves to its low (or high) end and everything else stays at its likely value. The biggest lever is "' +
      (SHORT[top.key] || top.label) + '": it swings the answer by ' + usdK(top.swing) + ', so measure that first. The centre line (every input at its likely value) differs from the simulation\'s median because several ranges are lopsided: error rates, for example, can rise much further than they can fall.';
  }

  // ---- run ----
  var timer;
  function schedule(ms) { clearTimeout(timer); timer = setTimeout(run, ms == null ? 250 : ms); }
  function run() {
    if ($('team-adv').classList.contains('hidden')) return;
    var enabled = [].slice.call(document.querySelectorAll('.a-type:checked')).map(function (e) { return e.value; });
    var dec = { enabled: enabled, discount: num('a-disc', 0, 50) / 100, rampMonths: Math.round(num('a-ramp', 1, 24)), term: Math.round(num('a-term', 12, 60)),
      discountRate: num('a-dr', 0, 30) / 100, setup: num('a-setup', 0, 1e8), seniorReviewShare: num('a-srs', 0, 100) / 100 };
    var as = readAssumptions(), v = $('a-verdict');
    if (!enabled.length) {
      ['a-prob', 'a-p50', 'a-p10', 'a-p90'].forEach(function (id) { $(id).textContent = '–'; $(id).style.color = ''; });
      v.className = 'status-msg status-warn'; v.textContent = 'Pick at least one task type to automate.'; $('a-hist').innerHTML = ''; $('a-tornado').innerHTML = ''; $('a-steady').innerHTML = ''; return;
    }
    var res = withAssumptions(as.ranges, function () { return { mc: M.monteCarlo(cal, dec, 2000, 7), t: M.tornado(cal, dec), e: M.evaluate(cal, dec) }; });
    var mc = res.mc;
    $('a-prob').textContent = Math.round(mc.probBeat * 100) + '%';
    $('a-prob').style.color = mc.probBeat < 0.5 ? '#ef4444' : '';
    [['a-p50', mc.p50], ['a-p10', mc.p10], ['a-p90', mc.p90]].forEach(function (e) { $(e[0]).textContent = usdK(e[1]); $(e[0]).style.color = e[1] < 0 ? '#ef4444' : ''; });
    var verdict = mc.probBeat >= 0.8 ? 'Strong case: ' : mc.probBeat >= 0.5 ? 'Coin-flip territory: ' : 'Weak case: ';
    v.className = 'status-msg ' + (mc.probBeat >= 0.8 ? 'status-ok' : mc.probBeat >= 0.5 ? 'status-warn' : 'status-crit');
    v.textContent = verdict + 'in ' + Math.round(mc.probBeat * 100) + '% of 2,000 simulated ' + dec.term + '-month contracts, this plan beats today\'s profit (in today\'s money). ' +
      'Likely outcome ' + usdK(mc.p50) + ' vs today; 1 in 10 runs is worse than ' + usdK(mc.p10) + '.' + (as.bad.length ? ' (Some low/high values were swapped; I sorted them.)' : '');
    hist(mc.delta); tornadoChart(res.t);
    var e = res.e, sb = e.base.steady, sa = e.ai.steady;
    var row = function (l, a, b, f) { return '<tr><td>' + l + '</td><td class="num">' + f(a) + '</td><td class="num">' + f(b) + '</td></tr>'; };
    var fte = function (m) { return (m.fte.junior + m.fte.senior).toFixed(1) + ' (' + m.fte.junior + ' jr / ' + m.fte.senior + ' sr)'; };
    $('a-steady').innerHTML = '<thead><tr><th>Month ' + Math.min(dec.term, 13) + ', likely case</th><th class="num">Today\'s model</th><th class="num">With AI</th></tr></thead><tbody>' +
      row('Engineers needed (no overtime)', sb, sa, fte) + row('Tickets handled by agents', 0, sa.agentTickets, Math.round) + row('Errors reaching the client', 0, sa.escaped, function (x) { return x.toFixed(1); }) +
      row('Revenue (after any discount and credits)', sb.revenue, sa.revenue, usd) + row('AI + evals + guardrails', 0, sa.aiCost, usd) + row('Escaped-error cost', 0, sa.escCost, usd) +
      row('Gross profit', sb.profit, sa.profit, usd) + '</tbody>';
  }
  document.querySelectorAll('#team-adv input').forEach(function (el) { el.addEventListener('input', function () { schedule(); }); el.addEventListener('change', function () { schedule(); }); });
  window.addEventListener('resize', function () { schedule(300); });

  // ---- proof panel ----
  var P = cal.proof, b = P.backtest, okI = function (x) { return x <= 0.05 ? '✓' : '✗'; };
  var fc = P.forecast, fRows = fc ? fc.rows.map(function (r) { var inb = r.actual >= r.p10 && r.actual <= r.p90;
    return '<tr><td>' + r.metric.replace(/_/g, ' ') + '</td><td class="num">' + Math.round(r.p10).toLocaleString() + ' – ' + Math.round(r.p90).toLocaleString() + '</td><td class="num">' + Math.round(r.actual).toLocaleString() + '</td><td class="num">' + (inb ? '✓' : '✗') + '</td></tr>'; }).join('') : '';
  $('a-proof').innerHTML =
    '<p><strong style="color:var(--text)">1. Backtest.</strong> With AI switched off and the real monthly volumes and headcount fed in, the model reproduces ' + b.months + ' months of history: ' +
    'ticket hours ' + pc(b.mapeHours) + ' average error ' + okI(b.mapeHours) + ', revenue ' + pc(b.mapeRevenue) + ' ' + okI(b.mapeRevenue) + ', delivery cost ' + pc(b.mapeCost) + ' ' + okI(b.mapeCost) +
    ' (worst month ' + pc(b.maxMonthlyCostErr) + '), 12-month profit ' + pc(b.totalProfitErr) + ' ' + okI(b.totalProfitErr) + '. Bar: within 5%. Single-month profit can miss by more, because SLA credits are all-or-nothing.</p>' +
    '<p style="margin-top:.75rem"><strong style="color:var(--text)">2. Reference cases and rules.</strong> Three cases worked by hand in a spreadsheet (live formulas, recalculated in LibreOffice) match this model to the cent. ' +
    'Rules that must always hold, such as "no automation equals today" and "a higher error rate never raises profit", pass on 300 random scenarios (90,000+ checks).</p>' +
    (fc ? '<p style="margin-top:.75rem"><strong style="color:var(--text)">3. Pre-registered forecast.</strong> Before the production rollout, the model forecast its first 3 months and the forecast was locked. Actuals vs the forecast\'s 80% band: ' +
      fc.inside + ' of ' + fc.total + ' inside.' + (S.synthetic ? ' (Here the "actuals" are simulated too, so this shows the scoring works, not that the model is right about a real account.)' : '') + '</p>' +
      '<div style="overflow-x:auto"><table class="roi-pl" style="margin-top:.5rem"><thead><tr><th>Metric, 3-month total</th><th class="num">Forecast 80% band</th><th class="num">Actual</th><th class="num">Inside</th></tr></thead><tbody>' + fRows + '</tbody></table></div>' : '');
})();
