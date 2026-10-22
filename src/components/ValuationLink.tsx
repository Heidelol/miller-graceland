import type { ComponentProps } from 'react';
import { VALUATION_WHATSAPP_URL } from '../data/valuation';
import { trackWhatsAppClick } from '../lib/analytics';

type ValuationLinkProps = Omit<ComponentProps<'a'>, 'href' | 'target' | 'rel' | 'onClick'> & {
  location: Parameters<typeof trackWhatsAppClick>[0];
  onNavigate?: () => void;
};

export function ValuationLink({ location, onNavigate, children = 'Solicitar valoración', ...props }: ValuationLinkProps) {
  return (
    <a {...props} href={VALUATION_WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
      onClick={() => {
        trackWhatsAppClick(location, { serviceName: 'Valoración en salón' });
        onNavigate?.();
      }}>
      {children}
    </a>
  );
}
