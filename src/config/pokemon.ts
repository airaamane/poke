export interface IPokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: any[];
  forms: Array<any>;
  game_indices: any[];
  held_items: any[];
  location_area_encounters: string;
  moves: any[];
  sprites: any;
  species: any;
  stats: any[];
  types: any[];
}
