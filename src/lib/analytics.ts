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
    if (import.meta.env.DEV) {
      console.warn('[Analytics Error]', err);
    }
  }
}

/**
 * 1. Track WhatsApp Clicks across the site (Floating, Navbar, Footer, Catalog, Booking Modal)
 */
export function trackWhatsAppClick(
  location:
    | 'floating_button'
    | 'navbar_desktop'
    | 'navbar_mobile'
    | 'hero_card_tratamientos'
    | 'services_card_tratamientos'
    | 'payment_methods'
    | 'footer'
    | 'booking_modal_final',
  details?: {
    serviceName?: string;
    bookingCode?: string;
  }
) {
  // Custom intuitive event
  trackEvent('whatsapp_click', {
    click_location: location,
    service_name: details?.serviceName || 'General',
    booking_code: details?.bookingCode,
  });

  // Standard Google recommended event for conversion tracking
  trackEvent('generate_lead', {
    currency: 'MXN',
    lead_type: 'whatsapp',
    location: location,
    service_name: details?.serviceName,
  });
}

/**
 * 2. Track Interest in Services (clicks on "Reservar" or selecting a service in catalog)
 */
export function trackServiceInterest(
  serviceId: string,
  serviceName: string,
  priceMXN: number,
  category: string
) {
  trackEvent('service_interest', {
    service_id: serviceId,
    service_name: serviceName,
    price_mxn: priceMXN,
    category: category,
  });

  // Standard GA4 e-commerce / selection item
  trackEvent('select_item', {
    item_list_name: 'Catálogo de Servicios',
    items: [
      {
        item_id: serviceId,
        item_name: serviceName,
        price: priceMXN,
        item_category: category,
      },
    ],
  });
}

/**
 * 3. Track Opening of the Booking Modal
 */
export function trackBookingModalOpen(triggerLocation: string, serviceName?: string) {
  trackEvent('booking_modal_open', {
    trigger_location: triggerLocation,
    initial_service: serviceName || 'default',
  });

  trackEvent('begin_checkout', {
    items: serviceName ? [{ item_name: serviceName }] : undefined,
  });
}

/**
 * 4. Track Booking Modal Funnel Steps (1: Service, 2: Hair, 3: Schedule, 4: Contact, 5: Summary)
 */
export function trackBookingStep(stepNumber: number, stepName: string, serviceName?: string) {
  trackEvent('booking_step', {
    step_number: stepNumber,
    step_name: stepName,
    service_name: serviceName,
  });
}

/**
 * 5. Track Completion of Booking Form (Step 6 / Solicitud preparada)
 */
export function trackBookingLeadPrepared(
  serviceName: string,
  bookingCode: string,
  depositMXN: number,
  requestedDate: string,
  requestedTime: string
) {
  trackEvent('booking_lead_prepared', {
    service_name: serviceName,
    booking_code: bookingCode,
    deposit_mxn: depositMXN,
    requested_date: requestedDate,
    requested_time: requestedTime,
  });

  trackEvent('conversion', {
    send_to: GA_MEASUREMENT_ID,
    value: depositMXN,
    currency: 'MXN',
    transaction_id: bookingCode,
  });
}

/**
 * 6. Track Outbound Social / Phone / Directions Clicks
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
