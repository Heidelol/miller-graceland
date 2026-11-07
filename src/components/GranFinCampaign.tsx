import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, X } from 'lucide-react';
import { GRAN_FIN_COVER, GRAN_FIN_DATES, GRAN_FIN_END, GRAN_FIN_OFFERS, GRAN_FIN_START } from '../data/granFin';
import { SALON_INFO } from '../data/salonData';
import { trackWhatsAppClick } from '../lib/analytics';

const seenKey = 'miller-gran-fin-2026-seen';
const slideCount = GRAN_FIN_OFFERS.length + 1;
const controlClass = 'inline-flex size-11 shrink-0 items-center justify-center rounded-lg text-[#42502E] hover:bg-[#EDE7DA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#42502E] disabled:opacity-35';

function GranFinDialog({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const gestureStart = useRef<{ x: number; y: number } | null>(null);
  const [slide, setSlide] = useState(0);
  const offer = GRAN_FIN_OFFERS[slide - 1];
  const move = (direction: number) => {
    setSlide(current => Math.max(0, Math.min(slideCount - 1, current + direction)));
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    const overflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
    };
  }, []);

  const dismiss = () => {
    dialogRef.current?.close();
    onClose();
  };

  const message = offer
    ? `Hola, Miller. Me interesa la promoción del Gran Fin de ${offer.title}. ¿Me compartes la disponibilidad?`
    : '';

  return (
    <dialog
      ref={dialogRef}
      aria-label="Promociones del Gran Fin"
      className="gran-fin-dialog"
      onCancel={event => { event.preventDefault(); dismiss(); }}
      onClick={event => { if (event.target === event.currentTarget) dismiss(); }}
      onKeyDown={event => {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          move(event.key === 'ArrowRight' ? 1 : -1);
        }
      }}
    >
      <button
        type="button"
        autoFocus
        aria-label="Cerrar promociones"
        className={`${controlClass} absolute top-2 right-2 z-10 bg-[#F9F6F0]`}
        onClick={dismiss}
      >
        <X size={20} aria-hidden="true" />
      </button>

      <div
        className="gran-fin-art"
        aria-live="polite"
        aria-atomic="true"
        onTouchStart={event => {
          const touch = event.touches[0];
          gestureStart.current = event.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null;
        }}
        onTouchCancel={() => { gestureStart.current = null; }}
        onTouchEnd={event => {
          const start = gestureStart.current;
          gestureStart.current = null;
          if (!start || event.touches.length > 0) return;
          const touch = event.changedTouches[0];
          const dx = touch.clientX - start.x;
          const dy = touch.clientY - start.y;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1);
        }}
      >
        <img
          src={offer?.image ?? GRAN_FIN_COVER}
          alt={offer ? `${offer.title}. ${offer.detail}` : `El Gran Fin de Miller Greiseland Studio. ${GRAN_FIN_DATES}.`}
          width={1080}
          height={1440}
          draggable={false}
        />
      </div>

      <div className="gran-fin-toolbar grid min-h-12 grid-cols-[1fr_auto_1fr] items-center border-t border-[#99745A]/25 px-2" role="group" aria-label="Controles de promociones">
        <div className="gran-fin-arrows col-start-2 flex items-center text-[#5C534B]">
          <button type="button" aria-label="Promoción anterior" disabled={slide === 0} className={controlClass} onClick={() => move(-1)}>
            <ChevronLeft size={19} aria-hidden="true" />
          </button>
          <span className="text-xs tabular-nums" aria-label={`Imagen ${slide + 1} de ${slideCount}`}>
            {slide + 1}/{slideCount}
          </span>
          <button type="button" aria-label="Siguiente promoción" disabled={slide === slideCount - 1} className={controlClass} onClick={() => move(1)}>
            <ChevronRight size={19} aria-hidden="true" />
          </button>
        </div>
        <div className="gran-fin-touch-pagination col-start-2" role="group" aria-label="Elegir imagen">
          {Array.from({ length: slideCount }, (_, index) => (
            <button
              key={index}
              type="button"
              className="gran-fin-dot inline-flex min-h-11 min-w-0 items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-[#42502E]"
              aria-label={`Ver imagen ${index + 1} de ${slideCount}`}
              aria-current={index === slide ? 'true' : undefined}
              onClick={() => setSlide(index)}
            >
              <span aria-hidden="true" />
            </button>
          ))}
        </div>
        {offer && (
          <a
            href={`${SALON_INFO.whatsappUrl}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Consultar por WhatsApp"
            title="Consultar por WhatsApp"
            className={`${controlClass} col-start-3 justify-self-end`}
            onClick={() => trackWhatsAppClick('gran_fin', { serviceName: offer.title })}
          >
            <MessageCircle size={19} aria-hidden="true" />
          </a>
        )}
      </div>
    </dialog>
  );
}

export function GranFinCampaign() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const shown = useRef(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let timer: number | undefined;
    const sync = () => {
      window.clearTimeout(timer);
      const now = Date.now();
      const inSeason = now >= GRAN_FIN_START && now < GRAN_FIN_END;
      setActive(inSeason);
      if (inSeason && !shown.current) {
        shown.current = true;
        let alreadySeen = false;
        try {
          alreadySeen = window.sessionStorage.getItem(seenKey) !== null;
          if (!alreadySeen) window.sessionStorage.setItem(seenKey, '1');
        } catch {
          // A blocked browser store still allows the campaign to open on this visit.
        }
        if (!alreadySeen) setOpen(true);
      }
      const nextBoundary = now < GRAN_FIN_START ? GRAN_FIN_START : GRAN_FIN_END;
      if (now < nextBoundary) {
        timer = window.setTimeout(sync, Math.min(nextBoundary - now, 2_147_483_647));
      }
    };
    sync();
    document.addEventListener('visibilitychange', sync);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  if (!active) return null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        className="inline-flex min-h-11 items-center text-sm font-semibold text-[#42502E] underline underline-offset-4 decoration-[#68794E]/50 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#42502E]"
        onClick={() => setOpen(true)}
      >
        Ver promociones del Gran Fin
      </button>
      {open && (
        <GranFinDialog onClose={() => {
          setOpen(false);
          triggerRef.current?.focus({ preventScroll: true });
        }} />
      )}
    </>
  );
}
