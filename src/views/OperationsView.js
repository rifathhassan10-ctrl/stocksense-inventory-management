// StockSense Operations Hub View (Screen 3)
// Faithfully matches Stitch Screen 0a15ec8d3ef8405c92bbb74dc941d3e0

import { store } from '../store/dataStore.js';
import { showToast } from '../components/Toast.js';

let activeOpTab = 'receipts';

export function renderOperationsView(subtab = 'receipts') {
  if (subtab) activeOpTab = subtab;

  const products = store.getProducts();
  const queue = store.getOperationsQueue();
  const ledger = store.getLedgerEntries();

  // Find Steel Rod for live preview
  const steelRod = store.getProductBySku('SR001') || products[0];

  return `
    <div class="flex flex-col w-full animate-fade-in">
      <!-- Top Header & Context Banner -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-lg">
        <div class="space-y-1">
          <div class="flex items-center gap-space-xs text-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold">
            <span class="material-symbols-outlined text-[16px]">sync_alt</span>
            <span>Stock Operations Hub</span>
          </div>
          <h1 class="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">Inventory Operations &amp; Stock Movement Center</h1>
          <p class="font-body-md text-body-md text-tertiary">Execute, validate, and track stock-changing actions with automatic ledger sync.</p>
        </div>

        <!-- Quick Meta & Batch Actions -->
        <div class="flex items-center gap-space-sm self-start md:self-auto flex-wrap">
          <div class="hidden lg:flex items-center gap-2 px-space-md py-2 bg-surface-container rounded-lg shadow-sm border border-border-subtle">
            <span class="material-symbols-outlined text-primary text-[20px]">verified_user</span>
            <div class="flex flex-col">
              <span class="font-label-sm text-[10px] text-tertiary uppercase font-semibold">Posting Engine</span>
              <span class="font-label-md text-label-md font-bold text-on-surface">Auto-Ledger v2.4 Active</span>
            </div>
          </div>
          <a href="#/stock-ledger" class="h-9 px-space-md bg-surface-card hover:bg-surface-subtle text-on-surface font-label-md text-label-md rounded-lg shadow-sm flex items-center gap-1.5 transition-colors border border-border-subtle font-medium">
            <span class="material-symbols-outlined text-[18px] text-tertiary">fact_check</span>
            <span>Audit Logs</span>
          </a>
          <button class="h-9 px-space-md bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md rounded-lg shadow-sm flex items-center gap-1.5 transition-colors font-semibold" onclick="window.openModal('receiptModal')" type="button">
            <span class="material-symbols-outlined text-[18px]">add_circle</span>
            <span>New Movement</span>
          </button>
        </div>
      </div>

      <!-- Lifecycle State Banner (Visual Rule Display) -->
      <div class="bg-surface-card rounded-xl p-space-lg shadow-sm border border-border-subtle mb-space-lg relative overflow-hidden">
        <div class="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md">
          <div class="max-w-md">
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-status-info-bg text-status-info text-[13px] font-bold">!</span>
              <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Universal Stock Mutation Rule</h3>
            </div>
            <p class="font-body-sm text-body-sm text-tertiary mt-1 leading-relaxed">
              Stock units and double-entry ledger rows are immutable and <strong class="text-on-surface font-semibold">only mutate once state reaches DONE / VALIDATED</strong>. Draft, Waiting, and Ready allocations remain soft locks.
            </p>
          </div>

          <!-- State Flow Diagram -->
          <div class="flex-1 max-w-2xl flex items-center justify-between gap-2 overflow-x-auto py-1">
            <!-- Draft -->
            <div class="flex items-center gap-2">
              <div class="flex flex-col items-center">
                <div class="w-8 h-8 rounded-full bg-surface-subtle text-tertiary font-label-md text-label-md flex items-center justify-center font-bold">1</div>
                <span class="font-label-sm text-label-sm text-tertiary mt-1 font-semibold">DRAFT</span>
                <span class="text-[10px] text-outline font-label-sm">No Ledger</span>
              </div>
              <span class="material-symbols-outlined text-outline-variant text-[20px]">arrow_forward</span>
            </div>
            <!-- Waiting -->
            <div class="flex items-center gap-2">
              <div class="flex flex-col items-center">
                <div class="w-8 h-8 rounded-full bg-surface-subtle text-tertiary font-label-md text-label-md flex items-center justify-center font-bold">2</div>
                <span class="font-label-sm text-label-sm text-tertiary mt-1 font-semibold">WAITING</span>
                <span class="text-[10px] text-outline font-label-sm">Pending Carrier</span>
              </div>
              <span class="material-symbols-outlined text-outline-variant text-[20px]">arrow_forward</span>
            </div>
            <!-- Ready -->
            <div class="flex items-center gap-2">
              <div class="flex flex-col items-center">
                <div class="w-8 h-8 rounded-full bg-status-info-bg text-status-info font-label-md text-label-md flex items-center justify-center font-bold">3</div>
                <span class="font-label-sm text-label-sm text-status-info mt-1 font-semibold">READY</span>
                <span class="text-[10px] text-status-info font-label-sm">QA Checked</span>
              </div>
              <span class="material-symbols-outlined text-status-info text-[20px]">arrow_forward</span>
            </div>
            <!-- Done / Validated -->
            <div class="flex items-center">
              <div class="flex flex-col items-center p-2 rounded-lg bg-status-success-bg shadow-sm border border-status-success/20">
                <div class="w-8 h-8 rounded-full bg-status-success text-on-secondary font-label-md text-label-md flex items-center justify-center font-bold">
                  <span class="material-symbols-outlined text-[18px]">done_all</span>
                </div>
                <span class="font-label-sm text-label-sm text-status-success mt-1 font-bold">DONE / VALIDATED</span>
                <span class="text-[10px] text-status-success font-label-sm font-semibold tracking-wide uppercase">POSTED TO LEDGER</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Operational Mode Tabs Navigation -->
      <div class="flex flex-wrap items-center gap-2 p-1.5 bg-surface-container rounded-xl mb-space-lg shadow-sm border border-border-subtle">
        <button class="op-tab flex items-center gap-2 px-space-md py-2 rounded-lg font-label-md text-label-md transition-all ${activeOpTab === 'receipts' ? 'bg-surface-card text-primary font-semibold shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-bright'}" id="tab-receipts" onclick="window.switchOperationsTab('receipts')">
          <span class="material-symbols-outlined text-[18px]">input</span>
          <span>Receipts (Incoming)</span>
          <span class="px-1.5 py-0.5 rounded-full bg-surface-container-high text-primary font-tabular-data text-[11px] font-semibold">5 Active</span>
        </button>

        <button class="op-tab flex items-center gap-2 px-space-md py-2 rounded-lg font-label-md text-label-md transition-all ${activeOpTab === 'deliveries' ? 'bg-surface-card text-primary font-semibold shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-bright'}" id="tab-deliveries" onclick="window.switchOperationsTab('deliveries')">
          <span class="material-symbols-outlined text-[18px]">local_shipping</span>
          <span>Delivery Orders (Outgoing)</span>
          <span class="px-1.5 py-0.5 rounded-full bg-surface-subtle text-tertiary font-tabular-data text-[11px]">8 In Queue</span>
        </button>

        <button class="op-tab flex items-center gap-2 px-space-md py-2 rounded-lg font-label-md text-label-md transition-all ${activeOpTab === 'transfers' ? 'bg-surface-card text-primary font-semibold shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-bright'}" id="tab-transfers" onclick="window.switchOperationsTab('transfers')">
          <span class="material-symbols-outlined text-[18px]">forklift</span>
          <span>Internal Transfers (Inter-Location)</span>
          <span class="px-1.5 py-0.5 rounded-full bg-surface-subtle text-tertiary font-tabular-data text-[11px]">Bay A ➔ Rack</span>
        </button>

        <button class="op-tab flex items-center gap-2 px-space-md py-2 rounded-lg font-label-md text-label-md transition-all ${activeOpTab === 'adjustments' ? 'bg-surface-card text-primary font-semibold shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-bright'}" id="tab-adjustments" onclick="window.switchOperationsTab('adjustments')">
          <span class="material-symbols-outlined text-[18px]">tune</span>
          <span>Physical Stock Adjustments</span>
          <span class="px-1.5 py-0.5 rounded-full bg-status-warning-bg text-status-warning font-tabular-data text-[11px] font-semibold">Audit Mode</span>
        </button>
      </div>

      <!-- TAB PANELS CONTAINER -->
      <div class="space-y-space-lg">
        <!-- 1. RECEIPTS TAB PANEL -->
        <div class="${activeOpTab === 'receipts' ? '' : 'hidden'} space-y-space-lg" id="panel-receipts">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            <!-- Interactive Validation Form -->
            <div class="lg:col-span-5 bg-surface-card rounded-xl p-space-lg shadow-sm border border-border-subtle flex flex-col justify-between">
              <div class="space-y-space-md">
                <div class="flex items-center justify-between pb-space-sm border-b border-border-subtle">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-[22px]">add_box</span>
                    <h2 class="font-headline-sm text-headline-sm text-on-surface font-bold">New Receipt Validation</h2>
                  </div>
                  <span class="font-label-sm text-label-sm px-2 py-0.5 bg-surface-subtle text-tertiary rounded-full font-tabular-data font-semibold">DOC-REC-089</span>
                </div>
                <p class="font-body-sm text-body-sm text-tertiary">
                  Intake raw supplies directly into available warehouse stocks. Real-time balance preview updates dynamically.
                </p>

                <form class="space-y-3.5" id="receiptDirectForm" onsubmit="window.handleDirectReceipt(event)">
                  <div>
                    <label class="block font-label-sm text-label-sm text-tertiary mb-1 font-semibold">Supplier Name</label>
                    <div class="relative">
                      <span class="material-symbols-outlined absolute left-3 top-2 text-[18px] text-tertiary">store</span>
                      <input class="w-full h-9 pl-9 pr-3 rounded-lg bg-surface-subtle text-on-surface font-body-sm text-body-sm border border-border-subtle focus:outline-none focus:bg-surface-card shadow-sm" id="recSupplierName" type="text" value="Global Metals Corp" />
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                    <div>
                      <label class="block font-label-sm text-label-sm text-tertiary mb-1 font-semibold">Product SKU</label>
                      <select class="w-full h-9 px-3 rounded-lg bg-surface-subtle text-on-surface font-body-sm text-body-sm border border-border-subtle focus:outline-none focus:bg-surface-card shadow-sm cursor-pointer" id="recProductSelect" onchange="window.updateReceiptPreview()">
                        ${products.map(p => `
                          <option value="${p.sku}" data-stock="${p.totalStock}" data-uom="${p.uom}">${p.name} (${p.sku})</option>
                        `).join('')}
                      </select>
                    </div>
                    <div>
                      <label class="block font-label-sm text-label-sm text-tertiary mb-1 font-semibold">Reference Doc</label>
                      <input class="w-full h-9 px-3 rounded-lg bg-surface-subtle text-on-surface font-body-sm text-body-sm border border-border-subtle focus:outline-none focus:bg-surface-card shadow-sm font-tabular-data" id="recDocNumber" type="text" value="REC-2025-095" />
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                    <div>
                      <label class="block font-label-sm text-label-sm text-tertiary mb-1 font-semibold">Receive Quantity</label>
                      <input class="w-full h-9 px-3 rounded-lg bg-surface-subtle text-on-surface font-body-sm text-body-sm border border-border-subtle focus:outline-none focus:bg-surface-card shadow-sm font-tabular-data" id="recQtyInput" min="1" oninput="window.updateReceiptPreview()" type="number" value="100" />
                    </div>
                    <div>
                      <label class="block font-label-sm text-label-sm text-tertiary mb-1 font-semibold">Destination Facility</label>
                      <select class="w-full h-9 px-3 rounded-lg bg-surface-subtle text-on-surface font-body-sm text-body-sm border border-border-subtle focus:outline-none focus:bg-surface-card shadow-sm cursor-pointer" id="recWhDest">
                        <option value="Main Warehouse">Main Warehouse (Bay A)</option>
                        <option value="Production Rack">Production Rack</option>
                        <option value="Warehouse 2">Warehouse 2 (Logistics Hub)</option>
                      </select>
                    </div>
                  </div>

                  <!-- Calculation Summary Panel -->
                  <div class="p-space-md rounded-xl bg-surface-container space-y-2 border border-border-subtle">
                    <div class="flex items-center justify-between">
                      <span class="font-label-sm text-label-sm text-tertiary uppercase font-semibold">Stock Impact Preview</span>
                      <span class="font-label-sm text-label-sm text-status-success font-semibold flex items-center gap-1">
                        <span class="material-symbols-outlined text-[14px]">trending_up</span> Incoming Delta
                      </span>
                    </div>
                    <div class="flex items-center justify-between text-on-surface font-tabular-data">
                      <div class="flex flex-col">
                        <span class="text-[11px] text-tertiary font-label-sm">Current Stock</span>
                        <span class="font-headline-sm text-headline-sm font-bold" id="previewCurrentStock">${steelRod.totalStock} ${steelRod.uom}</span>
                      </div>
                      <span class="material-symbols-outlined text-outline text-[20px]">arrow_forward</span>
                      <div class="flex flex-col text-right">
                        <span class="text-[11px] text-tertiary font-label-sm">Stock After Validation</span>
                        <span class="font-headline-sm text-headline-sm text-primary font-bold" id="previewAfterStock">${steelRod.totalStock + 100} ${steelRod.uom} <span class="text-status-success font-semibold text-body-sm">(+100)</span></span>
                      </div>
                    </div>
                  </div>

                  <!-- Actions -->
                  <div class="pt-space-sm flex items-center justify-end gap-space-sm">
                    <button class="h-9 px-space-md rounded-lg font-label-md text-label-md text-tertiary hover:bg-surface-subtle hover:text-on-surface transition-colors" type="button" onclick="showToast('Draft Saved', 'Document DOC-REC-089 saved to draft register.')">
                      Save as Draft
                    </button>
                    <button class="h-9 px-space-md rounded-lg font-label-md text-label-md bg-primary hover:bg-primary-container text-on-primary shadow-sm flex items-center gap-1.5 transition-colors font-semibold" type="submit">
                      <span class="material-symbols-outlined text-[18px]">verified</span>
                      <span>Validate Receipt &amp; Post</span>
                    </button>
                  </div>
                </form>
              </div>

              <div class="mt-space-md pt-3 flex items-center gap-2 text-tertiary font-label-sm text-label-sm border-t border-border-subtle">
                <span class="material-symbols-outlined text-[16px] text-status-success">lock</span>
                <span>Posting automatically updates Stock Ledger &amp; recalculates weighted average cost.</span>
              </div>
            </div>

            <!-- Recent Receipts Activity Table -->
            <div class="lg:col-span-7 bg-surface-card rounded-xl p-space-lg shadow-sm border border-border-subtle flex flex-col justify-between">
              <div>
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
                  <div>
                    <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Live Receipts Queue</h3>
                    <p class="font-body-sm text-body-sm text-tertiary">Real-time incoming shipments awaiting validation or archived to ledger.</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="font-label-sm text-label-sm text-tertiary font-semibold">Filter:</span>
                    <span class="px-2 py-1 rounded bg-surface-subtle font-label-sm text-label-sm text-on-surface font-medium cursor-pointer border border-border-subtle">All (14)</span>
                    <span class="px-2 py-1 rounded bg-surface-container font-label-sm text-label-sm text-primary font-semibold cursor-pointer">Pending (5)</span>
                  </div>
                </div>

                <!-- Custom Clean Table -->
                <div class="overflow-x-auto">
                  <table class="w-full text-left font-body-sm text-body-sm">
                    <thead class="bg-surface-subtle text-tertiary font-label-sm text-label-sm uppercase border-b border-border-subtle">
                      <tr>
                        <th class="px-3 py-2.5 rounded-l-lg font-semibold">Reference</th>
                        <th class="px-3 py-2.5 font-semibold">Supplier</th>
                        <th class="px-3 py-2.5 font-semibold">Product</th>
                        <th class="px-3 py-2.5 font-tabular-data font-semibold">Qty</th>
                        <th class="px-3 py-2.5 font-semibold">Warehouse</th>
                        <th class="px-3 py-2.5 font-semibold">Status</th>
                        <th class="px-3 py-2.5 text-right rounded-r-lg font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-border-subtle text-on-surface font-tabular-data" id="receiptsTableBody">
                      <tr class="hover:bg-surface-subtle transition-colors">
                        <td class="px-3 py-2.5 font-semibold text-primary">REC-2025-088</td>
                        <td class="px-3 py-2.5 font-body-sm">Holcim Ind Corp</td>
                        <td class="px-3 py-2.5 font-body-sm">Portland Cement (CM-50)</td>
                        <td class="px-3 py-2.5 font-semibold text-status-success">+50 bags</td>
                        <td class="px-3 py-2.5 font-body-sm text-tertiary">Warehouse 2</td>
                        <td class="px-3 py-2.5">
                          <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-status-success-bg text-status-success font-label-sm text-label-sm font-semibold">
                            <span class="w-1.5 h-1.5 rounded-full bg-status-success"></span>
                            DONE
                          </span>
                        </td>
                        <td class="px-3 py-2.5 text-right">
                          <a href="#/stock-ledger" class="text-tertiary hover:text-on-surface p-1 rounded hover:bg-surface-container inline-block" title="View Ledger">
                            <span class="material-symbols-outlined text-[18px]">receipt_long</span>
                          </a>
                        </td>
                      </tr>
                      <tr class="hover:bg-surface-subtle transition-colors">
                        <td class="px-3 py-2.5 font-semibold text-primary">REC-2025-089</td>
                        <td class="px-3 py-2.5 font-body-sm">Global Metals Corp</td>
                        <td class="px-3 py-2.5 font-body-sm">Steel Rod (SR001)</td>
                        <td class="px-3 py-2.5 font-semibold text-status-success">+100 kg</td>
                        <td class="px-3 py-2.5 font-body-sm text-tertiary">Main WH (Bay A)</td>
                        <td class="px-3 py-2.5">
                          <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-status-success-bg text-status-success font-label-sm text-label-sm font-semibold">
                            <span class="w-1.5 h-1.5 rounded-full bg-status-success"></span>
                            DONE
                          </span>
                        </td>
                        <td class="px-3 py-2.5 text-right">
                          <a href="#/stock-ledger" class="text-tertiary hover:text-on-surface p-1 rounded hover:bg-surface-container inline-block" title="View Ledger">
                            <span class="material-symbols-outlined text-[18px]">receipt_long</span>
                          </a>
                        </td>
                      </tr>
                      <tr class="hover:bg-surface-subtle transition-colors">
                        <td class="px-3 py-2.5 font-semibold text-primary">REC-2025-092</td>
                        <td class="px-3 py-2.5 font-body-sm">FastLogix Corp</td>
                        <td class="px-3 py-2.5 font-body-sm">Steel Rod (SR001)</td>
                        <td class="px-3 py-2.5 font-semibold text-status-info">+50 kg</td>
                        <td class="px-3 py-2.5 font-body-sm text-tertiary">Dock Gate 3</td>
                        <td class="px-3 py-2.5">
                          <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-status-warning-bg text-status-warning font-label-sm text-label-sm font-semibold">
                            <span class="w-1.5 h-1.5 rounded-full bg-status-warning"></span>
                            WAITING
                          </span>
                        </td>
                        <td class="px-3 py-2.5 text-right">
                          <button class="px-2.5 py-1 bg-primary text-on-primary rounded font-label-sm text-label-sm hover:bg-primary-container shadow-sm transition-colors font-semibold" onclick="window.validateQueueItemDirect('op-rec-1', 'REC-2025-092')">
                            Validate
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Table Footnote -->
              <div class="mt-space-md p-space-sm bg-surface-subtle rounded-lg flex items-center justify-between border border-border-subtle">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-primary text-[18px]">info</span>
                  <span class="font-body-sm text-body-sm text-tertiary">Ledger integrity checksum verification runs every 60s.</span>
                </div>
                <a class="font-label-sm text-label-sm text-primary font-semibold hover:underline" href="#/stock-ledger">Full Receipts Ledger →</a>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. DELIVERY ORDERS TAB PANEL (NEGATIVE STOCK PROTECTION) -->
        <div class="${activeOpTab === 'deliveries' ? '' : 'hidden'} space-y-space-lg" id="panel-deliveries">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            <!-- Outgoing Order Detailed Dispatch Card -->
            <div class="lg:col-span-7 bg-surface-card rounded-xl p-space-lg shadow-sm border border-border-subtle space-y-space-md">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-space-sm border-b border-border-subtle">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-status-warning text-[24px]">local_shipping</span>
                    <h2 class="font-headline-sm text-headline-sm text-on-surface font-bold">Outgoing Delivery Validation</h2>
                  </div>
                  <p class="font-body-sm text-body-sm text-tertiary">Strict Negative-Stock Protection Engine prevents inventory deficits.</p>
                </div>
                <span class="px-2.5 py-1 rounded-full bg-status-success-bg text-status-success font-label-sm text-label-sm font-semibold flex items-center gap-1 border border-status-success/20">
                  <span class="w-1.5 h-1.5 rounded-full bg-status-success"></span>
                  ORDER DO-2025-441
                </span>
              </div>

              <!-- Customer & Order Specs -->
              <div class="p-space-md rounded-xl bg-surface-subtle space-y-3 border border-border-subtle">
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <span class="block text-[11px] font-label-sm text-tertiary uppercase font-semibold">Customer</span>
                    <span class="font-label-md text-label-md font-bold text-on-surface">Apex Construction Group</span>
                  </div>
                  <div>
                    <span class="block text-[11px] font-label-sm text-tertiary uppercase font-semibold">Target Item</span>
                    <span class="font-label-md text-label-md font-bold text-on-surface">Ergonomic Chair (CH-880)</span>
                  </div>
                  <div>
                    <span class="block text-[11px] font-label-sm text-tertiary uppercase font-semibold">Dispatch Warehouse</span>
                    <span class="font-label-md text-label-md font-bold text-on-surface">Main Warehouse - Zone 3</span>
                  </div>
                </div>
              </div>

              <!-- Live Stock Check Telemetry -->
              <div class="grid grid-cols-3 gap-3 p-space-md rounded-xl bg-surface-container text-center border border-border-subtle">
                <div class="p-2 rounded-lg bg-surface-card shadow-sm border border-border-subtle">
                  <span class="text-[11px] font-label-sm text-tertiary uppercase block font-semibold">Available Stock</span>
                  <span class="font-display text-headline-lg font-tabular-data text-on-surface font-bold">40</span>
                  <span class="block text-[10px] text-status-success font-label-sm font-semibold mt-0.5">Physical verified</span>
                </div>
                <div class="p-2 rounded-lg bg-surface-card shadow-sm border border-border-subtle">
                  <span class="text-[11px] font-label-sm text-tertiary uppercase block font-semibold">Requested Qty</span>
                  <span class="font-display text-headline-lg font-tabular-data text-status-info font-bold" id="telemetryReqQty">10</span>
                  <span class="block text-[10px] text-tertiary font-label-sm mt-0.5">Sales Order #1042</span>
                </div>
                <div class="p-2 rounded-lg bg-surface-card shadow-sm border border-border-subtle">
                  <span class="text-[11px] font-label-sm text-tertiary uppercase block font-semibold">Stock After Post</span>
                  <span class="font-display text-headline-lg font-tabular-data text-primary font-bold" id="telemetryAfterStock">30</span>
                  <span class="block text-[10px] text-status-success font-label-sm font-semibold mt-0.5">Healthy Buffer (+300%)</span>
                </div>
              </div>

              <!-- Negative Stock Protection Notice Banner -->
              <div class="p-space-md rounded-xl bg-status-danger-bg flex items-start gap-3 border border-status-danger/20">
                <span class="material-symbols-outlined text-status-danger text-[22px] shrink-0 mt-0.5">shield</span>
                <div class="space-y-1">
                  <span class="font-label-md text-label-md font-bold text-status-danger block">
                    Strict Negative Stock Protection Active
                  </span>
                  <p class="font-body-sm text-body-sm text-on-surface-variant">
                    The posting engine strictly prohibits negative balances. If requested units exceed available warehouse stock, validation is locked and the item must await replenishment or allocation adjustment.
                  </p>
                </div>
              </div>

              <!-- Simulator Box -->
              <div class="p-space-md rounded-xl bg-surface-card shadow-sm border border-border-subtle space-y-3">
                <span class="font-label-sm text-label-sm text-tertiary uppercase block font-semibold">Delivery Test Simulator</span>
                <div class="flex items-center gap-space-md">
                  <div class="flex-1">
                    <label class="block text-[11px] text-tertiary font-label-sm mb-1 font-semibold">Simulate Dispatch Quantity</label>
                    <input class="w-full h-9 px-3 rounded-lg bg-surface-subtle text-on-surface font-body-sm text-body-sm border border-border-subtle focus:outline-none focus:bg-surface-card shadow-sm font-tabular-data" id="simDeliveryQty" max="100" min="1" oninput="window.testDeliverySafety()" type="number" value="10" />
                  </div>
                  <div class="flex-1">
                    <span class="block text-[11px] text-tertiary font-label-sm mb-1 font-semibold">Validation Status</span>
                    <div class="h-9 px-3 rounded-lg bg-status-success-bg text-status-success flex items-center gap-1.5 font-label-md text-label-md font-semibold border border-status-success/20" id="deliverySafetyBadge">
                      <span class="material-symbols-outlined text-[16px]">check_circle</span>
                      <span>Validation Permitted</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Button Controls -->
              <div class="flex items-center justify-between pt-space-xs flex-wrap gap-2">
                <span class="text-tertiary font-body-sm text-body-sm">Status: <strong class="text-status-success font-semibold">VALIDATED</strong></span>
                <div class="flex items-center gap-2">
                  <button class="h-9 px-space-md rounded-lg font-label-md text-label-md bg-surface-subtle hover:bg-surface-container text-on-surface border border-border-subtle transition-colors" onclick="window.printPickingSlip()">
                    Print Picking Slip
                  </button>
                  <button class="h-9 px-space-md rounded-lg font-label-md text-label-md bg-primary hover:bg-primary-container text-on-primary shadow-sm flex items-center gap-1.5 transition-colors font-semibold" id="postDeliveryBtn" onclick="window.confirmOutgoingDelivery()">
                    <span class="material-symbols-outlined text-[18px]">send</span>
                    <span>Confirm Outgoing Dispatch</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Deliveries Visual Timeline & Pending Table -->
            <div class="lg:col-span-5 bg-surface-card rounded-xl p-space-lg shadow-sm border border-border-subtle space-y-space-md flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-space-sm pb-2 border-b border-border-subtle">
                  <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Pending Outgoing Dispatches</h3>
                  <span class="font-label-sm text-label-sm text-tertiary">3 Scheduled Today</span>
                </div>
                <div class="space-y-3">
                  <!-- Item 1 -->
                  <div class="p-space-sm rounded-lg bg-surface-subtle hover:bg-surface-container-low transition-colors border border-border-subtle space-y-1.5 cursor-pointer" onclick="showToast('Dispatch Selected', 'Order DO-2025-442 loaded into fulfillment station.')">
                    <div class="flex items-center justify-between">
                      <span class="font-label-md text-label-md font-bold text-primary">DO-2025-442</span>
                      <span class="px-2 py-0.5 rounded-full bg-status-info-bg text-status-info text-[11px] font-semibold">READY FOR PICK</span>
                    </div>
                    <div class="flex items-center justify-between text-body-sm text-on-surface">
                      <span class="font-semibold">Industrial Valves (IV-02)</span>
                      <span class="font-tabular-data font-bold">15 units</span>
                    </div>
                    <div class="text-[11px] text-tertiary flex items-center justify-between">
                      <span>To: Metro Heavy Industries</span>
                      <span class="text-status-success font-semibold">In Stock (84 avail)</span>
                    </div>
                  </div>

                  <!-- Item 2 -->
                  <div class="p-space-sm rounded-lg bg-surface-subtle hover:bg-surface-container-low transition-colors border border-border-subtle space-y-1.5 cursor-pointer" onclick="showToast('Shortage Warning', 'Order DO-2025-443 blocked by negative stock protection.', 'warning')">
                    <div class="flex items-center justify-between">
                      <span class="font-label-md text-label-md font-bold text-primary">DO-2025-443</span>
                      <span class="px-2 py-0.5 rounded-full bg-status-warning-bg text-status-warning text-[11px] font-semibold">WAITING STOCK</span>
                    </div>
                    <div class="flex items-center justify-between text-body-sm text-on-surface">
                      <span class="font-semibold">Hydraulic Pumps (HP-900)</span>
                      <span class="font-tabular-data font-bold">12 units</span>
                    </div>
                    <div class="text-[11px] text-tertiary flex items-center justify-between">
                      <span>To: Delta Construction</span>
                      <span class="text-status-danger font-semibold">Shortage: 4 units needed</span>
                    </div>
                  </div>

                  <!-- Item 3 -->
                  <div class="p-space-sm rounded-lg bg-surface-subtle hover:bg-surface-container-low transition-colors border border-border-subtle space-y-1.5 cursor-pointer" onclick="showToast('Dispatch Staged', 'Order DO-2025-444 packed and verified.')">
                    <div class="flex items-center justify-between">
                      <span class="font-label-md text-label-md font-bold text-primary">DO-2025-444</span>
                      <span class="px-2 py-0.5 rounded-full bg-surface-container text-tertiary text-[11px] font-semibold">PACKED</span>
                    </div>
                    <div class="flex items-center justify-between text-body-sm text-on-surface">
                      <span class="font-semibold">Sensor Modules (SM-01)</span>
                      <span class="font-tabular-data font-bold">50 units</span>
                    </div>
                    <div class="text-[11px] text-tertiary flex items-center justify-between">
                      <span>To: Orion Tech Labs</span>
                      <span class="text-status-success font-semibold">In Stock (220 avail)</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Dispatch Metric Tile -->
              <div class="p-space-md rounded-xl bg-surface-container space-y-2 border border-border-subtle mt-4">
                <span class="font-label-sm text-label-sm text-tertiary uppercase block font-semibold">Dispatch Velocity</span>
                <div class="flex items-center justify-between">
                  <div>
                    <span class="font-headline-lg text-headline-lg font-tabular-data text-on-surface font-bold">98.4%</span>
                    <span class="block text-[11px] text-status-success font-semibold">On-time fulfillment rate</span>
                  </div>
                  <div class="h-10 w-24 flex items-end gap-1">
                    <div class="flex-1 bg-primary h-8 rounded-sm"></div>
                    <div class="flex-1 bg-primary h-10 rounded-sm"></div>
                    <div class="flex-1 bg-primary h-6 rounded-sm"></div>
                    <div class="flex-1 bg-primary h-9 rounded-sm"></div>
                    <div class="flex-1 bg-primary-container h-10 rounded-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. INTERNAL TRANSFERS TAB PANEL (CONSERVATION INVARIANT) -->
        <div class="${activeOpTab === 'transfers' ? '' : 'hidden'} space-y-space-lg" id="panel-transfers">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            <!-- Transfer Execution Center -->
            <div class="lg:col-span-8 bg-surface-card rounded-xl p-space-lg shadow-sm border border-border-subtle space-y-space-md">
              <div class="flex items-center justify-between pb-space-sm border-b border-border-subtle">
                <div>
                  <h2 class="font-headline-sm text-headline-sm text-on-surface font-bold">Internal Transfer Workflow</h2>
                  <p class="font-body-sm text-body-sm text-tertiary">Relocate materials between warehouse bays, aisles, and production staging racks.</p>
                </div>
                <span class="px-2.5 py-1 rounded-full bg-status-info-bg text-status-info font-label-sm text-label-sm font-semibold border border-status-info/20">
                  TR-2025-108
                </span>
              </div>

              <!-- Source to Destination Visual Pipeline -->
              <div class="p-space-lg rounded-xl bg-surface-subtle space-y-space-md border border-border-subtle">
                <div class="grid grid-cols-1 md:grid-cols-11 items-center gap-space-sm">
                  <!-- Source WH -->
                  <div class="md:col-span-5 p-space-md rounded-xl bg-surface-card shadow-sm border border-border-subtle space-y-2">
                    <div class="flex items-center justify-between">
                      <span class="font-label-sm text-label-sm text-tertiary uppercase flex items-center gap-1 font-semibold">
                        <span class="material-symbols-outlined text-[16px] text-tertiary">warehouse</span>
                        Source Location
                      </span>
                      <span class="font-label-sm text-label-sm text-status-info font-semibold">Origin</span>
                    </div>
                    <span class="font-headline-sm text-headline-sm text-on-surface block font-bold">Main Warehouse (Bay A)</span>
                    <div class="pt-2 flex items-center justify-between text-body-sm font-tabular-data">
                      <span class="text-tertiary">Available Stock:</span>
                      <span class="font-bold text-on-surface" id="transSourceAvail">70 kg</span>
                    </div>
                    <div class="flex items-center justify-between text-body-sm font-tabular-data">
                      <span class="text-tertiary">Post Transfer:</span>
                      <span class="font-bold text-status-warning" id="transSourceAfter">40 kg (-30 kg)</span>
                    </div>
                  </div>

                  <!-- Flow Arrow / Transfer Amount Control -->
                  <div class="md:col-span-1 flex flex-col items-center justify-center py-2">
                    <span class="material-symbols-outlined text-primary text-[28px]">east</span>
                    <span class="text-[11px] font-label-sm text-primary font-bold" id="transFlowBadge">30 kg</span>
                  </div>

                  <!-- Destination WH -->
                  <div class="md:col-span-5 p-space-md rounded-xl bg-surface-card shadow-sm border border-border-subtle space-y-2">
                    <div class="flex items-center justify-between">
                      <span class="font-label-sm text-label-sm text-tertiary uppercase flex items-center gap-1 font-semibold">
                        <span class="material-symbols-outlined text-[16px] text-tertiary">precision_manufacturing</span>
                        Destination Location
                      </span>
                      <span class="font-label-sm text-label-sm text-status-success font-semibold">Recipient</span>
                    </div>
                    <span class="font-headline-sm text-headline-sm text-on-surface block font-bold">Production Rack (Line 4)</span>
                    <div class="pt-2 flex items-center justify-between text-body-sm font-tabular-data">
                      <span class="text-tertiary">Current Stock:</span>
                      <span class="font-bold text-on-surface" id="transDestCurrent">7 kg</span>
                    </div>
                    <div class="flex items-center justify-between text-body-sm font-tabular-data">
                      <span class="text-tertiary">Post Transfer:</span>
                      <span class="font-bold text-status-success" id="transDestAfter">37 kg (+30 kg)</span>
                    </div>
                  </div>
                </div>

                <!-- Conservation Invariant Badge -->
                <div class="p-space-sm rounded-lg bg-surface-card border border-border-subtle flex items-center gap-2 text-body-sm font-tabular-data">
                  <span class="material-symbols-outlined text-status-success text-[20px]">check_circle</span>
                  <span class="text-on-surface-variant font-label-md text-label-md">
                    <strong class="text-on-surface font-bold">Conservation Invariant:</strong> 
                    Source stock decreases by 30 kg, Destination increases by 30 kg, 
                    <span class="text-primary font-bold">Total stock remains constant (77 kg)</span>.
                  </span>
                </div>
              </div>

              <!-- Controls -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-2">
                <div>
                  <label class="block text-[11px] font-label-sm text-tertiary mb-1 font-semibold">Select Transfer SKU</label>
                  <select class="w-full h-9 px-3 rounded-lg bg-surface-subtle text-on-surface font-body-sm text-body-sm border border-border-subtle focus:outline-none focus:bg-surface-card shadow-sm cursor-pointer">
                    <option selected>Steel Rod - SR001</option>
                    <option>Aluminum Ingot - AL094</option>
                    <option>Electrical Cable - EC-401</option>
                  </select>
                </div>
                <div>
                  <label class="block text-[11px] font-label-sm text-tertiary mb-1 font-semibold">Transfer Quantity (kg)</label>
                  <input class="w-full h-9 px-3 rounded-lg bg-surface-subtle text-on-surface font-body-sm text-body-sm border border-border-subtle focus:outline-none focus:bg-surface-card shadow-sm font-tabular-data" id="transInputQty" max="70" min="1" oninput="window.updateTransferCalculations()" type="number" value="30" />
                </div>
                <div>
                  <label class="block text-[11px] font-label-sm text-tertiary mb-1 font-semibold">Authorized Handler</label>
                  <input class="w-full h-9 px-3 rounded-lg bg-surface-subtle text-tertiary font-body-sm text-body-sm border border-border-subtle focus:outline-none shadow-sm cursor-not-allowed" readonly type="text" value="Alex Rivera (Ops Lead)" />
                </div>
              </div>

              <!-- Buttons -->
              <div class="flex items-center justify-end gap-space-sm pt-space-xs">
                <button class="h-9 px-space-md rounded-lg font-label-md text-label-md text-tertiary hover:bg-surface-subtle hover:text-on-surface transition-colors" onclick="showToast('Draft Transfer Saved', 'Transfer plan saved to staging queue.')">
                  Save Draft Transfer
                </button>
                <button class="h-9 px-space-md rounded-lg font-label-md text-label-md bg-primary hover:bg-primary-container text-on-primary shadow-sm flex items-center gap-1.5 transition-colors font-semibold" onclick="window.confirmInternalTransfer()">
                  <span class="material-symbols-outlined text-[18px]">verified</span>
                  <span>Validate Transfer &amp; Update Locations</span>
                </button>
              </div>
            </div>

            <!-- Transfer Log & Routing Info -->
            <div class="lg:col-span-4 space-y-space-md">
              <div class="bg-surface-card rounded-xl p-space-lg shadow-sm border border-border-subtle space-y-space-sm">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-primary text-[20px]">route</span>
                  <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Active Transfer Nodes</h3>
                </div>
                <p class="font-body-sm text-body-sm text-tertiary">Current material conduits moving through factory internal transit corridors.</p>
                <div class="space-y-3 pt-2">
                  <div class="p-3 rounded-lg bg-surface-subtle border border-border-subtle space-y-1">
                    <div class="flex items-center justify-between font-label-sm text-label-sm">
                      <span class="font-bold text-on-surface">Conduit A-04</span>
                      <span class="text-status-success font-semibold">Active</span>
                    </div>
                    <p class="font-body-sm text-body-sm text-tertiary">Bay A ➔ Rack 02 (Forklift #3)</p>
                    <div class="w-full bg-surface-container rounded-full h-1.5 mt-2">
                      <div class="bg-primary h-1.5 rounded-full" style="width: 65%;"></div>
                    </div>
                  </div>
                  <div class="p-3 rounded-lg bg-surface-subtle border border-border-subtle space-y-1">
                    <div class="flex items-center justify-between font-label-sm text-label-sm">
                      <span class="font-bold text-on-surface">Hub Dispatch Corridor</span>
                      <span class="text-status-info font-semibold">Staged</span>
                    </div>
                    <p class="font-body-sm text-body-sm text-tertiary">Warehouse 2 ➔ Production Rack</p>
                    <div class="w-full bg-surface-container rounded-full h-1.5 mt-2">
                      <div class="bg-status-info h-1.5 rounded-full" style="width: 25%;"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Help Tip -->
              <div class="bg-surface-container rounded-xl p-space-md shadow-sm border border-border-subtle flex items-start gap-2.5">
                <span class="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">lightbulb</span>
                <div class="text-body-sm font-body-sm text-on-surface-variant">
                  <span class="font-semibold text-on-surface block">Cross-Docking Tip</span>
                  Internal transfers between Main Warehouse and Production Racks update WIP work-order accounts instantly upon validation.
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 4. PHYSICAL STOCK ADJUSTMENTS TAB PANEL (AUDIT & RECONCILIATION) -->
        <div class="${activeOpTab === 'adjustments' ? '' : 'hidden'} space-y-space-lg" id="panel-adjustments">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            <!-- Adjustment Input & Delta Calculation Card -->
            <div class="lg:col-span-7 bg-surface-card rounded-xl p-space-lg shadow-sm border border-border-subtle space-y-space-md">
              <div class="flex items-center justify-between pb-space-sm border-b border-border-subtle">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-status-warning text-[24px]">tune</span>
                    <h2 class="font-headline-sm text-headline-sm text-on-surface font-bold">Physical Count Adjustment Workflow</h2>
                  </div>
                  <p class="font-body-sm text-body-sm text-tertiary">Reconcile theoretical ledger balances with real-world physical floor counts.</p>
                </div>
                <span class="px-2.5 py-1 rounded-full bg-status-warning-bg text-status-warning font-label-sm text-label-sm font-semibold border border-status-warning/20">
                  AUDIT RUN #2025-W12
                </span>
              </div>

              <!-- Product Specification Form -->
              <div class="p-space-md rounded-xl bg-surface-subtle space-y-3 border border-border-subtle">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  <div>
                    <label class="block text-[11px] font-label-sm text-tertiary mb-1 font-semibold">Target Product</label>
                    <div class="font-label-md text-label-md font-bold text-on-surface p-2 rounded bg-surface-card border border-border-subtle shadow-sm">
                      Steel Rod (SR001)
                    </div>
                  </div>
                  <div>
                    <label class="block text-[11px] font-label-sm text-tertiary mb-1 font-semibold">Location Audited</label>
                    <div class="font-label-md text-label-md font-bold text-on-surface p-2 rounded bg-surface-card border border-border-subtle shadow-sm">
                      Production Rack - Bin PR-04
                    </div>
                  </div>
                </div>
              </div>

              <!-- Triad Metric Difference Reconciliation -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
                <!-- Recorded Stock -->
                <div class="p-space-md rounded-xl bg-surface-container text-center space-y-1 border border-border-subtle">
                  <span class="text-[11px] font-label-sm text-tertiary uppercase block font-semibold">System Recorded Stock</span>
                  <span class="font-display text-headline-lg font-tabular-data text-on-surface font-bold" id="adjRecorded">10 kg</span>
                  <span class="text-[10px] text-tertiary font-label-sm block">Theoretical Balance</span>
                </div>
                <!-- Physical Count Input -->
                <div class="p-space-md rounded-xl bg-surface-card shadow-sm border border-border-strong text-center space-y-1">
                  <span class="text-[11px] font-label-sm text-primary uppercase block font-bold">Physical Count Input</span>
                  <div class="flex items-center justify-center">
                    <input class="w-24 h-11 text-center font-display text-headline-lg font-tabular-data text-on-surface bg-surface-subtle border border-border-subtle rounded-lg focus:outline-none focus:border-primary shadow-sm font-bold" id="adjPhysicalInput" min="0" oninput="window.calculateAdjustmentDiff()" step="0.1" type="number" value="7" />
                    <span class="ml-1.5 font-label-md text-label-md text-tertiary font-bold">kg</span>
                  </div>
                  <span class="text-[10px] text-primary font-label-sm block">Auditor physical check</span>
                </div>
                <!-- Calculated Difference -->
                <div class="p-space-md rounded-xl bg-status-warning-bg text-center space-y-1 transition-colors border border-status-warning/20" id="adjDiffBox">
                  <span class="text-[11px] font-label-sm text-status-warning uppercase block font-bold">Calculated Difference</span>
                  <span class="font-display text-headline-lg font-tabular-data text-status-warning font-bold" id="adjDifference">-3 kg</span>
                  <span class="text-[10px] text-status-warning font-label-sm block font-medium" id="adjDiffSub">Inventory Shrinkage</span>
                </div>
              </div>

              <!-- Explanation Discrepancy Note -->
              <div class="p-space-md rounded-xl bg-surface-subtle space-y-2 border border-border-subtle">
                <label class="block font-label-sm text-label-sm text-on-surface font-semibold">Discrepancy Justification Note</label>
                <textarea class="w-full p-2.5 rounded-lg bg-surface-card text-on-surface font-body-sm text-body-sm border border-border-subtle focus:outline-none focus:border-primary shadow-sm resize-none" id="adjReasonText" rows="2">Damaged or scrap discrepancy discovered during cycle count. Validating will post ADJUSTMENT -3 kg to ledger.</textarea>
                <div class="flex items-center gap-2 text-[11px] text-tertiary">
                  <span class="material-symbols-outlined text-[16px] text-status-warning">warning</span>
                  <span>Shrinkage above 2 kg mandates Reason Code 88 (Scrap / Damage Reconciliation).</span>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex items-center justify-between pt-space-xs flex-wrap gap-2">
                <button class="h-9 px-space-md rounded-lg font-label-md text-label-md text-tertiary hover:bg-surface-subtle hover:text-on-surface transition-colors" onclick="showToast('Audit Session Paused', 'Cycle count progress saved.')">
                  Cancel Count
                </button>
                <button class="h-9 px-space-md rounded-lg font-label-md text-label-md bg-status-warning hover:opacity-95 text-on-secondary shadow-sm flex items-center gap-1.5 transition-opacity font-semibold" onclick="window.confirmAdjustmentExecution()">
                  <span class="material-symbols-outlined text-[18px]">gavel</span>
                  <span>Post Adjustment to Ledger</span>
                </button>
              </div>
            </div>

            <!-- Recent Adjustments Journal -->
            <div class="lg:col-span-5 bg-surface-card rounded-xl p-space-lg shadow-sm border border-border-subtle space-y-space-md flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-space-sm pb-2 border-b border-border-subtle">
                  <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Recent Adjustment Journal</h3>
                  <span class="font-label-sm text-label-sm text-tertiary">Cycle Count Log</span>
                </div>
                <div class="space-y-3">
                  <div class="p-3 rounded-lg bg-surface-subtle border border-border-subtle space-y-1">
                    <div class="flex items-center justify-between">
                      <span class="font-label-sm text-label-sm font-bold text-primary">#ADJ-2025-003</span>
                      <span class="px-2 py-0.5 rounded-full bg-status-warning-bg text-status-warning font-label-sm text-[11px] font-bold">-3 kg</span>
                    </div>
                    <p class="font-body-sm text-body-sm text-on-surface font-medium">Steel Rod (SR001) • Production Rack</p>
                    <div class="flex items-center justify-between text-[11px] text-tertiary pt-1">
                      <span>Reason: Scrap cutting loss</span>
                      <span class="text-status-success font-semibold">Reconciled</span>
                    </div>
                  </div>

                  <div class="p-3 rounded-lg bg-surface-subtle border border-border-subtle space-y-1">
                    <div class="flex items-center justify-between">
                      <span class="font-label-sm text-label-sm font-bold text-primary">#ADJ-2025-002</span>
                      <span class="px-2 py-0.5 rounded-full bg-status-success-bg text-status-success font-label-sm text-[11px] font-bold">+5 pcs</span>
                    </div>
                    <p class="font-body-sm text-body-sm text-on-surface font-medium">Titanium Bolt M8 • Bin 12</p>
                    <div class="flex items-center justify-between text-[11px] text-tertiary pt-1">
                      <span>Reason: Found uncounted box</span>
                      <span class="text-status-success font-semibold">Reconciled</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Quick Reconciliation Status -->
              <div class="p-space-md rounded-xl bg-surface-container space-y-1.5 border border-border-subtle">
                <div class="flex items-center justify-between">
                  <span class="font-label-sm text-label-sm text-tertiary uppercase font-semibold">Audit Accuracy Rate</span>
                  <span class="font-label-sm text-label-sm text-status-success font-bold">99.8%</span>
                </div>
                <div class="w-full bg-surface-card h-2 rounded-full overflow-hidden">
                  <div class="bg-status-success h-full rounded-full" style="width: 99.8%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Global functions for Operations View interactions
window.switchOperationsTab = function(tabName) {
  window.location.hash = `#/operations/${tabName}`;
};

