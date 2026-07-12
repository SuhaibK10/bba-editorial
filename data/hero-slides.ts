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
    name: "Retail POP Displays",
    slug: "retail-pop-displays",
    desktopImage: heroImg("Generated_Image_July_12_2026_-_5_01PM_kcswvt.jpg"),
    mobileImage: heroImgMobile("Generated_Image_July_12_2026_-_5_01PM_kcswvt.jpg"),
  },
  {
    name: "Floor Standing Displays",
    slug: "floor-standing-displays",
    desktopImage: heroImg("v1779899150/FloorStandingDisplays_k43oyj.png"),
    mobileImage: heroImgMobile("v1779899150/FloorStandingDisplays_k43oyj.png"),
  },
  {
    name: "Static Signages",
    slug: "static-signages",
    desktopImage: heroImg("v1779711816/StaticSignage_cdmsko.png"),
    mobileImage: heroImgMobile("v1779711816/StaticSignage_cdmsko.png"),
  },
  {
    name: "Charging Stations",
    slug: "mobile-charging-stations",
    desktopImage: heroImg("v1779903523/Charging_ongamy.png"),
    mobileImage: heroImgMobile("v1779903523/Charging_ongamy.png"),
  },
  {
    name: "Acrylic Risers",
    slug: "acrylic-risers",
    desktopImage: heroImg("v1779899888/AcrylicRisersB_B_uicnrb.png"),
    mobileImage: heroImgMobile("v1779899888/AcrylicRisersB_B_uicnrb.png"),
  },
];
