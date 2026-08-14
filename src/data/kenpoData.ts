import { KenpoTechnique, BeltMetadata } from '../types';

export const BELT_DEGREES: Record<string, string> = {
  blanco: '10º Kyu',
  amarillo: '9º Kyu',
  naranjo: '8º Kyu',
  púrpura: '7º Kyu',
  azul: '6º Kyu',
  verde: '5º Kyu',
  'café-3kyu': '3er Kyu',
  'café-2kyu': '2do Kyu',
  'café-1kyu': '1er Kyu',
  negro: '1er Dan'
};

export const BELT_METADATA: Record<string, BeltMetadata> = {
  blanco: {
    key: 'blanco',
    nameEs: 'Blanco',
    nameEn: 'White Belt',
    colorHex: '#F2F2F2',
    badgeBg: '#e2e8f0',
    badgeText: '#1e293b',
    description: 'Técnicas fundamentales y posiciones de combate.',
    order: 1
  },
  amarillo: {
    key: 'amarillo',
    nameEs: 'Amarillo',
    nameEn: 'Yellow Belt',
    colorHex: '#FFD600',
    badgeBg: '#fef08a',
    badgeText: '#854d0e',
    description: 'Maniobras defensivas básicas y primeras combinaciones.',
    order: 2
  },
  naranjo: {
    key: 'naranjo',
    nameEs: 'Naranja',
    nameEn: 'Orange Belt',
    colorHex: '#FF9100',
    badgeBg: '#ffeedb',
    badgeText: '#c2410c',
    description: 'Golpes, bloqueos intermedios y respuestas fluidas.',
    order: 3
  },
  púrpura: {
    key: 'púrpura',
    nameEs: 'Púrpura',
    nameEn: 'Purple Belt',
    colorHex: '#8E24AA',
    badgeBg: '#f3e8ff',
    badgeText: '#6b21a8',
    description: 'Combinaciones avanzadas de defensa personal.',
    order: 4
  },
  azul: {
    key: 'azul',
    nameEs: 'Azul',
    nameEn: 'Blue Belt',
    colorHex: '#1976D2',
    badgeBg: '#dbeafe',
    badgeText: '#1e40af',
    description: 'Refinamiento de la velocidad y tiempo de ejecución.',
    order: 5
  },
  verde: {
    key: 'verde',
    nameEs: 'Verde',
    nameEn: 'Green Belt',
    colorHex: '#388E3C',
    badgeBg: '#dcfce7',
    badgeText: '#166534',
    description: 'Enfoque en la generación de potencia y proyección.',
    order: 6
  },
  'café-3kyu': {
    key: 'café-3kyu',
    nameEs: 'Café 3er Kyu',
    nameEn: 'Brown Belt 3rd Degree',
    colorHex: '#6D4C41',
    badgeBg: '#efebe9',
    badgeText: '#4e342e',
    description: 'Técnicas superiores, contragolpes y ataques múltiples.',
    order: 7
  },
  'café-2kyu': {
    key: 'café-2kyu',
    nameEs: 'Café 2do Kyu',
    nameEn: 'Brown Belt 2nd Degree',
    colorHex: '#5D4037',
    badgeBg: '#efebe9',
    badgeText: '#4e342e',
    description: 'Combinaciones complejas, armas y desarmes.',
    order: 8
  },
  'café-1kyu': {
    key: 'café-1kyu',
    nameEs: 'Café 1er Kyu',
    nameEn: 'Brown Belt 1st Degree',
    colorHex: '#4E342E',
    badgeBg: '#efebe9',
    badgeText: '#3e2723',
    description: 'Extensiones avanzadas y preparación a cinturón negro.',
    order: 9
  },
  negro: {
    key: 'negro',
    nameEs: 'Negro',
    nameEn: 'Black Belt',
    colorHex: '#212121',
    badgeBg: '#334155',
    badgeText: '#f8fafc',
    description: 'Dominio y maestría del sistema Kenpo Karate (1er Dan).',
    order: 10
  }
};

