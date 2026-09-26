// StockSense Real API Service Layer
// Communicates with Node.js/Express backend (/api/v1) with resilient fallback to DataStore

import { store } from '../store/dataStore.js';

class ApiService {
  constructor() {
    this.isMock = false; // Connects to real Node.js / Express backend
    this.baseUrl = '/api/v1';
  }

  // Dashboard Telemetry
  async getDashboardSummary() {
    if (!this.isMock) {
      try {
        const res = await fetch(`${this.baseUrl}/dashboard/summary`);
        if (res.ok) return await res.json();
      } catch (e) {
        console.warn('Backend unavailable, falling back to local store for dashboard summary:', e);
      }
    }

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

  // Products
  async getProducts(filters = {}) {
    if (!this.isMock) {
      try {
        const params = new URLSearchParams(filters);
        const res = await fetch(`${this.baseUrl}/products?${params}`);
        if (res.ok) return await res.json();
      } catch (e) {
        console.warn('Backend unavailable, falling back to local store for products:', e);
      }
    }

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

  async createProduct(payload) {
    if (!this.isMock) {
      try {
        const res = await fetch(`${this.baseUrl}/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const newProd = await res.json();
          store.addProduct(newProd);
          return newProd;
        }
      } catch (e) {
        console.warn('Backend unavailable, saving product locally:', e);
      }
    }
    return store.addProduct(payload);
  }

  // Stock Ledger
  async getLedgerEntries(filters = {}) {
    if (!this.isMock) {
      try {
        const params = new URLSearchParams(filters);
        const res = await fetch(`${this.baseUrl}/ledger?${params}`);
        if (res.ok) return await res.json();
      } catch (e) {
        console.warn('Backend unavailable, falling back to local store for ledger:', e);
      }
    }

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

  // Operations
  async postReceipt(payload) {
    if (!this.isMock) {
      try {
        const res = await fetch(`${this.baseUrl}/operations/receipt`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          store.postReceipt(payload);
          return await res.json();
        }
      } catch (e) {
        console.warn('Backend unavailable, executing receipt locally:', e);
      }
    }
    return store.postReceipt(payload);
  }

  async postDelivery(payload) {
    if (!this.isMock) {
      try {
        const res = await fetch(`${this.baseUrl}/operations/delivery`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          store.postDelivery(payload);
          return await res.json();
        } else {
          const err = await res.json();
          throw new Error(err.error || 'Delivery failed');
        }
      } catch (e) {
        if (e.message && e.message.includes('Negative Stock')) throw e;
        console.warn('Backend unavailable, executing delivery locally:', e);
      }
    }
    return store.postDelivery(payload);
  }

  async postTransfer(payload) {
    if (!this.isMock) {
      try {
        const res = await fetch(`${this.baseUrl}/operations/transfer`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          store.postTransfer(payload);
          return await res.json();
        } else {
          const err = await res.json();
          throw new Error(err.error || 'Transfer failed');
        }
      } catch (e) {
        if (e.message && e.message.includes('Transfer Error')) throw e;
        console.warn('Backend unavailable, executing transfer locally:', e);
      }
    }
    return store.postTransfer(payload);
  }

  async postAdjustment(payload) {
    if (!this.isMock) {
      try {
        const res = await fetch(`${this.baseUrl}/operations/adjustment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          store.postAdjustment(payload);
          return await res.json();
        }
      } catch (e) {
        console.warn('Backend unavailable, executing adjustment locally:', e);
      }
    }
    return store.postAdjustment(payload);
  }

  async validateQueueItem(id) {
    if (!this.isMock) {
      try {
        const res = await fetch(`${this.baseUrl}/operations/queue/${id}/validate`, { method: 'POST' });
        if (res.ok) {
          store.validateQueueItem(id);
          return await res.json();
        }
      } catch (e) {
        console.warn('Backend unavailable, validating queue item locally:', e);
      }
    }
    return store.validateQueueItem(id);
  }

  // Warehouses
  async getWarehouseConfig() {
    if (!this.isMock) {
      try {
        const res = await fetch(`${this.baseUrl}/warehouses/config`);
        if (res.ok) return await res.json();
      } catch (e) {
        console.warn('Backend unavailable, reading warehouse config locally:', e);
      }
    }
    return store.getWarehouseConfig();
  }

  // ============================================================================
  // AUTHENTICATION & SESSIONS
  // ============================================================================
  async login(email, password) {
    const res = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Authentication failed. Please verify credentials.');
    }
    return data;
  }

  async googleLogin(googlePayload) {
    const res = await fetch(`${this.baseUrl}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(googlePayload)
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Google authentication failed.');
    }
    return data;
  }

  async sendOtp(phone) {
    const res = await fetch(`${this.baseUrl}/auth/otp/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    });
    return await res.json();
  }

  async verifyOtp(phone, otp) {
    const res = await fetch(`${this.baseUrl}/auth/otp/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Invalid OTP passcode.');
    }
    return data;
  }

  async resolveSso(domain) {
    const res = await fetch(`${this.baseUrl}/auth/sso/resolve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain })
    });
    return await res.json();
  }

  async logout() {
    const token = localStorage.getItem('stocksense_token');
    try {
      await fetch(`${this.baseUrl}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (e) {
      // Ignore network errors on logout
    }
    localStorage.removeItem('stocksense_auth');
    localStorage.removeItem('stocksense_user');
    localStorage.removeItem('stocksense_token');
  }
}

export const apiService = new ApiService();
