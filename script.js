const COMPANY = {
  name: "Bienes Raíces Santa Bárbara HN",
  whatsappNumber: "50493081535"
};

const PROPERTIES = [
  {
    id: "pitontes-bajos",
    title: "Finca Pitontes Bajos",
    type: "FINCA",
    location: "Trinidad, Santa Bárbara",
    size: "102.21 manzanas",
    tags: ["finca"],
    summary:
      "Ideal para eco-lodge, hotel de montaña o glamping. Fuentes de agua, electricidad con transformador e infraestructura existente.",
    image: "pitontes-1.png",
    detailsUrl: "pitontes-bajos.html"
  },
  {
    id: "finca-trinidad",
    title: "Finca Trinidad",
    type: "FINCA",
    location: "Trinidad, Santa Bárbara",
    size: "100 manzanas",
    tags: ["finca"],
    summary:
      "Finca productiva y con alto potencial de inversión. Solicita información completa y agenda tu visita (precio y ubicación exacta solo por privado).",
    image: "ft-01.png",
    detailsUrl: "finca-trinidad.html"
  }
];

function waLink(text) {
  return `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

function render(filter = "all") {
  const grid = document.getElementById("propertiesGrid");
  if (!grid) return;

  grid.innerHTML = "";

  const items =
    filter === "all"
      ? PROPERTIES
      : PROPERTIES.filter((p) => p.tags.includes(filter));

  items.forEach((p) => {
    const card = document.createElement("article");
    card.className = "property card";

    card.innerHTML = `
      <div class="property__top">
        <span class="badge">${p.type}</span>
      </div>

      <div class="property__media" style="background-image:url('${p.image}');"></div>

      <div class="property__body">
        <h3>${p.title}</h3>

        <div class="property__meta">
          <span class="pill">${p.location}</span>
          <span class="pill">${p.size}</span>
        </div>

        <p class="muted">${p.summary}</p>

        <div class="property__actions">
          <a class="btn btn--sm" href="${p.detailsUrl}">Ver detalles</a>
          <a class="btn btn--sm btn--ghost" target="_blank" rel="noopener"
             href="${waLink(`Hola, me interesa ${p.title}. ¿Me brinda más información?`)}">
             WhatsApp
          </a>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

function initFilters() {
  const chips = document.querySelectorAll(".chip");
  chips.forEach((btn) => {
    btn.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("is-active"));
      btn.classList.add("is-active");
      render(btn.dataset.filter);
    });
  });
}

function initLeadForm() {
  const form = document.getElementById("leadForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);

    const name = data.get("name") || "";
    const phone = data.get("phone") || "";
    const interest = data.get("interest") || "";
    const zone = data.get("zone") || "";
    const msg = data.get("message") || "";

    const text =
      `Hola ${COMPANY.name}. Mi nombre es ${name}.\n` +
      `Tel/WhatsApp: ${phone}\n` +
      `Interés: ${interest}\n` +
      (zone ? `Zona: ${zone}\n` : "") +
      (msg ? `Mensaje: ${msg}\n` : "") +
      `\n¿Me pueden ayudar, por favor?`;

    window.open(waLink(text), "_blank");
    form.reset();
  });
}

function initWhatsappButtons() {
  const top = document.getElementById("btnWhatsappTop");
  const hero = document.getElementById("btnWhatsappHero");
  const link = waLink(`Hola ${COMPANY.name}. Quiero información de propiedades, por favor.`);

  if (top) top.href = link;
  if (hero) hero.href = link;
}

document.addEventListener("DOMContentLoaded", () => {
  initWhatsappButtons();
  initFilters();
  initLeadForm();
  render("all");
});
