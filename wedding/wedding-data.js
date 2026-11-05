/* ============================================================
   WEDDING-DATA.JS — Edit this file to update the invitation.

   Images: use cropped art in assets/images/ (no template names/dates).
   Re-run scripts/crop-clean-images.py if you replace source references.

   AFTER NETLIFY DEPLOY (WhatsApp preview):
   1. Set meta.siteUrl below to your live URL (no trailing slash).
   2. In index.html, set og:url and og:image to full https URLs.
   3. Commit, push — Netlify redeploys automatically.
   ============================================================ */

const weddingData = {
  couple: {
    groomName: "Durga Prasanth",
    brideName: "Suvedha",
    monogram: "D & S",
  },

  family: {
    show: false,
    introLine: "With the blessings of our families",
    groomParents: "",
    brideParents: "",
  },

  events: {
    reception: {
      label: "Reception",
      shortLabel: "01 — The evening before",
      dateISO: "2026-12-12",
      displayDate: "12 December 2026",
      day: "Saturday",
      time: "7:00 PM onwards",
      timezone: "Indian Standard Time (IST)",
      image: "assets/images/reception.jpg",
      imageAlt: "Evening reception celebration with family and friends",
    },
    ceremony: {
      label: "Muhurtham",
      shortLabel: "02 — The wedding day",
      dateISO: "2026-12-13",
      displayDate: "13 December 2026",
      day: "Sunday",
      time: "7:00 AM onwards",
      timezone: "Indian Standard Time (IST)",
      image: "assets/images/muhurtham.jpg",
      imageAlt: "Muhurtham — sacred wedding ceremony",
    },
  },

  venue: {
    name: "Balakrishna Kalyana Mandapam",
    addressLines: [
      "Periyanaicken Palayam",
      "Coimbatore, Tamil Nadu",
    ],
    mapsQuery:
      "Balakrishna Kalyana Mandapam, Periyanaicken Palayam, Coimbatore, Tamil Nadu",
    image: "assets/images/venue-temple-clean.jpg",
    imageAlt: "Temple gopuram in warm light",
  },

  countdown: {
    defaultEvent: "ceremony",
  },

  story: {
    eyebrow: "Our story",
    heading: "Three moments leading to our wedding",
    intro:
      "Like every South Indian wedding, ours is woven from tradition, family, and quiet promises. Scroll through the moments we hold close — then see when and where we celebrate together.",
    chapters: [
      {
        step: "Chapter I",
        title: "Where it begins",
        body:
          "With garlands, lamp light, and the blessings of those who raised us — we prepare to welcome you into our families' joy.",
        image: "assets/images/story-begin.jpg",
        imageAlt: "Traditional garlands and wedding ceremony art",
        reverse: false,
      },
      {
        step: "Chapter II",
        title: "Sacred steps together",
        body:
          "The rituals we grew up watching become our own: each step a promise, each petal a whisper of good fortune.",
        image: "assets/images/story-steps.jpg",
        imageAlt: "Illustration of the sacred seven steps",
        reverse: true,
      },
      {
        step: "Chapter III",
        title: "Two hearts, one path",
        body:
          "We stand at the threshold of a new life — grateful, hopeful, and eager to share this day with the people we love most.",
        image: "assets/images/chapter-3.jpg",
        imageAlt: "Traditional feast shared with family and friends",
        reverse: false,
      },
    ],
  },

  invitationCard: {
    eyebrow: "The invitation",
    heading: "Crafted with love, meant for you",
    body:
      "We brought our celebration details together here for you — our names, the days that matter, and everything you need to join us in Coimbatore.",
  },

  copy: {
    siteTagline: "A celebration of love",
    locationBadge: "Coimbatore · 2026",
    heroIntro: "Together with our families",
    heroInvite:
      "We joyfully invite you to celebrate our wedding.",
    heroDates: "12 & 13 December 2026",
    heroScrollHint: "Scroll to begin the story",
    noteEyebrow: "A note from the two of us",
    noteHeading: "Your presence would mean the world.",
    noteBody:
      "We would be honoured to have you with us as we begin this new chapter together.",
    eventsIntro:
      "Two celebrations — an evening of warmth, and a morning of sacred vows.",
    countdownEyebrow: "Until we say I do",
    countdownHeading: "Counting down to our wedding",
    venueEyebrow: "Where we gather",
    footerSignOff: "With love",
    footerCredit: "Made with love · December 2026",
  },

  media: {
    heroImage: "assets/images/story-begin.jpg",
    heroImageAlt: "Traditional wedding garlands and ceremony art",
    heroGarlandAccent: "",
    coverPoster: "assets/images/poster.jpg",
    posterImage: "assets/images/poster.jpg",
    noteImage: "assets/images/note-courtyard.png",
    noteImageAlt: "Festive Indian courtyard decorated for celebration",
    musicSrc: "",
  },

  cover: {
    eyebrow: "With love and blessings",
    title: "You're invited to our wedding",
    openButton: "Open invitation",
    skipMusic: "Continue without music",
  },

  meta: {
    title: "Durga Prasanth & Suvedha | Wedding Invitation",
    description:
      "Join us for our wedding celebrations on 12–13 December 2026 in Coimbatore.",
    themeColor: "#F5F3E7",
    ogImage: "assets/images/og-preview.jpg",
    siteUrl: "https://durga-suvedha-wedding.netlify.app",
  },
};
