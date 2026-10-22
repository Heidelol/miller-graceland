import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { EXTENSIONS_PATH } from '../data/extensionsPage';

// Add future service pages here once their content is published.
const servicePages = [
  { label: 'Extensiones de cabello', href: EXTENSIONS_PATH },
];

interface ServicesNavProps {
  mobile?: boolean;
  sectionLinkPrefix?: '' | '/';
  triggerClassName: string;
  onNavigate?: () => void;
}

export function ServicesNav({ mobile = false, sectionLinkPrefix = '', triggerClassName, onNavigate }: ServicesNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = `${mobile ? 'mobile' : 'desktop'}-services-panel`;

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen]);

  const navigate = () => {
    setIsOpen(false);
    onNavigate?.();
  };

  return (
    <div ref={containerRef} className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && isOpen) {
          event.preventDefault();
          event.stopPropagation();
          setIsOpen(false);
          triggerRef.current?.focus();
        }
      }}>
      <button ref={triggerRef} type="button" aria-expanded={isOpen} aria-controls={panelId}
        onClick={() => setIsOpen(open => !open)}
        className={`${triggerClassName} gap-1.5 cursor-pointer ${mobile ? 'w-full justify-between' : ''}`}>
        Servicios
        <ChevronDown className={`h-3.5 w-3.5 text-[#95651F] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      <div id={panelId} hidden={!isOpen}
        className={mobile
          ? 'ml-1 mb-2 border-l border-[#99745A]/25 pl-4'
          : 'absolute left-0 top-full mt-1 w-64 rounded-xl border border-[#99745A]/20 bg-[#F9F6F0] p-2 shadow-sm'}>
        <a href={`${sectionLinkPrefix}#servicios`} onClick={navigate}
          className="flex min-h-11 items-center px-3 py-3 text-[13px] font-medium text-[#5C534B] hover:text-[#95651F] hover:bg-[#F2EDE3] rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-[#231E1B] focus-visible:outline-offset-2">
          Ver todos los servicios
        </a>
        {servicePages.map(({ label, href }) => (
          <a key={href} href={href} onClick={navigate}
            className="flex min-h-11 items-center justify-between gap-3 px-3 py-3 text-[13px] font-medium text-[#42502E] hover:text-[#95651F] hover:bg-[#F2EDE3] rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-[#231E1B] focus-visible:outline-offset-2">
            {label}<ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[#95651F]" aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  );
}
