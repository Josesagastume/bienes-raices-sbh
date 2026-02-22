// Bienes Raíces Santa Bárbara HN — propiedades (edita aquí para agregar más)
const WHATSAPP_NUMBER = "50493081535";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

const PROPERTIES = [
  {
    id: "SBH-004",
    type: "finca",
    status: "Disponible",
    title: "Finca Productiva (Café y Cardamomo)",
    location: "Trinidad, Santa Bárbara",
    size: "100 manzanas (aprox.)",
    price: "Precio por privado",
    highlight: "Ideal para inversión agrícola y desarrollo ecoturístico.",
    bullets: [
      "Sistema de riego instalado",
      "4 fuentes de agua",
      "Energía eléctrica con transformador propio",
      "Casa para empleados y bodega"
    ],
    cover: "pitontes-1.png",
    detailsUrl: "pitontes-bajos.html",
    tags: ["café", "cardamomo", "agua", "energía"]
  },
];

// --------- Render ---------
const grid = document.getElementById("propertiesGrid");

function propertyCard(p) {
  const tags = (p.tags || []).slice(0, 4).map(t => `<span class="tag">${t}</span>`).join("");
  return `
    <article class="card" data-type="${p.type}">
      <div class="card-media">
        <img src="${p.cover}" alt="${p.title}">
        <div class="badge">${p.status}</div>
      </div>

      <div class="card-body">
        <div class="card-title">${p.title}</div>
        <div class="card-meta">
          <span class="pill">${p.type.toUpperCase()}</span>
          <span class="pill">${p.location}</span>
          <span class="pill">${p.size}</span>
        </div>

        <div class="card-text">${p.highlight}</div>

        <div class="tags">${tags}</div>

        <div class="card-actions">
          <a class="btn btn-primary" href="${p.detailsUrl}">Ver detalles</a>
          <a class="btn btn-whatsapp" href="${WHATSAPP_LINK}?text=${encodeURIComponent('Hola, me interesa la propiedad ' + p.id + ' (' + p.title + '). ¿Me comparte información y coordinamos visita?')}"
             target="_blank" rel="noopener">Consultar por WhatsApp</a>
        </div>
      </div>
    </article>
  `;
}

function render(filter="todas") {
  const list = filter === "todas" ? PROPERTIES : PROPERTIES.filter(p => p.type === filter);
  grid.innerHTML = list.map(propertyCard).join("");
}

render();

// --------- Filters UI ---------
document.querySelectorAll(".chip").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    render(btn.dataset.filter);
  });
});
