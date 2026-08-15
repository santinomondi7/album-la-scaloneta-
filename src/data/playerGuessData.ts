import { PlayerGuessItem } from '../types';

export const PLAYER_GUESS_POOL: PlayerGuessItem[] = [
  {
    id: 'pg-01',
    playerName: 'Lionel Messi',
    clues: [
      'Nací en Rosario y soy el máximo goleador histórico de la Selección Argentina.',
      'Gané el Balón de Oro en 8 oportunidades y levanté la Copa del Mundo en Qatar 2022.',
      'Uso la camiseta número 10, fui capitán en 3 finales ganadas y anoté dos goles en la final vs Francia.'
    ],
    options: ['Lionel Messi', 'Ángel Di María', 'Sergio Agüero', 'Gonzalo Higuaín'],
    correctIndex: 0,
    position: 'Delantero / Capitán',
    era: '2005 - Presente'
  },
  {
    id: 'pg-02',
    playerName: 'Diego Armando Maradona',
    clues: [
      'Nací en Villa Fiorito y debuté en la Selección con tan solo 16 años.',
      'Fui el capitán y figura indiscutida del Mundial de México 1986.',
      'Anoté el "Gol del Siglo" y la "Mano de Dios" frente a Inglaterra en el Estadio Azteca.'
    ],
    options: ['Mario Kempes', 'Diego Armando Maradona', 'Daniel Passarella', 'Ricardo Bochini'],
    correctIndex: 1,
    position: 'Enganche / Capitán',
    era: '1977 - 1994'
  },
  {
    id: 'pg-03',
    playerName: 'Emiliano "Dibu" Martínez',
    clues: [
      'Nací en Mar del Plata e hice inferiores en Independiente antes de irme a Inglaterra.',
      'Me consagré atajando penales en la Copa América 2021 diciendo "Mirá que te como, hermano".',
      'Hice una atajada histórica a Kolo Muani en el minuto 123 de la final de Qatar 2022 y gané el Guante de Oro.'
    ],
    options: ['Franco Armani', 'Sergio Romero', 'Emiliano "Dibu" Martínez', 'Nahuel Guzmán'],
    correctIndex: 2,
    position: 'Arquero',
    era: '2021 - Presente'
  },
  {
    id: 'pg-04',
    playerName: 'Ángel Di María',
    clues: [
      'Me apodan "Fideo" y nací en Rosario, jugando en las inferiores de Rosario Central.',
      'Metí goles memorables en las finales de Beijing 2008, Maracaná 2021, Wembley 2022 y Lusail 2022.',
      'Me despedí de la Selección siendo campeón bicampeón de América en 2024 ovacionado por todo el país.'
    ],
    options: ['Ezequiel Lavezzi', 'Ángel Di María', 'Nicolás González', 'Papu Gómez'],
    correctIndex: 1,
    position: 'Extremo / Delantero',
    era: '2008 - 2024'
  },
  {
    id: 'pg-05',
    playerName: 'Julián Álvarez',
    clues: [
      'Me apodan "La Araña" y nací en Calchín, Córdoba.',
      'Fui goleador en River Plate antes de brillar en la Premier League y el fútbol europeo.',
      'Marqué 4 goles en el Mundial de Qatar 2022, incluyendo un doblete memorable a Croacia en semifinales.'
    ],
    options: ['Lautaro Martínez', 'Julián Álvarez', 'Paulo Dybala', 'Joaquín Correa'],
    correctIndex: 1,
    position: 'Delantero Centro',
    era: '2021 - Presente'
  },
  {
    id: 'pg-06',
    playerName: 'Mario Alberto Kempes',
    clues: [
      'Me apodan "El Matador" y nací en Bell Ville, Córdoba.',
      'Fui el máximo goleador y mejor jugador del primer Mundial que ganó Argentina en 1978.',
      'Anoté 6 goles en ese torneo, con dos tantos en la recordada final frente a Holanda.'
    ],
    options: ['Leopoldo Luque', 'Mario Alberto Kempes', 'René Houseman', 'Daniel Bertoni'],
    correctIndex: 1,
    position: 'Delantero',
    era: '1973 - 1982'
  },
  {
    id: 'pg-07',
    playerName: 'Rodrigo De Paul',
    clues: [
      'Me formé en Racing Club y me convertí en el motor incansable del mediocampo de La Scaloneta.',
      'Di la asistencia milimétrica para el gol de Di María en la final de la Copa América 2021.',
      'Soy uno de los futbolistas con más recuperaciones y pases completados en todo el ciclo de Scaloni.'
    ],
    options: ['Leandro Paredes', 'Rodrigo De Paul', 'Enzo Fernández', 'Guido Rodríguez'],
    correctIndex: 1,
    position: 'Mediocampista Central / Interior',
    era: '2018 - Presente'
  },
  {
    id: 'pg-08',
    playerName: 'Lautaro Martínez',
    clues: [
      'Me apodan "El Toro" y nací en Bahía Blanca.',
      'Soy uno de los máximos goleadores del ciclo Scaloni y convertí el penal decisivo ante Países Bajos en 2022.',
      'Fui el Botín de Oro de la Copa América 2024 anotando el gol del título frente a Colombia.'
    ],
    options: ['Julián Álvarez', 'Mauro Icardi', 'Lautaro Martínez', 'Lucas Alario'],
    correctIndex: 2,
    position: 'Delantero Centro',
    era: '2018 - Presente'
  },
  {
    id: 'pg-09',
    playerName: 'Gabriel Omar Batistuta',
    clues: [
      'Me apodan "Batigol" y fui un temible delantero con una potencia inigualable en el remate.',
      'Gané dos Copas América consecutivas (1991 y 1993) y la Copa Confederaciones 1992.',
      'Anoté 10 goles en Mundiales (1994, 1998 y 2002), con dos tripletes históricos.'
    ],
    options: ['Hernán Crespo', 'Gabriel Omar Batistuta', 'Claudio Caniggia', 'Abel Balbo'],
    correctIndex: 1,
    position: 'Delantero Centro',
    era: '1991 - 2002'
  },
  {
    id: 'pg-10',
    playerName: 'Cristian "Cuti" Romero',
    clues: [
      'Nací en Córdoba capital e hice inferiores en Belgrano antes de emigrar a Italia e Inglaterra.',
      'Soy el pilar central de la defensa albiceleste, reconocido por mi fiereza en el mano a mano y anticipos limpios.',
      'Fui elegido el mejor defensor de la Serie A y de la Copa América, consagrándome campeón de todo con La Scaloneta.'
    ],
    options: ['Nicolás Otamendi', 'Cristian "Cuti" Romero', 'Lisandro Martínez', 'Germán Pezzella'],
    correctIndex: 1,
    position: 'Defensor Central',
    era: '2021 - Presente'
  }
];
