import { Sticker, SecretariaGroup, StickerRarity } from '../types';

export const SECRETARIAS_DATA: SecretariaGroup[] = [
  {
    id: 'prensa-difusion',
    name: 'Secretaría de Prensa y Difusión',
    shortName: 'Prensa y Difusión',
    iconName: 'Megaphone',
    description: 'Comunicación activa, redes sociales, cartelería y difusión transparente de todas las novedades del Centro de Estudiantes.',
    color: 'from-blue-600 to-cyan-700',
    members: [
      {
        name: 'Angelina Vercellone',
        role: 'Secretaria de Prensa y Difusión',
        stickerNumber: 3,
        position: 'Ataque y Difusión'
      },
      {
        name: 'Amparo Aranda',
        role: 'Secretaria de Prensa y Difusión',
        stickerNumber: 4,
        position: 'Ataque y Difusión'
      }
    ]
  },
  {
    id: 'deportes',
    name: 'Secretaría de Deportes',
    shortName: 'Deportes',
    iconName: 'Trophy',
    description: 'Organización de torneos intercursos, mantenimiento y mejora del equipamiento deportivo escolar.',
    color: 'from-emerald-600 to-teal-700',
    members: [
      {
        name: 'Tamara Luna',
        role: 'Secretaria de Deportes',
        stickerNumber: 5,
        position: 'Mediocampo y Torneos'
      },
      {
        name: 'Salvador Grumelli',
        role: 'Secretario de Deportes',
        stickerNumber: 6,
        position: 'Delantero y Torneos'
      }
    ]
  },
  {
    id: 'finanzas',
    name: 'Secretaría de Finanzas',
    shortName: 'Finanzas',
    iconName: 'Coins',
    description: 'Administración responsable, gestión de fondos y presupuesto informativo transparente para toda la comunidad.',
    color: 'from-amber-600 to-yellow-700',
    members: [
      {
        name: 'Lautaro Pivetta',
        role: 'Secretario de Finanzas',
        stickerNumber: 7,
        position: 'Líbero de Finanzas'
      },
      {
        name: 'Felipe Buffa',
        role: 'Secretario de Finanzas',
        stickerNumber: 8,
        position: 'Defensa y Gestión'
      }
    ]
  },
  {
    id: 'actas',
    name: 'Secretaría de Actas',
    shortName: 'Actas',
    iconName: 'FileText',
    description: 'Registro formal de asambleas, actas de reuniones y seguimiento ordenado de compromisos y resoluciones.',
    color: 'from-indigo-600 to-blue-700',
    members: [
      {
        name: 'Dana Ferreyra',
        role: 'Secretaria de Actas',
        stickerNumber: 9,
        position: 'Organización y Registro'
      },
      {
        name: 'Luna Perren',
        role: 'Secretaria de Actas',
        stickerNumber: 10,
        position: 'Organización y Registro'
      }
    ]
  },
  {
    id: 'cultura-rrhh',
    name: 'Secretaría de Cultura y Recursos Humanos',
    shortName: 'Cultura y RRHH',
    iconName: 'Users',
    description: 'Fomento del arte, música, ferias culturales, integración estudiantil y acompañamiento entre compañeros.',
    color: 'from-purple-600 to-pink-700',
    members: [
      {
        name: 'Lucia Barzola',
        role: 'Secretaria de Cultura y RRHH',
        stickerNumber: 11,
        position: 'Enganche Cultural'
      },
      {
        name: 'Ernestina Sánchez',
        role: 'Secretaria de Cultura y RRHH',
        stickerNumber: 12,
        position: 'Creatividad y Vínculos'
      }
    ]
  },
  {
    id: 'recreacion',
    name: 'Secretaría de Recreación',
    shortName: 'Recreación',
    iconName: 'Smile',
    description: 'Propuestas lúdicas, juegos en horas libres y recreos, festejos de primavera y momentos de encuentro.',
    color: 'from-rose-600 to-red-700',
    members: [
      {
        name: 'Camilo Iturrusgaray',
        role: 'Secretario de Recreación',
        stickerNumber: 13,
        position: 'Animación y Juegos'
      },
      {
        name: 'Clara De Oliveira',
        role: 'Secretaria de Recreación',
        stickerNumber: 14,
        position: 'Dinámicas y Convivencia'
      }
    ]
  }
];

