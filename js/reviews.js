/* ==========================================================================
   OUT N BEYOND CAFE & BISTRO — REVIEWS CONTROLLER
   ========================================================================== */

const ReviewsController = {
  activeFilter: 'all',
  selectedRating: 5,
  localReviews: [],

  init() {
    this.localReviews = [...BusinessData.reviews];
    this.renderReviews();
    this.bindEvents();
  },

  bindEvents() {
    // Filter tabs
    const tabs = document.querySelectorAll('.review-filter-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => {
          t.classList.remove('btn-mocha');
          t.classList.add('btn-card');
        });
        tab.classList.remove('btn-card');
        tab.classList.add('btn-mocha');

        this.activeFilter = tab.getAttribute('data-filter');
        this.renderReviews();
      });
    });

    // Write Review modal triggers
    const writeBtn = document.getElementById('openWriteReviewModalBtn');
    const modal = document.getElementById('writeReviewModal');
    const closeBtn = document.getElementById('closeWriteReviewModalBtn');

    if (writeBtn && modal) {
      writeBtn.addEventListener('click', () => modal.classList.add('open'));
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => modal.classList.remove('open'));
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('open');
      });
    }

    // Star rating picker
    const starPicker = document.querySelectorAll('.review-star-btn');
    starPicker.forEach(star => {
      star.addEventListener('click', () => {
        const rating = parseInt(star.getAttribute('data-star'), 10);
        this.selectedRating = rating;
        starPicker.forEach(s => {
          const sVal = parseInt(s.getAttribute('data-star'), 10);
          const icon = s.querySelector('.material-symbols-outlined');
          if (sVal <= rating) {
            icon.style.fontVariationSettings = "'FILL' 1";
            icon.style.color = "var(--color-accent-sunset)";
          } else {
            icon.style.fontVariationSettings = "'FILL' 0";
            icon.style.color = "var(--color-outline)";
          }
        });
      });
    });

    // Form submission
    const form = document.getElementById('writeReviewForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleReviewSubmit();
      });
    }
  },

  renderReviews() {
    const container = document.getElementById('reviewsCardsContainer');
    if (!container) return;

    const filtered = this.localReviews.filter(rev => {
      if (this.activeFilter === 'all') return true;
      return rev.category === this.activeFilter;
    });

    container.innerHTML = filtered.map(rev => {
      const starsHTML = Array(5).fill(0).map((_, i) => {
        const isFilled = i < Math.floor(rev.rating);
        const isHalf = !isFilled && i < rev.rating;
        return `
          <span class="material-symbols-outlined" style="font-size: 18px; color: var(--color-accent-sunset); font-variation-settings: 'FILL' ${isFilled ? 1 : 0};">
            ${isHalf ? 'star_half' : 'star'}
          </span>
        `;
      }).join('');

      return `
        <article class="neo-card neo-card-parchment" style="padding: var(--space-lg); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1.5px solid rgba(43,33,25,0.15); padding-bottom: 8px; margin-bottom: 12px;">
              <div style="display: flex; gap: 2px;">
                ${starsHTML}
              </div>
              <span class="text-body-sm" style="font-family: var(--font-title); font-size: 11px; color: var(--color-on-surface-variant);">${rev.date}</span>
            </div>

            <p class="text-body-md" style="font-style: italic; line-height: 1.6; color: var(--color-on-surface); margin-bottom: 16px;">
              "${rev.quote}"
            </p>
          </div>

          <div style="display: flex; align-items: center; gap: 10px; border-top: 1.5px solid rgba(43,33,25,0.15); padding-top: 12px;">
            <div style="width: 36px; height: 36px; border-radius: var(--radius-full); background: var(--color-accent-terracotta-soft); border: 1.5px solid var(--color-border-dark); display: flex; align-items: center; justify-content: center; font-family: var(--font-title); font-weight: 700; color: var(--color-tertiary);">
              ${rev.reviewerName.charAt(0)}
            </div>
            <div>
              <span class="text-title-md" style="display: block; font-size: 15px; color: var(--color-border-dark);">${rev.reviewerName}</span>
              <span class="text-body-sm" style="font-size: 12px; color: var(--color-on-surface-variant);">${rev.role}</span>
            </div>
          </div>
        </article>
      `;
    }).join('');
  },

  handleReviewSubmit() {
    const nameInput = document.getElementById('newReviewerName');
    const roleInput = document.getElementById('newReviewerRole');
    const quoteInput = document.getElementById('newReviewQuote');
    const categorySelect = document.getElementById('newReviewCategory');

    const name = nameInput ? nameInput.value.trim() : '';
    const quote = quoteInput ? quoteInput.value.trim() : '';
    const role = roleInput ? roleInput.value.trim() : 'Diner in Kolkata';
    const category = categorySelect ? categorySelect.value : 'coffee';

    if (!name || !quote) {
      if (window.showToast) window.showToast('Please enter your name and review quote');
      return;
    }

    const newRev = {
      id: 'rev-' + Date.now(),
      reviewerName: name,
      role: role || 'Verified Diner',
      rating: this.selectedRating,
      date: 'Just now',
      category: category,
      quote: quote,
      source: 'Website Submission',
      isFeatured: false
    };

    this.localReviews.unshift(newRev);
    this.renderReviews();

    const modal = document.getElementById('writeReviewModal');
    if (modal) modal.classList.remove('open');

    if (nameInput) nameInput.value = '';
    if (roleInput) roleInput.value = '';
    if (quoteInput) quoteInput.value = '';

    if (window.showToast) {
      window.showToast('Thank you! Your review has been added to our community wall.');
    }
  }
};

if (typeof window !== 'undefined') {
  window.ReviewsController = ReviewsController;
}
