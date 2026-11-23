/* Wedding invitation — render, cover, countdown, share */

document.addEventListener("DOMContentLoaded", () => {
  applyMeta();
  populateContent();
  initCountdown();
  initScrollReveal();
  initShare();
  initMusic();
});

function applyMeta() {
  const { meta, couple } = weddingData;
  document.title = meta.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", meta.themeColor);
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", meta.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", meta.description);
  if (meta.siteUrl && meta.ogImage) {
    const abs = new URL(meta.ogImage, meta.siteUrl).href;
    document.querySelector('meta[property="og:image"]')?.setAttribute("content", abs);
  }
}

function populateContent() {
  const d = weddingData;
  const { couple, copy, venue, family, media } = d;

  setText("header-monogram", couple.monogram);
  setText("header-tagline", copy.siteTagline);
  setText("header-place", copy.locationBadge);

  const hero = document.getElementById("hero");
  const heroMedia = document.getElementById("hero-media");
  if (media.heroImage) {
    hero.classList.add("hero--has-image");
    heroMedia.style.backgroundImage = `url("${media.heroImage}")`;
    heroMedia.setAttribute("role", "img");
    heroMedia.setAttribute("aria-label", media.heroImageAlt || "");
  }
  const garland = document.getElementById("hero-garland-accent");
  if (garland && media.heroGarlandAccent) {
    garland.style.backgroundImage = `url("${media.heroGarlandAccent}")`;
  } else if (garland) {
    garland.classList.add("is-hidden");
  }

  setText("hero-intro", copy.heroIntro);
  const heroNames = document.getElementById("hero-names");
  heroNames.innerHTML =
    `${escapeHtml(couple.groomName)}<span class="amp">&amp;</span>${escapeHtml(couple.brideName)}`;
  heroNames.setAttribute(
    "aria-label",
    `${couple.groomName} and ${couple.brideName}`
  );
  setText("hero-invite", copy.heroInvite);
  document.querySelector("#hero-dates span").textContent = copy.heroDates;

  setText("gallery-heading", copy.galleryHeading || "");
  setText("gallery-lead", copy.galleryLead || "");
  document.getElementById("gallery-grid").innerHTML = buildGalleryHtml(d.gallery || []);
  setText("card-eyebrow", copy.cardEyebrow || "");
  setText("card-line", copy.cardLine || "");

  const posterImg = document.getElementById("invite-poster-img");
  if (media.posterImage && posterImg) {
    posterImg.src = media.posterImage;
    posterImg.alt = `${couple.groomName} and ${couple.brideName} wedding invitation`;
  }

  if (family.show && (family.groomParents || family.brideParents)) {
    const section = document.getElementById("family");
    section.classList.remove("is-hidden");
    setText("family-intro", family.introLine);
    document.getElementById("family-content").innerHTML = buildFamilyHtml(family, couple);
  }

  setText("events-intro", copy.eventsIntro || "");
  document.getElementById("events-grid").innerHTML = buildEventsHtml(d.events);

  setText("venue-eyebrow", copy.venueEyebrow);
  setText("venue-name", venue.name);
  setText("venue-note", copy.venueNote || "");
  document.getElementById("venue-address").innerHTML = venue.addressLines
    .map((line) => escapeHtml(line))
    .join("<br>");
  const maps = document.getElementById("venue-maps");
  maps.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.mapsQuery)}`;
  const venueImg = document.getElementById("venue-image");
  if (venue.image && venueImg) {
    venueImg.src = venue.image;
    venueImg.alt = venue.imageAlt || venue.name;
  }

  setText("countdown-eyebrow", copy.countdownEyebrow);
  setText("countdown-heading", copy.countdownHeading);

  document.getElementById("footer-sign").textContent =
    `${copy.footerSignOff}, ${couple.groomName} & ${couple.brideName}`;
  setText("footer-credit", copy.footerCredit);

  const audio = document.getElementById("bg-music");
  if (media.musicSrc) {
    audio.src = media.musicSrc;
    audio.loop = true;
    audio.volume = typeof media.musicVolume === "number" ? media.musicVolume : 0.45;
  }
}

function buildFamilyHtml(family, couple) {
  let html = "";
  if (family.groomParents) {
    html += `<p><strong>${escapeHtml(couple.groomName)}</strong><br>${escapeHtml(family.groomParents)}</p>`;
  }
  if (family.brideParents) {
    html += `<p style="margin-top:1rem"><strong>${escapeHtml(couple.brideName)}</strong><br>${escapeHtml(family.brideParents)}</p>`;
  }
  return html;
}

function buildGalleryHtml(images) {
  return images
    .map(
      (img) => `
      <figure class="gallery__item">
        <div class="gallery__frame">
          <img src="${escapeHtml(img.image)}" alt="${escapeHtml(img.imageAlt || "")}" loading="lazy" width="640" height="480">
        </div>
        ${img.caption ? `<figcaption class="gallery__caption">${escapeHtml(img.caption)}</figcaption>` : ""}
      </figure>`
    )
    .join("");
}

function buildEventsHtml(events) {
  return ["reception", "ceremony"]
    .map((key) => {
      const e = events[key];
      const imgBlock = e.image
        ? `<div class="event-card__media"><img src="${escapeHtml(e.image)}" alt="${escapeHtml(e.imageAlt || e.label)}" loading="lazy" width="480" height="320"></div>`
        : "";
      return `
        <article class="event-card">
          ${imgBlock}
          <div class="event-card__body">
            <h3 class="event-card__title">${escapeHtml(e.label)}</h3>
            <p class="event-card__day">${escapeHtml(e.day)}</p>
            <p class="event-card__date">${escapeHtml(e.displayDate)}</p>
            <p class="event-card__time">${escapeHtml(e.time)}</p>
            ${e.note ? `<p class="event-card__note">${escapeHtml(e.note)}</p>` : ""}
          </div>
        </article>`;
    })
    .join("");
}

function initCountdown() {
  const { events, countdown: cfg } = weddingData;
  const targets = {
    reception: parseEventStart(events.reception),
    ceremony: parseEventStart(events.ceremony),
  };

  let selected = cfg.defaultEvent === "reception" ? "reception" : "ceremony";
  const switchEl = document.getElementById("countdown-switch");

  switchEl.innerHTML = `
    <button type="button" data-event="reception" id="clock-reception">Reception</button>
    <button type="button" data-event="ceremony" id="clock-ceremony">Muhurtham</button>`;

  switchEl.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      selected = btn.dataset.event;
      updateSwitch();
      tick();
    });
  });

  function updateSwitch() {
    switchEl.querySelectorAll("button").forEach((b) => {
      const on = b.dataset.event === selected;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", String(on));
    });
    const e = events[selected];
    document.getElementById("countdown-foot").textContent =
      `${e.day}, ${e.displayDate} · ${e.time.replace(" onwards", "")} IST`;
  }

  function tick() {
    const delta = Math.max(0, targets[selected] - Date.now());
    const secs = Math.floor(delta / 1000);
    const values = [
      Math.floor(secs / 86400),
      Math.floor((secs % 86400) / 3600),
      Math.floor((secs % 3600) / 60),
      secs % 60,
    ];
    const ids = ["cd-days", "cd-hours", "cd-minutes", "cd-seconds"];
    ids.forEach((id, i) => {
      const el = document.getElementById(id);
      const next = String(values[i]).padStart(2, "0");
      if (el.textContent !== next) {
        el.textContent = next;
        el.classList.remove("tick");
        void el.offsetWidth;
        el.classList.add("tick");
      }
    });
    if (delta === 0) {
      document.getElementById("countdown-foot").textContent =
        selected === "reception"
          ? "The reception is here — time to celebrate!"
          : "The wedding day is here — blessings and joy!";
    }
  }

  updateSwitch();
  tick();
  setInterval(tick, 1000);
}

function parseEventStart(event) {
  const [y, m, day] = event.dateISO.split("-").map(Number);
  const match = event.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return new Date(y, m - 1, day).getTime();
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const pm = match[3].toUpperCase() === "PM";
  if (pm && hours !== 12) hours += 12;
  if (!pm && hours === 12) hours = 0;
  return new Date(y, m - 1, day, hours, minutes, 0).getTime();
}

function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  reveals.forEach((el) => observer.observe(el));
}

function initShare() {
  document.getElementById("btn-share").addEventListener("click", async () => {
    const { couple, copy, meta } = weddingData;
    const payload = {
      title: meta.title,
      text: `${couple.groomName} & ${couple.brideName} — ${copy.heroDates}`,
      url: meta.siteUrl || window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(payload);
        return;
      } catch (err) {
        if (err.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(payload.url);
      alert("Link copied — paste it in WhatsApp to share.");
    } catch {
      prompt("Copy this link:", payload.url);
    }
  });
}

function initMusic() {
  const audio = document.getElementById("bg-music");
  const btn = document.getElementById("music-toggle");
  if (!weddingData.media.musicSrc) return;

  let userPaused = false;

  function tryPlay() {
    if (userPaused || !audio.paused) return;
    const pending = audio.play();
    if (pending) pending.catch(() => {});
  }

  btn.classList.remove("is-hidden");
  syncMusicUi();

  btn.addEventListener("click", (event) => {
    event.stopPropagation();
    if (audio.paused) {
      userPaused = false;
      tryPlay();
    } else {
      userPaused = true;
      audio.pause();
    }
  });

  audio.addEventListener("play", syncMusicUi);
  audio.addEventListener("pause", syncMusicUi);
  audio.addEventListener("canplay", tryPlay);

  document.addEventListener("pointerdown", (event) => {
    if (btn.contains(event.target)) return;
    tryPlay();
  }, true);

  tryPlay();
}

function syncMusicUi() {
  const audio = document.getElementById("bg-music");
  const btn = document.getElementById("music-toggle");
  const playing = !audio.paused;
  btn.classList.toggle("on", playing);
  btn.setAttribute("aria-pressed", String(playing));
  btn.setAttribute("aria-label", playing ? "Pause background music" : "Play background music");
  document.getElementById("music-label").textContent = playing ? "Pause" : "Play";
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
