/* ==========================================================================
   OUT N BEYOND CAFE & BISTRO — GALLERY & REELS CONTROLLER
   ========================================================================== */

const GalleryController = {
  activeFilter: 'all',

  init() {
    this.renderGallery();
    this.bindEvents();
  },

  bindEvents() {
    // Filter tabs
    const tabs = document.querySelectorAll('.gallery-filter-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => {
          t.classList.remove('btn-mocha');
          t.classList.add('btn-card');
        });
        tab.classList.remove('btn-card');
        tab.classList.add('btn-mocha');

        this.activeFilter = tab.getAttribute('data-filter');
        this.renderGallery();
      });
    });

    // Lightbox modal close
    const closeBtn = document.getElementById('closeLightboxBtn');
    const modal = document.getElementById('galleryLightboxModal');
    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => modal.classList.remove('open'));
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('open');
      });
    }

    // Reel click simulation
    document.querySelectorAll('.reel-interactive-card').forEach((card, index) => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.reel-mute-btn')) {
          e.stopPropagation();
          const muteBtn = e.target.closest('.reel-mute-btn');
          const icon = muteBtn.querySelector('.material-symbols-outlined');
          if (icon.textContent === 'volume_up') {
            icon.textContent = 'volume_off';
            if (window.showToast) window.showToast('Muted reel audio');
          } else {
            icon.textContent = 'volume_up';
            if (window.showToast) window.showToast('Playing original Kolkata cafe audio 🎶');
          }
          return;
        }

        const reelData = BusinessData.reels[index % BusinessData.reels.length];
        this.openReelModal(reelData);
      });
    });

    // Reel modal close
    const closeReelBtn = document.getElementById('closeReelModalBtn');
    const reelModal = document.getElementById('reelPlayerModal');
    if (closeReelBtn && reelModal) {
      closeReelBtn.addEventListener('click', () => reelModal.classList.remove('open'));
      reelModal.addEventListener('click', (e) => {
        if (e.target === reelModal) reelModal.classList.remove('open');
      });
    }
  },

  renderGallery() {
    const container = document.getElementById('galleryMasonryContainer');
    if (!container) return;

    const items = BusinessData.galleryMedia.filter(item => {
      if (this.activeFilter === 'all') return true;
      return item.category.includes(this.activeFilter);
    });

    container.innerHTML = items.map((item, idx) => {
      const colSpanClass = (idx === 0) ? 'bento-span-2' : (idx === 5 ? 'bento-span-2' : '');
      const aspectStyle = (idx === 0 || idx === 5) ? 'aspect-ratio: 16/10;' : 'aspect-ratio: 1/1;';

      return `
        <div class="gallery-snap-item neo-card ${colSpanClass}" data-id="${item.id}" style="padding: 10px; cursor: pointer;">
          <div style="position: relative; width: 100%; ${aspectStyle} border-radius: var(--radius-md); overflow: hidden; border: 1.5px solid var(--color-border-dark);">
            <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 400ms ease;" class="snap-img" loading="lazy" />
            <div style="position: absolute; top: 8px; left: 8px;">
              <span class="badge badge-mocha" style="font-size: 10px;">${item.categoryLabel}</span>
            </div>
            <div class="snap-hover-overlay" style="position: absolute; inset: 0; background: rgba(43,33,25,0.45); opacity: 0; display: flex; align-items: center; justify-content: center; transition: opacity 250ms;">
              <span class="btn btn-card btn-sm" style="box-shadow: var(--shadow-sm);">
                <span class="material-symbols-outlined" style="font-size: 16px;">zoom_in</span>
                <span>View Story</span>
              </span>
            </div>
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 8px;">
            <h4 class="text-title-md" style="color: var(--color-border-dark); font-size: 14px;">${item.title}</h4>
            <span class="text-body-sm" style="color: var(--color-on-surface-variant); display: inline-flex; align-items: center; gap: 3px;">
              <span class="material-symbols-outlined" style="font-size: 14px; color: var(--color-accent-sunset);">favorite</span>
              <span>${item.saves}</span>
            </span>
          </div>
        </div>
      `;
    }).join('');

    // Attach click listeners for lightbox
    container.querySelectorAll('.gallery-snap-item').forEach(snap => {
      snap.addEventListener('mouseenter', () => {
        const overlay = snap.querySelector('.snap-hover-overlay');
        const img = snap.querySelector('.snap-img');
        if (overlay) overlay.style.opacity = '1';
        if (img) img.style.transform = 'scale(1.05)';
      });

      snap.addEventListener('mouseleave', () => {
        const overlay = snap.querySelector('.snap-hover-overlay');
        const img = snap.querySelector('.snap-img');
        if (overlay) overlay.style.opacity = '0';
        if (img) img.style.transform = 'scale(1)';
      });

      snap.addEventListener('click', () => {
        const id = snap.getAttribute('data-id');
        const data = BusinessData.galleryMedia.find(m => m.id === id);
        if (data) this.openLightbox(data);
      });
    });
  },

  openLightbox(data) {
    const modal = document.getElementById('galleryLightboxModal');
    const imgEl = document.getElementById('lightboxImg');
    const titleEl = document.getElementById('lightboxTitle');
    const quoteEl = document.getElementById('lightboxQuote');
    const authorEl = document.getElementById('lightboxAuthor');
    const badgeEl = document.getElementById('lightboxBadge');

    if (!modal) return;

    if (imgEl) imgEl.src = data.image;
    if (titleEl) titleEl.textContent = `"${data.reviewer.title}"`;
    if (quoteEl) quoteEl.textContent = `"${data.reviewer.quote}"`;
    if (authorEl) authorEl.textContent = data.reviewer.author;
    if (badgeEl) badgeEl.textContent = data.reviewer.badge;

    modal.classList.add('open');
  },

  openReelModal(reel) {
    const modal = document.getElementById('reelPlayerModal');
    const imgEl = document.getElementById('reelModalImg');
    const titleEl = document.getElementById('reelModalTitle');
    const descEl = document.getElementById('reelModalDesc');
    const viewsEl = document.getElementById('reelModalViews');
    const likesEl = document.getElementById('reelModalLikes');

    if (!modal) return;

    if (imgEl) imgEl.src = reel.image;
    if (titleEl) titleEl.textContent = reel.title;
    if (descEl) descEl.textContent = reel.description;
    if (viewsEl) viewsEl.textContent = reel.views;
    if (likesEl) likesEl.textContent = reel.likes;

    modal.classList.add('open');
  }
};
