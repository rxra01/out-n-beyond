/* ==========================================================================
   OUT N BEYOND CAFE & BISTRO — ADMIN PORTAL & DASHBOARD CONTROLLER
   ========================================================================== */

const AdminController = {
  isAuthenticated: false,
  activeTab: 'overview',
  enteredPin: '',

  init() {
    this.checkSessionAuth();
    this.bindEvents();
    if (this.isAuthenticated) {
      this.renderDashboard();
    }
  },

  checkSessionAuth() {
    if (sessionStorage.getItem('outnbeyond_admin_auth') === 'true') {
      this.isAuthenticated = true;
      this.showDashboardUI();
    } else {
      this.isAuthenticated = false;
      this.showLockScreenUI();
    }
  },

  showLockScreenUI() {
    const lockScreen = document.getElementById('adminLockScreen');
    const dashboardView = document.getElementById('adminDashboardView');
    if (lockScreen) lockScreen.style.display = 'flex';
    if (dashboardView) dashboardView.style.display = 'none';
  },

  showDashboardUI() {
    const lockScreen = document.getElementById('adminLockScreen');
    const dashboardView = document.getElementById('adminDashboardView');
    if (lockScreen) lockScreen.style.display = 'none';
    if (dashboardView) dashboardView.style.display = 'block';
    this.renderDashboard();
  },

  handlePinInput(digit) {
    if (this.enteredPin.length < 4) {
      this.enteredPin += digit;
      this.updatePinDots();
      if (this.enteredPin.length === 4) {
        setTimeout(() => this.verifyPin(), 150);
      }
    }
  },

  handlePinBackspace() {
    if (this.enteredPin.length > 0) {
      this.enteredPin = this.enteredPin.slice(0, -1);
      this.updatePinDots();
    }
  },

  handlePinClear() {
    this.enteredPin = '';
    this.updatePinDots();
  },

  updatePinDots() {
    const dots = document.querySelectorAll('.pin-dot');
    dots.forEach((dot, index) => {
      if (index < this.enteredPin.length) {
        dot.classList.add('filled');
      } else {
        dot.classList.remove('filled');
      }
    });
  },

  verifyPin() {
    const correctPin = window.CafeDB ? window.CafeDB.getPin() : '1234';
    if (this.enteredPin === correctPin) {
      this.isAuthenticated = true;
      sessionStorage.setItem('outnbeyond_admin_auth', 'true');
      this.enteredPin = '';
      this.updatePinDots();
      this.showDashboardUI();
      if (window.showToast) window.showToast('🔓 Admin Portal Access Granted');
    } else {
      const pinContainer = document.getElementById('pinInputBox');
      if (pinContainer) {
        pinContainer.classList.add('shake');
        setTimeout(() => pinContainer.classList.remove('shake'), 500);
      }
      if (window.showToast) window.showToast('❌ Incorrect PIN. (Default is 1234)');
      this.enteredPin = '';
      this.updatePinDots();
    }
  },

  logout() {
    this.isAuthenticated = false;
    sessionStorage.removeItem('outnbeyond_admin_auth');
    this.showLockScreenUI();
    if (window.showToast) window.showToast('🔒 Admin Session Locked');
  },

  bindEvents() {
    // PIN keypad clicks
    document.querySelectorAll('.pin-key[data-digit]').forEach(key => {
      key.addEventListener('click', () => {
        this.handlePinInput(key.getAttribute('data-digit'));
      });
    });

    const backspaceKey = document.getElementById('pinBackspaceKey');
    if (backspaceKey) {
      backspaceKey.addEventListener('click', () => this.handlePinBackspace());
    }

    const clearKey = document.getElementById('pinClearKey');
    if (clearKey) {
      clearKey.addEventListener('click', () => this.handlePinClear());
    }

    // Keyboard support for PIN entry
    document.addEventListener('keydown', (e) => {
      const lockScreen = document.getElementById('adminLockScreen');
      if (!this.isAuthenticated && lockScreen && lockScreen.style.display !== 'none') {
        if (e.key >= '0' && e.key <= '9') {
          this.handlePinInput(e.key);
        } else if (e.key === 'Backspace') {
          this.handlePinBackspace();
        } else if (e.key === 'Escape') {
          this.handlePinClear();
        }
      }
    });

    // Admin Tabs
    document.querySelectorAll('.admin-nav-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.admin-nav-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.activeTab = tab.getAttribute('data-admin-tab');
        this.renderActiveTab();
      });
    });

    // Search inputs in tabs
    const resSearch = document.getElementById('adminResSearch');
    if (resSearch) {
      resSearch.addEventListener('input', () => this.renderReservationsTab());
    }

    const orderSearch = document.getElementById('adminOrderSearch');
    if (orderSearch) {
      orderSearch.addEventListener('input', () => this.renderOrdersTab());
    }

    // Logout button
    const logoutBtn = document.getElementById('adminLogoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => this.logout());
    }

    // CSV Exports
    const exportResBtn = document.getElementById('exportReservationsCsvBtn');
    if (exportResBtn) {
      exportResBtn.addEventListener('click', () => {
        if (window.CafeDB) window.CafeDB.exportCSV('reservations');
      });
    }

    const exportOrdersBtn = document.getElementById('exportOrdersCsvBtn');
    if (exportOrdersBtn) {
      exportOrdersBtn.addEventListener('click', () => {
        if (window.CafeDB) window.CafeDB.exportCSV('orders');
      });
    }

    const exportInquiriesBtn = document.getElementById('exportInquiriesCsvBtn');
    if (exportInquiriesBtn) {
      exportInquiriesBtn.addEventListener('click', () => {
        if (window.CafeDB) window.CafeDB.exportCSV('inquiries');
      });
    }

    // Change PIN Form
    const changePinForm = document.getElementById('adminChangePinForm');
    if (changePinForm) {
      changePinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const currentPin = document.getElementById('currentPinInput')?.value;
        const newPin = document.getElementById('newPinInput')?.value;
        const confirmPin = document.getElementById('confirmPinInput')?.value;

        const dbPin = window.CafeDB ? window.CafeDB.getPin() : '1234';
        if (currentPin !== dbPin) {
          if (window.showToast) window.showToast('❌ Current PIN is incorrect');
          return;
        }

        if (!newPin || newPin.length < 4) {
          if (window.showToast) window.showToast('❌ New PIN must be at least 4 digits');
          return;
        }

        if (newPin !== confirmPin) {
          if (window.showToast) window.showToast('❌ New PIN and Confirm PIN do not match');
          return;
        }

        if (window.CafeDB) {
          window.CafeDB.setPin(newPin);
          if (window.showToast) window.showToast('✅ Admin PIN updated successfully!');
          changePinForm.reset();
        }
      });
    }

    // Reset Data button
    const resetDataBtn = document.getElementById('adminResetSeedDataBtn');
    if (resetDataBtn) {
      resetDataBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all data to initial factory sample state?')) {
          localStorage.removeItem('outnbeyond_db_reservations');
          localStorage.removeItem('outnbeyond_db_orders');
          localStorage.removeItem('outnbeyond_db_inquiries');
          localStorage.removeItem('outnbeyond_db_activity_logs');
          if (window.CafeDB) window.CafeDB.init();
          this.renderDashboard();
          if (window.showToast) window.showToast('🔄 Database reseeded with sample data');
        }
      });
    }
  },

  renderDashboard() {
    this.renderKPICards();
    this.renderActiveTab();
    this.updateClock();
  },

  updateClock() {
    const clockEl = document.getElementById('adminLiveClock');
    if (clockEl) {
      clockEl.textContent = new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' IST';
    }
  },

  renderKPICards() {
    if (!window.CafeDB) return;
    const reservations = window.CafeDB.getReservations();
    const orders = window.CafeDB.getOrders();
    const inquiries = window.CafeDB.getInquiries();

    const activeOrders = orders.filter(o => o.status === 'New' || o.status === 'Preparing' || o.status === 'Out for Delivery');
    const totalRevenue = orders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);
    const unreadInquiries = inquiries.filter(i => i.status === 'Unread');

    const elRes = document.getElementById('kpiTotalBookings');
    const elOrders = document.getElementById('kpiActiveOrders');
    const elRevenue = document.getElementById('kpiTotalRevenue');
    const elInq = document.getElementById('kpiNewInquiries');

    if (elRes) elRes.textContent = reservations.length;
    if (elOrders) elOrders.textContent = activeOrders.length;
    if (elRevenue) elRevenue.textContent = `₹${totalRevenue.toLocaleString('en-IN')}`;
    if (elInq) elInq.textContent = unreadInquiries.length;
  },

  renderActiveTab() {
    document.querySelectorAll('.admin-tab-pane').forEach(p => p.style.display = 'none');
    const activePane = document.getElementById(`adminPane-${this.activeTab}`);
    if (activePane) activePane.style.display = 'block';

    if (this.activeTab === 'overview') this.renderOverviewTab();
    if (this.activeTab === 'reservations') this.renderReservationsTab();
    if (this.activeTab === 'orders') this.renderOrdersTab();
    if (this.activeTab === 'inquiries') this.renderInquiriesTab();
    if (this.activeTab === 'activity') this.renderActivityTab();
  },

  renderOverviewTab() {
    this.renderKPICards();
    const resPreviewContainer = document.getElementById('overviewRecentBookings');
    const orderPreviewContainer = document.getElementById('overviewRecentOrders');

    if (!window.CafeDB) return;
    const reservations = window.CafeDB.getReservations().slice(0, 4);
    const orders = window.CafeDB.getOrders().slice(0, 4);

    if (resPreviewContainer) {
      if (reservations.length === 0) {
        resPreviewContainer.innerHTML = '<p class="text-body-sm" style="color: var(--color-on-surface-variant); padding: 12px;">No bookings recorded yet.</p>';
      } else {
        resPreviewContainer.innerHTML = reservations.map(r => `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid rgba(43,33,25,0.08);">
            <div>
              <strong style="font-size: 14px; display: block; color: var(--color-border-dark);">${r.guestName}</strong>
              <span class="text-body-sm" style="font-size: 12px; color: var(--color-on-surface-variant);">${r.dateDetail} • ${r.time} • ${r.partySize} Guests (${r.seatingZoneName})</span>
            </div>
            <span class="badge ${this.getReservationBadgeClass(r.status)}" style="font-size: 11px;">${r.status}</span>
          </div>
        `).join('');
      }
    }

    if (orderPreviewContainer) {
      if (orders.length === 0) {
        orderPreviewContainer.innerHTML = '<p class="text-body-sm" style="color: var(--color-on-surface-variant); padding: 12px;">No online orders recorded yet.</p>';
      } else {
        orderPreviewContainer.innerHTML = orders.map(o => `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid rgba(43,33,25,0.08);">
            <div>
              <strong style="font-size: 14px; display: block; color: var(--color-border-dark);">${o.customerName} (${o.id})</strong>
              <span class="text-body-sm" style="font-size: 12px; color: var(--color-on-surface-variant);">${o.items.length} items • ₹${o.grandTotal} • ${o.orderType.toUpperCase()}</span>
            </div>
            <span class="badge ${this.getOrderBadgeClass(o.status)}" style="font-size: 11px;">${o.status}</span>
          </div>
        `).join('');
      }
    }
  },

  renderReservationsTab() {
    const tableBody = document.getElementById('adminReservationsTableBody');
    if (!tableBody || !window.CafeDB) return;

    const query = (document.getElementById('adminResSearch')?.value || '').toLowerCase().trim();
    const zoneFilter = document.getElementById('adminResZoneFilter')?.value || 'all';

    let list = window.CafeDB.getReservations();
    if (query) {
      list = list.filter(r => r.guestName.toLowerCase().includes(query) || r.guestPhone.includes(query) || r.id.toLowerCase().includes(query));
    }
    if (zoneFilter !== 'all') {
      list = list.filter(r => r.seatingZoneName.includes(zoneFilter));
    }

    if (list.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: var(--space-xl); color: var(--color-on-surface-variant);">No reservation records match the criteria.</td></tr>`;
      return;
    }

    tableBody.innerHTML = list.map(r => `
      <tr>
        <td><strong>${r.id}</strong></td>
        <td>
          <strong>${r.guestName}</strong>
          <div style="font-size: 12px; color: var(--color-on-surface-variant);">${r.guestPhone}</div>
        </td>
        <td>
          <div>${r.dateDetail} • ${r.time}</div>
          <div style="font-size: 11px; color: var(--color-on-surface-variant);">${r.partySize} Guests (${r.partyPersona})</div>
        </td>
        <td><span style="font-size: 13px;">${r.seatingZoneName}</span></td>
        <td><span class="badge ${this.getReservationBadgeClass(r.status)}">${r.status}</span></td>
        <td>
          <select class="neo-select" style="height: 32px; font-size: 12px; padding: 0 8px;" onchange="AdminController.handleStatusChange('res', '${r.id}', this.value)">
            <option value="Confirmed" ${r.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
            <option value="Seated" ${r.status === 'Seated' ? 'selected' : ''}>Seated 🪑</option>
            <option value="Completed" ${r.status === 'Completed' ? 'selected' : ''}>Completed ✅</option>
            <option value="Cancelled" ${r.status === 'Cancelled' ? 'selected' : ''}>Cancelled ❌</option>
          </select>
        </td>
        <td>
          <button class="btn btn-card btn-sm" style="padding: 4px 8px;" onclick="AdminController.handleDelete('res', '${r.id}')" title="Delete Booking">
            <span class="material-symbols-outlined" style="font-size: 16px; color: #dc2626;">delete</span>
          </button>
        </td>
      </tr>
    `).join('');
  },

  renderOrdersTab() {
    const container = document.getElementById('adminOrdersGrid');
    if (!container || !window.CafeDB) return;

    const query = (document.getElementById('adminOrderSearch')?.value || '').toLowerCase().trim();
    let list = window.CafeDB.getOrders();

    if (query) {
      list = list.filter(o => o.customerName.toLowerCase().includes(query) || o.customerPhone.includes(query) || o.id.toLowerCase().includes(query));
    }

    if (list.length === 0) {
      container.innerHTML = `<div class="neo-card" style="grid-column: 1 / -1; text-align: center; padding: var(--space-2xl); color: var(--color-on-surface-variant);">No active kitchen orders found.</div>`;
      return;
    }

    container.innerHTML = list.map(o => `
      <div class="neo-card" style="padding: var(--space-md); display: flex; flex-direction: column; justify-content: space-between; border-left: 6px solid ${this.getOrderBorderColor(o.status)};">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; border-bottom: 1.5px solid rgba(43,33,25,0.08); padding-bottom: 6px;">
            <div>
              <strong style="font-size: 16px; font-family: var(--font-title);">${o.id}</strong>
              <div style="font-size: 12px; color: var(--color-on-surface-variant);">${o.timestampFormatted}</div>
            </div>
            <span class="badge ${this.getOrderBadgeClass(o.status)}">${o.status}</span>
          </div>

          <div style="margin-bottom: 10px;">
            <strong style="font-size: 14px; display: block;">${o.customerName}</strong>
            <div style="font-size: 12px; color: var(--color-on-surface-variant);">📞 +91 ${o.customerPhone}</div>
            <div style="font-size: 11px; color: var(--color-on-surface-variant); margin-top: 2px;">📍 ${o.deliveryAddress}</div>
          </div>

          <div style="background: rgba(43,33,25,0.04); padding: 8px; border-radius: var(--radius-sm); margin-bottom: 10px; font-size: 13px;">
            <strong style="font-size: 11px; text-transform: uppercase; color: var(--color-on-surface-variant); display: block; margin-bottom: 4px;">Dishes:</strong>
            ${o.items.map(item => `
              <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                <span>${item.name} × ${item.quantity}</span>
                <strong>₹${item.price * item.quantity}</strong>
              </div>
            `).join('')}
            ${o.orderNotes ? `<div style="font-size: 11px; font-style: italic; color: var(--color-tertiary); margin-top: 4px;">Note: "${o.orderNotes}"</div>` : ''}
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed var(--color-border-dark); padding-top: 6px; margin-bottom: 12px;">
            <span class="text-body-sm">Bill Total:</span>
            <strong class="font-display text-title-lg" style="color: var(--color-primary-container);">₹${o.grandTotal}</strong>
          </div>
        </div>

        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          <select class="neo-select" style="flex: 1; height: 34px; font-size: 12px; padding: 0 8px;" onchange="AdminController.handleStatusChange('order', '${o.id}', this.value)">
            <option value="New" ${o.status === 'New' ? 'selected' : ''}>New Order 🔔</option>
            <option value="Preparing" ${o.status === 'Preparing' ? 'selected' : ''}>Kitchen Cooking 🍳</option>
            <option value="Out for Delivery" ${o.status === 'Out for Delivery' ? 'selected' : ''}>Out for Delivery 🛵</option>
            <option value="Completed" ${o.status === 'Completed' ? 'selected' : ''}>Completed / Delivered ✅</option>
            <option value="Cancelled" ${o.status === 'Cancelled' ? 'selected' : ''}>Cancelled ❌</option>
          </select>

          <button class="btn btn-card btn-sm" style="padding: 4px 8px;" onclick="AdminController.handleDelete('order', '${o.id}')" title="Delete Order">
            <span class="material-symbols-outlined" style="font-size: 16px; color: #dc2626;">delete</span>
          </button>
        </div>
      </div>
    `).join('');
  },

  renderInquiriesTab() {
    const tableBody = document.getElementById('adminInquiriesTableBody');
    if (!tableBody || !window.CafeDB) return;

    const list = window.CafeDB.getInquiries();
    if (list.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: var(--space-xl); color: var(--color-on-surface-variant);">No contact inquiries received yet.</td></tr>`;
      return;
    }

    tableBody.innerHTML = list.map(i => `
      <tr>
        <td><strong>${i.id}</strong></td>
        <td>
          <strong>${i.name}</strong>
          <div style="font-size: 12px; color: var(--color-on-surface-variant);">${i.email}</div>
        </td>
        <td style="max-width: 320px;">
          <p class="text-body-sm" style="margin: 0; line-height: 1.4;">${i.message}</p>
        </td>
        <td><span style="font-size: 12px; color: var(--color-on-surface-variant);">${i.timestampFormatted}</span></td>
        <td><span class="badge ${i.status === 'Unread' ? 'badge-sunset' : 'badge-veg'}">${i.status}</span></td>
        <td>
          <div style="display: flex; gap: 6px;">
            <a href="mailto:${i.email}?subject=Out n Beyond Cafe Inquiry Response" class="btn btn-card btn-sm" style="padding: 4px 8px;" onclick="AdminController.handleStatusChange('inq', '${i.id}', 'Replied')" title="Reply by Email">
              <span class="material-symbols-outlined" style="font-size: 16px;">mail</span>
            </a>
            <button class="btn btn-card btn-sm" style="padding: 4px 8px;" onclick="AdminController.handleDelete('inq', '${i.id}')" title="Delete Message">
              <span class="material-symbols-outlined" style="font-size: 16px; color: #dc2626;">delete</span>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  renderActivityTab() {
    const streamContainer = document.getElementById('adminActivityStream');
    if (!streamContainer || !window.CafeDB) return;

    const logs = window.CafeDB.getActivityLogs();
    if (logs.length === 0) {
      streamContainer.innerHTML = '<p class="text-body-sm" style="color: var(--color-on-surface-variant); padding: 12px;">No activity logged yet.</p>';
      return;
    }

    streamContainer.innerHTML = logs.map(l => `
      <div style="display: flex; gap: 12px; align-items: flex-start; padding: 10px 0; border-bottom: 1px solid rgba(43,33,25,0.06);">
        <span style="width: 8px; height: 8px; border-radius: 9999px; background: var(--color-accent-terracotta); margin-top: 6px;"></span>
        <div style="flex: 1;">
          <div style="font-size: 13.5px; color: var(--color-border-dark); font-weight: 500;">${l.action}</div>
          <div style="font-size: 11px; color: var(--color-on-surface-variant); margin-top: 2px;">${l.date} • ${l.timestamp}</div>
        </div>
      </div>
    `).join('');
  },

  handleStatusChange(type, id, newStatus) {
    if (!window.CafeDB) return;
    if (type === 'res') {
      window.CafeDB.updateReservationStatus(id, newStatus);
      this.renderReservationsTab();
    } else if (type === 'order') {
      window.CafeDB.updateOrderStatus(id, newStatus);
      this.renderOrdersTab();
    } else if (type === 'inq') {
      window.CafeDB.updateInquiryStatus(id, newStatus);
      this.renderInquiriesTab();
    }
    this.renderKPICards();
    if (window.showToast) window.showToast(`Updated ${id} status to ${newStatus}`);
  },

  handleDelete(type, id) {
    if (!confirm(`Are you sure you want to delete ${id}?`)) return;
    if (!window.CafeDB) return;
    if (type === 'res') {
      window.CafeDB.deleteReservation(id);
      this.renderReservationsTab();
    } else if (type === 'order') {
      window.CafeDB.deleteOrder(id);
      this.renderOrdersTab();
    } else if (type === 'inq') {
      let list = window.CafeDB.getInquiries().filter(i => i.id !== id);
      localStorage.setItem(window.CafeDB.KEYS.INQUIRIES, JSON.stringify(list));
      this.renderInquiriesTab();
    }
    this.renderKPICards();
    if (window.showToast) window.showToast(`🗑️ ${id} deleted`);
  },

  getReservationBadgeClass(status) {
    if (status === 'Confirmed') return 'badge-veg';
    if (status === 'Seated') return 'badge-sunset';
    if (status === 'Completed') return 'badge-mocha';
    return 'badge-terracotta';
  },

  getOrderBadgeClass(status) {
    if (status === 'New') return 'badge-sunset';
    if (status === 'Preparing') return 'badge-mocha';
    if (status === 'Out for Delivery') return 'badge-terracotta';
    if (status === 'Completed') return 'badge-veg';
    return 'badge-terracotta';
  },

  getOrderBorderColor(status) {
    if (status === 'New') return 'var(--color-accent-sunset)';
    if (status === 'Preparing') return 'var(--color-secondary)';
    if (status === 'Out for Delivery') return 'var(--color-accent-terracotta)';
    if (status === 'Completed') return 'var(--color-status-veg)';
    return '#dc2626';
  }
};

if (typeof window !== 'undefined') {
  window.AdminController = AdminController;
}
