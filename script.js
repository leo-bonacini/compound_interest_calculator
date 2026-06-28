// ─── State ────────────────────────────────────────────────────────────────────

const state = { result: null, params: null };

// ─── Calculation core ─────────────────────────────────────────────────────────

function calculate(p) {
    const { principal, rate, rateFreq, time, timeUnit, contribution, contribFreq } = p;
    if (isNaN(principal) || !rate || !time || principal < 0 || rate <= 0 || time <= 0) return null;

    const monthlyRate  = convertRate(rate, rateFreq, 'monthly') / 100;
    const totalMonths  = Math.max(1, Math.round(timeToMonths(time, timeUnit)));

    let monthlyContrib    = 0;
    let contribEvery      = 0;

    if (contribFreq !== 'none' && contribution > 0) {
        contribEvery = contribFreq === 'annual' ? 12 : 1;
        monthlyContrib = contribFreq === 'daily'
            ? contribution * 30.4375
            : contribution;
    }

    let balance  = principal;
    let invested = principal;
    let contribCount = 0;
    const history = [{ period: 0, balance, invested, interest: 0 }];

    for (let m = 1; m <= totalMonths; m++) {
        balance *= (1 + monthlyRate);

        if (contribEvery > 0 && m % contribEvery === 0) {
            balance  += monthlyContrib;
            invested += monthlyContrib;
            contribCount += contribFreq === 'daily' ? Math.round(30.4375) : 1;
        }

        history.push({ period: m, balance, invested, interest: balance - invested });
    }

    const totalInterest = balance - invested;
    return {
        finalBalance: balance,
        totalInvested: invested,
        totalInterest,
        returnPercent: invested > 0 ? (totalInterest / invested) * 100 : 0,
        contribCount,
        totalMonths,
        history,
    };
}

// ─── DOM helpers ──────────────────────────────────────────────────────────────

function $(id) { return document.getElementById(id); }

function setEl(id, text) {
    const el = $(id);
    if (el) el.textContent = text;
}

function getVal(id) { return $(id) ? $(id).value : ''; }

function getRadio(name) {
    const el = document.querySelector(`input[name="${name}"]:checked`);
    return el ? el.value : null;
}

// ─── Read inputs ──────────────────────────────────────────────────────────────

function getParams() {
    return {
        principal:    parseNumber(getVal('principal')),
        contribution: parseNumber(getVal('contribution')) || 0,
        contribFreq:  getVal('contrib-freq') || 'none',
        rate:         parseNumber(getVal('rate')),
        rateFreq:     getRadio('rate-freq') || 'annual',
        time:         parseNumber(getVal('time')),
        timeUnit:     getRadio('time-unit') || 'months',
    };
}

// ─── UI updates ───────────────────────────────────────────────────────────────

function updateCards(r) {
    setEl('result-balance',  formatCurrency(r.finalBalance));
    setEl('result-invested', formatCurrency(r.totalInvested));
    setEl('result-interest', formatCurrency(r.totalInterest));
    setEl('result-return',   formatPercent(r.returnPercent));
    setEl('result-count',    formatInteger(r.contribCount));

    document.querySelectorAll('.result-card').forEach(c => {
        c.classList.remove('pulse');
        void c.offsetWidth;
        c.classList.add('pulse');
    });
}

function resetCards() {
    ['result-balance','result-invested','result-interest','result-return','result-count']
        .forEach(id => setEl(id, '—'));
}

// ─── Scenarios ────────────────────────────────────────────────────────────────

const SCENARIO_MULTIPLIERS = [0.6, 1, 1.5];

function updateScenarios(params) {
    const baseRate   = params.rate;
    const rateFreq   = params.rateFreq;
    const freqLabel  = { annual: t('rateAnnual'), monthly: t('rateMonthly'), daily: t('rateDaily') }[rateFreq] || t('rateAnnual');

    document.querySelectorAll('.rate-freq-label')
        .forEach(el => { el.textContent = `(${freqLabel})`; });

    const scenarioResults = [];

    for (let i = 0; i < 3; i++) {
        const rateInput = $(`scenario-${i}-rate`);
        if (!rateInput) continue;

        if (!rateInput.dataset.userSet) {
            const def = baseRate * SCENARIO_MULTIPLIERS[i];
            rateInput.value = isFinite(def) && def > 0
                ? formatDecimal(def, 4).replace(/0+$/, '').replace(/[,.]$/, '')
                : '';
        }

        const scenRate = parseNumber(rateInput.value);
        if (!isFinite(scenRate) || scenRate <= 0) {
            scenarioResults.push({ totalInvested: 0, totalInterest: 0 });
            ['balance','interest','return'].forEach(k => setEl(`scenario-${i}-${k}`, '—'));
            continue;
        }

        const res = calculate({ ...params, rate: scenRate, rateFreq });
        if (res) {
            setEl(`scenario-${i}-balance`,  formatCurrency(res.finalBalance));
            setEl(`scenario-${i}-interest`, formatCurrency(res.totalInterest));
            setEl(`scenario-${i}-return`,   formatPercent(res.returnPercent));
            scenarioResults.push({ totalInvested: res.totalInvested, totalInterest: res.totalInterest });
        } else {
            scenarioResults.push({ totalInvested: 0, totalInterest: 0 });
        }
    }

    updateScenChart(scenarioResults);
}

