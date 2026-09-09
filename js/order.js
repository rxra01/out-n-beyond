/* ==========================================================================
   OUT N BEYOND CAFE & BISTRO — ORDER & CHECKOUT CONTROLLER
   ========================================================================== */

const OrderController = {
  orderType: 'delivery', // 'delivery' | 'takeaway'
  appliedCoupon: null,
  discountAmount: 0,

  init() {
    this.bindEvents();
    this.renderCheckout();
  },

  bindEvents() {
    // Delivery vs Takeaway toggle
    const deliveryToggle = document.getElementById('orderTypeDelivery');
    const takeawayToggle = document.getElementById('orderTypeTakeaway');

    if (deliveryToggle && takeawayToggle) {
      deliveryToggle.addEventListener('click', () => {
        deliveryToggle.classList.remove('btn-card');
        deliveryToggle.classList.add('btn-mocha');
        takeawayToggle.classList.remove('btn-mocha');
        takeawayToggle.classList.add('btn-card');
        this.orderType = 'delivery';
        const addressGroup = document.getElementById('deliveryAddressGroup');
        if (addressGroup) addressGroup.style.display = 'block';
        this.renderCheckout();
      });

      takeawayToggle.addEventListener('click', () => {
        takeawayToggle.classList.remove('btn-card');
        takeawayToggle.classList.add('btn-mocha');
        deliveryToggle.classList.remove('btn-mocha');
        deliveryToggle.classList.add('btn-card');
        this.orderType = 'takeaway';
        const addressGroup = document.getElementById('deliveryAddressGroup');
        if (addressGroup) addressGroup.style.display = 'none';
        this.renderCheckout();
      });
    }

    // Coupon Apply
    const applyCouponBtn = document.getElementById('applyCouponBtn');
    const couponInput = document.getElementById('couponCodeInput');
    const couponMsg = document.getElementById('couponStatusMsg');

    if (applyCouponBtn && couponInput) {
      applyCouponBtn.addEventListener('click', () => {
        const code = couponInput.value.trim().toUpperCase();
        if (!code) return;

        if (code === 'BEYOND10') {
          this.appliedCoupon = 'BEYOND10';
          if (couponMsg) {
            couponMsg.textContent = '✓ 10% Gen-Z Perk discount applied!';
            couponMsg.style.color = 'var(--color-status-veg)';
          }
          if (window.showToast) window.showToast('10% discount applied to your order!');
        } else if (code === 'FREESHIP') {
          this.appliedCoupon = 'FREESHIP';
          if (couponMsg) {
            couponMsg.textContent = '✓ Free delivery perk applied!';
            couponMsg.style.color = 'var(--color-status-veg)';
          }
          if (window.showToast) window.showToast('Free delivery code applied!');
        } else {
          if (couponMsg) {
            couponMsg.textContent = '✗ Invalid promo code. Try BEYOND10';
            couponMsg.style.color = 'var(--color-status-nonveg)';
          }
        }
        this.renderCheckout();
      });
    }

    // Direct WhatsApp / Order submission
    const placeOrderBtn = document.getElementById('placeOrderDirectBtn');
    if (placeOrderBtn) {
      placeOrderBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.handlePlaceOrder();
      });
    }
  },

  renderCheckout() {
    const itemsList = document.getElementById('checkoutItemsList');
    const emptyNotice = document.getElementById('checkoutEmptyNotice');
    const checkoutSummaryCard = document.getElementById('checkoutSummaryCard');

    const subtotalEl = document.getElementById('checkoutSubtotal');
    const gstEl = document.getElementById('checkoutGst');
    const packagingEl = document.getElementById('checkoutPackaging');
    const deliveryEl = document.getElementById('checkoutDelivery');
    const discountRow = document.getElementById('checkoutDiscountRow');
    const discountEl = document.getElementById('checkoutDiscount');
    const finalTotalEl = document.getElementById('checkoutFinalTotal');

    if (!itemsList) return;

    const cart = (window.MenuController ? window.MenuController.cart : []);

    if (cart.length === 0) {
      itemsList.innerHTML = '';
      if (emptyNotice) emptyNotice.style.display = 'block';
      if (checkoutSummaryCard) checkoutSummaryCard.style.opacity = '0.5';
      if (subtotalEl) subtotalEl.textContent = '₹0';
      if (gstEl) gstEl.textContent = '₹0';
      if (finalTotalEl) finalTotalEl.textContent = '₹0';
      return;
    }

    if (emptyNotice) emptyNotice.style.display = 'none';
    if (checkoutSummaryCard) checkoutSummaryCard.style.opacity = '1';

    // Render Items
    itemsList.innerHTML = cart.map(item => `
      <div class="neo-card" style="padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 10px;">
        <div style="display: flex; align-items: center; gap: 12px; flex: 1;">
          <img src="${item.image}" alt="${item.name}" style="width: 54px; height: 54px; object-fit: cover; border-radius: var(--radius-sm); border: 1.5px solid var(--color-border-dark);" />
          <div>
            <h4 class="text-title-md" style="font-size: 15px; color: var(--color-border-dark); line-height: 1.2;">${item.name}</h4>
            <span class="text-body-sm" style="color: var(--color-primary-container); font-weight: 700;">₹${item.price} each</span>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 12px;">
          <!-- Quantity Stepper -->
          <div style="display: flex; align-items: center; border: 1.5px solid var(--color-border-dark); border-radius: var(--radius-sm); overflow: hidden; background: var(--color-surface-cream);">
            <button class="order-qty-btn" onclick="MenuController.updateQuantity('${item.id}', -1)" style="padding: 4px 10px; border: none; background: transparent; cursor: pointer; font-weight: 700;">-</button>
            <span style="padding: 4px 8px; font-family: var(--font-title); font-weight: 700; min-width: 28px; text-align: center;">${item.quantity}</span>
            <button class="order-qty-btn" onclick="MenuController.updateQuantity('${item.id}', 1)" style="padding: 4px 10px; border: none; background: transparent; cursor: pointer; font-weight: 700;">+</button>
          </div>

          <span class="text-title-md" style="min-width: 60px; text-align: right; color: var(--color-border-dark);">
            ₹${item.price * item.quantity}
          </span>

          <button onclick="MenuController.removeFromCart('${item.id}')" title="Remove item" style="background: none; border: none; color: var(--color-error); cursor: pointer; padding: 4px;">
            <span class="material-symbols-outlined" style="font-size: 20px;">delete</span>
          </button>
        </div>
      </div>
    `).join('');

    // Calculations
    const itemSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gst = Math.round(itemSubtotal * 0.05); // 5% GST on food
    const packagingFee = (this.orderType === 'delivery') ? 20 : 0;
    let deliveryFee = (this.orderType === 'delivery') ? 40 : 0;

    if (this.appliedCoupon === 'FREESHIP') {
      deliveryFee = 0;
    }

    let discount = 0;
    if (this.appliedCoupon === 'BEYOND10') {
      discount = Math.round(itemSubtotal * 0.10);
    }

    const finalTotal = Math.max(0, itemSubtotal + gst + packagingFee + deliveryFee - discount);

    if (subtotalEl) subtotalEl.textContent = `₹${itemSubtotal}`;
    if (gstEl) gstEl.textContent = `₹${gst}`;
    if (packagingEl) packagingEl.textContent = `₹${packagingFee}`;
    if (deliveryEl) deliveryEl.textContent = (deliveryFee === 0 && this.orderType === 'delivery') ? 'FREE' : `₹${deliveryFee}`;

    if (discount > 0) {
      if (discountRow) discountRow.style.display = 'flex';
      if (discountEl) discountEl.textContent = `-₹${discount}`;
    } else {
      if (discountRow) discountRow.style.display = 'none';
    }

    if (finalTotalEl) finalTotalEl.textContent = `₹${finalTotal}`;
  },

  handlePlaceOrder() {
    const cart = (window.MenuController ? window.MenuController.cart : []);
    if (cart.length === 0) {
      if (window.showToast) window.showToast('Your order bag is empty! Add dishes from the menu first.');
      return;
    }

    const nameInput = document.getElementById('orderCustomerName');
    const phoneInput = document.getElementById('orderCustomerPhone');
    const addressInput = document.getElementById('orderDeliveryAddress');
    const notesInput = document.getElementById('orderSpecialNotes');

    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const address = addressInput ? addressInput.value.trim() : '';
    const notes = notesInput ? notesInput.value.trim() : '';

    if (!name || !phone) {
      if (window.showToast) window.showToast('Please enter your name and phone number to proceed');
      return;
    }

    if (this.orderType === 'delivery' && !address) {
      if (window.showToast) window.showToast('Please enter your delivery address in Kolkata');
      return;
    }

    // Build WhatsApp Message
    const itemSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gst = Math.round(itemSubtotal * 0.05);
    const packagingFee = (this.orderType === 'delivery') ? 20 : 0;
    const deliveryFee = (this.orderType === 'delivery' && this.appliedCoupon !== 'FREESHIP') ? 40 : 0;
    const discount = (this.appliedCoupon === 'BEYOND10') ? Math.round(itemSubtotal * 0.10) : 0;
    const grandTotal = itemSubtotal + gst + packagingFee + deliveryFee - discount;

    let itemsSummary = cart.map(i => `• ${i.name} x ${i.quantity} (₹${i.price * i.quantity})`).join('\n');

    const message = `*NEW CAFE ORDER — OUT N BEYOND*\n------------------------\n*Customer:* ${name}\n*Phone:* +91 ${phone}\n*Order Type:* ${this.orderType.toUpperCase()}\n${this.orderType === 'delivery' ? `*Address:* ${address}\n` : ''}${notes ? `*Notes:* ${notes}\n` : ''}------------------------\n*Items Ordered:*\n${itemsSummary}\n------------------------\n*Subtotal:* ₹${itemSubtotal}\n*GST (5%):* ₹${gst}\n*Packaging:* ₹${packagingFee}\n*Delivery:* ₹${deliveryFee}\n${discount > 0 ? `*Discount (${this.appliedCoupon}):* -₹${discount}\n` : ''}*TOTAL BILL:* ₹${grandTotal}\n------------------------\nPlease confirm dispatch time & payment link. Thank you!`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=919830012345&text=${encoded}`;

    window.open(whatsappUrl, '_blank');

    if (window.showToast) {
      window.showToast('🚀 Order dispatched via WhatsApp! Opening chat...');
    }
  }
};

if (typeof window !== 'undefined') {
  window.OrderController = OrderController;
}
