import type { ReactNode } from 'react';
import { createRoot, hydrateRoot, type HydrationOptions } from 'react-dom/client';

export function mountApp(container: HTMLElement, app: ReactNode, pathname: string, options?: HydrationOptions) {
  if (container.hasChildNodes() && container.dataset.ssrPath === pathname) {
    return hydrateRoot(container, app, options);
  }
  const root = createRoot(container, options);
  root.render(app);
  return root;
}
