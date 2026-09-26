// StockSense Centralized Reactive Data Store
import { INITIAL_PRODUCTS, INITIAL_LEDGER_ENTRIES, INITIAL_OPERATIONS_QUEUE, INITIAL_WAREHOUSE_CONFIG } from './mockData.js';

class DataStore {
  constructor() {
    this.listeners = new Set();
    this.selectedWarehouse = 'all';
    this.loadState();
  }

  loadState() {
    try {
      const savedProds = localStorage.getItem('stocksense_products');
      const savedLedger = localStorage.getItem('stocksense_ledger');
      const savedQueue = localStorage.getItem('stocksense_queue');
      const savedWh = localStorage.getItem('stocksense_warehouses');

      this.products = savedProds ? JSON.parse(savedProds) : [...INITIAL_PRODUCTS];
      this.ledger = savedLedger ? JSON.parse(savedLedger) : [...INITIAL_LEDGER_ENTRIES];
      this.operationsQueue = savedQueue ? JSON.parse(savedQueue) : [...INITIAL_OPERATIONS_QUEUE];
      this.warehouseConfig = savedWh ? JSON.parse(savedWh) : JSON.parse(JSON.stringify(INITIAL_WAREHOUSE_CONFIG));
    } catch (e) {
      console.warn('Could not load localStorage, using defaults', e);
      this.products = [...INITIAL_PRODUCTS];
      this.ledger = [...INITIAL_LEDGER_ENTRIES];
      this.operationsQueue = [...INITIAL_OPERATIONS_QUEUE];
      this.warehouseConfig = JSON.parse(JSON.stringify(INITIAL_WAREHOUSE_CONFIG));
    }
  }

