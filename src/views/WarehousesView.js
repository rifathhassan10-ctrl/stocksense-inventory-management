// StockSense Warehouse Facilities & Bin Architecture View (Screen 5)
// Faithfully matches Stitch Screen 9d867d0220bb403f86ba3e6187ba4cad

import { store } from '../store/dataStore.js';
import { showToast } from '../components/Toast.js';

let selectedBinData = {
  id: 'BIN-A-01-A',
  zone: 'Zone A - Heavy Metals',
  title: 'BIN-A-01-A',
  sku: 'SR001 • Industrial Steel Rod',
  desc: '12mm Reinforced Carbon Steel',
  capacityFormatted: '70% (70 / 100 kg)',
  capacityPct: 70,
  statusColor: 'bg-status-success',
  statusText: 'Active • 70% Capacity',
  maxWeight: '500 kg (Load: 70 kg)',
  dimensions: '2.4m × 1.2m × 1.5m',
  climate: 'Ambient (18°C - 24°C)',
  rfid: 'RFID-8839-A1',
  weightCurrent: '70 kg',
  safetyBuffer: '25 kg (Min Level)',
  lastMoveRef: '#TRF-2025-044',
  lastMoveTime: 'Today, 15:10 by FL-04',
  locked: false
};

export function renderWarehousesView() {
  const whConfig = store.getWarehouseConfig();
  const mainWh = whConfig.warehouses[0];

  return `
    <div class="flex flex-col w-full animate-fade-in">
      <!-- Title & Top Action Bar Header -->
      <div class="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md mb-space-lg">
        <div>
          <div class="flex items-center gap-space-xs text-label-md font-label-md text-tertiary mb-1">
            <span>Settings &amp; Facilities</span>
            <span class="material-symbols-outlined text-[14px]">chevron_right</span>
            <span class="text-on-surface font-semibold">Multi-Warehouse Bin Architecture</span>
          </div>
          <h1 class="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">Warehouse Facilities &amp; Storage Bin Architecture</h1>
          <p class="font-body-md text-body-md text-tertiary mt-0.5 max-w-3xl">
            Configure facility zones, aisle-rack-bin storage hierarchies, capacity thresholds, and live SKU allocations across multi-site nodes.
          </p>
        </div>

        <!-- Top Action Buttons -->
        <div class="flex items-center gap-2.5 flex-wrap">
          <button class="h-9 px-3.5 bg-surface-card hover:bg-surface-subtle text-on-surface font-label-md text-label-md rounded shadow-sm flex items-center gap-1.5 transition-colors border border-border-subtle" onclick="window.printWarehouseMap()" type="button">
            <span class="material-symbols-outlined text-[18px] text-tertiary">map</span>
            <span>Export Layout Map</span>
          </button>
          <button class="h-9 px-3.5 bg-surface-card hover:bg-surface-subtle text-on-surface font-label-md text-label-md rounded shadow-sm flex items-center gap-1.5 transition-colors border border-border-subtle" onclick="showToast('Rack Provisioner', 'Opening CAD rack placement wizard.')" type="button">
            <span class="material-symbols-outlined text-[18px] text-tertiary">grid_view</span>
            <span>+ New Zone / Rack</span>
          </button>
          <button class="h-9 px-4 bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md rounded shadow-sm flex items-center gap-1.5 transition-colors font-semibold" onclick="showToast('Bin Provisioner', 'Select Aisle and Tier to add new RFID-linked storage bin.')" type="button">
            <span class="material-symbols-outlined text-[18px]">add_box</span>
            <span>+ Add Storage Bin</span>
          </button>
        </div>
      </div>

      <!-- Warehouse Tabs Strip -->
      <div class="flex items-center justify-between bg-surface-card rounded-lg p-1.5 shadow-sm border border-border-subtle mb-space-lg overflow-x-auto">
        <div class="flex items-center gap-1 min-w-max">
          <button class="h-8 px-3.5 rounded text-label-md font-label-md flex items-center gap-2 bg-surface-container text-primary font-bold transition-all shadow-xs">
            <span class="material-symbols-outlined text-[16px]">warehouse</span>
            <span>Main Warehouse (Central Hub)</span>
            <span class="px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-tabular-data">Bay A-D</span>
          </button>
          <button class="h-8 px-3.5 rounded text-label-md font-label-md flex items-center gap-2 text-tertiary hover:text-on-surface hover:bg-surface-subtle transition-all" onclick="showToast('Facility Switched', 'Viewing Production Facility (Plant A) rack matrix.')">
            <span class="material-symbols-outlined text-[16px]">precision_manufacturing</span>
            <span>Production Facility (Plant A)</span>
            <span class="px-1.5 py-0.5 rounded-full bg-surface-subtle text-tertiary text-[10px] font-tabular-data">Rack 1-8</span>
          </button>
          <button class="h-8 px-3.5 rounded text-label-md font-label-md flex items-center gap-2 text-tertiary hover:text-on-surface hover:bg-surface-subtle transition-all" onclick="showToast('Facility Switched', 'Viewing Warehouse 2 Logistics Hub.')">
            <span class="material-symbols-outlined text-[16px]">local_shipping</span>
            <span>Warehouse 2 (Logistics Hub)</span>
            <span class="px-1.5 py-0.5 rounded-full bg-surface-subtle text-tertiary text-[10px] font-tabular-data">Bay E-H</span>
          </button>
          <button class="h-8 px-3.5 rounded text-label-md font-label-md flex items-center gap-2 text-tertiary hover:text-on-surface hover:bg-surface-subtle transition-all" onclick="showToast('Facility Switched', 'Viewing Cold Storage Depot (-18°C).')">
            <span class="material-symbols-outlined text-[16px]">ac_unit</span>
            <span>Cold Storage Depot</span>
            <span class="px-1.5 py-0.5 rounded-full bg-surface-subtle text-tertiary text-[10px] font-tabular-data">-18°C</span>
          </button>
        </div>
        <button class="h-8 px-3 text-label-sm font-label-sm text-primary hover:bg-surface-subtle rounded flex items-center gap-1 font-semibold shrink-0 transition-colors" onclick="showToast('Add Facility', 'Specify facility name, latitude, longitude, and dock count.')" type="button">
          <span class="material-symbols-outlined text-[16px]">add</span>
          <span>Add Facility</span>
        </button>
      </div>

      <!-- Facility Overview Stats Bar (4 Cards) -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md mb-space-lg">
        <!-- Stat 1 -->
        <div class="bg-surface-card p-4 rounded-lg shadow-sm border border-border-subtle flex flex-col justify-between">
          <div class="flex items-center justify-between mb-2">
            <span class="font-label-sm text-label-sm uppercase tracking-wider text-tertiary font-semibold">Total Capacity Utilization</span>
            <span class="p-1 rounded bg-surface-subtle text-primary">
              <span class="material-symbols-outlined text-[16px]">pie_chart</span>
            </span>
          </div>
          <div>
            <div class="flex items-baseline justify-between mb-1.5">
              <span class="font-headline-md text-headline-md text-on-surface font-bold">${mainWh.utilizationPct}%</span>
              <span class="font-tabular-data text-body-sm text-tertiary font-semibold">${mainWh.usedCapacityM3} / ${mainWh.totalCapacityM3} m³</span>
            </div>
            <div class="w-full bg-surface-subtle h-2 rounded-full overflow-hidden flex">
              <div class="bg-primary h-full rounded-full transition-all duration-500" style="width: ${mainWh.utilizationPct}%"></div>
            </div>
          </div>
          <div class="mt-2.5 pt-2 flex items-center justify-between text-label-sm font-label-sm text-tertiary border-t border-border-subtle">
            <span>Available buffer</span>
            <span class="font-tabular-data font-semibold text-status-success">${mainWh.totalCapacityM3 - mainWh.usedCapacityM3} m³ headroom</span>
          </div>
        </div>

        <!-- Stat 2 -->
        <div class="bg-surface-card p-4 rounded-lg shadow-sm border border-border-subtle flex flex-col justify-between">
          <div class="flex items-center justify-between mb-2">
            <span class="font-label-sm text-label-sm uppercase tracking-wider text-tertiary font-semibold">Storage Bins Configured</span>
            <span class="p-1 rounded bg-surface-subtle text-tertiary">
              <span class="material-symbols-outlined text-[16px]">shelves</span>
            </span>
          </div>
          <div>
            <div class="flex items-baseline gap-2 mb-1">
              <span class="font-headline-md text-headline-md text-on-surface font-bold font-tabular-data">${mainWh.totalSlots}</span>
              <span class="font-label-md text-label-md text-tertiary font-semibold">Total Slots</span>
            </div>
            <div class="flex items-center gap-1.5 font-label-sm text-label-sm flex-wrap">
              <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-surface-subtle text-on-surface-variant font-medium">
                <span class="w-1.5 h-1.5 rounded-full bg-primary"></span> ${mainWh.activeSlots} Active
              </span>
              <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-status-warning-bg text-status-warning font-semibold">
                12 Reserved
              </span>
              <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-status-danger-bg text-status-danger font-semibold">
                6 Maint.
              </span>
            </div>
          </div>
          <div class="mt-2.5 pt-2 flex items-center justify-between text-label-sm font-label-sm text-tertiary border-t border-border-subtle">
            <span>Slot Health Status</span>
            <span class="text-status-success font-semibold flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">check_circle</span> 96.7% Ready
            </span>
          </div>
        </div>

        <!-- Stat 3 -->
        <div class="bg-surface-card p-4 rounded-lg shadow-sm border border-border-subtle flex flex-col justify-between">
          <div class="flex items-center justify-between mb-2">
            <span class="font-label-sm text-label-sm uppercase tracking-wider text-tertiary font-semibold">Stored SKU Volume</span>
            <span class="p-1 rounded bg-surface-subtle text-primary">
              <span class="material-symbols-outlined text-[16px]">inventory_2</span>
            </span>
          </div>
          <div>
            <div class="flex items-baseline justify-between mb-1">
              <span class="font-headline-md text-headline-md text-on-surface font-bold font-tabular-data">94</span>
              <span class="font-tabular-data text-body-sm text-tertiary font-semibold">1,420 total units</span>
            </div>
            <p class="font-body-sm text-body-sm text-on-surface-variant truncate">Active rotation across 8 aisle corridors</p>
          </div>
          <div class="mt-2.5 pt-2 flex items-center justify-between text-label-sm font-label-sm text-tertiary border-t border-border-subtle">
            <span>Turnover Velocity</span>
            <span class="font-tabular-data font-semibold text-primary">4.2x / month</span>
          </div>
        </div>

        <!-- Stat 4 -->
        <div class="bg-surface-card p-4 rounded-lg shadow-sm border border-border-subtle flex flex-col justify-between">
          <div class="flex items-center justify-between mb-2">
            <span class="font-label-sm text-label-sm uppercase tracking-wider text-tertiary font-semibold">Operational Telemetry</span>
            <span class="p-1 rounded bg-status-success-bg text-status-success">
              <span class="material-symbols-outlined text-[16px]">verified</span>
            </span>
          </div>
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="w-2.5 h-2.5 rounded-full bg-status-success animate-pulse"></span>
              <span class="font-headline-sm text-headline-sm text-on-surface font-bold">Optimal Cadence</span>
            </div>
            <span class="font-label-sm text-label-sm text-status-success bg-status-success-bg px-2 py-0.5 rounded-full inline-block font-semibold">
              0 Bin Overflow Incidents
            </span>
          </div>
          <div class="mt-2.5 pt-2 flex items-center justify-between text-label-sm font-label-sm text-tertiary border-t border-border-subtle">
            <span>Last Audit Reconciliation</span>
            <span class="font-tabular-data text-on-surface-variant font-medium">Today, 08:30 UTC</span>
          </div>
        </div>
      </div>

      <!-- Main Workspace: Visual Grid (Left 8 cols) + Detail Panel (Right 4 cols) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mb-space-lg items-start">
        <!-- Left Section: Facility Hierarchy & Rack Grid (8 cols) -->
        <div class="lg:col-span-8 flex flex-col gap-space-md">
          <!-- Zone Selection Strip & Filter Controls -->
          <div class="bg-surface-card p-3 rounded-lg shadow-sm border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <!-- Zone Tabs -->
            <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0" id="zoneTabList">
              <button class="h-7 px-2.5 rounded text-label-sm font-label-sm bg-primary text-on-primary font-semibold transition-colors flex items-center gap-1" onclick="window.filterWarehouseZone('zone-a', this)">
                <span class="w-1.5 h-1.5 rounded-full bg-status-warning"></span>
                Zone A - Heavy Metals &amp; Raw
              </button>
              <button class="h-7 px-2.5 rounded text-label-sm font-label-sm bg-surface-subtle text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" onclick="window.filterWarehouseZone('zone-b', this)">
                Zone B - Pallet Staging &amp; Bulk
              </button>
              <button class="h-7 px-2.5 rounded text-label-sm font-label-sm bg-surface-subtle text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" onclick="window.filterWarehouseZone('all', this)">
                All Zones (4)
              </button>
            </div>

            <!-- Legend Micro Pills -->
            <div class="flex items-center gap-2 text-[11px] font-label-sm text-tertiary shrink-0">
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-status-success"></span> In Stock</span>
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-status-warning"></span> &gt;90% Amber</span>
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-status-info"></span> Available</span>
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-outline"></span> Depleted</span>
            </div>
          </div>

          <!-- RACK MODULE 1: AISLE 01 / RACK A (ZONE A) -->
          <div class="bg-surface-card rounded-lg shadow-sm border border-border-subtle p-4 rack-zone-module" id="module-zone-a">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 gap-2 border-b border-border-subtle">
              <div class="flex items-center gap-2.5">
                <span class="h-7 w-7 rounded bg-surface-container text-primary flex items-center justify-center font-bold text-label-md">01</span>
                <div>
                  <div class="flex items-center gap-2 flex-wrap">
                    <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Aisle 01 • Rack A (Heavy Duty Cantilever Bay)</h3>
                    <span class="px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold">Tier 1-4</span>
                  </div>
                  <p class="font-body-sm text-body-sm text-tertiary">Max Load Limit: 2,500 kg • Concrete Reinforced Pad • Temperature: Ambient</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <button class="h-7 px-2.5 bg-surface-subtle hover:bg-surface-container text-tertiary hover:text-on-surface font-label-sm text-label-sm rounded flex items-center gap-1 transition-colors border border-border-subtle" onclick="window.printShelfLabels('Rack A')">
                  <span class="material-symbols-outlined text-[15px]">qr_code_2</span> Label All
                </button>
              </div>
            </div>

            <!-- 4-Column Grid for Rack A Bins -->
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
              <!-- Bin Card 1 -->
              <div class="bin-card cursor-pointer p-3 rounded-lg bg-surface-container-low ring-2 ring-primary transition-all duration-200 relative group hover:shadow-md border border-primary/20" onclick="window.selectBinCard('BIN-A-01-A')">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-1.5">
                    <span class="font-headline-sm text-label-lg font-bold text-primary">BIN-A-01-A</span>
                    <span class="w-2 h-2 rounded-full bg-status-success"></span>
                  </div>
                  <span class="text-[10px] font-label-sm px-1.5 py-0.5 rounded bg-status-success-bg text-status-success font-semibold">70% Cap</span>
                </div>
                <div class="mb-2">
                  <span class="font-label-sm text-label-sm font-semibold text-on-surface block truncate">Steel Rod (SR001)</span>
                  <span class="font-tabular-data text-[11px] text-tertiary">Industrial Structural Grade</span>
                </div>
                <div class="space-y-1 mb-2">
                  <div class="flex justify-between font-tabular-data text-[11px] text-on-surface-variant">
                    <span>Weight Load</span>
                    <span class="font-semibold">70 / 100 kg</span>
                  </div>
                  <div class="w-full h-1.5 rounded-full bg-surface-subtle overflow-hidden">
                    <div class="bg-status-success h-full rounded-full" style="width: 70%"></div>
                  </div>
                </div>
                <div class="flex items-center justify-between pt-1 font-body-sm text-[11px] text-tertiary">
                  <span>Shelf 1 • Cantilever</span>
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <span class="material-symbols-outlined text-[14px] text-primary">swap_horiz</span>
                    <span class="material-symbols-outlined text-[14px] text-tertiary">qr_code</span>
                  </div>
                </div>
              </div>

              <!-- Bin Card 2 (Near Max Amber) -->
              <div class="bin-card cursor-pointer p-3 rounded-lg bg-surface hover:bg-surface-subtle shadow-sm transition-all duration-200 relative group border border-border-subtle" onclick="window.selectBinCard('BIN-A-01-B')">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-1.5">
                    <span class="font-headline-sm text-label-lg font-bold text-on-surface">BIN-A-01-B</span>
                    <span class="w-2 h-2 rounded-full bg-status-warning"></span>
                  </div>
                  <span class="text-[10px] font-label-sm px-1.5 py-0.5 rounded bg-status-warning-bg text-status-warning font-semibold">94% Cap</span>
                </div>
                <div class="mb-2">
                  <span class="font-label-sm text-label-sm font-semibold text-on-surface block truncate">Heavy Pallet Jack (PJ-102)</span>
                  <span class="font-tabular-data text-[11px] text-tertiary">Staged Equipment</span>
                </div>
                <div class="space-y-1 mb-2">
                  <div class="flex justify-between font-tabular-data text-[11px] text-on-surface-variant">
                    <span>Weight Load</span>
                    <span class="font-semibold text-status-warning">94 / 100 kg</span>
                  </div>
                  <div class="w-full h-1.5 rounded-full bg-surface-subtle overflow-hidden">
                    <div class="bg-status-warning h-full rounded-full" style="width: 94%"></div>
                  </div>
                </div>
                <div class="flex items-center justify-between pt-1 font-body-sm text-[11px] text-tertiary">
                  <span>Shelf 2 • Pallet Bay</span>
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <span class="material-symbols-outlined text-[14px] text-primary">swap_horiz</span>
                    <span class="material-symbols-outlined text-[14px] text-tertiary">qr_code</span>
                  </div>
                </div>
              </div>

              <!-- Bin Card 3 (Available Cyan) -->
              <div class="bin-card cursor-pointer p-3 rounded-lg bg-surface hover:bg-surface-subtle shadow-sm transition-all duration-200 relative group border border-border-subtle" onclick="window.selectBinCard('BIN-A-01-C')">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-1.5">
                    <span class="font-headline-sm text-label-lg font-bold text-on-surface">BIN-A-01-C</span>
                    <span class="w-2 h-2 rounded-full bg-status-info"></span>
                  </div>
                  <span class="text-[10px] font-label-sm px-1.5 py-0.5 rounded bg-status-info-bg text-status-info font-semibold">Available</span>
                </div>
                <div class="mb-2">
                  <span class="font-label-sm text-label-sm font-medium text-tertiary block truncate">No Product Stored</span>
                  <span class="font-tabular-data text-[11px] text-tertiary">Ready for Assignment</span>
                </div>
                <div class="space-y-1 mb-2">
                  <div class="flex justify-between font-tabular-data text-[11px] text-on-surface-variant">
                    <span>Weight Load</span>
                    <span class="font-semibold text-tertiary">0 / 100 kg</span>
                  </div>
                  <div class="w-full h-1.5 rounded-full bg-surface-subtle overflow-hidden">
                    <div class="bg-status-info h-full rounded-full" style="width: 0%"></div>
                  </div>
                </div>
                <div class="flex items-center justify-between pt-1 font-body-sm text-[11px] text-tertiary">
                  <span>Shelf 3 • Heavy Duty</span>
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <span class="material-symbols-outlined text-[14px] text-primary">add</span>
                    <span class="material-symbols-outlined text-[14px] text-tertiary">qr_code</span>
                  </div>
                </div>
              </div>

              <!-- Bin Card 4 (Depleted) -->
              <div class="bin-card cursor-pointer p-3 rounded-lg bg-surface hover:bg-surface-subtle shadow-sm transition-all duration-200 relative group opacity-85 border border-border-subtle" onclick="window.selectBinCard('BIN-A-01-D')">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-1.5">
                    <span class="font-headline-sm text-label-lg font-bold text-tertiary">BIN-A-01-D</span>
                    <span class="w-2 h-2 rounded-full bg-outline"></span>
                  </div>
                  <span class="text-[10px] font-label-sm px-1.5 py-0.5 rounded bg-surface-subtle text-tertiary font-semibold">Depleted</span>
                </div>
                <div class="mb-2">
                  <span class="font-label-sm text-label-sm font-semibold text-on-surface-variant block truncate">Portland Cement (CM-50)</span>
                  <span class="font-tabular-data text-[11px] text-status-danger font-medium">Reorder Triggered</span>
                </div>
                <div class="space-y-1 mb-2">
                  <div class="flex justify-between font-tabular-data text-[11px] text-tertiary">
                    <span>Weight Load</span>
                    <span class="font-semibold">0 / 80 kg</span>
                  </div>
                  <div class="w-full h-1.5 rounded-full bg-surface-subtle overflow-hidden">
                    <div class="bg-outline h-full rounded-full" style="width: 0%"></div>
                  </div>
                </div>
                <div class="flex items-center justify-between pt-1 font-body-sm text-[11px] text-tertiary">
                  <span>Shelf 4 • Pallet Bay</span>
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <span class="material-symbols-outlined text-[14px] text-primary">refresh</span>
                    <span class="material-symbols-outlined text-[14px] text-tertiary">qr_code</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- RACK MODULE 2: AISLE 02 / RACK B (ZONE B PALLET STAGING) -->
          <div class="bg-surface-card rounded-lg shadow-sm border border-border-subtle p-4 rack-zone-module" id="module-zone-b">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 gap-2 border-b border-border-subtle">
              <div class="flex items-center gap-2.5">
                <span class="h-7 w-7 rounded bg-surface-container text-primary flex items-center justify-center font-bold text-label-md">02</span>
                <div>
                  <div class="flex items-center gap-2 flex-wrap">
                    <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Aisle 02 • Rack B (Pallet Staging &amp; Fast Picking)</h3>
                    <span class="px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold">Tier 1-3</span>
                  </div>
                  <p class="font-body-sm text-body-sm text-tertiary">Automated Guided Vehicle (AGV) Accessible • High-Flow Turnover</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <button class="h-7 px-2.5 bg-surface-subtle hover:bg-surface-container text-tertiary hover:text-on-surface font-label-sm text-label-sm rounded flex items-center gap-1 transition-colors border border-border-subtle" onclick="window.printShelfLabels('Rack B')">
                  <span class="material-symbols-outlined text-[15px]">qr_code_2</span> Label All
                </button>
              </div>
            </div>

            <!-- 4-Column Grid for Rack B Bins -->
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
              <!-- Bin B1 -->
              <div class="bin-card cursor-pointer p-3 rounded-lg bg-surface hover:bg-surface-subtle shadow-sm transition-all duration-200 relative group border border-border-subtle" onclick="window.selectBinCard('BIN-B-02-A')">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-1.5">
                    <span class="font-headline-sm text-label-lg font-bold text-on-surface">BIN-B-02-A</span>
                    <span class="w-2 h-2 rounded-full bg-status-success"></span>
                  </div>
                  <span class="text-[10px] font-label-sm px-1.5 py-0.5 rounded bg-status-success-bg text-status-success font-semibold">62% Cap</span>
                </div>
                <div class="mb-2">
                  <span class="font-label-sm text-label-sm font-semibold text-on-surface block truncate">Packaging Corrugated (BX-88)</span>
                  <span class="font-tabular-data text-[11px] text-tertiary">Dispatch Materials</span>
                </div>
                <div class="space-y-1 mb-2">
                  <div class="flex justify-between font-tabular-data text-[11px] text-on-surface-variant">
                    <span>Capacity Load</span>
                    <span class="font-semibold">62 / 100 kg</span>
                  </div>
                  <div class="w-full h-1.5 rounded-full bg-surface-subtle overflow-hidden">
                    <div class="bg-status-success h-full rounded-full" style="width: 62%"></div>
                  </div>
                </div>
                <div class="flex items-center justify-between pt-1 font-body-sm text-[11px] text-tertiary">
                  <span>Tier 1 • Floor Pad</span>
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <span class="material-symbols-outlined text-[14px] text-primary">swap_horiz</span>
                    <span class="material-symbols-outlined text-[14px] text-tertiary">qr_code</span>
                  </div>
                </div>
              </div>

              <!-- Bin B2 -->
              <div class="bin-card cursor-pointer p-3 rounded-lg bg-surface hover:bg-surface-subtle shadow-sm transition-all duration-200 relative group border border-border-subtle" onclick="window.selectBinCard('BIN-B-02-B')">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-1.5">
                    <span class="font-headline-sm text-label-lg font-bold text-on-surface">BIN-B-02-B</span>
                    <span class="w-2 h-2 rounded-full bg-status-warning"></span>
                  </div>
                  <span class="text-[10px] font-label-sm px-1.5 py-0.5 rounded bg-status-warning-bg text-status-warning font-semibold">12% (Low)</span>
                </div>
                <div class="mb-2">
                  <span class="font-label-sm text-label-sm font-semibold text-on-surface block truncate">Shrink Wrap Rolls (SW-200)</span>
                  <span class="font-tabular-data text-[11px] text-tertiary">Packaging Auxiliaries</span>
                </div>
                <div class="space-y-1 mb-2">
                  <div class="flex justify-between font-tabular-data text-[11px] text-on-surface-variant">
                    <span>Capacity Load</span>
                    <span class="font-semibold text-status-warning">12 / 100 kg</span>
                  </div>
                  <div class="w-full h-1.5 rounded-full bg-surface-subtle overflow-hidden">
                    <div class="bg-status-warning h-full rounded-full" style="width: 12%"></div>
                  </div>
                </div>
                <div class="flex items-center justify-between pt-1 font-body-sm text-[11px] text-tertiary">
                  <span>Tier 2 • Pallet Bay</span>
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <span class="material-symbols-outlined text-[14px] text-primary">compress</span>
                    <span class="material-symbols-outlined text-[14px] text-tertiary">qr_code</span>
                  </div>
                </div>
              </div>

              <!-- Bin B3 -->
              <div class="bin-card cursor-pointer p-3 rounded-lg bg-surface hover:bg-surface-subtle shadow-sm transition-all duration-200 relative group border border-border-subtle" onclick="window.selectBinCard('BIN-B-02-C')">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-1.5">
                    <span class="font-headline-sm text-label-lg font-bold text-on-surface">BIN-B-02-C</span>
                    <span class="w-2 h-2 rounded-full bg-status-success"></span>
                  </div>
                  <span class="text-[10px] font-label-sm px-1.5 py-0.5 rounded bg-status-success-bg text-status-success font-semibold">78% Cap</span>
                </div>
                <div class="mb-2">
                  <span class="font-label-sm text-label-sm font-semibold text-on-surface block truncate">Strapping Bands (SB-15)</span>
                  <span class="font-tabular-data text-[11px] text-tertiary">Binding Supplies</span>
                </div>
                <div class="space-y-1 mb-2">
                  <div class="flex justify-between font-tabular-data text-[11px] text-on-surface-variant">
                    <span>Capacity Load</span>
                    <span class="font-semibold">78 / 100 kg</span>
                  </div>
                  <div class="w-full h-1.5 rounded-full bg-surface-subtle overflow-hidden">
                    <div class="bg-status-success h-full rounded-full" style="width: 78%"></div>
                  </div>
                </div>
                <div class="flex items-center justify-between pt-1 font-body-sm text-[11px] text-tertiary">
                  <span>Tier 3 • Top Deck</span>
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <span class="material-symbols-outlined text-[14px] text-primary">swap_horiz</span>
                    <span class="material-symbols-outlined text-[14px] text-tertiary">qr_code</span>
                  </div>
                </div>
              </div>

              <!-- Bin B4 -->
              <div class="bin-card cursor-pointer p-3 rounded-lg bg-surface hover:bg-surface-subtle shadow-sm transition-all duration-200 relative group border border-border-subtle" onclick="window.selectBinCard('BIN-B-02-D')">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-1.5">
                    <span class="font-headline-sm text-label-lg font-bold text-on-surface">BIN-B-02-D</span>
                    <span class="w-2 h-2 rounded-full bg-status-warning"></span>
                  </div>
                  <span class="text-[10px] font-label-sm px-1.5 py-0.5 rounded bg-status-warning-bg text-status-warning font-semibold">92% Cap</span>
                </div>
                <div class="mb-2">
                  <span class="font-label-sm text-label-sm font-semibold text-on-surface block truncate">Wooden Pallets EU (WP-EU)</span>
                  <span class="font-tabular-data text-[11px] text-tertiary">Handling Units Staging</span>
                </div>
                <div class="space-y-1 mb-2">
                  <div class="flex justify-between font-tabular-data text-[11px] text-on-surface-variant">
                    <span>Unit Load</span>
                    <span class="font-semibold text-status-warning">92 / 100 Units</span>
                  </div>
                  <div class="w-full h-1.5 rounded-full bg-surface-subtle overflow-hidden">
                    <div class="bg-status-warning h-full rounded-full" style="width: 92%"></div>
                  </div>
                </div>
                <div class="flex items-center justify-between pt-1 font-body-sm text-[11px] text-tertiary">
                  <span>Floor Staging Zone</span>
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <span class="material-symbols-outlined text-[14px] text-primary">swap_horiz</span>
                    <span class="material-symbols-outlined text-[14px] text-tertiary">qr_code</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Section: Selected Bin Deep Dive & Allocation Drawer (4 cols) -->
        <div class="lg:col-span-4 flex flex-col gap-space-md lg:sticky lg:top-20">
          <div class="bg-surface-card rounded-lg shadow-sm border border-border-subtle p-4 relative" id="binInspectorCard">
            <!-- Inspector Header -->
            <div class="flex items-start justify-between pb-3 border-b border-border-subtle">
              <div>
                <span class="font-label-sm text-label-sm uppercase tracking-wider text-tertiary block font-semibold" id="binZoneSubtitle">${selectedBinData.zone}</span>
                <h2 class="font-headline-sm text-headline-sm text-on-surface font-bold mt-0.5" id="binDetailTitle">${selectedBinData.title}</h2>
              </div>
              <span class="px-2.5 py-1 rounded-full text-label-sm font-label-sm bg-status-success-bg text-status-success font-semibold flex items-center gap-1 border border-status-success/20" id="binStatusBadge">
                <span class="w-1.5 h-1.5 rounded-full bg-status-success"></span>
                ${selectedBinData.statusText}
              </span>
            </div>

            <!-- Quick Capacity Indicator Pill Bar -->
            <div class="my-4 p-3 bg-surface-subtle rounded-lg border border-border-subtle">
              <div class="flex justify-between text-body-sm font-body-sm mb-1">
                <span class="text-tertiary font-semibold">Real-time Fill Level</span>
                <span class="font-tabular-data font-bold text-on-surface" id="binCapacityPercent">${selectedBinData.capacityFormatted}</span>
              </div>
              <div class="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                <div class="bg-status-success h-full rounded-full transition-all duration-300" id="binProgressBar" style="width: ${selectedBinData.capacityPct}%"></div>
              </div>
            </div>

            <!-- Physical Specs Grid -->
            <div class="mb-4">
              <h4 class="font-label-sm text-label-sm uppercase tracking-wider text-tertiary mb-2 font-semibold">Physical Specifications</h4>
              <div class="grid grid-cols-2 gap-2 text-body-sm font-body-sm">
                <div class="p-2 rounded bg-surface-subtle border border-border-subtle">
                  <span class="text-tertiary block text-[11px] font-label-sm font-semibold">Max Weight Limit</span>
                  <span class="font-tabular-data font-semibold text-on-surface" id="binMaxWeight">${selectedBinData.maxWeight}</span>
                </div>
                <div class="p-2 rounded bg-surface-subtle border border-border-subtle">
                  <span class="text-tertiary block text-[11px] font-label-sm font-semibold">Cubic Dimensions</span>
                  <span class="font-tabular-data font-semibold text-on-surface" id="binDimensions">${selectedBinData.dimensions}</span>
                </div>
                <div class="p-2 rounded bg-surface-subtle border border-border-subtle">
                  <span class="text-tertiary block text-[11px] font-label-sm font-semibold">Storage Climate</span>
                  <span class="font-tabular-data font-semibold text-on-surface" id="binClimate">${selectedBinData.climate}</span>
                </div>
                <div class="p-2 rounded bg-surface-subtle border border-border-subtle">
                  <span class="text-tertiary block text-[11px] font-label-sm font-semibold">Barcode / RFID Tag</span>
                  <span class="font-tabular-data font-bold text-primary font-mono text-[12px]" id="binRfidTag">${selectedBinData.rfid}</span>
                </div>
              </div>
            </div>

            <!-- Assigned Contents Panel -->
            <div class="mb-4">
              <div class="flex items-center justify-between mb-2">
                <h4 class="font-label-sm text-label-sm uppercase tracking-wider text-tertiary font-semibold">Allocated SKU Payload</h4>
                <a href="#/stock-ledger" class="text-[11px] font-label-sm text-primary font-semibold hover:underline">Ledger Log</a>
              </div>
              <div class="rounded-lg bg-surface-subtle p-3 text-body-sm font-body-sm space-y-2 border border-border-subtle">
                <div class="flex items-center justify-between">
                  <div>
                    <span class="font-label-md text-label-md font-bold text-on-surface block" id="binSkuTitle">${selectedBinData.sku}</span>
                    <span class="text-[11px] text-tertiary" id="binSkuDesc">${selectedBinData.desc}</span>
                  </div>
                  <span class="px-2 py-0.5 rounded bg-surface-card border border-border-subtle shadow-sm text-label-sm font-tabular-data font-bold text-on-surface" id="binWeightCurrent">
                    ${selectedBinData.weightCurrent}
                  </span>
                </div>
                <div class="flex items-center justify-between text-[12px] pt-2 border-t border-border-subtle">
                  <span class="text-tertiary">Safety Buffer Threshold</span>
                  <span class="font-tabular-data font-semibold text-on-surface" id="binSafetyBuffer">${selectedBinData.safetyBuffer}</span>
                </div>
                <div class="flex items-start justify-between text-[12px] pt-1">
                  <span class="text-tertiary">Last Internal Move</span>
                  <div class="text-right">
                    <span class="font-tabular-data font-semibold text-primary block" id="binLastMoveRef">${selectedBinData.lastMoveRef}</span>
                    <span class="text-[10px] text-tertiary" id="binLastMoveTime">${selectedBinData.lastMoveTime}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Fast Action Controls -->
            <div class="space-y-2 pt-2 border-t border-border-subtle">
              <h4 class="font-label-sm text-label-sm uppercase tracking-wider text-tertiary mb-2 font-semibold">Action Controls</h4>
              <div class="grid grid-cols-2 gap-2">
                <button class="h-9 px-3 bg-surface-subtle hover:bg-surface-container text-on-surface font-label-md text-label-md rounded flex items-center justify-center gap-1.5 transition-colors border border-border-subtle font-medium" onclick="window.openTransferWithSku('SR001')">
                  <span class="material-symbols-outlined text-[16px] text-primary">swap_horiz</span>
                  <span>Transfer Stock</span>
                </button>
                <button class="h-9 px-3 bg-surface-subtle hover:bg-surface-container text-on-surface font-label-md text-label-md rounded flex items-center justify-center gap-1.5 transition-colors border border-border-subtle font-medium" onclick="showToast('Threshold Configured', 'Minimum buffer set to 30 kg for ' + selectedBinData.title)">
                  <span class="material-symbols-outlined text-[16px] text-tertiary">tune</span>
                  <span>Set Thresholds</span>
                </button>
              </div>

              <button class="w-full h-9 px-3 bg-surface-subtle hover:bg-surface-container text-on-surface font-label-md text-label-md rounded flex items-center justify-center gap-1.5 transition-colors border border-border-subtle font-medium" onclick="window.printShelfLabels(selectedBinData.title)">
                <span class="material-symbols-outlined text-[16px] text-tertiary">print</span>
                <span>Generate Shelf Label (QR Code)</span>
              </button>

              <!-- Toggle Lock Bin -->
              <div class="flex items-center justify-between p-2.5 rounded bg-surface-subtle mt-3 border border-border-subtle">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-[18px] text-tertiary">lock</span>
                  <div>
                    <span class="font-label-sm text-label-sm font-semibold text-on-surface block">Lock Bin</span>
                    <span class="text-[10px] text-tertiary">Prevent Inbound Receipts</span>
                  </div>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input class="sr-only peer" onchange="window.toggleBinLock(this)" type="checkbox" />
                  <div class="w-9 h-5 bg-border-strong peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-surface-card after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-card after:border-border-strong after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Quick Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-space-md">
        <!-- Card 1: Warehouse Routing Rules -->
        <div class="bg-surface-card p-4 rounded-lg shadow-sm border border-border-subtle flex items-start gap-3">
          <div class="p-2.5 rounded-lg bg-surface-container text-primary shrink-0">
            <span class="material-symbols-outlined text-[22px]">route</span>
          </div>
          <div>
            <div class="flex items-center gap-2 mb-1 flex-wrap">
              <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Warehouse Routing &amp; Putaway Rules</h3>
              <span class="px-2 py-0.5 rounded-full bg-status-success-bg text-status-success font-label-sm text-label-sm font-semibold">Active</span>
            </div>
            <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-2">
              Inbound raw metals default automatically to <strong class="font-semibold text-on-surface">Zone A Heavy Bins</strong>. Transfers above 200kg enforce destination bin structural load validation before receipt confirmation.
            </p>
            <div class="flex items-center gap-3 font-label-sm text-label-sm">
              <button class="text-primary hover:underline font-semibold flex items-center gap-1" onclick="showToast('Routing Rules', '3 custom putaway heuristics active.')">
                <span>Manage Routing Protocols</span>
                <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
              <span class="text-tertiary">•</span>
              <span class="text-tertiary">3 Custom Putaway Logic Rules Engaged</span>
            </div>
          </div>
        </div>

        <!-- Card 2: Automated Bin Optimization Advice -->
        <div class="bg-surface-card p-4 rounded-lg shadow-sm border border-border-subtle flex items-start gap-3">
          <div class="p-2.5 rounded-lg bg-status-warning-bg text-status-warning shrink-0">
            <span class="material-symbols-outlined text-[22px]">auto_awesome</span>
          </div>
          <div>
            <div class="flex items-center gap-2 mb-1 flex-wrap">
              <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Automated Spatial Optimization</h3>
              <span class="px-2 py-0.5 rounded-full bg-status-warning-bg text-status-warning font-label-sm text-label-sm font-semibold">Recommendation</span>
            </div>
            <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-2">
              3 storage bays in <strong class="font-semibold text-on-surface">Zone B</strong> currently maintain &lt;15% payload utilization. Consolidating bulk packaging into Bay 02-B can unlock <strong class="font-semibold text-on-surface">2 high-value floor bays</strong> for upcoming freight shipments.
            </p>
            <div class="flex items-center gap-3 font-label-sm text-label-sm">
              <button class="text-primary hover:underline font-semibold flex items-center gap-1" onclick="showToast('Batch Consolidation Queued', 'Spatial relocation script created. 24.5 m³ space to be reclaimed.')">
                <span>Run Auto-Consolidation Wizard</span>
                <span class="material-symbols-outlined text-[14px]">bolt</span>
              </button>
              <span class="text-tertiary">•</span>
              <span class="text-tertiary font-tabular-data font-semibold">Est. Space Recapture: 24.5 m³</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Global functions for Warehouse view
window.selectBinCard = function(binId) {
  // Update card styling
  document.querySelectorAll('.bin-card').forEach(b => {
    b.classList.remove('bg-surface-container-low', 'ring-2', 'ring-primary');
    b.classList.add('bg-surface');
  });

  const cards = document.querySelectorAll('.bin-card');
  // Sample mapping
  const binMap = {
    'BIN-A-01-A': {
      zone: 'Zone A - Heavy Metals',
      title: 'BIN-A-01-A',
      sku: 'SR001 • Industrial Steel Rod',
      desc: '12mm Reinforced Carbon Steel',
      capacityFormatted: '70% (70 / 100 kg)',
      capacityPct: 70,
      statusColor: 'bg-status-success',
      statusText: 'Active • 70% Capacity',
      maxWeight: '500 kg (Load: 70 kg)',
      dimensions: '2.4m × 1.2m × 1.5m',
      climate: 'Ambient (18°C - 24°C)',
      rfid: 'RFID-8839-A1',
      weightCurrent: '70 kg',
      safetyBuffer: '25 kg (Min Level)',
      lastMoveRef: '#TRF-2025-044',
      lastMoveTime: 'Today, 15:10 by FL-04'
    },
    'BIN-A-01-B': {
      zone: 'Zone A - Heavy Metals',
      title: 'BIN-A-01-B',
      sku: 'PJ-102 • Heavy Duty Pallet Jack',
      desc: 'Hydraulic Manual Lift 2.5T',
      capacityFormatted: '94% (94 / 100 kg)',
      capacityPct: 94,
      statusColor: 'bg-status-warning',
      statusText: 'Near Max • 94% Capacity',
      maxWeight: '600 kg (Load: 94 kg)',
      dimensions: '2.4m × 1.6m × 1.8m',
      climate: 'Ambient',
      rfid: 'RFID-8839-B2',
      weightCurrent: '94 kg',
      safetyBuffer: '2 Units',
      lastMoveRef: '#DEL-2025-101',
      lastMoveTime: 'Yesterday, 14:00 by FL-02'
    },
    'BIN-A-01-C': {
      zone: 'Zone A - Heavy Metals',
      title: 'BIN-A-01-C',
      sku: 'Unassigned (Empty)',
      desc: 'Open Storage Slot for Staging',
      capacityFormatted: '0% (0 / 100 kg)',
      capacityPct: 0,
      statusColor: 'bg-status-info',
      statusText: 'Available • Ready to Assign',
      maxWeight: '500 kg',
      dimensions: '2.4m × 1.2m × 1.5m',
      climate: 'Ambient',
      rfid: 'RFID-8839-C3',
      weightCurrent: '0 kg',
      safetyBuffer: 'N/A',
      lastMoveRef: 'None',
      lastMoveTime: 'N/A'
    },
    'BIN-A-01-D': {
      zone: 'Zone A - Heavy Metals',
      title: 'BIN-A-01-D',
      sku: 'CM-50 • Portland Cement',
      desc: 'Dry Storage Pallet Tier',
      capacityFormatted: '0% (0 / 80 kg)',
      capacityPct: 0,
      statusColor: 'bg-outline',
      statusText: 'Depleted • Reorder Point',
      maxWeight: '400 kg',
      dimensions: '2.0m × 1.2m × 1.2m',
      climate: 'Dry Protected (<40% RH)',
      rfid: 'RFID-8839-D4',
      weightCurrent: '0 kg',
      safetyBuffer: '40 Bags',
      lastMoveRef: '#REC-2025-088',
      lastMoveTime: 'Yesterday, 09:15'
    },
    'BIN-B-02-A': {
      zone: 'Zone B - Pallet Staging',
      title: 'BIN-B-02-A',
      sku: 'BX-88 • Packaging Corrugated',
      desc: 'Tri-Wall Corrugated Container Carton',
      capacityFormatted: '62% (62 / 100 kg)',
      capacityPct: 62,
      statusColor: 'bg-status-success',
      statusText: 'In Stock • 62% Capacity',
      maxWeight: '350 kg',
      dimensions: '2.4m × 1.4m × 1.6m',
      climate: 'Ambient',
      rfid: 'RFID-9102-X1',
      weightCurrent: '62 kg',
      safetyBuffer: '15 Units',
      lastMoveRef: '#TRF-2025-039',
      lastMoveTime: '2 days ago'
    },
    'BIN-B-02-B': {
      zone: 'Zone B - Pallet Staging',
      title: 'BIN-B-02-B',
      sku: 'SW-200 • Shrink Wrap Rolls',
      desc: 'Stretch Film 18in Industrial Rolls',
      capacityFormatted: '12% (12 / 100 kg)',
      capacityPct: 12,
      statusColor: 'bg-status-warning',
      statusText: 'Low Utilization (12%)',
      maxWeight: '250 kg',
      dimensions: '2.0m × 1.2m × 1.5m',
      climate: 'Ambient',
      rfid: 'RFID-9102-X2',
      weightCurrent: '12 kg',
      safetyBuffer: '10 Rolls',
      lastMoveRef: '#REC-2025-072',
      lastMoveTime: '3 days ago'
    }
  };

  const data = binMap[binId] || binMap['BIN-A-01-A'];
  selectedBinData = { ...data };

  // Update DOM elements
  const title = document.getElementById('binDetailTitle');
  const zone = document.getElementById('binZoneSubtitle');
  const badge = document.getElementById('binStatusBadge');
  const capText = document.getElementById('binCapacityPercent');
  const progBar = document.getElementById('binProgressBar');
  const maxWeight = document.getElementById('binMaxWeight');
  const rfid = document.getElementById('binRfidTag');
  const skuTitle = document.getElementById('binSkuTitle');
  const skuDesc = document.getElementById('binSkuDesc');
  const weightCur = document.getElementById('binWeightCurrent');

  if (title) title.innerText = data.title;
  if (zone) zone.innerText = data.zone;
  if (badge) badge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full ${data.statusColor}"></span> ${data.statusText}`;
  if (capText) capText.innerText = data.capacityFormatted;
  if (progBar) {
    progBar.style.width = `${data.capacityPct}%`;
    progBar.className = `${data.statusColor} h-full rounded-full transition-all duration-300`;
  }
  if (maxWeight) maxWeight.innerText = data.maxWeight;
  if (rfid) rfid.innerText = data.rfid;
  if (skuTitle) skuTitle.innerText = data.sku;
  if (skuDesc) skuDesc.innerText = data.desc;
  if (weightCur) weightCur.innerText = data.weightCurrent;

  showToast('Bin Selected', `Viewing telemetry for ${binId}`);
};

