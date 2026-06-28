const TRANSLATIONS = {
  'pt-BR': {
    pageTitle: 'Calculadora de Juros Compostos',
    pageDesc: 'Calculadora de juros compostos com gráficos interativos, cenários e exportação de dados.',
    brandTitle: 'Calculadora',
    brandSubtitle: 'Juros Compostos',
    themeDark: 'Modo escuro',
    themeLight: 'Modo claro',
    sectionParams: 'Parâmetros',
    labelPrincipal: 'Valor Inicial',
    currencyPrefix: 'R$',
    labelContribution: 'Aporte Periódico',
    contribNone: 'Sem aportes',
    contribDaily: 'Diário',
    contribMonthly: 'Mensal',
    contribAnnual: 'Anual',
    labelRate: 'Taxa de Juros',
    rateAnnual: 'a.a.',
    rateMonthly: 'a.m.',
    rateDaily: 'a.d.',
    labelPeriod: 'Período',
    timeYears: 'Anos',
    timeMonths: 'Meses',
    timeDays: 'Dias',
    resultBalance: 'Valor Final',
    resultInvested: 'Total Investido',
    resultInterest: 'Juros Obtidos',
    resultReturn: 'Rentabilidade',
    resultCount: 'Aportes Realizados',
    sectionGrowth: 'Evolução do Investimento',
    chartGrowthTitle: 'Crescimento do Patrimônio',
    chartCompTitle: 'Capital vs Juros',
    chartCompResultLabel: 'Resultado',
    chartGrowthDataset0: 'Patrimônio Total',
    chartGrowthDataset1: 'Total Investido',
    chartCompDataset0: 'Capital Investido',
    chartCompDataset1: 'Juros Obtidos',
    chartScenDataset0: 'Capital Investido',
    chartScenDataset1: 'Juros Obtidos',
    sectionScenarios: 'Cenários de Simulação',
    sectionScenariosDesc: 'Compare diferentes taxas mantendo os demais parâmetros inalterados.',
    scenConservative: 'Conservador',
    scenBase: 'Base',
    scenOptimistic: 'Otimista',
    scenChartTitle: 'Comparação de Cenários',
    scenLabelBalance: 'Valor Final',
    scenLabelInterest: 'Juros Obtidos',
    scenLabelReturn: 'Rentabilidade',
    scenLabelRate: 'Taxa',
    scenLabels: ['Conservador', 'Base', 'Otimista'],
    btnClear: 'Limpar',
    btnShare: 'Compartilhar',
    btnCsv: 'Exportar CSV',
    btnPng: 'Exportar PNG',
    btnClearTitle: 'Limpar todos os campos',
    btnShareTitle: 'Compartilhar resultado',
    btnCsvTitle: 'Exportar dados em CSV',
    btnPngTitle: 'Exportar gráfico em PNG',
    toastCleared: 'Campos limpos com sucesso.',
    toastShareNone: 'Realize um cálculo antes de compartilhar.',
    toastCopied: 'Resultado copiado para a área de transferência.',
    toastCopyFail: 'Não foi possível copiar.',
    toastCsvNone: 'Realize um cálculo antes de exportar.',
    toastCsvOk: 'CSV exportado com sucesso.',
    toastPngNone: 'Realize um cálculo antes de exportar.',
    toastPngOk: 'Gráfico exportado com sucesso.',
    shareTitle: '📊 Simulação de Juros Compostos',
    shareParams: '▸ Parâmetros',
    shareInitial: 'Valor Inicial',
    shareContrib: 'Aporte',
    shareRate: 'Taxa',
    sharePeriod: 'Período',
    shareResults: '▸ Resultados',
    shareFinal: 'Valor Final',
    shareInvested: 'Total Investido',
    shareInterest: 'Juros Obtidos',
    shareReturn: 'Rentabilidade',
    shareContribLabels: { none: 'Sem aportes', daily: 'Diário', monthly: 'Mensal', annual: 'Anual' },
    shareTimeLabels: { years: 'anos', months: 'meses', days: 'dias' },
    shareNavTitle: 'Simulação de Juros Compostos',
    csvHeader: ['Período (mês)', 'Patrimônio Total', 'Total Investido', 'Juros Acumulados'],
    csvFilename: 'simulacao_juros_compostos.csv',
    pngFilename: 'evolucao_patrimonio.png',
    periodMonth: 'Mês',
    periodYear: 'Ano',
    placeholderPrincipal: '10.000,00',
    placeholderContribution: '500,00',
    placeholderRate: '1,00',
    locale: 'pt-BR',
    currency: 'BRL',
    ariaGrowthChart: 'Gráfico de evolução do patrimônio',
    ariaCompChart: 'Comparação entre capital investido e juros obtidos',
    ariaScenChart: 'Gráfico comparativo dos cenários',
    ariaRateFreq: 'Frequência da taxa',
    ariaTimeUnit: 'Unidade de tempo',
    ariaActions: 'Ações',
  },

  'en': {
    pageTitle: 'Compound Interest Calculator',
    pageDesc: 'Compound interest calculator with interactive charts, scenarios, and data export.',
    brandTitle: 'Calculator',
    brandSubtitle: 'Compound Interest',
    themeDark: 'Dark mode',
    themeLight: 'Light mode',
    sectionParams: 'Parameters',
    labelPrincipal: 'Initial Amount',
    currencyPrefix: '$',
    labelContribution: 'Periodic Contribution',
    contribNone: 'No contributions',
    contribDaily: 'Daily',
    contribMonthly: 'Monthly',
    contribAnnual: 'Annual',
    labelRate: 'Interest Rate',
    rateAnnual: 'p.a.',
    rateMonthly: 'p.m.',
    rateDaily: 'p.d.',
    labelPeriod: 'Period',
    timeYears: 'Years',
    timeMonths: 'Months',
    timeDays: 'Days',
    resultBalance: 'Final Value',
    resultInvested: 'Total Invested',
    resultInterest: 'Interest Earned',
    resultReturn: 'Return',
    resultCount: 'Contributions Made',
    sectionGrowth: 'Investment Growth',
    chartGrowthTitle: 'Portfolio Growth',
    chartCompTitle: 'Capital vs Interest',
    chartCompResultLabel: 'Result',
    chartGrowthDataset0: 'Total Portfolio',
    chartGrowthDataset1: 'Total Invested',
    chartCompDataset0: 'Invested Capital',
    chartCompDataset1: 'Interest Earned',
    chartScenDataset0: 'Invested Capital',
    chartScenDataset1: 'Interest Earned',
    sectionScenarios: 'Simulation Scenarios',
    sectionScenariosDesc: 'Compare different rates while keeping other parameters unchanged.',
    scenConservative: 'Conservative',
    scenBase: 'Base',
    scenOptimistic: 'Optimistic',
    scenChartTitle: 'Scenario Comparison',
    scenLabelBalance: 'Final Value',
    scenLabelInterest: 'Interest Earned',
    scenLabelReturn: 'Return',
    scenLabelRate: 'Rate',
    scenLabels: ['Conservative', 'Base', 'Optimistic'],
    btnClear: 'Clear',
    btnShare: 'Share',
    btnCsv: 'Export CSV',
    btnPng: 'Export PNG',
    btnClearTitle: 'Clear all fields',
    btnShareTitle: 'Share result',
    btnCsvTitle: 'Export data as CSV',
    btnPngTitle: 'Export chart as PNG',
    toastCleared: 'Fields cleared successfully.',
    toastShareNone: 'Please calculate first before sharing.',
    toastCopied: 'Result copied to clipboard.',
    toastCopyFail: 'Could not copy to clipboard.',
    toastCsvNone: 'Please calculate first before exporting.',
    toastCsvOk: 'CSV exported successfully.',
    toastPngNone: 'Please calculate first before exporting.',
    toastPngOk: 'Chart exported successfully.',
    shareTitle: '📊 Compound Interest Simulation',
    shareParams: '▸ Parameters',
    shareInitial: 'Initial Amount',
    shareContrib: 'Contribution',
    shareRate: 'Rate',
    sharePeriod: 'Period',
    shareResults: '▸ Results',
    shareFinal: 'Final Value',
    shareInvested: 'Total Invested',
    shareInterest: 'Interest Earned',
    shareReturn: 'Return',
    shareContribLabels: { none: 'No contributions', daily: 'Daily', monthly: 'Monthly', annual: 'Annual' },
    shareTimeLabels: { years: 'years', months: 'months', days: 'days' },
    shareNavTitle: 'Compound Interest Simulation',
    csvHeader: ['Period (month)', 'Total Portfolio', 'Total Invested', 'Accumulated Interest'],
    csvFilename: 'compound_interest_simulation.csv',
    pngFilename: 'portfolio_growth.png',
    periodMonth: 'Month',
    periodYear: 'Year',
    placeholderPrincipal: '10,000.00',
    placeholderContribution: '500.00',
    placeholderRate: '1.00',
    locale: 'en-US',
    currency: 'USD',
    ariaGrowthChart: 'Portfolio growth chart',
    ariaCompChart: 'Comparison of invested capital and interest earned',
    ariaScenChart: 'Scenario comparison chart',
    ariaRateFreq: 'Rate frequency',
    ariaTimeUnit: 'Time unit',
    ariaActions: 'Actions',
  },

  'es': {
    pageTitle: 'Calculadora de Interés Compuesto',
    pageDesc: 'Calculadora de interés compuesto con gráficos interactivos, escenarios y exportación de datos.',
    brandTitle: 'Calculadora',
    brandSubtitle: 'Interés Compuesto',
    themeDark: 'Modo oscuro',
    themeLight: 'Modo claro',
    sectionParams: 'Parámetros',
    labelPrincipal: 'Valor Inicial',
    currencyPrefix: '$',
    labelContribution: 'Aporte Periódico',
    contribNone: 'Sin aportes',
    contribDaily: 'Diario',
    contribMonthly: 'Mensual',
    contribAnnual: 'Anual',
    labelRate: 'Tasa de Interés',
    rateAnnual: 'a.a.',
    rateMonthly: 'a.m.',
    rateDaily: 'a.d.',
    labelPeriod: 'Período',
    timeYears: 'Años',
    timeMonths: 'Meses',
    timeDays: 'Días',
    resultBalance: 'Valor Final',
    resultInvested: 'Total Invertido',
    resultInterest: 'Intereses Obtenidos',
    resultReturn: 'Rentabilidad',
    resultCount: 'Aportes Realizados',
    sectionGrowth: 'Evolución de la Inversión',
    chartGrowthTitle: 'Crecimiento del Patrimonio',
    chartCompTitle: 'Capital vs Intereses',
    chartCompResultLabel: 'Resultado',
    chartGrowthDataset0: 'Patrimonio Total',
    chartGrowthDataset1: 'Total Invertido',
    chartCompDataset0: 'Capital Invertido',
    chartCompDataset1: 'Intereses Obtenidos',
    chartScenDataset0: 'Capital Invertido',
    chartScenDataset1: 'Intereses Obtenidos',
    sectionScenarios: 'Escenarios de Simulación',
    sectionScenariosDesc: 'Compare diferentes tasas manteniendo los demás parámetros sin cambios.',
    scenConservative: 'Conservador',
    scenBase: 'Base',
    scenOptimistic: 'Optimista',
    scenChartTitle: 'Comparación de Escenarios',
    scenLabelBalance: 'Valor Final',
    scenLabelInterest: 'Intereses Obtenidos',
    scenLabelReturn: 'Rentabilidad',
    scenLabelRate: 'Tasa',
    scenLabels: ['Conservador', 'Base', 'Optimista'],
    btnClear: 'Limpiar',
    btnShare: 'Compartir',
    btnCsv: 'Exportar CSV',
    btnPng: 'Exportar PNG',
    btnClearTitle: 'Limpiar todos los campos',
    btnShareTitle: 'Compartir resultado',
    btnCsvTitle: 'Exportar datos en CSV',
    btnPngTitle: 'Exportar gráfico en PNG',
    toastCleared: 'Campos limpiados con éxito.',
    toastShareNone: 'Realice un cálculo antes de compartir.',
    toastCopied: 'Resultado copiado al portapapeles.',
    toastCopyFail: 'No se pudo copiar.',
    toastCsvNone: 'Realice un cálculo antes de exportar.',
    toastCsvOk: 'CSV exportado con éxito.',
    toastPngNone: 'Realice un cálculo antes de exportar.',
    toastPngOk: 'Gráfico exportado con éxito.',
    shareTitle: '📊 Simulación de Interés Compuesto',
    shareParams: '▸ Parámetros',
    shareInitial: 'Valor Inicial',
    shareContrib: 'Aporte',
    shareRate: 'Tasa',
    sharePeriod: 'Período',
    shareResults: '▸ Resultados',
    shareFinal: 'Valor Final',
    shareInvested: 'Total Invertido',
    shareInterest: 'Intereses Obtenidos',
    shareReturn: 'Rentabilidad',
    shareContribLabels: { none: 'Sin aportes', daily: 'Diario', monthly: 'Mensual', annual: 'Anual' },
    shareTimeLabels: { years: 'años', months: 'meses', days: 'días' },
    shareNavTitle: 'Simulación de Interés Compuesto',
    csvHeader: ['Período (mes)', 'Patrimonio Total', 'Total Invertido', 'Intereses Acumulados'],
    csvFilename: 'simulacion_interes_compuesto.csv',
    pngFilename: 'evolucion_patrimonio.png',
    periodMonth: 'Mes',
    periodYear: 'Año',
    placeholderPrincipal: '10.000,00',
    placeholderContribution: '500,00',
    placeholderRate: '1,00',
    locale: 'es-419',
    currency: 'USD',
    ariaGrowthChart: 'Gráfico de evolución del patrimonio',
    ariaCompChart: 'Comparación entre capital invertido e intereses obtenidos',
    ariaScenChart: 'Gráfico comparativo de escenarios',
    ariaRateFreq: 'Frecuencia de la tasa',
    ariaTimeUnit: 'Unidad de tiempo',
    ariaActions: 'Acciones',
  },
};

