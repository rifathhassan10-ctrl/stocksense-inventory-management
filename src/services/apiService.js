// StockSense API Service Layer
// Clean abstraction layer allowing seamless swapping between Mock DataStore and real Backend API

import { store } from '../store/dataStore.js';

class ApiService {
  constructor() {
    this.isMock = true; // Flag for switching to real backend endpoint
    this.baseUrl = '/api/v1';
  }

  // Dashboard Telemetry
  async getDashboardSummary() {
    if (this.isMock) {
      return {
        metrics: store.getMetrics(),
        recentLedger: store.getLedgerEntries().slice(0, 6),
        pendingQueue: store.getOperationsQueue().filter(q => q.status !== 'DONE'),
        bayCapacity: [
          { name: 'Main Warehouse (Bay A-F)', percent: 84, status: 'normal', color: 'primary' },
          { name: 'Production Floor Rack A/B', percent: 91, status: 'near_max', color: 'status-warning' },
          { name: 'Warehouse 2 (Logistics Hub)', percent: 52, status: 'healthy', color: 'status-success' }
        ],
        weeklyVelocity: [
          { day: 'Mon', receipts: 65, deliveries: 40 },
          { day: 'Tue', receipts: 80, deliveries: 55 },
          { day: 'Wed', receipts: 45, deliveries: 70 },
          { day: 'Thu', receipts: 90, deliveries: 35 },
          { day: 'Fri', receipts: 100, deliveries: 60 }
        ]
      };
    }
    const res = await fetch(`${this.baseUrl}/dashboard/summary`);
    return await res.json();
  }

  // Products
  async getProducts(filters = {}) {
    if (this.isMock) {
      let list = store.getProducts();
      if (filters.search) {
        const q = filters.search.toLowerCase();
        list = list.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
      }
      if (filters.category && filters.category !== 'all') {
        list = list.filter(p => p.category === filters.category);
      }
      if (filters.warehouse && filters.warehouse !== 'all') {
        list = list.filter(p => p.allocations[filters.warehouse] !== undefined && p.allocations[filters.warehouse] > 0);
      }
      if (filters.status && filters.status !== 'all') {
        list = list.filter(p => p.status === filters.status);
      }
      return list;
    }
    const params = new URLSearchParams(filters);
    const res = await fetch(`${this.baseUrl}/products?${params}`);
    return await res.json();
  }

  async createProduct(payload) {
    if (this.isMock) {
      return store.addProduct(payload);
    }
    const res = await fetch(`${this.baseUrl}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  }

  // Stock Ledger
  async getLedgerEntries(filters = {}) {
    if (this.isMock) {
      let list = store.getLedgerEntries();
      if (filters.search) {
        const q = filters.search.toLowerCase();
        list = list.filter(e => 
          e.productName.toLowerCase().includes(q) || 
          e.sku.toLowerCase().includes(q) || 
          e.docRef.toLowerCase().includes(q) ||
          e.operator.toLowerCase().includes(q)
        );
      }
      if (filters.type && filters.type !== 'ALL') {
        list = list.filter(e => e.operationType === filters.type);
      }
      if (filters.location && filters.location !== 'ALL') {
        list = list.filter(e => e.location.includes(filters.location));
      }
      return list;
    }
    const params = new URLSearchParams(filters);
    const res = await fetch(`${this.baseUrl}/ledger?${params}`);
    return await res.json();
  }

  // Operations
  async postReceipt(payload) {
    if (this.isMock) {
      return store.postReceipt(payload);
    }
    const res = await fetch(`${this.baseUrl}/operations/receipt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  }

  async postDelivery(payload) {
    if (this.isMock) {
      return store.postDelivery(payload);
    }
    const res = await fetch(`${this.baseUrl}/operations/delivery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  }

  async postTransfer(payload) {
    if (this.isMock) {
      return store.postTransfer(payload);
    }
    const res = await fetch(`${this.baseUrl}/operations/transfer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  }

  async postAdjustment(payload) {
    if (this.isMock) {
      return store.postAdjustment(payload);
    }
    const res = await fetch(`${this.baseUrl}/operations/adjustment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  }

  async validateQueueItem(id) {
    if (this.isMock) {
      return store.validateQueueItem(id);
    }
    const res = await fetch(`${this.baseUrl}/operations/queue/${id}/validate`, { method: 'POST' });
    return await res.json();
  }

  // Warehouses
  async getWarehouseConfig() {
    if (this.isMock) {
      return store.getWarehouseConfig();
    }
    const res = await fetch(`${this.baseUrl}/warehouses/config`);
    return await res.json();
  }
}

export const apiService = new ApiService();
