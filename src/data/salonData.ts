import type { ServiceItem, Stylist } from '../types/salon';

export const SALON_INFO = {
  name: 'Miller Greiseland',
  slogan: 'Alta Peluquería, Colorimetría de Autor & Cuidado Capilar',
  phone: '+52 55 8432 9910',
  whatsapp: '525584329910',
  address: 'Av. Presidente Masaryk 420, Polanco, CDMX',
  schedule: 'Lunes a Sábado: 9:00 AM – 8:00 PM | Domingo: Previa Cita',
  currency: 'MXN',
  instagram: '@millergreiseland',
};

export const SERVICES: ServiceItem[] = [
  // --- COLORIMETRÍA ---
  {
    id: 'balayage-signature',
    name: 'Balayage Signature Miller Greiseland',
    category: 'colorimetria',
    tagline: 'Difuminado artesanal con luminosidad tridimensional',
    description: 'Nuestra técnica insignia de degradado a mano alzada. Incluye diagnóstico capilar, decoloración con plex protector, matiz personalizado y nutrición selladora.',
    durationMinutes: 210,
    priceMXN: 3850,
    depositMXN: 500,
    popular: true,
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1000&q=80',
    includes: [
      'Diagnóstico capilar previo con microcámara',
      'Protector de enlaces Olaplex / Metal Detox',
      'Matiz tonalizador con brillo espejo',
      'Lavado sensorial y Brushing de pasarela'
    ]
  },
  {
    id: 'babylights-blonding',
    name: 'Babylights & Full Blonding',
    category: 'colorimetria',
    tagline: 'Micro-mechas ultra finas para rubios sublimes',
    description: 'Micro-reflejos de raíz a puntas diseñados para aportar máxima luminosidad con transiciones naturales sin líneas marcadas.',
    durationMinutes: 180,
    priceMXN: 3400,
    depositMXN: 500,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
    includes: [
      'Montaje de mechas ultra densas',
      'Tonalización personalizada de raíz y puntas',
      'Tratamiento de acidez para sellar cutícula',
      'Modelado y peinado final'
    ]
  },
  {
    id: 'correccion-color',
    name: 'Corrección de Color & Neutralización',
    category: 'colorimetria',
    tagline: 'Restauración de armonía cromática y rescate de tono',
    description: 'Servicio avanzado para retirar pigmentos no deseados, eliminar franjas desiguales o corregir trabajos previos no satisfactorios.',
    durationMinutes: 240,
    priceMXN: 4200,
    depositMXN: 600,
    image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=1000&q=80',
    includes: [
      'Test de mecha y análisis de resistencia',
      'Decapado o limpieza suave de color',
      'Repigmentación y matización de alta precisión',
      'Cocktail reconstructor de aminoácidos'
    ]
  },
  {
    id: 'gloss-bano-brillo',
    name: 'Gloss & Baño de Brillo Iluminador',
    category: 'colorimetria',
    tagline: 'Revitaliza tu color y aporta reflejos radiantes',
    description: 'Ideal entre sesiones de color o para dar un brillo espectacular y reflejos sin alterar la base natural.',
    durationMinutes: 60,
    priceMXN: 1350,
    depositMXN: 300,
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1000&q=80',
    includes: [
      'Fórmula ácida libre de amoníaco',
      'Reflejo de luz inmediato',
      'Sellado de brillo por hasta 6 semanas',
      'Brushing express'
    ]
  },

  // --- ESTILISTAS Y EXTENSIONES ---
  {
    id: 'extensiones-tape-in',
    name: 'Extensiones Tape-In Invisibles (Colocación)',
    category: 'extensiones',
    tagline: 'Largo y volumen ultraligero 100% natural',
    description: 'Colocación de extensiones adhesivas ultrafinas con cabello 100% natural Remy de grado premium. Totalmente discretas, cómodas y reutilizables.',
    durationMinutes: 120,
    priceMXN: 3600,
    depositMXN: 600,
    popular: true,
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1000&q=80',
    includes: [
      'Preparación de cabello y diseño de zonas de colocación',
      'Aplicación técnica invisible sin tensión',
      'Corte de integración y degradado',
      'Styling con ondas o alisado perfecto'
    ]
  },
  {
    id: 'extensiones-punto-queratina',
    name: 'Extensiones de Queratina / Punto Ruso',
    category: 'extensiones',
    tagline: 'Movimiento libre de 360° y máxima duración',
    description: 'Fijación mechón a mechón con micro-cápsulas de queratina vegetal, imperceptibles al tacto y aptas para peinados y recogidos altos.',
    durationMinutes: 180,
    priceMXN: 4800,
    depositMXN: 800,
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1000&q=80',
    includes: [
      'Micro-fijación con termo-fusión controlada',
      'Respeto total a la densidad de tu hebra natural',
      'Corte y pulido de integración',
      'Kit de cepillo especial para extensiones'
    ]
  },
  {
    id: 'mantenimiento-extensiones',
    name: 'Mantenimiento & Retiro / Re-ajuste de Extensiones',
    category: 'extensiones',
    tagline: 'Cuida tu inversión y mantén tu cabello impecable',
    description: 'Retiro cuidadoso sin maltratar tu cabello natural, limpieza profunda, cambio de adhesivos o queratinas y recolocación.',
    durationMinutes: 120,
    priceMXN: 1950,
    depositMXN: 400,
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1000&q=80',
    includes: [
      'Retiro con removedor orgánico hidratante',
      'Lavado detox de cuero cabelludo',
      'Re-encintado o re-encapsulado',
      'Recolocación y brushing'
    ]
  },
  {
    id: 'peinado-social-editorial',
    name: 'Peinado Social & Estilismo de Gala',
    category: 'extensiones',
    tagline: 'Recogidos, ondas al agua y looks de pasarela',
    description: 'Diseño de peinado exclusivo para bodas, galas y eventos sociales de alta categoría. Fijación duradera y acabado sedoso.',
    durationMinutes: 75,
    priceMXN: 1250,
    depositMXN: 300,
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&q=80',
    includes: [
      'Preparación de textura y volumen',
      'Fijación profesional resistente a la humedad',
      'Aplicación de accesorios o velo si aplica',
      'Toque final con sérum abrillantador'
    ]
  },

  // --- TRATAMIENTOS CAPILARES ---
  {
    id: 'botox-capilar-anti-frizz',
    name: 'Botox Capilar Rejuvenecedor & Anti-Frizz',
    category: 'tratamientos',
    tagline: 'Relleno de fibra capilar y suavidad de terciopelo',
    description: 'Terapia intensiva de colágeno, ácido hialurónico y extractos botánicos que devuelve elasticidad, brillo y elimina el encrespamiento hasta por 3 meses.',
    durationMinutes: 90,
    priceMXN: 2200,
    depositMXN: 400,
    popular: true,
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1000&q=80',
    includes: [
      'Lavado clarificante preparador',
      'Infusión térmica de activos botánicos termo-activos',
      'Sellado con placa de nano-titanio',
      'Finalizado con tacto seda'
    ]
  },
  {
    id: 'terapia-olaplex-molecular',
    name: 'Terapia Olaplex Molecular Rescue',
    category: 'tratamientos',
    tagline: 'Reconexión de enlaces disulfuro para cabello procesado',
    description: 'El tratamiento por excelencia para recuperar cabellos decolorados o quebradizos. Restaura la fuerza estructural desde el interior.',
    durationMinutes: 75,
    priceMXN: 1650,
    depositMXN: 300,
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1000&q=80',
    includes: [
      'Paso 1 Bond Multiplier concentrado',
      'Paso 2 Bond Perfector en húmedo',
      'Mascarilla rica en ceramidas y lípidos',
      'Brushing nutritivo'
    ]
  },
  {
    id: 'cauterizacion-sellado',
    name: 'Cauterización & Reconstrucción Térmica',
    category: 'tratamientos',
    tagline: 'Blindaje capilar contra la humedad y el desgaste',
    description: 'Cierra las cutículas abiertas gracias a la acción combinada de queratina hidrolizada y calor suave, dejando el cabello resistente y flexible.',
    durationMinutes: 90,
    priceMXN: 1950,
    depositMXN: 400,
    image: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=1000&q=80',
    includes: [
      'Aporte de proteína pura hidrolizada',
      'Cauterizado cuticular térmico',
      'Brillo cristalizado sin peso',
      'Styling protector'
    ]
  },

  // --- CORTES ---
  {
    id: 'corte-diseno-miller',
    name: 'Corte de Autor Miller Greiseland + Brushing',
    category: 'cortes',
    tagline: 'Diseño visagista adaptado a tus facciones',
    description: 'Corte personalizado basado en la textura de tu cabello, forma de rostro y estilo de vida. Incluye lavado relajante con aromaterapia y peinado profesional.',
    durationMinutes: 60,
    priceMXN: 850,
    depositMXN: 200,
    popular: true,
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=1000&q=80',
    includes: [
      'Estudio visagista de corte y caída',
      'Lavado de lujo con masaje capilar relajante',
      'Corte de precisión en húmedo y seco',
      'Brushing estilizado con ondas o liso pulido'
    ]
  },
  {
    id: 'despunte-precision',
    name: 'Despunte de Precisión & Sellado de Puntas',
    category: 'cortes',
    tagline: 'Mantenimiento del largo eliminando orzuela',
    description: 'Eliminamos milimétricamente las puntas abiertas y dañadas sin perder la longitud de tu cabello.',
    durationMinutes: 45,
    priceMXN: 600,
    depositMXN: 150,
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1000&q=80',
    includes: [
      'Corte milimétrico en capas o bloque',
      'Sérum sellador de puntas abiertas',
      'Peinado rápido con secadora'
    ]
  },
  {
    id: 'corte-capas-bob-frances',
    name: 'Corte Shag, French Bob & Capas Fluidas',
    category: 'cortes',
    tagline: 'Texturas contemporáneas con movimiento natural',
    description: 'Diseño para cabellos que buscan volumen, ligereza y un acabado desenfadado pero sumamente chic y moderno.',
    durationMinutes: 60,
    priceMXN: 950,
    depositMXN: 250,
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1000&q=80',
    includes: [
      'Técnica de navaja o tijera microdentada',
      'Texturizado estratégico de peso',
      'Secado al aire o con difusor/tenazas',
      'Spray de fijación flexible'
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
    specialties: ['Balayage Rubio Frío', 'Corrección de Color', 'Visagismo'],
    rating: 4.98,
    reviewsCount: 312
  },
  {
    id: 'st-carlos',
    name: 'Carlos Mendoza',
    role: 'Especialista Senior en Extensiones & Estilismo',
    experienceYears: 9,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    specialties: ['Extensiones Tape-in', 'Punto Invisible', 'Peinados de Alfombra Roja'],
    rating: 4.95,
    reviewsCount: 248
  },
  {
    id: 'st-camila',
    name: 'Camila Duarte',
    role: 'Terapeuta Capilar & Especialista en Cortes',
    experienceYears: 7,
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    specialties: ['Botox Capilar', 'French Bob', 'Recuperación de Rulos & Texturas'],
    rating: 4.97,
    reviewsCount: 189
  }
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Sofía Larrondo',
    service: 'Balayage Signature + Olaplex',
    rating: 5,
    comment: 'Llevaba años buscando un salón que lograra el rubio platinado exacto sin quemar mi cabello. Valeria y su equipo en Miller Greiseland hicieron magia pura. La experiencia con café y atención es de otro nivel.',
    date: 'Hace 3 días',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 't-2',
    name: 'Mariana Elizalde',
    service: 'Extensiones Tape-In & Brushing',
    rating: 5,
    comment: 'Las extensiones se sienten como mi propio pelo, cero dolor ni incomodidad. Pagué mi anticipo con Mercado Pago en segundos desde la página y todo estuvo listo al llegar. ¡100% recomendado!',
    date: 'Hace 1 semana',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 't-3',
    name: 'Regina Morales',
    service: 'Botox Capilar & Corte de Autor',
    rating: 5,
    comment: 'Mi cabello estaba opaco y con mucho frizz por la plancha. El botox lo dejó ultra sedoso con brillo espejo. El corte de autor enmarcó mis facciones perfecto. Ya tengo mi próxima cita agendada.',
    date: 'Hace 2 semanas',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80'
  }
];

