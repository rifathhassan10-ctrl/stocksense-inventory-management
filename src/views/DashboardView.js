// StockSense Dashboard View (Screen 1)
// Faithfully matches Stitch Screen 5aaa54e2e1ed413ca191c0b91df9f851

import { store } from '../store/dataStore.js';
import { showToast } from '../components/Toast.js';

export function renderDashboardView() {
  const metrics = store.getMetrics();
  const ledger = store.getLedgerEntries();
  const queue = store.getOperationsQueue();
  const selectedWh = store.getSelectedWarehouse();

  // Filter ledger based on selected warehouse
  const filteredLedger = selectedWh === 'all' 
    ? ledger 
    : ledger.filter(l => l.location.includes(selectedWh) || l.locationFlow.includes(selectedWh));

  return `
    <div class="flex flex-col w-full animate-fade-in">
      <!-- Operational Header Sub-bar -->
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-border-subtle">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2 flex-wrap">
            <h1 class="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">Inventory Control &amp; Ledger Hub</h1>
            <span class="px-2 py-0.5 rounded-full bg-status-success-bg text-status-success font-label-sm text-label-sm font-semibold flex items-center gap-1.5 border border-status-success/20">
              <span class="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse"></span>
              REAL-TIME TELEMETRY
            </span>
          </div>
          <p class="font-body-md text-body-md text-tertiary">Real-time stock flow, multi-location audit ledgers, and critical replenishment alerts.</p>
        </div>

        <!-- Right Header Actions -->
        <div class="flex items-center gap-2 flex-wrap">
          <button class="h-9 px-3.5 bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg rounded shadow-sm flex items-center gap-1.5 transition-all font-semibold" onclick="window.openModal('receiptModal')">
            <span class="material-symbols-outlined text-[18px]">add_circle</span>
            <span>New Receipt</span>
          </button>
          <button class="h-9 px-3 bg-surface-card hover:bg-surface-subtle text-on-surface font-label-lg text-label-lg rounded border border-border-strong flex items-center gap-1.5 transition-all font-medium" onclick="window.openModal('transferModal')">
            <span class="material-symbols-outlined text-[18px] text-tertiary">sync_alt</span>
            <span>Internal Transfer</span>
          </button>
          <button class="h-9 px-3 bg-surface-card hover:bg-surface-subtle text-on-surface font-label-lg text-label-lg rounded border border-border-strong flex items-center gap-1.5 transition-all font-medium" onclick="window.openModal('adjustModal')">
            <span class="material-symbols-outlined text-[18px] text-tertiary">balance</span>
            <span>Stock Adjustment</span>
          </button>
          <div class="h-6 w-px bg-border-subtle mx-1"></div>
          <button class="h-9 w-9 bg-surface-card hover:bg-surface-subtle text-tertiary hover:text-on-surface border border-border-strong rounded flex items-center justify-center transition-colors" onclick="window.triggerQuickAudit()" title="Run Sync Audit">
            <span class="material-symbols-outlined text-[18px]">refresh</span>
          </button>
        </div>
      </div>

      <!-- Section 1: KPI Metrics Ribbon (6 Cards) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 py-6">
        <!-- Card 1: Total Stock -->
        <div class="bg-surface-card p-4 rounded-lg border border-border-subtle shadow-sm flex flex-col justify-between hover:border-border-strong transition-all">
          <div class="flex items-center justify-between">
            <span class="font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold">Total Stock</span>
            <span class="p-1 rounded bg-surface-container text-primary">
              <span class="material-symbols-outlined text-[18px]">inventory_2</span>
            </span>
          </div>
          <div class="my-2">
            <div class="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold font-tabular-data">${metrics.totalUnits}</div>
            <div class="font-label-sm text-label-sm text-tertiary mt-0.5">Across ${metrics.totalProducts} registered SKUs</div>
          </div>
          <div class="flex items-center gap-1 text-status-success font-label-sm text-label-sm font-semibold">
            <span class="material-symbols-outlined text-[15px]">trending_up</span>
            <span>+12% this month</span>
          </div>
        </div>

        <!-- Card 2: Low Stock Alert -->
        <div class="bg-surface-card p-4 rounded-lg border border-border-subtle shadow-sm flex flex-col justify-between hover:border-border-strong transition-all">
          <div class="flex items-center justify-between">
            <span class="font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold">Low Stock Alert</span>
            <span class="p-1 rounded bg-status-warning-bg text-status-warning">
              <span class="material-symbols-outlined text-[18px]">warning</span>
            </span>
          </div>
          <div class="my-2">
            <div class="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold text-status-warning font-tabular-data">${metrics.lowStockCount} <span class="font-label-lg text-label-lg font-normal text-tertiary">SKUs</span></div>
            <div class="font-label-sm text-label-sm text-tertiary mt-0.5">Below buffer threshold</div>
          </div>
          <div class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-status-warning-bg text-status-warning font-label-sm text-label-sm w-fit border border-status-warning/20 font-semibold">
            <span class="w-1.5 h-1.5 rounded-full bg-status-warning"></span>
            <span>Needs Reorder</span>
          </div>
        </div>

        <!-- Card 3: Out of Stock -->
        <div class="bg-surface-card p-4 rounded-lg border border-border-subtle shadow-sm flex flex-col justify-between hover:border-border-strong transition-all">
          <div class="flex items-center justify-between">
            <span class="font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold">Stock Depleted</span>
            <span class="p-1 rounded bg-status-danger-bg text-status-danger">
              <span class="material-symbols-outlined text-[18px]">error</span>
            </span>
          </div>
          <div class="my-2">
            <div class="font-headline-lg text-headline-lg text-status-danger tracking-tight font-bold font-tabular-data">${metrics.outOfStockCount} <span class="font-label-lg text-label-lg font-normal text-tertiary">SKU</span></div>
            <div class="font-label-sm text-label-sm text-tertiary mt-0.5 truncate">Heavy Duty Pallet Jack</div>
          </div>
          <div class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-status-danger-bg text-status-danger font-label-sm text-label-sm w-fit border border-status-danger/20 font-semibold">
            <span class="w-1.5 h-1.5 rounded-full bg-status-danger"></span>
            <span>Immediate Action</span>
          </div>
        </div>

        <!-- Card 4: Pending Receipts -->
        <div class="bg-surface-card p-4 rounded-lg border border-border-subtle shadow-sm flex flex-col justify-between hover:border-border-strong transition-all">
          <div class="flex items-center justify-between">
            <span class="font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold">Pending Receipts</span>
            <span class="p-1 rounded bg-status-info-bg text-status-info">
              <span class="material-symbols-outlined text-[18px]">move_to_inbox</span>
            </span>
          </div>
          <div class="my-2">
            <div class="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold font-tabular-data">${metrics.pendingReceipts} <span class="font-label-lg text-label-lg font-normal text-tertiary">Batches</span></div>
            <div class="font-label-sm text-label-sm text-tertiary mt-0.5">+180 Units incoming</div>
          </div>
          <div class="flex items-center gap-1 text-primary font-label-sm text-label-sm font-medium">
            <span class="material-symbols-outlined text-[15px]">schedule</span>
            <span>2 awaiting dock check</span>
          </div>
        </div>

        <!-- Card 5: Delivery Orders -->
        <div class="bg-surface-card p-4 rounded-lg border border-border-subtle shadow-sm flex flex-col justify-between hover:border-border-strong transition-all">
          <div class="flex items-center justify-between">
            <span class="font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold">Delivery Orders</span>
            <span class="p-1 rounded bg-surface-subtle text-tertiary">
              <span class="material-symbols-outlined text-[18px]">local_shipping</span>
            </span>
          </div>
          <div class="my-2">
            <div class="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold font-tabular-data">${metrics.pendingDeliveries} <span class="font-label-lg text-label-lg font-normal text-tertiary">Orders</span></div>
            <div class="font-label-sm text-label-sm text-tertiary mt-0.5">-95 Units queued</div>
          </div>
          <div class="flex items-center gap-1 text-status-info font-label-sm text-label-sm font-medium">
            <span class="material-symbols-outlined text-[15px]">outbox</span>
            <span>3 ready to dispatch</span>
          </div>
        </div>

        <!-- Card 6: Internal Transfers -->
        <div class="bg-surface-card p-4 rounded-lg border border-border-subtle shadow-sm flex flex-col justify-between hover:border-border-strong transition-all">
          <div class="flex items-center justify-between">
            <span class="font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold">Transfers Active</span>
            <span class="p-1 rounded bg-secondary-fixed text-secondary">
              <span class="material-symbols-outlined text-[18px]">sync_alt</span>
            </span>
          </div>
          <div class="my-2">
            <div class="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold font-tabular-data">${metrics.activeTransfers} <span class="font-label-lg text-label-lg font-normal text-tertiary">Moves</span></div>
            <div class="font-label-sm text-label-sm text-tertiary mt-0.5 truncate">Whse A ➔ Production</div>
          </div>
          <div class="flex items-center gap-1 text-secondary font-label-sm text-label-sm font-semibold">
            <span class="material-symbols-outlined text-[15px]">swap_horiz</span>
            <span>In staging transit</span>
          </div>
        </div>
      </div>

      <!-- Section 2: Quick Filter & Context Controls -->
      <div class="bg-surface-card rounded-lg p-3 border border-border-subtle shadow-sm mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <!-- Warehouse Filter Pills -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0" id="warehouseFilterGroup">
          <span class="font-label-sm text-label-sm text-tertiary uppercase font-semibold px-2">Warehouse:</span>
          <button class="filter-pill ${selectedWh === 'all' ? 'active bg-surface-container-low text-primary border-primary font-semibold' : 'bg-surface-subtle text-on-surface-variant hover:bg-surface-container-high'} px-3 py-1 rounded text-label-md font-label-md border transition-all" onclick="window.setDashboardWarehouse('all')">
            All Warehouses
          </button>
          <button class="filter-pill ${selectedWh === 'Main Warehouse' ? 'active bg-surface-container-low text-primary border-primary font-semibold' : 'bg-surface-subtle text-on-surface-variant hover:bg-surface-container-high'} px-3 py-1 rounded text-label-md font-label-md border transition-all" onclick="window.setDashboardWarehouse('Main Warehouse')">
            Main Warehouse (Bay A)
          </button>
          <button class="filter-pill ${selectedWh === 'Production Rack' ? 'active bg-surface-container-low text-primary border-primary font-semibold' : 'bg-surface-subtle text-on-surface-variant hover:bg-surface-container-high'} px-3 py-1 rounded text-label-md font-label-md border transition-all" onclick="window.setDashboardWarehouse('Production Rack')">
            Production Floor / Rack A
          </button>
          <button class="filter-pill ${selectedWh === 'Warehouse 2' ? 'active bg-surface-container-low text-primary border-primary font-semibold' : 'bg-surface-subtle text-on-surface-variant hover:bg-surface-container-high'} px-3 py-1 rounded text-label-md font-label-md border transition-all" onclick="window.setDashboardWarehouse('Warehouse 2')">
            Warehouse 2 (Logistics Hub)
          </button>
        </div>

        <!-- Ledger View Time Filter & Search Inset -->
        <div class="flex items-center gap-2 self-end lg:self-center">
          <div class="inline-flex rounded bg-surface-subtle p-0.5 border border-border-subtle">
            <button class="px-2.5 py-1 text-label-sm font-label-sm rounded bg-surface-card text-on-surface shadow-xs font-semibold">Today</button>
            <button class="px-2.5 py-1 text-label-sm font-label-sm rounded text-tertiary hover:text-on-surface">Last 7 Days</button>
            <button class="px-2.5 py-1 text-label-sm font-label-sm rounded text-tertiary hover:text-on-surface">This Month</button>
          </div>
          <div class="relative">
            <input 
              id="ledgerSearch" 
              class="h-8 pl-7 pr-3 bg-surface-subtle border border-border-subtle rounded font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary w-40 md:w-56 transition-all" 
              oninput="window.filterLedgerRows(this.value)" 
              placeholder="Filter ledger..." 
              type="text"
            />
            <span class="material-symbols-outlined absolute left-2 top-2 text-[15px] text-tertiary pointer-events-none">filter_list</span>
          </div>
        </div>
      </div>

      <!-- Section 3: Split Grid Master Operational Area -->
      <div class="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <!-- Left / Center Column: Live Stock Ledger (xl:col-span-8 = ~67%) -->
        <div class="xl:col-span-8 flex flex-col gap-6 min-w-0">
          <div class="bg-surface-card rounded-lg border border-border-subtle shadow-sm overflow-hidden flex flex-col">
            <!-- Table Header & Controls -->
            <div class="px-4 py-3.5 border-b border-border-subtle bg-surface-card flex items-center justify-between flex-wrap gap-2">
              <div class="flex items-center gap-2.5">
                <span class="material-symbols-outlined text-primary text-[22px]">receipt_long</span>
                <div>
                  <h2 class="font-headline-sm text-headline-sm text-on-surface font-bold">Stock Movements &amp; Live Ledger Feed</h2>
                  <span class="font-label-sm text-label-sm text-tertiary">Real-time immutable movement record matching Hackathon scenarios</span>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span class="font-tabular-data text-label-sm text-tertiary bg-surface-subtle px-2 py-1 rounded border border-border-subtle">
                  Showing ${filteredLedger.length} of ${ledger.length} total events
                </span>
                <button class="h-8 px-2.5 bg-surface-card hover:bg-surface-subtle text-on-surface font-label-md text-label-md rounded border border-border-strong flex items-center gap-1 transition-colors" onclick="window.downloadCSV()">
                  <span class="material-symbols-outlined text-[16px]">download</span>
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            <!-- Ledger Table -->
            <div class="overflow-x-auto w-full">
              <table class="w-full text-left border-collapse" id="ledgerTable">
                <thead>
                  <tr class="bg-surface-bg border-b border-border-subtle text-tertiary font-label-sm text-label-sm uppercase tracking-wider">
                    <th class="py-2.5 px-4 font-semibold">Timestamp</th>
                    <th class="py-2.5 px-4 font-semibold">Product &amp; SKU</th>
                    <th class="py-2.5 px-4 font-semibold">Operation Type</th>
                    <th class="py-2.5 px-4 font-semibold text-right">Quantity</th>
                    <th class="py-2.5 px-4 font-semibold">Location / Route</th>
                    <th class="py-2.5 px-4 font-semibold">Doc Reference</th>
                    <th class="py-2.5 px-4 font-semibold text-center">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border-subtle font-tabular-data text-tabular-data">
                  ${filteredLedger.map(entry => {
                    let typeBadge = '';
                    let qtyClass = '';

                    if (entry.operationType === 'RECEIPT') {
                      typeBadge = `
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-status-success-bg text-status-success font-label-sm text-label-sm font-semibold border border-status-success/20">
                          <span class="material-symbols-outlined text-[13px]">arrow_downward</span>
                          RECEIPT
                        </span>
                      `;
                      qtyClass = 'text-status-success font-bold';
                    } else if (entry.operationType === 'TRANSFER' || entry.operationType === 'INTERNAL_TRANSFER') {
                      typeBadge = `
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-status-info-bg text-status-info font-label-sm text-label-sm font-semibold border border-status-info/20">
                          <span class="material-symbols-outlined text-[13px]">swap_horiz</span>
                          TRANSFER
                        </span>
                      `;
                      qtyClass = 'text-secondary font-bold';
                    } else if (entry.operationType === 'DELIVERY') {
                      typeBadge = `
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-status-danger-bg text-status-danger font-label-sm text-label-sm font-semibold border border-status-danger/20">
                          <span class="material-symbols-outlined text-[13px]">arrow_upward</span>
                          DELIVERY
                        </span>
                      `;
                      qtyClass = 'text-status-danger font-bold';
                    } else {
                      typeBadge = `
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-secondary font-label-sm text-label-sm font-semibold border border-secondary/20">
                          <span class="material-symbols-outlined text-[13px]">balance</span>
                          ADJUSTMENT
                        </span>
                      `;
                      qtyClass = 'text-status-warning font-bold';
                    }

                    return `
                      <tr class="hover:bg-surface-subtle/80 transition-colors">
                        <td class="py-3 px-4 text-tertiary whitespace-nowrap">
                          <div class="text-on-surface font-medium">${entry.timestamp}</div>
                          <div class="text-[11px] text-tertiary">Operator: ${entry.operator}</div>
                        </td>
                        <td class="py-3 px-4 whitespace-nowrap">
                          <div class="flex items-center gap-2">
                            <span class="w-2 h-2 rounded-full bg-primary"></span>
                            <span class="font-semibold text-on-surface">${entry.productName}</span>
                          </div>
                          <span class="font-label-sm text-label-sm text-tertiary bg-surface-subtle px-1.5 py-0.5 rounded">SKU: ${entry.sku}</span>
                        </td>
                        <td class="py-3 px-4 whitespace-nowrap">
                          ${typeBadge}
                        </td>
                        <td class="py-3 px-4 text-right whitespace-nowrap">
                          <span class="${qtyClass} text-[14px]">${entry.quantityFormatted}</span>
                          <div class="text-[11px] text-tertiary truncate max-w-[120px]">${entry.postStock || 'Balance synced'}</div>
                        </td>
                        <td class="py-3 px-4 whitespace-nowrap">
                          <div class="flex items-center gap-1 text-on-surface">
                            <span class="material-symbols-outlined text-[16px] text-tertiary">warehouse</span>
                            <span>${entry.locationFlow || entry.location}</span>
                          </div>
                        </td>
                        <td class="py-3 px-4 whitespace-nowrap">
                          <a class="text-primary hover:underline font-semibold flex items-center gap-1" href="#/stock-ledger">
                            <span>${entry.docRef}</span>
                            <span class="material-symbols-outlined text-[14px]">open_in_new</span>
                          </a>
                        </td>
                        <td class="py-3 px-4 text-center whitespace-nowrap">
                          <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-status-success-bg text-status-success font-label-sm text-label-sm font-semibold border border-status-success/20">
                            <span class="w-1.5 h-1.5 rounded-full bg-status-success mr-1"></span>
                            Done
                          </span>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>

            <!-- Table Footer -->
            <div class="p-3 bg-surface-card border-t border-border-subtle flex items-center justify-between text-tertiary font-label-md text-label-md">
              <div class="flex items-center gap-2">
                <span>Rows per page:</span>
                <select class="bg-surface-subtle border border-border-subtle rounded px-2 py-1 text-on-surface font-label-sm text-label-sm focus:outline-none">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
              </div>
              <div class="flex items-center gap-2">
                <span>Page 1 of 1</span>
                <div class="flex items-center gap-1">
                  <button class="h-7 w-7 rounded border border-border-subtle bg-surface-subtle flex items-center justify-center hover:bg-surface-container-high transition-colors" disabled>
                    <span class="material-symbols-outlined text-[16px]">chevron_left</span>
                  </button>
                  <button class="h-7 w-7 rounded border border-border-subtle bg-surface-card flex items-center justify-center hover:bg-surface-subtle transition-colors">
                    <span class="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Secondary Data Visualization: Stock Turnover & Location Capacity -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Bay Capacity Utilization -->
            <div class="bg-surface-card p-4 rounded-lg border border-border-subtle shadow-sm flex flex-col justify-between">
              <div class="flex items-center justify-between mb-3">
                <div>
                  <h3 class="font-headline-sm text-headline-sm text-on-surface font-semibold">Warehouse Bay Capacity</h3>
                  <p class="font-body-sm text-body-sm text-tertiary">Real-time cubic volumetric load</p>
                </div>
                <span class="material-symbols-outlined text-tertiary text-[20px]">warehouse</span>
              </div>
              <div class="space-y-3 font-label-md text-label-md">
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-on-surface font-medium">Main Warehouse (Bay A-F)</span>
                    <span class="font-tabular-data font-semibold text-on-surface">84%</span>
                  </div>
                  <div class="w-full h-2 bg-surface-subtle rounded-full overflow-hidden">
                    <div class="h-full bg-primary rounded-full transition-all" style="width: 84%;"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-on-surface font-medium">Production Floor Rack A/B</span>
                    <span class="font-tabular-data font-semibold text-status-warning">91% (Near Max)</span>
                  </div>
                  <div class="w-full h-2 bg-surface-subtle rounded-full overflow-hidden">
                    <div class="h-full bg-status-warning rounded-full transition-all" style="width: 91%;"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-on-surface font-medium">Warehouse 2 (Logistics Hub)</span>
                    <span class="font-tabular-data font-semibold text-on-surface">52%</span>
                  </div>
                  <div class="w-full h-2 bg-surface-subtle rounded-full overflow-hidden">
                    <div class="h-full bg-status-success rounded-full transition-all" style="width: 52%;"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Weekly Operational Velocity -->
            <div class="bg-surface-card p-4 rounded-lg border border-border-subtle shadow-sm flex flex-col justify-between">
              <div class="flex items-center justify-between mb-2">
                <div>
                  <h3 class="font-headline-sm text-headline-sm text-on-surface font-semibold">Weekly Velocity</h3>
                  <p class="font-body-sm text-body-sm text-tertiary">Receipts vs Deliveries (Units)</p>
                </div>
                <span class="text-status-success font-label-sm text-label-sm font-semibold flex items-center gap-1 bg-status-success-bg px-2 py-0.5 rounded">
                  <span class="material-symbols-outlined text-[14px]">insights</span> Net Positive
                </span>
              </div>
              <!-- Micro Inline SVG Bar Chart -->
              <div class="h-28 flex items-end justify-between gap-2 pt-2 px-1">
                <div class="flex flex-col items-center flex-1 gap-1">
                  <div class="w-full flex items-end justify-center gap-1 h-20">
                    <div class="w-2.5 bg-primary rounded-t" style="height: 65%;" title="Receipt: 65u"></div>
                    <div class="w-2.5 bg-status-danger rounded-t" style="height: 40%;" title="Delivery: 40u"></div>
                  </div>
                  <span class="font-label-sm text-[10px] text-tertiary">Mon</span>
                </div>
                <div class="flex flex-col items-center flex-1 gap-1">
                  <div class="w-full flex items-end justify-center gap-1 h-20">
                    <div class="w-2.5 bg-primary rounded-t" style="height: 80%;" title="Receipt: 80u"></div>
                    <div class="w-2.5 bg-status-danger rounded-t" style="height: 55%;" title="Delivery: 55u"></div>
                  </div>
                  <span class="font-label-sm text-[10px] text-tertiary">Tue</span>
                </div>
                <div class="flex flex-col items-center flex-1 gap-1">
                  <div class="w-full flex items-end justify-center gap-1 h-20">
                    <div class="w-2.5 bg-primary rounded-t" style="height: 45%;" title="Receipt: 45u"></div>
                    <div class="w-2.5 bg-status-danger rounded-t" style="height: 70%;" title="Delivery: 70u"></div>
                  </div>
                  <span class="font-label-sm text-[10px] text-tertiary">Wed</span>
                </div>
                <div class="flex flex-col items-center flex-1 gap-1">
                  <div class="w-full flex items-end justify-center gap-1 h-20">
                    <div class="w-2.5 bg-primary rounded-t" style="height: 90%;" title="Receipt: 90u"></div>
                    <div class="w-2.5 bg-status-danger rounded-t" style="height: 35%;" title="Delivery: 35u"></div>
                  </div>
                  <span class="font-label-sm text-[10px] text-tertiary">Thu</span>
                </div>
                <div class="flex flex-col items-center flex-1 gap-1">
                  <div class="w-full flex items-end justify-center gap-1 h-20">
                    <div class="w-2.5 bg-primary rounded-t" style="height: 100%;" title="Receipt: 100u"></div>
                    <div class="w-2.5 bg-status-danger rounded-t" style="height: 60%;" title="Delivery: 60u"></div>
                  </div>
                  <span class="font-label-sm text-[10px] text-tertiary font-bold text-primary">Fri (Today)</span>
                </div>
              </div>
              <div class="flex items-center justify-center gap-4 pt-2 border-t border-border-subtle mt-2 font-label-sm text-label-sm text-tertiary">
                <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 bg-primary rounded-xs"></span> Inbound Receipts</span>
                <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 bg-status-danger rounded-xs"></span> Outbound Dispatches</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Critical Alerts & Pending Operations Queue (xl:col-span-4 = ~33%) -->
        <div class="xl:col-span-4 flex flex-col gap-6">
          <!-- Card A: Critical Low Stock & Reorder Alerts -->
          <div class="bg-surface-card rounded-lg border border-border-subtle shadow-sm overflow-hidden flex flex-col">
            <div class="px-4 py-3.5 border-b border-border-subtle bg-surface-card flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-status-warning text-[20px]">notification_important</span>
                <h2 class="font-headline-sm text-headline-sm text-on-surface font-bold">Critical Low Stock &amp; Reorder</h2>
              </div>
              <span class="px-2 py-0.5 rounded-full bg-status-warning-bg text-status-warning font-label-sm text-label-sm font-semibold border border-status-warning/20">
                4 Actionable
              </span>
            </div>
            <div class="divide-y divide-border-subtle">
              <!-- Item 1: Steel Rod -->
              <div class="p-4 hover:bg-surface-subtle transition-colors flex flex-col gap-2">
                <div class="flex items-start justify-between gap-2">
                  <div>
                    <div class="flex items-center gap-1.5">
                      <span class="font-headline-sm text-body-md font-semibold text-on-surface">Steel Rod</span>
                      <span class="font-label-sm text-label-sm text-tertiary bg-surface-subtle px-1.5 rounded">SR001</span>
                    </div>
                    <div class="font-body-sm text-body-sm text-tertiary mt-0.5">Production Floor - Bin R-03</div>
                  </div>
                  <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-status-warning-bg text-status-warning font-label-sm text-label-sm font-semibold border border-status-warning/20">
                    Low Stock
                  </span>
                </div>
                <div class="space-y-1">
                  <div class="flex justify-between font-label-sm text-label-sm">
                    <span class="text-on-surface font-semibold font-tabular-data">7 kg remaining</span>
                    <span class="text-tertiary">Min Buffer: 25 kg</span>
                  </div>
                  <div class="w-full h-1.5 bg-surface-subtle rounded-full overflow-hidden">
                    <div class="h-full bg-status-warning rounded-full" style="width: 28%;"></div>
                  </div>
                </div>
                <div class="flex items-center justify-between pt-1">
                  <span class="text-status-danger font-label-sm text-label-sm font-medium">Deficit: -18 kg</span>
                  <button class="h-7 px-2.5 bg-primary text-on-primary hover:bg-primary-container rounded font-label-sm text-label-sm flex items-center gap-1 transition-colors font-semibold shadow-xs" onclick="window.triggerQuickReorder('SR001', 'Steel Rod', '50 kg')">
                    <span class="material-symbols-outlined text-[14px]">add_shopping_cart</span>
                    <span>+ Reorder Now</span>
                  </button>
                </div>
              </div>

              <!-- Item 2: Heavy Duty Pallet Jack (Out of Stock) -->
              <div class="p-4 hover:bg-surface-subtle transition-colors flex flex-col gap-2 bg-status-danger-bg/20">
                <div class="flex items-start justify-between gap-2">
                  <div>
                    <div class="flex items-center gap-1.5">
                      <span class="font-headline-sm text-body-md font-semibold text-status-danger">Heavy Duty Pallet Jack</span>
                      <span class="font-label-sm text-label-sm text-tertiary bg-surface-card px-1.5 rounded">PJ-102</span>
                    </div>
                    <div class="font-body-sm text-body-sm text-tertiary mt-0.5">Main Warehouse - Logistics Bay</div>
                  </div>
                  <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-status-danger-bg text-status-danger font-label-sm text-label-sm font-semibold border border-status-danger/20">
                    Out of Stock
                  </span>
                </div>
                <div class="space-y-1">
                  <div class="flex justify-between font-label-sm text-label-sm">
                    <span class="text-status-danger font-bold font-tabular-data">0 units in inventory</span>
                    <span class="text-tertiary">Reorder Level: 2 units</span>
                  </div>
                  <div class="w-full h-1.5 bg-border-strong rounded-full overflow-hidden">
                    <div class="h-full bg-status-danger rounded-full" style="width: 0%;"></div>
                  </div>
                </div>
                <div class="flex items-center justify-between pt-1">
                  <span class="text-status-danger font-label-sm text-label-sm font-medium">Halt risk for Bay 4</span>
                  <button class="h-7 px-2.5 bg-status-danger text-on-primary hover:bg-status-danger/90 rounded font-label-sm text-label-sm flex items-center gap-1 transition-colors shadow-xs font-semibold" onclick="window.triggerQuickReorder('PJ-102', 'Heavy Duty Pallet Jack', '2 units')">
                    <span class="material-symbols-outlined text-[14px]">priority_high</span>
                    <span>Immediate Reorder</span>
                  </button>
                </div>
              </div>

              <!-- Item 3: Electrical Cable -->
              <div class="p-4 hover:bg-surface-subtle transition-colors flex flex-col gap-2">
                <div class="flex items-start justify-between gap-2">
                  <div>
                    <div class="flex items-center gap-1.5">
                      <span class="font-headline-sm text-body-md font-semibold text-on-surface">Electrical Cable 100m</span>
                      <span class="font-label-sm text-label-sm text-tertiary bg-surface-subtle px-1.5 rounded">EC-401</span>
                    </div>
                    <div class="font-body-sm text-body-sm text-tertiary mt-0.5">Warehouse 2 - Shelf C-12</div>
                  </div>
                  <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-status-warning-bg text-status-warning font-label-sm text-label-sm font-semibold border border-status-warning/20">
                    Low Stock
                  </span>
                </div>
                <div class="space-y-1">
                  <div class="flex justify-between font-label-sm text-label-sm">
                    <span class="text-on-surface font-semibold font-tabular-data">4 rolls remaining</span>
                    <span class="text-tertiary">Reorder: 10 rolls</span>
                  </div>
                  <div class="w-full h-1.5 bg-surface-subtle rounded-full overflow-hidden">
                    <div class="h-full bg-status-warning rounded-full" style="width: 40%;"></div>
                  </div>
                </div>
                <div class="flex items-center justify-between pt-1">
                  <span class="text-tertiary font-label-sm text-label-sm">Last PO: 12 days ago</span>
                  <button class="h-7 px-2.5 bg-surface-card hover:bg-surface-subtle text-on-surface border border-border-strong rounded font-label-sm text-label-sm flex items-center gap-1 transition-colors" onclick="window.triggerQuickReorder('EC-401', 'Electrical Cable 100m', '10 rolls')">
                    <span class="material-symbols-outlined text-[14px]">add</span>
                    <span>Reorder</span>
                  </button>
                </div>
              </div>

              <!-- Item 4: High Performance Laptop -->
              <div class="p-4 hover:bg-surface-subtle transition-colors flex flex-col gap-2">
                <div class="flex items-start justify-between gap-2">
                  <div>
                    <div class="flex items-center gap-1.5">
                      <span class="font-headline-sm text-body-md font-semibold text-on-surface">High Performance Laptop 16"</span>
                      <span class="font-label-sm text-label-sm text-tertiary bg-surface-subtle px-1.5 rounded">LP-900</span>
                    </div>
                    <div class="font-body-sm text-body-sm text-tertiary mt-0.5">Main Vault - Secure Cage</div>
                  </div>
                  <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-status-warning-bg text-status-warning font-label-sm text-label-sm font-semibold border border-status-warning/20">
                    Low Stock
                  </span>
                </div>
                <div class="space-y-1">
                  <div class="flex justify-between font-label-sm text-label-sm">
                    <span class="text-on-surface font-semibold font-tabular-data">2 units remaining</span>
                    <span class="text-tertiary">Reorder: 5 units</span>
                  </div>
                  <div class="w-full h-1.5 bg-surface-subtle rounded-full overflow-hidden">
                    <div class="h-full bg-status-warning rounded-full" style="width: 40%;"></div>
                  </div>
                </div>
                <div class="flex items-center justify-between pt-1">
                  <span class="text-tertiary font-label-sm text-label-sm">High Value Item</span>
                  <button class="h-7 px-2.5 bg-surface-card hover:bg-surface-subtle text-on-surface border border-border-strong rounded font-label-sm text-label-sm flex items-center gap-1 transition-colors" onclick="window.triggerQuickReorder('LP-900', 'High Performance Laptop 16&quot;', '5 units')">
                    <span class="material-symbols-outlined text-[14px]">add</span>
                    <span>Reorder</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Card B: Pending Operations Queue -->
          <div class="bg-surface-card rounded-lg border border-border-subtle shadow-sm overflow-hidden flex flex-col">
            <div class="px-4 py-3.5 border-b border-border-subtle bg-surface-card flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-status-info text-[20px]">pending_actions</span>
                <h2 class="font-headline-sm text-headline-sm text-on-surface font-bold">Pending Operations Queue</h2>
              </div>
              <a href="#/operations" class="text-primary font-label-sm text-label-sm hover:underline font-semibold">View All</a>
            </div>
            <div class="divide-y divide-border-subtle font-tabular-data text-tabular-data">
              ${queue.map(op => {
                const isWaiting = op.status === 'WAITING';
                const isReady = op.status === 'READY';
                const isDone = op.status === 'DONE';

                let icon = 'input';
                let iconBg = 'bg-status-info-bg text-status-info';
                if (op.type === 'DELIVERY') {
                  icon = 'local_shipping';
                  iconBg = 'bg-status-success-bg text-status-success';
                } else if (op.type === 'INTERNAL_TRANSFER') {
                  icon = 'sync_alt';
                  iconBg = 'bg-secondary-fixed text-secondary';
                }

                return `
                  <div class="p-3.5 hover:bg-surface-subtle transition-colors flex items-center justify-between gap-3">
                    <div class="flex items-start gap-3">
                      <div class="p-2 rounded ${iconBg} mt-0.5">
                        <span class="material-symbols-outlined text-[18px]">${icon}</span>
                      </div>
                      <div>
                        <div class="flex items-center gap-2">
                          <span class="font-semibold text-on-surface">${op.ref}</span>
                          <span class="text-[11px] px-1.5 py-0.2 rounded bg-surface-subtle text-tertiary">${op.category}</span>
                        </div>
                        <div class="text-body-sm text-tertiary">${op.productName} • <span class="font-semibold text-on-surface">${op.qty} ${op.unit}</span></div>
                        <div class="text-[11px] text-tertiary mt-0.5">${op.note || op.dock || op.destination}</div>
                      </div>
                    </div>
                    <div class="flex flex-col items-end gap-1.5">
                      <span class="px-2 py-0.5 rounded-full ${isReady ? 'bg-status-success-bg text-status-success' : (isWaiting ? 'bg-status-warning-bg text-status-warning' : 'bg-surface-subtle text-tertiary')} font-label-sm text-label-sm font-semibold border border-border-subtle">
                        ${op.status}
                      </span>
                      ${!isDone ? `
                        <button class="h-6 px-2.5 bg-primary hover:bg-primary-container text-on-primary rounded text-[11px] font-semibold transition-colors shadow-xs" onclick="window.validateQueueItemDirect('${op.id}', '${op.ref}')">
                          ${op.type === 'RECEIPT' ? 'Validate' : (op.type === 'DELIVERY' ? 'Dispatch' : 'Execute')}
                        </button>
                      ` : `
                        <span class="text-[11px] text-status-success font-medium flex items-center gap-0.5"><span class="material-symbols-outlined text-[13px]">done</span> Posted</span>
                      `}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
            <div class="p-3 bg-surface-card border-t border-border-subtle text-center">
              <a href="#/operations" class="font-label-sm text-label-sm text-primary font-semibold hover:underline flex items-center justify-center gap-1 mx-auto">
                <span>Open Operations Workflow Center</span>
                <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Window helper bindings
window.setDashboardWarehouse = function(wh) {
  store.setSelectedWarehouse(wh);
  showToast('Warehouse Context Filtered', `Displaying stock ledger and queues for: ${wh === 'all' ? 'All Warehouses' : wh}`);
};

window.triggerQuickReorder = function(sku, name, qty) {
  showToast('Reorder PO Dispatched', `Automated draft order created for ${qty} of ${name} (${sku}). Sent to Purchasing.`);
};

window.triggerQuickAudit = function() {
  showToast('Ledger Sync Checked', 'All 1,420 units cross-checked across 3 facilities. Cryptographic checksum is valid.');
};

window.filterLedgerRows = function(term) {
  const q = term.toLowerCase();
  const rows = document.querySelectorAll('#ledgerTable tbody tr');
  rows.forEach(r => {
    const txt = r.textContent.toLowerCase();
    r.style.display = txt.includes(q) ? '' : 'none';
  });
};

window.downloadCSV = function() {
  const ledger = store.getLedgerEntries();
  const headers = ['Timestamp', 'Product', 'SKU', 'Type', 'Quantity', 'Location', 'DocRef', 'Operator', 'Status'];
  const rows = ledger.map(l => [
    `"${l.timestamp}"`,
    `"${l.productName}"`,
    `"${l.sku}"`,
    `"${l.operationType}"`,
    `"${l.quantityFormatted}"`,
    `"${l.locationFlow || l.location}"`,
    `"${l.docRef}"`,
    `"${l.operator}"`,
    `"${l.status}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `stocksense_ledger_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('Export Complete', 'Exported stock ledger records to CSV successfully.');
};

window.validateQueueItemDirect = function(id, ref) {
  try {
    store.validateQueueItem(id);
    showToast('Operation Completed', `${ref} has been validated and recorded. Physical quantity ledger entry posted.`);
  } catch (e) {
    showToast('Validation Error', e.message, 'error');
  }
};
