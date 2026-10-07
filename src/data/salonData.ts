import type { ServiceItem, Stylist } from '../types/salon';

export const SALON_INFO = {
  name: 'Miller Greiseland Studio',
  tagline: 'COLOR · BLONDES · HAIR CARE · EXTENSIONS · SIGNATURE CUTS',
  heroSubtitle: 'Técnicas de autor en color, rubios de alta gama, extensiones y cortes visagistas para revelar la versión más sofisticada de tu estilo.',
  servicesIntro: 'Una experiencia de belleza diseñada para preservar la salud del cabello, perfeccionar el color y crear resultados personalizados.',
  manifesto: 'Cada servicio es diseñado de manera personalizada de acuerdo con la condición, historial químico, densidad, textura y necesidades de cada cabello. El resultado comienza con un cabello sano; el lujo está en cada detalle.',
  footerAbout: 'Estudio de alta peluquería en Polanco, Ciudad de México. Preservación de la fibra capilar, colorimetría y diseño de imagen a medida.',
  phone: '+52 55 8432 9910',
  whatsapp: '525584329910',
  address: 'Av. Presidente Masaryk 420, Polanco, CDMX',
  schedule: 'Lunes a Sábado: 9:00 AM – 8:00 PM | Domingo: Previa Cita',
  currency: 'MXN',
  instagram: '@millergreiseland',
};

