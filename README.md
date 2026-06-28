# Compound Interest Calculator

A client-side compound interest calculator with interactive charts, multi-language support, and data export. 

## Features

* Real-time calculation as you type (no submit button)
* Optional periodic contributions (daily, monthly, or annual)
* Interest rate input in annual, monthly, or daily frequency with automatic compound conversion
* Time period in years, months, or days
* Interactive charts powered by Chart.js
  * Portfolio growth over time (line chart)
  * Capital vs interest breakdown (stacked bar chart)
  * Side-by-side scenario comparison chart
* Three simulation scenarios (conservative, base, optimistic) with editable rates
* Dark and light theme toggle
* Export results as CSV or the growth chart as PNG
* Share results via the Web Share API or clipboard copy
* State persisted in `localStorage` so values survive page reloads
* Multilingual: Portuguese (pt-BR), English (en), and Spanish (es)

## Usage

1. Clone or download the repository.
2. Open `index.html` in a browser.
3. Fill in the initial amount, interest rate, and period. Results update instantly.

## File Structure

| File | Purpose |
|------|---------|
| `index.html` | Application markup and layout |
| `style.css` | All styling and theming |
| `script.js` | Calculation engine and UI logic |
| `charts.js` | Chart.js wrappers and update helpers |
| `utils.js` | Number parsing, formatting, storage, and debounce utilities |
| `i18n.js` | Translation strings and language switching logic |

## Calculation Model

The calculator simulates compound interest month by month:

1. At the start of each month the balance is multiplied by the monthly equivalent of the chosen rate.
2. If periodic contributions are enabled they are added at each applicable interval.
3. The monthly rate is derived from the input rate via the compound equivalence formula so that daily, monthly, and annual rates produce consistent results.

## Browser Support

Works in any browser that supports ES6, the Intl API, and Canvas (Chrome, Firefox, Safari, Edge).
