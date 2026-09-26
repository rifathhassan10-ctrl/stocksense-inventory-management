// StockSense Universal Multi-Provider Enterprise Login View
// Faithfully matches Stitch Screen c031b3bb2bb044d3939d83a8a6c5d13c

import { showToast } from '../components/Toast.js';

let activeLoginTab = 'email';

export function renderLoginView() {
  return `
    <div class="min-h-screen flex flex-col lg:flex-row w-full bg-white font-sans text-slate-900 antialiased selection:bg-primary selection:text-white">
      <!-- LEFT AUTHENTICATION CONTAINER -->
      <main class="w-full lg:w-[54%] xl:w-[50%] flex flex-col justify-between px-6 sm:px-12 md:px-16 xl:px-24 py-8 lg:py-12 bg-white relative z-10 overflow-y-auto" data-purpose="auth-pane">
        <div>
          <!-- Top Brand Bar -->
          <div class="flex items-center justify-between gap-4 mb-8">
            <!-- Logo & Brand Wordmark -->
            <a href="#/dashboard" class="flex items-center gap-3 group">
              <img alt="StockSense Logo" class="w-10 h-10 rounded-xl shadow-sm border border-slate-200/80 object-contain p-1 bg-white group-hover:scale-105 transition-transform" src="./assets/logo.svg" />
              <div class="flex items-center gap-2">
                <span class="text-xl font-extrabold tracking-tight text-slate-900">StockSense</span>
                <span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-200">v2.4 Enterprise</span>
              </div>
            </a>

            <!-- Status Indicator Pill -->
            <div class="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200" title="All supply chain telemetry nodes active">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Cluster: Synced &amp; Healthy</span>
            </div>
          </div>

          <!-- Heading Section -->
          <div class="space-y-2 mb-8">
            <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Sign in to Inventory Control</h1>
            <p class="text-sm sm:text-base text-slate-500 leading-relaxed">
              Multi-location ledger audits, real-time pick/pack logistics, and critical replenishment alerts.
            </p>
          </div>

          <!-- FAST FEDERATED LOGINS -->
          <div class="space-y-3" data-purpose="federated-providers">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <!-- Google Login Button -->
              <button class="flex items-center justify-center gap-2.5 px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 text-xs font-semibold transition shadow-sm active:scale-[0.99] btnFederatedLogin" data-provider="Google Workspace" type="button">
                <svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                  <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z" fill="#4285F4"></path>
                  <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.41 7.34 24 12 24z" fill="#34A853"></path>
                  <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.97 0 12s.45 3.84 1.24 5.42l4.04-3.15z" fill="#FBBC05"></path>
                  <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.59 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335"></path>
                </svg>
                <span>Google</span>
              </button>

              <!-- Microsoft 365 / Azure AD Login Button -->
              <button class="flex items-center justify-center gap-2.5 px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 text-xs font-semibold transition shadow-sm active:scale-[0.99] btnFederatedLogin" data-provider="Microsoft Azure AD" type="button">
                <svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 21 21">
                  <rect fill="#F25022" height="9" width="9" x="1" y="1"></rect>
                  <rect fill="#7FBA00" height="9" width="9" x="11" y="1"></rect>
                  <rect fill="#00A4EF" height="9" width="9" x="1" y="11"></rect>
                  <rect fill="#FFB900" height="9" width="9" x="11" y="11"></rect>
                </svg>
                <span>Microsoft 365</span>
              </button>

              <!-- Apple ID Login Button -->
              <button class="flex items-center justify-center gap-2.5 px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 text-xs font-semibold transition shadow-sm active:scale-[0.99] btnFederatedLogin" data-provider="Apple Business ID" type="button">
                <svg class="w-4 h-4 flex-shrink-0 fill-current text-slate-900" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.63 1.35-.56.64-1.06 1.7-0.93 2.71 1 .08 2.02-.46 2.64-1.21z"></path>
                </svg>
                <span>Apple ID</span>
              </button>
            </div>
          </div>

          <!-- Divider -->
          <div class="relative my-6">
            <div aria-hidden="true" class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-slate-200"></div>
            </div>
            <div class="relative flex justify-center text-xs uppercase tracking-wider">
              <span class="bg-white px-3 text-slate-400 font-medium">or choose authentication method</span>
            </div>
          </div>

          <!-- NAVIGATION TABS SWITCHER -->
          <div class="bg-slate-100/90 p-1 rounded-xl flex gap-1 mb-6 border border-slate-200/60" data-purpose="auth-tabs">
            <button class="flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all duration-150 flex items-center justify-center gap-1.5 ${activeLoginTab === 'email' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}" id="tab-btn-email" type="button">
              <svg class="w-4 h-4 ${activeLoginTab === 'email' ? 'text-primary' : 'text-slate-500'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
              </svg>
              <span>Email &amp; Key</span>
            </button>
            <button class="flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all duration-150 flex items-center justify-center gap-1.5 ${activeLoginTab === 'phone' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}" id="tab-btn-phone" type="button">
              <svg class="w-4 h-4 ${activeLoginTab === 'phone' ? 'text-primary' : 'text-slate-500'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
              </svg>
              <span>SMS OTP</span>
            </button>
            <button class="flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all duration-150 flex items-center justify-center gap-1.5 ${activeLoginTab === 'sso' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}" id="tab-btn-sso" type="button">
              <svg class="w-4 h-4 ${activeLoginTab === 'sso' ? 'text-primary' : 'text-slate-500'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
              </svg>
              <span>SAML / SSO</span>
            </button>
          </div>

          <!-- FORMS CONTAINER -->
          <div id="loginFormsContainer">
            <!-- TAB 1: Work Email & Password -->
            <div class="${activeLoginTab === 'email' ? '' : 'hidden'} space-y-4" id="content-email">
              <form id="formEmailLogin" class="space-y-4">
                <!-- Email Input -->
                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5" for="work-email">Work Email Address</label>
                  <div class="relative rounded-lg shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                      </svg>
                    </div>
                    <input class="block w-full rounded-lg border border-slate-300 pl-9 pr-3 text-sm placeholder-slate-400 focus:border-primary focus:ring-1 focus:ring-primary py-2.5 font-medium bg-white" id="work-email" placeholder="username@enterprise.com" required="" type="email" value="alex.rivera@stocksense.io" />
                  </div>
                </div>

                <!-- Password Input -->
                <div>
                  <div class="flex items-center justify-between mb-1.5">
                    <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider" for="work-password">Master Password</label>
                    <a class="text-xs font-medium text-primary hover:underline transition" href="#/login" onclick="event.preventDefault(); window.triggerToast('Password Recovery', 'Recovery key dispatched to administrator terminal.', 'info');">Forgot access key?</a>
                  </div>
                  <div class="relative rounded-lg shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                      </svg>
                    </div>
                    <input class="block w-full rounded-lg border border-slate-300 pl-9 pr-10 text-sm placeholder-slate-400 focus:border-primary focus:ring-1 focus:ring-primary py-2.5 font-medium bg-white" id="work-password" placeholder="Enter secure passphrase" required="" type="password" value="••••••••••••" />
                    <button class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600" id="btnTogglePassword" type="button">
                      <svg class="h-4 w-4" fill="none" id="eye-icon" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Terminal & Remember Session -->
                <div class="flex items-center justify-between pt-1">
                  <label class="flex items-center gap-2 cursor-pointer select-none">
                    <input checked="" class="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
                    <span class="text-xs text-slate-600">Keep terminal authorized (30 days)</span>
                  </label>
                  <span class="inline-flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                    <svg class="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" fill-rule="evenodd"></path>
                    </svg>
                    TLS 1.3 256-bit
                  </span>
                </div>

                <!-- Submit Button -->
                <button class="w-full flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary-hover active:scale-[0.99] px-4 py-3 text-sm font-bold text-white shadow-md shadow-primary/25 transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" id="submit-btn" type="submit">
                  <span>Sign In to Inventory Console</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                  </svg>
                </button>
              </form>
            </div>

            <!-- TAB 2: Phone Number OTP -->
            <div class="${activeLoginTab === 'phone' ? '' : 'hidden'} space-y-4" id="content-phone">
              <form id="formOtpLogin" class="space-y-4">
                <!-- Phone Number Input with Country Code -->
                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5" for="phone-number">Registered Handheld / Mobile</label>
                  <div class="relative rounded-lg shadow-sm flex">
                    <div class="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 text-slate-600 text-xs font-semibold gap-1.5">
                      <span>🇺🇸 +1</span>
                      <svg class="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                      </svg>
                    </div>
                    <input class="block w-full rounded-none rounded-r-lg border border-slate-300 text-sm placeholder-slate-400 focus:border-primary focus:ring-1 focus:ring-primary py-2.5 font-medium px-3 bg-white" id="phone-number" placeholder="(555) 000-0000" type="tel" value="(555) 382-9014" />
                  </div>
                </div>

                <!-- 6-digit OTP Box -->
                <div>
                  <div class="flex items-center justify-between mb-1.5">
                    <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">6-Digit SMS Passcode</label>
                    <span class="text-xs text-primary font-medium cursor-pointer hover:underline" onclick="window.triggerToast('OTP Resent', 'New verification code sent via SMS gateway.', 'info')">Resend code in 42s</span>
                  </div>
                  <div class="grid grid-cols-6 gap-2">
                    <input class="text-center font-bold text-slate-900 text-lg rounded-lg border border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary py-2 bg-slate-50" maxlength="1" type="text" value="8" />
                    <input class="text-center font-bold text-slate-900 text-lg rounded-lg border border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary py-2 bg-slate-50" maxlength="1" type="text" value="3" />
                    <input class="text-center font-bold text-slate-900 text-lg rounded-lg border border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary py-2 bg-slate-50" maxlength="1" type="text" value="9" />
                    <input class="text-center font-bold text-slate-900 text-lg rounded-lg border border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary py-2 bg-slate-50" maxlength="1" type="text" value="2" />
                    <input class="text-center font-bold text-slate-900 text-lg rounded-lg border-2 border-primary ring-2 ring-primary/20 py-2 bg-white" maxlength="1" type="text" value="7" />
                    <input class="text-center font-bold text-slate-900 text-lg rounded-lg border border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary py-2 bg-slate-50" maxlength="1" type="text" value="4" />
                  </div>
                </div>

                <!-- Biometric Alternative -->
                <div class="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <div class="p-2 rounded-md bg-white border border-slate-200 text-slate-700">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 004 11m0 0a8 8 0 00.99 4.128" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                      </svg>
                    </div>
                    <div>
                      <p class="text-xs font-semibold text-slate-800">Warehouse Passkey / FIDO2</p>
                      <p class="text-[11px] text-slate-500">Touch YubiKey or scan FaceID scanner</p>
                    </div>
                  </div>
                  <button class="text-xs font-semibold text-primary hover:text-primary-hover border border-slate-200 bg-white hover:bg-slate-50 px-2.5 py-1.5 rounded-md transition shadow-sm" type="button" onclick="window.triggerToast('Hardware Passkey', 'FIDO2 security key recognized. Authorizing...', 'success'); setTimeout(() => window.location.hash='#/dashboard', 800)">
                    Scan Key
                  </button>
                </div>

                <button class="w-full flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary-hover active:scale-[0.99] px-4 py-3 text-sm font-bold text-white shadow-md shadow-primary/25 transition" type="submit">
                  <span>Verify OTP &amp; Authorize Handheld</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                  </svg>
                </button>
              </form>
            </div>

            <!-- TAB 3: SAML / Okta / Azure SSO -->
            <div class="${activeLoginTab === 'sso' ? '' : 'hidden'} space-y-4" id="content-sso">
              <form id="formSsoLogin" class="space-y-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5" for="org-domain">Enterprise Workspace Slug or Domain</label>
                  <div class="relative rounded-lg shadow-sm flex items-center">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                      </svg>
                    </div>
                    <input class="block w-full rounded-lg border border-slate-300 pl-9 pr-28 text-sm placeholder-slate-400 focus:border-primary focus:ring-1 focus:ring-primary py-2.5 font-medium bg-white" id="org-domain" placeholder="company-subdomain" type="text" value="logistics-us-east" />
                    <span class="absolute right-3 text-xs font-medium text-slate-400 select-none">.stocksense.io</span>
                  </div>
                  <p class="mt-1 text-[11px] text-slate-400">Routes to your corporate identity provider (Okta, Ping Identity, CyberArk).</p>
                </div>

                <!-- SSO Certificate Notice -->
                <div class="p-3 rounded-lg bg-blue-50/70 border border-blue-200/80 flex items-start gap-2.5">
                  <svg class="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                  </svg>
                  <div class="text-xs text-blue-800 leading-relaxed">
                    Single Sign-On enforces mandatory hardware-bound multi-factor authentication (FIPS 140-2 Level 3).
                  </div>
                </div>

                <button class="w-full flex items-center justify-center gap-2 rounded-lg bg-slate-900 hover:bg-slate-800 active:bg-black px-4 py-3 text-sm font-bold text-white shadow-md transition" type="submit">
                  <span>Continue with Identity Provider</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                  </svg>
                </button>
              </form>
            </div>
          </div>

          <!-- QUICK ROLE PERSONA SWITCHER -->
          <div class="mt-6 pt-5 border-t border-slate-200/80" data-purpose="demo-role-quickfill">
            <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Simulated Testing Personas:</p>
            <div class="flex flex-wrap gap-2">
              <button class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold bg-slate-100 hover:bg-blue-50 hover:text-primary text-slate-700 border border-slate-200 transition btnDemoPersona" data-email="alex.rivera@stocksense.io" data-role="Inventory Manager" type="button">
                <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span>Alex Rivera (Inventory Manager)</span>
              </button>
              <button class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold bg-slate-100 hover:bg-blue-50 hover:text-primary text-slate-700 border border-slate-200 transition btnDemoPersona" data-email="operator.dock@stocksense.io" data-role="Warehouse Lead" type="button">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Operator FL-04 (Warehouse Lead)</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Footer Compliance Strip -->
        <footer class="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <div class="flex items-center gap-2">
            <span class="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>StockSense Engine 2.4.99 • FedRAMP &amp; SOC2 Type II</span>
          </div>
          <div class="flex items-center gap-4 text-slate-500 font-medium">
            <a class="hover:text-slate-800 transition" href="#/login" onclick="event.preventDefault(); window.triggerToast('Terminal Setup', 'Terminal hardware configuration manual opened.', 'info')">Terminal Setup</a>
            <a class="hover:text-slate-800 transition" href="#/login" onclick="event.preventDefault(); window.triggerToast('Security Protocol', 'Enterprise TLS 1.3 protocol: SHA-256 state chain enforced.', 'info')">Security Protocol</a>
            <a class="hover:text-slate-800 transition" href="#/login" onclick="event.preventDefault(); window.triggerToast('NOC Support', 'NOC dispatch hotline: +1 (800) 555-0199 (24/7).', 'info')">NOC Support</a>
          </div>
        </footer>
      </main>

      <!-- RIGHT SHOWCASE PANEL (TELEMETRY SHOWCASE) -->
      <aside class="hidden lg:flex lg:w-[46%] xl:w-[50%] bg-slate-900 relative overflow-hidden flex-col justify-between p-10 xl:p-14 text-white bg-grid-pattern" data-purpose="telemetry-showcase">
        <!-- Decorative Gradient Glows -->
        <div class="absolute -top-32 -right-32 w-96 h-96 bg-primary/30 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <!-- Top Header Section in Right Panel -->
        <div class="relative z-10">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 backdrop-blur-md text-xs font-medium text-slate-300 mb-6">
            <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span>Real-time Telemetry Engine • Zero Stock Drift</span>
          </div>
          <h2 class="text-2xl xl:text-3xl font-bold tracking-tight text-white leading-snug">
            High-Velocity Multi-Location Warehouse Intelligence
          </h2>
          <p class="mt-3 text-sm text-slate-400 max-w-lg leading-relaxed">
            Centralized ledger tracking with instantaneous receipts, automated replenishment, and multi-bay audit trails.
          </p>
        </div>

        <!-- Center Showcase Cards (Mocking Live Dashboard Elements) -->
        <div class="relative z-10 space-y-4 my-8 max-w-md w-full">
          <!-- Live Ledger Card -->
          <div class="bg-slate-800/90 border border-slate-700/80 rounded-xl p-4 shadow-xl backdrop-blur-md">
            <div class="flex items-center justify-between pb-3 mb-3 border-b border-slate-700/70">
              <div class="flex items-center gap-2">
                <span class="p-1.5 rounded bg-primary/20 text-primary">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                  </svg>
                </span>
                <span class="text-xs font-semibold text-white">Immutable Ledger Feed</span>
              </div>
              <span class="text-[10px] font-mono uppercase bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded">SHA-256 Verified</span>
            </div>
            <div class="space-y-2.5 text-xs">
              <div class="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/40">
                <div>
                  <p class="font-semibold text-slate-200">Steel Rod (SKU: SR001)</p>
                  <p class="text-[11px] text-slate-400">Receipt #REC-2025-089 • Dock Gate 3</p>
                </div>
                <span class="text-emerald-400 font-bold font-mono">+100 kg</span>
              </div>
              <div class="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/40">
                <div>
                  <p class="font-semibold text-slate-200">Delivery #CUST-44</p>
                  <p class="text-[11px] text-slate-400">Production Floor • Rack A Staging</p>
                </div>
                <span class="text-rose-400 font-bold font-mono">-20 kg</span>
              </div>
            </div>
          </div>

          <!-- Metric Pulse Snapshot -->
          <div class="grid grid-cols-2 gap-3">
            <div class="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3.5 backdrop-blur-md">
              <span class="text-[11px] text-slate-400 font-medium">Volumetric Bay Load</span>
              <div class="mt-2 flex items-baseline justify-between">
                <span class="text-xl font-bold text-white">84%</span>
                <span class="text-[11px] text-amber-400 font-semibold">Near Buffer</span>
              </div>
              <div class="mt-2 w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
                <div class="bg-primary h-1.5 rounded-full" style="width: 84%"></div>
              </div>
            </div>
            <div class="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3.5 backdrop-blur-md">
              <span class="text-[11px] text-slate-400 font-medium">Weekly Inbound Velocity</span>
              <div class="mt-2 flex items-baseline justify-between">
                <span class="text-xl font-bold text-white">1,420</span>
                <span class="text-[11px] text-emerald-400 font-semibold">+12% net</span>
              </div>
              <div class="mt-2 flex items-end gap-1 h-3">
                <span class="w-1/5 bg-slate-600 h-2 rounded-t"></span>
                <span class="w-1/5 bg-slate-600 h-2.5 rounded-t"></span>
                <span class="w-1/5 bg-slate-600 h-1.5 rounded-t"></span>
                <span class="w-1/5 bg-slate-600 h-2 rounded-t"></span>
                <span class="w-1/5 bg-primary h-3 rounded-t"></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Trust Badge & Testimonial -->
        <div class="relative z-10 pt-4 border-t border-slate-800">
          <p class="text-xs text-slate-400 leading-relaxed italic">
            “StockSense reduced our cross-dock inventory shrinkage to 0.02% while synchronizing 32 regional distribution centers seamlessly.”
          </p>
          <div class="mt-3 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-7 h-7 rounded-full bg-primary flex items-center justify-center font-bold text-white text-xs">
                AR
              </div>
              <div>
                <p class="text-xs font-semibold text-white">Alex Rivera</p>
                <p class="text-[10px] text-slate-400">VP of Logistics • FastLogix Group</p>
              </div>
            </div>
            <div class="text-[11px] text-slate-500 font-medium">
              450+ Active Logistics Hubs
            </div>
          </div>
        </div>
      </aside>
    </div>
  `;
}

