# Petrov Fitness Website

Professional personal training website for Mikhail Petrov, Adelaide SA.

## Tech Stack
- **Framework:** Astro v4
- **Styling:** TailwindCSS
- **CMS:** Decap CMS (Netlify CMS)
- **Carousel:** Swiper.js v11
- **Booking:** Cal.com
- **Forms:** Netlify Forms
- **Hosting:** Netlify

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Open http://localhost:4321

### Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Run Tests
```bash
npm test
```

## Project Structure
```
src/
├── components/
│   ├── layout/     # Header, Footer, WhatsAppButton
│   ├── home/       # Homepage sections
│   ├── blog/       # Blog components
│   ├── services/   # Services components
│   ├── contact/    # Contact form
│   └── shared/     # Reusable components (Cal.com, CTA, etc.)
├── content/
│   └── blog/       # Markdown blog posts
├── data/           # Static data (services, testimonials, Cal.com config)
├── layouts/        # Layout.astro, PageLayout.astro, BlogLayout.astro
├── pages/          # Astro pages
└── utils/          # Utility functions
public/
├── admin/          # Decap CMS
├── images/         # Static images
└── uploads/        # CMS uploaded images
```

## Environment Variables
No environment variables required for local development.

For production (Netlify), configure:
- Netlify Identity (for CMS authentication)
- Git Gateway (for CMS commits)

## Adding Content
See `ADMIN-GUIDE.md` for instructions on using the CMS.

## Deployment
See `DEPLOYMENT-GUIDE.md` for Netlify deployment instructions.
