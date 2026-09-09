/* ==========================================================================
   OUT N BEYOND CAFE & BISTRO — TABLE RESERVATION CONTROLLER
   Interactive 5-Step Engine with Live SVG Floor Plan Synchronization
   ========================================================================== */

const ReservationController = {
  formData: {
    date: 'Today',
    dateDetail: 'Oct 24',
    time: '06:30 PM',
    partySize: '2',
    partyPersona: 'Date Vibe (2 Guests)',
    seatingZone: 'window',
    seatingZoneName: 'Sunlit Window Booth (Zone A)',
    guestName: '',
    guestPhone: '',
    guestEmail: '',
    specialTags: []
  },

  init() {
    this.bindEvents();
    this.syncFloorPlanWithZone('window');
  },

  bindEvents() {
    // 1. Date Pills
    const datePills = document.querySelectorAll('.date-pill');
    datePills.forEach(pill => {
      pill.addEventListener('click', () => {
        datePills.forEach(p => {
          p.classList.remove('btn-mocha');
          p.classList.add('btn-card');
        });
        pill.classList.remove('btn-card');
        pill.classList.add('btn-mocha');

        this.formData.date = pill.getAttribute('data-date');
        this.formData.dateDetail = pill.querySelector('.date-val') ? pill.querySelector('.date-val').textContent : this.formData.date;
      });
    });

    const customDateInput = document.getElementById('customDateInput');
    if (customDateInput) {
      customDateInput.addEventListener('change', (e) => {
        if (e.target.value) {
          const dateObj = new Date(e.target.value);
          const formatted = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          this.formData.date = 'Custom Date';
          this.formData.dateDetail = formatted;
          const label = document.getElementById('customDateLabel');
          if (label) label.textContent = formatted;
          
          datePills.forEach(p => {
            p.classList.remove('btn-mocha');
            p.classList.add('btn-card');
          });
        }
      });
    }

    // 2. Time Slot Pills
    const timeSlots = document.querySelectorAll('.time-slot-btn');
    const selectedTimeBadge = document.getElementById('selectedTimeBadge');
    timeSlots.forEach(slot => {
      slot.addEventListener('click', () => {
        timeSlots.forEach(s => {
          s.classList.remove('btn-primary');
          s.classList.add('btn-card');
        });
        slot.classList.remove('btn-card');
        slot.classList.add('btn-primary');

        const time = slot.getAttribute('data-time');
        this.formData.time = time;
        if (selectedTimeBadge) {
          selectedTimeBadge.textContent = `${time} Selected`;
        }
      });
    });

    // 3. Party Size Buttons
    const partyBtns = document.querySelectorAll('.party-size-btn');
    const partyPersona = document.getElementById('partyPersona');
    partyBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        partyBtns.forEach(b => {
          b.classList.remove('btn-secondary');
          b.classList.add('btn-card');
        });
        btn.classList.remove('btn-card');
        btn.classList.add('btn-secondary');

        this.formData.partySize = btn.getAttribute('data-party');
        this.formData.partyPersona = btn.getAttribute('data-label');
        if (partyPersona) {
          partyPersona.textContent = this.formData.partyPersona;
        }
      });
    });

    // 4. Seating Zone Cards
    const zoneCards = document.querySelectorAll('.zone-select-card');
    zoneCards.forEach(card => {
      card.addEventListener('click', () => {
        const zoneId = card.getAttribute('data-zone');
        const zoneName = card.getAttribute('data-name') || zoneId;
        this.selectZone(zoneId, zoneName);
      });
    });

    // SVG Map Clickable Zones
    const svgZoneMap = {
      'mapZoneWindow': { id: 'window', name: 'Sunlit Window Booth (Zone A)' },
      'mapZoneBar': { id: 'bar', name: 'High Table Bar (Zone D)' },
      'mapZoneLibrary': { id: 'library', name: 'Cozy Books & Plants Corner (Zone B)' },
      'mapZonePatio': { id: 'patio', name: 'Outdoor Patio / Balcony (Zone C)' }
    };

    Object.entries(svgZoneMap).forEach(([svgId, meta]) => {
      const el = document.getElementById(svgId);
      if (el) {
        el.addEventListener('click', () => {
          this.selectZone(meta.id, meta.name);
        });
      }
    });

    // 5. Special Occasion Tags
    const tags = document.querySelectorAll('.request-tag-chip');
    tags.forEach(tag => {
      tag.addEventListener('click', () => {
        const text = tag.textContent.trim();
        if (tag.classList.contains('active')) {
          tag.classList.remove('active');
          tag.classList.remove('btn-mocha');
          tag.classList.add('btn-card');
          this.formData.specialTags = this.formData.specialTags.filter(t => t !== text);
        } else {
          tag.classList.add('active');
          tag.classList.remove('btn-card');
          tag.classList.add('btn-mocha');
          this.formData.specialTags.push(text);
        }
      });
    });

    // 6. Reservation Form Submission
    const form = document.getElementById('tableReservationForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSubmit();
      });
    }

    // Modal Close
    const closeVoucherBtn = document.getElementById('closeVoucherModalBtn');
    if (closeVoucherBtn) {
      closeVoucherBtn.addEventListener('click', () => {
        const modal = document.getElementById('reservationVoucherModal');
        if (modal) modal.classList.remove('open');
      });
    }
  },

  selectZone(zoneId, zoneName) {
    this.formData.seatingZone = zoneId;
    this.formData.seatingZoneName = zoneName;

    // Update Cards
    document.querySelectorAll('.zone-select-card').forEach(c => {
      if (c.getAttribute('data-zone') === zoneId) {
        c.classList.add('active-zone');
        c.style.backgroundColor = 'var(--color-secondary-container)';
        c.style.borderColor = 'var(--color-border-dark)';
        const icon = c.querySelector('.zone-icon-state');
        if (icon) {
          icon.textContent = 'check_circle';
          icon.style.color = 'var(--color-secondary)';
        }
      } else {
        c.classList.remove('active-zone');
        c.style.backgroundColor = 'var(--color-surface-cream)';
        const icon = c.querySelector('.zone-icon-state');
        if (icon) {
          icon.textContent = 'radio_button_unchecked';
          icon.style.color = 'var(--color-outline)';
        }
      }
    });

    // Sync SVG Floor Plan
    this.syncFloorPlanWithZone(zoneId);

    const activeZoneLabel = document.getElementById('activeFloorZoneLabel');
    if (activeZoneLabel) {
      activeZoneLabel.textContent = `Selected: ${zoneName}`;
    }
  },

  syncFloorPlanWithZone(zoneId) {
    const svgZones = {
      'window': document.getElementById('mapZoneWindow'),
      'library': document.getElementById('mapZoneLibrary'),
      'patio': document.getElementById('mapZonePatio'),
      'bar': document.getElementById('mapZoneBar')
    };

    Object.entries(svgZones).forEach(([key, el]) => {
      if (!el) return;
      if (key === zoneId) {
        el.style.opacity = '1';
        el.style.filter = 'drop-shadow(0 0 6px rgba(123, 63, 0, 0.6))';
      } else {
        el.style.opacity = '0.65';
        el.style.filter = 'none';
      }
    });
  },

  handleSubmit() {
    const nameInput = document.getElementById('resGuestName');
    const phoneInput = document.getElementById('resGuestPhone');
    const emailInput = document.getElementById('resGuestEmail');

    this.formData.guestName = nameInput ? nameInput.value.trim() : 'Guest';
    this.formData.guestPhone = phoneInput ? phoneInput.value.trim() : '';
    this.formData.guestEmail = emailInput ? emailInput.value.trim() : '';

    if (!this.formData.guestName || !this.formData.guestPhone) {
      if (window.showToast) window.showToast('Please enter your name and phone number');
      return;
    }

    const bookingId = '#OB-' + Math.floor(1000 + Math.random() * 9000);

    // Populate Voucher Modal
    const vId = document.getElementById('voucherBookingId');
    const vName = document.getElementById('voucherGuestName');
    const vPhone = document.getElementById('voucherGuestPhone');
    const vDateTime = document.getElementById('voucherDateTime');
    const vParty = document.getElementById('voucherPartySize');
    const vZone = document.getElementById('voucherZone');

    if (vId) vId.textContent = bookingId;
    if (vName) vName.textContent = this.formData.guestName;
    if (vPhone) vPhone.textContent = `+91 ${this.formData.guestPhone}`;
    if (vDateTime) vDateTime.textContent = `${this.formData.dateDetail} • ${this.formData.time}`;
    if (vParty) vParty.textContent = `${this.formData.partySize} Guests (${this.formData.partyPersona})`;
    if (vZone) vZone.textContent = this.formData.seatingZoneName;

    const modal = document.getElementById('reservationVoucherModal');
    if (modal) {
      modal.classList.add('open');
    }

    if (window.showToast) {
      window.showToast(`🎉 Reservation confirmed! Booking ID ${bookingId}`);
    }
  }
};

if (typeof window !== 'undefined') {
  window.ReservationController = ReservationController;
}
