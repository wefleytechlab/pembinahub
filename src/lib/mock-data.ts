export type Category = "Food" | "Coffee" | "Shopping" | "Beauty" | "Auto" | "Home" | "Health" | "Services" | "More";
export type City = "Winkler" | "Morden" | "Surrounding Area";
export type Tier = "basic" | "club" | "club_plus";

export interface Hours { day: string; open: string; close: string; closed?: boolean }

export interface Offer {
  id: string;
  business_id: string;
  title: string;
  description: string;
  expires: string;
  badge?: string;
}

export interface Business {
  id: string;
  name: string;
  category: Category;
  city: City;
  address: string;
  phone: string;
  website: string;
  hours: Hours[];
  cover: string;        // gradient (fallback / accent)
  image: string;        // real photo URL
  accent: string;
  emoji: string;
  blurb: string;
  story?: string;
  rating: number;
  reviews: number;
  distance_km: number;
  price?: "$" | "$$" | "$$$";
  tier: Tier;
  featured?: boolean;
  new?: boolean;
  verified?: boolean;
  tags: string[];
  gallery: string[];    // real photo URLs
  offers?: Offer[];
}

export type LocalType = "event" | "campaign" | "notice";
export interface LocalItem {
  id: string;
  business_id?: string;
  type: LocalType;
  title: string;
  date_start: string;
  date_end?: string;
  location_text: string;
  city: City;
  description: string;
  cover: string;       // gradient
  image: string;       // real photo
  emoji: string;
  featured?: boolean;
  tags?: string[];
  organizer?: string;
  organizer_contact?: string;
  attendees?: number;
}

// Deterministic "now" so SSR + client render identical dates.
const NOW = new Date("2026-06-15T12:00:00Z");
const isoIn = (days: number, hour = 18) => {
  const d = new Date(NOW);
  d.setUTCDate(d.getUTCDate() + days);
  d.setUTCHours(hour, 0, 0, 0);
  return d.toISOString();
};
export const REFERENCE_NOW = NOW;

// Stable real-photo helper. picsum returns real CC photos for a given seed.
const pic = (seed: string, w = 800, h = 560) => `https://picsum.photos/seed/pembina-${seed}/${w}/${h}`;

const stdHours: Hours[] = [
  { day: "Mon", open: "09:00", close: "18:00" },
  { day: "Tue", open: "09:00", close: "18:00" },
  { day: "Wed", open: "09:00", close: "18:00" },
  { day: "Thu", open: "09:00", close: "20:00" },
  { day: "Fri", open: "09:00", close: "20:00" },
  { day: "Sat", open: "10:00", close: "17:00" },
  { day: "Sun", open: "", close: "", closed: true },
];
const cafeHours: Hours[] = [
  { day: "Mon", open: "07:00", close: "17:00" },
  { day: "Tue", open: "07:00", close: "17:00" },
  { day: "Wed", open: "07:00", close: "17:00" },
  { day: "Thu", open: "07:00", close: "19:00" },
  { day: "Fri", open: "07:00", close: "19:00" },
  { day: "Sat", open: "08:00", close: "16:00" },
  { day: "Sun", open: "09:00", close: "14:00" },
];

const gal = (id: string) => [pic(`${id}-a`), pic(`${id}-b`), pic(`${id}-c`), pic(`${id}-d`)];

