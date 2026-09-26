// StockSense Interactive Operational Modals
// Faithfully matches Stitch Modal Layouts and Validation Flows

import { store } from '../store/dataStore.js';
import { showToast } from './Toast.js';

export function renderModals() {
  const products = store.getProducts();

  return `
    <!-- 1. Goods Receipt Modal -->
    <div id="receiptModal" class="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 backdrop-blur-xs hidden p-4">
      <div class="bg-surface-card rounded-lg border border-border-strong shadow-xl w-full max-w-lg overflow-hidden animate-slide-up">
        <div class="h-14 px-5 border-b border-border-subtle flex items-center justify-between bg-surface-card">
          <div class="flex items-center gap-2">
            <span class="p-1 rounded bg-status-success-bg text-status-success">
              <span class="material-symbols-outlined text-[18px]">add_circle</span>
            </span>
            <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Create Goods Receipt</h3>
          </div>
          <button class="text-tertiary hover:text-on-surface p-1 rounded" onclick="window.closeModal('receiptModal')">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <form class="p-5 space-y-4" onsubmit="window.handleReceiptFormSubmit(event)">
          <div>
            <label class="block font-label-md text-label-md text-on-surface font-semibold mb-1">Product &amp; SKU</label>
            <select id="receiptSku" class="w-full h-9 px-3 bg-surface-subtle border border-border-strong rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary">
              ${products.map(p => `
                <option value="${p.sku}">${p.name} (SKU: ${p.sku}) - ${p.totalStock} ${p.uom} available</option>
              `).join('')}
            </select>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-label-md text-label-md text-on-surface font-semibold mb-1">Incoming Quantity</label>
              <input id="receiptQty" class="w-full h-9 px-3 bg-surface-subtle border border-border-strong rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary" placeholder="e.g. 100" required type="number" min="1" value="50" />
            </div>
            <div>
              <label class="block font-label-md text-label-md text-on-surface font-semibold mb-1">Unit of Measure</label>
              <input id="receiptUom" class="w-full h-9 px-3 bg-surface-subtle border border-border-strong rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary" type="text" value="kg" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-label-md text-label-md text-on-surface font-semibold mb-1">Destination Location</label>
              <select id="receiptLoc" class="w-full h-9 px-3 bg-surface-subtle border border-border-strong rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary">
                <option value="Main Warehouse">Main Warehouse (Bay A)</option>
                <option value="Production Rack">Production Floor / Rack A</option>
                <option value="Warehouse 2">Warehouse 2 (Logistics Hub)</option>
              </select>
            </div>
            <div>
              <label class="block font-label-md text-label-md text-on-surface font-semibold mb-1">Supplier PO Number</label>
              <input id="receiptDocRef" class="w-full h-9 px-3 bg-surface-subtle border border-border-strong rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary" type="text" value="PO-2025-${Math.floor(1000 + Math.random() * 9000)}" />
            </div>
          </div>
          <div class="p-3 bg-surface-subtle rounded border border-border-subtle flex items-start gap-2">
            <span class="material-symbols-outlined text-primary text-[18px] mt-0.5">info</span>
            <div class="font-body-sm text-body-sm text-tertiary">
              Validating this receipt will immediately write an immutable entry to the ledger and increase the on-hand physical stock.
            </div>
          </div>
          <div class="flex items-center justify-end gap-2 pt-2 border-t border-border-subtle">
            <button class="h-9 px-4 rounded border border-border-strong font-label-lg text-label-lg text-on-surface hover:bg-surface-subtle" onclick="window.closeModal('receiptModal')" type="button">
              Cancel
            </button>
            <button class="h-9 px-4 rounded bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg font-semibold shadow-xs" type="submit">
              Validate &amp; Post to Ledger
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 2. Internal Transfer Modal -->
    <div id="transferModal" class="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 backdrop-blur-xs hidden p-4">
      <div class="bg-surface-card rounded-lg border border-border-strong shadow-xl w-full max-w-lg overflow-hidden animate-slide-up">
        <div class="h-14 px-5 border-b border-border-subtle flex items-center justify-between bg-surface-card">
          <div class="flex items-center gap-2">
            <span class="p-1 rounded bg-secondary-fixed text-secondary">
              <span class="material-symbols-outlined text-[18px]">sync_alt</span>
            </span>
            <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Schedule Internal Transfer</h3>
          </div>
          <button class="text-tertiary hover:text-on-surface p-1 rounded" onclick="window.closeModal('transferModal')">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <form class="p-5 space-y-4" onsubmit="window.handleTransferFormSubmit(event)">
          <div>
            <label class="block font-label-md text-label-md text-on-surface font-semibold mb-1">Item to Move</label>
            <select id="transferSku" class="w-full h-9 px-3 bg-surface-subtle border border-border-strong rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary">
              ${products.map(p => `
                <option value="${p.sku}">${p.name} (${p.sku}) - ${p.totalStock} ${p.uom} available</option>
              `).join('')}
            </select>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-label-md text-label-md text-on-surface font-semibold mb-1">Source Location</label>
              <select id="transferFrom" class="w-full h-9 px-3 bg-surface-subtle border border-border-strong rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary">
                <option value="Main Warehouse">Main Warehouse (Bay A)</option>
                <option value="Production Rack">Production Floor / Rack A</option>
                <option value="Warehouse 2">Warehouse 2 (Logistics Hub)</option>
              </select>
            </div>
            <div>
              <label class="block font-label-md text-label-md text-on-surface font-semibold mb-1">Destination Location</label>
              <select id="transferTo" class="w-full h-9 px-3 bg-surface-subtle border border-border-strong rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary">
                <option value="Production Rack">Production Floor / Rack A</option>
                <option value="Main Warehouse">Main Warehouse (Bay A)</option>
                <option value="Warehouse 2">Warehouse 2 (Logistics Hub)</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block font-label-md text-label-md text-on-surface font-semibold mb-1">Quantity to Relocate</label>
            <input id="transferQty" class="w-full h-9 px-3 bg-surface-subtle border border-border-strong rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary" placeholder="e.g. 30" required type="number" min="1" value="20" />
          </div>
          <div class="p-3 bg-surface-subtle rounded border border-border-subtle flex items-start gap-2 text-body-sm text-tertiary">
            <span class="material-symbols-outlined text-secondary text-[18px] mt-0.5">verified_user</span>
            <span><strong>Conservation Invariant:</strong> Stock decreases at origin and increases at destination. Total system inventory remains strictly unchanged.</span>
          </div>
          <div class="flex items-center justify-end gap-2 pt-2 border-t border-border-subtle">
            <button class="h-9 px-4 rounded border border-border-strong font-label-lg text-label-lg text-on-surface hover:bg-surface-subtle" onclick="window.closeModal('transferModal')" type="button">
              Cancel
            </button>
            <button class="h-9 px-4 rounded bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg font-semibold shadow-xs" type="submit">
              Confirm Move
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 3. Physical Inventory Adjustment Modal -->
    <div id="adjustModal" class="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 backdrop-blur-xs hidden p-4">
      <div class="bg-surface-card rounded-lg border border-border-strong shadow-xl w-full max-w-lg overflow-hidden animate-slide-up">
        <div class="h-14 px-5 border-b border-border-subtle flex items-center justify-between bg-surface-card">
          <div class="flex items-center gap-2">
            <span class="p-1 rounded bg-secondary-fixed text-secondary">
              <span class="material-symbols-outlined text-[18px]">balance</span>
            </span>
            <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Physical Inventory Adjustment</h3>
          </div>
          <button class="text-tertiary hover:text-on-surface p-1 rounded" onclick="window.closeModal('adjustModal')">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <form class="p-5 space-y-4" onsubmit="window.handleAdjustFormSubmit(event)">
          <div>
            <label class="block font-label-md text-label-md text-on-surface font-semibold mb-1">Audit Item &amp; Location</label>
            <select id="adjustSku" class="w-full h-9 px-3 bg-surface-subtle border border-border-strong rounded font-body-sm text-body-sm text-on-surface" onchange="window.updateAdjustFormValues(this.value)">
              ${products.map(p => `
                <option value="${p.sku}">${p.name} (${p.sku}) @ Production Rack (System: ${p.totalStock} ${p.uom})</option>
              `).join('')}
            </select>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-label-md text-label-md text-on-surface font-semibold mb-1">Current System Count</label>
              <input id="adjustSysCount" class="w-full h-9 px-3 bg-surface-container-high/50 border border-border-subtle rounded font-body-sm text-body-sm text-on-surface cursor-not-allowed" readonly type="text" value="10 kg" />
            </div>
            <div>
              <label class="block font-label-md text-label-md text-on-surface font-semibold mb-1">Actual Physical Count</label>
              <input id="adjustPhysCount" class="w-full h-9 px-3 bg-surface-subtle border border-border-strong rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary" required step="0.1" type="number" value="7.0" />
            </div>
          </div>
          <div>
            <label class="block font-label-md text-label-md text-on-surface font-semibold mb-1">Reason for Variance</label>
            <select id="adjustReason" class="w-full h-9 px-3 bg-surface-subtle border border-border-strong rounded font-body-sm text-body-sm text-on-surface">
              <option value="Scrap / Damaged in production cut">Scrap / Damaged in production cut</option>
              <option value="Physical count discrepancy">Physical count discrepancy</option>
              <option value="Water damage / Rust write-off">Water damage / Rust write-off</option>
              <option value="Found misplaced stock">Found misplaced stock (+)</option>
            </select>
          </div>
          <div class="flex items-center justify-end gap-2 pt-2 border-t border-border-subtle">
            <button class="h-9 px-4 rounded border border-border-strong font-label-lg text-label-lg text-on-surface hover:bg-surface-subtle" onclick="window.closeModal('adjustModal')" type="button">
              Cancel
            </button>
            <button class="h-9 px-4 rounded bg-status-danger text-on-primary hover:bg-status-danger/90 font-label-lg text-label-lg font-semibold shadow-xs" type="submit">
              Post Adjustment
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 4. Add Product Modal -->
    <div id="addProductModal" class="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 backdrop-blur-xs hidden p-4">
      <div class="relative bg-surface-card rounded-xl shadow-xl w-full max-w-2xl overflow-hidden z-10 border border-border-subtle flex flex-col max-h-[90vh] animate-slide-up">
        <!-- Header -->
        <div class="h-14 px-6 flex items-center justify-between border-b border-border-subtle bg-surface-bright">
          <div class="flex items-center gap-2">
            <div class="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <span class="material-symbols-outlined text-[20px]">add_box</span>
            </div>
            <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Create New Master Inventory SKU</h3>
          </div>
          <button class="text-tertiary hover:text-on-surface p-1 rounded-lg hover:bg-surface-subtle transition-colors" onclick="window.closeModal('addProductModal')">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <!-- Form Body -->
        <form class="p-6 overflow-y-auto space-y-space-md font-body-md text-body-md text-on-surface" onsubmit="window.handleAddProductSubmit(event)">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <!-- Product Name -->
            <div class="md:col-span-2">
              <label class="block font-label-sm text-label-sm text-tertiary uppercase tracking-wider mb-1.5 font-semibold">Product Title / Master Name <span class="text-status-danger">*</span></label>
              <input id="newProdName" class="w-full h-10 px-3 bg-surface-subtle rounded-lg text-on-surface placeholder:text-outline border border-border-subtle focus:outline-none focus:border-primary transition-all" placeholder="e.g., Heavy Cast Iron Flange 4-inch" required type="text" />
            </div>

            <!-- SKU / Barcode -->
            <div>
              <label class="block font-label-sm text-label-sm text-tertiary uppercase tracking-wider mb-1.5 font-semibold">SKU / Code Reference <span class="text-status-danger">*</span></label>
              <div class="relative">
                <input id="newProdSKU" class="w-full h-10 px-3 bg-surface-subtle rounded-lg text-on-surface placeholder:text-outline border border-border-subtle focus:outline-none focus:border-primary uppercase font-tabular-data transition-all" placeholder="FLG-004" required type="text" />
                <button class="absolute right-2 top-1/2 -translate-y-1/2 text-primary font-label-sm text-label-sm hover:underline" onclick="document.getElementById('newProdSKU').value='SKU-'+Math.floor(1000+Math.random()*9000)" type="button">Auto-Gen</button>
              </div>
            </div>

            <!-- Category -->
            <div>
              <label class="block font-label-sm text-label-sm text-tertiary uppercase tracking-wider mb-1.5 font-semibold">Category <span class="text-status-danger">*</span></label>
              <select id="newProdCat" class="w-full h-10 px-3 bg-surface-subtle rounded-lg text-on-surface border border-border-subtle focus:outline-none focus:border-primary cursor-pointer">
                <option value="Raw Materials">Raw Materials</option>
                <option value="Finished Goods">Finished Goods</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Construction">Construction</option>
              </select>
            </div>

            <!-- UoM -->
            <div>
              <label class="block font-label-sm text-label-sm text-tertiary uppercase tracking-wider mb-1.5 font-semibold">Unit of Measure (UoM) <span class="text-status-danger">*</span></label>
              <select id="newProdUom" class="w-full h-10 px-3 bg-surface-subtle rounded-lg text-on-surface border border-border-subtle focus:outline-none focus:border-primary cursor-pointer">
                <option value="Units">Units (pcs)</option>
                <option value="kg">Kilograms (kg)</option>
                <option value="Bags">Heavy Bags</option>
                <option value="Drums">Cable Drums / Reels</option>
                <option value="Meters">Linear Meters (m)</option>
              </select>
            </div>

            <!-- Initial Quantity -->
            <div>
              <label class="block font-label-sm text-label-sm text-tertiary uppercase tracking-wider mb-1.5 font-semibold">Initial Quantity In-Hand</label>
              <input id="newProdQty" class="w-full h-10 px-3 bg-surface-subtle rounded-lg text-on-surface placeholder:text-outline border border-border-subtle focus:outline-none focus:border-primary font-tabular-data transition-all" min="0" placeholder="100" type="number" value="50" />
            </div>

            <!-- Warehouse -->
            <div>
              <label class="block font-label-sm text-label-sm text-tertiary uppercase tracking-wider mb-1.5 font-semibold">Default Storage Facility</label>
              <select id="newProdWh" class="w-full h-10 px-3 bg-surface-subtle rounded-lg text-on-surface border border-border-subtle focus:outline-none focus:border-primary cursor-pointer">
                <option value="Main Warehouse">Main Warehouse (Bay A)</option>
                <option value="Production Rack">Production Floor / Rack A</option>
                <option value="Warehouse 2">Warehouse 2 (Logistics Hub)</option>
              </select>
            </div>

            <!-- Min Reorder Buffer -->
            <div>
              <label class="block font-label-sm text-label-sm text-tertiary uppercase tracking-wider mb-1.5 font-semibold">Min Reorder Level Point</label>
              <input id="newProdMin" class="w-full h-10 px-3 bg-surface-subtle rounded-lg text-on-surface placeholder:text-outline border border-border-subtle focus:outline-none focus:border-primary font-tabular-data transition-all" min="0" placeholder="15" type="number" value="15" />
            </div>
          </div>

          <div class="p-3 bg-surface-container-low rounded-lg flex items-start gap-2.5">
            <span class="material-symbols-outlined text-[20px] text-primary mt-0.5">info</span>
            <div class="text-body-sm font-body-sm text-on-surface-variant">
              <span class="font-semibold text-on-surface">Auto-Allocation:</span> Initial inventory recorded will immediately generate an inward audit log entry in the FIFO Stock Ledger.
            </div>
          </div>

          <div class="h-16 -mx-6 -mb-6 px-6 bg-surface-bright border-t border-border-subtle flex items-center justify-end gap-3 mt-4">
            <button class="px-4 py-2 bg-surface-card hover:bg-surface-subtle text-on-surface font-label-md text-label-md rounded-lg transition-colors border border-border-subtle" onclick="window.closeModal('addProductModal')" type="button">Cancel</button>
            <button class="px-5 py-2 bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md rounded-lg shadow transition-all font-semibold" type="submit">Save SKU to Catalog</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

// Global modal helpers
window.openModal = function(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('hidden');
};

window.closeModal = function(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('hidden');
};

window.handleReceiptFormSubmit = function(e) {
  e.preventDefault();
  const sku = document.getElementById('receiptSku').value;
  const qty = document.getElementById('receiptQty').value;
  const uom = document.getElementById('receiptUom').value;
  const loc = document.getElementById('receiptLoc').value;
  const docRef = document.getElementById('receiptDocRef').value;

  try {
    store.postReceipt({
      sku,
      quantity: qty,
      uom,
      location: loc,
      docRef,
      supplier: 'Vendor Direct PO'
    });
    window.closeModal('receiptModal');
    showToast('Receipt Successfully Posted', `+${qty} ${uom} added to inventory for ${sku}. Ledger entry ${docRef} generated.`);
  } catch (err) {
    showToast('Receipt Failed', err.message, 'error');
  }
};

window.handleTransferFormSubmit = function(e) {
  e.preventDefault();
  const sku = document.getElementById('transferSku').value;
  const from = document.getElementById('transferFrom').value;
  const to = document.getElementById('transferTo').value;
  const qty = document.getElementById('transferQty').value;

  try {
    store.postTransfer({
      sku,
      quantity: qty,
      fromLocation: from,
      toLocation: to
    });
    window.closeModal('transferModal');
    showToast('Transfer Executed', `${qty} units moved from ${from} to ${to}. Conservation invariant preserved.`);
  } catch (err) {
    showToast('Transfer Failed', err.message, 'error');
  }
};

window.handleAdjustFormSubmit = function(e) {
  e.preventDefault();
  const sku = document.getElementById('adjustSku').value;
  const sys = parseFloat(document.getElementById('adjustSysCount').value) || 10;
  const phys = parseFloat(document.getElementById('adjustPhysCount').value) || 7;
  const reason = document.getElementById('adjustReason').value;

  try {
    store.postAdjustment({
      sku,
      location: 'Production Rack',
      systemStock: sys,
      physicalStock: phys,
      reason
    });
    window.closeModal('adjustModal');
    showToast('Stock Adjusted', `Variance of ${(phys - sys).toFixed(1)} posted to ledger. On-hand balance updated.`);
  } catch (err) {
    showToast('Adjustment Error', err.message, 'error');
  }
};

window.handleAddProductSubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('newProdName').value.trim();
  const sku = document.getElementById('newProdSKU').value.trim();
  const category = document.getElementById('newProdCat').value;
  const uom = document.getElementById('newProdUom').value;
  const initialStock = document.getElementById('newProdQty').value;
  const minStock = document.getElementById('newProdMin').value;
  const warehouse = document.getElementById('newProdWh').value;

  if (!name || !sku) {
    alert('Please provide Product Name and SKU Code.');
    return;
  }

  try {
    store.addProduct({
      name,
      sku,
      category,
      uom,
      initialStock,
      minStock,
      warehouse
    });
    window.closeModal('addProductModal');
    showToast('Catalog SKU Created', `New product '${name}' (${sku}) successfully created with initial ledger balance.`);
  } catch (err) {
    showToast('Creation Error', err.message, 'error');
  }
};

window.updateAdjustFormValues = function(sku) {
  const prod = store.getProductBySku(sku);
  if (prod) {
    const sysEl = document.getElementById('adjustSysCount');
    const physEl = document.getElementById('adjustPhysCount');
    if (sysEl) sysEl.value = `${prod.totalStock} ${prod.uom}`;
    if (physEl) physEl.value = Math.max(0, prod.totalStock - 3);
  }
};
