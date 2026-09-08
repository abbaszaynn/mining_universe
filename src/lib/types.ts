
export interface MineLocation {
  name: string;
  polygon: { lat: number; lng: number }[];
}

export interface Document {
  id: string;
  title: string;
  type: 'Geological Report' | 'License' | 'Concession Paper' | 'Financial Summary' | 'Map' | 'Investor Report';
  url: string;
  companyId?: string;
  companyName?: string;
  contentText?: string;
}

export interface Video {
  id: string;
  url: string;
  title: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
  companyName: string;
  mineral?: string;
  properties?: string;
}

export interface Deposit {
  name: string;
  location?: string;
  type?: string;
  details?: string[];
  /**
   * Per-site licence stage. Previously this only existed at company level,
   * which was wrong: a single company holds both producing and early-stage
   * ground, and an investor reading a concession page needs the stage of
   * *that block*, not of the company that happens to hold it.
   * Falls back to the parent company's status when unset.
   */
  status?: "Operational" | "Exploratory Phase";
  /**
   * Road-accessible sites are a materially different proposition: in the
   * Karakoram, helicopter-supported work can consume a budget before any
   * material moves. Only set where access is genuinely confirmed.
   */
  roadAccess?: boolean;
  /**
   * The registered entity that actually holds this licence.
   *
   * Needed because Durr Mines and Zircon Mines are merged into one company
   * record ("Durr & Zircon Consortium") for entity-signal reasons, which
   * collapses the per-licence attribution: without this, every one of their
   * eight blocks reports the consortium as its holder, and a reader cannot
   * tell that Hilal Abad is a Zircon Mines licence. Falls back to the parent
   * company name when unset.
   */
  licenceHolder?: string;
}

export interface Company {
  id: string;
  name: string;
  tagline: string;
  logoUrl: string;
  description: string;
  history: string;
  leadership: { name: string; title: string }[];
  projects: { name: string }[];
  status: 'Operational' | 'Exploratory Phase';
  investorContacts: { name: string; email: string; phone: string }[];
  locations: MineLocation[];
  images: GalleryImage[];
  videos: Video[];
  virtualTourUrl: string;
  documents: Document[];
  deposits: Deposit[];
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  publishDate: string;
  companyId?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  inquiryType: 'investor' | 'media' | 'public';
  dateSubmitted: string;
}
