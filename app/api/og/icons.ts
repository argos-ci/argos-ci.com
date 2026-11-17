/**
 * The icons drawn on social images, as Lucide path data (ISC license,
 * lucide.dev). The site's own icons come from `lucide-react`, but its
 * components are client components built on a context hook, which the image
 * renderer can't run, so the route draws these nodes into an inline `<svg>`
 * itself. Keep each icon the same as the one the site shows for that page:
 * the pillar icons in `components/pillar-icons.ts`, the navbar's for the rest.
 */
type IconNode = readonly (readonly [
  "path" | "circle" | "rect",
  Record<string, string>,
])[];

export const OG_ICONS = {
  diff: [
    [
      "path",
      {
        d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      },
    ],
    ["path", { d: "M9 10h6" }],
    ["path", { d: "M12 13V7" }],
    ["path", { d: "M9 17h6" }],
  ],
  review: [
    [
      "path",
      {
        d: "M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z",
      },
    ],
    [
      "path",
      {
        d: "M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1",
      },
    ],
  ],
  stabilize: [
    ["path", { d: "M2 12q2.5 2 5 0t5 0 5 0 5 0" }],
    ["path", { d: "M2 19q2.5 2 5 0t5 0 5 0 5 0" }],
    ["path", { d: "M2 5q2.5 2 5 0t5 0 5 0 5 0" }],
  ],
  deploy: [
    ["path", { d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" }],
    [
      "path",
      {
        d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09",
      },
    ],
    [
      "path",
      {
        d: "M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z",
      },
    ],
    ["path", { d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05" }],
  ],
  bot: [
    ["path", { d: "M12 8V4H8" }],
    ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2" }],
    ["path", { d: "M2 14h2" }],
    ["path", { d: "M20 14h2" }],
    ["path", { d: "M15 13v2" }],
    ["path", { d: "M9 13v2" }],
  ],
  imageUp: [
    [
      "path",
      {
        d: "M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21",
      },
    ],
    ["path", { d: "m14 19.5 3-3 3 3" }],
    ["path", { d: "M17 22v-5.5" }],
    ["circle", { cx: "9", cy: "9", r: "2" }],
  ],
  plug: [
    ["path", { d: "M12 22v-5" }],
    ["path", { d: "M15 8V2" }],
    [
      "path",
      {
        d: "M17 8a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1z",
      },
    ],
    ["path", { d: "M9 8V2" }],
  ],
  compare: [
    ["circle", { cx: "5", cy: "6", r: "3" }],
    ["path", { d: "M12 6h5a2 2 0 0 1 2 2v7" }],
    ["path", { d: "m15 9-3-3 3-3" }],
    ["circle", { cx: "19", cy: "18", r: "3" }],
    ["path", { d: "M12 18H7a2 2 0 0 1-2-2V9" }],
    ["path", { d: "m9 15 3 3-3 3" }],
  ],
  tag: [
    [
      "path",
      {
        d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      },
    ],
    ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor" }],
  ],
  feather: [
    [
      "path",
      {
        d: "M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z",
      },
    ],
    ["path", { d: "M16 8 2 22" }],
    ["path", { d: "M17.5 15H9" }],
  ],
  logs: [
    ["path", { d: "M3 5h1" }],
    ["path", { d: "M3 12h1" }],
    ["path", { d: "M3 19h1" }],
    ["path", { d: "M8 5h1" }],
    ["path", { d: "M8 12h1" }],
    ["path", { d: "M8 19h1" }],
    ["path", { d: "M13 5h8" }],
    ["path", { d: "M13 12h8" }],
    ["path", { d: "M13 19h8" }],
  ],
  shieldCheck: [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      },
    ],
    ["path", { d: "m9 12 2 2 4-4" }],
  ],
  fileText: [
    [
      "path",
      {
        d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      },
    ],
    ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
    ["path", { d: "M10 9H8" }],
    ["path", { d: "M16 13H8" }],
    ["path", { d: "M16 17H8" }],
  ],
  users: [
    ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }],
    ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744" }],
    ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }],
    ["circle", { cx: "9", cy: "7", r: "4" }],
  ],
  messageCircle: [
    [
      "path",
      {
        d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
      },
    ],
  ],
  mail: [
    ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" }],
    ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }],
  ],
  heart: [
    [
      "path",
      {
        d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
      },
    ],
  ],
  building: [
    ["path", { d: "M10 12h4" }],
    ["path", { d: "M10 8h4" }],
    ["path", { d: "M14 21v-3a2 2 0 0 0-4 0v3" }],
    [
      "path",
      {
        d: "M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",
      },
    ],
    ["path", { d: "M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" }],
  ],
} as const satisfies Record<string, IconNode>;

export type OgIconName = keyof typeof OG_ICONS;