window.filterWarehouseZone = function(zoneId, btnEl) {
  document.querySelectorAll('#zoneTabList button').forEach(b => {
    b.className = 'h-7 px-2.5 rounded text-label-sm font-label-sm bg-surface-subtle text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors';
  });
  if (btnEl) {
    btnEl.className = 'h-7 px-2.5 rounded text-label-sm font-label-sm bg-primary text-on-primary font-semibold transition-colors flex items-center gap-1';
  }

  const modA = document.getElementById('module-zone-a');
  const modB = document.getElementById('module-zone-b');

  if (zoneId === 'zone-a') {
    if (modA) modA.style.display = 'block';
    if (modB) modB.style.display = 'none';
  } else if (zoneId === 'zone-b') {
    if (modA) modA.style.display = 'none';
    if (modB) modB.style.display = 'block';
  } else {
    if (modA) modA.style.display = 'block';
    if (modB) modB.style.display = 'block';
  }
};

window.toggleBinLock = function(checkbox) {
  selectedBinData.locked = checkbox.checked;
  if (checkbox.checked) {
    showToast('Bin Locked', `${selectedBinData.title} is now LOCKED. Inbound goods receipts will be redirected.`, 'warning');
  } else {
    showToast('Bin Unlocked', `${selectedBinData.title} unlocked for receipts and replenishment.`);
  }
};

window.printShelfLabels = function(target) {
  showToast('Label Printed', `Generating ISO QR Code Shelf Label for ${target}. Sent to warehouse Zebra print server.`);
};

window.printWarehouseMap = function() {
  window.print();
};
