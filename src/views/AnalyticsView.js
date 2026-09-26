// StockSense Predictive Analytics & ML Intelligence View
// Faithfully matches Stitch "Precision Slate ERP" Visual Specification

import { store } from '../store/dataStore.js';
import { mlService } from '../services/mlService.js';
import { showToast } from '../components/Toast.js';

let selectedSku = 'SR001';

export async function renderAnalyticsView() {
  const products = store.getProducts();
  const stockoutRisks = await mlService.predictStockoutRisks();
  const reorderSuggestions = await mlService.getReorderSuggestions();
  const anomalies = await mlService.detectAnomalies();
  const demandForecast = await mlService.getDemandForecast(selectedSku);

  const selectedProduct = products.find(p => p.sku === selectedSku) || products[0];

  // Top KPI stats
  const totalSuggestedCost = reorderSuggestions.reduce((acc, curr) => acc + parseFloat(curr.estimatedCost), 0);
  const criticalRiskCount = stockoutRisks.filter(r => r.riskLevel === 'CRITICAL_DEPLETED' || r.riskLevel === 'HIGH').length;

  return `
    <div class="space-y-space-lg">
      <!-- Breadcrumbs & Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-space-md border-b border-border-subtle pb-space-md">
        <div>
          <div class="flex items-center gap-space-xs text-body-sm font-body-sm text-tertiary mb-1">
            <a href="#/dashboard" class="hover:text-primary transition-colors">Dashboard</a>
            <span class="material-symbols-outlined text-[14px]">chevron_right</span>
            <span class="text-on-surface font-medium">Smart Intelligence</span>
            <span class="material-symbols-outlined text-[14px]">chevron_right</span>
            <span class="text-primary font-medium">Predictive Analytics</span>
          </div>
          <div class="flex items-center gap-space-sm">
            <h1 class="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">Predictive Analytics &amp; ML Intelligence</h1>
            <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-sm font-semibold bg-primary/10 text-primary border border-primary/20">
              <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              AI Model Active (v2.4-LightGBM)
            </span>
          </div>
          <p class="font-body-md text-body-md text-on-surface-variant mt-0.5">
            Statistical forecasting, Wilson Economic Order Quantity (EOQ) replenishment, and real-time shrinkage anomaly detection.
          </p>
        </div>

        <div class="flex items-center gap-space-sm flex-wrap">
          <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-surface-card border border-border-subtle rounded text-body-sm font-body-sm text-on-surface-variant">
            <span class="material-symbols-outlined text-[16px] text-status-success">speed</span>
            <span>Latency: <strong class="text-on-surface font-semibold">14ms</strong></span>
            <span class="text-border-subtle">|</span>
            <span>Confidence: <strong class="text-on-surface font-semibold">94.2%</strong></span>
          </div>

          <button id="btnRecalculateForecast" class="h-9 px-space-md bg-surface-card border border-border-subtle text-on-surface font-label-md text-label-md font-semibold rounded hover:bg-surface-subtle transition-colors flex items-center gap-space-xs shadow-sm">
            <span class="material-symbols-outlined text-[18px]">refresh</span>
            <span>Recalculate Models</span>
          </button>

          <button id="btnExportMlReport" class="h-9 px-space-md bg-primary text-white font-label-md text-label-md font-semibold rounded hover:bg-primary-hover transition-colors flex items-center gap-space-xs shadow-sm">
            <span class="material-symbols-outlined text-[18px]">download</span>
            <span>Export Forecast (PDF)</span>
          </button>
        </div>
      </div>

      <!-- Top KPI Row -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        <!-- KPI 1 -->
        <div class="bg-surface-card border border-border-subtle rounded-md p-space-md shadow-sm relative overflow-hidden">
          <div class="flex items-center justify-between">
            <span class="font-label-md text-label-md text-tertiary uppercase tracking-wider font-semibold">7-Day Projected Burn</span>
            <div class="p-2 rounded bg-primary/10 text-primary">
              <span class="material-symbols-outlined text-[20px]">trending_up</span>
            </div>
          </div>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="font-headline-lg text-headline-lg font-bold text-on-surface font-tabular-data">1,420</span>
            <span class="font-label-sm text-label-sm text-tertiary">units aggregate</span>
          </div>
          <div class="mt-2 flex items-center gap-1 text-label-sm font-semibold text-status-success">
            <span class="material-symbols-outlined text-[16px]">north_east</span>
            <span>+8.4% vs last 7-day cycle</span>
          </div>
        </div>

        <!-- KPI 2 -->
        <div class="bg-surface-card border border-border-subtle rounded-md p-space-md shadow-sm relative overflow-hidden">
          <div class="flex items-center justify-between">
            <span class="font-label-md text-label-md text-tertiary uppercase tracking-wider font-semibold">Stockout Risk Window</span>
            <div class="p-2 rounded bg-status-warning-bg text-status-warning">
              <span class="material-symbols-outlined text-[20px]">warning</span>
            </div>
          </div>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="font-headline-lg text-headline-lg font-bold text-on-surface font-tabular-data">${criticalRiskCount}</span>
            <span class="font-label-sm text-label-sm text-tertiary">SKUs &lt; 3 days</span>
          </div>
          <div class="mt-2 flex items-center gap-1 text-label-sm font-semibold text-status-error">
            <span class="material-symbols-outlined text-[16px]">priority_high</span>
            <span>Immediate PO required</span>
          </div>
        </div>

        <!-- KPI 3 -->
        <div class="bg-surface-card border border-border-subtle rounded-md p-space-md shadow-sm relative overflow-hidden">
          <div class="flex items-center justify-between">
            <span class="font-label-md text-label-md text-tertiary uppercase tracking-wider font-semibold">EOQ Reorder Value</span>
            <div class="p-2 rounded bg-surface-container text-primary">
              <span class="material-symbols-outlined text-[20px]">shopping_cart_checkout</span>
            </div>
          </div>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="font-headline-lg text-headline-lg font-bold text-on-surface font-tabular-data">$${totalSuggestedCost.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</span>
            <span class="font-label-sm text-label-sm text-tertiary">recommended POs</span>
          </div>
          <div class="mt-2 flex items-center gap-1 text-label-sm font-semibold text-tertiary">
            <span class="material-symbols-outlined text-[16px]">calculate</span>
            <span>Optimized for 18% holding cost</span>
          </div>
        </div>

        <!-- KPI 4 -->
        <div class="bg-surface-card border border-border-subtle rounded-md p-space-md shadow-sm relative overflow-hidden">
          <div class="flex items-center justify-between">
            <span class="font-label-md text-label-md text-tertiary uppercase tracking-wider font-semibold">Shrinkage Anomalies</span>
            <div class="p-2 rounded bg-status-error-bg text-status-error">
              <span class="material-symbols-outlined text-[20px]">security_update_warning</span>
            </div>
          </div>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="font-headline-lg text-headline-lg font-bold text-on-surface font-tabular-data">${anomalies.length}</span>
            <span class="font-label-sm text-label-sm text-tertiary">events flagged</span>
          </div>
          <div class="mt-2 flex items-center gap-1 text-label-sm font-semibold text-status-warning">
            <span class="material-symbols-outlined text-[16px]">visibility</span>
            <span>Requires physical recount audit</span>
          </div>
        </div>
      </div>

      <!-- Main Forecast Chart & SKU Deep Dive -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
        <!-- Interactive 7-Day Forecast (2 Cols) -->
        <div class="lg:col-span-2 bg-surface-card border border-border-subtle rounded-md p-space-lg shadow-sm flex flex-col justify-between">
          <div>
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-space-sm pb-space-md border-b border-border-subtle">
              <div>
                <h2 class="font-headline-sm text-headline-sm font-bold text-on-surface">Time-Series Consumption Forecast (7 Days)</h2>
                <p class="font-body-sm text-body-sm text-on-surface-variant">
                  Bayesian regression combining historical outbound pick rates with bill-of-materials demand.
                </p>
              </div>

              <!-- SKU Selector -->
              <div class="flex items-center gap-2">
                <label for="skuForecastSelector" class="font-label-sm text-label-sm text-tertiary font-semibold uppercase">SKU:</label>
                <select id="skuForecastSelector" class="h-8 px-2.5 bg-surface-subtle border border-border-subtle rounded text-body-sm font-body-sm text-on-surface font-medium focus:outline-none focus:border-primary">
                  ${products.map(p => `
                    <option value="${p.sku}" ${p.sku === selectedSku ? 'selected' : ''}>${p.sku} - ${p.name.substring(0, 20)}</option>
                  `).join('')}
                </select>
              </div>
            </div>

            <!-- Forecast Metrics Strip -->
            <div class="grid grid-cols-3 gap-space-sm my-space-md bg-surface-subtle p-space-sm rounded border border-border-subtle">
              <div>
                <span class="font-label-sm text-label-sm text-tertiary block">Target Product</span>
                <span class="font-body-md text-body-md font-bold text-on-surface">${demandForecast.product}</span>
              </div>
              <div>
                <span class="font-label-sm text-label-sm text-tertiary block">Confidence Band</span>
                <span class="font-body-md text-body-md font-bold text-primary">${demandForecast.confidenceScore}</span>
              </div>
              <div>
                <span class="font-label-sm text-label-sm text-tertiary block">Projected Trend</span>
                <span class="font-body-md text-body-md font-bold text-status-success">${demandForecast.trend}</span>
              </div>
            </div>

            <!-- Visual Forecast SVG Chart -->
            <div class="w-full h-64 mt-2 relative flex items-end justify-between px-4 pb-6 pt-4 bg-surface-card rounded border border-border-subtle">
              <!-- Y-Axis Gridlines -->
              <div class="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-20">
                <div class="w-full border-b border-border-subtle"></div>
                <div class="w-full border-b border-border-subtle"></div>
                <div class="w-full border-b border-border-subtle"></div>
                <div class="w-full border-b border-border-subtle"></div>
              </div>

              <!-- Forecast Bars / Projected Demand Points -->
              ${demandForecast.forecast.map((f, i) => {
                const maxDemand = 15;
                const heightPct = Math.min(100, Math.round((f.predictedDemand / maxDemand) * 100));
                const upperPct = Math.min(100, Math.round((f.upperBound / maxDemand) * 100));
                const lowerPct = Math.min(100, Math.round((f.lowerBound / maxDemand) * 100));

                return `
                  <div class="flex-1 flex flex-col items-center gap-2 group relative z-10">
                    <!-- Tooltip -->
                    <div class="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-on-surface text-surface-card text-label-sm rounded p-2 shadow-lg pointer-events-none whitespace-nowrap z-20">
                      <div class="font-bold">${f.day} Forecast</div>
                      <div>Predicted: <strong>${f.predictedDemand} ${selectedProduct.uom}</strong></div>
                      <div class="text-[10px] text-tertiary">Range: ${f.lowerBound} - ${f.upperBound} ${selectedProduct.uom}</div>
                    </div>

                    <!-- Range Marker Line -->
                    <div class="w-full flex items-center justify-center relative" style="height: 180px;">
                      <!-- Confidence range background bar -->
                      <div class="w-8 rounded bg-primary/10 border-t border-b border-primary/30 absolute" style="bottom: ${lowerPct}%; height: ${Math.max(8, upperPct - lowerPct)}%;"></div>
                      
                      <!-- Main predicted demand column -->
                      <div class="w-4 rounded-t bg-primary transition-all duration-300 group-hover:bg-primary-hover absolute bottom-0" style="height: ${heightPct}%;"></div>
                    </div>

                    <!-- X-Axis Label -->
                    <span class="font-label-sm text-label-sm text-on-surface-variant font-medium">${f.day}</span>
                    <span class="font-tabular-data text-[11px] text-tertiary">${f.predictedDemand}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Chart Legend -->
          <div class="flex items-center justify-between pt-space-md border-t border-border-subtle text-label-sm text-tertiary mt-space-md">
            <div class="flex items-center gap-space-md">
              <span class="flex items-center gap-1.5">
                <span class="w-3 h-3 rounded bg-primary"></span>
                <span>Predicted Mean Demand</span>
              </span>
              <span class="flex items-center gap-1.5">
                <span class="w-3 h-3 rounded bg-primary/20 border border-primary/40"></span>
                <span>95% Bayesian Confidence Band</span>
              </span>
            </div>
            <span>Auto-calibrated hourly</span>
          </div>
        </div>

        <!-- Right Side: Stockout Risk Depletion Radar -->
        <div class="bg-surface-card border border-border-subtle rounded-md p-space-lg shadow-sm flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between pb-space-sm border-b border-border-subtle">
              <h2 class="font-headline-sm text-headline-sm font-bold text-on-surface">Depletion Risk Radar</h2>
              <span class="material-symbols-outlined text-[20px] text-status-warning">hourglass_empty</span>
            </div>
            <p class="font-body-sm text-body-sm text-on-surface-variant mt-1 mb-space-md">
              Products with highest velocity relative to current available on-hand stock.
            </p>

            <div class="space-y-space-sm">
              ${stockoutRisks.slice(0, 4).map(risk => {
                const isCritical = risk.riskLevel === 'CRITICAL_DEPLETED';
                const isHigh = risk.riskLevel === 'HIGH';
                const badgeBg = isCritical ? 'bg-status-error-bg text-status-error border-status-error/30' : (isHigh ? 'bg-status-warning-bg text-status-warning border-status-warning/30' : 'bg-surface-container text-primary border-primary/20');
                
                return `
                  <div class="p-space-sm rounded border border-border-subtle bg-surface-subtle hover:border-primary/40 transition-colors">
                    <div class="flex items-start justify-between gap-2">
                      <div>
                        <div class="flex items-center gap-2">
                          <span class="font-tabular-data font-bold text-on-surface text-body-sm">${risk.sku}</span>
                          <span class="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase border ${badgeBg}">${risk.riskLevel.replace('_', ' ')}</span>
                        </div>
                        <div class="font-body-sm text-on-surface-variant line-clamp-1 mt-0.5">${risk.name}</div>
                      </div>
                      <div class="text-right">
                        <span class="font-headline-sm text-headline-sm font-bold font-tabular-data text-on-surface">${risk.predictedDepletionDays}</span>
                        <span class="text-[11px] text-tertiary block">days left</span>
                      </div>
                    </div>

                    <div class="mt-2 text-[11px] text-tertiary flex items-center justify-between border-t border-border-subtle/60 pt-1.5">
                      <span>Burn: <strong class="text-on-surface">${risk.dailyBurnRate} ${risk.uom}/day</strong></span>
                      <button class="text-primary hover:underline font-semibold flex items-center gap-0.5 btnQuickReorder" data-sku="${risk.sku}">
                        <span>Reorder</span>
                        <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <div class="pt-space-md border-t border-border-subtle mt-space-md">
            <a href="#/alerts" class="w-full h-8 flex items-center justify-center gap-1 rounded bg-surface-subtle border border-border-subtle text-primary font-label-sm font-semibold hover:bg-surface-container-low transition-colors">
              <span>View All Inventory Alerts</span>
              <span class="material-symbols-outlined text-[16px]">chevron_right</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Wilson EOQ Automated Reorder Suggestions -->
      <div class="bg-surface-card border border-border-subtle rounded-md shadow-sm overflow-hidden">
        <div class="p-space-md border-b border-border-subtle flex flex-col sm:flex-row sm:items-center sm:justify-between gap-space-sm bg-surface-subtle">
          <div>
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[20px] text-primary">auto_fix_high</span>
              <h2 class="font-headline-sm text-headline-sm font-bold text-on-surface">Wilson EOQ Intelligent Reorder Engine</h2>
            </div>
            <p class="font-body-sm text-body-sm text-on-surface-variant">
              Optimal purchase order sizes calculated via Economic Order Quantity: <code class="px-1 py-0.5 rounded bg-surface-card text-primary font-mono text-[11px]">EOQ = √((2 × Demand × Setup) / CarryingCost)</code>
            </p>
          </div>

          <button id="btnBatchApproveOrders" class="h-9 px-space-md bg-primary text-white font-label-md text-label-md font-semibold rounded hover:bg-primary-hover transition-colors flex items-center gap-space-xs shadow-sm self-start sm:self-auto">
            <span class="material-symbols-outlined text-[18px]">verified</span>
            <span>Batch Approve All Recommendations</span>
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-surface-card border-b border-border-subtle">
                <th class="py-2.5 px-space-md font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold">Product &amp; SKU</th>
                <th class="py-2.5 px-space-md font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold text-right">Current Stock</th>
                <th class="py-2.5 px-space-md font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold text-right">Min Threshold</th>
                <th class="py-2.5 px-space-md font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold text-right">Recommended EOQ</th>
                <th class="py-2.5 px-space-md font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold text-right">Estimated Cost</th>
                <th class="py-2.5 px-space-md font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold text-center">Lead Time</th>
                <th class="py-2.5 px-space-md font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border-subtle font-body-sm">
              ${reorderSuggestions.length === 0 ? `
                <tr>
                  <td colspan="7" class="py-8 text-center text-on-surface-variant">
                    All inventory levels are safely above calculated reorder thresholds. No replenishment required.
                  </td>
                </tr>
              ` : reorderSuggestions.map(item => `
                <tr class="hover:bg-surface-subtle transition-colors">
                  <td class="py-3 px-space-md">
                    <div class="font-bold text-on-surface">${item.name}</div>
                    <div class="font-tabular-data text-label-sm text-tertiary">${item.sku}</div>
                  </td>
                  <td class="py-3 px-space-md text-right font-tabular-data ${item.currentStock <= item.minStock ? 'text-status-error font-bold' : 'text-on-surface'}">
                    ${item.currentStock} ${item.uom}
                  </td>
                  <td class="py-3 px-space-md text-right font-tabular-data text-tertiary">
                    ${item.minStock} ${item.uom}
                  </td>
                  <td class="py-3 px-space-md text-right font-tabular-data">
                    <span class="inline-flex items-center gap-1 font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                      <span class="material-symbols-outlined text-[14px]">add</span>
                      ${item.recommendedOrderQty} ${item.uom}
                    </span>
                  </td>
                  <td class="py-3 px-space-md text-right font-tabular-data font-bold text-on-surface">
                    $${parseFloat(item.estimatedCost).toLocaleString()}
                  </td>
                  <td class="py-3 px-space-md text-center">
                    <span class="px-2 py-0.5 rounded text-label-sm font-semibold bg-surface-subtle border border-border-subtle text-on-surface-variant">
                      ${item.supplierLeadDays} Days
                    </span>
                  </td>
                  <td class="py-3 px-space-md text-right">
                    <button class="h-8 px-space-sm bg-primary/10 hover:bg-primary text-primary hover:text-white font-label-sm text-label-sm font-semibold rounded transition-colors btnExecuteReorder" data-sku="${item.sku}" data-qty="${item.recommendedOrderQty}">
                      Create PO
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Real-Time Anomaly Detection Feed -->
      <div class="bg-surface-card border border-border-subtle rounded-md shadow-sm p-space-lg">
        <div class="flex items-center justify-between pb-space-sm border-b border-border-subtle">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[22px] text-status-error">radar</span>
            <div>
              <h2 class="font-headline-sm text-headline-sm font-bold text-on-surface">Real-Time Shrinkage &amp; Anomaly Detection</h2>
              <p class="font-body-sm text-body-sm text-on-surface-variant">Continuous heuristic scans across ledger modifications and physical inventory adjustments.</p>
            </div>
          </div>
          <span class="font-label-sm text-label-sm font-semibold text-status-success flex items-center gap-1">
            <span class="w-2 h-2 rounded-full bg-status-success animate-ping"></span>
            Live Sentinel Active
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-space-md mt-space-md">
          ${anomalies.map(anom => `
            <div class="p-space-md rounded-md border ${anom.severity === 'HIGH' ? 'border-status-error/30 bg-status-error-bg/20' : 'border-status-warning/30 bg-status-warning-bg/20'} flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between">
                  <span class="px-2 py-0.5 rounded text-label-sm font-bold uppercase ${anom.severity === 'HIGH' ? 'bg-status-error-bg text-status-error' : 'bg-status-warning-bg text-status-warning'}">
                    ${anom.type.replace('_', ' ')}
                  </span>
                  <span class="font-label-sm text-label-sm text-tertiary">${anom.timestamp}</span>
                </div>
                <h3 class="font-body-lg text-body-lg font-bold text-on-surface mt-2">${anom.product}</h3>
                <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">${anom.note}</p>
                <div class="mt-2 text-label-sm font-medium text-tertiary">
                  Location: <strong class="text-on-surface">${anom.location}</strong> | Variance: <strong class="text-status-error">${anom.delta}</strong>
                </div>
              </div>

              <div class="mt-space-md pt-space-sm border-t border-border-subtle flex items-center justify-between">
                <span class="text-label-sm text-tertiary italic">${anom.actionRequired}</span>
                <button class="px-space-sm py-1 bg-surface-card border border-border-subtle rounded text-label-sm font-semibold text-on-surface hover:bg-surface-subtle transition-colors btnInvestigateAnomaly" data-id="${anom.id}">
                  Audit Trail
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

export function initAnalyticsViewEvents() {
  // SKU Selector Change
  const selector = document.getElementById('skuForecastSelector');
  if (selector) {
    selector.addEventListener('change', async (e) => {
      selectedSku = e.target.value;
      const appContainer = document.getElementById('mainContentArea');
      if (appContainer) {
        appContainer.innerHTML = await renderAnalyticsView();
        initAnalyticsViewEvents();
      }
    });
  }

  // Recalculate
  const btnRecalc = document.getElementById('btnRecalculateForecast');
  if (btnRecalc) {
    btnRecalc.addEventListener('click', async () => {
      showToast('ML inference recalculated across 10 SKU clusters.', 'info');
      const appContainer = document.getElementById('mainContentArea');
      if (appContainer) {
        appContainer.innerHTML = await renderAnalyticsView();
        initAnalyticsViewEvents();
      }
    });
  }

  // Export
  const btnExport = document.getElementById('btnExportMlReport');
  if (btnExport) {
    btnExport.addEventListener('click', () => {
      window.print();
    });
  }

  // Quick Reorder
  document.querySelectorAll('.btnQuickReorder, .btnExecuteReorder').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const sku = e.currentTarget.dataset.sku;
      const qty = e.currentTarget.dataset.qty || 50;
      showToast(`Generated automated replenishment Purchase Order for ${sku} (${qty} units).`, 'success');
    });
  });

  // Batch approve
  const btnBatch = document.getElementById('btnBatchApproveOrders');
  if (btnBatch) {
    btnBatch.addEventListener('click', () => {
      showToast('All 4 AI reorder recommendations approved & dispatched to procurement.', 'success');
    });
  }

  // Investigate anomaly
  document.querySelectorAll('.btnInvestigateAnomaly').forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.hash = '#/stock-ledger';
    });
  });
}
