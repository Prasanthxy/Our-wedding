/* Wedding invitation — render, cover, countdown, share */

document.addEventListener("DOMContentLoaded", () => {
  applyMeta();
  populateContent();
  initOpenCover();
  initCountdown();
  initScrollReveal();
  initStoryMotion();
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
  const { couple, copy, cover, venue, family, media, story, invitationCard } = d;

  const coverPoster = document.getElementById("cover-poster");
  if (media.coverPoster && coverPoster) {
    coverPoster.style.backgroundImage = `url("${media.coverPoster}")`;
  }

  setText("cover-monogram", couple.monogram);
  setText("cover-eyebrow", cover.eyebrow);
  setText("cover-title", cover.title);
  document.getElementById("cover-couple").innerHTML =
    `${escapeHtml(couple.groomName)} <span class="amp">&amp;</span> ${escapeHtml(couple.brideName)}`;
  setText("cover-date", `${copy.heroDates} · Coimbatore`);
  setText("btn-open-music", cover.openButton);
  setText("btn-open-silent", cover.skipMusic);

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
  setText("hero-scroll-hint", copy.heroScrollHint || "");

  setText("story-eyebrow", story.eyebrow);
  setText("story-heading", story.heading);
  setText("story-intro", story.intro);
  document.getElementById("story-chapters").innerHTML = buildStoryHtml(story.chapters);

  setText("invite-card-eyebrow", invitationCard.eyebrow);
  setText("invite-card-heading", invitationCard.heading);
  setText("invite-card-body", invitationCard.body);
  const posterImg = document.getElementById("invite-poster-img");
  if (media.posterImage && posterImg) {
    posterImg.src = media.posterImage;
    posterImg.alt = `${couple.groomName} and ${couple.brideName} wedding invitation`;
  }

  setText("note-eyebrow", copy.noteEyebrow);
  setText("note-heading", copy.noteHeading);
  setText("note-body", copy.noteBody);
  const noteImg = document.getElementById("note-image");
  if (media.noteImage && noteImg) {
    noteImg.src = media.noteImage;
    noteImg.alt = media.noteImageAlt || "";
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
  } else {
    document.getElementById("btn-open-music").textContent = cover.openButton;
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

function buildStoryHtml(chapters) {
  return chapters
    .map(
      (ch, i) => `
      <article class="story-chapter reveal ${ch.reverse ? "story-chapter--reverse" : ""}">
        <div class="story-chapter__media">
          <img src="${escapeHtml(ch.image)}" alt="${escapeHtml(ch.imageAlt)}" loading="${i === 0 ? "eager" : "lazy"}" width="640" height="480">
        </div>
        <div class="story-chapter__copy">
          <p class="story-chapter__step">${escapeHtml(ch.step)}</p>
          <h3 class="story-chapter__title">${escapeHtml(ch.title)}</h3>
          <p class="story-chapter__body">${escapeHtml(ch.body)}</p>
        </div>
      </article>`
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
            <p class="event-card__step">${escapeHtml(e.shortLabel)}</p>
            <h3 class="event-card__title">${escapeHtml(e.label)}</h3>
            <p class="event-card__row"><strong>${escapeHtml(e.displayDate)}</strong> · ${escapeHtml(e.day)}</p>
            <p class="event-card__row">${escapeHtml(e.time)}</p>
            <p class="event-card__row">${escapeHtml(e.timezone)}</p>
          </div>
        </article>`;
    })
    .join("");
}

function initStoryMotion() {
  const mediaBlocks = document.querySelectorAll(".story-chapter__media img");
  if (!mediaBlocks.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.style.transform = entry.isIntersecting
          ? "scale(1) translateY(0)"
          : "scale(1.04) translateY(8px)";
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -5% 0px" }
  );

  mediaBlocks.forEach((img) => {
    img.style.transition = "transform 0.9s ease";
    observer.observe(img);
  });
}

function initOpenCover() {
  const cover = document.getElementById("open-cover");
  const main = document.getElementById("main-content");
  const footer = document.getElementById("footer");
  const audio = document.getElementById("bg-music");
  const musicBtn = document.getElementById("music-toggle");
  const hasMusic = Boolean(weddingData.media.musicSrc);

  function enter(withMusic) {
    cover.classList.add("dismissed");
    setTimeout(() => {
      cover.hidden = true;
      document.getElementById("top").hidden = false;
      main.hidden = false;
      footer.hidden = false;
      if (hasMusic) {
        musicBtn.classList.remove("is-hidden");
      }
    }, 720);
    if (withMusic && hasMusic) {
      audio.play().catch(() => {});
      syncMusicUi();
    }
  }

  document.getElementById("btn-open-music").addEventListener("click", () => enter(hasMusic));
  document.getElementById("btn-open-silent").addEventListener("click", () => enter(false));

  if (!hasMusic) {
    document.getElementById("btn-open-silent").classList.add("is-hidden");
  }
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
    <button type="button" data-event="ceremony" id="clock-ceremony">Wedding</button>`;

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

  btn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
    syncMusicUi();
  });

  audio.addEventListener("play", syncMusicUi);
  audio.addEventListener("pause", syncMusicUi);
}

function syncMusicUi() {
  const audio = document.getElementById("bg-music");
  const btn = document.getElementById("music-toggle");
  const playing = !audio.paused;
  btn.classList.toggle("on", playing);
  btn.setAttribute("aria-pressed", String(playing));
  document.getElementById("music-label").textContent = playing ? "Music on" : "Music";
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
