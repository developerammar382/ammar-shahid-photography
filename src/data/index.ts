export interface Photo {
  id: string;
  url: string;
  title: string;
  width?: number;
  height?: number;
}

export interface Album {
  id: string;
  title: string;
  category: string;
  coverImage: string;
  photoCount: number;
  date: string;
  description: string;
  location?: string;
  photos: Photo[];
}

export interface ClientAlbum {
  id: string;
  title: string;
  clientName: string;
  date: string;
  coverImage: string;
  description: string;
  password: string;
  expiryDate: string;
  downloadHistory: DownloadEvent[];
  comments: Comment[];
  photos: Photo[];
}

export interface DownloadEvent {
  id: string;
  photoId: string | "all";
  photoTitle: string;
  downloadedAt: string;
  device: string;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
  isPhotographer: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  coverImage: string;
  category: string;
  date: string;
  readTime: number;
  body: string;
  photos: Photo[];
  tags: string[];
}

export interface BookingSlot {
  date: string;
  available: boolean;
  time?: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  category: string;
  price: number;
  priceNote?: string;
  duration: string;
  coverImage: string;
  description: string;
  includes: string[];
  addOns?: string[];
  popular?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  albumId?: string;
  rating: number;
  date: string;
  avatar?: string;
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  service: string;
  date: string;
  message: string;
  status: "pending" | "confirmed" | "declined";
  createdAt: string;
}

