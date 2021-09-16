export interface Army {
  detachments: Detachment[];
}

export interface Detachment {
  units: Unit[];
}

export interface Unit {
  name: string;
  models: Model[];
  categories: string[];
  warlord?: boolean;
}

export interface Model {
  name: string;
  quantity: number;
  categories: string[];
}

export interface ModelStats {
  movement: number | null,
  weaponSkill: number | null,
  ballisticSkill: number | null,
  strength: number,
  toughness: number,
  wounds: number,
  attacks: number,
  leadership: number,
  save: number
}