export function initLoginViewEvents() {
  // Switch tabs
  const tabKeys = ['email', 'phone', 'sso'];
  tabKeys.forEach(key => {
    const btn = document.getElementById(`tab-btn-${key}`);
    if (btn) {
      btn.addEventListener('click', () => {
        activeLoginTab = key;
        tabKeys.forEach(k => {
          const b = document.getElementById(`tab-btn-${k}`);
          const c = document.getElementById(`content-${k}`);
          if (k === key) {
            b.className = "flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all duration-150 flex items-center justify-center gap-1.5 bg-white text-slate-900 shadow-sm";
            const svg = b.querySelector('svg');
            if (svg) svg.classList.add('text-primary');
            if (c) c.classList.remove('hidden');
          } else {
            b.className = "flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all duration-150 flex items-center justify-center gap-1.5 text-slate-600 hover:text-slate-900";
            const svg = b.querySelector('svg');
            if (svg) svg.classList.remove('text-primary');
            if (c) c.classList.add('hidden');
          }
        });
      });
    }
  });

  // Password toggle
  const toggleBtn = document.getElementById('btnTogglePassword');
  const passInput = document.getElementById('work-password');
  if (toggleBtn && passInput) {
    toggleBtn.addEventListener('click', () => {
      passInput.type = passInput.type === 'password' ? 'text' : 'password';
    });
  }

  // Federated Logins
  document.querySelectorAll('.btnFederatedLogin').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const provider = e.currentTarget.dataset.provider;
      showToast('Federated Authentication', `Handshake initiated with ${provider}...`, 'info');
      simulateAuthAndRedirect();
    });
  });

  // Demo Persona Switcher
  document.querySelectorAll('.btnDemoPersona').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const email = e.currentTarget.dataset.email;
      const role = e.currentTarget.dataset.role;
      // Switch to email tab
      const emailTabBtn = document.getElementById('tab-btn-email');
      if (emailTabBtn) emailTabBtn.click();

      const emailField = document.getElementById('work-email');
      if (emailField) {
        emailField.value = email;
        emailField.classList.add('ring-2', 'ring-primary');
        setTimeout(() => emailField.classList.remove('ring-2', 'ring-primary'), 600);
      }
      showToast('Persona Loaded', `Active credentials: ${email} (${role})`);
    });
  });

  // Email form submit
  const formEmail = document.getElementById('formEmailLogin');
  if (formEmail) {
    formEmail.addEventListener('submit', (e) => {
      e.preventDefault();
      simulateAuthAndRedirect();
    });
  }

  // Phone form submit
  const formOtp = document.getElementById('formOtpLogin');
  if (formOtp) {
    formOtp.addEventListener('submit', (e) => {
      e.preventDefault();
      simulateAuthAndRedirect();
    });
  }

  // SSO form submit
  const formSso = document.getElementById('formSsoLogin');
  if (formSso) {
    formSso.addEventListener('submit', (e) => {
      e.preventDefault();
      simulateAuthAndRedirect();
    });
  }
}

function simulateAuthAndRedirect() {
  const submitBtn = document.getElementById('submit-btn');
  if (submitBtn) {
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>Authenticating terminal...</span>
    `;
    submitBtn.disabled = true;
  }

  setTimeout(() => {
    showToast('Terminal Handshake Approved', 'Welcome back, Alex Rivera. Redirecting to ERP Dashboard...', 'success');
    if (submitBtn) {
      submitBtn.innerHTML = `
        <svg class="w-4 h-4 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>Access Granted</span>
      `;
      submitBtn.classList.remove('bg-primary', 'hover:bg-primary-hover');
      submitBtn.classList.add('bg-emerald-600');
    }

    setTimeout(() => {
      window.location.hash = '#/dashboard';
    }, 700);
  }, 800);
}
