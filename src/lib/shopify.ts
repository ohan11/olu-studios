const storeDomain = '8ygcdj-p0.myshopify.com';
const accessToken = '520b84fb4c682542b64d82a61392f184';

if (!storeDomain || !accessToken) {
  console.warn('Shopify credentials not configured. Products will not be available.');
}

// Shopify Storefront API endpoint
const getShopifyEndpoint = () => {
  if (!storeDomain || !accessToken) return null;
  return `https://${storeDomain}/api/2024-01/graphql.json`;
};

// Helper function to make GraphQL requests
async function shopifyRequest(query: string, variables: Record<string, any> = {}) {
  const endpoint = getShopifyEndpoint();
  if (!endpoint) return null;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': accessToken,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.status}`);
    }

    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error('Error fetching from Shopify:', error);
    return null;
  }
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
      };
    }>;
  };
  tags: string[];
  collections: {
    edges: Array<{
      node: {
        id: string;
        handle: string;
        title: string;
      };
    }>;
  };
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: {
    url: string;
    altText: string | null;
  } | null;
}

const PRODUCT_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
          tags
          collections(first: 5) {
            edges {
              node {
                id
                handle
                title
              }
            }
          }
        }
      }
    }
  }
`;

const COLLECTION_QUERY = `
  query getCollection($handle: String!) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image {
        url
        altText
      }
      products(first: 50) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
            tags
          }
        }
      }
    }
  }
`;

export async function getProducts(): Promise<ShopifyProduct[]> {
  if (!storeDomain || !accessToken) {
    return [];
  }

  try {
    const data = await shopifyRequest(PRODUCT_QUERY, { first: 50 });
    if (!data) return [];

    const products = data.products?.edges || [];
    return products.map((edge: any) => edge.node);
  } catch (error) {
    console.error('Error fetching products from Shopify:', error);
    return [];
  }
}

export async function getCollection(handle: string): Promise<ShopifyCollection | null> {
  if (!storeDomain || !accessToken) {
    return null;
  }

  try {
    const data = await shopifyRequest(COLLECTION_QUERY, { handle });
    return data?.collection || null;
  } catch (error) {
    console.error(`Error fetching collection ${handle} from Shopify:`, error);
    return null;
  }
}

export function getProductById(products: ShopifyProduct[], id: string): ShopifyProduct | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByTag(products: ShopifyProduct[], tag: string): ShopifyProduct[] {
  return products.filter((p) => p.tags.includes(tag));
}

export function getProductsByCollection(products: ShopifyProduct[], collectionHandle: string): ShopifyProduct[] {
  return products.filter((p) =>
    p.collections.edges.some((c) => c.node.handle === collectionHandle)
  );
}
