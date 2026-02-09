const PHONE = "50493081535";
const EMAIL = "Jose.Sagastume@outlook.es";
const BRAND = "Bienes Raíces Santa Bárbara HN";
const SLOGAN = "Tu patrimonio, en manos seguras.";

function waLink(message) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${PHONE}?text=${text}`;
}

function setWhatsAppLinks() {
  const baseMsg = `Hola, vengo del sitio de ${BRAND}. ${SLOGAN}. Quiero información.`;

  const links = [
    ["waTop", baseMsg],
    ["waHero", baseMsg],
    ["waProps", baseMsg],
    ["waContact", baseMsg],
  ];

  links.forEach(([id, msg]) => {
    const el = document.getElementById(id);
    if (el) el.href = waLink(msg);
  });
}

const PROPERTIES = [
  {
    id: "SBH-001",
    tipo: "casa",
    titulo: "Casa en venta (Ejemplo)",
    ubicacion: "Santa Bárbara, HN",
    precio: "L. Consultar",
    habitaciones: 3,
    banos: 2,
    area: "—",
  },
  {
    id: "SBH-002",
    tipo: "terreno",
    titulo: "Terreno ideal para inversión (Ejemplo)",
    ubicacion: "Zona a definir",
    precio: "L. Consultar",
    habitaciones: null,
    banos: null,
    area: "—",
  },
  {
    id: "SBH-003",
    tipo: "apartamento",
    titulo: "Apartamento en renta (Ejemplo)",
    ubicacion: "Tegucigalpa / SPS (según disponibilidad)",
    precio: "L. Consultar",
    habitaciones: 2,
    banos: 1,
    area: "—",
  },
];

function renderProperties(filter = "todas") {
  const grid = document.getElementById("propertiesGrid");
  if (!grid) return;

  grid.innerHTML = "";

  const items = filter === "todas"
    ? PROPERTIES
    : PROPERTIES.filter(p => p.tipo === filter);

  if (items.length === 0) {
    grid.innerHTML = `<div class="card"><h3>Sin resultados</h3><p>Prueba otra categoría o consulta por WhatsApp.</p></div>`;
    return;
  }

  items.forEach(p => {
    const meta = [];
    meta.push(`<span class="badge">${p.tipo.toUpperCase()}</span>`);
    meta.push(`<span class="badge">${p.ubicacion}</span>`);
    meta.push(`<span class="badge">${p.precio}</span>`);
    if (p.habitaciones) meta.push(`<span class="badge">🛏️ ${p.habitaciones}</span>`);
    if (p.banos) meta.push(`<span class="badge">🛁 ${p.banos}</span>`);
    if (p.area && p.area !== "—") meta.push(`<span class="badge">📐 ${p.area}</span>`);

    const msg = `Hola, vengo del sitio de ${BRAND}. Me interesa la propiedad ${p.id} (${p.titulo}). Ubicación: ${p.ubicacion}. ¿Está disponible?`;

    const card = document.createElement("div");
    card.className = "card prop-card";
    card.innerHTML = `
      <div class="prop-photo">FOTO</div>
      <div>
        <h3>${p.titulo}</h3>
        <div class="prop-meta">${meta.join("")}</div>
      </div>
      <a class="btn btn-whatsapp" href="${waLink(msg)}" target="_blank" rel="noopener">
        Consultar por WhatsApp
      </a>
    `;
    grid.appendChild(card);
  });
}

function setupFilters() {
  const chips = document.querySelectorAll(".chip");
  chips.forEach(btn => {
    btn.addEventListener("click", () => {
      chips.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      renderProperties(btn.dataset.filter);
    });
  });
}

function setupLeadForm() {
  const form = document.getElementById("leadForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const nombre = (data.get("nombre") || "").toString().trim();
    const telefono = (data.get("telefono") || "").toString().trim();
    const interes = (data.get("interes") || "").toString().trim();
    const zona = (data.get("zona") || "").toString().trim();
    const mensaje = (data.get("mensaje") || "").toString().trim();

    const text =
`Hola, vengo del sitio de ${BRAND}.
Nombre: ${nombre}
Teléfono: ${telefono}
Interés: ${interes}
Zona: ${zona || "No indicada"}
Mensaje: ${mensaje}`;

    window.open(waLink(text), "_blank", "noopener");
  });
}

function init() {
  document.getElementById("year").textContent = new Date().getFullYear();
  setWhatsAppLinks();
  renderProperties("todas");
  setupFilters();
  setupLeadForm();
}

document.addEventListener("DOMContentLoaded", init);
