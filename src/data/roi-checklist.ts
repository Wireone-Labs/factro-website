export interface RoiItem {
  text: string;
  minutes: number;
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
      { text: "Checking the state of anything means calling someone", minutes: 5 },
      { text: "SOPs, agreements and licences live in five different places", minutes: 6 },
      { text: "Two people pull the same number and get different answers", minutes: 4 },
      { text: "You learn something went wrong at review, not when it happens", minutes: 8 },
      { text: "You cannot tell which department is the bottleneck", minutes: 5 },
    ],
  },
  {
    id: "work-between-people",
    label: "Work between people",
    items: [
      { text: "WhatsApp is where the real coordination happens", minutes: 6 },
      { text: "The same topics return every meeting, nothing on record", minutes: 5 },
      { text: "Two departments each think the other is holding it", minutes: 8 },
      { text: "Approvals move at the speed of who is in the building", minutes: 4 },
      { text: "You cannot see who is overloaded until they say so, or leave", minutes: 5 },
    ],
  },
  {
    id: "looking-back",
    label: "Looking back",
    items: [
      { text: "An inspection means days of assembling paperwork that exists", minutes: 8 },
      { text: "Anything older than this year means physical records", minutes: 6 },
      { text: "Five years of any metric is a project, not a question", minutes: 5 },
      { text: "Nobody asks for long-range comparisons, knowing the cost", minutes: 4 },
      { text: "Report generation is still a manual chore", minutes: 6 },
    ],
  },
  {
    id: "keeping-it-straight",
    label: "Keeping it straight",
    items: [
      { text: "The same task runs differently depending on who is doing it", minutes: 5 },
      { text: "Half of what keeps the plant running is not written down", minutes: 8 },
      { text: "A deviation sits in a tray, then recurs under a new number", minutes: 6 },
      { text: "A complaint arrives by email, never linked to its batch", minutes: 4 },
      { text: "A recall means reconstructing where every pack went, by hand", minutes: 8 },
    ],
  },
];
