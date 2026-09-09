# Technical Product Resource Document
## Website Build — Out n Beyond Cafe & Bistro

**Document type:** Technical PRD / Build Reference
**Purpose:** Define scope, architecture, features, data, and integrations required to build the website.

---

## 1. Project Overview

| Field | Details |
|---|---|
| **Product** | Marketing + transactional website for Out n Beyond Cafe & Bistro |
| **Business type** | Single-location cafe/bistro (Kolkata) |
| **Primary goals** | Drive table reservations & online orders, showcase menu/ambiance, build local SEO presence |
| **Target users** | Prospective diners researching the cafe, existing customers checking hours/menu, first-time visitors needing directions |
| **Platform scope** | Responsive web app — desktop + mobile web (no native app in scope) |

---

## 2. Recommended Tech Stack

| Layer | Recommendation | Notes |
|---|---|---|
| **Frontend framework** | Next.js (React) or a static site generator (Astro/Hugo) | Next.js recommended if reservations/ordering need dynamic routes or an API layer; static generator sufficient if all bookings are handled via embedded third-party widgets |
| **Styling** | Tailwind CSS | Fast to build a distinctive, "cozy/aesthetic" visual identity matching brand tone |
| **CMS** | Headless CMS (Sanity, Contentful, or Strapi) | Needed so cafe staff can update menu items, prices, and photos without developer involvement |
| **Hosting** | Vercel / Netlify | Simple CI/CD, good for Next.js/Astro, free-tier friendly for a single-location business site |
| **Media storage** | Cloudinary or hosting provider's built-in image CDN | For food photography and the 3 existing short-form video clips |
| **Forms/Reservations backend** | Third-party widget (EazyDiner / Dineout / Zomato reservation embed) OR custom form → email/SMS via a service like SendGrid/Twilio | Decide build-vs-integrate (see Section 6) |
| **Analytics** | Google Analytics 4 + Google Search Console | For local SEO tracking |
| **Maps** | Google Maps Embed API | Reuse existing verified address |

---

## 3. Site Architecture

```
/                     → Home
/menu                 → Menu (category-filterable)
/about                → About / Our Story
/gallery              → Photo & video gallery
/reviews              → Reviews / testimonials
/reservations         → Reservation form or embedded widget
/order                → Online ordering (embed or link-out)
/contact              → Location, hours, contact form
```

**Global components (present on every page):**
- Header/nav with logo, page links, sticky "Reserve a Table" CTA
- Footer: address, phone, hours summary, social links, map thumbnail
- Cookie/consent banner (if analytics/ads are used)

---

## 4. Functional Requirements by Page

### 4.1 Home
- FR-1: Hero section with rotating/looping media (image or muted autoplay video)
- FR-2: Primary CTAs: "Reserve a Table," "Order Online" — both above the fold
- FR-3: Quick-facts bar pulling from a central `businessInfo` data object (rating, price range, hours status)
- FR-4: Featured-dishes carousel pulling from the Menu data source (tag: `featured: true`)
- FR-5: Testimonial teaser (2–3 reviews, pulled from `reviews` collection, filtered by `featured: true`)

### 4.2 Menu
- FR-6: Menu items rendered from CMS collection, grouped by `category` field
- FR-7: Filter/tag support: veg/non-veg, spice level (fields to be added to data model — not present in current source data)
- FR-8: Each item: name, description (optional), price, image (optional), "Popular" badge for tagged bestsellers
- FR-9: Optional: downloadable PDF menu fallback

### 4.3 About
- FR-10: Static/CMS-editable rich-text block for brand story
- FR-11: Ambiance/service highlights section (can be manually curated from review themes)

### 4.4 Gallery
- FR-12: Image grid + video section; lazy-loaded, lightbox on click
- FR-13: Support for the 3 existing short-form video assets (0:38, 0:19, 0:56) as a "Reels" strip

### 4.5 Reviews
- FR-14: Display aggregate rating (4.5/5, 9,482 reviews) — pull live via Google Places API if possible, rather than hardcoding (see Section 6)
- FR-15: Testimonial cards (quote, reviewer name if available, rating)
- FR-16: "Read more on Google" outbound CTA

### 4.6 Reservations
- FR-17: Either (a) embed third-party reservation widget, or (b) native form capturing: name, phone, party size, date, time, special requests
- FR-18: On native form submit → send confirmation email/SMS + notify cafe (email or dashboard)
- FR-19: Basic spam protection (reCAPTCHA or honeypot field)