export interface PressFeature {
  id: string;
  publication: string;
  logo?: string;
  title: string;
  description: string;
  date: string;
  url?: string;
  category: "Feature" | "Interview" | "Award" | "Exhibition";
  coverImage?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface AnalyticsMonth {
  month: string;
  bookings: number;
  galleryViews: number;
  downloads: number;
  revenue: number;
}

// ─── Photo Data ───────────────────────────────────────────────────

const WEDDING_PHOTOS: Photo[] = [
  { id: "w1", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80", title: "Baraat procession" },
  { id: "w2", url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80", title: "Mehndi night" },
  { id: "w3", url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80", title: "Couple portrait" },
  { id: "w4", url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&q=80", title: "Walima reception" },
  { id: "w5", url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=80", title: "Bridal details" },
  { id: "w6", url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200&q=80", title: "Nikah ceremony" },
  { id: "w7", url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&q=80", title: "Family portrait" },
  { id: "w8", url: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=1200&q=80", title: "Maang tikka close-up" },
  { id: "w9", url: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=1200&q=80", title: "Golden hour portraits" },
  { id: "w10", url: "https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?w=1200&q=80", title: "Celebration" },
];

const PORTRAIT_PHOTOS: Photo[] = [
  { id: "pr1", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&q=80", title: "Studio portrait" },
  { id: "pr2", url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80", title: "Natural light" },
  { id: "pr3", url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&q=80", title: "Candid" },
  { id: "pr4", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&q=80", title: "Urban portrait" },
  { id: "pr5", url: "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=1200&q=80", title: "Window light" },
  { id: "pr6", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80", title: "B&W" },
  { id: "pr7", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&q=80", title: "Profile" },
  { id: "pr8", url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&q=80", title: "Close-up" },
];

const EDITORIAL_PHOTOS: Photo[] = [
  { id: "e1", url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80", title: "High fashion" },
  { id: "e2", url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80", title: "Editorial look" },
  { id: "e3", url: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&q=80", title: "Fashion forward" },
  { id: "e4", url: "https://images.unsplash.com/photo-1475180429745-7b059a9a5b76?w=1200&q=80", title: "Avant-garde" },
  { id: "e5", url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80", title: "Runway" },
  { id: "e6", url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&q=80", title: "Backstage" },
  { id: "e7", url: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=1200&q=80", title: "Beauty" },
  { id: "e8", url: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=1200&q=80", title: "Concept" },
  { id: "e9", url: "https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=1200&q=80", title: "Dark editorial" },
];

const LANDSCAPE_PHOTOS: Photo[] = [
  { id: "l1", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", title: "Karakoram peaks" },
  { id: "l2", url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80", title: "Arabian Sea coast" },
  { id: "l3", url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80", title: "Himalayan forest" },
  { id: "l4", url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=80", title: "Cholistan desert" },
  { id: "l5", url: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=1200&q=80", title: "Baltoro glacier" },
  { id: "l6", url: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1200&q=80", title: "Monsoon clouds" },
  { id: "l7", url: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1200&q=80", title: "Hunza valley fog" },
  { id: "l8", url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1200&q=80", title: "Autumn Neelum" },
];

const COMMERCIAL_PHOTOS: Photo[] = [
  { id: "cm1", url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80", title: "Architecture" },
  { id: "cm2", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80", title: "Office space" },
  { id: "cm3", url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80", title: "Retail store" },
  { id: "cm4", url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80", title: "Brand product" },
  { id: "cm5", url: "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?w=1200&q=80", title: "Food photography" },
  { id: "cm6", url: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=1200&q=80", title: "Corporate" },
  { id: "cm7", url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80", title: "Tech brand" },
  { id: "cm8", url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80", title: "Corporate team" },
];

// ─── Portfolio Albums ─────────────────────────────────────────────

export let PORTFOLIO_ALBUMS: Album[] = [
  {
    id: "a1",
    title: "A Lahore Baraat",
    category: "Weddings",
    coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&q=80",
    photoCount: 10,
    date: "December 2023",
    location: "Lahore, Punjab",
    description: "A grand three-day Pakistani wedding in the heart of Lahore. The Baraat procession wound through the old city at dusk — dhol beats, marigolds, and a groom on horseback. Everything the light touched turned gold.",
    photos: WEDDING_PHOTOS,
  },
  {
    id: "a2",
    title: "Karachi Fashion Week",
    category: "Editorial",
    coverImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=80",
    photoCount: 9,
    date: "March 2024",
    location: "Karachi, Sindh",
    description: "Official editorial coverage for Pakistan Fashion Week. Backstage, runway, and street-style — capturing the energy of Pakistan's most dynamic fashion moment across three days.",
    photos: EDITORIAL_PHOTOS,
  },
  {
    id: "a3",
    title: "New Islamabad",
    category: "Commercial",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80",
    photoCount: 8,
    date: "October 2023",
    location: "Islamabad, ICT",
    description: "Architectural documentation for a leading real estate developer in the twin cities. Glass towers, wide boulevards, and the Margalla Hills as backdrop — the new face of Pakistan's capital.",
    photos: COMMERCIAL_PHOTOS,
  },
  {
    id: "a4",
    title: "Above the Karakoram",
    category: "Landscapes",
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80",
    photoCount: 8,
    date: "August 2023",
    location: "Hunza, Gilgit-Baltistan",
    description: "A personal journey through Hunza, Passu, and the Khunjerab Pass — twenty days at altitude with a single camera. Some of the most difficult and most rewarding frames of my career.",
    photos: LANDSCAPE_PHOTOS,
  },
  {
    id: "a5",
    title: "The Old City",
    category: "Portraits",
    coverImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1400&q=80",
    photoCount: 8,
    date: "February 2024",
    location: "Walled City, Lahore",
    description: "A portrait series made inside the Walled City of Lahore — artisans, chai wallahs, students, and elders. Shot in the narrow lanes of Androon Shehr at first light before the city woke.",
    photos: PORTRAIT_PHOTOS,
  },
  {
    id: "a6",
    title: "A Nathia Gali Nikah",
    category: "Weddings",
    coverImage: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=1400&q=80",
    photoCount: 10,
    date: "June 2024",
    location: "Nathia Gali, KPK",
    description: "A destination Nikah in the pine forests of Nathia Gali. The ceremony took place under open sky at 2,500 metres — cedar trees, fresh air, and light that fell soft and even all afternoon.",
    photos: [...WEDDING_PHOTOS].reverse(),
  },
];

// ─── Client Albums ────────────────────────────────────────────────

export let CLIENT_ALBUMS: ClientAlbum[] = [
  {
    id: "c1",
    title: "Zara & Bilal — Lahore Wedding",
    clientName: "Zara & Bilal",
    date: "December 14, 2023",
    coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&q=80",
    description: "Your full gallery is ready for download. 412 selects from all three days — Mehndi, Baraat, and Walima. Use the proofing view to mark your favourites for printing and album design.",
    password: "zarabilal2023",
    expiryDate: "2025-12-14",
    downloadHistory: [
      { id: "dh1", photoId: "all", photoTitle: "Full Gallery", downloadedAt: "2024-01-10T10:30:00Z", device: "MacBook Pro" },
      { id: "dh2", photoId: "w3", photoTitle: "Couple portrait", downloadedAt: "2024-01-11T14:22:00Z", device: "Samsung Galaxy S24" },
      { id: "dh3", photoId: "w6", photoTitle: "Nikah ceremony", downloadedAt: "2024-01-11T14:25:00Z", device: "Samsung Galaxy S24" },
    ],
    comments: [
      { id: "cm1", author: "Ammar Shahid", text: "Your gallery is ready! Three days, four hundred frames, and some of the most beautiful light I've ever worked in. Let me know if you'd like any specific edits before printing.", createdAt: "2024-01-08T09:00:00Z", isPhotographer: true },
      { id: "cm2", author: "Zara A.", text: "Ammar bhai, we are absolutely speechless! The Baraat photos are incredible — Ami is already crying 😭❤️ Thank you so much!", createdAt: "2024-01-10T11:15:00Z", isPhotographer: false },
      { id: "cm3", author: "Ammar Shahid", text: "Masha'Allah! That Baraat light was something else. Let me know when you're ready to design the album — I'd love to help pick the layout.", createdAt: "2024-01-10T12:00:00Z", isPhotographer: true },
    ],
    photos: WEDDING_PHOTOS,
  },
  {
    id: "c2",
    title: "Pakistan Fashion Week — Editorial",
    clientName: "PFDC Studio",
    date: "March 22, 2024",
    coverImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=80",
    description: "Final selects from the PFW editorial coverage. High-res files ready for print and digital. Please proof and mark your top picks for retouching priority.",
    password: "pfdc2024",
    expiryDate: "2025-12-31",
    downloadHistory: [
      { id: "dh4", photoId: "e1", photoTitle: "High fashion", downloadedAt: "2024-04-02T16:10:00Z", device: "iMac" },
    ],
    comments: [
      { id: "cm4", author: "Ammar Shahid", text: "All 9 finals delivered. The backstage series turned out stronger than I expected — the light in that corridor was perfect. Very excited to see these in print.", createdAt: "2024-03-28T10:00:00Z", isPhotographer: true },
    ],
    photos: EDITORIAL_PHOTOS,
  },
  {
    id: "c3",
    title: "Islamabad Heights — Commercial",
    clientName: "Habib Developers",
    date: "October 18, 2023",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80",
    description: "Full delivery of the Islamabad architectural series. 80 finals from two shoot days. Commercial license included for all marketing and advertising use.",
    password: "habib2023",
    expiryDate: "2026-10-18",
    downloadHistory: [
      { id: "dh5", photoId: "all", photoTitle: "Full Gallery", downloadedAt: "2023-10-25T09:00:00Z", device: "Windows PC" },
    ],
    comments: [
      { id: "cm5", author: "Ammar Shahid", text: "All finals are ready. Let me know if you need any additional crops for billboard or brochure placements.", createdAt: "2023-10-22T10:00:00Z", isPhotographer: true },
      { id: "cm6", author: "Usman H.", text: "Excellent work Ammar sahib! The team is very impressed. Exactly what we needed for the launch campaign.", createdAt: "2023-10-26T14:30:00Z", isPhotographer: false },
    ],
    photos: COMMERCIAL_PHOTOS,
  },
];

// ─── Blog Posts ───────────────────────────────────────────────────

export let BLOG_POSTS: BlogPost[] = [
  {
    id: "b1",
    slug: "shooting-hunza",
    title: "Twenty Days in Hunza",
    subtitle: "What it costs — physically and photographically — to chase light in Gilgit-Baltistan.",
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80",
    category: "Behind the Scenes",
    date: "September 5, 2023",
    readTime: 8,
    tags: ["landscape", "travel", "gilgit-baltistan"],
    photos: LANDSCAPE_PHOTOS.slice(0, 4),
    body: `The Karakoram doesn't care about your schedule. You plan for sunrise on the Attabad Lake and get fog. You wait on the Passu Cones at 4 AM and get rain. I lost three days to weather somewhere between Gilgit and Gulmit. I don't regret a moment.

Shooting in Gilgit-Baltistan is unlike anything else I've done in Pakistan — and I've worked in the deserts of Cholistan, the passes of Khyber, and the streets of Karachi at midnight. The scale here is different. The mountains make you very small. The camera becomes honest.

I drove up from Lahore in two stages, staying one night in Islamabad before taking the Karakoram Highway north. The KKH is one of the great road journeys of the world. Every bend is a new frame.

**On altitude**

At 3,000 metres, my Sony A7R V handled the cold better than I did. Batteries drain faster. Fingers slow down. You learn to work quickly and trust your instincts because you often only have one chance before the light shifts.

**What the valley gives you**

Hunza has a quality of stillness at dawn that I haven't found anywhere else. The Rakaposhi reflection in the river at first light. The apricot orchards going gold in late season. Children running across suspension bridges. Old men on charpoys outside stone houses. Frames everywhere, if you're quiet enough.

**What came back**

Forty-three final images from twenty days. Eight I'm genuinely proud of. That's a good trip.`,
  },
  {
    id: "b2",
    slug: "shooting-pakistani-weddings",
    title: "Why Pakistani Weddings Are a Photographer's Dream",
    subtitle: "Three ceremonies, four days, unlimited chaos — and some of the most beautiful light in the world.",
    coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&q=80",
    category: "Craft",
    date: "January 15, 2024",
    readTime: 6,
    tags: ["weddings", "pakistan", "craft"],
    photos: WEDDING_PHOTOS.slice(0, 4),
    body: `A Pakistani wedding is not one event. It is three, sometimes four — the Mehndi, the Baraat, the Nikah, the Walima — each with its own mood, light, and emotional register. As a photographer, this is a gift. It also demands everything you have.

The Mehndi is my favourite to shoot. The colours are extraordinary — deep yellows, oranges, and reds against embroidered dupattas. The women dance. The uncles try to dance. The dholak goes all night. Light is usually difficult — indoor venues, mixed colour temperatures — but that challenge produces the most interesting frames.

**The Baraat**

Nothing prepares you for a Baraat. The groom arrives — usually on a horse, always late — surrounded by family, dhol players, and a crowd that treats the procession as a performance. There is real emotion here, underneath the noise. I'm always looking for the father of the groom, the moment he sees his son, the expression that happens before the face rearranges itself into a smile.

**On being trusted**

Pakistani clients trust their wedding photographer with something irreplaceable. That responsibility sits with me on every shoot. I don't take it lightly. I stay until the last guest leaves, the last frame is made.

**What I've learned**

After sixty Pakistani weddings, I still find something new in every one. The ceremonies change — venues get grander, outfits get more elaborate — but the emotions don't. Joy is joy. Grief at departure is grief. The camera just has to be in the right place.`,
  },
  {
    id: "b3",
    slug: "karachi-fashion-week-bts",
    title: "Inside Pakistan Fashion Week",
    subtitle: "How to photograph a runway show when everything is moving, loud, and beautifully chaotic.",
    coverImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=80",
    category: "Behind the Scenes",
    date: "April 10, 2024",
    readTime: 5,
    tags: ["editorial", "karachi", "fashion", "bts"],
    photos: EDITORIAL_PHOTOS.slice(0, 4),
    body: `Pakistan Fashion Week is three days of controlled chaos, extraordinary clothes, and the most difficult light you'll ever try to expose for. I've covered it twice now. I'm still learning.

The brief for this season was backstage-first — the PFDC wanted images that showed the work behind the show, not just the runway moment. That meant arriving four hours early, earning trust with designers who are already under pressure, and learning to disappear into the background while being six feet tall with a camera.

**The light problem**

Every backstage is different and all of them are terrible for photography — mixed colour temperatures, practicals aimed at mirrors, random flashes of phone screens. I shoot manually and adjust every ten minutes. Auto white balance is a lie.

**The runway**

You have one pass per look. The model walks, the light is what it is, and you either get the shot or you don't. I position myself two-thirds of the way down the runway on the left side, which gives me the best angle on the lighting rig above. I've tested this. It works.

**What the client got**

Nine finals from three days — backstage, runway, and street style. Three of them were picked up by Aurora Magazine. The model in look four on day two has a quality of stillness that made the editorial work. Some things you cannot plan for.`,
  },
  {
    id: "b4",
    slug: "delivering-client-galleries-pakistan",
    title: "How I Deliver Client Galleries in Pakistan",
    subtitle: "The system behind getting 400+ wedding photos to families across the country.",
    coverImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1400&q=80",
    category: "Business",
    date: "February 28, 2024",
    readTime: 4,
    tags: ["workflow", "business", "clients"],
    photos: PORTRAIT_PHOTOS.slice(0, 3),
    body: `Wedding photography in Pakistan has one challenge that doesn't exist the same way anywhere else in the world: the family. Not just the bride and groom — the parents, the siblings, the aunts and uncles who were there, who want copies, who have opinions. Delivering a gallery that works for everyone requires a system.

After six years of refinement, here is mine.

**The cull**

Pakistani weddings produce 2,000–3,000 frames across three events. The client gets 350–500 finals. I cull in Lightroom within 48 hours of the last event. I'm looking for: technically correct, emotionally true, non-redundant. One baraat procession photo is not enough. Twenty is too many. Eight is right.

**The delivery**

Every client gets a private, password-protected gallery. High-res files downloadable individually or as a complete archive. Galleries stay live for twelve months. I send a personal WhatsApp message when the gallery goes live — email alone doesn't cut it in Pakistan.

**The album conversation**

Most Pakistani families want a printed album. I recommend this strongly. I help choose the selects — usually 60–80 images — and I recommend three album makers in Lahore whose quality I trust. This part of the work matters as much as the shoot itself.

**The extras**

Parents often want a separate set of their favourites. I include a "Family Portraits" folder in every wedding delivery. This costs me twenty minutes. It means everything to them.`,
  },
  {
    id: "b5",
    slug: "lahore-monsoon-photography",
    title: "Shooting Lahore in the Monsoon",
    subtitle: "July in Lahore: 38 degrees, 90% humidity, and the most dramatic skies in South Asia.",
    coverImage: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=1400&q=80",
    category: "Travel",
    date: "August 1, 2024",
    readTime: 5,
    tags: ["travel", "lahore", "landscape"],
    photos: [...WEDDING_PHOTOS].reverse().slice(0, 4),
    body: `I have lived in Lahore my whole life and I still don't know how to prepare for the monsoon. July arrives and the city becomes someone else's city. The air smells of wet earth and jasmine. The old streets flood in twenty minutes. The Badshahi Mosque glows against clouds that look borrowed from a painting.

I go out in it every year with a camera and a sealed bag.

**Why monsoon?**

The light. The drama. The way everything becomes more itself — the old city more labyrinthine, the Ravi more alive, the people more present because they're moving through something together. Monsoon photography in Lahore is urban landscape photography at its most honest.

**On equipment**

My Sony A7R V is weather-sealed. My lenses are not all equally so. I carry a microfibre cloth in every pocket and I've lost one lens to moisture in six years. The risk is worth it.

**The frames I remember**

A chai wallah at Lakshmi Chowk, rain sheeting behind him, serving tea like nothing is happening. Three school boys running barefoot through a river that used to be Urdu Bazaar. The call to prayer echoing off wet walls at Masjid Wazir Khan at dusk.

Pakistan is a photographer's country. Lahore in July is its highest argument.`,
  },
];

// ─── Services ─────────────────────────────────────────────────────

export let SERVICES: ServicePackage[] = [
  {
    id: "s1",
    name: "Mehndi Package",
    category: "Weddings",
    price: 350,
    duration: "4–5 hours",
    coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    description: "Full coverage of the Mehndi function — dancing, dholak, family moments, and the bride's preparation. Indoor and outdoor. One photographer.",
    includes: ["4–5 hour coverage", "One photographer", "200–250 edited high-res images", "Private online gallery (12 months)", "Digital delivery within 2 weeks"],
    addOns: ["Second photographer +PKR 25,000", "Drone shots +PKR 30,000", "Rush delivery (5 days) +PKR 15,000"],
  },
  {
    id: "s2",
    name: "Full Wedding (3 Events)",
    category: "Weddings",
    price: 1200,
    priceNote: "Starting at",
    duration: "3 days",
    coverImage: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80",
    description: "Complete three-day coverage — Mehndi, Baraat, and Walima. Two photographers across all events. Pakistan's most complete wedding photography package.",
    includes: ["3-day coverage (Mehndi, Baraat, Walima)", "Two photographers", "500–700 edited high-res images", "Pre-wedding portrait session", "Private online gallery (12 months)", "Delivery in 4–5 weeks"],
    addOns: ["Cinematic highlight film +$400", "Drone/aerial footage +$200", "Album design & print (60 spreads) +$300", "Same-day highlight edit +$150"],
    popular: true,
  },
  {
    id: "s3",
    name: "Portrait Session",
    category: "Portraits",
    price: 120,
    duration: "1.5 hours",
    coverImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
    description: "Personal, professional, or family portraits. Lahore studio or outdoor location of your choice. Perfect for LinkedIn, brand work, or personal milestones.",
    includes: ["90-minute session", "One location (Lahore)", "40–60 edited images", "Private online gallery (6 months)", "Delivery in 1 week"],
    addOns: ["Additional location +PKR 10,000", "Hair & makeup referral", "Extra family member +PKR 5,000"],
  },
  {
    id: "s4",
    name: "Fashion & Editorial",
    category: "Editorial",
    price: 500,
    priceNote: "Half-day rate",
    duration: "Full or half day",
    coverImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
    description: "Campaign, lookbook, and editorial work for Pakistani fashion brands, designers, and agencies. Day rate or full project quotes available.",
    includes: ["Half-day (4 hrs) or full-day (8 hrs) coverage", "Up to 2 locations", "30–50 edited finals (half-day)", "Commercial license included", "Delivery in 2 weeks", "Pre-production consultation"],
    addOns: ["Full-day rate +$450", "Drone content +$200", "BTS video +$300"],
  },
  {
    id: "s5",
    name: "Commercial & Brand",
    category: "Commercial",
    price: 800,
    priceNote: "Day rate",
    duration: "Full day",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    description: "Architecture, product, brand, and corporate photography for Pakistani businesses. Licensed for advertising and marketing use. Available across Lahore, Karachi, and Islamabad.",
    includes: ["8-hour shoot day", "Up to 3 locations", "50–80 edited finals", "Full commercial license", "Delivery in 2 weeks", "Location scouting included"],
    addOns: ["Multi-day discount available", "Drone/aerial add-on +$200", "Video BTS +$300"],
  },
  {
    id: "s6",
    name: "Fine Art Print",
    category: "Landscapes",
    price: 80,
    priceNote: "Per image",
    duration: "On-demand",
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    description: "Museum-quality archival prints from the Pakistan landscape portfolio — Hunza, Cholistan, Neelum Valley, and Lahore. Signed and numbered editions of 20.",
    includes: ["Archival pigment print", "Premium photo paper (310gsm)", "Signed & numbered (edition of 20)", "Certificate of authenticity", "Delivered within Pakistan in 1–2 weeks"],
  },
];

// ─── Testimonials ─────────────────────────────────────────────────

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Zara & Bilal A.",
    role: "Wedding clients, December 2023",
    text: "Ammar bhai ne jo kaam kiya hai woh sirf photography nahin — ye yadein hain. Every frame from our Baraat felt like something out of a film. Our entire family is in love with the gallery.",
    albumId: "a1",
    rating: 5,
    date: "January 2024",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  },
  {
    id: "t2",
    name: "PFDC Studio",
    role: "Editorial client, March 2024",
    text: "Second season working with Ammar and the standard keeps rising. He understood the brief without us explaining it twice, and the backstage series he delivered was exactly the story we wanted to tell.",
    rating: 5,
    date: "April 2024",
  },
  {
    id: "t3",
    name: "Sana & Hamza R.",
    role: "Wedding clients, June 2024",
    text: "We had our Nikah in Nathia Gali and Ammar drove up from Lahore without a single complaint. The forest photos are hanging in our lounge now. Guests ask about them every time they visit.",
    albumId: "a6",
    rating: 5,
    date: "July 2024",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80",
  },
  {
    id: "t4",
    name: "Tariq Mahmood",
    role: "Portrait client, February 2024",
    text: "I needed professional portraits for my architecture firm's rebrand. Ammar had the whole session planned out before I arrived. The images looked nothing like the LinkedIn headshots I was dreading — they looked like me.",
    rating: 5,
    date: "March 2024",
  },
  {
    id: "t5",
    name: "Habib Developers",
    role: "Commercial client, October 2023",
    text: "Ammar delivered our Islamabad project on time, on budget, and the quality exceeded what we'd briefed. The images launched our campaign and we've already booked him for the next development.",
    albumId: "a3",
    rating: 5,
    date: "November 2023",
  },
];

// ─── Press Features ───────────────────────────────────────────────

export const PRESS_FEATURES: PressFeature[] = [
  {
    id: "p1",
    publication: "Aurora Magazine",
    title: "Pakistan's New Wave: Photographers Redefining the Visual Language of the Country",
    description: "A feature on six Pakistani photographers whose work is expanding what documentary and commercial photography can look like. Ammar's Hunza landscape series anchored the cover story.",
    date: "October 2023",
    category: "Feature",
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  },
  {
    id: "p2",
    publication: "Pakistan Wedding Awards",
    title: "Wedding Photographer of the Year — 2024",
    description: "Awarded Wedding Photographer of the Year at the Pakistan Wedding Awards 2024 for documentary wedding coverage and 'an eye that finds stillness inside celebration.'",
    date: "February 2024",
    category: "Award",
    coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
  },
  {
    id: "p3",
    publication: "Dawn Images",
    title: "In Frame: Ammar Shahid on Shooting Pakistan From the Inside",
    description: "A long-form interview on growing up in Lahore, the responsibility of documenting Pakistani culture, and why the most important photography is still happening in the streets.",
    date: "May 2024",
    category: "Interview",
    coverImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
  },
  {
    id: "p4",
    publication: "Asia Photography Awards",
    title: "Gold — Documentary Series, South Asia",
    description: "The Walled City portrait series received gold at the Asia Photography Awards 2024 in the documentary category, recognised for 'intimacy, restraint, and cultural depth.'",
    date: "March 2024",
    category: "Award",
    coverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
  },
  {
    id: "p5",
    publication: "Instep — The News",
    title: "Behind the Lens at Pakistan Fashion Week",
    description: "A behind-the-scenes feature on the photographers who document Pakistan's fashion industry. Ammar's PFW backstage series was highlighted as the definitive coverage of the season.",
    date: "April 2024",
    category: "Feature",
    coverImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
  },
  {
    id: "p6",
    publication: "National Gallery of Pakistan",
    title: "Group Exhibition: 'Terrain' — Contemporary Pakistani Landscape Photography",
    description: "Six prints from the Karakoram series were exhibited at the National Gallery of Pakistan as part of a group show exploring the country's northern landscapes through contemporary lenses.",
    date: "November 2023",
    category: "Exhibition",
    coverImage: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
  },
];

// ─── FAQ ──────────────────────────────────────────────────────────

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "f1",
    question: "How far in advance should I book for a wedding?",
    answer: "For weddings in peak season (November–February), I recommend reaching out 8–12 months in advance. Lahore's wedding calendar fills up quickly in the winter months. Portrait and commercial sessions can usually be booked with 2–3 weeks notice. I take on a limited number of weddings per season to give each family my full attention.",
    category: "Booking",
  },
  {
    id: "f2",
    question: "Do you travel outside Lahore?",
    answer: "Yes — I regularly travel to Karachi, Islamabad, and destinations across Pakistan. I've covered weddings in Nathia Gali, Murree, Hunza, and Swat, and editorial work in Karachi and Islamabad. Travel within Pakistan is usually quoted separately. International destination work is also available.",
    category: "Booking",
  },
  {
    id: "f3",
    question: "How long until I receive my photos?",
    answer: "Portrait sessions: 5–7 days. Single-event weddings: 2–3 weeks. Full three-day weddings: 4–5 weeks. Commercial and editorial projects: 2 weeks. Rush delivery is available at an additional charge. I'd rather deliver work I'm proud of than rush something that matters.",
    category: "Delivery",
  },
  {
    id: "f4",
    question: "Do you cover all three wedding events — Mehndi, Baraat, and Walima?",
    answer: "Yes. My Full Wedding package covers all three events with two photographers across all days. You can also book individual events — Mehndi, Baraat, or Walima — as standalone packages. Most families prefer the full three-day coverage so nothing is missed.",
    category: "Process",
  },
  {
    id: "f5",
    question: "How many photos will I receive?",
    answer: "Mehndi (standalone): 200–250 images. Full three-day wedding: 500–700 images. Portrait sessions: 40–60 images. Commercial: 50–80 images per shoot day. I cull carefully — every photo you receive should be worth keeping. I don't deliver every frame I shoot.",
    category: "Delivery",
  },
  {
    id: "f6",
    question: "What is your editing style?",
    answer: "Natural, warm, and timeless. My editing is faithful to how the scene looked — I don't use heavy filters or effects that will feel dated in five years. Skin tones are accurate across all complexions. I work in both colour and black-and-white, and I respect the richness of Pakistani bridal colour — reds, golds, and embroidery should look exactly as they did.",
    category: "Process",
  },
  {
    id: "f7",
    question: "Do you offer printed albums?",
    answer: "Yes, and I strongly recommend them. I work with trusted album printers in Lahore and can guide you through the design and selection process. A printed album from your wedding is something your children will hold one day. Digital galleries are convenient — albums are permanent.",
    category: "Process",
  },
  {
    id: "f8",
    question: "What do you need from me to book?",
    answer: "Send an inquiry with your date, event type, and a brief about what you're planning. Once we've spoken and confirmed everything, a 30% advance secures your date. No date is held without an advance payment. The remainder is due one week before the event.",
    category: "Booking",
  },
  {
    id: "f9",
    question: "How long do my client galleries stay online?",
    answer: "Wedding galleries remain accessible for 12 months from delivery. Portrait and commercial galleries for 6 months. I strongly recommend downloading your full gallery as soon as you receive it. Extensions are available if needed.",
    category: "Delivery",
  },
  {
    id: "f10",
    question: "Do you bring a second photographer?",
    answer: "Yes. My Full Wedding package includes two photographers across all three days. A second photographer can be added to any other package. My second shooters are working photographers — not assistants — who deliver independently and extend the coverage significantly.",
    category: "Process",
  },
];

// ─── Analytics (dummy data) ───────────────────────────────────────

export const ANALYTICS_DATA: AnalyticsMonth[] = [
  { month: "Jan", bookings: 8, galleryViews: 320, downloads: 88, revenue: 9600 },
  { month: "Feb", bookings: 10, galleryViews: 410, downloads: 112, revenue: 14800 },
  { month: "Mar", bookings: 6, galleryViews: 280, downloads: 74, revenue: 8200 },
  { month: "Apr", bookings: 4, galleryViews: 198, downloads: 52, revenue: 5400 },
  { month: "May", bookings: 3, galleryViews: 162, downloads: 40, revenue: 4100 },
  { month: "Jun", bookings: 3, galleryViews: 145, downloads: 36, revenue: 3800 },
  { month: "Jul", bookings: 2, galleryViews: 128, downloads: 31, revenue: 3200 },
  { month: "Aug", bookings: 3, galleryViews: 155, downloads: 38, revenue: 4400 },
  { month: "Sep", bookings: 5, galleryViews: 230, downloads: 58, revenue: 6800 },
  { month: "Oct", bookings: 7, galleryViews: 312, downloads: 80, revenue: 10200 },
  { month: "Nov", bookings: 11, galleryViews: 480, downloads: 136, revenue: 16400 },
  { month: "Dec", bookings: 14, galleryViews: 620, downloads: 178, revenue: 21600 },
];

// ─── Site Settings ────────────────────────────────────────────────

export interface SiteSettings {
  name: string;
  tagline: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  availability: string;
  instagram: string;
  behance: string;
  linkedin: string;
  metaTitle: string;
  metaDescription: string;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  name: "Ammar Shahid",
  tagline: "Photography & Visual Storytelling",
  bio: "Lahore-based photographer with over a decade of work spanning weddings, editorial, portrait, and commercial photography across Pakistan and beyond.",
  email: "hello@ammarshahid.pk",
  phone: "+92 300 123 4567",
  location: "DHA Phase 5, Lahore",
  availability: "Currently booking Nov 2025 – Feb 2026",
  instagram: "@ammarshahidphoto",
  behance: "ammarshahid",
  linkedin: "ammarshahid",
  metaTitle: "Ammar Shahid Photography — Lahore, Pakistan",
  metaDescription: "Award-winning wedding, editorial, and portrait photographer based in Lahore. Covering weddings and commercial projects across Pakistan.",
};

// ─── Bookings (dummy) ─────────────────────────────────────────────

export let BOOKINGS: Booking[] = [
  { id: "bk1", name: "Ayesha & Faisal Khan", email: "ayesha@example.com", service: "Full Wedding (3 Events)", date: "December 6, 2025", message: "We're planning a three-day wedding in Lahore, around 400 guests. Mehndi at home, Baraat and Walima at a venue in Gulberg. Would love to discuss.", status: "confirmed", createdAt: "2025-05-10T09:00:00Z" },
  { id: "bk2", name: "Mohsin Raza", email: "mohsin@example.com", service: "Portrait Session", date: "June 20, 2025", message: "Need corporate headshots and a few lifestyle portraits for a new business website launch.", status: "pending", createdAt: "2025-05-18T14:30:00Z" },
  { id: "bk3", name: "Nida Pasha — Atelier", email: "nida@nidapasha.com", service: "Fashion & Editorial", date: "July 5, 2025", message: "Summer Pret campaign. 4 looks, Lahore or Islamabad, rooftop or heritage location. Full day shoot.", status: "pending", createdAt: "2025-05-20T11:00:00Z" },
  { id: "bk4", name: "Hina & Usman Siddiqui", email: "hina@example.com", service: "Mehndi Package", date: "November 28, 2025", message: "Just the Mehndi function — indoor venue in Defence. About 200 guests, evening event, lots of dancing.", status: "confirmed", createdAt: "2025-04-28T16:00:00Z" },
  { id: "bk5", name: "Crescent Builders", email: "info@crescentbuilders.pk", service: "Commercial & Brand", date: "June 10, 2025", message: "New housing scheme in Bahria Town Lahore — need architectural photography for our launch brochure and website.", status: "declined", createdAt: "2025-05-05T10:00:00Z" },
  { id: "bk6", name: "Mariam & Saad Butt", email: "mariam@example.com", service: "Full Wedding (3 Events)", date: "January 17, 2026", message: "Lahore wedding, traditional ceremony with a destination element — planning the Walima in Nathia Gali. Would love to discuss logistics.", status: "pending", createdAt: "2025-05-22T08:00:00Z" },
];

// ─── Booking Calendar ─────────────────────────────────────────────

const today = new Date();
export const BOOKING_SLOTS: BookingSlot[] = Array.from({ length: 60 }, (_, i) => {
  const d = new Date(today);
  d.setDate(today.getDate() + i + 1);
  const dayOfWeek = d.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6;
  const isBooked = [3, 7, 12, 15, 21, 28, 35, 42].includes(i);
  return {
    date: d.toISOString().split("T")[0],
    available: !isBooked && (isWeekend || Math.random() > 0.6),
    time: isWeekend ? "Full day" : "Half day",
  };
}).filter(s => s.available);

// ─── Selectors ────────────────────────────────────────────────────

export const getAlbums = (): Album[] => PORTFOLIO_ALBUMS;
export const getAlbumById = (id: string): Album | undefined => PORTFOLIO_ALBUMS.find(a => a.id === id);
export const getAlbumsByCategory = (category: string): Album[] =>
  category === "All" ? PORTFOLIO_ALBUMS : PORTFOLIO_ALBUMS.filter(a => a.category === category);
export const getClientAlbums = (password: string): ClientAlbum | null =>
  CLIENT_ALBUMS.find(a => a.password === password) || null;
export const getClientAlbumById = (id: string): ClientAlbum | undefined =>
  CLIENT_ALBUMS.find(a => a.id === id);
export const CATEGORIES = ["All", "Weddings", "Portraits", "Editorial", "Landscapes", "Commercial"];

export const getBlogPosts = (): BlogPost[] => BLOG_POSTS;
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => BLOG_POSTS.find(p => p.slug === slug);
export const getServices = (): ServicePackage[] => SERVICES;
export const getServicesByCategory = (cat: string): ServicePackage[] =>
  cat === "All" ? SERVICES : SERVICES.filter(s => s.category === cat);
export const getTestimonials = (): Testimonial[] => TESTIMONIALS;
export const getBookings = (): Booking[] => BOOKINGS;
export const getAvailableSlots = (): BookingSlot[] => BOOKING_SLOTS;
export const getPressFeatures = (): PressFeature[] => PRESS_FEATURES;
export const getFAQItems = (): FAQItem[] => FAQ_ITEMS;
export const getAnalyticsData = (): AnalyticsMonth[] => ANALYTICS_DATA;