export const SERVICES: ServiceItem[] = [
  // ==========================================
  // COLOR
  // ==========================================
  {
    id: 'retoque-color',
    name: 'Retoque de Color',
    category: 'color',
    tagline: 'Perfeccionamiento del crecimiento con hidratación personalizada',
    description: 'Perfeccionamiento del crecimiento con hidratación personalizada y preparación profesional de la fibra capilar. Finalizamos con protector térmico y estilizado para un cabello pulido, luminoso y perfectamente terminado.',
    durationMinutes: 90,
    priceMXN: 650,
    priceDisplay: 'Desde $650',
    depositMXN: 200,
    popular: true,
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1000&q=80',
    tiers: [
      { label: '1 cm', priceMXN: 650 },
      { label: '2 cm', priceMXN: 750 },
      { label: '3 cm', priceMXN: 850 },
      { label: '4 cm o más', priceMXN: 900 }
    ],
    includes: [
      'Perfeccionamiento del crecimiento (desde 1 cm)',
      'Hidratación personalizada de la fibra capilar',
      'Preparación profesional pre-color',
      'Protector térmico y estilizado pulido y luminoso'
    ]
  },
  {
    id: 'retoque-color-matiz',
    name: 'Retoque de Color + Matiz',
    category: 'color',
    tagline: 'Crecimiento de 1 a 2 cm con baño de matiz perlado',
    description: 'Retoque de crecimiento de 1 a 2 cm, seguido de un exclusivo baño de matiz sobre cabello húmedo. Ideal para mantener los tonos rubios luminosos, neutralizar reflejos amarillos y conseguir un acabado perlado, translúcido y sofisticado.',
    durationMinutes: 105,
    priceMXN: 850,
    priceDisplay: '$850',
    depositMXN: 250,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
    includes: [
      'Retoque de crecimiento de 1 a 2 cm',
      'Exclusivo baño de matiz sobre cabello húmedo',
      'Neutralización de reflejos amarillos (acabado perlado)',
      'Hidratación personalizada y preparación capilar',
      'Protección térmica y estilizado'
    ]
  },
  {
    id: 'color-completo',
    name: 'Color Completo',
    category: 'color',
    tagline: 'Renovación o transformación total de raíz a puntas',
    description: 'Aplicación de color de raíz a puntas para renovar, perfeccionar o transformar completamente el tono. Incluye hidratación personalizada, preparación de la fibra, protección térmica y estilizado.',
    durationMinutes: 120,
    priceMXN: 900,
    priceDisplay: '$900 — $1,600',
    depositMXN: 300,
    image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=1000&q=80',
    includes: [
      'Aplicación de color de raíz a puntas',
      'Renovación o transformación profunda del tono',
      'Hidratación personalizada de la fibra',
      'Preparación capilar y protección térmica',
      'Estilizado Signature final'
    ]
  },

  // ==========================================
  // SIGNATURE BLONDES
  // ==========================================
  {
    id: 'morena-iluminada',
    name: 'Morena Iluminada',
    category: 'blondes',
    tagline: 'Luz y dimensión diseñada para brunettes sin perder profundidad',
    description: 'Una creación de luz y dimensión diseñada para brunettes que desean luminosidad sin perder profundidad. Incluye Ritual K18 de protección molecular.',
    durationMinutes: 210,
    priceMXN: 2800,
    priceDisplay: '$2,800 — $3,800',
    depositMXN: 500,
    popular: true,
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1000&q=80',
    note: '*Tono base con costo adicional si aplica',
    includes: [
      'Ritual K18 de protección molecular',
      'Diseño de iluminación mediante decoloración',
      'Tono base (con costo adicional si aplica)',
      'Matiz personalizado',
      'Hidratación intensiva y preparación post-decoloración',
      'Protección térmica y Estilizado Signature'
    ]
  },
  {
    id: 'balayage-dorado',
    name: 'Balayage Dorado',
    category: 'blondes',
    tagline: 'Profundidad, movimiento y reflejos dorados de apariencia natural',
    description: 'Una interpretación cálida y luminosa del balayage, diseñada para crear profundidad, movimiento y reflejos dorados de apariencia natural. Respaldado por el Ritual K18.',
    durationMinutes: 210,
    priceMXN: 3000,
    priceDisplay: '$3,000 — $4,000',
    depositMXN: 500,
    popular: true,
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1000&q=80',
    note: '*Tono base con costo adicional si aplica',
    includes: [
      'Ritual K18 de protección molecular',
      'Diseño personalizado de balayage',
      'Decoloración estratégica controlada',
      'Tono base (con costo adicional si aplica)',
      'Matiz personalizado reflejos dorados',
      'Hidratación intensiva y preparación capilar',
      'Protección térmica y Estilizado Signature'
    ]
  },
  {
    id: 'balayage-rubio',
    name: 'Balayage Rubio',
    category: 'blondes',
    tagline: 'Rubios más luminosos y sofisticados con acabado multidimensional',
    description: 'Nuestra propuesta de rubios más luminosos y sofisticados, diseñada para crear una transición impecable y un acabado multidimensional de alta gama.',
    durationMinutes: 240,
    priceMXN: 3200,
    priceDisplay: '$3,200 — $4,200',
    depositMXN: 600,
    popular: true,
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1000&q=80',
    note: '*Tono base con costo adicional si aplica',
    includes: [
      'Ritual K18 de protección molecular',
      'Diseño personalizado de balayage de alta gama',
      'Decoloración estratégica de precisión',
      'Tratamiento Plex reparador de enlaces',
      'Tono base (con costo adicional si aplica)',
      'Matiz personalizado rubio sofisticado',
      'Hidratación intensiva post-aclaración',
      'Protección térmica y Estilizado Signature'
    ]
  },

  // ==========================================
  // EXTENSIONS
  // ==========================================
  {
    id: 'bajada-recolocacion-extensiones',
    name: 'Bajada + Recolocación de Extensiones ✨',
    category: 'extensions',
    tagline: '✨ La bajada de extensiones es GRATIS al adquirir este servicio',
    description: 'Nuestro servicio especializado de mantenimiento para extensiones incluye la bajada profesional y posterior recolocación, cuidando tanto el cabello natural como las extensiones para conservar su apariencia, movimiento y acabado impecable.',
    durationMinutes: 180,
    priceMXN: 2500,
    priceDisplay: 'Desde $2,500',
    depositMXN: 500,
    popular: true,
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1000&q=80',
    note: '✨ La bajada de extensiones es GRATIS al adquirir el servicio de recolocación. El precio final puede determinarse de acuerdo con la cantidad de cabello y extensiones a trabajar.',
    tiers: [
      { label: '100 g o menos', priceMXN: 2500 },
      { label: '150 — 200 g', priceMXN: 2800 },
      { label: '200 g en adelante', priceMXN: 3200 }
    ],
    includes: [
      'Bajada profesional de extensiones (GRATIS incluida)',
      'Recolocación especializada cuidando el cabello natural',
      'Conservación de apariencia y movimiento impecable',
      'Ajuste milimétrico según gramaje de extensiones'
    ]
  },
  {
    id: 'bajada-extensiones',
    name: 'Bajada de Extensiones ✨',
    category: 'extensions',
    tagline: 'Retiro profesional priorizando la integridad del cabello',
    description: 'Retiro profesional y cuidadoso de las extensiones, priorizando la integridad del cabello natural y de las propias extensiones para futuras aplicaciones.',
    durationMinutes: 60,
    priceMXN: 850,
    priceDisplay: '$850 — $1,000',
    depositMXN: 250,
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&q=80',
    includes: [
      'Retiro profesional y cuidadoso mechón a mechón',
      'Prioridad absoluta en la integridad del cabello natural',
      'Protección y conservación de las extensiones'
    ]
  },
  {
    id: 'hair-wash-extensions',
    name: 'Hair Wash + Extensions',
    category: 'extensions',
    tagline: 'Ritual de limpieza e hidratación para extensiones',
    description: 'Un ritual de limpieza e hidratación especialmente diseñado para cabello con extensiones. Para mantenerlas limpias, suaves, luminosas y perfectamente integradas al cabello natural.',
    durationMinutes: 50,
    priceMXN: 600,
    priceDisplay: '$600',
    depositMXN: 200,
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1000&q=80',
    includes: [
      'Lavado profesional especializado para extensiones',
      'Hidratación personalizada de medios a puntas',
      'Preparación de la fibra capilar',
      'Protección térmica',
      'Secado y estilizado'
    ]
  },

  // ==========================================
  // SIGNATURE CUTS
  // ==========================================
  {
    id: 'corte-signature',
    name: 'Corte Signature',
    category: 'cuts',
    tagline: 'Asesoría cosmética, visagismo y corte de diseño',
    description: 'Una experiencia de corte completamente personalizada. Comenzamos con una asesoría capilar cosmética, analizando las características del cabello y cuero cabelludo para crear una rutina de cuidado personalizada. También estudiamos rostro, facciones, proporciones y movimiento natural del cabello para seleccionar el corte que mejor armonice con cada clienta.',
    durationMinutes: 60,
    priceMXN: 450,
    priceDisplay: '$450 — $600',
    depositMXN: 150,
    popular: true,
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=1000&q=80',
    includes: [
      'Asesoría capilar cosmética personalizada',
      'Estudio visagista de rostro, proporciones y movimiento',
      'Lavado sensorial',
      'Hidratación y preparación capilar',
      'Corte en seco y perfeccionamiento de puntas',
      'Estilizado Signature',
      'Recomendación de Hair Care para casa'
    ]
  },
  {
    id: 'gentlemens-cut',
    name: 'Gentlemen’s Cut',
    category: 'cuts',
    tagline: 'Corte de precisión y apariencia perfectamente cuidada',
    description: 'Un servicio diseñado para mantener un corte impecable y una apariencia perfectamente cuidada con hidratación profunda.',
    durationMinutes: 45,
    priceMXN: 350,
    priceDisplay: '$350',
    depositMXN: 100,
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1000&q=80',
    includes: [
      'Lavado revitalizante',
      'Hidratación profunda',
      'Corte personalizado de precisión',
      'Secado',
      'Estilizado profesional'
    ]
  }
];

