import {
  createSlice,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import saga from "../sagas";

import type { PayloadAction } from "@reduxjs/toolkit";
import { IPokemon } from "../config/pokemon";

export interface PokeListItem {
  name: string;
  url: string;
}

export interface PokeListResponse {
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
      state.pokemon = [...state.pokemon, ...action.payload.results];
      state.next = action.payload.next;
    },
    select: (state, action: PayloadAction<IPokemon | null>) => {
      state.selected = action.payload;
    },
  },
});

export const { load, select } = pokemonSlice.actions;

let sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const store = configureStore({
  reducer: {
    pokemon: pokemonSlice.reducer,
  },
  middleware,
});

sagaMiddleware.run(saga);

export default store;
