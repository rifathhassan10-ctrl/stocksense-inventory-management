// StockSense Stock Ledger & Audit Trail View (Screen 4)
// Faithfully matches Stitch Screen 7df2821cfa7b4bfe9baa170793aeea4b

import { store } from '../store/dataStore.js';
import { showToast } from '../components/Toast.js';

let currentLedgerFilterType = 'ALL';

export function renderStockLedgerView() {
  const ledger = store.getLedgerEntries();
  const selectedWh = store.getSelectedWarehouse();

  // Filter ledger
  let filtered = ledger;
  if (selectedWh !== 'all') {
    filtered = filtered.filter(l => l.location.includes(selectedWh) || l.locationFlow.includes(selectedWh));
  }
  if (currentLedgerFilterType !== 'ALL') {
    filtered = filtered.filter(l => {
      if (currentLedgerFilterType === 'INTERNAL_TRANSFER') {
        return l.operationType === 'TRANSFER' || l.operationType === 'INTERNAL_TRANSFER';
      }
      return l.operationType === currentLedgerFilterType;
    });
  }

  return `
    <div class="flex flex-col w-full animate-fade-in">
      <!-- Top Title & Subheader -->
      <div class="flex flex-col gap-space-md mb-space-lg">
        <div class="flex items-center gap-space-xs text-body-sm font-body-sm text-tertiary">
          <span class="hover:text-primary cursor-pointer transition-colors" onclick="window.location.hash='#/dashboard'">Home</span>
          <span class="text-outline-variant">/</span>
          <span class="hover:text-primary cursor-pointer transition-colors" onclick="window.location.hash='#/operations'">Operations</span>
          <span class="text-outline-variant">/</span>
          <span class="text-on-surface font-label-md font-semibold">Stock Ledger</span>
        </div>

        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          <div class="flex flex-col gap-1">
            <div class="flex items-center gap-space-sm flex-wrap">
              <h1 class="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">Stock Ledger &amp; Audit Trail</h1>
              <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-status-success-bg border border-status-success/30 text-status-success text-label-sm font-label-sm font-semibold tracking-wide uppercase">
                <span class="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse"></span>
                Immutable Log
              </span>
            </div>
            <p class="font-body-md text-body-md text-tertiary max-w-3xl">
              Complete chronological audit log of all validated stock receipts, deliveries, internal transfers, and physical count adjustments.
            </p>
          </div>

          <div class="flex items-center gap-space-sm self-start lg:self-auto flex-wrap">
            <button class="inline-flex items-center gap-1.5 px-space-md py-2 bg-surface-card hover:bg-surface-subtle border border-border-strong text-on-surface font-label-lg text-label-lg rounded shadow-sm transition-all active:scale-95 font-medium" onclick="window.downloadCSV()">
              <span class="material-symbols-outlined text-[18px] text-tertiary">download</span>
              <span>Export CSV</span>
            </button>
            <button class="inline-flex items-center gap-1.5 px-space-md py-2 bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg rounded shadow-sm transition-all active:scale-95 font-semibold" onclick="window.exportAuditReportPDF()">
              <span class="material-symbols-outlined text-[18px]">verified</span>
              <span>Export Audit Report</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Section 1: KPI Summary Strip (4 Cards) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md mb-space-lg">
        <!-- Card 1 -->
        <div class="bg-surface-card rounded-lg p-space-md shadow-sm border border-border-subtle flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <span class="font-label-sm text-label-sm uppercase tracking-wider text-tertiary font-semibold">Total Movements Logged</span>
            <span class="p-1.5 rounded bg-surface-container text-primary">
              <span class="material-symbols-outlined text-[18px]">receipt_long</span>
            </span>
          </div>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="font-display text-display text-on-surface tracking-tight font-bold">1,842</span>
            <span class="font-label-sm text-label-sm text-status-success font-semibold flex items-center">
              <span class="material-symbols-outlined text-[14px]">trending_up</span>+12.4%
            </span>
          </div>
          <div class="mt-3 flex items-center justify-between text-body-sm font-body-sm text-tertiary pt-2 border-t border-border-subtle">
            <span>Verified cryptographic state</span>
            <span class="font-label-sm font-bold text-primary">Live Sync</span>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="bg-surface-card rounded-lg p-space-md shadow-sm border border-border-subtle flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <span class="font-label-sm text-label-sm uppercase tracking-wider text-tertiary font-semibold">Today's Stock Inflow</span>
            <span class="p-1.5 rounded bg-status-success-bg text-status-success">
              <span class="material-symbols-outlined text-[18px]">south_west</span>
            </span>
          </div>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="font-display text-display text-on-surface tracking-tight font-bold">+150</span>
            <span class="font-body-md text-body-md text-tertiary">kg / Units</span>
          </div>
          <div class="mt-3 flex items-center justify-between text-body-sm font-body-sm text-tertiary pt-2 border-t border-border-subtle">
            <span>3 Receipts Validated</span>
            <span class="font-label-sm font-bold text-status-success">100% Inbound Passed</span>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="bg-surface-card rounded-lg p-space-md shadow-sm border border-border-subtle flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <span class="font-label-sm text-label-sm uppercase tracking-wider text-tertiary font-semibold">Today's Stock Outflow</span>
            <span class="p-1.5 rounded bg-status-danger-bg text-status-danger">
              <span class="material-symbols-outlined text-[18px]">north_east</span>
            </span>
          </div>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="font-display text-display text-on-surface tracking-tight font-bold">-30</span>
            <span class="font-body-md text-body-md text-tertiary">Units</span>
          </div>
          <div class="mt-3 flex items-center justify-between text-body-sm font-body-sm text-tertiary pt-2 border-t border-border-subtle">
            <span>2 Orders Dispatched</span>
            <span class="font-label-sm font-bold text-status-info">Ready for transit</span>
          </div>
        </div>

        <!-- Card 4 -->
        <div class="bg-surface-card rounded-lg p-space-md shadow-sm border border-border-subtle flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <span class="font-label-sm text-label-sm uppercase tracking-wider text-tertiary font-semibold">Total Adjustments Net</span>
            <span class="p-1.5 rounded bg-status-warning-bg text-status-warning">
              <span class="material-symbols-outlined text-[18px]">balance</span>
            </span>
          </div>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="font-display text-display text-on-surface tracking-tight font-bold text-status-warning">-3</span>
            <span class="font-body-md text-body-md text-tertiary">kg</span>
          </div>
          <div class="mt-3 flex items-center justify-between text-body-sm font-body-sm text-tertiary pt-2 border-t border-border-subtle">
            <span>Physical audit delta</span>
            <span class="font-label-sm font-bold text-status-success">99.8% Accuracy</span>
          </div>
        </div>
      </div>

      <!-- Section 2: Master Filter Bar & Table Panel -->
      <div class="bg-surface-card rounded-lg border border-border-subtle shadow-sm flex flex-col mb-space-xl">
        <!-- Filter Controls Area -->
        <div class="p-space-md border-b border-border-subtle flex flex-col gap-space-md">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-space-sm">
            <!-- Search Query -->
            <div class="relative flex-1 max-w-lg">
              <span class="material-symbols-outlined absolute left-3 top-2 text-[18px] text-tertiary pointer-events-none">search</span>
              <input 
                id="ledgerSearchInput" 
                class="w-full h-9 pl-9 pr-3 bg-surface-subtle border border-border-strong rounded text-body-sm font-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-all shadow-inner" 
                placeholder="Search by Product Name, SKU, Reference #, or User..." 
                type="text"
                oninput="window.filterLedgerAuditRows(this.value)"
              />
            </div>

            <!-- Filters -->
            <div class="flex flex-wrap items-center gap-space-sm">
              <div class="flex items-center bg-surface-subtle border border-border-strong rounded h-9 px-2.5 gap-1.5">
                <span class="material-symbols-outlined text-[18px] text-tertiary">calendar_today</span>
                <span class="text-body-sm font-body-sm text-on-surface font-medium whitespace-nowrap">Today (${new Date().toLocaleDateString()})</span>
              </div>

              <div class="flex items-center bg-surface-subtle border border-border-strong rounded h-9 px-2.5 gap-1.5">
                <span class="material-symbols-outlined text-[18px] text-tertiary">warehouse</span>
                <select id="ledgerLocationFilter" class="bg-transparent text-label-md font-label-md text-on-surface font-medium focus:outline-none cursor-pointer" onchange="window.setDashboardWarehouse(this.value)">
                  <option value="all" ${selectedWh === 'all' ? 'selected' : ''}>All Locations</option>
                  <option value="Main Warehouse" ${selectedWh === 'Main Warehouse' ? 'selected' : ''}>Main Warehouse</option>
                  <option value="Production Rack" ${selectedWh === 'Production Rack' ? 'selected' : ''}>Production Rack</option>
                  <option value="Warehouse 2" ${selectedWh === 'Warehouse 2' ? 'selected' : ''}>Warehouse 2</option>
                </select>
              </div>

              <div class="flex items-center bg-surface-subtle border border-border-strong rounded h-9 px-2.5 gap-1.5">
                <span class="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
                <select class="bg-transparent text-label-md font-label-md text-on-surface font-medium focus:outline-none cursor-pointer">
                  <option>DONE / Validated</option>
                  <option>All Statuses</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Type Filter Pills -->
          <div class="flex flex-wrap items-center gap-1.5 pt-1">
            <span class="font-label-sm text-label-sm text-tertiary mr-1 uppercase tracking-wider font-semibold">Type:</span>
            <button class="filter-pill ${currentLedgerFilterType === 'ALL' ? 'active bg-surface-container text-primary font-semibold border-primary/30' : 'bg-surface-subtle text-on-surface-variant hover:text-on-surface'} px-3 py-1 rounded-full text-label-md font-label-md border border-border-subtle transition-colors" onclick="window.setLedgerFilterType('ALL', this)">
              All Types (${ledger.length})
            </button>
            <button class="filter-pill ${currentLedgerFilterType === 'RECEIPT' ? 'active bg-surface-container text-primary font-semibold border-primary/30' : 'bg-surface-subtle text-on-surface-variant hover:text-on-surface'} px-3 py-1 rounded-full text-label-md font-label-md border border-border-subtle transition-colors" onclick="window.setLedgerFilterType('RECEIPT', this)">
              RECEIPT (+)
            </button>
            <button class="filter-pill ${currentLedgerFilterType === 'DELIVERY' ? 'active bg-surface-container text-primary font-semibold border-primary/30' : 'bg-surface-subtle text-on-surface-variant hover:text-on-surface'} px-3 py-1 rounded-full text-label-md font-label-md border border-border-subtle transition-colors" onclick="window.setLedgerFilterType('DELIVERY', this)">
              DELIVERY (-)
            </button>
            <button class="filter-pill ${currentLedgerFilterType === 'INTERNAL_TRANSFER' ? 'active bg-surface-container text-primary font-semibold border-primary/30' : 'bg-surface-subtle text-on-surface-variant hover:text-on-surface'} px-3 py-1 rounded-full text-label-md font-label-md border border-border-subtle transition-colors" onclick="window.setLedgerFilterType('INTERNAL_TRANSFER', this)">
              INTERNAL_TRANSFER (⇄)
            </button>
            <button class="filter-pill ${currentLedgerFilterType === 'ADJUSTMENT' ? 'active bg-surface-container text-primary font-semibold border-primary/30' : 'bg-surface-subtle text-on-surface-variant hover:text-on-surface'} px-3 py-1 rounded-full text-label-md font-label-md border border-border-subtle transition-colors" onclick="window.setLedgerFilterType('ADJUSTMENT', this)">
              ADJUSTMENT (⚖)
            </button>
          </div>
        </div>

        <!-- Master Ledger Table with Expandable Audit Drawers -->
        <div class="w-full overflow-x-auto">
          <table class="w-full border-collapse text-left" id="auditLedgerTable">
            <thead>
              <tr class="bg-surface-subtle text-tertiary font-label-sm text-label-sm uppercase tracking-wider border-b border-border-subtle select-none font-semibold">
                <th class="py-2.5 px-4 w-10"></th>
                <th class="py-2.5 px-4 whitespace-nowrap">Date &amp; Time</th>
                <th class="py-2.5 px-4 whitespace-nowrap">Product &amp; SKU</th>
                <th class="py-2.5 px-4 whitespace-nowrap">Transaction Type</th>
                <th class="py-2.5 px-4 text-right whitespace-nowrap">Quantity Change</th>
                <th class="py-2.5 px-4 whitespace-nowrap">Location / Flow</th>
                <th class="py-2.5 px-4 whitespace-nowrap">Resulting Stock Snapshot</th>
                <th class="py-2.5 px-4 whitespace-nowrap">Reference #</th>
                <th class="py-2.5 px-4 whitespace-nowrap">Created By</th>
                <th class="py-2.5 px-4 text-center whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border-subtle text-tabular-data font-tabular-data text-on-surface" id="ledgerAuditTableBody">
              ${filtered.map((entry, idx) => {
                const drawerId = `drawer-${entry.id || idx}`;
                const iconId = `icon-${entry.id || idx}`;

                let typeBadge = '';
                let qtyClass = '';

                if (entry.operationType === 'RECEIPT') {
                  typeBadge = `
                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-status-success-bg text-status-success border border-status-success/30 font-semibold">
                      <span class="material-symbols-outlined text-[13px]">add</span>RECEIPT
                    </span>
                  `;
                  qtyClass = 'text-status-success font-bold';
                } else if (entry.operationType === 'TRANSFER' || entry.operationType === 'INTERNAL_TRANSFER') {
                  typeBadge = `
                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-status-info-bg text-status-info border border-status-info/30 font-semibold">
                      <span class="material-symbols-outlined text-[13px]">sync_alt</span>TRANSFER
                    </span>
                  `;
                  qtyClass = 'text-status-info font-bold';
                } else if (entry.operationType === 'DELIVERY') {
                  typeBadge = `
                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-status-danger-bg text-status-danger border border-status-danger/30 font-semibold">
                      <span class="material-symbols-outlined text-[13px]">remove</span>DELIVERY
                    </span>
                  `;
                  qtyClass = 'text-status-danger font-bold';
                } else {
                  typeBadge = `
                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-status-warning-bg text-status-warning border border-status-warning/30 font-semibold">
                      <span class="material-symbols-outlined text-[13px]">balance</span>ADJUSTMENT
                    </span>
                  `;
                  qtyClass = 'text-status-warning font-bold';
                }

                return `
                  <!-- Summary Row -->
                  <tr class="ledger-row hover:bg-surface-container-low transition-colors cursor-pointer group" onclick="window.toggleLedgerDrawer('${drawerId}', '${iconId}')">
                    <td class="py-2.5 px-4 text-center text-tertiary">
                      <span id="${iconId}" class="material-symbols-outlined text-[18px] transition-transform duration-200">chevron_right</span>
                    </td>
                    <td class="py-2.5 px-4 whitespace-nowrap text-on-surface-variant">
                      ${entry.timestamp}
                    </td>
                    <td class="py-2.5 px-4 whitespace-nowrap">
                      <div class="flex items-center gap-2">
                        <span class="font-label-md font-semibold text-on-surface">${entry.productName}</span>
                        <span class="px-1.5 py-0.5 rounded bg-surface-subtle border border-border-subtle text-[11px] font-mono text-tertiary">${entry.sku}</span>
                      </div>
                    </td>
                    <td class="py-2.5 px-4 whitespace-nowrap">
                      ${typeBadge}
                    </td>
                    <td class="py-2.5 px-4 text-right whitespace-nowrap ${qtyClass}">
                      ${entry.quantityFormatted}
                    </td>
                    <td class="py-2.5 px-4 whitespace-nowrap text-on-surface-variant font-medium">
                      ${entry.locationFlow || entry.location}
                    </td>
                    <td class="py-2.5 px-4 whitespace-nowrap text-on-surface-variant text-body-sm font-mono">
                      ${entry.snapshot || `${entry.location}: ${entry.postStock}`}
                    </td>
                    <td class="py-2.5 px-4 whitespace-nowrap">
                      <span class="text-primary font-semibold hover:underline">${entry.docRef}</span>
                    </td>
                    <td class="py-2.5 px-4 whitespace-nowrap text-body-sm">
                      <div class="flex flex-col">
                        <span class="text-on-surface font-medium">${entry.operator}</span>
                        <span class="text-[11px] text-tertiary">${entry.role || 'Staff'}</span>
                      </div>
                    </td>
                    <td class="py-2.5 px-4 text-center whitespace-nowrap">
                      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-surface-container text-primary">
                        <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>VALIDATED
                      </span>
                    </td>
                  </tr>

                  <!-- Expandable Audit Detail Drawer -->
                  <tr class="hidden bg-surface-bright border-b border-border-subtle animate-slide-up" id="${drawerId}">
                    <td class="p-space-md" colspan="10">
                      <div class="rounded-lg bg-surface-card p-space-md border border-border-subtle shadow-sm">
                        <div class="flex items-center justify-between pb-space-sm border-b border-border-subtle mb-space-sm flex-wrap gap-2">
                          <div class="flex items-center gap-2">
                            <span class="material-symbols-outlined text-primary text-[20px]">security</span>
                            <span class="font-label-md font-bold text-on-surface">Audit Inspection Detail</span>
                            <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-subtle text-tertiary border border-border-subtle font-bold">${entry.blockHash}</span>
                          </div>
                          <span class="text-label-sm text-tertiary font-semibold">Ledger Commit #14092 • Cryptographically Signed &amp; Immutable</span>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-space-md text-body-sm">
                          <div>
                            <span class="block text-label-sm uppercase text-tertiary font-semibold">Pre-Operation Stock</span>
                            <span class="font-mono text-on-surface font-bold">${entry.preStock || '0 kg'}</span>
                          </div>
                          <div>
                            <span class="block text-label-sm uppercase text-tertiary font-semibold">Post-Operation Stock</span>
                            <span class="font-mono font-bold ${qtyClass}">${entry.postStock || 'Updated'}</span>
                          </div>
                          <div>
                            <span class="block text-label-sm uppercase text-tertiary font-semibold">Authorizing Staff</span>
                            <span class="font-mono text-on-surface text-[12px]">${entry.operator} (${entry.role})</span>
                          </div>
                          <div>
                            <span class="block text-label-sm uppercase text-tertiary font-semibold">Attached Note / Ref</span>
                            <span class="text-on-surface italic">"${entry.note || 'Direct validated warehouse transaction.'}"</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// Window interactive helper functions
window.toggleLedgerDrawer = function(drawerId, iconId) {
  const drawer = document.getElementById(drawerId);
  const icon = document.getElementById(iconId);

  if (!drawer) return;
  const isHidden = drawer.classList.contains('hidden');

  if (isHidden) {
    drawer.classList.remove('hidden');
    if (icon) icon.classList.add('rotate-90');
  } else {
    drawer.classList.add('hidden');
    if (icon) icon.classList.remove('rotate-90');
  }
};

window.setLedgerFilterType = function(type, btnEl) {
  currentLedgerFilterType = type;
  document.querySelectorAll('#ledgerTableBody tr, #ledgerAuditTableBody tr').forEach(r => {});
  // Re-render view
  const app = document.getElementById('mainContentArea');
  if (app) app.innerHTML = renderStockLedgerView();
};

window.filterLedgerAuditRows = function(query) {
  const q = query.toLowerCase();
  const rows = document.querySelectorAll('#ledgerAuditTableBody tr.ledger-row');
  rows.forEach(r => {
    const txt = r.textContent.toLowerCase();
    r.style.display = txt.includes(q) ? '' : 'none';
  });
};

window.exportAuditReportPDF = function() {
  showToast('Audit Report Generated', 'Cryptographic verification report printed to document viewer.');
  window.print();
};
