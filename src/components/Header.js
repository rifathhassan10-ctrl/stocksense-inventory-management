// StockSense Top Header Navigation Bar Component
import { store } from '../store/dataStore.js';

export function renderHeader(currentPath = 'dashboard') {
  const currentWarehouse = store.getSelectedWarehouse();

  // Compute Breadcrumb
  let breadcrumbTitle = 'Overview';
  let breadcrumbCategory = 'Stock Management';

  if (currentPath.includes('products')) {
    breadcrumbCategory = 'Catalog Operations';
    breadcrumbTitle = 'Products & SKU Matrix';
  } else if (currentPath.includes('operations')) {
    breadcrumbCategory = 'Operations';
    if (currentPath.includes('receipts')) breadcrumbTitle = 'Goods Receipts';
    else if (currentPath.includes('deliveries')) breadcrumbTitle = 'Delivery Orders';
    else if (currentPath.includes('transfers')) breadcrumbTitle = 'Internal Transfers';
    else if (currentPath.includes('adjustments')) breadcrumbTitle = 'Stock Adjustments';
    else breadcrumbTitle = 'Operations Hub';
  } else if (currentPath.includes('stock-ledger')) {
    breadcrumbCategory = 'Auditing';
    breadcrumbTitle = 'Stock Ledger & Audit Trail';
  } else if (currentPath.includes('warehouses')) {
    breadcrumbCategory = 'Facilities & Bins';
    breadcrumbTitle = 'Warehouse Architecture';
  } else if (currentPath.includes('analytics')) {
    breadcrumbCategory = 'Smart Intelligence';
    breadcrumbTitle = 'Predictive Analytics & Forecasting';
  } else if (currentPath.includes('alerts')) {
    breadcrumbCategory = 'System Health';
    breadcrumbTitle = 'Critical Inventory Alerts';
  }

  return `
    <header class="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-surface-card border-b border-border-subtle z-40 flex items-center justify-between px-space-md lg:px-space-lg shadow-[0_1px_8px_rgba(0,0,0,0.02)] transition-all">
      <!-- Left: Mobile Menu Toggle & Breadcrumbs -->
      <div class="flex items-center gap-space-sm lg:gap-space-md">
        <!-- Mobile Drawer Toggle -->
        <button 
          id="mobileMenuToggle" 
          aria-label="Toggle Navigation"
          class="lg:hidden p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-subtle rounded transition-colors"
          onclick="window.toggleMobileSidebar(true)"
        >
          <span class="material-symbols-outlined text-[24px]">menu</span>
        </button>

        <!-- Breadcrumb Hierarchy -->
        <div class="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md">
          <span class="material-symbols-outlined text-[18px] text-tertiary">home</span>
          <span class="text-tertiary">/</span>
          <span class="text-tertiary hidden sm:inline">${breadcrumbCategory}</span>
          <span class="text-tertiary hidden sm:inline">/</span>
          <span class="font-semibold text-on-surface truncate max-w-[140px] sm:max-w-xs">${breadcrumbTitle}</span>
        </div>

        <!-- Telemetry Status Pill -->
        <div class="hidden xl:flex items-center gap-1.5 px-2.5 py-1 bg-status-success-bg border border-border-subtle rounded-full">
          <span class="inline-block h-2 w-2 rounded-full bg-status-success animate-pulse"></span>
          <span class="font-label-sm text-label-sm text-on-surface-variant font-medium">System: Synced &amp; Healthy</span>
        </div>
      </div>

      <!-- Right: Global Search, Warehouse Switcher, Notifications & Profile -->
      <div class="flex items-center gap-space-sm lg:gap-space-md">
        <!-- Global Search Bar -->
        <div class="relative hidden md:flex items-center">
          <span class="material-symbols-outlined absolute left-2.5 text-[18px] text-tertiary pointer-events-none">search</span>
          <input 
            id="globalSearchInput"
            class="w-48 lg:w-72 h-9 pl-8 pr-8 bg-surface-subtle border border-border-subtle rounded text-body-sm font-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-all" 
            placeholder="Global search (Product, SKU, Bin)..." 
            type="search"
            onkeydown="if(event.key === 'Enter') window.handleGlobalSearch(this.value)"
          />
          <span class="absolute right-2 px-1.5 py-0.5 rounded bg-surface-card border border-border-subtle text-[10px] font-label-sm text-tertiary pointer-events-none">⌘K</span>
        </div>

        <!-- Warehouse Facility Switcher -->
        <div class="flex items-center bg-surface-card border border-border-subtle rounded h-9 px-2.5 gap-1.5 cursor-pointer hover:bg-surface-subtle transition-colors">
          <span class="material-symbols-outlined text-[18px] text-tertiary">domain</span>
          <select 
            id="globalWarehouseSelect"
            class="bg-transparent text-label-md font-label-md text-on-surface font-medium focus:outline-none cursor-pointer pr-1"
            onchange="window.handleWarehouseChange(this.value)"
          >
            <option value="all" ${currentWarehouse === 'all' ? 'selected' : ''}>All Warehouses</option>
            <option value="Main Warehouse" ${currentWarehouse === 'Main Warehouse' ? 'selected' : ''}>Main Warehouse (Bay A)</option>
            <option value="Production Rack" ${currentWarehouse === 'Production Rack' ? 'selected' : ''}>Production Rack</option>
            <option value="Warehouse 2" ${currentWarehouse === 'Warehouse 2' ? 'selected' : ''}>Warehouse 2 (Logistics Hub)</option>
          </select>
        </div>

        <!-- Notification Bell with Dropdown Trigger -->
        <div class="relative">
          <button 
            id="notificationBellBtn"
            aria-label="Notifications" 
            class="relative p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-subtle rounded transition-colors" 
            type="button"
            onclick="window.toggleNotificationsDropdown()"
          >
            <span class="material-symbols-outlined text-[20px]">notifications</span>
            <span class="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-status-danger ring-2 ring-surface-card"></span>
          </button>

          <!-- Notification Dropdown Popover -->
          <div id="notificationsPopover" class="hidden absolute right-0 mt-2 w-80 sm:w-96 bg-surface-card rounded-lg shadow-xl border border-border-strong p-3 z-50 animate-slide-up">
            <div class="flex items-center justify-between pb-2 border-b border-border-subtle">
              <span class="font-headline-sm text-label-lg font-bold text-on-surface">Critical Inventory Alerts</span>
              <span class="font-label-sm text-[11px] px-2 py-0.5 rounded-full bg-status-danger-bg text-status-danger font-semibold">4 Actionable</span>
            </div>
            <div class="divide-y divide-border-subtle text-body-sm max-h-72 overflow-y-auto">
              <a href="#/alerts" class="p-2.5 hover:bg-surface-subtle rounded flex items-start gap-2.5 transition-colors block">
                <span class="material-symbols-outlined text-status-danger text-[18px] mt-0.5">error</span>
                <div>
                  <div class="font-semibold text-on-surface">Heavy Duty Pallet Jack (PJ-102)</div>
                  <div class="text-[12px] text-status-danger font-medium">Stock Depleted (0 units). Reorder level: 2 units.</div>
                  <div class="text-[10px] text-tertiary mt-0.5">Main Warehouse • Bay 4 Halt Risk</div>
                </div>
              </a>
              <a href="#/alerts" class="p-2.5 hover:bg-surface-subtle rounded flex items-start gap-2.5 transition-colors block">
                <span class="material-symbols-outlined text-status-warning text-[18px] mt-0.5">warning</span>
                <div>
                  <div class="font-semibold text-on-surface">Steel Rod - 12mm (SR001)</div>
                  <div class="text-[12px] text-status-warning font-medium">7 kg remaining (Deficit: -18 kg below buffer).</div>
                  <div class="text-[10px] text-tertiary mt-0.5">Production Floor • Reorder point reached</div>
                </div>
              </a>
              <a href="#/alerts" class="p-2.5 hover:bg-surface-subtle rounded flex items-start gap-2.5 transition-colors block">
                <span class="material-symbols-outlined text-primary text-[18px] mt-0.5">auto_awesome</span>
                <div>
                  <div class="font-semibold text-on-surface">ML Prediction: Demand Surge</div>
                  <div class="text-[12px] text-primary font-medium">Ergonomic Chairs forecasted +38% demand next week.</div>
                  <div class="text-[10px] text-tertiary mt-0.5">Recommended buffer expansion</div>
                </div>
              </a>
            </div>
            <div class="pt-2 border-t border-border-subtle text-center">
              <a href="#/alerts" class="font-label-sm text-label-sm text-primary font-semibold hover:underline">View All Alerts &amp; AI Forecaster →</a>
            </div>
          </div>
        </div>

        <div class="h-5 w-px bg-border-subtle"></div>

        <!-- User Profile Pill -->
        <div class="flex items-center gap-space-sm pl-1">
          <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
            <span class="material-symbols-outlined text-[18px]">person</span>
          </div>
          <div class="hidden md:flex flex-col text-left">
            <span class="font-label-md text-label-md text-on-surface font-semibold leading-none">Alex Rivera</span>
            <span class="font-label-sm text-label-sm text-tertiary leading-none mt-1">Inventory Manager</span>
          </div>
        </div>
      </div>
    </header>
  `;
}
