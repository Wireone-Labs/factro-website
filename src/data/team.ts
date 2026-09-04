export interface TeamMember {
  id: string;
  name: string;
  role: string;
  linkedin: string;
  bio: string;
  /** Path under /public, e.g. "/team/aravind.jpg". Falls back to initials when unset. */
  photo?: string;
  /** Total years of professional experience. Omit rather than guess. */
  yearsExperience?: number;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "aravind",
    name: "Aravind Sundarapandiyan",
    role: "Co-Founder",
    linkedin: "https://www.linkedin.com/in/aravindme/",
    bio: "Has built products across fintech, agritech, automotive and edtech at Series B and C startups, architecting complex systems at scale. Ex-Axio, ex-Vogo.",
    yearsExperience: 12,
    photo: "/team/aravind.jpg",
  },
  {
    id: "rakesh",
    name: "Rakesh Damodaran",
    role: "Senior Product Manager",
    linkedin: "https://www.linkedin.com/in/rakeshdamodaran/",
    bio: "A Masters in Automobile Engineering from Coventry University, with a background in automotive engineering and mechanical design before moving into product management. Ex-Vogo.",
    yearsExperience: 6,
    photo: "/team/rakesh.jpg",
  },
  {
    id: "joy",
    name: "Joy Baruah",
    role: "Senior Software Engineer",
    linkedin: "https://www.linkedin.com/in/joy-baruah/",
    bio: "An English literature graduate who builds across complex IoT infrastructure, web technologies and AI/ML models.",
    yearsExperience: 4,
    photo: "/team/joy.jpg",
  },
  {
    id: "inamul",
    name: "Inamul Hasan",
    role: "Senior Frontend Developer",
    linkedin: "https://www.linkedin.com/in/inamul7/",
    bio: "A wizard with frontend technologies across stacks, and passionate about applying AI/ML to real-world business problems.",
    yearsExperience: 3,
    photo: "/team/inamul.jpg",
  },
];

export interface FoundingStory {
  year: string;
  text: string;
}

export const FOUNDING_STORIES: FoundingStory[] = [
  {
    year: "1935",
    text: "Cipla was one chemist and a rented building in Bombay.",
  },
  {
    year: "1983",
    text: "Sun Pharma was five psychiatry products and borrowed money in a small town in Gujarat.",
  },
  {
    year: "1990",
    text: "Caplin Point was a first-generation entrepreneur in Chennai making ointments and creams, years from the export markets that would define it.",
  },
  {
    year: "1995",
    text: "Mankind was a few people who believed the medicine should reach the towns nobody bothered selling to.",
  },
];
