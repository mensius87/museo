// app.js
(function () {
  const DATA = window.MUSEO_DATA;
  if (!DATA) return;

  // ==============
  // Utilidades
  // ==============
  function qs(sel) { return document.querySelector(sel); }
  function qsa(sel) { return Array.from(document.querySelectorAll(sel)); }
  function getParam(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
  }

  // ==============
  // Menú móvil (hamburger)
  // ==============
  const hamburger = qs("#hamburger");
  const navMenu = qs("#navMenu");

  if (hamburger && navMenu) {
    function closeMenu() {
      navMenu.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    }
    function toggleMenu() {
      const open = navMenu.classList.toggle("open");
      hamburger.classList.toggle("open", open);
      hamburger.setAttribute("aria-expanded", String(open));
    }

    hamburger.addEventListener("click", toggleMenu);
    qsa("#navMenu a").forEach(a => a.addEventListener("click", closeMenu));
    window.addEventListener("resize", () => {
      if (window.innerWidth > 720) closeMenu();
    });
  }

  // ==============
  // LANDING: Slideshow + Colecciones (index.html)
  // ==============
  const slideshow = qs("#slideshow");
  const collectionsGrid = qs("#collectionsGrid");

  if (slideshow && collectionsGrid) {
    // Textos
    const brand = qs("#brand");
    const heroTitle = qs("#heroTitle");
    const heroTagline = qs("#heroTagline");
    const footerArtist = qs("#footerArtist");

    if (brand) brand.textContent = DATA.artist;
    if (heroTitle) heroTitle.textContent = DATA.artist;
    if (heroTagline) heroTagline.textContent = DATA.tagline;
    if (footerArtist) footerArtist.textContent = DATA.artist;

    // Slideshow
    slideshow.innerHTML = DATA.heroSlides
      .map((src, idx) => `<img src="${src}" class="${idx === 0 ? "active" : ""}" alt="">`)
      .join("");

    const slides = qsa("#slideshow img");
    let i = 0;
    setInterval(() => {
      slides[i].classList.remove("active");
      i = (i + 1) % slides.length;
      slides[i].classList.add("active");
    }, 4500);

    // Colecciones (automático)
    collectionsGrid.innerHTML = DATA.collections.map(c => {
      const href = `coleccion.html?c=${encodeURIComponent(c.id)}`;
      return `
        <a class="collection-card" href="${href}">
          <img src="${c.cover}" alt="${c.name}">
          <div class="overlay"></div>
          <div class="label">
            <h3>${c.name}</h3>
            <span>Ver obras</span>
          </div>
        </a>
      `;
    }).join("");
  }

  // ==============
  // COLECCIÓN: Render + Lightbox (coleccion.html?c=c1)
  // ==============
  const galleryGrid = qs("#galleryGrid");
  const collectionTitle = qs("#collectionTitle");
  const collectionDesc = qs("#collectionDesc");
  const pageBrand = qs("#pageBrand");

  if (galleryGrid && collectionTitle && pageBrand) {
    pageBrand.textContent = DATA.artist;

    const cId = getParam("c") || DATA.collections[0]?.id;
    const col = DATA.collections.find(x => x.id === cId) || DATA.collections[0];
    const works = DATA.works.filter(w => w.collectionId === col.id);

    document.title = `${col.name} | ${DATA.artist}`;
    collectionTitle.textContent = col.name;
    collectionDesc.textContent = col.description || "Pulsa una miniatura para ampliar.";

    galleryGrid.innerHTML = works.map((w, idx) => `
      <div class="thumb" data-idx="${idx}" data-full="${w.full}" data-left="${w.title}" data-right="${[w.tech, w.year, w.size].filter(Boolean).join(" · ")}">
        <img src="${w.thumb}" alt="${w.title}">
      </div>
    `).join("");

    // Lightbox
    const lb = qs("#lightbox");
    const lbImg = qs("#lbImg");
    const lbLeft = qs("#lbLeft");
    const lbRight = qs("#lbRight");
    const lbClose = qs("#lbClose");
    const lbPrev = qs("#lbPrev");
    const lbNext = qs("#lbNext");

    let idx = 0;

    function openAt(i) {
      idx = (i + works.length) % works.length;
      const w = works[idx];
      lbImg.src = w.full;
      lbLeft.textContent = w.title || "Obra";
      lbRight.textContent = [w.tech, w.year, w.size].filter(Boolean).join(" · ");
      lb.classList.add("open");
      document.body.style.overflow = "hidden";
    }

    function close() {
      lb.classList.remove("open");
      document.body.style.overflow = "";
      lbImg.src = "";
    }

    function prev() { openAt(idx - 1); }
    function next() { openAt(idx + 1); }

    qsa(".thumb").forEach(el => {
      el.addEventListener("click", () => openAt(Number(el.dataset.idx)));
    });

    lbClose.addEventListener("click", close);
    lbPrev.addEventListener("click", prev);
    lbNext.addEventListener("click", next);

    lb.addEventListener("click", (e) => {
      if (e.target === lb) close();
    });

    window.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    });
  }
})();