export const RAW_KENPO_TECHNIQUES: KenpoTechnique[] = [
  { id: 1, nro: 1, nombreEs: 'ESPADA LENTA', nombreEn: 'DELAYED SWORD', ataque: 'Tomada mano derecha solapa', tipo: 'Defensa Personal', cinturon: 'blanco', categoria: 'Tomadas', familia: 'Defensas Básicas' },
  { id: 2, nro: 2, nombreEs: 'GOLPE ALTERNADO', nombreEn: 'ALTERNATING MACES', ataque: 'Empujando con ambas manos', tipo: 'Defensa Personal', cinturon: 'blanco', categoria: 'Empujones', familia: 'Empujones Delanteros' },
  { id: 3, nro: 3, nombreEs: 'ESPADA DE DESTRUCCION', nombreEn: 'SWORD OF DESTRUCTION', ataque: 'Golpe izquierdo circular a la cara', tipo: 'Defensa Personal', cinturon: 'blanco', categoria: 'Puños', familia: 'Ataques con Mano' },
  { id: 4, nro: 4, nombreEs: 'MARTILLO DEFLECTOR', nombreEn: 'DEFLECTING HAMMER', ataque: 'Ataque de pierna derecha', tipo: 'Defensa Personal', cinturon: 'blanco', categoria: 'Patadas', familia: 'Ataques con Pie' },
  { id: 5, nro: 5, nombreEs: 'CAPTURANDO BRAZOS', nombreEn: 'CAPTURED TWIGS', ataque: 'Abrazo de oso por atrás', tipo: 'Defensa Personal', cinturon: 'blanco', categoria: 'Agarres y Abrazos', familia: 'Abrazos por Detrás' },
  
  { id: 6, nro: 1, nombreEs: 'LA GARRA DE LA MUERTE', nombreEn: 'THE GRASP OF DEATH', ataque: 'Tomada de cuello por el lado izquierdo', tipo: 'Defensa Personal', cinturon: 'amarillo', categoria: 'Estrangulaciones y Candados', familia: 'Candados de Cuello' },
  { id: 7, nro: 2, nombreEs: 'REVISANDO LA TORMENTA', nombreEn: 'CHECKING THE STORM', ataque: 'Ataque derecho de baston', tipo: 'Defensa Personal', cinturon: 'amarillo', categoria: 'Armas', familia: 'Ataques con Bastón' },
  { id: 8, nro: 3, nombreEs: 'PUÑO DE AGRESION', nombreEn: 'MACE OF AGRESSION', ataque: 'Tomada de solapa con ambas manos', tipo: 'Defensa Personal', cinturon: 'amarillo', categoria: 'Tomadas', familia: 'Tomadas Delanteras' },
  { id: 9, nro: 4, nombreEs: 'PUÑO ATACANDO', nombreEn: 'ATTACKING MACE', ataque: 'Ataque de puño derecho al pecho', tipo: 'Defensa Personal', cinturon: 'amarillo', categoria: 'Puños', familia: 'Puños Directos' },
  { id: 10, nro: 5, nombreEs: 'ESPADA Y MARTILLO', nombreEn: 'SWORD AND HAMMER', ataque: 'Tomada de hombro con mano izquierda', tipo: 'Defensa Personal', cinturon: 'amarillo', categoria: 'Tomadas', familia: 'Tomadas de Hombro' },

  { id: 11, nro: 1, nombreEs: 'PLUMAS QUE ATRAPAN', nombreEn: 'CLUTCHING FEATHERS', ataque: 'Mano izquierda tomando el pelo', tipo: 'Defensa Personal', cinturon: 'naranjo', categoria: 'Tomadas', familia: 'Agarrón de Cabello' },
  { id: 12, nro: 2, nombreEs: 'SALUDO DE GATILLO', nombreEn: 'TRIGGERED SALUTE', ataque: 'Mano derecha tomando solapa', tipo: 'Defensa Personal', cinturon: 'naranjo', categoria: 'Empujones', familia: 'Empujones de Solapa' },
  { id: 13, nro: 3, nombreEs: 'DANZA DE LA MUERTE', nombreEn: 'DANCE OF DEATH', ataque: 'Golpe recto mano derecha', tipo: 'Defensa Personal', cinturon: 'naranjo', categoria: 'Puños', familia: 'Puños Directos' },
  { id: 14, nro: 4, nombreEs: 'SALUDO CON EMPUJE', nombreEn: 'THRUSTING SALUTE', ataque: 'Ataque con pierna derecha', tipo: 'Defensa Personal', cinturon: 'naranjo', categoria: 'Patadas', familia: 'Patadas Frontales' },
  { id: 15, nro: 5, nombreEs: 'REGALO DE DESTRUCCION', nombreEn: 'GIFT OF DESTRUCTION', ataque: 'Tomada de mano derecha', tipo: 'Defensa Personal', cinturon: 'naranjo', categoria: 'Agarres y Abrazos', familia: 'Agarres de Muñeca' },
  { id: 16, nro: 6, nombreEs: 'CUERNOS ENCERRADOS', nombreEn: 'LOCKING HORNS', ataque: 'Tomada de cuello delantero', tipo: 'Defensa Personal', cinturon: 'naranjo', categoria: 'Estrangulaciones y Candados', familia: 'Candados de Cabeza' },
  { id: 17, nro: 7, nombreEs: 'KIMONO SOLITARIO', nombreEn: 'LONE KIMONO', ataque: 'Mano izquierda toma mano solapa', tipo: 'Defensa Personal', cinturon: 'naranjo', categoria: 'Tomadas', familia: 'Tomadas de Solapa' },
  { id: 18, nro: 8, nombreEs: 'SALUDO DE APARIENCIA', nombreEn: 'GLANCING SALUTE', ataque: 'Mano derecha a tomar solapa', tipo: 'Defensa Personal', cinturon: 'naranjo', categoria: 'Empujones', familia: 'Empujones Diagonales' },
  { id: 19, nro: 9, nombreEs: 'CINCO ESPADAS', nombreEn: 'FIVE SWORDS', ataque: 'Golpe circular derecho', tipo: 'Defensa Personal', cinturon: 'naranjo', categoria: 'Puños', familia: 'Ataques Circulares' },
  { id: 20, nro: 10, nombreEs: 'RAMA MOVIENDOSE', nombreEn: 'BUCKLING BRANCH', ataque: 'Ataque de pierna izquierda', tipo: 'Defensa Personal', cinturon: 'naranjo', categoria: 'Patadas', familia: 'Patadas Bajas' },
  { id: 21, nro: 11, nombreEs: 'PEZUÑA RAJUÑANDO', nombreEn: 'SCRAPING HOOF', ataque: 'Tomada de full nelson', tipo: 'Defensa Personal', cinturon: 'naranjo', categoria: 'Agarres y Abrazos', familia: 'Abrazos y Candados' },
  { id: 22, nro: 12, nombreEs: 'AGARRE DE LA MUERTE', nombreEn: 'GRIP OF DEATH', ataque: 'Tomada de cuello del lado izquierdo', tipo: 'Defensa Personal', cinturon: 'naranjo', categoria: 'Estrangulaciones y Candados', familia: 'Candados Laterales' },
  { id: 23, nro: 13, nombreEs: 'TALON CRUZANDO', nombreEn: 'CROSSING TALON', ataque: 'Mano derecha tomando muñeca', tipo: 'Defensa Personal', cinturon: 'naranjo', categoria: 'Tomadas', familia: 'Tomadas Cruzadas' },
  { id: 24, nro: 14, nombreEs: 'MARTILLO REPETIDOR', nombreEn: 'REPEATING MACE', ataque: 'Mano izquierda empujando', tipo: 'Defensa Personal', cinturon: 'naranjo', categoria: 'Empujones', familia: 'Empujones de Pecho' },
  { id: 25, nro: 15, nombreEs: 'MARTILLO PROTECTOR', nombreEn: 'SHIELDING HAMMER', ataque: 'Golpe circular izquierdo', tipo: 'Defensa Personal', cinturon: 'naranjo', categoria: 'Puños', familia: 'Puños de Gancho' },
  { id: 26, nro: 16, nombreEs: 'GOLPEANDO LA CABEZA DE LA SERPIENTE', nombreEn: 'STRIKING SERPENTS HEAD', ataque: 'Abrazando la cintura por delante', tipo: 'Defensa Personal', cinturon: 'naranjo', categoria: 'Agarres y Abrazos', familia: 'Abrazos Delanteros' },
  { id: 27, nro: 17, nombreEs: 'ALAS ENCERRRADAS', nombreEn: 'LOCKED WING', ataque: 'Toma de brazo derecho por atras', tipo: 'Defensa Personal', cinturon: 'naranjo', categoria: 'Estrangulaciones y Candados', familia: 'Candados de Brazo' },
  { id: 28, nro: 18, nombreEs: 'ALAS ALTERADAS', nombreEn: 'OBSCURE WING', ataque: 'Toma de hombro derecho por atras', tipo: 'Defensa Personal', cinturon: 'naranjo', categoria: 'Tomadas', familia: 'Tomadas Traseras' },
  { id: 29, nro: 19, nombreEs: 'MARTILLO EN REVERSA', nombreEn: 'REVERSING MACE', ataque: 'Avance con golpe izquierdo', tipo: 'Defensa Personal', cinturon: 'naranjo', categoria: 'Puños', familia: 'Contraataques' },
  { id: 30, nro: 20, nombreEs: 'ABRAZO INSTANTANEO', nombreEn: 'THRUSTING PRONGS', ataque: 'Abrazo de oso completo por delante', tipo: 'Defensa Personal', cinturon: 'naranjo', categoria: 'Agarres y Abrazos', familia: 'Abrazos de Oso' },
  { id: 31, nro: 21, nombreEs: 'RAMA ENVUELTA', nombreEn: 'TWISTED TWIG', ataque: 'Agarre de muñeca', tipo: 'Defensa Personal', cinturon: 'naranjo', categoria: 'Estrangulaciones y Candados', familia: 'Torsión de Muñeca' },
  { id: 32, nro: 22, nombreEs: 'ESPADA ALTERADA', nombreEn: 'OBSCURE SWORD', ataque: 'Mano izquierda toma hombro derecho', tipo: 'Defensa Personal', cinturon: 'naranjo', categoria: 'Tomadas', familia: 'Tomadas de Hombro' },
  { id: 33, nro: 23, nombreEs: 'GARRA LLOVIENDO', nombreEn: 'RAINING CLAW', ataque: 'Ataque de upper cut derecho al estomago', tipo: 'Defensa Personal', cinturon: 'naranjo', categoria: 'Puños', familia: 'Puños Ascendentes' },
  { id: 34, nro: 24, nombreEs: 'ALAS APLASTADORA', nombreEn: 'CRASHING WINGS', ataque: 'Abrazo de cintura por atras', tipo: 'Defensa Personal', cinturon: 'naranjo', categoria: 'Agarres y Abrazos', familia: 'Abrazos Bajos' },

  { id: 35, nro: 1, nombreEs: 'ALAS GIRATORIAS', nombreEn: 'TWIRLING WINGS', ataque: 'Tomando ambos hombros por atras', tipo: 'Defensa Personal', cinturon: 'púrpura', categoria: 'Tomadas', familia: 'Tomadas de Hombros' },
  { id: 36, nro: 2, nombreEs: 'BRAZO QUE SE ROMPE', nombreEn: 'SNAPPING TWIG', ataque: 'Empujon con mano izquierda al pecho', tipo: 'Defensa Personal', cinturon: 'púrpura', categoria: 'Empujones', familia: 'Empujones Directos' },
  { id: 37, nro: 3, nombreEs: 'GARZA SALTANDO', nombreEn: 'LEAPING CRANE', ataque: 'Golpe de puño derecho al pecho', tipo: 'Defensa Personal', cinturon: 'púrpura', categoria: 'Puños', familia: 'Salto y Golpe' },
  { id: 38, nro: 4, nombreEs: 'PENDULO COLUMPIANDOSE', nombreEn: 'SWINGING PENDULUM', ataque: 'Patada circular derecha al estómago', tipo: 'Defensa Personal', cinturon: 'púrpura', categoria: 'Patadas', familia: 'Patadas Circulares' },
  { id: 39, nro: 5, nombreEs: 'MARTILLO ROMPEDOR', nombreEn: 'CRUSHING HAMMER', ataque: 'Abrazo de oso por atras', tipo: 'Defensa Personal', cinturon: 'púrpura', categoria: 'Agarres y Abrazos', familia: 'Abrazos por Detrás' },
  { id: 40, nro: 6, nombreEs: 'CAPTURANDO HOJAS', nombreEn: 'CAPTURED LEAVES', ataque: 'Tomada de mano derecha', tipo: 'Defensa Personal', cinturon: 'púrpura', categoria: 'Estrangulaciones y Candados', familia: 'Torsiones de Mano' },
  { id: 41, nro: 7, nombreEs: 'EVITANDO LA TORMENTA', nombreEn: 'EVADING THE STORM', ataque: 'Ataque de baston a la cabeza con mano derecha', tipo: 'Defensa Personal', cinturon: 'púrpura', categoria: 'Armas', familia: 'Defensa de Bastón' },
  { id: 42, nro: 8, nombreEs: 'CARNERO ATACANDO', nombreEn: 'CHARGING RAM', ataque: 'Avalanzandose a tomar', tipo: 'Defensa Personal', cinturon: 'púrpura', categoria: 'Tacles', familia: 'Abalanzamientos' },
  { id: 43, nro: 9, nombreEs: 'ALAS DE PARTIDA', nombreEn: 'PARTING WINGS', ataque: 'A tomar con ambos brazos', tipo: 'Defensa Personal', cinturon: 'púrpura', categoria: 'Empujones', familia: 'Empujones de Doble Brazo' },
  { id: 44, nro: 10, nombreEs: 'MARTILLOS TRONANDO', nombreEn: 'THUNDERING HAMMERS', ataque: 'Ataque de puño derecho', tipo: 'Defensa Personal', cinturon: 'púrpura', categoria: 'Puños', familia: 'Puños Dobles' },
  { id: 45, nro: 11, nombreEs: 'APRETANDO EL DURAZNO', nombreEn: 'SQUEEZING THE PEACH', ataque: 'Tomada de oso por atras', tipo: 'Defensa Personal', cinturon: 'púrpura', categoria: 'Agarres y Abrazos', familia: 'Escapes de Oso' },
  { id: 46, nro: 12, nombreEs: 'ALAS CIRCULANDO', nombreEn: 'CIRCLING WING', ataque: 'Tomada de ambos hombros por atras', tipo: 'Defensa Personal', cinturon: 'púrpura', categoria: 'Estrangulaciones y Candados', familia: 'Palancas Traseras' },
  { id: 47, nro: 13, nombreEs: 'CALMANDO LA TORMENTA', nombreEn: 'CALMING THE STORM', ataque: 'Ataque de baston con la mano derecha', tipo: 'Defensa Personal', cinturon: 'púrpura', categoria: 'Armas', familia: 'Desarmes de Bastón' },
  { id: 48, nro: 14, nombreEs: 'BOLADORA ATACANDO', nombreEn: 'DARTING MACE', ataque: 'Tomada de mano derecha con ambas manos', tipo: 'Defensa Personal', cinturon: 'púrpura', categoria: 'Tomadas', familia: 'Tomadas Dobles' },
  { id: 49, nro: 15, nombreEs: 'ALAS ENGANCHADORAS', nombreEn: 'HOOKING WINGS', ataque: 'A tomar cintura con ambas manos', tipo: 'Defensa Personal', cinturon: 'púrpura', categoria: 'Empujones', familia: 'Enganches de Cintura' },
  { id: 50, nro: 16, nombreEs: 'ESCUDO Y ESPADA', nombreEn: 'SHIELD AND SWORD', ataque: 'A empujar con mano izquierda avanzando', tipo: 'Defensa Personal', cinturon: 'púrpura', categoria: 'Puños', familia: 'Defensas con Escudo' },
  { id: 51, nro: 17, nombreEs: 'REGALO EN REGRESO', nombreEn: 'GIFT IN RETURN', ataque: 'Tomada de mano derecha', tipo: 'Defensa Personal', cinturon: 'púrpura', categoria: 'Agarres y Abrazos', familia: 'Escapes de Mano' },
  { id: 52, nro: 18, nombreEs: 'COMPULSION DE ARCO', nombreEn: 'BOW OF COMPULSION', ataque: 'Mano derecha al pecho del adversario oprimiendo', tipo: 'Defensa Personal', cinturon: 'púrpura', categoria: 'Estrangulaciones y Candados', familia: 'Inclinaciones Forzadas' },
  { id: 53, nro: 19, nombreEs: 'OBSTRUCCION DE TORMENTA', nombreEn: 'OBSTRUCTING THE STORM', ataque: 'Ataque de baston con la mano derecha', tipo: 'Defensa Personal', cinturon: 'púrpura', categoria: 'Armas', familia: 'Bloqueos de Bastón' },
  { id: 54, nro: 20, nombreEs: 'KIMONO GEMELO', nombreEn: 'TWIN KIMONO', ataque: 'Tomada de ambas solapas', tipo: 'Defensa Personal', cinturon: 'púrpura', categoria: 'Tomadas', familia: 'Solapas Dobles' },
  { id: 55, nro: 21, nombreEs: 'DORMIDOR', nombreEn: 'SLEEPER', ataque: 'Ataque de puño derecho', tipo: 'Defensa Personal', cinturon: 'púrpura', categoria: 'Puños', familia: 'Estrangulaciones de Pie' },
  { id: 56, nro: 22, nombreEs: 'ABRAZOS ESPIRALES', nombreEn: 'SPIRALING TWIG', ataque: 'Abrazando la cintura por atras', tipo: 'Defensa Personal', cinturon: 'púrpura', categoria: 'Agarres y Abrazos', familia: 'Espirales de Escape' },
  { id: 57, nro: 23, nombreEs: 'CRUZ DE DESTRUCCION', nombreEn: 'CROSS OF DESTRUCTION', ataque: 'Tomada de ambos hombros por atras', tipo: 'Defensa Personal', cinturon: 'púrpura', categoria: 'Estrangulaciones y Candados', familia: 'Candados Cruzados' },
  { id: 58, nro: 24, nombreEs: 'VUELO DE LIBERTAD', nombreEn: 'FLIGHT TO FREEDOM', ataque: 'Tomando por atras la mano derecha torciéndola', tipo: 'Defensa Personal', cinturon: 'púrpura', categoria: 'Estrangulaciones y Candados', familia: 'Escapes de Torcedura' },

  { id: 59, nro: 1, nombreEs: 'MANOS PIDIENDO', nombreEn: 'BEGGING HANDS', ataque: 'Tomando ambas manos', tipo: 'Defensa Personal', cinturon: 'azul', categoria: 'Tomadas', familia: 'Tomadas Frontales' },
  { id: 60, nro: 2, nombreEs: 'CUÑA EMPUJANDO', nombreEn: 'THRUSTING WEDGE', ataque: 'Intento tomada de oso', tipo: 'Defensa Personal', cinturon: 'azul', categoria: 'Empujones', familia: 'Cuñas Defensivas' },
  { id: 61, nro: 3, nombreEs: 'ALAS BRILLANDO', nombreEn: 'FLASHING WINGS', ataque: 'Golpe de puño derecho', tipo: 'Defensa Personal', cinturon: 'azul', categoria: 'Puños', familia: 'Ataques Rápidos' },
  { id: 62, nro: 4, nombreEs: 'PENDULO ABRAZANDO', nombreEn: 'HUGGING PENDULUM', ataque: 'Golpe de pierna derecha', tipo: 'Defensa Personal', cinturon: 'azul', categoria: 'Patadas', familia: 'Péndulos Defensivos' },
  { id: 63, nro: 5, nombreEs: 'DEVASTADOR REPITIENDOSE', nombreEn: 'REPEATED DEVASTATION', ataque: 'Full nelson', tipo: 'Defensa Personal', cinturon: 'azul', categoria: 'Agarres y Abrazos', familia: 'Escapes de Full Nelson' },
  { id: 64, nro: 6, nombreEs: 'ALAS ENGANCHADAS', nombreEn: 'ENTANGLED WING', ataque: 'Palanca de mano derecha', tipo: 'Defensa Personal', cinturon: 'azul', categoria: 'Estrangulaciones y Candados', familia: 'Palancas de Brazo' },
  { id: 65, nro: 7, nombreEs: 'DESAFIANDO LA TORMENTA', nombreEn: 'DEFYING THE STORM', ataque: 'Ataque de baston derecho', tipo: 'Defensa Personal', cinturon: 'azul', categoria: 'Armas', familia: 'Desarmes Directos' },
  { id: 66, nro: 8, nombreEs: 'BOLADORA ARRASTRANDO', nombreEn: 'RAKING MACE', ataque: 'Tomada ambas solapas', tipo: 'Defensa Personal', cinturon: 'azul', categoria: 'Tomadas', familia: 'Ataques Arrastrados' },
  { id: 67, nro: 9, nombreEs: 'TALON SACUDIENDOSE', nombreEn: 'SNAKING TALON', ataque: 'Intento tomada de oso', tipo: 'Defensa Personal', cinturon: 'azul', categoria: 'Empujones', familia: 'Movimientos Serpenteantes' },
  { id: 68, nro: 10, nombreEs: 'ESCUDO BOLEADOR', nombreEn: 'SHIELD AND MACE', ataque: 'Golpe de puño derecho', tipo: 'Defensa Personal', cinturon: 'azul', categoria: 'Puños', familia: 'Escudo y Contraataque' },
  { id: 69, nro: 11, nombreEs: 'PENDULO RETROCEDIENDO', nombreEn: 'RETREATING PENDULUM', ataque: 'Ataque de pierna derecha', tipo: 'Defensa Personal', cinturon: 'azul', categoria: 'Patadas', familia: 'Patadas en Retroceso' },
  { id: 70, nro: 12, nombreEs: 'FLECHA TROPEZANDO', nombreEn: 'TRIPPING ARROW', ataque: 'Tomada de oso', tipo: 'Defensa Personal', cinturon: 'azul', categoria: 'Agarres y Abrazos', familia: 'Derribos' },
  { id: 71, nro: 13, nombreEs: 'CRUZ CALLENDOSE', nombreEn: 'FALLEN CROSS', ataque: 'Tomando el hombro con ambas manos por atras', tipo: 'Defensa Personal', cinturon: 'azul', categoria: 'Estrangulaciones y Candados', familia: 'Candados de Caída' },
  { id: 72, nro: 14, nombreEs: 'TORMENTA REGRESANDO', nombreEn: 'RETURNING STORM', ataque: 'Ataque de baston derecho doble pasada', tipo: 'Defensa Personal', cinturon: 'azul', categoria: 'Armas', familia: 'Defensas de Doble Pasar' },
  { id: 73, nro: 16, nombreEs: 'RAMAS CRUZANDOSE', nombreEn: 'CROSSED TWIGS', ataque: 'Tomadas ambas manos por atras', tipo: 'Defensa Personal', cinturon: 'azul', categoria: 'Tomadas', familia: 'Muñecas Cruzadas' },
  { id: 74, nro: 17, nombreEs: 'GIRO DE DESTINO', nombreEn: 'TWIST OF FATE', ataque: 'A empujar con ambas manos', tipo: 'Defensa Personal', cinturon: 'azul', categoria: 'Empujones', familia: 'Giros Corporales' },
  { id: 75, nro: 18, nombreEs: 'BOLEADORA BRILLANDO', nombreEn: 'FLASHING MACE', ataque: 'Ataque de puño derecho a la cara', tipo: 'Defensa Personal', cinturon: 'azul', categoria: 'Puños', familia: 'Golpes Rápidos a la Cara' },
  { id: 76, nro: 19, nombreEs: 'REGALO DEL DESTINO', nombreEn: 'GIFT OF DESTINY', ataque: 'Tomada de mano derecha a la cara', tipo: 'Defensa Personal', cinturon: 'azul', categoria: 'Agarres y Abrazos', familia: 'Agarres de Destino' },
  { id: 77, nro: 20, nombreEs: 'ALAS DE SEDA', nombreEn: 'WINGS OF SILK', ataque: 'Enganchando brazos por atras', tipo: 'Defensa Personal', cinturon: 'azul', categoria: 'Estrangulaciones y Candados', familia: 'Enganches de Brazo' },
  { id: 78, nro: 21, nombreEs: 'TALON AGARRANDO', nombreEn: 'GRIPPING TALON', ataque: 'Tomada de mano derecha', tipo: 'Defensa Personal', cinturon: 'azul', categoria: 'Tomadas', familia: 'Agarres Fuertes' },
  { id: 79, nro: 22, nombreEs: 'NUBES JUNTANDOSE', nombreEn: 'GATHERING CLOUDS', ataque: 'Ataque de puño derecho a la cara', tipo: 'Defensa Personal', cinturon: 'azul', categoria: 'Puños', familia: 'Ataques a la Cabeza' },
  { id: 80, nro: 23, nombreEs: 'BRAZOS DESTRUCTIVOS', nombreEn: 'DESTRUCTIVE TWINS', ataque: 'Tomada de ambos hombros por delante', tipo: 'Defensa Personal', cinturon: 'azul', categoria: 'Agarres y Abrazos', familia: 'Hombros Frontales' },
  { id: 81, nro: 24, nombreEs: 'CARNERO QUEBRADO', nombreEn: 'BROKEN RAM', ataque: 'Carnero atacando', tipo: 'Defensa Personal', cinturon: 'azul', categoria: 'Tacles', familia: 'Bloqueos de Tacle' },
  { id: 82, nro: 25, nombreEs: 'CIRCULANDO EL HORIZONTE', nombreEn: 'CIRCLING THE HORIZON', ataque: 'Ataque de puño derecho', tipo: 'Defensa Personal', cinturon: 'azul', categoria: 'Puños', familia: 'Movimientos Circulares' },

  { id: 83, nro: 1, nombreEs: 'GARRAS OBSTRUIDAS', nombreEn: 'OBSCURE CLAWS', ataque: 'Tomada de hombros derecho con la mano izqda.', tipo: 'Defensa Personal', cinturon: 'verde', categoria: 'Tomadas', familia: 'Garras Defensivas' },
  { id: 84, nro: 2, nombreEs: 'ENCUENTRO CON EL PELIGRO', nombreEn: 'ENCOUNTER WITH DANGER', ataque: 'Empujando con ambas manos al pecho', tipo: 'Defensa Personal', cinturon: 'verde', categoria: 'Empujones', familia: 'Encuentros Directos' },
  { id: 85, nro: 3, nombreEs: 'DESTRUCCION CIRCULANDO', nombreEn: 'CIRCLING DESTRUCTION', ataque: 'Intento de tomada con la mano izquierda', tipo: 'Defensa Personal', cinturon: 'verde', categoria: 'Puños', familia: 'Destrucción Circular' },
  { id: 86, nro: 4, nombreEs: 'DESVIO DE PERDICION', nombreEn: 'DETOUR FROM DOOM', ataque: 'Patada circular derecha al estómago', tipo: 'Defensa Personal', cinturon: 'verde', categoria: 'Patadas', familia: 'Desvíos de Patada' },
  { id: 87, nro: 5, nombreEs: 'SACRIFICIO DE RODILLAS', nombreEn: 'SQUATTING SACRIFICE', ataque: 'Abrazando con ambas manos la cintura', tipo: 'Defensa Personal', cinturon: 'verde', categoria: 'Agarres y Abrazos', familia: 'Sacrificios de Posición' },
  { id: 88, nro: 6, nombreEs: 'ESCAPE DE LA MUERTE', nombreEn: 'ESCAPE FROM DEATH', ataque: 'Abrazando el cuello por el lado izquierdo', tipo: 'Defensa Personal', cinturon: 'verde', categoria: 'Estrangulaciones y Candados', familia: 'Escapes de Estrangulamiento' },
  { id: 89, nro: 7, nombreEs: 'TOCANDO LA TORMENTA', nombreEn: 'BRUSHING THE STORM', ataque: 'Ataque de baston derecho descendente', tipo: 'Defensa Personal', cinturon: 'verde', categoria: 'Armas', familia: 'Basteo Descendente' },
  { id: 90, nro: 8, nombreEs: 'GIRO AMENAZADOR', nombreEn: 'MENACING TWIRL', ataque: 'Tomando el cinturón con la mano derecha', tipo: 'Defensa Personal', cinturon: 'verde', categoria: 'Tomadas', familia: 'Agarrón de Cinturón' },
  { id: 91, nro: 9, nombreEs: 'SALTO DEL PELIGRO', nombreEn: 'LEAP FROM DANGER', ataque: 'Empujando por atras con ambas manos', tipo: 'Defensa Personal', cinturon: 'verde', categoria: 'Empujones', familia: 'Evasiones con Salto' },
  { id: 92, nro: 10, nombreEs: 'CIRCULO DE PROTECCION', nombreEn: 'CIRCLES OF PROTECTION', ataque: 'Ataque descendente con el brazo derecho', tipo: 'Defensa Personal', cinturon: 'verde', categoria: 'Puños', familia: 'Círculos Defensivos' },
  { id: 93, nro: 11, nombreEs: 'CIRCULO DE PERDICION', nombreEn: 'CIRCLES OF DOOM', ataque: 'Patada frontal derecha al estómago', tipo: 'Defensa Personal', cinturon: 'verde', categoria: 'Patadas', familia: 'Patadas Frontales' },
  { id: 94, nro: 12, nombreEs: 'REGALO QUEBRADO', nombreEn: 'BROKEN GIFT', ataque: 'Tomada de mano derecha', tipo: 'Defensa Personal', cinturon: 'verde', categoria: 'Agarres y Abrazos', familia: 'Inmovilizaciones' },
  { id: 95, nro: 13, nombreEs: 'ASCENSO CELESTIAL', nombreEn: 'HEAVENLY ASCENT', ataque: 'Tomada de cuello con ambas manos por delante', tipo: 'Defensa Personal', cinturon: 'verde', categoria: 'Estrangulaciones y Candados', familia: 'Liberación de Cuello' },
  { id: 96, nro: 14, nombreEs: 'CAPTURANDO LA TORMENTA', nombreEn: 'CAPTURING THE STORM', ataque: 'Ataque de baston descedente derecho', tipo: 'Defensa Personal', cinturon: 'verde', categoria: 'Armas', familia: 'Desarmes con Captura' },
  { id: 97, nro: 15, nombreEs: 'ESCUDO CONQUISTADOR', nombreEn: 'CONQUERING SHIELD', ataque: 'Tomando la cintura con el brazo izquierdo', tipo: 'Defensa Personal', cinturon: 'verde', categoria: 'Tomadas', familia: 'Escudos Corporales' },
  { id: 98, nro: 16, nombreEs: 'DOMINANDO EL MAZO', nombreEn: 'TAMING THE MACE', ataque: 'Ataque de puño derecho al pecho', tipo: 'Defensa Personal', cinturon: 'verde', categoria: 'Puños', familia: 'Sometimiento de Puño' },
  { id: 99, nro: 17, nombreEs: 'GIROS DE SACRIFICIOS', nombreEn: 'TWIRLING SACRIFICE', ataque: 'Tomada de full nelson', tipo: 'Defensa Personal', cinturon: 'verde', categoria: 'Agarres y Abrazos', familia: 'Giros de Escape' },
  { id: 100, nro: 18, nombreEs: 'CRUZ DE LA MUERTE', nombreEn: 'CROSS OF DEATH', ataque: 'Tomando ambas solapas con las manos cruzadas', tipo: 'Defensa Personal', cinturon: 'verde', categoria: 'Estrangulaciones y Candados', familia: 'Solapas Cruzadas' },
  { id: 101, nro: 19, nombreEs: 'ASEGURANDO LA TORMENTA', nombreEn: 'SECURING THE STORM', ataque: 'Ataque de baston derecho circular', tipo: 'Defensa Personal', cinturon: 'verde', categoria: 'Armas', familia: 'Aseguramiento de Bastón' },
  { id: 102, nro: 20, nombreEs: 'INTERCEPTANDO AL CARNERO', nombreEn: 'INTERCEPTING THE RAM', ataque: 'Ataque de carnero', tipo: 'Defensa Personal', cinturon: 'verde', categoria: 'Tacles', familia: 'Intercepciones de Tacle' },
  { id: 103, nro: 21, nombreEs: 'COMPULSION DE RODILLA', nombreEn: 'KNEEL OF COMPULSION', ataque: 'Ataque de puño derecho', tipo: 'Defensa Personal', cinturon: 'verde', categoria: 'Puños', familia: 'Rodillazos Forzados' },
  { id: 104, nro: 22, nombreEs: 'CORTANDO LA TORMENTA', nombreEn: 'CLIPPING THE STORM', ataque: 'Ataque de baston recto al estómago', tipo: 'Defensa Personal', cinturon: 'verde', categoria: 'Armas', familia: 'Desvíos de Estocada' },
  { id: 105, nro: 23, nombreEs: 'VISTAZO DE ALAS', nombreEn: 'GLANCING WING', ataque: 'Golpe izquierdo upper cut al estómago', tipo: 'Defensa Personal', cinturon: 'verde', categoria: 'Puños', familia: 'Ataques Diagonales' },
  { id: 106, nro: 24, nombreEs: 'ROMPEDOR DE ESPALDAS', nombreEn: 'THE BACK BREAKER', ataque: 'Golpe de puño derecho al pecho', tipo: 'Defensa Personal', cinturon: 'verde', categoria: 'Puños', familia: 'Proyecciones de Espalda' },

  { id: 107, nro: 1, nombreEs: 'LANZA DE VISTAZO', nombreEn: 'GLANCING SPEAR', ataque: 'Tomada de mano izquierda', tipo: 'Defensa Personal', cinturon: 'café-3kyu', categoria: 'Tomadas', familia: 'Ataques de Lanza' },
  { id: 108, nro: 2, nombreEs: 'EMPUJE A LA OSCURIDAD', nombreEn: 'THRUST INTO DARKNESS', ataque: 'Golpe de puño derecho por atras', tipo: 'Defensa Personal', cinturon: 'café-3kyu', categoria: 'Puños', familia: 'Ataques Traseros' },
  { id: 109, nro: 3, nombreEs: 'VENTILADORES CIRCULANDO', nombreEn: 'CIRCLING FANS', ataque: 'Golpe de puño izquierdo y derecho', tipo: 'Defensa Personal', cinturon: 'café-3kyu', categoria: 'Ataques Múltiples', familia: 'Maniobras de Abanico' },
  { id: 110, nro: 4, nombreEs: 'DESTRUCCION ROTANDO', nombreEn: 'ROTATING DESTRUCTION', ataque: 'Ataque de pierna derecha frontal izqda. hacia atras', tipo: 'Defensa Personal', cinturon: 'café-3kyu', categoria: 'Ataques Múltiples', familia: 'Rotación de Patadas' },
  { id: 111, nro: 5, nombreEs: 'HALCONES DE FUERZA', nombreEn: 'FALCONS OF FORCE', ataque: 'Dos adversarios tomada de hombro por atras', tipo: 'Defensa Personal', cinturon: 'café-3kyu', categoria: 'Ataques Múltiples', familia: 'Múltiples Atacantes' },
  { id: 112, nro: 6, nombreEs: 'EL OSO Y EL CARNERO', nombreEn: 'THE BEAR AND THE RAM', ataque: 'Dos adversarios: 1ro abraza por atras, 2do ataque de puño', tipo: 'Defensa Personal', cinturon: 'café-3kyu', categoria: 'Ataques Múltiples', familia: 'Múltiples Atacantes' },
  { id: 113, nro: 7, nombreEs: 'CUCHILLO LLOVIENDO', nombreEn: 'RAINING LANCE', ataque: 'Ataque de cuchillo descendente con mano derecha', tipo: 'Defensa Personal', cinturon: 'café-3kyu', categoria: 'Armas', familia: 'Defensa de Cuchillo' },
  { id: 114, nro: 8, nombreEs: 'HALCON DESPERTANDO', nombreEn: 'DESPERATE FALCONS', ataque: 'Tomada de ambas manos por adelante', tipo: 'Defensa Personal', cinturon: 'café-3kyu', categoria: 'Tomadas', familia: 'Escapes Desesperados' },
  { id: 115, nro: 9, nombreEs: 'SALTO DE MUERTE', nombreEn: 'LEAP OF DEATH', ataque: 'A empujar con la mano derecha', tipo: 'Defensa Personal', cinturon: 'café-3kyu', categoria: 'Empujones', familia: 'Saltos Defensivos' },
  { id: 116, nro: 10, nombreEs: 'VENTILADORES PROTECTORES', nombreEn: 'PROTECTING FANS', ataque: 'Golpe de puño izquierdo y derecho', tipo: 'Defensa Personal', cinturon: 'café-3kyu', categoria: 'Ataques Múltiples', familia: 'Abanicos Defensivos' },
  { id: 117, nro: 11, nombreEs: 'PANTERA DESPIERTA', nombreEn: 'DECEPTIVE PANTHER', ataque: 'Ataque de pierna derecha circular baja y alta', tipo: 'Defensa Personal', cinturon: 'café-3kyu', categoria: 'Ataques Múltiples', familia: 'Combos de Patada' },
  { id: 118, nro: 12, nombreEs: 'TIGRE DE CORTE', nombreEn: 'COURTING THE TIGER', ataque: 'Dos adversarios: Toman hombro y muñeca por el lado', tipo: 'Defensa Personal', cinturon: 'café-3kyu', categoria: 'Ataques Múltiples', familia: 'Múltiples Atacantes' },
  { id: 119, nro: 13, nombreEs: 'UNION DE LA SERPIENTE', nombreEn: 'GATHERING OF THE SNAKES', ataque: 'Dos adversarios: 1ro puño izq, 2do se abalanza', tipo: 'Defensa Personal', cinturon: 'café-3kyu', categoria: 'Ataques Múltiples', familia: 'Múltiples Atacantes' },
  { id: 120, nro: 14, nombreEs: 'CUCHILLO DE VISTAZO', nombreEn: 'GLANCING LANCE', ataque: 'Ataque de cuchillo al estómago con mano derecha', tipo: 'Defensa Personal', cinturon: 'café-3kyu', categoria: 'Armas', familia: 'Cuchillo al Estómago' },
  { id: 121, nro: 15, nombreEs: 'CIRCULOS DOMINANTES', nombreEn: 'DOMINATING CIRCLES', ataque: 'Tomada de solapa derecha con la mano derecha', tipo: 'Defensa Personal', cinturon: 'café-3kyu', categoria: 'Tomadas', familia: 'Círculos de Dominio' },
  { id: 122, nro: 16, nombreEs: 'VENTILADORES DESTRUCTIVOS', nombreEn: 'DESTRUCTIVE FANS', ataque: 'Ataque de puño derecho al pecho', tipo: 'Defensa Personal', cinturon: 'café-3kyu', categoria: 'Puños', familia: 'Abanicos Destructivos' },
  { id: 123, nro: 17, nombreEs: 'GARZA SIN ABRIRSE', nombreEn: 'UNFURLING CRANE', ataque: 'Ataque de puño izquierdo y derecho', tipo: 'Defensa Personal', cinturon: 'café-3kyu', categoria: 'Ataques Múltiples', familia: 'Combos de Garza' },
  { id: 124, nro: 18, nombreEs: 'AGUILAS AGARRANDO', nombreEn: 'GRASPING EAGLES', ataque: 'Dos adversarios: por atrás y por delante', tipo: 'Defensa Personal', cinturon: 'café-3kyu', categoria: 'Ataques Múltiples', familia: 'Múltiples Atacantes' },
  { id: 125, nro: 19, nombreEs: 'SEPARACION DE LA SERPIENTE', nombreEn: 'PARTING OF THE SNAKES', ataque: 'Dos adversarios: frontal descendente y trasero', tipo: 'Defensa Personal', cinturon: 'café-3kyu', categoria: 'Ataques Múltiples', familia: 'Múltiples Atacantes' },
  { id: 126, nro: 20, nombreEs: 'CUCHILLO EMPUJANDO', nombreEn: 'THRUSTING LANCE', ataque: 'Ataque de cuchillo al estómago con mano derecha', tipo: 'Defensa Personal', cinturon: 'café-3kyu', categoria: 'Armas', familia: 'Estocada de Cuchillo' },
  { id: 127, nro: 21, nombreEs: 'SACRIFICIO ENCEGECEDOR', nombreEn: 'BLINDING SACRIFICE', ataque: 'A empujar con ambas manos al pecho', tipo: 'Defensa Personal', cinturon: 'café-3kyu', categoria: 'Tomadas', familia: 'Sacrificios Visuales' },
  { id: 128, nro: 22, nombreEs: 'SERPIENTE DE CONOCIMIENTO', nombreEn: 'SNAKES OF WISDOM', ataque: 'Dos adversarios por el lado tomada de hombro', tipo: 'Defensa Personal', cinturon: 'café-3kyu', categoria: 'Ataques Múltiples', familia: 'Múltiples Atacantes' },
  { id: 129, nro: 23, nombreEs: 'CUCHILLOS ENGEMELADOS', nombreEn: 'ENTWINED LANCE', ataque: 'Ataque de cuchillo al estómago con mano derecha', tipo: 'Defensa Personal', cinturon: 'café-3kyu', categoria: 'Armas', familia: 'Torsiones de Cuchillo' },
  { id: 130, nro: 24, nombreEs: 'HALCON CALLENDO', nombreEn: 'FALLING FALCON', ataque: 'Tomada de solapa izquierda', tipo: 'Defensa Personal', cinturon: 'café-3kyu', categoria: 'Tomadas', familia: 'Derribos de Halcón' },

  { id: 131, nro: 1, nombreEs: 'CRUZ FATAL', nombreEn: 'FATAL CROSS', ataque: 'A tomar con ambas manos', tipo: 'Defensa Personal', cinturon: 'café-2kyu', categoria: 'Empujones', familia: 'Cruces Defensivas' },
  { id: 132, nro: 2, nombreEs: 'MARTILLOS GIRANDO', nombreEn: 'TWIRLING HAMMERS', ataque: 'Golpe de puño izquierdo a la cara', tipo: 'Defensa Personal', cinturon: 'café-2kyu', categoria: 'Puños', familia: 'Giros de Mazo' },
  { id: 133, nro: 3, nombreEs: 'CRUZ DEFENSIVA', nombreEn: 'DEFENSIVE CROSS', ataque: 'Ataque de pierna derecha', tipo: 'Defensa Personal', cinturon: 'café-2kyu', categoria: 'Patadas', familia: 'Bloqueos de Cruz' },
  { id: 134, nro: 4, nombreEs: 'BAILE DE OSCURIDAD', nombreEn: 'DANCE OF DARKNESS', ataque: 'Ataque de pierna derecha y puño derecho', tipo: 'Defensa Personal', cinturon: 'café-2kyu', categoria: 'Ataques Múltiples', familia: 'Combinaciones Complejas' },
  { id: 135, nro: 5, nombreEs: 'CASAMIENTOS DE CARNEROS', nombreEn: 'MARRIAGE OF THE RAMS', ataque: 'Dos adversarios de lado toman hombro y muñeca', tipo: 'Defensa Personal', cinturon: 'café-2kyu', categoria: 'Ataques Múltiples', familia: 'Múltiples Atacantes' },
  { id: 136, nro: 6, nombreEs: 'EL CARNERO Y EL AGUILA', nombreEn: 'THE RAM AND THE EAGLE', ataque: 'Dos adversarios: 1. trasero, 2. golpe derecho al pecho', tipo: 'Defensa Personal', cinturon: 'café-2kyu', categoria: 'Ataques Múltiples', familia: 'Múltiples Atacantes' },
  { id: 137, nro: 7, nombreEs: 'ESCAPANDO DE LA TORMENTA', nombreEn: 'ESCAPE FROM THE STORM', ataque: 'Golpe derecho descendente de baston', tipo: 'Defensa Personal', cinturon: 'café-2kyu', categoria: 'Armas', familia: 'Desarmes Rápidos de Bastón' },
  { id: 138, nro: 8, nombreEs: 'CIRCULOS DE MOLINOS', nombreEn: 'CIRCLING WINDMILLS', ataque: 'Empujando con ambas manos y golpe derecho', tipo: 'Defensa Personal', cinturon: 'café-2kyu', categoria: 'Ataques Múltiples', familia: 'Molinos Defensivos' },
  { id: 139, nro: 9, nombreEs: 'RODILLA DESTRUCTIVA', nombreEn: 'DESTRUCTIVE KNEEL', ataque: 'Golpe de puño derecho', tipo: 'Defensa Personal', cinturon: 'café-2kyu', categoria: 'Puños', familia: 'Ataques con Rodilla' },
  { id: 140, nro: 10, nombreEs: 'INCLINANDOSE A BUDA', nombreEn: 'BOWING TO BUDDHA', ataque: 'Golpe de pierna derecha recta', tipo: 'Defensa Personal', cinturon: 'café-2kyu', categoria: 'Patadas', familia: 'Inclinaciones y Derribos' },
  { id: 141, nro: 11, nombreEs: 'CIRCULOS DE REVERSA', nombreEn: 'REVERSING CIRCLES', ataque: 'Ataque de pierna izquierda y golpe izquierdo', tipo: 'Defensa Personal', cinturon: 'café-2kyu', categoria: 'Ataques Múltiples', familia: 'Círculos Invertidos' },
  { id: 142, nro: 12, nombreEs: 'REPRIMIENDO A LOS OSOS', nombreEn: 'REPRIMANDING THE BEARS', ataque: 'Dos adversarios: 1 abraza por atrás, 2 golpe por delante', tipo: 'Defensa Personal', cinturon: 'café-2kyu', categoria: 'Ataques Múltiples', familia: 'Múltiples Atacantes' },
  { id: 143, nro: 13, nombreEs: 'CIRCULANDO LA TORMENTA', nombreEn: 'CIRCLING THE STORM', ataque: 'Golpe de puño derecho', tipo: 'Defensa Personal', cinturon: 'café-2kyu', categoria: 'Armas', familia: 'Ataques con Arma' },
  { id: 144, nro: 14, nombreEs: 'ABRIENDO LA OSCURIDAD', nombreEn: 'UNFOLDING THE DARK', ataque: 'Ataque de puño izquierdo por el lado derecho por atrás', tipo: 'Defensa Personal', cinturon: 'café-2kyu', categoria: 'Puños', familia: 'Defensa Posterior' },
  { id: 145, nro: 15, nombreEs: 'SALTANDO EL PENDULO', nombreEn: 'UNWINDING PENDULUM', ataque: 'Ataque de pierna derecha y puño derecho', tipo: 'Defensa Personal', cinturon: 'café-2kyu', categoria: 'Patadas', familia: 'Desenrolles de Péndulo' },
  { id: 146, nro: 16, nombreEs: 'CUCHILLOS PERFORANDO', nombreEn: 'PIERCING LANCE', ataque: 'Ataque de cuchillo derecho al estómago', tipo: 'Defensa Personal', cinturon: 'café-2kyu', categoria: 'Armas', familia: 'Defensa de Perforación' },
  { id: 147, nro: 17, nombreEs: 'ESCAPANDO DE LA OSCURIDAD', nombreEn: 'ESCAPE FROM DARKNESS', ataque: 'Golpe de puño por atras', tipo: 'Defensa Personal', cinturon: 'café-2kyu', categoria: 'Puños', familia: 'Escapes a Ciegas' },
  { id: 148, nro: 18, nombreEs: 'CAPTURANDO LA VARILLA', nombreEn: 'CAPTURING THE ROD', ataque: 'Amenaza de pistola por delante', tipo: 'Defensa Personal', cinturon: 'café-2kyu', categoria: 'Armas', familia: 'Defensa contra Pistola' },
  { id: 149, nro: 19, nombreEs: 'ATAQUE DEL TIGRE', nombreEn: 'PRANCE OF THE TIGER', ataque: 'Golpe circular derecho ascendente al estómago', tipo: 'Defensa Personal', cinturon: 'café-2kyu', categoria: 'Puños', familia: 'Ataques de Tigre' },
  { id: 150, nro: 20, nombreEs: 'VARILLA QUEBRADA', nombreEn: 'BROKEN ROD', ataque: 'Amenaza pistola por atras', tipo: 'Defensa Personal', cinturon: 'café-2kyu', categoria: 'Armas', familia: 'Pistola Trasera' },
  { id: 151, nro: 21, nombreEs: 'MARTILLOS ENGEMELADOS', nombreEn: 'ENTWINED MACES', ataque: 'Golpe circular a la cara izquierdo y derecho', tipo: 'Defensa Personal', cinturon: 'café-2kyu', categoria: 'Ataques Múltiples', familia: 'Mazas Gemelas' },
  { id: 152, nro: 22, nombreEs: 'DESAFIANDO LA VARILLA', nombreEn: 'DEFYING THE ROD', ataque: 'Amenaza de pistola por delante', tipo: 'Defensa Personal', cinturon: 'café-2kyu', categoria: 'Armas', familia: 'Desarmes de Pistola' },
  { id: 153, nro: 23, nombreEs: 'DESVIACION FATAL', nombreEn: 'FATAL DEVIATION', ataque: 'Golpe circular a la cara derecho e izquierdo', tipo: 'Defensa Personal', cinturon: 'café-2kyu', categoria: 'Ataques Múltiples', familia: 'Desvíos de Emergencia' },
  { id: 154, nro: 24, nombreEs: 'VARILLA TORCIDA', nombreEn: 'TWISTED ROD', ataque: 'Amenaza pistola por delante', tipo: 'Defensa Personal', cinturon: 'café-2kyu', categoria: 'Armas', familia: 'Retención de Pistola' },

  { id: 155, nro: 1, nombreEs: 'PLUMAS QUE ATRAPAN (AVANZADO)', nombreEn: 'CLUTCHING FEATHERS (ADV)', ataque: 'Mano izquierda tomando el pelo', tipo: 'Defensa Personal', cinturon: 'café-1kyu', categoria: 'Tomadas', familia: 'Perfeccionamiento' },
  { id: 156, nro: 2, nombreEs: 'SALUDO DE GATILLO (AVANZADO)', nombreEn: 'TRIGGERED SALUTE (ADV)', ataque: 'Mano derecha tomando solapa', tipo: 'Defensa Personal', cinturon: 'café-1kyu', categoria: 'Empujones', familia: 'Perfeccionamiento' },
  { id: 157, nro: 3, nombreEs: 'DANZA DE LA MUERTE (AVANZADO)', nombreEn: 'DANCE OF DEATH (ADV)', ataque: 'Golpe recto mano derecha', tipo: 'Defensa Personal', cinturon: 'café-1kyu', categoria: 'Puños', familia: 'Perfeccionamiento' },
  { id: 158, nro: 4, nombreEs: 'SALUDO CON EMPUJE (AVANZADO)', nombreEn: 'THRUSTING SALUTE (ADV)', ataque: 'Ataque con pierna derecha', tipo: 'Defensa Personal', cinturon: 'café-1kyu', categoria: 'Patadas', familia: 'Perfeccionamiento' },
  { id: 159, nro: 5, nombreEs: 'REGALO DE DESTRUCCION (AVANZADO)', nombreEn: 'GIFT OF DESTRUCTION (ADV)', ataque: 'Tomada de mano derecha', tipo: 'Defensa Personal', cinturon: 'café-1kyu', categoria: 'Agarres y Abrazos', familia: 'Perfeccionamiento' },
  { id: 160, nro: 6, nombreEs: 'CUERNOS ENCERRADOS (AVANZADO)', nombreEn: 'LOCKING HORNS (ADV)', ataque: 'Tomada de cuello delantero', tipo: 'Defensa Personal', cinturon: 'café-1kyu', categoria: 'Estrangulaciones y Candados', familia: 'Perfeccionamiento' },
  { id: 161, nro: 7, nombreEs: 'KIMONO SOLITARIO (AVANZADO)', nombreEn: 'LONE KIMONO (ADV)', ataque: 'Mano izquierda toma solapa', tipo: 'Defensa Personal', cinturon: 'café-1kyu', categoria: 'Tomadas', familia: 'Perfeccionamiento' },
  { id: 162, nro: 8, nombreEs: 'SALUDO DE APARIENCIA (AVANZADO)', nombreEn: 'GLANCING SALUTE (ADV)', ataque: 'Mano derecha a tomar solapa', tipo: 'Defensa Personal', cinturon: 'café-1kyu', categoria: 'Empujones', familia: 'Perfeccionamiento' },
  { id: 163, nro: 9, nombreEs: 'CINCO ESPADAS (AVANZADO)', nombreEn: 'FIVE SWORDS (ADV)', ataque: 'Golpe circular derecho', tipo: 'Defensa Personal', cinturon: 'café-1kyu', categoria: 'Puños', familia: 'Perfeccionamiento' },
  { id: 164, nro: 10, nombreEs: 'RAMA MOVIENDOSE (AVANZADO)', nombreEn: 'BUCKLING BRANCH (ADV)', ataque: 'Ataque de pierna izquierda', tipo: 'Defensa Personal', cinturon: 'café-1kyu', categoria: 'Patadas', familia: 'Perfeccionamiento' },
  { id: 165, nro: 11, nombreEs: 'PEZUÑA RAJUÑANDO (AVANZADO)', nombreEn: 'SCRAPING HOOF (ADV)', ataque: 'Tomada de full nelson', tipo: 'Defensa Personal', cinturon: 'café-1kyu', categoria: 'Agarres y Abrazos', familia: 'Perfeccionamiento' },
  { id: 166, nro: 12, nombreEs: 'AGARRE DE LA MUERTE (AVANZADO)', nombreEn: 'GRIP OF DEATH (ADV)', ataque: 'Tomada del cuello del lado izquierdo', tipo: 'Defensa Personal', cinturon: 'café-1kyu', categoria: 'Estrangulaciones y Candados', familia: 'Perfeccionamiento' },
  { id: 167, nro: 13, nombreEs: 'TALON CRUZANDO (AVANZADO)', nombreEn: 'CROSSING TALON (ADV)', ataque: 'Mano derecha tomando muñeca', tipo: 'Defensa Personal', cinturon: 'café-1kyu', categoria: 'Tomadas', familia: 'Perfeccionamiento' },
  { id: 168, nro: 14, nombreEs: 'MARTILLO REPETIDOR (AVANZADO)', nombreEn: 'REPEATING MACE (ADV)', ataque: 'Mano izquierda empujando', tipo: 'Defensa Personal', cinturon: 'café-1kyu', categoria: 'Empujones', familia: 'Perfeccionamiento' },
  { id: 169, nro: 15, nombreEs: 'MARTILLO PROTECTOR (AVANZADO)', nombreEn: 'SHIELDING HAMMER (ADV)', ataque: 'Golpe circular izquierdo', tipo: 'Defensa Personal', cinturon: 'café-1kyu', categoria: 'Puños', familia: 'Perfeccionamiento' },
  { id: 170, nro: 16, nombreEs: 'CABEZA DE LA SERPIENTE (AVANZADO)', nombreEn: 'STRIKING SERPENTS HEAD (ADV)', ataque: 'Abrazando la cintura por delante', tipo: 'Defensa Personal', cinturon: 'café-1kyu', categoria: 'Agarres y Abrazos', familia: 'Perfeccionamiento' },
  { id: 171, nro: 17, nombreEs: 'ALAS ENCERRRADAS (AVANZADO)', nombreEn: 'LOCKED WING (ADV)', ataque: 'Toma de brazo derecho por atras', tipo: 'Defensa Personal', cinturon: 'café-1kyu', categoria: 'Estrangulaciones y Candados', familia: 'Perfeccionamiento' },
  { id: 172, nro: 18, nombreEs: 'ALAS ALTERADAS (AVANZADO)', nombreEn: 'OBSCURE WING (ADV)', ataque: 'Toma de hombro derecho por atras', tipo: 'Defensa Personal', cinturon: 'café-1kyu', categoria: 'Tomadas', familia: 'Perfeccionamiento' },
  { id: 173, nro: 19, nombreEs: 'MARTILLO EN REVERSA (AVANZADO)', nombreEn: 'REVERSING MACE (ADV)', ataque: 'Avance con golpe izquierdo', tipo: 'Defensa Personal', cinturon: 'café-1kyu', categoria: 'Puños', familia: 'Perfeccionamiento' },
  { id: 174, nro: 20, nombreEs: 'ABRAZO INSTANTANEO (AVANZADO)', nombreEn: 'THRUSTING PRONGS (ADV)', ataque: 'Abrazo de oso completo por delante', tipo: 'Defensa Personal', cinturon: 'café-1kyu', categoria: 'Agarres y Abrazos', familia: 'Perfeccionamiento' },
  { id: 175, nro: 21, nombreEs: 'RAMA ENVUELTA (AVANZADO)', nombreEn: 'TWISTED TWIG (ADV)', ataque: 'Agarre de muñeca', tipo: 'Defensa Personal', cinturon: 'café-1kyu', categoria: 'Estrangulaciones y Candados', familia: 'Perfeccionamiento' },
  { id: 176, nro: 22, nombreEs: 'ESPADA ALTERADA (AVANZADO)', nombreEn: 'OBSCURE SWORD (ADV)', ataque: 'Mano izquierda toma hombro derecho', tipo: 'Defensa Personal', cinturon: 'café-1kyu', categoria: 'Tomadas', familia: 'Perfeccionamiento' },
  { id: 177, nro: 23, nombreEs: 'GARRA LLOVIENDO (AVANZADO)', nombreEn: 'RAINING CLAW (ADV)', ataque: 'Ataque de upper cut derecho al estomago', tipo: 'Defensa Personal', cinturon: 'café-1kyu', categoria: 'Puños', familia: 'Perfeccionamiento' },
  { id: 178, nro: 24, nombreEs: 'ALAS APLASTADORA (AVANZADO)', nombreEn: 'CRASHING WINGS (ADV)', ataque: 'Abrazo de cintura por atras', tipo: 'Defensa Personal', cinturon: 'café-1kyu', categoria: 'Agarres y Abrazos', familia: 'Perfeccionamiento' },

  { id: 179, nro: 1, nombreEs: 'ALAS GIRATORIAS (AVANZADO)', nombreEn: 'TWIRLING WINGS (ADV)', ataque: 'Tomando ambos hombros por atras', tipo: 'Defensa Personal', cinturon: 'negro', categoria: 'Tomadas', familia: 'Maestría 1er Dan' },
  { id: 180, nro: 2, nombreEs: 'BRAZO QUE SE ROMPE (AVANZADO)', nombreEn: 'SNAPPING TWIG (ADV)', ataque: 'Empujon con mano izquierda al pecho', tipo: 'Defensa Personal', cinturon: 'negro', categoria: 'Empujones', familia: 'Maestría 1er Dan' },
  { id: 181, nro: 3, nombreEs: 'GARZA SALTANDO (AVANZADO)', nombreEn: 'LEAPING CRANE (ADV)', ataque: 'Golpe de puño derecho al pecho', tipo: 'Defensa Personal', cinturon: 'negro', categoria: 'Puños', familia: 'Maestría 1er Dan' },
  { id: 182, nro: 4, nombreEs: 'PENDULO COLUMPIANDOSE (AVANZADO)', nombreEn: 'SWINGING PENDULUM (ADV)', ataque: 'Patada circular derecha al estómago', tipo: 'Defensa Personal', cinturon: 'negro', categoria: 'Patadas', familia: 'Maestría 1er Dan' },
  { id: 183, nro: 5, nombreEs: 'MARTILLO ROMPEDOR (AVANZADO)', nombreEn: 'CRUSHING HAMMER (ADV)', ataque: 'Abrazo de oso por atras', tipo: 'Defensa Personal', cinturon: 'negro', categoria: 'Agarres y Abrazos', familia: 'Maestría 1er Dan' },
  { id: 184, nro: 6, nombreEs: 'CAPTURANDO HOJAS (AVANZADO)', nombreEn: 'CAPTURED LEAVES (ADV)', ataque: 'Tomada de mano derecha', tipo: 'Defensa Personal', cinturon: 'negro', categoria: 'Estrangulaciones y Candados', familia: 'Maestría 1er Dan' },
  { id: 185, nro: 7, nombreEs: 'EVITANDO LA TORMENTA (AVANZADO)', nombreEn: 'EVADING THE STORM (ADV)', ataque: 'Ataque de baston a la cabeza con mano derecha', tipo: 'Defensa Personal', cinturon: 'negro', categoria: 'Armas', familia: 'Maestría 1er Dan' },
  { id: 186, nro: 8, nombreEs: 'CARNERO ATACANDO (AVANZADO)', nombreEn: 'CHARGING RAM (ADV)', ataque: 'Avalanzandose a tomar', tipo: 'Defensa Personal', cinturon: 'negro', categoria: 'Tacles', familia: 'Maestría 1er Dan' },
  { id: 187, nro: 9, nombreEs: 'ALAS DE PARTIDA (AVANZADO)', nombreEn: 'PARTING WINGS (ADV)', ataque: 'A tomar con ambos brazos', tipo: 'Defensa Personal', cinturon: 'negro', categoria: 'Empujones', familia: 'Maestría 1er Dan' },
  { id: 188, nro: 10, nombreEs: 'MARTILLOS TRONANDO (AVANZADO)', nombreEn: 'THUNDERING HAMMERS (ADV)', ataque: 'Ataque de puño derecho', tipo: 'Defensa Personal', cinturon: 'negro', categoria: 'Puños', familia: 'Maestría 1er Dan' },
  { id: 189, nro: 11, nombreEs: 'APRETANDO EL DURAZNO (AVANZADO)', nombreEn: 'SQUEEZING THE PEACH (ADV)', ataque: 'Tomada de oso por atras', tipo: 'Defensa Personal', cinturon: 'negro', categoria: 'Agarres y Abrazos', familia: 'Maestría 1er Dan' },
  { id: 190, nro: 12, nombreEs: 'ALAS CIRCULANDO (AVANZADO)', nombreEn: 'CIRCLING WING (ADV)', ataque: 'Tomada de ambos hombros por atras', tipo: 'Defensa Personal', cinturon: 'negro', categoria: 'Estrangulaciones y Candados', familia: 'Maestría 1er Dan' },
  { id: 191, nro: 13, nombreEs: 'CALMANDO LA TORMENTA (AVANZADO)', nombreEn: 'CALMING THE STORM (ADV)', ataque: 'Ataque de baston con la mano derecha', tipo: 'Defensa Personal', cinturon: 'negro', categoria: 'Armas', familia: 'Maestría 1er Dan' },
  { id: 192, nro: 14, nombreEs: 'BOLADORA ATACANDO (AVANZADO)', nombreEn: 'DARTING MACE (ADV)', ataque: 'Tomada de mano derecha con ambas manos', tipo: 'Defensa Personal', cinturon: 'negro', categoria: 'Tomadas', familia: 'Maestría 1er Dan' },
  { id: 193, nro: 15, nombreEs: 'ALAS ENGANCHADORAS (AVANZADO)', nombreEn: 'HOOKING WINGS (ADV)', ataque: 'A tomar cintura con ambas manos', tipo: 'Defensa Personal', cinturon: 'negro', categoria: 'Empujones', familia: 'Maestría 1er Dan' },
  { id: 194, nro: 16, nombreEs: 'ESCUDO Y ESPADA (AVANZADO)', nombreEn: 'SHIELD AND SWORD (ADV)', ataque: 'A empujar con mano izquierda avanzando', tipo: 'Defensa Personal', cinturon: 'negro', categoria: 'Puños', familia: 'Maestría 1er Dan' },
  { id: 195, nro: 17, nombreEs: 'REGALO EN REGRESO (AVANZADO)', nombreEn: 'GIFT IN RETURN (ADV)', ataque: 'Tomada de mano derecha', tipo: 'Defensa Personal', cinturon: 'negro', categoria: 'Agarres y Abrazos', familia: 'Maestría 1er Dan' },
  { id: 196, nro: 18, nombreEs: 'COMPULSION DE ARCO (AVANZADO)', nombreEn: 'BOW OF COMPULSION (ADV)', ataque: 'Mano derecha al pecho del adversario oprimiendo', tipo: 'Defensa Personal', cinturon: 'negro', categoria: 'Estrangulaciones y Candados', familia: 'Maestría 1er Dan' },
  { id: 197, nro: 19, nombreEs: 'OBSTRUCCION DE TORMENTA (AVANZADO)', nombreEn: 'OBSTRUCTING THE STORM (ADV)', ataque: 'Ataque de baston con la mano derecha', tipo: 'Defensa Personal', cinturon: 'negro', categoria: 'Armas', familia: 'Maestría 1er Dan' },
  { id: 198, nro: 20, nombreEs: 'KIMONO GEMELO (AVANZADO)', nombreEn: 'TWIN KIMONO (ADV)', ataque: 'Tomada de ambas solapas', tipo: 'Defensa Personal', cinturon: 'negro', categoria: 'Tomadas', familia: 'Maestría 1er Dan' },
  { id: 199, nro: 21, nombreEs: 'DORMIDOR (AVANZADO)', nombreEn: 'SLEEPER (ADV)', ataque: 'Ataque de puño derecho', tipo: 'Defensa Personal', cinturon: 'negro', categoria: 'Puños', familia: 'Maestría 1er Dan' },
  { id: 200, nro: 22, nombreEs: 'ABRAZOS ESPIRALES (AVANZADO)', nombreEn: 'SPIRALING TWIG (ADV)', ataque: 'Abrazando la cintura por atras', tipo: 'Defensa Personal', cinturon: 'negro', categoria: 'Agarres y Abrazos', familia: 'Maestría 1er Dan' },
  { id: 201, nro: 23, nombreEs: 'CRUZ DE DESTRUCCION (AVANZADO)', nombreEn: 'CROSS OF DESTRUCTION (ADV)', ataque: 'Tomada de ambos hombros por atras', tipo: 'Defensa Personal', cinturon: 'negro', categoria: 'Estrangulaciones y Candados', familia: 'Maestría 1er Dan' },
  { id: 202, nro: 24, nombreEs: 'VUELO DE LIBERTAD (AVANZADO)', nombreEn: 'FLIGHT TO FREEDOM (ADV)', ataque: 'Tomando por atras la mano derecha torciéndola', tipo: 'Defensa Personal', cinturon: 'negro', categoria: 'Estrangulaciones y Candados', familia: 'Maestría 1er Dan' }
];

