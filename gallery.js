(function(){
  const thumbs = Array.from(document.querySelectorAll("[data-full]"));
  const lb = document.querySelector(".lightbox");
  if (!lb || thumbs.length === 0) return;

  const img = lb.querySelector(".lightbox-media img");
  const captionLeft = lb.querySelector("[data-cap-left]");
  const captionRight = lb.querySelector("[data-cap-right]");
  const btnClose = lb.querySelector(".lb-close");
  const btnPrev = lb.querySelector(".lb-prev");
  const btnNext = lb.querySelector(".lb-next");

  let idx = 0;

  function openAt(i){
    idx = (i + thumbs.length) % thumbs.length;
    const t = thumbs[idx];
    img.src = t.dataset.full;
    captionLeft.textContent = t.dataset.title || "Obra";
    captionRight.textContent = t.dataset.meta || "";
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function close(){
    lb.classList.remove("open");
    document.body.style.overflow = "";
    img.src = "";
  }

  function prev(){ openAt(idx - 1); }
  function next(){ openAt(idx + 1); }

  thumbs.forEach((t, i) => {
    t.addEventListener("click", () => openAt(i));
  });

  btnClose.addEventListener("click", close);
  btnPrev.addEventListener("click", prev);
  btnNext.addEventListener("click", next);

  lb.addEventListener("click", (e) => {
    if (e.target === lb) close();
  });

  window.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });
})();
