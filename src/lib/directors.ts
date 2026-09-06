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
 * `statement` is first-person and appears on the homepage leadership
 * carousel. These were drafted to a brief given by the client, who is the
 * authority on their own directors — they are positioning, not claims of
 * fact, and they contain no figures, credentials or history that could be
 * checked and found wrong. Each director should still read and approve his
 * own words before this goes out.
 *
 * `photo` values are placeholders drawn from field imagery so the
 * colour/greyscale interaction is visible on the homepage; swap in real
 * headshots and nothing else needs to change.
 */
export type Director = {
  name: string;
  role: string;
  bio: string;
  /** First-person positioning statement, shown on the leadership carousel. */
  statement?: string;
  photo: string;
  /**
   * Personal LinkedIn profile, where one is confirmed. Emitted as `sameAs`
   * on that director's `Person` schema, not on the `Organization` — a
   * personal profile does not represent the company, and claiming it does
   * would be incorrect schema. Organization `sameAs` needs a real company
   * page, which is playbook §1.
   */
  linkedin?: string;
};

export const DIRECTORS: Director[] = [
  {
    name: "Tabish Hassan",
    role: "CEO",
    bio: "Leads Durr & Zircon Consortium across all three operating companies, including strategy, licensing, and investor relations.",
    statement:
      "These mountains have been talked about for generations, but nobody ever went up and proved what was inside them. We did. Now that the Government of Gilgit Baltistan and Pakistan have opened this sector properly, our work is to turn what we found into something that leaves this whole region better off.",
    photo: "/images/directors/Tabish Hassan.jpeg",
  },
  {
    name: "Zain Abbas",
    role: "Director",
    bio: "Director across the consortium's operating companies, working on operations and business development.",
    statement:
      "We are young, we are from this land, and we hold these licences legally. That combination simply did not exist here before. Any serious investor, anywhere in the world, can now come to Gilgit Baltistan, stand on the ground themselves, and build something alongside us.",
    photo: "/images/directors/Zain Abbas.jpeg",
    linkedin: "https://www.linkedin.com/in/zain-abbas1/",
  },
  {
    name: "Daniyal Ali",
    role: "Director",
    bio: "Director across the consortium's operating companies, working on operations and business development.",
    statement:
      "Every valley we work in belongs to the people who live in it, and they sit at the table with us. If this land is going to become wealthy, the families who own it have to become wealthy with it. That is not just something we say, it is written into our community agreements.",
    photo: "/images/directors/Daniyal Ali.jpeg",
  },
  {
    name: "Sabi ul Hasaan",
    role: "Director",
    bio: "Director across the consortium's operating companies, working on operations and business development.",
    statement:
      "We have walked these seams ourselves, at altitude and in the cold, long before anyone else was interested in them. That is why we can speak about the potential of these mines with confidence instead of guesswork.",
    photo: "/images/directors/Sabi ul Hasaan (1).jpeg",
  },
  {
    name: "Zubair Abbas",
    role: "Legal Advisor",
    bio: "Advises on regulatory compliance, licensing, and contractual matters across the consortium's mining leases and exploration licences.",
    statement:
      "Foreign capital rarely struggles here for lack of minerals; it struggles for lack of clean paperwork. Our licences, incorporation records and community agreements are complete and open to inspection, and we walk every investor through the legal route into Pakistan step by step.",
    photo: "/images/directors/Zubair Abbas.jpeg",
  },
  {
    name: "Kumail Abbas",
    role: "Project Director",
    bio: "Oversees field projects and site operations across the consortium's licensed concessions.",
    statement:
      "I spend my time on the sites, not behind a desk. We are a young team that grew up beneath these mountains, and getting to be the generation that finally opens them up, properly and on record, genuinely feels like a blessing.",
    photo: "/images/directors/kunail abbas.jpeg",
  },
];
