import { MessageCircle } from 'lucide-react';
import { buildGiftCardWhatsAppUrl, type GiftCard } from '../data/giftCards';
import { trackWhatsAppClick } from '../lib/analytics';

const studioLinkClass = 'inline-flex min-h-11 items-center justify-center text-sm font-semibold text-[#42502E] underline underline-offset-4 hover:text-[#231E1B] focus-visible:outline-2 focus-visible:outline-offset-4';

export function GiftCardPage({ card }: { card: GiftCard }) {
  return (
    <main className="min-h-screen bg-[#F1ECE2] px-5 py-6 text-center selection:bg-[#C8933E]/25 sm:px-6 sm:py-12">
      <article aria-labelledby="gift-card-title" className="mx-auto max-w-[720px] rounded-xl border border-[#C6AF8D] bg-[#F9F6F0] px-5 py-7 sm:px-12 sm:py-10">
        <header className="mb-5 flex flex-col items-center gap-2 sm:mb-6">
          <img src="/logo-miller-small.webp" width={137} height={144} alt="" className="h-auto w-12" />
          <p className="font-serif-luxury text-lg font-semibold leading-tight">Miller Greiseland Studio</p>
          <p className="text-[11px] font-semibold tracking-[0.22em] text-[#42502E]">GIFT CARD</p>
        </header>

        <h1 id="gift-card-title" className="mx-auto max-w-[15ch] text-balance text-[clamp(2.25rem,6vw,3.5rem)] font-medium leading-[1.02]">
          Una experiencia especialmente para ti.
        </h1>

        <div aria-hidden="true" className="mx-auto my-5 h-px w-12 bg-[#B8955C] sm:my-6" />

        <h2 className="mx-auto max-w-[24ch] text-balance text-[clamp(1.75rem,4.5vw,2.5rem)] font-semibold leading-tight">{card.name}</h2>
        <p className="mx-auto mt-2 max-w-[48ch] text-sm leading-relaxed text-[#5C534B] sm:text-base">{card.description}</p>

        <div className="mx-auto mt-5 max-w-[45ch] text-sm leading-relaxed text-[#5C534B]">
          <p className="font-semibold text-[#42502E]">Tu experiencia incluye bebidas de cortesía de nuestro menú.</p>
          <p className="mt-1">Café americano, lungo, capuchino, frappuccino moka, Coca-Cola, agua y té.</p>
        </div>

        <p className="font-serif-luxury mt-5 text-xl leading-tight text-[#80571F] italic sm:mt-6 sm:text-2xl">Con cariño, Miller Greiseland.</p>

        <a
          href={buildGiftCardWhatsAppUrl(card)}
          target="_blank"
          rel="noopener noreferrer"
          className="gold-button mt-5 inline-flex min-h-12 max-w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm motion-reduce:transition-none"
          onClick={() => trackWhatsAppClick('gift_card', { serviceName: card.name })}
        >
          <MessageCircle size={18} aria-hidden="true" className="shrink-0" />
          Coordinar mi experiencia
        </a>
        <p className="mx-auto mt-3 max-w-[44ch] text-xs leading-relaxed text-[#5C534B]">
          Escríbenos para coordinar tu visita y confirmar los detalles de tu regalo.
        </p>
      </article>
      <a href="/" className={`mt-2 ${studioLinkClass}`}>Conocer el estudio</a>
    </main>
  );
}

export function GiftCardNotFound() {
  return (
    <main className="mx-auto max-w-xl px-6 py-20">
      <p className="font-serif-luxury mb-4 text-xl">Miller Greiseland Studio</p>
      <h1 className="text-4xl">No encontramos esta página.</h1>
      <a href="/" className={`mt-4 ${studioLinkClass}`}>Volver al inicio</a>
    </main>
  );
}