### 4.7 Order Online
- FR-20: Link/embed to existing ordering platform (Google order flow currently used) unless a full e-commerce menu-cart-checkout build is in scope (flag as a larger scope decision — see Section 7)

### 4.8 Contact / Location
- FR-21: Google Maps embed using verified address
- FR-22: Click-to-call phone link (tel: protocol) for mobile
- FR-23: "Get Directions" outbound link to Google Maps
- FR-24: Full operating hours table (data gap — see Section 8)

---

## 5. Data Model

### `businessInfo` (singleton)
```
name: string
tagline: string
category: string
priceRange: { min: number, max: number, currency: string }
rating: number
reviewCount: number
address: string
phone: string
hours: [{ day: string, open: string, close: string, closed: boolean }]
avgVisitDuration: { minMinutes: number, maxMinutes: number }
```

### `menuItem` (collection)
```
id: string
name: string
category: enum [breakfast, starters, mains, desserts, beverages]
price: number
description: string (optional)
image: media reference (optional)
isPopular: boolean
isFeatured: boolean
dietaryTag: enum [veg, non-veg, egg] (data gap — not in source)
```

### `review` (collection)
```
id: string
quote: string
reviewerName: string (optional — not in current source data)
rating: number (optional)
isFeatured: boolean
source: string (default: "Google")
```

### `mediaAsset` (collection)
```
id: string
type: enum [image, video]
url: string
durationSeconds: number (video only)
altText: string
```

### `reservation` (collection, if native form is built)
```
id: string
name: string
phone: string
partySize: number
date: date
time: time
notes: string
status: enum [pending, confirmed, cancelled]
createdAt: timestamp
```

---

## 6. Third-Party Integrations to Decide

| Integration | Purpose | Build vs. Buy Decision Needed |
|---|---|---|
| Google Places API | Pull live rating/review count instead of hardcoding | Requires API key + billing setup |
| Reservation platform (EazyDiner/Dineout/Zomato/OpenTable) | Avoid building booking logic from scratch | Recommended: integrate existing widget for v1 |
| Online ordering platform | Menu/cart/checkout | Recommended: link out to existing provider for v1; native ordering is a larger v2 scope item |
| Payment gateway | Only needed if native ordering is built | Razorpay/Stripe if in scope |
| SMS/Email confirmation (Twilio/SendGrid) | Reservation confirmations | Needed only if native reservation form (not widget) is built |
| Google Maps Embed API | Location display | Free tier sufficient at this scale |

---

## 7. Non-Functional Requirements

- **Performance:** Target Lighthouse score 90+ on mobile; hero video/images must be compressed and lazy-loaded.
- **SEO:** Server-rendered or statically generated pages (not pure client-side rendering) for crawlability; schema.org `Restaurant`/`CafeOrCoffeeShop` structured data; NAP consistency with Google Business listing.
- **Accessibility:** WCAG 2.1 AA — alt text on all images, proper heading hierarchy, sufficient color contrast for the "cozy aesthetic" palette.
- **Responsiveness:** Mobile-first; majority of local restaurant traffic is mobile.
- **Security:** HTTPS by default (handled by Vercel/Netlify); form inputs sanitized/validated server-side.
- **CMS editability:** Non-technical staff must be able to update menu items, prices, and photos without a developer.

---

## 8. Data Gaps to Resolve Before Build

- Full weekly operating hours (only "closed Wednesday, opens 9 AM Friday" currently confirmed)
- Itemized menu prices and dietary tags (veg/non-veg/egg)
- High-resolution photo and video exports (3 short clips currently only available at listing quality)
- Decision: native reservation form vs. embedded third-party widget
- Decision: link-out ordering vs. native e-commerce menu/cart
- Brand story/About content
- Social media handles for footer/schema markup
- Reviewer names/permissions for displaying attributed testimonials

---

## 9. Suggested Build Phases

| Phase | Scope |
|---|---|
| **Phase 1 (MVP)** | Home, Menu, About, Contact, Gallery — static/CMS-driven, embedded reservation + order-out links |
| **Phase 2** | Native reservation form with confirmation flow, live Google reviews integration, structured data/SEO polish |
| **Phase 3 (optional)** | Native online ordering with cart + payment gateway |

---

*Compiled as a technical build reference; content/copy inputs are covered separately in the content resource document.*