const RAW_STICKERS: Sticker[] = [
  // 00. ESCUDO OFICIAL (COMÚN)
  {
    id: 'st-00',
    number: 0,
    type: 'especial',
    rarity: 'common',
    title: 'Escudo La Scaloneta',
    subtitle: 'Centro de Estudiantes 2026',
    role: 'Emblema Oficial',
    category: 'Oficial',
    secretariaName: 'Centro de Estudiantes',
    description: 'El escudo oficial de la lista La Scaloneta. Tres estrellas doradas, sol de mayo y los colores patrios.',
    whatWeSeek: 'Unir a toda la comunidad estudiantil con compromiso, alegría y gestión transparente.',
    position: 'Emblema Principal',
    image: '/images/scaloneta-shield.svg',
    numberTag: '00',
    tags: ['Oficial', 'La Scaloneta', 'Emblema']
  },

  // 01. SANTINO MONDINO (LEGENDARIA)
  {
    id: 'st-01',
    number: 1,
    type: 'player',
    rarity: 'legendary',
    title: 'Santino Mondino',
    subtitle: 'Presidente de la Lista',
    role: 'Presidente',
    category: 'Liderazgo',
    secretariaName: 'Presidencia',
    description: 'Capitán de La Scaloneta. Liderazgo comprometido, gestión cercana y representación de cada estudiante.',
    whatWeSeek: 'Construir un Centro de Estudiantes activo, abierto y representativo de cada curso de la escuela.',
    position: 'Capitán del Equipo',
    image: '/images/players/santino-mondino.jpg',
    numberTag: '10',
    tags: ['Presidente', 'Capitán', 'Liderazgo']
  },

  // 02. HELENA VERCELLONE (LEGENDARIA)
  {
    id: 'st-02',
    number: 2,
    type: 'player',
    rarity: 'legendary',
    title: 'Helena Vercellone',
    subtitle: 'Vicepresidenta de la Lista',
    role: 'Vicepresidenta',
    category: 'Liderazgo',
    secretariaName: 'Vicepresidencia',
    description: 'Subcapitana y estratega de La Scaloneta. Coordinación general de secretarías y articulación de proyectos.',
    whatWeSeek: 'Asegurar que cada propuesta se planifique, se ejecute y llegue con éxito a todos los compañeros.',
    position: 'Subcapitana y Estrategia',
    image: '/images/players/helena-vercellone.jpg',
    numberTag: '07',
    tags: ['Vicepresidenta', 'Estrategia', 'Coordinación']
  },

  // 03. ANGELINA VERCELLONE (ÉPICA)
  {
    id: 'st-03',
    number: 3,
    type: 'player',
    rarity: 'epic',
    title: 'Angelina Vercellone',
    subtitle: 'Secretaría de Prensa y Difusión',
    role: 'Secretaria de Prensa y Difusión',
    category: 'Secretarías',
    secretariaName: 'Secretaría de Prensa y Difusión',
    description: 'Integrante de Prensa y Difusión. Cobertura de eventos escolares, fotografía y presencia en redes.',
    whatWeSeek: 'Mostrar el día a día de la escuela y dar voz a las iniciativas de todos los cursos.',
    position: 'Ataque y Difusión',
    image: '/images/players/angelina-vercellone.jpg',
    numberTag: '11',
    tags: ['Prensa', 'Fotografía']
  },

  // 04. AMPARO ARANDA (ÉPICA)
  {
    id: 'st-04',
    number: 4,
    type: 'player',
    rarity: 'epic',
    title: 'Amparo Aranda',
    subtitle: 'Secretaría de Prensa y Difusión',
    role: 'Secretaria de Prensa y Difusión',
    category: 'Secretarías',
    secretariaName: 'Secretaría de Prensa y Difusión',
    description: 'Integrante de Prensa y Difusión. Cartelería informativa, avisos rápidos y comunicación visual clara.',
    whatWeSeek: 'Garantizar que toda la información escolar llegue a tiempo a cada aula.',
    position: 'Ataque y Difusión',
    image: '/images/players/amparo-aranda.jpg',
    numberTag: '08',
    tags: ['Prensa', 'Comunicación']
  },

  // 05. TAMARA LUNA (ÉPICA)
  {
    id: 'st-05',
    number: 5,
    type: 'player',
    rarity: 'epic',
    title: 'Tamara Luna',
    subtitle: 'Secretaría de Deportes',
    role: 'Secretaria de Deportes',
    category: 'Secretarías',
    secretariaName: 'Secretaría de Deportes',
    description: 'Integrante de Deportes. Organización de torneos intercursos, espíritu de equipo y vida sana.',
    whatWeSeek: 'Fomentar la participación deportiva inclusiva para todos los niveles escolares.',
    position: 'Mediocampo y Torneos',
    image: '/images/players/tamara-luna.jpg',
    numberTag: '05',
    tags: ['Deportes', 'Torneos']
  },

  // 06. SALVADOR GRUMELLI (ÉPICA)
  {
    id: 'st-06',
    number: 6,
    type: 'player',
    rarity: 'epic',
    title: 'Salvador Grumelli',
    subtitle: 'Secretaría de Deportes',
    role: 'Secretario de Deportes',
    category: 'Secretarías',
    secretariaName: 'Secretaría de Deportes',
    description: 'Integrante de Deportes. Coordinación de canchas, insumos deportivos y arbitrajes escolares.',
    whatWeSeek: 'Garantizar pelotas, redes y espacios deportivos en óptimas condiciones.',
    position: 'Delantero y Torneos',
    image: '/images/players/salvador-grumelli.jpg',
    numberTag: '09',
    tags: ['Deportes', 'Equipamiento']
  },

  // 07. LAUTARO PIVETTA (ÉPICA)
  {
    id: 'st-07',
    number: 7,
    type: 'player',
    rarity: 'epic',
    title: 'Lautaro Pivetta',
    subtitle: 'Secretaría de Finanzas',
    role: 'Secretario de Finanzas',
    category: 'Secretarías',
    secretariaName: 'Secretaría de Finanzas',
    description: 'Integrante de Finanzas. Gestión presupuestaria, rendición de cuentas e informes transparentes.',
    whatWeSeek: 'Administrar los recursos con absoluta claridad y control para financiar mejoras escolares.',
    position: 'Líbero de Finanzas',
    image: '/images/players/lautaro-pivetta.jpg',
    numberTag: '04',
    tags: ['Finanzas', 'Transparencia']
  },

  // 08. FELIPE BUFFA (ÉPICA)
  {
    id: 'st-08',
    number: 8,
    type: 'player',
    rarity: 'epic',
    title: 'Felipe Buffa',
    subtitle: 'Secretaría de Finanzas',
    role: 'Secretario de Finanzas',
    category: 'Secretarías',
    secretariaName: 'Secretaría de Finanzas',
    description: 'Integrante de la Secretaría de Finanzas. Planificación económica y presupuesto abierto.',
    whatWeSeek: 'Optimizar cada fondo recaudado en eventos y cantinas en beneficio de todos los estudiantes.',
    position: 'Defensa y Gestión',
    image: '/images/players/felipe-buffa.jpg',
    numberTag: '02',
    tags: ['Finanzas', 'Presupuesto']
  },

  // 09. DANA FERREYRA (ÉPICA)
  {
    id: 'st-09',
    number: 9,
    type: 'player',
    rarity: 'epic',
    title: 'Dana Ferreyra',
    subtitle: 'Secretaría de Actas',
    role: 'Secretaria de Actas',
    category: 'Secretarías',
    secretariaName: 'Secretaría de Actas',
    description: 'Integrante de la Secretaría de Actas. Documentación formal de asambleas y proyectos.',
    whatWeSeek: 'Asegurar que cada debate y decisión estudiantil quede registrado con precisión.',
    position: 'Organización y Registro',
    image: '/images/players/dana-ferreyra.jpg',
    numberTag: '03',
    tags: ['Actas', 'Gestión']
  },

  // 10. LUNA PERREN (ÉPICA)
  {
    id: 'st-10',
    number: 10,
    type: 'player',
    rarity: 'epic',
    title: 'Luna Perren',
    subtitle: 'Secretaría de Actas',
    role: 'Secretaria de Actas',
    category: 'Secretarías',
    secretariaName: 'Secretaría de Actas',
    description: 'Integrante de la Secretaría de Actas. Archivo y seguimiento de solicitudes de los cursos.',
    whatWeSeek: 'Mantener un canal formal para canalizar peticiones y propuestas de los delegados.',
    position: 'Organización y Registro',
    image: '/images/players/luna-perren.jpg',
    numberTag: '06',
    tags: ['Actas', 'Archivo']
  },

  // 11. LUCIA BARZOLA (ÉPICA)
  {
    id: 'st-11',
    number: 11,
    type: 'player',
    rarity: 'epic',
    title: 'Lucia Barzola',
    subtitle: 'Secretaría de Cultura y Recursos Humanos',
    role: 'Secretaria de Cultura y RRHH',
    category: 'Secretarías',
    secretariaName: 'Secretaría de Cultura y Recursos Humanos',
    description: 'Integrante de Cultura y RRHH. Expresión artística, ferias y ambiente escolar positivo.',
    whatWeSeek: 'Generar espacios de encuentro cultural y cuidar el bienestar y la convivencia en la escuela.',
    position: 'Enganche Cultural',
    image: '/images/players/lucia-barzola.jpg',
    numberTag: '14',
    tags: ['Cultura', 'Recursos Humanos']
  },

  // 12. ERNESTINA SÁNCHEZ (ÉPICA)
  {
    id: 'st-12',
    number: 12,
    type: 'player',
    rarity: 'epic',
    title: 'Ernestina Sánchez',
    subtitle: 'Secretaría de Cultura y Recursos Humanos',
    role: 'Secretaria de Cultura y RRHH',
    category: 'Secretarías',
    secretariaName: 'Secretaría de Cultura y Recursos Humanos',
    description: 'Integrante de Cultura y RRHH. Proyectos colaborativos y mediación estudiantil.',
    whatWeSeek: 'Fomentar la solidaridad, la creatividad y la escucha activa entre todos los cursos.',
    position: 'Creatividad y Vínculos',
    image: '/images/players/ernestina-sanchez.jpg',
    numberTag: '15',
    tags: ['Cultura', 'Recursos Humanos']
  },

  // 13. CAMILO ITURRUSGARAY (ÉPICA)
  {
    id: 'st-13',
    number: 13,
    type: 'player',
    rarity: 'epic',
    title: 'Camilo Iturrusgaray',
    subtitle: 'Secretaría de Recreación',
    role: 'Secretario de Recreación',
    category: 'Secretarías',
    secretariaName: 'Secretaría de Recreación',
    description: 'Integrante de la Secretaría de Recreación. Juegos en recreos, dinámicas e integración.',
    whatWeSeek: 'Transformar los recreos y horas libres en momentos entretenidos y compartidos.',
    position: 'Animación y Juegos',
    image: '/images/players/camilo-iturrusgaray.jpg',
    numberTag: '16',
    tags: ['Recreación', 'Juegos']
  },

  // 14. CLARA DE OLIVEIRA (ÉPICA)
  {
    id: 'st-14',
    number: 14,
    type: 'player',
    rarity: 'epic',
    title: 'Clara De Oliveira',
    subtitle: 'Secretaría de Recreación',
    role: 'Secretaria de Recreación',
    category: 'Secretarías',
    secretariaName: 'Secretaría de Recreación',
    description: 'Integrante de la Secretaría de Recreación. Organización de convivencias y festejos.',
    whatWeSeek: 'Planificar actividades lúdicas que integren desde primer año hasta el último año.',
    position: 'Dinámicas y Convivencia',
    image: '/images/players/clara-de-oliveira.jpg',
    numberTag: '17',
    tags: ['Recreación', 'Convivencia']
  },

  // =========================================================================
  // --- PROPUESTAS OFICIALES DEL CENTRO DE ESTUDIANTES (RARAS: 15 a 44) ---
  // =========================================================================

  // --- 1. EDUCACIÓN Y APOYO ACADÉMICO ---
  {
    id: 'st-15',
    number: 15,
    type: 'propuesta',
    rarity: 'rare',
    title: 'Calculadoras a disposición de los estudiantes',
    subtitle: 'Educación y Apoyo Académico',
    category: 'Educación y Apoyo Académico',
    description: 'Calculadoras a disposición de los estudiantes.',
    whatWeSeek: 'Sistema de préstamo de calculadoras para que ningún estudiante se quede sin herramienta en clases de matemática, física, química o evaluaciones.',
    position: 'Herramientas de Estudio',
    numberTag: 'P01',
    tags: ['Educación', 'Herramientas', 'Estudio']
  },
  {
    id: 'st-16',
    number: 16,
    type: 'propuesta',
    rarity: 'rare',
    title: 'Informar días y fechas especiales a través de folletos y hojas informativas',
    subtitle: 'Educación y Apoyo Académico',
    category: 'Educación y Apoyo Académico',
    description: 'Informar días y fechas especiales a través de folletos y hojas informativas.',
    whatWeSeek: 'Difusión constante de efemérides, feriados, fechas de exámenes y avisos escolares clave mediante folletería impresa y cartelería en cada curso.',
    position: 'Comunicación Escolar',
    numberTag: 'P02',
    tags: ['Educación', 'Información', 'Fechas']
  },
  {
    id: 'st-17',
    number: 17,
    type: 'propuesta',
    rarity: 'rare',
    title: 'Calendario anual de actividades organizadas por el centro.',
    subtitle: 'Educación y Apoyo Académico',
    category: 'Educación y Apoyo Académico',
    description: 'Calendario anual de actividades organizadas por el centro.',
    whatWeSeek: 'Cronograma compartido y visible desde principio de año con todas las fechas de torneos, ferias, festejos y asambleas estudiantiles.',
    position: 'Planificación Estratégica',
    numberTag: 'P03',
    tags: ['Educación', 'Calendario', 'Centro']
  },
  {
    id: 'st-18',
    number: 18,
    type: 'propuesta',
    rarity: 'rare',
    title: 'Lectura con libros a disposición en el recreo',
    subtitle: 'Educación y Apoyo Académico',
    category: 'Educación y Apoyo Académico',
    description: 'Lectura con libros a disposición en el recreo.',
    whatWeSeek: 'Rincones con libros y lecturas variadas en los patios y espacios comunes para disfrutar libremente durante los recreos.',
    position: 'Espacio de Lectura',
    numberTag: 'P04',
    tags: ['Educación', 'Lectura', 'Libros']
  },

  // --- 2. EVENTOS Y CONVIVENCIAS ---
  {
    id: 'st-19',
    number: 19,
    type: 'propuesta',
    rarity: 'rare',
    title: 'Fiesta de la primavera',
    subtitle: 'Eventos y Convivencias',
    category: 'Eventos y Convivencias',
    description: 'Fiesta de la primavera.',
    whatWeSeek: 'Festejo del Día del Estudiante y la Primavera con música, juegos temáticos, dinámicas recreativas y convivencia de toda la escuela.',
    position: 'Festejo Estudiantil',
    numberTag: 'P05',
    tags: ['Eventos', 'Primavera', 'Celebración']
  },
  {
    id: 'st-20',
    number: 20,
    type: 'propuesta',
    rarity: 'rare',
    title: 'Fiesta de fin de año',
    subtitle: 'Eventos y Convivencias',
    category: 'Eventos y Convivencias',
    description: 'Fiesta de fin de año.',
    whatWeSeek: 'Jornada especial de cierre del ciclo lectivo para despedir el año juntos con actividades compartidas y reconocimientos.',
    position: 'Cierre de Ciclo',
    numberTag: 'P06',
    tags: ['Eventos', 'Fin de Año', 'Integración']
  },
  {
    id: 'st-21',
    number: 21,
    type: 'propuesta',
    rarity: 'rare',
    title: 'Colaboración en actos escolares',
    subtitle: 'Eventos y Convivencias',
    category: 'Eventos y Convivencias',
    description: 'Colaboración en actos escolares.',
    whatWeSeek: 'Participación y asistencia del Centro de Estudiantes en el armado de sonido, logística y números artísticos de cada acto patrio e institucional.',
    position: 'Actos Institucionales',
    numberTag: 'P07',
    tags: ['Eventos', 'Actos', 'Colaboración']
  },
  {
    id: 'st-22',
    number: 22,
    type: 'propuesta',
    rarity: 'rare',
    title: 'Feria de la tradición en recreos',
    subtitle: 'Eventos y Convivencias',
    category: 'Eventos y Convivencias',
    description: 'Feria de la tradición en recreos.',
    whatWeSeek: 'Semana de la Tradición en los recreos con comidas típicas, folklore, música popular y actividades gauchescas compartidas.',
    position: 'Tradición Nacional',
    numberTag: 'P08',
    tags: ['Eventos', 'Tradición', 'Cultura']
  },
  {
    id: 'st-23',
    number: 23,
    type: 'propuesta',
    rarity: 'rare',
    title: 'Feria de libros y venta de uniformes',
    subtitle: 'Eventos y Convivencias',
    category: 'Eventos y Convivencias',
    description: 'Feria de libros y venta de uniformes.',
    whatWeSeek: 'Espacio de intercambio solidario y venta a precios accesibles de uniformes usados en buen estado, novelas y libros de texto escolares.',
    position: 'Economía Solidaria',
    numberTag: 'P09',
    tags: ['Eventos', 'Feria', 'Uniformes', 'Libros']
  },
  {
    id: 'st-24',
    number: 24,
    type: 'propuesta',
    rarity: 'rare',
    title: 'Calendario de fechas especiales',
    subtitle: 'Eventos y Convivencias',
    category: 'Eventos y Convivencias',
    description: 'Calendario de fechas especiales.',
    whatWeSeek: 'Cartelera visible con el registro de cumpleaños, semanas conmemorativas y celebraciones especiales del colegio.',
    position: 'Seguimiento de Fechas',
    numberTag: 'P10',
    tags: ['Eventos', 'Fechas Especiales']
  },
  {
    id: 'st-25',
    number: 25,
    type: 'propuesta',
    rarity: 'rare',
    title: 'Reloj y/o aromatizadores en cursos',
    subtitle: 'Eventos y Convivencias',
    category: 'Eventos y Convivencias',
    description: 'Reloj y/o aromatizadores en cursos.',
    whatWeSeek: 'Instalación de relojes de pared en las aulas y aromatizadores para lograr un ambiente diario más agradable, fresco y ordenado en los cursos.',
    position: 'Confort en el Aula',
    numberTag: 'P11',
    tags: ['Convivencia', 'Aulas', 'Confort']
  },
  {
    id: 'st-26',
    number: 26,
    type: 'propuesta',
    rarity: 'rare',
    title: 'MENU (Modelo de Naciones Unidas)',
    subtitle: 'Eventos y Convivencias',
    category: 'Eventos y Convivencias',
    description: 'MENU: Modelo de Naciones Unidas (La ONU).',
    whatWeSeek: 'Participación y preparación de delegaciones estudiantiles en el Modelo de Naciones Unidas (ONU), desarrollando debate diplomático, oratoria, liderazgo y representación de países.',
    position: 'Debate Diplomático (ONU)',
    numberTag: 'P12',
    tags: ['Eventos', 'ONU', 'Debate', 'Diplomacia']
  },
  {
    id: 'st-27',
    number: 27,
    type: 'propuesta',
    rarity: 'rare',
    title: 'Feria cultural',
    subtitle: 'Eventos y Convivencias',
    category: 'Eventos y Convivencias',
    description: 'Feria cultural.',
    whatWeSeek: 'Jornada escolar con stands artísticos, exposiciones de proyectos de los cursos, música en vivo y muestras de talentos.',
    position: 'Muestra Cultural',
    numberTag: 'P13',
    tags: ['Eventos', 'Feria', 'Cultura']
  },

  // --- 3. DEPORTES Y RECREACIONES ---
  {
    id: 'st-28',
    number: 28,
    type: 'propuesta',
    rarity: 'rare',
    title: 'Mundialitos intercursos',
    subtitle: 'Deportes y Recreaciones',
    category: 'Deportes y Recreaciones',
    description: 'Mundialitos intercursos.',
    whatWeSeek: 'Torneos deportivos intercursos organizados con fixture oficial, arbitraje estudiantil y premiación para disfrutar del deporte en equipo.',
    position: 'Torneos Deportivos',
    numberTag: 'P14',
    tags: ['Deportes', 'Mundialitos', 'Intercursos']
  },
  {
    id: 'st-29',
    number: 29,
    type: 'propuesta',
    rarity: 'rare',
    title: 'Ping pong (arreglarla)',
    subtitle: 'Deportes y Recreaciones',
    category: 'Deportes y Recreaciones',
    description: 'Ping pong (arreglarla).',
    whatWeSeek: 'Reparación y puesta a punto de la mesa de ping pong escolar, sumando paletas y pelotitas disponibles para los recreos.',
    position: 'Espacio Ping Pong',
    numberTag: 'P15',
    tags: ['Deportes', 'Ping Pong', 'Mantenimiento']
  },
  {
    id: 'st-30',
    number: 30,
    type: 'propuesta',
    rarity: 'rare',
    title: 'Metegol',
    subtitle: 'Deportes y Recreaciones',
    category: 'Deportes y Recreaciones',
    description: 'Metegol.',
    whatWeSeek: 'Acondicionamiento y habilitación del metegol durante los recreos y horas libres para la diversión entre compañeros.',
    position: 'Área de Metegol',
    numberTag: 'P16',
    tags: ['Deportes', 'Metegol', 'Recreación']
  },
  {
    id: 'st-31',
    number: 31,
    type: 'propuesta',
    rarity: 'rare',
    title: 'Juegos de mesa en recreos y horas libres',
    subtitle: 'Deportes y Recreaciones',
    category: 'Deportes y Recreaciones',
    description: 'Juegos de mesa en recreos y horas libres.',
    whatWeSeek: 'Armario con cartas, ajedrez, jenga, damas y juegos de estrategia a disposición para compartir en los recreos y horas libres.',
    position: 'Juegos y Estrategia',
    numberTag: 'P17',
    tags: ['Recreación', 'Juegos de Mesa', 'Horas Libres']
  },

  // --- 4. INFRAESTRUCTURA Y MEJORAS PARA LA ESCUELA ---
  {
    id: 'st-32',
    number: 32,
    type: 'propuesta',
    rarity: 'rare',
    title: 'Más mesas en los patios',
    subtitle: 'Infraestructura y Mejoras para la Escuela',
    category: 'Infraestructura y Mejoras para la Escuela',
    description: 'Más mesas en los patios.',
    whatWeSeek: 'Incorporación de mesas y bancos en los patios para poder merendar, estudiar, charlar y descansar cómodamente al aire libre.',
    position: 'Mobiliario de Patio',
    numberTag: 'P18',
    tags: ['Infraestructura', 'Mesas', 'Patio']
  },
  {
    id: 'st-33',
    number: 33,
    type: 'propuesta',
    rarity: 'rare',
    title: 'Poner gasebos para días de sol y llovizna',
    subtitle: 'Infraestructura y Mejoras para la Escuela',
    category: 'Infraestructura y Mejoras para la Escuela',
    description: 'Poner gasebos para días de sol y llovizna.',
    whatWeSeek: 'Colocación de gazebos y estructuras de sombra en los patios para resguardarse en jornadas de calor intenso o llovizna suave.',
    position: 'Protección y Sombra',
    numberTag: 'P19',
    tags: ['Infraestructura', 'Gazebos', 'Patio']
  },
  {
    id: 'st-34',
    number: 34,
    type: 'propuesta',
    rarity: 'rare',
    title: 'Decoración de la escuela',
    subtitle: 'Infraestructura y Mejoras para la Escuela',
    category: 'Infraestructura y Mejoras para la Escuela',
    description: 'Decoración de la escuela.',
    whatWeSeek: 'Ambientación visual de pasillos, carteleras y espacios comunes con motivos alegres, colores institucionales y carteles motivacionales.',
    position: 'Ambientación Escolar',
    numberTag: 'P20',
    tags: ['Infraestructura', 'Decoración', 'Espacios']
  },
  {
    id: 'st-35',
    number: 35,
    type: 'propuesta',
    rarity: 'rare',
    title: 'Nuevas cortinas para la sala multimedia',
    subtitle: 'Infraestructura y Mejoras para la Escuela',
    category: 'Infraestructura y Mejoras para la Escuela',
    description: 'Nuevas cortinas para la sala multimedia.',
    whatWeSeek: 'Instalación de cortinas blackout en la sala multimedia para garantizar una adecuada oscuridad y visibilidad de proyecciones en clases.',
    position: 'Sala Multimedia',
    numberTag: 'P21',
    tags: ['Infraestructura', 'Cortinas', 'Multimedia']
  },

  // --- 5. CANTINA Y ALIMENTACIÓN ---
  {
    id: 'st-36',
    number: 36,
    type: 'propuesta',
    rarity: 'rare',
    title: 'Cubiertos y sal',
    subtitle: 'Cantina y Alimentación',
    category: 'Cantina y Alimentación',
    description: 'Cubiertos y sal a disposición.',
    whatWeSeek: 'Disponibilidad permanente de cubiertos, servilletas y saleros en el área de cantina para los estudiantes que almuerzan o meriendan en la escuela.',
    position: 'Servicio de Cantina',
    numberTag: 'P22',
    tags: ['Cantina', 'Alimentación', 'Cubiertos']
  },

  // --- 6. INCLUSIÓN, BIENESTAR Y SOLIDARIDAD ---
  {
    id: 'st-37',
    number: 37,
    type: 'propuesta',
    rarity: 'rare',
    title: 'Kit femenino',
    subtitle: 'Inclusión, Bienestar y Solidaridad',
    category: 'Inclusión, Bienestar y Solidaridad',
    description: 'Kit femenino.',
    whatWeSeek: 'Botiquín con toallitas femeninas y productos de higiene disponibles y accesibles de forma gratuita ante cualquier emergencia escolar.',
    position: 'Salud y Cuidado',
    numberTag: 'P23',
    tags: ['Inclusión', 'Salud', 'Kit Femenino']
  },
  {
    id: 'st-38',
    number: 38,
    type: 'propuesta',
    rarity: 'rare',
    title: 'Acuerdo con el Pastoral para donaciones',
    subtitle: 'Inclusión, Bienestar y Solidaridad',
    category: 'Inclusión, Bienestar y Solidaridad',
    description: 'Acuerdo con el Pastoral para donaciones.',
    whatWeSeek: 'Coordinación con el equipo de Pastoral para organizar colectas solidarias de ropa, útiles y alimentos destinados a quienes más lo necesitan.',
    position: 'Solidaridad Pastoral',
    numberTag: 'P24',
    tags: ['Inclusión', 'Solidaridad', 'Pastoral']
  },
  {
    id: 'st-39',
    number: 39,
    type: 'propuesta',
    rarity: 'rare',
    title: 'Kit de cumpleaños',
    subtitle: 'Inclusión, Bienestar y Solidaridad',
    category: 'Inclusión, Bienestar y Solidaridad',
    description: 'Kit de cumpleaños.',
    whatWeSeek: 'Set festivo con bonetes, guirnaldas y cartel de feliz cumpleaños disponible para que cada curso celebre a sus compañeros.',
    position: 'Festejos en el Aula',
    numberTag: 'P25',
    tags: ['Inclusión', 'Cumpleaños', 'Celebración']
  },
  {
    id: 'st-40',
    number: 40,
    type: 'propuesta',
    rarity: 'rare',
    title: 'Kit escolar',
    subtitle: 'Inclusión, Bienestar y Solidaridad',
    category: 'Inclusión, Bienestar y Solidaridad',
    description: 'Kit escolar.',
    whatWeSeek: 'Reserva de útiles escolares básicos (lapiceras, lápices, hojas, reglas y gomas) a disposición inmediata ante olvidos o necesidades.',
    position: 'Útiles de Emergencia',
    numberTag: 'P26',
    tags: ['Inclusión', 'Útiles', 'Kit Escolar']
  },

  // --- 7. PARTICIPACIÓN DEL ESTUDIANTE ---
  {
    id: 'st-41',
    number: 41,
    type: 'propuesta',
    rarity: 'rare',
    title: 'Presupuesto informativo',
    subtitle: 'Participación del Estudiante',
    category: 'Participación del Estudiante',
    description: 'Presupuesto informativo.',
    whatWeSeek: 'Publicación periódica y abierta de todos los ingresos, egresos y destino de los fondos del Centro de Estudiantes de manera transparente.',
    position: 'Transparencia Económica',
    numberTag: 'P27',
    tags: ['Participación', 'Presupuesto', 'Transparencia']
  },

  // --- 8. CULTURA Y COMUNICACIÓN ---
  {
    id: 'st-42',
    number: 42,
    type: 'propuesta',
    rarity: 'rare',
    title: 'Música en los recreos',
    subtitle: 'Cultura y Comunicación',
    category: 'Cultura y Comunicación',
    description: 'Música en los recreos.',
    whatWeSeek: 'Parlantes en los patios con música durante los recreos largos para crear un ambiente distendido y alegre entre clases.',
    position: 'Sonido Escolar',
    numberTag: 'P28',
    tags: ['Cultura', 'Música', 'Recreos']
  },
  {
    id: 'st-43',
    number: 43,
    type: 'propuesta',
    rarity: 'rare',
    title: 'Mural colaborativo',
    subtitle: 'Cultura y Comunicación',
    category: 'Cultura y Comunicación',
    description: 'Mural colaborativo.',
    whatWeSeek: 'Pintada comunitaria en un muro escolar donde los alumnos de todos los cursos participen dejando su arte, diseño y huella.',
    position: 'Arte Colectivo',
    numberTag: 'P29',
    tags: ['Cultura', 'Mural', 'Arte']
  },
  {
    id: 'st-44',
    number: 44,
    type: 'propuesta',
    rarity: 'rare',
    title: 'Playlist estudiantil',
    subtitle: 'Cultura y Comunicación',
    category: 'Cultura y Comunicación',
    description: 'Playlist estudiantil.',
    whatWeSeek: 'Lista musical abierta y colaborativa donde cada estudiante puede sugerir canciones para que suenen en los recreos y eventos.',
    position: 'Voz y Música',
    numberTag: 'P30',
    tags: ['Cultura', 'Playlist', 'Música']
  }
];

