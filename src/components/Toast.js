// StockSense Live Toast Notification System
// Matches Stitch Visual Feedback Simulation

export function renderToastContainer() {
  return `
    <div id="liveToast" class="fixed bottom-6 right-6 z-50 transform translate-y-6 opacity-0 pointer-events-none transition-all duration-300 max-w-md">
      <div id="toastBox" class="flex items-center gap-3 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-lg shadow-xl border-l-4 border-status-success">
        <span id="toastIcon" class="material-symbols-outlined text-status-success text-[22px] fill-1 shrink-0">check_circle</span>
        <div class="flex flex-col text-left pr-2 overflow-hidden">
          <span id="toastTitle" class="font-headline-sm text-body-sm text-inverse-on-surface font-semibold tracking-tight truncate">Ledger Synchronized</span>
          <span id="toastMessage" class="font-tabular-data text-body-sm text-surface-dim line-clamp-2">Receipt #REC-2025-089 validated: Stock updated (+100 kg SR001).</span>
        </div>
        <button 
          aria-label="Dismiss Notification" 
          class="ml-auto text-tertiary-fixed-dim hover:text-white transition-colors p-1"
          onclick="window.hideToast()"
        >
          <span class="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>
    </div>
  `;
}

let toastTimer = null;

export function showToast(title, message, type = 'success') {
  const toast = document.getElementById('liveToast');
  const box = document.getElementById('toastBox');
  const icon = document.getElementById('toastIcon');
  const titleEl = document.getElementById('toastTitle');
  const msgEl = document.getElementById('toastMessage');

  if (!toast || !box) return;

  if (titleEl) titleEl.innerText = title;
  if (msgEl) msgEl.innerText = message;

  // Set colors based on type
  if (type === 'error' || type === 'danger') {
    box.className = 'flex items-center gap-3 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-lg shadow-xl border-l-4 border-status-danger';
    if (icon) {
      icon.innerText = 'error';
      icon.className = 'material-symbols-outlined text-status-danger text-[22px] fill-1 shrink-0';
    }
  } else if (type === 'warning') {
    box.className = 'flex items-center gap-3 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-lg shadow-xl border-l-4 border-status-warning';
    if (icon) {
      icon.innerText = 'warning';
      icon.className = 'material-symbols-outlined text-status-warning text-[22px] fill-1 shrink-0';
    }
  } else if (type === 'info') {
    box.className = 'flex items-center gap-3 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-lg shadow-xl border-l-4 border-status-info';
    if (icon) {
      icon.innerText = 'info';
      icon.className = 'material-symbols-outlined text-status-info text-[22px] fill-1 shrink-0';
    }
  } else {
    box.className = 'flex items-center gap-3 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-lg shadow-xl border-l-4 border-status-success';
    if (icon) {
      icon.innerText = 'check_circle';
      icon.className = 'material-symbols-outlined text-status-success text-[22px] fill-1 shrink-0';
    }
  }

  toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-6');
  toast.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    hideToast();
  }, 4500);
}

export function hideToast() {
  const toast = document.getElementById('liveToast');
  if (!toast) return;
  toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-6');
  toast.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
}

// Make accessible to inline onclick handlers
window.showToast = showToast;
window.hideToast = hideToast;
