// StockSense Enterprise Administration & Access Control (RBAC) View
// Faithfully matches Stitch "Precision Slate ERP" Visual Specification

import { showToast } from '../components/Toast.js';

let systemUsers = [
  {
    id: 'usr-admin-01',
    name: 'Alex Rivera',
    email: 'alex.rivera@stocksense.io',
    role: 'ADMIN',
    roleTitle: 'Inventory Manager & System Admin',
    badge: 'ADM-01',
    facility: 'WH-02 Main Hub',
    status: 'ACTIVE',
    lastActive: 'Just now',
    securityClearance: 'FIPS 140-2 Level 3 (Superuser)'
  },
  {
    id: 'usr-emp-02',
    name: 'Marcus Vance (FL-04)',
    email: 'operator.dock@stocksense.io',
    role: 'EMPLOYEE',
    roleTitle: 'Warehouse Lead & Operations',
    badge: 'OP-04',
    facility: 'Bay A-F Logistics Dock',
    status: 'ACTIVE',
    lastActive: '12 mins ago',
    securityClearance: 'Terminal Authorized (Operations)'
  },
  {
    id: 'usr-auditor-03',
    name: 'Elena Rostova',
    email: 'auditor@stocksense.io',
    role: 'AUDITOR',
    roleTitle: 'Chief Compliance Auditor (SOC2)',
    badge: 'AUD-09',
    facility: 'Corporate Compliance Node',
    status: 'ACTIVE',
    lastActive: '1 hour ago',
    securityClearance: 'Read-Only Cryptographic Audit'
  }
];

