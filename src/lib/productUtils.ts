import { existsSync } from 'fs';
import { join } from 'path';

export function hasImage(product: { image?: string }): boolean {
  if (!product.image) return false;
  return existsSync(join(process.cwd(), 'public', product.image));
}