// ─── Main calculate & render ──────────────────────────────────────────────────

function run() {
    const params = getParams();
    const result = calculate(params);

    state.params = params;
    state.result = result;

    if (result) {
        updateCards(result);
        updateGrowthChart(result.history, result.totalMonths);
        updateCompChart(result.totalInvested, result.totalInterest);
        updateScenarios(params);
        saveData({ params, scenRates: getScenRates() });
    } else {
        resetCards();
    }
}

const debouncedRun = debounce(run, 320);

// ─── Scenario rates helpers ───────────────────────────────────────────────────

function getScenRates() {
    return [0, 1, 2].map(i => {
        const el = $(`scenario-${i}-rate`);
        return el ? el.value : '';
    });
}

// ─── Number input formatting ──────────────────────────────────────────────────

function blurCurrency(e) {
    const val = parseNumber(e.target.value);
    if (isFinite(val) && val > 0) {
        e.target.value = formatDecimal(val, 2);
    }
}

function blurRate(e) {
    const val = parseNumber(e.target.value);
    if (isFinite(val) && val > 0) {
        e.target.value = formatDecimal(val, 4).replace(/0+$/, '').replace(/[,.]$/, '');
    }
}

function restrictToNumber(e) {
    const allowed = /[0-9,.\-]/;
    if (!e.key.match(allowed) && e.key.length === 1) e.preventDefault();
}

// ─── Actions ──────────────────────────────────────────────────────────────────

function handleClear() {
    ['principal','contribution','rate','time'].forEach(id => {
        const el = $(id);
        if (el) el.value = '';
    });
    $('contrib-freq').value = 'monthly';
    document.querySelector('input[name="rate-freq"][value="annual"]').checked  = true;
    document.querySelector('input[name="time-unit"][value="months"]').checked  = true;

    for (let i = 0; i < 3; i++) {
        const el = $(`scenario-${i}-rate`);
        if (el) { el.value = ''; delete el.dataset.userSet; }
    }

    resetCards();
    state.result = null; state.params = null;
    saveData(null);
    updateGrowthChart([], 12);
    updateCompChart(0, 0);
    updateScenChart([{ totalInvested:0,totalInterest:0 },{ totalInvested:0,totalInterest:0 },{ totalInvested:0,totalInterest:0 }]);
    showToast(t('toastCleared'));
}

function handleShare() {
    const r = state.result;
    const p = state.params;
    if (!r || !p) { showToast(t('toastShareNone'), 'warn'); return; }

    const freqLabel   = { annual: t('rateAnnual'), monthly: t('rateMonthly'), daily: t('rateDaily') }[p.rateFreq] || '';
    const timeLabel   = (t('shareTimeLabels') || {})[p.timeUnit] || '';
    const contribLabel = (t('shareContribLabels') || {})[p.contribFreq] || '';

    const text = [
        t('shareTitle'),
        '',
        t('shareParams'),
        `  ${t('shareInitial')}: ${formatCurrency(p.principal)}`,
        p.contribution > 0 ? `  ${t('shareContrib')} ${contribLabel}: ${formatCurrency(p.contribution)}` : null,
        `  ${t('shareRate')}: ${formatDecimal(p.rate, 2)} % ${freqLabel}`,
        `  ${t('sharePeriod')}: ${p.time} ${timeLabel}`,
        '',
        t('shareResults'),
        `  ${t('shareFinal')}: ${formatCurrency(r.finalBalance)}`,
        `  ${t('shareInvested')}: ${formatCurrency(r.totalInvested)}`,
        `  ${t('shareInterest')}: ${formatCurrency(r.totalInterest)}`,
        `  ${t('shareReturn')}: ${formatPercent(r.returnPercent)}`,
    ].filter(l => l !== null).join('\n');

    if (navigator.share) {
        navigator.share({ title: t('shareNavTitle'), text }).catch(() => copyText(text));
    } else {
        copyText(text);
    }
}

