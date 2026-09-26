# StockSense — Intelligent Inventory Management & Stock Ledger ERP

> Production-grade ERP web application and REST API backend featuring multi-facility storage bin management, immutable double-entry stock ledger, and AI-powered predictive demand forecasting. Built faithfully from Google Stitch design specifications.

---

## 🔐 Authentication & Role-Based Access Control

StockSense enforces an **authentication-first routing flow**. When opening the web application at `http://localhost:3000`, visitors are greeted first with the **Enterprise Login Page (`#/login`)**. Once authenticated, users are routed to their designated workstation based on their role.

### 📋 Active Test Credentials

| Role | Name | Email | Password | Landing Page | Key Permissions |
|---|---|---|---|---|---|
| 👑 **System Admin** | Alex Rivera | `alex.rivera@stocksense.io` | `admin123` | `#/dashboard` | Full ERP catalog, facilities, governance toggles, system settings, Admin & RBAC console (`#/admin`) |
| 👷 **Warehouse Employee** | Marcus Vance (FL-04) | `operator.dock@stocksense.io` | `operator123` | `#/operations` | Dock Intake Receipts, Outbound Deliveries, Bin-to-Bin Transfers, Physical Cycle Count Variance |
| 🔍 **Compliance Auditor** | Elena Rostova | `auditor@stocksense.io` | `auditor123` | `#/stock-ledger` | Cryptographic Ledger Audit, SHA-256 state chain verification, CSV & Audit Report export |

> **⚡ Secure Role Access**: In compliance with enterprise security standards, **administrative credentials are not advertised on the public login page**. Administrators access the system via standard email entry or Google Workspace authentication. The login page provides an interactive **Google Sign-In account selector** and **Warehouse Terminal fast-access**.

---

## 🌟 Key Features

### 1. 🔐 Universal Multi-Provider Enterprise Login (`#/login`)
- **Login-First Guard**: Unauthenticated requests automatically redirect to `#/login` first.
- **Stitch Design**: Faithfully implemented from Stitch Screen `c031b3bb2bb044d3939d83a8a6c5d13c`.
- **Google Sign-In Modal**: Interactive Google Identity Services account selector with animated OAuth 2.0 PKCE token exchange.
- **Federated SSO**: Multi-provider support for Google Workspace, Microsoft 365 / Azure AD, and Apple ID Passkey.
- **3 Authentication Modalities**:
  - **Email & Master Passphrase**: Secure credentials with show/hide password toggle and password recovery.
  - **SMS OTP**: Registered mobile authentication with 6-digit passcode grid (auto-advancing input focus) and FIDO2 / YubiKey hardware key support.
  - **SAML / SSO**: Corporate identity provider routing (`.stocksense.io`) with FIPS 140-2 Level 3 certificate notice.
- **Warehouse Operator Terminal**: Fast 1-click dock operator sign in without disclosing administrative accounts.
- **Right Telemetry Showcase**: Live immutable ledger card snapshot, volumetric bay load gauge, weekly inbound velocity bar chart, and enterprise endorsement.

### 2. 🛡️ Admin Management & RBAC Console (`#/admin`)
- **System Operator Directory**: Live view of registered administrators, dock operators, and compliance auditors with active session telemetry.
- **RBAC Capability Matrix**: Side-by-side comparison of role privileges across Catalog Management, Ledger Hashing, Governance Settings, and Stock Movements.
- **ERP Governance Controls**:
  - *Strict Negative-Stock Protection* (blocks dispatch if available inventory < requested).
  - *Conservation Invariant Enforcement* (guarantees internal transfers never alter total system volume).
  - *Dual-Operator Discrepancy Signoff* (requires manager counter-signature for count variances > $500).
- **Compliance Audit Certification**: Print-ready cryptographic audit report generation.

### 3. 📊 ERP Inventory Dashboard (`#/dashboard`)
- **6 Core KPIs**: Total Active SKUs (10 items), Inventory Valuation ($81,649.90+), Stockout Exceptions, Ledger Integrity, and Warehouse Capacity.
- **Facility Scope Pills**: Instant context filtering between All Facilities, Main Warehouse (Bay A-F), Production Plant A, and Logistics Hub.
- **Live Ledger Feed**: Real-time chronological transaction stream.
- **Pending Operations Queue**: Immediate action buttons for quick validation, dispatch, and physical counting.

