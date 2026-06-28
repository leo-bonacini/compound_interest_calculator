const STORAGE_KEY = 'cjc_v1';

function formatCurrency(value) {
    return new Intl.NumberFormat(t('locale'), {
        style: 'currency', currency: t('currency'),
        minimumFractionDigits: 2, maximumFractionDigits: 2,
        currencyDisplay: 'narrowSymbol',
    }).format(isFinite(value) ? value : 0);
}

function formatPercent(value, decimals = 2) {
    return new Intl.NumberFormat(t('locale'), {
        minimumFractionDigits: decimals, maximumFractionDigits: decimals
    }).format(isFinite(value) ? value : 0) + '%';
}

function formatInteger(value) {
    return new Intl.NumberFormat(t('locale')).format(Math.round(value || 0));
}

function formatDecimal(value, decimals = 2) {
    return new Intl.NumberFormat(t('locale'), {
        minimumFractionDigits: decimals, maximumFractionDigits: decimals
    }).format(isFinite(value) ? value : 0);
}

function getDecimalSep() {
    const test = new Intl.NumberFormat(t('locale')).format(1.1);
    return test[1]; // '.' or ','
}

function parseNumber(str) {
    if (str === null || str === undefined || str === '') return NaN;
    const s = String(str).trim().replace(/\s/g, '');
    if (!s) return NaN;

    if (getDecimalSep() === '.') {
        // Period = decimal, comma = thousands (e.g. en-US, es-419 in some browsers)
        return parseFloat(s.replace(/,/g, ''));
    }
    // Comma = decimal, period = thousands (e.g. pt-BR, es-ES)
    const periods = (s.match(/\./g) || []).length;
    const commas  = (s.match(/,/g) || []).length;
    if (commas === 0 && periods === 1) {
        const afterDot = s.split('.')[1] || '';
        return afterDot.length > 2
            ? parseFloat(s.replace('.', ''))
            : parseFloat(s);
    }
    return parseFloat(s.replace(/\./g, '').replace(',', '.'));
}

function parseBR(str) { return parseNumber(str); }

// Converts ratePercent from fromFreq to toFreq using compound formula.
// freqs: 'annual' | 'monthly' | 'daily'
function convertRate(ratePercent, fromFreq, toFreq) {
    if (fromFreq === toFreq) return ratePercent;
    const ppy = { annual: 1, monthly: 12, daily: 365 };
    const r = ratePercent / 100;
    const annual = Math.pow(1 + r, ppy[fromFreq]) - 1;
    return (Math.pow(1 + annual, 1 / ppy[toFreq]) - 1) * 100;
}

function timeToMonths(value, unit) {
    const f = { years: 12, months: 1, days: 1 / 30.4375 };
    return value * (f[unit] || 1);
}

function saveData(data) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (_) {}
}

function loadData() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch (_) { return null; }
}

function triggerDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement('a'), { href: url, download: filename });
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function downloadPNG(canvasId, filename) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    triggerDownload(dataURLtoBlob(canvas.toDataURL('image/png')), filename);
}

function dataURLtoBlob(dataUrl) {
    const [meta, data] = dataUrl.split(',');
    const mime = meta.match(/:(.*?);/)[1];
    const bytes = atob(data);
    const arr = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
    return new Blob([arr], { type: mime });
}

function debounce(fn, ms) {
    let timer;
    return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

function showToast(msg, type = 'success') {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.className = `toast toast--${type} toast--show`;
    setTimeout(() => { el.className = 'toast'; }, 3200);
}
