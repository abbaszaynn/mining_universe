
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
