// data.js
// Añade colecciones y obras aquí. La web se actualiza sola.

window.MUSEO_DATA = {
  artist: "Padre de Elisa",
  tagline: "Exploración artística en colecciones",

  // Slideshow del hero (landing)
  heroSlides: [
    "images/hero-1.jpg",
    "images/hero-2.jpg",
    "images/hero-3.jpg",
  ],

  // Colecciones (aparecen automáticamente en la landing)
  collections: [
    { id: "c1", name: "Colección I", cover: "images/colecciones/c1/01.jpg", description: "Descripción breve (opcional)." },
    { id: "c2", name: "Colección II", cover: "images/colecciones/c2/01.jpg", description: "Descripción breve (opcional)." },
    { id: "c3", name: "Colección III", cover: "images/colecciones/c3/01.jpg", description: "Descripción breve (opcional)." },
    { id: "c4", name: "Colección IV", cover: "images/colecciones/c4/01.jpg", description: "Descripción breve (opcional)." },
    { id: "c5", name: "Colección V", cover: "images/colecciones/c5/01.jpg", description: "Descripción breve (opcional)." },
  ],

  // Obras (aparecen automáticamente en su colección)
  // thumb y full pueden ser el mismo archivo
  works: [
    // Colección 1 (ejemplos)
    { id: "c1-01", collectionId: "c1", title: "Obra 01", year: "2026", tech: "Óleo sobre lienzo", size: "80×60 cm", thumb: "images/colecciones/c1/01.jpg", full: "images/colecciones/c1/01.jpg" },
    { id: "c1-02", collectionId: "c1", title: "Obra 02", year: "2026", tech: "Acrílico",          size: "70×50 cm", thumb: "images/colecciones/c1/02.jpg", full: "images/colecciones/c1/02.jpg" },

    // Colección 2
    { id: "c2-01", collectionId: "c2", title: "Obra 01", year: "2025", tech: "Técnica mixta",     size: "60×60 cm", thumb: "images/colecciones/c2/01.jpg", full: "images/colecciones/c2/01.jpg" },

    // Colección 3
    { id: "c3-01", collectionId: "c3", title: "Obra 01", year: "2024", tech: "Óleo",              size: "90×70 cm", thumb: "images/colecciones/c3/01.jpg", full: "images/colecciones/c3/01.jpg" },

    // Colección 4
    { id: "c4-01", collectionId: "c4", title: "Obra 01", year: "2023", tech: "Acrílico",          size: "100×80 cm", thumb: "images/colecciones/c4/01.jpg", full: "images/colecciones/c4/01.jpg" },

    // Colección 5
    { id: "c5-01", collectionId: "c5", title: "Obra 01", year: "2022", tech: "Tinta / Mixta",     size: "50×40 cm", thumb: "images/colecciones/c5/01.jpg", full: "images/colecciones/c5/01.jpg" },
  ],
};
