export type BeltLevel = 
  | 'blanco'
  | 'amarillo'
  | 'naranjo'
  | 'púrpura'
  | 'azul'
  | 'verde'
  | 'café-3kyu'
  | 'café-2kyu'
  | 'café-1kyu'
  | 'negro'
  | 'segundo-dan';

export interface KenpoTechnique {
  id: number;
  nro: number;
  nombreEs: string;
  nombreEn: string;
  ataque: string;
  tipo: string;
  cinturon: BeltLevel | string;
  categoria: string;
  familia: string;
  isFavorite?: boolean;
}

export interface BeltMetadata {
  key: BeltLevel;
  nameEs: string;
  nameEn: string;
  colorHex: string;
  badgeBg: string;
  badgeText: string;
  description: string;
  order: number;
}

export type ActiveTab = 'curriculum' | 'library' | 'practice' | 'history' | 'sheets';

export type PracticeOrder = 'secuencial' | 'azar';

export interface PracticeSettings {
  intervalSeconds: number;
  preparationSeconds: number;
  orderMode: PracticeOrder;
  selectedBelt: string; // 'todos' or BeltLevel
  selectedAttackCategory: string; // 'todos' or specific attack
  speakAudio: boolean;
  beepSound: boolean;
  repeatMode: boolean;
}

export interface PracticeHistoryItem {
  id: string;
  timestamp: string;
  belt: string;
  techniquesCompleted: number;
  totalTimeMinutes: number;
}