export const businesses: Business[] = [
  {
    id: "b1", name: "Prairie Bean Coffee Co.", category: "Coffee", city: "Winkler",
    address: "245 Main St, Winkler, MB", phone: "+12043311234", website: "https://example.com",
    hours: cafeHours,
    cover: "linear-gradient(135deg,#f4b942,#e85d3a)", image: pic("b1"),
    accent: "#e85d3a", emoji: "☕", price: "$$",
    blurb: "Locally roasted beans, cozy patio, fresh pastries every morning.",
    story: "Family-run since 2018, Prairie Bean roasts single-origin beans in small batches every Tuesday. Pop in for a cortado, stay for the cinnamon-cardamom buns.",
    rating: 4.8, reviews: 312, distance_km: 0.4,
    tier: "club_plus", featured: true, verified: true,
    tags: ["Patio", "Wi-Fi", "Vegan options"],
    gallery: gal("b1"),
    offers: [
      { id: "o1", business_id: "b1", title: "15% OFF Your Order", description: "Show this screen at checkout. One per visit.", expires: "2026-12-31", badge: "15% OFF" },
      { id: "o1b", business_id: "b1", title: "Free pastry with any latte", description: "Mornings before 10am.", expires: "2026-08-31", badge: "FREEBIE" },
    ],
  },
  {
    id: "b2", name: "Valley Greens Bistro", category: "Food", city: "Morden",
    address: "112 Stephen St, Morden, MB", phone: "+12048221122", website: "https://example.com",
    hours: stdHours,
    cover: "linear-gradient(135deg,#10b981,#3b82f6)", image: pic("b2"),
    accent: "#10b981", emoji: "🥗", price: "$$$",
    blurb: "Farm-to-table plates sourced from Pembina Valley growers.",
    story: "Chef Marta sources 80% of ingredients within 60km. Menu rotates weekly with what's fresh from local farms.",
    rating: 4.7, reviews: 248, distance_km: 6.1,
    tier: "club", featured: true, verified: true,
    tags: ["Vegetarian", "Gluten-free", "Reservations"],
    gallery: gal("b2"),
    offers: [{ id: "o2", business_id: "b2", title: "Free drink with entrée", description: "Lunch hours only, weekdays.", expires: "2026-10-30", badge: "FREE DRINK" }],
  },
  {
    id: "b3", name: "Stonebridge Auto Care", category: "Auto", city: "Winkler",
    address: "880 Industrial Dr, Winkler, MB", phone: "+12043259999", website: "https://example.com",
    hours: stdHours,
    cover: "linear-gradient(135deg,#0c2340,#3b82f6)", image: pic("b3"),
    accent: "#0c2340", emoji: "🔧", price: "$$",
    blurb: "Trusted mechanics. Free inspection with every oil change.",
    rating: 4.6, reviews: 187, distance_km: 1.2,
    tier: "club", verified: true,
    tags: ["Free WiFi", "Shuttle", "Warranty"],
    gallery: gal("b3"),
  },
  {
    id: "b4", name: "Bloom & Petal", category: "Shopping", city: "Morden",
    address: "55 Thornhill St, Morden, MB", phone: "+12048220088", website: "https://example.com",
    hours: stdHours,
    cover: "linear-gradient(135deg,#f472b6,#a78bfa)", image: pic("b4"),
    accent: "#f472b6", emoji: "🌷", price: "$$",
    blurb: "Curated florals and gift bundles. Same-day delivery in the valley.",
    rating: 4.9, reviews: 421, distance_km: 5.8,
    tier: "club_plus", new: true, featured: true, verified: true,
    tags: ["Delivery", "Custom", "Gift wrap"],
    gallery: gal("b4"),
    offers: [{ id: "o3", business_id: "b4", title: "$10 OFF Bouquets", description: "Use online or in-store.", expires: "2026-11-15", badge: "$10 OFF" }],
  },
  {
    id: "b5", name: "Pembina Wellness Clinic", category: "Health", city: "Surrounding Area",
    address: "12 Hwy 14, Plum Coulee, MB", phone: "+12048295555", website: "https://example.com",
    hours: stdHours,
    cover: "linear-gradient(135deg,#34d399,#0ea5e9)", image: pic("b5"),
    accent: "#0ea5e9", emoji: "🩺", price: "$$",
    blurb: "Walk-in physio, massage, and family practitioners.",
    rating: 4.5, reviews: 96, distance_km: 12.4,
    tier: "basic", new: true,
    tags: ["Walk-ins", "Insurance"],
    gallery: gal("b5"),
  },
  {
    id: "b6", name: "Wheatfield Bakery", category: "Food", city: "Winkler",
    address: "300 Mountain Ave, Winkler, MB", phone: "+12043257788", website: "https://example.com",
    hours: cafeHours,
    cover: "linear-gradient(135deg,#fcd34d,#f59e0b)", image: pic("b6"),
    accent: "#f59e0b", emoji: "🥖", price: "$",
    blurb: "Sourdough, cinnamon buns and birthday cakes baked fresh daily.",
    rating: 4.8, reviews: 289, distance_km: 0.9,
    tier: "club", featured: true, verified: true,
    tags: ["Custom cakes", "Wholesale"],
    gallery: gal("b6"),
  },
  {
    id: "b7", name: "Glow Beauty Studio", category: "Beauty", city: "Morden",
    address: "27 8th St, Morden, MB", phone: "+12048220330", website: "https://example.com",
    hours: stdHours,
    cover: "linear-gradient(135deg,#fb7185,#f472b6)", image: pic("b7"),
    accent: "#fb7185", emoji: "💅", price: "$$$",
    blurb: "Nails, lashes, facials. Book online or walk in.",
    rating: 4.7, reviews: 203, distance_km: 5.6,
    tier: "club_plus", verified: true,
    tags: ["Online booking", "Walk-ins"],
    gallery: gal("b7"),
    offers: [{ id: "o4", business_id: "b7", title: "20% OFF First Visit", description: "New clients only.", expires: "2026-12-01", badge: "20% OFF" }],
  },
  {
    id: "b8", name: "Northwood Home Reno", category: "Home", city: "Winkler",
    address: "1100 Park Rd, Winkler, MB", phone: "+12043251010", website: "https://example.com",
    hours: stdHours,
    cover: "linear-gradient(135deg,#64748b,#0c2340)", image: pic("b8"),
    accent: "#475569", emoji: "🛠️", price: "$$$",
    blurb: "Kitchens, basements, and full builds across the Pembina Valley.",
    rating: 4.6, reviews: 74, distance_km: 1.8,
    tier: "basic", new: true,
    tags: ["Free quote", "Bonded"],
    gallery: gal("b8"),
  },
  {
    id: "b9", name: "Sunset Cycles", category: "Shopping", city: "Winkler",
    address: "210 Pembina Ave, Winkler, MB", phone: "+12043258822", website: "https://example.com",
    hours: stdHours,
    cover: "linear-gradient(135deg,#fb923c,#ef4444)", image: pic("b9"),
    accent: "#fb923c", emoji: "🚲", price: "$$",
    blurb: "Family bike shop with tune-ups, e-bikes, and trail gear.",
    rating: 4.7, reviews: 142, distance_km: 0.7,
    tier: "club", verified: true,
    tags: ["Service shop", "E-bikes"],
    gallery: gal("b9"),
    offers: [{ id: "o5", business_id: "b9", title: "Free tune-up with bike purchase", description: "Within 60 days.", expires: "2026-09-30", badge: "FREE SERVICE" }],
  },
  {
    id: "b10", name: "Morden Brick Oven", category: "Food", city: "Morden",
    address: "401 Stephen St, Morden, MB", phone: "+12048223344", website: "https://example.com",
    hours: stdHours,
    cover: "linear-gradient(135deg,#dc2626,#7c2d12)", image: pic("b10"),
    accent: "#dc2626", emoji: "🍕", price: "$$",
    blurb: "Wood-fired pizza, garlic knots, weekend live music.",
    rating: 4.8, reviews: 356, distance_km: 5.9,
    tier: "club_plus", featured: true, verified: true,
    tags: ["Family", "Takeout", "Patio"],
    gallery: gal("b10"),
    offers: [{ id: "o6", business_id: "b10", title: "2-for-1 Tuesdays", description: "Dine-in only, classic pies.", expires: "2026-12-31", badge: "2-FOR-1" }],
  },
  {
    id: "b11", name: "Valley Yoga Loft", category: "Health", city: "Winkler",
    address: "560 Roblin Blvd, Winkler, MB", phone: "+12043252244", website: "https://example.com",
    hours: stdHours,
    cover: "linear-gradient(135deg,#a78bfa,#0ea5e9)", image: pic("b11"),
    accent: "#a78bfa", emoji: "🧘", price: "$$",
    blurb: "Daily classes for every level. Drop-ins welcome.",
    rating: 4.9, reviews: 188, distance_km: 1.4,
    tier: "club", verified: true,
    tags: ["Drop-in", "Beginner classes"],
    gallery: gal("b11"),
  },
  {
    id: "b12", name: "Pembina Pet Supply", category: "Services", city: "Surrounding Area",
    address: "Hwy 32, Schanzenfeld, MB", phone: "+12043252727", website: "https://example.com",
    hours: stdHours,
    cover: "linear-gradient(135deg,#84cc16,#16a34a)", image: pic("b12"),
    accent: "#84cc16", emoji: "🐾", price: "$",
    blurb: "Pet food, grooming and a friendly pup-friendly patio.",
    rating: 4.6, reviews: 113, distance_km: 8.2,
    tier: "basic", new: true,
    tags: ["Pet wash", "Local brands"],
    gallery: gal("b12"),
  },
];

