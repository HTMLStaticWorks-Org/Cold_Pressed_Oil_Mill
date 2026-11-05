/**
 * MARACHEKKU NATURALS — Complete Frontend Interactive System
 * Handles:
 * 1. Light / Dark Theme Toggle (persisted in localStorage)
 * 2. Desktop & Mobile Navigation + Dropdowns + Hamburger Menu
 * 3. Product Card Rendering, Size Selection, Filtering, Search & Sorting
 * 4. Product Details Modal with Image Gallery & Enquiry Pre-fill
 * 5. Working Wishlist & Cart Drawers (persisted in localStorage)
 * 6. Global Search Drawer
 * 7. Bulk Enquiry Form Validation & Honest Frontend Demo Confirmation
 * 8. Back-to-Top Smooth Control
 */

(function () {
  "use strict";

  const STORAGE_KEYS = {
    THEME: "marachekku_theme",
    CART: "marachekku_cart_v1",
    WISHLIST: "marachekku_wishlist_v1"
  };

  const products = window.MARACHEKKU_PRODUCTS || [];

  // State
  let cart = loadStorage(STORAGE_KEYS.CART, []);
  let wishlist = loadStorage(STORAGE_KEYS.WISHLIST, []);
  let selectedSizes = {}; // productId -> sizeIndex
  products.forEach((p) => {
    selectedSizes[p.id] = 1 < p.sizes.length ? 1 : 0; // Default to 1L or first size
  });

  function loadStorage(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function saveStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // Ignore storage quota errors
    }
  }

  function formatINR(amount) {
    return "₹" + Number(amount).toLocaleString("en-IN");
  }

  // =========================================================================
  // 1. THEME SYSTEM
  // =========================================================================
  function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    applyTheme(initialTheme);

    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
        const next = current === "dark" ? "light" : "dark";
        applyTheme(next);
        try {
          localStorage.setItem(STORAGE_KEYS.THEME, next);
        } catch (e) {}
      });
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      const isDark = theme === "dark";
      btn.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
      btn.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
      btn.innerHTML = isDark
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    });
  }

  // =========================================================================
  // 2. NAVIGATION, DROPDOWNS & MOBILE MENU
  // =========================================================================
  function initNavigation() {
    const header = document.querySelector(".site-header");
    const hamburger = document.querySelector("[data-hamburger]");
    const navMenu = document.querySelector("[data-nav-menu]");
    const dropdownItems = document.querySelectorAll(".nav-item.has-dropdown");

    // Sticky scroll effect
    const onScroll = () => {
      if (header) {
        header.classList.toggle("scrolled", window.scrollY > 16);
      }
      const btt = document.querySelector("[data-back-to-top]");
      if (btt) {
        btt.classList.toggle("visible", window.scrollY > 420);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Hamburger toggle
    if (hamburger && navMenu) {
      hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = navMenu.classList.toggle("mobile-open");
        hamburger.setAttribute("aria-expanded", String(isOpen));
        hamburger.innerHTML = isOpen
          ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
          : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
      });
    }

    // Dropdown toggles (click support on both desktop and mobile)
    dropdownItems.forEach((item) => {
      const toggleLink = item.querySelector(".nav-link");
      if (!toggleLink) return;

      toggleLink.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const wasOpen = item.classList.contains("dropdown-open");
        dropdownItems.forEach((other) => {
          other.classList.remove("dropdown-open");
          const otherBtn = other.querySelector(".nav-link");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        });
        if (!wasOpen) {
          item.classList.add("dropdown-open");
          toggleLink.setAttribute("aria-expanded", "true");
        }
      });
    });

    // Close mobile menu when clicking a navigation link
    if (navMenu) {
      navMenu.querySelectorAll("a:not([data-dropdown-toggle])").forEach((link) => {
        link.addEventListener("click", () => {
          navMenu.classList.remove("mobile-open");
          if (hamburger) {
            hamburger.setAttribute("aria-expanded", "false");
            hamburger.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
          }
          dropdownItems.forEach((item) => item.classList.remove("dropdown-open"));
        });
      });
    }

    // Close dropdowns / mobile menu on outside click or Escape
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".nav-item.has-dropdown")) {
        dropdownItems.forEach((item) => {
          item.classList.remove("dropdown-open");
          const btn = item.querySelector(".nav-link");
          if (btn) btn.setAttribute("aria-expanded", "false");
        });
      }
      if (
        navMenu &&
        navMenu.classList.contains("mobile-open") &&
        !e.target.closest("[data-nav-menu]") &&
        !e.target.closest("[data-hamburger]")
      ) {
        navMenu.classList.remove("mobile-open");
        if (hamburger) {
          hamburger.setAttribute("aria-expanded", "false");
          hamburger.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
        }
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        dropdownItems.forEach((item) => item.classList.remove("dropdown-open"));
        if (navMenu) navMenu.classList.remove("mobile-open");
        closeAllDrawersAndModals();
      }
    });

    // Back-to-top click
    const btt = document.querySelector("[data-back-to-top]");
    if (btt) {
      btt.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

  // =========================================================================
  // 3. PRODUCT CARD RENDERING & INTERACTIONS
  // =========================================================================
  function createProductCardHTML(product) {
    const sizeIdx = selectedSizes[product.id] || 0;
    const currentSize = product.sizes[sizeIdx] || product.sizes[0];
    const inWishlist = wishlist.includes(product.id);

    const sizeChipsHTML = product.sizes
      .map(
        (s, idx) =>
          `<button type="button" class="size-chip ${idx === sizeIdx ? "active" : ""}" data-size-select="${product.id}" data-size-index="${idx}">${s.label}</button>`
      )
      .join("");

    return `
      <article class="product-card" data-product-card="${product.id}">
        <div class="product-media">
          <a href="#product-${product.id}" data-open-product="${product.id}" aria-label="View details for ${product.name}">
            <img src="${product.image}" alt="${product.name} - ${product.tamilName}" loading="lazy" width="400" height="400">
          </a>
          <span class="product-category-pill">${product.categoryLabel}</span>
          <button type="button" class="wishlist-toggle-btn ${inWishlist ? "active" : ""}" data-wishlist-toggle="${product.id}" aria-label="${inWishlist ? "Remove from wishlist" : "Save to wishlist"}" title="Save to Wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${inWishlist ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
        </div>
        <div class="product-body">
          <div class="product-subtitle">${product.tamilName}</div>
          <h3 class="product-title">
            <a href="#product-${product.id}" data-open-product="${product.id}">${product.name}</a>
          </h3>
          <p class="product-desc">${product.shortDesc}</p>
          <span class="product-sizes-label">Available Packaging Sizes:</span>
          <div class="product-sizes" role="group" aria-label="Select container size">
            ${sizeChipsHTML}
          </div>
          <div class="product-footer">
            <div class="product-price-wrap">
              <span class="product-price-label" data-price-size-label="${product.id}">${currentSize.label}</span>
              <strong class="product-price" data-price-display="${product.id}">${formatINR(currentSize.price)}</strong>
            </div>
            <div class="product-actions">
              <button type="button" class="btn btn-secondary btn-sm" data-open-product="${product.id}">Details</button>
              <button type="button" class="btn btn-primary btn-sm" data-add-to-cart="${product.id}">+ Order / Sample</button>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function renderFeaturedProducts() {
    const featuredContainer = document.querySelector("[data-featured-products]");
    if (!featuredContainer) return;
    const featuredList = products.filter((p) => p.featured).slice(0, 4);
    featuredContainer.innerHTML = featuredList.map(createProductCardHTML).join("");
  }

  function renderHome2Collection() {
    const home2Container = document.querySelector("[data-home2-products]");
    if (!home2Container) return;
    // Show 6 representative oils across categories
    const representative = [
      products.find((p) => p.id === "groundnut-classic"),
      products.find((p) => p.id === "sesame-nallennai"),
      products.find((p) => p.id === "coconut-velichennai"),
      products.find((p) => p.id === "mustard-kachighani"),
      products.find((p) => p.id === "castor-amanakku"),
      products.find((p) => p.id === "other-sweet-almond")
    ].filter(Boolean);
    home2Container.innerHTML = representative.map(createProductCardHTML).join("");
  }

  // =========================================================================
  // 4. PRODUCTS PAGE CATALOGUE (FILTER, SEARCH, SORT)
  // =========================================================================
  function initProductsCatalogue() {
    const grid = document.querySelector("[data-catalogue-grid]");
    if (!grid) return;

    const filterBtns = document.querySelectorAll("[data-category-filter]");
    const searchInput = document.querySelector("[data-catalogue-search]");
    const sortSelect = document.querySelector("[data-catalogue-sort]");
    const countLabel = document.querySelector("[data-catalogue-count]");

    let activeCategory = "all";
    let searchQuery = "";
    let sortMode = "featured";

    // Parse URL parameters
    const params = new URLSearchParams(window.location.search);
    if (params.get("category")) {
      activeCategory = params.get("category").toLowerCase();
    }
    if (params.get("search")) {
      searchQuery = params.get("search").trim();
      if (searchInput) searchInput.value = searchQuery;
    }
    if (params.get("product")) {
      const targetProd = products.find((p) => p.id === params.get("product"));
      if (targetProd) {
        setTimeout(() => openProductModal(targetProd.id), 150);
      }
    }

    function updateFilterUI() {
      filterBtns.forEach((btn) => {
        const cat = btn.getAttribute("data-category-filter");
        btn.classList.toggle("active", cat === activeCategory);
      });
    }

    function renderCatalogue() {
      updateFilterUI();
      let filtered = products.filter((p) => {
        const matchesCat = activeCategory === "all" || p.category === activeCategory;
        if (!matchesCat) return false;
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.tamilName.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q) ||
          p.rawIngredients.toLowerCase().includes(q) ||
          p.culinaryUses.toLowerCase().includes(q)
        );
      });

      if (sortMode === "price-asc") {
        filtered.sort((a, b) => a.sizes[0].price - b.sizes[0].price);
      } else if (sortMode === "price-desc") {
        filtered.sort((a, b) => b.sizes[0].price - a.sizes[0].price);
      } else if (sortMode === "name-asc") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      }

      if (countLabel) {
        countLabel.textContent = `Showing ${filtered.length} of ${products.length} traditional cold-pressed oils`;
      }

      if (filtered.length === 0) {
        grid.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1.5rem; background: var(--color-bg-elevated); border: 1px solid var(--color-border); border-radius: var(--radius-lg);">
            <h3 style="margin-bottom: 0.5rem;">No matching oils found</h3>
            <p style="color: var(--color-text-muted); margin-bottom: 1.25rem;">Try clearing your search query or switching to "All Oils".</p>
            <button type="button" class="btn btn-primary btn-sm" data-reset-catalogue>Show All Oils</button>
          </div>
        `;
      } else {
        grid.innerHTML = filtered.map(createProductCardHTML).join("");
      }
    }

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        activeCategory = btn.getAttribute("data-category-filter") || "all";
        renderCatalogue();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value.trim();
        renderCatalogue();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        sortMode = e.target.value;
        renderCatalogue();
      });
    }

    grid.addEventListener("click", (e) => {
      if (e.target.closest("[data-reset-catalogue]")) {
        activeCategory = "all";
        searchQuery = "";
        if (searchInput) searchInput.value = "";
        renderCatalogue();
      }
    });

    renderCatalogue();
  }

  // =========================================================================
  // 5. DELEGATED PRODUCT INTERACTIONS (SIZE CHIP, WISHLIST, ADD TO CART, MODAL)
  // =========================================================================
  function initDelegatedProductEvents() {
    document.addEventListener("click", (e) => {
      // Size chip selection
      const sizeBtn = e.target.closest("[data-size-select]");
      if (sizeBtn) {
        const prodId = sizeBtn.getAttribute("data-size-select");
        const idx = parseInt(sizeBtn.getAttribute("data-size-index"), 10);
        selectedSizes[prodId] = idx;
        const prod = products.find((p) => p.id === prodId);
        if (!prod || !prod.sizes[idx]) return;

        // Update all matching size buttons & price displays on page and modal
        document.querySelectorAll(`[data-size-select="${prodId}"]`).forEach((btn) => {
          btn.classList.toggle("active", parseInt(btn.getAttribute("data-size-index"), 10) === idx);
        });
        document.querySelectorAll(`[data-price-display="${prodId}"]`).forEach((el) => {
          el.textContent = formatINR(prod.sizes[idx].price);
        });
        document.querySelectorAll(`[data-price-size-label="${prodId}"]`).forEach((el) => {
          el.textContent = prod.sizes[idx].label;
        });
        return;
      }

      // Open product details modal
      const openBtn = e.target.closest("[data-open-product]");
      if (openBtn) {
        e.preventDefault();
        const prodId = openBtn.getAttribute("data-open-product");
        openProductModal(prodId);
        return;
      }

      // Toggle wishlist
      const wishBtn = e.target.closest("[data-wishlist-toggle]");
      if (wishBtn) {
        e.preventDefault();
        const prodId = wishBtn.getAttribute("data-wishlist-toggle");
        toggleWishlist(prodId);
        return;
      }

      // Add to cart
      const cartBtn = e.target.closest("[data-add-to-cart]");
      if (cartBtn) {
        e.preventDefault();
        const prodId = cartBtn.getAttribute("data-add-to-cart");
        const sizeIdx = selectedSizes[prodId] || 0;
        addToCart(prodId, sizeIdx);
        return;
      }
    });
  }

  // =========================================================================
  // 6. PRODUCT DETAILS MODAL
  // =========================================================================
  function ensureSharedModalsExist() {
    if (document.getElementById("product-detail-modal")) return;

    const modalHTML = `
      <!-- Product Details Modal -->
      <div class="modal-backdrop" id="product-detail-modal" role="dialog" aria-modal="true" aria-labelledby="modal-product-title">
        <div class="product-modal">
          <button type="button" class="modal-close-btn" data-close-modal aria-label="Close product details">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <div id="product-modal-content"></div>
        </div>
      </div>

      <!-- Slide-Over Backdrop -->
      <div class="drawer-backdrop" id="global-drawer-backdrop" data-close-drawers></div>

      <!-- Global Search Drawer -->
      <aside class="side-drawer" id="search-drawer" aria-label="Search Products">
        <div class="drawer-header">
          <h3>Search Our Oils</h3>
          <button type="button" class="icon-btn" data-close-drawers aria-label="Close search drawer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div class="drawer-body">
          <div class="input-search-wrap" style="margin-bottom: 1.25rem;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="search" id="global-search-input" placeholder="Search groundnut, nallennai, coconut, bulk tin..." aria-label="Search oils">
          </div>
          <div id="global-search-results"></div>
        </div>
      </aside>

      <!-- Wishlist Drawer -->
      <aside class="side-drawer" id="wishlist-drawer" aria-label="Saved Oils Wishlist">
        <div class="drawer-header">
          <h3>Saved Oils Wishlist</h3>
          <button type="button" class="icon-btn" data-close-drawers aria-label="Close wishlist drawer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div class="drawer-body" id="wishlist-drawer-body"></div>
        <div class="drawer-footer">
          <a href="products.html" class="btn btn-secondary" style="width: 100%;">Explore Full Catalogue</a>
        </div>
      </aside>

      <!-- Sample / Retail & Bulk Order Cart Drawer -->
      <aside class="side-drawer" id="cart-drawer" aria-label="Order & Enquiry List">
        <div class="drawer-header">
          <h3>Order &amp; Sample List</h3>
          <button type="button" class="icon-btn" data-close-drawers aria-label="Close order drawer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div class="drawer-body" id="cart-drawer-body"></div>
        <div class="drawer-footer" id="cart-drawer-footer"></div>
      </aside>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);

    // Event bindings for modal & drawers
    document.querySelectorAll("[data-close-modal]").forEach((btn) => {
      btn.addEventListener("click", closeProductModal);
    });
    const modalBackdrop = document.getElementById("product-detail-modal");
    if (modalBackdrop) {
      modalBackdrop.addEventListener("click", (e) => {
        if (e.target === modalBackdrop) closeProductModal();
      });
    }

    document.querySelectorAll("[data-close-drawers]").forEach((el) => {
      el.addEventListener("click", closeAllDrawersAndModals);
    });

    // Navbar triggers for Search, Wishlist, Cart
    document.querySelectorAll("[data-open-search]").forEach((btn) => {
      btn.addEventListener("click", () => {
        openDrawer("search-drawer");
        const input = document.getElementById("global-search-input");
        if (input) {
          setTimeout(() => input.focus(), 100);
          renderGlobalSearchResults(input.value);
        }
      });
    });

    document.querySelectorAll("[data-open-wishlist]").forEach((btn) => {
      btn.addEventListener("click", () => {
        renderWishlistDrawer();
        openDrawer("wishlist-drawer");
      });
    });

    document.querySelectorAll("[data-open-cart]").forEach((btn) => {
      btn.addEventListener("click", () => {
        renderCartDrawer();
        openDrawer("cart-drawer");
      });
    });

    const globalSearchInput = document.getElementById("global-search-input");
    if (globalSearchInput) {
      globalSearchInput.addEventListener("input", (e) => {
        renderGlobalSearchResults(e.target.value);
      });
    }
  }

  function openProductModal(productId) {
    ensureSharedModalsExist();
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const sizeIdx = selectedSizes[product.id] || 0;
    const currentSize = product.sizes[sizeIdx] || product.sizes[0];
    const modal = document.getElementById("product-detail-modal");
    const content = document.getElementById("product-modal-content");

    const galleryImages = [
      { src: product.image, label: "Retail Glass Bottle" },
      { src: product.secondaryImage || "assets/images/product-groundnut-tin.svg", label: "5L / 15L Bulk Tin" },
      { src: product.processImage || "assets/images/process-3-extraction.svg", label: "Chekku Extraction" }
    ];

    const sizeButtonsHTML = product.sizes
      .map(
        (s, idx) =>
          `<button type="button" class="size-chip ${idx === sizeIdx ? "active" : ""}" data-size-select="${product.id}" data-size-index="${idx}">${s.label} — ${formatINR(s.price)}</button>`
      )
      .join("");

    content.innerHTML = `
      <div class="modal-grid">
        <div>
          <div class="modal-gallery-main">
            <img src="${galleryImages[0].src}" alt="${product.name}" id="modal-main-img" width="440" height="440">
          </div>
          <div class="modal-gallery-thumbs" role="group" aria-label="Product image gallery">
            ${galleryImages
              .map(
                (img, idx) => `
              <button type="button" class="gallery-thumb ${idx === 0 ? "active" : ""}" data-gallery-src="${img.src}" title="${img.label}">
                <img src="${img.src}" alt="${img.label}">
              </button>
            `
              )
              .join("")}
          </div>
        </div>
        <div>
          <span class="eyebrow">${product.categoryLabel}</span>
          <h2 id="modal-product-title" style="margin-bottom: 0.25rem;">${product.name}</h2>
          <p style="color: var(--color-olive); font-weight: 600; font-size: 0.9rem; margin-bottom: 1rem;">${product.tamilName}</p>
          <p style="margin-bottom: 1.25rem;">${product.fullDesc}</p>

          <div style="margin-bottom: 1.25rem;">
            <span class="product-sizes-label">Select Packaging Size:</span>
            <div class="product-sizes">${sizeButtonsHTML}</div>
          </div>

          <div style="display: flex; align-items: baseline; gap: 0.75rem; margin-bottom: 1.25rem;">
            <strong class="heading-2" data-price-display="${product.id}">${formatINR(currentSize.price)}</strong>
            <span style="font-size: 0.85rem; color: var(--color-text-muted);" data-price-size-label="${product.id}">${currentSize.label}</span>
          </div>

          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.5rem;">
            <button type="button" class="btn btn-primary" data-add-to-cart="${product.id}">Add to Sample / Order List</button>
            <a href="about-contact.html?oil=${encodeURIComponent(product.categoryLabel)}&pack=${encodeURIComponent(currentSize.label)}#bulk-enquiry" class="btn btn-gold">Bulk / Trade Enquiry</a>
          </div>

          <div class="spec-list">
            <div class="spec-row">
              <strong>Extraction Method</strong>
              <span>${product.extractionMethod}</span>
            </div>
            <div class="spec-row">
              <strong>Raw Ingredients</strong>
              <span>${product.rawIngredients}</span>
            </div>
            <div class="spec-row">
              <strong>Recommended Uses</strong>
              <span>${product.culinaryUses}</span>
            </div>
            <div class="spec-row">
              <strong>Available Sizes</strong>
              <span>${product.sizes.map((s) => s.label).join(", ")}</span>
            </div>
            <div class="spec-row">
              <strong>Storage Care</strong>
              <span>${product.storageInstructions}</span>
            </div>
          </div>
        </div>
      </div>
    `;

    // Bind gallery thumbnail clicks
    content.querySelectorAll("[data-gallery-src]").forEach((thumb) => {
      thumb.addEventListener("click", () => {
        const src = thumb.getAttribute("data-gallery-src");
        const mainImg = document.getElementById("modal-main-img");
        if (mainImg && src) mainImg.src = src;
        content.querySelectorAll("[data-gallery-src]").forEach((t) => t.classList.remove("active"));
        thumb.classList.add("active");
      });
    });

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeProductModal() {
    const modal = document.getElementById("product-detail-modal");
    if (modal) {
      modal.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  function openDrawer(drawerId) {
    closeProductModal();
    document.querySelectorAll(".side-drawer").forEach((d) => d.classList.remove("open"));
    const drawer = document.getElementById(drawerId);
    const backdrop = document.getElementById("global-drawer-backdrop");
    if (drawer) drawer.classList.add("open");
    if (backdrop) backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeAllDrawersAndModals() {
    closeProductModal();
    document.querySelectorAll(".side-drawer").forEach((d) => d.classList.remove("open"));
    const backdrop = document.getElementById("global-drawer-backdrop");
    if (backdrop) backdrop.classList.remove("open");
    document.body.style.overflow = "";
  }

  // =========================================================================
  // 7. WISHLIST & CART LOGIC
  // =========================================================================
  function updateNavBadges() {
    const wishCount = wishlist.length;
    const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

    document.querySelectorAll("[data-wishlist-badge]").forEach((el) => {
      el.textContent = wishCount > 0 ? String(wishCount) : "";
      el.setAttribute("data-count", String(wishCount));
    });

    document.querySelectorAll("[data-cart-badge]").forEach((el) => {
      el.textContent = cartCount > 0 ? String(cartCount) : "";
      el.setAttribute("data-count", String(cartCount));
    });
  }

  function toggleWishlist(productId) {
    const idx = wishlist.indexOf(productId);
    if (idx >= 0) {
      wishlist.splice(idx, 1);
    } else {
      wishlist.push(productId);
    }
    saveStorage(STORAGE_KEYS.WISHLIST, wishlist);
    updateNavBadges();

    // Update heart icons on page
    const inWish = wishlist.includes(productId);
    document.querySelectorAll(`[data-wishlist-toggle="${productId}"]`).forEach((btn) => {
      btn.classList.toggle("active", inWish);
      const svg = btn.querySelector("svg");
      if (svg) svg.setAttribute("fill", inWish ? "currentColor" : "none");
    });

    renderWishlistDrawer();
  }

  function renderWishlistDrawer() {
    const body = document.getElementById("wishlist-drawer-body");
    if (!body) return;

    if (wishlist.length === 0) {
      body.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem;">
          <p style="color: var(--color-text-muted); margin-bottom: 1rem;">Your saved oils list is currently empty.</p>
          <p style="font-size: 0.86rem; color: var(--color-text-muted);">Tap the heart icon on any cold-pressed oil to bookmark it for comparison or bulk enquiry.</p>
        </div>
      `;
      return;
    }

    body.innerHTML = wishlist
      .map((id) => {
        const p = products.find((item) => item.id === id);
        if (!p) return "";
        return `
          <div class="drawer-item">
            <img src="${p.image}" alt="${p.name}" class="drawer-item-img">
            <div class="drawer-item-info">
              <h4>${p.name}</h4>
              <p style="font-size: 0.8rem; color: var(--color-text-muted);">From ${formatINR(p.sizes[0].price)} (${p.sizes[0].label})</p>
              <div style="display: flex; gap: 0.5rem; margin-top: 0.4rem;">
                <button type="button" class="btn btn-primary btn-sm" style="padding: 0.25rem 0.65rem; min-height: 28px; font-size: 0.76rem;" data-add-to-cart="${p.id}">+ Add to List</button>
                <button type="button" class="btn btn-secondary btn-sm" style="padding: 0.25rem 0.65rem; min-height: 28px; font-size: 0.76rem;" data-wishlist-toggle="${p.id}">Remove</button>
              </div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  function addToCart(productId, sizeIndex) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    const sizeObj = product.sizes[sizeIndex] || product.sizes[0];
    const key = `${productId}__${sizeObj.label}`;

    const existing = cart.find((item) => item.key === key);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        key,
        productId: product.id,
        name: product.name,
        image: product.image,
        sizeLabel: sizeObj.label,
        price: sizeObj.price,
        qty: 1
      });
    }

    saveStorage(STORAGE_KEYS.CART, cart);
    updateNavBadges();
    renderCartDrawer();
    openDrawer("cart-drawer");
  }

  function renderCartDrawer() {
    const body = document.getElementById("cart-drawer-body");
    const footer = document.getElementById("cart-drawer-footer");
    if (!body || !footer) return;

    if (cart.length === 0) {
      body.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem;">
          <p style="color: var(--color-text-muted); margin-bottom: 0.75rem;">Your sample &amp; order list is empty.</p>
          <p style="font-size: 0.86rem; color: var(--color-text-muted);">Select any bottle or bulk tin size from our catalogue to build your retail order or wholesale quote list.</p>
        </div>
      `;
      footer.innerHTML = `<a href="products.html" class="btn btn-primary" style="width: 100%;">Browse Cold-Pressed Oils</a>`;
      return;
    }

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    body.innerHTML = cart
      .map(
        (item) => `
        <div class="drawer-item">
          <img src="${item.image}" alt="${item.name}" class="drawer-item-img">
          <div class="drawer-item-info">
            <h4>${item.name}</h4>
            <p style="font-size: 0.8rem; color: var(--color-text-muted);">${item.sizeLabel} • ${formatINR(item.price)} each</p>
            <div class="qty-controls">
              <button type="button" class="qty-btn" data-cart-qty="${item.key}" data-delta="-1" aria-label="Decrease quantity">−</button>
              <span class="qty-val">${item.qty}</span>
              <button type="button" class="qty-btn" data-cart-qty="${item.key}" data-delta="1" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <div style="text-align: right;">
            <strong style="font-size: 0.92rem; display: block;">${formatINR(item.price * item.qty)}</strong>
            <button type="button" style="font-size: 0.75rem; color: var(--color-error); margin-top: 4px;" data-cart-remove="${item.key}">Remove</button>
          </div>
        </div>
      `
      )
      .join("");

    const summaryQuery = encodeURIComponent(
      cart.map((i) => `${i.name} (${i.sizeLabel} x ${i.qty})`).join(", ")
    );

    footer.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
        <span style="font-weight: 600;">Estimated Total</span>
        <strong class="heading-3">${formatINR(subtotal)}</strong>
      </div>
      <p style="font-size: 0.78rem; color: var(--color-text-muted); margin-bottom: 1rem;">Transfer your selected items directly to our Mill Enquiry Desk for retail dispatch or wholesale pricing.</p>
      <div style="display: grid; gap: 0.5rem;">
        <a href="about-contact.html?cartSummary=${summaryQuery}#bulk-enquiry" class="btn btn-primary" style="width: 100%;">Proceed to Order / Enquiry Form</a>
        <button type="button" class="btn btn-secondary btn-sm" id="clear-cart-btn" style="width: 100%;">Clear List</button>
      </div>
    `;

    body.querySelectorAll("[data-cart-qty]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-cart-qty");
        const delta = parseInt(btn.getAttribute("data-delta"), 10);
        const target = cart.find((c) => c.key === key);
        if (target) {
          target.qty += delta;
          if (target.qty <= 0) {
            cart = cart.filter((c) => c.key !== key);
          }
          saveStorage(STORAGE_KEYS.CART, cart);
          updateNavBadges();
          renderCartDrawer();
        }
      });
    });

    body.querySelectorAll("[data-cart-remove]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-cart-remove");
        cart = cart.filter((c) => c.key !== key);
        saveStorage(STORAGE_KEYS.CART, cart);
        updateNavBadges();
        renderCartDrawer();
      });
    });

    const clearBtn = document.getElementById("clear-cart-btn");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        cart = [];
        saveStorage(STORAGE_KEYS.CART, cart);
        updateNavBadges();
        renderCartDrawer();
      });
    }
  }

  function renderGlobalSearchResults(query) {
    const container = document.getElementById("global-search-results");
    if (!container) return;
    const q = (query || "").trim().toLowerCase();
    const matches = !q
      ? products.slice(0, 6)
      : products.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.tamilName.toLowerCase().includes(q) ||
            p.categoryLabel.toLowerCase().includes(q) ||
            p.shortDesc.toLowerCase().includes(q)
        );

    if (matches.length === 0) {
      container.innerHTML = `<p style="color: var(--color-text-muted); font-size: 0.9rem;">No oils found matching "${query}".</p>`;
      return;
    }

    container.innerHTML = matches
      .map(
        (p) => `
        <div class="drawer-item">
          <img src="${p.image}" alt="${p.name}" class="drawer-item-img">
          <div class="drawer-item-info">
            <h4><a href="#product-${p.id}" data-open-product="${p.id}">${p.name}</a></h4>
            <p style="font-size: 0.78rem; color: var(--color-text-muted);">${p.tamilName}</p>
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--color-primary);">From ${formatINR(p.sizes[0].price)}</span>
          </div>
          <button type="button" class="btn btn-secondary btn-sm" data-open-product="${p.id}">View</button>
        </div>
      `
      )
      .join("");
  }

  // =========================================================================
  // 8. BULK ENQUIRY FORM VALIDATION & DEMO CONFIRMATION
  // =========================================================================
  function initBulkEnquiryForm() {
    const form = document.getElementById("bulk-enquiry-form");
    if (!form) return;

    // Pre-populate fields from URL parameters if present
    const params = new URLSearchParams(window.location.search);
    const oilParam = params.get("oil");
    const packParam = params.get("pack");
    const cartSummary = params.get("cartSummary");

    if (oilParam) {
      const oilSelect = form.querySelector('[name="oilType"]');
      if (oilSelect) {
        Array.from(oilSelect.options).forEach((opt) => {
          if (opt.value.toLowerCase().includes(oilParam.toLowerCase())) {
            oilSelect.value = opt.value;
          }
        });
      }
    }

    if (packParam) {
      const packSelect = form.querySelector('[name="packagingPreference"]');
      if (packSelect) {
        if (packParam.toLowerCase().includes("15")) packSelect.value = "15L Bulk Tin Cans";
        else if (packParam.toLowerCase().includes("5")) packSelect.value = "5L Food-Grade Tin Cans";
        else packSelect.value = "500ml & 1L Retail Glass Bottles";
      }
    }

    if (cartSummary) {
      const notesField = form.querySelector('[name="additionalRequirements"]');
      if (notesField) {
        notesField.value = `Selected Order / Sample Items:\n${cartSummary}\n\nPlease share dispatch timeline and pricing details.`;
      }
    }

    const requiredFields = [
      { name: "fullName", validate: (v) => v.trim().length >= 2, msg: "Please enter your full name." },
      { name: "companyName", validate: (v) => v.trim().length >= 2, msg: "Please enter your business, store, or household name." },
      { name: "email", validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: "Please enter a valid email address." },
      { name: "phone", validate: (v) => /^[+\d\s\-()]{8,18}$/.test(v.trim()), msg: "Please enter a valid 10-digit phone or WhatsApp number." },
      { name: "enquiryType", validate: (v) => v.trim() !== "", msg: "Please select an enquiry type." },
      { name: "oilType", validate: (v) => v.trim() !== "", msg: "Please select the oil variety you are interested in." },
      { name: "requiredQuantity", validate: (v) => v.trim().length >= 1, msg: "Please specify your estimated quantity (e.g., 20 Litres, 10 × 15L Tins)." },
      { name: "packagingPreference", validate: (v) => v.trim() !== "", msg: "Please choose a packaging preference." },
      { name: "deliveryLocation", validate: (v) => v.trim().length >= 2, msg: "Please enter your city, district, or delivery pin code." }
    ];

    function validateField(fieldSpec) {
      const input = form.querySelector(`[name="${fieldSpec.name}"]`);
      if (!input) return true;
      const group = input.closest(".form-group");
      const errEl = group ? group.querySelector(".field-error") : null;
      const isValid = fieldSpec.validate(input.value);

      input.classList.toggle("invalid", !isValid);
      if (group) group.classList.toggle("has-error", !isValid);
      if (errEl && !isValid) errEl.textContent = fieldSpec.msg;
      return isValid;
    }

    // Real-time blur/input validation
    requiredFields.forEach((spec) => {
      const input = form.querySelector(`[name="${spec.name}"]`);
      if (input) {
        input.addEventListener("blur", () => validateField(spec));
        input.addEventListener("input", () => {
          if (input.classList.contains("invalid")) validateField(spec);
        });
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let allValid = true;
      let firstInvalid = null;

      requiredFields.forEach((spec) => {
        const ok = validateField(spec);
        if (!ok) {
          allValid = false;
          if (!firstInvalid) firstInvalid = form.querySelector(`[name="${spec.name}"]`);
        }
      });

      if (!allValid) {
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Build honest frontend-demo confirmation summary
      const data = new FormData(form);
      const refCode = "MN-ENQ-" + Math.floor(100000 + Math.random() * 900000);
      const successBanner = document.getElementById("enquiry-success-banner");

      if (successBanner) {
        successBanner.innerHTML = `
          <div style="display: flex; align-items: flex-start; gap: 1rem;">
            <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--color-primary); color: var(--color-on-primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-weight: 700;">✓</div>
            <div>
              <h3 style="font-size: 1.25rem; margin-bottom: 0.35rem;">Enquiry Preview Recorded (Frontend Demo State)</h3>
              <p style="font-size: 0.92rem; margin-bottom: 0.75rem;">
                Thank you, <strong>${escapeHTML(data.get("fullName"))}</strong> (${escapeHTML(data.get("companyName"))}). Your bulk/trade enquiry for <strong>${escapeHTML(data.get("requiredQuantity"))}</strong> of <strong>${escapeHTML(data.get("oilType"))}</strong> (${escapeHTML(data.get("packagingPreference"))}) to <strong>${escapeHTML(data.get("deliveryLocation"))}</strong> has been validated with demo reference <code>${refCode}</code>.
              </p>
              <p style="font-size: 0.82rem; color: var(--color-text-muted); margin-bottom: 0.9rem;">
                <em>Note: This template operates in frontend demonstration mode—no external email or backend server submission has been transmitted. Connect the form action to your preferred backend endpoint or email service for live production use.</em>
              </p>
              <button type="button" class="btn btn-secondary btn-sm" id="reset-enquiry-btn">Submit Another Demo Enquiry</button>
            </div>
          </div>
        `;
        successBanner.classList.add("visible");
        successBanner.scrollIntoView({ behavior: "smooth", block: "nearest" });

        const resetBtn = document.getElementById("reset-enquiry-btn");
        if (resetBtn) {
          resetBtn.addEventListener("click", () => {
            form.reset();
            successBanner.classList.remove("visible");
          });
        }
      }
    });
  }

  function escapeHTML(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // =========================================================================
  // INITIALISE ALL MODULES ON DOM READY
  // =========================================================================
  document.addEventListener("DOMContentLoaded", () => {
    ensureSharedModalsExist();
    initTheme();
    initNavigation();
    renderFeaturedProducts();
    renderHome2Collection();
    initProductsCatalogue();
    initDelegatedProductEvents();
    initBulkEnquiryForm();
    updateNavBadges();
  });
})();

