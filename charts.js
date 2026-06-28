let growthChart = null;
let compChart   = null;
let scenChart   = null;

function isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
}

function themeColors() {
    const dark = isDark();
    return {
        grid:   dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
        tick:   dark ? '#94A3B8' : '#64748B',
        legend: dark ? '#CBD5E1' : '#374151',
    };
}

function yTickCurrency(v) { return formatCurrency(v); }
function tooltipLabel(ctx) { return ` ${ctx.dataset.label}: ${formatCurrency(ctx.raw)}`; }

function baseScaleOpts(tc) {
    return {
        x: { grid: { color: tc.grid }, ticks: { color: tc.tick, maxTicksLimit: 10, maxRotation: 0 } },
        y: { grid: { color: tc.grid }, ticks: { color: tc.tick, callback: yTickCurrency } },
    };
}

function baseLegend(tc) {
    return { labels: { color: tc.legend, usePointStyle: true, padding: 16 } };
}

function initCharts() {
    if (typeof Chart === 'undefined') return;
    const tc = themeColors();

    growthChart = new Chart(
        document.getElementById('growthChart').getContext('2d'), {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: t('chartGrowthDataset0'),
                    data: [], borderColor: '#3B82F6',
                    backgroundColor: 'rgba(59,130,246,0.12)',
                    fill: true, tension: 0.4,
                    pointRadius: 0, pointHoverRadius: 4, borderWidth: 2,
                },
                {
                    label: t('chartGrowthDataset1'),
                    data: [], borderColor: '#94A3B8',
                    backgroundColor: 'rgba(148,163,184,0.06)',
                    fill: true, tension: 0.4,
                    pointRadius: 0, pointHoverRadius: 4,
                    borderDash: [6, 4], borderWidth: 2,
                }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: { legend: baseLegend(tc), tooltip: { callbacks: { label: tooltipLabel } } },
            scales: baseScaleOpts(tc),
        }
    });

    compChart = new Chart(
        document.getElementById('comparisonChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: [t('chartCompResultLabel')],
            datasets: [
                { label: t('chartCompDataset0'), data: [0], backgroundColor: '#64748B', borderRadius: 4 },
                { label: t('chartCompDataset1'), data: [0], backgroundColor: '#22C55E', borderRadius: 4 },
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: baseLegend(tc), tooltip: { callbacks: { label: tooltipLabel } } },
            scales: {
                x: { stacked: true, grid: { display: false }, ticks: { color: tc.tick } },
                y: { stacked: true, grid: { color: tc.grid }, ticks: { color: tc.tick, callback: yTickCurrency } },
            }
        }
    });

    scenChart = new Chart(
        document.getElementById('scenarioChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: t('scenLabels'),
            datasets: [
                { label: t('chartScenDataset0'), data: [0,0,0], backgroundColor: '#64748B', borderRadius: 4 },
                {
                    label: t('chartScenDataset1'), data: [0,0,0],
                    backgroundColor: ['#F59E0B','#3B82F6','#22C55E'],
                    borderRadius: 4,
                },
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: baseLegend(tc), tooltip: { callbacks: { label: tooltipLabel } } },
            scales: {
                x: { stacked: true, grid: { display: false }, ticks: { color: tc.tick } },
                y: { stacked: true, grid: { color: tc.grid }, ticks: { color: tc.tick, callback: yTickCurrency } },
            }
        }
    });
}

function applyTheme(chart, stacked) {
    const tc = themeColors();
    chart.options.plugins.legend.labels.color = tc.legend;
    chart.options.scales.x.ticks.color = tc.tick;
    chart.options.scales.y.ticks.color = tc.tick;
    chart.options.scales.y.grid.color  = tc.grid;
    if (!stacked) chart.options.scales.x.grid.color = tc.grid;
}

function updateChartLabels() {
    if (growthChart) {
        growthChart.data.datasets[0].label = t('chartGrowthDataset0');
        growthChart.data.datasets[1].label = t('chartGrowthDataset1');
        growthChart.update('none');
    }
    if (compChart) {
        compChart.data.labels              = [t('chartCompResultLabel')];
        compChart.data.datasets[0].label   = t('chartCompDataset0');
        compChart.data.datasets[1].label   = t('chartCompDataset1');
        compChart.update('none');
    }
    if (scenChart) {
        scenChart.data.labels              = t('scenLabels');
        scenChart.data.datasets[0].label   = t('chartScenDataset0');
        scenChart.data.datasets[1].label   = t('chartScenDataset1');
        scenChart.update('none');
    }
}

function sampleHistory(history, max) {
    if (history.length <= max) return history;
    const out = [];
    const step = (history.length - 1) / (max - 1);
    for (let i = 0; i < max; i++) out.push(history[Math.round(i * step)]);
    out[out.length - 1] = history[history.length - 1];
    return out;
}

function periodLabel(month, totalMonths) {
    if (totalMonths <= 24) return `${t('periodMonth')} ${month}`;
    return month % 12 === 0 ? `${t('periodYear')} ${month / 12}` : '';
}

function updateGrowthChart(history, totalMonths) {
    if (!growthChart) return;
    const sampled = sampleHistory(history, 80);
    growthChart.data.labels              = sampled.map(h => periodLabel(h.period, totalMonths));
    growthChart.data.datasets[0].data   = sampled.map(h => h.balance);
    growthChart.data.datasets[1].data   = sampled.map(h => h.invested);
    applyTheme(growthChart, false);
    growthChart.update('active');
}

function updateCompChart(invested, interest) {
    if (!compChart) return;
    compChart.data.datasets[0].data = [invested];
    compChart.data.datasets[1].data = [interest];
    applyTheme(compChart, true);
    compChart.update('active');
}

function updateScenChart(scenarios) {
    if (!scenChart) return;
    scenChart.data.datasets[0].data = scenarios.map(s => s.totalInvested);
    scenChart.data.datasets[1].data = scenarios.map(s => s.totalInterest);
    applyTheme(scenChart, true);
    scenChart.update('active');
}

function refreshAllChartThemes() {
    if (growthChart) { applyTheme(growthChart, false); growthChart.update('none'); }
    if (compChart)   { applyTheme(compChart,   true);  compChart.update('none');  }
    if (scenChart)   { applyTheme(scenChart,   true);  scenChart.update('none');  }
}
