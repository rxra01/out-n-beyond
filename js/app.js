/* ==========================================================================
   OUT N BEYOND CAFE & BISTRO — MAIN APPLICATION ENTRY
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Global Toast Function
  window.showToast = function(message) {
    let toast = document.getElementById('globalToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'globalToast';
      toast.className = 'neo-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <span class="material-symbols-outlined text-[20px]" style="color: var(--color-primary-container);">info</span>
      <span>${message}</span>
    `;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  };

  // Mobile Menu Drawer
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const closeDrawerBtn = document.getElementById('closeMobileDrawerBtn');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });
  }

  if (closeDrawerBtn && mobileDrawer) {
    closeDrawerBtn.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
    });
  }

  // Initialize Modules
  if (window.Router) Router.init();
  if (window.MenuController) MenuController.init();
  if (window.ReservationController) ReservationController.init();
  if (window.GalleryController) GalleryController.init();
  if (window.ReviewsController) ReviewsController.init();
  if (window.OrderController) OrderController.init();

  // Listen to route changes
  window.addEventListener('routeChanged', (e) => {
    const route = e.detail.route;
    if (route === 'order-online' && window.OrderController) {
      OrderController.renderCheckout();
    }
    if (route === 'menu' && window.MenuController) {
      MenuController.renderMenuItems();
    }
  });

  // Home Quick Reservation Form
  const homeQuickForm = document.getElementById('homeQuickResForm');
  if (homeQuickForm) {
    homeQuickForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('homeResName')?.value || '';
      const phone = document.getElementById('homeResPhone')?.value || '';
      const party = document.getElementById('homeResParty')?.value || '2';
      const slot = document.getElementById('homeResSlot')?.value || '';

      if (window.ReservationController) {
        ReservationController.formData.guestName = name;
        ReservationController.formData.guestPhone = phone;
        ReservationController.formData.partySize = party;
        ReservationController.handleSubmit();
      }
    });
  }

  // Contact Form Submission
  const contactForm = document.getElementById('contactInquiryForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value;
      const email = document.getElementById('contactEmail')?.value;
      const msg = document.getElementById('contactMessage')?.value;

      if (!name || !email || !msg) {
        window.showToast('Please fill out all required fields');
        return;
      }

      window.showToast(`Thank you ${name}! Your inquiry has been sent to our Kolkata team.`);
      contactForm.reset();
    });
  }

  console.log("☕ Out n Beyond Cafe & Bistro application initialized successfully.");
});
