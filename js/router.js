/* ==========================================================================
   OUT N BEYOND CAFE & BISTRO — CLIENT-SIDE ROUTER
   ========================================================================== */

const Router = {
  routes: {
    'home': 'view-home',
    'menu': 'view-menu',
    'story': 'view-story',
    'gallery-reels': 'view-gallery-reels',
    'reviews': 'view-reviews',
    'reservations': 'view-reservations',
    'order-online': 'view-order-online',
    'contact': 'view-contact'
  },

  defaultRoute: 'home',

  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    
    // Intercept clicks on links with data-path or href starting with #
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-path], a[href^="#"]');
      if (!link) return;

      const dataPath = link.getAttribute('data-path');
      const href = link.getAttribute('href');

      if (dataPath) {
        e.preventDefault();
        this.navigate(dataPath);
      } else if (href && href.startsWith('#') && href.length > 1) {
        const routeName = href.substring(1);
        if (this.routes[routeName]) {
          e.preventDefault();
          this.navigate(routeName);
        }
      }
    });

    // Initial load
    this.handleRoute();
  },

  navigate(routeName) {
    const target = this.routes[routeName] ? routeName : this.defaultRoute;
    if (window.location.hash !== '#' + target) {
      window.location.hash = target;
    }
    this.handleRoute();
  },

  handleRoute() {
    let hash = window.location.hash.replace(/^#\/?/, '').trim().toLowerCase();
    
    // Map aliases
    if (hash === 'gallery' || hash === 'reels') hash = 'gallery-reels';
    if (hash === 'reserve-table' || hash === 'reserve' || hash === 'booking') hash = 'reservations';
    if (hash === 'order' || hash === 'cart') hash = 'order-online';
    if (hash === 'about') hash = 'story';
    
    if (!hash || !this.routes[hash]) {
      hash = this.defaultRoute;
    }

    const activeViewId = this.routes[hash];

    // Toggle active view
    document.querySelectorAll('.page-view').forEach(view => {
      view.classList.remove('active');
    });

    const targetView = document.getElementById(activeViewId);
    if (targetView) {
      targetView.classList.add('active');
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update active nav links (Desktop & Mobile)
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      const path = link.getAttribute('data-path') || (link.getAttribute('href') ? link.getAttribute('href').replace(/^#/, '') : '');
      if (path === hash || (hash === 'reservations' && path === 'reserve-table') || (hash === 'order-online' && path === 'order-online')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Close mobile drawer if open
    const mobileDrawer = document.getElementById('mobileNavDrawer');
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
    }

    // Dynamic Title update
    const titleMap = {
      'home': "Out n Beyond Cafe & Bistro | Kolkata's Creative Culinary Hangout",
      'menu': "Interactive Menu | Out n Beyond Cafe & Bistro",
      'story': "Our Story & Roastery Lab | Out n Beyond Cafe",
      'gallery-reels': "Snap Dump & Reels Studio | Out n Beyond Cafe",
      'reviews': "9,482+ Kolkata Diner Reviews | Out n Beyond Cafe",
      'reservations': "Table Reservations | Out n Beyond Cafe",
      'order-online': "Online Ordering & Delivery | Out n Beyond Cafe",
      'contact': "Location & Operating Hours | Out n Beyond Cafe"
    };
    document.title = titleMap[hash] || "Out n Beyond Cafe & Bistro";

    // Notify listeners
    window.dispatchEvent(new CustomEvent('routeChanged', { detail: { route: hash } }));
  }
};
