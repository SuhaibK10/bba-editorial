// Homepage hero slider: full-bleed category shots.
// Cloudinary c_fill crop keeps the subject centred at hero aspect ratios.
// mobileImage is optional — omit it and the slide just reuses `desktopImage` on phones.
export type HeroSlide = {
  name: string;
  slug: string;
  desktopImage: string;
  mobileImage?: string;
  tagline?: string; // selling line shown above the hero CTAs
  // Per-slide opt-in: adds a dark bottom gradient behind the text for
  // photos bright enough at the bottom that the white tagline/CTAs lose
  // contrast — the shared text-shadow alone isn't enough on those.
  textScrim?: boolean;
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
    desktopImage: heroImg("Generated_Image_July_19_2026_-_12_40AM_ttjs4k.jpg"),
    mobileImage: heroImgMobile("Generated_Image_July_12_2026_-_5_08PM_tlbj4u.jpg"),
    tagline: "The Acrylic Lectern that commands every room.",
  },
  {
    name: "Name Plates",
    slug: "floor-standing-displays",
    desktopImage: heroImg("FloorStandingDisplays_k43oyj.png"),
    mobileImage: heroImgMobile("Generated_Image_July_17_2026_-_6_08PM_wwez7y"),
    tagline: "Name Plates that make sure they never forget you.",
  },
  {
    name: "Literature Holder",
    slug: "literature-holder",
    desktopImage: heroImg("v1779711816/StaticSignage_cdmsko.png"),
    mobileImage: heroImgOriginal("heromobile_qeitul.jpg"),
    tagline: "The Literature Holder that puts your story in their hands.",
  },
  {
    name: "Retail POP Displays",
    slug: "mobile-charging-stations",
    desktopImage: heroImg("deskt_qfzhdz.png"),
    mobileImage: heroImgMobile("mobile_ucu1er.png"),
    tagline: "Retail POP Displays built to stop shoppers mid-aisle.",
    textScrim: true,
  },
  {
    name: "Acrylic Photoframes",
    slug: "acrylic-risers",
    desktopImage: heroImg("ChatGPT_Image_Jul_18_2026_at_05_16_29_PM_ej0cs8"),
    mobileImage: heroImgMobile("ChatGPT_Image_Jul_18_2026_at_05_34_00_PM_vffops.png"),
    tagline: "Acrylic Photoframes that turn memories into art.",
  },

  {
    name: "Acrylic Raffle Drum",
    slug: "new-slide-1",
    desktopImage: heroImg("v1784379575/Generated_Image_July_18_2026_-_6_28PM_codwn2.jpg"),
    mobileImage: heroImgMobile("v1784379291/ChatGPT_Image_Jul_18_2026_at_06_23_33_PM_l1mzji.png"),
    tagline: "The Acrylic Raffle Drum that makes every draw feel fair.",
  },
  {
    name: "Acrylic Static Signage",
    slug: "new-slide-2",
    desktopImage: heroImg("v1784378386/Generated_Image_July_18_2026_-_6_07PM_k5ngpw.jpg"),
    mobileImage: heroImgMobile("v1784378741/ChatGPT_Image_Jul_18_2026_at_06_15_13_PM_bemx37.png"),
    tagline: "Acrylic Static Signage that gets noticed first.",
  },
  {
    name: "Floor Standing Displays",
    slug: "floor-standing-displays-2",
    desktopImage: "https://res.cloudinary.com/deh394y0h/image/upload/v1784923955/de_qz2w6z.png", // paste Cloudinary URL here
    mobileImage: "https://res.cloudinary.com/deh394y0h/image/upload/v1784923549/mo_zr7337.png", // paste Cloudinary URL here
    tagline: "Floor Standing Displays built to anchor any brand zone.",
  },

];

// Drops any slide still waiting on a pasted-in desktopImage, so an
// unfinished placeholder above never shows up as a broken image in the
// live carousel — it just quietly starts rotating in once filled.
export const heroSlides = allSlides.filter((slide) => slide.desktopImage);