### 3. 📦 Products & SKU Matrix (`#/products`)
- **Dual Display Modes**: Seamless switcher between **Bento Card Grid** and **Compact Dense List**.
- **Real-Time Catalog Search**: Instant filtering across SKU, product title, category pills (*Raw Materials, Finished Goods, Electronics, Tools*), and warehouse location.
- **Stock Depletion Gauges**: Visual progress bars showing stock relative to safety reorder thresholds.
- **Actions**: Export CSV and **+ Add Product** modal with auto-generated initial ledger entry.

### 4. ⚡ Inventory Operations Hub (`#/operations/*`)
- **Goods Receipts (`#/operations/receipts`)**: Direct intake form with live balance calculator, supplier PO generator, and staging queue.
- **Delivery Orders (`#/operations/deliveries`)**: Outbound delivery processing with **strict negative-stock protection** (disallows delivery exceeding available stock).
- **Internal Transfers (`#/operations/transfers`)**: Inter-facility transfer pipeline with **conservation invariant** validation (stock transferred between locations leaves total system inventory unchanged).
- **Physical Adjustments (`#/operations/adjustments`)**: Cycle count variance calculator with instant variance classification (*Inventory Shrinkage* vs. *Surplus*).

### 5. 📜 Immutable Stock Ledger & Audit Trail (`#/stock-ledger`)
- **Double-Entry Ledger Integrity**: Every operation creates an immutable audit row with operation type, quantity delta, location flow, doc reference, operator, and status.
- **Cryptographic Expandable Drawers**: Clicking any ledger entry expands an inspection drawer revealing:
  - Cryptographic SHA-256 state hash and parent hash.
  - Pre- and post-operation physical balance breakdown by bin.
  - Authorized operator, badge ID, and terminal timestamp.
- **Export Options**: 1-click **Export CSV** and formatted **Print Audit Report**.

### 6. 🏭 Multi-Warehouse Facilities & Storage Bins (`#/warehouses`)
- **Facility Architecture**: Zone A (Cantilever Heavy Metals) and Zone B (Automated Pallet Racks).
- **Interactive Bin Grid**: Live capacity utilization indicators on each storage bin (`BIN-A-01-A`, `BIN-B-01-B`, etc.).
- **Right-Hand Telemetry Drawer**: Clicking any bin dynamically populates live telemetry (allocated SKU, current load, max capacity, climate range, RFID tag, lock state).

### 7. 🧠 Predictive Analytics & ML Intelligence (`#/analytics`)
- **7-Day Demand Forecast Chart**: Interactive Bayesian consumption projection with 95% confidence bands and day-by-day forecasted quantities.
- **Wilson EOQ Engine**: Automated Economic Order Quantity calculations ($$EOQ = \sqrt{\frac{2DS}{H}}$$) optimizing batch purchases for holding vs setup costs.
- **Real-Time Shrinkage Sentinel**: Proactive anomaly alerts on unusual shrinkage spikes or volumetric capacity bottlenecks.

### 8. 🚨 Active Alerts & Risk Monitoring (`#/alerts`)
- **Severity Classification**: Critical Stockouts (Zero Stock), Low Buffer Warnings, and Facility Capacity alerts.
- **One-Click Mitigations**: Quick Reorder Purchase Order generation and automated replenishment triggers.

---

## 🛠️ Tech Stack

- **Backend**: Node.js & Express (RESTful API architecture, CORS, SHA-256 state hashing)
- **Frontend**: Vanilla ES2022 JavaScript (Modular Single Page Application architecture with hash router)
- **Styling**: Tailwind CSS with custom **"Precision Slate ERP"** design tokens matching Stitch
- **Typography**: Google Fonts (*Plus Jakarta Sans* & *Inter*)
- **Icons**: Material Symbols Outlined
- **State Management**: Reactive DataStore with LocalStorage caching and live REST API synchronization

---

## 📡 REST API Reference

