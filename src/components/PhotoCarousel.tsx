import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import type { StudioPhoto } from '../data/studioPhotos';

interface PhotoCarouselProps {
  images: readonly StudioPhoto[];
  label: string;
  className?: string;
  frameClassName?: string;
}

interface LightboxProps {
  image: StudioPhoto;
  label: string;
  onClose: () => void;
  onMove: (direction: number) => void;
  multiple: boolean;
}

function PhotoLightbox({ image, label, onClose, onMove, multiple }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="photo-lightbox"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      onKeyDown={(event) => {
        if (multiple && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
          event.preventDefault();
          onMove(event.key === 'ArrowRight' ? 1 : -1);
        }
      }}
    >
      <div className="photo-lightbox-content">
        <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-[#99745A]/20">
          <h2 id={titleId} className="font-serif-luxury text-xl text-[#231E1B]">{label}</h2>
          <button ref={closeButtonRef} type="button" className="photo-control" aria-label="Cerrar fotografía" onClick={onClose}>
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="relative min-h-0 bg-[#F2EDE3]">
          <img src={image.src} alt={image.alt} width={image.width} height={image.height} className="photo-lightbox-image" />
          {multiple && (
            <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
              <button type="button" className="photo-control pointer-events-auto" aria-label={`Fotografía anterior de ${label}`} onClick={() => onMove(-1)}><ChevronLeft size={20} aria-hidden="true" /></button>
              <button type="button" className="photo-control pointer-events-auto" aria-label={`Siguiente fotografía de ${label}`} onClick={() => onMove(1)}><ChevronRight size={20} aria-hidden="true" /></button>
            </div>
          )}
        </div>
        {image.caption && <p className="text-center text-xs text-[#5C534B] px-4 py-3">{image.caption}</p>}
      </div>
    </dialog>, document.body,
  );
}

export function PhotoCarousel({ images, label, className = '', frameClassName = 'aspect-[16/10]' }: PhotoCarouselProps) {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const current = images[index] ?? images[0];
  const multiple = images.length > 1;
  const move = (direction: number) => setIndex(previous => (previous + direction + images.length) % images.length);

  if (!current) return null;

  return (
    <div
      role={multiple ? 'region' : undefined}
      aria-roledescription={multiple ? 'carrusel' : undefined}
      aria-label={label}
      tabIndex={multiple ? 0 : undefined}
      className={`photo-carousel relative overflow-hidden bg-[#E8E1D5] ${frameClassName} ${className}`}
      onKeyDown={(event) => {
        if (!multiple || event.target !== event.currentTarget) return;
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1);
        } else if (event.key === 'Home' || event.key === 'End') {
          event.preventDefault(); setIndex(event.key === 'Home' ? 0 : images.length - 1);
        }
      }}
      onPointerDown={(event) => {
        if (event.pointerType !== 'touch' || (event.target as HTMLElement).closest('button')) return;
        pointerStart.current = { x: event.clientX, y: event.clientY };
        event.currentTarget.setPointerCapture?.(event.pointerId);
      }}
      onPointerCancel={() => { pointerStart.current = null; }}
      onPointerUp={(event) => {
        const start = pointerStart.current;
        pointerStart.current = null;
        if (!start || !multiple) return;
        const horizontal = event.clientX - start.x;
        const vertical = event.clientY - start.y;
        if (Math.abs(horizontal) > 50 && Math.abs(horizontal) > Math.abs(vertical) * 1.4) move(horizontal < 0 ? 1 : -1);
      }}
    >
      <img
        key={current.src}
        src={current.src}
        srcSet={current.smallSrc ? `${current.smallSrc} 480w, ${current.src} ${current.width}w` : undefined}
        sizes="(min-width: 1280px) 400px, (min-width: 768px) 45vw, 94vw"
        width={current.width}
        height={current.height}
        alt={current.alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        style={{ objectPosition: current.objectPosition ?? 'center' }}
        className="photo-carousel-image absolute inset-0 w-full h-full object-cover"
      />
      {multiple && <span className="absolute top-3 right-3 px-2.5 py-1 bg-[#F8F5EE]/95 text-[#231E1B] rounded-full text-[11px] tabular-nums" aria-hidden="true">{index + 1} / {images.length}</span>}
      {current.caption && <p className="photo-caption absolute top-3 left-3 right-16 rounded-lg bg-[#F8F5EE]/95 px-2 py-1 text-[10px] text-[#231E1B]">{current.caption}</p>}
      <button type="button" className={`photo-control absolute bottom-3 left-3 ${multiple ? 'photo-zoom' : ''}`} aria-label={`Ampliar fotografía de ${label}`} onClick={() => setExpanded(true)}><Maximize2 size={17} aria-hidden="true" /></button>
      <div className="absolute bottom-3 inset-x-3 flex items-center justify-end pointer-events-none">
        {multiple && (
          <div className="flex items-center gap-1 rounded-full bg-[#F8F5EE]/95 p-1 pointer-events-auto">
            <button type="button" className="photo-control photo-control-flat" aria-label={`Fotografía anterior de ${label}`} onClick={() => move(-1)}><ChevronLeft size={18} aria-hidden="true" /></button>
            <div className="flex items-center">
              {images.map((image, position) => (
                <button key={image.src} type="button" className="photo-dot" aria-label={`Ver fotografía ${position + 1} de ${label}`} aria-current={index === position ? 'true' : undefined} onClick={() => setIndex(position)}>
                  <span className={`block w-1.5 h-1.5 rounded-full ${index === position ? 'bg-[#68794E]' : 'bg-[#99745A]/40'}`} />
                </button>
              ))}
            </div>
            <button type="button" className="photo-control photo-control-flat" aria-label={`Siguiente fotografía de ${label}`} onClick={() => move(1)}><ChevronRight size={18} aria-hidden="true" /></button>
          </div>
        )}
      </div>
      {multiple && <span className="sr-only" aria-live="polite" aria-atomic="true">Fotografía {index + 1} de {images.length}: {current.alt}</span>}
      {expanded && <PhotoLightbox image={current} label={label} multiple={multiple} onClose={() => setExpanded(false)} onMove={move} />}
    </div>
  );
}
