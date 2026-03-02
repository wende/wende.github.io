const GA_SCRIPT_ID = 'ga4-gtag-script';
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function isAnalyticsEnabled() {
  return Boolean(GA_MEASUREMENT_ID) && import.meta.env.PROD;
}

export function initAnalytics() {
  if (!isAnalyticsEnabled()) {
    return;
  }

  if (!window.dataLayer) {
    window.dataLayer = [];
  }

  if (!window.gtag) {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer.push(args);
    };
  }

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });

  if (!document.getElementById(GA_SCRIPT_ID)) {
    const script = document.createElement('script');
    script.id = GA_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }
}

export function trackPageView(path: string) {
  if (!isAnalyticsEnabled() || !window.gtag) {
    return;
  }

  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}
