// app.js
(function () {
  const DATA = window.MUSEO_DATA;
  if (!DATA) return;

  function qs(sel, root=document) { return root.querySelector(sel); }
  function qsa(sel, root=document) { return Array.from(root.querySelectorAll(sel)); }
  function getParam(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
  }

  // Navbar scrolled effect
  const navbar = document.getElementById("navbar");
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 20) navbar.classList.add("scrolled");
      else navbar.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Menú móvil: robusto (funciona en index y coleccion)
  const navRoot = qs("[data-nav]");
  if (navRoot) {
    const hamburger = qs("[data-hamburger]", navRoot);
    const navMenu = qs("[data-navmenu]", navRoot);

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
      qsa("a", navMenu).forEach(a => a.addEventListener("click", closeMenu));
      window.addEventListener("resize", () => { if (window.innerWidth > 720) closeMenu(); });
    }
  }

  // LANDING
  const slideshow = document.getElementById("slideshow");
  const collectionsGrid = document.getElementById("collectionsGrid");

  if (slideshow && collectionsGrid) {
    const brand = document.getElementById("brand");
    const heroTitle = document.getElementById("heroTitle");
    const heroTagline = document.getElementById("heroTagline");
    const footerArtist = document.getElementById("footerArtist");

    if (brand) brand.textContent = DATA.artist;
    if (heroTitle) heroTitle.textContent = DATA.artist;
    if (heroTagline) heroTagline.textContent = DATA.tagline;
    if (footerArtist) footerArtist.textContent = DATA.artist;

    slideshow.innerHTML = (DATA.heroSlides || [])
      .map((src, idx) => `<img src="${src}" class="${idx === 0 ? "active" : ""}" alt="">`)
      .join("");

    const slides = qsa("img", slideshow);
    let i = 0;
    if (slides.length > 1) {
      setInterval(() => {
        slides[i].classList.remove("active");
        i = (i + 1) % slides.length;
        slides[i].classList.add("active");
      }, 4500);
    }

    collectionsGrid.innerHTML = (DATA.collections || []).map(c => {
      const href = `coleccion.html?c=${encodeURIComponent(c.id)}`;
      return `
        <a class="collection-card" href="${href}">
          <img src="${c.cover}" alt="${c.name}">
          <div class="overlay"></div>
          <div class="label">
            <h3>${c.name}</h3>
          </div>
        </a>
      `;
    }).join("");
  }

  // COLECCIÓN + LIGHTBOX + ZOOM
  const galleryGrid = document.getElementById("galleryGrid");
  const collectionTitle = document.getElementById("collectionTitle");
  const collectionDesc = document.getElementById("collectionDesc");
  const pageBrand = document.getElementById("pageBrand");

  if (galleryGrid && collectionTitle) {
    if (pageBrand) pageBrand.textContent = DATA.artist;

    const cId = getParam("c") || (DATA.collections?.[0]?.id ?? "");
    const col = (DATA.collections || []).find(x => x.id === cId) || (DATA.collections || [])[0];
    const works = (DATA.works || []).filter(w => w.collectionId === col.id);

    document.title = `${col.name} | ${DATA.artist}`;
    collectionTitle.textContent = col.name;
    if (collectionDesc) collectionDesc.textContent = col.description || "Pulsa una miniatura para ampliar.";

    galleryGrid.innerHTML = works.map((w, idx) => `
      <div class="thumb" data-idx="${idx}">
        <img src="${w.thumb}" alt="${w.title}">
      </div>
    `).join("");

    const lb = document.getElementById("lightbox");
    const lbImg = document.getElementById("lbImg");
    const lbLeft = document.getElementById("lbLeft");
    const lbRight = document.getElementById("lbRight");
    const lbClose = document.getElementById("lbClose");
    const lbPrev = document.getElementById("lbPrev");
    const lbNext = document.getElementById("lbNext");
    const viewport = document.getElementById("lbViewport");

    let idx = 0;

    // Zoom state
    let scale = 1;
    let tx = 0;
    let ty = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    function applyTransform() {
      lbImg.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    }
    function resetZoom() {
      scale = 1;
      tx = 0;
      ty = 0;
      applyTransform();
    }

    function clampPan() {
      // Pan simple: limita desplazamiento según zoom y viewport
      const rect = viewport.getBoundingClientRect();
      const maxX = (rect.width * (scale - 1)) / 2;
      const maxY = (rect.height * (scale - 1)) / 2;
      tx = Math.max(-maxX, Math.min(maxX, tx));
      ty = Math.max(-maxY, Math.min(maxY, ty));
    }

    function openAt(i) {
      if (!works.length) return;
      idx = (i + works.length) % works.length;
      const w = works[idx];

      lbImg.src = w.full;
      lbLeft.textContent = w.title || "Obra";
      lbRight.textContent = [w.tech, w.year, w.size].filter(Boolean).join(" · ");

      lb.classList.add("open");
      document.body.style.overflow = "hidden";
      resetZoom();
    }

    function close() {
      lb.classList.remove("open");
      document.body.style.overflow = "";
      lbImg.src = "";
      resetZoom();
    }
    function prev() { openAt(idx - 1); }
    function next() { openAt(idx + 1); }

    qsa(".thumb", galleryGrid).forEach(el => {
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
      if (e.key === "0") resetZoom();
    });

    // Zoom con rueda
    viewport.addEventListener("wheel", (e) => {
      if (!lb.classList.contains("open")) return;
      e.preventDefault();

      const zoomFactor = e.deltaY < 0 ? 1.12 : 0.89;
      const prevScale = scale;
      scale = Math.max(1, Math.min(6, scale * zoomFactor));

      // Ajuste suave de pan al zoom hacia el cursor
      const rect = viewport.getBoundingClientRect();
      const mx = e.clientX - (rect.left + rect.width / 2);
      const my = e.clientY - (rect.top + rect.height / 2);
      if (scale !== prevScale) {
        tx += mx * (scale - prevScale) * 0.10;
        ty += my * (scale - prevScale) * 0.10;
      }

      clampPan();
      applyTransform();
    }, { passive: false });

    // Drag para mover (solo si zoom>1)
    viewport.addEventListener("mousedown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (scale <= 1) return;
      isDragging = true;
      startX = e.clientX - tx;
      startY = e.clientY - ty;
    });
    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      tx = e.clientX - startX;
      ty = e.clientY - startY;
      clampPan();
      applyTransform();
    });
    window.addEventListener("mouseup", () => { isDragging = false; });

    // Doble click toggle zoom
    viewport.addEventListener("dblclick", () => {
      if (!lb.classList.contains("open")) return;
      if (scale === 1) scale = 2.5;
      else scale = 1;
      tx = 0; ty = 0;
      clampPan();
      applyTransform();
    });
  }
})();
