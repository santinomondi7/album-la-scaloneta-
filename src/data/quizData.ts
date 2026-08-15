import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS_POOL: QuizQuestion[] = [
  // FÁCILES (10)
  {
    id: 'q-01',
    question: '¿En qué año ganó Argentina su tercer Mundial de fútbol en Qatar?',
    options: ['2014', '2018', '2022', '2020'],
    correctIndex: 2,
    difficulty: 'facil',
    category: 'Mundiales',
    funFact: 'La final histórica contra Francia terminó 3-3 y se definió por penales 4-2.'
  },
  {
    id: 'q-02',
    question: '¿Quién fue el capitán de la Selección Argentina en el Mundial de Qatar 2022?',
    options: ['Ángel Di María', 'Lionel Messi', 'Rodrigo De Paul', 'Nicolás Otamendi'],
    correctIndex: 1,
    difficulty: 'facil',
    category: 'Capitanes',
    funFact: 'Lionel Messi anotó 7 goles en ese certamen y fue elegido el mejor jugador del torneo.'
  },
  {
    id: 'q-03',
    question: '¿Cómo se apoda al director técnico de Argentina campeón del mundo, Lionel Scaloni?',
    options: ['El Loco', 'El Muñeco', 'El León', 'El Creador de La Scaloneta'],
    correctIndex: 3,
    difficulty: 'facil',
    category: 'Entrenadores',
    funFact: 'Asumió en 2018 y logró la Copa América 2021, Finalissima 2022, Mundial 2022 y Copa América 2024.'
  },
  {
    id: 'q-04',
    question: '¿Qué arquero argentino fue clave atajando penales contra Países Bajos y Francia en Qatar 2022?',
    options: ['Franco Armani', 'Emiliano "Dibu" Martínez', 'Sergio Romero', 'Ubaldo Fillol'],
    correctIndex: 1,
    difficulty: 'facil',
    category: 'Jugadores',
    funFact: 'El Dibu ganó el Guante de Oro como mejor arquero de la Copa del Mundo 2022.'
  },
  {
    id: 'q-05',
    question: '¿Cuántas estrellas doradas tiene el escudo oficial de la AFA tras Qatar 2022?',
    options: ['2 estrellas', '3 estrellas', '4 estrellas', '5 estrellas'],
    correctIndex: 1,
    difficulty: 'facil',
    category: 'Historia',
    funFact: 'Las 3 estrellas corresponden a los títulos mundiales de 1978, 1986 y 2022.'
  },
  {
    id: 'q-06',
    question: '¿En qué año se consagró campeona del mundo Argentina por primera vez en la historia?',
    options: ['1974', '1978', '1982', '1986'],
    correctIndex: 1,
    difficulty: 'facil',
    category: 'Mundiales',
    funFact: 'Argentina 1978 tuvo como gran figura y goleador a Mario Alberto Kempes.'
  },
  {
    id: 'q-07',
    question: '¿Quién marcó el famoso "Gol del Siglo" a Inglaterra en el Mundial de México 1986?',
    options: ['Diego Armando Maradona', 'Jorge Valdano', 'Jorge Burruchaga', 'Claudio Caniggia'],
    correctIndex: 0,
    difficulty: 'facil',
    category: 'Leyendas',
    funFact: 'Maradona eludió a 5 jugadores ingleses y al arquero Peter Shilton desde mitad de cancha.'
  },
  {
    id: 'q-08',
    question: '¿En qué estadio de Río de Janeiro venció Argentina a Brasil 1-0 en la final de la Copa América 2021?',
    options: ['Estadio Morumbí', 'Estadio Maracaná', 'Estadio Mineirão', 'Allianz Parque'],
    correctIndex: 1,
    difficulty: 'facil',
    category: 'Copa América',
    funFact: 'Ángel Di María anotó el gol de la victoria con una exquisita emboquillada.'
  },
  {
    id: 'q-09',
    question: '¿Qué número de camiseta lució Diego Maradona y viste Lionel Messi en la Selección?',
    options: ['7', '9', '10', '11'],
    correctIndex: 2,
    difficulty: 'facil',
    category: 'Curiosidades',
    funFact: 'La mítica camiseta número 10 es el símbolo máximo del fútbol argentino.'
  },
  {
    id: 'q-10',
    question: '¿Quién convirtió el gol definitivo en la final de México 1986 contra Alemania (3-2)?',
    options: ['Diego Maradona', 'Jorge Burruchaga', 'Oscar Ruggeri', 'José Luis Brown'],
    correctIndex: 1,
    difficulty: 'facil',
    category: 'Mundiales',
    funFact: 'Burruchaga definió tras una asistencia magistral de Diego Maradona a los 84 minutos.'
  },

  // MEDIAS (10)
  {
    id: 'q-11',
    question: '¿Quién fue el director técnico de Argentina en el Mundial de 1978?',
    options: ['Carlos Salvador Bilardo', 'César Luis Menotti', 'Marcelo Bielsa', 'Alejandro Sabella'],
    correctIndex: 1,
    difficulty: 'medio',
    category: 'Entrenadores',
    funFact: 'El "Flaco" Menotti lideró la primera conquista mundial albiceleste en el Monumental.'
  },
  {
    id: 'q-12',
    question: '¿A qué selección derrotó Argentina en la Finalissima 2022 en el estadio de Wembley?',
    options: ['Inglaterra', 'Alemania', 'Italia', 'España'],
    correctIndex: 2,
    difficulty: 'medio',
    category: 'Títulos',
    funFact: 'Argentina goleó a Italia 3-0 con tantos de Lautaro Martínez, Ángel Di María y Paulo Dybala.'
  },
  {
    id: 'q-13',
    question: '¿Qué joven mediocampista argentino fue premiado como el Mejor Jugador Joven del Mundial 2022?',
    options: ['Alexis Mac Allister', 'Enzo Fernández', 'Julián Álvarez', 'Thiago Almada'],
    correctIndex: 1,
    difficulty: 'medio',
    category: 'Qatar 2022',
    funFact: 'Enzo Fernández debutó con un golazo al ángulo frente a México en fase de grupos.'
  },
  {
    id: 'q-14',
    question: '¿Quién anotó el gol decisivo en tiempo suplementario en la final de la Copa América 2024 vs Colombia?',
    options: ['Lionel Messi', 'Lautaro Martínez', 'Nicolás González', 'Giovani Lo Celso'],
    correctIndex: 1,
    difficulty: 'medio',
    category: 'Copa América',
    funFact: 'Lautaro Martínez fue el goleador del certamen con 5 tantos.'
  },
  {
    id: 'q-15',
    question: '¿Quién fue el máximo goleador del Mundial Argentina 1978 con 6 goles?',
    options: ['Mario Alberto Kempes', 'Leopoldo Luque', 'Daniel Passarella', 'Osvaldo Ardiles'],
    correctIndex: 0,
    difficulty: 'medio',
    category: 'Mundiales',
    funFact: 'El "Matador" Kempes metió dos goles en la gran final frente a Países Bajos (3-1).'
  },
  {
    id: 'q-16',
    question: '¿Contra qué país debutó la Selección Argentina en la fase de grupos de Qatar 2022?',
    options: ['Polonia', 'México', 'Arabia Saudita', 'Australia'],
    correctIndex: 2,
    difficulty: 'medio',
    category: 'Qatar 2022',
    funFact: 'Tras esa sorpresiva derrota inicial 1-2, Argentina ganó todos sus compromisos restantes.'
  },
  {
    id: 'q-17',
    question: '¿Quién pateó y convirtió el último penal que consagró campeón a Argentina ante Francia en 2022?',
    options: ['Gonzalo Montiel', 'Leandro Paredes', 'Paulo Dybala', 'Lionel Messi'],
    correctIndex: 0,
    difficulty: 'medio',
    category: 'Qatar 2022',
    funFact: 'Gonzalo "Cachete" Montiel definió con frialdad cruzando el balón con el arquero Lloris al otro palo.'
  },
  {
    id: 'q-18',
    question: '¿En qué año ganó Argentina la medalla de oro olímpica en fútbol masculino en Atenas?',
    options: ['2000', '2004', '2008', '2012'],
    correctIndex: 1,
    difficulty: 'medio',
    category: 'Juegos Olímpicos',
    funFact: 'Dirigida por Marcelo Bielsa y con Carlos Tevez como goleador, no recibió ningún gol en contra.'
  },
  {
    id: 'q-19',
    question: '¿Qué arquero argentino se hizo héroe atajando penales en Italia 1990 ante Yugoslavia e Italia?',
    options: ['Nery Pumpido', 'Sergio Goycochea', 'Ubaldo Fillol', 'Carlos Roa'],
    correctIndex: 1,
    difficulty: 'medio',
    category: 'Leyendas',
    funFact: 'El "Vasco" Goycochea ingresó por lesión de Pumpido y se convirtió en leyenda de los penales.'
  },
  {
    id: 'q-20',
    question: '¿Cuántos partidos invicto alcanzó La Scaloneta antes del inicio del Mundial 2022?',
    options: ['28 partidos', '33 partidos', '36 partidos', '42 partidos'],
    correctIndex: 2,
    difficulty: 'medio',
    category: 'Récords',
    funFact: 'Fue la mayor racha invicta en la historia de la Selección Argentina de fútbol.'
  },

  // DIFÍCILES (10)
  {
    id: 'q-21',
    question: '¿Quién fue el capitán de la Selección Argentina en el Mundial de 1978?',
    options: ['Daniel Passarella', 'Ubaldo Fillol', 'Mario Kempes', 'Jorge Olguín'],
    correctIndex: 0,
    difficulty: 'dificil',
    category: 'Capitanes',
    funFact: 'El "Gran Capitán" Passarella es el único argentino presente en los planteles de 1978 y 1986.'
  },
  {
    id: 'q-22',
    question: '¿Quién anotó el primer gol de Argentina en la final de México 1986 ante Alemania?',
    options: ['José Luis Brown', 'Jorge Valdano', 'Diego Maradona', 'Oscar Ruggeri'],
    correctIndex: 0,
    difficulty: 'dificil',
    category: 'Mundiales',
    funFact: 'El "Tata" Brown cabeceó al gol y luego jugó lesionado del hombro con un agujero en la camiseta.'
  },
  {
    id: 'q-23',
    question: '¿Quién era el DT de la Selección Argentina en la final del Mundial de Brasil 2014?',
    options: ['Alejandro Sabella', 'Gerardo Martino', 'José Pékerman', 'Diego Maradona'],
    correctIndex: 0,
    difficulty: 'dificil',
    category: 'Entrenadores',
    funFact: 'El querido "Pachorra" Sabella llevó a Argentina a su primera final mundialista tras 24 años.'
  },
  {
    id: 'q-24',
    question: '¿Qué rival enfrentó Argentina en octavos de final del Mundial de Qatar 2022?',
    options: ['Polonia', 'Australia', 'Dinamarca', 'Suiza'],
    correctIndex: 1,
    difficulty: 'dificil',
    category: 'Qatar 2022',
    funFact: 'Argentina ganó 2-1 con goles de Lionel Messi y Julián Álvarez, y una atajada final clave de Dibu.'
  },
  {
    id: 'q-25',
    question: '¿Quién fue el arquero titular de Argentina en el primer Mundial de la historia (Uruguay 1930)?',
    options: ['Ángel Bossio / Juan Botasso', 'Amadeo Carrizo', 'Antonio Roma', 'Ubaldo Fillol'],
    correctIndex: 0,
    difficulty: 'dificil',
    category: 'Historia',
    funFact: 'Argentina llegó a la final en 1930 frente a Uruguay en el Estadio Centenario de Montevideo.'
  },
  {
    id: 'q-26',
    question: '¿Qué histórico delantero argentino apodado "Batigol" anotó tripletes en dos Mundiales distintos (1994 y 1998)?',
    options: ['Hernán Crespo', 'Gabriel Omar Batistuta', 'Claudio Caniggia', 'Gonzalo Higuaín'],
    correctIndex: 1,
    difficulty: 'dificil',
    category: 'Goleadores',
    funFact: 'Batistuta convirtió 10 goles en Copas del Mundo y fue durante años el máximo artillero.'
  },
  {
    id: 'q-27',
    question: '¿Quién asistió a Ángel Di María en el segundo gol de Argentina a Francia en la final de 2022?',
    options: ['Lionel Messi', 'Alexis Mac Allister', 'Julián Álvarez', 'Nahuel Molina'],
    correctIndex: 1,
    difficulty: 'dificil',
    category: 'Qatar 2022',
    funFact: 'Fue una jugada colectiva perfecta a un toque iniciada por Molina, Messi y Julián Álvarez.'
  },
  {
    id: 'q-28',
    question: '¿Qué defensor argentino convirtió el gol del triunfo 1-0 frente a Brasil en el Maracaná por Eliminatorias 2023?',
    options: ['Cristian "Cuti" Romero', 'Nicolás Otamendi', 'Lisandro Martínez', 'Germán Pezzella'],
    correctIndex: 1,
    difficulty: 'dificil',
    category: 'Eliminatorias',
    funFact: 'Otamendi saltó entre dos defensores brasileños para clavar un cabezazo histórico al ángulo.'
  },
  {
    id: 'q-29',
    question: '¿En qué club jugaba Lionel Scaloni cuando disputó el Mundial de Alemania 2006 como jugador?',
    options: ['Deportivo La Coruña / West Ham', 'Lazio', 'Newell’s Old Boys', 'Mallorca'],
    correctIndex: 0,
    difficulty: 'dificil',
    category: 'Curiosidades',
    funFact: 'Scaloni jugó como lateral derecho titular en octavos de final ante México (2-1).'
  },
  {
    id: 'q-30',
    question: '¿Cuántas Copas América ha ganado la Selección Argentina en toda su historia hasta 2024?',
    options: ['14', '15', '16', '17'],
    correctIndex: 2,
    difficulty: 'dificil',
    category: 'Títulos',
    funFact: 'Con la coronación en 2024 en Miami, Argentina es la selección más ganadora con 16 títulos.'
  }
];

// Helper to get 10 mixed questions for a standard quiz match: 5 fáciles, 3 medias, 2 difíciles
export function generateQuizMatch(pool: QuizQuestion[] = QUIZ_QUESTIONS_POOL): QuizQuestion[] {
  const easy = pool.filter(q => q.difficulty === 'facil').sort(() => 0.5 - Math.random()).slice(0, 5);
  const med = pool.filter(q => q.difficulty === 'medio').sort(() => 0.5 - Math.random()).slice(0, 3);
  const hard = pool.filter(q => q.difficulty === 'dificil').sort(() => 0.5 - Math.random()).slice(0, 2);

  const match = [...easy, ...med, ...hard];
  return match.sort(() => 0.5 - Math.random());
}
