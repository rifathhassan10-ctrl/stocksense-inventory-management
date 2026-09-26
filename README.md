# StockSense — Intelligent Inventory Management & Stock Ledger ERP

> Production-grade ERP web application featuring multi-facility storage bin management, immutable double-entry stock ledger, and AI-powered predictive demand forecasting. Built faithfully from Google Stitch design specifications.

---

## 🌟 Key Features

- **📊 ERP Inventory Dashboard (`#/dashboard`)**: 6 core KPIs, facility context filtering, real-time live ledger feed, pending operations queue, and velocity breakdown.
- **📦 Products & SKU Matrix (`#/products`)**: Dual view switcher (Bento Grid vs. Compact Dense List), real-time search, category filtering, and stock depletion gauges.
- **⚡ Inventory Operations Hub (`#/operations/*`)**:
  - **Goods Receipts**: Vendor PO intake with live stock balance preview.
  - **Delivery Orders**: Outbound fulfillment with strict negative-stock protection.
  - **Internal Transfers**: Multi-warehouse transfer pipeline with conservation invariant validation.
  - **Physical Adjustments**: Cycle count variance calculator with instant shrinkage vs. surplus detection.
- **📜 Immutable Stock Ledger (`#/stock-ledger`)**: Double-entry ledger audit trail with expandable cryptographic inspection drawers (SHA-256 state hashes, parent hashes, before/after balances).
- **🏭 Multi-Warehouse Bin Architecture (`#/warehouses`)**: Zone A & B cantilever and automated pallet rack layout with interactive real-time bin telemetry.
- **🧠 Predictive Analytics & ML Intelligence (`#/analytics`)**: 7-day Bayesian time-series demand forecasting with 95% confidence bands, Wilson EOQ replenishment calculations, and shrinkage anomaly detection.
- **🚨 Active Alerts & Risk Monitoring (`#/alerts`)**: Multi-severity exception monitoring with one-click reorder triggers.

---

## 🛠️ Tech Stack

- **Frontend**: Vanilla ES2022 JavaScript (Modular Single Page Application architecture)
- **Styling**: Tailwind CSS configured with the "Precision Slate ERP" color palette
- **Typography**: Plus Jakarta Sans & Inter
- **Icons**: Material Symbols Outlined
- **State Management**: Reactive DataStore with LocalStorage persistence and transaction rollback protection

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)

### Installation & Running Locally

1. Clone this repository:
   ```bash
   git clone <YOUR_GITHUB_REPO_URL>
   cd StockSense
   ```

2. Start the local development server:
   ```bash
   npx serve . -p 3000 -s
   ```
   or with npm:
   ```bash
   npm start
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 📂 Project Structure

```text
StockSense/
├── assets/             # Brand assets & SVG logos
├── css/                # Custom CSS animations & print stylesheets
├── src/
│   ├── components/     # Header, Sidebar, Toast, Modals
│   ├── services/       # API abstraction layer & ML predictive engine
│   ├── store/          # Reactive DataStore & realistic mock dataset
│   ├── views/          # Dashboard, Products, Operations, Ledger, Warehouses, Analytics, Alerts
│   └── app.js          # SPA Router & application coordinator
├── .gitignore
├── index.html          # Application entry point
├── package.json
└── README.md
```

---

## 📄 License

This project was built for the StockSense Hackathon. MIT License.
