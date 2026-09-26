// StockSense Products & SKU Matrix View (Screen 2)
// Faithfully matches Stitch Screen 52220dd78946460ab6462493de49ccc1

import { store } from '../store/dataStore.js';
import { showToast } from '../components/Toast.js';

export function renderProductsView() {
  const products = store.getProducts();
  const metrics = store.getMetrics();

  return `
    <div class="flex flex-col w-full animate-fade-in">
      <!-- Command Hub & Page Subheader -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md mb-space-lg">
        <div>
          <div class="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm mb-1">
            <span class="hover:text-primary cursor-pointer transition-colors" onclick="window.location.hash='#/dashboard'">Home</span>
            <span>/</span>
            <span class="text-tertiary">Catalog Operations</span>
            <span>/</span>
            <span class="text-primary font-semibold">Products &amp; SKU Matrix</span>
          </div>
          <div class="flex items-center gap-space-sm flex-wrap">
            <h1 class="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">All Inventory Items &amp; Products</h1>
            <span class="px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold tracking-wide uppercase">${products.length} ACTIVE SKUs</span>
          </div>
        </div>

        <!-- Action Toolbar Buttons -->
        <div class="flex flex-wrap items-center gap-2.5">
          <div class="inline-flex rounded-lg bg-surface-subtle p-0.5 shadow-sm border border-border-subtle">
            <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-card text-primary font-label-md text-label-md shadow-sm transition-all" id="viewGridBtn" onclick="window.setProductViewMode('grid')" title="Bento Card Grid">
              <span class="material-symbols-outlined text-[18px]">grid_view</span>
              <span class="hidden sm:inline">Grid</span>
            </button>
            <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-tertiary font-label-md text-label-md hover:text-on-surface transition-all" id="viewListBtn" onclick="window.setProductViewMode('list')" title="Compact Table Matrix">
              <span class="material-symbols-outlined text-[18px]">view_headline</span>
              <span class="hidden sm:inline">Dense List</span>
            </button>
          </div>

          <div class="h-6 w-px bg-surface-container-high hidden sm:block"></div>

          <button class="flex items-center gap-1.5 h-9 px-3 bg-surface-card rounded-lg text-on-surface font-label-md text-label-md shadow-sm hover:bg-surface-subtle transition-colors border border-border-subtle" onclick="window.exportProductsCSV()" type="button">
            <span class="material-symbols-outlined text-[18px] text-tertiary">file_download</span>
            <span>Export CSV</span>
          </button>

          <button class="flex items-center gap-1.5 h-9 px-3 bg-surface-card rounded-lg text-on-surface font-label-md text-label-md shadow-sm hover:bg-surface-subtle transition-colors border border-border-subtle" onclick="showToast('Bulk Importer Ready', 'Select CSV or Excel product catalog spreadsheet.')" type="button">
            <span class="material-symbols-outlined text-[18px] text-tertiary">upload_file</span>
            <span>Bulk Import</span>
          </button>

          <button class="flex items-center gap-2 h-9 px-4 bg-primary text-on-primary rounded-lg font-label-lg text-label-lg shadow hover:bg-primary-container active:scale-[0.98] transition-all font-semibold" onclick="window.openModal('addProductModal')" type="button">
            <span class="material-symbols-outlined text-[18px]">add_circle</span>
            <span>+ Add Product</span>
          </button>
        </div>
      </div>

      <!-- Telemetry KPI Strip (5 Tiles) -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-space-sm mb-space-lg">
        <!-- Tile 1 -->
        <div class="bg-surface-card p-4 rounded-xl shadow-sm border border-border-subtle flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between text-tertiary font-label-sm text-label-sm uppercase tracking-wider">
            <span>Registered SKUs</span>
            <span class="material-symbols-outlined text-[18px] text-primary">barcode_scanner</span>
          </div>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="font-headline-lg text-headline-lg text-on-surface font-tabular-data font-bold">${products.length}</span>
            <span class="font-label-sm text-label-sm text-status-success flex items-center font-medium">+8 this wk</span>
          </div>
          <div class="mt-2.5 w-full bg-surface-container rounded-full h-1 overflow-hidden">
            <div class="bg-primary h-full rounded-full" style="width: 100%"></div>
          </div>
        </div>

        <!-- Tile 2 -->
        <div class="bg-surface-card p-4 rounded-xl shadow-sm border border-border-subtle flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between text-tertiary font-label-sm text-label-sm uppercase tracking-wider">
            <span>Healthy Stock</span>
            <div class="h-2 w-2 rounded-full bg-status-success animate-pulse"></div>
          </div>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="font-headline-lg text-headline-lg text-on-surface font-tabular-data font-bold">${products.filter(p => p.status === 'IN STOCK').length}</span>
            <span class="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-status-success-bg text-status-success font-semibold">
              ${Math.round((products.filter(p => p.status === 'IN STOCK').length / (products.length || 1)) * 100)}%
            </span>
          </div>
          <div class="mt-2.5 w-full bg-surface-container rounded-full h-1 overflow-hidden">
            <div class="bg-status-success h-full rounded-full" style="width: 80%"></div>
          </div>
        </div>

        <!-- Tile 3 -->
        <div class="bg-surface-card p-4 rounded-xl shadow-sm border border-border-subtle flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between text-tertiary font-label-sm text-label-sm uppercase tracking-wider">
            <span>Low Stock</span>
            <span class="material-symbols-outlined text-[18px] text-status-warning">warning</span>
          </div>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="font-headline-lg text-headline-lg text-status-warning font-tabular-data font-bold">${metrics.lowStockCount}</span>
            <span class="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-status-warning-bg text-status-warning font-semibold">Needs PO</span>
          </div>
          <div class="mt-2.5 w-full bg-surface-container rounded-full h-1 overflow-hidden">
            <div class="bg-status-warning h-full rounded-full" style="width: 25%"></div>
          </div>
        </div>

        <!-- Tile 4 -->
        <div class="bg-surface-card p-4 rounded-xl shadow-sm border border-border-subtle flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between text-tertiary font-label-sm text-label-sm uppercase tracking-wider">
            <span>Stockout</span>
            <span class="material-symbols-outlined text-[18px] text-status-danger">report</span>
          </div>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="font-headline-lg text-headline-lg text-status-danger font-tabular-data font-bold">${metrics.outOfStockCount}</span>
            <span class="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-status-danger-bg text-status-danger font-semibold">Critical</span>
          </div>
          <div class="mt-2.5 w-full bg-surface-container rounded-full h-1 overflow-hidden">
            <div class="bg-status-danger h-full rounded-full" style="width: 10%"></div>
          </div>
        </div>

        <!-- Tile 5 -->
        <div class="bg-surface-card p-4 rounded-xl shadow-sm border border-border-subtle flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow col-span-2 sm:col-span-1">
          <div class="flex items-center justify-between text-tertiary font-label-sm text-label-sm uppercase tracking-wider">
            <span>Valuation (FIFO)</span>
            <span class="material-symbols-outlined text-[18px] text-secondary">payments</span>
          </div>
          <div class="mt-2 flex items-baseline gap-1">
            <span class="font-headline-lg text-headline-lg text-on-surface font-tabular-data tracking-tight font-bold">
              $${metrics.totalValuation.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div class="mt-2.5 flex items-center justify-between font-label-sm text-label-sm text-tertiary">
            <span>3 Facilities</span>
            <span class="text-status-success font-medium">99.8% verified</span>
          </div>
        </div>
      </div>

      <!-- Operational Search, Filters & Taxonomy Rail -->
      <div class="bg-surface-card p-space-md rounded-xl shadow-sm border border-border-subtle mb-space-lg flex flex-col gap-space-md">
        <div class="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-sm">
          <!-- Search Field -->
          <div class="relative flex-1 max-w-xl">
            <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-tertiary pointer-events-none">search</span>
            <input 
              id="productSearchInput" 
              class="w-full h-10 pl-11 pr-10 bg-surface-subtle rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline border border-border-subtle focus:outline-none focus:bg-surface-container-lowest focus:border-primary transition-all" 
              onkeyup="window.filterProductsDOM()" 
              placeholder="Filter by product title, SKU (e.g. SR001), barcode, or bin code..." 
              type="text" 
            />
            <button class="absolute right-2.5 top-1/2 -translate-y-1/2 text-tertiary hover:text-on-surface p-1 rounded" onclick="document.getElementById('productSearchInput').value=''; window.filterProductsDOM();" type="button">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <!-- Quick Dropdown Filters -->
          <div class="flex flex-wrap items-center gap-2">
            <div class="flex items-center bg-surface-subtle rounded-lg px-2.5 h-10 border border-border-subtle">
              <span class="material-symbols-outlined text-[18px] text-tertiary mr-1.5">storefront</span>
              <select id="warehouseFilter" class="bg-transparent text-label-md font-label-md text-on-surface focus:outline-none cursor-pointer" onchange="window.filterProductsDOM()">
                <option value="all">All Warehouses (Global)</option>
                <option value="Main Warehouse">Main Warehouse (Bay A)</option>
                <option value="Production Rack">Production Floor / Rack A</option>
                <option value="Warehouse 2">Warehouse 2 (Logistics Hub)</option>
              </select>
            </div>

            <div class="flex items-center bg-surface-subtle rounded-lg px-2.5 h-10 border border-border-subtle">
              <span class="material-symbols-outlined text-[18px] text-tertiary mr-1.5">tune</span>
              <select id="statusFilter" class="bg-transparent text-label-md font-label-md text-on-surface focus:outline-none cursor-pointer" onchange="window.filterProductsDOM()">
                <option value="all">All Statuses</option>
                <option value="IN STOCK">Healthy (In Stock)</option>
                <option value="LOW STOCK">Warning (Low Stock)</option>
                <option value="OUT OF STOCK">Critical (Out of Stock)</option>
              </select>
            </div>

            <button class="h-10 px-3 rounded-lg text-tertiary hover:text-on-surface hover:bg-surface-subtle font-label-md text-label-md flex items-center gap-1 transition-colors border border-border-subtle" onclick="window.resetProductFilters()" title="Reset Filters" type="button">
              <span class="material-symbols-outlined text-[18px]">restart_alt</span>
              <span class="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        <!-- Category Pills Strip -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 text-nowrap" id="categoryPillStrip">
          <span class="font-label-sm text-label-sm text-tertiary uppercase tracking-wider pr-1 font-semibold">Category:</span>
          <button class="cat-pill active-pill px-3 py-1.5 rounded-full bg-surface-container-high text-primary font-label-md text-label-md shadow-sm font-semibold transition-all" onclick="window.selectCategoryFilter('all', this)">All (${products.length})</button>
          <button class="cat-pill px-3 py-1.5 rounded-full bg-surface-subtle text-on-surface-variant hover:bg-surface-container font-label-md text-label-md transition-all" onclick="window.selectCategoryFilter('Raw Materials', this)">Raw Materials</button>
          <button class="cat-pill px-3 py-1.5 rounded-full bg-surface-subtle text-on-surface-variant hover:bg-surface-container font-label-md text-label-md transition-all" onclick="window.selectCategoryFilter('Finished Goods', this)">Finished Goods</button>
          <button class="cat-pill px-3 py-1.5 rounded-full bg-surface-subtle text-on-surface-variant hover:bg-surface-container font-label-md text-label-md transition-all" onclick="window.selectCategoryFilter('Electronics', this)">Electronics</button>
          <button class="cat-pill px-3 py-1.5 rounded-full bg-surface-subtle text-on-surface-variant hover:bg-surface-container font-label-md text-label-md transition-all" onclick="window.selectCategoryFilter('Furniture', this)">Furniture</button>
          <button class="cat-pill px-3 py-1.5 rounded-full bg-surface-subtle text-on-surface-variant hover:bg-surface-container font-label-md text-label-md transition-all" onclick="window.selectCategoryFilter('Construction', this)">Construction</button>
        </div>
      </div>

      <!-- PRODUCTS GRID VIEW (Bento Cards) -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md" id="productsGridView">
        ${products.map(p => {
          const isOut = p.status === 'OUT OF STOCK';
          const isLow = p.status === 'LOW STOCK';

          let statusBadge = `
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-status-success-bg text-status-success font-label-sm text-label-sm font-semibold shadow-xs">
              <span class="h-1.5 w-1.5 rounded-full bg-status-success"></span>
              IN STOCK
            </span>
          `;
          let gaugeColor = 'bg-status-success';
          let gaugePercent = Math.min(100, Math.round((p.totalStock / (p.minStock * 2 || 20)) * 100));

          if (isOut) {
            statusBadge = `
              <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-status-danger-bg text-status-danger font-label-sm text-label-sm font-semibold shadow-xs">
                <span class="h-1.5 w-1.5 rounded-full bg-status-danger"></span>
                OUT OF STOCK
              </span>
            `;
            gaugeColor = 'bg-status-danger';
            gaugePercent = 0;
          } else if (isLow) {
            statusBadge = `
              <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-status-warning-bg text-status-warning font-label-sm text-label-sm font-semibold shadow-xs">
                <span class="h-1.5 w-1.5 rounded-full bg-status-warning"></span>
                LOW STOCK
              </span>
            `;
            gaugeColor = 'bg-status-warning';
          }

          const whNames = Object.keys(p.allocations || {}).join(',');

          return `
            <div 
              class="product-item bg-surface-card rounded-xl shadow-sm border border-border-subtle hover:shadow-md hover:border-border-strong transition-all duration-200 flex flex-col justify-between overflow-hidden group" 
              data-category="${p.category}" 
              data-name="${p.name}" 
              data-sku="${p.sku}" 
              data-status="${p.status}" 
              data-warehouses="${whNames}"
            >
              <div class="p-space-md">
                <!-- Visual Card Header -->
                <div class="relative h-44 w-full rounded-lg bg-surface-subtle overflow-hidden mb-space-sm flex items-center justify-center">
                  <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${isOut ? 'opacity-75' : ''}" src="${p.imageUrl}" alt="${p.name}" />
                  <div class="absolute top-2.5 left-2.5">
                    <span class="px-2 py-0.5 rounded bg-surface-card/90 backdrop-blur text-on-surface font-label-sm text-label-sm font-semibold shadow-xs">${p.sku}</span>
                  </div>
                  <div class="absolute top-2.5 right-2.5">
                    ${statusBadge}
                  </div>
                  <div class="absolute bottom-2 left-2.5">
                    <span class="px-2 py-0.5 rounded-full bg-surface-container-high/90 text-primary font-label-sm text-label-sm font-medium">${p.category}</span>
                  </div>
                </div>

                <!-- Product Name & Unit -->
                <div class="flex items-start justify-between gap-2 mb-1.5">
                  <h2 class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors leading-tight font-bold">${p.name}</h2>
                  <span class="font-label-sm text-label-sm text-tertiary bg-surface-subtle px-1.5 py-0.5 rounded">${p.uom}</span>
                </div>
                <p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-1 mb-space-sm">${p.description}</p>

                <!-- Location Allocation Breakdown Strip -->
                <div class="bg-surface-subtle p-2.5 rounded-lg mb-space-sm space-y-1.5 border border-border-subtle">
                  <div class="flex items-center justify-between font-label-sm text-label-sm text-tertiary">
                    <span>Location Allocation</span>
                    <span class="font-semibold text-on-surface font-tabular-data">${p.totalStock} ${p.uom} Total</span>
                  </div>
                  <div class="space-y-1 font-body-sm text-body-sm">
                    ${Object.entries(p.allocations || {}).map(([wh, qty]) => `
                      <div class="flex justify-between items-center text-on-surface">
                        <span class="flex items-center gap-1 text-on-surface-variant text-[12px]">
                          <span class="h-1.5 w-1.5 rounded-full ${qty > 0 ? 'bg-primary' : 'bg-outline'}"></span>
                          ${wh}
                        </span>
                        <span class="font-semibold font-tabular-data text-[12px] ${qty === 0 ? 'text-tertiary' : ''}">${qty} ${p.uom}</span>
                      </div>
                    `).join('')}
                  </div>

                  <!-- Threshold Reorder Gauge -->
                  <div class="pt-1 border-t border-border-subtle">
                    <div class="flex justify-between text-[10px] font-label-sm text-tertiary mb-1">
                      <span>Threshold Reorder: ${p.minStock} ${p.uom}</span>
                      <span class="${isLow ? 'text-status-warning font-semibold' : (isOut ? 'text-status-danger font-semibold' : 'text-status-success')}">
                        ${isOut ? 'Immediate Action' : (isLow ? 'Near trigger level' : 'Optimal')}
                      </span>
                    </div>
                    <div class="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                      <div class="${gaugeColor} h-full rounded-full transition-all" style="width: ${gaugePercent}%"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Quick Action Footers -->
              <div class="bg-surface-bright p-space-sm px-space-md flex items-center justify-between border-t border-border-subtle gap-1.5">
                <button class="flex-1 py-1.5 px-2 bg-surface-card hover:bg-surface-container text-on-surface font-label-sm text-label-sm rounded shadow-xs text-center transition-colors border border-border-subtle ${isOut ? 'opacity-50 cursor-not-allowed' : ''}" onclick="window.openTransferWithSku('${p.sku}')" ${isOut ? 'disabled' : ''}>Transfer</button>
                <button class="flex-1 py-1.5 px-2 bg-surface-card hover:bg-surface-container text-on-surface font-label-sm text-label-sm rounded shadow-xs text-center transition-colors border border-border-subtle" onclick="window.openAdjustWithSku('${p.sku}')">Adjust</button>
                ${isOut ? `
                  <button class="flex-1 py-1.5 px-2 bg-status-danger text-on-primary font-label-sm text-label-sm rounded shadow-xs text-center hover:opacity-90 transition-all font-semibold" onclick="window.triggerQuickReorder('${p.sku}', '${p.name}', '${p.minStock * 2} ${p.uom}')">Reorder</button>
                ` : `
                  <button class="flex-1 py-1.5 px-2 bg-primary text-on-primary font-label-sm text-label-sm rounded shadow-xs text-center hover:bg-primary-container transition-colors font-semibold" onclick="window.openReceiptWithSku('${p.sku}')">Receive</button>
                `}
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- PRODUCTS LIST VIEW (High-density ERP Table) -->
      <div class="hidden bg-surface-card rounded-xl shadow-sm border border-border-subtle overflow-hidden" id="productsListView">
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="bg-surface-subtle text-tertiary font-label-sm text-label-sm uppercase tracking-wider border-b border-border-subtle">
              <tr>
                <th class="py-3 px-4 font-semibold">Item &amp; Description</th>
                <th class="py-3 px-4 font-semibold">SKU / Code</th>
                <th class="py-3 px-4 font-semibold">Category</th>
                <th class="py-3 px-4 font-semibold">Warehouse Breakdown</th>
                <th class="py-3 px-4 font-semibold">Reorder Level</th>
                <th class="py-3 px-4 font-semibold">Status</th>
                <th class="py-3 px-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border-subtle font-body-md text-body-md text-on-surface">
              ${products.map(p => {
                const isOut = p.status === 'OUT OF STOCK';
                const isLow = p.status === 'LOW STOCK';

                let statusBadge = `
                  <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-status-success-bg text-status-success font-label-sm text-label-sm font-semibold">
                    <span class="h-1.5 w-1.5 rounded-full bg-status-success"></span>
                    IN STOCK
                  </span>
                `;
                if (isOut) {
                  statusBadge = `
                    <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-status-danger-bg text-status-danger font-label-sm text-label-sm font-semibold">
                      <span class="h-1.5 w-1.5 rounded-full bg-status-danger"></span>
                      OUT OF STOCK
                    </span>
                  `;
                } else if (isLow) {
                  statusBadge = `
                    <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-status-warning-bg text-status-warning font-label-sm text-label-sm font-semibold">
                      <span class="h-1.5 w-1.5 rounded-full bg-status-warning"></span>
                      LOW STOCK
                    </span>
                  `;
                }

                return `
                  <tr class="hover:bg-surface-bright transition-colors product-table-row" data-name="${p.name}" data-sku="${p.sku}" data-category="${p.category}" data-status="${p.status}">
                    <td class="py-3 px-4">
                      <div class="flex items-center gap-3">
                        <div class="w-9 h-9 rounded bg-surface-subtle overflow-hidden shrink-0 border border-border-subtle">
                          <img class="w-full h-full object-cover" src="${p.imageUrl}" alt="${p.name}" />
                        </div>
                        <div>
                          <span class="font-headline-sm text-[14px] text-on-surface font-semibold block">${p.name}</span>
                          <span class="text-tertiary font-body-sm text-body-sm">Unit: ${p.uom} • $${p.unitPrice.toFixed(2)}</span>
                        </div>
                      </div>
                    </td>
                    <td class="py-3 px-4 font-tabular-data font-semibold text-primary">${p.sku}</td>
                    <td class="py-3 px-4">
                      <span class="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm">${p.category}</span>
                    </td>
                    <td class="py-3 px-4 font-tabular-data">
                      <div class="text-[12px] text-tertiary">
                        ${Object.entries(p.allocations || {}).map(([wh, qty]) => `${wh.slice(0, 4)}: ${qty}`).join(' | ')}
                      </div>
                      <div class="font-semibold text-on-surface">Total: ${p.totalStock} ${p.uom}</div>
                    </td>
                    <td class="py-3 px-4 font-tabular-data text-tertiary font-medium">${p.minStock} ${p.uom}</td>
                    <td class="py-3 px-4">${statusBadge}</td>
                    <td class="py-3 px-4 text-right">
                      <div class="inline-flex gap-1">
                        <button class="p-1 rounded hover:bg-surface-subtle text-primary" onclick="window.openTransferWithSku('${p.sku}')" title="Transfer"><span class="material-symbols-outlined text-[18px]">swap_horiz</span></button>
                        <button class="p-1 rounded hover:bg-surface-subtle text-tertiary" onclick="window.openAdjustWithSku('${p.sku}')" title="Adjust"><span class="material-symbols-outlined text-[18px]">tune</span></button>
                        <button class="p-1 rounded hover:bg-surface-subtle text-status-success" onclick="window.openReceiptWithSku('${p.sku}')" title="Receive"><span class="material-symbols-outlined text-[18px]">input</span></button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Bottom Pagination & Records Meta -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-space-sm mt-space-lg pt-space-sm bg-surface-card p-space-md rounded-xl shadow-sm border border-border-subtle">
        <div class="flex items-center gap-2 text-tertiary font-body-sm text-body-sm">
          <span>Showing</span>
          <span class="font-semibold text-on-surface font-tabular-data" id="visibleCountLabel">${products.length}</span>
          <span>of</span>
          <span class="font-semibold text-on-surface font-tabular-data">${products.length}</span>
          <span>products across active warehouse facilities</span>
        </div>
        <div class="flex items-center gap-1.5">
          <button class="h-8 w-8 rounded-lg bg-surface-subtle text-tertiary flex items-center justify-center hover:text-on-surface transition-colors" disabled>
            <span class="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          <button class="h-8 w-8 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center">1</button>
          <button class="h-8 w-8 rounded-lg bg-surface-subtle text-tertiary flex items-center justify-center hover:text-on-surface transition-colors" disabled>
            <span class="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

// Window interactive helper functions
let currentCategoryFilter = 'all';

window.setProductViewMode = function(mode) {
  const grid = document.getElementById('productsGridView');
  const list = document.getElementById('productsListView');
  const gridBtn = document.getElementById('viewGridBtn');
  const listBtn = document.getElementById('viewListBtn');

  if (mode === 'grid') {
    if (grid) grid.classList.remove('hidden');
    if (list) list.classList.add('hidden');
    if (gridBtn) {
      gridBtn.className = 'flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-card text-primary font-label-md text-label-md shadow-sm transition-all';
    }
    if (listBtn) {
      listBtn.className = 'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-tertiary font-label-md text-label-md hover:text-on-surface transition-all';
    }
  } else {
    if (grid) grid.classList.add('hidden');
    if (list) list.classList.remove('hidden');
    if (listBtn) {
      listBtn.className = 'flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-card text-primary font-label-md text-label-md shadow-sm transition-all';
    }
    if (gridBtn) {
      gridBtn.className = 'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-tertiary font-label-md text-label-md hover:text-on-surface transition-all';
    }
  }
};

window.selectCategoryFilter = function(cat, btnEl) {
  currentCategoryFilter = cat;
  document.querySelectorAll('.cat-pill').forEach(btn => {
    btn.className = 'cat-pill px-3 py-1.5 rounded-full bg-surface-subtle text-on-surface-variant hover:bg-surface-container font-label-md text-label-md transition-all';
  });
  if (btnEl) {
    btnEl.className = 'cat-pill active-pill px-3 py-1.5 rounded-full bg-surface-container-high text-primary font-label-md text-label-md shadow-sm font-semibold transition-all';
  }
  window.filterProductsDOM();
};

window.filterProductsDOM = function() {
  const query = (document.getElementById('productSearchInput')?.value || '').toLowerCase().trim();
  const warehouse = document.getElementById('warehouseFilter')?.value || 'all';
  const status = document.getElementById('statusFilter')?.value || 'all';

  const cards = document.querySelectorAll('.product-item');
  const rows = document.querySelectorAll('.product-table-row');
  let visibleCount = 0;

  cards.forEach(card => {
    const name = (card.getAttribute('data-name') || '').toLowerCase();
    const sku = (card.getAttribute('data-sku') || '').toLowerCase();
    const cat = card.getAttribute('data-category') || '';
    const cardStatus = card.getAttribute('data-status') || '';
    const wh = card.getAttribute('data-warehouses') || '';

    const matchesSearch = !query || name.includes(query) || sku.includes(query);
    const matchesCat = currentCategoryFilter === 'all' || cat === currentCategoryFilter;
    const matchesWh = warehouse === 'all' || wh.includes(warehouse);
    const matchesStatus = status === 'all' || cardStatus === status;

    if (matchesSearch && matchesCat && matchesWh && matchesStatus) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  rows.forEach(row => {
    const name = (row.getAttribute('data-name') || '').toLowerCase();
    const sku = (row.getAttribute('data-sku') || '').toLowerCase();
    const cat = row.getAttribute('data-category') || '';
    const rowStatus = row.getAttribute('data-status') || '';

    const matchesSearch = !query || name.includes(query) || sku.includes(query);
    const matchesCat = currentCategoryFilter === 'all' || cat === currentCategoryFilter;
    const matchesStatus = status === 'all' || rowStatus === status;

    row.style.display = (matchesSearch && matchesCat && matchesStatus) ? '' : 'none';
  });

  const countLabel = document.getElementById('visibleCountLabel');
  if (countLabel) countLabel.innerText = visibleCount;
};

window.resetProductFilters = function() {
  const searchInput = document.getElementById('productSearchInput');
  const whFilter = document.getElementById('warehouseFilter');
  const stFilter = document.getElementById('statusFilter');

  if (searchInput) searchInput.value = '';
  if (whFilter) whFilter.value = 'all';
  if (stFilter) stFilter.value = 'all';

  const firstPill = document.querySelector('.cat-pill');
  window.selectCategoryFilter('all', firstPill);
  showToast('Filters Reset', 'Catalog view reset to default.');
};

window.openReceiptWithSku = function(sku) {
  window.openModal('receiptModal');
  const sel = document.getElementById('receiptSku');
  if (sel) sel.value = sku;
};

window.openTransferWithSku = function(sku) {
  window.openModal('transferModal');
  const sel = document.getElementById('transferSku');
  if (sel) sel.value = sku;
};

window.openAdjustWithSku = function(sku) {
  window.openModal('adjustModal');
  const sel = document.getElementById('adjustSku');
  if (sel) {
    sel.value = sku;
    window.updateAdjustFormValues(sku);
  }
};

window.exportProductsCSV = function() {
  const products = store.getProducts();
  const headers = ['SKU', 'Name', 'Category', 'UoM', 'TotalStock', 'MinStock', 'UnitPrice', 'Status'];
  const rows = products.map(p => [
    `"${p.sku}"`,
    `"${p.name}"`,
    `"${p.category}"`,
    `"${p.uom}"`,
    p.totalStock,
    p.minStock,
    p.unitPrice,
    `"${p.status}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `stocksense_catalog_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('CSV Exported', 'Full inventory SKU matrix exported.');
};
