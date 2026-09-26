// StockSense Navigation Sidebar Component
// Faithfully matches Stitch Visual Specification

export function renderSidebar(currentPath = 'dashboard') {
  const isDashboard = currentPath === 'dashboard';
  const isProducts = currentPath === 'products';
  const isReceipts = currentPath === 'operations/receipts' || currentPath === 'receipts';
  const isDeliveries = currentPath === 'operations/deliveries' || currentPath === 'deliveries';
  const isTransfers = currentPath === 'operations/transfers' || currentPath === 'transfers';
  const isAdjustments = currentPath === 'operations/adjustments' || currentPath === 'adjustments';
  const isOperations = isReceipts || isDeliveries || isTransfers || isAdjustments;
  const isLedger = currentPath === 'stock-ledger';
  const isWarehouses = currentPath === 'warehouses';
  const isAnalytics = currentPath === 'analytics';
  const isAlerts = currentPath === 'alerts';
  const isAdmin = currentPath === 'admin';

  const user = JSON.parse(localStorage.getItem('stocksense_user') || '{"name":"Alex Rivera","role":"ADMIN"}');
  const userInitials = (user.name || 'AR').split(' ').map(n => n[0]).join('').substring(0, 2);

  const activeClass = "bg-surface-container-low text-primary font-label-lg font-semibold border-l-2 border-primary";
  const inactiveClass = "text-on-surface-variant font-label-lg text-label-lg hover:bg-surface-subtle hover:text-on-surface";

  return `
    <aside id="appSidebar" class="fixed left-0 top-0 h-screen w-64 bg-surface-card border-r border-border-subtle z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-transform duration-300 -translate-x-full lg:translate-x-0">
      <div class="flex flex-col">
        <!-- Logo Header -->
        <div class="h-16 px-space-lg flex items-center justify-between border-b border-border-subtle">
          <a href="#/dashboard" class="flex items-center gap-space-sm">
            <img alt="StockSense Logo" class="h-8 w-auto object-contain" src="./assets/logo.svg" />
            <span class="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">StockSense</span>
          </a>
          <span class="font-label-sm text-label-sm px-space-xs py-0.5 rounded bg-surface-container text-primary font-semibold uppercase">v2.4</span>
        </div>

        <!-- Sidebar Quick Search -->
        <div class="px-space-md py-space-sm border-b border-border-subtle">
          <div class="relative flex items-center">
            <span class="material-symbols-outlined absolute left-2.5 text-[18px] text-tertiary pointer-events-none">search</span>
            <input 
              id="sidebarModuleSearch" 
              class="w-full h-8 pl-8 pr-2 bg-surface-subtle border border-border-subtle rounded text-body-sm font-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-colors" 
              placeholder="Search module..." 
              type="text" 
            />
          </div>
        </div>

        <!-- Navigation Links -->
        <nav class="flex flex-col py-space-sm space-y-0.5 px-space-xs overflow-y-auto max-h-[calc(100vh-14rem)]">
          <div class="px-space-sm pt-space-xs pb-1 font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold">Navigation</div>
          
          <a class="flex items-center gap-space-sm px-space-sm py-2 rounded transition-colors ${isDashboard ? activeClass : inactiveClass}" data-path="dashboard" href="#/dashboard">
            <span class="material-symbols-outlined text-[20px]">dashboard</span>
            <span>Dashboard</span>
          </a>

          <a class="flex items-center gap-space-sm px-space-sm py-2 rounded transition-colors ${isProducts ? activeClass : inactiveClass}" data-path="products" href="#/products">
            <span class="material-symbols-outlined text-[20px]">inventory_2</span>
            <span>Products &amp; SKU</span>
          </a>

          <!-- Operations Accordion -->
          <div class="pt-space-xs">
            <div id="operationsToggle" class="flex items-center justify-between px-space-sm py-1.5 text-on-surface-variant hover:text-on-surface cursor-pointer select-none">
              <div class="flex items-center gap-space-sm font-label-lg text-label-lg text-tertiary uppercase tracking-wider font-semibold">
                <span class="material-symbols-outlined text-[18px]">sync_alt</span>
                <span>Operations</span>
              </div>
              <span id="operationsChevron" class="material-symbols-outlined text-[16px] text-tertiary transition-transform duration-200 ${isOperations ? 'rotate-180' : ''}">expand_more</span>
            </div>

            <div id="operationsSubmenu" class="pl-6 pr-space-xs space-y-0.5 mt-0.5 ${isOperations ? '' : 'hidden'}">
              <a class="flex items-center justify-between px-space-sm py-1.5 rounded transition-colors ${isReceipts ? 'bg-surface-container-low text-primary font-semibold' : 'text-on-surface-variant font-label-md text-label-md hover:bg-surface-subtle hover:text-on-surface'}" data-path="receipts" href="#/operations/receipts">
                <span>Receipts</span>
                <span class="font-tabular-data text-label-sm text-tertiary bg-surface-subtle px-1 rounded">14</span>
              </a>
              <a class="flex items-center justify-between px-space-sm py-1.5 rounded transition-colors ${isDeliveries ? 'bg-surface-container-low text-primary font-semibold' : 'text-on-surface-variant font-label-md text-label-md hover:bg-surface-subtle hover:text-on-surface'}" data-path="delivery-orders" href="#/operations/deliveries">
                <span>Delivery Orders</span>
                <span class="font-tabular-data text-label-sm text-tertiary bg-surface-subtle px-1 rounded">8</span>
              </a>
              <a class="flex items-center px-space-sm py-1.5 rounded transition-colors ${isTransfers ? 'bg-surface-container-low text-primary font-semibold' : 'text-on-surface-variant font-label-md text-label-md hover:bg-surface-subtle hover:text-on-surface'}" data-path="internal-transfers" href="#/operations/transfers">
                <span>Internal Transfers</span>
              </a>
              <a class="flex items-center px-space-sm py-1.5 rounded transition-colors ${isAdjustments ? 'bg-surface-container-low text-primary font-semibold' : 'text-on-surface-variant font-label-md text-label-md hover:bg-surface-subtle hover:text-on-surface'}" data-path="inventory-adjustments" href="#/operations/adjustments">
                <span>Adjustments</span>
              </a>
            </div>
          </div>

          <div class="px-space-sm pt-space-md pb-1 font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold">Auditing &amp; Facilities</div>

          <a class="flex items-center gap-space-sm px-space-sm py-2 rounded transition-colors ${isLedger ? activeClass : inactiveClass}" data-path="stock-ledger" href="#/stock-ledger">
            <span class="material-symbols-outlined text-[20px]">receipt_long</span>
            <span>Stock Ledger</span>
          </a>

          <a class="flex items-center gap-space-sm px-space-sm py-2 rounded transition-colors ${isWarehouses ? activeClass : inactiveClass}" data-path="warehouses" href="#/warehouses">
            <span class="material-symbols-outlined text-[20px]">warehouse</span>
            <span>Warehouses &amp; Bins</span>
          </a>

          <div class="px-space-sm pt-space-md pb-1 font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold">Smart Intelligence</div>

          <a class="flex items-center justify-between px-space-sm py-2 rounded transition-colors ${isAnalytics ? activeClass : inactiveClass}" data-path="analytics" href="#/analytics">
            <div class="flex items-center gap-space-sm">
              <span class="material-symbols-outlined text-[20px]">insights</span>
              <span>Predictive Analytics</span>
            </div>
            <span class="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-primary/10 text-primary">ML</span>
          </a>

          <a class="flex items-center justify-between px-space-sm py-2 rounded transition-colors ${isAlerts ? activeClass : inactiveClass}" data-path="alerts" href="#/alerts">
            <div class="flex items-center gap-space-sm">
              <span class="material-symbols-outlined text-[20px]">notification_important</span>
              <span>Alerts &amp; Risks</span>
            </div>
            <span class="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-status-warning-bg text-status-warning">4</span>
          </a>

          <div class="px-space-sm pt-space-md pb-1 font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold">Governance &amp; Security</div>

          <a class="flex items-center justify-between px-space-sm py-2 rounded transition-colors ${isAdmin ? activeClass : inactiveClass}" data-path="admin" href="#/admin">
            <div class="flex items-center gap-space-sm">
              <span class="material-symbols-outlined text-[20px]">admin_panel_settings</span>
              <span>Admin &amp; RBAC</span>
            </div>
            <span class="px-1.5 py-0.5 rounded text-[10px] font-semibold ${user.role === 'ADMIN' ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-500'}">
              ${user.role}
            </span>
          </a>
        </nav>
      </div>

      <!-- Bottom User Session & Cloud Health Status -->
      <div class="p-space-md border-t border-border-subtle bg-surface-card space-y-2">
        <div class="p-space-xs rounded bg-surface-subtle border border-border-subtle flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-full ${user.role === 'EMPLOYEE' ? 'bg-emerald-600' : 'bg-primary'} text-white flex items-center justify-center font-bold text-[10px]">
              ${userInitials}
            </div>
            <div class="text-left">
              <div class="font-bold text-[12px] text-on-surface line-clamp-1">${user.name || 'Alex Rivera'}</div>
              <div class="text-[10px] text-tertiary font-medium">${user.role === 'EMPLOYEE' ? 'Warehouse Lead' : 'Inventory Admin'}</div>
            </div>
          </div>
          <button onclick="window.signOut()" class="p-1 text-tertiary hover:text-status-danger rounded transition-colors" title="Lock Session & Sign Out">
            <span class="material-symbols-outlined text-[16px]">logout</span>
          </button>
        </div>

        <div class="flex items-center justify-between bg-surface-card px-2 py-1 rounded border border-border-subtle">
          <div class="flex items-center gap-1.5">
            <div class="h-2 w-2 rounded-full bg-status-success animate-pulse"></div>
            <span class="font-label-sm text-[11px] text-on-surface font-semibold">Cloud ERP v2.4</span>
          </div>
          <span class="font-label-sm text-[11px] text-status-success font-medium">Operational</span>
        </div>
      </div>
    </aside>

    <!-- Mobile Backdrop -->
    <div id="sidebarBackdrop" class="fixed inset-0 bg-inverse-surface/40 backdrop-blur-xs z-40 hidden lg:hidden" onclick="window.toggleMobileSidebar(false)"></div>
  `;
}
