"""Build reference_cases.xlsx with live formulas (no Python arithmetic), recalc in LibreOffice,
then compare every case with the JavaScript model. Run: python3 model/tests/reference_cases.py"""
import json, os, subprocess, sys, tempfile
from openpyxl import Workbook, load_workbook

HERE = os.path.dirname(os.path.abspath(__file__))
XLSX = os.path.join(HERE, 'reference_cases.xlsx')
REF = dict(
  types={'ticket_a': dict(vol=400, handle=0.5, reopen=0.05, rework=0.4, junior=0.9, breach=0.03),
         'ticket_b': dict(vol=120, handle=3.0, reopen=0.10, rework=0.5, junior=0.3, breach=0.05)},
  cap={'junior': dict(paid=160, other=0.30, sd=0.02, cost=3200), 'senior': dict(paid=160, other=0.30, sd=0.02, cost=5200)},
  fee=40000, overhead=1000, other_cost=0, ot_mult=1.5, sla_sd=0.006, guard=0.15, platform=600, evals=400)
CASES = {
  'Case 1: no AI': dict(ai=False, auto={'ticket_a': 0, 'ticket_b': 0}, err={'ticket_a': 0, 'ticket_b': 0}, review={'ticket_a': 0, 'ticket_b': 0},
                        token={'ticket_a': 0, 'ticket_b': 0}, catch=0.9, esc_cost=500, esc_breach=0.5, discount=0, srs=0.6),
  'Case 2: AI, moderate': dict(ai=True, auto={'ticket_a': 0.7, 'ticket_b': 0.2}, err={'ticket_a': 0.05, 'ticket_b': 0.12}, review={'ticket_a': 3, 'ticket_b': 15},
                        token={'ticket_a': 0.05, 'ticket_b': 0.2}, catch=0.9, esc_cost=500, esc_breach=0.5, discount=0.1, srs=0.6),
  'Case 3: AI, bad quality': dict(ai=True, auto={'ticket_a': 0.8, 'ticket_b': 0.5}, err={'ticket_a': 0.25, 'ticket_b': 0.35}, review={'ticket_a': 1, 'ticket_b': 5},
                        token={'ticket_a': 0.08, 'ticket_b': 0.3}, catch=0.5, esc_cost=1500, esc_breach=0.9, discount=0.2, srs=0.4),
}
W = [0.0111, 0.0757, 0.2438, 0.3388, 0.2438, 0.0757, 0.0111]; Z = [-3, -2, -1, 0, 1, 2, 3]

wb = Workbook(); wb.remove(wb.active)
for name, c in CASES.items():
    ws = wb.create_sheet(name.split(':')[0])
    ws['A1'] = name; ws['A2'] = 'Every number below row 4 is a formula. Inputs are in yellow.'
    hdr = ['type', 'volume', 'handle h', 'reopen', 'rework', 'junior share', 'breach rate', 'automation', 'error rate', 'review min', 'token $/run',
           'agent tickets', 'errors', 'caught', 'escaped', 'rework factor', 'work h', 'review h', 'junior h', 'senior h', 'breaches', 'token $']
    for j, h in enumerate(hdr): ws.cell(4, j + 1, h)
    g = dict(catch=('B12', c['catch']), srs=('B13', c['srs']), esc_breach=('B14', c['esc_breach']), esc_cost=('B15', c['esc_cost']),
             discount=('B16', c['discount']), fee=('B17', REF['fee']), overhead=('B18', REF['overhead']), other=('B19', REF['other_cost']),
             otm=('B20', REF['ot_mult']), slasd=('B21', REF['sla_sd']), guard=('B22', REF['guard']), platform=('B23', REF['platform']), evals=('B24', REF['evals']))
    for k, (cell, v) in g.items(): ws[cell] = v; ws['A' + cell[1:]] = k
    for i, (tk, t) in enumerate(REF['types'].items()):
        r = 5 + i
        vals = [tk, t['vol'], t['handle'], t['reopen'], t['rework'], t['junior'], t['breach'], c['auto'][tk], c['err'][tk], c['review'][tk], c['token'][tk]]
        for j, v in enumerate(vals): ws.cell(r, j + 1, v)
        ws[f'L{r}'] = f'=B{r}*H{r}'; ws[f'M{r}'] = f'=L{r}*I{r}'; ws[f'N{r}'] = f'=M{r}*$B$12'; ws[f'O{r}'] = f'=M{r}-N{r}'
        ws[f'P{r}'] = f'=1+D{r}*E{r}'; ws[f'Q{r}'] = f'=B{r}*(1-H{r})*C{r}*P{r}+N{r}*C{r}'; ws[f'R{r}'] = f'=L{r}*J{r}/60'
        ws[f'S{r}'] = f'=Q{r}*F{r}+R{r}*(1-$B$13)'; ws[f'T{r}'] = f'=Q{r}*(1-F{r})+R{r}*$B$13'
        ws[f'U{r}'] = f'=(B{r}-L{r}+N{r})*G{r}+O{r}*$B$14'; ws[f'V{r}'] = f'=L{r}*K{r}'
    ws['A8'] = 'totals'
    for col in 'BLMNOSTUV': ws[f'{col}8'] = f'=SUM({col}5:{col}6)'
    # staffing per level
    ws['D11'] = 'level'; ws['E11'] = 'paid h'; ws['F11'] = 'other share'; ws['G11'] = 'sd'; ws['H11'] = 'cost'; ws['I11'] = 'hours'
    ws['J11'] = 'ticket h per FTE'; ws['K11'] = 'FTE needed'; ws['L11'] = 'FTE staffed'; ws['M11'] = 'staff $'; ws['N11'] = 'overtime $'
    for i, (lvl, cp) in enumerate(REF['cap'].items()):
        r = 12 + i; hrs = 'S8' if lvl == 'junior' else 'T8'
        ws[f'D{r}'] = lvl; ws[f'E{r}'] = cp['paid']; ws[f'F{r}'] = cp['other']; ws[f'G{r}'] = cp['sd']; ws[f'H{r}'] = cp['cost']
        ws[f'I{r}'] = f'={hrs}'; ws[f'J{r}'] = f'=E{r}*(1-F{r})'; ws[f'K{r}'] = f'=I{r}/J{r}'
        floor = f'IF($L$8>0,1,0)' if lvl == 'senior' else '0'
        ws[f'L{r}'] = f'=MAX({floor},CEILING(K{r}*2,1)/2)'; ws[f'M{r}'] = f'=L{r}*H{r}'
        ot = '+'.join(f'{w}*MAX(0,I{r}+(F{r}+({z})*G{r})*E{r}*L{r}-E{r}*L{r})' for w, z in zip(W, Z))
        ws[f'N{r}'] = f'=({ot})*H{r}/E{r}*$B$20'
    # revenue, credits, costs
    rows = [('fee', '=$B$17*IF($L$8>0,1-$B$16,1)'), ('breach rate', '=U8/B8'),
            ('P(below 95%)', '=1-NORMDIST(((1-0.95)-B28)/$B$21,0,1,1)'), ('P(below 90%)', '=1-NORMDIST(((1-0.9)-B28)/$B$21,0,1,1)'),
            ('credits', '=B27*0.05*(B29-B30)+B27*0.1*B30'), ('revenue', '=B27-B31'),
            ('staff', '=M12+M13'), ('overtime', '=N12+N13'), ('AI cost', '=IF(L8>0,V8*(1+$B$22)+$B$23+$B$24,0)'),
            ('escaped error cost', '=O8*$B$15'), ('total cost', '=B33+B34+$B$18+$B$19+B35+B36'), ('PROFIT', '=B32-B37')]
    for i, (lab, f) in enumerate(rows): ws[f'A{27 + i}'] = lab; ws[f'B{27 + i}'] = f
