/**
 * M-SPEED SRL - Script essenziale
 * Gestione menu mobile e scroll header
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile drawer controls
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const closeBtn = document.getElementById('drawer-close-btn');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    if (drawer && overlay) {
      drawer.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    }
  }

  function closeDrawer() {
    if (drawer && overlay) {
      drawer.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  // Sticky header shadow on scroll
  const header = document.querySelector('.site-header');
  
  // Create reading progress bar dynamically
  let progressBar = document.querySelector('.scroll-progress-bar');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    document.body.prepend(progressBar);
  }

  // Create back to top button dynamically
  let backToTop = document.querySelector('.back-to-top');
  if (!backToTop) {
    backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Torna in cima');
    backToTop.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>';
    document.body.appendChild(backToTop);
    
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Scroll listener for header, progress bar, and back-to-top
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Header shadow
    if (scrollY > 15) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Reading progress bar
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const scrollPercent = (scrollY / docHeight) * 100;
      progressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
    }

    // Back to top button visibility
    if (scrollY > 350) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  // IntersectionObserver for fast, flawless scroll reveal animations
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '60px 0px 60px 0px',
      threshold: 0
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Fallback: Ensure no content remains hidden on slow devices or rapid flings
    setTimeout(() => {
      document.querySelectorAll('.reveal:not(.revealed)').forEach(el => el.classList.add('revealed'));
    }, 800);
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // =========================================================================
  // NOTIZIE & COMUNICAZIONI CLIENTI: FILTRI E MODALE ARTICOLO COMPLETO
  // =========================================================================
  const NEWS_ARTICLES = {
    'nord-europa-dedicate': {
      category: 'Nuove Tratte',
      date: 'Ottobre 2026',
      title: 'Potenziamento Nord Europa: linee dedicate per Belgio-Lussemburgo e Olanda',
      body: `
        <p>La separazione operativa tra la direttrice Belgio-Lussemburgo e la direttrice Olanda consente instradamenti più diretti verso gli interporti di Bruxelles, Anversa, Liegi, Rotterdam, Amsterdam ed Eindhoven.</p>
        <div class="news-modal-highlight">
          <strong>1. Linea Settimanale Belgio e Lussemburgo:</strong> collegamento dedicato verso gli snodi di Bruxelles, Anversa, Liegi, Gand, Charleroi e il Granducato di Lussemburgo.<br><br>
          <strong>2. Linea Settimanale Olanda (Paesi Bassi):</strong> instradamento diretto verso Rotterdam, Amsterdam, Eindhoven, Utrecht, Tilburg, Venlo e i principali interporti olandesi.
        </div>
        <p>Entrambe le direttrici partono regolarmente ogni settimana dai nostri due centri operativi di <strong>Montecosaro (MC)</strong> e <strong>Fucecchio (FI)</strong>, con il consueto presidio diretto del nostro ufficio traffico.</p>
      `
    }
  };

  // Filter buttons on notizie.html
  const filterButtons = document.querySelectorAll('.news-filter-btn');
  const newsCards = document.querySelectorAll('#news-grid .news-card');
  const countLabel = document.getElementById('news-count-label');

  if (filterButtons.length > 0 && newsCards.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        let visibleCount = 0;

        newsCards.forEach(card => {
          const cat = card.getAttribute('data-category');
          if (filter === 'all' || cat === filter) {
            card.style.display = 'flex';
            visibleCount++;
          } else {
            card.style.display = 'none';
          }
        });

        if (countLabel) {
          countLabel.textContent = visibleCount === 1
            ? '1 comunicazione pubblicata'
            : `${visibleCount} comunicazioni pubblicate`;
        }
      });
    });
  }

  // Modal creation and handler for [data-open-news]
  const newsOpenButtons = document.querySelectorAll('[data-open-news]');
  if (newsOpenButtons.length > 0) {
    let modalBackdrop = document.getElementById('news-modal-backdrop');
    if (!modalBackdrop) {
      modalBackdrop = document.createElement('div');
      modalBackdrop.id = 'news-modal-backdrop';
      modalBackdrop.className = 'news-modal-backdrop';
      modalBackdrop.setAttribute('role', 'dialog');
      modalBackdrop.setAttribute('aria-modal', 'true');
      modalBackdrop.innerHTML = `
        <div class="news-modal-dialog">
          <div class="news-modal-header">
            <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
              <span id="news-modal-cat" class="news-category-badge">Comunicazione</span>
              <span id="news-modal-date" class="news-date"></span>
            </div>
            <button type="button" id="news-modal-close" class="news-modal-close" aria-label="Chiudi approfondimento">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div class="news-modal-body">
            <h2 id="news-modal-title" style="font-size:24px; font-weight:800; color:var(--color-text-main); line-height:1.3; margin-bottom:18px;"></h2>
            <div id="news-modal-content"></div>
            <div style="margin-top:28px; padding-top:20px; border-top:1px solid var(--color-border); display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:12px;">
              <div style="font-size:13px; color:var(--color-text-muted);">
                <strong>Ufficio Traffico &amp; Commerciale:</strong> MC 0733 865651 · FI 0571 35457
              </div>
              <div style="display:flex; gap:10px; flex-wrap:wrap;">
                <a href="destinazioni.html" class="btn btn-secondary btn-sm">Vedi Destinazioni</a>
                <a href="contatti.html" class="btn btn-primary btn-sm">Contatta l'ufficio</a>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modalBackdrop);
    }

    const modalCat = document.getElementById('news-modal-cat');
    const modalDate = document.getElementById('news-modal-date');
    const modalTitle = document.getElementById('news-modal-title');
    const modalContent = document.getElementById('news-modal-content');
    const modalClose = document.getElementById('news-modal-close');

    function closeNewsModal() {
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }

    newsOpenButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-open-news');
        const article = NEWS_ARTICLES[key];
        if (!article) return;

        modalCat.textContent = article.category;
        modalDate.textContent = article.date;
        modalTitle.textContent = article.title;
        modalContent.innerHTML = article.body;

        modalBackdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    if (modalClose) modalClose.addEventListener('click', closeNewsModal);
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeNewsModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
        closeNewsModal();
      }
    });
  }
});
