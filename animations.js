/* Animations du portfolio, en JavaScript pur (aucune bibliothèque). */
(() => {
  "use strict";
  const root = document.documentElement;
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mouse = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
  const lang = () => (root.lang === "en" ? "en" : "fr");
  const make = (tag, cls, parent) => {
    const el = document.createElement(tag);
    el.className = cls;
    el.setAttribute("aria-hidden", "true");
    if (parent) parent.appendChild(el);
    return el;
  };
  /* lance fn une seule fois quand l'élément devient visible */
  const whenSeen = (el, fn) => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { io.disconnect(); fn(); }
    }, { threshold: 0.25 });
    io.observe(el);
  };

  /* 1. écran d'introduction (une fois par visite) */
  const intro = $(".intro-screen");
  const introDone = new Promise(resolve => {
    if (!root.classList.contains("intro")) return resolve();
    const count = $("b", intro), bar = $("i", intro);
    const start = performance.now();
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      intro.classList.add("leave");
      try { sessionStorage.setItem("intro", "1"); } catch {}
      setTimeout(() => { root.classList.remove("intro"); resolve(); }, 550);
    };
    intro.addEventListener("click", finish);
    (function step(now) {
      const p = Math.min(1, Math.max(0, now - start) / 1100);
      count.textContent = Math.round(p * 100) + " %";
      bar.style.transform = `scaleX(${p})`;
      if (p < 1 && !finished) requestAnimationFrame(step); else finish();
    })(start);
    setTimeout(finish, 2500);
  });

  /* 2. métier qui s'écrit lettre par lettre */
  const roles = {
    fr: ["Développeur web full stack", "React.js et Node.js", "PHP et MySQL", "Applications web responsives"],
    en: ["Full stack web developer", "React.js and Node.js", "PHP and MySQL", "Responsive web applications"]
  };
  const role = $(".role");
  const typed = document.createElement("p");
  typed.className = "typed";
  typed.innerHTML = '<span></span><i aria-hidden="true"></i>';
  role.after(typed);
  const typedText = $("span", typed);
  let word = 0, letters = 0, erasing = false, timer = 0;
  function type() {
    const full = roles[lang()][word];
    letters += erasing ? -1 : 1;
    typedText.textContent = full.slice(0, letters);
    let wait = erasing ? 28 : 62;
    if (!erasing && letters >= full.length) { erasing = true; wait = 1600; }
    else if (erasing && letters <= 0) { erasing = false; word = (word + 1) % roles.fr.length; wait = 260; }
    timer = setTimeout(type, wait);
  }
  if (calm) typedText.textContent = roles[lang()][0];
  else introDone.then(type);

  /* 3. le nom tombe lettre par lettre */
  const name = $(".hero h1");
  if (!calm) {
    name.setAttribute("aria-label", "Saad Kardad");
    let n = 0;
    $$("span", name).forEach(part => {
      const text = part.textContent;
      part.setAttribute("aria-hidden", "true");
      part.textContent = "";
      [...text].forEach(ch => {
        const letter = document.createElement("i");
        letter.className = "letter";
        letter.textContent = ch;
        letter.style.setProperty("--n", n++);
        part.appendChild(letter);
      });
    });
    introDone.then(() => name.classList.add("play"));
  }

  /* 4. titres décodés caractère par caractère */
  const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}#$%&01";
  function scramble(node) {
    const target = node.nodeValue;
    let last = target, frame = 0;
    const total = 34;
    (function step() {
      if (node.nodeValue !== last) return;        // la langue a changé : on arrête
      frame++;
      const solved = Math.floor(target.length * frame / total);
      last = frame >= total ? target : [...target].map((c, i) =>
        i < solved || /\s/.test(c) ? c : glyphs[Math.random() * glyphs.length | 0]).join("");
      node.nodeValue = last;
      if (frame < total) requestAnimationFrame(step);
    })();
  }
  if (!calm) $$(".split > h2, .wanted h2, .contact h2").forEach(h =>
    whenSeen(h, () => scramble(h.firstChild)));

  /* 5. compteurs animés */
  function countUp(node) {
    const original = node.nodeValue;
    const match = original.match(/^(\d+)(.*)$/);
    if (!match) return;
    const [, end, rest] = match;
    const start = performance.now();
    let last = original;
    (function step(now) {
      if (node.nodeValue !== last) return;
      const p = Math.min(1, Math.max(0, now - start) / 1400);
      last = Math.round(end * (1 - Math.pow(1 - p, 3))) + rest;
      node.nodeValue = last;
      if (p < 1) requestAnimationFrame(step);
    })(start);
  }
  if (!calm) introDone.then(() => $$(".facts strong").forEach(el => whenSeen(el, () => countUp(el.firstChild))));

  /* 6. particules reliées entre elles, qui fuient la souris */
  function particles(section) {
    const canvas = make("canvas", "particles");
    section.prepend(canvas);
    const ctx = canvas.getContext("2d");
    const pointer = { x: -999, y: -999 };
    let w = 0, h = 0, dots = [], visible = false, running = false;
    function resize() {
      const ratio = Math.min(devicePixelRatio || 1, 2);
      w = section.clientWidth; h = section.clientHeight;
      canvas.width = w * ratio; canvas.height = h * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      const total = Math.min(85, Math.round(w * h / 13000));
      dots = Array.from({ length: total }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 1
      }));
    }
    function draw() {
      if (!visible) { running = false; return; }
      ctx.clearRect(0, 0, w, h);
      dots.forEach((d, i) => {
        const dx = d.x - pointer.x, dy = d.y - pointer.y, dist = Math.hypot(dx, dy);
        if (dist < 130 && dist > 0) { d.x += dx / dist * 1.8; d.y += dy / dist * 1.8; }
        d.x = (d.x + d.vx + w) % w;
        d.y = (d.y + d.vy + h) % h;
        ctx.fillStyle = "rgba(255,255,255,.55)";
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
        for (let j = i + 1; j < dots.length; j++) {
          const o = dots[j], link = Math.hypot(d.x - o.x, d.y - o.y);
          if (link < 115) {
            ctx.strokeStyle = `rgba(255,255,255,${(1 - link / 115) * 0.28})`;
            ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(o.x, o.y); ctx.stroke();
          }
        }
      });
      requestAnimationFrame(draw);
    }
    section.addEventListener("pointermove", e => {
      const r = section.getBoundingClientRect();
      pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top;
    });
    section.addEventListener("pointerleave", () => { pointer.x = pointer.y = -999; });
    new ResizeObserver(resize).observe(section);
    new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !running) { running = true; requestAnimationFrame(draw); }
    }).observe(section);
  }
  if (!calm) $$(".hero, .contact").forEach(particles);

  /* 7. bande de technologies qui accélère avec le défilement */
  const techs = ["React.js", "Node.js", "Express", "Tailwind CSS", "JavaScript", "PHP", "Laravel", "MySQL", "MongoDB", "C#", "Git"];
  const marquee = make("div", "marquee");
  const track = make("div", "track", marquee);
  track.innerHTML = [...techs, ...techs, ...techs].map(t => `<span>${t}</span>`).join("");
  $("#parcours").before(marquee);
  if (!calm) {
    let offset = 0, boost = 0, lastY = scrollY;
    addEventListener("scroll", () => {
      boost = Math.min(14, boost + Math.abs(scrollY - lastY) * 0.06);
      lastY = scrollY;
    }, { passive: true });
    let shown = false;
    function slide() {
      if (!shown) return;
      offset = (offset + 0.7 + boost) % (track.scrollWidth / 3 || 1);
      boost *= 0.93;
      track.style.transform = `translateX(${-offset}px)`;
      requestAnimationFrame(slide);
    }
    new IntersectionObserver(([e]) => {
      const was = shown;
      shown = e.isIntersecting;
      if (shown && !was) requestAnimationFrame(slide);
    }).observe(marquee);
  }

  /* 8. frise qui se remplit pendant la lecture */
  const timeline = $(".timeline");
  const fill = make("li", "tl-fill", timeline);
  const steps = $$(":scope > li:not(.tl-fill)", timeline);
  function fillTimeline() {
    const r = timeline.getBoundingClientRect();
    const height = Math.max(0, Math.min(r.height, innerHeight * 0.65 - r.top));
    const last = steps[steps.length - 1].offsetTop + 29;
    fill.style.height = Math.max(0, Math.min(height, last) - 29) + "px";
    steps.forEach(li => li.classList.toggle("reached", li.offsetTop + 20 < height));
  }
  addEventListener("scroll", fillTimeline, { passive: true });
  addEventListener("resize", fillTimeline);
  fillTimeline();

  /* 9. terminal qui écrit votre profil en code */
  const keys = {
    fr: { file: "profil.js", title: "titre", city: "ville", data: "bases" },
    en: { file: "profile.js", title: "title", city: "city", data: "databases" }
  };
  const code = () => [
    ["k", "const "], ["", "saad = {\n"],
    ["", `  ${keys[lang()].title}: `], ["s", '"Future Engineer"'], ["", ",\n"],
    ["", `  ${keys[lang()].city}: `], ["s", '"Marrakech"'], ["", ",\n"],
    ["", "  front: ["], ["s", '"React.js"'], ["", ", "], ["s", '"Tailwind CSS"'], ["", "],\n"],
    ["", "  back: ["], ["s", '"Node.js"'], ["", ", "], ["s", '"PHP"'], ["", "],\n"],
    ["", `  ${keys[lang()].data}: [`], ["s", '"MySQL"'], ["", ", "], ["s", '"MongoDB"'], ["", "]\n"],
    ["", "};"]
  ];
  const term = make("div", "term", $("#profil .split > div"));
  term.innerHTML = '<div class="term-bar"><b></b><b></b><b></b><em></em></div><pre></pre>';
  const pre = $("pre", term);
  const size = () => code().reduce((sum, [, text]) => sum + text.length, 0);
  let printed = 0;
  function printCode(count) {
    printed = count;
    let left = count;
    $("em", term).textContent = keys[lang()].file;
    pre.innerHTML = code().map(([cls, text]) => {
      const part = text.slice(0, Math.max(0, left));
      left -= text.length;
      return part ? `<span class="${cls}">${part}</span>` : "";
    }).join("") + '<i class="caret"></i>';
  }
  if (calm) printCode(size());
  else {
    printCode(size());
    pre.style.minHeight = pre.offsetHeight + "px";   // réserve la place
    printCode(0);
    whenSeen(term, () => {
      let n = 0;
      const id = setInterval(() => { printCode(++n); if (n >= size()) clearInterval(id); }, 24);
    });
  }

  /* 10. boutons magnétiques */
  if (mouse && !calm) $$(".btn").forEach(btn => {
    btn.addEventListener("pointermove", e => {
      const r = btn.getBoundingClientRect();
      btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
    });
    btn.addEventListener("pointerleave", () => { btn.style.transform = ""; });
  });

  /* 11. étincelles au clic */
  if (!calm) addEventListener("pointerdown", e => {
    for (let i = 0; i < 12; i++) {
      const spark = make("i", "spark", document.body);
      const a = i / 12 * Math.PI * 2, d = 36 + Math.random() * 34;
      spark.style.left = e.clientX + "px";
      spark.style.top = e.clientY + "px";
      spark.animate([
        { transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
        { transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d}px) scale(0)`, opacity: 0 }
      ], { duration: 650, easing: "cubic-bezier(.2,.7,.3,1)" }).onfinish = () => spark.remove();
    }
  });

  /* 12. bouton retour en haut avec anneau de progression */
  const up = document.createElement("button");
  up.type = "button";
  up.className = "to-top";
  up.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg>';
  document.body.appendChild(up);
  const label = () => up.setAttribute("aria-label", lang() === "en" ? "Back to top" : "Revenir en haut");
  up.addEventListener("click", () => scrollTo({ top: 0, behavior: calm ? "auto" : "smooth" }));
  function progressRing() {
    const max = root.scrollHeight - innerHeight;
    up.style.setProperty("--p", (max > 0 ? scrollY / max * 100 : 0) + "%");
    up.classList.toggle("show", scrollY > 500);
  }
  addEventListener("scroll", progressRing, { passive: true });
  progressRing();
  label();

  /* changement de langue : on met à jour les textes animés */
  new MutationObserver(() => {
    const done = printed > 0 && pre.textContent.trim().endsWith("};");
    printCode(done ? size() : printed);
    label();
    clearTimeout(timer);
    letters = 0; erasing = false;
    if (calm) typedText.textContent = roles[lang()][0]; else type();
  }).observe(root, { attributes: true, attributeFilter: ["lang"] });
})();
