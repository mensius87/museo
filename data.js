// data.js
window.MUSEO_DATA = {
  artist: "Padre de Elisa",
  tagline: "Exploración artística en colecciones",

  heroSlides: [
    "images/hero-1.jpg",
    "images/hero-2.jpg",
    "images/hero-3.jpg",
    "images/hero-4.jpg",
  ],

  collections: [
    { id: "c1", name: "Colección I",  cover: "images/c1-portada.jpg", description: "Descripción breve (opcional)." },
    { id: "c2", name: "Colección II", cover: "images/c2-portada.jpg", description: "Descripción breve (opcional)." },
    { id: "c3", name: "Colección III",cover: "images/c3-portada.jpg", description: "Descripción breve (opcional)." },
    { id: "c4", name: "Colección IV", cover: "images/c4-portada.jpg", description: "Descripción breve (opcional)." },
    { id: "c5", name: "Colección V",  cover: "images/c5-portada.jpg", description: "Descripción breve (opcional)." },
  ],
  
  works: [
    { id: "c1-01", collectionId: "c1", title: "Obra 01", year: "2026", tech: "Óleo sobre lienzo", size: "80×60 cm", thumb: "images/colecciones/c1/01.jpg", full: "images/colecciones/c1/01.jpg" },
    { id: "c1-07", collectionId: "c1", title: "Obra 07", year: "2025", tech: "Técnica mixta",     size: "60×60 cm", thumb: "images/colecciones/c1/07.jpg", full: "images/colecciones/c1/07.jpg" },
    { id: "c3-01", collectionId: "c3", title: "Obra 01", year: "2024", tech: "Óleo",              size: "90×70 cm", thumb: "images/3.jpg", full: "images/3.jpg" },
    { id: "c4-01", collectionId: "c4", title: "Obra 01", year: "2023", tech: "Acrílico",          size: "100×80 cm", thumb: "images/4.jpg", full: "images/4.jpg" },
    { id: "c5-01", collectionId: "c5", title: "Obra 01", year: "2022", tech: "Tinta / Mixta",     size: "50×40 cm", thumb: "images/5.jpg", full: "images/5.jpg" },
  ],
};
