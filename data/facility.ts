// ─────────────────────────────────────────────
//  B & B Appliances: workshop capabilities
//  The machines on the floor at GT Karnal Road,
//  grouped by what they do. Rendered on /about.
// ─────────────────────────────────────────────

export type CapabilityGroup = {
  title: string;
  desc: string;
  machines: string[];
};

export const capabilityGroups: CapabilityGroup[] = [
  {
    title: "CNC & laser cutting",
    desc: "Computer-controlled cutting keeps hundred-unit runs identical to the first piece.",
    machines: [
      "CNC router machines",
      "Laser cutting machines",
      "Beam saw",
    ],
  },
  {
    title: "Routing & drilling",
    desc: "Hand and machine routing for edges, rebates, letterwork and fixings.",
    machines: [
      "12mm Hitachi routers",
      "Hand routers",
      "Letter cutters",
      "Precision small cutters",
      "Drill machines",
    ],
  },
  {
    title: "Forming & moulding",
    desc: "Heat does the shaping: bends, curves and repeatable moulded forms.",
    machines: [
      "Line-bending heaters, large and small",
      "In-house mould library",
      "Spindle moulder",
    ],
  },
  {
    title: "Polishing & finishing",
    desc: "The difference between cut plastic and finished acrylic is this bench.",
    machines: [
      "CNC polishing machines",
      "Buffing machines",
      "Planing machines",
    ],
  },
];
