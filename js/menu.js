/* ==========================================================================
   OUT N BEYOND CAFE & BISTRO — MENU & CART CONTROLLER
   ========================================================================== */

const MenuController = {
  cart: [],
  activeCategory: 'all',
  activeDietFilter: null,
  searchQuery: '',
  currentSort: 'featured',

  init() {
    this.loadCartFromStorage();
    this.renderMenuItems();
    this.bindEvents();
    this.updateCartUI();
  },

  loadCartFromStorage() {
    try {
      const saved = localStorage.getItem('outnbeyond_cart');
      if (saved) {
        this.cart = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not load cart from storage', e);
      this.cart = [];
    }
  },

  saveCartToStorage() {
    try {
      localStorage.setItem('outnbeyond_cart', JSON.stringify(this.cart));
    } catch (e) {
      console.warn('Could not save cart to storage', e);
    }
  },

  bindEvents() {
    // Search input
    const searchInput = document.getElementById('menuSearchInput');
    const clearBtn = document.getElementById('searchClearBtn');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        if (clearBtn) {
          clearBtn.style.display = this.searchQuery ? 'block' : 'none';
        }
        this.renderMenuItems();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        this.searchQuery = '';
        clearBtn.style.display = 'none';
        this.renderMenuItems();
      });
    }

    // Category pills
    document.querySelectorAll('.cat-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.cat-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeCategory = btn.getAttribute('data-category');
        this.renderMenuItems();
      });
    });

    // Dietary filters
    document.querySelectorAll('.diet-filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const filterType = pill.getAttribute('data-filter');
        if (this.activeDietFilter === filterType) {
          // Deactivate
          this.activeDietFilter = null;
          pill.classList.remove('active');
          const resetBtn = document.getElementById('resetDietFiltersBtn');
          if (resetBtn) resetBtn.style.display = 'none';
        } else {
          document.querySelectorAll('.diet-filter-pill').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          this.activeDietFilter = filterType;
          const resetBtn = document.getElementById('resetDietFiltersBtn');
          if (resetBtn) resetBtn.style.display = 'inline-block';
        }
        this.renderMenuItems();
      });
    });

    // Reset button
    const resetDietBtn = document.getElementById('resetDietFiltersBtn');
    if (resetDietBtn) {
      resetDietBtn.addEventListener('click', () => {
        this.activeDietFilter = null;
        document.querySelectorAll('.diet-filter-pill').forEach(p => p.classList.remove('active'));
        resetDietBtn.style.display = 'none';
        this.renderMenuItems();
      });
    }

    const resetAllBtn = document.getElementById('menuResetAllBtn');
    if (resetAllBtn) {
      resetAllBtn.addEventListener('click', () => {
        this.activeCategory = 'all';
        this.activeDietFilter = null;
        this.searchQuery = '';
        if (searchInput) searchInput.value = '';
        if (clearBtn) clearBtn.style.display = 'none';
        if (resetDietBtn) resetDietBtn.style.display = 'none';
        document.querySelectorAll('.diet-filter-pill').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.cat-tab-btn').forEach(b => {
          if (b.getAttribute('data-category') === 'all') b.classList.add('active');
          else b.classList.remove('active');
        });
        this.renderMenuItems();
      });
    }

    // Sort Dropdown
    const sortSelect = document.getElementById('menuSortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.currentSort = e.target.value;
        this.renderMenuItems();
      });
    }

    // Clear cart button in dock
    const clearCartBtn = document.getElementById('dockClearCartBtn');
    if (clearCartBtn) {
      clearCartBtn.addEventListener('click', () => {
        this.cart = [];
        this.saveCartToStorage();
        this.updateCartUI();
        if (window.OrderController) window.OrderController.renderCheckout();
        if (window.showToast) window.showToast('Order bag cleared');
      });
    }

    // PDF Download Simulation
    const downloadPdfBtn = document.getElementById('downloadPdfMenuBtn');
    if (downloadPdfBtn) {
      downloadPdfBtn.addEventListener('click', () => {
        const origText = downloadPdfBtn.innerHTML;
        downloadPdfBtn.innerHTML = `<span class="material-symbols-outlined text-[18px]" style="animation: spin 1s linear infinite;">sync</span><span>Preparing PDF...</span>`;
        setTimeout(() => {
          downloadPdfBtn.innerHTML = `<span class="material-symbols-outlined text-[18px] text-status-veg">check_circle</span><span>Downloaded!</span>`;
          window.print();
          setTimeout(() => {
            downloadPdfBtn.innerHTML = origText;
          }, 2000);
        }, 800);
      });
    }
  },

  getFilteredItems() {
    let items = [...BusinessData.menuItems];

    // Category filter
    if (this.activeCategory !== 'all') {
      items = items.filter(item => item.category === this.activeCategory);
    }

    // Dietary filter
    if (this.activeDietFilter) {
      if (this.activeDietFilter === 'veg') {
        items = items.filter(item => item.dietaryTag === 'veg');
      } else if (this.activeDietFilter === 'nonveg') {
        items = items.filter(item => item.dietaryTag === 'non-veg');
      } else if (this.activeDietFilter === 'spicy') {
        items = items.filter(item => item.isSpicy === true);
      } else if (this.activeDietFilter === 'viral') {
        items = items.filter(item => item.isPopular || item.isFeatured);
      }
    }

    // Search query
    if (this.searchQuery) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(this.searchQuery) ||
        item.description.toLowerCase().includes(this.searchQuery) ||
        item.categoryLabel.toLowerCase().includes(this.searchQuery)
      );
    }

    // Sort
    if (this.currentSort === 'price-low') {
      items.sort((a, b) => a.price - b.price);
    } else if (this.currentSort === 'price-high') {
      items.sort((a, b) => b.price - a.price);
    } else if (this.currentSort === 'time') {
      items.sort((a, b) => a.prepMinutes - b.prepMinutes);
    }

    return items;
  },

  renderMenuItems() {
    const container = document.getElementById('menuGridContainer');
    const emptyState = document.getElementById('menuEmptyState');
    const counterText = document.getElementById('menuCounterText');
    if (!container) return;

    const items = this.getFilteredItems();

    if (counterText) {
      counterText.textContent = `Showing ${items.length} plate${items.length === 1 ? '' : 's'} & sip${items.length === 1 ? '' : 's'}`;
    }

    if (items.length === 0) {
      container.innerHTML = '';
      if (emptyState) emptyState.style.display = 'flex';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    container.innerHTML = items.map(item => {
      let dietBadge = '';
      if (item.dietaryTag === 'veg') {
        dietBadge = `
          <div class="veg-indicator" title="Vegetarian">
            <span class="veg-indicator-dot"></span>
          </div>
        `;
      } else if (item.dietaryTag === 'non-veg') {
        dietBadge = `
          <div class="nonveg-indicator" title="Non-Vegetarian">
            <span class="nonveg-indicator-triangle"></span>
          </div>
        `;
      } else if (item.dietaryTag === 'egg') {
        dietBadge = `
          <div class="egg-indicator" title="Contains Egg">
            <span class="egg-indicator-dot"></span>
          </div>
        `;
      }

      return `
        <article class="menu-card neo-card" data-id="${item.id}">
          <div>
            <div class="menu-card-img-wrap">
              <img class="menu-card-img" src="${item.image}" alt="${item.name} at Out n Beyond Cafe Kolkata" loading="lazy" />
              ${item.badgeText ? `
                <div style="position: absolute; top: 8px; left: 8px;">
                  <span class="badge badge-sunset" style="font-size: 11px; padding: 2px 8px;">${item.badgeText}</span>
                </div>
              ` : ''}
              <div style="position: absolute; bottom: 8px; right: 8px; background: rgba(255,255,255,0.9); padding: 2px 6px; border-radius: 9999px; border: 1px solid var(--color-border-dark);">
                ${dietBadge}
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 4px;">
              <h3 class="text-title-lg" style="color: var(--color-border-dark);">${item.name}</h3>
              <span class="font-display text-title-lg" style="color: var(--color-primary-container); font-weight: 800; shrink-0;">₹${item.price}</span>
            </div>

            <p class="text-body-sm" style="color: var(--color-on-surface-variant); margin-bottom: 12px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
              ${item.description}
            </p>

            <div style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--color-outline); margin-bottom: 14px;">
              <span style="display: inline-flex; align-items: center; gap: 4px;">
                <span class="material-symbols-outlined" style="font-size: 14px;">timer</span> ${item.prepTime}
              </span>
              <span>•</span>
              <span style="display: inline-flex; align-items: center; gap: 4px;">
                <span class="material-symbols-outlined" style="font-size: 14px;">fitness_center</span> ${item.calories}
              </span>
            </div>
          </div>

          <div style="border-top: 1.5px solid rgba(43,33,25,0.15); padding-top: 10px;">
            <button class="btn btn-mocha w-full add-to-bag-btn" data-id="${item.id}" style="width: 100%; border-radius: var(--radius-md); padding: 8px 12px; font-size: 14px;">
              <span class="material-symbols-outlined" style="font-size: 18px;">add</span>
              <span>Add to Order</span>
            </button>
          </div>
        </article>
      `;
    }).join('');

    // Attach Add to Bag listeners
    container.querySelectorAll('.add-to-bag-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        this.addToCart(id, btn);
      });
    });
  },

  addToCart(itemId, buttonEl = null) {
    const item = BusinessData.menuItems.find(i => i.id === itemId);
    if (!item) return;

    const existing = this.cart.find(i => i.id === itemId);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1
      });
    }

    this.saveCartToStorage();
    this.updateCartUI();

    if (window.OrderController) {
      window.OrderController.renderCheckout();
    }

    if (buttonEl) {
      const originalHTML = buttonEl.innerHTML;
      buttonEl.innerHTML = `<span class="material-symbols-outlined" style="font-size: 18px;">check</span><span>Added!</span>`;
      buttonEl.classList.remove('btn-mocha');
      buttonEl.classList.add('btn-secondary');
      setTimeout(() => {
        buttonEl.innerHTML = originalHTML;
        buttonEl.classList.remove('btn-secondary');
        buttonEl.classList.add('btn-mocha');
      }, 1000);
    }

    if (window.showToast) {
      window.showToast(`Added ${item.name} to order bag`);
    }
  },

  updateQuantity(itemId, delta) {
    const index = this.cart.findIndex(i => i.id === itemId);
    if (index === -1) return;

    this.cart[index].quantity += delta;
    if (this.cart[index].quantity <= 0) {
      this.cart.splice(index, 1);
    }

    this.saveCartToStorage();
    this.updateCartUI();

    if (window.OrderController) {
      window.OrderController.renderCheckout();
    }
  },

  removeFromCart(itemId) {
    this.cart = this.cart.filter(i => i.id !== itemId);
    this.saveCartToStorage();
    this.updateCartUI();

    if (window.OrderController) {
      window.OrderController.renderCheckout();
    }
  },

  updateCartUI() {
    const totalCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Header badge
    const headerBadges = document.querySelectorAll('.header-cart-count');
    headerBadges.forEach(b => {
      b.textContent = totalCount;
      b.style.display = totalCount > 0 ? 'inline-flex' : 'none';
    });

    // Floating Cart Dock
    const cartDock = document.getElementById('globalCartDock');
    const dockCount = document.getElementById('dockItemCount');
    const dockStatus = document.getElementById('dockStatusText');
    const dockSubtext = document.getElementById('dockSubtext');
    const dockTotal = document.getElementById('dockTotalPrice');
    const clearBtn = document.getElementById('dockClearCartBtn');

    if (cartDock) {
      if (totalCount > 0) {
        cartDock.classList.add('visible');
        if (dockCount) dockCount.textContent = totalCount;
        if (dockStatus) dockStatus.textContent = `${totalCount} dish${totalCount === 1 ? '' : 'es'} in your selection`;
        if (dockSubtext) dockSubtext.textContent = 'Ready to order through your preferred partner';
        if (dockTotal) dockTotal.textContent = `₹${totalPrice}`;
        if (clearBtn) clearBtn.style.display = 'inline-block';
      } else {
        cartDock.classList.remove('visible');
        if (clearBtn) clearBtn.style.display = 'none';
      }
    }
  }
};

if (typeof window !== 'undefined') {
  window.MenuController = MenuController;
}
