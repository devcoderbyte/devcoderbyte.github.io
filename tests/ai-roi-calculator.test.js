#!/usr/bin/env node
// Tests for tools/ai-roi-calculator.html, run in place in headless Chromium.
// Expected values are computed independently here from the formulas in the
// page's "Show the maths" section, then compared with what the page renders.
// Usage: node tests/ai-roi-calculator.test.js   (needs the playwright package)
const fs = require('fs'), path = require('path');
let chromium;
try { ({ chromium } = require('playwright')); } catch (e) { ({ chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright')); }

const ROOT = path.resolve(__dirname, '..');
const src = fs.readFileSync(path.join(ROOT, 'tools/ai-roi-calculator.html'), 'utf8').replace(/^---[\s\S]*?---\n/, '');
const page_html = '<!doctype html><html><head><meta charset="utf-8"></head><body>' + src + '</body></html>';

const usd = (v, dp = 0) => (v < 0 ? '−' : '') + '$' + Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: dp, maximumFractionDigits: dp });
let pass = 0, fail = 0;
const eq = (name, got, want) => { if (got === want) { pass++; console.log('  ok   ' + name + ': ' + got); } else { fail++; console.log('  FAIL ' + name + ': got "' + got + '", want "' + want + '"'); } };
const has = (name, text, part) => { if (text.includes(part)) { pass++; console.log('  ok   ' + name); } else { fail++; console.log('  FAIL ' + name + ': "' + part + '" not in "' + text + '"'); } };

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.route('**/*', r => {
    const u = new URL(r.request().url());
    if (u.pathname.startsWith('/tools/')) return r.fulfill({ path: path.join(ROOT, u.pathname), contentType: 'text/javascript' });
    if (u.hostname === 'calc.test') return r.fulfill({ body: page_html, contentType: 'text/html' });
    return r.abort();
  });
  await page.goto('http://calc.test/');
  const set = (vals) => page.evaluate(v => { Object.entries(v).forEach(([k, x]) => { document.getElementById(k).value = x; }); document.getElementById('deploy').dispatchEvent(new Event('change')); }, vals);
  const text = (id) => page.evaluate(i => document.getElementById(i).textContent, id);
  const preset = (p) => page.click('#presets button[data-p="' + p + '"]');

  // Usage tab: active users, cost, cost per user, value, ROI
  const usage = (users, activePct, reqs, tin, tout, pin, pout, hours = 1.2, real = 50, rate = 25, days = 21) => {
    const active = Math.round(users * activePct / 100), req = active * days * reqs;
    const cost = req * tin / 1e6 * pin + req * tout / 1e6 * pout, value = hours * 52 / 12 * active * real / 100 * rate;
    return { active, cost, perUser: active ? cost / active : 0, value, roi: cost > 0 ? Math.round((value - cost) / cost * 100) + '%' : '–' };
  };

  console.log('Defaults: conservative productivity figure');
  eq('time-saved default', await page.evaluate(() => document.getElementById('vmode').value), 'research');
  eq('hours saved default', await page.evaluate(() => document.getElementById('hours').value), '1.2');
  eq('team uplift default', await page.evaluate(() => document.getElementById('t-uplift').value), '3');

  console.log('Zero users');
  await preset('ops'); await set({ deploy: 'api', model: '4|20', users: 0, active: 70 });
  eq('cost', await text('m-cost'), '$0');
  eq('ROI', await text('m-roi'), '–');
  has('cap message', await text('cap-msg'), 'No active users');
  eq('break-even line hidden', await page.evaluate(() => document.getElementById('u-be').classList.contains('hidden')), true);

  console.log('100% active users (60 of 60)');
  await set({ users: 60, active: 100 });
  let e = usage(60, 100, 40, 4000, 800, 4, 20);
  eq('cost / month', await text('m-cost'), usd(e.cost));
  eq('cost per active user', await text('m-user'), usd(e.perUser, 2));
  eq('value / month', await text('m-value'), usd(e.value));
  eq('ROI', await text('m-roi'), e.roi);
  has('under the $29 cap', await text('cap-msg'), 'fits inside the $29 cap, with ' + usd(29 - e.perUser, 2));

  console.log('Per-user cost above the budget cap (coding agent, 42 active users)');
  await preset('code'); await set({ users: 60, active: 70, cap: 29 });
  e = usage(60, 70, 150, 20000, 1500, 4, 20);
  eq('cost per active user', await text('m-user'), usd(e.perUser, 2));
  has('cap ratio', await text('cap-msg'), usd(e.perUser, 2) + ' per active user is ' + (e.perUser / 29).toFixed(1) + '× the $29 cap');
  has('overage', await text('cap-msg'), 'Overage: ' + usd((e.perUser - 29) * e.active) + ' per month across ' + e.active + ' active users');

  // Team mix tab, from the formulas in "Show the maths"
  const team = (x) => {
    const A = x.agents, H = x.humans, usesAI = A > 0, disc = usesAI ? x.disc : 0, qc = usesAI && x.qc;
    const needHrs = A * x.ov, haveHrs = H * 40, share = !usesAI || H === 0 ? 0 : needHrs > 0 ? Math.min(1, haveHrs / needHrs) : 1;
    const ovFTE = Math.min(needHrs, haveHrs) / 40, fblock = qc ? x.fblock : 0;
    const cap = Math.max(0, H - ovFTE) * (1 + x.uplift) + A * x.afte * share * (1 - x.haircut) * (1 - fblock);
    const tasks = usesAI ? A * x.tasks : 0, escaped = tasks * x.err * (1 - (qc ? Math.max(x.catchQc, x.catchRev) : x.catchRev));
    const setupAll = (usesAI ? x.setup : 0) + (qc ? x.evalBuild : 0), qcMonthly = qc ? x.evalRun + x.guard * A * x.acost : 0;
    const R1 = x.req * x.price, C1 = x.req * x.cost, R2 = R1 * (1 - disc);
    const C2 = H * x.cost + A * x.acost + setupAll / x.months + qcMonthly + escaped * x.errCost;
    return { cov: cap / x.req * 100, cap, R1, C1, R2, C2, GP1: R1 - C1, GP2: R2 - C2, gm1: (R1 - C1) / R1 * 100, gm2: (R2 - C2) / R2 * 100, setupAll, escaped };
  };
  const pct = v => v.toFixed(1) + '%';
  await page.click('button[data-tab="team"]');

  console.log('Worked example: 10 engineers -> 7 engineers + 2 agents, 15% discount');
  await page.click('#t-example');
  const ex = { req: 10, cost: 4000, price: 5600, humans: 7, agents: 2, uplift: 0.03, afte: 1.5, acost: 1500, ov: 8, setup: 15000, months: 12, disc: 0.15,
    haircut: 0.15, tasks: 400, err: 0.05, catchRev: 0.5, catchQc: 0.9, errCost: 500, evalBuild: 8000, evalRun: 400, guard: 0.15, fblock: 0.03, qc: true };
  const w = team(ex);
  eq('capacity covered', await text('t-m-cov'), Math.round(w.cov) + '%');
  eq('cost / month', await text('t-m-cost'), usd(w.C2));
  eq('gross margin', await text('t-m-gm'), pct(w.gm2));
  const steady = w.GP2 + w.setupAll / ex.months - w.GP1;
  eq('setup payback', await text('t-m-pay'), steady <= 0 ? 'Never' : 'see page');
  has('capacity message', await text('t-cov-msg'), w.cap.toFixed(1) + ' of the 10 engineers');
  has('break-even: profit vs today', await text('t-be-msg'), usd(w.GP1 - w.GP2) + ' a month less than today');
  const dMax = ex.disc + (w.GP2 - w.GP1) / w.R1;
  has('break-even: max discount', await page.evaluate(() => document.getElementById('t-be-tbl').textContent), 'max ' + Math.round(dMax * 1000) / 10 + '%');
  eq('consistency: profit at max discount equals today', Math.round(w.R1 * (1 - dMax) - w.C2), Math.round(w.GP1));

  console.log('Zero agents (10 engineers, no AI)');
  await set({ 't-humans': 10, 't-agents': 0 });
  const z = team({ ...ex, humans: 10, agents: 0 });
  eq('capacity covered', await text('t-m-cov'), Math.round(z.cov) + '%');
  eq('cost / month', await text('t-m-cost'), usd(z.C2));
  eq('gross margin (discount ignored without AI)', await text('t-m-gm'), pct(z.gm1));
  eq('setup payback', await text('t-m-pay'), 'None');

  const all = await page.evaluate(() => document.body.innerText);
  eq('no NaN / undefined / Infinity rendered', /NaN|undefined|Infinity/.test(all), false);
  eq('page errors', errors.length, 0);
  await browser.close();
  console.log('\n' + pass + ' passed, ' + fail + ' failed');
  process.exit(fail ? 1 : 0);
})();
