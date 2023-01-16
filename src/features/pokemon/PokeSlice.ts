import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IPokemon } from "../../config/pokemon";

interface PokeListItem {
  name: string;
  url: string;
}

interface PokeListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<PokeListItem>;
}

export interface PokemonState {
  pokemon: Array<PokeListItem>;
  selected: IPokemon | null;
  next: string | null;
}

const initialState: PokemonState = {
  pokemon: [],
  selected: null,
  next: null,
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    load: (state, action: PayloadAction<PokeListResponse>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // state.value += 1;
      state.pokemon = action.payload.results;
    },
    select: (state, action: PayloadAction<IPokemon>) => {
      // state.selected = {...state};
      state.selected = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { load, select } = pokemonSlice.actions;

export default pokemonSlice.reducer;
