# Olu Studios Website

Artist portfolio and e-commerce site built with Astro and integrated with Shopify Buy Button SDK for checkout functionality.

## Features

- **Home Page**: Background image with "Olu" title, Shopify collection buy buttons, and About section
- **Shop Pages**: Shop All, Originals, Prints, and Olu Airlines using Shopify Buy Button collections
- **Work Page**: Gallery of artwork images (not for sale)
- **Contact Page**: Contact information
- **Announcements**: Auto-rotating slideshow banner at the top
- **Responsive Design**: Mobile-first, fully responsive layout

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Shopify store with Buy Button enabled
- Shopify Storefront API access token

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token

# Collection IDs (get these from Shopify admin -> Settings -> Apps -> Buy Button -> Collections)
SHOPIFY_HOME_COLLECTION_ID=your-home-collection-id
SHOPIFY_ALL_COLLECTION_ID=your-all-collection-id
SHOPIFY_ORIGINALS_COLLECTION_ID=your-originals-collection-id
SHOPIFY_PRINTS_COLLECTION_ID=your-prints-collection-id
SHOPIFY_AIRLINES_COLLECTION_ID=your-airlines-collection-id
```

3. Add your images:
   - Home background: `public/images/home-bg.jpg`
   - Profile picture: `public/images/profile.jpg`
   - Work images: Add to `src/data/portfolio/items.json` and place images in `public/portfolio/`

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

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

## Shopify Integration

This site uses Shopify Buy Button SDK's collection rendered feature. All product data and checkout is handled by Shopify.

### Setting up Shopify Collections

1. In Shopify admin, go to Settings > Apps > Buy Button
2. Create collections: Home, All Products, Originals, Prints, Olu Airlines
3. Get the collection IDs from the Buy Button embed code
4. Add the collection IDs to your `.env` file

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