export function renderAdminView() {
  const currentUser = JSON.parse(localStorage.getItem('stocksense_user') || '{"name":"Alex Rivera","role":"ADMIN"}');
  const isAdmin = currentUser.role === 'ADMIN';

  return `
    <div class="space-y-space-lg">
      <!-- Breadcrumbs & Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-space-md border-b border-border-subtle pb-space-md">
        <div>
          <div class="flex items-center gap-space-xs text-body-sm font-body-sm text-tertiary mb-1">
            <a href="#/dashboard" class="hover:text-primary transition-colors">Dashboard</a>
            <span class="material-symbols-outlined text-[14px]">chevron_right</span>
            <span class="text-on-surface font-medium">Administration</span>
            <span class="material-symbols-outlined text-[14px]">chevron_right</span>
            <span class="text-primary font-medium">RBAC &amp; System Policies</span>
          </div>
          <div class="flex items-center gap-space-sm flex-wrap">
            <h1 class="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">Enterprise Administration &amp; Access Control</h1>
            <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-sm font-semibold bg-primary/10 text-primary border border-primary/20">
              <span class="material-symbols-outlined text-[14px]">shield_person</span>
              ${currentUser.role} CONSOLE
            </span>
          </div>
          <p class="font-body-md text-body-md text-on-surface-variant mt-0.5">
            Role-Based Access Control (RBAC), multi-facility credential auditing, and immutable ERP inventory guardrail enforcement.
          </p>
        </div>

        <div class="flex items-center gap-space-sm flex-wrap">
          <button id="btnProvisionUser" class="h-9 px-space-md bg-primary text-white font-label-md text-label-md font-semibold rounded hover:bg-primary-hover transition-colors flex items-center gap-space-xs shadow-sm">
            <span class="material-symbols-outlined text-[18px]">person_add</span>
            <span>+ Provision System Operator</span>
          </button>
          <button id="btnExportAuditLog" class="h-9 px-space-md bg-surface-card border border-border-subtle text-on-surface font-label-md text-label-md font-semibold rounded hover:bg-surface-subtle transition-colors flex items-center gap-space-xs shadow-sm" onclick="window.print()">
            <span class="material-symbols-outlined text-[18px]">print</span>
            <span>Print Compliance Report</span>
          </button>
        </div>
      </div>

      <!-- Top Metric Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        <div class="bg-surface-card border border-border-subtle rounded-md p-space-md shadow-sm">
          <div class="flex items-center justify-between">
            <span class="font-label-md text-label-md text-tertiary uppercase tracking-wider font-semibold">Active Operators</span>
            <div class="p-2 rounded bg-primary/10 text-primary">
              <span class="material-symbols-outlined text-[20px]">badge</span>
            </div>
          </div>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="font-headline-lg text-headline-lg font-bold text-on-surface font-tabular-data">${systemUsers.length}</span>
            <span class="font-label-sm text-label-sm text-tertiary">terminals online</span>
          </div>
          <div class="mt-2 text-label-sm font-semibold text-status-success flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-status-success"></span>
            <span>1 Admin, 1 Employee, 1 Auditor</span>
          </div>
        </div>

        <div class="bg-surface-card border border-border-subtle rounded-md p-space-md shadow-sm">
          <div class="flex items-center justify-between">
            <span class="font-label-md text-label-md text-tertiary uppercase tracking-wider font-semibold">Security Clearance</span>
            <div class="p-2 rounded bg-status-success-bg text-status-success">
              <span class="material-symbols-outlined text-[20px]">verified_user</span>
            </div>
          </div>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="font-headline-lg text-headline-lg font-bold text-on-surface font-tabular-data">Level 3</span>
            <span class="font-label-sm text-label-sm text-tertiary">FIPS 140-2</span>
          </div>
          <div class="mt-2 text-label-sm font-semibold text-tertiary">
            <span>Hardware MFA &amp; TLS 1.3 Active</span>
          </div>
        </div>

        <div class="bg-surface-card border border-border-subtle rounded-md p-space-md shadow-sm">
          <div class="flex items-center justify-between">
            <span class="font-label-md text-label-md text-tertiary uppercase tracking-wider font-semibold">Policy Guardrails</span>
            <div class="p-2 rounded bg-surface-container text-primary">
              <span class="material-symbols-outlined text-[20px]">policy</span>
            </div>
          </div>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="font-headline-lg text-headline-lg font-bold text-on-surface font-tabular-data">4 Enforced</span>
            <span class="font-label-sm text-label-sm text-tertiary">hard invariants</span>
          </div>
          <div class="mt-2 text-label-sm font-semibold text-status-success">
            <span>Zero Negative Stock Permitted</span>
          </div>
        </div>

        <div class="bg-surface-card border border-border-subtle rounded-md p-space-md shadow-sm">
          <div class="flex items-center justify-between">
            <span class="font-label-md text-label-md text-tertiary uppercase tracking-wider font-semibold">Current Session</span>
            <div class="p-2 rounded bg-primary/10 text-primary">
              <span class="material-symbols-outlined text-[20px]">person</span>
            </div>
          </div>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="font-body-lg text-body-lg font-bold text-on-surface truncate">${currentUser.name || 'Alex Rivera'}</span>
          </div>
          <div class="mt-2 text-label-sm font-semibold text-primary">
            <span>Role: ${currentUser.role || 'ADMIN'}</span>
          </div>
        </div>
      </div>

      <!-- SECTION 1: SYSTEM USER DIRECTORY -->
      <div class="bg-surface-card border border-border-subtle rounded-md shadow-sm overflow-hidden">
        <div class="p-space-md border-b border-border-subtle flex flex-col sm:flex-row sm:items-center sm:justify-between gap-space-sm bg-surface-subtle">
          <div>
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[20px] text-primary">manage_accounts</span>
              <h2 class="font-headline-sm text-headline-sm font-bold text-on-surface">System Users &amp; Terminal Operators</h2>
            </div>
            <p class="font-body-sm text-body-sm text-on-surface-variant">
              Authorized credentials for administrators, warehouse operators, and third-party compliance auditors.
            </p>
          </div>
          <span class="font-label-sm text-label-sm font-semibold px-2.5 py-1 rounded bg-surface-card border border-border-subtle text-tertiary">
            Multi-Tenant Facility WH-02
          </span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse font-body-sm">
            <thead>
              <tr class="bg-surface-card border-b border-border-subtle">
                <th class="py-3 px-space-md font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold">User &amp; Credentials</th>
                <th class="py-3 px-space-md font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold">System Role</th>
                <th class="py-3 px-space-md font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold">Assigned Node</th>
                <th class="py-3 px-space-md font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold">Terminal Badge</th>
                <th class="py-3 px-space-md font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold">Security Clearance</th>
                <th class="py-3 px-space-md font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border-subtle">
              ${systemUsers.map(user => {
                const isAdminRole = user.role === 'ADMIN';
                const isEmployeeRole = user.role === 'EMPLOYEE';
                const badgeClass = isAdminRole 
                  ? 'bg-primary/10 text-primary border-primary/20' 
                  : (isEmployeeRole ? 'bg-status-success-bg text-status-success border-status-success/30' : 'bg-surface-subtle text-tertiary border-border-subtle');

                return `
                  <tr class="hover:bg-surface-subtle transition-colors">
                    <td class="py-3.5 px-space-md">
                      <div class="flex items-center gap-3">
                        <div class="w-9 h-9 rounded-full ${isAdminRole ? 'bg-primary text-white' : (isEmployeeRole ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-white')} flex items-center justify-center font-bold text-xs">
                          ${user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </div>
                        <div>
                          <div class="font-bold text-on-surface">${user.name}</div>
                          <div class="text-tertiary font-tabular-data text-body-sm">${user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td class="py-3.5 px-space-md">
                      <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-sm font-bold uppercase border ${badgeClass}">
                        ${user.role}
                      </span>
                      <div class="text-[11px] text-tertiary mt-0.5">${user.roleTitle}</div>
                    </td>
                    <td class="py-3.5 px-space-md text-on-surface font-medium">
                      ${user.facility}
                    </td>
                    <td class="py-3.5 px-space-md font-tabular-data font-semibold text-tertiary">
                      <code>${user.badge}</code>
                    </td>
                    <td class="py-3.5 px-space-md">
                      <span class="text-xs text-on-surface-variant font-medium">${user.securityClearance}</span>
                      <div class="text-[11px] text-status-success">Active • ${user.lastActive}</div>
                    </td>
                    <td class="py-3.5 px-space-md text-right">
                      <button class="h-8 px-3 bg-surface-subtle border border-border-subtle hover:bg-surface-container-low text-primary font-label-sm text-label-sm font-semibold rounded transition-colors btnSwitchUserPersona" data-email="${user.email}" data-name="${user.name}" data-role="${user.role}">
                        Switch To
                      </button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- SECTION 2: ROLE-BASED ACCESS CONTROL (RBAC) PERMISSION MATRIX -->
      <div class="bg-surface-card border border-border-subtle rounded-md shadow-sm p-space-lg">
        <div class="flex items-center justify-between pb-space-sm border-b border-border-subtle">
          <div>
            <h2 class="font-headline-sm text-headline-sm font-bold text-on-surface">Role-Based Access Control (RBAC) Matrix</h2>
            <p class="font-body-sm text-body-sm text-on-surface-variant">Enforced access control separating administrative, operational, and auditing duties.</p>
          </div>
          <span class="font-label-sm text-label-sm font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded">ISO 27001 Compliant</span>
        </div>

        <div class="overflow-x-auto mt-space-md">
          <table class="w-full text-left border-collapse text-body-sm">
            <thead>
              <tr class="border-b border-border-subtle bg-surface-subtle">
                <th class="py-2.5 px-4 font-label-sm text-tertiary uppercase font-semibold">ERP System Capability</th>
                <th class="py-2.5 px-4 font-label-sm text-center font-bold text-primary">👑 Admin (Alex Rivera)</th>
                <th class="py-2.5 px-4 font-label-sm text-center font-bold text-status-success">👷 Employee (Marcus Vance)</th>
                <th class="py-2.5 px-4 font-label-sm text-center font-bold text-tertiary">🔍 Auditor (Elena Rostova)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border-subtle font-medium">
              <tr class="hover:bg-surface-subtle">
                <td class="py-3 px-4">Catalog SKU Matrix &amp; Product Creation</td>
                <td class="py-3 px-4 text-center text-status-success"><span class="material-symbols-outlined text-[20px]">check_circle</span></td>
                <td class="py-3 px-4 text-center text-tertiary">Read Only</td>
                <td class="py-3 px-4 text-center text-tertiary">Read Only</td>
              </tr>
              <tr class="hover:bg-surface-subtle">
                <td class="py-3 px-4">Execute Goods Receipts &amp; Dock Intake</td>
                <td class="py-3 px-4 text-center text-status-success"><span class="material-symbols-outlined text-[20px]">check_circle</span></td>
                <td class="py-3 px-4 text-center text-status-success"><span class="material-symbols-outlined text-[20px]">check_circle</span></td>
                <td class="py-3 px-4 text-center text-status-danger"><span class="material-symbols-outlined text-[20px]">block</span></td>
              </tr>
              <tr class="hover:bg-surface-subtle">
                <td class="py-3 px-4">Outbound Delivery Orders &amp; Pick/Pack</td>
                <td class="py-3 px-4 text-center text-status-success"><span class="material-symbols-outlined text-[20px]">check_circle</span></td>
                <td class="py-3 px-4 text-center text-status-success"><span class="material-symbols-outlined text-[20px]">check_circle</span></td>
                <td class="py-3 px-4 text-center text-status-danger"><span class="material-symbols-outlined text-[20px]">block</span></td>
              </tr>
              <tr class="hover:bg-surface-subtle">
                <td class="py-3 px-4">Inter-Facility Bin Relocation Transfers</td>
                <td class="py-3 px-4 text-center text-status-success"><span class="material-symbols-outlined text-[20px]">check_circle</span></td>
                <td class="py-3 px-4 text-center text-status-success"><span class="material-symbols-outlined text-[20px]">check_circle</span></td>
                <td class="py-3 px-4 text-center text-status-danger"><span class="material-symbols-outlined text-[20px]">block</span></td>
              </tr>
              <tr class="hover:bg-surface-subtle">
                <td class="py-3 px-4">Physical Stock Count Adjustments</td>
                <td class="py-3 px-4 text-center text-status-success"><span class="material-symbols-outlined text-[20px]">check_circle</span></td>
                <td class="py-3 px-4 text-center text-status-success"><span class="material-symbols-outlined text-[20px]">check_circle</span></td>
                <td class="py-3 px-4 text-center text-status-danger"><span class="material-symbols-outlined text-[20px]">block</span></td>
              </tr>
              <tr class="hover:bg-surface-subtle">
                <td class="py-3 px-4">Cryptographic Immutable Ledger Verification</td>
                <td class="py-3 px-4 text-center text-status-success"><span class="material-symbols-outlined text-[20px]">check_circle</span></td>
                <td class="py-3 px-4 text-center text-status-danger"><span class="material-symbols-outlined text-[20px]">block</span></td>
                <td class="py-3 px-4 text-center text-status-success"><span class="material-symbols-outlined text-[20px]">check_circle</span></td>
              </tr>
              <tr class="hover:bg-surface-subtle">
                <td class="py-3 px-4">Multi-Warehouse Zone &amp; Bin Architecture Configuration</td>
                <td class="py-3 px-4 text-center text-status-success"><span class="material-symbols-outlined text-[20px]">check_circle</span></td>
                <td class="py-3 px-4 text-center text-status-danger"><span class="material-symbols-outlined text-[20px]">block</span></td>
                <td class="py-3 px-4 text-center text-tertiary">Read Only</td>
              </tr>
              <tr class="hover:bg-surface-subtle">
                <td class="py-3 px-4">AI Wilson EOQ Automated Batch Purchase Approvals</td>
                <td class="py-3 px-4 text-center text-status-success"><span class="material-symbols-outlined text-[20px]">check_circle</span></td>
                <td class="py-3 px-4 text-center text-status-danger"><span class="material-symbols-outlined text-[20px]">block</span></td>
                <td class="py-3 px-4 text-center text-status-danger"><span class="material-symbols-outlined text-[20px]">block</span></td>
              </tr>
              <tr class="hover:bg-surface-subtle">
                <td class="py-3 px-4">System Policy &amp; Security Parameter Governance</td>
                <td class="py-3 px-4 text-center text-status-success"><span class="material-symbols-outlined text-[20px]">check_circle</span></td>
                <td class="py-3 px-4 text-center text-status-danger"><span class="material-symbols-outlined text-[20px]">block</span></td>
                <td class="py-3 px-4 text-center text-status-danger"><span class="material-symbols-outlined text-[20px]">block</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- SECTION 3: SYSTEM GUARDRAILS & POLICIES -->
      <div class="bg-surface-card border border-border-subtle rounded-md shadow-sm p-space-lg">
        <div class="flex items-center justify-between pb-space-sm border-b border-border-subtle">
          <div>
            <h2 class="font-headline-sm text-headline-sm font-bold text-on-surface">Universal ERP Guardrail Policies</h2>
            <p class="font-body-sm text-body-sm text-on-surface-variant">Core business invariants enforced across all inventory mutations and REST API endpoints.</p>
          </div>
          <button id="btnSavePolicies" class="h-8 px-space-md bg-primary text-white font-label-sm text-label-sm font-semibold rounded hover:bg-primary-hover transition-colors">
            Save Policy Toggles
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-space-md mt-space-md">
          <div class="p-space-md rounded border border-border-subtle bg-surface-subtle flex items-start justify-between gap-space-md">
            <div>
              <div class="flex items-center gap-2 font-bold text-on-surface">
                <span class="material-symbols-outlined text-primary text-[18px]">verified</span>
                <span>Strict Negative Stock Protection</span>
              </div>
              <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Disallows delivery orders or outbound movements if the requested quantity exceeds available on-hand balance.
              </p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
              <input type="checkbox" checked class="sr-only peer" />
              <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div class="p-space-md rounded border border-border-subtle bg-surface-subtle flex items-start justify-between gap-space-md">
            <div>
              <div class="flex items-center gap-2 font-bold text-on-surface">
                <span class="material-symbols-outlined text-primary text-[18px]">sync_alt</span>
                <span>Conservation Invariant Validation</span>
              </div>
              <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Internal transfers between locations must strictly conserve total system inventory (Source - Delta = Destination + Delta).
              </p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
              <input type="checkbox" checked class="sr-only peer" />
              <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div class="p-space-md rounded border border-border-subtle bg-surface-subtle flex items-start justify-between gap-space-md">
            <div>
              <div class="flex items-center gap-2 font-bold text-on-surface">
                <span class="material-symbols-outlined text-status-warning text-[18px]">warning</span>
                <span>Dual-Signoff for High Variance Shrinkage</span>
              </div>
              <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Physical adjustments with shrinkage &gt; 3 units or $500 value trigger mandatory manager sign-off.
              </p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
              <input type="checkbox" checked class="sr-only peer" />
              <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div class="p-space-md rounded border border-border-subtle bg-surface-subtle flex items-start justify-between gap-space-md">
            <div>
              <div class="flex items-center gap-2 font-bold text-on-surface">
                <span class="material-symbols-outlined text-status-success text-[18px]">lock</span>
                <span>Immutable SHA-256 Ledger State Chaining</span>
              </div>
              <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Every validated transaction computes a cryptographic state hash linked to previous block for tamper detection.
              </p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
              <input type="checkbox" checked class="sr-only peer" />
              <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initAdminViewEvents() {
  // Provision Operator Button
  const btnProvision = document.getElementById('btnProvisionUser');
  if (btnProvision) {
    btnProvision.addEventListener('click', () => {
      showToast('Operator Provisioning', 'Enter operator badge and employee email to link handheld RFID scanner.', 'info');
    });
  }

  // Save Policy Toggles
  const btnSavePolicies = document.getElementById('btnSavePolicies');
  if (btnSavePolicies) {
    btnSavePolicies.addEventListener('click', () => {
      showToast('Policies Enforced', 'All 4 ERP guardrails updated and broadcast to all warehouse nodes.', 'success');
    });
  }

  // Switch persona buttons
  document.querySelectorAll('.btnSwitchUserPersona').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const email = e.currentTarget.dataset.email;
      const name = e.currentTarget.dataset.name;
      const role = e.currentTarget.dataset.role;

      localStorage.setItem('stocksense_user', JSON.stringify({ email, name, role }));
      localStorage.setItem('stocksense_auth', 'true');
      showToast('Switched Session', `Switched active operator to: ${name} (${role})`, 'success');
      
      setTimeout(() => {
        if (role === 'EMPLOYEE') {
          window.location.hash = '#/operations';
        } else {
          window.location.hash = '#/dashboard';
        }
      }, 500);
    });
  });
}