export const localItems: LocalItem[] = [
  {
    id: "l1", type: "event", title: "Harvest Night Market",
    date_start: isoIn(2, 17), date_end: isoIn(2, 22),
    location_text: "Bethel Heritage Park, Winkler", city: "Winkler",
    description: "Over 40 local vendors, food trucks, and live music on the park lawn. Family friendly.",
    cover: "linear-gradient(135deg,#f59e0b,#e85d3a)", image: pic("l1"),
    emoji: "🌽", featured: true, tags: ["Family", "Music"], attendees: 1240,
    organizer: "Winkler Community Foundation", organizer_contact: "events@winklerfoundation.ca",
  },
  {
    id: "l2", type: "campaign", title: "Shop Local Weekend",
    date_start: isoIn(5, 9), date_end: isoIn(7, 21),
    location_text: "Across the Pembina Valley", city: "Surrounding Area",
    description: "Three days of exclusive deals at participating businesses. Look for the Pembina Hub badge in stores.",
    cover: "linear-gradient(135deg,#10b981,#3b82f6)", image: pic("l2"),
    emoji: "🛍️", featured: true, tags: ["Shopping", "Deals"], attendees: 860,
    organizer: "Pembina Valley Chamber", organizer_contact: "info@pvchamber.ca",
  },
  {
    id: "l3", type: "notice", title: "Stephen St. Road Work",
    date_start: isoIn(1, 8), date_end: isoIn(10, 17),
    location_text: "Stephen St. between 7th and 10th, Morden", city: "Morden",
    description: "Expect single-lane traffic and detours weekdays from 8am–5pm. Plan alternate routes.",
    cover: "linear-gradient(135deg,#f97316,#ef4444)", image: pic("l3"),
    emoji: "🚧", tags: ["Traffic"],
    organizer: "City of Morden", organizer_contact: "311@morden.ca",
  },
  {
    id: "l4", type: "event", title: "Pembina Valley Half Marathon",
    date_start: isoIn(14, 8), location_text: "Morden Rec Centre", city: "Morden",
    description: "Annual half marathon, 10K, and family fun run. Registration open online.",
    cover: "linear-gradient(135deg,#3b82f6,#0c2340)", image: pic("l4"),
    emoji: "🏃", tags: ["Sport", "Family"], attendees: 580,
    organizer: "Valley Runners Club", organizer_contact: "run@pvhalf.ca",
  },
  {
    id: "l5", type: "campaign", title: "Frost Fest Sip & Stroll",
    date_start: isoIn(20, 16), date_end: isoIn(21, 22),
    location_text: "Main St, Winkler", city: "Winkler",
    description: "Winter walking tour with hot cocoa, light shows and shop pop-ups.",
    cover: "linear-gradient(135deg,#0ea5e9,#a78bfa)", image: pic("l5"),
    emoji: "❄️", featured: true, tags: ["Winter", "Shopping"], attendees: 410,
    organizer: "Downtown Winkler BIZ", organizer_contact: "hello@downtownwinkler.ca",
  },
  {
    id: "l6", type: "notice", title: "Holiday Hours — Canada Day",
    date_start: isoIn(3, 0), location_text: "All cities", city: "Surrounding Area",
    description: "Many local shops will be closed Wednesday for Canada Day. Check individual listings for details.",
    cover: "linear-gradient(135deg,#ef4444,#fcd34d)", image: pic("l6"),
    emoji: "🍁", tags: ["Holiday"],
    organizer: "Pembina Hub",
  },
  {
    id: "l7", type: "event", title: "Summer Concert in the Park",
    date_start: isoIn(8, 19), date_end: isoIn(8, 22),
    location_text: "Centennial Park, Winkler", city: "Winkler",
    description: "Free outdoor concert featuring local bands. Bring a blanket and snacks.",
    cover: "linear-gradient(135deg,#a78bfa,#ec4899)", image: pic("l7"),
    emoji: "🎶", tags: ["Music", "Free"], attendees: 720,
    organizer: "Winkler Arts Council",
  },
  {
    id: "l8", type: "campaign", title: "Pembina Valley Food Drive",
    date_start: isoIn(1, 9), date_end: isoIn(14, 18),
    location_text: "Drop-off at participating shops", city: "Surrounding Area",
    description: "Help stock the regional food bank. Every donation matched by Valley Foundation.",
    cover: "linear-gradient(135deg,#f59e0b,#10b981)", image: pic("l8"),
    emoji: "🥫", tags: ["Community"], attendees: 320,
    organizer: "Pembina Valley Food Bank",
  },
];

