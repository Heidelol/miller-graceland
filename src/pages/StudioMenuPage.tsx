import { Navbar } from '../components/Navbar';
import { DRINKS_MENU, FOOD_MENU } from '../data/studioMenu';

const textLink = 'inline-flex min-h-11 items-center gap-2 underline decoration-[#99745A]/60 underline-offset-4 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4';

function MenuEntries({ items }: { items: typeof FOOD_MENU }) {
  return (
    <ul className="space-y-6">
      {items.map(({ name, price, description }) => (
        <li key={name}>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4">
            <h3 className="text-[1.375rem] leading-tight font-semibold sm:text-2xl">{name}</h3>
            <span className="text-sm font-medium tabular-nums text-[#5C534B]">${price}</span>
          </div>
          {description && <p className="mt-2 max-w-[48ch] text-sm leading-7 text-[#5C534B]">{description}</p>}
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
        <header className="mb-9 border-b border-[#99745A]/25 pb-7 sm:mb-12 sm:pb-10">
          <h1 className="text-[clamp(3rem,8vw,5.25rem)] leading-none font-medium tracking-[-0.025em]">Menú del estudio</h1>
          <p className="mt-4 max-w-[45ch] text-sm leading-relaxed text-[#5C534B] sm:text-base">
            Algo para disfrutar durante tu visita a Miller Greiseland Studio.
          </p>
          <nav aria-label="Secciones del menú" className="mt-3 flex gap-6 text-sm font-semibold text-[#42502E] md:hidden">
            <a className={textLink} href="#alimentos">Alimentos</a>
            <a className={textLink} href="#bebidas">Bebidas</a>
          </nav>
        </header>

        <div className="grid gap-12 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-start md:gap-14 lg:gap-20">
          <section id="alimentos" aria-labelledby="alimentos-title" className="scroll-mt-26">
            <h2 id="alimentos-title" className="mb-7 text-4xl font-normal italic text-[#42502E]">Alimentos</h2>
            <MenuEntries items={FOOD_MENU} />
          </section>
          <section id="bebidas" aria-labelledby="bebidas-title" className="scroll-mt-26 border-t border-[#99745A]/25 pt-7 md:border-t-0 md:border-l md:pt-0 md:pl-10 lg:pl-14">
            <h2 id="bebidas-title" className="mb-7 text-4xl font-normal italic text-[#80571F]">Bebidas</h2>
            <MenuEntries items={DRINKS_MENU} />
          </section>
        </div>

        <footer className="mt-10 border-t border-[#99745A]/25 pt-5 text-sm text-[#5C534B]">
          <p>Precios en pesos mexicanos (MXN).</p>
        </footer>
      </main>
    </div>
  );
}