window.updateReceiptPreview = function() {
  const sel = document.getElementById('recProductSelect');
  const qtyInput = document.getElementById('recQtyInput');
  const curStockEl = document.getElementById('previewCurrentStock');
  const afterStockEl = document.getElementById('previewAfterStock');

  if (!sel || !qtyInput) return;

  const opt = sel.options[sel.selectedIndex];
  const cur = parseFloat(opt.getAttribute('data-stock')) || 0;
  const uom = opt.getAttribute('data-uom') || 'units';
  const qty = parseFloat(qtyInput.value) || 0;

  if (curStockEl) curStockEl.innerText = `${cur} ${uom}`;
  if (afterStockEl) afterStockEl.innerHTML = `${cur + qty} ${uom} <span class="text-status-success font-semibold text-body-sm">(+${qty})</span>`;
};

window.handleDirectReceipt = function(e) {
  e.preventDefault();
  const sku = document.getElementById('recProductSelect').value;
  const qty = document.getElementById('recQtyInput').value;
  const dest = document.getElementById('recWhDest').value;
  const doc = document.getElementById('recDocNumber').value;
  const supplier = document.getElementById('recSupplierName').value;

  try {
    store.postReceipt({
      sku,
      quantity: qty,
      location: dest,
      docRef: doc,
      supplier
    });
    showToast('Receipt Validated & Posted', `+${qty} added to ${dest} for ${sku}. Immutable ledger record written.`);
  } catch (err) {
    showToast('Receipt Error', err.message, 'error');
  }
};

