// Loader for Shopify Buy Button SDK
let sdkLoaded = false;
let sdkPromise: Promise<void> | null = null;

export function loadBuyButtonSDK(storeDomain: string): Promise<void> {
  if (sdkLoaded) {
    return Promise.resolve();
  }

  if (sdkPromise) {
    return sdkPromise;
  }

  sdkPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js`;
    script.async = true;
    
    script.onload = () => {
      sdkLoaded = true;
      resolve();
    };
    
    script.onerror = () => {
      reject(new Error('Failed to load Shopify Buy Button SDK'));
    };
    
    document.head.appendChild(script);
  });

  return sdkPromise;
}
