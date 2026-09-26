// StockSense Alerts & Risk Monitoring View
// Faithfully matches Stitch "Precision Slate ERP" Visual Specification

import { store } from '../store/dataStore.js';
import { showToast } from '../components/Toast.js';

let activeAlertFilter = 'ALL';

export function renderAlertsView() {
  const products = store.getProducts();

  // Dynamic alerts generated from live inventory state
  const rawAlerts = [
    ...products.filter(p => p.totalStock === 0).map(p => ({
      id: `ALT-CRIT-${p.sku}`,
      severity: 'CRITICAL',
      type: 'OUT_OF_STOCK',
      title: `Zero Stockout: ${p.name} (${p.sku})`,
      message: `Complete stock depletion across all warehouse locations. Current level: 0 ${p.uom}. Safety threshold: ${p.minStock} ${p.uom}. Immediate production halt risk.`,
      sku: p.sku,
      location: 'Global (All Facilities)',
      currentVal: `0 ${p.uom}`,
      targetVal: `${p.minStock} ${p.uom}`,
      timestamp: 'Today, 09:12 AM',
      recommendedAction: `Emergency PO of ${Math.max(p.minStock * 2, 20)} ${p.uom} required.`,
      actionType: 'REORDER'
    })),
    ...products.filter(p => p.totalStock > 0 && p.totalStock <= p.minStock).map(p => ({
      id: `ALT-LOW-${p.sku}`,
      severity: 'HIGH',
      type: 'LOW_STOCK',
      title: `Safety Buffer Breached: ${p.name} (${p.sku})`,
      message: `Current on-hand inventory (${p.totalStock} ${p.uom}) is at or below minimum reorder point (${p.minStock} ${p.uom}). Depletion predicted within 2.5 days.`,
      sku: p.sku,
      location: 'Main Warehouse B-04',
      currentVal: `${p.totalStock} ${p.uom}`,
      targetVal: `${p.minStock} ${p.uom}`,
      timestamp: 'Today, 08:45 AM',
      recommendedAction: `Trigger replenishment transfer or supplier purchase order.`,
      actionType: 'REORDER'
    })),
    {
      id: 'ALT-CAP-01',
      severity: 'WARNING',
      type: 'CAPACITY_OVERLOAD',
      title: 'Volumetric Threshold Exceeded: Production Plant A',
      message: 'Cantilever Rack A-01 volumetric capacity reached 91.2% (18,240 / 20,000 kg). Exceeds recommended 85% operational buffer.',
      sku: 'FACILITY-PLANT-A',
      location: 'Production Plant A - Rack A-01',
      currentVal: '91.2%',
      targetVal: '< 85.0%',
      timestamp: 'Today, 07:30 AM',
      recommendedAction: 'Schedule outbound internal transfer to Logistics Hub or Main Warehouse.',
      actionType: 'TRANSFER'
    },
    {
      id: 'ALT-AUDIT-02',
      severity: 'WARNING',
      type: 'COUNT_DISCREPANCY',
      title: 'Cycle Count Variance Flag: Steel Rod 10mm (SR001)',
      message: 'Physical audit on Production Rack recorded variance of -3.0 kg from book balance (77 kg vs 80 kg). Shrinkage flagged.',
      sku: 'SR001',
      location: 'Production Floor Rack',
      currentVal: '-3.0 kg',
      targetVal: '0.0 kg',
      timestamp: 'Yesterday, 14:15 PM',
      recommendedAction: 'Verify scrap cutting logs with Production Shift Supervisor.',
      actionType: 'AUDIT'
    }
  ];

  const filteredAlerts = rawAlerts.filter(a => {
    if (activeAlertFilter === 'ALL') return true;
    if (activeAlertFilter === 'CRITICAL') return a.severity === 'CRITICAL';
    if (activeAlertFilter === 'HIGH') return a.severity === 'HIGH';
    if (activeAlertFilter === 'WARNING') return a.severity === 'WARNING';
    return true;
  });

  const criticalCount = rawAlerts.filter(a => a.severity === 'CRITICAL').length;
  const highCount = rawAlerts.filter(a => a.severity === 'HIGH').length;
  const warningCount = rawAlerts.filter(a => a.severity === 'WARNING').length;

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
            <span class="text-primary font-medium">Alerts &amp; Risks</span>
          </div>
          <div class="flex items-center gap-space-sm">
            <h1 class="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">Active Alerts &amp; Risk Monitoring</h1>
            <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-sm font-semibold bg-status-error-bg text-status-error border border-status-error/20">
              <span class="w-1.5 h-1.5 rounded-full bg-status-error animate-ping"></span>
              ${rawAlerts.length} Exceptions Active
            </span>
          </div>
          <p class="font-body-md text-body-md text-on-surface-variant mt-0.5">
            Operational exceptions, safety threshold breaches, warehouse volumetric bottlenecks, and cycle count discrepancies.
          </p>
        </div>

        <div class="flex items-center gap-space-sm flex-wrap">
          <button id="btnAcknowledgeAll" class="h-9 px-space-md bg-surface-card border border-border-subtle text-on-surface font-label-md text-label-md font-semibold rounded hover:bg-surface-subtle transition-colors flex items-center gap-space-xs shadow-sm">
            <span class="material-symbols-outlined text-[18px]">done_all</span>
            <span>Acknowledge All</span>
          </button>

          <button id="btnBulkReorder" class="h-9 px-space-md bg-primary text-white font-label-md text-label-md font-semibold rounded hover:bg-primary-hover transition-colors flex items-center gap-space-xs shadow-sm">
            <span class="material-symbols-outlined text-[18px]">shopping_cart_checkout</span>
            <span>Reorder All Depleted SKUs</span>
          </button>
        </div>
      </div>

      <!-- Severity Filter Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-space-md">
        <!-- Tab All -->
        <button class="btnFilterAlertTab text-left p-space-md rounded-md border transition-all ${activeAlertFilter === 'ALL' ? 'bg-surface-card border-primary ring-1 ring-primary shadow-sm' : 'bg-surface-card border-border-subtle hover:border-tertiary'}" data-filter="ALL">
          <div class="flex items-center justify-between">
            <span class="font-label-sm text-label-sm text-tertiary uppercase font-semibold">All Active Alerts</span>
            <span class="material-symbols-outlined text-[18px] text-tertiary">notifications</span>
          </div>
          <div class="mt-2 font-headline-lg text-headline-lg font-bold text-on-surface font-tabular-data">${rawAlerts.length}</div>
          <div class="text-label-sm text-tertiary mt-1">Across all facilities</div>
        </button>

        <!-- Tab Critical -->
        <button class="btnFilterAlertTab text-left p-space-md rounded-md border transition-all ${activeAlertFilter === 'CRITICAL' ? 'bg-status-error-bg/30 border-status-error ring-1 ring-status-error shadow-sm' : 'bg-surface-card border-border-subtle hover:border-status-error/50'}" data-filter="CRITICAL">
          <div class="flex items-center justify-between">
            <span class="font-label-sm text-label-sm text-status-error uppercase font-semibold">Critical Stockouts</span>
            <span class="material-symbols-outlined text-[18px] text-status-error">emergency</span>
          </div>
          <div class="mt-2 font-headline-lg text-headline-lg font-bold text-status-error font-tabular-data">${criticalCount}</div>
          <div class="text-label-sm text-tertiary mt-1">Zero stock on hand</div>
        </button>

        <!-- Tab High -->
        <button class="btnFilterAlertTab text-left p-space-md rounded-md border transition-all ${activeAlertFilter === 'HIGH' ? 'bg-status-warning-bg/30 border-status-warning ring-1 ring-status-warning shadow-sm' : 'bg-surface-card border-border-subtle hover:border-status-warning/50'}" data-filter="HIGH">
          <div class="flex items-center justify-between">
            <span class="font-label-sm text-label-sm text-status-warning uppercase font-semibold">Low Buffer Risk</span>
            <span class="material-symbols-outlined text-[18px] text-status-warning">warning</span>
          </div>
          <div class="mt-2 font-headline-lg text-headline-lg font-bold text-status-warning font-tabular-data">${highCount}</div>
          <div class="text-label-sm text-tertiary mt-1">Below safety minimum</div>
        </button>

        <!-- Tab Warning -->
        <button class="btnFilterAlertTab text-left p-space-md rounded-md border transition-all ${activeAlertFilter === 'WARNING' ? 'bg-surface-container-low border-primary ring-1 ring-primary shadow-sm' : 'bg-surface-card border-border-subtle hover:border-tertiary'}" data-filter="WARNING">
          <div class="flex items-center justify-between">
            <span class="font-label-sm text-label-sm text-tertiary uppercase font-semibold">Facility Warnings</span>
            <span class="material-symbols-outlined text-[18px] text-tertiary">inventory</span>
          </div>
          <div class="mt-2 font-headline-lg text-headline-lg font-bold text-on-surface font-tabular-data">${warningCount}</div>
          <div class="text-label-sm text-tertiary mt-1">Capacity &amp; variance flags</div>
        </button>
      </div>

      <!-- Alerts Detailed List -->
      <div class="space-y-space-md">
        ${filteredAlerts.length === 0 ? `
          <div class="bg-surface-card border border-border-subtle rounded-md p-12 text-center">
            <span class="material-symbols-outlined text-[48px] text-status-success mb-2">check_circle</span>
            <h3 class="font-headline-sm text-headline-sm font-bold text-on-surface">No alerts matching filter</h3>
            <p class="font-body-md text-body-md text-on-surface-variant mt-1">All monitored parameters are operating within compliant tolerances.</p>
          </div>
        ` : filteredAlerts.map(alert => {
          const isCritical = alert.severity === 'CRITICAL';
          const isHigh = alert.severity === 'HIGH';
          const borderClass = isCritical ? 'border-status-error/40 bg-surface-card' : (isHigh ? 'border-status-warning/40 bg-surface-card' : 'border-border-subtle bg-surface-card');
          const badgeClass = isCritical ? 'bg-status-error-bg text-status-error border-status-error/30' : (isHigh ? 'bg-status-warning-bg text-status-warning border-status-warning/30' : 'bg-surface-subtle text-on-surface-variant border-border-subtle');
          const icon = isCritical ? 'report' : (isHigh ? 'warning' : 'info');

          return `
            <div class="rounded-md border ${borderClass} p-space-md shadow-sm hover:shadow transition-shadow">
              <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-space-md">
                <div class="flex items-start gap-space-md">
                  <div class="p-2.5 rounded-md ${badgeClass} shrink-0 mt-0.5">
                    <span class="material-symbols-outlined text-[24px]">${icon}</span>
                  </div>

                  <div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="font-label-sm text-label-sm font-bold uppercase px-2 py-0.5 rounded border ${badgeClass}">
                        ${alert.severity}
                      </span>
                      <span class="font-body-sm font-bold text-on-surface">${alert.title}</span>
                      <span class="font-label-sm text-label-sm text-tertiary font-tabular-data">• ${alert.timestamp}</span>
                    </div>

                    <p class="font-body-sm text-body-sm text-on-surface-variant mt-1.5 leading-relaxed max-w-4xl">
                      ${alert.message}
                    </p>

                    <!-- Context strip -->
                    <div class="mt-3 flex items-center gap-space-md flex-wrap text-label-sm text-tertiary">
                      <div>Location: <strong class="text-on-surface">${alert.location}</strong></div>
                      <span>•</span>
                      <div>Current: <strong class="${isCritical ? 'text-status-error' : (isHigh ? 'text-status-warning' : 'text-on-surface')}">${alert.currentVal}</strong></div>
                      <span>•</span>
                      <div>Required Buffer: <strong class="text-on-surface">${alert.targetVal}</strong></div>
                      <span>•</span>
                      <div class="text-primary font-medium flex items-center gap-1">
                        <span class="material-symbols-outlined text-[14px]">lightbulb</span>
                        <span>${alert.recommendedAction}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Action Button Group -->
                <div class="flex items-center gap-space-xs shrink-0 self-end lg:self-center">
                  ${alert.actionType === 'REORDER' ? `
                    <button class="h-8 px-space-md bg-primary text-white font-label-sm text-label-sm font-semibold rounded hover:bg-primary-hover transition-colors flex items-center gap-1 btnAlertReorder" data-sku="${alert.sku}">
                      <span class="material-symbols-outlined text-[16px]">shopping_cart</span>
                      <span>Quick Reorder</span>
                    </button>
                  ` : alert.actionType === 'TRANSFER' ? `
                    <a href="#/operations/transfers" class="h-8 px-space-md bg-primary text-white font-label-sm text-label-sm font-semibold rounded hover:bg-primary-hover transition-colors flex items-center gap-1">
                      <span class="material-symbols-outlined text-[16px]">sync_alt</span>
                      <span>Initiate Transfer</span>
                    </a>
                  ` : `
                    <a href="#/stock-ledger" class="h-8 px-space-md bg-surface-subtle border border-border-subtle text-on-surface font-label-sm text-label-sm font-semibold rounded hover:bg-surface-container-low transition-colors flex items-center gap-1">
                      <span class="material-symbols-outlined text-[16px]">receipt_long</span>
                      <span>Inspect Audit Log</span>
                    </a>
                  `}

                  <button class="h-8 px-space-sm bg-surface-card border border-border-subtle text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm rounded hover:bg-surface-subtle transition-colors btnDismissAlert" data-id="${alert.id}">
                    Acknowledge
                  </button>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

export function initAlertsViewEvents() {
  // Filter tabs
  document.querySelectorAll('.btnFilterAlertTab').forEach(btn => {
    btn.addEventListener('click', (e) => {
      activeAlertFilter = e.currentTarget.dataset.filter;
      const appContainer = document.getElementById('mainContentArea');
      if (appContainer) {
        appContainer.innerHTML = renderAlertsView();
        initAlertsViewEvents();
      }
    });
  });

  // Reorder single alert
  document.querySelectorAll('.btnAlertReorder').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const sku = e.currentTarget.dataset.sku;
      showToast(`Replenishment Purchase Order draft created for ${sku}.`, 'success');
    });
  });

  // Bulk reorder
  const btnBulk = document.getElementById('btnBulkReorder');
  if (btnBulk) {
    btnBulk.addEventListener('click', () => {
      showToast('Emergency purchase orders created for all depleted & low-buffer SKUs.', 'success');
    });
  }

  // Acknowledge all
  const btnAckAll = document.getElementById('btnAcknowledgeAll');
  if (btnAckAll) {
    btnAckAll.addEventListener('click', () => {
      showToast('All 4 active alerts acknowledged by Shift Supervisor.', 'info');
    });
  }

  // Dismiss single
  document.querySelectorAll('.btnDismissAlert').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      showToast(`Alert ${id} acknowledged and archived.`, 'info');
      e.currentTarget.closest('.rounded-md').style.opacity = '0.5';
    });
  });
}
