/** Each checked item adds a flat 24 minutes/week, per person — checking all
 *  twenty lands at 480 minutes (8 hours), matching the Business Outcomes
 *  "roughly a working day a week" estimate on the homepage. Don't let this
 *  drift from that number if either changes. */
export const MINUTES_PER_ITEM = 24;

export interface RoiItem {
  text: string;
  /** DemoForm interest labels this pain point maps to, so a visitor's
   *  selections can pre-highlight the relevant modules on the demo page. */
  interests: string[];
}

export interface RoiCategory {
  id: string;
  label: string;
  items: RoiItem[];
}

export const ROI_CATEGORIES: RoiCategory[] = [
  {
    id: "finding-things",
    label: "Finding things",
    items: [
      {
        text: "Checking the state of anything means calling someone",
        interests: ["Reports & Analytics"],
      },
      {
        text: "SOPs, agreements and licences live in five different places",
        interests: ["Quality & Compliance"],
      },
      {
        text: "Two people pull the same number and get different answers",
        interests: ["Reports & Analytics"],
      },
      {
        text: "You learn something went wrong at review, not when it happens",
        interests: ["Quality & Compliance"],
      },
      {
        text: "You cannot tell which department is the bottleneck",
        interests: ["Production", "Reports & Analytics"],
      },
    ],
  },
  {
    id: "work-between-people",
    label: "Work between people",
    items: [
      {
        text: "WhatsApp is where the real coordination happens",
        interests: ["Production"],
      },
      {
        text: "The same topics return every meeting, nothing on record",
        interests: ["Production"],
      },
      {
        text: "Two departments each think the other is holding it",
        interests: ["Production"],
      },
      {
        text: "Approvals move at the speed of who is in the building",
        interests: ["Sales & Procurement"],
      },
      {
        text: "You cannot see who is overloaded until they say so, or leave",
        interests: ["Production"],
      },
    ],
  },
  {
    id: "looking-back",
    label: "Looking back",
    items: [
      {
        text: "An inspection means days of assembling paperwork that exists",
        interests: ["Quality & Compliance"],
      },
      {
        text: "Anything older than this year means physical records",
        interests: ["Quality & Compliance"],
      },
      {
        text: "Five years of any metric is a project, not a question",
        interests: ["Reports & Analytics"],
      },
      {
        text: "Nobody asks for long-range comparisons, knowing the cost",
        interests: ["Reports & Analytics"],
      },
      {
        text: "Report generation is still a manual chore",
        interests: ["Reports & Analytics"],
      },
    ],
  },
  {
    id: "keeping-it-straight",
    label: "Keeping it straight",
    items: [
      {
        text: "The same task runs differently depending on who is doing it",
        interests: ["Production"],
      },
      {
        text: "Half of what keeps the plant running is not written down",
        interests: ["Production"],
      },
      {
        text: "A deviation sits in a tray, then recurs under a new number",
        interests: ["Quality & Compliance"],
      },
      {
        text: "A complaint arrives by email, never linked to its batch",
        interests: ["Quality & Compliance"],
      },
      {
        text: "A recall means reconstructing where every pack went, by hand",
        interests: ["Quality & Compliance", "Inventory"],
      },
    ],
  },
];
