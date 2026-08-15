import { Achievement } from '../types';

export const ACHIEVEMENTS_LIST: Achievement[] = [
  {
    id: 'ach-first-sticker',
    title: 'Primera Figurita',
    description: 'Conseguiste tu primera figurita para el álbum.',
    icon: 'Sparkles',
    category: 'coleccion',
    pointsReward: 15,
    requiredCount: 1
  },
  {
    id: 'ach-first-pack',
    title: 'Primer Sobre',
    description: 'Abriste tu primer sobre de figuritas de La Scaloneta.',
    icon: 'Package',
    category: 'sobres',
    pointsReward: 20,
    requiredCount: 1
  },
  {
    id: 'ach-five-packs',
    title: 'Abridor Serial',
    description: 'Abriste 5 sobres de figuritas en total.',
    icon: 'Boxes',
    category: 'sobres',
    pointsReward: 35,
    requiredCount: 5
  },
  {
    id: 'ach-first-quiz',
    title: 'Primer Quiz',
    description: 'Completaste tu primer quiz sobre la Selección Argentina.',
    icon: 'HelpCircle',
    category: 'juegos',
    pointsReward: 20,
    requiredCount: 1
  },
  {
    id: 'ach-quiz-master',
    title: 'Sabio Albiceleste',
    description: 'Respondiste correctamente al menos 8 de 10 preguntas en el Quiz.',
    icon: 'GraduationCap',
    category: 'juegos',
    pointsReward: 50,
    requiredCount: 1
  },
  {
    id: 'ach-penalty-scorer',
    title: 'Goleador de Penales',
    description: 'Marcaste 10 goles en total en el minijuego de Penales.',
    icon: 'Target',
    category: 'juegos',
    pointsReward: 40,
    requiredCount: 10
  },
  {
    id: 'ach-sharp-eye',
    title: 'Ojo de Lince',
    description: 'Adivinaste un jugador de la Selección usando solo la Pista 1.',
    icon: 'Eye',
    category: 'juegos',
    pointsReward: 35,
    requiredCount: 1
  },
  {
    id: 'ach-memory-master',
    title: 'Mente Futbolera',
    description: 'Completaste el juego de Memoria Futbolera.',
    icon: 'Brain',
    category: 'juegos',
    pointsReward: 30,
    requiredCount: 1
  },
  {
    id: 'ach-speed-runner',
    title: 'Reflejos Rápidos',
    description: 'Sumaste más de 6 aciertos en el Desafío Rápido de 30 segundos.',
    icon: 'Zap',
    category: 'juegos',
    pointsReward: 40,
    requiredCount: 1
  },
  {
    id: 'ach-collector-10',
    title: 'Coleccionista Novato',
    description: 'Juntaste 10 figuritas únicas en tu álbum.',
    icon: 'BookOpen',
    category: 'coleccion',
    pointsReward: 25,
    requiredCount: 10
  },
  {
    id: 'ach-collector-25',
    title: 'Coleccionista Avanzado',
    description: 'Juntaste 25 figuritas únicas en tu álbum.',
    icon: 'Medal',
    category: 'coleccion',
    pointsReward: 50,
    requiredCount: 25
  },
  {
    id: 'ach-album-complete',
    title: 'Álbum Completo',
    description: '¡Conseguiste las 44 figuritas de La Scaloneta! Leyenda escolar.',
    icon: 'Trophy',
    category: 'coleccion',
    pointsReward: 150,
    requiredCount: 44
  },
  {
    id: 'ach-legendary-pull',
    title: '¡Figurita Legendaria!',
    description: 'Te tocó tu primera figurita de rareza Legendaria en un sobre.',
    icon: 'Star',
    category: 'sobres',
    pointsReward: 60,
    requiredCount: 1
  },
  {
    id: 'ach-streak-3',
    title: 'Racha Imparable',
    description: 'Alcanzaste una racha de 3 días consecutivos reclamando el Bonus Diario.',
    icon: 'Flame',
    category: 'racha',
    pointsReward: 45,
    requiredCount: 3
  },
  {
    id: 'ach-points-500',
    title: 'Capitán de Puntos',
    description: 'Acumulaste 500 puntos en total en tu cuenta.',
    icon: 'Crown',
    category: 'puntos',
    pointsReward: 75,
    requiredCount: 500
  }
];