window.testDeliverySafety = function() {
  const input = document.getElementById('simDeliveryQty');
  const badge = document.getElementById('deliverySafetyBadge');
  const btn = document.getElementById('postDeliveryBtn');
  const reqEl = document.getElementById('telemetryReqQty');
  const afterEl = document.getElementById('telemetryAfterStock');

  const val = parseFloat(input?.value) || 0;
  const avail = 40; // Ergonomic chair available stock

  if (reqEl) reqEl.innerText = val;
  if (afterEl) afterEl.innerText = Math.max(0, avail - val);

  if (val > avail) {
    if (badge) {
      badge.className = 'h-9 px-3 rounded-lg bg-status-danger-bg text-status-danger flex items-center gap-1.5 font-label-md text-label-md font-semibold border border-status-danger/20';
      badge.innerHTML = '<span class="material-symbols-outlined text-[16px]">error</span><span>Stockout Risk Blocked!</span>';
    }
    if (btn) {
      btn.disabled = true;
      btn.classList.add('opacity-50', 'cursor-not-allowed');
    }
  } else {
    if (badge) {
      badge.className = 'h-9 px-3 rounded-lg bg-status-success-bg text-status-success flex items-center gap-1.5 font-label-md text-label-md font-semibold border border-status-success/20';
      badge.innerHTML = '<span class="material-symbols-outlined text-[16px]">check_circle</span><span>Validation Permitted</span>';
    }
    if (btn) {
      btn.disabled = false;
      btn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
  }
};

window.confirmOutgoingDelivery = function() {
  const input = document.getElementById('simDeliveryQty');
  const qty = parseFloat(input?.value) || 10;

  try {
    store.postDelivery({
      sku: 'CH-880',
      quantity: qty,
      location: 'Main Warehouse',
      customer: 'Apex Construction Group',
      docRef: '#DO-2025-441'
    });
    showToast('Delivery Dispatched', `-${qty} Units CH-880 posted to ledger. Negative stock protection verified.`);
  } catch (err) {
    showToast('Dispatch Blocked', err.message, 'error');
  }
};

window.updateTransferCalculations = function() {
  const input = document.getElementById('transInputQty');
  const badge = document.getElementById('transFlowBadge');
  const sourceAfter = document.getElementById('transSourceAfter');
  const destAfter = document.getElementById('transDestAfter');

  const qty = parseFloat(input?.value) || 0;
  if (badge) badge.innerText = `${qty} kg`;
  if (sourceAfter) sourceAfter.innerText = `${Math.max(0, 70 - qty)} kg (-${qty} kg)`;
  if (destAfter) destAfter.innerText = `${7 + qty} kg (+${qty} kg)`;
};

window.confirmInternalTransfer = function() {
  const input = document.getElementById('transInputQty');
  const qty = parseFloat(input?.value) || 30;

  try {
    store.postTransfer({
      sku: 'SR001',
      quantity: qty,
      fromLocation: 'Main Warehouse (Bay A)',
      toLocation: 'Production Rack (Line 4)'
    });
    showToast('Internal Transfer Executed', `${qty} kg moved from Bay A to Production Rack. Conservation invariant validated.`);
  } catch (err) {
    showToast('Transfer Failed', err.message, 'error');
  }
};

window.calculateAdjustmentDiff = function() {
  const input = document.getElementById('adjPhysicalInput');
  const diffBox = document.getElementById('adjDiffBox');
  const diffText = document.getElementById('adjDifference');
  const subText = document.getElementById('adjDiffSub');

  const phys = parseFloat(input?.value) || 0;
  const sys = 10;
  const diff = phys - sys;

  if (diffText) diffText.innerText = `${diff > 0 ? '+' : ''}${diff} kg`;

  if (diff < 0) {
    if (diffBox) diffBox.className = 'p-space-md rounded-xl bg-status-warning-bg text-center space-y-1 transition-colors border border-status-warning/20';
    if (diffText) diffText.className = 'font-display text-headline-lg font-tabular-data text-status-warning font-bold';
    if (subText) subText.innerText = 'Inventory Shrinkage';
  } else if (diff > 0) {
    if (diffBox) diffBox.className = 'p-space-md rounded-xl bg-status-success-bg text-center space-y-1 transition-colors border border-status-success/20';
    if (diffText) diffText.className = 'font-display text-headline-lg font-tabular-data text-status-success font-bold';
    if (subText) subText.innerText = 'Found Stock Surplus';
  } else {
    if (diffBox) diffBox.className = 'p-space-md rounded-xl bg-surface-subtle text-center space-y-1 transition-colors border border-border-subtle';
    if (diffText) diffText.className = 'font-display text-headline-lg font-tabular-data text-on-surface font-bold';
    if (subText) subText.innerText = 'Zero Variance (Perfect Match)';
  }
};

window.confirmAdjustmentExecution = function() {
  const input = document.getElementById('adjPhysicalInput');
  const phys = parseFloat(input?.value) || 7;
  const reason = document.getElementById('adjReasonText')?.value;

  try {
    store.postAdjustment({
      sku: 'SR001',
      location: 'Production Rack',
      systemStock: 10,
      physicalStock: phys,
      reason
    });
    showToast('Adjustment Posted', `Variance recorded for SR001 at Production Rack. New balance: ${phys} kg.`);
  } catch (err) {
    showToast('Adjustment Error', err.message, 'error');
  }
};

window.printPickingSlip = function() {
  window.print();
};