export const ATTACK_CATEGORIES = [
  'Todos',
  'Agarre',
  'Tomadas',
  'Puño',
  'Puños',
  'Empujones',
  'Patada',
  'Patadas',
  'Bastón',
  'Armas',
  'Agarres y Abrazos',
  'Estrangulaciones y Candados',
  'Ataques Múltiples',
  'Tacles'
];

/**
 * Filter techniques with search, belt, attack category
 */
export function filterTechniques(
  techniques: KenpoTechnique[],
  searchQuery: string,
  belt: string,
  category: string
): KenpoTechnique[] {
  let result = [...techniques];

  if (belt && belt !== 'todos') {
    result = result.filter(t => t.cinturon.toLowerCase() === belt.toLowerCase());
  }

  if (category && category !== 'Todos') {
    const catLower = category.toLowerCase();
    result = result.filter(t => {
      const matchCat = t.categoria.toLowerCase().includes(catLower);
      const matchAttack = t.ataque.toLowerCase().includes(catLower);
      const matchFamily = t.familia.toLowerCase().includes(catLower);
      return matchCat || matchAttack || matchFamily;
    });
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    result = result.filter(t => 
      t.nombreEs.toLowerCase().includes(q) ||
      t.nombreEn.toLowerCase().includes(q) ||
      t.ataque.toLowerCase().includes(q) ||
      t.cinturon.toLowerCase().includes(q) ||
      t.familia.toLowerCase().includes(q)
    );
  }

  return result;
}
