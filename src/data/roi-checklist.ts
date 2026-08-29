export interface RoiCategory {
  id: string;
  label: string;
  items: string[];
}

export const MINUTES_PER_ITEM = 24;

export const ROI_CATEGORIES: RoiCategory[] = [
  {
    id: "finding-things",
    label: "Finding things",
    items: [
      "Checking the state of anything means calling someone",
      "SOPs, agreements and licences live in five different places",
      "Two people pull the same number and get different answers",
      "You learn something went wrong at review, not when it happens",
      "You cannot tell which department is the bottleneck",
    ],
  },
  {
    id: "work-between-people",
    label: "Work between people",
    items: [
      "WhatsApp is where the real coordination happens",
      "The same topics return every meeting, nothing on record",
      "Two departments each think the other is holding it",
      "Approvals move at the speed of who is in the building",
      "You cannot see who is overloaded until they say so, or leave",
    ],
  },
  {
    id: "looking-back",
    label: "Looking back",
    items: [
      "An inspection means days of assembling paperwork that exists",
      "Anything older than this year means physical records",
      "Five years of any metric is a project, not a question",
      "Nobody asks for long-range comparisons, knowing the cost",
      "Report generation is still a manual chore",
    ],
  },
  {
    id: "keeping-it-straight",
    label: "Keeping it straight",
    items: [
      "The same task runs differently depending on who is doing it",
      "Half of what keeps the plant running is not written down",
      "A deviation sits in a tray, then recurs under a new number",
      "A complaint arrives by email, never linked to its batch",
      "A recall means reconstructing where every pack went, by hand",
    ],
  },
];
