import type { CollectionEntry } from 'astro:content';

export interface PortfolioItem {
  id: string;
  title: string;
  description?: string;
  images: string[];
  date?: string;
  collection?: string;
  shopProductId?: string;
  shopProductHandle?: string;
}

// For now, we'll use JSON files. In a production setup, you might use Astro Content Collections
export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  try {
    // Try to import portfolio data
    // In a real implementation, this would read from src/data/portfolio/*.json files
    const portfolioData = await import('../data/portfolio/items.json');
    return portfolioData.default || [];
  } catch {
    // Return empty array if no portfolio data exists yet
    return [];
  }
}

export function getPortfolioItemById(items: PortfolioItem[], id: string): PortfolioItem | undefined {
  return items.find((item) => item.id === id);
}

export function getPortfolioItemsByCollection(items: PortfolioItem[], collection: string): PortfolioItem[] {
  return items.filter((item) => item.collection === collection);
}