  saveState() {
    try {
      localStorage.setItem('stocksense_products', JSON.stringify(this.products));
      localStorage.setItem('stocksense_ledger', JSON.stringify(this.ledger));
      localStorage.setItem('stocksense_queue', JSON.stringify(this.operationsQueue));
      localStorage.setItem('stocksense_warehouses', JSON.stringify(this.warehouseConfig));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.saveState();
    this.listeners.forEach(fn => fn(this));
  }

  // --- GETTERS & METRICS ---
  getProducts() {
    return this.products;
  }

  getProductBySku(sku) {
    return this.products.find(p => p.sku === sku);
  }

  getLedgerEntries() {
    return this.ledger;
  }

  getOperationsQueue() {
    return this.operationsQueue;
  }

  getWarehouseConfig() {
    return this.warehouseConfig;
  }

  getMetrics() {
    const totalProducts = this.products.length;
    const totalUnits = this.products.reduce((acc, p) => acc + (p.totalStock || 0), 0);
    const lowStockCount = this.products.filter(p => p.totalStock > 0 && p.totalStock <= p.minStock).length;
    const outOfStockCount = this.products.filter(p => p.totalStock === 0).length;
    const pendingReceipts = this.operationsQueue.filter(op => op.type === 'RECEIPT' && op.status !== 'DONE').length;
    const pendingDeliveries = this.operationsQueue.filter(op => op.type === 'DELIVERY' && op.status !== 'DONE').length;
    const activeTransfers = this.operationsQueue.filter(op => op.type === 'INTERNAL_TRANSFER' && op.status !== 'DONE').length;
    const totalValuation = this.products.reduce((acc, p) => acc + (p.totalStock * (p.unitPrice || 0)), 0);

    return {
      totalProducts,
      totalUnits,
      lowStockCount,
      outOfStockCount,
      pendingReceipts,
      pendingDeliveries,
      activeTransfers,
      totalValuation
    };
  }

  // --- ACTIONS ---

  // 1. ADD / CREATE PRODUCT
  addProduct(productData) {
    const newProd = {
      id: 'prod-' + Date.now(),
      sku: productData.sku.toUpperCase(),
      name: productData.name,
      category: productData.category || 'Finished Goods',
      uom: productData.uom || 'Units',
      description: productData.description || `Catalog SKU registered on ${new Date().toLocaleDateString()}`,
      totalStock: Number(productData.initialStock) || 0,
      minStock: Number(productData.minStock) || 10,
      unitPrice: Number(productData.unitPrice) || 95.00,
      status: Number(productData.initialStock) === 0 ? 'OUT OF STOCK' : (Number(productData.initialStock) <= Number(productData.minStock) ? 'LOW STOCK' : 'IN STOCK'),
      imageUrl: productData.imageUrl || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
      allocations: {
        [productData.warehouse || 'Main Warehouse']: Number(productData.initialStock) || 0
      },
      consumptionRateDaily: 1.0,
      predictedStockoutDays: Math.round(((Number(productData.initialStock) || 0) / 1.0) * 10) / 10
    };

    this.products.unshift(newProd);

    // Initial Ledger Entry if initial stock > 0
    if (newProd.totalStock > 0) {
      const ref = `#REC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
      this.ledger.unshift({
        id: 'leg-' + Date.now(),
        timestamp: 'Today, Just now',
        isoDate: new Date().toISOString(),
        productName: newProd.name,
        sku: newProd.sku,
        operationType: 'RECEIPT',
        quantity: newProd.totalStock,
        quantityFormatted: `+${newProd.totalStock} ${newProd.uom}`,
        unit: newProd.uom,
        location: productData.warehouse || 'Main Warehouse',
        locationFlow: productData.warehouse || 'Main Warehouse',
        snapshot: `${productData.warehouse || 'Main Warehouse'}: ${newProd.totalStock} ${newProd.uom} | Total: ${newProd.totalStock} ${newProd.uom}`,
        docRef: ref,
        operator: 'Alex Rivera',
        role: 'Inventory Manager',
        status: 'DONE',
        blockHash: 'TXN_' + Math.random().toString(36).substring(2, 12).toUpperCase(),
        preStock: '0 ' + newProd.uom,
        postStock: `${newProd.totalStock} ${newProd.uom}`,
        note: 'Initial catalog creation stock registration.'
      });
    }

    this.notify();
    return newProd;
  }

  // 2. POST GOODS RECEIPT (Incoming)
  postReceipt({ sku, quantity, uom, location, supplier, docRef, note }) {
    const qty = Number(quantity);
    const prod = this.products.find(p => p.sku === sku);
    if (!prod) throw new Error(`Product with SKU ${sku} not found`);

    const preStock = prod.totalStock;
    prod.totalStock += qty;

    const locName = location.includes('Production') ? 'Production Rack' : (location.includes('Warehouse 2') ? 'Warehouse 2' : 'Main Warehouse');
    prod.allocations[locName] = (prod.allocations[locName] || 0) + qty;

    // Recalculate status
    if (prod.totalStock <= 0) prod.status = 'OUT OF STOCK';
    else if (prod.totalStock <= prod.minStock) prod.status = 'LOW STOCK';
    else prod.status = 'IN STOCK';

    const ref = docRef || `#REC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

    const newLedger = {
      id: 'leg-' + Date.now(),
      timestamp: 'Today, Just now',
      isoDate: new Date().toISOString(),
      productName: prod.name,
      sku: prod.sku,
      operationType: 'RECEIPT',
      quantity: qty,
      quantityFormatted: `+${qty} ${uom || prod.uom}`,
      unit: uom || prod.uom,
      location: locName,
      locationFlow: locName,
      snapshot: `${locName}: ${prod.allocations[locName]} ${uom || prod.uom} | Total: ${prod.totalStock} ${uom || prod.uom}`,
      docRef: ref,
      operator: 'Alex Rivera',
      role: 'Inventory Manager',
      status: 'DONE',
      blockHash: 'TXN_' + Math.random().toString(36).substring(2, 12).toUpperCase(),
      preStock: `${preStock} ${uom || prod.uom}`,
      postStock: `${prod.totalStock} ${uom || prod.uom}`,
      note: note || `Received shipment from ${supplier || 'Vendor'}.`
    };

    this.ledger.unshift(newLedger);
    this.notify();
    return newLedger;
  }

  // 3. POST OUTGOING DELIVERY (Strict Negative Stock Protection)
  postDelivery({ sku, quantity, location, customer, docRef, note }) {
    const qty = Number(quantity);
    const prod = this.products.find(p => p.sku === sku);
    if (!prod) throw new Error(`Product ${sku} not found`);

    const locName = location.includes('Production') ? 'Production Rack' : (location.includes('Warehouse 2') ? 'Warehouse 2' : 'Main Warehouse');
    const availableInLocation = prod.allocations[locName] || 0;

    // Strict Negative Stock Protection Rule
    if (availableInLocation < qty) {
      throw new Error(`Insufficient stock in ${locName}! Available: ${availableInLocation} ${prod.uom}, Requested: ${qty} ${prod.uom}. Operation aborted.`);
    }

    const preStock = prod.totalStock;
    prod.allocations[locName] -= qty;
    prod.totalStock -= qty;

    if (prod.totalStock <= 0) prod.status = 'OUT OF STOCK';
    else if (prod.totalStock <= prod.minStock) prod.status = 'LOW STOCK';
    else prod.status = 'IN STOCK';

    const ref = docRef || `#DEL-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

    const newLedger = {
      id: 'leg-' + Date.now(),
      timestamp: 'Today, Just now',
      isoDate: new Date().toISOString(),
      productName: prod.name,
      sku: prod.sku,
      operationType: 'DELIVERY',
      quantity: -qty,
      quantityFormatted: `-${qty} ${prod.uom}`,
      unit: prod.uom,
      location: locName,
      locationFlow: locName,
      snapshot: `${locName}: ${prod.allocations[locName]} ${prod.uom} | Total: ${prod.totalStock} ${prod.uom}`,
      docRef: ref,
      operator: 'Alex Rivera',
      role: 'Inventory Manager',
      status: 'DONE',
      blockHash: 'TXN_' + Math.random().toString(36).substring(2, 12).toUpperCase(),
      preStock: `${preStock} ${prod.uom}`,
      postStock: `${prod.totalStock} ${prod.uom}`,
      note: note || `Dispatched to ${customer || 'Client Order'}.`
    };

    this.ledger.unshift(newLedger);
    this.notify();
    return newLedger;
  }

  // 4. POST INTERNAL TRANSFER (Conservation Invariant)
  postTransfer({ sku, quantity, fromLocation, toLocation, docRef, note }) {
    const qty = Number(quantity);
    const prod = this.products.find(p => p.sku === sku);
    if (!prod) throw new Error(`Product ${sku} not found`);

    const sourceLoc = fromLocation.includes('Production') ? 'Production Rack' : (fromLocation.includes('Warehouse 2') ? 'Warehouse 2' : 'Main Warehouse');
    const destLoc = toLocation.includes('Production') ? 'Production Rack' : (toLocation.includes('Warehouse 2') ? 'Warehouse 2' : 'Main Warehouse');

    const sourceAvail = prod.allocations[sourceLoc] || 0;
    if (sourceAvail < qty) {
      throw new Error(`Cannot transfer ${qty} ${prod.uom} from ${sourceLoc}! Only ${sourceAvail} ${prod.uom} available.`);
    }

    // Apply movement
    prod.allocations[sourceLoc] -= qty;
    prod.allocations[destLoc] = (prod.allocations[destLoc] || 0) + qty;
    // Total stock invariant is strictly maintained!
    
    const ref = docRef || `#TRF-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

    const newLedger = {
      id: 'leg-' + Date.now(),
      timestamp: 'Today, Just now',
      isoDate: new Date().toISOString(),
      productName: prod.name,
      sku: prod.sku,
      operationType: 'INTERNAL_TRANSFER',
      quantity: qty,
      quantityFormatted: `${qty} ${prod.uom} moved`,
      unit: prod.uom,
      location: destLoc,
      locationFlow: `${sourceLoc} ➔ ${destLoc}`,
      snapshot: `${sourceLoc}: ${prod.allocations[sourceLoc]} ${prod.uom} | ${destLoc}: ${prod.allocations[destLoc]} ${prod.uom} | Total: ${prod.totalStock} ${prod.uom}`,
      docRef: ref,
      operator: 'Marcus Chen',
      role: 'Warehouse Staff',
      status: 'DONE',
      blockHash: 'TXN_' + Math.random().toString(36).substring(2, 12).toUpperCase(),
      preStock: `${sourceLoc}: ${sourceAvail} ${prod.uom}`,
      postStock: `${sourceLoc}: ${prod.allocations[sourceLoc]} ${prod.uom} | ${destLoc}: ${prod.allocations[destLoc]} ${prod.uom}`,
      note: note || `Inter-facility transfer staged between ${sourceLoc} and ${destLoc}.`
    };

    this.ledger.unshift(newLedger);
    this.notify();
    return newLedger;
  }

  // 5. POST PHYSICAL ADJUSTMENT (Audit Reconciliation)
  postAdjustment({ sku, location, systemStock, physicalStock, reason, docRef }) {
    const sys = Number(systemStock);
    const phys = Number(physicalStock);
    const diff = phys - sys;

    const prod = this.products.find(p => p.sku === sku);
    if (!prod) throw new Error(`Product ${sku} not found`);

    const locName = location.includes('Production') ? 'Production Rack' : (location.includes('Warehouse 2') ? 'Warehouse 2' : 'Main Warehouse');

    prod.allocations[locName] = phys;
    // Recompute total stock
    prod.totalStock = Object.values(prod.allocations).reduce((a, b) => a + b, 0);

    if (prod.totalStock <= 0) prod.status = 'OUT OF STOCK';
    else if (prod.totalStock <= prod.minStock) prod.status = 'LOW STOCK';
    else prod.status = 'IN STOCK';

    const ref = docRef || `#ADJ-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

    const newLedger = {
      id: 'leg-' + Date.now(),
      timestamp: 'Today, Just now',
      isoDate: new Date().toISOString(),
      productName: prod.name,
      sku: prod.sku,
      operationType: 'ADJUSTMENT',
      quantity: diff,
      quantityFormatted: `${diff > 0 ? '+' : ''}${diff} ${prod.uom}`,
      unit: prod.uom,
      location: locName,
      locationFlow: locName,
      snapshot: `${locName}: ${phys} ${prod.uom} | Total: ${prod.totalStock} ${prod.uom}`,
      docRef: ref,
      operator: 'Marcus Chen',
      role: 'Warehouse Staff',
      status: 'DONE',
      blockHash: 'TXN_' + Math.random().toString(36).substring(2, 12).toUpperCase(),
      preStock: `${locName}: ${sys} ${prod.uom}`,
      postStock: `${locName}: ${phys} ${prod.uom}`,
      note: `Variance: ${diff} ${prod.uom}. Reason: ${reason || 'Physical cycle count discrepancy'}`
    };

    this.ledger.unshift(newLedger);
    this.notify();
    return newLedger;
  }

  // 6. VALIDATE PENDING QUEUE ITEM
  validateQueueItem(queueId) {
    const item = this.operationsQueue.find(q => q.id === queueId);
    if (!item) return;

    if (item.type === 'RECEIPT') {
      this.postReceipt({
        sku: item.sku,
        quantity: item.qty,
        uom: item.unit,
        location: item.destination || 'Main Warehouse',
        supplier: item.supplier,
        docRef: item.ref
      });
    } else if (item.type === 'DELIVERY') {
      this.postDelivery({
        sku: item.sku,
        quantity: item.qty,
        location: item.source || 'Main Warehouse',
        customer: item.customer,
        docRef: item.ref
      });
    } else if (item.type === 'INTERNAL_TRANSFER') {
      this.postTransfer({
        sku: item.sku,
        quantity: item.qty,
        fromLocation: item.source || 'Main Warehouse',
        toLocation: item.destination || 'Production Rack',
        docRef: item.ref
      });
    }

    item.status = 'DONE';
    this.notify();
  }

  // Set active warehouse context
  setSelectedWarehouse(wh) {
    this.selectedWarehouse = wh;
    this.notify();
  }

  getSelectedWarehouse() {
    return this.selectedWarehouse;
  }
}

export const store = new DataStore();
