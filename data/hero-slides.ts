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

export const heroSlides: HeroSlide[] = [
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
    mobileImage: heroImgMobile("Generated_Image_July_18_2026_-_3_49AM_uf8vkp"),
  },
  {
    name: "Acrylic Risers",
    slug: "acrylic-risers",
    desktopImage: heroImg("v1779899888/AcrylicRisersB_B_uicnrb.png"),
    mobileImage: heroImgMobile("Generated_Image_July_18_2026_-_3_46AM_jokxil.jpg"),
  },
];
