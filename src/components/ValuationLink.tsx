import type { ComponentProps } from 'react';
import { buildValuationUrl } from '../data/valuation';
import { trackWhatsAppClick } from '../lib/analytics';

type ValuationLinkProps = Omit<ComponentProps<'a'>, 'href' | 'target' | 'rel' | 'onClick'> & {
  location: Parameters<typeof trackWhatsAppClick>[0];
  onNavigate?: () => void;
  interest?: string;
};

export function ValuationLink({ location, onNavigate, interest, children = 'Solicitar valoración', ...props }: ValuationLinkProps) {
  return (
    <a {...props} href={buildValuationUrl(interest)} target="_blank" rel="noopener noreferrer"
      onClick={() => {
        trackWhatsAppClick(location, { serviceName: interest?.trim() || 'Valoración en salón' });
        onNavigate?.();
      }}>
      {children}
    </a>
  );
}
