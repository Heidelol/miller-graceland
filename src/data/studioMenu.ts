export const STUDIO_MENU_PATH = '/menu';
export const STUDIO_MENU_CANONICAL = `https://millergreiseland.com${STUDIO_MENU_PATH}`;

export const STUDIO_MENU_SEO = {
  title: 'Menú de alimentos y bebidas | Miller Greiseland Studio',
  description: 'Consulta la carta de alimentos y bebidas para disfrutar durante tu visita a Miller Greiseland Studio en Chetumal.',
};

type MenuItem = {
  name: string;
  price: number;
  description?: string;
  recommended?: boolean;
  spicy?: boolean;
};

export const FOOD_MENU: readonly MenuItem[] = [
  {
    name: 'Bowl Spicy Piña',
    price: 220,
    recommended: true,
    spicy: true,
    description: 'Base de arroz jazmín o quinoa, pollo spicy, piña rostizada, pepino, zanahoria, edamame, aguacate y ajonjolí, acompañado de aderezo cremoso de sriracha.',
  },
  {
    name: 'Ensalada Glow',
    price: 210,
    description: 'Mix de hojas verdes, pera, queso de cabra, nuez caramelizada, arándanos y pollo a la plancha, acompañada de vinagreta balsámica.',
  },
  {
    name: 'Bagel Caprese Serrano',
    price: 200,
    description: 'Bagel tostado con jamón serrano, queso panela, tomates cherry marinados en vinagre balsámico y pesto de albahaca, espinaca fresca y reducción balsámica.',
  },
  {
    name: 'Sándwich Mediterráneo',
    price: 220,
    description: 'Pan de masa madre con pollo, queso mozzarella, pesto de albahaca, tomates rostizados, aceituna negra, mix de lechugas y un toque de reducción balsámica.',
  },
];

export const DRINKS_MENU: readonly MenuItem[] = [
  { name: 'Agua purificada 330 ml', price: 20 },
  { name: 'Frappuccino Mocha', price: 80, recommended: true },
  { name: 'Cappuccino', price: 45, recommended: true },
  { name: 'Café lungo', price: 35 },
  { name: 'Café americano', price: 30 },
  { name: 'Coca-Cola', price: 20 },
  { name: 'Coca-Cola Light', price: 25 },
];
