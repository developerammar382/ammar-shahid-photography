<div align="center">

# ✦ Ammar Shahid Photography

**A full-featured photography portfolio & client delivery platform — built for a Lahore-based Pakistani photographer.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?style=flat-square&logo=greensock&logoColor=white)](https://gsap.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-white?style=flat-square)](LICENSE)

<br />

*Pakistan through the lens — a complete photography business platform built entirely frontend-only.*

<br />

---

</div>

## Overview

A premium photography portfolio and client delivery platform designed around the Pakistani wedding market and photography industry. Covers the full photographer workflow — showcasing work publicly, letting clients download galleries, proof selects, leave comments, and track download history — with a full admin dashboard for managing the entire business.

Built for **Ammar Shahid**, a Lahore-based photographer with over a decade of work spanning weddings, editorial, portrait, and landscape photography across Pakistan and beyond.

<br />

## Features

### Public Site

| Page | What it does |
|---|---|
| **Home** | Cinematic full-screen hero ("Pakistan through the lens"), animated stat counters, featured work grid, services preview, testimonials, journal preview, press strip |
| **Portfolio** | Filterable album grid by category (Weddings, Editorial, Commercial, Portraits, Landscapes) |
| **Album Detail** | Full photo gallery with lightbox, keyboard navigation, scroll-triggered reveals |
| **Services** | Pakistani wedding packages (Mehndi, Full 3-Event, Baraat) + portrait, editorial, commercial |
| **Booking** | 4-step wizard — pick service → calendar → your details → review & confirm |
| **Journal** | Featured post layout + grid, full article pages — Pakistani photography stories |
| **Press & Awards** | Publications: Aurora Magazine, Dawn Images, Instep, National Gallery of Pakistan |
| **FAQ** | Accordion with category filter — tailored to Pakistan's wedding season (Nov–Feb) |
| **About** | Biography, Lahore roots, career timeline, awards, gear list |
| **Contact** | "Baat karte hain." — inquiry form with WhatsApp/phone, success state |
| **404** | Branded not-found page with navigation back |

### Client Portal

| Feature | Details |
|---|---|
| **Password login** | Each client album has a unique password |
| **Gallery view** | Full photo browser with lightbox and high-res download |
| **Proofing** | Mark favorites (heart) and priority retouching picks (star), submit selections |
| **Comments** | Threaded comment feed between photographer and client (with Urdu-friendly tone) |
| **Download history** | Log of every download with device info and timestamp |
| **Expiry countdown** | Visual timer with amber warning when under 30 days |

### Admin Dashboard

| Section | Capabilities |
|---|---|
| **Overview** | Stats at a glance — total bookings, pending count, recent activity |
| **Bookings** | Confirm / decline inquiries, expand to read client messages, filter by status |
| **Client Galleries** | View all galleries, copy passwords, check expiry, create new galleries, delete |
| **Portfolio** | Create, edit, delete portfolio albums with image preview |
| **Journal** | Full blog CMS — create, edit, delete posts |
| **Services** | Edit pricing, descriptions, includes, add-ons, mark popular |
| **Analytics** | Recharts dashboard — revenue area chart, bookings bar chart, engagement line chart, category pie chart, 12-month breakdown table (peaking Nov–Feb for wedding season) |
| **Settings** | Profile, Contact, Social, and SEO settings with live search preview |

<br />

## Tech Stack

```
Frontend        React 19 + TypeScript 5.9
Routing         React Router v7
Animation       GSAP 3 + ScrollTrigger
Styling         Tailwind CSS v4
Charts          Recharts 2
Icons           Lucide React
Fonts           Playfair Display (serif) · Inter (sans)
Build           Vite 6
Package Manager pnpm
State           React Context (AdminContext)
Images          Unsplash (CDN — no API key needed)
```

<br />

## Project Structure

```
ammar-shahid-photography/
├── public/                          # Static assets, favicon, robots.txt
├── src/
│   ├── components/                  # Header, Footer, Lightbox, UI primitives
│   ├── context/                     # AdminContext (auth + CRUD state)
│   ├── data/
│   │   └── index.ts                 # All content — albums, posts, services,
│   │                                #   bookings, testimonials, press, FAQ
│   ├── hooks/                       # Shared React hooks
│   ├── lib/                         # Shared utilities
│   └── pages/
│       ├── Home.tsx
│       ├── Portfolio.tsx · AlbumDetail.tsx
│       ├── Services.tsx · Booking.tsx
│       ├── Blog.tsx · BlogPost.tsx
│       ├── Press.tsx · FAQ.tsx
│       ├── About.tsx · Contact.tsx
│       ├── ClientLogin.tsx · ClientDelivery.tsx · ClientProofing.tsx
│       ├── not-found.tsx
│       └── admin/
│           ├── AdminLogin.tsx
│           ├── AdminLayout.tsx
│           ├── AdminOverview.tsx · AdminBookings.tsx
│           ├── AdminClients.tsx · AdminPortfolio.tsx
│           ├── AdminBlog.tsx · AdminServices.tsx
│           ├── AdminAnalytics.tsx · AdminSettings.tsx
├── components.json                  # UI component config
├── index.html                       # Vite HTML entry
├── package.json                     # Standalone frontend package
├── pnpm-lock.yaml                   # Locked frontend dependencies
├── tsconfig.json                    # TypeScript config
└── vite.config.ts                   # Vite config
```

<br />

## Getting Started

### Prerequisites

- [Node.js 18+](https://nodejs.org)
- [pnpm](https://pnpm.io) — `npm install -g pnpm`

### Installation

```bash
# Clone the repository
git clone https://github.com/ammarshahid/ammar-shahid-photography.git
cd ammar-shahid-photography

# Install frontend dependencies
pnpm install

# Start the dev server
pnpm run dev
```

The app starts locally at `http://localhost:5173/`.

<br />

## Demo Credentials

### Admin Dashboard → `/admin`

| Field | Value |
|---|---|
| Username | `admin` |
| Password | `admin123` |

### Client Galleries → `/client`

| Client | Password |
|---|---|
| Zara & Bilal (Lahore Wedding) | `zarabilal2023` |
| PFDC Studio (Fashion Editorial) | `pfdc2024` |
| Habib Developers (Commercial) | `habib2023` |

<br />

## Pages at a Glance

```
/                    Home — "Pakistan through the lens."
/portfolio           Portfolio gallery
/portfolio/:id       Album detail + lightbox
/services            Packages (Mehndi, Baraat, Walima, Portrait, Commercial)
/booking             4-step booking wizard
/journal             Journal / blog index
/journal/:slug       Full journal post
/press               Press & awards (Aurora, Dawn Images, etc.)
/faq                 FAQ — tailored to Pakistani wedding market
/about               About Ammar Shahid — Lahore, career, gear
/contact             "Baat karte hain." — contact & inquiry
/client              Client gallery login
/client/:id          Client delivery gallery + download
/client/:id/proof    Photo proofing (heart / star)
/admin               Admin login → dashboard
/admin/bookings      Booking management
/admin/clients       Client gallery management
/admin/portfolio     Portfolio CRUD
/admin/blog          Blog / journal CMS
/admin/services      Service & pricing editor
/admin/analytics     Recharts analytics (wedding season peak: Nov–Feb)
/admin/settings      Profile, SEO, social settings
```

<br />

## Customization

All content lives in one file: `src/data/index.ts`

To make it fully yours:

1. **Your name & city** — update `DEFAULT_SETTINGS` at the bottom of `data/index.ts`
2. **Your photos** — replace Unsplash URLs in the `WEDDING_PHOTOS`, `PORTRAIT_PHOTOS`, etc. arrays
3. **Your services & pricing** — edit the `SERVICES` array (currently priced in USD)
4. **Your blog posts** — edit `BLOG_POSTS` with your own stories
5. **Your testimonials** — edit `TESTIMONIALS` with real client feedback
6. **Colour palette** — edit CSS custom properties in `src/index.css`
7. **Social links** — update the footer and `DEFAULT_SETTINGS.instagram` etc.

<br />

## Content Highlights

The site ships with fully written Pakistani-context content:

- **Portfolio albums**: Lahore Baraat, Karachi Fashion Week, Islamabad architecture, Hunza valleys, Walled City portraits, Nathia Gali Nikah
- **Blog posts**: *Twenty Days in Hunza*, *Why Pakistani Weddings Are a Photographer's Dream*, *Inside Pakistan Fashion Week*, *Shooting Lahore in the Monsoon*
- **Press features**: Aurora Magazine, Dawn Images, Instep (The News), National Gallery of Pakistan, Asia Photography Awards, Pakistan Wedding Awards
- **Bookings**: Authentic Pakistani client names, venues (Gulberg, DHA, Defence, Bahria Town, Nathia Gali)
- **Client comments**: Natural Urdu-English mix ("Ammar bhai, we are absolutely speechless!", "Masha'Allah!")
- **Analytics**: Seasonal revenue curve peaking November–February (Pakistan wedding season)

<br />

## Roadmap

- [ ] Optional PostgreSQL + Express backend
- [ ] Real email / WhatsApp notifications on booking submission
- [ ] Cloudinary image upload in the admin dashboard
- [ ] Online payment integration (bank transfer / EasyPaisa / JazzCash)
- [ ] Printed album order flow with local printer integration
- [ ] GSAP page transitions between routes
- [ ] PWA support for offline client gallery access
- [ ] Admin booking calendar view (month/week)
- [ ] Urdu language toggle

<br />

## Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repository
2. Create a feature branch — `git checkout -b feature/your-feature`
3. Commit your changes — `git commit -m 'Add your feature'`
4. Push to the branch — `git push origin feature/your-feature`
5. Open a Pull Request

<br />

## License

This project is licensed under the [MIT License](LICENSE).

<br />

---

<div align="center">

Built in Lahore · Photographed across Pakistan · Runs anywhere

</div>
