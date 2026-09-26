// StockSense SPA Router & Application Coordinator
// Faithfully matches Stitch "Precision Slate ERP" Architecture

import { store } from './store/dataStore.js';
import { renderHeader } from './components/Header.js';
import { renderSidebar } from './components/Sidebar.js';
import { renderToastContainer, showToast } from './components/Toast.js';
import { renderModals } from './components/Modals.js';

import { renderDashboardView } from './views/DashboardView.js';
import { renderProductsView } from './views/ProductsView.js';
import { renderOperationsView } from './views/OperationsView.js';
import { renderStockLedgerView } from './views/StockLedgerView.js';
import { renderWarehousesView } from './views/WarehousesView.js';
import { renderAnalyticsView, initAnalyticsViewEvents } from './views/AnalyticsView.js';
import { renderAlertsView, initAlertsViewEvents } from './views/AlertsView.js';
import { renderLoginView, initLoginViewEvents } from './views/LoginView.js';
import { renderAdminView, initAdminViewEvents } from './views/AdminView.js';

class App {
  constructor() {
    this.currentRoute = 'dashboard';
    this.init();
  }

  init() {
    const root = document.getElementById('app');
    if (!root) return;

    // Render Shell Layout
    root.innerHTML = `
      <div id="appShell" class="flex min-h-screen bg-surface-bg text-on-surface antialiased font-body-md">
        <!-- Sidebar Container -->
        <div id="sidebarContainer"></div>

        <!-- Main Workspace Column (offset for 64w sidebar) -->
        <div class="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all">
          <!-- Header Container -->
          <div id="headerContainer"></div>

          <!-- Dynamic Viewport Area (offset for 16h header) -->
          <main id="mainContentArea" class="flex-1 p-space-md lg:p-space-lg mt-16 overflow-y-auto max-w-7xl mx-auto w-full pb-16">
          </main>
        </div>

        <!-- Modals Container -->
        <div id="modalContainer"></div>

        <!-- Toast Notifications -->
        <div id="toastContainer"></div>

        <!-- Mobile Drawer Backdrop -->
        <div id="mobileBackdrop" class="fixed inset-0 bg-inverse-surface/40 backdrop-blur-xs z-40 hidden lg:hidden" onclick="window.toggleMobileSidebar(false)"></div>
      </div>
    `;

    // Render static shells
    document.getElementById('modalContainer').innerHTML = renderModals();
    document.getElementById('toastContainer').innerHTML = renderToastContainer();

    // Setup Global Window Bindings
    this.setupGlobalBindings();

    // Setup Router Listeners
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));

    // Subscribe to DataStore updates
    store.subscribe(() => {
      this.refreshCurrentView();
    });

    // Initial Route
    this.handleRoute();
  }

  getRouteFromHash() {
    const isAuth = localStorage.getItem('stocksense_auth') === 'true';
    const hash = window.location.hash.slice(2); // Strip '#/'
    if (!isAuth) {
      return 'login';
    }
    return hash || 'dashboard';
  }

  async handleRoute() {
    this.currentRoute = this.getRouteFromHash();

    // Strict Auth Guard: If not authenticated, ALWAYS open Login page first
    const isAuth = localStorage.getItem('stocksense_auth') === 'true';
    if (!isAuth) {
      this.currentRoute = 'login';
      if (window.location.hash !== '#/login') {
        window.location.hash = '#/login';
        return;
      }
    }

    // Close mobile sidebar on navigation
    window.toggleMobileSidebar(false);

    const isLogin = this.currentRoute === 'login';
    const sidebarEl = document.getElementById('sidebarContainer');
    const headerEl = document.getElementById('headerContainer');
    const mainEl = document.getElementById('mainContentArea');
    const workspaceCol = mainEl?.parentElement;

    if (isLogin) {
      if (sidebarEl) sidebarEl.innerHTML = '';
      if (headerEl) headerEl.innerHTML = '';
      if (workspaceCol) workspaceCol.className = 'flex-1 flex flex-col min-w-0 transition-all';
      if (mainEl) mainEl.className = 'w-full min-h-screen';
      if (mainEl) {
        mainEl.innerHTML = renderLoginView();
        initLoginViewEvents();
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Normal authenticated view layout
    if (workspaceCol) workspaceCol.className = 'flex-1 flex flex-col min-w-0 lg:pl-64 transition-all';
    if (mainEl) mainEl.className = 'flex-1 p-space-md lg:p-space-lg mt-16 overflow-y-auto max-w-7xl mx-auto w-full pb-16';

    // Update Header & Sidebar
    if (sidebarEl) sidebarEl.innerHTML = renderSidebar(this.currentRoute);
    if (headerEl) headerEl.innerHTML = renderHeader(this.currentRoute);

    // Attach Sidebar accordion events
    this.attachSidebarEvents();

    // Route view rendering
    if (!mainEl) return;

    if (this.currentRoute === 'dashboard') {
      mainEl.innerHTML = renderDashboardView();
    } else if (this.currentRoute === 'products') {
      mainEl.innerHTML = renderProductsView();
    } else if (this.currentRoute.startsWith('operations')) {
      const parts = this.currentRoute.split('/');
      const subtab = parts[1] || 'receipts';
      mainEl.innerHTML = renderOperationsView(subtab);
    } else if (this.currentRoute === 'stock-ledger') {
      mainEl.innerHTML = renderStockLedgerView();
    } else if (this.currentRoute === 'warehouses') {
      mainEl.innerHTML = renderWarehousesView();
    } else if (this.currentRoute === 'analytics') {
      mainEl.innerHTML = await renderAnalyticsView();
      initAnalyticsViewEvents();
    } else if (this.currentRoute === 'alerts') {
      mainEl.innerHTML = renderAlertsView();
      initAlertsViewEvents();
    } else if (this.currentRoute === 'admin') {
      mainEl.innerHTML = renderAdminView();
      initAdminViewEvents();
    } else {
      // Fallback
      mainEl.innerHTML = renderDashboardView();
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async refreshCurrentView() {
    const mainEl = document.getElementById('mainContentArea');
    if (!mainEl) return;

    if (this.currentRoute === 'login') {
      mainEl.innerHTML = renderLoginView();
      initLoginViewEvents();
      return;
    }

    // Refresh modals in case product quantities changed
    const modalEl = document.getElementById('modalContainer');
    if (modalEl) modalEl.innerHTML = renderModals();

    // Re-render current route
    if (this.currentRoute === 'dashboard') {
      mainEl.innerHTML = renderDashboardView();
    } else if (this.currentRoute === 'products') {
      mainEl.innerHTML = renderProductsView();
    } else if (this.currentRoute.startsWith('operations')) {
      const parts = this.currentRoute.split('/');
      const subtab = parts[1] || 'receipts';
      mainEl.innerHTML = renderOperationsView(subtab);
    } else if (this.currentRoute === 'stock-ledger') {
      mainEl.innerHTML = renderStockLedgerView();
    } else if (this.currentRoute === 'warehouses') {
      mainEl.innerHTML = renderWarehousesView();
    } else if (this.currentRoute === 'analytics') {
      mainEl.innerHTML = await renderAnalyticsView();
      initAnalyticsViewEvents();
    } else if (this.currentRoute === 'alerts') {
      mainEl.innerHTML = renderAlertsView();
      initAlertsViewEvents();
    } else if (this.currentRoute === 'admin') {
      mainEl.innerHTML = renderAdminView();
      initAdminViewEvents();
    }
  }

  attachSidebarEvents() {
    const opToggle = document.getElementById('operationsToggle');
    const opSubmenu = document.getElementById('operationsSubmenu');
    const opChevron = document.getElementById('operationsChevron');

    if (opToggle && opSubmenu) {
      opToggle.addEventListener('click', () => {
        const isHidden = opSubmenu.classList.contains('hidden');
        if (isHidden) {
          opSubmenu.classList.remove('hidden');
          if (opChevron) opChevron.classList.add('rotate-180');
        } else {
          opSubmenu.classList.add('hidden');
          if (opChevron) opChevron.classList.remove('rotate-180');
        }
      });
    }

    const searchInput = document.getElementById('sidebarModuleSearch');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        const links = document.querySelectorAll('#appSidebar nav a');
        links.forEach(link => {
          const text = link.innerText.toLowerCase();
          if (!term || text.includes(term)) {
            link.style.display = 'flex';
          } else {
            link.style.display = 'none';
          }
        });
      });
    }
  }

  setupGlobalBindings() {
    // Mobile Drawer Toggle
    window.toggleMobileSidebar = (open) => {
      const sidebar = document.getElementById('appSidebar');
      const backdrop = document.getElementById('mobileBackdrop');
      if (!sidebar) return;

      if (open) {
        sidebar.classList.remove('-translate-x-full');
        if (backdrop) backdrop.classList.remove('hidden');
      } else {
        sidebar.classList.add('-translate-x-full');
        if (backdrop) backdrop.classList.add('hidden');
      }
    };

    // Modal Manager
    window.openModal = (modalId) => {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        const firstInput = modal.querySelector('input, select');
        if (firstInput) setTimeout(() => firstInput.focus(), 50);
      }
    };

    window.closeModal = (modalId) => {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    };

    // Global Search Bar
    window.handleGlobalSearch = (query) => {
      if (!query || !query.trim()) return;
      const term = query.trim().toLowerCase();
      showToast('Searching Catalog', `Filtering inventory records for "${term}"...`);
      window.location.hash = '#/products';
      setTimeout(() => {
        const prodSearch = document.getElementById('productSearchInput');
        if (prodSearch) {
          prodSearch.value = term;
          if (typeof window.filterProducts === 'function') {
            window.filterProducts();
          }
        }
      }, 150);
    };

    // Global Warehouse Switcher
    window.setGlobalWarehouse = (wh) => {
      store.setSelectedWarehouse(wh);
      showToast('Facility Filter Updated', `Current scope: ${wh === 'all' ? 'All Warehouse Nodes' : wh}`);
      this.refreshCurrentView();
    };

    // Quick Toast helper for buttons
    window.triggerToast = (title, message, type = 'info') => {
      showToast(title, message, type);
    };

    // Sign Out Handler (Locks session, clears storage, redirects to Login)
    window.signOut = () => {
      localStorage.removeItem('stocksense_auth');
      localStorage.removeItem('stocksense_user');
      showToast('Session Ended', 'Terminal locked. Operator signed out successfully.', 'info');
      window.location.hash = '#/login';
      setTimeout(() => this.handleRoute(), 50);
    };
  }

  handleKeyboardShortcuts(e) {
    // ⌘K or Ctrl+K for Global Search
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const search = document.getElementById('globalSearchInput');
      if (search) {
        search.focus();
        search.select();
      }
    }
    // Escape to close modals
    if (e.key === 'Escape') {
      document.querySelectorAll('#modalContainer > div').forEach(modal => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      });
      window.toggleMobileSidebar(false);
    }
  }
}

// Instantiate and start application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