export const STYLISTS: Stylist[] = [
  {
    id: 'st-valeria',
    name: 'Valeria Miller',
    role: 'Directora Creativa & Master Colorist',
    experienceYears: 12,
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    specialties: ['Balayage Rubio', 'Morena Iluminada', 'Ritual K18'],
    rating: 4.98,
    reviewsCount: 312
  },
  {
    id: 'st-carlos',
    name: 'Carlos Mendoza',
    role: 'Especialista Senior en Extensiones & Estilismo',
    experienceYears: 9,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    specialties: ['Bajada y Recolocación', 'Hair Wash + Extensions', 'Estilizado Signature'],
    rating: 4.95,
    reviewsCount: 248
  },
  {
    id: 'st-camila',
    name: 'Camila Duarte',
    role: 'Terapeuta Capilar & Especialista en Cortes',
    experienceYears: 7,
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    specialties: ['Corte Signature Visagista', 'Retoque de Color', 'Gentlemen’s Cut'],
    rating: 4.97,
    reviewsCount: 189
  }
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Sofía Larrondo',
    service: 'Balayage Rubio + Ritual K18',
    rating: 5,
    comment: 'El Ritual K18 hizo toda la diferencia: mi cabello quedó súper suave y con un rubio perlado impecable. La atención en el estudio es una experiencia de puro lujo.',
    date: 'Hace 3 días',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 't-2',
    name: 'Mariana Elizalde',
    service: 'Bajada + Recolocación de Extensiones',
    rating: 5,
    comment: 'Aproveché la bajada gratis con la recolocación y el resultado fue perfecto. Cuidaron mi cabello natural y las extensiones se sienten como mías. Todo pagado seguro por Mercado Pago.',
    date: 'Hace 1 semana',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 't-3',
    name: 'Regina Morales',
    service: 'Corte Signature & Morena Iluminada',
    rating: 5,
    comment: 'El estudio visagista previo al corte fue algo que nunca me habían hecho. El corte enmarcó mis facciones perfecto y los reflejos iluminados lucen ultra naturales.',
    date: 'Hace 2 semanas',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80'
  }
];

