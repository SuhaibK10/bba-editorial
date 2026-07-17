// Homepage hero slider: full-bleed category shots.
// Cloudinary c_fill crop keeps the subject centred at hero aspect ratios.
// mobileImage is optional — omit it and the slide just reuses `desktopImage` on phones.
export type HeroSlide = {
  name: string;
  slug: string;
  desktopImage: string;
  mobileImage?: string;
};

const heroCrop = "c_fill,g_auto,w_1920,h_1280";
const heroImg = (path: string) =>
  `https://res.cloudinary.com/deh394y0h/image/upload/${heroCrop}/${path}`;

// Taller, narrower crop for phone screens (portrait-ish vs. the desktop 3:2).
const heroCropMobile = "c_fill,g_auto,w_1080,h_1350";
const heroImgMobile = (path: string) =>
  `https://res.cloudinary.com/deh394y0h/image/upload/${heroCropMobile}/${path}`;

export const heroSlides: HeroSlide[] = [
  {
    name: "Acrylic Lectern",
    slug: "Acrylic Lectern",
    desktopImage: heroImg("Generated_Image_July_12_2026_-_5_01PM_kcswvt.jpg"),
    mobileImage: heroImgMobile("Generated_Image_July_12_2026_-_5_08PM_tlbj4u.jpg"),
  },
  {
    name: "Floor Standing Displays",
    slug: "floor-standing-displays",
    desktopImage: heroImg("v1779899150/FloorStandingDisplays_k43oyj.png"),
    mobileImage: heroImgMobile("Generated_Image_July_14_2026_-_2_36AM_eno12k.jpg"),
  },
  {
    name: "Literature Holder",
    slug: "literature-holder",
    desktopImage: heroImg("v1779711816/StaticSignage_cdmsko.png"),
    mobileImage: heroImgMobile("Generated_Image_July_12_2026_-_5_01PM_kcswvt.jpg"),
  },
  {
    name: "Charging Stations",
    slug: "mobile-charging-stations",
    desktopImage: heroImg("v1779903523/Charging_ongamy.png"),
    mobileImage: heroImgMobile("Generated_Image_July_14_2026_-_2_40AM_wizkgo.jpg"),
  },
  {
    name: "Acrylic Risers",
    slug: "acrylic-risers",
    desktopImage: heroImg("v1779899888/AcrylicRisersB_B_uicnrb.png"),
    mobileImage: heroImgMobile("v1779899888/AcrylicRisersB_B_uicnrb.png"),
  },
];
