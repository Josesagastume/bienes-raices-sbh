/* =========================
   CONFIG (EDITABLE)
========================= */
const COMPANY = {
  name: "Bienes Raíces Santa Bárbara HN",
  whatsappNumber: "50493081535", // +504 9308-1535
  locationShort: "Trinidad, Santa Bárbara"
};

const PROPERTIES = [
  {
    id: "pitontes-bajos",
    title: "Finca Pitontes Bajos",
    type: "FINCA",
    location: "Trinidad, Santa Bárbara",
    size: "102.21 manzanas",
    tags: ["finca", "inversion"],
    summary:
      "Ideal para eco-lodge, hotel de montaña o glamping. Fuentes de agua, electricidad con transformador propio e infraestructura existente.",
    image: "pitontes-1.png", // si la tienes en la raíz del proyecto
    detailsUrl: "pitontes-bajos.html"
  },
  {
    id: "finca-trinidad",
    title: "Finca Trinidad",
    type: "FINCA",
    location: "Trinidad, Santa Bárbara",
    size: "—",
    tags: ["finca", "inversion"],
    summary:
      "Finca con alto potencial productivo y de inversión. Cuenta con áreas planas, accesos, instalaciones y producción agrícola. Solicita información y agenda tu visita.",
    image: "img/finca-trinidad/ft-01.png",
    detailsUrl: "finca-trinidad.html"
  }
];

/* =========================
   HELPERS
========================= */
function waLink(text) {
  const msg = encodeURIComponent(text);
  return `https://wa.me/${COMPANY.whatsappNumber}?text=${msg}`;
}

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "class") node.className = v;
    else if (k.startsWith("data-")) node.setAttribute(k, v);
    else node[k] = v;
  });
  children.forEach((c) => node.appendChild(typeof c === "string" ? document.createTextNode(c) : c));
  return node;
}

function propertyCard(p) {
  const imgStyle = p.image
    ? `background-image:url('${p.image}');`
    : `background-image:linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.02));`;

  const badge = el("span", { class: "badge" }, [p.type]);
  const loc = el("span", { class: "pill" }, [p.location]);
  const size = el("span", { class: "pill" }, [p.size]);

  const title = el("h3", {}, [p.title]);
  const summary = el("p", { class: "muted" }, [p.summary]);

  const btnDetails = el("a", { class: "btn btn--sm", href: p.detailsUrl }, ["Ver detalles"]);
  const btnWhats = el(
    "a",
    { class: "btn btn--sm btn--ghost", href: waLink(`Hola, me interesa la propiedad: ${p.title}. ¿Me brinda más información?`), target: "_blank", rel: "noopener" },
    ["Consultar por WhatsApp"]
  );

  const media = el("div", { class: "property__media", style: imgStyle, role: "img", ariaLabel: p.title }, []);
  const body = el("div", { class: "property__body" }, [
    title,
    el("div", { class: "property__meta" }, [loc, size]),
    summary,
    el("div", { class: "property__actions" }, [btnDetails, btnWhats])
  ]);

  const card = el("article", { class: "property card", "data-tags": p.tags.join(" ") }, [
    el("div", { class: "property__top" }, [badge]),
    media,
    body
  ]);

  return card;
}

/* =========================
   RENDER
========================= */
function render(filter = "all") {
  const grid = document.getElementById("propertiesGrid");
  if (!grid) return;

  grid.innerHTML = "";
  const items = PROPERTIES.filter((p) => {
    if (filter === "all") return true;
    return p.tags.includes(filter);
  });

  items.forEach((p) => grid.appendChild(propertyCard(p)));
}

/* =========================
   FILTERS
========================= */
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

/* =========================
   CONTACT FORM -> WA
========================= */
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
      `Mi WhatsApp/telefono: ${phone}\n` +
      `Interés: ${interest}\n` +
      (zone ? `Zona: ${zone}\n` : "") +
      (msg ? `Mensaje: ${msg}\n` : "") +
      `\n¿Me pueden ayudar, por favor?`;

    window.open(waLink(text), "_blank");
    form.reset();
  });
}

/* =========================
   TOP WA BUTTONS
========================= */
function initWhatsappButtons() {
  const top = document.getElementById("btnWhatsappTop");
  const hero = document.getElementById("btnWhatsappHero");
  const link = waLink(`Hola ${COMPANY.name}. Quiero información de propiedades, por favor.`);

  if (top) top.href = link;
  if (hero) hero.href = link;
}

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
  initWhatsappButtons();
  initFilters();
  initLeadForm();
  render("all");
});
