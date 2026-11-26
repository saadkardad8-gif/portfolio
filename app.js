/* Portfolio de Saad Kardad : animations en JavaScript pur */
(() => {
  "use strict";
  const root = document.documentElement;
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mouse = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
  const isEn = () => root.lang === "en";

  /* ---------- version anglaise ---------- */
  const en = {
    "Aller au contenu": "Skip to content",
    "Profil": "Profile",
    "Parcours": "Journey",
    "Projets": "Projects",
    "Compétences": "Skills",
    "Télécharger le CV": "Download CV",
    "Voir mes projets": "See my projects",
    "Me contacter": "Contact me",
    "Future Engineer et développeur web full stack à Marrakech": "Future Engineer and full stack web developer in Marrakech",
    "Je conçois des interfaces web modernes et responsives avec les applications qui les font vivre, du front-end à la base de données.": "I build modern, responsive web interfaces and the applications behind them, from front end to database.",
    "22 ans": "22 years old",
    "Âge": "Age",
    "Maroc": "Morocco",
    "Stage en cours depuis septembre 2026": "Internship since September 2026",
    "3 langues": "3 languages",
    "Arabe, français, anglais": "Arabic, French, English",
    "Ce que je recherche": "What I'm looking for",
    "Contrat": "Contract",
    "CDI, CDD, stage ou freelance": "Permanent, fixed-term, internship or freelance",
    "Disponibilité": "Availability",
    "Après mon stage actuel": "After my current internship",
    "Lieu": "Location",
    "Future Engineer et technicien spécialisé en développement informatique, passionné par la conception d'applications web modernes, dynamiques et responsives.": "Future Engineer and specialised technician in software development, passionate about building modern, dynamic and responsive web applications.",
    "Je maîtrise la chaîne complète : interface front-end (React.js, Tailwind CSS), back-end (Node.js, API REST) et bases de données (MySQL, MongoDB). Rigoureux et curieux, je transforme un besoin concret en solution fonctionnelle et je recherche une opportunité pour contribuer à des projets innovants au sein d'une équipe.": "I work across the whole stack: front end (React.js, Tailwind CSS), back end (Node.js, REST APIs) and databases (MySQL, MongoDB). Thorough and curious, I turn a real need into a working solution, and I'm looking for an opportunity to contribute to innovative projects within a team.",
    "Mon parcours": "My journey",
    "Baccalauréat sciences physiques": "Baccalaureate in physical sciences",
    "Lycée Zerktouni, Marrakech": "Zerktouni High School, Marrakech",
    "Études en sciences de l'ingénieur": "Engineering sciences studies",
    "École Marocaine des Sciences de l'Ingénieur (EMSI), Marrakech": "Moroccan School of Engineering Sciences (EMSI), Marrakech",
    "2024 à 2026": "2024 to 2026",
    "Technicien spécialisé en développement informatique": "Specialised technician in software development",
    "Institut Excel, Marrakech": "Excel Institute, Marrakech",
    "Juillet 2026": "July 2026",
    "Projet de fin d'études : location de voitures": "Final-year project: car rental",
    "Application web soutenue devant le jury": "Web application presented to a jury",
    "Depuis septembre 2026": "Since September 2026",
    "Développeur web junior (stage)": "Junior web developer (internship)",
    "Wafa Assurance, agence Ahl Al Khair, Marrakech": "Wafa Assurance, Ahl Al Khair agency, Marrakech",
    "Conception et développement du site web de l'agence : interface moderne, responsive et adaptée au mobile.": "Designed and developed the agency's website: a modern, responsive, mobile-friendly interface.",
    "Développement d'une application de gestion des paiements clients (virement, chèque, espèces, carte bancaire).": "Developed a client payment management application (bank transfer, cheque, cash, card).",
    "Enregistrement et suivi des paiements pour faciliter la gestion quotidienne de l'agence.": "Payment recording and tracking to make the agency's daily work easier.",
    "Analyse des besoins en collaboration avec l'équipe de l'agence.": "Requirements analysis together with the agency team.",
    "Application de location de voitures": "Car rental application",
    "Projet de fin d'études, juillet 2026. Application complète de gestion de location de véhicules.": "Final-year project, July 2026. A complete vehicle rental management application.",
    "React.js et Tailwind CSS": "React.js and Tailwind CSS",
    "Node.js et Express": "Node.js and Express",
    "Données": "Data",
    "Véhicules": "Vehicles",
    "Utilisateurs": "Users",
    "Réservations": "Bookings",
    "Base de données": "Database",
    "Une interface responsive avec React.js et Tailwind CSS.": "A responsive interface with React.js and Tailwind CSS.",
    "Un back-end Node.js pour les véhicules, les utilisateurs et les réservations.": "A Node.js back end for vehicles, users and bookings.",
    "MongoDB conserve les données de l'application.": "MongoDB stores the application's data.",
    "Modélisation UML et soutenance devant le jury.": "UML modelling and presentation to a jury.",
    "Simuler une réservation": "Simulate a booking",
    "Autres projets": "Other projects",
    "Mini-projet, mars 2024": "Mini project, March 2024",
    "Gestion et suivi des stocks": "Stock management and tracking",
    "Entrées et sorties de produits avec mise à jour automatique des quantités, recherche d'articles et génération de rapports.": "Product entries and exits with automatic quantity updates, item search and report generation.",
    "Entrées et sorties": "Entries and exits",
    "Quantités à jour": "Quantities updated",
    "Rapports": "Reports",
    "Projet entrepreneurial, 2024, en cours": "Entrepreneurial project, 2024, ongoing",
    "Marque streetwear": "Streetwear brand",
    "Marque de vêtements moderne et minimaliste : étude de marché, identité visuelle, cahier des charges, maquettes et stratégie de marque.": "A modern, minimalist clothing brand: market research, visual identity, specifications, mock-ups and brand strategy.",
    "Étude de marché": "Market research",
    "Identité visuelle": "Visual identity",
    "Maquettes": "Mock-ups",
    "Stratégie": "Strategy",
    "Bases de données": "Databases",
    "Langages": "Languages",
    "Outils et déploiement": "Tools and deployment",
    "Conception et IA": "Design and AI",
    "UML, développement assisté par IA (Claude Code)": "UML, AI-assisted development (Claude Code)",
    "Langues": "Spoken languages",
    "Arabe (langue maternelle), français (courant), anglais (intermédiaire)": "Arabic (native), French (fluent), English (intermediate)",
    "Qualités": "Strengths",
    "Résolution de problèmes, travail en équipe, gestion du temps, adaptabilité, leadership": "Problem solving, teamwork, time management, adaptability, leadership",
    "Centres d'intérêt": "Interests",
    "Photographie, voyage, musique, aventure": "Photography, travel, music, adventure",
    "Travaillons ensemble": "Let's work together",
    "Disponible après mon stage, à Marrakech. Une idée, une opportunité ou une question : écrivez-moi.": "Available after my internship, in Marrakech. An idea, an opportunity or a question: write to me.",
    "Marrakech, Maroc": "Marrakech, Morocco",
    "Cliquez sur la carte pour la retourner": "Click the card to flip it",
    "Télécharger la carte (PDF)": "Download the card (PDF)",
    "© 2026 Saad Kardad. Conçu et développé à Marrakech.": "© 2026 Saad Kardad. Designed and built in Marrakech.",
    "Domaines": "Areas",
    "Résumé 30 s": "30 s summary",
    "Résumé en 30 secondes": "30-second summary",
    "Cliquez sur une technologie en bleu clair pour voir le projet où je l'ai utilisée.": "Click a light blue technology to see the project where I used it.",
    "Copier l'e-mail": "Copy email",
    "Fermer le résumé": "Close the summary",
    "Stage chez Wafa Assurance : site web de l'agence et application de gestion des paiements clients.": "Internship at Wafa Assurance: the agency's website and a client payment management application.",
    "Projet de fin d'études : application de location de voitures avec React.js, Node.js et MongoDB.": "Final-year project: car rental application with React.js, Node.js and MongoDB.",
    "Aussi : PHP, Laravel, MySQL et C#.": "Also: PHP, Laravel, MySQL and C#.",
    "Arabe (langue maternelle), français (courant), anglais (intermédiaire).": "Arabic (native), French (fluent), English (intermediate).",
    "Fonctionnement": "How it works",
    "Portrait de Saad Kardad": "Portrait of Saad Kardad",
    "Retourner la carte de visite": "Flip the business card",
    "Recto de la carte de visite : Saad Kardad, développeur web full stack junior, stagiaire chez Wafa Assurance": "Front of the business card: Saad Kardad, junior full stack web developer, intern at Wafa Assurance",
    "Verso de la carte de visite : téléphone, e-mail, GitHub, Marrakech et QR code pour ajouter le contact": "Back of the business card: phone, email, GitHub, Marrakech and a QR code to add the contact",
    "Saad Kardad, développeur web full stack à Marrakech": "Saad Kardad, full stack web developer in Marrakech"
  };
  const texts = [], attrs = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n; (n = walker.nextNode());) {
    const key = n.nodeValue.replace(/\s+/g, " ").trim();
    if (en[key] && !n.parentElement.closest("script, style")) texts.push([n, n.nodeValue, en[key]]);
  }
  $$("[alt], [aria-label]:not(.lang-btn)").forEach(el => ["alt", "aria-label"].forEach(a => {
    const v = el.getAttribute(a);
    if (en[v]) attrs.push([el, a, v, en[v]]);
  }));
  const langBtn = $(".lang-btn");
  const frTitle = document.title;
  const onLang = [];

  function setLang(lang) {
    const toEn = lang === "en";
    texts.forEach(([n, fr, tr]) => { n.nodeValue = toEn ? tr : fr; });
    attrs.forEach(([el, a, fr, tr]) => el.setAttribute(a, toEn ? tr : fr));
    root.lang = lang;
    document.title = toEn ? en[frTitle] : frTitle;
    langBtn.textContent = toEn ? "FR" : "EN";
    langBtn.lang = toEn ? "fr" : "en";
    langBtn.setAttribute("aria-label", toEn ? "Passer en français" : "Switch to English");
    try { localStorage.setItem("lang", lang); } catch {}
    onLang.forEach(fn => fn());
  }
  langBtn.addEventListener("click", () => setLang(isEn() ? "fr" : "en"));

  /* ---------- compétences : une pastille par technologie ---------- */
  $$("[data-chips]").forEach(dd => {
    const items = dd.textContent.split(",").map(s => s.trim());
    dd.textContent = "";
    dd.classList.add("chips");
    items.forEach((item, i) => {
      const chip = document.createElement("span");
      chip.className = "chip";
      chip.style.setProperty("--n", i);
      chip.textContent = item;
      dd.appendChild(chip);
    });
  });

  /* ---------- profil : les mots s'encrent au défilement ---------- */
  const lead = $(".lead");
  const leadFr = lead.textContent.trim();
  let words = [];
  function splitLead() {
    const text = isEn() ? en[leadFr] : leadFr;
    lead.textContent = "";
    words = text.split(" ").map((word, i) => {
      if (i) lead.append(" ");
      const span = document.createElement("span");
      span.className = "w";
      span.textContent = word;
      lead.appendChild(span);
      return span;
    });
    inkLead();
  }
  function inkLead() {
    const r = lead.getBoundingClientRect();
    const p = calm ? 1 : clamp((innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.3));
    words.forEach((w, i) => w.classList.toggle("on", i < p * words.length));
  }
  // le paragraphe est géré ici, pas par la table de traduction
  texts.splice(texts.findIndex(([n]) => n.parentElement === lead), 1);
  splitLead();
  onLang.push(splitLead);

  /* ---------- dessin des contours et des titres à l'arrivée ---------- */
  const reveal = $$(".draw:not(.node), .title").filter(el => !el.closest(".build.pinned"));
  if ("IntersectionObserver" in window && !calm) {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0.12 });
    // un titre masqué par clip-path n'est jamais "visible" : on observe son parent
    const titles = new Map();
    const tio = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      titles.get(e.target).forEach(t => t.classList.add("in"));
      tio.unobserve(e.target);
    }), { rootMargin: "0px 0px -12% 0px" });
    reveal.forEach(el => {
      if (!el.classList.contains("title")) return io.observe(el);
      const box = el.parentElement;
      if (!titles.has(box)) titles.set(box, []);
      titles.get(box).push(el);
      tio.observe(box);
    });
  } else reveal.forEach(el => el.classList.add("in"));

  /* ---------- schéma du projet principal ---------- */
  const build = $(".build");
  const arch = $(".arch", build);
  const parts = $$("[data-stage]", build);
  const steps = $$("[data-step]", build);
  const nodes = $$(".node", build);
  let stage = 0;
  function setStage(n) {
    if (n === stage) return;
    stage = n;
    parts.forEach(el => el.classList.toggle("in", +el.dataset.stage <= n));
    steps.forEach(li => li.classList.toggle("on", +li.dataset.step === n));
    arch.classList.toggle("live", n >= 4 && !calm);
  }
  function layoutBuild() {
    const need = innerWidth <= 920 ? 690 : 640;
    const pin = !calm && innerHeight >= need;
    build.classList.toggle("pinned", pin);
  }
  function scrollBuild() {
    const r = build.getBoundingClientRect();
    if (build.classList.contains("pinned")) {
      const p = clamp(-(r.top - 73) / (r.height - innerHeight));
      if (r.top < innerHeight * 0.5) {
        $(".title", build).classList.add("in");
        setStage(Math.min(4, 1 + Math.floor(p * 4.2)));
      }
    } else if (r.top < innerHeight * 0.6 || calm) {
      $(".title", build).classList.add("in");
      setStage(4);
    }
  }
  layoutBuild();

  /* simulation d'une réservation à travers les trois couches */
  const run = $(".run"), log = $(".log");
  const messages = {
    fr: ["Schéma simplifié du fonctionnement.",
         "Interface : le client demande une réservation.",
         "API : la demande est traitée.",
         "Données : la réservation est enregistrée.",
         "Interface : la confirmation s'affiche."],
    en: ["Simplified diagram of how it works.",
         "Interface: the customer requests a booking.",
         "API: the request is processed.",
         "Data: the booking is saved.",
         "Interface: the confirmation is shown."]
  };
  let message = 0, running = false;
  const say = i => { message = i; log.textContent = messages[isEn() ? "en" : "fr"][i]; };
  onLang.push(() => say(message));
  run.addEventListener("click", () => {
    if (running) return;
    running = true;
    run.disabled = true;
    setStage(4);
    [0, 1, 2, 0].forEach((node, i) => setTimeout(() => {
      nodes.forEach((el, j) => el.classList.toggle("hit", j === node));
      say(i + 1);
    }, i * 1100));
    setTimeout(() => {
      nodes.forEach(el => el.classList.remove("hit"));
      running = false;
      run.disabled = false;
    }, 5200);
  });

  /* ---------- tout ce qui suit le défilement ---------- */
  const ruler = $(".ruler i");
  const timeline = $(".timeline");
  const lis = $$(":scope > li", timeline);
  const links = $$("nav a");
  const sections = ["accueil", "profil", "parcours", "projets", "competences", "contact"].map(id => document.getElementById(id));
  const hero = $(".hero");
  const heroText = $(".hero-text"), portrait = $(".portrait");
  let waiting = false;

  function update() {
    waiting = false;
    const max = root.scrollHeight - innerHeight;
    ruler.style.transform = `scaleX(${max > 0 ? clamp(scrollY / max) : 0})`;

    let id = "accueil";
    for (const s of sections) if (s.getBoundingClientRect().top <= innerHeight * 0.4) id = s.id;
    if (max > 0 && scrollY / max > 0.995) id = "contact";
    links.forEach(a => a.classList.toggle("active", a.hash === "#" + id));

    // la frise avance avec la lecture
    const t = timeline.getBoundingClientRect();
    const height = calm ? t.height : clamp(innerHeight * 0.68 - t.top, 0, t.height);
    const end = lis[lis.length - 1].offsetTop + 26;
    timeline.style.setProperty("--line", clamp(height, 26, end) - 26 + "px");
    lis.forEach(li => li.classList.toggle("reached", li.offsetTop + 18 < height));

    // profondeur à l'accueil, sur grand écran
    if (!calm && innerWidth > 920 && scrollY < innerHeight) {
      heroText.style.transform = `translateY(${scrollY * 0.22}px)`;
      portrait.style.transform = `translateY(${scrollY * -0.08}px)`;
      heroText.style.opacity = clamp(1 - scrollY / (innerHeight * 0.85));
    } else if (innerWidth <= 920 || calm) {
      heroText.style.transform = portrait.style.transform = heroText.style.opacity = "";
    }
    inkLead();
    scrollBuild();
  }
  const queue = () => { if (!waiting) { waiting = true; requestAnimationFrame(update); } };
  addEventListener("scroll", queue, { passive: true });
  addEventListener("resize", () => { layoutBuild(); queue(); });
  update();

  /* ---------- portrait : dessiné dès l'arrivée ---------- */
  requestAnimationFrame(() => requestAnimationFrame(() => $(".frame").classList.add("in")));

  /* ---------- carte de visite ---------- */
  const card = $(".card-btn");
  card.addEventListener("click", () => card.setAttribute("aria-pressed", card.classList.toggle("flipped")));

  /* ---------- effets à la souris ---------- */
  if (mouse && !calm) {
    const cross = $(".crosshair"), read = $("span", cross);
    hero.addEventListener("pointermove", e => {
      const r = hero.getBoundingClientRect();
      const x = Math.round(e.clientX - r.left), y = Math.round(e.clientY - r.top);
      cross.style.setProperty("--x", x + "px");
      cross.style.setProperty("--y", y + "px");
      read.textContent = `x ${x}  y ${y}`;
      cross.classList.add("on");
    });
    hero.addEventListener("pointerleave", () => cross.classList.remove("on"));

    $$(".project, .card-btn").forEach(el => {
      el.addEventListener("pointermove", e => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - r.left) / r.width - 0.5, dy = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(1000px) rotateY(${dx * 9}deg) rotateX(${-dy * 9}deg) translateY(-4px)`;
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });

    $$(".actions .btn, .run").forEach(btn => {
      btn.addEventListener("pointermove", e => {
        const r = btn.getBoundingClientRect();
        btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
      });
      btn.addEventListener("pointerleave", () => { btn.style.transform = ""; });
    });
  }

  /* ---------- résumé pour les recruteurs ---------- */
  const recap = $(".recap");
  const openRecap = () => { if (!recap.open && recap.showModal) { recap.showModal(); recap.scrollTop = 0; } };
  $$(".open-recap").forEach(b => b.addEventListener("click", openRecap));
  $(".recap-close").addEventListener("click", () => recap.close());
  recap.addEventListener("click", e => { if (e.target === recap) recap.close(); });   // clic à côté
  if (location.hash === "#resume") openRecap();       // lien direct à envoyer à un recruteur
  addEventListener("hashchange", () => { if (location.hash === "#resume") openRecap(); });

  /* ---------- WhatsApp et copie de l'e-mail ---------- */
  const hello = () => isEn() ? "Hello Saad, I saw your portfolio." : "Bonjour Saad, j'ai vu votre portfolio.";
  const setWhatsapp = () => $$(".whatsapp").forEach(a => { a.href = "https://wa.me/212615307782?text=" + encodeURIComponent(hello()); });
  setWhatsapp();
  onLang.push(setWhatsapp);

  const mail = "saadkardad8@gmail.com";
  function copyFallback(host) {
    const area = document.createElement("textarea");
    area.value = mail;
    host.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  }
  $$(".copy-mail").forEach(btn => btn.addEventListener("click", async () => {
    const host = btn.closest("dialog") || btn.closest(".contact");
    let ok = true;
    try { await navigator.clipboard.writeText(mail); } catch { ok = copyFallback(host); }
    const status = $(".copied", host);
    status.textContent = ok ? (isEn() ? "Email copied: " : "E-mail copié : ") + mail : mail;
    clearTimeout(status.timer);
    status.timer = setTimeout(() => { status.textContent = ""; }, 4000);
  }));
  onLang.push(() => $$(".copied").forEach(p => { p.textContent = ""; }));

  /* ---------- compétences : voir le projet qui utilise une technologie ---------- */
  const projects = {
    location: { href: "#projets", fr: "Application de location de voitures (projet de fin d'études)", en: "Car rental application (final-year project)" },
    stocks: { href: "#projet-stocks", fr: "Gestion et suivi des stocks (mini-projet)", en: "Stock management and tracking (mini project)" },
    marque: { href: "#projet-marque", fr: "Marque streetwear (projet entrepreneurial)", en: "Streetwear brand (entrepreneurial project)" }
  };
  const usedIn = {
    "React.js": "location", "Tailwind CSS": "location", "Node.js": "location", "Express": "location",
    "MongoDB": "location", "Git": "location", "GitHub": "location",
    "C#": "stocks", "MySQL / SQL": "stocks", "Canva": "marque"
  };
  const result = document.createElement("div");
  result.className = "skill-result";
  result.setAttribute("role", "status");
  let picked = null;
  function showSkill() {
    if (!picked) { result.remove(); return; }
    const project = projects[usedIn[picked.dataset.tech]];
    const lang = isEn() ? "en" : "fr";
    result.innerHTML = "";
    const text = document.createElement("p");
    text.textContent = `${picked.dataset.tech} : ${project[lang]}`;
    const link = document.createElement("a");
    link.href = project.href;
    link.className = "btn btn-solid btn-small";
    link.textContent = isEn() ? "See the project" : "Voir le projet";
    result.append(text, link);
    picked.closest(".skills > div").after(result);
  }
  $$(".chip").forEach(chip => {
    const tech = chip.textContent;
    if (!usedIn[tech]) return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chip linked";
    button.style.cssText = chip.style.cssText;
    button.dataset.tech = button.textContent = tech;
    button.setAttribute("aria-pressed", "false");
    chip.replaceWith(button);
    button.addEventListener("click", () => {
      picked = picked === button ? null : button;
      $$(".chip.linked").forEach(c => c.setAttribute("aria-pressed", String(c === picked)));
      showSkill();
    });
  });
  onLang.push(showSkill);

  /* ---------- langue demandée par l'adresse ou mémorisée ---------- */
  let saved = new URLSearchParams(location.search).get("lang");
  try { saved = saved || localStorage.getItem("lang"); } catch {}
  if (saved === "en") setLang("en");
})();