export const FAQS = [
  {
    question: '¿Cómo funciona la reserva en línea y el anticipo con Mercado Pago?',
    answer: 'Eliges el servicio en nuestro catálogo, seleccionas fecha y horario, y puedes asegurar tu lugar con un anticipo accesible o liquidar el 100% mediante Mercado Pago (tarjetas de crédito, débito, transferencia o efectivo en OXXO). Recibirás tu confirmación inmediata con tu código de cita.'
  },
  {
    question: '¿Qué es el Ritual K18 incluido en los servicios de Signature Blondes?',
    answer: 'Es una biotecnología molecular patentada que reconecta las cadenas de polipéptidos rotas en la fibra capilar durante la decoloración, restaurando la fuerza, elasticidad y suavidad original del cabello.'
  },
  {
    question: '¿La bajada de extensiones es realmente gratis?',
    answer: '¡Sí! Al adquirir el servicio de Bajada + Recolocación de Extensiones, el retiro previo no tiene costo adicional. El precio se ajusta de acuerdo con los gramos de cabello (100g, 150-200g o más).'
  },
  {
    question: '¿Qué incluye la asesoría visagista en el Corte Signature?',
    answer: 'Analizamos las facciones de tu rostro, proporciones corporales, textura y caída natural del cabello, además de evaluar la salud cosmética de tu fibra para diseñar el corte más favorecedor y recomendarte una rutina de cuidado en casa.'
  },
  {
    question: '¿Qué pasa si necesito reprogramar mi cita?',
    answer: 'Puedes reprogramar sin penalización avisando con al menos 24 horas de anticipación a través de nuestro WhatsApp oficial. Tu anticipo quedará guardado para tu nueva fecha.'
  }
];
