// Homepage hero slider: full-bleed category shots.
// Cloudinary c_fill crop keeps the subject centred at hero aspect ratios.
// mobileImage is optional — omit it and the slide just reuses `desktopImage` on phones.
export type HeroSlide = {
  name: string;
  slug: string;
  desktopImage: string;
  mobileImage?: string;
  tagline?: string; // selling line shown above the hero CTAs
};

const heroCrop = "c_fill,g_auto,w_1920,h_1280";
const heroImg = (path: string) =>
  `https://res.cloudinary.com/deh394y0h/image/upload/${heroCrop}/${path}`;

// Taller, narrower crop for phone screens (portrait-ish vs. the desktop 3:2).
const heroCropMobile = "c_fill,g_auto,w_1080,h_1350";
const heroImgMobile = (path: string) =>
  `https://res.cloudinary.com/deh394y0h/image/upload/${heroCropMobile}/${path}`;

// For source photos that don't fit the mobile 4:5 frame at all: no crop at
// all, just format/quality optimisation. Pair with mobileFit: "contain" so
// the browser letterboxes to the real device size instead of Cloudinary
// forcing a fixed aspect ratio that the CSS `object-cover` then re-crops
// anyway — any fixed-ratio crop here gets cropped a second time client-side.
const heroImgOriginal = (path: string) =>
  `https://res.cloudinary.com/deh394y0h/image/upload/f_auto,q_auto/${path}`;

const allSlides: HeroSlide[] = [
  {
    name: "Acrylic Lectern",
    slug: "Acrylic Lectern",
    desktopImage: heroImg("Generated_Image_July_12_2026_-_5_01PM_kcswvt.jpg"),
    mobileImage: heroImgMobile("Generated_Image_July_12_2026_-_5_08PM_tlbj4u.jpg"),
    tagline: "Command the room before you say a word.",
  },
  {
    name: "Name Plates",
    slug: "floor-standing-displays",
    desktopImage: heroImg("FloorStandingDisplays_k43oyj.png"),
    mobileImage: heroImgMobile("Generated_Image_July_17_2026_-_6_08PM_wwez7y"),
    tagline: "Your name, made impossible to forget.",
  },
  {
    name: "Literature Holder",
    slug: "literature-holder",
    desktopImage: heroImg("v1779711816/StaticSignage_cdmsko.png"),
    mobileImage: heroImgOriginal("heromobile_qeitul.jpg"),
    tagline: "Put your story in their hands.",
  },
  {
    name: "Retail Pop Dislpays",
    slug: "mobile-charging-stations",
    desktopImage: heroImg("POP_Displays_mccdso.png"),
    mobileImage: heroImgMobile("Generated_Image_July_18_2026_-_6_30PM_a9ntp5"),
  },
  {
    name: "Acrlyic Photoframes",
    slug: "acrylic-risers",
    desktopImage: heroImg("ChatGPT_Image_Jul_18_2026_at_05_16_29_PM_ej0cs8"),
    mobileImage: heroImgMobile("Generated_Image_July_18_2026_-_5_18PM_glfpav.jpg"),
  },

  // ── Paste new slides below: full Cloudinary URLs, not just the public_id ──
  // (unlike the slides above, these skip the heroImg()/heroImgMobile()
  // helpers entirely, so whatever crop/transform is already in your pasted
  // link is exactly what renders — no extra c_fill applied on top).
  {
    name: "Acrylic Ruffle Drum",
    slug: "new-slide-1",
    desktopImage: "https://res.cloudinary.com/deh394y0h/image/upload/v1784379575/Generated_Image_July_18_2026_-_6_28PM_codwn2.jpg", // paste desktop Cloudinary link here
    mobileImage: "https://res.cloudinary.com/deh394y0h/image/upload/v1784379291/ChatGPT_Image_Jul_18_2026_at_06_23_33_PM_l1mzji.png",  // paste mobile Cloudinary link here
    tagline: "",
  },
  {
    name: "New Slide 2",
    slug: "new-slide-2",
    desktopImage: "https://res.cloudinary.com/deh394y0h/image/upload/v1784378386/Generated_Image_July_18_2026_-_6_07PM_k5ngpw.jpg",
    mobileImage: "https://res.cloudinary.com/deh394y0h/image/upload/v1784378741/ChatGPT_Image_Jul_18_2026_at_06_15_13_PM_bemx37.png",
    tagline: "",
  },
  {
    name: "New Slide 3",
    slug: "new-slide-3",
    desktopImage: "https://res.cloudinary.com/deh394y0h/image/upload/v1784378386/Generated_Image_July_18_2026_-_6_07PM_k5ngpw.jpg",
    mobileImage: "https://res.cloudinary.com/deh394y0h/image/upload/v1784378386/Generated_Image_July_18_2026_-_6_07PM_k5ngpw.jpg",
    tagline: "",
  },
];

// Drops any slide still waiting on a pasted-in desktopImage, so an
// unfinished placeholder above never shows up as a broken image in the
// live carousel — it just quietly starts rotating in once filled.
export const heroSlides = allSlides.filter((slide) => slide.desktopImage);
