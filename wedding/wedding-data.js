/* ============================================================
   WEDDING-DATA.JS — Edit this file to update the invitation.

   Images: use cropped art in assets/images/ (no template names/dates).
   Re-run scripts/crop-clean-images.py if you replace source references.

   AFTER YOU REPLACE THESE FILES ON GITHUB:
   Netlify redeploys the live page automatically.
   For the WhatsApp preview, keep meta.siteUrl and the og tags in
   index.html pointed at the live https address.
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
      dateISO: "2026-12-12",
      displayDate: "12 December 2026",
      day: "Saturday",
      time: "6:30 PM to 9:00 PM",
      note: "Dinner and time with family and friends.",
      timezone: "Indian Standard Time (IST)",
      image: "assets/images/reception.jpg",
      imageAlt: "Evening reception celebration with family and friends",
    },
    ceremony: {
      label: "Muhurtham",
      dateISO: "2026-12-13",
      displayDate: "13 December 2026",
      day: "Sunday",
      time: "7:00 AM to 8:30 AM",
      note: "The sacred wedding ceremony.",
      timezone: "Indian Standard Time (IST)",
      image: "assets/images/muhurtham.jpg",
      imageAlt: "Muhurtham — sacred wedding ceremony",
    },
  },

  venue: {
    name: "Balakrishna Kalyana Mandapam",
    addressLines: [
      "Bhagath Singh Street, Bhagat Singh Nagar",
      "Periyanaickenpalayam",
      "Coimbatore, Tamil Nadu",
    ],
    mapsQuery:
      "Balakrishna Kalyana Mandapam, Bhagath Singh Street, Bhagat Singh Nagar, Periyanaickenpalayam, Coimbatore, Tamil Nadu",
    image: "assets/images/venue-temple-clean.jpg",
    imageAlt: "Temple gopuram in warm light",
  },

  countdown: {
    defaultEvent: "ceremony",
  },

  gallery: [
    {
      image: "assets/images/story-steps.jpg",
      imageAlt: "Illustration of the sacred seven steps",
      caption: "The seven steps",
    },
    {
      image: "assets/images/chapter-3.jpg",
      imageAlt: "Traditional feast shared with family and friends",
      caption: "A meal together",
    },
    {
      image: "assets/images/note-courtyard.png",
      imageAlt: "Festive courtyard decorated for the celebration",
      caption: "Ready to welcome you",
    },
  ],

  copy: {
    siteTagline: "A celebration of love",
    locationBadge: "Coimbatore · 2026",
    heroIntro: "Together with our families",
    heroInvite: "We joyfully invite you to our wedding.",
    heroDates: "12 & 13 December 2026",
    eventsIntro: "Please be with us for both celebrations.",
    galleryHeading: "A few moments",
    galleryLead: "Traditions we are grateful to share.",
    cardEyebrow: "The invitation",
    cardLine: "Your presence would mean the world.",
    countdownEyebrow: "Until we say I do",
    countdownHeading: "Counting down to our wedding",
    venueEyebrow: "Where we gather",
    venueNote: "Reception and muhurtham are both held here.",
    footerSignOff: "With love",
    footerCredit: "Made with love · December 2026",
  },

  media: {
    heroImage: "assets/images/story-begin.jpg",
    heroImageAlt: "Traditional wedding garlands and ceremony art",
    heroGarlandAccent: "",
    coverPoster: "assets/images/poster.jpg",
    posterImage: "assets/images/poster.jpg",
    musicSrc: "assets/Wedding_Bgm.mp3",
    musicVolume: 0.45,
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