export const categories: { key: Category; label: string; emoji: string; tint: string }[] = [
  { key: "Food", label: "Food", emoji: "🍽️", tint: "from-orange-400 to-rose-500" },
  { key: "Coffee", label: "Coffee", emoji: "☕", tint: "from-amber-400 to-orange-600" },
  { key: "Shopping", label: "Shopping", emoji: "🛍️", tint: "from-fuchsia-400 to-violet-500" },
  { key: "Beauty", label: "Beauty", emoji: "💅", tint: "from-pink-400 to-rose-500" },
  { key: "Auto", label: "Auto", emoji: "🚗", tint: "from-slate-600 to-blue-700" },
  { key: "Home", label: "Home", emoji: "🏠", tint: "from-teal-400 to-emerald-600" },
  { key: "Health", label: "Health", emoji: "🩺", tint: "from-cyan-400 to-sky-600" },
  { key: "Services", label: "Services", emoji: "🧰", tint: "from-lime-400 to-green-600" },
  { key: "More", label: "More", emoji: "✨", tint: "from-indigo-400 to-violet-600" },
];

export const cities: City[] = ["Winkler", "Morden", "Surrounding Area"];

// Curated collections shown on Explore.
export type Collection = {
  id: string; title: string; subtitle: string; emoji: string;
  image: string; tint: string; businessIds: string[];
};
export const collections: Collection[] = [
  {
    id: "c1", title: "Weekend brunch spots", subtitle: "Slow mornings, warm pastries",
    emoji: "🥐", image: pic("col-brunch"),
    tint: "from-amber-500/90 to-rose-500/90",
    businessIds: ["b1", "b6", "b2"],
  },
  {
    id: "c2", title: "Date night picks", subtitle: "Reservation-worthy in the Valley",
    emoji: "🌙", image: pic("col-date"),
    tint: "from-indigo-600/90 to-fuchsia-500/90",
    businessIds: ["b2", "b10", "b7"],
  },
  {
    id: "c3", title: "Family friendly", subtitle: "Kids, dogs, strollers welcome",
    emoji: "👨‍👩‍👧", image: pic("col-family"),
    tint: "from-emerald-500/90 to-sky-500/90",
    businessIds: ["b6", "b9", "b12"],
  },
  {
    id: "c4", title: "Self-care Sunday", subtitle: "Reset for the week ahead",
    emoji: "🧖", image: pic("col-spa"),
    tint: "from-pink-500/90 to-violet-500/90",
    businessIds: ["b7", "b11", "b5"],
  },
];

