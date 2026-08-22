/**
 * Directors taken from the registered leadership across the three operating
 * companies (see companies-data.ts). Single source of truth, shared by the
 * homepage "Who We Are" section and the /about leadership section.
 *
 * `bio` is deliberately role-scoped, not biographical. No years of
 * experience, education, or prior employers are claimed here, because none
 * of that is verified data this session has access to. Fabricating
 * credentials for real named individuals on an investment-facing site is a
 * different order of problem than thin content; if real bios exist, they
 * should replace these, not be layered on top of them.
 *
 * `photo` values are placeholders drawn from field imagery so the
 * colour/greyscale interaction is visible on the homepage; swap in real
 * headshots and nothing else needs to change.
 */
export type Director = {
  name: string;
  role: string;
  bio: string;
  photo: string;
};

export const DIRECTORS: Director[] = [
  {
    name: "Tabish Hassan",
    role: "CEO",
    bio: "Leads Durr & Zircon Consortium across all three operating companies, including strategy, licensing, and investor relations.",
    photo: "/images/directors/Tabish Hassan.jpeg",
  },
  {
    name: "Zain Abbas",
    role: "Director",
    bio: "Director across the consortium's operating companies, working on operations and business development.",
    photo: "/images/directors/Zain Abbas.jpeg",
  },
  {
    name: "Daniyal Ali",
    role: "Director",
    bio: "Director across the consortium's operating companies, working on operations and business development.",
    photo: "/images/directors/Daniyal Ali.jpeg",
  },
  {
    name: "Sabi ul Hasaan",
    role: "Director",
    bio: "Director across the consortium's operating companies, working on operations and business development.",
    photo: "/images/directors/Sabi ul Hasaan (1).jpeg",
  },
  {
    name: "Zubair Abbas",
    role: "Legal Advisor",
    bio: "Advises on regulatory compliance, licensing, and contractual matters across the consortium's mining leases and exploration licences.",
    photo: "/images/directors/Zubair Abbas.jpeg",
  },
  {
    name: "Kumail Abbas",
    role: "Project Director",
    bio: "Oversees field projects and site operations across the consortium's licensed concessions.",
    photo: "/images/directors/kunail abbas.jpeg",
  },
];