let currentLang = 'pt-BR';

function t(key) {
    const tr = TRANSLATIONS[currentLang] || TRANSLATIONS['pt-BR'];
    return (key in tr) ? tr[key] : ((TRANSLATIONS['pt-BR'] || {})[key] || key);
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
        el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        el.setAttribute('title', t(el.getAttribute('data-i18n-title')));
    });
    document.querySelectorAll('[data-i18n-content]').forEach(el => {
        el.setAttribute('content', t(el.getAttribute('data-i18n-content')));
    });

    document.documentElement.setAttribute('lang', currentLang);
    document.title = t('pageTitle');

    // Theme toggle aria-label depends on current theme, not just language
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const theme = document.documentElement.getAttribute('data-theme') || 'light';
        themeToggle.setAttribute('aria-label', theme === 'dark' ? t('themeLight') : t('themeDark'));
    }

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('lang-btn--active', btn.dataset.lang === currentLang);
    });

    // Compute numeric input placeholders from actual locale formatter (overrides static data-i18n-placeholder values)
    if (typeof formatDecimal === 'function') {
        const pl = document.getElementById('principal');
        const co = document.getElementById('contribution');
        const ra = document.getElementById('rate');
        if (pl) pl.placeholder = formatDecimal(10000, 2);
        if (co) co.placeholder = formatDecimal(500, 2);
        if (ra) ra.placeholder = formatDecimal(1, 2);
    }
}