// Lightweight testimonials surfaced on the Explore page.
export const testimonials = [
  { id: "t1", quote: "Found three new favorite shops in my first week. Pembina Hub is now my go-to.", name: "Sarah K.", city: "Winkler", emoji: "💙" },
  { id: "t2", quote: "Saved the bistro on Friday and got a free drink that night. Worth it.", name: "Marcus T.", city: "Morden", emoji: "🥂" },
  { id: "t3", quote: "Love seeing every event in one place — finally a real local hub.", name: "Priya R.", city: "Plum Coulee", emoji: "🎉" },
];

export const allOffers = (): (Offer & { business: Business })[] =>
  businesses.flatMap(b => (b.offers ?? []).map(o => ({ ...o, business: b })));

export function similarBusinesses(b: Business, n = 3) {
  return businesses
    .filter(x => x.id !== b.id && (x.category === b.category || x.city === b.city))
    .sort((a, b2) => (a.category === b.category ? -1 : 1) - (b2.category === b.category ? -1 : 1))
    .slice(0, n);
}

export function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-CA", { month: "short", day: "numeric", timeZone: "UTC" });
}
export function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-CA", { hour: "numeric", minute: "2-digit", timeZone: "UTC" });
}
export function fmtDateTime(iso: string) {
  return `${fmtDate(iso)} · ${fmtTime(iso)}`;
}