wb.save(XLSX)

# recalc in LibreOffice (headless)
out = tempfile.mkdtemp()
subprocess.run(['soffice', '--headless', '--calc', '--convert-to', 'xlsx', '--outdir', out, XLSX], check=True, capture_output=True)
calc = load_workbook(os.path.join(out, 'reference_cases.xlsx'), data_only=True)

# same inputs through the JavaScript model
cal = dict(types={k: dict(volume_month=dict(last3=t['vol']), handle_hours=dict(mean=t['handle']), reopen_rate=t['reopen'], rework_extra=t['rework'],
                          junior_share_hours=t['junior'], sla_breach_rate=t['breach']) for k, t in REF['types'].items()},
           capacity={l: dict(paid_hours=c['paid'], other_share=c['other'], other_share_sd=c['sd'], monthly_cost=c['cost']) for l, c in REF['cap'].items()},
           contract=dict(monthly_fee=REF['fee'], overtime_multiplier=REF['ot_mult'],
                         service_credits=[dict(below_pct=95, credit_pct_of_fee=5), dict(below_pct=90, credit_pct_of_fee=10)]),
           sla=dict(breach_rate_sd=REF['sla_sd']), overhead_month=REF['overhead'], other_cost=dict(mean=REF['other_cost']))
fails = 0
for name, c in CASES.items():
    p = dict(rampMonths=1, growth=0, handleMult=1, auto=c['auto'], err=c['err'], review=c['review'], token=c['token'], catchRate=c['catch'],
             seniorReviewShare=c['srs'], minSeniors=1, buffer=0, escapeBreach=c['esc_breach'], discount=c['discount'], erosionAI=0, erosionBase=0,
             guardOverhead=REF['guard'], platformFee=REF['platform'], evalRuns=REF['evals'], escCost=c['esc_cost'])
    js = json.loads(subprocess.run(['node', '-e', f"""const M=require('{os.path.join(HERE, '../../tools/ai-roi-model.js')}');
const m=M.month({json.dumps(cal)},{json.dumps(p)},0,{str(c['ai']).lower()});
console.log(JSON.stringify({{profit:m.profit,revenue:m.revenue,credits:m.credits,staff:m.staff,overtime:m.overtime,ai:m.aiCost,esc:m.escCost}}))"""],
               capture_output=True, text=True, check=True).stdout)
    ws = calc[name.split(':')[0]]
    sheet = dict(profit=ws['B38'].value, revenue=ws['B32'].value, credits=ws['B31'].value, staff=ws['B33'].value, overtime=ws['B34'].value,
                 ai=ws['B35'].value, esc=ws['B36'].value)
    print(name)
    for k in sheet:
        d = abs(sheet[k] - js[k]); bad = d > 1.0; fails += bad
        print(f"   {k:9} spreadsheet {sheet[k]:12,.2f}   model {js[k]:12,.2f}   diff {d:8.4f} {'FAIL' if bad else 'ok'}")
print('reference cases:', 'ALL MATCH (within $1)' if not fails else f'{fails} mismatches')
sys.exit(1 if fails else 0)