function setLanguage(lang) {
    if (!TRANSLATIONS[lang] || lang === currentLang) return;

    // Parse existing input values with the CURRENT locale before switching
    const getVal = id => {
        const el = document.getElementById(id);
        return el ? parseNumber(el.value) : NaN;
    };
    const pre = {
        principal:    getVal('principal'),
        contribution: getVal('contribution'),
        rate:         getVal('rate'),
        scenRates: [0, 1, 2].map(i => {
            const el = document.getElementById(`scenario-${i}-rate`);
            return { val: el ? parseNumber(el.value) : NaN, userSet: el && el.dataset.userSet };
        }),
    };

    currentLang = lang;
    localStorage.setItem('cjc_lang', lang);
    applyTranslations();

    // Re-format inputs with new locale
    const fmt = (id, val, d) => {
        const el = document.getElementById(id);
        if (el && isFinite(val) && val > 0) el.value = formatDecimal(val, d);
    };
    fmt('principal',    pre.principal,    2);
    fmt('contribution', pre.contribution, 2);
    if (isFinite(pre.rate) && pre.rate > 0) {
        const el = document.getElementById('rate');
        if (el) el.value = formatDecimal(pre.rate, 4).replace(/0+$/, '').replace(/[,.]$/, '');
    }
    pre.scenRates.forEach(({ val, userSet }, i) => {
        const el = document.getElementById(`scenario-${i}-rate`);
        if (el && isFinite(val) && val > 0) {
            el.value = formatDecimal(val, 4).replace(/0+$/, '').replace(/[,.]$/, '');
            if (userSet) el.dataset.userSet = userSet; else delete el.dataset.userSet;
        }
    });

    if (typeof window.onLanguageChange === 'function') window.onLanguageChange();
}

function initLanguage() {
    const saved = localStorage.getItem('cjc_lang');
    if (saved && TRANSLATIONS[saved]) {
        currentLang = saved;
        return;
    }
    const bl = (navigator.language || '').toLowerCase();
    if (bl.startsWith('pt')) currentLang = 'pt-BR';
    else if (bl.startsWith('es')) currentLang = 'es';
    else currentLang = 'en';
}