export const FAQS = [
  {
    question: '¿Cómo funciona la reserva en línea y el pago con Mercado Pago?',
    answer: 'Eliges el servicio y estilista de tu preferencia, seleccionas fecha y horario, y puedes asegurar tu lugar con un anticipo desde $150 MXN o liquidar el 100% a través de Mercado Pago (tarjetas de crédito, débito, dinero en cuenta o efectivo en OXXO). Recibirás tu confirmación inmediata con tu código de cita.'
  },
  {
    question: '¿Qué pasa si necesito reprogramar o cancelar mi cita?',
    answer: 'Puedes reprogramar sin costo avisando con al menos 24 horas de anticipación a través de nuestro WhatsApp oficial. Tu anticipo quedará guardado para tu nueva fecha sin penalización.'
  },
  {
    question: '¿Hacen diagnóstico previo antes de un trabajo de colorimetría o extensiones?',
    answer: '¡Sí, siempre! Antes de iniciar cualquier proceso químico realizamos un diagnóstico capilar detallado (y test de mecha si es necesario) para asegurar que la salud y resistencia de tu fibra capilar estén garantizadas.'
  },
  {
    question: '¿Qué marcas y productos de cuidado utilizan en el salón?',
    answer: 'Trabajamos exclusivamente con casas profesionales de gama alta internacional como Kérastase, Olaplex, Redken, L’Oréal Professionnel e I.C.O.N., formulaciones con tecnologías de enlace molecular.'
  },
  {
    question: '¿Aceptan meses sin intereses a través de Mercado Pago?',
    answer: 'Sí, mediante la pasarela de Mercado Pago puedes diferir tu pago a 3 y 6 meses sin intereses con tarjetas de crédito participantes de bancos en México.'
  }
];
