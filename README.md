# Olu Studios Website

Artist portfolio and e-commerce site built with Astro. Checkout is handled via Stripe payment links.

## Features

- **Home Page**: Background image with "Olu" title, featured shop items, and About section
- **Shop Pages**: Shop All, Originals, Prints, and Olu Airlines — all managed via a single JSON file
- **Work Page**: Gallery of artwork images (not for sale)
- **Contact Page**: Contact information
- **Announcements**: Auto-rotating slideshow banner at the top
- **Responsive Design**: Mobile-first, fully responsive layout

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Add your images:
   - Home background: `public/images/home-bg.jpg`
   - Profile picture: `public/images/profile.jpg`
   - Work images: Add to `src/data/portfolio/items.json` and place images in `public/portfolio/`

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Shop Management

### Opening and Closing the Shop

Edit `src/data/shop/config.json` to toggle the shop on or off:

**Open:**
```json
{
  "shopOpen": true,
  "returnDate": ""
}
```

**Closed** (shows a "shop is closed, i'm on a flight somewhere" message):
```json
{
  "shopOpen": false,
  "returnDate": "may 5th"
}
```

Leave `returnDate` as `""` to show "will be back soon" instead of a specific date.

---

### Adding Products to the Shop

Edit `src/data/shop/products.json`. Each product is an object in the array:

```json
{
  "id": "unique-id",
  "name": "Product Name",
  "description": "Short description (optional)",
  "price": 30,
  "currency": "USD",
  "image": "/images/your-product-image.jpg",
  "stripeLink": "https://buy.stripe.com/your-link",
  "tags": ["prints"],
  "available": true
}
```

**Fields:**
- `id` — unique slug, no spaces (e.g. `"sunset-print"`)
- `name` — displayed on the product card
- `description` — optional subtitle below the name
- `price` — number, displayed as `$30.00`
- `image` — path to image in `public/` (e.g. `/images/my-art.jpg`)
- `stripeLink` — your Stripe payment link URL; leave `""` if not set up yet
- `tags` — controls which shop page the product appears on:
  - `"originals"` → `/shop/originals`
  - `"prints"` → `/shop/prints`
  - `"olu-airlines"` → `/shop/olu-airlines`
  - all products appear on `/shop`
- `available` — set to `false` to show "sold out" instead of the buy button

**Steps to add a new product:**
1. Add the product image to `public/images/`
2. Add a new entry to `src/data/shop/products.json` with the right tag
3. Paste your Stripe payment link into `stripeLink`
4. Deploy — no other code changes needed

---

## Content Management

### Updating Announcements

Edit `src/data/announcements.json`:
```json
{
  "enabled": true,
  "items": [
    {
      "text": "Your announcement text here",
      "link": "/shop"
    }
  ]
}
```

### Adding Work Images

Edit `src/data/portfolio/items.json`:
```json
[
  {
    "id": "work-1",
    "title": "Artwork Title",
    "images": ["/portfolio/image.jpg"]
  }
]
```

### Updating Home Page

Edit `src/data/home.json`:
```json
{
  "backgroundImage": "/images/home-bg.jpg",
  "title": "Olu",
  "about": {
    "image": "/images/profile.jpg",
    "text": "Your about text here"
  }
}
```

## Deployment

The site is configured for GitHub Pages deployment. The GitHub Actions workflow will automatically build and deploy when you push to the main branch.

1. Enable GitHub Pages in your repository settings
2. Push to main branch
3. Site will be available at `https://yourusername.github.io/olu-studios`

### Custom Domain

To use a custom domain:
1. Add a `CNAME` file in the `public/` directory with your domain
2. Configure DNS settings with your domain provider
3. Update `site` in `astro.config.mjs` if needed

## License

© 2024 Olu Studios. All rights reserved.
