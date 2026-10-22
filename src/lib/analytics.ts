/**
 * Google Analytics 4 (GA4) Integration for Miller Greiseland Studio
 * Measurement ID: G-ET6TSWGHZ1
 */

export const GA_MEASUREMENT_ID = 'G-ET6TSWGHZ1';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsParamValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | Record<string, unknown>
  | Array<Record<string, unknown>>;

/**
 * Safe gtag wrapper that works in browser and SSR environments,
 * queueing commands in window.dataLayer even if the gtag script is still loading.
 */
export function trackEvent(
  eventName: string,
  eventParams: Record<string, AnalyticsParamValue> = {}
) {
  if (typeof window === 'undefined') return;

  // Filter out undefined or null parameters for clean reporting
  const cleanParams: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(eventParams)) {
    if (value !== undefined && value !== null) {
      cleanParams[key] = value;
    }
  }

  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, cleanParams);
    } else {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(['event', eventName, cleanParams]);
    }
  } catch (err) {
    // Fail silently in production so analytics never interrupts user UX
    if (import.meta.env?.DEV) {
      console.warn('[Analytics Error]', err);
    }
  }
}

/**
 * Track contact intent across the public site. A click is not a confirmed appointment.
 */
export function trackWhatsAppClick(
  location:
    | 'floating_button'
    | 'navbar_desktop'
    | 'navbar_mobile'
    | 'navbar_valuation'
    | 'navbar_mobile_valuation'
    | 'hero_valuation'
    | 'services_valuation'
    | 'payment_valuation'
    | 'hero_card_tratamientos'
    | 'services_card_tratamientos'
    | 'payment_methods'
    | 'footer'
    | 'extensions_hero'
    | 'extensions_valuation'
    | 'extensions_location'
    | 'extensions_navbar',
  details?: {
    serviceName?: string;
  }
) {
  // Opening WhatsApp does not prove that a message was sent or a booking confirmed.
  trackEvent('whatsapp_click', {
    click_location: location,
    service_name: details?.serviceName || 'General',
    contact_intent: 'inquiry',
  });
}

/**
 * Track Outbound Social / Phone / Directions Clicks
 */
export function trackInstagramClick(location: string = 'footer') {
  trackEvent('instagram_click', {
    click_location: location,
    account: '@millergreiseland.studio',
  });
}

export function trackPhoneCallClick(location: string = 'footer') {
  trackEvent('phone_call_click', {
    click_location: location,
    phone_number: '9831373038',
  });
}

export function trackDirectionsClick(location: string = 'footer') {
  trackEvent('directions_click', {
    click_location: location,
  });
}