export const ALL_STICKERS: Sticker[] = RAW_STICKERS.map(s => {
  let rarity: StickerRarity = 'common';
  if (s.id === 'st-01' || s.id === 'st-02') {
    rarity = 'legendary';
  } else if (s.type === 'player' && s.id !== 'st-01' && s.id !== 'st-02') {
    rarity = 'epic';
  } else if (s.type === 'propuesta') {
    rarity = 'rare';
  } else {
    rarity = 'common';
  }
  return { ...s, rarity };
});

export const CATEGORIES_LIST = [
  'Educación y Apoyo Académico',
  'Eventos y Convivencias',
  'Deportes y Recreaciones',
  'Infraestructura y Mejoras para la Escuela',
  'Cantina y Alimentación',
  'Inclusión, Bienestar y Solidaridad',
  'Participación del Estudiante',
  'Cultura y Comunicación'
];

export const SPECIAL_STICKERS = ALL_STICKERS.filter(s => s.rarity === 'legendary' || s.id === 'st-00');
export const PLAYER_STICKERS = ALL_STICKERS.filter(s => s.type === 'player');
export const PROPOSAL_STICKERS = ALL_STICKERS.filter(s => s.type === 'propuesta');
export const TOTAL_STICKERS_COUNT = ALL_STICKERS.length;