function copyText(text) {
    navigator.clipboard.writeText(text)
        .then(() => showToast(t('toastCopied')))
        .catch(() => showToast(t('toastCopyFail'), 'error'));
}

function handleExportCSV() {
    if (!state.result) { showToast(t('toastCsvNone'), 'warn'); return; }
    const isEn = currentLang === 'en';
    const sep  = isEn ? ',' : ';';
    const dec  = v => isEn ? v.toFixed(2) : v.toFixed(2).replace('.', ',');
    const header = t('csvHeader');
    const rows = state.result.history.map(h => [
        h.period, dec(h.balance), dec(h.invested), dec(h.interest),
    ]);
    const csv  = '﻿' + [header, ...rows].map(r => r.join(sep)).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    triggerDownload(blob, t('csvFilename'));
    showToast(t('toastCsvOk'));
}

function handleExportPNG() {
    if (!state.result) { showToast(t('toastPngNone'), 'warn'); return; }
    downloadPNG('growthChart', t('pngFilename'));
    showToast(t('toastPngOk'));
}

// ─── Dark mode ────────────────────────────────────────────────────────────────

function initTheme() {
    const saved = localStorage.getItem('cjc_theme') || 'light';
    setTheme(saved);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cjc_theme', theme);
    const btn = $('theme-toggle');
    if (btn) btn.setAttribute('aria-label', theme === 'dark' ? t('themeLight') : t('themeDark'));
    refreshAllChartThemes();
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
}

// ─── Restore from storage ─────────────────────────────────────────────────────

function restoreData() {
    const saved = loadData();
    if (!saved || !saved.params) return;
    const p = saved.params;

    const setField = (id, val) => { const el = $(id); if (el && val !== undefined) el.value = val; };

    setField('principal',    isFinite(p.principal)    ? formatDecimal(p.principal, 2)    : '');
    setField('contribution', isFinite(p.contribution) && p.contribution > 0
        ? formatDecimal(p.contribution, 2) : '');
    setField('contrib-freq', p.contribFreq || 'monthly');
    setField('rate',         isFinite(p.rate) ? formatDecimal(p.rate, 4).replace(/0+$/, '').replace(/[,.]$/, '') : '');
    setField('time',         p.time || '');

    const rr = document.querySelector(`input[name="rate-freq"][value="${p.rateFreq}"]`);
    if (rr) rr.checked = true;
    const tu = document.querySelector(`input[name="time-unit"][value="${p.timeUnit}"]`);
    if (tu) tu.checked = true;

    if (saved.scenRates) {
        saved.scenRates.forEach((v, i) => {
            const el = $(`scenario-${i}-rate`);
            if (el && v) { el.value = v; el.dataset.userSet = '1'; }
        });
    }

    run();
}

// ─── Event listeners ──────────────────────────────────────────────────────────

function setupEvents() {
    ['principal','contribution','rate','time'].forEach(id => {
        const el = $(id);
        if (!el) return;
        el.addEventListener('input', debouncedRun);
        el.addEventListener('keydown', restrictToNumber);
        if (id === 'rate') el.addEventListener('blur', blurRate);
        else if (id !== 'time') el.addEventListener('blur', blurCurrency);
    });

    $('contrib-freq').addEventListener('change', run);
    document.querySelectorAll('input[name="rate-freq"], input[name="time-unit"]')
        .forEach(el => el.addEventListener('change', run));

    for (let i = 0; i < 3; i++) {
        const el = $(`scenario-${i}-rate`);
        if (!el) continue;
        el.addEventListener('input', () => {
            el.dataset.userSet = '1';
            if (state.params) updateScenarios(state.params);
        });
        el.addEventListener('blur', blurRate);
        el.addEventListener('keydown', restrictToNumber);
    }

    $('btn-clear').addEventListener('click', handleClear);
    $('btn-share').addEventListener('click', handleShare);
    $('btn-csv').addEventListener('click',   handleExportCSV);
    $('btn-png').addEventListener('click',   handleExportPNG);
    $('theme-toggle').addEventListener('click', toggleTheme);

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });
}

// ─── Bootstrap ────────────────────────────────────────────────────────────────

function init() {
    initLanguage();
    applyTranslations();
    initTheme();
    initCharts();
    setupEvents();
    restoreData();

    window.onLanguageChange = function() {
        updateChartLabels();
        if (state.result) run();
    };
}

init();
