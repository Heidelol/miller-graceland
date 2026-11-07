import { ArrowUpRight } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { DRINKS_MENU, FOOD_MENU } from '../data/studioMenu';

const textLink = 'inline-flex min-h-11 items-center gap-2 underline decoration-[#99745A]/60 underline-offset-4 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4';

function MenuEntries({ items }: { items: typeof FOOD_MENU }) {
  return (
    <ul className="divide-y divide-[#99745A]/25">
      {items.map(({ name, price, description }) => (
        <li key={name} className="py-3.5 first:pt-0 last:pb-0">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4">
            <h3 className="text-[1.375rem] leading-tight font-semibold sm:text-2xl">{name}</h3>
            <span className="text-sm font-semibold tabular-nums text-[#42502E]">${price}</span>
          </div>
          {description && <p className="mt-1.5 text-sm leading-relaxed text-[#5C534B]">{description}</p>}
        </li>
      ))}
    </ul>
  );
}

export function StudioMenuPage() {
  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#231E1B] selection:bg-[#C8933E]/20">
      <Navbar sectionLinkPrefix="/" menuCurrent />
      <main className="mx-auto max-w-6xl px-5 pt-27 pb-12 sm:px-8 sm:pt-32 lg:pb-16">
        <header className="mx-auto mb-7 max-w-xl text-center sm:mb-10">
          <div aria-hidden="true" className="mx-auto mb-4 flex h-16 w-13 items-center justify-center rounded-t-full border border-[#C6AF8D] bg-[#F1ECE2]">
            <img src="/logo-miller-small.webp" width={137} height={144} alt="" className="h-auto w-8" />
          </div>
          <h1 className="text-[clamp(3rem,8vw,5.25rem)] leading-none font-medium tracking-[-0.025em]">Menú del estudio</h1>
          <p className="mx-auto mt-3 max-w-[45ch] text-sm leading-relaxed text-[#5C534B] sm:text-base">
            Algo para disfrutar durante tu visita a Miller Greiseland Studio.
          </p>
          <nav aria-label="Secciones del menú" className="mt-3 flex justify-center gap-6 text-sm font-semibold text-[#42502E] md:hidden">
            <a className={textLink} href="#alimentos">Alimentos</a>
            <a className={textLink} href="#bebidas">Bebidas</a>
          </nav>
        </header>

        <div className="grid gap-8 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:items-start">
          <section id="alimentos" aria-labelledby="alimentos-title" className="scroll-mt-26 border-t-2 border-[#68794E] bg-[#EDEEE4] px-5 pt-5 pb-6 sm:px-8 sm:pt-7 sm:pb-8">
            <h2 id="alimentos-title" className="mb-5 text-4xl font-medium text-[#42502E] sm:mb-6">Alimentos</h2>
            <MenuEntries items={FOOD_MENU} />
          </section>
          <section id="bebidas" aria-labelledby="bebidas-title" className="scroll-mt-26 border-t-2 border-[#99745A] bg-[#F1ECE2] px-5 pt-5 pb-6 sm:px-8 sm:pt-7 sm:pb-8">
            <h2 id="bebidas-title" className="mb-5 text-4xl font-medium text-[#5C534B] sm:mb-6">Bebidas</h2>
            <MenuEntries items={DRINKS_MENU} />
          </section>
        </div>

        <footer className="mt-7 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 text-sm text-[#5C534B]">
          <p>Precios en pesos mexicanos (MXN).</p>
          <details className="text-[#42502E]">
            <summary className="min-h-11 cursor-pointer py-3 font-semibold focus-visible:outline-2 focus-visible:outline-offset-4">
              Ver carta impresa
            </summary>
            <ul className="pl-4">
              <li><a className={textLink} href="/images/menu/alimentos.png">Carta de alimentos <ArrowUpRight size={14} aria-hidden="true" /></a></li>
              <li><a className={textLink} href="/images/menu/bebidas.png">Carta de bebidas <ArrowUpRight size={14} aria-hidden="true" /></a></li>
            </ul>
          </details>
        </footer>
      </main>
    </div>
  );
}