The backend runs concurrently with the web application on port `3000`:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/health` | System status, uptime, and cluster telemetry |
| `GET` | `/api/v1/dashboard/summary` | Aggregated valuation, KPIs, bay capacity, and velocity |
| `GET` | `/api/v1/products` | Filterable product list (`search`, `category`, `warehouse`, `status`) |
| `GET` | `/api/v1/products/:sku` | Product details and bin allocation matrix |
| `POST` | `/api/v1/products` | Create new SKU with initial ledger entry |
| `GET` | `/api/v1/ledger` | Immutable chronological stock ledger transactions |
| `POST` | `/api/v1/ledger/verify` | Verify cryptographic SHA-256 state chain integrity |
| `POST` | `/api/v1/operations/receipt` | Intake goods receipt (+stock, supplier PO reference) |
| `POST` | `/api/v1/operations/delivery` | Dispatch delivery (-stock with negative-stock validation) |
| `POST` | `/api/v1/operations/transfer` | Move inventory between bins (conservation invariant) |
| `POST` | `/api/v1/operations/adjustment` | Post physical count variance (shrinkage/surplus) |
| `GET` | `/api/v1/operations/queue` | List pending operational queue items |
| `POST` | `/api/v1/operations/queue/:id/validate` | Validate and commit queue item to live ledger |
| `GET` | `/api/v1/warehouses/config` | Facility zones, rack layout, and storage bins |
| `PUT` | `/api/v1/warehouses/bins/:binId/lock` | Lock or unlock a storage bin |
| `GET` | `/api/v1/analytics/stockout-risks` | AI stockout risk calculations and burn rates |
| `GET` | `/api/v1/analytics/reorder-suggestions` | Wilson EOQ replenishment calculations |
| `GET` | `/api/v1/analytics/forecast/:sku` | 7-day Bayesian time-series demand forecast |
| `GET` | `/api/v1/analytics/anomalies` | Shrinkage spikes and capacity bottleneck alerts |
| `POST` | `/api/v1/auth/login` | Authenticate user credentials and return session token |
| `GET` | `/api/v1/auth/me` | Current authenticated session profile |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)

### Installation & Running Locally

1. Clone this repository:
   ```bash
   git clone https://github.com/rifathhassan10-ctrl/stocksense-inventory-management.git
   cd stocksense-inventory-management
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application (Node.js/Express backend + Web App):
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```text
   http://localhost:3000
   ```

---

## 📂 Project Structure

```text
StockSense/
├── assets/                 # Brand SVG logos and vector assets
├── css/
│   └── custom.css          # Custom styling, fonts, scrollbars, and print layout
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Header.js       # Top navigation, global search, facility switcher
│   │   ├── Sidebar.js      # Main navigation, operations accordion, system status
│   │   ├── Toast.js        # Real-time feedback notifications
│   │   └── Modals.js       # Goods receipt, transfer, adjustment & product modals
│   ├── services/
│   │   ├── apiService.js   # Live REST API service with resilient fallback
│   │   └── mlService.js    # ML forecasting, Wilson EOQ, and anomaly engine
│   ├── store/
│   │   ├── dataStore.js    # Reactive state store with pub/sub event bus
│   │   └── mockData.js     # Standardized ERP dataset & Stitch scenarios
│   ├── views/              # Page views matching Stitch screens
│   │   ├── LoginView.js    # Multi-provider enterprise authentication screen
│   │   ├── DashboardView.js# ERP executive dashboard & telemetry
│   │   ├── ProductsView.js # Products grid & dense list matrix
│   │   ├── OperationsView.js# Receipts, deliveries, transfers, adjustments
│   │   ├── StockLedgerView.js# Double-entry ledger & cryptographic drawers
│   │   ├── WarehousesView.js# Facility zones, racks, and interactive bin telemetry
│   │   ├── AnalyticsView.js# 7-day demand forecasting & Wilson EOQ engine
│   │   └── AlertsView.js   # Active exception monitoring & quick reorders
│   └── app.js              # SPA Router coordinator and lifecycle manager
├── index.html              # Single page entry point with Tailwind theme tokens
├── package.json            # Node.js project manifest & scripts
├── server.js               # Node.js / Express full REST API backend server
├── .gitignore              # Git ignore rules for node_modules, logs, and env files
└── README.md               # Documentation & API reference
```

---

## 📄 License

This project was built for the StockSense Hackathon. MIT License.
